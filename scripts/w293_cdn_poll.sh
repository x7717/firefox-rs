#!/usr/bin/env bash
# w293_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=306 records
# (судимая окна 293 = точка #306 581d0fb idx 305 ПО ПЛАНУ окна 292: docs-пуш
# итерации 292 дал точку #306: Benchmark 581d0fb 41348406851 success 20:44:41Z,
# pages build/Store f67e5fa 21:00:47Z success — ожидаем CDN 306 записей;
# план окна 292: если #307 придёт ДО машины, судимой станет #307, пара
# пересчитается от ЕЁ класса (ИНДЕКС-ПИННИНГ урок 204); assert len == 306 или 307;
# ПОЛНЫЙ CDN БЕЗ среза — data293_mach.js НЕ нужен: meta[-1] и есть судимая).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
# Перезапускать до FRESH с учётом 10-мин таймаута bash.
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_293.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_293.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_293.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 306 ]; then
    echo "FRESH: CDN has $N records (>=306)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
