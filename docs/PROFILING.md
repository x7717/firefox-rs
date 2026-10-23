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
