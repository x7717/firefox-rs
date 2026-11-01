#!/usr/bin/env python3
"""v290_variant.py — окно 290: точка #302 a4241de (idx 301, MEDIUM canary
1071504, канон MEDIUM ~1071k) — ВАРИАНТ-СВИДЕТЕЛЬСТВО same-form канона
MEDIUM: vs b15f7d3 (idx 288, distance 13) / 87ec41e (idx 268, distance
33) / 45afa12 (idx 252, distance 49) — ожидание УЗКОГО разброса
(хост-идентичность; прецедент окна 283-варианта f92d0dd: vs 87ec41e 3.3 /
vs 45afa12 4.5); КОНТРАСТ чужих форм: vs 68f8b0a (idx 300, канон-CLASSIC)
/ 33c89cc (idx 296, FAST) / 0cb508b (idx 295, canary-1220k) / fe76381
(idx 299, 1260k) — ожидание ШИРОКОГО разброса (прецеденты w284/286/287/
288/289: 67.2/57.3/71.1/19.2/52.6). ХОСТ-ИДЕНТИЧНОСТЬ подтверждается
узкими same-form разбросами. Вариант-медианы в РЕЕСТР НЕ идут (урок
w278). Формулы = analyze.py (dual-formula f1/f2)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data290.js"

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

last = meta[301]
assert last["cid"] == "a4241de" and last["cls"] == "MEDIUM"
WITNESSES = [(288, "b15f7d3"), (268, "87ec41e"), (252, "45afa12")]
CONTRAST = [(300, "68f8b0a"), (296, "33c89cc"), (295, "0cb508b"),
            (299, "fe76381")]


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


print("=== ВАРИАНТ-СВИДЕТЕЛЬСТВО ОКНА 290 (a4241de, канон MEDIUM ~1071k) ===")
print("--- same-form MEDIUM свидетели (ожидание УЗКИХ) ---")
for idx_, cid_ in WITNESSES:
    compare(idx_, cid_, "WITNESS")
print("--- контраст чужих форм (ожидание ШИРОКИХ) ---")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "CONTRAST")
