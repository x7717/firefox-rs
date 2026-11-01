#!/usr/bin/env python3
"""v266_marks.py — окно 278: дополнительные маркеры записи e990865
(точка #284, класс CLASSIC canary 1362588 INSIDE CLASSIC-кластера
1357764-1365873; СНАЧАЛА строка профиля, урок 229; ПОВТОРНЫЙ ВИЗИТ
NEW-ХОСТА: профиль 7.632535e-05 [NEW], corpus-all 1276 = зона
НОВАЯ-1273, zzz 230590 — прецедент w268 3215b78 #274).
p10/p90 sorted-neighbors, corpus-all счётчик (закон хост x класс,
реестр зон: OLD 1180-1196 / НОВАЯ-930 / НОВАЯ-1273 / NEW 1314-1424),
foxsearch zzz конверт CLASSIC 203811-231085, профиль точный,
CLASSIC canary-кластер проверка, foxjson/small норма 144±3.
Формулы = analyze.py."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data278.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    meta.append({"cid": r["commit"]["id"][:7], "cls": cls, "vals": vals})

last = meta[-1]
prev = next(x for x in reversed(meta[:-1]) if x["cls"] == last["cls"])
lv, pv = last["vals"], prev["vals"]

d1, names = [], []
for name, v in lv.items():
    p = pv.get(name)
    if p and v:
        d1.append((v - p) / p * 100.0)
        names.append(name)
n = len(d1)
d1s = sorted(d1)
i10, i90 = int(n * 0.10), min(int(n * 0.90), n - 1)
med = statistics.median(d1)
med_rank = d1s.index(med) if med in d1s else None

print(f"n={n} (int(n*0.10)={i10}, int(n*0.90)={i90})")
print(f"p10 deltas[{i10}] = {d1s[i10]!r}")
print(f"  соседи deltas[{i10-1}]={d1s[i10-1]!r} / deltas[{i10+1}]={d1s[i10+1]!r}")
print(f"p90 deltas[{i90}] = {d1s[i90]!r}")
print(f"  соседи deltas[{i90-1}]={d1s[i90-1]!r} / "
      f"deltas[{i90+1 if i90+1<n else i90}]="
      f"{d1s[i90+1] if i90+1<n else 'КРАЙ'!r}")
if med_rank is not None:
    print(f"median rank[{med_rank}] = {med!r}, "
          f"соседи rank[{med_rank-1}]={d1s[med_rank-1]!r} / "
          f"rank[{med_rank+1}]={d1s[med_rank+1]!r}")
else:
    print(f"median интерполирована {med!r}")

for nm in ("parse/foxurl/corpus-all", "find/foxsearch/zzz-absent-zzz",
           "parse/foxurl/11"):
    print(f"{nm}: last={lv.get(nm)!r} prev={pv.get(nm)!r}")
ca, cb = lv.get("parse/foxurl/corpus-all"), pv.get("parse/foxurl/corpus-all")
if ca and cb:
    print(f"corpus-all дельта: {(ca-cb)/cb*100!r} -> {(ca-cb)/cb*100:+.2f}%")
v11, can = lv.get("parse/foxurl/11"), lv.get(CANARY)
print(f"профиль точный: {v11/can!r} = {v11}/{can}")
zzz = lv.get("find/foxsearch/zzz-absent-zzz")
print(f"foxsearch zzz: {zzz} ({'НОРМАЛЬНЫЙ <300k' if zzz < 300000 else 'ПАТОЛОГИЧЕСКИЙ >=300k'})")
zzz_classic = sorted(m["vals"].get("find/foxsearch/zzz-absent-zzz") for m in meta
                     if m["cls"] == "CLASSIC" and m["vals"].get("find/foxsearch/zzz-absent-zzz"))
print(f"CLASSIC zzz конверт 203811-231085: INSIDE "
      f"{203811 <= zzz <= 231085} (rank {sum(1 for v in zzz_classic if v <= zzz)}/{len(zzz_classic)})")

fl = [(m["cid"], m["vals"].get(CANARY)) for m in meta if m["cls"] == "CLASSIC"][-7:]
print("последние 7 CLASSIC canary:", ", ".join(f"{c} {v}" for c, v in fl))
cl = sorted(v for _, v in fl)
print(f"CLASSIC-кластер canary последних 7: {cl[0]}-{cl[-1]}, INSIDE: "
      f"{cl[0] <= can <= cl[-1]}")
flp = [(m["cid"], m["vals"].get("parse/foxurl/11") / m["vals"].get(CANARY))
       for m in meta if m["cls"] == "CLASSIC"][-7:]
print("последние 7 CLASSIC профили v11/canary:")
for c, p in flp:
    tag = "[OLD]" if p < 6.0e-05 else "[NEW]"
    print(f"  {c} {p!r} {tag} INSIDE OLD-коридора 5.25-5.91e-05: "
          f"{5.25e-05 <= p <= 5.91e-05}")
last_ca = lv.get("parse/foxurl/corpus-all")
zone = ("OLD 1180-1196" if 1180 <= last_ca <= 1196 else
        "НОВАЯ-930" if 920 <= last_ca <= 940 else
        "НОВАЯ-1273" if 1265 <= last_ca <= 1285 else
        "NEW 1314-1424" if 1314 <= last_ca <= 1424 else "ВНЕ реестра зон")
print(f"corpus-all {last_ca} -> зона {zone} (реестр w268)")
fs = lv.get("parse/foxjson/small")
print(f"foxjson/small: {fs} (норма 144±3: {141 <= fs <= 147})")

zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ пары: {len(zeros)} {zeros}")
