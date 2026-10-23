//! Выборочное профилирование foxsearch (SIGPROF-сэмплер) — для окружений
//! без perf/valgrind.
//!
//! Переменные окружения:
//! - `FOX_PROF_PARAS` — размер документа (абзацев), по умолчанию 30000;
//! - `FOX_PROF_ITERS` — полных сканов по 4 иглам под профайлером, по
//!   умолчанию 30;
//! - `FOX_PROF_OUT`   — файл с сырыми адресами, по умолчанию /tmp/foxsearch.prof;
//! - `FOX_PROF_US`    — интервал сэмплирования (мкс CPU), по умолчанию 250.

#[path = "../../../tools/sampler.rs"]
mod sampler;

use foxsearch::sample;

fn main() {
    let paras: usize = std::env::var("FOX_PROF_PARAS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(30_000);
    let iters: u64 = std::env::var("FOX_PROF_ITERS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(30);
    let out = std::env::var("FOX_PROF_OUT").unwrap_or_else(|_| "/tmp/foxsearch.prof".into());
    let us: u64 = std::env::var("FOX_PROF_US")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(250);

    let hay = sample::haystack_n(paras);
    let needles = [
        "Mozilla Corporation",
        "горячие пути",
        "https://example.com/search?q=firefox+rust&lang=ru",
        "zzz-absent-zzz",
    ];

    // Прогрев вне профайлера.
    for needle in needles {
        std::hint::black_box(foxsearch::find_substring_str(&hay, needle));
    }

    sampler::start(us);
    for _ in 0..iters {
        for needle in needles {
            std::hint::black_box(foxsearch::find_substring_str(&hay, needle));
        }
    }
    let (n, addrs) = sampler::stop_and_dump();
    sampler::write_raw(&out, &addrs);
    println!(
        "foxsearch prof: {n} samples over {iters} scans (doc={} bytes) -> {out}",
        hay.len()
    );
}
