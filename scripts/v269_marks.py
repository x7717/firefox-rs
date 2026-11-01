#!/usr/bin/env python3
"""v269_marks.py — окно 281: маркеры CLASSIC-OLD-хоста для точки #290
(628dd1f копия-2, idx 292, canary 1360959) + подпись копии-1 (idx 291,
FAST 799720) + анатомия против CLASSIC-якоря d70534f + реестр зон
corpus-all CLASSIC-записей (закон хост x класс). Подпись OLD-хоста:
canary кластер ~1356-1364k, zzz конверт 203811-231085, small 144±3,
профиль OLD 5.25-5.91e-05; corpus-all зона 1180-1196 (выходы: 1204
w274 верх, 1177 w281 низ — НАБЛЮДЕНИЯ, зону НЕ расширять)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data281.js"

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

# 1) OLD-кластер: CLASSIC-записи с canary 1340k-1370k (OLD-хост)
old = [m for m in meta if m["cls"] == "CLASSIC" and 1340000 <= m["canary"] <= 1370000]
print(f"OLD-кластер (CLASSIC canary 1340k-1370k): {len(old)} записей")
recent = old[-6:]
print("последние 6 визитов: "
      + ", ".join(f"{m['cid']} idx {m['idx']} canary {m['canary']} "
                  f"zzz {m['vals'].get('find/foxsearch/zzz-absent-zzz')} "
                  f"small {m['vals'].get('parse/foxjson/small')} "
                  f"corpus-all {m['vals'].get('parse/foxurl/corpus-all')} "
                  f"профиль {m['prof']:.4e}" for m in recent))
cans = [m["canary"] for m in old]
print(f"canary кластер {min(cans)}-{max(cans)} (Дельта "
      f"{(max(cans) - min(cans)) / min(cans) * 100.0:.2f}%)")
zzs = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in old]
print(f"zzz конверт кластера {min(zzs)}-{max(zzs)}")
profs = [m["prof"] for m in old]
print(f"профиль кластера {min(profs):.4e}-{max(profs):.4e}")
cas = [m["vals"]["parse/foxurl/corpus-all"] for m in old]
zone = [v for v in cas if 1180 <= v <= 1196]
print(f"corpus-all: зона 1180-1196 x{len(zone)}; выходы НИЖЕ: "
      f"{sorted(v for v in cas if v < 1180)}; выходы ВЫШЕ: "
      f"{sorted(v for v in cas if v > 1196)}")

# 2) копия-1 FAST подпись
fast_all = [m for m in meta if m["cls"] == "FAST"]
print(f"\nкопия-1 (idx 291, FAST 799720): FAST-записей в истории "
      f"{len(fast_all)}; canary FAST-кластер последних 5: "
      + ", ".join(f"{m['cid']} {m['canary']}" for m in fast_all[-5:]))
f = meta[291]
print(f"  подпись копии-1: zzz {f['vals'].get('find/foxsearch/zzz-absent-zzz')}, "
      f"small {f['vals'].get('parse/foxjson/small')}, "
      f"corpus-all {f['vals'].get('parse/foxurl/corpus-all')}, "
      f"профиль {f['prof']:.4e} [OLD] — FAST-хост с OLD-профилем "
      f"(прецедент 4eb8807 #283: canary 758270, corpus-all 578)")

# 3) анатомия против CLASSIC-якоря d70534f
anchor = next(m for m in meta if m["cid"] == "d70534f")
last = meta[292]
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
print(f"чистых OLD-визитов после якоря (canary INSIDE кластера): "
      f"{len(inside_chain)} — хвост: "
      + ", ".join(f"{m['cid']} {(m['canary'] - anchor['canary']) / anchor['canary'] * 100.0:+.2f}%"
                  for m in inside_chain[-6:]))
