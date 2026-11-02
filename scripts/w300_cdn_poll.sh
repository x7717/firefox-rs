#!/usr/bin/env bash
# w300_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=316
# records (судимая окна 300 = точка #316 = docs-пуш итерации 299 be8f248 по
# ИНДЕКС-ПИННИНГУ: план окна 299 'судимая = точка #316 (docs-пуш итерации
# 299 — коммит станет известен по факту пуша, ожидаемый idx 315)'; если #317
# придёт ДО машины, судимой станет #317 и пара пересчитается от ЕЁ класса
# (уроки 133/204, урок 229 СНАЧАЛА строка профиля). Benchmark be8f248
# 41393339021 success (05:19:25Z), pages 9b6d3f3 deployed 05:35:29Z — CDN
# должен содержать 316 записей. curl TO FILE + sha256 BEFORE cp. УРОК W273:
# token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_300.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_300.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_300.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_300.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(e[-1]['commit']['id'][:7] if e else '-')" 2>/dev/null) || LAST='-'
  echo "poll $i: records=$N last=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 316 ]; then
    echo "FRESH-316: CDN has $N records (>=316), судимая = #316 $LAST (если N==317 — ИНДЕКС-ПИННИНГ: судимая #317, пара от ЕЁ класса)"
    exit 0
  fi
  sleep 45
done
echo "STALE after 8 polls (~6 min) — Benchmark be8f248 ещё не в CDN; перезапустить скрипт"
exit 1
