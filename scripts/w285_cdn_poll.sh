#!/usr/bin/env bash
# w285_cdn_poll.sh — STALE-CDN protocol (урок W255): poll until CDN has 297 records
# (ожидаемая новая запись idx 296 = точка #294 от Benchmark пуша итерации 284
# 33c89cc, run 41315898749 created 14:22:47Z, Store pages 3ea52d3 14:38:02Z).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (здесь не
# нужен — CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 40); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_285.js || { echo "poll $i: curl FAIL"; sleep 60; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_285.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_285.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 297 ]; then
    echo "FRESH: CDN has $N records (>=297)"
    exit 0
  fi
  sleep 55
done
echo "STALE after 40 polls (~37 min)"
exit 1
