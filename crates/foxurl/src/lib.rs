//! FoxURL — быстрый WHATWG URL-парсер для горячих путей Firefox
//! (session store, history, telemetry).
//!
//! Эталон — крейт `url` (экосистемный стандарт). Архитектура (итерация 7):
//! - **zero-copy**: парсинг вычисляет смещения компонентов во входной строке;
//!   ни одной аллокации на типичном (уже каноническом) URL;
//! - **отложенная нормализация**: приведение хоста к нижнему регистру,
//!   удаление dot-сегментов, percent-кодирование и элизия порта по умолчанию
//!   выполняются лениво в [`Url::as_str`] только при обнаружении «грязных»
//!   флагов; чистый вход возвращается как заимствованный срез;
//! - табы/переводы строк и обрезка C0-пробелов по краям (спецификация
//!   WHATWG) — редкий путь: одна копия строки через `Cow`.
//!
//! Ограничения v0.1 (документированы): не-ASCII хосты (IDNA/punycode) и
//! file-специфика Windows (буквы дисков) не поддерживаются — `Err`.

use std::borrow::Cow;
use std::fmt;

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
    let dirty_ws = input
        .as_bytes()
        .iter()
        .any(|&c| matches!(c, b'\t' | b'\n' | b'\r'));
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
    /// Authority до '/', '\', '?', '#'; затем путь/запрос/фрагмент.
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

        // userinfo: последний '@' в authority
        let host_span_start = if let Some(at) = bytes[start..auth_end]
            .iter()
            .rposition(|&c| c == b'@')
            .map(|p| start + p)
        {
            let ui = (start as u32, at as u32);
            self.userinfo = Some(ui);
            if let Some(colon) = bytes[start..at].iter().position(|&c| c == b':') {
                self.userinfo_colon = Some((start + colon) as u32);
            }
            if bytes[start..at]
                .iter()
                .chain(&bytes[at + 1..auth_end])
                .any(|&c| userinfo_needs_enc(c))
            {
                self.flags |= F_USERINFO_ENC;
            }
            at + 1
        } else {
            start
        };

        self.parse_host_and_port(host_span_start, auth_end)?;

        // --- путь/запрос/фрагмент
        self.parse_path_query_fragment(i)?;

        // Детекция dot-сегментов/обратных слэшей: пост-скан пути (символы,
        // из которых могут состоять dot-формы). Ложные срабатывания безвредны:
        // нормализация идемпотентна.
        if self.has_authority {
            let (ps, pe) = (self.path.0 as usize, self.path.1 as usize);
            let path = &self.raw.as_bytes()[ps..pe];
            let has_dot_char = path
                .iter()
                .any(|&c| c == b'.' || c == b'%' || (special && c == b'\\'));
            if has_dot_char {
                self.flags |= F_PATH_NORM;
            }
        }
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
            let close = bytes[from..end]
                .iter()
                .position(|&c| c == b']')
                .ok_or(Error {
                    position: end,
                    kind: ErrorKind::InvalidIpv6Address,
                })?
                + from;
            let inner = &self.raw[from + 1..close];
            let ip: std::net::Ipv6Addr = inner.parse().map_err(|_| Error {
                position: from + 1,
                kind: ErrorKind::InvalidIpv6Address,
            })?;
            let s = ip.to_string();
            if s != inner {
                self.host_owned = Some(s);
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
            // --- домен или IPv4
            if let Some(colon) = bytes[from..end].iter().position(|&c| c == b':') {
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

        if host_bytes.iter().any(|&c| c.is_ascii_uppercase()) {
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
    /// затем запрос и фрагмент.
    fn parse_path_query_fragment(&mut self, start: usize) -> Result<(), Error> {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let special = self.kind.is_special();
        let mut i = start;

        let path_start = i;
        let mut path_end = i;
        while i < len {
            match bytes[i] {
                b'?' => break,
                b'#' => {
                    self.path = (path_start as u32, path_end as u32);
                    self.parse_fragment(i + 1);
                    return Ok(());
                }
                c if special && c == b'\\' => {
                    self.flags |= F_PATH_NORM;
                }
                c => {
                    if path_needs_enc(c) {
                        self.flags |= F_PATH_ENC;
                    }
                }
            }
            i += 1;
            path_end = i;
        }
        self.path = (path_start as u32, path_end as u32);

        if i < len && bytes[i] == b'?' {
            i += 1;
            let q_start = i;
            while i < len && bytes[i] != b'#' {
                let c = bytes[i];
                if query_needs_enc(c, special) {
                    self.flags |= F_QUERY_ENC;
                }
                i += 1;
            }
            self.query = Some((q_start as u32, i as u32));
        }

        if i < len && bytes[i] == b'#' {
            self.parse_fragment(i + 1);
        }
        Ok(())
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

    /// Opaque-путь не-специальной схемы (до '?' или '#').
    fn parse_opaque_path(&mut self, start: usize) -> Result<(), Error> {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let mut i = start;
        let mut dirty = false;
        while i < len {
            match bytes[i] {
                b'?' | b'#' => break,
                c => {
                    if path_needs_enc(c) {
                        dirty = true;
                    }
                }
            }
            i += 1;
        }
        self.path = (start as u32, i as u32);
        if dirty {
            self.flags |= F_PATH_ENC;
        }
        if bytes.get(i) == Some(&b'?') {
            let q_start = i + 1;
            while i < len && bytes[i] != b'#' {
                if query_needs_enc(bytes[i], false) {
                    self.flags |= F_QUERY_ENC;
                }
                i += 1;
            }
            self.query = Some((q_start as u32, i as u32));
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
fn path_needs_enc(c: u8) -> bool {
    !(0x20..=0x7E).contains(&c)
        || matches!(
            c,
            b' ' | b'"' | b'#' | b'<' | b'>' | b'?' | b'`' | b'{' | b'}'
        )
}

#[inline]
fn query_needs_enc(c: u8, special: bool) -> bool {
    !(0x20..=0x7E).contains(&c)
        || matches!(c, b' ' | b'"' | b'#' | b'<' | b'>')
        || (special && c == b'\'')
}

#[inline]
fn fragment_needs_enc(c: u8) -> bool {
    !(0x20..=0x7E).contains(&c) || matches!(c, b' ' | b'"' | b'<' | b'>' | b'`')
}

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
    let mut parts: Vec<&[u8]> = host.split(|&c| c == b'.').collect();
    if parts.len() >= 2 && parts.last().is_some_and(|s| s.is_empty()) {
        parts.pop();
    }
    match parts.last() {
        None => false,
        Some(last) => {
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
    }
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

        // схема (в нижнем регистре при необходимости)
        let (ss, se) = (self.scheme.0 as usize, self.scheme.1 as usize);
        if self.flags & F_SCHEME_LOWER != 0 {
            out.push_str(&raw[ss..se].to_ascii_lowercase());
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

            // хост (owned / lowercased / raw)
            match &self.host_owned {
                Some(h) => out.push_str(h),
                None => {
                    let (hs, he) = (self.host.0 as usize, self.host.1 as usize);
                    if self.flags & F_HOST_LOWER != 0 {
                        out.push_str(&raw[hs..he].to_ascii_lowercase());
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
                    let mut buf = String::new();
                    write_path_normalized(&mut buf, path, true);
                    out.push_str(&buf);
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

    /// Пароль (Some только если ':' присутствует в userinfo).
    pub fn password(&self) -> Option<&str> {
        match (self.userinfo, self.userinfo_colon) {
            (Some((_, ue)), Some(c)) => Some(&self.raw[c as usize + 1..ue as usize]),
            _ => None,
        }
    }
}

/// percent-кодирование в `out` по предикату набора (hex в верхнем регистре).
fn write_encoded(out: &mut String, bytes: &[u8], needs: impl Fn(u8) -> bool) {
    const HEX: &[u8; 16] = b"0123456789ABCDEF";
    let mut buf = [0u8; 3];
    for &c in bytes {
        if needs(c) {
            buf[0] = b'%';
            buf[1] = HEX[(c >> 4) as usize];
            buf[2] = HEX[(c & 0xF) as usize];
            // %XX — ASCII, пушим безусловно безопасно
            for &b in &buf {
                out.push(b as char);
            }
        } else {
            out.push(c as char);
        }
    }
}

/// Удаление dot-сегментов + percent-кодирование пути.
/// `split_backslash`: для специальных схем '\' — разделитель.
fn write_path_normalized(out: &mut String, path: &[u8], split_backslash: bool) {
    let is_sep = |c: u8| c == b'/' || (split_backslash && c == b'\\');
    let mut norm: Vec<&[u8]> = Vec::new();
    let segs: Vec<&[u8]> = path.split(|&c| is_sep(c)).collect();
    let start = usize::from(!path.is_empty() && is_sep(path[0]));
    let last = segs.len().saturating_sub(1);
    let mut trailing = false;
    for (k, seg) in segs.iter().enumerate() {
        if k < start {
            continue; // пустой сегмент ведущего '/'
        }
        let lower = seg.to_ascii_lowercase();
        if lower == b"." || lower == b"%2e" {
            if k == last {
                trailing = true;
            }
        } else if lower == b".." || lower == b".%2e" || lower == b"%2e." || lower == b"%2e%2e" {
            norm.pop();
            if k == last {
                trailing = true;
            }
        } else if k == last && seg.is_empty() {
            trailing = true; // путь заканчивается разделителем
        } else {
            norm.push(seg);
        }
    }
    for seg in &norm {
        out.push('/');
        write_encoded(out, seg, path_needs_enc);
    }
    if trailing {
        out.push('/');
    }
    if out.is_empty() {
        out.push('/');
    }
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
}
