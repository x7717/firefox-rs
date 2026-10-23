//! FoxSearch — векторизованный поиск байтов и подстрок для горячих путей
//! Firefox (URL classifier, findbar, строковые операции).
//!
//! Иерархия движков (итерация 3):
//! 1. **AVX2** (runtime-detected, x86_64): скан 32 байта за итерацию через
//!    `cmpeq`+`movemask`, хвост — перекрывающийся финальный блок;
//! 2. **SWAR** (портабельный фолбэк): 8 байт за итерацию битовыми трюками;
//! 3. скалярный хвост для коротких срезов.
//!
//! Поверх скана — memmem-стратегия: фильтрующий байт иглы выбирается по
//! таблице РЕДКОСТИ (`pick_filter_byte`), кандидаты проходят два дешёвых
//! байтовых пре-фильтра и только затем полный memcmp.
//!
//! Эталон для сравнения — `std::str::find` (внутри которого тоже memchr).

const LO: u64 = 0x0101_0101_0101_0101;
const HI: u64 = 0x8080_8080_8080_8080;

const RARITY_LETTERS: [u8; 38] = *b"etaoinshrlducmfgpybETAOINSHRLDUCMFGPYB";
const RARITY_UPPER: [u8; 26] = *b"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const RARITY_PUNCT: [u8; 10] = *b"./:-?=&%,_";
const RARITY_RARE: [u8; 14] = *b"zjqxvkwZJQXVKW";
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
    // заглавные латинские в обычном тексте заметно реже строчных (v0.4.1):
    // ранг 1 наравне с цифрами/пунктуацией
    i = 0;
    while i < RARITY_UPPER.len() {
        t[RARITY_UPPER[i] as usize] = 1;
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

/// Пара пре-фильтрующих байт иглы: два самых редких, ИСКЛЮЧАЯ байт скана
/// `exclude` (иначе первый фильтр всегда истинен — пустая проверка),
/// тай-брейк — правее. Для URL-подобных игл первый/второй байты бесполезны
/// ('h','t' — частые), а редкие ('=','&',':') отсекают почти всех кандидатов
/// до memcmp (v0.4, по профилю: URL-игла упиралась в пре-фильтры).
fn pick_prefilter_pair(needle: &[u8], exclude: usize) -> (usize, usize) {
    let mut best1 = usize::MAX;
    let mut rank1 = u8::MAX;
    let mut best2 = usize::MAX;
    let mut rank2 = u8::MAX;
    for idx in (0..needle.len()).rev() {
        if idx == exclude {
            continue;
        }
        let r = RARITY[needle[idx] as usize];
        if r < rank1 {
            rank2 = rank1;
            best2 = best1;
            rank1 = r;
            best1 = idx;
        } else if r < rank2 {
            rank2 = r;
            best2 = idx;
        }
    }
    // len >= 2 и exclude — один индекс => best1 найдётся всегда
    if best2 == usize::MAX {
        best2 = best1; // len == 2: второго нет — фильтр вырождается (безвредно)
    }
    (best1, best2)
}

#[inline]
fn broadcast(b: u8) -> u64 {
    (b as u64) * LO // заполняет каждый байт значениями `b`
}

// ---------------------------------------------------------------------------
// Runtime feature detection (кешируется один раз за процесс)
// ---------------------------------------------------------------------------

#[cfg(target_arch = "x86_64")]
const SIMD_NONE: u8 = 0;
#[cfg(target_arch = "x86_64")]
const SIMD_AVX2: u8 = 2;

#[cfg(target_arch = "x86_64")]
static SIMD_LEVEL: std::sync::OnceLock<u8> = std::sync::OnceLock::new();

#[cfg(target_arch = "x86_64")]
#[inline]
fn simd_level() -> u8 {
    *SIMD_LEVEL.get_or_init(|| {
        if std::arch::is_x86_feature_detected!("avx2") {
            SIMD_AVX2
        } else {
            SIMD_NONE
        }
    })
}

// ---------------------------------------------------------------------------
// Ядра скана
// ---------------------------------------------------------------------------

/// SWAR-ядро: первый индекс `needle` — 8 байт за итерацию, битовые трюки.
fn find_byte_swar(haystack: &[u8], needle: u8) -> Option<usize> {
    let n = broadcast(needle);
    let mut i = 0;
    while i + 8 <= haystack.len() {
        let mut chunk = [0u8; 8];
        chunk.copy_from_slice(&haystack[i..i + 8]);
        let x = u64::from_le_bytes(chunk) ^ n;
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

/// AVX2-ядро: 32 байта за итерацию. Для len < 32 — SWAR-фолбэк.
///
/// # Safety
/// Вызывать только при поддержке AVX2 (`simd_level() == SIMD_AVX2`).
#[cfg(target_arch = "x86_64")]
#[target_feature(enable = "avx2")]
unsafe fn find_byte_avx2(haystack: &[u8], needle: u8) -> Option<usize> {
    use std::arch::x86_64::*;

    let len = haystack.len();
    if len < 32 {
        return find_byte_swar(haystack, needle);
    }
    let ptr = haystack.as_ptr();
    let n = _mm256_set1_epi8(needle as i8);
    let mut i = 0usize;
    while i + 32 <= len {
        let chunk = _mm256_loadu_si256(ptr.add(i) as *const __m256i);
        let m = _mm256_movemask_epi8(_mm256_cmpeq_epi8(chunk, n));
        if m != 0 {
            return Some(i + m.trailing_zeros() as usize);
        }
        i += 32;
    }
    // Хвост: перекрывающийся финальный блок [len-32, len). Все байты < i уже
    // проверены основным циклом, так что первое совпадение в этом блоке,
    // если оно есть, лежит в [i, len) — дубликатов и ложных позиций нет.
    debug_assert!(len >= 32);
    let chunk = _mm256_loadu_si256(ptr.add(len - 32) as *const __m256i);
    let m = _mm256_movemask_epi8(_mm256_cmpeq_epi8(chunk, n));
    if m != 0 {
        return Some(len - 32 + m.trailing_zeros() as usize);
    }
    None
}

/// Первый индекс `needle` в `haystack`. Выбор ядра — runtime, один раз.
pub fn find_byte(haystack: &[u8], needle: u8) -> Option<usize> {
    #[cfg(target_arch = "x86_64")]
    {
        if simd_level() == SIMD_AVX2 {
            // Safety: детекция AVX2 выполнена выше.
            return unsafe { find_byte_avx2(haystack, needle) };
        }
    }
    find_byte_swar(haystack, needle)
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
/// Стратегия (итерация 3, по данным perf-профилей):
/// 1. фильтрующий байт иглы — самый РЕДКИЙ по эвристической таблице
///    (`pick_filter_byte`), а не просто последний;
/// 2. скан ведёт изолированное AVX2-ядро [`find_byte`] (32 байта/итерацию):
///    замер показал, что фьюжн скан+верификация в одной AVX2-функции
///    роняет скорость скана с ~24 до ~13 GiB/s (холодный блок верификации
///    мешает кодогенерации горячего цикла), поэтому скан и верификация
///    РАЗДЕЛЕНЫ;
/// 3. перед memcmp — два дешёвых пре-фильтра по редчайшим байтам иглы
///    (`pick_prefilter_pair`), отсекающие подавляющее большинство ложных
///    кандидатов;
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
            {
                let p = find_byte(&haystack[i..], fb_byte)?;
                let end = i + p;
                if haystack[end - last..end] == needle[..last] {
                    return Some(end - last);
                }
                i = end + 1;
            }
        }
        return None;
    }

    // Путь B (редкий не-последний байт): скан по редкому байту, два дешёвых
    // пре-фильтра по редчайшим байтам иглы (v0.4) перед memcmp.
    let (p1, p2) = pick_prefilter_pair(needle, fb);
    let b1 = needle[p1];
    let b2 = needle[p2];
    let mut i = fb; // минимальный индекс, с которого кандидат помещается целиком
    while i < haystack.len() {
        {
            let p = find_byte(&haystack[i..], fb_byte)?;
            let end = i + p; // позиция needle[fb] в haystack
            let start = end - fb; // кандидат на начало совпадения
            if start + n <= haystack.len()
                && haystack[start + p1] == b1
                && haystack[start + p2] == b2
                && &haystack[start..start + n] == needle
            {
                return Some(start);
            }
            i = end + 1;
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
    fn find_byte_lengths_edge() {
        // границы переключения ядер: 0..64 байта
        for len in 0..=64 {
            let hay = vec![b'x'; len];
            for needle in *b"xy" {
                let expected = hay.iter().position(|&b| b == needle);
                assert_eq!(find_byte(&hay, needle), expected, "len={len}");
            }
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

    /// Property-тест с иглами длиной 8..40 — пересекает границы ядер
    /// (SWAR < 32, AVX2 >= 32) и оба пути find_substring (A/B).
    #[test]
    fn substring_matches_std_long_needles() {
        let mut rng = Lcg(0x5EED);
        for _ in 0..2000 {
            let hlen = rng.below(300) as usize;
            let plen = 8 + rng.below(32) as usize;
            let hay: Vec<u8> = (0..hlen).map(|_| (rng.below(6) as u8) + b'a').collect();
            let pat: Vec<u8> = (0..plen).map(|_| (rng.below(6) as u8) + b'a').collect();
            assert_eq!(
                find_substring(&hay, &pat),
                std_find(&hay, &pat),
                "hay(len={hlen})={:?} pat(len={plen})={:?}",
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
