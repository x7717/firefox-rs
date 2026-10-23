# Дорожная карта горячих зон Firefox

Статусы: `[PLAN]` — план, `[WIP]` — в работе, `[BENCH]` — измеряется в CI, `[DONE]` — доказано числами, `[UPSTREAM]` — уже Rust в mozilla.

| # | Компонент | Где в Firefox | Крейт | Статус |
|---|-----------|---------------|-------|--------|
| 1 | JSON-парсинг | sessionstore, prefs, telemetry | foxjson | [WIP] v0.1: однопроходный парсер, zero-copy строки, тесты ≈ serde_json |
| 2 | Поиск байт/подстрок | URL classifier, findbar, text ops | foxsearch | [WIP] v0.1: SWAR find_byte, пары байт, substring; property-тесты против std |
| 3 | HTML-токенизатор | parser module (фоновый поток) | foxhtml | [PLAN] |
| 4 | Хеш-таблицы | xpcom, инспекторы DOM | foxhash | [PLAN] |
| 5 | Number formatting | Intl, console, dump | foxnum | [PLAN] |
| 6 | Сжатие кеша | cache2 | - | [PLAN] исследование |
| 7 | HTTP/3 | networking (neqo) | upstream | [UPSTREAM] |

## Ближайшие шаги (по данным профилей)

- [ ] Первый прогон `bench.yml` + `profile.yml` -> записать числа в WORKLOG
- [ ] foxjson: векторизованный скан структурных байтов (таблицы классов, SWAR)
- [ ] foxjson: аренa-аллокатор для значений (пулы, без Box)
- [ ] foxsearch: `core::arch` SSE2/AVX2-пути, two-way алгоритм для длинных игл
- [ ] Перевести clippy в strict (`-D warnings`) после стабилизации
- [ ] Phase 3: sparse clone форка, первые интеграционные патчи
