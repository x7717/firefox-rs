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

/// Подкорпус с пересборкой as_str (flags / host_owned / пустой путь):
/// сериализация — вторая половина полного конвейера parse+serialize.
const DIRTY: [&str; 7] = [
    "https://Example.COM/Upper/Case?a=B#Frag", // scheme+host lowercase
    "https://example.com/a/./b/../c/./d/e/../f?x=1#f", // dot-сегменты (плотно)
    "https://example.com",                     // пустой путь -> "/"
    "https://cdn.example.org/assets/bundle-812/chunk/app.main.min.css", // точки в имени
    "https://user:pa:ss@example.com/secure/path", // ':' в пароле -> %3A
    "https://example.com/pa th/x?q=a b#f rag", // пробелы: путь+запрос+фрагмент
    "https://maps.example.com/поиск?q=значение", // не-ASCII (UTF-8 percent)
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

/// Изолированная сериализация: parse вне цикла, as_str (с пересборкой
/// для грязных URL) в цикле.
fn bench_serialize(c: &mut Criterion) {
    let mut group = c.benchmark_group("serialize");
    group.throughput(Throughput::Elements(1));
    for (k, url_str) in DIRTY.iter().enumerate() {
        let parsed = foxurl::parse(url_str).unwrap();
        group.bench_with_input(criterion::BenchmarkId::new("foxurl", k), url_str, |b, _| {
            b.iter(|| black_box(&parsed).as_str())
        });
    }
    let parsed: Vec<_> = DIRTY.iter().map(|u| foxurl::parse(u).unwrap()).collect();
    group.throughput(Throughput::Elements(DIRTY.len() as u64));
    group.bench_function("foxurl/dirty-all", |b| {
        b.iter(|| {
            for p in &parsed {
                black_box(p.as_str());
            }
        })
    });
    group.finish();
}

/// Полный конвейер «canonical string»: foxurl — parse + ленивая
/// сериализация; url — parse (нормализация жадная, as_str бесплатна).
/// Честное end-to-end сравнение получения канонической строки.
fn bench_canonical(c: &mut Criterion) {
    let mut group = c.benchmark_group("canonical");
    for (name, corpus) in [("corpus-all", &CORPUS[..]), ("dirty-all", &DIRTY[..])] {
        group.throughput(Throughput::Elements(corpus.len() as u64));
        group.bench_function(format!("foxurl/{name}"), |b| {
            b.iter(|| {
                for u in corpus {
                    black_box(foxurl::parse(black_box(u)).unwrap().as_str());
                }
            })
        });
        group.bench_function(format!("url_crate/{name}"), |b| {
            b.iter(|| {
                for u in corpus {
                    black_box(url::Url::parse(black_box(u)).unwrap().as_str());
                }
            })
        });
    }
    group.finish();
}

criterion_group!(benches, bench_parse, bench_serialize, bench_canonical);
criterion_main!(benches);
