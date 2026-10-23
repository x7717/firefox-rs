//! A/B-харнесс ядер скана на шумных виртуалках: старое (32 Б/ит, AVX2)
//! против новых (64 Б/ит AVX2 и AVX-512) в ОДНОМ процессе, попеременные
//! раунды A/B/A/B — машинный дрейф гасится, сравнение честное.
//!
//! Игла — 'z' из "zzz-absent-zzz": чистый скан по всему документу
//! (совпадений нет, кроме последнего блока), худший случай для скана.

#![allow(clippy::missing_safety_doc)]

use std::arch::x86_64::*;
use std::time::Instant;

use foxsearch::sample;

const ROUNDS: usize = 30;

#[target_feature(enable = "avx2")]
unsafe fn scan_avx2_32(hay: &[u8], needle: u8) -> Option<usize> {
    // СтАРЫЙ код итерации 4 (32 байта/итерацию) — для сравнения.
    let len = hay.len();
    let ptr = hay.as_ptr();
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
    let chunk = _mm256_loadu_si256(ptr.add(len - 32) as *const __m256i);
    let m = _mm256_movemask_epi8(_mm256_cmpeq_epi8(chunk, n));
    if m != 0 {
        return Some(len - 32 + m.trailing_zeros() as usize);
    }
    None
}

#[target_feature(enable = "avx2")]
unsafe fn scan_avx2_64(hay: &[u8], needle: u8) -> Option<usize> {
    let len = hay.len();
    let ptr = hay.as_ptr();
    let n = _mm256_set1_epi8(needle as i8);
    let mut i = 0usize;
    while i + 64 <= len {
        let a = _mm256_loadu_si256(ptr.add(i) as *const __m256i);
        let b = _mm256_loadu_si256(ptr.add(i + 32) as *const __m256i);
        let ma = _mm256_movemask_epi8(_mm256_cmpeq_epi8(a, n));
        let mb = _mm256_movemask_epi8(_mm256_cmpeq_epi8(b, n));
        let m = (mb as u32 as u64) << 32 | ma as u32 as u64;
        if m != 0 {
            return Some(i + m.trailing_zeros() as usize);
        }
        i += 64;
    }
    let chunk = _mm256_loadu_si256(ptr.add(len - 32) as *const __m256i);
    let m = _mm256_movemask_epi8(_mm256_cmpeq_epi8(chunk, n));
    if m != 0 {
        return Some(len - 32 + m.trailing_zeros() as usize);
    }
    None
}

#[target_feature(enable = "avx512f,avx512bw")]
unsafe fn scan_avx512(hay: &[u8], needle: u8) -> Option<usize> {
    let len = hay.len();
    let ptr = hay.as_ptr();
    let n = _mm512_set1_epi8(needle as i8);
    let mut i = 0usize;
    while i + 64 <= len {
        let chunk = _mm512_loadu_si512(ptr.add(i) as *const __m512i);
        let m = _mm512_cmpeq_epi8_mask(chunk, n);
        if m != 0 {
            return Some(i + m.trailing_zeros() as usize);
        }
        i += 64;
    }
    let chunk = _mm512_loadu_si512(ptr.add(len - 64) as *const __m512i);
    let m = _mm512_cmpeq_epi8_mask(chunk, n);
    if m != 0 {
        return Some(len - 64 + m.trailing_zeros() as usize);
    }
    None
}

fn timeit<F>(f: F, hay: &[u8], needle: u8) -> f64
where
    F: Fn(&[u8], u8) -> Option<usize>,
{
    let mut ts = Vec::with_capacity(ROUNDS);
    for _ in 0..ROUNDS {
        let t = Instant::now();
        std::hint::black_box(f(hay, needle));
        ts.push(t.elapsed().as_secs_f64());
    }
    ts.sort_by(|a, b| a.partial_cmp(b).unwrap());
    ts[ROUNDS / 2]
}

fn main() {
    if !std::arch::is_x86_feature_detected!("avx512f") {
        println!("нет AVX-512 — A/B бессмысленен");
        return;
    }
    let hay = sample::haystack_n(30_000);
    let (n32, n64, n512) = (scan_avx2_32, scan_avx2_64, scan_avx512);
    let mut t32 = Vec::new();
    let mut t64 = Vec::new();
    let mut t512 = Vec::new();
    // Прогрев.
    unsafe {
        black(n32(hay.as_bytes(), b'z'));
        black(n64(hay.as_bytes(), b'z'));
        black(n512(hay.as_bytes(), b'z'));
    }
    for _ in 0..5 {
        unsafe {
            t32.push(timeit(|h, n| n32(h, n), hay.as_bytes(), b'z'));
            t64.push(timeit(|h, n| n64(h, n), hay.as_bytes(), b'z'));
            t512.push(timeit(|h, n| n512(h, n), hay.as_bytes(), b'z'));
        }
    }
    let med = |mut v: Vec<f64>| {
        v.sort_by(|a, b| a.partial_cmp(b).unwrap());
        v[v.len() / 2]
    };
    let (m32, m64, m512) = (med(t32), med(t64), med(t512));
    let gibs = |t: f64| hay.len() as f64 / t / (1024.0 * 1024.0 * 1024.0);
    println!(
        "scan 32B/it (old): {:>8.1} µs  ({:.1} GiB/s, x{:.2} к 512)",
        m32 * 1e6,
        gibs(m32),
        m512 / m32
    );
    println!(
        "scan 64B/it (avx2): {:>7.1} µs  ({:.1} GiB/s, x{:.2} к 512)",
        m64 * 1e6,
        gibs(m64),
        m512 / m64
    );
    println!(
        "scan 64B/it (avx512): {:>5.1} µs  ({:.1} GiB/s)",
        m512 * 1e6,
        gibs(m512)
    );
}

#[inline]
fn black<T>(v: T) -> T {
    std::hint::black_box(v)
}
