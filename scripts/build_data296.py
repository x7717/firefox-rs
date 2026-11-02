#!/usr/bin/env python3
"""build_data296.py — окно 296: построение scripts/data296.js (ПОЛНЫЙ CDN —
рутинная форма, урок 156; план окна 295: судимая = точка #310 = docs-пуш
итерации 295 da96246, ожидаемый idx 309). ФАКТ: CDN уже 311 записей ДО
машины (Benchmark 3b83288 41374444854 success 01:49:11Z, pages aced887
02:05:17Z) — по ИНДЕКС-ПИННИНГУ (урок 204) судимая = meta[-1] = точка #311
3b83288 (idx 310), пара пересчитывается от ЕЁ класса (уроки 133/123).
Источник: /tmp/cdn_poll_296_1.js, 311 записей, sha256 a8d5e2b0... (W255:
curl В ФАЙЛ + sha256 ДО cp; РЕ-ПОЛЛ ТОТ ЖЕ sha — STABLE).
Путь-обход песочницы: REPO=/home/z/my-project/firefox-rs прямой путь."""
import hashlib
import json
import re
from pathlib import Path

SRC = Path("/tmp/cdn_poll_296_1.js")
REPO = Path("/home/z/my-project/firefox-rs")
DST = REPO / "scripts/data296.js"

raw = SRC.read_text()
sha_src = hashlib.sha256(raw.encode()).hexdigest()
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
d = json.loads(m.group(1))
runs = d["entries"]["Rust Benchmark"]
print(f"CDN sha256: {sha_src}")
print(f"записей в CDN: {len(runs)}")
assert len(runs) in (310, 311), f"CDN записей {len(runs)}, ожидалось 310 или 311"

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

# CONTINUITY: записи 0-308 dict-равны data295.js (полный префикс)
raw295 = (REPO / "scripts/data295.js").read_text()
d295 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            raw295, re.S).group(1))
r295 = d295["entries"]["Rust Benchmark"]
assert len(r295) == 309, f"data295.js {len(r295)} записей, ожидалось 309"
for i in range(309):
    assert r295[i] == runs[i], f"CONTINUITY СЛОМАНА на idx {i}"
print(f"CONTINUITY: записи 0-308 dict-равны data295.js ({len(r295)} записей) OK")

# судимая = meta[-1]
last = runs[-1]
cid = last["commit"]["id"][:7]
vals = {b["name"]: b["value"] for b in last["benches"]}
c = vals.get(canary_name)
cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
print(f"СУДИМАЯ окна 296: idx {len(runs)-1} = {cid} [{cls}] canary={c}")
msg = last["commit"].get("message", "").splitlines()[0]
print(f"сообщение: {msg[:100]}")

# запись data296.js — та же JS-обёртка
out = "window.BENCHMARK_DATA = " + json.dumps(d, ensure_ascii=False) + ";"
DST.write_text(out)
sha_dst = hashlib.sha256(DST.read_bytes()).hexdigest()
print(f"data296.js записан: {DST} ({len(out)} байт) sha256 {sha_dst[:8]}")
