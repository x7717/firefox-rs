#!/usr/bin/env python3
"""build_data289.py — окно 289: построение scripts/data289.js из
/tmp/cdn_data_poll_289.js (STALE-CDN протокол W255: curl В ФАЙЛ + sha256
ДО cp, poll 1 FRESH). Судимая = idx 300 (fe76381... нет — 68f8b0a, точка
#301 от пуша итерации 287); вторая новая запись #302 (a4241de, пуш
итерации 288) — Benchmark ЕЩЁ В ПРОЦЕССЕ, придёт ПОСЛЕ, судится в окне
290. data289.js = срез до 301 записи (assert len CDN == 301 или 302 —
план окна 288; девиация от CDN при 302 неизбежна, урок 156 — девиантный
случай, прецедент окна 206 dedup-run / окна 288 срез-300)."""
import hashlib
import json
import re
from pathlib import Path

SRC = Path("/tmp/cdn_data_poll_289.js")
DST = Path("/home/z/my-project/firefox-rs/scripts/data289.js")

raw = SRC.read_text()
sha_src = hashlib.sha256(raw.encode()).hexdigest()
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
d = json.loads(m.group(1))
runs = d["entries"]["Rust Benchmark"]
print(f"CDN sha256: {sha_src}")
print(f"записей в CDN: {len(runs)}")
assert len(runs) in (301, 302), f"CDN записей {len(runs)}, ожидалось 301 или 302"

canary_name = "parse/foxjson/session-5000"
for i in range(len(runs) - 7, len(runs)):
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

assert runs[300]["commit"]["id"].startswith("68f8b0a"), runs[300]["commit"]["id"]
if len(runs) == 302:
    assert runs[301]["commit"]["id"].startswith("a4241de"), runs[301]["commit"]["id"]
    print("обе новые записи на месте: idx 300 68f8b0a + idx 301 a4241de")
d["entries"]["Rust Benchmark"] = runs[:301]

# CONTINUITY: первые 300 записей байт-равны data288.js (полный префикс)
raw288 = Path("/home/z/my-project/firefox-rs/scripts/data288.js").read_text()
d288 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            raw288, re.S).group(1))
r288 = d288["entries"]["Rust Benchmark"]
assert len(r288) == 300
for i in range(300):
    assert r288[i]["commit"]["id"] == runs[i]["commit"]["id"], f"idx {i} cid"
    assert r288[i]["benches"] == runs[i]["benches"], f"idx {i} values"
print(f"CONTINUITY: записи 0-299 байт-равны data288.js (300 записей)")

# lastUpdate остаётся от CDN (полнота источника), записи срезаны до 301
text = "window.BENCHMARK_DATA = " + json.dumps(d, indent=2, ensure_ascii=False) + "\n"
DST.write_text(text)
sha_dst = hashlib.sha256(text.encode()).hexdigest()
print(f"data289.js: 301 запись, sha256: {sha_dst}")

chk = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                           DST.read_text(), re.S).group(1))
assert len(chk["entries"]["Rust Benchmark"]) == 301
assert chk["entries"]["Rust Benchmark"][300]["commit"]["id"].startswith("68f8b0a")
print("OK: data289.js парсится, последняя запись = 68f8b0a (idx 300)")
