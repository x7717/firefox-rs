#!/usr/bin/env python3
"""v285_variant.py — окно 285: точка #294 33c89cc (idx 296, FAST canary
784289, Форма-A) — ВАРИАНТ-СВИДЕТЕЛЬСТВО same-form FAST-хостов: vs
4eb8807 (idx 285, distance 11) / fd7e926 (idx 282, distance 14) /
289a974 (idx 261, distance 35); КОНТРАСТ Формы-B (другая форма хоста):
vs 2cf09ae (idx 211, w211 зеркальная пара) / a383f78 (idx 241) —
ожидание ШИРОКОГО разброса. ХОСТ-ИДЕНТИЧНОСТЬ Формы-A подтверждается
узкими same-form разбросами (прецедент w279/w218/w284). Вариант-медианы
в РЕЕСТР НЕ идут (урок w278). Формулы = analyze.py (dual-formula f1/f2)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data285.js"

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

last = meta[296]
assert last["cid"] == "33c89cc" and last["cls"] == "FAST"
WITNESSES = [(285, "4eb8807"), (282, "fd7e926"), (261, "289a974")]
CONTRAST = [(211, "2cf09ae"), (241, "a383f78")]


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
    print(f"vs {other_cid} (idx {other_idx}, distance {296 - other_idx}, {tag}): "
          f"median {med!r}, spread {spread!r} -> {spread:.1f}, canary {cd:+.2f}%, "
          f"нулей {zeros}, small {sm_now} vs {sm_o} "
          f"{(sm_now - sm_o) / sm_o * 100:+.2f}%, zzz {(zzz_now - zzz_o) / zzz_o * 100:+.2f}%, "
          f"corpus-all {(ca_now - ca_o) / ca_o * 100:+.2f}%, "
          f"FP max |f1-f2| {worst!r} ({wname})")
    return spread


sp = []
for idx_, cid_ in WITNESSES:
    sp.append(compare(idx_, cid_, "same-form Форма-A"))
print(f"same-host разброс Формы-A: {min(sp):.1f}-{max(sp):.1f} п.п.")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "КОНТРАСТ Форма-B")
