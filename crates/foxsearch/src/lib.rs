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
//! Мульти-игольный поиск ([`MultiNeedle`], итерация 20): ОДИН проход по стогу
//! против N независимых `find_substring` (N полных проходов). Скан ведётся по
//! ОБЪЕДИНЁННОМУ множеству редчайших байт игл: |S|<=8 — OR из cmpeq (точно),
//! |S|>8 — PSHUFB-биткарта (ложные срабатывания возможны только внутри пары
//! байт b/b^8 и отсекаются верификацией). Хиты собираются ПАКЕТАМИ по окну
//! 4КБ (один вызов ядра на окно — без перестройки векторов на каждый хит),
//! кандидаты сверяются по группам игл с общим фильтр-байтом; возвращается
//! ЛЕВОЕ совпадение (минимум старта, тай-брейк — меньший индекс иглы).
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

// ---------------------------------------------------------------------------
// Мульти-игольный поиск (итерация 20)
// ---------------------------------------------------------------------------

/// Результат [`MultiNeedle::find`]: индекс иглы (в порядке передачи в
/// `MultiNeedle::new`/`from_strs`) и стартовая позиция ЛЕВОГО совпадения
/// (минимальный старт; тай-брейк при равных стартах — меньший индекс иглы).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct MultiMatch {
    pub needle: usize,
    pub start: usize,
}

/// Сканер множества фильтр-байтов (объединение редчайших байт всех игл).
/// `contains` бит-в-бит повторяет семантику AVX2-сканера — включая ложные
/// срабатывания биткарты внутри пары b/b^8 — поэтому скалярный фолбэк и
/// SIMD-путь находят одинаковые кандидаты.
enum ByteScan {
    Single(u8),
    CmpEq { bytes: [u8; 8], k: u8 },
    Bitmap { rows: [u8; 16] },
}

impl ByteScan {
    #[inline]
    fn contains(&self, b: u8) -> bool {
        match self {
            ByteScan::Single(n) => b == *n,
            ByteScan::CmpEq { bytes, k } => bytes[..*k as usize].contains(&b),
            ByteScan::Bitmap { rows } => rows[(b >> 4) as usize] & (1 << (b & 7)) != 0,
        }
    }
}

fn next_hit_scalar(hay: &[u8], scan: &ByteScan) -> Option<usize> {
    hay.iter().position(|&b| scan.contains(b))
}

/// Мульти-игольный поиск: первое (левое) вхождение ЛЮБОЙ из N игл за ОДИН
/// проход по стогу.
///
/// Стратегия (итерация 20, оценка эффекта до реализации: N проходов
/// `find_substring` против одного — выигрыш растёт линейно с N, уже для
/// N=2 ожидание >> 15%):
/// 1. для каждой иглы — её редчайший байт (`pick_filter_byte`, как в
///    [`find_substring`]); множества байтов объединяются в S;
/// 2. скан стога идёт по membership в S: |S|<=8 — OR из cmpeq (стиль
///    memchr2/3, точно), |S|>8 — PSHUFB-биткарта по нибблам (ложные
///    срабатывания возможны только для пары байт b/b^8 одной строки нибблов
///    — дешёвые ложные кандидаты, отсекаются верификацией); хиты собираются
///    пакетами по окну 4КБ — ОДИН вызов ядра на окно, без перестройки
///    векторов и перезахода в скаляр на каждый хит;
/// 3. кандидат на позиции p верифицируется по ГРУППЕ игл с фильтр-байтом
///    haystack[p]: пре-фильтры + memcmp (переиспользуют `pick_prefilter_pair`);
/// 4. левосторонность обеспечивается продолжением скана: совпадение
///    фиксируется, но скан идёт дальше, пока будущий кандидат мог бы дать
///    старт меньше найденного (p+1 <= best + max_fbpos).
///
/// Пустая игла совпадает в позиции 0; пустой набор игл даёт `None`.
/// Для повторных поисков по одному набору игл переиспользуйте `MultiNeedle`
/// (вся предобработка — в конструкторе).
pub struct MultiNeedle {
    needles: Vec<Box<[u8]>>,
    fb_pos: Vec<u32>,
    prefilter: Vec<[(u32, u8); 2]>,
    groups: Vec<Vec<u32>>,
    byte_to_group: [i16; 256],
    max_fbpos: usize,
    empty_idx: Option<usize>,
    /// Лево-сторожные LUT по группам (итерация 22): параллелен `groups`;
    /// пустой вектор — группа верифицируется как прежде (одиночки, группы
    /// > 64 игл, группы с fbp = 0). См. [`MultiNeedle::build_guard_luts`].
    guard_luts: Vec<Vec<GuardLut>>,
    /// Сканер множества фильтр-байтов, предвычислен в конструкторе (итерация
    /// 21): в сценарии «классификатор» (поток коротких URL) per-call
    /// построение сканера стоило столько же, сколько сам скан URL.
    scan: ByteScan,
}

impl MultiNeedle {
    pub fn new(needles: &[&[u8]]) -> MultiNeedle {
        let mut mn = MultiNeedle {
            needles: Vec::with_capacity(needles.len()),
            fb_pos: Vec::with_capacity(needles.len()),
            prefilter: Vec::with_capacity(needles.len()),
            groups: Vec::new(),
            byte_to_group: [-1i16; 256],
            max_fbpos: 0,
            empty_idx: None,
            guard_luts: Vec::new(),
            scan: ByteScan::Bitmap { rows: [0; 16] }, // замещается после цикла
        };
        for (idx, nd) in needles.iter().enumerate() {
            mn.needles.push((*nd).into());
            if nd.is_empty() {
                // индексы параллельных массивов должны сходиться; сама игла
                // в группы не попадает (find сразу вернёт её индекс)
                mn.fb_pos.push(0);
                mn.prefilter.push([(0, 0), (0, 0)]);
                if mn.empty_idx.is_none() {
                    mn.empty_idx = Some(idx);
                }
                continue;
            }
            let fb = pick_filter_byte(nd);
            let (p1, p2) = if nd.len() >= 2 {
                pick_prefilter_pair(nd, fb)
            } else {
                (0, 0) // len == 1: пре-фильтры вырождаются в всегда-истинные
            };
            mn.fb_pos.push(fb as u32);
            mn.prefilter
                .push([(p1 as u32, nd[p1]), (p2 as u32, nd[p2])]);
            let b = nd[fb];
            let gi = match mn.byte_to_group[b as usize] {
                g if g >= 0 => g as usize,
                _ => {
                    mn.groups.push(Vec::new());
                    let gi = mn.groups.len() - 1;
                    mn.byte_to_group[b as usize] = gi as i16;
                    gi
                }
            };
            mn.groups[gi].push(idx as u32);
            mn.max_fbpos = mn.max_fbpos.max(fb);
        }
        mn.guard_luts = Self::build_guard_luts(&mn.groups, &mn.fb_pos, &mn.needles);
        mn.scan = mn.build_scan();
        mn
    }

    /// Лево-сторожные LUT группы (итерация 22).
    ///
    /// Мотивация (SIGPROF-профиль, см. WORKLOG сессии 18): в сценарии
    /// «классификатор» 72.8% времени — `verify_at`, в multi-8 — 46.2%:
    /// каждый хит фильтр-байта ('=' встречается в каждом URL с query)
    /// линейно проверял ВСЮ группу: 2 пре-фильтр-загрузки + ветвление на иглу.
    ///
    /// Идея: если игла совпадает в хите p, то её байт `nd[fbp-k]` стоит в
    /// `hay[p-k]` для любого k <= fbp (старт s = p - fbp, позиция байта
    /// s + fbp - k = p - k). Поэтому для смещений k = 1..=4 заранее строится
    /// LUT[256] биткарт группы: бит j установлен <=> j-я игра НЕ отсекается
    /// байтом `hay[p-k]` (не покрыта: fbp < k, либо nd[fbp-k] == байт).
    /// Верификация хита: alive &= LUT_k[hay[p-k]] — до 4 загрузок из
    /// резидентных таблиц убивают почти всех ложных кандидатов; полная
    /// проверка — только по выжившим битам. Отсечка строгая: живая маска —
    /// НАДМНОЖЕСТВО реальных совпадений, ложных отрицательных нет.
    ///
    /// Ограничения применения: группы из 2..=64 игл (биткарта u64) и с
    /// fbp > 0; одиночки и группы > 64 (территория Aho-Corasick) идут как
    /// прежде. Память: kmax * 2 КиБ на группу, kmax = min(4, max fbp).
    fn build_guard_luts(
        groups: &[Vec<u32>],
        fb_pos: &[u32],
        needles: &[Box<[u8]>],
    ) -> Vec<Vec<GuardLut>> {
        let mut out = Vec::with_capacity(groups.len());
        for members in groups {
            if members.len() < 2 || members.len() > GUARD_MAX_GROUP {
                out.push(Vec::new());
                continue;
            }
            let max_fbp = members
                .iter()
                .map(|&ni| fb_pos[ni as usize] as usize)
                .max()
                .unwrap_or(0);
            let kmax = max_fbp.min(GUARD_OFFSETS);
            if kmax == 0 {
                out.push(Vec::new());
                continue;
            }
            let mut luts: Vec<GuardLut> = Vec::with_capacity(kmax);
            for k in 1..=kmax {
                let mut lut: GuardLut = Box::new([0u64; 256]);
                // непокрытые смещением иглы (fbp < k) живы при любом байте
                let mut uncovered: u64 = 0;
                for (j, &ni) in members.iter().enumerate() {
                    if (fb_pos[ni as usize] as usize) < k {
                        uncovered |= 1 << j;
                    }
                }
                if uncovered != 0 {
                    lut.iter_mut().for_each(|slot| *slot = uncovered);
                }
                for (j, &ni) in members.iter().enumerate() {
                    let fbp = fb_pos[ni as usize] as usize;
                    if fbp >= k {
                        let b = needles[ni as usize][fbp - k];
                        lut[b as usize] |= 1 << j;
                    }
                }
                luts.push(lut);
            }
            out.push(luts);
        }
        out
    }

    /// Обёртка над [`MultiNeedle::new`] для строковых игл.
    pub fn from_strs(needles: &[&str]) -> MultiNeedle {
        let bytes: Vec<&[u8]> = needles.iter().map(|s| s.as_bytes()).collect();
        MultiNeedle::new(&bytes)
    }

    /// Число игл (включая пустые).
    pub fn len(&self) -> usize {
        self.needles.len()
    }

    pub fn is_empty(&self) -> bool {
        self.needles.is_empty()
    }

    /// Первое (левое) вхождение любой иглы в `haystack`.
    pub fn find(&self, haystack: &[u8]) -> Option<MultiMatch> {
        if self.needles.is_empty() {
            return None;
        }
        if let Some(idx) = self.empty_idx {
            return Some(MultiMatch {
                needle: idx,
                start: 0,
            });
        }
        self.find_impl(haystack)
    }

    fn build_scan(&self) -> ByteScan {
        let mut bytes = [0u8; 8];
        let mut k = 0usize;
        let mut rows = [0u8; 16];
        for (b, g) in self.byte_to_group.iter().enumerate() {
            if *g >= 0 {
                let b = b as u8;
                rows[(b >> 4) as usize] |= 1 << (b & 7);
                if k < 8 {
                    bytes[k] = b;
                }
                k += 1;
            }
        }
        match k {
            1 => ByteScan::Single(bytes[0]),
            2..=8 => ByteScan::CmpEq { bytes, k: k as u8 },
            _ => ByteScan::Bitmap { rows },
        }
    }

    /// Верификация кандидата на позиции p (группа игл с фильтр-байтом hay[p]).
    /// Обновляет `best`; возвращает true, если дальнейший скан не может дать
    /// старт меньше найденного (левосторонний ранний выход).
    ///
    /// Итерация 22: перед перебором игл группы применяются лево-сторожные
    /// LUT (см. [`MultiNeedle::build_guard_luts`]) — до 4 загрузок из
    /// резидентных таблиц вместо перебора всей группы на каждом ложном хите.
    fn verify_at(&self, hay: &[u8], p: usize, best: &mut Option<(usize, usize)>) -> bool {
        let g = self.byte_to_group[hay[p] as usize];
        if g >= 0 {
            let members: &[u32] = &self.groups[g as usize];
            let luts = &self.guard_luts[g as usize];
            if luts.is_empty() {
                for &ni in members {
                    self.verify_one(hay, p, ni, best);
                }
            } else {
                debug_assert!(members.len() >= 2 && members.len() <= GUARD_MAX_GROUP);
                let mut alive = if members.len() == GUARD_MAX_GROUP {
                    u64::MAX
                } else {
                    (1u64 << members.len()) - 1
                };
                for (idx, lut) in luts.iter().enumerate() {
                    // p < k+1: позиции левее начала стога; иглы с fbp >= k+1
                    // там невозможны (не помещаются), остальные LUT не
                    // покрывает — проверка не несёт ограничений.
                    if p > idx {
                        alive &= lut[hay[p - idx - 1] as usize];
                        if alive == 0 {
                            break;
                        }
                    }
                }
                while alive != 0 {
                    let j = alive.trailing_zeros() as usize;
                    alive &= alive - 1;
                    self.verify_one(hay, p, members[j], best);
                }
            }
        }
        // Левосторонность: будущий хит p' >= p+1 даёт кандидат-старт
        // p' - fbpos >= p+1 - max_fbpos; если и это хуже найденного —
        // дальше совпадений с меньшим стартом быть не может.
        match *best {
            Some((bs, _)) => p + 1 > bs.saturating_add(self.max_fbpos),
            None => false,
        }
    }

    /// Полная проверка одной иглы-кандидата на хите p (границы, пре-фильтры,
    /// memcmp, обновление `best` с левосторонним тай-брейком).
    #[inline(always)]
    fn verify_one(&self, hay: &[u8], p: usize, ni: u32, best: &mut Option<(usize, usize)>) {
        let fbp = self.fb_pos[ni as usize] as usize;
        if fbp > p {
            return; // игла не помещается левее p
        }
        let s = p - fbp;
        let nd: &[u8] = &self.needles[ni as usize];
        if s + nd.len() > hay.len() {
            return;
        }
        let pf = &self.prefilter[ni as usize];
        if hay[s + pf[0].0 as usize] != pf[0].1 || hay[s + pf[1].0 as usize] != pf[1].1 {
            return;
        }
        if hay[s..s + nd.len()] != *nd {
            return;
        }
        let better = match *best {
            None => true,
            Some((bs, bi)) => s < bs || (s == bs && (ni as usize) < bi),
        };
        if better {
            *best = Some((s, ni as usize));
        }
    }

    fn find_impl(&self, hay: &[u8]) -> Option<MultiMatch> {
        #[cfg(target_arch = "x86_64")]
        {
            if simd_level() == SIMD_AVX2 {
                return self.find_impl_avx2(hay, &self.scan);
            }
        }
        self.find_impl_scalar(hay, &self.scan)
    }

    /// Портабельный путь: хит-за-хитом (корректность важнее скорости —
    /// AVX2-машины идут через find_impl_avx2).
    fn find_impl_scalar(&self, hay: &[u8], scan: &ByteScan) -> Option<MultiMatch> {
        let mut best: Option<(usize, usize)> = None;
        let mut i = 0usize;
        loop {
            let hit = match scan {
                ByteScan::Single(b) => find_byte(&hay[i..], *b),
                _ => next_hit_scalar(&hay[i..], scan),
            };
            let Some(p_rel) = hit else { break };
            let p = i + p_rel;
            if self.verify_at(hay, p, &mut best) {
                break;
            }
            i = p + 1;
        }
        best.map(|(s, ni)| MultiMatch {
            needle: ni,
            start: s,
        })
    }

    /// AVX2-путь: ядро собирает хиты ПАКЕТАМИ по окну 4КБ (один вызов на окно
    /// — векторы множества строятся один раз на окно, короткие промежутки
    /// между плотными хитами не деградируют в скаляр), верификация — между
    /// окнами в порядке возрастания позиций. Урок итерации 3 соблюдён:
    /// холодный блок верификации остаётся ВНЕ горячего цикла ядра.
    #[cfg(target_arch = "x86_64")]
    fn find_impl_avx2(&self, hay: &[u8], scan: &ByteScan) -> Option<MultiMatch> {
        let mut best: Option<(usize, usize)> = None;
        let mut w = 0usize;
        let mut buf = [0u16; MULTI_HITS_CAP];
        while w < hay.len() {
            let wlen = MULTI_WINDOW.min(hay.len() - w);
            // Safety: детекция AVX2 выполнена в find_impl.
            let n = unsafe { multi_scan_window_avx2(&hay[w..], wlen, scan, &mut buf) };
            for &off in buf[..n].iter() {
                let p = w + off as usize;
                if self.verify_at(hay, p, &mut best) {
                    return best.map(|(s, ni)| MultiMatch {
                        needle: ni,
                        start: s,
                    });
                }
            }
            w = if n == MULTI_HITS_CAP {
                // буфер полон: продолжаем с последнего обработанного хита
                w + buf[n - 1] as usize + 1
            } else {
                w + MULTI_WINDOW
            };
        }
        best.map(|(s, ni)| MultiMatch {
            needle: ni,
            start: s,
        })
    }
}

// Параметры пакетного сбора: окно 4КБ (позиции помещаются в u16), буфер на
// 512 хитов (реальная плотность хитов редких байт — проценты, запас 5x).
#[cfg(target_arch = "x86_64")]
const MULTI_WINDOW: usize = 4096;
#[cfg(target_arch = "x86_64")]
const MULTI_HITS_CAP: usize = 512;

// Параметры лево-сторожных LUT (итерация 22): до 4 смещений влево от хита,
// группы из 2..=64 игл (биткарта u64). LUT: Box<[u64; 256]> = 2 КиБ на
// смещение — резидентны в L1 во время скана.
type GuardLut = Box<[u64; 256]>;
const GUARD_OFFSETS: usize = 4;
const GUARD_MAX_GROUP: usize = 64;

#[cfg(target_arch = "x86_64")]
const BITMAP_KIND: u8 = 9;

#[cfg(target_arch = "x86_64")]
struct AvxCtx {
    kind: u8, // 1..=8 = длина CmpEq-цепочки, BITMAP_KIND = биткарта
    b: [std::arch::x86_64::__m256i; 8],
    rows: std::arch::x86_64::__m256i,
    bits: std::arch::x86_64::__m256i,
}

/// OR-цепочка из $n cmpeq: разворачивается в константный код (тёплый путь
/// горячего цикла), без bounds-check runtime-срезов.
macro_rules! avx_or_chain {
    ($chunk:expr, $ctx:expr, $n:literal) => {{
        let mut acc = _mm256_cmpeq_epi8($chunk, $ctx.b[0]);
        let mut j = 1;
        while j < $n {
            acc = _mm256_or_si256(acc, _mm256_cmpeq_epi8($chunk, $ctx.b[j]));
            j += 1;
        }
        acc
    }};
}

/// Маска «байт принадлежит множеству» для 32-байтного блока.
/// Вызывать только из AVX2-контекста (под `multi_scan_window_avx2`).
#[cfg(target_arch = "x86_64")]
#[inline(always)]
unsafe fn avx_mask(
    chunk: std::arch::x86_64::__m256i,
    ctx: &AvxCtx,
    low_nib: std::arch::x86_64::__m256i,
    zero: std::arch::x86_64::__m256i,
) -> i32 {
    use std::arch::x86_64::*;
    match ctx.kind {
        BITMAP_KIND => {
            // Биткарта по нибблам: hi-ниббл выбирает строку (16 строк),
            // lo-ниббл — бит в ней. Строки-байты покрывают биты lo&7, поэтому
            // байты b и b^8 коллидируют — ложные кандидаты отсекаются
            // верификацией (группа такого байта пуста или не матчится).
            let hi = _mm256_and_si256(_mm256_srli_epi16(chunk, 4), low_nib);
            let lo = _mm256_and_si256(chunk, low_nib);
            let t = _mm256_shuffle_epi8(ctx.rows, hi);
            let u = _mm256_shuffle_epi8(ctx.bits, lo);
            !_mm256_movemask_epi8(_mm256_cmpeq_epi8(_mm256_and_si256(t, u), zero))
        }
        1 => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 1)),
        2 => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 2)),
        3 => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 3)),
        4 => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 4)),
        5 => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 5)),
        6 => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 6)),
        7 => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 7)),
        _ => _mm256_movemask_epi8(avx_or_chain!(chunk, ctx, 8)),
    }
}

/// Пакетный сбор хитов окна [0, wlen) среза `hay`. Срез берётся от начала
/// окна до конца СТОГА (последнее окно добирает перекрывающимся финальным
/// блоком, как в find_byte_avx2). Позиции — относительно начала окна
/// (< wlen <= MULTI_WINDOW, помещаются в u16), по возрастанию; возврат —
/// число собранных. Если буфер полон — возврат раньше конца окна, вызывающий
/// продолжит с последнего собранного хита.
///
/// # Safety
/// Вызывать только при поддержке AVX2 (`simd_level() == SIMD_AVX2`).
#[cfg(target_arch = "x86_64")]
#[target_feature(enable = "avx2")]
unsafe fn multi_scan_window_avx2(
    hay: &[u8],
    wlen: usize,
    scan: &ByteScan,
    out: &mut [u16; MULTI_HITS_CAP],
) -> usize {
    use std::arch::x86_64::*;

    let len = hay.len();
    let mut count = 0usize;

    if len < 32 || wlen < 32 {
        // короткий стог/последнее окно < 32Б: скалярный сбор
        for (j, &b) in hay[..wlen.min(len)].iter().enumerate() {
            if scan.contains(b) {
                out[count] = j as u16;
                count += 1;
                if count == out.len() {
                    return count;
                }
            }
        }
        return count;
    }

    let ptr = hay.as_ptr();
    let zero = _mm256_setzero_si256();
    let low_nib = _mm256_set1_epi8(0x0F);

    // Векторы множества — один раз на ОКНО (4КБ скана), не на каждый хит.
    let ctx = match *scan {
        ByteScan::Single(b) => AvxCtx {
            kind: 1,
            b: core::array::from_fn(|_| _mm256_set1_epi8(b as i8)),
            rows: zero,
            bits: zero,
        },
        ByteScan::CmpEq { bytes, k } => AvxCtx {
            kind: k,
            b: core::array::from_fn(|j| _mm256_set1_epi8(bytes[j] as i8)),
            rows: zero,
            bits: zero,
        },
        ByteScan::Bitmap { rows } => {
            let mut rl = [0u8; 32];
            rl[..16].copy_from_slice(&rows);
            rl[16..].copy_from_slice(&rows);
            let mut bl = [0u8; 32];
            for (j, slot) in bl.iter_mut().enumerate() {
                *slot = 1u8 << (j & 7);
            }
            AvxCtx {
                kind: BITMAP_KIND,
                b: [zero; 8],
                rows: _mm256_loadu_si256(rl.as_ptr() as *const __m256i),
                bits: _mm256_loadu_si256(bl.as_ptr() as *const __m256i),
            }
        }
    };

    let mut i = 0usize;
    // wlen либо кратен 32 (не-последнее окно = 4096), либо равен len
    // (последнее окно) — 32-байтные блоки никогда не пересекают границу
    // окна, поэтому проверка pos >= wlen в горячем цикле не нужна.
    while i + 32 <= wlen {
        let chunk = _mm256_loadu_si256(ptr.add(i) as *const __m256i);
        let mut m = avx_mask(chunk, &ctx, low_nib, zero);
        if m != 0 {
            loop {
                let pos = i + m.trailing_zeros() as usize;
                out[count] = pos as u16;
                count += 1;
                if count == out.len() {
                    return count;
                }
                m &= m.wrapping_sub(1);
                if m == 0 {
                    break;
                }
            }
        }
        i += 32;
    }
    // Последнее окно стога: добор перекрывающимся финальным блоком. Все
    // байты [0, i) уже проверены основным циклом; блок [len-32, len)
    // покрывает остаток — собираем только позиции >= i (дубликатов нет).
    if wlen == len && i < len && count < out.len() {
        let chunk = _mm256_loadu_si256(ptr.add(len - 32) as *const __m256i);
        let mut m = avx_mask(chunk, &ctx, low_nib, zero);
        while m != 0 {
            let pos = len - 32 + m.trailing_zeros() as usize;
            if pos >= i {
                out[count] = pos as u16;
                count += 1;
                if count == out.len() {
                    break;
                }
            }
            m &= m.wrapping_sub(1);
        }
    }
    count
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

    // --- сценарий «URL classifier» (итерация 21) ---

    /// Маркеры классификатора: 8 «горячих» (трекинг-параметры, есть в потоке)
    /// и 24 «холодных» (рекомендательные/аналитические домены, большей частью
    /// отсутствуют). Реалистичная смесь: часть маркеров попадается, часть —
    /// чистый скан до конца URL.
    pub const MARKERS_8: [&str; 8] = [
        "utm_source=",
        "utm_medium=",
        "fbclid=",
        "gclid=",
        "yclid=",
        "ref=producthunt",
        "mc_cid=",
        "_openstat=",
    ];

    pub const MARKERS_32: [&str; 32] = [
        "utm_source=",
        "utm_medium=",
        "utm_campaign=",
        "utm_term=",
        "utm_content=",
        "fbclid=",
        "gclid=",
        "yclid=",
        "ymclid=",
        "mc_cid=",
        "mc_eid=",
        "_openstat=",
        "ref=producthunt",
        "vk.target=",
        "tgid=",
        "vrn=",
        "adfox.ru",
        "adriver.ru",
        "doubleclick.net",
        "googlesyndication",
        "criteo.com",
        "taboola.com",
        "outbrain.com",
        "mgid.com",
        "admitad.com",
        "cityads.ru",
        "mediascope.net",
        "top-fwz1.mail.ru",
        "mc.yandex.ru",
        "google-analytics.com",
        "analytics.",
        "malware-download.ru",
    ];

    /// Детерминированный поток из `n` URL реалистичной формы (хосты, пути,
    /// query-строки с трекинг-параметрами и без; часть URL с кириллицей).
    /// LCG — как в тестах, без внешних зависимостей.
    pub fn url_stream(n: usize) -> Vec<String> {
        const HOSTS: [&str; 6] = [
            "https://example.com",
            "https://shop.example.org",
            "http://news.site.ru",
            "https://cdn.assets.net",
            "https://api.service.io",
            "http://login.portal.edu",
        ];
        const PATHS: [&str; 8] = [
            "/index.html",
            "/search?q=",
            "/api/v2/items?page=",
            "/images/logo.png",
            "/user/profile?id=",
            "/static/app.min.js",
            "/catalog/product/sku",
            "/articles/2026/10/zapiski",
        ];
        const QUERIES: [&str; 8] = [
            "",
            "utm_source=feed&utm_medium=referral",
            "q=поиск+firefox&lang=ru",
            "ref=producthunt&fbclid=IwAR2x",
            "id=12345&page=2&sort=desc",
            "gclid=Cj0KCQjw9&yclid=7712345",
            "mc_cid=ab12cd&utm_campaign=sale",
            "session=abcdef0123456789",
        ];
        let mut seed: u64 = 0x000C_1A55_1F1E;
        let mut next = move || {
            seed ^= seed << 13;
            seed ^= seed >> 7;
            seed ^= seed << 17;
            seed
        };
        let mut out = Vec::with_capacity(n);
        for i in 0..n {
            let h = HOSTS[(next() % 6) as usize];
            let p = PATHS[(next() % 8) as usize];
            let mut url = String::from(h);
            url.push_str(p);
            if p.ends_with('=') {
                // путь уже содержит "x=" — добавляем значение
                url.push_str(&(next() % 100_000).to_string());
            }
            let q = QUERIES[(next() % 8) as usize];
            if !q.is_empty() {
                url.push(if p.ends_with('=') { '&' } else { '?' });
                url.push_str(q);
            }
            if i % 17 == 0 {
                url.push_str("&lang=ru");
            }
            out.push(url);
        }
        out
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
        assert_eq!(
            find_substring_str("https://example.com/x", "example.com"),
            Some(8)
        );
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

    // --- мульти-игольный поиск (итерация 20) ---

    /// Эталон: минимум (старт, индекс) по N независимым find_substring —
    /// тот же контракт левосторонности, что у MultiNeedle::find.
    fn naive_multi(h: &[u8], pats: &[&[u8]]) -> Option<(usize, usize)> {
        pats.iter()
            .enumerate()
            .filter_map(|(i, p)| find_substring(h, p).map(|s| (s, i)))
            .min()
    }

    #[test]
    fn multi_matches_naive_reference() {
        // плотные буквы + редкие z/q/x/j: рост множества фильтр-байтов и
        // частые кандидаты; пустые иглы возникают при plen == 0
        const POOL: &[u8] = b"aabbczqx";
        let mut rng = Lcg(0x9E37);
        for _ in 0..4000 {
            let n_pat = 1 + rng.below(7) as usize;
            let pats: Vec<Vec<u8>> = (0..n_pat)
                .map(|_| {
                    let plen = rng.below(10) as usize;
                    (0..plen)
                        .map(|_| POOL[rng.below(POOL.len() as u64) as usize])
                        .collect()
                })
                .collect();
            let hlen = rng.below(300) as usize;
            let hay: Vec<u8> = (0..hlen)
                .map(|_| POOL[rng.below(POOL.len() as u64) as usize])
                .collect();
            let refs: Vec<&[u8]> = pats.iter().map(|p| p.as_slice()).collect();
            let got = MultiNeedle::new(&refs)
                .find(&hay)
                .map(|m| (m.start, m.needle));
            let want = naive_multi(&hay, &refs);
            assert_eq!(
                got,
                want,
                "hay={:?} pats={:?}",
                String::from_utf8_lossy(&hay),
                refs.iter()
                    .map(|p| String::from_utf8_lossy(p).into_owned())
                    .collect::<Vec<_>>()
            );
        }
    }

    #[test]
    fn multi_known_cases() {
        // ловушка левосторонности: первый хит скана ('z' @ 2) даёт иглу 1,
        // но левое совпадение — игла 0 (старт 0)
        let mn = MultiNeedle::new(&[b"bbz", b"z"]);
        assert_eq!(
            mn.find(b"bbz"),
            Some(MultiMatch {
                needle: 0,
                start: 0
            })
        );

        // префиксные иглы: минимальный старт, затем минимальный индекс
        let mn = MultiNeedle::new(&[b"abc", b"abcdef"]);
        assert_eq!(
            mn.find(b"abcdef"),
            Some(MultiMatch {
                needle: 0,
                start: 0
            })
        );
        let mn = MultiNeedle::new(&[b"abcdef", b"abc"]);
        assert_eq!(
            mn.find(b"abcdef"),
            Some(MultiMatch {
                needle: 0,
                start: 0
            })
        );

        // пустая игла совпадает в нуле
        let mn = MultiNeedle::new(&[b"x", b""]);
        assert_eq!(
            mn.find(b"xxx"),
            Some(MultiMatch {
                needle: 1,
                start: 0
            })
        );

        // дубликаты — первый индекс
        let mn = MultiNeedle::new(&[b"dup", b"dup"]);
        assert_eq!(
            mn.find(b"xxdupxx"),
            Some(MultiMatch {
                needle: 0,
                start: 2
            })
        );

        // игла длиннее стога / игла == стог / пустой стог
        let mn = MultiNeedle::new(&[b"abcd"]);
        assert_eq!(mn.find(b"abc"), None);
        let mn = MultiNeedle::new(&[b"abc"]);
        assert_eq!(
            mn.find(b"abc"),
            Some(MultiMatch {
                needle: 0,
                start: 0
            })
        );
        let mn = MultiNeedle::new(&[b"a", b"b"]);
        assert_eq!(mn.find(b""), None);

        // пустой набор
        let mn = MultiNeedle::new(&[]);
        assert_eq!(mn.find(b"abc"), None);
        assert!(mn.is_empty());
        assert_eq!(mn.len(), 0);

        // |S| == 1 (общий фильтр-байт, группа из двух игл)
        let mn = MultiNeedle::new(&[b"zz1", b"zz2"]);
        assert_eq!(
            mn.find(b"abzz2cd"),
            Some(MultiMatch {
                needle: 1,
                start: 2
            })
        );
    }

    #[test]
    fn multi_set_paths_coverage() {
        // покрытие всех веток сканера: Single / CmpEq(2..=8) / Bitmap(>8)
        let sets: [&[&[u8]]; 5] = [
            &[b"zzza", b"zzzb"], // |S| = 1: общий 'z' (правей 'a'/'b' по рангу)
            &[b"zzza", b"qqqb"], // |S| = 2
            &[b"zzza", b"qqqb", b"xxxc", b"jjjd"], // |S| = 4
            &[
                b"zzza", b"qqqb", b"xxxc", b"jjjd", b"vvve", b"kkkf", b"wwwg",
            ], // |S| = 7 -> CmpEq-7
            &[
                // 10 разных редких байт -> Bitmap (с коллизиями b/b^8:
                // Z~R, K~C, V~N встречаются в noise — проверка отсечения)
                b"za", b"ja", b"qa", b"xa", b"va", b"ka", b"wa", b"Za", b"Ja", b"Qa",
            ],
        ];
        for pats in sets {
            let mut hay = Vec::new();
            for _ in 0..3 {
                hay.extend_from_slice(b"noise-noise ");
                for p in pats.iter() {
                    hay.extend_from_slice(p);
                    hay.push(b' ');
                }
            }
            let refs: Vec<&[u8]> = pats.to_vec();
            let got = MultiNeedle::new(&refs)
                .find(&hay)
                .map(|m| (m.start, m.needle));
            assert_eq!(got, naive_multi(&hay, &refs), "pats={pats:?}");
        }
    }

    #[test]
    fn multi_bench_sets_match_naive() {
        // наборы из benches/multi.rs: все иглы сидят в хвосте документа
        let hay = sample::haystack_n(100);
        let sets: [&[&str]; 3] = [
            &["Mozilla Corporation", "горячие пути"],
            &[
                "Mozilla Corporation",
                "горячие пути",
                "https://example.com/search?q=firefox+rust&lang=ru",
                "example.com/search",
            ],
            &[
                "Mozilla Corporation",
                "горячие пути",
                "https://example.com/search?q=firefox+rust&lang=ru",
                "example.com/search",
                "firefox+rust&lang",
                "q=firefox",
                "lang=ru",
                "Corporation",
            ],
        ];
        for set in sets {
            let refs: Vec<&[u8]> = set.iter().map(|s| s.as_bytes()).collect();
            let got = MultiNeedle::new(&refs)
                .find(hay.as_bytes())
                .map(|m| (m.start, m.needle));
            assert_eq!(got, naive_multi(hay.as_bytes(), &refs), "set={set:?}");
            let (s, _) = got.expect("все иглы набора присутствуют в хвосте");
            assert!(
                s > hay.len() - 300,
                "левое совпадение должно сидеть в хвосте документа"
            );
        }
    }

    #[test]
    fn classifier_stream_parity() {
        // сценарий «URL classifier»: MultiNeedle по потоку коротких URL
        // обязан совпадать с naive-эталоном на каждом URL, оба набора маркеров
        let stream = sample::url_stream(200);
        assert!(stream.len() == 200);
        assert!(stream.iter().all(|u| !u.is_empty()));
        // в потоке есть и «чистые» URL, и URL с маркерами
        let mn8 = MultiNeedle::from_strs(&sample::MARKERS_8);
        let hits8 = stream
            .iter()
            .filter(|u| mn8.find(u.as_bytes()).is_some())
            .count();
        assert!(hits8 > 20, "маркеры должны встречаться в потоке: {hits8}");
        assert!(hits8 < 200, "часть URL должна быть чистой: {hits8}");
        for markers in [&sample::MARKERS_8[..], &sample::MARKERS_32[..]] {
            let bytes: Vec<&[u8]> = markers.iter().map(|m| m.as_bytes()).collect();
            let mn = MultiNeedle::new(&bytes);
            for url in &stream {
                let got = mn.find(url.as_bytes()).map(|m| (m.start, m.needle));
                let want = naive_multi(url.as_bytes(), &bytes);
                assert_eq!(got, want, "url={url} markers={markers:?}");
            }
        }
    }

    #[test]
    fn guard_lut_parity_decoys() {
        // Итерация 22: лево-сторожные LUT. Все иглы делят фильтр-байт '=';
        // decoy'и отличаются от игл ТОЛЬКО в сторожевых байтах (левее '=') —
        // до итерации 22 они проходили пре-фильтры до memcmp, теперь обязаны
        // отсекаться LUT, а настоящие совпадения — не теряться (паритет).
        let pats: [&[u8]; 5] = [b"uaby=", b"uabz=", b"qaby=", b"by=", b"y="];
        // decoy-набор: сдвиги в каждом из сторожевых смещений + проходные
        let hay: Vec<u8> = [
            &b"noise "[..],
            b"vaby=", // k=4: 'v' != 'u' (uaby/uabz)
            b"waby=", // k=4
            b"uacy=", // k=3: 'c' != 'a'
            b"uabx=", // k=2: 'x' != 'b'/'z'
            b"uaby=", // НАСТОЯЩЕЕ совпадение (индекс 0)
            b"qabz=", // k=4: 'q'... допустимо для qaby? nd[0]='q' -> жива
            b"qaby=", // настоящее (индекс 2)
            b"by=",   // настоящее (индекс 3; fbp=2 — LUT k=3,4 не покрывают)
            b"y=",    // настоящее (индекс 4; fbp=1)
            b"xaby=", // k=4: 'x'; k=3: 'a' ok; k=2: 'b' ok; k=1: 'y'/'z'?
            &b" tail"[..],
        ]
        .concat();
        let got = MultiNeedle::new(&pats)
            .find(&hay)
            .map(|m| (m.start, m.needle));
        assert_eq!(got, naive_multi(&hay, &pats));
        // левое совпадение: "by=" внутри "vaby=" (s=8, индекс 3) — короче
        // иглы "uaby=" (s=26) и "y=" (s=9 внутри "vaby="; старт больше)
        let (s, ni) = got.expect("совпадения обязаны быть");
        assert_eq!((s, ni), (8, 3), "левое — by= внутри vaby=");
        assert_eq!(&hay[s..s + 3], b"by=");
        // проверки у самого начала стога: p < k — LUT пропускаются
        for head in [&b"y="[..], &b"by="[..], &b"uaby="[..]] {
            let mut h2 = head.to_vec();
            h2.extend_from_slice(b"tail uaby= more");
            let got2 = MultiNeedle::new(&pats)
                .find(&h2)
                .map(|m| (m.start, m.needle));
            assert_eq!(got2, naive_multi(&h2, &pats), "head={head:?}");
            assert_eq!(got2.map(|(s, _)| s), Some(0), "совпадение в позиции 0");
        }
        // decoy-хвост без совпадений: ни один decoy не содержит
        // "by="/"y=" и не равен длинным иглам (паритет с пустым результатом)
        let decoys: Vec<u8> = [&b" "[..], b"vabx=", b"uacx=", b"wabz=", &b" "[..]].concat();
        assert_eq!(
            MultiNeedle::new(&pats).find(&decoys),
            None,
            "decoys не должны совпадать"
        );
        assert_eq!(
            MultiNeedle::new(&pats)
                .find(&decoys)
                .map(|m| (m.start, m.needle)),
            naive_multi(&decoys, &pats)
        );
    }

    #[test]
    fn guard_large_group_fallback_parity() {
        // группа из 70 игл с общим фильтр-байтом '=' — БЕЗ сторожевых LUT
        // (> GUARD_MAX_GROUP) — старый путь перебора; паритет с эталоном
        let pats: Vec<Vec<u8>> = (0..70u32)
            .map(|i| {
                let a = b'a' + (i / 26) as u8;
                let b = b'a' + (i % 26) as u8;
                vec![a, b, b'=']
            })
            .collect();
        let refs: Vec<&[u8]> = pats.iter().map(|p| p.as_slice()).collect();
        let hay: Vec<u8> = [
            &b"zz "[..],
            &pats[5][..], // "af=" — левое совпадение (индекс 5)
            b" qq ",
            &pats[0][..], // "aa=" — декой-позиция для LUT-пути тут нет
            b" noise ",
            &pats[69][..], // "cr=" (i=69: 'c'+'r')
            b" end",
        ]
        .concat();
        let got = MultiNeedle::new(&refs)
            .find(&hay)
            .map(|m| (m.start, m.needle));
        assert_eq!(got, naive_multi(&hay, &refs));
        let (s, ni) = got.expect("совпадения обязаны быть");
        assert_eq!(ni, 5, "левая игла — индекс 5");
        assert_eq!(&hay[s..s + 3], &pats[5][..]);
        // отсутствующие иглы — None
        let miss: Vec<u8> = b"aa= af= present, absent: zz=".to_vec();
        let pats2: Vec<Vec<u8>> = (0..70u32)
            .map(|i| {
                let a = b'c' + (i / 26) as u8;
                let b = b'c' + (i % 26) as u8;
                vec![a, b, b'=']
            })
            .collect();
        let refs2: Vec<&[u8]> = pats2.iter().map(|p| p.as_slice()).collect();
        assert_eq!(MultiNeedle::new(&refs2).find(&miss), None);
    }
}
