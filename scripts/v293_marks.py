#!/usr/bin/env python3
"""v293_marks.py — окно 293: маркеры записи 581d0fb (точка #306, класс
CLASSIC canary 1359903; СНАЧАЛА строку профиля, урок 229): канон-кластер
1345000-1375000, 160-й визит (146 OLD + 14 NEW), OLD-канон подформа —
профиль 77/1359903 = 5.6622e-05 INSIDE OLD-конверта 5.5448e-05-5.8978e-05,
zzz 208231 INSIDE 203811-226663, small 147 INSIDE 143-153, corpus-all 1171
INSIDE 1163-1228. АНАТОМИЯ: (1) same-form OLD-канон свидетели — 68f8b0a
(idx 300, distance 5) / b94692e (idx 297, distance 8) / d092b80 (idx 283,
distance 22) / d70534f-якорь (idx 66, distance 239) — ожидание УЗКОГО
разброса (хост-идентичность OLD-канона); (2) КОНТРАСТ чужих классов/форм —
6370dbb (idx 304, FAST, между в паре) / 86b4cf4 (idx 302, NEW-скошенная) /
a4241de (idx 301, MEDIUM) / fe76381 (idx 299, 1260k) / b74d5b2 (idx 298,
1223k) / 33c89cc (idx 296, FAST) — ожидание ШИРОКОГО. КОНТРОЛ
serialize/foxurl/3 (закрыт окном 292: квантование — свойство хоста).
Формулы = analyze.py."""
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

SAMEFORM = [(300, "68f8b0a"), (297, "b94692e"), (283, "d092b80"),
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
    bo = sum(1 for a in d1 if a > 20.0)
    sm_l = lv["parse/foxjson/small"]
    sm_o = o["vals"]["parse/foxjson/small"]
    zzz_l = lv["find/foxsearch/zzz-absent-zzz"]
    zzz_o = o["vals"]["find/foxsearch/zzz-absent-zzz"]
    ca_l = lv["parse/foxurl/corpus-all"]
    ca_o = o["vals"]["parse/foxurl/corpus-all"]
    q_l = lv.get("serialize/foxurl/3")
    q_o = o["vals"].get("serialize/foxurl/3")
    print(f"{tag}: vs {other_cid} (idx {other_idx}, distance "
          f"{last['idx'] - other_idx}) [{o['cls']} canary {o['canary']}]: "
          f"median {med!r}, разброс {spread!r} -> {spread:.1f} п.п., "
          f"canary {cd:+.2f}%, {zeros} нулей, {bo} флагов, "
          f"small {sm_o}->{sm_l} {(sm_l-sm_o)/sm_o*100:+.2f}%, "
          f"zzz {zzz_o}->{zzz_l} {(zzz_l-zzz_o)/zzz_o*100:+.2f}%, "
          f"corpus-all {ca_o}->{ca_l} {(ca_l-ca_o)/ca_o*100:+.2f}%, "
          f"serialize/foxurl/3 {q_o}->{q_l}")
    mn = sorted(zip(d1, names))[:4]
    mx = sorted(zip(d1, names), reverse=True)[:4]
    print(f"   min 4: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in mn))
    print(f"   top 4: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in mx))
    return med, spread


print("=== АНАТОМИЯ точки #306 (581d0fb, CLASSIC OLD-канон, 160-й визит) ===")
print("--- ПАРА (581d0fb vs 7676353 — вердикт машины) ---")
compare(*PAIR, "ПАРА")
print("--- same-form OLD-канон свидетели (ожидание УЗКИХ) ---")
for idx_, cid_ in SAMEFORM:
    compare(idx_, cid_, "SAME-FORM")
print("--- КОНТРАСТ чужих классов/форм (ожидание ШИРОКИХ) ---")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "ЧУЖОЙ-КЛАСС")
