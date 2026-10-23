//! FoxSearch — векторизованный поиск байтов и подстрок для горячих путей
//! Firefox (URL classifier, findbar, строковые операции).
//!
//! Реализация SWAR (SIMD Within A Register): поиск байта — 8 байт за итерацию
//! через 64-битные битовые трюки, без платформозависимого SIMD-кода.
//! Эталон для сравнения — `std::str::find` (внутри которого тоже memchr).

const LO: u64 = 0x0101_0101_0101_0101;
const HI: u64 = 0x8080_8080_8080_8080;

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
/// Стратегия "фильтр по последнему байту": редкий байт ищется векторизованным
/// [`find_byte`], затем сверяется хвост длины `needle.len() - 1`.
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
    let last = needle.len() - 1;
    let mut i = last;
    while i < haystack.len() {
        match find_byte(&haystack[i..], needle[last]) {
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
