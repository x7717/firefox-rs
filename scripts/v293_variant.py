#!/usr/bin/env python3
"""v293_variant.py — окно 293: точка #306 581d0fb (idx 305, CLASSIC canary
1359903, OLD-канон подформа, 160-й визит кластера 1345000-1375000) —
ВАРИАНТ-СВИДЕТЕЛЬСТВО same-form OLD-канон: vs 68f8b0a (idx 300, distance 5) /
b94692e (idx 297, distance 8) / d092b80 (idx 283, distance 22) / d70534f-якорь
(idx 66, distance 239) — ожидание УЗКОГО разброса (хост-идентичность
OLD-канона); КОНТРАСТ чужих классов/форм: vs 6370dbb (idx 304, FAST, между в
паре) / 86b4cf4 (idx 302, NEW-скошенная подформа) / a4241de (idx 301, MEDIUM) /
fe76381 (idx 299, CLASSIC 1260k) / b74d5b2 (idx 298, CLASSIC 1223k) /
33c89cc (idx 296, FAST) — ожидание ШИРОКОГО (кросс-класс).
ПАРА = 7676353 (idx 303) — same-form OLD-канон, судится машиной отдельно.
Вариант-медианы в РЕЕСТР НЕ идут (урок w278). Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data293.js"

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

last = meta[305]
assert last["cid"] == "581d0fb" and last["cls"] == "CLASSIC"
assert last["canary"] == 1359903
WITNESSES = [(300, "68f8b0a"), (297, "b94692e"), (283, "d092b80"),
             (66, "d70534f")]
CONTRAST = [(304, "6370dbb"), (302, "86b4cf4"), (301, "a4241de"),
            (299, "fe76381"), (298, "b74d5b2"), (296, "33c89cc")]
PAIR = (303, "7676353")


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
    sm_l = lv["parse/foxjson/small"]
    sm_o = o["vals"]["parse/foxjson/small"]
    zzz_l = lv["find/foxsearch/zzz-absent-zzz"]
    zzz_o = o["vals"]["find/foxsearch/zzz-absent-zzz"]
    ca_l = lv["parse/foxurl/corpus-all"]
    ca_o = o["vals"]["parse/foxurl/corpus-all"]
    print(f"{tag}: vs {other_cid} (idx {other_idx}, distance "
          f"{last['idx'] - other_idx}) median {med!r}, spread "
          f"{spread!r} -> {spread:.1f}, canary {cd:+.2f}%, {zeros} нулей, "
          f"small {(sm_l-sm_o)/sm_o*100:+.2f}%, zzz "
          f"{(zzz_l-zzz_o)/zzz_o*100:+.2f}%, corpus-all "
          f"{(ca_l-ca_o)/ca_o*100:+.2f}%")


print("=== ВАРИАНТ-СВИДЕТЕЛЬСТВО ОКНА 293 (581d0fb, CLASSIC OLD-канон) ===")
print("--- ПАРА (машина судит отдельно) ---")
compare(*PAIR, "PAIR")
print("--- same-form OLD-канон свидетели (ожидание УЗКИХ) ---")
for idx_, cid_ in WITNESSES:
    compare(idx_, cid_, "WITNESS")
print("--- контраст чужих классов/форм (ожидание ШИРОКИХ) ---")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "CONTRAST")
