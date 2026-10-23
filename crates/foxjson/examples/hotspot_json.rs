//! Горячая нагрузка для профилирования (perf / callgrind).
//!
//! Переменные окружения:
//! - `FOX_HOTSPOT_TABS`  — размер документа (вкладок), по умолчанию 2000;
//! - `FOX_HOTSPOT_ITERS` — фиксированное число итераций (для callgrind);
//!   если не задано, крутится ~3 секунды по таймеру (для perf).

use std::time::{Duration, Instant};

use foxjson::sample;

fn main() {
    let tabs: usize = std::env::var("FOX_HOTSPOT_TABS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(2000);
    let iters: u64 = std::env::var("FOX_HOTSPOT_ITERS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(0);

    let doc = sample::session(tabs);
    let deadline = Instant::now() + Duration::from_secs(3);
    let mut n: u64 = 0;
    let mut bytes: u64 = 0;
    loop {
        let value = foxjson::parse(&doc).expect("sample document must parse");
        std::hint::black_box(&value);
        bytes += doc.len() as u64;
        n += 1;
        if iters > 0 {
            if n >= iters {
                break;
            }
        } else if Instant::now() >= deadline {
            break;
        }
    }
    println!(
        "foxjson hotspot: {n} iterations, {bytes} bytes parsed (doc = {tabs} tabs, {} bytes)",
        doc.len()
    );
}
