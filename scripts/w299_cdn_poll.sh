#!/usr/bin/env bash
# w299_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=315
# records (судимая окна 299 = точка #315 = docs-пуш итерации 298 b9c5c45 по
# ИНДЕКС-ПИННИНГУ: план окна 298 'судимая = точка #315 (docs-пуш итерации
# 298 — коммит станет известен по факту пуша, ожидаемый idx 314)'; если #316
# придёт ДО машины, судимой станет #316 и пара пересчитается от ЕЁ класса
# (уроки 133/204, урок 229 СНАЧАЛА строка профиля). Benchmark b9c5c45 —
# если ещё не завершился, CDN будет 314: poll 8x45s. curl TO FILE + sha256
# BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_299.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_299.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_299.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_299.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(e[-1]['commit']['id'][:7] if e else '-')" 2>/dev/null) || LAST='-'
  echo "poll $i: records=$N last=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 315 ]; then
    echo "FRESH-315: CDN has $N records (>=315), судимая = #315 $LAST (если N==316 — ИНДЕКС-ПИННИНГ: судимая #316, пара от ЕЁ класса)"
    exit 0
  fi
  sleep 45
done
echo "STALE after 8 polls (~6 min) — Benchmark b9c5c45 ещё не в CDN; перезапустить скрипт"
exit 1
