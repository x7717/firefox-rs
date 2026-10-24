# Firefox-RS

Форк Firefox с глубокой Rust-оптимизацией горячих путей.
Каждое изменение доказывается числами: benchmark до/после + профилирование.
Оптимизируем то, что профиль показывает самым тяжёлым.

## Текущие результаты (итерация 20: foxsearch v0.2 — мульти-игольный поиск, один проход против N)

| Крейт | Бенчмарк | Эталон | Итог |
|---|---|---|---|
| foxjson | parse/session-5000 (1.3 МБ) | serde_json | **7.4x быстрее** (1.14 ms vs ~8.4 ms same-run, 1.12 GiB/s) |
| foxjson | parse/nums-5000 | serde_json | **7.4x быстрее** |
| foxjson | parse/strs-5000 | serde_json | **6.2x быстрее** |
| foxjson | parse/session-500 | serde_json | **6.0x быстрее** |
| foxjson | parse/small | serde_json | **5.6x быстрее** |
| foxsearch | find/"Mozilla Corporation" | std::str::find | **1.9x быстрее** |
| foxsearch | find/"zzz-absent-zzz" | std::str::find | **2.7x быстрее** |
| foxsearch | multi-2 (2 иглы за проход) | 2× find_substring | **1.5–2.0x быстрее** |
| foxsearch | multi-4 (4 иглы за проход) | 4× find_substring | **2.7–3.0x быстрее** |
| foxsearch | multi-8 (8 игл за проход) | 8× find_substring | **3.4–3.8x быстрее** (6.8x от 8× std::str::find) |
| foxurl | parse/corpus-all (14 URL) | url | **4.8x быстрее** (0.85 µs vs ~4.0 µs same-run) |
| foxurl | canonical/corpus-all (parse+as_str, 14 URL) | url | **4.1x быстрее** (0.98 µs vs ~4.0 µs; было 2.0x) |
| foxurl | serialize/dirty-all (as_str, 7 грязных URL) | — | **-15%** за итерацию 11 (css-URL 156 -> 4 ns = -97.4%) |
| foxurl | все 14 URL корпуса | url | **2.3–4.5x быстрее** (разброс) |
| foxurl | parse/URL с IPv6-хостом и портом | url | **2.7x быстрее** |

История session-5000: 6.05 ms (дерево, v0.1) -> 1.65 ms (тап, v0.5) -> 1.34 ms (v0.6) -> 1.18 ms (v0.7) -> **1.14 ms (v0.8)** — **5.3x за жизнь проекта**.
История foxurl corpus-all (parse): 2.65 µs (v0.1) -> 2.46 (v0.2) -> 2.04 (v0.2.1) -> 1.44 (v0.3) -> 1.30 (v0.4) -> 1.10 (v0.5) -> 0.90 (v0.6) -> **0.85 µs (v0.7)** — **3.1x за жизнь проекта**.
История canonical (parse+as_str, полный конвейер): 1.99 µs (v0.3) -> 1.46 (v0.4) -> 1.27 (v0.5) -> 1.06 (v0.6) -> **0.98 µs (v0.7)**; отрыв от `url` 2.02x -> 3.16x -> 3.9x -> **4.1x**.
Числа корректно округлены: foxjson бит-в-бит совпадает со `std str::parse` (точнее serde_json на 1 ulp).
foxjson v0.8 (итерация 14): токен-трединг контейнеров — `next_tok` (слитые skip_ws+peek, pos остаётся НА токене) + `parse_value_tok` (диспетчеризация по УЖЕ выбранному токену): цикл пары объекта — 4 гранично-проверяемых пика вместо 8, элемент массива — 2 вместо 4; разделители (`,`/`:`) потребляются явно (next_tok не продвигает pos — баг первой попытки пойман краевым тестом). session-5000 -2.6..-3.4%, session-500 -2.2..-2.4%, strs -0.5..-2.1%, nums/small в шуме; регрессов нет.
foxurl: zero-copy смещения, отложенная нормализация; сериализация байт-в-байт совпадает с `url` (тест-паритет на 47 корпусных и 500 синтетических URL + дифференциальный IPv6-корпус). IPv6 — собственный WHATWG-парсер/сериализатор (`src/ipv6.rs`): паритет с `url` и std (включая quirk'и), std-Display-расхождение на IPv4-mapped формах (`::ffff:a00:1`, не `::ffff:10.0.0.1`) устранено; скобки хоста сохраняются на неканоническом входе. v0.4: ТОЧНЫЙ F_PATH_NORM — флаг ставится только на настоящем dot-сегменте (холодный проход после горячего цикла): «app.main.min.css», «index.html», «%20» больше не вынуждают пересборку as_str; нормализация dot-сегментов распространена на не-специальные схемы (был баг паритета); классификация сегментов одним switch по длине; fast-path write_encoded (чистый срез = memcpy чанками без вызова memcpy). v0.5: табличный скан домена — ОДИН проход scan_host_domain вместо трёх (SWAR find ':' + memchr '%' + валидация), DomainOutcome-разделение быстрого/редких путей, табличный скан терминаторов authority. v0.6: '@' — маркер в таблице терминаторов (последний '@' копится в регистре самим сканом authority): parse_userinfo для URL без userinfo НЕ СКАНИРУЕТ authority вовсе (раньше rfind-проход по всему спану хоста); схема — один табличный проход SCHEME_TBL со СЛИТЫМ детектом верхнего регистра (второй any()-проход удалён); has_dirty_ws — 16Б/итер (u128-чанки); ends_in_a_number — pre-check по последнему байту. ПАРИТЕТ-ФИКС (краевой тест): WHATWG-сериализатор опускает '@' при пустых user+pass ("https://@h/" == "https://h/") и ':' при пустом pass ("user:@h" == "user@h"); password() при пустом пароле возвращает None как у url; fast-path zero-copy as_str учитывает каноничность userinfo.
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
  foxsearch/   SIMD-поиск (AVX2-ядро 32 байт/итерацию + rarity-фильтры;
               MultiNeedle v0.2: N игл за ОДИН проход — пакетный сбор хитов
               окнами 4КБ, cmpeq-OR до |S|=8, PSHUFB-биткарта сверх):
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
