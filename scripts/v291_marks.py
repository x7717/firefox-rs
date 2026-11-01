#!/usr/bin/env python3
"""v291_marks.py — окно 291: маркеры записи 86b4cf4 (точка #303, класс
CLASSIC canary 1357706; СНАЧАЛА строку профиля, урок 229): канон-кластер
1345000-1375000 (158-й визит), подформа NEW-скошенная e990865-класса
(профиль 6.9971e-05 INSIDE 6.1036e-05-8.2396e-05, zzz 231854 INSIDE
205697-344989, small 147 INSIDE 143-150, corpus-all 1274 INSIDE 1219-1424).
АНАТОМИЯ: (1) same-form NEW-скошенные свидетели — e990865 (idx 286,
distance 16) / 3215b78 (idx 276, distance 26) / d50c58c (idx 239,
distance 63) — ожидание УЗКОГО разброса (хост-идентичность подформы);
(2) КОНТРАСТ чужих форм/классов — 68f8b0a (idx 300, OLD-канон, ПАРА) /
fe76381 (idx 299, 1260k) / b74d5b2 (idx 298, canary-1220k) / a4241de
(idx 301, MEDIUM) / 33c89cc (idx 296, FAST) — ожидание ШИРОКОГО разброса
(чужие хосты). Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data291.js"

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

last = meta[302]
assert last["cid"] == "86b4cf4" and last["cls"] == "CLASSIC"
assert last["canary"] == 1357706

SAMEFORM = [(286, "e990865"), (276, "3215b78"), (239, "d50c58c")]
CONTRAST = [(300, "68f8b0a"), (299, "fe76381"), (298, "b74d5b2"),
            (301, "a4241de"), (296, "33c89cc")]


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
    print(f"   min 4: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in mn))
    print(f"   top 4: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in mx))
    return med, spread


print("=== АНАТОМИЯ точки #303 (86b4cf4, NEW-скошенная подформа канон-кластера) ===")
print("--- same-form NEW-скошенные свидетели (ожидание УЗКИХ) ---")
for idx_, cid_ in SAMEFORM:
    compare(idx_, cid_, "SAME-FORM")
print("--- КОНТРАСТ чужих форм/классов (ожидание ШИРОКИХ) ---")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "ЧУЖАЯ-ФОРМА")
