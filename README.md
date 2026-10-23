# Firefox-RS

Форк Firefox с глубокой Rust-оптимизацией горячих путей.
Каждое изменение доказывается числами: benchmark до/после + профилирование.
Оптимизируем то, что профиль показывает самым тяжёлым.

## CI (работает автоматически)

| Workflow | Что делает | Триггеры |
|---|---|---|
| [CI](https://github.com/x7717/firefox-rs/actions/workflows/ci.yml) | fmt + clippy + тесты + doc | push, PR, nightly |
| [Benchmark](https://github.com/x7717/firefox-rs/actions/workflows/bench.yml) | criterion-бенчи + история производительности (gh-pages) + алерты на регресс | push в main, nightly |
| [Profiling](https://github.com/x7717/firefox-rs/actions/workflows/profile.yml) | perf + FlameGraph + callgrind: отчёты хотспотов в артефактах и Step Summary | вручную, еженедельно |

## Форк Firefox

[x7717/firefox](https://github.com/x7717/firefox) — форк `mozilla/gecko-dev`
(создан через GitHub API, интеграция патчей — Phase 3, см. `docs/ARCHITECTURE.md`).

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
  foxjson/     JSON-парсер: session store, prefs, telemetry (эталон: serde_json)
  foxsearch/   SWAR-поиск байт/подстрок: URL classifier, text ops (эталон: std::str::find)
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
