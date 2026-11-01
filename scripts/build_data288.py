#!/usr/bin/env python3
"""build_data288.py — окно 288: построение scripts/data288.js из
/tmp/cdn_data_poll_288.js (STALE-CDN протокол W255: curl В ФАЙЛ + sha256
ДО cp, poll 1 FRESH). CDN пришёл СРАЗУ С ДВУМЯ новыми записями (#300+#301,
plan окна 287 предвидел: assert len == 300 или 301): судимая = ПЕРВАЯ
новая idx 299 (fe76381, точка #300); вторая idx 300 (68f8b0a, #301) —
в окне 289. data288.js = срез до 300 записей (девиация от CDN неизбежна,
урок 156 — девиантный случай, прецедент окна 206 dedup-run)."""
import hashlib
import json
import re
from pathlib import Path

SRC = Path("/tmp/cdn_data_poll_288.js")
DST = Path("/home/z/my-project/firefox-rs/scripts/data288.js")

raw = SRC.read_text()
sha_src = hashlib.sha256(raw.encode()).hexdigest()
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
d = json.loads(m.group(1))
runs = d["entries"]["Rust Benchmark"]
print(f"CDN sha256: {sha_src}")
print(f"записей в CDN: {len(runs)}")
assert len(runs) in (300, 301), f"CDN записей {len(runs)}, ожидалось 300 или 301"

canary_name = "parse/foxjson/session-5000"
for i in range(len(runs) - 6, len(runs)):
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

assert runs[299]["commit"]["id"].startswith("fe76381"), runs[299]["commit"]["id"]
if len(runs) == 301:
    assert runs[300]["commit"]["id"].startswith("68f8b0a"), runs[300]["commit"]["id"]
    print("обе новые записи на месте: idx 299 fe76381 + idx 300 68f8b0a")
d["entries"]["Rust Benchmark"] = runs[:300]

# continuity: значения idx 298 == data287.js (последняя запись окна 287)
raw287 = Path("/home/z/my-project/firefox-rs/scripts/data287.js").read_text()
d287 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            raw287, re.S).group(1))
r287 = d287["entries"]["Rust Benchmark"]
assert len(r287) == 299 and r287[-1]["commit"]["id"] == runs[298]["commit"]["id"]
assert r287[-1]["benches"] == runs[298]["benches"], "значения idx 298 разошлись!"
print(f"CONTINUITY: idx 298 ({runs[298]['commit']['id'][:7]}) значения "
      f"байт-равны data287.js (299 записей)")

# lastUpdate остаётся от CDN (полнота источника), записи срезаны до 300
text = "window.BENCHMARK_DATA = " + json.dumps(d, indent=2, ensure_ascii=False) + "\n"
DST.write_text(text)
sha_dst = hashlib.sha256(text.encode()).hexdigest()
print(f"data288.js: 300 записей, sha256: {sha_dst}")

# контроль чтения машиной
chk = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                           DST.read_text(), re.S).group(1))
assert len(chk["entries"]["Rust Benchmark"]) == 300
assert chk["entries"]["Rust Benchmark"][299]["commit"]["id"].startswith("fe76381")
print("OK: data288.js парсится, последняя запись = fe76381 (idx 299)")
