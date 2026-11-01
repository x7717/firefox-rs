#!/usr/bin/env python3
"""v258_anatomy.py — окно 270: анатомия точки #276 f800b14 против
CLASSIC-якоря d70534f (штатный якорь, canary 1356121). Формулы = analyze.
min4/top5, пробои >20%, нули, отношения против якоря."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data270.js"

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

last = meta[-1]
anchor = next(m for m in meta if m["cid"] == "d70534f")
lv, av = last["vals"], anchor["vals"]

d1, names = [], []
for name, v in lv.items():
    p = av.get(name)
    if p and v:
        d1.append((v - p) / p * 100.0)
        names.append(name)
n = len(d1)
d1s = sorted(d1)
med = statistics.median(d1)
p10 = d1s[int(n * 0.10)]
p90 = d1s[min(int(n * 0.90), n - 1)]
spread = p90 - p10

print(f"якорь d70534f canary={anchor['canary']}, "
      f"точка {last['cid']} canary={last['canary']}")
cda = (last["canary"] - anchor["canary"]) / anchor["canary"] * 100.0
print(f"canary-vs-якорь: {cda!r} -> {cda:+.2f}%")
print(f"n={n}: median {med!r}, p10 {p10!r}, p90 {p90!r}, "
      f"spread {spread!r} -> {spread:.1f} п.п.")
breaches = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"пробоев (>20%): {len(breaches)}; нулей: {len(zeros)} {zeros}")
pairs = sorted(zip(d1, names))
mn = "; ".join(f"{nm} {a:+.1f}" for a, nm in pairs[:4])
tp = "; ".join(f"{nm} {a:+.1f}" for a, nm in pairs[-5:])
print(f"min 4 против якоря: {mn}")
print(f"top 5 против якоря: {tp}")

PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
              ("/foxsearch/", "/std/")]
def std_partner(name):
    for a, b in PAIR_RULES:
        if a in name:
            return name.replace(a, b, 1)
    return None
ratios = []
for name, v in lv.items():
    partner = std_partner(name)
    av_p = av.get(partner) if partner else None
    avv = av.get(name)
    if not (partner and av_p and avv and v and name in av):
        continue
    ratios.append((name.split("/")[1],
                   (v / avv) / (lv[partner] / av_p)))
rmed = {}
for crate in sorted({c for c, _ in ratios}):
    ds = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
    if ds:
        rmed[crate] = statistics.median(ds)
print("ОТНОШЕНИЯ против якоря: "
      + " | ".join(f"{c} {rmed[c]:+.2f}" for c in sorted(rmed)))
