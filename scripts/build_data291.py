#!/usr/bin/env python3
"""build_data291.py — окно 291: построение scripts/data291.js (ПОЛНЫЙ CDN —
план окна 290) и scripts/data291_mach.js (СРЕЗ до 303 — машина судит meta[-1];
CDN пришёл 304 записями ПОСЛЕ составления плана: pages build 408f297
задеплоил запись от Benchmark пуша итерации 290 7676353 — точка #304,
CLASSIC canary 1361339, судится в окне 292; прецедент среза окна 288
срез-300 / окна 290 срез-302 — ДЕВИАНТНАЯ ФОРМА, документируем).
Источник: /tmp/cdn_data_poll_291b.js 304 записи sha256 fd6a0bd6... (урок
W255: curl В ФАЙЛ + sha256 ДО cp). Судимая окна 291 = idx 302 86b4cf4."""
import hashlib
import json
import re
from pathlib import Path

SRC = Path("/tmp/cdn_data_poll_291b.js")
DST = Path("/home/z/my-project/firefox-rs/scripts/data291.js")
DST_MACH = Path("/home/z/my-project/firefox-rs/scripts/data291_mach.js")

raw = SRC.read_text()
sha_src = hashlib.sha256(raw.encode()).hexdigest()
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
d = json.loads(m.group(1))
runs = d["entries"]["Rust Benchmark"]
print(f"CDN sha256: {sha_src}")
print(f"записей в CDN: {len(runs)}")
assert len(runs) in (303, 304), f"CDN записей {len(runs)}, ожидалось 303 или 304"

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

assert runs[302]["commit"]["id"].startswith("86b4cf4"), runs[302]["commit"]["id"]
if len(runs) == 304:
    assert runs[303]["commit"]["id"].startswith("7676353"), runs[303]["commit"]["id"]
    print("новая запись #304 на месте: idx 303 7676353 (точка #304, окно 292)")

# CONTINUITY: записи 0-301 dict-равны data290.js (полный префикс)
raw290 = Path("/home/z/my-project/firefox-rs/scripts/data290.js").read_text()
d290 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            raw290, re.S).group(1))
r290 = d290["entries"]["Rust Benchmark"]
assert len(r290) == 302
for i in range(302):
    assert r290[i]["commit"]["id"] == runs[i]["commit"]["id"], f"idx {i} cid"
    assert r290[i]["benches"] == runs[i]["benches"], f"idx {i} values"
print(f"CONTINUITY: записи 0-301 dict-равны data290.js (302 записи)")

# --- data291.js = ПОЛНЫЙ CDN (план окна 290: БЕЗ среза, assert 303/304) ---
text = "window.BENCHMARK_DATA = " + json.dumps(d, indent=2, ensure_ascii=False) + "\n"
DST.write_text(text)
sha_dst = hashlib.sha256(text.encode()).hexdigest()
print(f"data291.js: {len(runs)} записей (ПОЛНЫЙ CDN), sha256: {sha_dst}")

# --- data291_mach.js = СРЕЗ до 303 (машина: meta[-1] = 86b4cf4) ---
d_mach = json.loads(m.group(1))
d_mach["entries"]["Rust Benchmark"] = runs[:303]
text_mach = ("window.BENCHMARK_DATA = "
             + json.dumps(d_mach, indent=2, ensure_ascii=False) + "\n")
DST_MACH.write_text(text_mach)
sha_mach = hashlib.sha256(text_mach.encode()).hexdigest()
print(f"data291_mach.js: 303 записи (СРЕЗ до 303), sha256: {sha_mach}")

chk = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                           DST.read_text(), re.S).group(1))
assert len(chk["entries"]["Rust Benchmark"]) == len(runs)
assert chk["entries"]["Rust Benchmark"][302]["commit"]["id"].startswith("86b4cf4")
chk2 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            DST_MACH.read_text(), re.S).group(1))
assert len(chk2["entries"]["Rust Benchmark"]) == 303
assert chk2["entries"]["Rust Benchmark"][302]["commit"]["id"].startswith("86b4cf4")
print("OK: data291.js (полный) и data291_mach.js (срез до 303) парсятся, "
      "последняя запись среза = 86b4cf4 (idx 302)")
