#!/usr/bin/env bash
# w307_cdn_poll.sh — STALE-CDN протокол (урок W255): судимая окна 307 =
# meta[-1] при машине (план: точка #323 = docs-пуш итерации 306 0d13b4b,
# ожидаемый idx 322; НО аддендум 65e4922 тоже получил Benchmark 41442107292
# success 12:07:19Z => ожидаемо 324 записи с meta[-1] = 65e4922; плюс
# schedule 41440487960 (bc87bb7) завершился — возможен Store-дубль =>
# 325). curl TO FILE + sha256 BEFORE cp; РЕ-ПОЛЛ тот же sha = STABLE;
# token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_307.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_307.js | cut -d" " -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_307.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
print(len(d['entries']['Rust Benchmark']))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_307.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
runs=d['entries']['Rust Benchmark']
print(' '.join(r['commit']['id'][:7] for r in runs[-3:]) if runs else 'EMPTY')" 2>/dev/null) || LAST='?'
  echo "poll $i: records=$N meta[-3:]=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 324 ]; then echo "FRESH-324+"; exit 0; fi
  sleep 45
done
echo "STALE after 8 polls"; exit 1
