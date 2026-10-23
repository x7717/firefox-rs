//! FoxJSON — быстрый однопроходный JSON-парсер для горячих путей Firefox
//! (session store, prefs, telemetry).
//!
//! Архитектура (итерация 4): ТАП-ПАРСЕР в стиле simd-json.
//!
//! Дерево значений старого API аллоцировало ~25k раз на session-5000
//! (Vec на каждый объект/массив + String на каждую escape-строку).
//! Тап-парсер заменяет всё это:
//! - **один плоский `Vec<Node>`** (12 байт/узел): дети контейнера лежат
//!   НЕПРЕРЫВНО, обход — по срезам вместо указателей (cache-friendly);
//!   на весь документ — лишь ~log2 роста ленты реаллокаций;
//! - **один общий owned-буфер**: все escape-строки документа декодируются
//!   в единственный `String`, узел хранит (смещение, длина) — ноль
//!   аллокаций на строку;
//! - строки без escape — zero-copy срезы входа (флаг заимствования).
//!
//! Прочие свойства:
//! - быстрый путь чисел: мантисса в u64 + точные степени десятки,
//!   бит-в-бит совпадает с корректно округлённым `str::parse::<f64>`;
//! - SWAR-скан строк (8 байт/итерацию) и двухфазный декодинг escape-строк;
//! - строгая валидация: грамматика чисел, контрольные символы, суррогаты;
//! - ограничение глубины вложенности ([`MAX_DEPTH`]).

use std::fmt;
use std::sync::OnceLock;

/// Максимальная глубина вложенности (как в serde_json по умолчанию).
pub const MAX_DEPTH: usize = 128;

const SWAR_LO: u64 = 0x0101_0101_0101_0101;
const SWAR_HI: u64 = 0x8080_8080_8080_8080;

/// 10^0..=10^22 — все точно представимы в f64.
const POW10: [f64; 23] = [
    1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16,
    1e17, 1e18, 1e19, 1e20, 1e21, 1e22,
];

// ---------------------------------------------------------------------------
// Тап
// ---------------------------------------------------------------------------

/// Тип узла тапа.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Kind {
    Null,
    Bool,
    Number,
    Str,
    Array,
    Object,
}

const TAG_NULL: u32 = 0;
const TAG_BOOL: u32 = 1;
const TAG_NUMBER: u32 = 2;
const TAG_STR: u32 = 3;
const TAG_ARRAY: u32 = 4;
const TAG_OBJECT: u32 = 5;
/// Внутренний узел-закрыватель контейнера: a = индекс заголовка, b = число детей/пар.
const TAG_CLOSE: u32 = 6;
/// Строка заимствована из входа (иначе — из owned-буфера документа).
const FLAG_STR_BORROWED: u32 = 1 << 8;

/// Узел тапа: 12 байт.
///
/// - Number: f64-биты, разложенные по `a` (младшие) и `b` (старшие);
/// - Str: `a` = смещение (вход или owned-буфер), `b` = длина в байтах;
/// - Bool: `a` = 0/1;
/// - Array: `a` = индекс первого ребёнка, `b` = число детей;
/// - Object: `a` = индекс первого узла-ключа, `b` = ЧИСЛО ПАР
///   (в ленте пара = узел ключа + узел значения, непрерывно).
#[derive(Clone, Copy)]
struct Node {
    hdr: u32, // младшие 8 бит — тег, бит 8 — флаг заимствования строки
    a: u32,
    b: u32,
}

impl Node {
    #[inline]
    fn tag(&self) -> u32 {
        self.hdr & 0xFF
    }

    #[inline]
    fn kind(&self) -> Kind {
        match self.tag() {
            TAG_NULL => Kind::Null,
            TAG_BOOL => Kind::Bool,
            TAG_NUMBER => Kind::Number,
            TAG_STR => Kind::Str,
            TAG_ARRAY => Kind::Array,
            _ => Kind::Object,
        }
    }

    #[inline]
    fn is_str_borrowed(&self) -> bool {
        self.hdr & FLAG_STR_BORROWED != 0
    }
}

impl fmt::Debug for Document<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Document")
            .field("nodes", &self.tape.len())
            .field("owned_bytes", &self.owned.len())
            .finish()
    }
}

impl fmt::Debug for NodeRef<'_, '_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self.kind() {
            Kind::Null => f.write_str("Null"),
            Kind::Bool => write!(f, "Bool({:?})", self.as_bool()),
            Kind::Number => write!(f, "Number({:?})", self.as_f64()),
            Kind::Str => write!(f, "Str({:?})", self.as_str()),
            Kind::Array => write!(f, "Array(len={:?})", self.len()),
            Kind::Object => write!(f, "Object(pairs={:?})", self.len()),
        }
    }
}

impl fmt::Debug for ObjectRef<'_, '_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_list().entries(self.iter().map(|(k, _)| k)).finish()
    }
}

/// Спарсенный JSON-документ: тап + owned-буфер строк.
///
/// Владеет лентой; строки без escape заимствованы из входа.
pub struct Document<'a> {
    input: &'a str,
    tape: Vec<Node>,
    owned: String,
}

/// Ссылка на узел документа с навигацией.
#[derive(Clone, Copy)]
pub struct NodeRef<'d, 'a> {
    doc: &'d Document<'a>,
    node: &'d Node,
}

/// Срез массива: дети идут подряд с узлами CLOSE вложенных контейнеров,
/// обход — через размер поддерева.
#[derive(Clone, Copy)]
pub struct ArrayRef<'d, 'a> {
    doc: &'d Document<'a>,
    head: &'d Node,
}

/// Срез объекта: пары (ключ, значение) в порядке документа; обход —
/// через размер поддерева значения (значение-контейнер занимает
/// 1 + размер поддерева узлов).
#[derive(Clone, Copy)]
pub struct ObjectRef<'d, 'a> {
    doc: &'d Document<'a>,
    head: &'d Node,
}

/// Размер поддерева в узлах ленты: контейнер — от заголовка до его
/// CLOSE-узла включительно, скаляр — 1.
#[inline]
fn subtree_size(tape: &[Node], idx: usize) -> usize {
    match tape[idx].tag() {
        TAG_ARRAY | TAG_OBJECT => tape[idx].b as usize - idx + 1,
        _ => 1,
    }
}

impl<'d, 'a> ArrayRef<'d, 'a> {
    /// Число детей.
    pub fn len(&self) -> usize {
        self.doc.tape[self.head.b as usize].b as usize
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }

    /// Элемент по индексу (обход с пропусками поддеревьев).
    pub fn at(&self, i: usize) -> Option<NodeRef<'d, 'a>> {
        let close = self.head.b as usize;
        let mut cur = self.head.a as usize;
        let mut k = 0usize;
        while cur < close {
            if k == i {
                return Some(NodeRef {
                    doc: self.doc,
                    node: &self.doc.tape[cur],
                });
            }
            cur += subtree_size(&self.doc.tape, cur);
            k += 1;
        }
        None
    }

    /// Итератор по детям.
    pub fn iter(&self) -> impl Iterator<Item = NodeRef<'d, 'a>> {
        let doc = self.doc;
        let close = self.head.b as usize;
        let mut cur = self.head.a as usize;
        std::iter::from_fn(move || {
            if cur >= close {
                return None;
            }
            let node = &doc.tape[cur];
            cur += subtree_size(&doc.tape, cur);
            Some(NodeRef { doc, node })
        })
    }
}

impl<'d, 'a> ObjectRef<'d, 'a> {
    /// Число пар.
    pub fn len(&self) -> usize {
        self.doc.tape[self.head.b as usize].b as usize
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }

    /// Значение по ключу (первое вхождение; порядок ключей сохраняется).
    pub fn get(&self, key: &str) -> Option<NodeRef<'d, 'a>> {
        let close = self.head.b as usize;
        let mut cur = self.head.a as usize;
        while cur < close {
            let key_node = &self.doc.tape[cur];
            let value_idx = cur + 1;
            if self.doc.str_of(key_node) == key {
                return Some(NodeRef {
                    doc: self.doc,
                    node: &self.doc.tape[value_idx],
                });
            }
            cur = value_idx + subtree_size(&self.doc.tape, value_idx);
        }
        None
    }

    /// Ключ пары `i` — заимствован из входа (иначе декодирован в owned-буфер).
    pub fn key_is_borrowed(&self, i: usize) -> bool {
        self.pair_at(i)
            .map(|(k, _)| k.is_str_borrowed())
            .unwrap_or(false)
    }

    /// Ключ пары `i`.
    pub fn key_at(&self, i: usize) -> &'d str {
        let (k, _) = self.pair_at(i).expect("pair index out of range");
        self.doc.str_of(k)
    }

    /// Значение пары `i`.
    pub fn value_at(&self, i: usize) -> NodeRef<'d, 'a> {
        let (_, v) = self.pair_at(i).expect("pair index out of range");
        NodeRef {
            doc: self.doc,
            node: v,
        }
    }

    /// (узел ключа, узел значения) пары `i`.
    fn pair_at(&self, i: usize) -> Option<(&'d Node, &'d Node)> {
        let close = self.head.b as usize;
        let mut cur = self.head.a as usize;
        let mut k = 0usize;
        while cur < close {
            let key_node = &self.doc.tape[cur];
            let value_idx = cur + 1;
            let value_node = &self.doc.tape[value_idx];
            if k == i {
                return Some((key_node, value_node));
            }
            cur = value_idx + subtree_size(&self.doc.tape, value_idx);
            k += 1;
        }
        None
    }

    /// Итератор по парам (ключ, значение).
    pub fn iter(&self) -> impl Iterator<Item = (&'d str, NodeRef<'d, 'a>)> {
        let doc = self.doc;
        let close = self.head.b as usize;
        let mut cur = self.head.a as usize;
        std::iter::from_fn(move || {
            if cur >= close {
                return None;
            }
            let key = doc.str_of(&doc.tape[cur]);
            let value_idx = cur + 1;
            let val = NodeRef {
                doc,
                node: &doc.tape[value_idx],
            };
            cur = value_idx + subtree_size(&doc.tape, value_idx);
            Some((key, val))
        })
    }
}

impl<'d, 'a> NodeRef<'d, 'a> {
    /// Тип узла.
    pub fn kind(&self) -> Kind {
        self.node.kind()
    }

    pub fn is_null(&self) -> bool {
        self.node.kind() == Kind::Null
    }

    /// Строка, если узел — строка.
    pub fn as_str(&self) -> Option<&'d str> {
        match self.node.tag() {
            TAG_STR => Some(self.doc.str_of(self.node)),
            _ => None,
        }
    }

    /// Заимствована ли строка из входа (false — декодирована в owned-буфер).
    pub fn str_is_borrowed(&self) -> Option<bool> {
        match self.node.tag() {
            TAG_STR => Some(self.node.is_str_borrowed()),
            _ => None,
        }
    }

    pub fn as_bool(&self) -> Option<bool> {
        match self.node.tag() {
            TAG_BOOL => Some(self.node.a != 0),
            _ => None,
        }
    }

    pub fn as_f64(&self) -> Option<f64> {
        match self.node.tag() {
            TAG_NUMBER => Some(f64::from_bits(
                ((self.node.b as u64) << 32) | self.node.a as u64,
            )),
            _ => None,
        }
    }

    /// Дети массива.
    pub fn as_array(&self) -> Option<ArrayRef<'d, 'a>> {
        match self.node.tag() {
            TAG_ARRAY => Some(ArrayRef {
                doc: self.doc,
                head: self.node,
            }),
            _ => None,
        }
    }

    /// Длина массива/объекта (для объекта — число пар).
    pub fn len(&self) -> Option<usize> {
        match self.node.tag() {
            TAG_ARRAY | TAG_OBJECT => Some(self.doc.tape[self.node.b as usize].b as usize),
            _ => None,
        }
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.len().is_none_or(|l| l == 0)
    }

    /// Срез объекта.
    pub fn as_object(&self) -> Option<ObjectRef<'d, 'a>> {
        match self.node.tag() {
            TAG_OBJECT => Some(ObjectRef {
                doc: self.doc,
                head: self.node,
            }),
            _ => None,
        }
    }

    /// Элемент массива по индексу.
    pub fn at(&self, i: usize) -> Option<NodeRef<'d, 'a>> {
        self.as_array()?.at(i)
    }

    /// Значение по ключу (если узел — объект).
    pub fn get(&self, key: &str) -> Option<NodeRef<'d, 'a>> {
        self.as_object()?.get(key)
    }
}

impl<'a> Document<'a> {
    #[inline]
    fn str_of(&self, node: &Node) -> &str {
        if node.is_str_borrowed() {
            &self.input[node.a as usize..node.a as usize + node.b as usize]
        } else {
            &self.owned[node.a as usize..node.a as usize + node.b as usize]
        }
    }

    /// Корневой узел документа.
    pub fn root(&self) -> NodeRef<'_, 'a> {
        NodeRef {
            doc: self,
            node: &self.tape[0],
        }
    }

    /// Значение по ключу корневого объекта.
    pub fn get(&self, key: &str) -> Option<NodeRef<'_, 'a>> {
        self.root().get(key)
    }

    /// Парсит документ целиком, требуя исчерпания входа.
    pub fn parse(input: &'a str) -> Result<Document<'a>, Error> {
        let mut p = TapeParser {
            input,
            bytes: input.as_bytes(),
            pos: 0,
            depth: 0,
            // Итерация 5: резерв ленты по длине входа. Каждое значение
            // занимает >= 1 байт входа, контейнеры — >= 2 байта на 2 узла;
            // len/4 покрывает типичные документы (session: ~29 Б/узел)
            // БЕЗ единого реаллока — профиль показывал ~15-20% в libc
            // (_int_malloc/memmove) на росте ленты. Потолок 2М узлов —
            // дальше работает геометрический рост.
            tape: Vec::with_capacity((input.len() / 4).clamp(64, 1 << 21)),
            owned: String::new(),
        };
        p.skip_ws();
        p.parse_value()?;
        p.skip_ws();
        if p.pos != p.bytes.len() {
            return Err(p.err(ErrorKind::TrailingCharacters));
        }
        Ok(Document {
            input,
            tape: p.tape,
            owned: p.owned,
        })
    }
}

/// Публичный одношаговый API: распарсить весь документ.
pub fn parse(input: &str) -> Result<Document<'_>, Error> {
    Document::parse(input)
}

// ---------------------------------------------------------------------------
// Парсер
// ---------------------------------------------------------------------------

struct TapeParser<'a> {
    input: &'a str,
    bytes: &'a [u8],
    pos: usize,
    depth: usize,
    tape: Vec<Node>,
    owned: String,
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

// ---------------------------------------------------------------------------
// AVX2-скан строк (итерация 5; SWAR выше — фолбэк без AVX2)
// ---------------------------------------------------------------------------

static AVX2: OnceLock<bool> = OnceLock::new();

#[inline]
fn avx2_available() -> bool {
    #[cfg(target_arch = "x86_64")]
    {
        *AVX2.get_or_init(|| std::arch::is_x86_feature_detected!("avx2"))
    }
    #[cfg(not(target_arch = "x86_64"))]
    {
        false
    }
}

/// Первый индекс в `bytes[from..]`, где байт равен `a` или `b` либо
/// (при `ctrl`) меньше 0x20; `bytes.len()`, если такого нет.
///
/// Маски ВТОЧНЫЕ: `_mm256_adds_epu8(x, 0xE0)` насыщает любой байт >= 0x20
/// до 0xFF, а байты < 0x20 оставляет < 0xFF — контрольные байты детектируются
/// без ложных срабатываний (в отличие от SWAR-трюка), поэтому возврат —
/// прямая позиция остановки, без доборного побайтового прохода.
///
/// # Safety
/// Вызывать только при поддержке AVX2.
#[cfg(target_arch = "x86_64")]
#[target_feature(enable = "avx2")]
unsafe fn first_stop_avx2(bytes: &[u8], from: usize, a: u8, b: u8, ctrl: bool) -> usize {
    use std::arch::x86_64::*;

    let len = bytes.len();
    let ptr = bytes.as_ptr();
    let va = _mm256_set1_epi8(a as i8);
    let vb = _mm256_set1_epi8(b as i8);
    // 0x1F + 0xE0 = 0xFE < 0xFF; 0x20 + 0xE0 = 0x100 -> 0xFF (насыщение)
    let sat = _mm256_set1_epi8(0xE0u8 as i8);
    let ff = _mm256_set1_epi8(-1);
    let mut i = from;
    while i + 32 <= len {
        let x = _mm256_loadu_si256(ptr.add(i) as *const __m256i);
        let mut m = _mm256_movemask_epi8(_mm256_cmpeq_epi8(x, va))
            | _mm256_movemask_epi8(_mm256_cmpeq_epi8(x, vb));
        if ctrl {
            let ge_0x20 = _mm256_cmpeq_epi8(_mm256_adds_epu8(x, sat), ff);
            m |= _mm256_movemask_epi8(_mm256_xor_si256(ge_0x20, ff));
        }
        if m != 0 {
            return i + m.trailing_zeros() as usize;
        }
        i += 32;
    }
    // Хвост < 32 байт — скалярно (строки у конца документа).
    while i < len {
        let c = *ptr.add(i);
        if c == a || c == b || (ctrl && c < 0x20) {
            return i;
        }
        i += 1;
    }
    len
}

/// Первый backslash или control-байт в `bytes[from..]` (для фазы 2
/// декодера). AVX2-путь — точная позиция без добора; SWAR-фолбэк.
fn find_bs_or_ctrl(bytes: &[u8], from: usize) -> Option<usize> {
    let bslash_mask = swar_broadcast(b'\\');
    // Инлайн первый чанк (8 байт) — короткие escape-фрагменты без вызова.
    let mut j = from;
    if j + 8 <= bytes.len() {
        let x = u64::from_le_bytes(bytes[j..j + 8].try_into().unwrap());
        let m = swar_has_zero(x ^ bslash_mask) | swar_has_control(x);
        if m != 0 {
            for k in 0..8 {
                let c = bytes[j + k];
                if c == b'\\' || c < 0x20 {
                    return Some(j + k);
                }
            }
        }
        j += 8;
    }
    #[cfg(target_arch = "x86_64")]
    {
        if avx2_available() {
            // Safety: детекция AVX2 выполнена выше.
            let j = unsafe { first_stop_avx2(bytes, j, b'\\', b'\\', true) };
            return if j == bytes.len() { None } else { Some(j) };
        }
    }
    // SWAR-фолбэк.
    while j + 8 <= bytes.len() {
        let x = u64::from_le_bytes(bytes[j..j + 8].try_into().unwrap());
        let m = swar_has_zero(x ^ bslash_mask) | swar_has_control(x);
        if m == 0 {
            j += 8;
            continue;
        }
        // добор: у SWAR-маски возможны ложные срабатывания
        while j < bytes.len() {
            let c = bytes[j];
            if c == b'\\' || c < 0x20 {
                return Some(j);
            }
            j += 1;
        }
    }
    while j < bytes.len() {
        let c = bytes[j];
        if c == b'\\' || c < 0x20 {
            return Some(j);
        }
        j += 1;
    }
    None
}

impl<'a> TapeParser<'a> {
    #[inline]
    fn peek(&self) -> Option<u8> {
        self.bytes.get(self.pos).copied()
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
        Error {
            position: pos,
            kind,
        }
    }

    #[inline]
    fn skip_ws(&mut self) {
        if let Some(b' ' | b'\t' | b'\n' | b'\r') = self.bytes.get(self.pos) {
            self.skip_ws_slow()
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

    fn parse_value(&mut self) -> Result<(), Error> {
        match self.peek() {
            None => Err(self.err(ErrorKind::UnexpectedEof)),
            Some(b'{') => self.parse_object(),
            Some(b'[') => self.parse_array(),
            Some(b'"') => self.parse_string(),
            Some(b't') => self.parse_lit(b"true", TAG_BOOL, 1),
            Some(b'f') => self.parse_lit(b"false", TAG_BOOL, 0),
            Some(b'n') => self.parse_lit(b"null", TAG_NULL, 0),
            Some(b'-') | Some(b'0'..=b'9') => self.parse_number(),
            Some(c) => Err(self.err(ErrorKind::UnexpectedChar(c))),
        }
    }

    /// Литерал (true/false/null): узел пишется сразу.
    fn parse_lit(&mut self, lit: &[u8], tag: u32, a: u32) -> Result<(), Error> {
        if self.bytes.len() - self.pos >= lit.len()
            && &self.bytes[self.pos..self.pos + lit.len()] == lit
        {
            self.pos += lit.len();
            self.tape.push(Node { hdr: tag, a, b: 0 });
            Ok(())
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
    fn parse_number(&mut self) -> Result<(), Error> {
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
        let value: f64 = if !overflow && mant <= (1u64 << 53) {
            let mf = mant as f64;
            let sign = if neg { -1.0f64 } else { 1.0f64 };
            if !has_exp {
                if frac_digits == 0 {
                    // целое, включая -0.0 (семантика JSON "-0")
                    if neg {
                        -mf
                    } else {
                        mf
                    }
                } else if frac_digits <= 22 {
                    sign * (mf / POW10[frac_digits as usize])
                } else {
                    // frac_digits > 22 невозможно при mant <= 2^53? возможно:
                    // "0.000...0001" — ведущие нули дробной части
                    return self.number_fallback(start);
                }
            } else if (0..=22).contains(&exp_shift) {
                sign * (mf * POW10[exp_shift as usize])
            } else if (-22..0).contains(&exp_shift) {
                sign * (mf / POW10[(-exp_shift) as usize])
            } else {
                return self.number_fallback(start);
            }
        } else {
            return self.number_fallback(start);
        };

        let bits = value.to_bits();
        self.tape.push(Node {
            hdr: TAG_NUMBER,
            a: bits as u32,
            b: (bits >> 32) as u32,
        });
        Ok(())
    }

    /// Fallback: полное значение строки (грамматика уже проверена).
    fn number_fallback(&mut self, start: usize) -> Result<(), Error> {
        let text = &self.input[start..self.pos];
        let value = text
            .parse::<f64>()
            .map_err(|_| self.err(ErrorKind::InvalidNumber))?;
        let bits = value.to_bits();
        self.tape.push(Node {
            hdr: TAG_NUMBER,
            a: bits as u32,
            b: (bits >> 32) as u32,
        });
        Ok(())
    }

    /// Строка: zero-copy (fast path) или декодирование в owned-буфер.
    ///
    /// Инвариант безопасности срезов: сканируем байты, но останавливаемся
    /// только на ASCII-байтах (`"`, `\`, control). Любая остановка — граница
    /// символа UTF-8, поэтому срезы `input[start..pos]` всегда валидны.
    fn parse_string(&mut self) -> Result<(), Error> {
        self.pos += 1; // открывающая кавычка
        let start = self.pos;
        match self.scan_plain(start)? {
            StringScan::Closed(close) => {
                let len = close - start;
                self.pos = close + 1;
                self.tape.push(Node {
                    hdr: TAG_STR | FLAG_STR_BORROWED,
                    a: start as u32,
                    b: len as u32,
                });
                Ok(())
            }
            StringScan::Escape(bs) => {
                self.pos = bs;
                self.parse_string_slow(start)
            }
        }
    }

    /// Скан содержимого строки до первой остановки (`"`, `\`, control).
    ///
    /// Итерация 5 — трёхуровневая схема:
    /// 1. ИНЛАЙН SWAR-чанк (8 байт): короткие строки/ключи — без единого
    ///    вызова (#[target_feature] не инлайнится, вызов дороже скана);
    /// 2. AVX2 (32 Б/ит, точные маски через saturating-add) для длинных;
    /// 3. полный SWAR-цикл — фолбэк без AVX2.
    fn scan_plain(&self, start: usize) -> Result<StringScan, Error> {
        let bytes = self.bytes;
        let len = bytes.len();
        let quote_mask = swar_broadcast(b'"');
        let bslash_mask = swar_broadcast(b'\\');

        // Уровень 1: первый чанк инлайн (ключи и краткие значения —
        // основной случай в session-документах).
        if start + 8 <= len {
            let x = u64::from_le_bytes(bytes[start..start + 8].try_into().unwrap());
            let m = swar_has_zero(x ^ quote_mask)
                | swar_has_zero(x ^ bslash_mask)
                | swar_has_control(x);
            if m != 0 {
                // добор в пределах чанка (у has_control бывают ложные
                // срабатывания — тогда уходим в длинный путь)
                for k in 0..8 {
                    match bytes[start + k] {
                        b'"' => return Ok(StringScan::Closed(start + k)),
                        b'\\' => return Ok(StringScan::Escape(start + k)),
                        c if c < 0x20 => {
                            return Err(self.err_at(start + k, ErrorKind::ControlCharInString))
                        }
                        _ => {}
                    }
                }
            }
        } else {
            // Хвост документа < 8 байт — скалярно.
            for (off, &c) in bytes[start..len].iter().enumerate() {
                match c {
                    b'"' => return Ok(StringScan::Closed(start + off)),
                    b'\\' => return Ok(StringScan::Escape(start + off)),
                    c if c < 0x20 => {
                        return Err(self.err_at(start + off, ErrorKind::ControlCharInString))
                    }
                    _ => {}
                }
            }
            return Err(self.err_at(len, ErrorKind::UnexpectedEof));
        }

        // Уровень 2: строка длиннее 8 байт — AVX2 (маски точные => прыжок
        // на остановку без доборного прохода).
        #[cfg(target_arch = "x86_64")]
        if avx2_available() {
            // Safety: детекция AVX2 выполнена выше.
            let stop = unsafe { first_stop_avx2(bytes, start, b'"', b'\\', true) };
            if stop == len {
                return Err(self.err_at(stop, ErrorKind::UnexpectedEof));
            }
            return Ok(match bytes[stop] {
                b'"' => StringScan::Closed(stop),
                b'\\' => StringScan::Escape(stop),
                _ => return Err(self.err_at(stop, ErrorKind::ControlCharInString)),
            });
        }

        // Уровень 3: полный SWAR-скан (v0.4) — фолбэк без AVX2.
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
    /// Фаза 1: прескан содержимого до НАСТОЯЩЕЙ закрывающей кавычки
    /// (escaped `\"` пропускается по чётности backslash-ов), попутно считаем
    /// backslash-ы. Итог: точная граница строки и точная верхняя оценка
    /// ёмкости результата (len - backslashes).
    /// Фаза 2: декодирование в ОБЩИЙ owned-буфер документа (ноль аллокаций
    /// на строку) — куски между escape копируются целиком.
    fn parse_string_slow(&mut self, start: usize) -> Result<(), Error> {
        let (close, bs_count) = self.scan_to_close(start)?;
        let raw = &self.input[start..close];
        let bytes = raw.as_bytes();
        // резерв: каждый backslash экономит минимум 1 байт
        self.owned.reserve(bytes.len().saturating_sub(bs_count));
        let owned_offset = self.owned.len();
        let mut i = 0usize;
        while i < bytes.len() {
            // Первый backslash или control-байт: AVX2 даёт точную позицию,
            // SWAR — доборный побайтовый проход (false positives has_control).
            let stop = match find_bs_or_ctrl(bytes, i) {
                Some(bs) => bs,
                None => {
                    self.owned.push_str(&raw[i..]);
                    break;
                }
            };
            if bytes[stop] < 0x20 {
                return Err(self.err_at(start + stop, ErrorKind::ControlCharInString));
            }
            if stop > i {
                self.owned.push_str(&raw[i..stop]);
            }
            // декодируем escape: bytes[stop] == '\\'
            let e = match bytes.get(stop + 1) {
                Some(&e) => e,
                None => return Err(self.err_at(self.bytes.len(), ErrorKind::UnexpectedEof)),
            };
            match e {
                b'"' => {
                    self.owned.push('"');
                    i = stop + 2;
                }
                b'\\' => {
                    self.owned.push('\\');
                    i = stop + 2;
                }
                b'/' => {
                    self.owned.push('/');
                    i = stop + 2;
                }
                b'b' => {
                    self.owned.push('\u{0008}');
                    i = stop + 2;
                }
                b'f' => {
                    self.owned.push('\u{000C}');
                    i = stop + 2;
                }
                b'n' => {
                    self.owned.push('\n');
                    i = stop + 2;
                }
                b'r' => {
                    self.owned.push('\r');
                    i = stop + 2;
                }
                b't' => {
                    self.owned.push('\t');
                    i = stop + 2;
                }
                b'u' => {
                    let at = stop + 2;
                    let hi = hex4(bytes, at)
                        .ok_or_else(|| self.err_at(start + at, ErrorKind::InvalidUnicodeEscape))?;
                    if (0xD800..0xDC00).contains(&hi) {
                        // старший суррогат: ожидаем \uYYYY младший суррогат
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
                                self.owned.push(ch);
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
                            Some(c) => self.owned.push(c),
                            None => {
                                return Err(self.err_at(start + at, ErrorKind::InvalidUnicodeEscape))
                            }
                        }
                        i = at + 4;
                    }
                }
                _ => return Err(self.err_at(start + stop, ErrorKind::InvalidEscape)),
            }
        }
        let len = self.owned.len() - owned_offset;
        self.pos = close + 1;
        self.tape.push(Node {
            hdr: TAG_STR, // owned
            a: owned_offset as u32,
            b: len as u32,
        });
        Ok(())
    }

    /// Прескан содержимого строки до НАСТОЯЩЕЙ закрывающей кавычки
    /// (escaped `\"` по чётности backslash-ов пропускается).
    /// Возвращает (позиция кавычки, число backslash-ов).
    ///
    /// Итерация 5 — та же трёхуровневая схема, что и в [`scan_plain`]:
    /// инлайн-чанк 8 Б -> AVX2 stop-by-stop -> полный SWAR-цикл.
    fn scan_to_close(&self, from: usize) -> Result<(usize, usize), Error> {
        let bytes = self.bytes;
        let len = bytes.len();
        let quote_mask = swar_broadcast(b'"');
        let bslash_mask = swar_broadcast(b'\\');
        let mut bs_count = 0usize;

        // Уровень 1: инлайн-чанк (короткие escape-строки).
        if from + 8 <= len {
            let x = u64::from_le_bytes(bytes[from..from + 8].try_into().unwrap());
            let m = swar_has_zero(x ^ quote_mask)
                | swar_has_zero(x ^ bslash_mask)
                | swar_has_control(x);
            if m != 0 {
                for k in 0..8 {
                    match bytes[from + k] {
                        b'\\' => bs_count += 1,
                        b'"' => {
                            // чётность backslash-ов, предшествующих кавычке
                            let mut nb = 0usize;
                            let mut p = from + k;
                            while p > from && bytes[p - 1] == b'\\' {
                                nb += 1;
                                p -= 1;
                            }
                            if nb.is_multiple_of(2) {
                                return Ok((from + k, bs_count));
                            }
                        }
                        c if c < 0x20 => {
                            return Err(self.err_at(from + k, ErrorKind::ControlCharInString))
                        }
                        _ => {}
                    }
                }
            }
        } else {
            // Хвост документа < 8 байт — скалярно.
            for k in from..len {
                match bytes[k] {
                    b'\\' => bs_count += 1,
                    b'"' => {
                        let mut nb = 0usize;
                        let mut p = k;
                        while p > from && bytes[p - 1] == b'\\' {
                            nb += 1;
                            p -= 1;
                        }
                        if nb.is_multiple_of(2) {
                            return Ok((k, bs_count));
                        }
                    }
                    c if c < 0x20 => return Err(self.err_at(k, ErrorKind::ControlCharInString)),
                    _ => {}
                }
            }
            return Err(self.err_at(len, ErrorKind::UnexpectedEof));
        }

        // Уровень 2: AVX2 stop-by-stop от конца чанка (bs_count уже учтён).
        #[cfg(target_arch = "x86_64")]
        if avx2_available() {
            let mut i = from + 8;
            loop {
                // Safety: детекция AVX2 выполнена выше.
                let stop = unsafe { first_stop_avx2(bytes, i, b'"', b'\\', true) };
                if stop == len {
                    return Err(self.err_at(stop, ErrorKind::UnexpectedEof));
                }
                match bytes[stop] {
                    b'\\' => {
                        bs_count += 1;
                        i = stop + 1;
                    }
                    b'"' => {
                        let mut nb = 0usize;
                        let mut p = stop;
                        while p > from && bytes[p - 1] == b'\\' {
                            nb += 1;
                            p -= 1;
                        }
                        if nb.is_multiple_of(2) {
                            return Ok((stop, bs_count));
                        }
                        i = stop + 1;
                    }
                    _ => return Err(self.err_at(stop, ErrorKind::ControlCharInString)),
                }
            }
        }

        // Уровень 3: полный SWAR-цикл (v0.4) от конца чанка.
        let qm = quote_mask;
        let bm = bslash_mask;
        let mut i = from + 8;
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
                        if nb.is_multiple_of(2) {
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
                    if nb.is_multiple_of(2) {
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

    fn parse_array(&mut self) -> Result<(), Error> {
        self.enter()?;
        self.pos += 1; // `[`
        self.skip_ws();
        let head = self.tape.len();
        self.tape.push(Node {
            hdr: TAG_ARRAY,
            a: 0,
            b: 0, // индекс CLOSE-узла, патчится ниже
        });
        let mut count: u32 = 0;
        if self.peek() == Some(b']') {
            self.pos += 1;
            self.depth -= 1;
            let close = self.tape.len();
            self.tape.push(Node {
                hdr: TAG_CLOSE,
                a: head as u32,
                b: 0,
            });
            self.tape[head].a = close as u32; // детей нет
            self.tape[head].b = close as u32;
            return Ok(());
        }
        loop {
            self.skip_ws();
            self.parse_value()?;
            count += 1;
            self.skip_ws();
            match self.peek() {
                Some(b',') => self.pos += 1,
                Some(b']') => {
                    self.pos += 1;
                    self.depth -= 1;
                    let close = self.tape.len();
                    self.tape.push(Node {
                        hdr: TAG_CLOSE,
                        a: head as u32,
                        b: count,
                    });
                    self.tape[head].a = head as u32 + 1; // первый ребёнок
                    self.tape[head].b = close as u32;
                    return Ok(());
                }
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
        }
    }

    fn parse_object(&mut self) -> Result<(), Error> {
        self.enter()?;
        self.pos += 1; // `{`
        self.skip_ws();
        let head = self.tape.len();
        self.tape.push(Node {
            hdr: TAG_OBJECT,
            a: 0,
            b: 0,
        });
        let mut pairs: u32 = 0;
        if self.peek() == Some(b'}') {
            self.pos += 1;
            self.depth -= 1;
            let close = self.tape.len();
            self.tape.push(Node {
                hdr: TAG_CLOSE,
                a: head as u32,
                b: 0,
            });
            self.tape[head].a = close as u32; // пар нет
            self.tape[head].b = close as u32;
            return Ok(());
        }
        loop {
            self.skip_ws();
            match self.peek() {
                Some(b'"') => {}
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
            self.parse_string()?; // ключ
            self.skip_ws();
            match self.peek() {
                Some(b':') => self.pos += 1,
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
            self.skip_ws();
            self.parse_value()?; // значение
            pairs += 1;
            self.skip_ws();
            match self.peek() {
                Some(b',') => self.pos += 1,
                Some(b'}') => {
                    self.pos += 1;
                    self.depth -= 1;
                    let close = self.tape.len();
                    self.tape.push(Node {
                        hdr: TAG_CLOSE,
                        a: head as u32,
                        b: pairs,
                    });
                    self.tape[head].a = head as u32 + 1; // первый ключ
                    self.tape[head].b = close as u32;
                    return Ok(());
                }
                Some(c) => return Err(self.err(ErrorKind::UnexpectedChar(c))),
                None => return Err(self.err(ErrorKind::UnexpectedEof)),
            }
        }
    }
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

// ---------------------------------------------------------------------------
// Ошибки
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Синтетические документы
// ---------------------------------------------------------------------------

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

    fn parse_ok(s: &str) -> Document<'_> {
        parse(s).expect("should parse")
    }

    /// Итерация 5: строковый скан (AVX2 32Б/ит / SWAR 8Б/ит) на всех
    /// позициях остановки относительно границ блоков: содержимое длиной
    /// 0..=96 — закрывающая кавычка пересекает стыки 8/16/32/64 байта.
    #[test]
    fn string_scan_block_boundaries() {
        for n in 0..=96usize {
            let s = format!("\"{}\"", "x".repeat(n));
            assert_eq!(
                parse_ok(&s).root().as_str(),
                Some("x".repeat(n).as_str()),
                "len={n}"
            );
        }
        // контрольный байт на каждой позиции в первых двух блоках
        for n in 0..=40usize {
            let mut s = String::from("\"");
            s.push_str(&"x".repeat(n));
            s.push('\u{1}');
            s.push_str(&"y\"".repeat(2));
            assert!(parse(&s).is_err(), "ctrl at {n} must be rejected");
        }
    }

    /// Итерация 5: экранированные кавычки и backslash-цепочки у границ
    /// блоков — чётность в scan_to_close + decode в фазе 2. Ожидания
    /// строит serde_json (кросс-проверка кодирования и чётности).
    #[test]
    fn escape_parity_block_boundaries() {
        // backslash-цепочки всех длин + кавычка + хвост: чётность
        // предшествующих backslash-ов определяет, закрывает ли кавычка
        // строку; смещения 0..=48 пересекают границы блоков 8/32.
        for n in 0..=48usize {
            let content: String = "\\".repeat(n) + "\"tail";
            let json = serde_json::to_string(&content).expect("encode");
            assert_eq!(
                parse_ok(&json).root().as_str(),
                Some(content.as_str()),
                "bs-chain={n}"
            );
        }
        // пара \ud83d\ude00 (суррогаты) на разных смещениях + '\u0041'
        for n in 0..=48usize {
            let json = format!("\"{}\\ud83d\\ude00-\\u0041\"", "z".repeat(n));
            let expected = format!("{}😀-A", "z".repeat(n));
            assert_eq!(
                parse_ok(&json).root().as_str(),
                Some(expected.as_str()),
                "surrogate pad={n}"
            );
        }
    }

    #[test]
    fn primitives() {
        assert!(parse_ok("null").root().is_null());
        assert_eq!(parse_ok("true").root().as_bool(), Some(true));
        assert_eq!(parse_ok("false").root().as_bool(), Some(false));
        assert_eq!(parse_ok("0").root().as_f64(), Some(0.0));
        assert_eq!(parse_ok("-1").root().as_f64(), Some(-1.0));
        // 3.14 — литерал из документа (не константа PI)
        assert_eq!(parse_ok("123.321").root().as_f64(), Some(123.321_f64));
        assert_eq!(parse_ok("1e10").root().as_f64(), Some(1e10));
        assert_eq!(parse_ok("-2.5e-3").root().as_f64(), Some(-2.5e-3));
        let doc = parse_ok("  [ 1 , 2 ] ");
        let arr_ref = doc.root();
        assert_eq!(arr_ref.len(), Some(2));
        assert_eq!(arr_ref.at(0).unwrap().as_f64(), Some(1.0));
        assert_eq!(arr_ref.at(1).unwrap().as_f64(), Some(2.0));
        let doc = parse_ok("{}");
        assert_eq!(doc.root().len(), Some(0));
    }

    #[test]
    fn strings_and_escapes() {
        assert_eq!(parse_ok(r#""hello""#).root().as_str(), Some("hello"));
        let doc = parse_ok(r#""a\nb\t\"q\"\\/""#);
        assert_eq!(doc.root().as_str(), Some("a\nb\t\"q\"\\/"));
        assert_eq!(parse_ok(r#""\u0041""#).root().as_str(), Some("A"));
        assert_eq!(parse_ok(r#""\ud83d\ude00""#).root().as_str(), Some("😀"));
        // ключи с escape тоже декодируются
        let doc = parse_ok(r#"{"ключ": 1, "esc\u0041": 2}"#);
        assert_eq!(doc.get("ключ").unwrap().as_f64(), Some(1.0));
        assert_eq!(doc.get("escA").unwrap().as_f64(), Some(2.0));
    }

    #[test]
    fn borrowed_vs_owned() {
        let doc = parse_ok(r#"["abc", "a\"b"]"#);
        let root = doc.root();
        assert_eq!(root.at(0).unwrap().str_is_borrowed(), Some(true));
        assert_eq!(root.at(1).unwrap().str_is_borrowed(), Some(false));
        // ключи: без escape — borrowed, с escape — owned
        let doc = parse_ok(r#"{"plain": 1, "esc\u0041": 2}"#);
        let obj = doc.root().as_object().unwrap();
        assert!(obj.key_is_borrowed(0));
        assert!(!obj.key_is_borrowed(1));
    }

    #[test]
    fn nested_and_get() {
        let doc = parse_ok(r#"{"a":{"b":[1,2,{"c":"deep"}]}}"#);
        let deep = doc
            .get("a")
            .unwrap()
            .get("b")
            .unwrap()
            .at(2)
            .unwrap()
            .get("c")
            .unwrap()
            .as_str()
            .unwrap();
        assert_eq!(deep, "deep");
    }

    #[test]
    fn object_iteration() {
        let doc = parse_ok(r#"{"x":1,"y":2,"x":3}"#);
        let obj = doc.root().as_object().unwrap();
        let keys: Vec<&str> = obj.iter().map(|(k, _)| k).collect();
        assert_eq!(keys, vec!["x", "y", "x"]);
        // get возвращает первое вхождение
        assert_eq!(doc.get("x").unwrap().as_f64(), Some(1.0));
        assert_eq!(obj.value_at(2).as_f64(), Some(3.0));
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
        assert_eq!(parse(r#""\q""#).unwrap_err().kind, ErrorKind::InvalidEscape);
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
        let doc_str = sample::session(50);
        let doc = parse(&doc_str).unwrap();
        let serde_v: SValue = serde_json::from_str(&doc_str).unwrap();
        assert!(equiv(doc.root(), &serde_v));
    }

    fn equiv(a: NodeRef<'_, '_>, b: &SValue) -> bool {
        match (a.kind(), b) {
            (Kind::Null, SValue::Null) => true,
            (Kind::Bool, SValue::Bool(y)) => a.as_bool() == Some(*y),
            (Kind::Number, SValue::Number(y)) => a.as_f64() == Some(y.as_f64().unwrap_or(f64::NAN)),
            (Kind::Str, SValue::String(y)) => a.as_str() == Some(y.as_str()),
            (Kind::Array, SValue::Array(y)) => {
                let arr = a.as_array().unwrap();
                arr.len() == y.len() && arr.iter().zip(y.iter()).all(|(n, sv)| equiv(n, sv))
            }
            (Kind::Object, SValue::Object(y)) => {
                let obj = a.as_object().unwrap();
                obj.len() == y.len()
                    && obj
                        .iter()
                        .all(|(k, v)| y.get(k).map(|sv| equiv(v, sv)).unwrap_or(false))
            }
            _ => false,
        }
    }

    /// Числа: ground truth — `str::parse::<f64>` (корректно округлённый,
    /// бит-в-бит); serde_json — с допуском 1 ulp (его собственный парсер
    /// на редких числах отстаёт на 1 ulp от корректного округления —
    /// см. serde-rs/json issues; мы совпадаем со std бит-в-бит).
    #[test]
    fn numbers_match_serde_json() {
        let cases = [
            "0",
            "-0",
            "1",
            "-1",
            "42",
            "9007199254740991",
            "9007199254740992",
            "9007199254740993",
            "18446744073709551615",
            "-9007199254740993",
            "0.5",
            "-0.5",
            "0.05",
            "0.0001",
            "3.141592653589793",
            "2.718281828459045",
            "123.456",
            "1e0",
            "1e1",
            "1e22",
            "1e23",
            "1e-22",
            "1e-23",
            "-1e-22",
            "2.5e-3",
            "123.456e7",
            "123.456e-7",
            "1.5e300",
            "0.1",
            "0.2",
            "0.3",
            "1.1",
            "-2.2",
            "123456.789",
            "1e-5",
            "99999999999999999999",
            "1.7976931348623157e308",
            "5e-324",
        ];
        for c in cases {
            let doc = parse(c).unwrap_or_else(|e| panic!("{c}: {e}"));
            let a = doc.root().as_f64().unwrap();
            // ground truth: корректно округлённый std-парсер — бит-в-бит
            let truth: f64 = c.parse().unwrap();
            assert_eq!(a.to_bits(), truth.to_bits(), "bits mismatch vs std for {c}");
            // serde_json: допуск 1 ulp (его собственные 1-ulp отклонения)
            let serde_v: SValue =
                serde_json::from_str(c).unwrap_or_else(|e| panic!("{c}: serde_json {e}"));
            let b = serde_v.as_f64().unwrap();
            assert!(
                within_1ulp(a, b),
                "serde 1-ulp deviation exceeded for {c}: {a} vs {b}"
            );
            if a == 0.0 && b == 0.0 {
                assert_eq!(
                    a.is_sign_negative(),
                    b.is_sign_negative(),
                    "sign of zero for {c}"
                );
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

    /// Property-тест: случайные числа должны битово совпадать со std.
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
                format!(
                    "{:0width$}",
                    rng.next() % 10u64.pow(frac_len as u32),
                    width = frac_len as usize
                )
            };
            let exp = (rng.next() % 44) as i64 - 22;
            let neg = rng.next().is_multiple_of(2);
            let mut s = String::new();
            if neg {
                s.push('-');
            }
            s.push_str(&int_part.to_string());
            if !frac_part.is_empty() {
                s.push('.');
                s.push_str(&frac_part);
            }
            if rng.next().is_multiple_of(2) {
                s.push('e');
                if rng.next().is_multiple_of(2) {
                    s.push('+');
                }
                s.push_str(&exp.to_string());
            }
            let doc = parse(&s).unwrap_or_else(|e| panic!("{s}: {e}"));
            let a = doc.root().as_f64().unwrap();
            // ground truth: std (корректно округлённый) — бит-в-бит
            let truth: f64 = s.parse().unwrap();
            assert_eq!(a.to_bits(), truth.to_bits(), "bits mismatch vs std for {s}");
            // serde_json — с допуском 1 ulp
            let serde_v: SValue = serde_json::from_str(&s).unwrap();
            let b = serde_v.as_f64().unwrap();
            assert!(
                within_1ulp(a, b),
                "serde 1-ulp deviation exceeded for {s}: {a} vs {b}"
            );
        }
    }

    #[test]
    fn sample_document_parses() {
        let doc_str = sample::session(1000);
        let doc = parse(&doc_str).unwrap();
        let tabs = doc
            .get("windows")
            .unwrap()
            .at(0)
            .unwrap()
            .get("tabs")
            .unwrap();
        assert_eq!(tabs.len(), Some(1000));
        assert_eq!(tabs.at(0).unwrap().get("id").unwrap().as_f64(), Some(0.0));
        assert_eq!(
            tabs.at(0).unwrap().get("active").unwrap().as_bool(),
            Some(true)
        );
        // url содержит \u0026 — owned; ключи — borrowed
        let url = tabs.at(0).unwrap().get("url").unwrap();
        assert_eq!(url.str_is_borrowed(), Some(false));
        assert!(url.as_str().unwrap().contains("&tab=0"));
    }

    #[test]
    fn sample_nums_and_strs_parse() {
        let nums_doc_str = sample::nums(100);
        let doc = parse(&nums_doc_str).unwrap();
        let arr = doc.root();
        assert_eq!(arr.len(), Some(100));
        assert_eq!(arr.at(7).unwrap().get("id").unwrap().as_f64(), Some(7.0));
        assert_eq!(arr.at(7).unwrap().get("x").unwrap().as_f64(), Some(7.5));
        assert_eq!(arr.at(7).unwrap().get("h").unwrap().as_f64(), Some(-7.0));

        let strs_doc_str = sample::strs(100);
        let doc = parse(&strs_doc_str).unwrap();
        let arr = doc.root();
        assert_eq!(arr.len(), Some(100));
        assert!(arr
            .at(0)
            .unwrap()
            .get("url")
            .unwrap()
            .as_str()
            .unwrap()
            .starts_with("https://"));
        // etag содержит escape — должен декодироваться
        assert!(arr
            .at(0)
            .unwrap()
            .get("etag")
            .unwrap()
            .as_str()
            .unwrap()
            .contains("0x"));
    }
}
