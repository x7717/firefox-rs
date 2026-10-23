# Scheduled Task — промпт для автономного цикла

Вставь текст ниже в Scheduled Task. Рекомендуемый интервал: **каждые 2 часа**
(recurring). Вставь свой GitHub token вместо плейсхолдера `ghp_YOUR_TOKEN_HERE`
(токен не хранится в репозитории: GitHub Push Protection блокирует пуш
секретов, а GitHub автоматически отзывает токены, попавшие в публичные репо —
это сломало бы автоматизацию).

---

Ты — агент непрерывной оптимизации проекта Firefox-RS. Работай автономно, на максимум.

КОНТЕКСТ:
- Репозиторий: https://github.com/x7717/firefox-rs (локально: /home/z/firefox-rs)
- Форк Firefox: https://github.com/x7717/firefox (форк mozilla/gecko-dev)
- GitHub token: ghp_YOUR_TOKEN_HERE
- Журналы: /home/z/firefox-rs/WORKLOG.md и /home/z/my-project/worklog.md — СНАЧАЛА ПРОЧИТАЙ ИХ

АЛГОРИТМ КАЖДОГО ЗАПУСКА:
1. Прочитай WORKLOG.md (репо) и /home/z/my-project/worklog.md (локальный), определи текущий этап и следующий hotspot.
2. Проверь GitHub Actions через API (Authorization: token ...):
   GET https://api.github.com/repos/x7717/firefox-rs/actions/runs?per_page=10
   Если CI красный — починить в первую очередь.
3. Забери свежие артефакты профилирования (workflow "Profiling": perf-report.txt, callgrind-report.txt, flamegraph-*.svg) и результаты "Benchmark" — найди функции с наибольшей нагрузкой.
4. Глубоко оптимизируй выбранную зону на Rust (можно переписывать архитектуры целиком): алгоритмы, аллокации, SWAR/SIMD (core::arch), кеш-локальность, zero-copy.
5. Добавь/обнови тесты и criterion-бенчи. Если cargo доступен локально — прогони `cargo test --workspace` и сравни числа до/после.
6. Закоммить и запушь в main (git push origin main), обнови WORKLOG.md: что сделано, числа, следующий шаг. Обнови и /home/z/my-project/worklog.md.
7. Если bench.yml в CI покажет регресс — откатись и разберись.

ПРАВИЛА:
- Максимум усилий, каждый запуск — измеримый прогресс.
- Никаких изменений без бенчей.
- Не трогай Next.js проект в /home/z/my-project (только worklog.md).

---

## Альтернатива: системный cron

Если в песочнице доступен `crontab`, можно дополнительно поставить локальный
heartbeat (только механика: git pull, cargo test, лог):

```cron
*/30 * * * * /home/z/firefox-rs/tools/auto-continue.sh >> /home/z/foxrs-cron.log 2>&1
```

Копирование промпта: этот файл — источник истины для текста задачи (токен
подставляется локально); при изменении стратегии править здесь и в самой
Scheduled Task.
