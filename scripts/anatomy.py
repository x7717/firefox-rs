#!/usr/bin/env python3
"""anatomy.py — анатомия последней точки против якоря d70534f (CLASSIC-эра).
Запуск: python3 scripts/anatomy.py [data214.js]"""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
ANCHOR_CID = "d70534f"
PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
              ("/foxsearch/", "/std/")]


def partner(name):
    for a, b in PAIR_RULES:
        if a in name:
            return name.replace(a, b, 1)
    return None


raw = Path(sys.argv[1] if len(sys.argv) > 1 else "scripts/data214.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"cid": r["commit"]["id"][:7], "vals": vals})

anchor = next(m for m in meta if m["cid"] == ANCHOR_CID)
last = meta[-1]
ca, cb = anchor["vals"][CANARY], last["vals"][CANARY]
print(f"якорь {ANCHOR_CID} canary={ca}, точка {last['cid']} canary={cb}")
print(f"canary-vs-якорь: {(cb-ca)/ca*100.0!r} -> {(cb-ca)/ca*100.0:+.2f}%")

d1, names = [], []
for name, v in last["vals"].items():
    p = anchor["vals"].get(name)
    if not p or not v:
        continue
    d1.append((v - p) / p * 100.0)
    names.append(name)
ds = sorted(d1)
n = len(ds)
med = statistics.median(ds)
p10, p90 = ds[int(n * 0.10)], ds[min(int(n * 0.90), n - 1)]
breaks = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"n={n}: median {med!r}, p10 {p10!r}, p90 {p90!r}, "
      f"spread {p90-p10!r} -> {p90-p10:.1f} п.п.")
print(f"пробоев (>20%): {len(breaks)}; нулей: {len(zeros)} {zeros}")
srt = sorted(zip(d1, names))
print("min 4 против якоря: " + "; ".join(f"{nm} {a:+.1f}" for a, nm in srt[:4]))
print("top 5 против якоря: " + "; ".join(f"{nm} {a:+.1f}" for a, nm in srt[-5:]))

ratios = []
for name, v in last["vals"].items():
    prt = partner(name)
    if not prt:
        continue
    lf, lr = v, last["vals"].get(prt)
    af, ar = anchor["vals"].get(name), anchor["vals"].get(prt)
    if lf and lr and af and ar:
        ratios.append((name.split("/")[1], (lf / lr) / (af / ar)))
rmed = {}
for crate in sorted({c for c, _ in ratios}):
    dd = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
    rmed[crate] = statistics.median(dd)
print("ОТНОШЕНИЯ против якоря: "
      + " | ".join(f"{c} {v:+.2f}" for c, v in sorted(rmed.items())))
