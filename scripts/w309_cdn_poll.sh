#!/usr/bin/env bash
# w309_cdn_poll.sh — STALE-CDN протокол (урок W255): судимая окна 309 =
# meta[-1] при машине (план: точка #327 = docs-пуш итерации 308 9921966,
# ожидаемый idx 326; НО аддендум 213ae0b ТОЖЕ получил Benchmark
# 41465096898 success 14:46:13Z => ожидаемо 328 записей с meta[-2:] =
# 9921966, 213ae0b; плюс возможен schedule Benchmark — assert по факту).
# curl TO FILE + sha256 BEFORE cp; РЕ-ПОЛЛ тот же sha = STABLE;
# token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_309.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_309.js | cut -d" " -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_309.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
print(len(d['entries']['Rust Benchmark']))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_309.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
runs=d['entries']['Rust Benchmark']
print(' '.join(r['commit']['id'][:7] for r in runs[-4:]) if runs else 'EMPTY')" 2>/dev/null) || LAST='?'
  echo "poll $i: records=$N meta[-4:]=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 328 ]; then echo "FRESH-328+"; exit 0; fi
  sleep 45
done
echo "STALE after 8 polls"; exit 1
