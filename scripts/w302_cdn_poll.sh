#!/usr/bin/env bash
# w302_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=318
# records (судимая окна 302 = точка #318 = docs-пуш итерации 301 095148c по
# ИНДЕКС-ПИННИНГУ: план окна 301 'судимая = точка #318 (docs-пуш итерации
# 301 — коммит станет известен по факту пуша, ожидаемый idx 317)';
# фактически пуш итерации 301 = 095148c, CI 41418418201 + Benchmark
# 41418418207 success 09:09:55Z, pages 3df6efe deployed 09:25:09Z — CDN
# должен содержать 318 записей. Если #319 придёт ДО машины, судимой станет
# #319 и пара пересчитается от ЕЁ класса (уроки 133/204, урок 229 СНАЧАЛА
# строка профиля). curl TO FILE + sha256 BEFORE cp. РЕ-ПОЛЛ: тот же sha =
# STABLE. УРОК W273: token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_302.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_302.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_302.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_302.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(e[-1]['commit']['id'][:7] if e else '-')" 2>/dev/null) || LAST='-'
  echo "poll $i: records=$N last=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 318 ]; then
    echo "FRESH-318: CDN has $N records (>=318), meta[-1]=$LAST (если N==319 — ИНДЕКС-ПИННИНГ: судимая #319, пара от ЕЁ класса)"
    exit 0
  fi
  sleep 45
done
echo "STALE after 8 polls (~6 min) — Benchmark 095148c ещё не в CDN; перезапустить скрипт"
exit 1
