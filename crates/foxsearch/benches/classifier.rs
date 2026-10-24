//! Criterion-бенчмарки сценария «URL classifier» (итерация 21).
//!
//! Реалистичная нагрузка Firefox URL classifier: поток коротких URL
//! (детерминированный, `sample::url_stream`) проверяется против набора
//! маркеров (`sample::MARKERS_8` — трекинг-параметры, часть попадается;
//! `sample::MARKERS_32` — плюс рекламные/аналитические домены, большей
//! частью «холодные»). Это принципиально ДРУГОЙ режим против benches/multi:
//! haystack'и короткие (40..150Б), вызов find() на каждый URL — где per-call
//! накладные расходы сопоставимы со сканом.
//!
//! Сравнение: `MultiNeedle::find` (переиспользуемый, ОДИН проход на URL)
//! против naive-минимума из K независимых `find_substring`/`std::str::find`
//! на каждый URL (K проходов на URL).

use std::time::Duration;

use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};
use foxsearch::{find_substring_str, sample, MultiNeedle};

/// Эталон: классификация потока K независимыми foxsearch-проходами на URL.
fn naive_fox(stream: &[String], markers: &[&str]) -> Vec<Option<(usize, usize)>> {
    stream
        .iter()
        .map(|url| {
            markers
                .iter()
                .enumerate()
                .filter_map(|(i, m)| find_substring_str(url, m).map(|s| (s, i)))
                .min()
        })
        .collect()
}

/// Контекст: то же через std::str::find.
fn naive_std(stream: &[String], markers: &[&str]) -> Vec<Option<(usize, usize)>> {
    stream
        .iter()
        .map(|url| {
            markers
                .iter()
                .enumerate()
                .filter_map(|(i, m)| url.find(m).map(|s| (s, i)))
                .min()
        })
        .collect()
}

fn bench_classifier(c: &mut Criterion) {
    let stream = sample::url_stream(200);
    let total: u64 = stream.iter().map(|u| u.len() as u64).sum();
    for (name, markers) in [
        ("8", &sample::MARKERS_8[..]),
        ("32", &sample::MARKERS_32[..]),
    ] {
        let mn = MultiNeedle::from_strs(markers);
        let mut group = c.benchmark_group("classifier");
        group.throughput(Throughput::Bytes(total));
        group.sample_size(30);
        group.warm_up_time(Duration::from_secs(2));
        group.measurement_time(Duration::from_secs(10));
        group.bench_function(format!("foxsearch-multi/{name}"), |b| {
            b.iter(|| {
                for url in black_box(&stream) {
                    black_box(mn.find(url.as_bytes()));
                }
            })
        });
        group.bench_function(format!("naive-fox/{name}"), |b| {
            b.iter(|| naive_fox(black_box(&stream), markers))
        });
        group.bench_function(format!("naive-std/{name}"), |b| {
            b.iter(|| naive_std(black_box(&stream), markers))
        });
        group.finish();
    }
}

criterion_group!(benches, bench_classifier);
criterion_main!(benches);
