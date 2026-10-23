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

use std::borrow::Cow;
use std::fmt;

/// Максимальная глубина вложенности (как в serde_json по умолчанию).
pub const MAX_DEPTH: usize = 128;

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

    fn skip_ws(&mut self) {
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

    fn parse_number(&mut self) -> Result<Value<'a>, Error> {
        let start = self.pos;
        if self.peek() == Some(b'-') {
            self.pos += 1;
        }
        match self.peek() {
            Some(b'0') => self.pos += 1,
            Some(b'1'..=b'9') => {
                while matches!(self.peek(), Some(b'0'..=b'9')) {
                    self.pos += 1;
                }
            }
            _ => return Err(self.err(ErrorKind::InvalidNumber)),
        }
        if self.peek() == Some(b'.') {
            self.pos += 1;
            if !matches!(self.peek(), Some(b'0'..=b'9')) {
                return Err(self.err(ErrorKind::InvalidNumber));
            }
            while matches!(self.peek(), Some(b'0'..=b'9')) {
                self.pos += 1;
            }
        }
        if matches!(self.peek(), Some(b'e') | Some(b'E')) {
            self.pos += 1;
            if matches!(self.peek(), Some(b'+') | Some(b'-')) {
                self.pos += 1;
            }
            if !matches!(self.peek(), Some(b'0'..=b'9')) {
                return Err(self.err(ErrorKind::InvalidNumber));
            }
            while matches!(self.peek(), Some(b'0'..=b'9')) {
                self.pos += 1;
            }
        }
        // Грамматика JSON уже проверена выше; срез гарантированно ASCII.
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
        while let Some(b) = self.peek() {
            match b {
                b'"' => {
                    let s = &self.input[start..self.pos];
                    self.pos += 1;
                    return Ok(Cow::Borrowed(s));
                }
                b'\\' => return self.parse_string_slow(start),
                c if c < 0x20 => return Err(self.err(ErrorKind::ControlCharInString)),
                _ => self.pos += 1,
            }
        }
        Err(self.err(ErrorKind::UnexpectedEof))
    }

    /// Медленный путь: вход содержит escape-последовательности, аллоцируем.
    fn parse_string_slow(&mut self, start: usize) -> Result<Cow<'a, str>, Error> {
        let mut out = String::new();
        let mut chunk_start = start;
        loop {
            // pos указывает на `\`
            if self.pos > chunk_start {
                out.push_str(&self.input[chunk_start..self.pos]);
            }
            self.pos += 1; // пропустить `\`
            let esc = match self.peek() {
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
                Some(e) => e,
            };
            self.pos += 1;
            match esc {
                b'"' => out.push('"'),
                b'\\' => out.push('\\'),
                b'/' => out.push('/'),
                b'b' => out.push('\u{0008}'),
                b'f' => out.push('\u{000C}'),
                b'n' => out.push('\n'),
                b'r' => out.push('\r'),
                b't' => out.push('\t'),
                b'u' => {
                    let hi = self.parse_hex4()?;
                    let ch = if (0xD800..0xDC00).contains(&hi) {
                        // старший суррогат: пробуем суррогатную пару UTF-16
                        if self.peek() == Some(b'\\') && self.bytes.get(self.pos + 1) == Some(&b'u')
                        {
                            let save = self.pos;
                            self.pos += 2;
                            let lo = self.parse_hex4()?;
                            if (0xDC00..0xE000).contains(&lo) {
                                let c = 0x1_0000 + ((hi - 0xD800) << 10) + (lo - 0xDC00);
                                char::from_u32(c)
                                    .ok_or_else(|| self.err(ErrorKind::InvalidUnicodeEscape))?
                            } else {
                                self.pos = save;
                                return Err(self.err(ErrorKind::LoneSurrogate));
                            }
                        } else {
                            return Err(self.err(ErrorKind::LoneSurrogate));
                        }
                    } else if (0xDC00..0xE000).contains(&hi) {
                        return Err(self.err(ErrorKind::LoneSurrogate));
                    } else {
                        match char::from_u32(hi) {
                            Some(c) => c,
                            None => return Err(self.err(ErrorKind::InvalidUnicodeEscape)),
                        }
                    };
                    out.push(ch);
                }
                _ => return Err(self.err(ErrorKind::InvalidEscape)),
            }
            chunk_start = self.pos;
            // ищем закрывающую кавычку или следующий escape
            let mut found_quote = false;
            while let Some(b) = self.peek() {
                match b {
                    b'"' => {
                        if self.pos > chunk_start {
                            out.push_str(&self.input[chunk_start..self.pos]);
                        }
                        self.pos += 1;
                        found_quote = true;
                        break;
                    }
                    b'\\' => break,
                    c if c < 0x20 => return Err(self.err(ErrorKind::ControlCharInString)),
                    _ => self.pos += 1,
                }
            }
            if found_quote {
                return Ok(Cow::Owned(out));
            }
            if self.pos >= self.bytes.len() {
                return Err(self.err(ErrorKind::UnexpectedEof));
            }
            // иначе pos на `\` — продолжаем цикл
        }
    }

    fn parse_hex4(&mut self) -> Result<u32, Error> {
        if self.pos + 4 > self.bytes.len() {
            return Err(self.err(ErrorKind::UnexpectedEof));
        }
        let mut v: u32 = 0;
        for _ in 0..4 {
            let d = match self.bytes[self.pos] {
                b @ b'0'..=b'9' => (b - b'0') as u32,
                b @ b'a'..=b'f' => (b - b'a' + 10) as u32,
                b @ b'A'..=b'F' => (b - b'A' + 10) as u32,
                _ => return Err(self.err(ErrorKind::InvalidUnicodeEscape)),
            };
            v = v * 16 + d;
            self.pos += 1;
        }
        Ok(v)
    }

    fn parse_array(&mut self) -> Result<Value<'a>, Error> {
        self.enter()?;
        self.pos += 1; // `[`
        self.skip_ws();
        let mut items = Vec::new();
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
        let mut pairs: Vec<(Cow<'a, str>, Value<'a>)> = Vec::new();
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
}
