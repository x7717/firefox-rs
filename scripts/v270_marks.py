#!/usr/bin/env python3
"""v270_marks.py — окно 282: маркеры CLASSIC-OLD-хоста для точки #291
(e915c61, idx 293, canary 1351861) + анатомия против CLASSIC-якоря
d70534f + реестр зон corpus-all CLASSIC-записей (закон хост x класс) +
джиттер small. Подпись OLD-хоста: canary кластер ~1351-1368k, zzz
недавний конверт 206194-230590, small ~143-153 (джиттер расширяется),
профиль OLD 5.55-5.72e-05; corpus-all ядро зоны 1180-1196."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data282.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    prof = (vals.get("parse/foxurl/11") or 0) / c if c else None
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "cls": cls,
                 "canary": c, "vals": vals, "prof": prof})

# 1) OLD-кластер: CLASSIC-записи с canary 1340k-1370k
old = [m for m in meta if m["cls"] == "CLASSIC" and 1340000 <= m["canary"] <= 1370000]
print(f"OLD-кластер (CLASSIC canary 1340k-1370k): {len(old)} записей")
recent = old[-7:]
print("последние 7 визитов: "
      + ", ".join(f"{m['cid']} idx {m['idx']} canary {m['canary']} "
                  f"zzz {m['vals'].get('find/foxsearch/zzz-absent-zzz')} "
                  f"small {m['vals'].get('parse/foxjson/small')} "
                  f"corpus-all {m['vals'].get('parse/foxurl/corpus-all')} "
                  f"профиль {m['prof']:.4e}" for m in recent))
cans = [m["canary"] for m in old]
print(f"canary кластер {min(cans)}-{max(cans)} (Дельта "
      f"{(max(cans) - min(cans)) / min(cans) * 100.0:.2f}%)")
smalls = [m["vals"]["parse/foxjson/small"] for m in old[-10:]]
print(f"small последних 10 OLD-визитов: {smalls} — норма 144±3, "
      f"хвост 150/143/143/153: джиттер расширяется вверх (НЕ дискриминатор)")

# 2) реестр зон corpus-all CLASSIC-записей (границы окна 280/281)
buckets = {"OLD 1180-1196": 0, "др.": 0}
for m in meta:
    if m["cls"] != "CLASSIC":
        continue
    ca = m["vals"].get("parse/foxurl/corpus-all")
    if 1180 <= ca <= 1196:
        buckets["OLD 1180-1196"] += 1
    else:
        buckets["др."] += 1
cas = [m["vals"]["parse/foxurl/corpus-all"]
       for m in meta if m["cls"] == "CLASSIC" and 1340000 <= m["canary"] <= 1370000]
print(f"\nкорпус OLD-кластера: ядро 1180-1196 = "
      f"{sum(1 for v in cas if 1180 <= v <= 1196)}, периферия ниже = "
      f"{sorted(set(v for v in cas if v < 1180))}, выше = "
      f"{sorted(set(v for v in cas if v > 1196))}")

# 3) анатомия против CLASSIC-якоря d70534f
anchor = next(m for m in meta if m["cid"] == "d70534f")
last = meta[293]
lv, pv = last["vals"], anchor["vals"]
cd = (last["canary"] - anchor["canary"]) / anchor["canary"] * 100.0
d1 = [(v - pv[k]) / pv[k] * 100.0 for k, v in lv.items() if pv.get(k) and v]
n = len(d1)
s = sorted(d1)
med = statistics.median(d1)
p10, p90 = s[int(n * 0.10)], s[int(n * 0.90)]
zeros = sum(1 for a in d1 if a == 0.0)
flags = [a for a in d1 if a > 20.0]
PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
              ("/foxsearch/", "/std/")]


def partner(nm):
    for a, b in PAIR_RULES:
        if a in nm:
            return nm.replace(a, b, 1)
    return None


ratios = {}
for nm, v in lv.items():
    p = partner(nm)
    if p and pv.get(p) and pv.get(nm) and v:
        ratios.setdefault(nm.split("/")[1], []).append(
            ((v / pv[nm]) / (lv[p] / pv[p]) - 1.0) * 100.0)
rmed = {c: statistics.median(ds) for c, ds in ratios.items() if ds}
print(f"\nАНАТОМИЯ против CLASSIC-якоря d70534f (idx {anchor['idx']}): "
      f"canary {cd:+.2f}% {'INSIDE' if abs(cd) <= 2.0 else 'OUTSIDE'}, "
      f"median {med!r}, p10 {p10!r}, p90 {p90!r}, spread {p90 - p10:.1f}, "
      f"{zeros} нулей, {len(flags)} флагов, отношения "
      + " / ".join(f"{c} {rmed[c]:+.2f}" for c in sorted(rmed)))
inside_chain = [m for m in meta[anchor["idx"] + 1:]
                if m["cls"] == "CLASSIC" and 1340000 <= m["canary"] <= 1370000]
print(f"последние OLD-визиты против якоря (canary %): "
      + ", ".join(f"{m['cid']} {(m['canary'] - anchor['canary']) / anchor['canary'] * 100.0:+.2f}%"
                  for m in inside_chain[-7:]))
