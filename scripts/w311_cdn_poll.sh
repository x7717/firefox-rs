#!/usr/bin/env bash
# w311_cdn_poll.sh — STALE-CDN протокол (урок W255): судимая окна 311 =
# meta[-1] при машине (план: точка #331 = Benchmark пуша итерации 310
# 0a19148, ожидаемый idx 330; Benchmark 41473111644 success 15:35:40Z,
# pages b53e0bd success 15:51:52Z — точка УЖЕ должна быть в CDN; возможны
# ПАРЫ/ТРОЙКИ — assert по факту, уроки 133/123).
# curl TO FILE + sha256 BEFORE cp; РЕ-ПОЛЛ тот же sha = STABLE;
# token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_311.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_311.js | cut -d" " -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_311.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
print(len(d['entries']['Rust Benchmark']))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_311.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
runs=d['entries']['Rust Benchmark']
print(' '.join(r['commit']['id'][:7] for r in runs[-4:]) if runs else 'EMPTY')" 2>/dev/null) || LAST='?'
  echo "poll $i: records=$N meta[-4:]=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 331 ]; then echo "FRESH-331+"; exit 0; fi
  sleep 45
done
echo "STALE after 8 polls"; exit 1
