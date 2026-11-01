#!/usr/bin/env bash
# w284_cdn_poll.sh — STALE-CDN protocol (урок W255): poll until CDN has 296 records
# (ожидаемая новая запись idx 295 = точка #293 от Benchmark пуша итерации 283
# 0cb508b, run 41311004827 created 13:23:11Z, Store pages 7be9860 13:39:16Z).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (здесь не
# нужен — CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 40); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_284.js || { echo "poll $i: curl FAIL"; sleep 60; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_284.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_284.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 296 ]; then
    echo "FRESH: CDN has $N records (>=296)"
    exit 0
  fi
  sleep 55
done
echo "STALE after 40 polls (~37 min)"
exit 1
