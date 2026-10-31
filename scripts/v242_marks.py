#!/usr/bin/env python3
"""v242_marks.py — окно 254: дополнительные маркеры записи 763e4a5 (точка #260).
p10/p90 sorted-neighbors, corpus-all счётчик (закон хост x класс), foxsearch
zzz конверт, профиль точный, OLD-кластер проверка. Формулы = analyze.py."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data254.js").read_text()
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
print(f"foxsearch zzz: {zzz} ({'НОРМАЛЬНЫЙ <300k' if zzz < 300000 else 'ПАТОЛОГИЧЕСКИЙ >=300k'})")

# OLD-кластер canary: все CLASSIC записи последних 8
cl = [(m["cid"], m["vals"].get(CANARY)) for m in meta if m["cls"] == "CLASSIC"][-8:]
print("последние 8 CLASSIC canary:", ", ".join(f"{c} {v}" for c, v in cl))
old_cluster = sorted(v for _, v in cl[-7:])
print(f"OLD-кластер 7 записей: {min(old_cluster)}-{max(old_cluster)}")
print(f"canary {last['cid']} {can} INSIDE: {min(old_cluster) <= can <= max(old_cluster)}")

# нули пары (для записи)
zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ пары: {len(zeros)} {zeros}")
