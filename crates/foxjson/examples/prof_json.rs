//! Выборочное профилирование foxjson (SIGPROF-сэмплер) — для окружений
//! без perf/valgrind.
//!
//! Переменные окружения:
//! - `FOX_PROF_TABS`  — размер документа (вкладок), по умолчанию 5000;
//! - `FOX_PROF_ITERS` — итераций под профайлером, по умолчанию 300;
//! - `FOX_PROF_OUT`   — файл с сырыми адресами, по умолчанию /tmp/foxjson.prof;
//! - `FOX_PROF_US`    — интервал сэмплирования (мкс CPU), по умолчанию 250;
//! - `FOX_PROF_DOC`   — workload: session | nums | strs (по умолчанию session).

#[path = "../../../tools/sampler.rs"]
mod sampler;

use foxjson::sample;

fn main() {
    let tabs: usize = std::env::var("FOX_PROF_TABS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(5_000);
    let iters: u64 = std::env::var("FOX_PROF_ITERS")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(300);
    let out = std::env::var("FOX_PROF_OUT").unwrap_or_else(|_| "/tmp/foxjson.prof".into());
    let us: u64 = std::env::var("FOX_PROF_US")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(250);

    let doc = match std::env::var("FOX_PROF_DOC")
        .unwrap_or_else(|_| "session".into())
        .as_str()
    {
        "nums" => sample::nums(tabs),
        "strs" => sample::strs(tabs),
        _ => sample::session(tabs),
    };

    // Прогрев (аллокации, кэши, AVX2-детекция) вне профайлера.
    for _ in 0..20 {
        let d = foxjson::parse(&doc).expect("sample document must parse");
        std::hint::black_box(&d);
    }

    sampler::start(us);
    for _ in 0..iters {
        let d = foxjson::parse(&doc).expect("sample document must parse");
        std::hint::black_box(&d);
    }
    let (n, addrs) = sampler::stop_and_dump();
    sampler::write_raw(&out, &addrs);
    println!(
        "foxjson prof: {n} samples over {iters} iters (doc={tabs} tabs, {} bytes) -> {out}",
        doc.len()
    );
}
