#!/usr/bin/env python3
"""v235_variant.py — окно 247: ВАРИАНТ-ПАРА (b754ee8 vs 2a8f25e idx 250),
список нулей пары (b754ee8 vs ebf9480 idx 253), счётчик corpus-all,
кластер OLD-записей. Формулы = analyze.py (dual-formula)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path(sys.argv[1] if len(sys.argv) > 1 else "scripts/data247.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"cid": r["commit"]["id"][:7], "canary": vals.get(CANARY),
                 "vals": vals})

last = meta[-1]                      # b754ee8 idx 254
den_pair = meta[253]                 # ebf9480 idx 253 (пара)
den_var = meta[250]                  # 2a8f25e idx 250 (ВАРИАНТ)

def five(cur, prev):
    d1, d2, names = [], [], []
    for name, v in cur.items():
        p = prev.get(name)
        if not p or not v:
            continue
        d1.append((v - p) / p * 100.0)
        d2.append((v / p - 1.0) * 100.0)
        names.append(name)
    n = len(d1)
    d1s = sorted(d1)
    med = statistics.median(d1)
    p10 = d1s[int(n * 0.10)]
    p90 = d1s[min(int(n * 0.90), n - 1)]
    zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
    worst, wname = 0.0, ""
    for a, b, nm in zip(d1, d2, names):
        if abs(a - b) > worst:
            worst, wname = abs(a - b), nm
    ca, cb = prev[CANARY], cur[CANARY]
    cd = (cb - ca) / ca * 100.0
    return dict(n=n, med=med, p10=p10, p90=p90, spread=p90 - p10,
                zeros=zeros, worst=worst, wname=wname, cd=cd)

print("=== ПАРА b754ee8 (idx 254) vs ebf9480 (idx 253) ===")
f = five(last["vals"], den_pair["vals"])
print(f"n={f['n']} median={f['med']!r} p10={f['p10']!r} p90={f['p90']!r}")
print(f"spread={f['spread']!r} canary-vs-пара={f['cd']!r} (cur {last['canary']} vs {den_pair['canary']})")
print(f"fp max |f1-f2|={f['worst']!r} (worst {f['wname']})")
print(f"НУЛИ {len(f['zeros'])}: {', '.join(f['zeros'])}")

print("\n=== ВАРИАНТ-ПАРА b754ee8 (idx 254) vs 2a8f25e (idx 250) ===")
g = five(last["vals"], den_var["vals"])
print(f"n={g['n']} median={g['med']!r} p10={g['p10']!r} p90={g['p90']!r}")
print(f"spread={g['spread']!r} -> {g['spread']:.1f} п.п.")
print(f"canary-vs={g['cd']!r} -> {g['cd']:+.2f}% (cur {last['canary']} vs {den_var['canary']})")

print("\n=== corpus-all (parse/foxurl/corpus-all) последние OLD-записи ===")
for i in (249, 250, 253, 254):
    m = meta[i]
    print(f"idx {i} {m['cid']} canary={m['canary']} corpus-all={m['vals'].get('parse/foxurl/corpus-all')}")
ca_cur = last["vals"]["parse/foxurl/corpus-all"]
ca_prev = den_pair["vals"]["parse/foxurl/corpus-all"]
print(f"СЧЁТЧИК: {last['cid']} {ca_cur} vs {den_pair['cid']} {ca_prev} = "
      f"{(ca_cur-ca_prev)/ca_prev*100.0!r}%")

print("\n=== ALL corpus-all HISTORY 255 records (unique tail) ===")
seen = []
for i, m in enumerate(meta):
    v = m["vals"].get("parse/foxurl/corpus-all")
    if 1170 <= (v or 0) <= 1200:
        seen.append((i, m["cid"], v, m["canary"]))
for row in seen:
    print(row)
