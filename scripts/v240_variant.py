#!/usr/bin/env python3
"""v240_variant.py — окно 252: кросс-проверка каноничности точки #258
(f27086a). ВАРИАНТ-ПАРА f27086a vs 6cc807d (idx 255, последняя
foxsearch-нормальная CLASSIC-запись перед bca9f03-экстремумом);
КРОС-ДЕЛЬТЫ f27086a vs bca9f03 (foxsearch-медленный хост, ожидание
зеркала w250/251: f27086a — числитель нормальный, bca9f03 —
знаменатель/числитель foxsearch-медленный). Формулы = analyze.py."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data252.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"cid": r["commit"]["id"][:7], "vals": vals})

last = meta[-1]                                    # f27086a
var = next(m for m in meta if m["cid"] == "6cc807d")
slow = next(m for m in meta if m["cid"] == "bca9f03")


def five(cur, prev):
    d1, d2, names = [], [], []
    for name, v in cur.items():
        p = prev.get(name)
        if p and v:
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
    ca, cb = prev.get(CANARY), cur.get(CANARY)
    cd = (cb - ca) / ca * 100.0
    print(f"  n={n} median {med!r}, p10 {p10!r}, p90 {p90!r}, "
          f"spread {p90-p10!r} -> {p90-p10:.1f} п.п.")
    print(f"  canary-vs: {cd!r} -> {cd:+.2f}% (cur {cb} vs {ca})")
    print(f"  нулей {len(zeros)}; fp max |f1-f2| {worst!r} (worst {wname})")
    fam = [(nm, a) for a, nm in zip(d1, names) if "/foxsearch/" in nm]
    print(f"  foxsearch-семья: {len(fam)} bench, min {min(a for _,a in fam):.2f}, "
          f"max {max(a for _,a in fam):.2f}, zzz "
          f"{next(a for nm,a in fam if 'zzz' in nm):.2f}")


print("ВАРИАНТ-ПАРА f27086a vs 6cc807d (idx 255):")
five(last["vals"], var["vals"])
print()
print("КРОС-ДЕЛЬТЫ f27086a vs bca9f03 (foxsearch-медленный):")
five(last["vals"], slow["vals"])
