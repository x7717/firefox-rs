#!/usr/bin/env python3
"""build_data295.py — окно 295: построение scripts/data295.js (ПОЛНЫЙ CDN —
рутинная форма, урок 156, 4-й раз подряд; план окна 294: судимая = точка
#309 = docs-пуш итерации 294 729d87c, ожидаемый idx 308).
Источник: /tmp/cdn_poll_295_1.js 309 записей sha256 1e9ccb76 (урок W255:
curl В ФАЙЛ + sha256 ДО cp; РЕ-ПОЛЛ ТОТ ЖЕ sha — STABLE).
Судимая окна 295 = idx 308 (meta[-1]), класс и пара — по факту (уроки 198/204)."""
import hashlib
import json
import re
from pathlib import Path

SRC = Path("/tmp/cdn_poll_295_1.js")
DST = Path("/home/z/firefox-rs/scripts/data295.js")

raw = SRC.read_text()
sha_src = hashlib.sha256(raw.encode()).hexdigest()
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
d = json.loads(m.group(1))
runs = d["entries"]["Rust Benchmark"]
print(f"CDN sha256: {sha_src}")
print(f"записей в CDN: {len(runs)}")
assert len(runs) in (309, 310), f"CDN записей {len(runs)}, ожидалось 309 или 310"

canary_name = "parse/foxjson/session-5000"
for i in range(len(runs) - 3, len(runs)):
    vals = {b["name"]: b["value"] for b in runs[i]["benches"]}
    c = vals.get(canary_name)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    cid = runs[i]["commit"]["id"][:7]
    v11 = vals.get("parse/foxurl/11")
    prof = v11 / c if (v11 and c) else None
    ts = runs[i]["commit"]["timestamp"]
    print(f"idx {i}: {cid} [{cls}] canary={c} проф={prof:.4e} ts={ts}")

# CONTINUITY: записи 0-307 dict-равны data294.js (полный префикс)
raw294 = Path("/home/z/firefox-rs/scripts/data294.js").read_text()
d294 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            raw294, re.S).group(1))
r294 = d294["entries"]["Rust Benchmark"]
assert len(r294) == 308, f"data294.js {len(r294)} записей, ожидалось 308"
for i in range(308):
    assert r294[i] == runs[i], f"CONTINUITY СЛОМАНА на idx {i}"
print(f"CONTINUITY: записи 0-307 dict-равны data294.js ({len(r294)} записей) OK")

# судимая = meta[-1]
last = runs[-1]
cid = last["commit"]["id"][:7]
vals = {b["name"]: b["value"] for b in last["benches"]}
c = vals.get(canary_name)
cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
print(f"судимая окна 295: idx 308 {cid} [{cls}] canary={c}")
print(f"сообщение: {last['commit']['message'][:80]!r}")

DST.write_text(raw)
sha_dst = hashlib.sha256(DST.read_bytes()).hexdigest()
print(f"data295.js записан: {len(runs)} записей, sha256 {sha_dst}")
assert sha_dst == sha_src, "cp изменил байты!"
print("байт-идентичен источнику OK")
