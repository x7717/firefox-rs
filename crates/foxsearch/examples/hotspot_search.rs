//! Горячая нагрузка для профилирования (perf / callgrind).
//!
//! Переменные окружения:
//! - `FOX_HOTSPOT_PARAS` — размер документа (абзацев), по умолчанию 30000;
//! - `FOX_HOTSPOT_ITERS` — фиксированное число полных сканов (для callgrind);
//!   если не задано, крутится ~3 секунды по таймеру (для perf).

use std::time::{Duration, Instant};

use foxsearch::sample;

fn main() {
    let paras: usize = std::env::var("FOX_HOTSPOT_PARAS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(30_000);
    let iters: u64 = std::env::var("FOX_HOTSPOT_ITERS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(0);

    let hay = sample::haystack_n(paras);
    let needles = [
        "Mozilla Corporation",
        "горячие пути",
        "https://example.com/search?q=firefox+rust&lang=ru",
        "zzz-absent-zzz",
    ];

    let deadline = Instant::now() + Duration::from_secs(3);
    let mut scans: u64 = 0;
    let mut hits: u64 = 0;
    loop {
        for needle in needles {
            if foxsearch::find_substring_str(&hay, needle).is_some() {
                hits += 1;
            }
        }
        scans += 1;
        std::hint::black_box(hits);
        if iters > 0 {
            if scans >= iters {
                break;
            }
        } else if Instant::now() >= deadline {
            break;
        }
    }
    println!(
        "foxsearch hotspot: {scans} full scans over {} bytes, {hits} hits",
        hay.len()
    );
}
