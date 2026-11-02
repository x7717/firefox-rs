#!/usr/bin/env bash
# w298_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=314
# records (судимая окна 298 = точка #314 = docs-пуш итерации 297 8869158 по
# ИНДЕКС-ПИННИНГУ: план окна 297 'судимая = точка #314 (docs-пуш итерации
# 297 — коммит станет известен по факту пуша, ожидаемый idx 313)'; Benchmark
# 8869158 41385590366 in_progress 03:54:53Z — если #315 придёт ДО машины,
# судимой станет #315 и пара пересчитается от ЕЁ класса (уроки 133/204)).
# Benchmark d4214c9 41382471173 completed success ДО окна 297 => CDN >= 313.
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_298.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_298.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_298.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_298.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(e[-1]['commit']['id'][:7] if e else '-')" 2>/dev/null) || LAST='-'
  echo "poll $i: records=$N last=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 314 ]; then
    echo "FRESH-314: CDN has $N records (>=314), судимая = #314 $LAST (если N==315 — ИНДЕКС-ПИННИНГ: судимая #315)"
    exit 0
  fi
  sleep 45
done
echo "STALE after 8 polls (~6 min) — Benchmark 41385590366 ещё не в CDN; перезапустить скрипт"
exit 1
