#!/usr/bin/env bash
# w294_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=308 records
# (судимая окна 294 = точка #308 9aeda95 ПО ПЛАНУ окна 293: 'если точка #308
# придёт ДО машины, судимой станет #308, а пара пересчитается от ЕЁ класса';
# Benchmark 9aeda95 41361154370 success 23:14:50Z, pages 2989e5a 23:30:54Z —
# ожидаем CDN 308 записей; assert len == 307 или 308;
# ПОЛНЫЙ CDN БЕЗ среза — meta[-1] и есть судимая).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_294.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_294.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_294.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 308 ]; then
    echo "FRESH: CDN has $N records (>=308)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
