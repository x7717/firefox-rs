#!/usr/bin/env bash
# w274_cdn_poll.sh — STALE-CDN protocol: poll until CDN has 283 records, curl TO FILE + sha256
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in 1 2 3 4 5 6; do
  curl -sS "$URL" -o /tmp/cdn_data_poll.js || { echo "poll $i: curl FAIL"; sleep 20; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 283 ]; then
    echo "FRESH: CDN has $N records (>=283)"
    exit 0
  fi
  sleep 20
done
echo "STALE after 6 polls"
exit 1