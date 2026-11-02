#!/usr/bin/env bash
# w297_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=313
# records (судимая окна 297 = точка #313 d4214c9 по ИНДЕКС-ПИННИНГУ: план
# окна 296 'судимая = точка #312 (docs-пуш итерации 296, ожидаемый idx 311)',
# НО Benchmark d4214c9 41382471173 in_progress 03:19:33Z — если #313 придёт
# ДО машины, судимой станет #313; фолбэк: если после 8 поллов всё ещё 312 —
# принимать 312, судимая = #312 c9db45c).
# Benchmark c9db45c 41382219904 completed success ДО окна => CDN >= 312.
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 8); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_297.js || { echo "poll $i: curl FAIL"; sleep 45; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_297.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_297.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  LAST=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_297.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(e[-1]['commit']['id'][:7] if e else '-')" 2>/dev/null) || LAST='-'
  echo "poll $i: records=$N last=$LAST sha256=${SHA:0:8}"
  if [ "$N" -ge 313 ]; then
    echo "FRESH-313: CDN has $N records (>=313), судимая = #313 $LAST"
    exit 0
  fi
  sleep 45
done
if [ "$N" -ge 312 ]; then
  echo "FALLBACK-312: CDN has $N records (>=312), судимая = #312 $LAST"
  exit 0
fi
echo "STALE after 8 polls (~6 min) — перезапустить скрипт"
exit 1
