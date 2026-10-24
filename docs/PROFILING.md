# Методология профилирования

## Инструменты (запускает `.github/workflows/profile.yml`)

1. **criterion** (`bench.yml`) — время, статистика, история на gh-pages,
   алерт при регрессе >150%.
2. **perf + FlameGraph** (job `perf`) — выборка стека 299 Гц с DWARF,
   развёртка в SVG flamegraph.
3. **callgrind** (job `callgrind`) — детерминированные счётчики инструкций
   (Ir), не зависит от PMU, идеален для сравнения «до/после» по сложности.

## Как читать отчёты

- `perf-report.txt`: колонка `Overhead` — доля CPU; флаг `--no-children`
  означает собственное время функции (без вызываемых).
- `flamegraph-*.svg`: ширина блока = доля CPU; ищи широкие плоские «полки» —
  это кандидаты на переписывание.
- `callgrind-report.txt`: колонка `Ir` (instruction count) — точная
  относительная метрика алгоритмической стоимости.

## Правила выбора цели

- Кандидат: функция с >= 5% CPU в горячем примере.
- После оптимизации: сравнить callgrind Ir и criterion-время до/после.
- Регресс criterion в CI — откат коммита.

## Локально

```bash
cargo bench --workspace
cargo build --release --example hotspot -p foxjson
perf record -e cpu-clock -g -- target/release/examples/hotspot
perf report
```

Переменные workload'а: `FOX_HOTSPOT_TABS`, `FOX_HOTSPOT_PARAS`,
`FOX_HOTSPOT_ITERS` (см. `examples/hotspot.rs` каждого крейта).

## Локально без perf/valgrind: SIGPROF-сэмплер (итерация 5)

В контейнерах без root (`perf` требует доступ к счётчикам ядра,
`valgrind` не установлен) работает собственный выборочный профайлер:
`tools/sampler.rs` — ITIMER_PROF шлёт SIGPROF каждые ~250 мкс CPU-времени,
async-signal-safe хендлер пишет RIP в lock-free ring buffer, адреса
символизируются `tools/symbolize.py` через `nm`.

```bash
# сборка: не-PIE обязателен (иначе RIP != файловым адресам);
# cargo rustc применяет флаги только к финальному примеру, не к proc-macro
cargo rustc --release --example prof_json -p foxjson -- \
    -C relocation-model=static -C link-arg=-no-pie
FOX_PROF_ITERS=2000 ./target/release/examples/prof_json
python3 tools/symbolize.py target/release/examples/prof_json /tmp/foxjson.prof --top 20
```

Для foxsearch — `prof_search` (env: `FOX_PROF_PARAS`, `FOX_PROF_ITERS`).

Ограничения: адреса в libc (memcpy/malloc) без карт процесса уходят в
последний символ (`_fini`) — большой `_fini` означает libc-накладные
расходы (для точности: читать `/proc/self/maps` в момент остановки).
A/B ядер скана на шумных виртуалках — `examples/scan_ab.rs` в foxsearch:
старое/новое ядра в одном процессе, попеременные раунды, медианы.

## Стабилизация бенчей против layout-лото (итерация 18)

Уроки сессий 11-13: на этой VM сдвиг кода на +29 байт менял
`parse/foxurl/corpus-all` на +-18% при неизменных абсолютных временах
отдельных URL — структурные выигрыши 5-10% были неотделимы от шума.
Причина: вход функции попадает на неудачную границу fetch-окна / DSB-сета
в зависимости от размеров ПРЕДЫДУЩИХ функций; любое изменение кода
перебрасывает кости для всего, что идёт после.

Мера (сессия 14): три нейтральных pad-возмущения крейта foxurl (pad-функция
0/~40/~500Б, вызывается бенчем вне измеряемого цикла), замер corpus-all
на каждом состоянии:

| конфиг | P0 | P1 | P2 | разброс |
|---|---|---|---|---|
| без флагов | 844.8 ns | 877.3 ns | 862.7 ns | **+3.84%**, все точки различимы |
| CGU=1 + align64 | 783.4 ns | 789.1 ns | 799.5 ns | **+2.06%**, P0/P1 неразличимы |

Принято в `.cargo/config.toml` (действует на bench, test и CI Benchmark):

```toml
[build]
rustflags = ["-C", "codegen-units=1", "-C", "llvm-args=-align-all-functions=6"]
```

- `codegen-units=1` — один CGU на крейт: детерминичный кодgen, убирает
  лотерею CGU-партиционирования (и попутно -7% абсолюта на corpus-all);
- `-align-all-functions=6` — каждый вход функции на границе 64Б:
  выравнивание горячих входов перестаёт зависеть от соседей.

Остаточные ~2% — neighborhood-эффекты (соседний код в I-cache/DSB),
полно не убираются; порог достоверности структурных изменений на этой VM
снижен с ±10-15% до ±3-5%.

ВАЖНО: env `RUSTFLAGS` (если задан) полностью перекрывает config-флаги —
не-PIE проф-сборки (секция выше) работают как раньше. Смена конфига
сдвинула ВСЕ абсолютные числа бенчей один раз (см. WORKLOG, сессия 14);
отношения same-run (foxurl vs url, foxjson vs serde_json) сопоставимы.
