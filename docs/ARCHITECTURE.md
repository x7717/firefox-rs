# Архитектура Firefox-RS

## Миссия

Форк Firefox с глубокой Rust-оптимизацией горячих путей.
Каждое изменение доказывается числами: benchmark до/после + профилирование.

## Стратегия: измеряй -> переписывай -> доказывай -> интегрируй

### Phase 0 — Полигон (текущая)

Автономные крейты в этом репозитории. Каждый крейт — вынесенная горячая зона
Firefox с честными criterion-бенчами против эталона (std / serde_json) и
примером workload'а (`examples/hotspot.rs`) для профилирования.

### Phase 1 — Измерение (CI, работает с первого дня)

- `ci.yml` — fmt/clippy/тесты на каждый push + nightly
- `bench.yml` — criterion + историческая база на gh-pages
  (github-action-benchmark) + алерт при регрессе >150%
- `profile.yml` — perf (flamegraph, DWARF-стеки) + callgrind
  (детерминированные счётчики инструкций)

Артефакты: `flamegraph-*.svg`, `perf-report.txt`, `callgrind-report.txt` —
жёсткие данные о том, какие функции съедают CPU.

### Phase 2 — Глубокая оптимизация (непрерывно)

По данным профилей: переписывание алгоритмов и архитектур (разрешено целиком),
zero-copy, SWAR/SIMD (core::arch), кеш-локальность, борьба с аллокациями,
пулы памяти, lock-free структуры.

Правила: без чисел не коммитим; регресс — откат; каждая оптимизация — тесты +
бенч.

### Phase 3 — Интеграция в форк

1. Sparse/partial clone форка (не тащим 20 ГБ целиком):
   ```bash
   git clone --filter=blob:none --sparse https://github.com/x7717/gecko-dev
   cd firefox && git sparse-checkout set intl xpcom/parser netwerk
   ```
2. Замена узлов на наши крейты (vendoring в mozilla-central tree).
3. Сборка: `./mach build`.
4. A/B замеры браузера: pageload, cold start, session restore, TTI.

### Phase 4 — Апстрим

PR в mozilla с доказательной базой (бенчи, профили, метрики браузера).

## Крейты

| Крейт | Горячая зона Firefox | Эталон сравнения |
|---|---|---|
| foxjson | session store, prefs, telemetry | serde_json |
| foxsearch | URL classifier, findbar, text ops | std::str::find |

## Документы

- `docs/PROFILING.md` — методология профилирования и правила выбора цели
- `docs/ROADMAP.md` — карта горячих зон и статусы
- `WORKLOG.md` — журнал всех изменений с числами
- `docs/SCHEDULED_TASK_PROMPT.md` — автономный цикл (Scheduled Task)
