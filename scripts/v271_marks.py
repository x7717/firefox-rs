#!/usr/bin/env python3
"""v271_marks.py — окно 283: маркеры MEDIUM-хоста для точки #292
(f92d0dd, idx 294, canary 1070321) + анатомия против MEDIUM-якоря
87ec41e + реестр зон corpus-all MEDIUM-записей + кластер канонической
MEDIUM-формы. Подпись MEDIUM-хоста: canary кластер ~1061-1074k, zzz
недавний конверт 178.1-179.4k, small ~114 (канон), профиль NEW
7.08-7.53e-05; corpus-all MEDIUM-зона ~1000 (976-1014 недавние)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data283.js"

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

# 1) канонический MEDIUM-кластер: canary 1061k-1075k (форма окна 280)
med = [m for m in meta if m["cls"] == "MEDIUM" and 1061000 <= m["canary"] <= 1075000]
print(f"MEDIUM-кластер (canary 1061k-1075k): {len(med)} записей")
recent = med[-7:]
print("последние 7 визитов: "
      + ", ".join(f"{m['cid']} idx {m['idx']} canary {m['canary']} "
                  f"zzz {m['vals'].get('find/foxsearch/zzz-absent-zzz')} "
                  f"small {m['vals'].get('parse/foxjson/small')} "
                  f"corpus-all {m['vals'].get('parse/foxurl/corpus-all')} "
                  f"профиль {m['prof']:.4e}" for m in recent))
cans = [m["canary"] for m in med]
print(f"canary кластер {min(cans)}-{max(cans)} (Дельта "
      f"{(max(cans) - min(cans)) / min(cans) * 100.0:.2f}%)")
smalls = [m["vals"]["parse/foxjson/small"] for m in med[-10:]]
print(f"small последних 10 MEDIUM-визитов: {smalls}")
zzs = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in med[-10:]]
print(f"zzz конверт последних 10: {min(zzs)}-{max(zzs)}")
cas = [m["vals"]["parse/foxurl/corpus-all"] for m in med[-10:]]
print(f"corpus-all последних 10: {cas}")
profs = [m["prof"] for m in med[-10:]]
print(f"профиль конверт последних 10: {min(profs):.4e}-{max(profs):.4e}")

# 2) реестр зон corpus-all MEDIUM-записей (дискриминатор хоста)
buckets = {"MEDIUM ~1000 (976-1035)": 0, "др.": 0}
for m in meta:
    if m["cls"] != "MEDIUM":
        continue
    ca = m["vals"].get("parse/foxurl/corpus-all")
    if 976 <= ca <= 1035:
        buckets["MEDIUM ~1000 (976-1035)"] += 1
    else:
        buckets["др."] += 1
print(f"\nреестр зон corpus-all MEDIUM-записей: {buckets}")
canon_ca = [m["vals"]["parse/foxurl/corpus-all"] for m in med]
print(f"корпус MEDIUM-кластера: ядро 976-1014 = "
      f"{sum(1 for v in canon_ca if 976 <= v <= 1014)}, выше 1014 = "
      f"{sorted(v for v in canon_ca if v > 1014)}")

# 3) анатомия против MEDIUM-якоря 87ec41e
anchor = next(m for m in meta if m["cid"] == "87ec41e")
last = meta[294]
lv, pv = last["vals"], anchor["vals"]
cd = (last["canary"] - anchor["canary"]) / anchor["canary"] * 100.0
d1 = [(v - pv[k]) / pv[k] * 100.0 for k, v in lv.items() if pv.get(k) and v]
n = len(d1)
s = sorted(d1)
meda = statistics.median(d1)
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
print(f"\nАНАТОМИЯ против MEDIUM-якоря 87ec41e (idx {anchor['idx']}): "
      f"canary {cd:+.2f}% {'INSIDE' if abs(cd) <= 2.0 else 'OUTSIDE'}, "
      f"median {meda!r}, p10 {p10!r}, p90 {p90!r}, spread {p90 - p10:.1f}, "
      f"{zeros} нулей, {len(flags)} флагов, отношения "
      + " / ".join(f"{c} {rmed[c]:+.2f}" for c in sorted(rmed)))
inside_chain = [m for m in meta[anchor["idx"] + 1:]
                if m["cls"] == "MEDIUM" and 1061000 <= m["canary"] <= 1075000]
print(f"последние MEDIUM-визиты против якоря (canary %): "
      + ", ".join(f"{m['cid']} {(m['canary'] - anchor['canary']) / anchor['canary'] * 100.0:+.2f}%"
                  for m in inside_chain[-7:]))
