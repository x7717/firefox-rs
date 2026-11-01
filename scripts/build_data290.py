#!/usr/bin/env python3
"""build_data290.py — окно 290: построение scripts/data290.js из
/tmp/cdn_data_poll_290.js (STALE-CDN протокол W255: curl В ФАЙЛ + sha256
ДО cp, poll 1 FRESH 303 записи sha256 7742683e...). Судимая = idx 301
(a4241de, точка #302 от пуша итерации 288, Benchmark 41336935422
completed success 18:30:09Z); вторая новая запись #303 (86b4cf4, пуш
итерации 289) придёт ОДНОВРЕМЕННО — судится в окне 291. data290.js =
срез до 302 записей (assert len CDN == 302 или 303 — план окна 289)."""
import hashlib
import json
import re
from pathlib import Path

SRC = Path("/tmp/cdn_data_poll_290.js")
DST = Path("/home/z/my-project/firefox-rs/scripts/data290.js")

raw = SRC.read_text()
sha_src = hashlib.sha256(raw.encode()).hexdigest()
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
d = json.loads(m.group(1))
runs = d["entries"]["Rust Benchmark"]
print(f"CDN sha256: {sha_src}")
print(f"записей в CDN: {len(runs)}")
assert len(runs) in (302, 303), f"CDN записей {len(runs)}, ожидалось 302 или 303"

canary_name = "parse/foxjson/session-5000"
for i in range(len(runs) - 8, len(runs)):
    vals = {b["name"]: b["value"] for b in runs[i]["benches"]}
    c = vals.get(canary_name)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    cid = runs[i]["commit"]["id"][:7]
    v11 = vals.get("parse/foxurl/11")
    zzz = vals.get("find/foxsearch/zzz-absent-zzz")
    sm = vals.get("parse/foxjson/small")
    ca = vals.get("parse/foxurl/corpus-all")
    prof = v11 / c if (v11 and c) else None
    ts = runs[i]["commit"]["timestamp"]
    print(f"idx {i}: {cid} [{cls}] canary={c} zzz={zzz} small={sm} "
          f"corpus-all={ca} проф={prof:.4e} ts={ts}")

assert runs[301]["commit"]["id"].startswith("a4241de"), runs[301]["commit"]["id"]
if len(runs) == 303:
    assert runs[302]["commit"]["id"].startswith("86b4cf4"), runs[302]["commit"]["id"]
    print("обе новые записи на месте: idx 301 a4241de + idx 302 86b4cf4")
d["entries"]["Rust Benchmark"] = runs[:302]

# CONTINUITY: первые 301 запись байт-равны data289.js (полный префикс)
raw289 = Path("/home/z/my-project/firefox-rs/scripts/data289.js").read_text()
d289 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            raw289, re.S).group(1))
r289 = d289["entries"]["Rust Benchmark"]
assert len(r289) == 301
for i in range(301):
    assert r289[i]["commit"]["id"] == runs[i]["commit"]["id"], f"idx {i} cid"
    assert r289[i]["benches"] == runs[i]["benches"], f"idx {i} values"
print(f"CONTINUITY: записи 0-300 байт-равны data289.js (301 запись)")

# lastUpdate остаётся от CDN (полнота источника), записи срезаны до 302
text = "window.BENCHMARK_DATA = " + json.dumps(d, indent=2, ensure_ascii=False) + "\n"
DST.write_text(text)
sha_dst = hashlib.sha256(text.encode()).hexdigest()
print(f"data290.js: 302 записи, sha256: {sha_dst}")

chk = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                           DST.read_text(), re.S).group(1))
assert len(chk["entries"]["Rust Benchmark"]) == 302
assert chk["entries"]["Rust Benchmark"][301]["commit"]["id"].startswith("a4241de")
print("OK: data290.js парсится, последняя запись = a4241de (idx 301)")
