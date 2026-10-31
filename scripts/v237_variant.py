#!/usr/bin/env python3
"""v237_variant.py — окно 249: ВАРИАНТ-ПАРА (bc328fa vs 6259040 idx 245 —
предыдущая FAST-запись), конверт find/foxsearch/zzz-absent-zzz по ВСЕМ
FAST-записям (обоснование флага +36.4% как локализованного хост-шума),
corpus-all FAST-записей, профиль exact. Формулы = analyze.py (dual-formula)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path(sys.argv[1] if len(sys.argv) > 1 else "scripts/data249.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    meta.append({"cid": r["commit"]["id"][:7], "canary": c, "cls": cls,
                 "vals": vals})

last = meta[-1]                      # bc328fa idx 257-я запись (idx 256, 0-based 256)
pair = next(m for m in meta if m["cid"] == "7de3903")   # idx 252 (1-based), кандидат
var = next(m for m in meta if m["cid"] == "6259040")    # idx 245 (1-based), вариант

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
    p10 = d1s[min(int(n * 0.10), n - 1)]
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

print("=== ПАРА bc328fa (idx 256) vs 7de3903 (idx 251) ===")
f = five(last["vals"], pair["vals"])
print(f"n={f['n']} median={f['med']!r} p10={f['p10']!r} p90={f['p90']!r}")
print(f"spread={f['spread']!r} canary-vs-пара={f['cd']!r} (cur {last['canary']} vs {pair['canary']})")
print(f"fp max |f1-f2|={f['worst']!r} (worst {f['wname']})")
print(f"НУЛИ {len(f['zeros'])}: {', '.join(f['zeros'])}")

print("\n=== ВАРИАНТ-ПАРА bc328fa (idx 256) vs 6259040 (idx 244) ===")
g = five(last["vals"], var["vals"])
print(f"n={g['n']} median={g['med']!r} p10={g['p10']!r} p90={g['p90']!r}")
print(f"spread={g['spread']!r} -> {g['spread']:.1f} п.п.")
print(f"canary-vs={g['cd']!r} -> {g['cd']:+.2f}% (cur {last['canary']} vs {var['canary']})")

print("\n=== find/foxsearch/zzz-absent-zzz конверт по ВСЕМ FAST-записям ===")
zz = []
for m in meta:
    if m["cls"] == "FAST":
        z = m["vals"].get("find/foxsearch/zzz-absent-zzz")
        if z:
            zz.append((z, m["cid"]))
zz.sort()
norm = [z for z, _ in zz if z < 300000]
patho = [z for z, _ in zz if z >= 300000]
print(f"FAST записей с zzz: {len(zz)}; нормальных (<300k): {len(norm)}, патологических (>=300k, 3-й хост): {len(patho)}")
print(f"нормальный конверт: min {min(norm)} ({next(c for z,c in zz if z==min(norm))}), "
      f"max {max(norm)} ({next(c for z,c in zz if z==max(norm))}), span {max(norm)/min(norm)!r}")
print(f"bc328fa zzz 148698 rank в нормальном конверте: {sum(1 for z in norm if z < 148698)+1}/{len(norm)}")
print(f"7de3903 zzz 109022 rank: {sum(1 for z in norm if z < 109022)+1}/{len(norm)}")
print(f"медиана нормального конверта: {statistics.median(norm)!r}")
print(f"bc328fa vs медиана: {(148698-statistics.median(norm))/statistics.median(norm)*100.0!r}%")
print(f"7de3903 vs медиана: {(109022-statistics.median(norm))/statistics.median(norm)*100.0!r}%")

print("\n=== corpus-all FAST-записи (последние) ===")
for m in meta:
    if m["cls"] == "FAST":
        pass
fast_idx = [i for i, m in enumerate(meta) if m["cls"] == "FAST"]
for i in fast_idx[-4:]:
    m = meta[i]
    print(f"запись {i+1} {m['cid']} canary={m['canary']} corpus-all={m['vals'].get('parse/foxurl/corpus-all')}")
ca_cur = last["vals"]["parse/foxurl/corpus-all"]
ca_prev = pair["vals"]["parse/foxurl/corpus-all"]
print(f"СЧЁТЧИК: {last['cid']} {ca_cur} vs {pair['cid']} {ca_prev} = "
      f"{(ca_cur-ca_prev)/ca_prev*100.0!r}%")

print("\n=== профиль exact (parse/foxurl/11 / canary) ===")
for nm, m in (("bc328fa", last), ("7de3903", pair), ("6259040", var)):
    v11 = m["vals"].get("parse/foxurl/11")
    print(f"{nm}: {v11}/{m['canary']} = {v11/m['canary']!r}")
