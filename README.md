# Firefox-RS

Форк Firefox с глубокой Rust-оптимизацией горячих путей.
Каждое изменение доказывается числами: benchmark до/после + профилирование.
Оптимизируем то, что профиль показывает самым тяжёлым.

## Текущие результаты (итерация 10: foxurl v0.3 — табличный скан + SWAR, -30% на том же корпусе)

| Крейт | Бенчмарк | Эталон | Итог |
|---|---|---|---|
| foxjson | parse/session-5000 (1.3 МБ) | serde_json | **7.6x быстрее** (1.18 ms vs ~9 ms, 1.08 GiB/s) |
| foxjson | parse/nums-5000 | serde_json | **7.9x быстрее** |
| foxjson | parse/strs-5000 | serde_json | **6.2x быстрее** |
| foxjson | parse/session-500 | serde_json | **5.8x быстрее** |
| foxjson | parse/small | serde_json | **5.4x быстрее** |
| foxsearch | find/"Mozilla Corporation" | std::str::find | **1.9x быстрее** |
| foxsearch | find/"zzz-absent-zzz" | std::str::find | **2.7x быстрее** |
| foxurl | parse/corpus-all (14 URL) | url | **2.8x быстрее** (1.44 µs vs ~4.0 µs; было 2.1x) |
| foxurl | все 14 URL корпуса | url | **2.3–4.5x быстрее** (разброс, -16..-39% за итерацию 10) |
| foxurl | parse/URL с IPv6-хостом и портом | url | **2.7x быстрее** (61 ns vs 164 ns) |

История session-5000: 6.05 ms (дерево, v0.1) -> 1.65 ms (тап, v0.5) -> 1.34 ms (v0.6) -> **1.18 ms (v0.7)** — **5.1x за жизнь проекта**.
История foxurl corpus-all: 2.65 µs (v0.1) -> 2.46 µs (IPv6, v0.2) -> 2.04 µs (без аллокаций, v0.2.1) -> **1.44 µs (v0.3)** — **1.85x за жизнь проекта**.
Числа корректно округлены: foxjson бит-в-бит совпадает со `std str::parse` (точнее serde_json на 1 ulp).
foxurl: zero-copy смещения, отложенная нормализация; сериализация байт-в-байт совпадает с `url` (тест-паритет на 30+ корпусных и 500 синтетических URL + дифференциальный IPv6-корпус). IPv6 — собственный WHATWG-парсер/сериализатор (`src/ipv6.rs`): паритет с `url` и std (включая quirk'и), std-Display-расхождение на IPv4-mapped формах (`::ffff:a00:1`, не `::ffff:10.0.0.1`) устранено; скобки хоста сохраняются на неканоническом входе. v0.3: константные 256-байтные таблицы классификации пути/запроса, SWAR-сканы (\t\n\r, find_byte), слитые проходы userinfo/domain, байтовая запись сериализации — ложные F_USERINFO_ENC устранены, чистые userinfo/mailto-URL остались zero-copy.
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
  foxurl/      WHATWG URL-парсер (zero-copy смещения + отложенная нормализация):
               session store, history (эталон: url)
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
