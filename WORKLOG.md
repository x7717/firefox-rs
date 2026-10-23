# WORKLOG — журнал работы

Формат записи: дата (UTC), сессия, что сделано, числа, следующий шаг.
Каждая сессия работы добавляет запись в конец (никогда не перезаписывает).

## 2026-10-23, Сессия 1 — инициализация проекта

Сделано:
- создан репозиторий `x7717/firefox-rs`;
- создан форк Firefox: `mozilla/gecko-dev` -> `x7717/firefox` (GitHub API, 202 Accepted — сборка форка идёт на стороне GitHub);
- Rust-воркспейс:
  - `foxjson` — однопроходный JSON-парсер: zero-copy строки (Cow), объекты как срезы пар, строгая валидация (числа, контрольные символы, lone surrogates), MAX_DEPTH=128; тесты включают структурную эквивалентность с serde_json; criterion-бенчи против serde_json (small / session-500 / session-5000);
  - `foxsearch` — SWAR-поиск: `find_byte` (8 байт/итерация, битовые трюки), `find_two_bytes`, `find_substring` (фильтр по последнему байту + find_byte); property-тесты против std (10000 случайных случаев); criterion-бенчи против `std::str::find` на документе ~7 МБ;
  - `examples/hotspot.rs` в обоих крейтах — управляемые workload'ы для perf/callgrind (env: FOX_HOTSPOT_TABS / FOX_HOTSPOT_PARAS / FOX_HOTSPOT_ITERS).
- CI:
  - `ci.yml` — fmt/clippy (advisory) + тесты + doc; push/PR/nightly;
  - `bench.yml` — criterion (`--output-format bencher`) + github-action-benchmark: история на gh-pages, алерт при регрессе >150%;
  - `profile.yml` — perf + FlameGraph + callgrind, отчёты хотспотов в Step Summary и артефактах.
- docs: ARCHITECTURE, PROFILING, ROADMAP, SCHEDULED_TASK_PROMPT.
- инструменты: `tools/auto-continue.sh`.

Числа (первый локальный прогон, rustc 1.99.1, release, criterion):

| Бенч | foxjson/foxsearch | Эталон | Итог |
|---|---|---|---|
| parse/small | 217 ns (355 MiB/s) | serde_json 633 ns (122 MiB/s) | **foxjson в 2.9x быстрее** |
| parse/session-500 | 346 us (369 MiB/s) | serde_json 650 us (196 MiB/s) | **foxjson в 1.9x быстрее** |
| parse/session-5000 | 6.05 ms (217 MiB/s) | serde_json 9.26 ms (142 MiB/s) | **foxjson в 1.5x быстрее** |
| find/"Mozilla Corporation" | 3.07 ms (3.1 GiB/s) | std 1.14 ms (8.5 GiB/s) | std в 2.7x быстрее — частый последний байт |
| find/"горячие пути" | 1.14 ms (8.4 GiB/s) | std 0.80 ms (12.1 GiB/s) | std в 1.4x быстрее |
| find/URL (длинная игла) | 1.93 ms (5.0 GiB/s) | std 0.71 ms (13.6 GiB/s) | std в 2.7x быстрее |
| find/"zzz-absent-zzz" | 0.68 ms (14.2 GiB/s) | std 1.50 ms (6.4 GiB/s) | **foxsearch в 2.2x быстрее** |

Горячие зоны к следующей сессии (из этих же чисел):
1. foxsearch: выбор последнего байта иглы критичен ('n' в "Corporation" — частый). План: выбирать самый РЕДКИЙ байт иглы (таблица частот), + two-way для длинных игл, + core::arch (SSE2/AVX2) путь.
2. foxjson session-5000: разброс 5.8-6.3 ms — давление аллокаций (Vec::push для значений/пар). План: арена для значений, reserve по длине входа.

Следующий шаг:
- забрать `perf-report.txt` / `callgrind-report.txt` из первого прогона Profiling в CI, подтвердить хотспоты, затем оптимизация №1 и №2 выше (с доказательствами до/после).
