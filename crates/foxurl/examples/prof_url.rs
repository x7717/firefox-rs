//! Выборочное профилирование foxurl (SIGPROF-сэмплер) — для окружений
//! без perf/valgrind. Аналог prof_json/prof_search.
//!
//! Переменные окружения:
//! - `FOX_PROF_URLS`  — размер корпуса, по умолчанию 20000;
//! - `FOX_PROF_ITERS` — итераций корпуса под профайлером, по умолчанию 200;
//! - `FOX_PROF_OUT`   — файл с сырыми адресами, по умолчанию /tmp/foxurl.prof;
//! - `FOX_PROF_US`    — интервал сэмплирования (мкс CPU), по умолчанию 250.

#[path = "../../../tools/sampler.rs"]
mod sampler;

use foxurl::sample;

fn main() {
    let n: usize = std::env::var("FOX_PROF_URLS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(20_000);
    let iters: u64 = std::env::var("FOX_PROF_ITERS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(200);
    let out = std::env::var("FOX_PROF_OUT").unwrap_or_else(|_| "/tmp/foxurl.prof".into());
    let us: u64 = std::env::var("FOX_PROF_US")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(250);

    let corpus = sample::corpus(n);

    // Прогрев (аллокации, кэши, крэш-детекция путей) вне профайлера.
    for _ in 0..5 {
        for url in &corpus {
            let parsed = foxurl::parse(url).expect("corpus URL must parse");
            std::hint::black_box(parsed.as_str());
        }
    }

    sampler::start(us);
    for _ in 0..iters {
        for url in &corpus {
            let parsed = foxurl::parse(url).expect("corpus URL must parse");
            std::hint::black_box(parsed.as_str());
        }
    }
    let (samples, addrs) = sampler::stop_and_dump();
    sampler::write_raw(&out, &addrs);
    println!("foxurl prof: {samples} samples over {iters} iters (corpus={n} URL) -> {out}");
}
