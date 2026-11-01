#!/usr/bin/env bash
# w292_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=304 records
# (судимая окна 292 = точка #304 7676353 idx 303 ПО ПЛАНУ окна 291; НО docs-пуш
# итерации 291 6370dbb дал точку #305: Benchmark 6370dbb 41343366098 success
# 19:45:52Z, pages build 81dabd8 20:01:28Z success — ожидаем CDN 305 записей;
# план окна 291: если #305 пришла ДО машины, судимой станет #305, пара
# пересчитается от ЕЁ класса (ИНДЕКС-ПИННИНГ урок 204); assert len == 304 или 305;
# ПОЛНЫЙ CDN БЕЗ среза — data292_mach.js НЕ нужен: meta[-1] и есть судимая).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
# Перезапускать до FRESH с учётом 10-мин таймаута bash.
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_292.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_292.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_292.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 304 ]; then
    echo "FRESH: CDN has $N records (>=304)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
