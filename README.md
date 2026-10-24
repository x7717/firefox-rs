# Firefox-RS

Форк Firefox с глубокой Rust-оптимизацией горячих путей.
Каждое изменение доказывается числами: benchmark до/после + профилирование.
Оптимизируем то, что профиль показывает самым тяжёлым.

## Текущие результаты (итерация 11: foxurl v0.4 — точный F_PATH_NORM: полкорпуса URL вернулись в zero-copy, canonical -26%)

| Крейт | Бенчмарк | Эталон | Итог |
|---|---|---|---|
| foxjson | parse/session-5000 (1.3 МБ) | serde_json | **7.6x быстрее** (1.18 ms vs ~9 ms, 1.08 GiB/s) |
| foxjson | parse/nums-5000 | serde_json | **7.9x быстрее** |
| foxjson | parse/strs-5000 | serde_json | **6.2x быстрее** |
| foxjson | parse/session-500 | serde_json | **5.8x быстрее** |
| foxjson | parse/small | serde_json | **5.4x быстрее** |
| foxsearch | find/"Mozilla Corporation" | std::str::find | **1.9x быстрее** |
| foxsearch | find/"zzz-absent-zzz" | std::str::find | **2.7x быстрее** |
| foxurl | parse/corpus-all (14 URL) | url | **2.9x быстрее** (1.30 µs vs ~4.1 µs) |
| foxurl | canonical/corpus-all (parse+as_str, 14 URL) | url | **2.8x быстрее** (1.46 µs vs ~4.1 µs; было 2.0x) |
| foxurl | serialize/dirty-all (as_str, 7 грязных URL) | — | **-15%** (621 -> 529 ns; css-URL 156 -> 4 ns = -97.4%) |
| foxurl | все 14 URL корпуса | url | **2.3–4.5x быстрее** (разброс) |
| foxurl | parse/URL с IPv6-хостом и портом | url | **2.7x быстрее** |

История session-5000: 6.05 ms (дерево, v0.1) -> 1.65 ms (тап, v0.5) -> 1.34 ms (v0.6) -> **1.18 ms (v0.7)** — **5.1x за жизнь проекта**.
История foxurl corpus-all (parse): 2.65 µs (v0.1) -> 2.46 µs (v0.2) -> 2.04 µs (v0.2.1) -> 1.44 µs (v0.3) -> **1.30 µs (v0.4)** — **2.0x за жизнь проекта**.
История canonical (parse+as_str, полный конвейер): 1.99 µs (v0.3) -> **1.46 µs (v0.4)**; отрыв от `url` 2.02x -> **2.83x**.
Числа корректно округлены: foxjson бит-в-бит совпадает со `std str::parse` (точнее serde_json на 1 ulp).
foxurl: zero-copy смещения, отложенная нормализация; сериализация байт-в-байт совпадает с `url` (тест-паритет на 47 корпусных и 500 синтетических URL + дифференциальный IPv6-корпус). IPv6 — собственный WHATWG-парсер/сериализатор (`src/ipv6.rs`): паритет с `url` и std (включая quirk'и), std-Display-расхождение на IPv4-mapped формах (`::ffff:a00:1`, не `::ffff:10.0.0.1`) устранено; скобки хоста сохраняются на неканоническом входе. v0.4: ТОЧНЫЙ F_PATH_NORM — флаг ставится только на настоящем dot-сегменте (холодный проход после горячего цикла): «app.main.min.css», «index.html», «%20» больше не вынуждают пересборку as_str; нормализация dot-сегментов распространена на не-специальные схемы (был баг паритета); классификация сегментов одним switch по длине; fast-path write_encoded (чистый срез = memcpy чанками без вызова memcpy).
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
