#!/usr/bin/env bash
# w295_cdn_poll.sh — STALE-CDN протокол (урок W255): poll until CDN has >=309 records
# (судимая окна 295 = точка #309 729d87c ПО ПЛАНУ окна 294: 'судимая = точка
# #309 (docs-пуш итерации 294 — коммит станет известен по факту пуша,
# ожидаемый idx 308)'; Benchmark 729d87c 41366027516 success, pages 0a79317
# 00:30:08Z — ожидаем CDN 309 записей; assert len == 309 или 310;
# ПОЛНЫЙ CDN БЕЗ среза — meta[-1] и есть судимая).
# curl TO FILE + sha256 BEFORE cp. УРОК W273: token НЕ хардкодить (CDN публичный).
set -u
URL="https://x7717.github.io/firefox-rs/dev/bench/data.js"
for i in $(seq 1 10); do
  curl -sS "$URL" -o /tmp/cdn_data_poll_295.js || { echo "poll $i: curl FAIL"; sleep 50; continue; }
  SHA=$(sha256sum /tmp/cdn_data_poll_295.js | cut -d' ' -f1)
  N=$(python3 -c "
import json,re
raw=open('/tmp/cdn_data_poll_295.js').read()
m=re.search(r'window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*\$', raw, re.S)
d=json.loads(m.group(1))
e=d['entries']['Rust Benchmark']
print(len(e))" 2>/dev/null) || N=0
  echo "poll $i: records=$N sha256=$SHA"
  if [ "$N" -ge 309 ]; then
    echo "FRESH: CDN has $N records (>=309)"
    exit 0
  fi
  sleep 50
done
echo "STALE after 10 polls (~9 min) — перезапустить скрипт"
exit 1
