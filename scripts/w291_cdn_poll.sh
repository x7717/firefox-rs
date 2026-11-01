#!/usr/bin/env bash
# w291_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=303 records
# (судимая окна 291 = idx 302 86b4cf4 точка #303 от Benchmark пуша итерации 289
# 86b4cf4 run 41338062940 completed success 18:43:26Z; ожидаемая запись #304 —
# 7676353 от пуша итерации 290, pages build 408f297 in_progress на старте окна;
# assert len == 303 или 304 — план окна 290: data291.js ПОЛНЫЙ CDN БЕЗ среза;
# при len == 304 машине нужен СРЕЗ до 303 — data291_mach.js, прецедент w288/w290).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
# Перезапускать до FRESH с учётом 10-мин таймаута bash.
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_291.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_291.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_291.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 303 ]; then
    echo "FRESH: CDN has $N records (>=303)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
