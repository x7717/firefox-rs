#!/usr/bin/env python3
"""v311_f2.py — exact-f2 прогон (вариант f2 = (v/pv-1)*100 для median/p10/p90/
spread) ДО машины — часть пре-регистрации окна 311."""
import json
import re
import statistics
from pathlib import Path

raw = Path("scripts/data311.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
last_vals = {b["name"]: b["value"] for b in runs[330]["benches"]}
pair_vals = {b["name"]: b["value"] for b in runs[329]["benches"]}

d2 = []
for name, v in last_vals.items():
    pv = pair_vals.get(name)
    if not pv or not v:
        continue
    d2.append((v / pv - 1.0) * 100.0)
s = sorted(d2)
nd = len(s)
med = statistics.median(s)
p10 = s[int(nd * 0.10)]
p90 = s[min(int(nd * 0.90), nd - 1)]
print(f"f2 n={nd}")
print(f"f2 MEDIAN {med!r} rank[{s.index(med)}]")
print(f"f2 P10 {p10!r} (rank[{s.index(p10)}])")
print(f"f2 P90 {p90!r} (rank[{s.index(p90)}])")
print(f"f2 SPREAD {p90 - p10!r}")
