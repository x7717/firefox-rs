//! FoxJSON — быстрый однопроходный JSON-парсер для горячих путей Firefox
//! (session store, prefs, telemetry).
//!
//! Ключевые свойства:
//! - zero-copy: строки и ключи без escape-последовательностей заимствуются
//!   из входа ([`Cow::Borrowed`]), с escape — аллоцируются ([`Cow::Owned`]);
//! - объекты — срез пар с сохранением порядка (быстрее HashMap на малых
//!   объектах, что доминирует в реальных payload'ах браузера);
//! - строгая валидация: грамматика чисел, контрольные символы, lone surrogates;
//! - ограничение глубины вложенности ([`MAX_DEPTH`], как в serde_json).
//!
//! Итерация 3 (по данным perf-профиля: parse_value 28%, parse_string 18%):
//! - SWAR-скан строк: 8 байт/итерацию, поиск кавычки/backslash/контроля
//!   битовыми трюками вместо побайтового match;
//! - быстрый путь чисел: сборка мантиссы в u64 + точные степени десятки
//!   (вместо `str::parse::<f64>`) — корректно округлённый результат,
//!   эквивалентный serde_json; медленный путь только для переполнений.

use std::borrow::Cow;
use std::fmt;

/// Максимальная глубина вложенности (как в serde_json по умолчанию).
pub const MAX_DEPTH: usize = 128;

const SWAR_LO: u64 = 0x0101_0101_0101_0101;
const SWAR_HI: u64 = 0x8080_8080_8080_8080;

/// 10^0..=10^22 — все точно представимы в f64.
const POW10: [f64; 23] = [
    1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16,
    1e17, 1e18, 1e19, 1e20, 1e21, 1e22,
];

/// JSON-значение.
#[derive(Debug, Clone, PartialEq)]
pub enum Value<'a> {
    Null,
    Bool(bool),
    Number(f64),
    Str(Cow<'a, str>),
    Array(Vec<Value<'a>>),
    Object(Vec<(Cow<'a, str>, Value<'a>)>),
}

impl<'a> Value<'a> {
    /// Значение по ключу объекта (первое вхождение; порядок ключей сохраняется).
    pub fn get(&self, key: &str) -> Option<&Value<'a>> {
        match self {
            Value::Object(pairs) => pairs.iter().find(|(k, _)| k == key).map(|(_, v)| v),
            _ => None,
        }
    }

    pub fn as_str(&self) -> Option<&str> {
        match self {
            Value::Str(s) => Some(s.as_ref()),
            _ => None,
        }
    }

    pub fn as_f64(&self) -> Option<f64> {
        match self {
            Value::Number(n) => Some(*n),
            _ => None,
        }
    }

    pub fn as_array(&self) -> Option<&[Value<'a>]> {
        match self {
            Value::Array(a) => Some(a),
            _ => None,
        }
    }

    pub fn as_object(&self) -> Option<&[(Cow<'a, str>, Value<'a>)]> {
        match self {
            Value::Object(o) => Some(o),
            _ => None,
        }
    }

    pub fn is_null(&self) -> bool {
        matches!(self, Value::Null)
    }
}

/// Вид ошибки парсинга.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ErrorKind {
    UnexpectedEof,
    UnexpectedChar(u8),
    InvalidNumber,
    InvalidEscape,
    InvalidUnicodeEscape,
    LoneSurrogate,
    ControlCharInString,
    InvalidLiteral,
    MaxDepthExceeded,
    TrailingCharacters,
}

/// Ошибка парсинга с позицией во входе (в байтах).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Error {
    pub position: usize,
    pub kind: ErrorKind,
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "JSON error at byte {}: {:?}", self.position, self.kind)
    }
}

impl std::error::Error for Error {}

/// Публичный одношаговый API: распарсить весь документ.
pub fn parse(input: &str) -> Result<Value<'_>, Error> {
    Parser::new(input).parse_document()
}

/// Однопроходный рекурсивный парсер поверх байтов.
pub struct Parser<'a> {
    input: &'a str,
    bytes: &'a [u8],
    pos: usize,
    depth: usize,
}

/// Результат SWAR-скана содержимого строки.
enum StringScan {
    /// Позиция закрывающей кавычки (escape-последовательностей не было).
    Closed(usize),
    /// Позиция backslash — нужен медленный путь.
    Escape(usize),
}

#[inline]
fn swar_broadcast(b: u8) -> u64 {
    (b as u64) * SWAR_LO
}

/// Ненулевой результат <=> в одном из байтов `x` нулевой байт (точно).
#[inline]
fn swar_has_zero(x: u64) -> u64 {
    x.wrapping_sub(SWAR_LO) & !x & SWAR_HI
}

/// Ненулевой результат <=> есть байт < 0x20.
/// Точных ложных отрицаний нет; возможны ложные срабатывания (безвредно —
/// в этом случае чанк добирается побайтово).
#[inline]
fn swar_has_control(x: u64) -> u64 {
    x.wrapping_sub(0x20 * SWAR_LO) & !x & SWAR_HI
}

impl<'a> Parser<'a> {
    pub fn new(input: &'a str) -> Self {
        Self {
            input,
            bytes: input.as_bytes(),
            pos: 0,
            depth: 0,
        }
    }

    /// Парсит документ целиком, требуя исчерпания входа.
    pub fn parse_document(&mut self) -> Result<Value<'a>, Error> {
        self.skip_ws();
        let v = self.parse_value()?;
        self.skip_ws();
        if self.pos != self.bytes.len() {
            return Err(self.err(ErrorKind::TrailingCharacters));
        }
        Ok(v)
    }

    #[inline]
    fn parse_value(&mut self) -> Result<Value<'a>, Error> {
        match self.peek() {
            None => Err(self.err(ErrorKind::UnexpectedEof)),
            Some(b'{') => self.parse_object(),
            Some(b'[') => self.parse_array(),
            Some(b'"') => self.parse_string().map(Value::Str),
            Some(b't') => self.parse_lit(b"true", Value::Bool(true)),
            Some(b'f') => self.parse_lit(b"false", Value::Bool(false)),
            Some(b'n') => self.parse_lit(b"null", Value::Null),
            Some(b'-') | Some(b'0'..=b'9') => self.parse_number(),
            Some(c) => Err(self.err(ErrorKind::UnexpectedChar(c))),
        }
    }

    #[inline]
    fn peek(&self) -> Option<u8> {
        self.bytes.get(self.pos).copied()
    }

    #[inline]
    fn skip_ws(&mut self) {
        // быстрый отказ: в компактном JSON между токенами обычно нет пробелов
        match self.bytes.get(self.pos) {
            Some(b' ' | b'\t' | b'\n' | b'\r') => self.skip_ws_slow(),
            _ => {}
        }
    }

    fn skip_ws_slow(&mut self) {
        while let Some(b) = self.peek() {
            match b {
                b' ' | b'\t' | b'\n' | b'\r' => self.pos += 1,
                _ => break,
            }
        }
    }

    fn enter(&mut self) -> Result<(), Error> {
        self.depth += 1;
        if self.depth > MAX_DEPTH {
            return Err(self.err(ErrorKind::MaxDepthExceeded));
        }
        Ok(())
    }

    fn parse_lit(&mut self, lit: &[u8], value: Value<'a>) -> Result<Value<'a>, Error> {
        if self.bytes.len() - self.pos >= lit.len()
            && &self.bytes[self.pos..self.pos + lit.len()] == lit
        {
            self.pos += lit.len();
            Ok(value)
        } else {
            Err(self.err(ErrorKind::InvalidLiteral))
        }
    }

    /// Быстрый парсер чисел: грамматика JSON проверяется по ходу, значение
    /// собирается из мантиссы (u64) и точной степени десятки.
    ///
    /// Корректность: mant <= 2^53 точно в f64; 10^k (k <= 22) точно; IEEE
    /// mul/div возвращают корректно округлённый результат точной операции —
    /// он совпадает с результатом `str::parse::<f64>` (тоже корректно
    /// округляющего то же вещественное число). Всё остальное — fallback.
    fn parse_number(&mut self) -> Result<Value<'a>, Error> {
        let start = self.pos;
        let neg = self.peek() == Some(b'-');
        if neg {
            self.pos += 1;
        }

        // --- целая часть
        let mut mant: u64;
        let mut overflow = false;
        match self.peek() {
            Some(b'0') => {
                self.pos += 1;
                mant = 0;
            }
            Some(c @ b'1'..=b'9') => {
                mant = (c - b'0') as u64;
                self.pos += 1;
                while let Some(c @ b'0'..=b'9') = self.peek() {
                    mant = fold_digit(mant, c, &mut overflow);
                    self.pos += 1;
                }
            }
            _ => return Err(self.err(ErrorKind::InvalidNumber)),
        }

        // --- дробная часть
        let mut frac_digits: u32 = 0;
        if self.peek() == Some(b'.') {
            self.pos += 1;
            match self.peek() {
                Some(c @ b'0'..=b'9') => {
                    frac_digits = 1;
                    mant = fold_digit(mant, c, &mut overflow);
                    self.pos += 1;
                }
                _ => return Err(self.err(ErrorKind::InvalidNumber)),
            }
            while let Some(c @ b'0'..=b'9') = self.peek() {
                frac_digits += 1;
                mant = fold_digit(mant, c, &mut overflow);
                self.pos += 1;
            }
        }

        // --- экспонента
        let mut exp_shift: i32 = 0; // итоговый сдвиг степени: exp - frac_digits
        let mut has_exp = false;
        if matches!(self.peek(), Some(b'e') | Some(b'E')) {
            has_exp = true;
            self.pos += 1;
            let exp_neg = matches!(self.peek(), Some(b'-'));
            if matches!(self.peek(), Some(b'+') | Some(b'-')) {
                self.pos += 1;
            }
            let mut exp: i32;
            match self.peek() {
                Some(c @ b'0'..=b'9') => {
                    exp = (c - b'0') as i32;
                    self.pos += 1;
                }
                _ => return Err(self.err(ErrorKind::InvalidNumber)),
            }
            while let Some(c @ b'0'..=b'9') = self.peek() {
                exp = exp.saturating_mul(10).saturating_add((c - b'0') as i32);
                if exp > 99_999 {
                    exp = 99_999; // далеко за границами быстрого пути — клампим
                    overflow = true; // и помечаем необходимость fallback
                }
                self.pos += 1;
            }
            let signed = if exp_neg { -exp } else { exp };
            exp_shift = signed - frac_digits as i32;
        }

        // --- сборка значения (быстрый путь)
        if !overflow && mant <= (1u64 << 53) {
            let mf = mant as f64;
            let sign = if neg { -1.0f64 } else { 1.0f64 };
            if !has_exp {
                if frac_digits == 0 {
                    // целое, включая -0.0 (семантика JSON "-0")
                    return Ok(Value::Number(if neg { -mf } else { mf }));
                }
                if frac_digits <= 22 {
                    return Ok(Value::Number(sign * (mf / POW10[frac_digits as usize])));
                }
            } else if exp_shift >= 0 && exp_shift <= 22 {
                return Ok(Value::Number(sign * (mf * POW10[exp_shift as usize])));
            } else if exp_shift < 0 && exp_shift >= -22 {
                return Ok(Value::Number(sign * (mf / POW10[(-exp_shift) as usize])));
            }
        }

        // --- fallback: полное значение строки (грамматика уже проверена)
        let text = &self.input[start..self.pos];
        text.parse::<f64>()
            .map(Value::Number)
            .map_err(|_| self.err(ErrorKind::InvalidNumber))
    }

    /// Быстрый путь: строка без escape-последовательностей — zero-copy.
    ///
    /// Инвариант безопасности срезов: сканируем байты, но останавливаемся
    /// только на ASCII-байтах (`"`, `\`, control). Любая остановка — граница
    /// символа UTF-8, поэтому срезы `input[start..pos]` всегда валидны.
    fn parse_string(&mut self) -> Result<Cow<'a, str>, Error> {
        self.pos += 1; // открывающая кавычка
        let start = self.pos;
        match self.scan_plain(start)? {
            StringScan::Closed(close) => {
                let s = &self.input[start..close];
                self.pos = close + 1;
                Ok(Cow::Borrowed(s))
            }
            StringScan::Escape(bs) => {
                self.pos = bs;
                self.parse_string_slow(start)
            }
        }
    }

    /// SWAR-скан содержимого строки: 8 байт за итерацию ищем `"`, `\` и
    /// control-байты. Возврат — позиция первой остановки.
    fn scan_plain(&self, start: usize) -> Result<StringScan, Error> {
        let bytes = self.bytes;
        let len = bytes.len();
        let quote_mask = swar_broadcast(b'"');
        let bslash_mask = swar_broadcast(b'\\');
        let mut i = start;
        while i + 8 <= len {
            let x = u64::from_le_bytes(bytes[i..i + 8].try_into().unwrap());
            let m = swar_has_zero(x ^ quote_mask)
                | swar_has_zero(x ^ bslash_mask)
                | swar_has_control(x);
            if m == 0 {
                i += 8;
                continue;
            }
            break; // добираем чанк побайтово
        }
        while i < len {
            match bytes[i] {
                b'"' => return Ok(StringScan::Closed(i)),
                b'\\' => return Ok(StringScan::Escape(i)),
                c if c < 0x20 => return Err(self.err_at(i, ErrorKind::ControlCharInString)),
                _ => i += 1,
            }
        }
        Err(self.err_at(len, ErrorKind::UnexpectedEof))
    }

    /// Медленный путь (v0.4, полный рерайт): вход содержит escape-последовательности.
    ///
    /// Фаза 1: SWAR-прескан содержимого до НАСТОЯЩЕЙ закрывающей кавычки
    /// (escaped `\\"` пропускается по чётности backslash-ов), попутно считаем
    /// backslash-ы. Итог: точная граница строки и точная верхняя оценка
    /// ёмкости результата (len - backslashes) — ровно одна аллокация.
    /// Фаза 2: декодирование — SWAR-чанки между escape копируются целиком,
    /// декодируются только сами escape. Ошибки — с абсолютной позицией.
    fn parse_string_slow(&mut self, start: usize) -> Result<Cow<'a, str>, Error> {
        let (close, bs_count) = self.scan_to_close(start)?;
        let raw = &self.input[start..close];
        let mut out = String::with_capacity(raw.len().saturating_sub(bs_count));
        let bytes = raw.as_bytes();
        let bslash_mask = swar_broadcast(b'\\');
        let mut i = 0usize;
        while i < bytes.len() {
            // SWAR: ищем backslash или control-байт
            let mut j = i;
            while j + 8 <= bytes.len() {
                let x = u64::from_le_bytes(bytes[j..j + 8].try_into().unwrap());
                let m = swar_has_zero(x ^ bslash_mask) | swar_has_control(x);
                if m == 0 {
                    j += 8;
                    continue;
                }
                break;
            }
            let stop = {
                let mut s = None;
                while j < bytes.len() {
                    let c = bytes[j];
                    if c == b'\\' || c < 0x20 {
                        s = Some(j);
                        break;
                    }
                    j += 1;
                }
                s
            };
            let stop = match stop {
                Some(bs) => bs,
                None => {
                    out.push_str(&raw[i..]);
                    break;
                }
            };
            if bytes[stop] < 0x20 {
                return Err(self.err_at(start + stop, ErrorKind::ControlCharInString));
            }
            if stop > i {
                out.push_str(&raw[i..stop]);
            }
            // декодируем escape: bytes[stop] == '\\'
            let e = match bytes.get(stop + 1) {
                Some(&e) => e,
                None => return Err(self.err_at(self.bytes.len(), ErrorKind::UnexpectedEof)),
            };
            match e {
                b'"' => {
                    out.push('"');
                    i = stop + 2;
                }
                b'\\' => {
                    out.push('\\');
                    i = stop + 2;
                }
                b'/' => {
                    out.push('/');
                    i = stop + 2;
                }
                b'b' => {
                    out.push('\u{0008}');
                    i = stop + 2;
                }
                b'f' => {
                    out.push('\u{000C}');
                    i = stop + 2;
                }
                b'n' => {
                    out.push('\n');
                    i = stop + 2;
                }
                b'r' => {
                    out.push('\r');
                    i = stop + 2;
                }
                b't' => {
                    out.push('\t');
                    i = stop + 2;
                }
                b'u' => {
                    let at = stop + 2;
                    let hi = hex4(bytes, at)
                        .ok_or_else(|| self.err_at(start + at, ErrorKind::InvalidUnicodeEscape))?;
                    if (0xD800..0xDC00).contains(&hi) {
                        // старший суррогат: ожидаем \\uYYYY младший суррогат
                        if bytes.get(at + 4) == Some(&b'\\') && bytes.get(at + 5) == Some(&b'u') {
                            let lo_at = at + 6;
                            let lo = hex4(bytes, lo_at).ok_or_else(|| {
                                self.err_at(start + lo_at, ErrorKind::InvalidUnicodeEscape)
                            })?;
                            if (0xDC00..0xE000).contains(&lo) {
                                let c = 0x1_0000 + ((hi - 0xD800) << 10) + (lo - 0xDC00);
                                let ch = char::from_u32(c).ok_or_else(|| {
                                    self.err_at(start + at, ErrorKind::InvalidUnicodeEscape)
                                })?;
                                out.push(ch);
                                i = lo_at + 4;
                            } else {
                                return Err(self.err_at(start + at, ErrorKind::LoneSurrogate));
                            }
                        } else {
                            return Err(self.err_at(start + at, ErrorKind::LoneSurrogate));
                        }
                    } else if (0xDC00..0xE000).contains(&hi) {
                        return Err(self.err_at(start + at, ErrorKind::LoneSurrogate));
                    } else {
                        match char::from_u32(hi) {
                            Some(c) => out.push(c),
                            None => {
                                return Err(
                                    self.err_at(start + at, ErrorKind::InvalidUnicodeEscape)
                                )
                            }
                        }
                        i = at + 4;
                    }
                }
                _ => return Err(self.err_at(start + stop, ErrorKind::InvalidEscape)),
            }
        }
        self.pos = close + 1;
        Ok(Cow::Owned(out))
    }

    /// SWAR-прескан содержимого строки до настоящей закрывающей кавычки.
    /// Возвращает (позиция кавычки, число backslash-ов). Escaped `\\"`
    /// (нечётное число предшествующих backslash-ов) пропускается.
    fn scan_to_close(&self, from: usize) -> Result<(usize, usize), Error> {
        let bytes = self.bytes;
        let len = bytes.len();
        let qm = swar_broadcast(b'"');
        let bm = swar_broadcast(b'\\');
        let mut i = from;
        let mut bs_count = 0usize;
        while i + 8 <= len {
            let x = u64::from_le_bytes(bytes[i..i + 8].try_into().unwrap());
            let m = swar_has_zero(x ^ qm) | swar_has_zero(x ^ bm) | swar_has_control(x);
            if m == 0 {
                i += 8;
                continue;
            }
            let stop = (i + 8).min(len);
            while i < stop {
                match bytes[i] {
                    b'"' => {
                        // экранирована ли? — чётность предшествующих backslash-ов
                        let mut k = i;
                        let mut nb = 0usize;
                        while k > from && bytes[k - 1] == b'\\' {
                            nb += 1;
                            k -= 1;
                        }
                        if nb % 2 == 0 {
                            return Ok((i, bs_count));
                        }
                        i += 1;
                    }
                    b'\\' => {
                        bs_count += 1;
                        i += 1;
                    }
                    c if c < 0x20 => {
                        return Err(self.err_at(i, ErrorKind::ControlCharInString))
                    }
                    _ => i += 1,
                }
            }
        }
        while i < len {
            match bytes[i] {
                b'"' => {
                    let mut k = i;
                    let mut nb = 0usize;
                    while k > from && bytes[k - 1] == b'\\' {
                        nb += 1;
                        k -= 1;
                    }
                    if nb % 2 == 0 {
                        return Ok((i, bs_count));
                    }
                    i += 1;
                }
                b'\\' => {
                    bs_count += 1;
                    i += 1;
                }
                c if c < 0x20 => return Err(self.err_at(i, ErrorKind::ControlCharInString)),
                _ => i += 1,
            }
        }
        Err(self.err_at(len, ErrorKind::UnexpectedEof))
    }

    fn parse_array(&mut self) -> Result<Value<'a>, Error> {
        self.enter()?;
        self.pos += 1; // `[`
        self.skip_ws();
        let mut items = Vec::with_capacity(4); // типичный маленький массив
        if self.peek() == Some(b']') {
            self.pos += 1;
            self.depth -= 1;
            return Ok(Value::Array(items));
        }
        loop {
            self.skip_ws();
            items.push(self.parse_value()?);
            self.skip_ws();
            match self.peek() {
                Some(b',') => self.pos += 1,
                Some(b']') => {
                    self.pos += 1;
                    self.depth -= 1;
                    return Ok(Value::Array(items));
                }
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
        }
    }

    fn parse_object(&mut self) -> Result<Value<'a>, Error> {
        self.enter()?;
        self.pos += 1; // `{`
        self.skip_ws();
        // типичный объект payload'а браузера: < 8 пар — одна аллокация
        let mut pairs: Vec<(Cow<'a, str>, Value<'a>)> = Vec::with_capacity(8);
        if self.peek() == Some(b'}') {
            self.pos += 1;
            self.depth -= 1;
            return Ok(Value::Object(pairs));
        }
        loop {
            self.skip_ws();
            match self.peek() {
                Some(b'"') => {}
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
            let key = self.parse_string()?;
            self.skip_ws();
            match self.peek() {
                Some(b':') => self.pos += 1,
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
            self.skip_ws();
            let value = self.parse_value()?;
            pairs.push((key, value));
            self.skip_ws();
            match self.peek() {
                Some(b',') => self.pos += 1,
                Some(b'}') => {
                    self.pos += 1;
                    self.depth -= 1;
                    return Ok(Value::Object(pairs));
                }
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
        }
    }

    #[inline]
    fn err(&self, kind: ErrorKind) -> Error {
        Error {
            position: self.pos,
            kind,
        }
    }

    #[inline]
    fn err_at(&self, pos: usize, kind: ErrorKind) -> Error {
        Error { position: pos, kind }
    }
}

/// 4 hex-цифры, начиная с `at` (внутри `bytes`); None — не hex или выход за границы.
fn hex4(bytes: &[u8], at: usize) -> Option<u32> {
    if at + 4 > bytes.len() {
        return None;
    }
    let mut v: u32 = 0;
    for k in 0..4 {
        let d = match bytes[at + k] {
            b @ b'0'..=b'9' => (b - b'0') as u32,
            b @ b'a'..=b'f' => (b - b'a' + 10) as u32,
            b @ b'A'..=b'F' => (b - b'A' + 10) as u32,
            _ => return None,
        };
        v = v * 16 + d;
    }
    Some(v)
}

/// Вкидывание цифры в мантиссу с детекцией переполнения u64.
#[inline]
fn fold_digit(mut mant: u64, c: u8, overflow: &mut bool) -> u64 {
    if !*overflow {
        let d = (c - b'0') as u64;
        if mant > (u64::MAX - d) / 10 {
            *overflow = true;
        } else {
            mant = mant * 10 + d;
        }
    }
    mant
}

/// Синтетические документы, повторяющие форму реальных payload'ов Firefox.
/// Используются в тестах, бенчмарках и профилировании.
pub mod sample {
    /// Документ "хранилище сессии": `n` вкладок с URL, заголовками (кириллица,
    /// escape-последовательности), историей и scroll-позициями.
    pub fn session(n: usize) -> String {
        let mut out = String::with_capacity(96 + n * 256);
        out.push_str("{\"schema\":\"sessionstore@1\",\"rev\":17,\"windows\":[{\"tabs\":[");
        for i in 0..n {
            if i > 0 {
                out.push(',');
            }
            out.push_str(&format!(
                "{{\"id\":{i},\"url\":\"https://example.com/page/{i}?q=firefox\\u0026tab={i}\",\"title\":\"Страница \\\"{i}\\\" — тест «сессии»\",\"active\":{active},\"pinned\":{pinned},\"history\":[\"https://example.com/from/{i}\",\"https://example.com/to/{i}\"],\"scroll\":{{\"x\":{x}.5,\"y\":{y}.25}}}}",
                i = i,
                active = i % 2 == 0,
                pinned = i % 7 == 0,
                x = i,
                y = i,
            ));
        }
        out.push_str("]}],\"prefs\":{\"theme\":\"dark\",\"zoom\":1.25,\"telemetry\":true}}");
        out
    }

    /// Документ, интенсивный по ЧИСЛАМ: `n` плоских объектов с целыми,
    /// отрицательными, дробными и экспоненциальными значениями.
    /// Цель — быстрый путь `parse_number` (в session store числа доминируют).
    pub fn nums(n: usize) -> String {
        let mut out = String::with_capacity(64 + n * 96);
        out.push('[');
        for i in 0..n {
            if i > 0 {
                out.push(',');
            }
            out.push_str(&format!(
                "{{\"id\":{i},\"ts\":{ts},\"x\":{x}.5,\"y\":{y}.25,\"w\":{w},\"h\":-{h},\"zoom\":1.{z},\"exp\":{i}e-{e}}}",
                ts = i * 1000 + 7,
                x = i % 4096,
                y = i % 2048,
                w = i * 3 + 1,
                h = i % 97,
                z = i % 10,
                e = i % 3 + 1,
            ));
        }
        out.push(']');
        out
    }

    /// Документ, интенсивный по СТРОКАМ без escape: `n` объектов, где все
    /// значения — длинные заимствуемые строки (быстрый путь `parse_string`).
    pub fn strs(n: usize) -> String {
        let mut out = String::with_capacity(64 + n * 160);
        out.push('[');
        for i in 0..n {
            if i > 0 {
                out.push(',');
            }
            out.push_str(&format!(
                "{{\"url\":\"https://cdn.example.org/assets/bundle-{i}/chunk/app.main.min.css\",\"etag\":\"W/\\\"{i}-0x{hx}\\\"\"}}",
                hx = i * 7919,
            ));
        }
        out.push(']');
        out
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::Value as SValue;

    fn parse_ok(s: &str) -> Value<'_> {
        parse(s).expect("should parse")
    }

    #[test]
    fn primitives() {
        assert!(parse_ok("null").is_null());
        assert_eq!(parse_ok("true"), Value::Bool(true));
        assert_eq!(parse_ok("false"), Value::Bool(false));
        assert_eq!(parse_ok("0"), Value::Number(0.0));
        assert_eq!(parse_ok("-1"), Value::Number(-1.0));
        assert_eq!(parse_ok("3.14"), Value::Number(3.14));
        assert_eq!(parse_ok("1e10"), Value::Number(1e10));
        assert_eq!(parse_ok("-2.5e-3"), Value::Number(-2.5e-3));
        assert_eq!(
            parse_ok("  [ 1 , 2 ] "),
            Value::Array(vec![Value::Number(1.0), Value::Number(2.0)])
        );
        assert_eq!(
            parse_ok("{}"),
            Value::Object(vec![])
        );
    }

    #[test]
    fn strings_and_escapes() {
        assert_eq!(parse_ok(r#""hello""#), Value::Str("hello".into()));
        assert_eq!(
            parse_ok(r#""a\nb\t\"q\"\\/""#),
            Value::Str("a\nb\t\"q\"\\/".into())
        );
        assert_eq!(parse_ok(r#""\u0041""#), Value::Str("A".into()));
        assert_eq!(parse_ok(r#""\ud83d\ude00""#), Value::Str("😀".into()));
        // ключи с escape тоже декодируются
        let v = parse_ok(r#"{"ключ": 1, "esc\u0041": 2}"#);
        assert_eq!(v.get("ключ"), Some(&Value::Number(1.0)));
        assert_eq!(v.get("escA"), Some(&Value::Number(2.0)));
    }

    #[test]
    fn borrowed_vs_owned() {
        let v = parse_ok(r#"["abc", "a\"b"]"#);
        if let Value::Array(items) = &v {
            assert!(matches!(&items[0], Value::Str(Cow::Borrowed(_))));
            assert!(matches!(&items[1], Value::Str(Cow::Owned(_))));
        } else {
            panic!("expected array");
        }
    }

    #[test]
    fn nested_and_get() {
        let doc = r#"{"a":{"b":[1,2,{"c":"deep"}]}}"#;
        let v = parse_ok(doc);
        let deep = v
            .get("a")
            .unwrap()
            .get("b")
            .unwrap()
            .as_array()
            .unwrap()[2]
            .get("c")
            .unwrap()
            .as_str()
            .unwrap();
        assert_eq!(deep, "deep");
    }

    #[test]
    fn errors() {
        assert_eq!(parse("").unwrap_err().kind, ErrorKind::UnexpectedEof);
        assert_eq!(parse("[1,2").unwrap_err().kind, ErrorKind::UnexpectedEof);
        assert_eq!(
            parse(r#"{"a":1,}"#).unwrap_err().kind,
            ErrorKind::UnexpectedChar(b'}')
        );
        assert_eq!(
            parse("[1 2]").unwrap_err().kind,
            ErrorKind::UnexpectedChar(b'2')
        );
        assert_eq!(
            parse(r#""\ud800""#).unwrap_err().kind,
            ErrorKind::LoneSurrogate
        );
        assert_eq!(
            parse(r#""\udc00""#).unwrap_err().kind,
            ErrorKind::LoneSurrogate
        );
        assert_eq!(
            parse(r#""\ud800\u0041""#).unwrap_err().kind,
            ErrorKind::LoneSurrogate
        );
        assert_eq!(
            parse(r#""\q""#).unwrap_err().kind,
            ErrorKind::InvalidEscape
        );
        assert_eq!(
            parse("\"a\nb\"").unwrap_err().kind,
            ErrorKind::ControlCharInString
        );
        assert_eq!(parse("01").unwrap_err().kind, ErrorKind::TrailingCharacters);
        assert_eq!(parse("tru").unwrap_err().kind, ErrorKind::InvalidLiteral);
        assert_eq!(
            parse("+1").unwrap_err().kind,
            ErrorKind::UnexpectedChar(b'+')
        );
        assert_eq!(parse("1.").unwrap_err().kind, ErrorKind::InvalidNumber);
        let deep = "[".repeat(129) + &"]".repeat(129);
        assert_eq!(parse(&deep).unwrap_err().kind, ErrorKind::MaxDepthExceeded);
    }

    #[test]
    fn depth_limit_ok() {
        let ok = "[".repeat(128) + &"]".repeat(128);
        assert!(parse(&ok).is_ok());
    }

    /// Структурная эквивалентность с serde_json на составном документе.
    #[test]
    fn matches_serde_json() {
        let doc = sample::session(50);
        let ours = parse(&doc).unwrap();
        let serde_v: SValue = serde_json::from_str(&doc).unwrap();
        assert!(equiv(&ours, &serde_v));
    }

    /// Числа: ground truth — `str::parse::<f64>` (корректно округлённый,
    /// бит-в-бит); serde_json — с допуском 1 ulp (его собственный парсер
    /// на редких числах отстаёт на 1 ulp от корректного округления —
    /// см. serde-rs/json issues; мы совпадаем со std бит-в-бит).
    /// Покрывает быстрый путь (int/frac/exp), границы 2^53, 10^22, -0 и
    /// fallback (длинные числа, большие экспоненты).
    #[test]
    fn numbers_match_serde_json() {
        let cases = [
            "0", "-0", "1", "-1", "42", "9007199254740991", "9007199254740992", "9007199254740993",
            "18446744073709551615", "-9007199254740993", "0.5", "-0.5", "0.05", "0.0001",
            "3.141592653589793", "2.718281828459045", "123.456", "1e0", "1e1", "1e22", "1e23",
            "1e-22", "1e-23", "-1e-22", "2.5e-3", "123.456e7", "123.456e-7", "1.5e300",
            "0.1", "0.2", "0.3", "1.1", "-2.2", "123456.789", "1e-5", "99999999999999999999",
            "1.7976931348623157e308", "5e-324",
        ];
        for c in cases {
            let ours = parse(c).unwrap_or_else(|e| panic!("{c}: {e}"));
            let a = ours.as_f64().unwrap();
            // ground truth: корректно округлённый std-парсер — бит-в-бит
            let truth: f64 = c.parse().unwrap();
            assert_eq!(a.to_bits(), truth.to_bits(), "bits mismatch vs std for {c}");
            // serde_json: допуск 1 ulp (его собственные 1-ulp отклонения)
            let serde_v: SValue = serde_json::from_str(c)
                .unwrap_or_else(|e| panic!("{c}: serde_json {e}"));
            let b = serde_v.as_f64().unwrap();
            assert!(within_1ulp(a, b), "serde 1-ulp deviation exceeded for {c}: {a} vs {b}");
            if a == 0.0 && b == 0.0 {
                assert_eq!(a.is_sign_negative(), b.is_sign_negative(), "sign of zero for {c}");
            }
        }
    }

    /// Допуск 1 ulp между двумя f64.
    fn within_1ulp(a: f64, b: f64) -> bool {
        if a == b {
            return true;
        }
        if a.is_nan() || b.is_nan() {
            return false;
        }
        let scale = a.abs().max(b.abs());
        (a - b).abs() <= scale * f64::EPSILON
    }

    /// Property-тест: случайные числа из ограниченного диапазона должны
    /// битово совпадать с serde_json.
    #[test]
    fn random_numbers_match_serde_json() {
        struct Lcg(u64);
        impl Lcg {
            fn next(&mut self) -> u64 {
                self.0 = self
                    .0
                    .wrapping_mul(6_364_136_223_846_793_005)
                    .wrapping_add(1_442_695_040_888_963_407);
                self.0
            }
        }
        let mut rng = Lcg(0xDEAD_BEEF);
        for _ in 0..4000 {
            let int_part = rng.next() % 1_000_000_000;
            let frac_len = rng.next() % 9;
            let frac_part = if frac_len == 0 {
                String::new()
            } else {
                format!("{:0width$}", rng.next() % 10u64.pow(frac_len as u32), width = frac_len as usize)
            };
            let exp = (rng.next() % 44) as i64 - 22;
            let neg = rng.next() % 2 == 0;
            let mut s = String::new();
            if neg {
                s.push('-');
            }
            s.push_str(&int_part.to_string());
            if !frac_part.is_empty() {
                s.push('.');
                s.push_str(&frac_part);
            }
            if rng.next() % 2 == 0 {
                s.push('e');
                if rng.next() % 2 == 0 {
                    s.push('+');
                }
                s.push_str(&exp.to_string());
            }
            let ours = parse(&s).unwrap_or_else(|e| panic!("{s}: {e}"));
            let a = ours.as_f64().unwrap();
            // ground truth: std (корректно округлённый) — бит-в-бит
            let truth: f64 = s.parse().unwrap();
            assert_eq!(a.to_bits(), truth.to_bits(), "bits mismatch vs std for {s}");
            // serde_json — с допуском 1 ulp
            let serde_v: SValue = serde_json::from_str(&s).unwrap();
            let b = serde_v.as_f64().unwrap();
            assert!(within_1ulp(a, b), "serde 1-ulp deviation exceeded for {s}: {a} vs {b}");
        }
    }

    fn equiv(a: &Value<'_>, b: &SValue) -> bool {
        match (a, b) {
            (Value::Null, SValue::Null) => true,
            (Value::Bool(x), SValue::Bool(y)) => x == y,
            (Value::Number(x), SValue::Number(y)) => *x == y.as_f64().unwrap_or(f64::NAN),
            (Value::Str(x), SValue::String(y)) => x == y,
            (Value::Array(x), SValue::Array(y)) => {
                x.len() == y.len()
                    && x.iter()
                        .zip(y.iter())
                        .all(|(a, b)| equiv(a, b))
            }
            (Value::Object(x), SValue::Object(y)) => {
                x.len() == y.len()
                    && x.iter()
                        .all(|(k, v)| y.get(k.as_ref()).map(|b| equiv(v, b)).unwrap_or(false))
            }
            _ => false,
        }
    }

    #[test]
    fn sample_document_parses() {
        let doc = sample::session(1000);
        let v = parse(&doc).unwrap();
        let tabs = v
            .get("windows")
            .unwrap()
            .as_array()
            .unwrap()[0]
            .get("tabs")
            .unwrap()
            .as_array()
            .unwrap();
        assert_eq!(tabs.len(), 1000);
        assert_eq!(tabs[0].get("id"), Some(&Value::Number(0.0)));
        assert_eq!(tabs[0].get("active"), Some(&Value::Bool(true)));
    }

    #[test]
    fn sample_nums_and_strs_parse() {
        let nums_doc = sample::nums(100);
        let v = parse(&nums_doc).unwrap();
        let items = v.as_array().unwrap();
        assert_eq!(items.len(), 100);
        assert_eq!(items[7].get("id"), Some(&Value::Number(7.0)));
        assert_eq!(items[7].get("x"), Some(&Value::Number(7.5)));
        assert_eq!(items[7].get("h"), Some(&Value::Number(-7.0)));

        let strs_doc = sample::strs(100);
        let v = parse(&strs_doc).unwrap();
        let items = v.as_array().unwrap();
        assert_eq!(items.len(), 100);
        assert!(items[0].get("url").unwrap().as_str().unwrap().starts_with("https://"));
        // etag содержит escape — должен декодироваться
        assert!(items[0].get("etag").unwrap().as_str().unwrap().contains("0x"));
    }
}
