#!/usr/bin/env bash
# w288_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has 300 records
# (ожидаемая новая запись idx 299 = точка #300 от Benchmark пуша итерации 286
# fe76381, runs 41323696701/41323696770 created 15:56:02Z — судится ПЕРВОЙ;
# вторая запись #301 от пуша итерации 287 68f8b0a runs 41326065473/41326065423
# created 16:23:12Z — при её появлении idx-пиннинг сохраняется, судимая запись
# остаётся idx 299, data288.js срезается до 300 записей, assert len == 300
# или 301 — план окна 287).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
# Перезапускать до FRESH с учётом 10-мин таймаута bash.
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_288.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_288.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_288.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 300 ]; then
    echo "FRESH: CDN has $N records (>=300)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
