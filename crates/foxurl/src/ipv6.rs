//! WHATWG IPv6-парсер и сериализатор (url.spec.whatwg.org: «IPv6 parser»,
//! «IPv6 serializer», «find the IPv6 address compressed piece index»).
//!
//! Замена `std::net::Ipv6Addr` (парсер + `Display`): у std две проблемы.
//! Во-первых, `Display` следует RFC 5952 и печатает IPv4-mapped адреса в
//! смешанной форме (`::ffff:10.0.0.1`), тогда как WHATWG-сериализация —
//! чистая шестнадцатеричная (`::ffff:a00:1`), как у крейта `url` (эталон
//! тестов). Во-вторых, `to_string()` аллоцирует строку даже для канонического
//! входа, который затем выбрасывается сравнением. Здесь: парсер в `[u16; 8]`
//! и сериализатор в стековый буфер без аллокаций; owned-String строится
//! только для неканонического входа.
//!
//! Реализация повторяет алгоритм стандарта шаг-в-шаг; проверено
//! дифференциальным корпусом против крейта `url` (и std как второй
//! независимой реализации), включая quirk'и: хвостовая одиночная ':'
//! («1:2:…:») — отказ (ветка терминатора piece'а), «1:2:3:4:5:6:7::»
//! принимается как [1:…:7:0] (compress при piece_index=8, swaps=0),
//! ведущие нули группы — validation error БЕЗ отказа.

/// Восемь 16-битных piece'ей WHATWG IPv6-адреса.
pub(crate) type Pieces = [u16; 8];

/// Максимальная длина канонической формы без скобок: 8 групп по 4 hex +
/// 7 двоеточий = 39; буфер с запасом стандарта (46 — полный адрес IPv6
/// с IPv4-формой RFC 5952, здесь недостижим, но пусть будет запас).
pub(crate) const CANON_BUF: usize = 46;

#[inline]
fn hex_val(c: u8) -> u32 {
    match c {
        b'0'..=b'9' => (c - b'0') as u32,
        b'a'..=b'f' => (c - b'a' + 10) as u32,
        _ => (c - b'A' + 10) as u32, // 'A'..='F', вызывается после is_ascii_hexdigit
    }
}

/// WHATWG IPv6-парсер: `Some(pieces)` или `None` (failure).
pub(crate) fn parse(input: &[u8]) -> Option<Pieces> {
    let n = input.len();
    let mut address: Pieces = [0; 8];
    let mut piece_index = 0usize;
    let mut compress: Option<usize> = None;
    let mut p = 0usize;

    // Ведущее "::" (шаг 4 стандарта): одно ':' в начале — отказ.
    if n > 0 && input[0] == b':' {
        if n < 2 || input[1] != b':' {
            return None; // IPv6-invalid-compression
        }
        p = 2;
        piece_index = 1;
        compress = Some(1);
    }

    while p < n {
        if piece_index == 8 {
            return None; // IPv6-too-many-pieces
        }
        if input[p] == b':' {
            if compress.is_some() {
                return None; // IPv6-multiple-compression
            }
            // Хвостовая одиночная ':' после piece'ей («1:2:…:») сюда НЕ
            // попадает: последний ':' группы съедается веткой терминатора
            // piece'а ниже (там проверка EOF). Эта ветка — первый ':' пары
            // «::»; легитимный конец входа сразу после неё («1::») — ок.
            // quirk (совпадает с `url`): «1:2:3:4:5:6:7::» → [1:…:7:0].
            p += 1;
            piece_index += 1;
            compress = Some(piece_index);
            continue;
        }

        // Группа: до 4 hex-цифр.
        let mut value: u32 = 0;
        let mut length = 0usize;
        while length < 4 && p < n && input[p].is_ascii_hexdigit() {
            value = (value << 4) | hex_val(input[p]);
            p += 1;
            length += 1;
        }

        if p < n && input[p] == b'.' {
            // IPv4-хвост: ровно 4 ДЕСЯТИЧНЫЕ части, без ведущих нулей, <= 255.
            if length == 0 {
                return None; // IPv4-in-IPv6-invalid-code-point
            }
            p -= length; // откат к началу группы (перечитать как IPv4)
            if piece_index > 6 {
                return None; // IPv4-in-IPv6-too-many-pieces
            }
            let mut numbers_seen = 0usize;
            while p < n {
                if numbers_seen > 0 {
                    if input[p] == b'.' && numbers_seen < 4 {
                        p += 1;
                        if p == n {
                            return None; // '.' в конце — пустая часть
                        }
                    } else {
                        return None; // IPv4-in-IPv6-invalid-code-point
                    }
                }
                if !input[p].is_ascii_digit() {
                    return None; // IPv4-in-IPv6-invalid-code-point
                }
                let mut ipv4_piece: Option<u32> = None;
                while p < n && input[p].is_ascii_digit() {
                    let d = (input[p] - b'0') as u32;
                    ipv4_piece = match ipv4_piece {
                        None => Some(d),
                        Some(0) => return None, // ведущий нуль части
                        Some(v) => Some(v * 10 + d),
                    };
                    if ipv4_piece.unwrap() > 255 {
                        return None; // IPv4-in-IPv6-out-of-range-part
                    }
                    p += 1;
                }
                address[piece_index] =
                    (address[piece_index] as u32 * 0x100 + ipv4_piece.unwrap()) as u16;
                numbers_seen += 1;
                if numbers_seen == 2 || numbers_seen == 4 {
                    piece_index += 1;
                }
            }
            if numbers_seen != 4 {
                return None; // IPv4-in-IPv6-too-few-parts
            }
            // IPv4-хвост обязан дойти до конца входа (внутренний цикл уже
            // отверг любой посторонний символ) — выход из главного цикла.
            break;
        } else if p < n && input[p] == b':' {
            p += 1;
            if p == n {
                return None; // IPv6-invalid-code-point
            }
        } else if p < n {
            return None; // IPv6-invalid-code-point (не hex, не '.', не ':')
        }

        // IPv6-piece-leading-zero — validation error БЕЗ отказа:
        // ведущие нули группы («0db8», «0001») допустимы.
        address[piece_index] = value as u16;
        piece_index += 1;
    }

    if let Some(c) = compress {
        // Fixup сжатия: хвостовые piece'и переставить в старшие индексы.
        let mut swaps = piece_index - c;
        let mut pi = 7usize;
        while pi != 0 && swaps > 0 {
            address.swap(pi, c + swaps - 1);
            pi -= 1;
            swaps -= 1;
        }
    } else if piece_index != 8 {
        return None; // IPv6-too-few-pieces
    }
    Some(address)
}

/// Кратчайшая строчная hex-запись piece'а без ведущих нулей.
#[inline]
fn write_piece(v: u16, out: &mut [u8], pos: usize) -> usize {
    if v == 0 {
        out[pos] = b'0';
        return pos + 1;
    }
    const HEX: [u8; 16] = *b"0123456789abcdef";
    let mut tmp = [0u8; 4];
    let mut k = 4;
    let mut v = v;
    while v != 0 {
        k -= 1;
        tmp[k] = HEX[(v & 0xF) as usize];
        v >>= 4;
    }
    out[pos..pos + (4 - k)].copy_from_slice(&tmp[k..]);
    pos + (4 - k)
}

/// WHATWG IPv6-сериализатор: самая длинная серия нулей (размер > 1, при
/// равенстве — первая) заменяется на «::»; чистая hex-форма БЕЗ смешанной
/// IPv4-записи (паритет с `url`; std Display здесь РАСХОДИТСЯ с WHATWG).
/// Возвращает записанную длину (<= 39).
pub(crate) fn serialize(pieces: &Pieces, out: &mut [u8; CANON_BUF]) -> usize {
    // find-the-ipv6-address-compressed-piece-index
    let mut longest_index: Option<usize> = None;
    let mut longest_size = 1usize;
    let mut found_index: Option<usize> = None;
    let mut found_size = 0usize;
    for (i, &piece) in pieces.iter().enumerate() {
        if piece != 0 {
            if found_size > longest_size {
                longest_index = found_index;
                longest_size = found_size;
            }
            found_index = None;
            found_size = 0;
        } else {
            if found_index.is_none() {
                found_index = Some(i);
            }
            found_size += 1;
        }
    }
    if found_size > longest_size {
        longest_index = found_index;
    }

    let mut pos = 0usize;
    let mut ignore0 = false;
    for (i, &piece) in pieces.iter().enumerate() {
        if ignore0 && piece == 0 {
            continue;
        }
        if ignore0 {
            ignore0 = false;
        }
        if longest_index == Some(i) {
            if i == 0 {
                out[pos] = b':';
                pos += 1;
            }
            out[pos] = b':';
            pos += 1;
            ignore0 = true;
            continue;
        }
        pos = write_piece(piece, out, pos);
        if i != 7 {
            out[pos] = b':';
            pos += 1;
        }
    }
    pos
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Байт-точный паритет с крейтом `url` (эталон WHATWG): ok/err и
    /// каноническая сериализация на систематическом корпусе.
    #[test]
    fn differential_url_crate() {
        let mut cases: Vec<String> = Vec::new();

        // Систематика: k групп перед сжатием x позиции сжатия x значения групп.
        let groups = ["0", "1", "f", "ff", "ffff", "db8", "fe80", "2001"];
        for lead in 1..=8usize {
            for tail in 0..=(8 - lead) {
                for g in groups.iter().take(3) {
                    let mut s = vec![g.to_string(); lead].join(":");
                    s.push_str("::");
                    s.push_str(&vec![g.to_string(); tail].join(":"));
                    cases.push(s);
                }
            }
        }
        // Полная форма и варианты регистра/ведущих нулей.
        cases.push("1:2:3:4:5:6:7:8".into());
        cases.push("1:2:3:4:5:6:7:8".to_uppercase());
        cases.push("0001:0db8:0000:0000:0000:0000:0000:0001".into());
        cases.push("0:0:0:0:0:0:0:0".into());
        cases.push("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff".into());
        cases.push("0:f:0:0:f:f:0:0".into()); // равные серии — первая сжимается
        cases.push("1:0:0:2:0:0:0:3".into());
        // quirk'и, подтверждённые против `url`:
        cases.push("1::".into()); // сжатие в самом конце входа
        cases.push("0::".into());
        cases.push("1:2:3:4:5:6:7::".into()); // compress при piece_index=8 → [1:…:7:0]
        cases.push("1:2:::4".into()); // кратные ':' после "::"
                                      // IPv4-хвосты.
        cases.push("1:2:3:4:5:6:1.2.3.4".into());
        cases.push("::1.2.3.4".into());
        cases.push("::ffff:1.2.3.4".into());
        cases.push("::FFFF:1.2.3.4".into());
        cases.push("0:0:0:0:0:ffff:1.2.3.4".into());
        cases.push("::0.0.0.0".into());
        cases.push("::255.255.255.255".into());
        cases.push("64:ff9b::1.2.3.4".into());
        // Отказы: кратность, кратные сжатия, одиночные двоеточия, мусор.
        for bad in [
            ":",
            ":::",
            "1:2:",
            ":1:2::",
            "1::2::3",
            "1:2:3:4:5:6:7:8:9",
            "1:2:3:4:5:6:7:8::",
            "1:2:3:4:5:6:7:",
            "1:2:3:4:5:6:7",
            "12345::",
            "g::",
            "1.2.3.4",
            "::1.2.3.4:5",
            "1:2:3:4:5:6:1.2.3",
            "1:2:3:4:5:6:7:1.2.3.4",
            "::01.2.3.4",
            "::1.2.3.256",
            "::1.2.3.",
            "::ffff:1.2.3.4.5",
            "fe80::1%25eth0",
            "::1%25",
            "1:2:3:4:5:6:7:8:",
            "-1::",
            "::-1",
            "0x1::",
            ":::1",
            "1:::2",
            "1: :2",
            "1:2:3:4:5:6:7:8:",
            "0:0:0:0:0:ffff:1.2.3.4:5",
            "1:2:3:4:5:6:7:8:1.2.3.4",
        ] {
            cases.push(bad.into());
        }

        for a in &cases {
            let u = format!("https://[{a}]/");
            let ours = crate::parse(&u);
            let theirs = url::Url::parse(&u);
            match (ours, theirs) {
                (Ok(o), Ok(t)) => assert_eq!(
                    o.as_str().to_string(),
                    t.as_str(),
                    "сериализация разошлась для [{a}]"
                ),
                (Err(_), Err(_)) => {}
                (o, t) => panic!("ok/err разошлись для [{a}]: ours={o:?} url={t:?}"),
            }
        }
    }

    /// Перекрёстная проверка с std-парсером: приём/отказ совпадают для всех
    /// входов без зоны (serde/std — независимая вторая реализация).
    #[test]
    fn std_cross_check() {
        let cases = [
            "::",
            "::1",
            "1::",
            "2001:db8::1",
            "1:2:3:4:5:6:7:8",
            "::ffff:1.2.3.4",
            "0:0:0:0:0:0:0:0",
            "0001:0db8::",
            "fe80::",
            "::1.2.3.4",
            "1:2:3:4:5:6:7:",
            ":1::",
            "1::2::3",
            ":::",
            "g::",
            "1.2.3.4",
            "12345::",
            "::01.2.3.4",
            "::1.2.3.256",
            "1:2:3:4:5:6:7:8:9",
        ];
        for a in cases {
            let ours = parse(a.as_bytes());
            let std_parsed: Option<std::net::Ipv6Addr> = a.parse().ok();
            assert_eq!(ours.is_some(), std_parsed.is_some(), "std расхождение: {a}");
        }
    }

    /// Свойство каноничности: сериализация идемпотентна, канонический вход
    /// пере-парсится в те же piece'и.
    #[test]
    fn canonical_roundtrip() {
        let cases = [
            "::",
            "::1",
            "2001:db8::1",
            "1::2",
            "::ffff:102:304",
            "0:f::f:f:0:0",
            "1:2:3:4:5:6:7:8",
            "1:0:0:2::3",
        ];
        for a in cases {
            let pieces = parse(a.as_bytes()).expect(a);
            let mut buf = [0u8; CANON_BUF];
            let n = serialize(&pieces, &mut buf);
            let canon = std::str::from_utf8(&buf[..n]).unwrap();
            assert_eq!(canon, a, "сериализация не совпала");
            let reparsed = parse(canon.as_bytes()).expect(canon);
            assert_eq!(reparsed, pieces);
        }
    }
}
