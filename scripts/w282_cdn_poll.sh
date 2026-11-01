#!/usr/bin/env bash
# w282_cdn_poll.sh — STALE-CDN protocol (урок W255): poll until CDN has 294 records
# (ожидаемая новая запись idx 293 = точка #291 от Benchmark пуша итерации 281 e915c61,
# run 41304436605 created 12:00:54Z, ~15.5 мин). curl TO FILE + sha256 BEFORE cp.
# УРОК W273: token НЕ хардкодить (здесь не нужен — CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 40); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_282.js || { echo "poll $i: curl FAIL"; sleep 60; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_282.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_282.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 294 ]; then
    echo "FRESH: CDN has $N records (>=294)"
    exit 0
  fi
  sleep 55
done
echo "STALE after 40 polls (~37 min)"
exit 1
