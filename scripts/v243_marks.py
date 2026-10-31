#!/usr/bin/env python3
"""v243_marks.py — окно 255: дополнительные маркеры записи e24e80f (точка #261,
MEDIUM canary 992228, OLD-профиль). p10/p90 sorted-neighbors, corpus-all
счётчик (закон хост x класс), foxsearch zzz конверт, профиль точный,
MEDIUM-кластер проверка. Формулы = analyze.py."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data255.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    v11 = vals.get("parse/foxurl/11")
    prof = v11 / c if c and v11 else None
    tag = ("OLD" if prof < 6.0e-05 else "NEW") if prof else "?"
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "cls": cls,
                 "prof": prof, "tag": tag, "vals": vals})

last = meta[-1]
pair = next(x for x in reversed(meta[:-1]) if x["cls"] == last["cls"])
lv, pv = last["vals"], pair["vals"]

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
    print(f"{nm}: last={lv.get(nm)!r} pair={pv.get(nm)!r}")
ca, cb = lv.get("parse/foxurl/corpus-all"), pv.get("parse/foxurl/corpus-all")
if ca and cb:
    print(f"corpus-all дельта: {(ca-cb)/cb*100!r} -> {(ca-cb)/cb*100:+.2f}%")
v11, can = lv.get("parse/foxurl/11"), lv.get(CANARY)
print(f"профиль точный: {v11/can!r} = {v11}/{can} [{last['tag']}]")
zzz = lv.get("find/foxsearch/zzz-absent-zzz")
print(f"foxsearch zzz: {zzz} ({'НОРМАЛЬНЫЙ <300k' if zzz < 300000 else 'ПАТОЛОГИЧЕСКИЙ >=300k'})")

# MEDIUM-кластер canary: последние 8 MEDIUM записей
ml = [(m["cid"], m["vals"].get(CANARY), m["tag"]) for m in meta if m["cls"] == "MEDIUM"][-8:]
print("последние 8 MEDIUM canary:", ", ".join(f"{c} {v}[{t}]" for c, v, t in ml))
# OLD-MEDIUM кластер
om = [(m["idx"], m["cid"], m["vals"].get(CANARY)) for m in meta
      if m["cls"] == "MEDIUM" and m["tag"] == "OLD"]
print(f"OLD-MEDIUM записей: {len(om)}; последние 5:",
      ", ".join(f"idx{i} {c} {v}" for i, c, v in om[-5:]))
oc = sorted(v for _, _, v in om)
print(f"OLD-MEDIUM canary кластер: {oc[0]}-{oc[-1]}, медиана {statistics.median(oc)!r}")
print(f"canary {last['cid']} {can} INSIDE OLD-кластера: {oc[0] <= can <= oc[-1]}")

# нули пары (для записи)
zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ пары: {len(zeros)} {zeros}")
