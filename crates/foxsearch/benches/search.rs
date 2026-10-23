//! Criterion-бенчмарки FoxSearch против `std::str::find` (эталон std).

use std::time::Duration;

use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};
use foxsearch::{find_substring_str, sample};

const NEEDLES: [&str; 4] = [
    "Mozilla Corporation",
    "горячие пути",
    "https://example.com/search?q=firefox+rust&lang=ru",
    "zzz-absent-zzz",
];

fn bench_find(c: &mut Criterion) {
    let hay = sample::haystack();
    let mut group = c.benchmark_group("find");
    group.throughput(Throughput::Bytes(hay.len() as u64));
    group.sample_size(30);
    group.warm_up_time(Duration::from_secs(2));
    group.measurement_time(Duration::from_secs(10));
    for needle in NEEDLES {
        group.bench_function(format!("foxsearch/{needle}"), |b| {
            b.iter(|| find_substring_str(black_box(&hay), black_box(needle)))
        });
        group.bench_function(format!("std/{needle}"), |b| {
            b.iter(|| hay.find(black_box(needle)))
        });
    }
    group.finish();
}

criterion_group!(benches, bench_find);
criterion_main!(benches);
