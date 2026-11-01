#!/usr/bin/env python3
"""v290_marks.py — окно 290: маркеры записи a4241de (точка #302, класс
MEDIUM canary 1071504; СНАЧАЛА строку профиля, урок 229): профиль
71/1071504 = 6.6262e-05 [NEW], zzz 179133, small 114, corpus-all 983.
ФОРМА = канонический MEDIUM ~1071k (кластер 1060000-1080000: 41-й визит;
canary envelope 1061107-1074132; контраст MEDIUM-1029k 82ccccf-формы:
small 99-101, zzz 291-303k; контраст 1121-1186k: small 115-117, zzz
307-340k; контраст 909-938k: small 86-91).
АНАТОМИЯ: (1) против same-form канона MEDIUM b15f7d3 (idx 288, distance
13) / 87ec41e (idx 268, distance 33) / 45afa12 (idx 252, distance 49) —
ожидание УЗКОГО разброса (хост-идентичность, прецедент окна 283-варианта:
vs 87ec41e 3.3 / vs 45afa12 4.5); (2) КОНТРАСТ чужих форм/классов: 68f8b0a
(idx 300, канон-CLASSIC ~1356k) / 33c89cc (idx 296, FAST) / 0cb508b
(idx 295, canary-1220k) / fe76381 (idx 299, 1260k) — ожидание ШИРОКОГО
разброса (чужие хосты). Формулы = analyze.py."""
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
assert last["canary"] == 1071504

SAMEFORM = [(288, "b15f7d3"), (268, "87ec41e"), (252, "45afa12")]
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
    bo = sum(1 for a in d1 if a > 20.0)
    sm_l = lv["parse/foxjson/small"]
    sm_o = o["vals"]["parse/foxjson/small"]
    zzz_l = lv["find/foxsearch/zzz-absent-zzz"]
    zzz_o = o["vals"]["find/foxsearch/zzz-absent-zzz"]
    ca_l = lv["parse/foxurl/corpus-all"]
    ca_o = o["vals"]["parse/foxurl/corpus-all"]
    print(f"{tag}: vs {other_cid} (idx {other_idx}, distance "
          f"{last['idx'] - other_idx}) [{o['cls']} canary {o['canary']}]: "
          f"median {med!r}, разброс {spread!r} -> {spread:.1f} п.п., "
          f"canary {cd:+.2f}%, {zeros} нулей, {bo} пробелов(флагов), "
          f"small {sm_o}->{sm_l} {(sm_l-sm_o)/sm_o*100:+.2f}%, "
          f"zzz {zzz_o}->{zzz_l} {(zzz_l-zzz_o)/zzz_o*100:+.2f}%, "
          f"corpus-all {ca_o}->{ca_l} {(ca_l-ca_o)/ca_o*100:+.2f}%")
    mn = sorted(zip(d1, names))[:4]
    mx = sorted(zip(d1, names), reverse=True)[:4]
    print(f"   min 4: " + " / ".join(f"{nm.split('/')[-1] if nm.count('/')>=2 else nm} {a:+.1f}" for a, nm in mn))
    print(f"   top 4: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in mx))
    return med, spread


print("=== АНАТОМИЯ точки #302 (a4241de, канон MEDIUM ~1071k) ===")
print("--- same-form канон-MEDIUM свидетели ---")
for idx_, cid_ in SAMEFORM:
    compare(idx_, cid_, "SAME-FORM")
print("--- КОНТРАСТ чужих форм/классов ---")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "ЧУЖАЯ-ФОРМА")
