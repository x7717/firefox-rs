#!/usr/bin/env python3
"""v286_variant.py — окно 286: точка #295 b94692e (idx 297, CLASSIC canary
1355496, канонический OLD-профиль подформы) — ВАРИАНТ-СВИДЕТЕЛЬСТВО
same-form OLD-подформы канарейного кластера: vs e915c61 (idx 293,
distance 4) / ef95f29 (idx 289, distance 8) / c0747e1 (idx 284, distance
13) — ожидание УЗКОГО разброса (хост-идентичность); КОНТРАСТ чужих форм:
vs b1bf50c (idx 287, форма 1260k) / 680b8e9 (idx 275, форма 1260k) /
0cb508b (idx 295, семейство canary-1220k — она же GUARD-пара) — ожидание
ШИРОКОГО разброса (прецедент окна 284: 67.2). ХОСТ-ИДЕНТИЧНОСТЬ
подтверждается узкими same-form разбросами (прецедент w282/w279/w218).
Вариант-медианы в РЕЕСТР НЕ идут (урок w278). Формулы = analyze.py
(dual-formula f1/f2)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data286.js"

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

last = meta[297]
assert last["cid"] == "b94692e" and last["cls"] == "CLASSIC"
WITNESSES = [(293, "e915c61"), (289, "ef95f29"), (284, "c0747e1")]
CONTRAST = [(287, "b1bf50c"), (275, "680b8e9"), (295, "0cb508b")]


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
    print(f"vs {other_cid} (idx {other_idx}, distance {297 - other_idx}, {tag}): "
          f"median {med!r}, spread {spread!r} -> {spread:.1f}, canary {cd:+.2f}%, "
          f"нулей {zeros}, small {sm_now} vs {sm_o} "
          f"{(sm_now - sm_o) / sm_o * 100:+.2f}%, zzz {(zzz_now - zzz_o) / zzz_o * 100:+.2f}%, "
          f"corpus-all {(ca_now - ca_o) / ca_o * 100:+.2f}%, "
          f"FP max |f1-f2| {worst!r} ({wname})")
    return spread


sp = []
for idx_, cid_ in WITNESSES:
    sp.append(compare(idx_, cid_, "same-form OLD-подформа"))
print(f"same-host разброс OLD-подформы: {min(sp):.1f}-{max(sp):.1f} п.п.")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "КОНТРАСТ чужая форма")
