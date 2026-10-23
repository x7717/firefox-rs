//! Горячая нагрузка для профилирования (perf / callgrind).
//!
//! Переменные окружения:
//! - `FOX_HOTSPOT_URLS`  — размер корпуса URL, по умолчанию 20000;
//! - `FOX_HOTSPOT_ITERS` — фиксированное число проходов корпуса (для
//!   callgrind); если не задано, крутится ~3 секунды по таймеру (для perf).

use std::time::{Duration, Instant};

use foxurl::sample;

fn main() {
    let n: usize = std::env::var("FOX_HOTSPOT_URLS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(20_000);
    let iters: u64 = std::env::var("FOX_HOTSPOT_ITERS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(0);

    let corpus = sample::corpus(n);

    let deadline = Instant::now() + Duration::from_secs(3);
    let mut round: u64 = 0;
    loop {
        for url in &corpus {
            let parsed = foxurl::parse(url).expect("corpus URL must parse");
            std::hint::black_box(parsed.as_str());
        }
        round += 1;
        if iters > 0 {
            if round >= iters {
                break;
            }
        } else if Instant::now() >= deadline {
            break;
        }
    }
    println!("foxurl hotspot: {round} проходов корпуса из {n} URL");
}
