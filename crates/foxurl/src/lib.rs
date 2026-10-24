//! FoxURL — быстрый WHATWG URL-парсер для горячих путей Firefox
//! (session store, history, telemetry).
//!
//! Эталон — крейт `url` (экосистемный стандарт). Архитектура (итерации 7-9):
//! - **zero-copy**: парсинг вычисляет смещения компонентов во входной строке;
//!   ни одной аллокации на типичном (уже каноническом) URL;
//! - **отложенная нормализация**: приведение хоста к нижнему регистру,
//!   удаление dot-сегментов, percent-кодирование и элизия порта по умолчанию
//!   выполняются лениво в [`Url::as_str`] только при обнаружении «грязных»
//!   флагов; чистый вход возвращается как заимствованный срез;
//! - табы/переводы строк и обрезка C0-пробелов по краям (спецификация
//!   WHATWG) — редкий путь: одна копия строки через `Cow`.
//!
//! Итерация 10 (v0.3): табличная классификация байтов пути/запроса
//! (константные 256-байтные таблицы вместо ветвистых match), SWAR-скан
//! \t\n\r фазы 0, слитый проход parse_userinfo без ложных срабатываний
//! F_USERINFO_ENC (порт/структурное ':' больше не вынуждают пересборку
//! as_str), слитый проход parse_domain, байтовая запись write_encoded
//! (as_mut_vec, все непишущиеся байты — ASCII), стек сегментов без
//! Vec в write_path_normalized, прямая запись lowercased scheme/host.
//!
//! Ограничения v0.1 (документированы): не-ASCII хосты (IDNA/punycode) и
//! file-специфика Windows (буквы дисков) не поддерживаются — `Err`.

use std::borrow::Cow;
use std::fmt;

mod ipv6;

// ---------------------------------------------------------------------------
// Ошибки
// ---------------------------------------------------------------------------

/// Вид ошибки парсинга URL.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ErrorKind {
    /// Нет схемы (относительный URL без базы).
    RelativeWithoutBase,
    /// Пустой хост у специальной схемы (кроме file).
    EmptyHost,
    /// Порт не цифры или > 65535.
    InvalidPort,
    /// Хост распознан как IPv4, но не разбирается по грамматике.
    InvalidIpv4Address,
    /// Некорректный IPv6 в скобках.
    InvalidIpv6Address,
    /// Запрещённый символ в домене.
    InvalidDomainCharacter,
    /// Не-ASCII хост (IDNA не поддерживается в v0.1).
    IdnaError,
}

/// Ошибка парсинга URL с позицией во входе (в байтах).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Error {
    pub position: usize,
    pub kind: ErrorKind,
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "URL error at byte {}: {:?}", self.position, self.kind)
    }
}

impl std::error::Error for Error {}

// ---------------------------------------------------------------------------
// Схемы
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum SchemeKind {
    Ftp,
    File,
    Http,
    Https,
    Ws,
    Wss,
    /// Не-специальная схема (opaque-путь или "//"-authority без элизии порта).
    Opaque,
}

impl SchemeKind {
    #[inline]
    fn is_special(self) -> bool {
        !matches!(self, SchemeKind::Opaque)
    }

    #[inline]
    fn default_port(self) -> Option<u16> {
        match self {
            SchemeKind::Ftp => Some(21),
            SchemeKind::File => None,
            SchemeKind::Http | SchemeKind::Ws => Some(80),
            SchemeKind::Https | SchemeKind::Wss => Some(443),
            SchemeKind::Opaque => None,
        }
    }
}

fn scheme_kind(name_lower: &str) -> SchemeKind {
    match name_lower {
        "ftp" => SchemeKind::Ftp,
        "file" => SchemeKind::File,
        "http" => SchemeKind::Http,
        "https" => SchemeKind::Https,
        "ws" => SchemeKind::Ws,
        "wss" => SchemeKind::Wss,
        _ => SchemeKind::Opaque,
    }
}

// ---------------------------------------------------------------------------
// Флаги «грязности» (нужна пересборка при сериализации)
// ---------------------------------------------------------------------------

const F_SCHEME_LOWER: u8 = 1 << 0;
const F_HOST_LOWER: u8 = 1 << 1;
const F_PATH_NORM: u8 = 1 << 2; // dot-сегменты или backslash в пути
const F_PATH_ENC: u8 = 1 << 3;
const F_QUERY_ENC: u8 = 1 << 4;
const F_FRAG_ENC: u8 = 1 << 5;
const F_USERINFO_ENC: u8 = 1 << 6;

// ---------------------------------------------------------------------------
// Url
// ---------------------------------------------------------------------------

/// Расобранный URL. Компоненты — смещения в исходной строке (zero-copy).
///
/// Итерация по API `url::Url`: [`Url::as_str`] даёт каноническую
/// сериализацию, совместимую с `url::Url::as_str` (покрыто тестом-паритетом).
pub struct Url<'a> {
    raw: Cow<'a, str>,
    /// Смещения схемы (без ':').
    scheme: (u32, u32),
    kind: SchemeKind,
    /// Есть ли "//"-authority (для не-специальных схем).
    has_authority: bool,
    /// Смещения "user:pass" и позиция ':' (относительно raw).
    userinfo: Option<(u32, u32)>,
    userinfo_colon: Option<u32>,
    host: (u32, u32),
    /// Хост, изменённый при разборе (percent-decode / IPv4-нормализация).
    host_owned: Option<String>,
    port: Option<u16>,
    path: (u32, u32),
    query: Option<(u32, u32)>,
    fragment: Option<(u32, u32)>,
    flags: u8,
}

impl fmt::Debug for Url<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Url")
            .field("as_str", &self.as_str())
            .finish()
    }
}

/// Расобрать URL (WHATWG basic parser, подмножество — см. документацию).
pub fn parse(input: &str) -> Result<Url<'_>, Error> {
    // Фаза 0: грязь — табы/переводы строк удаляются ВЕЗДЕ, C0/пробелы
    // обрезаются по краям. Чистый вход (типичный) — zero-copy.
    // SWAR-скан \t\n\r: XOR с replicated-иглой + детекция нулевого байта
    // в 8-байтных чанках (было: побайтовый `.any()` — 6.2% профиля).
    let dirty_ws = has_dirty_ws(input.as_bytes());
    let raw: Cow<'_, str> = if dirty_ws {
        let mut s = String::with_capacity(input.len());
        for c in input.chars() {
            if !matches!(c, '\t' | '\n' | '\r') {
                s.push(c);
            }
        }
        Cow::Owned(s)
    } else {
        Cow::Borrowed(input)
    };
    let raw: Cow<'_, str> = match trim_c0(&raw) {
        None => raw,
        Some(t) => Cow::Owned(t),
    };
    parse_raw(raw)
}

/// Обрезка C0-управляющих и пробелов по краям; None — обрезать нечего.
fn trim_c0(s: &str) -> Option<String> {
    let b = s.as_bytes();
    let mut start = 0;
    let mut end = b.len();
    while start < end && b[start] <= b' ' {
        start += 1;
    }
    while end > start && b[end - 1] <= b' ' {
        end -= 1;
    }
    if start == 0 && end == b.len() {
        None
    } else {
        Some(String::from_utf8_lossy(&b[start..end]).into_owned())
    }
}

// --- SWAR-скан «грязных» пробелов (\t \n \r) ---

/// Есть ли во входе \t / \n / \r (фаза 0 WHATWG). 8 байт за итерацию:
/// XOR каждой иглы с чанком, затем детекция нулевого байта стандартным
/// трюком (v - 0x01.. & !v & 0x80..). Хвост — побайтово.
fn has_dirty_ws(bytes: &[u8]) -> bool {
    const ONES: u64 = 0x0101_0101_0101_0101;
    const HI: u64 = 0x8080_8080_8080_8080;
    const TAB: u64 = 0x0909_0909_0909_0909;
    const LF: u64 = 0x0A0A_0A0A_0A0A_0A0A;
    const CR: u64 = 0x0D0D_0D0D_0D0D_0D0D;

    let (chunks, tail) = bytes.as_chunks::<8>();
    for c in chunks {
        let x = u64::from_le_bytes(*c);
        let t = x ^ TAB;
        let n = x ^ LF;
        let r = x ^ CR;
        let hit = (t.wrapping_sub(ONES) & !t & HI)
            | (n.wrapping_sub(ONES) & !n & HI)
            | (r.wrapping_sub(ONES) & !r & HI);
        if hit != 0 {
            return true;
        }
    }
    tail.iter().any(|&c| matches!(c, b'\t' | b'\n' | b'\r'))
}

/// SWAR-поиск первого вхождения байта (8 байт/итерацию: XOR + детекция
/// нулевого байта). `core::slice::memchr` не стабилизирован — свой.
/// Для коротких спанов (хост, userinfo, IPv6) — быстрее побайтового
/// position с bounds-check на каждый байт.
fn find_byte(needle: u8, hay: &[u8]) -> Option<usize> {
    const ONES: u64 = 0x0101_0101_0101_0101;
    const HI: u64 = 0x8080_8080_8080_8080;
    let n = u64::from(needle) * ONES;
    let mut i = 0;
    while i + 8 <= hay.len() {
        let x = u64::from_le_bytes(hay[i..i + 8].try_into().unwrap());
        let m = x ^ n;
        let z = m.wrapping_sub(ONES) & !m & HI;
        if z != 0 {
            return Some(i + (z.trailing_zeros() >> 3) as usize);
        }
        i += 8;
    }
    hay[i..].iter().position(|&c| c == needle).map(|p| i + p)
}

/// SWAR-поиск последнего вхождения байта (с конца).
fn rfind_byte(needle: u8, hay: &[u8]) -> Option<usize> {
    const ONES: u64 = 0x0101_0101_0101_0101;
    const HI: u64 = 0x8080_8080_8080_8080;
    let n = u64::from(needle) * ONES;
    let mut end = hay.len();
    while end >= 8 {
        let base = end - 8;
        let x = u64::from_le_bytes(hay[base..end].try_into().unwrap());
        let m = x ^ n;
        let z = m.wrapping_sub(ONES) & !m & HI;
        if z != 0 {
            // бит 7+8k соответствует байту k чанка: lz = 56 - 8k
            return Some(base + 7 - (z.leading_zeros() >> 3) as usize);
        }
        end = base;
    }
    hay[..end].iter().rposition(|&c| c == needle)
}

/// Userinfo в authority-диапазоне [start..auth_end): позиция '@'
/// (последний), структурный ':' (ПЕРВЫЙ — отделяет user от pass) и
/// необходимость кодирования — всё в одном проходе по userinfo-спану.
///
/// Кодирование проверяется ТОЛЬКО по user/pass частям (структурный ':'
/// исключён; ':' в пароле — кодируется по WHATWG). Регион хоста после
/// '@' НЕ сканируется — прежняя версия включала его через chain(...),
/// из-за чего F_USERINFO_ENC ложно взводился на порту (":") и
/// структурном ':', вынуждаяOwned-пересборку в as_str.
fn parse_userinfo(
    bytes: &[u8],
    start: usize,
    auth_end: usize,
) -> (Option<(u32, u32)>, Option<u32>, bool) {
    let at = match rfind_byte(b'@', &bytes[start..auth_end]) {
        Some(p) => start + p,
        None => return (None, None, false),
    };
    let mut colon: Option<usize> = None;
    let mut enc = false;
    for (k, &c) in bytes[start..at].iter().enumerate() {
        if c == b':' {
            if colon.is_some() {
                // второй ':' — уже внутри пароля, кодируется
                enc = true;
                break;
            }
            colon = Some(start + k);
        } else if userinfo_needs_enc(c) {
            enc = true;
            if colon.is_some() {
                break;
            }
            // colon ещё не найден — скан продолжается до первого ':'
        }
    }
    (
        Some((start as u32, at as u32)),
        colon.map(|c| c as u32),
        enc,
    )
}

fn parse_raw(raw: Cow<'_, str>) -> Result<Url<'_>, Error> {
    let bytes = raw.as_bytes();
    let len = bytes.len();
    let mut flags = 0u8;

    // --- схема: [a-zA-Z][a-zA-Z0-9+.-]* ':'
    if bytes.first().is_none_or(|c| !c.is_ascii_alphabetic()) {
        return Err(Error {
            position: 0,
            kind: ErrorKind::RelativeWithoutBase,
        });
    }
    let mut i = 1;
    while i < len && bytes[i] != b':' {
        let c = bytes[i];
        if !(c.is_ascii_alphanumeric() || matches!(c, b'+' | b'-' | b'.')) {
            return Err(Error {
                position: i,
                kind: ErrorKind::RelativeWithoutBase,
            });
        }
        i += 1;
    }
    if i == len {
        return Err(Error {
            position: len,
            kind: ErrorKind::RelativeWithoutBase,
        });
    }
    let scheme = (0u32, i as u32);
    let scheme_lower_name: Cow<'_, str> = {
        let s = &raw[..i];
        if s.bytes().any(|c| c.is_ascii_uppercase()) {
            flags |= F_SCHEME_LOWER;
            Cow::Owned(s.to_ascii_lowercase())
        } else {
            Cow::Borrowed(s)
        }
    };
    let kind = scheme_kind(&scheme_lower_name);
    i += 1; // ':'

    let mut url = Url {
        raw,
        scheme,
        kind,
        has_authority: false,
        userinfo: None,
        userinfo_colon: None,
        host: (0, 0),
        host_owned: None,
        port: None,
        path: (0, 0),
        query: None,
        fragment: None,
        flags,
    };

    if kind.is_special() {
        // Все '/' и '\' поглощаются (special authority slashes + ignore).
        let bts = url.raw.as_bytes();
        while i < len && matches!(bts[i], b'/' | b'\\') {
            i += 1;
        }
        url.has_authority = true;
        url.parse_authority_and_path(i)?;
    } else if url.raw.as_bytes().get(i) == Some(&b'/')
        && url.raw.as_bytes().get(i + 1) == Some(&b'/')
    {
        // Не-специальная схема с "//"-authority.
        url.has_authority = true;
        url.parse_authority_and_path(i + 2)?;
    } else {
        url.parse_opaque_path(i)?;
    }
    Ok(url)
}

impl<'a> Url<'a> {
    /// Authority до '/', '\\', '?', '#'; затем путь/запрос/фрагмент.
    fn parse_authority_and_path(&mut self, start: usize) -> Result<(), Error> {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let special = self.kind.is_special();
        let mut i = start;
        while i < len {
            let c = bytes[i];
            if matches!(c, b'/' | b'?' | b'#') || (special && c == b'\\') {
                break;
            }
            i += 1;
        }
        let auth_end = i;

        // userinfo: последний '@' в authority; структурный ':' и
        // необходимость кодирования — в ОДНОМ проходе по userinfo-
        // диапазону (скан региона хоста из прежней версии удалён —
        // он ложно взводил F_USERINFO_ENC через порт ':' и структурный
        // ':' пары user:pass, вынуждая полную пересборку as_str).
        let (userinfo, ui_colon, ui_enc) = parse_userinfo(bytes, start, auth_end);
        self.userinfo = userinfo;
        self.userinfo_colon = ui_colon;
        if ui_enc {
            self.flags |= F_USERINFO_ENC;
        }
        let host_span_start = match userinfo {
            Some((_, at)) => at as usize + 1,
            None => start,
        };

        self.parse_host_and_port(host_span_start, auth_end)?;

        // --- путь/запрос/фрагмент
        self.parse_path_query_fragment(auth_end)?;
        // Детекция dot-сегментов/обратных слэшей слита в скан пути
        // (parse_path_query_fragment) — отдельный проход удалён.
        Ok(())
    }

    /// Хост и порт внутри authority-диапазона.
    fn parse_host_and_port(&mut self, from: usize, end: usize) -> Result<(), Error> {
        let bytes = self.raw.as_bytes();
        let mut host_end = end;
        let mut port_span: (usize, usize) = (end, end);
        let mut has_port = false;

        if bytes.get(from) == Some(&b'[') {
            // --- IPv6
            let close = find_byte(b']', &bytes[from..end]).ok_or(Error {
                position: end,
                kind: ErrorKind::InvalidIpv6Address,
            })? + from;
            let inner = &self.raw[from + 1..close];
            // WHATWG-парсер без std (модуль ipv6): std Display печатает
            // IPv4-mapped в смешанной форме RFC 5952 (`::ffff:10.0.0.1`),
            // а WHATWG/`url` — чистой hex (`::ffff:a00:1`); плюс здесь
            // сериализация в стековый буфер — ноль аллокаций на каноническом
            // входе. Owned-хост хранится В СКОБКАХ (как в `url`).
            match ipv6::parse(inner.as_bytes()) {
                Some(pieces) => {
                    let mut canon = [0u8; ipv6::CANON_BUF];
                    let n = ipv6::serialize(&pieces, &mut canon);
                    if &canon[..n] != inner.as_bytes() {
                        let mut s = String::with_capacity(n + 2);
                        s.push('[');
                        s.push_str(
                            std::str::from_utf8(&canon[..n])
                                .expect("каноническая IPv6-форма — ASCII"),
                        );
                        s.push(']');
                        self.host_owned = Some(s);
                    }
                    // канонический вход: заимствованный хост from..=close
                }
                None => {
                    return Err(Error {
                        position: from + 1,
                        kind: ErrorKind::InvalidIpv6Address,
                    })
                }
            }
            host_end = close + 1;
            if host_end < end {
                if bytes[host_end] != b':' {
                    return Err(Error {
                        position: host_end,
                        kind: ErrorKind::InvalidIpv6Address,
                    });
                }
                has_port = true;
                port_span = (host_end + 1, end);
            }
        } else {
            // --- домен или IPv4 (memchr вместо побайтового position)
            if let Some(colon) = find_byte(b':', &bytes[from..end]) {
                host_end = from + colon;
                has_port = true;
                port_span = (host_end + 1, end);
            }
            self.parse_domain(from, host_end)?;
        }

        // --- порт
        if has_port {
            let pt = &self.raw[port_span.0..port_span.1];
            if pt.is_empty() {
                self.port = None;
            } else {
                let mut p: u32 = 0;
                for c in pt.bytes() {
                    if !c.is_ascii_digit() {
                        return Err(Error {
                            position: port_span.0,
                            kind: ErrorKind::InvalidPort,
                        });
                    }
                    p = p * 10 + u32::from(c - b'0');
                    if p > 65535 {
                        return Err(Error {
                            position: port_span.0,
                            kind: ErrorKind::InvalidPort,
                        });
                    }
                }
                self.port = Some(p as u16);
            }
        }

        // Пустой хост: специальная схема кроме file — ошибка.
        if host_end == from && self.kind.is_special() && self.kind != SchemeKind::File {
            return Err(Error {
                position: from,
                kind: ErrorKind::EmptyHost,
            });
        }
        self.host = (from as u32, host_end as u32);
        Ok(())
    }

    /// Домен: percent-decode при наличии '%', запрет символов,
    /// детекция IPv4 (ends-in-a-number), флаг нижнего регистра.
    fn parse_domain(&mut self, from: usize, end: usize) -> Result<(), Error> {
        let raw_bytes = self.raw.as_bytes();
        let span = &raw_bytes[from..end];

        // percent-decode (редкий путь)
        let decoded: Vec<u8>;
        let host_bytes: &[u8] = if span.contains(&b'%') {
            decoded = percent_decode(span).ok_or(Error {
                position: from,
                kind: ErrorKind::InvalidDomainCharacter,
            })?;
            &decoded
        } else {
            span
        };

        // ОДИН проход вместо трёх (было: цикл запретов + отдельный
        // .any(is_ascii_uppercase) + contains('%')): не-ASCII и запрещённые
        // байты — ранний выход, верхний регистр — накопление флага.
        let mut has_upper = false;
        for &c in host_bytes {
            if c >= 0x80 {
                return Err(Error {
                    position: from,
                    kind: ErrorKind::IdnaError,
                });
            }
            if is_forbidden_host_byte(c) {
                return Err(Error {
                    position: from,
                    kind: ErrorKind::InvalidDomainCharacter,
                });
            }
            has_upper |= c.is_ascii_uppercase();
        }

        // ends-in-a-number -> IPv4-парсер
        if ends_in_a_number(host_bytes) {
            let dotted = ipv4_serialize(host_bytes).ok_or(Error {
                position: from,
                kind: ErrorKind::InvalidIpv4Address,
            })?;
            if host_bytes != dotted.as_bytes() {
                self.host_owned = Some(dotted);
            }
            return Ok(());
        }

        if has_upper {
            self.flags |= F_HOST_LOWER;
        }
        if host_bytes != span {
            // был percent-decode — результат отличен от raw
            self.host_owned = Some(String::from_utf8_lossy(host_bytes).to_ascii_lowercase());
            self.flags &= !F_HOST_LOWER;
        }
        Ok(())
    }

    /// Путь (специальная схема или "//"-authority не-специальной),
    /// затем запрос и фрагмент. Скан — по константной таблице
    /// классификации (одна загрузка вместо ветвистого match):
    /// обычные байты дают t == 0 — самый предсказуемый путь.
    fn parse_path_query_fragment(&mut self, start: usize) -> Result<(), Error> {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let special = self.kind.is_special();
        let table: &[u8; 256] = if special {
            &PATH_TBL_SPECIAL
        } else {
            &PATH_TBL_GENERIC
        };
        let mut i = start;

        let path_start = i;
        let mut path_end = i;
        while i < len {
            let t = table[bytes[i] as usize];
            if t == 0 {
                i += 1;
                path_end = i;
                continue;
            }
            if t & (T_QUERY | T_HASH) != 0 {
                self.path = (path_start as u32, path_end as u32);
                if t & T_HASH != 0 {
                    self.parse_fragment(i + 1);
                } else {
                    self.parse_query(i + 1, special);
                }
                return Ok(());
            }
            // младшие биты t — сами F_PATH_NORM / F_PATH_ENC
            self.flags |= t;
            i += 1;
            path_end = i;
        }
        self.path = (path_start as u32, path_end as u32);
        Ok(())
    }

    /// Запрос (после '?') до '#' или конца входа; затем фрагмент.
    /// Флаги аккумулируются в локальной переменной: запись self.flags
    /// на КАЖДЫЙ байт (как в первой попытке v0.3) — это RMW через память
    /// и регресс длинных запросов (бенч #8 +11%).
    fn parse_query(&mut self, start: usize, special: bool) {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let table: &[u8; 256] = if special {
            &QUERY_TBL_SPECIAL
        } else {
            &QUERY_TBL_GENERIC
        };
        let mut i = start;
        let mut acc = 0u8;
        while i < len {
            let t = table[bytes[i] as usize];
            if t & T_HASH != 0 {
                break;
            }
            acc |= t; // F_QUERY_ENC в младших битах
            i += 1;
        }
        self.flags |= acc;
        self.query = Some((start as u32, i as u32));
        if i < len {
            self.parse_fragment(i + 1);
        }
    }

    fn parse_fragment(&mut self, start: usize) {
        let bytes = self.raw.as_bytes();
        let mut i = start;
        let len = bytes.len();
        let mut dirty = false;
        while i < len {
            if fragment_needs_enc(bytes[i]) {
                dirty = true;
            }
            i += 1;
        }
        if dirty {
            self.flags |= F_FRAG_ENC;
        }
        self.fragment = Some((start as u32, len as u32));
    }

    /// Opaque-путь не-специальной схемы (до '?' или '#'). Табличный скан,
    /// маскированный до F_PATH_ENC (NORM-биты '.'/'%' в opaque не нужны:
    /// флаг читается только у спец-схем, а лишний флаг ломал бы
    /// zero-copy fast-path as_str для mailto и т.п.).
    fn parse_opaque_path(&mut self, start: usize) -> Result<(), Error> {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let mut i = start;
        let mut dirty = false;
        while i < len {
            let t = PATH_TBL_GENERIC[bytes[i] as usize];
            if t & (T_QUERY | T_HASH) != 0 {
                break;
            }
            dirty |= t & F_PATH_ENC != 0;
            i += 1;
        }
        self.path = (start as u32, i as u32);
        if dirty {
            self.flags |= F_PATH_ENC;
        }
        if bytes.get(i) == Some(&b'?') {
            self.parse_query(i + 1, false);
            return Ok(());
        }
        if i < len && bytes[i] == b'#' {
            self.parse_fragment(i + 1);
        }
        Ok(())
    }
}

// ---------------------------------------------------------------------------
// Классификаторы символов (percent-encode наборы WHATWG)
// ---------------------------------------------------------------------------

#[inline]
const fn path_needs_enc(c: u8) -> bool {
    !(c >= 0x20 && c <= 0x7E)
        || matches!(
            c,
            b' ' | b'"' | b'#' | b'<' | b'>' | b'?' | b'`' | b'{' | b'}'
        )
}

#[inline]
const fn query_needs_enc(c: u8, special: bool) -> bool {
    !(c >= 0x20 && c <= 0x7E)
        || matches!(c, b' ' | b'"' | b'#' | b'<' | b'>')
        || (special && c == b'\'')
}

#[inline]
fn fragment_needs_enc(c: u8) -> bool {
    !(0x20..=0x7E).contains(&c) || matches!(c, b' ' | b'"' | b'<' | b'>' | b'`')
}

// ---------------------------------------------------------------------------
// Таблицы классификации байтов пути/запроса (v0.3)
// ---------------------------------------------------------------------------

// Управляющие биты таблиц (старшие — управление, младшие — сами флаги
// Url: F_PATH_NORM=4, F_PATH_ENC=8, F_QUERY_ENC=16 — они OR-ятся прямо
// в self.flags без перекодировки).
const T_QUERY: u8 = 1 << 6; // '?' завершает путь
const T_HASH: u8 = 1 << 7; // '#' завершает путь/запрос

/// Таблица классификации байтов пути. '\\' даёт NORM только у спец-схем;
/// '.'/'%' — всегда (флаг NORM читается только у спец-схем — для opaque
/// безвреден, как и до v0.3).
const fn build_path_table(special: bool) -> [u8; 256] {
    let mut t = [0u8; 256];
    let mut c = 0usize;
    while c < 256 {
        let b = c as u8;
        let mut v = 0u8;
        if path_needs_enc(b) {
            v |= F_PATH_ENC;
        }
        if matches!(b, b'.' | b'%') || (special && b == b'\\') {
            v |= F_PATH_NORM;
        }
        if b == b'?' {
            v |= T_QUERY;
        }
        if b == b'#' {
            v |= T_HASH;
        }
        t[c] = v;
        c += 1;
    }
    t
}

/// Таблица классификации байтов запроса: F_QUERY_ENC + T_HASH.
/// '\'' кодируется только у спец-схем.
const fn build_query_table(special: bool) -> [u8; 256] {
    let mut t = [0u8; 256];
    let mut c = 0usize;
    while c < 256 {
        let b = c as u8;
        let mut v = 0u8;
        if query_needs_enc(b, special) {
            v |= F_QUERY_ENC;
        }
        if b == b'#' {
            v |= T_HASH;
        }
        t[c] = v;
        c += 1;
    }
    t
}

static PATH_TBL_SPECIAL: [u8; 256] = build_path_table(true);
static PATH_TBL_GENERIC: [u8; 256] = build_path_table(false);
static QUERY_TBL_SPECIAL: [u8; 256] = build_query_table(true);
static QUERY_TBL_GENERIC: [u8; 256] = build_query_table(false);

#[inline]
fn userinfo_needs_enc(c: u8) -> bool {
    path_needs_enc(c)
        || matches!(
            c,
            b'/' | b':' | b';' | b'=' | b'@' | b'[' | b'\\' | b']' | b'^' | b'|'
        )
}

/// Запрещённые байты домена (forbidden host code points).
#[inline]
fn is_forbidden_host_byte(c: u8) -> bool {
    matches!(
        c,
        0x00 | b'\t'
            | b'\n'
            | b'\r'
            | b' '
            | b'#'
            | b'/'
            | b':'
            | b'<'
            | b'>'
            | b'?'
            | b'@'
            | b'['
            | b'\\'
            | b']'
            | b'^'
            | b'|'
            | b'%'
    )
}

/// percent-decode; None — обрыв на неполной последовательности.
fn percent_decode(bytes: &[u8]) -> Option<Vec<u8>> {
    let mut out = Vec::with_capacity(bytes.len());
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'%' {
            let h = bytes.get(i + 1).copied()?;
            let l = bytes.get(i + 2).copied()?;
            let hv = (h as char).to_digit(16)?;
            let lv = (l as char).to_digit(16)?;
            out.push((hv * 16 + lv) as u8);
            i += 3;
        } else {
            out.push(bytes[i]);
            i += 1;
        }
    }
    Some(out)
}

/// Ends-in-a-number (WHATWG): последний непустой элемент — число
/// (десятичное / hex 0x / octal с ведущим нулём).
fn ends_in_a_number(host: &[u8]) -> bool {
    // Последняя непустая часть (хвостовая '.' удаляет ОДНУ пустую часть) —
    // БЕЗ Vec<&[u8]>: скан с конца. Прежний split().collect() аллоцировал
    // Vec на КАЖДОМ доменном URL (3.3% профиля + давление malloc).
    let mut end = host.len();
    if end >= 2 && host[end - 1] == b'.' {
        end -= 1;
    }
    if end == 0 {
        return false; // "" / "." — частей не осталось
    }
    let last = match host[..end].iter().rposition(|&c| c == b'.') {
        Some(i) => &host[i + 1..end],
        None => host[..end].as_ref(),
    };
    if last.is_empty() {
        return false;
    }
    if last.iter().all(|c| c.is_ascii_digit()) {
        return true;
    }
    if last.len() >= 2 && (last[..2] == *b"0x" || last[..2] == *b"0X") {
        return last[2..].iter().all(|c| c.is_ascii_hexdigit());
    }
    if last.len() >= 2 && last[0] == b'0' {
        return last[1..].iter().all(|c| c.is_ascii_digit());
    }
    false
}

/// IPv4-парсер WHATWG: 1-4 части (dec/hex/octal), сериализация a.b.c.d.
fn ipv4_serialize(host: &[u8]) -> Option<String> {
    let mut parts: Vec<&[u8]> = host.split(|&c| c == b'.').collect();
    if parts.len() >= 2 && parts.last().is_some_and(|s| s.is_empty()) {
        parts.pop();
    }
    if parts.is_empty() || parts.len() > 4 {
        return None;
    }
    let mut numbers = [0u64; 4];
    for (k, part) in parts.iter().enumerate() {
        if part.is_empty() {
            return None;
        }
        let n = parse_ipv4_number(part)?;
        if k < parts.len() - 1 && n > 255 {
            return None;
        }
        numbers[k] = n;
    }
    let n = parts.len();
    let max_last = 256u64.pow(5 - n as u32) - 1;
    if numbers[n - 1] > max_last {
        return None;
    }
    let mut ipv4: u64 = numbers[n - 1];
    for (k, &num) in numbers.iter().enumerate().take(n - 1) {
        ipv4 += num * 256u64.pow(3 - k as u32);
    }
    Some(format!(
        "{}.{}.{}.{}",
        (ipv4 >> 24) & 0xFF,
        (ipv4 >> 16) & 0xFF,
        (ipv4 >> 8) & 0xFF,
        ipv4 & 0xFF
    ))
}

fn parse_ipv4_number(part: &[u8]) -> Option<u64> {
    if part.is_empty() {
        return None;
    }
    if part.len() >= 2 && (part[..2] == *b"0x" || part[..2] == *b"0X") {
        return u64::from_str_radix(std::str::from_utf8(&part[2..]).ok()?, 16).ok();
    }
    if part.len() >= 2 && part[0] == b'0' {
        return u64::from_str_radix(std::str::from_utf8(&part[1..]).ok()?, 8).ok();
    }
    std::str::from_utf8(part).ok()?.parse::<u64>().ok()
}

// ---------------------------------------------------------------------------
// Сериализация (ленивая нормализация)
// ---------------------------------------------------------------------------

impl<'a> Url<'a> {
    /// Каноническая сериализация (совместима с `url::Url::as_str`).
    /// Чистый вход без флагов — заимствованный срез (ноль аллокаций).
    pub fn as_str(&self) -> Cow<'_, str> {
        // Элизия порта по умолчанию и пустой путь спец-схем ("/") требуют
        // пересборки даже при чистых флагах.
        let port_elided = self
            .port
            .is_some_and(|p| Some(p) == self.kind.default_port());
        let special_empty_path =
            self.has_authority && self.kind.is_special() && self.path.0 == self.path.1;
        if self.flags == 0 && self.host_owned.is_none() && !port_elided && !special_empty_path {
            return Cow::Borrowed(self.raw.as_ref());
        }
        let mut out = String::with_capacity(self.raw.len() + 8);
        let raw = self.raw.as_ref();

        // схема (в нижнем регистре при необходимости; схема — ASCII по
        // грамматике [a-zA-Z0-9+.-], пишем байтами без промежуточной String)
        let (ss, se) = (self.scheme.0 as usize, self.scheme.1 as usize);
        if self.flags & F_SCHEME_LOWER != 0 {
            // SAFETY: только ASCII-байты (см. write_encoded)
            unsafe { out.as_mut_vec() }.extend(raw[ss..se].bytes().map(|c| c.to_ascii_lowercase()));
        } else {
            out.push_str(&raw[ss..se]);
        }
        out.push(':');

        if self.has_authority {
            out.push_str("//");

            // userinfo: структурный ':' не кодируется, внутренние ':' пароля — да
            if let Some((us, ue)) = self.userinfo {
                let (us, ue) = (us as usize, ue as usize);
                let bytes = raw.as_bytes();
                match self.userinfo_colon {
                    Some(c) => {
                        let c = c as usize;
                        let (user, pass) = (&bytes[us..c], &bytes[c + 1..ue]);
                        if self.flags & F_USERINFO_ENC != 0 {
                            write_encoded(&mut out, user, userinfo_needs_enc);
                            out.push(':');
                            write_encoded(&mut out, pass, userinfo_needs_enc);
                        } else {
                            out.push_str(raw.get(us..c).unwrap_or(""));
                            out.push(':');
                            out.push_str(raw.get(c + 1..ue).unwrap_or(""));
                        }
                    }
                    None => {
                        if self.flags & F_USERINFO_ENC != 0 {
                            write_encoded(&mut out, &bytes[us..ue], userinfo_needs_enc);
                        } else {
                            out.push_str(&raw[us..ue]);
                        }
                    }
                }
                out.push('@');
            }

            // хост (owned / lowercased / raw). Хост — чистый ASCII
            // (parse_domain отвергает >= 0x80), пишем байтами без
            // промежуточной String (был аллок на каждый Upper-URL)
            match &self.host_owned {
                Some(h) => out.push_str(h),
                None => {
                    let (hs, he) = (self.host.0 as usize, self.host.1 as usize);
                    if self.flags & F_HOST_LOWER != 0 {
                        // SAFETY: только ASCII-байты (см. write_encoded)
                        unsafe { out.as_mut_vec() }.extend(
                            raw.as_bytes()[hs..he]
                                .iter()
                                .map(|&c| c.to_ascii_lowercase()),
                        );
                    } else {
                        out.push_str(&raw[hs..he]);
                    }
                }
            }

            // порт: элизия порта по умолчанию
            if let Some(p) = self.port {
                if Some(p) != self.kind.default_port() {
                    out.push(':');
                    out.push_str(&p.to_string());
                }
            }

            // путь
            let (ps, pe) = (self.path.0 as usize, self.path.1 as usize);
            let path = &raw.as_bytes()[ps..pe];
            if self.kind.is_special() {
                if path.is_empty() {
                    out.push('/');
                } else if self.flags & (F_PATH_NORM | F_PATH_ENC) != 0 {
                    // нормализация пишется прямо в out (без промежуточного buf)
                    write_path_normalized(&mut out, path, true);
                } else {
                    out.push_str(&raw[ps..pe]);
                }
            } else if self.flags & F_PATH_ENC != 0 {
                write_encoded(&mut out, path, path_needs_enc);
            } else {
                out.push_str(&raw[ps..pe]);
            }
        } else {
            // opaque-путь
            let (ps, pe) = (self.path.0 as usize, self.path.1 as usize);
            let path = &raw.as_bytes()[ps..pe];
            if self.flags & F_PATH_ENC != 0 {
                write_encoded(&mut out, path, path_needs_enc);
            } else {
                out.push_str(&raw[ps..pe]);
            }
        }

        // запрос
        if let Some((qs, qe)) = self.query {
            out.push('?');
            let (qs, qe) = (qs as usize, qe as usize);
            let q = &raw.as_bytes()[qs..qe];
            if self.flags & F_QUERY_ENC != 0 {
                let special = self.kind.is_special();
                write_encoded(&mut out, q, |c| query_needs_enc(c, special));
            } else {
                out.push_str(&raw[qs..qe]);
            }
        }

        // фрагмент
        if let Some((fs, fe)) = self.fragment {
            out.push('#');
            let (fs, fe) = (fs as usize, fe as usize);
            let f = &raw.as_bytes()[fs..fe];
            if self.flags & F_FRAG_ENC != 0 {
                write_encoded(&mut out, f, fragment_needs_enc);
            } else {
                out.push_str(&raw[fs..fe]);
            }
        }

        Cow::Owned(out)
    }

    /// Схема (нижний регистр).
    pub fn scheme(&self) -> Cow<'_, str> {
        let (ss, se) = (self.scheme.0 as usize, self.scheme.1 as usize);
        let s = &self.raw[ss..se];
        if self.flags & F_SCHEME_LOWER != 0 {
            Cow::Owned(s.to_ascii_lowercase())
        } else {
            Cow::Borrowed(s)
        }
    }

    /// Хост (без userinfo/порта), либо None у без-authority URL.
    pub fn host_str(&self) -> Option<Cow<'_, str>> {
        if !self.has_authority {
            return None;
        }
        if let Some(h) = &self.host_owned {
            return Some(Cow::Borrowed(h.as_str()));
        }
        let (hs, he) = (self.host.0 as usize, self.host.1 as usize);
        let s = &self.raw[hs..he];
        // IPv6 — в скобках
        Some(Cow::Borrowed(s))
    }

    /// Порт или None.
    pub fn port(&self) -> Option<u16> {
        self.port
    }

    /// Порт или порт схемы по умолчанию.
    pub fn port_or_known_default(&self) -> Option<u16> {
        self.port.or_else(|| self.kind.default_port())
    }

    /// Путь: для специальных схем пустой путь — "/", dot-сегменты нормализованы.
    pub fn path(&self) -> Cow<'_, str> {
        let (ps, pe) = (self.path.0 as usize, self.path.1 as usize);
        let p = &self.raw[ps..pe];
        if self.kind.is_special() {
            if p.is_empty() {
                return Cow::Borrowed("/");
            }
            if self.flags & (F_PATH_NORM | F_PATH_ENC) != 0 {
                let mut buf = String::new();
                write_path_normalized(&mut buf, p.as_bytes(), true);
                return Cow::Owned(buf);
            }
        }
        Cow::Borrowed(p)
    }

    /// Запрос без '?' или None.
    pub fn query(&self) -> Option<&str> {
        self.query
            .map(|(qs, qe)| &self.raw[qs as usize..qe as usize])
    }

    /// Фрагмент без '#' или None.
    pub fn fragment(&self) -> Option<&str> {
        self.fragment
            .map(|(fs, fe)| &self.raw[fs as usize..fe as usize])
    }

    /// Имя пользователя ("" если userinfo нет).
    ///
    /// Расхождение с `url::Url::username` (документировано): url возвращает
    /// канонический percent-кодированный вид из сериализации ("a%40b"),
    /// здесь — сырой спан входа ("a@b"). Канонический вид даёт [`Url::as_str`].
    pub fn username(&self) -> &str {
        match self.userinfo {
            Some((us, ue)) => {
                let (us, ue) = (us as usize, ue as usize);
                match self.userinfo_colon {
                    Some(c) => &self.raw[us..c as usize],
                    None => &self.raw[us..ue],
                }
            }
            None => "",
        }
    }

    /// Пароль (Some только если ':' присутствует в userinfo). Сырой спан
    /// входа (см. [`Url::username`] — расхождение с url для кодируемых
    /// байтов); канонический вид — [`Url::as_str`].
    pub fn password(&self) -> Option<&str> {
        match (self.userinfo, self.userinfo_colon) {
            (Some((_, ue)), Some(c)) => Some(&self.raw[c as usize + 1..ue as usize]),
            _ => None,
        }
    }
}

/// percent-кодирование в `out` по предикату набора (hex в верхнем регистре).
/// Запись — сырыми байтами через `as_mut_vec` (было: `out.push(c as char)`
/// с UTF-8-механикой и проверкой ёмкости на каждый байт — 8.3%+1.4% профиля).
///
/// SAFETY: пишутся только ASCII-байты. Все предикаты (`path_`, `query_`,
/// `fragment_`, `userinfo_needs_enc`) при needs(c) == false допускают
/// только байты 0x20..=0x7E (не-ASCII и C0 кодируются в %XX), а байты
/// "%XY" и HEX — ASCII. UTF-8-валидность String не нарушается.
fn write_encoded(out: &mut String, bytes: &[u8], needs: impl Fn(u8) -> bool) {
    const HEX: &[u8; 16] = b"0123456789ABCDEF";
    let v = unsafe { out.as_mut_vec() };
    v.reserve(bytes.len());
    for &c in bytes {
        if needs(c) {
            v.extend_from_slice(&[b'%', HEX[(c >> 4) as usize], HEX[(c & 0xF) as usize]]);
        } else {
            v.push(c);
        }
    }
}

/// Удаление dot-сегментов + percent-кодирование пути.
/// `split_backslash`: для специальных схем '\' — разделитель.
fn write_path_normalized(out: &mut String, path: &[u8], split_backslash: bool) {
    let is_sep = |c: u8| c == b'/' || (split_backslash && c == b'\\');
    // Стек позиций начала сегментов в out для отката на ".." (truncate
    // вместо pop из Vec<&[u8]>). Фиксированный массив на стеке; пути
    // глубже 15 сегментов — редкий путь, spill уходит в Vec (LIFO).
    // Раньше: Vec сегментов + Vec norm + Vec от to_ascii_lowercase()
    // НА КАЖДЫЙ сегмент; с итерации 9 остался один Vec — теперь и он
    // не нужен на типичных путях.
    const STACK_CAP: usize = 16;
    let mut stack = [0usize; STACK_CAP];
    let mut depth = 0usize;
    let mut spill: Vec<usize> = Vec::new();
    let n = path.len();
    let start = usize::from(n > 0 && is_sep(path[0])); // пустой элемент ведущего '/'
    let mut pos = 0usize;
    let mut elem_start = 0usize;
    let mut k = 0usize;
    let mut trailing = false;
    while pos <= n {
        if pos == n || is_sep(path[pos]) {
            let is_last = pos == n;
            if k >= start {
                let seg = &path[elem_start..pos];
                if seg.len() == 1 && seg[0] == b'.' || seg.eq_ignore_ascii_case(b"%2e") {
                    if is_last {
                        trailing = true;
                    }
                } else if seg.len() == 2 && seg == b".."
                    || seg.eq_ignore_ascii_case(b".%2e")
                    || seg.eq_ignore_ascii_case(b"%2e.")
                    || seg.eq_ignore_ascii_case(b"%2e%2e")
                {
                    if depth > 0 {
                        depth -= 1;
                        let p = if depth < STACK_CAP {
                            stack[depth]
                        } else {
                            // spill — чистое LIFO-расширение стека: индекс
                            // spill[depth-CAP] после перемешанных pop/push
                            // указывал на мёртвую ячейку (поймано тестом
                            // deep_path_segment_stack_spill при CAP=8)
                            spill.pop().expect("spill согласован с depth")
                        };
                        out.truncate(p);
                    }
                    if is_last {
                        trailing = true;
                    }
                } else if is_last && seg.is_empty() {
                    trailing = true; // путь заканчивается разделителем
                } else {
                    if depth < STACK_CAP {
                        stack[depth] = out.len();
                    } else {
                        spill.push(out.len());
                    }
                    depth += 1;
                    out.push('/');
                    write_encoded(out, seg, path_needs_enc);
                }
            }
            k += 1;
            elem_start = pos + 1;
            if pos == n {
                break;
            }
        }
        pos += 1;
    }
    if trailing {
        out.push('/');
    }
    // Пустой результат невозможен: пустой путь даёт trailing -> "/",
    // у обоих вызывающих (as_str/path) перед этим уже есть непустой префикс.
}

// ---------------------------------------------------------------------------
// Синтетические корпуса
// ---------------------------------------------------------------------------

/// Синтетический корпус URL, повторяющий форму записей session store и
/// history Firefox. Используется в бенчмарках и профилировании.
pub mod sample {
    /// `n` URL: страницы с запросами, CDN-ассеты, порты, userinfo,
    /// IPv6, регистр хоста, dot-сегменты.
    pub fn corpus(n: usize) -> Vec<String> {
        let mut out = Vec::with_capacity(n);
        for i in 0..n {
            let url = match i % 10 {
                0 => format!("https://example.com/page/{i}?q=firefox&tab={i}"),
                1 => format!(
                    "https://news.example.org/articles/2026/10/entry-{i}?page=3&sort=desc#comments"
                ),
                2 => format!("https://cdn.example.org/assets/bundle-{i}/chunk/app.main.min.css"),
                3 => format!("https://api.example.com/v2/sessionstore?schema=1&limit={i}"),
                4 => format!("http://legacy.example.net:8080/old/{i}/index.html"),
                5 => format!("https://user{i}:secret@example.com/secure/path"),
                6 => format!("https://[2001:db8::{i:x}]:8443/metrics?format=json"),
                7 => format!("https://Example.COM/Upper{i}/Case?a=B#Frag"),
                8 => format!("https://shop.example.com/a/./b/../item/{i}?color=red&size=L"),
                _ => format!("https://docs.example.com/en-US/rust/core/arch/fn.avx2/{i}"),
            };
            out.push(url);
        }
        out
    }
}

// ---------------------------------------------------------------------------
// Тесты
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    /// Тест-паритет с эталоном `url` на корпусе реалистичных URL:
    /// согласие ok/err и равенство сериализаций.
    #[test]
    fn matches_url_crate_corpus() {
        let corpus: [&str; 30] = [
            "https://example.com/page/42?q=firefox&tab=7",
            "https://news.example.org/articles/2026/10/firefox-rs?page=3&sort=desc#comments",
            "https://cdn.example.org/assets/bundle-812/chunk/app.main.min.css",
            "https://api.example.com/v2/sessionstore?schema=1&limit=500",
            "http://legacy.example.net:8080/old/path/index.html",
            "https://user:secret@example.com/secure/path",
            "https://token@example.com/oauth",
            "https://example.com",
            "https://example.com/",
            "https://example.com?x=1",
            "https://example.com#top",
            "https://example.com?",
            "https://example.com#",
            "https://[2001:db8::1]:8443/metrics?format=json",
            "https://[::1]/local",
            "http://127.0.0.1:9000/debug",
            "http://0x7f.1/",
            "http://0177.0.0.1/",
            "http://2165869871/",
            "https://maps.example.com/search/?q=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&zoom=12",
            "https://shop.example.com/catalog/item/12345?color=red&size=L&currency=USD",
            "https://docs.example.com/en-US/rust/core/arch/fn.avx2/",
            "https://Example.COM/Upper/Case?a=B#Frag",
            "HTTPS://EXAMPLE.COM/HOST",
            "https://example.com/a/./b/../c?x=1#f",
            "https://example.com/a/../",
            "https://example.com//double//slash",
            "https://example.com/%2e%2e/root",
            "https://example.com/back\\slash\\path",
            "ftp://files.example.org:21/pub/linux/",
        ];
        for input in corpus {
            let ours = parse(input);
            let theirs = url::Url::parse(input);
            match (ours, theirs) {
                (Ok(o), Ok(t)) => {
                    assert_eq!(
                        o.as_str().as_ref(),
                        t.as_str(),
                        "serialization mismatch for {input:?}"
                    );
                }
                (Err(_), Err(_)) => {}
                (o, t) => panic!(
                    "ok/err mismatch for {input:?}: ours={o:?} theirs={:?}",
                    t.map(|u| u.to_string())
                ),
            }
        }
    }

    /// Ошибки: согласие с `url` по факту ошибки.
    #[test]
    fn errors_match_url_crate() {
        let bad: [&str; 10] = [
            "not a url",
            "http://",
            "http://ex.com:99999",
            "http://ex.com:80a/",
            "http://1.2.3.4.5/",
            "http://[::1",
            "http://[::1]junk/",
            "http://ex.com:99999999999999999999/",
            "ht tp://ex.com/",
            "1http://ex.com/",
        ];
        for input in bad {
            let ours = parse(input);
            let theirs = url::Url::parse(input);
            assert!(ours.is_err(), "ours: {input:?} must error");
            assert!(theirs.is_err(), "url crate: {input:?} must error");
        }
    }

    /// Компоненты соответствуют `url::Url`.
    #[test]
    fn components_match_url_crate() {
        let cases = [
            "https://example.com/page/42?q=firefox&tab=7",
            "https://user:secret@example.com:8443/secure/path#frag",
            "https://[2001:db8::1]:8443/metrics",
        ];
        for input in cases {
            let o = parse(input).unwrap();
            let t = url::Url::parse(input).unwrap();
            assert_eq!(o.scheme().as_ref(), t.scheme(), "scheme {input:?}");
            assert_eq!(
                o.host_str().map(|c| c.into_owned()),
                t.host_str().map(str::to_string),
                "host {input:?}"
            );
            assert_eq!(o.port(), t.port(), "port {input:?}");
            assert_eq!(
                o.port_or_known_default(),
                t.port_or_known_default(),
                "default port {input:?}"
            );
            assert_eq!(o.path().as_ref(), t.path(), "path {input:?}");
            assert_eq!(o.query(), t.query(), "query {input:?}");
            assert_eq!(o.fragment(), t.fragment(), "fragment {input:?}");
            assert_eq!(o.username(), t.username(), "username {input:?}");
            assert_eq!(o.password(), t.password(), "password {input:?}");
        }
    }

    /// Элизия порта по умолчанию.
    #[test]
    fn default_port_elision() {
        assert_eq!(
            parse("https://ex.com:443/x").unwrap().as_str(),
            "https://ex.com/x"
        );
        assert_eq!(
            parse("http://ex.com:80/x").unwrap().as_str(),
            "http://ex.com/x"
        );
        assert_eq!(parse("ftp://ex.com:21/").unwrap().as_str(), "ftp://ex.com/");
        assert_eq!(
            parse("http://ex.com:8080/x").unwrap().as_str(),
            "http://ex.com:8080/x"
        );
    }

    /// Грязный вход: табы/переводы строк удаляются, C0/пробелы по краям.
    #[test]
    fn dirty_input() {
        assert_eq!(
            parse("ht\ntps://ex\rample.com/pa\tth").unwrap().as_str(),
            "https://example.com/path"
        );
        assert_eq!(
            parse("  https://example.com  ").unwrap().as_str(),
            "https://example.com/"
        );
        assert_eq!(
            parse("\u{1}https://example.com\u{7}").unwrap().as_str(),
            "https://example.com/"
        );
    }

    /// Zero-copy: чистый вход сериализуется без аллокации.
    #[test]
    fn zero_copy_clean_input() {
        let input = "https://example.com/page?q=1";
        let u = parse(input).unwrap();
        assert!(matches!(u.as_str(), Cow::Borrowed(_)));
        assert_eq!(u.as_str(), input);
    }

    /// Путь: пустой -> "/", dot-сегменты, обратные слэши, пустые сегменты.
    #[test]
    fn path_normalization() {
        assert_eq!(parse("https://ex.com").unwrap().path(), "/");
        assert_eq!(parse("https://ex.com/a/./b").unwrap().path(), "/a/b");
        assert_eq!(parse("https://ex.com/a/../b").unwrap().path(), "/b");
        assert_eq!(parse("https://ex.com/a/b/..").unwrap().path(), "/a/");
        assert_eq!(parse("https://ex.com/%2E%2E/b").unwrap().path(), "/b");
        assert_eq!(parse("https://ex.com//x//y").unwrap().path(), "//x//y");
        assert_eq!(parse("https://ex.com\\a\\b").unwrap().path(), "/a/b");
    }

    /// Края потоковой нормализации (рерайт без Vec<&[u8]> и нижнего
    /// регистра): множественные "..", over-pop, регистр %2E, хвостовые
    /// точки/пустые сегменты, смешанные разделители, percent-в пути.
    #[test]
    fn path_normalization_streaming_edges() {
        // глубокая вложенность: pop через несколько уровней
        assert_eq!(parse("https://e/a/b/c/../../../d").unwrap().path(), "/d");
        // over-pop: ".." больше, чем сегментов
        assert_eq!(parse("https://e/../../..").unwrap().path(), "/");
        // регистронезависимые dot-формы ("%2e%2E" = ".." -> pop "a")
        assert_eq!(parse("https://e/a/%2e%2E/b").unwrap().path(), "/b");
        assert_eq!(parse("https://e/x/.%2e/y").unwrap().path(), "/y");
        assert_eq!(parse("https://e/x/%2E./y").unwrap().path(), "/y");
        // хвостовая dot-форма -> завершающий слэш
        assert_eq!(parse("https://e/a/..").unwrap().path(), "/");
        assert_eq!(parse("https://e/a/%2e").unwrap().path(), "/a/");
        // пустые средние сегменты сохраняются
        assert_eq!(parse("https://e/a//b/../c").unwrap().path(), "/a//c");
        // обратные слэши как разделители спец-схем + точка
        assert_eq!(parse("https://e/a\\.\\b").unwrap().path(), "/a/b");
        // percent-в сегменте (не dot-форма) сохраняется дословно
        // ('%' не входит в path percent-encode set — паритет с url)
        assert_eq!(parse("https://e/a%zz/b").unwrap().path(), "/a%zz/b");
        // сверка с эталоном на тех же входах
        for u in [
            "https://e/a/b/c/../../../d",
            "https://e/../../..",
            "https://e/a/%2e%2E/b",
            "https://e/x/.%2e/y",
            "https://e/a/..",
            "https://e/a//b/../c",
            "https://e/a\\..\\b",
        ] {
            assert_eq!(
                parse(u).unwrap().as_str().to_string(),
                url::Url::parse(u).unwrap().to_string(),
                "расхождение с url: {u}"
            );
        }
    }

    /// ends_in_a_number без Vec: края хвостовых точек и частей.
    #[test]
    fn ends_in_a_number_edges() {
        // хвостовая точка домена — не число
        assert_eq!(
            parse("http://example.com./").unwrap().as_str(),
            "http://example.com./"
        );
        // две точки на конце: пустые метки допускаются и у url (паритет)
        assert_eq!(parse("http://a../").unwrap().as_str(), "http://a../");
        assert_eq!(
            url::Url::parse("http://a../").unwrap().as_str(),
            "http://a../"
        );
        // число с хвостовой точкой — IPv4
        assert_eq!(
            parse("http://1.2.3.4./").unwrap().host_str().unwrap(),
            "1.2.3.4"
        );
        // 5 частей — IPv4-парсер отказывает (паритет с url)
        assert!(parse("http://1.2.3.4.5/").is_err());
        assert!(url::Url::parse("http://1.2.3.4.5/").is_err());
    }

    /// IPv4-нормализация по грамматике WHATWG.
    #[test]
    fn ipv4_forms() {
        assert_eq!(
            parse("http://0x7f.1/").unwrap().host_str().unwrap(),
            "127.0.0.1"
        );
        assert_eq!(
            parse("http://0177.0.0.1/").unwrap().host_str().unwrap(),
            "127.0.0.1"
        );
        assert_eq!(
            parse("http://2165869871/").unwrap().host_str().unwrap(),
            "129.24.141.47"
        );
        assert_eq!(
            parse("http://127.0.0.1/").unwrap().host_str().unwrap(),
            "127.0.0.1"
        );
        assert!(parse("http://256.1.1.1/").is_err());
        assert!(parse("http://1.2.3.4.5/").is_err());
    }

    /// Opaque-пути не-специальных схем.
    #[test]
    fn opaque_paths() {
        assert_eq!(
            parse("mailto:user@example.com").unwrap().as_str(),
            "mailto:user@example.com"
        );
        assert_eq!(
            parse("data:text/plain,hello").unwrap().path(),
            "text/plain,hello"
        );
        assert_eq!(
            parse("git://host.example.com/repo.git").unwrap().as_str(),
            "git://host.example.com/repo.git"
        );
    }

    /// Последний '@' разделяет userinfo; ':' внутри username — валидно.
    #[test]
    fn userinfo_edges() {
        let u = parse("http://a@b@ex.com/").unwrap();
        assert_eq!(u.username(), "a@b");
        assert_eq!(u.password(), None);
        assert_eq!(u.host_str().unwrap(), "ex.com");
        let u = parse("http://u:p:q@ex.com/").unwrap();
        assert_eq!(u.username(), "u");
        assert_eq!(u.password(), Some("p:q"));
    }

    /// percent-кодирование пути/запроса/фрагмента по наборам WHATWG.
    #[test]
    fn percent_encoding() {
        assert_eq!(
            parse("https://ex.com/a b").unwrap().as_str(),
            "https://ex.com/a%20b"
        );
        assert_eq!(
            parse("https://ex.com/?a=1 2&b=<x>").unwrap().as_str(),
            "https://ex.com/?a=1%202&b=%3Cx%3E"
        );
        assert_eq!(
            parse("https://ex.com/#a b<c>").unwrap().as_str(),
            "https://ex.com/#a%20b%3Cc%3E"
        );
        // '\'' в запросе кодируется ТОЛЬКО у специальных схем
        assert_eq!(
            parse("https://ex.com/?q=it's").unwrap().as_str(),
            "https://ex.com/?q=it%27s"
        );
        assert_eq!(
            parse("foo://ex.com/?q=it's").unwrap().as_str(),
            "foo://ex.com/?q=it's"
        );
    }

    /// Ограничение v0.1: не-ASCII хост — ошибка (IDNA не поддержан).
    #[test]
    fn non_ascii_host_rejected() {
        assert!(matches!(
            parse("http://испытание.рф/"),
            Err(Error {
                kind: ErrorKind::IdnaError,
                ..
            })
        ));
    }

    /// Паритет на всём синтетическом корпусе (все формы из sample::corpus).
    #[test]
    fn sample_corpus_matches_url_crate() {
        for url in sample::corpus(500) {
            let ours = parse(&url);
            let theirs = url::Url::parse(&url);
            match (ours, theirs) {
                (Ok(o), Ok(t)) => {
                    assert_eq!(o.as_str().as_ref(), t.as_str(), "{url}");
                }
                (Err(_), Err(_)) => {}
                (o, t) => panic!(
                    "ok/err mismatch for {url}: ours={o:?} theirs={:?}",
                    t.map(|u| u.to_string())
                ),
            }
        }
    }

    /// Свойства структуры: позиции компонентов корректны для raw-срезов.
    #[test]
    fn offsets_consistent() {
        let input = "https://user:pw@Example.com:8080/pa th?x=1#f";
        let u = parse(input).unwrap();
        assert_eq!(u.scheme().as_ref(), "https");
        assert_eq!(u.username(), "user");
        assert_eq!(u.password(), Some("pw"));
        assert_eq!(u.port(), Some(8080));
        assert_eq!(u.path(), "/pa%20th");
        assert_eq!(u.query(), Some("x=1"));
        assert_eq!(u.fragment(), Some("f"));
    }

    /// IPv6-хост: канонический вход — заимствованный (ноль аллокаций),
    /// неканонический — owned В СКОБКАХ (паритет с `url`).
    #[test]
    fn ipv6_canonical_borrowed_and_brackets() {
        // Канонический: заимствованный as_str, host_str со скобками.
        let u = parse("https://[2001:db8::1]:8443/metrics").unwrap();
        assert!(matches!(u.as_str(), Cow::Borrowed(_)));
        assert_eq!(u.host_str().unwrap(), "[2001:db8::1]");
        assert_eq!(u.port(), Some(8443));

        // Неканонический (ведущие нули): скобки сохраняются, форма канонизована.
        let u = parse("https://[2001:0db8::1]:8443/metrics").unwrap();
        assert_eq!(u.as_str(), "https://[2001:db8::1]:8443/metrics");
        assert_eq!(u.host_str().unwrap(), "[2001:db8::1]");

        // Неканонический (верхний регистр hex).
        let u = parse("https://[2001:DB8::1]/x").unwrap();
        assert_eq!(u.as_str(), "https://[2001:db8::1]/x");

        // Неканонический (полная форма 8 групп).
        let u = parse("https://[0:0:0:0:0:0:0:1]/").unwrap();
        assert_eq!(u.as_str(), "https://[::1]/");
    }

    /// IPv4-mapped IPv6: WHATWG/`url` — ЧИСТАЯ hex-форма (`::ffff:a00:1`),
    /// НЕ смешанная RFC 5952 std-Display (`::ffff:10.0.0.1`).
    #[test]
    fn ipv6_ipv4_mapped_hex_not_dotted() {
        let u = parse("https://[::FFFF:10.0.0.1]/y").unwrap();
        assert_eq!(u.as_str(), "https://[::ffff:a00:1]/y");
        assert_eq!(u.host_str().unwrap(), "[::ffff:a00:1]");

        let u = parse("https://[::ffff:1.2.3.4]/").unwrap();
        assert_eq!(u.as_str(), "https://[::ffff:102:304]/");
    }

    /// IPv6-отказы: паритет с `url` (зона, мусор, лишние piece'и).
    #[test]
    fn ipv6_rejections_match_url() {
        for bad in [
            "https://[fe80::1%25eth0]/z",
            "https://[fe80::1%25]/z",
            "https://[1:2:3:4:5:6:7:8:9]/",
            "https://[1:2:3:4:5:6:7:]/",
            "https://[1:2:3:4:5:6:7:8::]/",
            "https://[:::]/",
            "https://[1:2:3:4:5:6:1.2.3]/",
            "https://[::1.2.3.256]/",
            "https://[12345::]/",
        ] {
            assert!(parse(bad).is_err(), "должен быть отказ: {bad}");
            assert!(url::Url::parse(bad).is_err(), "url тоже отказ: {bad}");
        }
    }

    // ------------------------------------------------------------------
    // v0.3: userinfo без ложных F_USERINFO_ENC (раньше ':' порта и
    // структурное ':' user:pass ложно взводили флаг — проверяем, что
    // чистые userinfo-URL остались zero-copy и паритетны).
    // ------------------------------------------------------------------

    /// Чистые userinfo-URL: сериализация == вход (as_str — Borrowed),
    /// включая ':' пары user:pass и НЕ-дефолтный порт после '@'.
    #[test]
    fn clean_userinfo_is_zero_copy() {
        for s in [
            "https://user5:secret@example.com/secure/path",
            "https://token@example.com/oauth",
            "https://user@example.com:8080/x", // ':' порта — не userinfo
            "https://u:p@example.com/",        // пустой путь запрещён
        ] {
            let u = parse(s).unwrap();
            let out = u.as_str();
            assert!(matches!(out, Cow::Borrowed(_)), "не zero-copy: {s}");
            assert_eq!(out.as_ref(), s, "сериализация изменилась: {s}");
        }
    }

    /// Userinfo с кодируемыми байтами: паритет с `url` по сериализации,
    /// включая ':' ВНУТРИ пароля (кодируется) и второй ':' в user части
    /// (первый ':' — структурный).
    #[test]
    fn userinfo_encoding_parity_with_url() {
        for s in [
            "https://user:pa:ss@example.com/",  // ':' в пароле
            "https://us er@example.com/",       // пробел в user
            "https://us|r:p>ss@example.com/",   // '|' в user, '>' в pass
            "https://us:er:pa:ss@example.com/", // комбинированный
            "https://%D0%B0@example.com/",      // байты из percent в user
        ] {
            let ours = parse(s).unwrap();
            let theirs = url::Url::parse(s).unwrap();
            assert_eq!(
                ours.as_str().as_ref(),
                theirs.as_str(),
                "serialization mismatch for {s:?}"
            );
        }
    }

    /// Последний '@' — граница userinfo даже при нескольких '@';
    /// первый '@' внутри userinfo кодируется в %40 (сериализация
    /// паритетна url; username()/password() возвращают СЫРОЙ спан —
    /// расхождение с url задокументировано в их доках).
    #[test]
    fn userinfo_last_at_sign() {
        let s = "https://a@b@example.com/x";
        let ours = parse(s).unwrap();
        let theirs = url::Url::parse(s).unwrap();
        assert_eq!(ours.username(), "a@b"); // сырой спан
        assert_eq!(
            ours.as_str().as_ref(),
            theirs.as_str(),
            "каноническая сериализация должна быть паритетна"
        );
        assert_eq!(ours.as_str().as_ref(), "https://a%40b@example.com/x");
    }

    /// Opaque-путь с точками (mailto): флаг F_PATH_NORM НЕ должен
    /// взводиться — иначе as_str теряет zero-copy fast-path.
    #[test]
    fn opaque_path_with_dots_stays_borrowed() {
        let s = "mailto:very.common@example.com";
        let u = parse(s).unwrap();
        let out = u.as_str();
        assert!(matches!(out, Cow::Borrowed(_)), "не zero-copy: {s}");
        assert_eq!(out.as_ref(), s);
    }

    /// write_path_normalized: глубина сегментов > ёмкости стека (24) —
    /// spill в Vec работает, паритет с url (dot-сегменты на глубине).
    #[test]
    fn deep_path_segment_stack_spill() {
        let mut s = String::from("https://ex.com/");
        for i in 0..40 {
            if i % 7 == 3 {
                s.push_str("../");
            } else {
                s.push_str(&format!("d{i}/"));
            }
        }
        let ours = parse(&s).unwrap();
        let theirs = url::Url::parse(&s).unwrap();
        assert_eq!(ours.path().as_ref(), theirs.path());
        assert_eq!(ours.as_str().as_ref(), theirs.as_str());
    }

    /// SWAR find_byte/rfind_byte: сравнение с position/rposition
    /// на корпусе длин вокруг 8-байтной границы и мультибайтных игрл.
    #[test]
    fn swar_find_byte_matches_position() {
        for len in 0..=40usize {
            for pos in 0..len {
                let mut v = vec![b'x'; len];
                v[pos] = b':';
                assert_eq!(
                    find_byte(b':', &v),
                    v.iter().position(|&c| c == b':'),
                    "len={len} pos={pos}"
                );
                assert_eq!(
                    rfind_byte(b':', &v),
                    v.iter().rposition(|&c| c == b':'),
                    "len={len} pos={pos}"
                );
                v[pos] = b'x';
            }
            // нет вхождения
            let v = vec![b'y'; len];
            assert_eq!(find_byte(b'z', &v), None);
            assert_eq!(rfind_byte(b'z', &v), None);
        }
        // несколько вхождений: первое/последнее
        let v = b"a:b:c:d:e:f:g:h:i:j:k:l:m:n:o:p:q".to_vec();
        assert_eq!(find_byte(b':', &v), Some(1));
        assert_eq!(rfind_byte(b':', &v), Some(v.len() - 2));
    }

    /// Таблицы классификации эквивалентны предикатам (все 256 байтов,
    /// обе спец-ветки): ENC-биты и управление.
    #[test]
    fn classification_tables_match_predicates() {
        for c in 0..=255u8 {
            let ps = PATH_TBL_SPECIAL[c as usize];
            let pg = PATH_TBL_GENERIC[c as usize];
            let qs = QUERY_TBL_SPECIAL[c as usize];
            let qg = QUERY_TBL_GENERIC[c as usize];
            // путь: ENC-бит == предикату (в обеих ветках)
            assert_eq!(ps & F_PATH_ENC != 0, path_needs_enc(c), "path special {c}");
            assert_eq!(pg & F_PATH_ENC != 0, path_needs_enc(c), "path generic {c}");
            // '\\' — NORM только у спец-схем
            assert_eq!(ps & F_PATH_NORM != 0, matches!(c, b'.' | b'%' | b'\\'));
            assert_eq!(pg & F_PATH_NORM != 0, matches!(c, b'.' | b'%'));
            // управление
            assert_eq!(ps & T_QUERY != 0, c == b'?');
            assert_eq!(ps & T_HASH != 0, c == b'#');
            // запрос: ENC-бит == предикату, '#' — управление
            assert_eq!(
                qs & F_QUERY_ENC != 0,
                query_needs_enc(c, true),
                "query special {c}"
            );
            assert_eq!(
                qg & F_QUERY_ENC != 0,
                query_needs_enc(c, false),
                "query generic {c}"
            );
            assert_eq!(qs & T_HASH != 0, c == b'#');
        }
    }

    /// SWAR-скан грязных пробелов: эквивалент побайтовому на корпусе
    /// вокруг 8-байтной границы.
    #[test]
    fn swar_dirty_ws_matches_scalar() {
        for len in 0..=24usize {
            for pos in 0..len {
                for &ws in b"\t\n\r" {
                    let mut v = vec![b'a'; len];
                    v[pos] = ws;
                    assert!(has_dirty_ws(&v), "len={len} pos={pos} ws={ws}");
                }
            }
            let v = vec![b'a'; len];
            assert!(!has_dirty_ws(&v), "len={len}");
        }
    }
}
