# Firefox-RS

Форк Firefox с глубокой Rust-оптимизацией горячих путей.
Каждое изменение доказывается числами: benchmark до/после + профилирование.
Оптимизируем то, что профиль показывает самым тяжёлым.

## Текущие результаты (итерация 4, тап-парсер + AVX2-скан)

| Крейт | Бенчмарк | Эталон | Итог |
|---|---|---|---|
| foxjson | parse/session-5000 (1.3 МБ) | serde_json | **5.3x быстрее** (1.65 ms vs 8.73 ms, 795 MiB/s) |
| foxjson | parse/nums-5000 | serde_json | **7.0x быстрее** |
| foxjson | parse/strs-5000 | serde_json | **5.5x быстрее** |
| foxjson | parse/small | serde_json | **5.1x быстрее** |
| foxsearch | find/"Mozilla Corporation" | std::str::find | **1.9x быстрее** |
| foxsearch | find/"zzz-absent-zzz" | std::str::find | **2.7x быстрее** |

История session-5000: 6.05 ms (дерево, v0.1) -> 1.65 ms (тап, v0.5) — **3.7x за жизнь проекта**.
Числа корректно округлены: foxjson бит-в-бит совпадает со `std str::parse` (точнее serde_json на 1 ulp).
Все детали и история итераций — в [WORKLOG.md](WORKLOG.md).

## CI (работает автоматически)

| Workflow | Что делает | Триггеры |
|---|---|---|
| [CI](https://github.com/x7717/firefox-rs/actions/workflows/ci.yml) | fmt + clippy + тесты + doc | push, PR, nightly |
| [Benchmark](https://github.com/x7717/firefox-rs/actions/workflows/bench.yml) | criterion-бенчи + история производительности (gh-pages) + алерты на регресс | push в main, nightly |
| [Profiling](https://github.com/x7717/firefox-rs/actions/workflows/profile.yml) | perf + FlameGraph + callgrind: отчёты хотспотов в артефактах и Step Summary | вручную, еженедельно |

## Форк Firefox

[x7717/gecko-dev](https://github.com/x7717/gecko-dev) — форк `mozilla/gecko-dev`
(Rust-ядро WebRender уже собирается в его CI; интеграция патчей — Phase 3,
см. `docs/ARCHITECTURE.md`).

## Быстрый старт

```bash
git clone https://github.com/x7717/firefox-rs
cd firefox-rs
cargo test --workspace     # тесты (foxjson ≈ serde_json эквивалентность, foxsearch ≈ std)
cargo bench --workspace    # criterion-бенчи против эталонов
```

Профилирование локально:

```bash
cargo build --release --example hotspot -p foxjson
perf record -g -- target/release/examples/hotspot
```

## Структура

```
crates/
  foxjson/     ТАП-парсер JSON (плоская лента узлов, ~15 аллокаций на документ):
               session store, prefs, telemetry (эталон: serde_json)
  foxsearch/   SIMD-поиск (AVX2-ядро 32 байт/итерацию + rarity-фильтры):
               URL classifier, text ops (эталон: std::str::find)
docs/
  ARCHITECTURE.md   стратегия «измеряй -> переписывай -> доказывай -> интегрируй»
  PROFILING.md      методология профилирования
  ROADMAP.md        карта горячих зон Firefox и статусы
  SCHEDULED_TASK_PROMPT.md   промпт для Scheduled Task (автономный цикл)
tools/
  auto-continue.sh  механическая поддержка (git pull, тесты, heartbeat)
WORKLOG.md          журнал всех изменений с числами
```

## Правила проекта

1. Никаких изменений без чисел (до/после).
2. Регресс в бенчах — откат.
3. Каждая оптимизация сопровождается тестами и бенчмарком.
4. Каждая сессия работы фиксируется в `WORKLOG.md`.
