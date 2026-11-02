#!/usr/bin/env bash
# w305_cdn_poll.sh — STALE-CDN протокол (урок W255): судимая окна 305 = точка
# #321 = docs-пуш итерации 304 933038a (expected idx 320); curl TO FILE +
# sha256 BEFORE cp; РЕ-ПОЛЛ тот же sha = STABLE; token НЕ хардкодить (CDN
# публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_305.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_305.js | cut -d" " -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_305.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
print(len(d['entries']['Rust Benchmark']))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_305.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
runs=d['entries']['Rust Benchmark']
print(runs[-1]['commit']['id'][:7] if runs else 'EMPTY')" 2>/dev/null) || LAST='?'
  echo "poll $i: records=$N meta[-1]=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 321 ]; then echo "FRESH-321"; exit 0; fi
  sleep 45
done
echo "STALE after 8 polls"; exit 1
