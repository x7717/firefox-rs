#!/usr/bin/env bash
# w276_cdn_poll.sh — STALE-CDN protocol (урок W255): poll until CDN has 285 records
# (точка #282 = c0747e1, Benchmark пуша итерации 275). curl TO FILE + sha256 BEFORE cp.
# УРОК W273: token НЕ хардкодить (здесь не нужен — CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 90); do
  curl -sS "$URL" -o /tmp/cdn_data_poll.js || { echo "poll $i: curl FAIL"; sleep 60; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 285 ]; then
    echo "FRESH: CDN has $N records (>=285)"
    exit 0
  fi
  sleep 60
done
echo "STALE after 90 polls (~90 min)"
exit 1
