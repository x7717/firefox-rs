#!/usr/bin/env python3
"""v248_marks.py — окно 260: дополнительные маркеры записи 87ec41e (точка #266,
MEDIUM canary 1067291, NEW-профиль 7.12e-05 — хост ротировал на NEW после
3 CLASSIC OLD; SAME-ЗНАК с 45afa12 idx 252: corpus-all 1000==1000).
p10/p90 sorted-neighbors, corpus-all счётчик (закон хост x класс), foxsearch
zzz хост-позиции, профиль точный, MEDIUM-кластеры OLD/NEW. Формулы = analyze.py."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data260.js").read_text()
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
print(f"  соседи deltas[{i90-1}]={d1s[i90-1]!r} / deltas[{i90+1 if i90+1<n else i90}]={d1s[i90+1] if i90+1<n else 'КРАЙ'!r}")
if med_rank is not None:
    print(f"median rank[{med_rank}] = {med!r}, соседи rank[{med_rank-1}]={d1s[med_rank-1]!r} / rank[{med_rank+1}]={d1s[med_rank+1]!r}")
else:
    print(f"median интерполирована {med!r}")

# счетчики
for nm in ("parse/foxurl/corpus-all", "find/foxsearch/zzz-absent-zzz",
           "parse/foxurl/11"):
    print(f"{nm}: last={lv.get(nm)!r} prev={pv.get(nm)!r}")
ca, cb = lv.get("parse/foxurl/corpus-all"), pv.get("parse/foxurl/corpus-all")
if ca and cb:
    print(f"corpus-all дельта: {(ca-cb)/cb*100!r} -> {(ca-cb)/cb*100:+.2f}%")
v11, can = lv.get("parse/foxurl/11"), lv.get(CANARY)
print(f"профиль точный: {v11/can!r} = {v11}/{can}")
zzz = lv.get("find/foxsearch/zzz-absent-zzz")
print(f"foxsearch zzz: {zzz} ({'<300k NEW-позиция' if zzz < 300000 else '>=300k OLD-позиция'})")

# MEDIUM-кластеры: последние 10 MEDIUM записей с расколом OLD/NEW
print("=== последние 10 MEDIUM записей (профиль-раскол) ===")
meds = [m for m in meta if m["cls"] == "MEDIUM"][-10:]
for m in meds:
    v = m["vals"]
    c = v.get(CANARY)
    p = v.get("parse/foxurl/11", 0) / c
    host = "NEW" if p >= 6.55e-05 else "OLD"
    print(f"{m['cid']} canary={c:.0f} v11={v.get('parse/foxurl/11')} "
          f"проф={p:.4e} [{host}] corpus-all={v.get('parse/foxurl/corpus-all'):.0f} "
          f"zzz={v.get('find/foxsearch/zzz-absent-zzz'):.0f}")
new_can = sorted(m["vals"].get(CANARY) for m in meds
                 if m["vals"].get("parse/foxurl/11", 0) / m["vals"].get(CANARY) >= 6.55e-05)
new_ca = sorted(m["vals"].get("parse/foxurl/corpus-all") for m in meds
                if m["vals"].get("parse/foxurl/11", 0) / m["vals"].get(CANARY) >= 6.55e-05)
if new_can:
    print(f"NEW-MEDIUM canary кластер: {new_can[0]}-{new_can[-1]}; "
          f"canary {can} INSIDE: {new_can[0] <= can <= new_can[-1]}")
    print(f"NEW-MEDIUM corpus-all: {new_ca[0]}-{new_ca[-1]}; "
          f"{ca:.0f} INSIDE: {new_ca[0] <= ca <= new_ca[-1]}")

# нули пары (для записи)
zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ пары: {len(zeros)} {zeros}")
