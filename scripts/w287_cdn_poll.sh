#!/usr/bin/env bash
# w287_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has 299 records
# (ожидаемая новая запись idx 298 = точка #299 от Benchmark пуша итерации 286
# b74d5b2, runs 41323578180/41323578205 created 15:54:34Z; вторая запись #300
# ожидается от fe76381 runs 41323696701/41323696770 created 15:56:02Z — при её
# появлении idx-пиннинг сохраняется, судимая запись остаётся idx 298).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
# Перезапускать до FRESH с учётом 10-мин таймаута bash (план окна 287).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_287.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_287.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_287.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 299 ]; then
    echo "FRESH: CDN has $N records (>=299)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
