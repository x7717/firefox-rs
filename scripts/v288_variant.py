#!/usr/bin/env python3
"""v288_variant.py — окно 288: точка #300 fe76381 (idx 299, CLASSIC canary
1259770, семейство 1260k, 8-й визит) — ВАРИАНТ-СВИДЕТЕЛЬСТВО same-form
семейства: vs b1bf50c (idx 287, distance 12) / 680b8e9 (idx 275, distance
24) / 5ae02bc (idx 214, distance 85) — ожидание УЗКОГО разброса
(хост-идентичность); КОНТРАСТ чужих форм: vs b74d5b2 (idx 298, семейство
canary-1220k — она же GUARD-пара) / 0cb508b (idx 295, canary-1220k) /
b94692e (idx 297, канонический ~1355k) — ожидание ШИРОКОГО/УМЕРЕННОГО
разброса (прецедент окна 287-варианта: b74d5b2 vs b1bf50c 18.2 УМЕРЕННЫЙ;
окна 284/286: 67.2/57.3 ШИРОКИЕ против канона). ХОСТ-ИДЕНТИЧНОСТЬ
подтверждается узкими same-form разбросами (прецедент w282/w284/w287).
Вариант-медианы в РЕЕСТР НЕ идут (урок w278). Формулы = analyze.py
(dual-formula f1/f2)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data288.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "cls": cls,
                 "canary": c, "vals": vals})

last = meta[299]
assert last["cid"] == "fe76381" and last["cls"] == "CLASSIC"
WITNESSES = [(287, "b1bf50c"), (275, "680b8e9"), (214, "5ae02bc")]
CONTRAST = [(298, "b74d5b2"), (295, "0cb508b"), (297, "b94692e")]


def compare(other_idx, other_cid, tag):
    o = meta[other_idx]
    assert o["cid"] == other_cid, (o["cid"], other_cid)
    lv, pv = last["vals"], o["vals"]
    d1, d2, names = [], [], []
    for name, v in lv.items():
        p = pv.get(name)
        if p and v:
            d1.append((v - p) / p * 100.0)
            d2.append((v / p - 1.0) * 100.0)
            names.append(name)
    d1s = sorted(d1)
    n = len(d1)
    med = statistics.median(d1)
    p10, p90 = d1s[int(n * 0.10)], d1s[int(n * 0.90)]
    spread = p90 - p10
    cd = (last["canary"] - o["canary"]) / o["canary"] * 100.0
    zeros = sum(1 for a in d1 if a == 0.0)
    worst, wname = 0.0, ""
    for a, b, nm in zip(d1, d2, names):
        if abs(a - b) > worst:
            worst, wname = abs(a - b), nm
    sm_now = lv["parse/foxjson/small"]
    sm_o = pv["parse/foxjson/small"]
    zzz_now = lv["find/foxsearch/zzz-absent-zzz"]
    zzz_o = pv["find/foxsearch/zzz-absent-zzz"]
    ca_now = lv["parse/foxurl/corpus-all"]
    ca_o = pv["parse/foxurl/corpus-all"]
    print(f"vs {other_cid} (idx {other_idx}, distance {299 - other_idx}, {tag}): "
          f"median {med!r}, spread {spread!r} -> {spread:.1f}, canary {cd:+.2f}%, "
          f"нулей {zeros}, small {sm_now} vs {sm_o} "
          f"{(sm_now - sm_o) / sm_o * 100:+.2f}%, zzz {(zzz_now - zzz_o) / zzz_o * 100:+.2f}%, "
          f"corpus-all {(ca_now - ca_o) / ca_o * 100:+.2f}%, "
          f"FP max |f1-f2| {worst!r} ({wname})")
    return spread


sp = []
for idx_, cid_ in WITNESSES:
    sp.append(compare(idx_, cid_, "same-form 1260k"))
print(f"same-host разброс 1260k: {min(sp):.1f}-{max(sp):.1f} п.п.")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "КОНТРАСТ чужая форма")
