//! Criterion-бенчмарки FoxJSON против serde_json (эталон экосистемы Rust).

use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use foxjson::sample;

fn bench_parse(c: &mut Criterion) {
    let mut group = c.benchmark_group("parse");
    let docs: [(&str, String); 3] = [
        (
            "small",
            r#"{"name":"Firefox","version":132.0,"ok":true,"prefs":{"theme":"dark","zoom":1.25}}"#
                .to_string(),
        ),
        ("session-500", sample::session(500)),
        ("session-5000", sample::session(5000)),
    ];
    for (name, doc) in docs {
        group.throughput(Throughput::Bytes(doc.len() as u64));
        group.bench_with_input(BenchmarkId::new("foxjson", name), &doc, |b, d| {
            b.iter(|| foxjson::parse(black_box(d)).unwrap())
        });
        group.bench_with_input(BenchmarkId::new("serde_json", name), &doc, |b, d| {
            b.iter(|| serde_json::from_str::<serde_json::Value>(black_box(d)).unwrap())
        });
    }
    group.finish();
}

criterion_group!(benches, bench_parse);
criterion_main!(benches);
