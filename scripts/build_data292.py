#!/usr/bin/env python3
"""build_data292.py — окно 292: построение scripts/data292.js (ПОЛНЫЙ CDN 305
записей, БЕЗ среза — data292_mach.js НЕ создаётся: план окна 291 'если точка
#305 придёт ДО машины, судимой станет #305' СБЫЛСЯ — meta[-1] = 6370dbb и
есть судимая, СРЕЗ НЕ НУЖЕН, машина судит полный файл).
Источник: /tmp/cdn_data_poll_292.js = /tmp/cdn_data_poll_292b.js 305 записей
sha256 cc42529da4a40a169e3e70a24ccb7214f5637ccfc544902066be77097447b41d
(два полла совпали байт-в-байт — STABLE; урок W255: curl В ФАЙЛ + sha256 ДО cp).
Точка #305 = 6370dbb (docs-пуш итерации 291, Benchmark 41343366098 success
19:45:52Z, pages 81dabd8 20:01:28Z) — класс по данным: FAST canary 760737.
Точка #304 = 7676353 (судимая ПО ПЛАНУ окна 291 — вытеснена #305, судится
в окне 293). Пара окна 292 = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА: 33c89cc [FAST] idx 296."""
import hashlib
import json
import re
from pathlib import Path

SRC = Path("/tmp/cdn_data_poll_292.js")
SRC2 = Path("/tmp/cdn_data_poll_292b.js")
DST = Path("/home/z/my-project/firefox-rs/scripts/data292.js")

raw = SRC.read_text()
sha_src = hashlib.sha256(raw.encode()).hexdigest()
sha_src2 = hashlib.sha256(SRC2.read_text().encode()).hexdigest()
print(f"CDN sha256: {sha_src}")
print(f"РЕ-ПОЛЛ sha256: {sha_src2} — {'STABLE (совпал)' if sha_src == sha_src2 else 'ОТЛИЧАЕТСЯ!'}")
assert sha_src == sha_src2, "поллы разошлись — перезапустить poll"
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
d = json.loads(m.group(1))
runs = d["entries"]["Rust Benchmark"]
print(f"записей в CDN: {len(runs)}")
assert len(runs) in (304, 305), f"CDN записей {len(runs)}, ожидалось 304 или 305"

canary_name = "parse/foxjson/session-5000"
for i in range(len(runs) - 4, len(runs)):
    vals = {b["name"]: b["value"] for b in runs[i]["benches"]}
    c = vals.get(canary_name)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    cid = runs[i]["commit"]["id"][:7]
    v11 = vals.get("parse/foxurl/11")
    prof = v11 / c if (v11 and c) else None
    ts = runs[i]["commit"]["timestamp"]
    print(f"idx {i}: {cid} [{cls}] canary={c} проф={prof:.4e} ts={ts}")

# ИНДЕКС-ПИННИНГ по ФАКТИЧЕСКИМ данным (уроки 133/123)
assert runs[304]["commit"]["id"].startswith("6370dbb"), runs[304]["commit"]["id"]
assert runs[303]["commit"]["id"].startswith("7676353"), runs[303]["commit"]["id"]
assert runs[302]["commit"]["id"].startswith("86b4cf4"), runs[302]["commit"]["id"]
assert runs[296]["commit"]["id"].startswith("33c89cc"), runs[296]["commit"]["id"]

# CONTINUITY: записи 0-303 dict-равны data291.js (полный префикс 304 записи)
raw291 = Path("/home/z/my-project/firefox-rs/scripts/data291.js").read_text()
d291 = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                            raw291, re.S).group(1))
r291 = d291["entries"]["Rust Benchmark"]
assert len(r291) == 304, f"data291.js содержит {len(r291)} записей"
for i in range(304):
    assert r291[i]["commit"]["id"] == runs[i]["commit"]["id"], f"idx {i} cid"
    assert r291[i]["benches"] == runs[i]["benches"], f"idx {i} values"
print(f"CONTINUITY: записи 0-303 dict-равны data291.js (304 записи)")

# --- data292.js = ПОЛНЫЙ CDN 305 записей (БЕЗ среза, meta[-1] = судимая) ---
text = "window.BENCHMARK_DATA = " + json.dumps(d, indent=2, ensure_ascii=False) + "\n"
DST.write_text(text)
sha_dst = hashlib.sha256(text.encode()).hexdigest()
print(f"data292.js: {len(runs)} записей (ПОЛНЫЙ CDN, БЕЗ среза), sha256: {sha_dst}")

chk = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                           DST.read_text(), re.S).group(1))
assert len(chk["entries"]["Rust Benchmark"]) == len(runs)
assert chk["entries"]["Rust Benchmark"][304]["commit"]["id"].startswith("6370dbb")
print("OK: data292.js парсится, последняя запись = 6370dbb (idx 304, точка "
      "#305, судимая окна 292); data292_mach.js НЕ создаётся (срез не нужен)")
