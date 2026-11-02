#!/usr/bin/env bash
# w301_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=317
# records (судимая окна 301 = точка #317 = docs-пуш итерации 300 6f22e55 по
# ИНДЕКС-ПИННИНГУ: план окна 300 'судимая = точка #317 (docs-пуш итерации
# 300 — коммит станет известен по факту пуша, ожидаемый idx 316)';
# фактически пуш итерации 300 = 6f22e55, CI 41399398787 + Benchmark
# 41399398999 success 06:21:29Z, pages daeeaff deployed 06:37:39Z — CDN
# должен содержать 317 записей. Если #318 придёт ДО машины, судимой станет
# #318 и пара пересчитается от ЕЁ класса (уроки 133/204, урок 229 СНАЧАЛА
# строка профиля). curl TO FILE + sha256 BEFORE cp. РЕ-ПОЛЛ: тот же sha =
# STABLE. УРОК W273: token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_301.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_301.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_301.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_301.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(e[-1]['commit']['id'][:7] if e else '-')" 2>/dev/null) || LAST='-'
  echo "poll $i: records=$N last=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 317 ]; then
    echo "FRESH-317: CDN has $N records (>=317), meta[-1]=$LAST (если N==318 — ИНДЕКС-ПИННИНГ: судимая #318, пара от ЕЁ класса)"
    exit 0
  fi
  sleep 45
done
echo "STALE after 8 polls (~6 min) — Benchmark 6f22e55 ещё не в CDN; перезапустить скрипт"
exit 1
