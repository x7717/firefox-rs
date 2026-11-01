#!/usr/bin/env bash
# w289_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has 301 records
# (ожидаемая новая запись idx 300 = точка #301 от Benchmark пуша итерации 287
# 68f8b0a, runs 41326065473/41326065423 created 16:23:12Z, Store gh-pages
# 53cd498 16:39:16Z — судится ПЕРВОЙ; вторая запись #302 от пуша итерации 288
# a4241de runs 41336935372/41336935422 created ~18:25Z, Benchmark ЕЩЁ В
# ПРОЦЕССЕ на момент суда — при её появлении idx-пиннинг сохраняется, судимая
# запись остаётся idx 300, data289.js срезается до 301 записи, assert len ==
# 301 или 302 — план окна 288).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
# Перезапускать до FRESH с учётом 10-мин таймаута bash.
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_289.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_289.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_289.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))")
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 301 ]; then
    echo "FRESH: CDN has $N records (>=301)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
