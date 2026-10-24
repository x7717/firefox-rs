//! Выборочное профилирование MultiNeedle (SIGPROF-сэмплер) — итерация 22.
//!
//! Цель: распределение времени между сканом (`multi_scan_window_avx2`) и
//! групповой верификацией (`verify_at`) в двух режимах:
//! - `classifier` — поток 200 URL против MARKERS_32 (короткие стоги,
//!   плотные хиты '='-группы) — итерации 21;
//! - `multi2`/`multi8` — стог 7 МБ, SET2/SET8 из benches/multi (редкие
//!   фильтр-байты, хиты только в хвосте).
//!
//! Переменные окружения:
//! - `FOX_PROF_MODE`  — classifier | multi2 | multi8 (по умолчанию classifier);
//! - `FOX_PROF_ITERS` — полных проходов под профайлером (по умолчанию:
//!   classifier 20000, multi 100);
//! - `FOX_PROF_OUT`   — файл с сырыми адресами (/tmp/foxsearch-multi.prof);
//! - `FOX_PROF_US`    — интервал сэмплирования в мкс CPU (по умолчанию 100).

#[path = "../../../tools/sampler.rs"]
mod sampler;

use foxsearch::{sample, MultiNeedle};

fn main() {
    let mode = std::env::var("FOX_PROF_MODE").unwrap_or_else(|_| "classifier".into());
    let out = std::env::var("FOX_PROF_OUT").unwrap_or_else(|_| "/tmp/foxsearch-multi.prof".into());
    let us: u64 = std::env::var("FOX_PROF_US")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(100);

    match mode.as_str() {
        "classifier" => {
            let iters: u64 = std::env::var("FOX_PROF_ITERS")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(20_000);
            let stream = sample::url_stream(200);
            let mn = MultiNeedle::from_strs(&sample::MARKERS_32);

            // Прогрев вне профайлера.
            for url in &stream {
                std::hint::black_box(mn.find(url.as_bytes()));
            }

            sampler::start(us);
            for _ in 0..iters {
                for url in &stream {
                    std::hint::black_box(mn.find(url.as_bytes()));
                }
            }
            let (n, addrs) = sampler::stop_and_dump();
            sampler::write_raw(&out, &addrs);
            println!(
                "foxsearch prof [{mode}]: {n} samples over {iters} classifier passes -> {out}"
            );
        }
        m2 @ ("multi2" | "multi8") => {
            let iters: u64 = std::env::var("FOX_PROF_ITERS")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(100);
            let hay = sample::haystack();
            let set: Vec<&str> = if m2 == "multi2" {
                vec!["Mozilla Corporation", "горячие пути"]
            } else {
                vec![
                    "Mozilla Corporation",
                    "горячие пути",
                    "https://example.com/search?q=firefox+rust&lang=ru",
                    "example.com/search",
                    "firefox+rust&lang",
                    "q=firefox",
                    "lang=ru",
                    "Corporation",
                ]
            };
            let mn = MultiNeedle::from_strs(&set);

            // Прогрев вне профайлера.
            std::hint::black_box(mn.find(hay.as_bytes()));

            sampler::start(us);
            for _ in 0..iters {
                std::hint::black_box(mn.find(hay.as_bytes()));
            }
            let (n, addrs) = sampler::stop_and_dump();
            sampler::write_raw(&out, &addrs);
            println!(
                "foxsearch prof [{m2}]: {n} samples over {iters} scans ({} bytes) -> {out}",
                hay.len()
            );
        }
        other => {
            eprintln!("неизвестный режим: {other} (classifier | multi2 | multi8)");
            std::process::exit(2);
        }
    }
}
