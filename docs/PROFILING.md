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
