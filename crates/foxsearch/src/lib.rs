//! FoxSearch — векторизованный поиск байтов и подстрок для горячих путей
//! Firefox (URL classifier, findbar, строковые операции).
//!
//! Реализация SWAR (SIMD Within A Register): поиск байта — 8 байт за итерацию
//! через 64-битные битовые трюки, без платформозависимого SIMD-кода.
//! Эталон для сравнения — `std::str::find` (внутри которого тоже memchr).

const LO: u64 = 0x0101_0101_0101_0101;
const HI: u64 = 0x8080_8080_8080_8080;

const RARITY_LETTERS: [u8; 38] = [
    b'e', b't', b'a', b'o', b'i', b'n', b's', b'h', b'r', b'l', b'd', b'u', b'c', b'm', b'f', b'g',
    b'p', b'y', b'b', b'E', b'T', b'A', b'O', b'I', b'N', b'S', b'H', b'R', b'L', b'D', b'U', b'C',
    b'M', b'F', b'G', b'P', b'Y', b'B',
];
const RARITY_PUNCT: [u8; 10] = [b'.', b'/', b':', b'-', b'?', b'=', b'&', b'%', b',', b'_'];
const RARITY_RARE: [u8; 14] = [
    b'z', b'j', b'q', b'x', b'v', b'k', b'w', b'Z', b'J', b'Q', b'X', b'V', b'K', b'W',
];
/// Частые кириллические буквы (вторые байты UTF-8: а,р,с,т,у,в,д,е,и,к,л,м,н,о,п) —
/// отличаются от прочих не-ASCII байтов, чтобы фильтр выбирал среди них редкие
/// (г,ч,я,ф,х,ц,ш,щ,ъ,ы,ь,э,ю,й,ж,з,б).
const RARITY_CYRILLIC_FREQ: [u8; 15] = [
    0x80, 0x81, 0x82, 0x83, 0xB0, 0xB2, 0xB4, 0xB5, 0xB8, 0xBA, 0xBB, 0xBC, 0xBD, 0xBE, 0xBF,
];

/// Эвристическая "редкость" байта в типичном тексте/URL (0 = самый редкий).
/// Используется для выбора фильтрующего байта иглы: чем реже байт встречается
/// в потоке, тем меньше ложных memcmp-проверок.
const RARITY: [u8; 256] = {
    let mut t = [2u8; 256];
    t[b' ' as usize] = 3;
    let mut i = 0;
    while i < RARITY_LETTERS.len() {
        t[RARITY_LETTERS[i] as usize] = 2;
        i += 1;
    }
    i = b'0' as usize;
    while i <= b'9' as usize {
        t[i] = 1;
        i += 1;
    }
    i = 0;
    while i < RARITY_PUNCT.len() {
        t[RARITY_PUNCT[i] as usize] = 1;
        i += 1;
    }
    i = 0x80;
    while i <= 0xFF {
        t[i] = 0;
        i += 1;
    }
    // UTF-8 лид-байты (0xC0..=0xFF) структурно часты в ЛЮБОМ не-ASCII тексте
    // (например, 0xD0/0xD1 — половина всех байтов кириллицы) — не реже ранга 1
    i = 0xC0;
    while i <= 0xFF {
        t[i] = 1;
        i += 1;
    }
    i = 0;
    while i < RARITY_CYRILLIC_FREQ.len() {
        t[RARITY_CYRILLIC_FREQ[i] as usize] = 1;
        i += 1;
    }
    i = 0;
    while i < RARITY_RARE.len() {
        t[RARITY_RARE[i] as usize] = 0;
        i += 1;
    }
    t
};

/// Индекс фильтрующего байта иглы: минимальная редкость, тай-брейк — правее
/// (правые байты дают лучшую локальность и позволяют сверять суффикс на месте).
pub fn pick_filter_byte(needle: &[u8]) -> usize {
    let mut best = needle.len() - 1;
    let mut best_rank = RARITY[needle[best] as usize];
    for idx in (0..needle.len()).rev() {
        let r = RARITY[needle[idx] as usize];
        if r < best_rank {
            best_rank = r;
            best = idx;
            if r == 0 {
                break; // редше некуда
            }
        }
    }
    best
}

#[inline]
fn broadcast(b: u8) -> u64 {
    (b as u64) * LO // заполняет каждый байт значениями `b`
}

/// Первый индекс `needle` в `haystack`. SWAR: 8 байт за итерацию.
pub fn find_byte(haystack: &[u8], needle: u8) -> Option<usize> {
    let n = broadcast(needle);
    let mut i = 0;
    while i + 8 <= haystack.len() {
        let mut chunk = [0u8; 8];
        chunk.copy_from_slice(&haystack[i..i + 8]);
        let x = u64::from_ne_bytes(chunk) ^ n;
        // нулевой байт в x <=> байт haystack == needle
        let m = x.wrapping_sub(LO) & !x & HI;
        if m != 0 {
            return Some(i + (m.trailing_zeros() >> 3) as usize);
        }
        i += 8;
    }
    haystack[i..]
        .iter()
        .position(|&b| b == needle)
        .map(|p| i + p)
}

/// Первое вхождение пары байт (`first`, `second`) — например, `b"\r\n"`.
pub fn find_two_bytes(haystack: &[u8], first: u8, second: u8) -> Option<usize> {
    let mut i = 0;
    while i + 1 < haystack.len() {
        match find_byte(&haystack[i..], first) {
            Some(p) if i + p + 1 < haystack.len() => {
                if haystack[i + p + 1] == second {
                    return Some(i + p);
                }
                i += p + 1;
            }
            // совпадение `first` в последнем байте — пары быть уже не может
            Some(_) => return None,
            None => return None,
        }
    }
    None
}

/// Первое вхождение `needle` в `haystack`.
///
/// Стратегия (итерация 2, по данным perf-профиля):
/// 1. фильтрующий байт иглы — самый РЕДКИЙ по эвристической таблице
///    (`pick_filter_byte`), а не просто последний;
/// 2. векторизованный [`find_byte`] ведёт скан по этому редкому байту;
/// 3. перед memcmp — два дешёвых байтовых пре-фильтра (первый/второй байты),
///    отсекающие подавляющее большинство ложных кандидатов;
/// 4. финальная сверка — полный memcmp.
///
/// Для UTF-8 корректно: валидный UTF-8 самосинхронизируется, байтовое
/// совпадение валидных строк всегда попадает на границу символов.
pub fn find_substring(haystack: &[u8], needle: &[u8]) -> Option<usize> {
    if needle.is_empty() {
        return Some(0);
    }
    if needle.len() > haystack.len() {
        return None;
    }
    if needle.len() == 1 {
        return find_byte(haystack, needle[0]);
    }

    let fb = pick_filter_byte(needle);
    let fb_byte = needle[fb];
    let n = needle.len();
    let last = n - 1;

    if fb == last {
        // Путь A (плотные кандидаты): фильтр по последнему байту, прямая
        // сверка префикса — без лишних байтовых чтений (v0.1-стратегия).
        let mut i = last;
        while i < haystack.len() {
            match find_byte(&haystack[i..], fb_byte) {
                Some(p) => {
                    let end = i + p;
                    if &haystack[end - last..end] == &needle[..last] {
                        return Some(end - last);
                    }
                    i = end + 1;
                }
                None => return None,
            }
        }
        return None;
    }

    // Путь B (редкий не-последний байт): скан по редкому байту, два дешёвых
    // байтовых пре-фильтра перед memcmp.
    let first = needle[0];
    let second = needle[1];
    let mut i = fb; // минимальный индекс, с которого кандидат помещается целиком
    while i < haystack.len() {
        match find_byte(&haystack[i..], fb_byte) {
            Some(p) => {
                let end = i + p; // позиция needle[fb] в haystack
                let start = end - fb; // кандидат на начало совпадения
                if start + n <= haystack.len()
                    && haystack[start] == first
                    && haystack[start + 1] == second
                    && &haystack[start..start + n] == needle
                {
                    return Some(start);
                }
                i = end + 1;
            }
            None => return None,
        }
    }
    None
}

/// Строковая обёртка над [`find_substring`].
pub fn find_substring_str(haystack: &str, needle: &str) -> Option<usize> {
    find_substring(haystack.as_bytes(), needle.as_bytes())
}

/// Синтетические документы для бенчмарков и профилирования.
pub mod sample {
    const PARAGRAPH: &str = "Firefox is a free and open-source web browser built on the Gecko engine. Rust makes hot paths faster: parsing, searching, encoding, layout, storage. Быстрый поиск по большим документам тоже важен. The quick brown animal jumps over the sleepy animal. https://www.some-domain.org/path?query=value&other=123\n";

    /// Базовый абзац (без "горячих" подстрок — они добавляются хвостом).
    pub fn paragraph() -> &'static str {
        PARAGRAPH
    }

    /// Документ по умолчанию (~7 МБ), цель поиска — у самого конца.
    pub fn haystack() -> String {
        haystack_n(30_000)
    }

    /// Документ из `paragraphs` копий абзаца + хвост с целевыми подстроками.
    pub fn haystack_n(paragraphs: usize) -> String {
        let mut s = PARAGRAPH.repeat(paragraphs);
        s.push_str(" Mozilla Corporation. горячие пути. https://example.com/search?q=firefox+rust&lang=ru\n");
        s
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct Lcg(u64);

    impl Lcg {
        fn next(&mut self) -> u64 {
            self.0 = self
                .0
                .wrapping_mul(6_364_136_223_846_793_005)
                .wrapping_add(1_442_695_040_888_963_407);
            self.0
        }
        fn below(&mut self, n: u64) -> u64 {
            self.next() % n
        }
    }

    fn std_find(h: &[u8], p: &[u8]) -> Option<usize> {
        if p.is_empty() {
            return Some(0);
        }
        if p.len() > h.len() {
            return None;
        }
        h.windows(p.len()).position(|w| w == p)
    }

    #[test]
    fn find_byte_matches_std() {
        let mut rng = Lcg(0xCAFE);
        for _ in 0..5000 {
            let len = rng.below(70) as usize;
            let hay: Vec<u8> = (0..len).map(|_| (rng.below(5) as u8) + b'a').collect();
            let needle = (rng.below(6) as u8) + b'a';
            assert_eq!(
                find_byte(&hay, needle),
                hay.iter().position(|&b| b == needle),
                "hay={hay:02x?} needle={needle}"
            );
        }
    }

    #[test]
    fn substring_matches_std() {
        let mut rng = Lcg(0xBEEF);
        for _ in 0..5000 {
            let hlen = rng.below(80) as usize;
            let plen = rng.below(8) as usize;
            let hay: Vec<u8> = (0..hlen).map(|_| (rng.below(4) as u8) + b'a').collect();
            let pat: Vec<u8> = (0..plen).map(|_| (rng.below(4) as u8) + b'a').collect();
            assert_eq!(
                find_substring(&hay, &pat),
                std_find(&hay, &pat),
                "hay={:?} pat={:?}",
                String::from_utf8_lossy(&hay),
                String::from_utf8_lossy(&pat)
            );
        }
    }

    #[test]
    fn known_cases() {
        assert_eq!(find_substring_str("мир-мир", "мир"), Some(0));
        assert_eq!(find_substring_str("абвгд", "вг"), Some(4));
        assert_eq!(find_substring_str("Firefox", "Fox"), None);
        assert_eq!(find_substring_str("abc", ""), Some(0));
        assert_eq!(find_substring_str("https://example.com/x", "example.com"), Some(8));
        assert_eq!(find_two_bytes(b"a\nb", b'\\', b'n'), None);
        assert_eq!(find_two_bytes(b"a\\nb", b'\\', b'n'), Some(1));
        assert_eq!(find_two_bytes(b"text\\r\\n", b'\\', b'n'), Some(6));
    }

    #[test]
    fn sample_haystack_matches_std() {
        let hay = sample::haystack_n(100);
        for needle in [
            "Mozilla Corporation",
            "горячие пути",
            "https://example.com/search?q=firefox+rust&lang=ru",
        ] {
            let expected = hay.find(needle).expect("needle must be present");
            assert!(
                expected > hay.len() - 300,
                "needle must sit near the end of the document"
            );
            assert_eq!(find_substring_str(&hay, needle), Some(expected));
        }
        assert_eq!(find_substring_str(&hay, "zzz-absent-zzz"), None);
    }
}
