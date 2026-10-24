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
//! Итерация 11 (v0.4): ТОЧНЫЙ F_PATH_NORM — флаг взводится только на
//! настоящем dot-сегменте (сегмент, целиком состоящий из «.»/«%2e»-паттерна):
//! точки ВНУТРИ сегментов («app.main.min.css», «index.html») и проценты
//! вне dot-паттернов («%20») больше не вынуждают пересборку as_str —
//! такие URL остаются zero-copy (полкорпуса бенча!). Lookahead парсера
//! срабатывает только на начале сегмента и ограничен 6 байтами. Плюс:
//! нормализация dot-сегментов распространена на НЕ-специальные схемы с
//! authority (WHATWG path state — раньше был баг паритета с `url`);
//! классификация сегментов в write_path_normalized — одним switch по
//! длине (было до 5 вызовов eq_ignore_ascii_case на сегмент); fast-path
//! write_encoded — предикат false на всём срезе => одна memcpy.
//!
//! Итерация 12 (v0.5): ТАБЛИЧНЫЙ СКАН ДОМЕНА — один проход scan_host_domain
//! по спану хоста вместо ТРЁХ (SWAR find ':' + memchr '%' + побайтовая
//! валидация): конец хоста/порт, верхний регистр, '%' и запрещённые/
//! не-ASCII байты — из HOST_DOMAIN_TBL; parse_domain — только редкие пути
//! (decode, ошибки) через DomainOutcome. Скан терминаторов authority тоже
//! табличный (AUTH_TERM_*). parse/corpus-all -14%, canonical -13.8%
//! (отрыв от url 2.83x -> 3.16x), CPU на профиле -14%.
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
const F_PATH_NORM: u8 = 1 << 2; // настоящий dot-сегмент или backslash в пути
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
    // Фаза 0 ОТЛОЖЕНА (v0.7): раньше has_dirty_ws сканировал ВЕСЬ вход
    // SWAR-ом ДО парсинга — 6.3% профиля (полный лишний проход на каждом
    // URL ради редкой грязи). Теперь сканы парсера сами детектируют
    // \t\n\r (маркеры в таблицах/редких путях) и обрезаемые края
    // (первый/последний байт <= 0x20); на находку — холодный рестарт
    // на очищенном входе. Чистый вход (типичный) парсится без пре-скана.
    match parse_raw(Cow::Borrowed(input)) {
        Ok(url) => Ok(url),
        Err(RawFail::Err(e)) => Err(e),
        Err(RawFail::Dirty) => {
            // Холодный путь: табы/переводы строк удаляются ВЕЗДЕ, C0/пробелы
            // обрезаются по краям; рестарт на очищенной копии.
            let mut s = String::with_capacity(input.len());
            for c in input.chars() {
                if !matches!(c, '\t' | '\n' | '\r') {
                    s.push(c);
                }
            }
            let raw: Cow<'_, str> = match trim_c0(&s) {
                None => Cow::Owned(s),
                Some(t) => Cow::Owned(t),
            };
            match parse_raw(raw) {
                Ok(url) => Ok(url),
                Err(RawFail::Err(e)) => Err(e),
                Err(RawFail::Dirty) => {
                    unreachable!("очищенный вход не содержит \\t\\n\\r и обрезаемых краёв")
                }
            }
        }
    }
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

/// Результат parse_raw. Dirty — во входе найдены \t\n\r или обрезаемые
/// края (первый/последний байт <= 0x20): парсер откладывает фазу 0 WHATWG
/// до факта находки; parse() перезапускается на очищенной копии.
enum RawFail {
    Err(Error),
    Dirty,
}

impl From<Error> for RawFail {
    fn from(e: Error) -> Self {
        RawFail::Err(e)
    }
}

fn parse_raw(raw: Cow<'_, str>) -> Result<Url<'_>, RawFail> {
    let bytes = raw.as_bytes();
    let len = bytes.len();
    let mut flags = 0u8;

    // --- схема: [a-zA-Z][a-zA-Z0-9+.-]* ':'
    // v0.7: байт 0 <= 0x20 — обрезаемый край (trim_c0 снял бы его) —
    // рестарт; прежняя версия отсекала это пре-сканом/тримом.
    match bytes.first() {
        None => {
            return Err(RawFail::Err(Error {
                position: 0,
                kind: ErrorKind::RelativeWithoutBase,
            }))
        }
        Some(&c) if c.is_ascii_alphabetic() => {}
        Some(&c) if c <= b' ' => return Err(RawFail::Dirty),
        Some(_) => {
            return Err(RawFail::Err(Error {
                position: 0,
                kind: ErrorKind::RelativeWithoutBase,
            }))
        }
    }
    // v0.7: хвостовой край — последний байт <= 0x20 обрезался бы trim_c0
    // прежней версии (фаза 0 до разбора). Хвостовой трим не влияет на
    // смещения более ранних байтов — паритет позиций ошибок сохранён.
    if bytes[len - 1] <= b' ' {
        return Err(RawFail::Dirty);
    }
    // v0.6: один табличный проход (SCHEME_TBL) вместо двух: скан схемы
    // + детект верхнего регистра СЛИТЫ (был второй any(uppercase)-проход).
    // Быстрый путь строчной буквы/цифры — t == S_OK (один branch).
    let mut i = 1;
    // Первый байт тоже может быть верхним ("HTTP://") — исходный
    // any(uppercase) покрывал весь спан схемы, включая позицию 0
    let mut upper = bytes[0].is_ascii_uppercase();
    while i < len {
        let t = SCHEME_TBL[bytes[i] as usize];
        if t == S_OK {
            i += 1;
            continue;
        }
        if t == 0 {
            return Err(RawFail::Err(Error {
                position: i,
                kind: ErrorKind::RelativeWithoutBase,
            }));
        }
        if t & S_COLON != 0 {
            break;
        }
        if t & S_DIRTY != 0 {
            // \t\n\r в схеме: фаза 0 удалила бы их ДО разбора
            return Err(RawFail::Dirty);
        }
        // S_UPPER (всегда вместе с S_OK) — редкий байт
        upper = true;
        i += 1;
    }
    if i == len {
        return Err(RawFail::Err(Error {
            position: len,
            kind: ErrorKind::RelativeWithoutBase,
        }));
    }
    let scheme = (0u32, i as u32);
    if upper {
        flags |= F_SCHEME_LOWER;
    }
    // lowered-имя нужно только для dispatch scheme_kind (as_str lowers
    // по флагу F_SCHEME_LOWER): аллокация — ТОЛЬКО на верхнем регистре
    let kind = if upper {
        scheme_kind(&raw[..i].to_ascii_lowercase())
    } else {
        scheme_kind(&raw[..i])
    };
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
    fn parse_authority_and_path(&mut self, start: usize) -> Result<(), RawFail> {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let special = self.kind.is_special();
        // v0.5: скан терминатора по константной таблице (одна загрузка
        // вместо цепочки сравнений matches! на каждый байт)
        let term: &[u8; 256] = if special {
            &AUTH_TERM_SPECIAL
        } else {
            &AUTH_TERM_GENERIC
        };
        // v0.6: '@' отслеживается САМИМ сканом терминаторов (маркер в
        // таблице — регистровая запись, ноль вызовов; быстрый путь
        // обычного байта t == 0 не изменился). Инвариант WHATWG:
        // '@' не терминирует authority, последний '@' открывает хост.
        let mut i = start;
        let mut last_at: u32 = u32::MAX;
        while i < len {
            let t = term[bytes[i] as usize];
            if t == 0 {
                i += 1;
                continue;
            }
            if t & AUTH_TERM_BIT != 0 {
                break;
            }
            if t & AUTH_T_DIRTY != 0 {
                // \t\n\r в authority (в т.ч. внутри userinfo/IPv6-скобок):
                // фаза 0 удалила бы их до разбора
                return Err(RawFail::Dirty);
            }
            // AUTH_M_AT — редкий байт: предикат вне быстрого пути
            last_at = i as u32;
            i += 1;
        }
        let auth_end = i;

        // userinfo: последний '@' в authority известен из скана. Без '@'
        // (типичный URL) — парсер userinfo не вызывается вовсе. С '@' —
        // redo по [start..at+1): rfind_byte находит '@' первым же байтом,
        // далее точная прежняя семантика (структурный ':' и кодирование
        // в одном проходе по userinfo-диапазону).
        let host_span_start = if last_at != u32::MAX {
            let at = last_at as usize;
            let (userinfo, ui_colon, ui_enc) = parse_userinfo(bytes, start, at + 1);
            self.userinfo = userinfo;
            self.userinfo_colon = ui_colon;
            if ui_enc {
                self.flags |= F_USERINFO_ENC;
            }
            at + 1
        } else {
            start
        };

        self.parse_host_and_port(host_span_start, auth_end)?;

        // --- путь/запрос/фрагмент
        self.parse_path_query_fragment(auth_end)?;
        // Детекция dot-сегментов/обратных слэшей слита в скан пути
        // (parse_path_query_fragment) — отдельный проход удалён.
        Ok(())
    }

    /// Хост и порт внутри authority-диапазона.
    fn parse_host_and_port(&mut self, from: usize, end: usize) -> Result<(), RawFail> {
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
                    }
                    .into())
                }
            }
            host_end = close + 1;
            if host_end < end {
                if bytes[host_end] != b':' {
                    return Err(Error {
                        position: host_end,
                        kind: ErrorKind::InvalidIpv6Address,
                    }
                    .into());
                }
                has_port = true;
                port_span = (host_end + 1, end);
            }
        } else {
            // --- домен или IPv4: ОДИН табличный проход по спану хоста
            // (v0.5: было ТРИ прохода — SWAR find ':' + memchr '%' +
            // побайтовая валидация в parse_domain)
            let scan = scan_host_domain(bytes, from, end);
            if scan.dirty {
                // \t\n\r в спане хоста — фаза 0 удалила бы их до разбора
                return Err(RawFail::Dirty);
            }
            if scan.has_port {
                host_end = scan.host_end;
                has_port = true;
                port_span = (host_end + 1, end);
            }
            self.parse_domain(from, host_end, scan)?;
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
                        }
                        .into());
                    }
                    p = p * 10 + u32::from(c - b'0');
                    if p > 65535 {
                        return Err(Error {
                            position: port_span.0,
                            kind: ErrorKind::InvalidPort,
                        }
                        .into());
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
            }
            .into());
        }
        self.host = (from as u32, host_end as u32);
        Ok(())
    }

    /// Домен: percent-decode при наличии '%', запрет символов,
    /// детекция IPv4 (ends-in-a-number), флаг нижнего регистра.
    /// v0.5: валидация/верхний регистр/'%' предвычислены табличным
    /// проходом scan_host_domain — здесь только редкие пути (decode,
    /// ошибки) и решение о IPv4/owned.
    fn parse_domain(&mut self, from: usize, end: usize, scan: HostScan) -> Result<(), Error> {
        // РЕДКИЙ путь: percent-decode + полная валидация декодированных
        // (сырые запрещённые байты попадают в декодированные дословно,
        // но %XX может легализовать верхний регистр — решает декод;
        // поэтому сырой scan.bad при наличии '%' игнорируется).
        // Быстрый путь: без '%' — ошибка по первому bad из скана.
        let outcome = if scan.pct.is_some() {
            let span = &self.raw.as_bytes()[from..end];
            let decoded = percent_decode(span).ok_or(Error {
                position: from,
                kind: ErrorKind::InvalidDomainCharacter,
            })?;
            let mut has_upper = false;
            for &c in &decoded {
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
            finish_domain(from, &decoded, span, has_upper)?
        } else {
            if let Some((_, nonascii)) = scan.bad {
                // первый запрещённый/не-ASCII байт спана (порядок
                // совпадает с прежним циклом валидации)
                return Err(Error {
                    position: from,
                    kind: if nonascii {
                        ErrorKind::IdnaError
                    } else {
                        ErrorKind::InvalidDomainCharacter
                    },
                });
            }
            let span = &self.raw.as_bytes()[from..end];
            finish_domain(from, span, span, scan.has_upper)?
        };
        match outcome {
            DomainOutcome::Ipv4(Some(dotted)) => self.host_owned = Some(dotted),
            DomainOutcome::Ipv4(None) => {}
            DomainOutcome::Borrowed(upper) => {
                if upper {
                    self.flags |= F_HOST_LOWER;
                }
            }
            DomainOutcome::Owned(s) => {
                self.host_owned = Some(s);
                self.flags &= !F_HOST_LOWER;
            }
        }
        Ok(())
    }

    /// Путь (специальная схема или "//"-authority не-специальной),
    /// затем запрос и фрагмент. Скан — по константной таблице
    /// классификации (одна загрузка вместо ветвистого match):
    /// обычные байты дают t == 0 — самый предсказуемый путь.
    /// v0.4: флаги аккумулируются в acc (одна запись self.flags —
    /// урок итерации 10 про RMW через память), а F_PATH_NORM — ТОЧНЫЙ:
    /// горячий цикл только ОТМЕЧАЕТ кандидата ('.'/'%' в начале сегмента —
    /// регистровый OR, БЕЗ вызовов), а точную классификацию сегмента
    /// делает ОДИН холодный проход path_has_dot_segment ПОСЛЕ цикла
    /// (инлайн lookahead в цикле раздувал код: +8% на всём parse-корпусе,
    /// урок итерации 6). Точки внутри сегментов («app.main.min.css»)
    /// и «%20» кандидата НЕ дают — URL остаётся zero-copy (полкорпуса бенча).
    fn parse_path_query_fragment(&mut self, start: usize) -> Result<(), RawFail> {
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
        let mut acc = 0u8;
        let mut dot_cand = false;
        while i < len {
            let t = table[bytes[i] as usize];
            if t == 0 {
                i += 1;
                path_end = i;
                continue;
            }
            if t & (T_QUERY | T_HASH) != 0 {
                self.flags |= acc;
                self.path = (path_start as u32, path_end as u32);
                if dot_cand && path_has_dot_segment(bytes, path_start, path_end, special) {
                    self.flags |= F_PATH_NORM;
                }
                if t & T_HASH != 0 {
                    self.parse_fragment(i + 1)?;
                } else {
                    self.parse_query(i + 1, special)?;
                }
                return Ok(());
            }
            if t & T_DOTLEAD != 0 {
                // Путь при authority начинается всегда с '/' (или '\' у
                // спец-схем) либо пуст — сегмент не может начинаться в
                // i == start; bytes[i-1] — разделитель — начало сегмента.
                // Точную классификацию сегмента делает холодный проход
                // после цикла — горячий цикл без вызовов.
                dot_cand |=
                    i > start && (bytes[i - 1] == b'/' || (special && bytes[i - 1] == b'\\'));
            }
            // младшие биты t — сами F_PATH_NORM (только '\') / F_PATH_ENC;
            // \t\n\r (F_PATH_ENC) — грязь фазы 0: удаляются, не кодируются
            if matches!(bytes[i], b'\t' | b'\n' | b'\r') {
                return Err(RawFail::Dirty);
            }
            acc |= t & (F_PATH_ENC | F_PATH_NORM);
            i += 1;
            path_end = i;
        }
        self.flags |= acc;
        self.path = (path_start as u32, path_end as u32);
        if dot_cand && path_has_dot_segment(bytes, path_start, path_end, special) {
            self.flags |= F_PATH_NORM;
        }
        Ok(())
    }

    /// Запрос (после '?') до '#' или конца входа; затем фрагмент.
    /// Флаги аккумулируются в локальной переменной: запись self.flags
    /// на КАЖДЫЙ байт (как в первой попытке v0.3) — это RMW через память
    /// и регресс длинных запросов (бенч #8 +11%).
    fn parse_query(&mut self, start: usize, special: bool) -> Result<(), RawFail> {
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
            if t == 0 {
                // v0.7 быстрый путь: обычный байт запроса — без проверок
                i += 1;
                continue;
            }
            if t & T_HASH != 0 {
                break;
            }
            if t & T_DIRTY_Q != 0 {
                // \t\n\r: фаза 0 удалила бы их (не кодирование!)
                return Err(RawFail::Dirty);
            }
            acc |= F_QUERY_ENC; // t здесь == F_QUERY_ENC
            i += 1;
        }
        self.flags |= acc;
        self.query = Some((start as u32, i as u32));
        if i < len {
            self.parse_fragment(i + 1)?;
        }
        Ok(())
    }

    fn parse_fragment(&mut self, start: usize) -> Result<(), RawFail> {
        let bytes = self.raw.as_bytes();
        let mut i = start;
        let len = bytes.len();
        let mut dirty = false;
        while i < len {
            let b = bytes[i];
            if fragment_needs_enc(b) {
                if matches!(b, b'\t' | b'\n' | b'\r') {
                    return Err(RawFail::Dirty);
                }
                dirty = true;
            }
            i += 1;
        }
        if dirty {
            self.flags |= F_FRAG_ENC;
        }
        self.fragment = Some((start as u32, len as u32));
        Ok(())
    }

    /// Opaque-путь не-специальной схемы (до '?' или '#'). Табличный скан,
    /// маскированный до F_PATH_ENC (NORM-биты '.'/'%' в opaque не нужны:
    /// флаг читается только у спец-схем, а лишний флаг ломал бы
    /// zero-copy fast-path as_str для mailto и т.п.).
    fn parse_opaque_path(&mut self, start: usize) -> Result<(), RawFail> {
        let bytes = self.raw.as_bytes();
        let len = bytes.len();
        let mut i = start;
        let mut dirty = false;
        while i < len {
            let t = PATH_TBL_GENERIC[bytes[i] as usize];
            if t == 0 {
                i += 1;
                continue;
            }
            if t & (T_QUERY | T_HASH) != 0 {
                break;
            }
            if matches!(bytes[i], b'\t' | b'\n' | b'\r') {
                return Err(RawFail::Dirty);
            }
            dirty |= t & F_PATH_ENC != 0; // T_DOTLEAD — не кодирование
            i += 1;
        }
        self.path = (start as u32, i as u32);
        if dirty {
            self.flags |= F_PATH_ENC;
        }
        if bytes.get(i) == Some(&b'?') {
            self.parse_query(i + 1, false)?;
            return Ok(());
        }
        if i < len && bytes[i] == b'#' {
            self.parse_fragment(i + 1)?;
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

/// Классификация dot-сегмента WHATWG (регистр «E» в %2E не важен):
/// 0 — обычный сегмент; 1 — single-dot («.» или «%2e»); 2 — double-dot
/// («..», «.%2e», «%2e.», «%2e%2e»). Диспетчеризация по длине: обычный
/// сегмент отсекается ОДНЫМ сравнением длины (было: до 5 вызовов
/// eq_ignore_ascii_case на КАЖДЫЙ сегмент write_path_normalized).
/// Используется и в lookahead парсера (seg_is_dot), и в записи —
/// семантика одна (проверено тестом dot_kind_matches_reference).
#[inline]
fn dot_kind(seg: &[u8]) -> u8 {
    match seg.len() {
        1 => u8::from(seg[0] == b'.'),
        2 => u8::from(seg[0] == b'.' && seg[1] == b'.') << 1,
        3 => u8::from(seg[0] == b'%' && seg[1] == b'2' && (seg[2] | 0x20) == b'e'),
        4 => {
            if seg[0] == b'.' {
                u8::from(seg[1] == b'%' && seg[2] == b'2' && (seg[3] | 0x20) == b'e') << 1
            } else if seg[0] == b'%' {
                u8::from(seg[1] == b'2' && (seg[2] | 0x20) == b'e' && seg[3] == b'.') << 1
            } else {
                0
            }
        }
        6 => {
            u8::from(
                seg[0] == b'%'
                    && seg[1] == b'2'
                    && (seg[2] | 0x20) == b'e'
                    && seg[3] == b'%'
                    && seg[4] == b'2'
                    && (seg[5] | 0x20) == b'e',
            ) << 1
        }
        _ => 0,
    }
}

/// Точный проход по пути [from..to): существует ли НАСТОЯЩИЙ dot-сегмент
/// (сегмент, целиком состоящий из dot-паттерна). Вызывается ПОСЛЕ горячего
/// цикла парсера и только при кандидате (точка/процент в начале сегмента) —
/// РЕДКИЙ путь: #[cold] держит тело вне горячего кода.
#[cold]
#[inline(never)]
fn path_has_dot_segment(bytes: &[u8], from: usize, to: usize, special: bool) -> bool {
    for i in from..to {
        let c = bytes[i];
        if (c == b'.' || c == b'%')
            && (i == from || bytes[i - 1] == b'/' || (special && bytes[i - 1] == b'\\'))
            && seg_is_dot(bytes, i, special)
        {
            return true;
        }
    }
    false
}

/// Lookahead парсера: является ли сегмент [from..разделитель) dot-сегментом.
/// Читает до 8 байтов в стековый буфер (dot-сегмент не длиннее 6; сегменты
/// 7+ отсекаются). Индексы сравнений — КОНСТАНТЫ (buf[0..=5]) — без
/// bounds-checks. «.?gitignore» проверяется проходом, но НЕ является
/// dot-сегментом.
///
/// Архитектурное требование: #[inline(never)] — РЕДКИЙ вызов (только на
/// '.'/'%' в начале сегмента). Инлайн в горячий цикл parse_path_query_
/// fragment раздул код и дал +8% на всём parse-корпусе (урок итерации 6
/// про границы инлайна), а вызов здесь дешевле раздутого цикла.
#[inline(never)]
fn seg_is_dot(bytes: &[u8], from: usize, special: bool) -> bool {
    let n = bytes.len();
    let mut buf = [0u8; 8];
    let mut len = 0usize;
    while len < 8 && from + len < n {
        let c = bytes[from + len];
        if c == b'/' || c == b'?' || c == b'#' || (special && c == b'\\') {
            break;
        }
        buf[len] = c;
        len += 1;
    }
    let e = |c: u8| c == b'e' || c == b'E';
    match len {
        1 => buf[0] == b'.',
        2 => buf[0] == b'.' && buf[1] == b'.',
        3 => buf[0] == b'%' && buf[1] == b'2' && e(buf[2]),
        4 => {
            (buf[0] == b'.' && buf[1] == b'%' && buf[2] == b'2' && e(buf[3]))
                || (buf[0] == b'%' && buf[1] == b'2' && e(buf[2]) && buf[3] == b'.')
        }
        6 => {
            buf[0] == b'%'
                && buf[1] == b'2'
                && e(buf[2])
                && buf[3] == b'%'
                && buf[4] == b'2'
                && e(buf[5])
        }
        _ => false, // len == 0, 5, 7, 8 — dot-сегментов такой длины нет
    }
}

// ---------------------------------------------------------------------------
// Таблицы классификации байтов пути/запроса (v0.3)
// ---------------------------------------------------------------------------

// Управляющие биты таблиц (старшие — управление, младшие — сами флаги
// Url: F_PATH_NORM=4, F_PATH_ENC=8, F_QUERY_ENC=16 — они OR-ятся прямо
// в self.flags без перекодировки).
const T_QUERY: u8 = 1 << 6; // '?' завершает путь
const T_HASH: u8 = 1 << 7; // '#' завершает путь/запрос
/// '.'/'%' — потенциальное начало dot-сегмента: запускает lookahead
/// парсера (бит таблицы, НЕ флаг Url — в self.flags не OR-ится).
const T_DOTLEAD: u8 = 1 << 5;
/// \t\n\r в запросе — грязь отложенной фазы 0 (v0.7)
const T_DIRTY_Q: u8 = 1 << 5;

/// Таблица классификации байтов пути. '\\' даёт NORM только у спец-схем;
/// '.'/'%' — маркер T_DOTLEAD: реальный NORM ставит lookahead парсера,
/// когда сегмент ЦЕЛИКОМ — dot-паттерн (v0.4).
const fn build_path_table(special: bool) -> [u8; 256] {
    let mut t = [0u8; 256];
    let mut c = 0usize;
    while c < 256 {
        let b = c as u8;
        let mut v = 0u8;
        if path_needs_enc(b) {
            v |= F_PATH_ENC;
        }
        if matches!(b, b'.' | b'%') {
            // v0.4: не безусловный F_PATH_NORM — только маркер lookahead.
            // Реальный флаг ставит парсер, когда сегмент ЦЕЛИКОМ —
            // dot-паттерн (см. parse_path_query_fragment). Точки внутри
            // сегментов («index.html») и «%20» пересборку не вызывают.
            v |= T_DOTLEAD;
        }
        if special && b == b'\\' {
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
        if matches!(b, b'\t' | b'\n' | b'\r') {
            v |= T_DIRTY_Q;
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

// ---------------------------------------------------------------------------
// Табличный скан домена (v0.5): один проход вместо трёх
// ---------------------------------------------------------------------------

// Биты таблицы домена (локальные, в self.flags не OR-ятся).
const T_COLON: u8 = 1 << 4; // ':' — конец хоста, начало порта
const F_H_UPPER: u8 = 1 << 0; // верхний регистр (F_HOST_LOWER)
const F_H_PCT: u8 = 1 << 1; // '%' — нужен percent-decode
const F_H_NONASCII: u8 = 1 << 2; // >= 0x80 — IdnaError
const F_H_FORBIDDEN: u8 = 1 << 3; // forbidden host code point
/// \t\n\r в спане хоста — грязь отложенной фазы 0 (v0.7)
const T_DIRTY_HOST: u8 = 1 << 5;

const fn build_host_domain_table() -> [u8; 256] {
    let mut t = [0u8; 256];
    let mut c = 0usize;
    while c < 256 {
        let b = c as u8;
        let mut v = 0u8;
        if b == b':' {
            v |= T_COLON;
        }
        if matches!(b, b'\t' | b'\n' | b'\r') {
            // до forbidden-проверки: это не ошибка, а рестарт фазы 0
            v |= T_DIRTY_HOST;
        }
        if b.is_ascii_uppercase() {
            v |= F_H_UPPER;
        }
        if b == b'%' {
            // '%' — не ошибка, а маркер декодирования (в списке forbidden,
            // но решение принимает percent-decode)
            v |= F_H_PCT;
        } else {
            if b >= 0x80 {
                v |= F_H_NONASCII;
            }
            if is_forbidden_host_byte(b) {
                v |= F_H_FORBIDDEN;
            }
        }
        t[c] = v;
        c += 1;
    }
    t
}

static HOST_DOMAIN_TBL: [u8; 256] = build_host_domain_table();

/// Таблица терминаторов authority: '/', '?', '#' и '\\' у спец-схем.
/// v0.6: кроме бита терминатора — маркер '@' (M_AT): горячий цикл скана
/// только запоминает ПОСЛЕДНИЙ '@' в регистре, поэтому parse_userinfo
/// для URL без userinfo (типичный случай) НЕ СКАНИРУЕТ authority вовсе
/// (раньше rfind_byte('@') проходил весь спан хоста назад). При наличии
/// '@' — redo-проход только по userinfo-спану (точная прежняя семантика).
const AUTH_TERM_BIT: u8 = 1 << 0;
const AUTH_M_AT: u8 = 1 << 1;
/// \t\n\r в authority — грязь отложенной фазы 0 (v0.7)
const AUTH_T_DIRTY: u8 = 1 << 2;
const fn build_auth_term_table(special: bool) -> [u8; 256] {
    let mut t = [0u8; 256];
    t[b'/' as usize] = AUTH_TERM_BIT;
    t[b'?' as usize] = AUTH_TERM_BIT;
    t[b'#' as usize] = AUTH_TERM_BIT;
    t[b'@' as usize] = AUTH_M_AT;
    t[b'\t' as usize] = AUTH_T_DIRTY;
    t[b'\n' as usize] = AUTH_T_DIRTY;
    t[b'\r' as usize] = AUTH_T_DIRTY;
    if special {
        t[b'\\' as usize] = AUTH_TERM_BIT;
    }
    t
}

static AUTH_TERM_SPECIAL: [u8; 256] = build_auth_term_table(true);
static AUTH_TERM_GENERIC: [u8; 256] = build_auth_term_table(false);

/// Таблица символов схемы: валидный символ схемы (alnum, '+', '-', '.') —
/// S_OK; верхняя буква дополнительно S_UPPER (детект слит со сканом);
/// ':' — S_COLON (конец схемы); всё остальное — 0 (ошибка).
const S_OK: u8 = 1;
const S_COLON: u8 = 2;
const S_UPPER: u8 = 4;
/// \t\n\r в схеме — грязь отложенной фазы 0 (v0.7)
const S_DIRTY: u8 = 8;
const fn build_scheme_table() -> [u8; 256] {
    let mut t = [0u8; 256];
    let mut c = 0usize;
    while c < 256 {
        let ch = c as u8;
        if ch.is_ascii_alphanumeric() || matches!(ch, b'+' | b'-' | b'.') {
            t[c] = S_OK;
        }
        if ch.is_ascii_uppercase() {
            t[c] |= S_UPPER;
        }
        c += 1;
    }
    t[b':' as usize] = S_COLON;
    t[b'\t' as usize] = S_DIRTY;
    t[b'\n' as usize] = S_DIRTY;
    t[b'\r' as usize] = S_DIRTY;
    t
}

static SCHEME_TBL: [u8; 256] = build_scheme_table();

/// Результат табличного прохода по спану домена.
struct HostScan {
    host_end: usize,
    has_port: bool,
    /// \t\n\r в спане — рестарт отложенной фазы 0 (v0.7)
    dirty: bool,
    has_upper: bool,
    /// первая '%' — нужен percent-decode (редкий путь)
    pct: Option<usize>,
    /// первый запрещённый/не-ASCII байт: (позиция, не-ASCII?) —
    /// НЕИЗБЕЖНАЯ ошибка: такие байты попадают в декодированный хост
    /// дословно, но вид ошибки решает декод при наличии '%'
    bad: Option<(usize, bool)>,
}

/// Применённый исход домена (без заимствования self — parse_domain
/// мутит поля по результату).
enum DomainOutcome {
    /// IPv4-хост: Some — сериализация (отлична от входа), None — вход
    /// уже каноничен
    Ipv4(Option<String>),
    /// хост остаётся заимствованным; bool — взвести F_HOST_LOWER
    Borrowed(bool),
    /// owned-хост из percent-decode (уже в нижнем регистре; флаг
    /// F_HOST_LOWER сбрасывается — он уже каноничен)
    Owned(String),
}

/// Общий хвост домена (свободная функция): ends-in-a-number -> IPv4,
/// флаг нижнего регистра, owned при percent-decode.
fn finish_domain(
    from: usize,
    host_bytes: &[u8],
    raw_span: &[u8],
    has_upper: bool,
) -> Result<DomainOutcome, Error> {
    // ends-in-a-number -> IPv4-парсер
    if ends_in_a_number(host_bytes) {
        let dotted = ipv4_serialize(host_bytes).ok_or(Error {
            position: from,
            kind: ErrorKind::InvalidIpv4Address,
        })?;
        return Ok(DomainOutcome::Ipv4(
            (host_bytes != dotted.as_bytes()).then_some(dotted),
        ));
    }
    if host_bytes != raw_span {
        // был percent-decode — результат отличен от raw
        return Ok(DomainOutcome::Owned(
            String::from_utf8_lossy(host_bytes).to_ascii_lowercase(),
        ));
    }
    Ok(DomainOutcome::Borrowed(has_upper))
}

/// Один проход по [from..end): конец хоста (':'), верхний регистр,
/// '%' и запрещённые/не-ASCII байты. Заменяет три прохода (SWAR find
/// ':' + memchr '%' + побайтовая валидация). Порядок bad — как в
/// прежнем цикле валидации (первый плохой байт определяет ошибку).
#[inline]
fn scan_host_domain(bytes: &[u8], from: usize, end: usize) -> HostScan {
    let mut s = HostScan {
        host_end: end,
        has_port: false,
        dirty: false,
        has_upper: false,
        pct: None,
        bad: None,
    };
    let mut i = from;
    while i < end {
        let t = HOST_DOMAIN_TBL[bytes[i] as usize];
        if t == 0 {
            i += 1;
            continue;
        }
        if t & T_DIRTY_HOST != 0 {
            s.dirty = true;
            return s;
        }
        if t & T_COLON != 0 {
            // байты после ':' — порт (валидация цифр отдельно)
            s.host_end = i;
            s.has_port = true;
            return s;
        }
        if t & F_H_UPPER != 0 {
            s.has_upper = true;
            i += 1;
            continue;
        }
        if t & F_H_PCT != 0 {
            if s.pct.is_none() {
                s.pct = Some(i);
            }
        } else if s.bad.is_none() {
            s.bad = Some((i, t & F_H_NONASCII != 0));
        }
        i += 1;
    }
    s
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
/// const fn — используется при построении HOST_DOMAIN_TBL.
#[inline]
const fn is_forbidden_host_byte(c: u8) -> bool {
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
    // v0.6: pre-check по последнему байту — все «числовые» хвосты
    // (dec / 0x-hex / 0-octal) кончаются ASCII-hex-цифрой; домены вроде
    // "example.com" отбрасываются без обратного скана сегментов.
    let mut end = host.len();
    if end == 0 {
        return false;
    }
    if end >= 2 && host[end - 1] == b'.' {
        end -= 1; // end >= 2 до декремента — ноль здесь невозможен
    }
    if !host[end - 1].is_ascii_hexdigit() {
        return false;
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
        // v0.6: userinfo должен быть каноничен для zero-copy — сериализатор
        // опускает '@' при пустых user+pass и ':' при пустом pass, поэтому
        // "https://@h/", "https://:@h/", "https://user:@h/" не равны raw
        // (раньше '@'/' :' писались всегда — raw совпадал по построению)
        let userinfo_canonical = match self.userinfo {
            None => true,
            Some((us, ue)) => match self.userinfo_colon {
                Some(c) => ue > c + 1, // pass непуст — user может быть пустым
                None => ue > us,       // '@' пишется только при непустом user
            },
        };
        if self.flags == 0
            && self.host_owned.is_none()
            && !port_elided
            && !special_empty_path
            && userinfo_canonical
        {
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

            // userinfo: структурный ':' не кодируется, внутренние ':' пароля — да.
            // v0.6 паритет с WHATWG-сериализатором (нашёл тест-краем):
            // '@' пишется ТОЛЬКО при непустом user ИЛИ непустом pass
            // ("https://@h/" и "https://:@h/" сериализуются без userinfo),
            // ':' — только при непустом pass ("user:@h" -> "user@h").
            if let Some((us, ue)) = self.userinfo {
                let (us, ue) = (us as usize, ue as usize);
                let colon = self.userinfo_colon.map(|c| c as usize);
                let has_user = match colon {
                    Some(c) => c > us,
                    None => ue > us,
                };
                let has_pass = match colon {
                    Some(c) => ue > c + 1,
                    None => false,
                };
                if has_user || has_pass {
                    let bytes = raw.as_bytes();
                    match colon {
                        Some(c) => {
                            let (user, pass) = (&bytes[us..c], &bytes[c + 1..ue]);
                            if self.flags & F_USERINFO_ENC != 0 {
                                write_encoded(&mut out, user, userinfo_needs_enc);
                                if has_pass {
                                    out.push(':');
                                    write_encoded(&mut out, pass, userinfo_needs_enc);
                                }
                            } else {
                                out.push_str(raw.get(us..c).unwrap_or(""));
                                if has_pass {
                                    out.push(':');
                                    out.push_str(raw.get(c + 1..ue).unwrap_or(""));
                                }
                            }
                        }
                        None => {
                            // colon нет — has_user == (ue > us) истинно здесь
                            if self.flags & F_USERINFO_ENC != 0 {
                                write_encoded(&mut out, &bytes[us..ue], userinfo_needs_enc);
                            } else {
                                out.push_str(&raw[us..ue]);
                            }
                        }
                    }
                    out.push('@');
                }
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
            } else if self.flags & (F_PATH_NORM | F_PATH_ENC) != 0 {
                // v0.4: WHATWG path state обрабатывает dot-сегменты и у
                // НЕ-специальных схем (раньше — паритет-баг с `url`);
                // '\' разделителем здесь НЕ является.
                write_path_normalized(&mut out, path, false);
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

    /// Путь: у специальных схем пустой путь — "/", dot-сегменты
    /// нормализованы (v0.4 — и у не-специальных с authority).
    pub fn path(&self) -> Cow<'_, str> {
        let (ps, pe) = (self.path.0 as usize, self.path.1 as usize);
        let p = &self.raw[ps..pe];
        let special = self.kind.is_special();
        if special && p.is_empty() {
            return Cow::Borrowed("/");
        }
        if self.flags & (F_PATH_NORM | F_PATH_ENC) != 0 {
            let mut buf = String::with_capacity(p.len() + 1);
            write_path_normalized(&mut buf, p.as_bytes(), special);
            return Cow::Owned(buf);
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

    /// Пароль (Some только если ':' присутствует и пароль НЕПУСТ —
    /// v0.6 паритет с `url::Url::password`, который хранит пустой пароль
    /// как отсутствие; сырой спан входа — см. [`Url::username`]).
    pub fn password(&self) -> Option<&str> {
        match (self.userinfo, self.userinfo_colon) {
            (Some((_, ue)), Some(c)) => {
                let pass = &self.raw[c as usize + 1..ue as usize];
                (!pass.is_empty()).then_some(pass)
            }
            _ => None,
        }
    }
}

/// percent-кодирование в `out` по предикату набора (hex в верхнем регистре).
/// Запись — сырыми байтами через `as_mut_vec` (было: `out.push(c as char)`
/// с UTF-8-механикой и проверкой ёмкости на каждый байт — 8.3%+1.4% профиля).
///
/// v0.4 fast-path: предикат false на всём срезе => одна memcpy вместо
/// побайтового push (типичные сегменты/запросы целиком чистые — основной
/// случай в write_path_normalized).
///
/// SAFETY: пишутся только ASCII-байты. Все предикаты (`path_`, `query_`,
/// `fragment_`, `userinfo_needs_enc`) при needs(c) == false допускают
/// только байты 0x20..=0x7E (не-ASCII и C0 кодируются в %XX), а байты
/// «%XY» и HEX — ASCII. UTF-8-валидность String не нарушается (в fast-path
/// срез ЦЕЛИКОМ из 0x20..=0x7E — ASCII).
fn write_encoded(out: &mut String, bytes: &[u8], needs: impl Fn(u8) -> bool) {
    const HEX: &[u8; 16] = b"0123456789ABCDEF";
    let v = unsafe { out.as_mut_vec() };
    v.reserve(bytes.len());
    if !bytes.iter().any(|&c| needs(c)) {
        push_bytes(v, bytes);
        return;
    }
    for &c in bytes {
        if needs(c) {
            v.extend_from_slice(&[b'%', HEX[(c >> 4) as usize], HEX[(c & 0xF) as usize]]);
        } else {
            v.push(c);
        }
    }
}

/// Копирование байтов в Vec без вызова memcpy для коротких кусков:
/// чанки фиксированной длины (u64/u32/u16/u8) инлайнятся в мувы — вызов
/// memcpy на кусках 1-6 байтов (типичные сегменты) дороже самого
/// копирования (давало +13.7% на userinfo-сериализации).
#[inline]
fn push_bytes(v: &mut Vec<u8>, bytes: &[u8]) {
    let mut i = 0;
    while bytes.len() - i >= 8 {
        let c = u64::from_le_bytes(bytes[i..i + 8].try_into().unwrap());
        v.extend_from_slice(&c.to_le_bytes());
        i += 8;
    }
    if bytes.len() - i >= 4 {
        let c = u32::from_le_bytes(bytes[i..i + 4].try_into().unwrap());
        v.extend_from_slice(&c.to_le_bytes());
        i += 4;
    }
    let rem = bytes.len() - i; // 0..=3
    if rem & 2 != 0 {
        let c = u16::from_le_bytes(bytes[i..i + 2].try_into().unwrap());
        v.extend_from_slice(&c.to_le_bytes());
        i += 2;
    }
    if rem & 1 != 0 {
        v.push(bytes[i]);
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
                // Классификация одним switch по длине (v0.4; было: до 5
                // вызовов eq_ignore_ascii_case на каждый сегмент).
                match dot_kind(seg) {
                    1 => {
                        if is_last {
                            trailing = true;
                        }
                    }
                    2 => {
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
                    }
                    _ => {
                        if is_last && seg.is_empty() {
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
        let corpus = [
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
            // v0.4: точный F_PATH_NORM + generic-нормализация
            "x://h/a/../b",
            "x://h/a/./b",
            "x://h/a/b/..",
            "x://h/../c",
            "x://h/a/%2E/b",
            "x://h",
            "https://a/app.main.min.css",
            "https://a/index.html?q=/a/../b",
            "https://a/%20/x",
            "https://a/%2ex",
            "https://a/x/%2e",
            "https://a/x/%2e%2E/y",
            "https://a/.gitignore/./x",
            "https://user:pa:ss@example.com/secure/path",
            "https://example.com/pa th/x?q=a b#f rag",
            "https://maps.example.com/поиск?q=значение",
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

    /// Эквивалентность dot_kind эталонной цепочке eq_ignore_ascii_case
    /// (бывшей реализации write_path_normalized) — исчерпывающе по
    /// алфавиту dot-паттернов до длины 6 включительно.
    #[test]
    fn dot_kind_matches_reference() {
        fn reference(seg: &[u8]) -> u8 {
            if seg.len() == 1 && seg[0] == b'.' || seg.eq_ignore_ascii_case(b"%2e") {
                1
            } else if seg.len() == 2 && seg == b".."
                || seg.eq_ignore_ascii_case(b".%2e")
                || seg.eq_ignore_ascii_case(b"%2e.")
                || seg.eq_ignore_ascii_case(b"%2e%2e")
            {
                2
            } else {
                0
            }
        }
        const ALPHA: &[u8] = b".%2eEx/";
        let mut buf = [0u8; 8];
        for len in 0..=6usize {
            let total = ALPHA.len().pow(len as u32);
            for idx in 0..total {
                let mut x = idx;
                for slot in buf[..len].iter_mut() {
                    *slot = ALPHA[x % ALPHA.len()];
                    x /= ALPHA.len();
                }
                let seg = &buf[..len];
                assert_eq!(dot_kind(seg), reference(seg), "seg={:?}", seg);
            }
        }
        // длиннее 6 байтов dot-сегментов не бывает
        for long in ["......", "%2e%2e%2e", ".%2e%2e%2e", "....x"] {
            assert_eq!(dot_kind(long.as_bytes()), reference(long.as_bytes()));
            assert_eq!(dot_kind(long.as_bytes()), 0);
        }
    }

    /// Точность F_PATH_NORM (v0.4): точки ВНУТРИ сегментов и «%20»
    /// не вынуждают пересборку as_str — zero-copy сохраняется; настоящие
    /// dot-сегменты/кодирование/обратные слэши — по-прежнему Owned.
    #[test]
    fn path_flag_precision_zero_copy() {
        for u in [
            "https://a/app.main.min.css",
            "https://a/index.html",
            "https://a/x/y.txt/",
            "https://a/%20/x",
            "https://a/x.%20y",
            "https://a/%2ex",
            "https://a/.gitignore",
        ] {
            let p = parse(u).unwrap();
            assert!(
                matches!(p.as_str(), Cow::Borrowed(_)),
                "must be borrowed: {u}"
            );
            assert_eq!(p.as_str(), u, "borrowed = вход без изменений: {u}");
        }
        for u in [
            "https://a/./x",
            "https://a/x/../y",
            "https://a/%2e/y",
            "https://a/pa th",
            "https://a\\b",
        ] {
            let p = parse(u).unwrap();
            assert!(matches!(p.as_str(), Cow::Owned(_)), "must be owned: {u}");
        }
    }

    /// WHATWG path state нормализует dot-сегменты и у НЕ-специальных схем
    /// с authority (v0.4 — раньше был баг паритета с `url`).
    #[test]
    fn non_special_authority_normalizes_dots() {
        for (input, expect) in [
            ("x://h/a/../b", "x://h/b"),
            ("x://h/a/./b", "x://h/a/b"),
            ("x://h/a/b/..", "x://h/a/"),
            ("x://h/../c", "x://h/c"),
            ("x://h/a/%2E/b", "x://h/a/b"),
            ("x://h", "x://h"),
        ] {
            let ours = parse(input).unwrap();
            assert_eq!(ours.as_str(), expect, "ours: {input}");
            assert_eq!(
                url::Url::parse(input).unwrap().as_str(),
                expect,
                "url: {input}"
            );
            assert_eq!(ours.path().as_ref(), url::Url::parse(input).unwrap().path());
        }
    }

    /// v0.6: схема — верхний регистр (в т.ч. ПЕРВОГО байта — теперь он
    /// тоже входит в слитый детект), двойной '@' (последний открывает
    /// хост, первый кодируется), ПУСТОЙ userinfo (WHATWG-сериализатор
    /// опускает '@' при пустых user+pass и ':' при пустом pass — баг
    /// паритета с `url`, найден краевым тестом); хвосты
    /// ends-in-a-number. Паритет as_str с `url` на каждом случае.
    #[test]
    fn scheme_upper_userinfo_and_number_tails() {
        for input in [
            "HTTP://example.com/",        // верхний ПЕРВЫЙ байт схемы
            "hTtPs://Example.COM/Path",   // смешанный регистр схемы
            "HTTPS://a@b@Example.com/",   // двойной '@' — последний хост
            "https://@example.com/",      // пустой userinfo — '@' опускается
            "https://:@example.com/",     // оба пусты — '@' опускается
            "https://user:@example.com/", // пустой pass — ':' опускается
            "https://:pass@example.com/", // пустой user — ':pass' остаётся
            "https://user:secret@EXAMPLE.com/secure/path",
            "http://example.com./",   // хвостовая точка — не число
            "http://0x7f.0x1/",       // hex-хвост -> IPv4
            "http://example.0x1f.1/", // 0x-сегмент не в конце
            "http://010.1/",          // octal-хвост
            "WS://ex.com:80/chat",    // спец-схема верхним регистром
        ] {
            let ours = parse(input);
            let theirs = url::Url::parse(input);
            assert_eq!(
                ours.as_ref().map(|u| u.as_str().into_owned()).ok(),
                theirs.as_ref().ok().map(|u| u.as_str().to_string()),
                "as_str parity: {input}"
            );
        }
        // компоненты двойного '@': user — сырой спан "a@b" (документированное
        // расхождение с url, который даёт канонический "a%40b"); пароль None
        let o = parse("HTTPS://a@b@Example.com/").unwrap();
        let t = url::Url::parse("https://a@b@example.com/").unwrap();
        assert_eq!(o.username(), "a@b");
        assert_eq!(t.username(), "a%40b");
        assert_eq!(o.password(), t.password());
        // хост: у нас сырой спан ("Example.com"), канонический (lowercase)
        // даёт as_str (паритет с as_str(url) уже проверен выше)
        assert_eq!(o.host_str().as_deref(), Some("Example.com"));
        assert_eq!(t.host_str(), Some("example.com"));
        // пустой/непустой пароль: None vs Some — как у url
        for input in [
            "https://user:@example.com/",
            "https://:pass@example.com/",
            "https://:@example.com/",
            "https://@example.com/",
        ] {
            let o = parse(input).unwrap();
            let t = url::Url::parse(input).unwrap();
            assert_eq!(o.password(), t.password(), "password: {input}");
        }
    }

    /// Границы u128-чанков SWAR-скана грязных пробелов (16Б/итер):
    /// \t/\n/\r ровно на 15/16/17-м байте и в самом хвосте.
    #[test]
    fn dirty_ws_chunk_boundaries() {
        // базовый "http://ex.com/" = 14 байт; добиваем путь до 15..=34
        for pad in 0..=20usize {
            let mut u = String::from("http://ex.com/");
            for _ in 0..pad {
                u.push('a');
            }
            u.push('\t');
            let clean = u.replace('\t', "");
            assert_eq!(
                parse(&u).unwrap().as_str(),
                parse(&clean).unwrap().as_str(),
                "tab at byte {} (pad={pad})",
                u.len()
            );
        }
        // \n и \r в середине, \r перед ':'
        assert_eq!(
            parse("http://ex\n.com/a").unwrap().as_str(),
            "http://ex.com/a"
        );
        assert_eq!(
            parse("http\r://ex.com/a").unwrap().as_str(),
            "http://ex.com/a"
        );
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
            // v0.4: NORM — только '\\' у спец-схем; '.'/'%' — маркер
            // T_DOTLEAD (реальный флаг ставит lookahead парсера)
            assert_eq!(ps & F_PATH_NORM != 0, c == b'\\');
            assert!(!(pg & F_PATH_NORM != 0));
            assert_eq!(ps & T_DOTLEAD != 0, matches!(c, b'.' | b'%'));
            assert_eq!(pg & T_DOTLEAD != 0, matches!(c, b'.' | b'%'));
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

    /// v0.7 отложенная фаза 0: \t\n\r на КАЖДОЙ позиции URL (все
    /// компоненты — схема-края не бывает, authority, путь, запрос,
    /// фрагмент) и обрезаемые края — ok/err и сериализация паритетны
    /// url-крейту (он всегда чистит до разбора — эталон рестарта).
    #[test]
    fn deferred_dirty_ws_restart_parity() {
        let base = "https://example.com/path/x?q=1#f";
        for pos in 0..=base.len() {
            for ws in ["\t", "\n", "\r"] {
                let mut s = String::with_capacity(base.len() + 1);
                s.push_str(&base[..pos]);
                s.push_str(ws);
                s.push_str(&base[pos..]);
                match (url::Url::parse(&s), crate::parse(&s)) {
                    (Ok(e), Ok(o)) => assert_eq!(o.as_str(), e.as_str(), "pos={pos} ws={ws:?}"),
                    (Err(_), Err(_)) => {}
                    (e, o) => panic!("pos={pos} ws={ws:?}: url={e:?} ours={o:?}"),
                }
            }
        }
        // края: пробелы/C0/табы с двух сторон + комбо с внутренней грязью
        let cases = [
            " https://example.com/x ",
            "  https://example.com/x",
            "https://example.com/x  ",
            "\u{1}https://example.com/x\u{1}",
            " \thttps://example.com/x\n ",
            "https://exa\tmple.com/x ",
            " https://user\tname@example.com/x",
            "https://example.com/pa\tth?q\n=1#f\r",
            "\t\n\rhttps://example.com/x\t\n\r",
            "   ",
            "\t",
            "",
        ];
        for case in cases {
            match (url::Url::parse(case), crate::parse(case)) {
                (Ok(e), Ok(o)) => assert_eq!(o.as_str(), e.as_str(), "case={case:?}"),
                (Err(_), Err(_)) => {}
                (e, o) => panic!("case={case:?}: url={e:?} ours={o:?}"),
            }
        }
    }
}
