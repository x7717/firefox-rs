//! Criterion-бенчмарки мульти-игольного поиска (итерация 20).
//!
//! Сравнение: `MultiNeedle::find` (ОДИН проход по стогу) против наивного
//! min по N независимым вызовам `find_substring`/`std::str::find`
//! (N полных проходов). Все иглы встречаются в стоге ОДИН раз — у хвоста
//! документа (худший случай: полный проход), как и в benches/search.rs.
//!
//! Наборы покрывают все ветки сканера: |S|=2 (cmpeq-OR), |S|=4 (cmpeq-OR),
//! |S|=6 (PSHUFB-биткарта).

use std::time::Duration;

use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};
use foxsearch::{find_substring_str, sample, MultiNeedle};

const SET2: [&str; 2] = ["Mozilla Corporation", "горячие пути"];

const SET4: [&str; 4] = [
    "Mozilla Corporation",
    "горячие пути",
    "https://example.com/search?q=firefox+rust&lang=ru",
    "example.com/search",
];

const SET8: [&str; 8] = [
    "Mozilla Corporation",
    "горячие пути",
    "https://example.com/search?q=firefox+rust&lang=ru",
    "example.com/search",
    "firefox+rust&lang",
    "q=firefox",
    "lang=ru",
    "Corporation",
];

/// Эталон: минимум (старт, индекс) по N независимым foxsearch-проходам.
fn naive_fox(hay: &str, needles: &[&str]) -> Option<(usize, usize)> {
    needles
        .iter()
        .enumerate()
        .filter_map(|(i, n)| find_substring_str(hay, n).map(|s| (s, i)))
        .min()
}

/// Контекст: минимум по N std-проходам.
fn naive_std(hay: &str, needles: &[&str]) -> Option<(usize, usize)> {
    needles
        .iter()
        .enumerate()
        .filter_map(|(i, n)| hay.find(n).map(|s| (s, i)))
        .min()
}

fn bench_multi(c: &mut Criterion) {
    let hay = sample::haystack();
    let mut group = c.benchmark_group("multi");
    group.throughput(Throughput::Bytes(hay.len() as u64));
    group.sample_size(30);
    group.warm_up_time(Duration::from_secs(2));
    group.measurement_time(Duration::from_secs(10));
    for (name, set) in [("2", &SET2[..]), ("4", &SET4[..]), ("8", &SET8[..])] {
        let mn = MultiNeedle::from_strs(set);
        group.bench_function(format!("foxsearch-multi/{name}"), |b| {
            b.iter(|| mn.find(black_box(hay.as_bytes())))
        });
        group.bench_function(format!("naive-fox/{name}"), |b| {
            b.iter(|| naive_fox(black_box(&hay), set))
        });
        group.bench_function(format!("naive-std/{name}"), |b| {
            b.iter(|| naive_std(black_box(&hay), set))
        });
    }
    group.finish();
}

criterion_group!(benches, bench_multi);
criterion_main!(benches);
