#!/usr/bin/env python3
"""v294_marks.py — окно 294: маркеры записи 9aeda95 (точка #308, класс
CLASSIC canary 1356953; СНАЧАЛА строку профиля, урок 229): канон-кластер
1345000-1375000, 162-й визит (148 OLD + 14 NEW), OLD-канон подформа —
профиль 77/1356953 = 5.6745e-05 INSIDE OLD-конверта 5.5448e-05-5.8978e-05,
zzz 206505 INSIDE 203811-226663, small 146 INSIDE 143-153, corpus-all 1181
INSIDE 1163-1228. АНАТОМИЯ: (1) same-form OLD-канон свидетели — 581d0fb
(idx 305, distance 2) / 68f8b0a (idx 300, distance 7) / b94692e (idx 297,
distance 10) / d092b80 (idx 283, distance 24) / d70534f-якорь (idx 66,
distance 241) — ожидание УЗКОГО разброса (хост-идентичность OLD-канона);
(2) КОНТРАСТ чужих классов/форм — 6370dbb (idx 304, FAST) / 86b4cf4 (idx
302, NEW-скошенная) / a4241de (idx 301, MEDIUM) / fe76381 (idx 299, 1260k) /
b74d5b2 (idx 298, 1223k) / 33c89cc (idx 296, FAST) — ожидание ШИРОКОГО.
КОНТРОЛ serialize/foxurl/3 (закрыт окном 292: квантование 2/4/19 — свойство
хоста). Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data294.js"

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

last = meta[307]
assert last["cid"] == "9aeda95" and last["cls"] == "CLASSIC"
assert last["canary"] == 1356953

SAMEFORM = [(305, "581d0fb"), (300, "68f8b0a"), (297, "b94692e"),
            (283, "d092b80"), (66, "d70534f")]
CONTRAST = [(304, "6370dbb"), (302, "86b4cf4"), (301, "a4241de"),
            (299, "fe76381"), (298, "b74d5b2"), (296, "33c89cc")]
PAIR = (306, "2069adf")


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
    i10, i90 = int(n * 0.10), int(n * 0.90)
    spread = d1s[i90] - d1s[i10]
    ca, cb = o["canary"], last["canary"]
    cd = (cb - ca) / ca * 100.0
    zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
    flags = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
    c3 = f"{pv.get('serialize/foxurl/3')}->{lv.get('serialize/foxurl/3')}"
    print(f"{tag}: vs {other_cid} (idx {other_idx}, distance "
          f"{last['idx'] - other_idx}) [{o['cls']} canary {o['canary']}]: "
          f"median {med!r}, разброс {spread:.1f} п.п., canary {cd:+.2f}%, "
          f"{len(zeros)} нулей, {len(flags)} флагов, контрол 3: {c3}")
    return spread, flags


print("== SAME-FORM OLD-канон свидетели (ожидание УЗКОГО) ==")
for idx, cid in SAMEFORM:
    compare(idx, cid, "same-form")
print("== КОНТРАСТ чужих классов/форм (ожидание ШИРОКОГО) ==")
for idx, cid in CONTRAST:
    compare(idx, cid, "контраст")
print("== ПАРА (машинная, отдельный прогон bench_history --check 20) ==")
compare(*PAIR, "пара")
