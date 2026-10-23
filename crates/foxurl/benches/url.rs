//! Criterion-бенчмарки FoxURL против крейта `url` (эталон экосистемы Rust).
//!
//! Корпус — реалистичные URL горячих путей Firefox: session store
//! (history entries), страницы с запросами, CDN-ассеты, IPv6, userinfo.

use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};

/// Реалистичный корпус URL (что парсит Firefox в session store / history).
const CORPUS: [&str; 14] = [
    "https://example.com/page/42?q=firefox&tab=7",
    "https://news.example.org/articles/2026/10/firefox-rs?page=3&sort=desc#comments",
    "https://cdn.example.org/assets/bundle-812/chunk/app.main.min.css",
    "https://api.example.com/v2/sessionstore?schema=1&limit=500",
    "http://legacy.example.net:8080/old/path/index.html",
    "https://user:secret@example.com/secure/path",
    "https://example.com",
    "https://[2001:db8::1]:8443/metrics?format=json",
    "https://maps.example.com/search/?q=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&zoom=12",
    "https://shop.example.com/catalog/item/12345?color=red&size=L&currency=USD",
    "https://docs.example.com/en-US/rust/core/arch/fn.avx2/",
    "https://tr.example.org/build/1234/artifacts/log.txt?line=200#L210",
    "https://Example.COM/Upper/Case?a=B#Frag",
    "https://example.com/a/./b/../c?x=1#f",
];

fn bench_parse(c: &mut Criterion) {
    let mut group = c.benchmark_group("parse");
    for (k, url) in CORPUS.iter().enumerate() {
        group.throughput(Throughput::Elements(1));
        group.bench_with_input(criterion::BenchmarkId::new("foxurl", k), url, |b, u| {
            b.iter(|| foxurl::parse(black_box(u)).unwrap())
        });
        group.bench_with_input(criterion::BenchmarkId::new("url_crate", k), url, |b, u| {
            b.iter(|| url::Url::parse(black_box(u)).unwrap())
        });
    }
    // сводный: весь корпус за итерацию
    group.throughput(Throughput::Elements(CORPUS.len() as u64));
    group.bench_function("foxurl/corpus-all", |b| {
        b.iter(|| {
            for u in CORPUS.iter() {
                black_box(foxurl::parse(black_box(u)).unwrap());
            }
        })
    });
    group.bench_function("url_crate/corpus-all", |b| {
        b.iter(|| {
            for u in CORPUS.iter() {
                black_box(url::Url::parse(black_box(u)).unwrap());
            }
        })
    });
    group.finish();
}

criterion_group!(benches, bench_parse);
criterion_main!(benches);
