#!/usr/bin/env bash
# w290_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=302 records
# (ожидаемые новые записи: idx 301 = точка #302 от Benchmark пуша итерации 288
# a4241de run 41336935422 completed success 18:30:09Z — судится ПЕРВОЙ; idx 302 =
# точка #303 от пуша итерации 289 86b4cf4 run 41338062940 completed success —
# судится в окне 291; assert len == 302 или 303, data290.js срезается до 302 —
# план окна 289).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
# Перезапускать до FRESH с учётом 10-мин таймаута bash.
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_290.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_290.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_290.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 302 ]; then
    echo "FRESH: CDN has $N records (>=302)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
