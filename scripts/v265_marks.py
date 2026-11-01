#!/usr/bin/env python3
"""v265_marks.py — окно 277: дополнительные маркеры записи 4eb8807
(точка #283, класс FAST canary 758270 INSIDE FAST-коридора 568-795k —
РОТАЦИЯ после 2 CLASSIC, план окна 276 ротацию допускал; СНАЧАЛА
строка профиля, урок 229; FAST-пул ГОМОГЕННЫЙ OLD — при OLD-профиле
ПАРИТЕТ-форма same-host vs fd7e926, FAST-коридор разброса 3.0-14.0,
прецедент w253/w274).
p10/p90 sorted-neighbors, corpus-all счётчик (закон хост x класс,
FAST-кластер 569-703), foxsearch zzz конверт, профиль точный,
FAST canary-коридор 568-795k проверка.
Формулы = analyze.py."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data277.js").read_text()
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

fl = [(m["cid"], m["vals"].get(CANARY)) for m in meta if m["cls"] == "FAST"][-7:]
print("последние 7 FAST canary:", ", ".join(f"{c} {v}" for c, v in fl))
print(f"FAST-коридор canary 568-795k: INSIDE "
      f"{568000 <= can <= 795000} (реестр w253)")
flp = [(m["cid"], m["vals"].get("parse/foxurl/11") / m["vals"].get(CANARY))
       for m in meta if m["cls"] == "FAST"][-7:]
print("последние 7 FAST профили v11/canary:")
for c, p in flp:
    print(f"  {c} {p!r} [OLD] INSIDE OLD-коридора 5.25-5.91e-05: "
          f"{5.25e-05 <= p <= 5.91e-05}")
ca_all = [(m["cid"], m["vals"].get("parse/foxurl/corpus-all"))
          for m in meta if m["cls"] == "FAST"]
ca_cluster = sorted(v for _, v in ca_all[-6:] if v)
last_ca = lv.get("parse/foxurl/corpus-all")
print(f"FAST corpus-all кластер 569-703 (последние 6 FAST): "
      f"{min(ca_cluster)}-{max(ca_cluster)}, last {last_ca} INSIDE: "
      f"{569 <= last_ca <= 703}")

zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ пары: {len(zeros)} {zeros}")
