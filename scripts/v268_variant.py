#!/usr/bin/env python3
"""v268_variant.py — окно 280: точка #286 b15f7d3 (MEDIUM, canary
1071072, профиль 7.2824e-05 [NEW-таг], corpus-all 1005, zzz 178332,
small 114) — подпись канонического MEDIUM-хоста. ВАРИАНТ-ПАРА vs
87ec41e (idx 268, GUARD-пара окна, ближайший same-host визит хоста) —
решающий тест идентичности хоста (прецедент w278: вариант-пара
e990865 vs 3215b78 median 0.0 РОВНО, spread 2.5 INSIDE; w279:
вариант-пара b1bf50c vs 680b8e9 median -0.18, spread 8.4, 25 нулей);
cross-check vs 45afa12 (idx 252, предыдущий визит хоста, итерация
244). Ожидание: canary +0.35% (1071072 vs 1067291), corpus-all
1005 vs 1000 = +0.50%, spread INSIDE узкого same-host диапазона
(наблюдаемый same-host MEDIUM-хоста ~2-9 п.п. по вариант-свидетельствам
w278/w279). Формулы = analyze.py (dual-formula)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data280.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "canary": c,
                 "cls": cls, "vals": vals})

last = meta[-1]                                        # b15f7d3 idx 288


def deltas(a, b, label):
    av, bv = a["vals"], b["vals"]
    d1, d2, names = [], [], []
    for name, v in av.items():
        p = bv.get(name)
        if p and v:
            d1.append((v - p) / p * 100.0)
            d2.append((v / p - 1.0) * 100.0)
            names.append(name)
    n = len(d1)
    d1s = sorted(d1)
    med = statistics.median(d1)
    rank = d1s.index(med) if med in d1s else None
    i10, i90 = int(n * 0.10), int(n * 0.90)
    spread = d1s[i90] - d1s[i10]
    cd = (a["canary"] - b["canary"]) / b["canary"] * 100.0
    zeros = [nm for x, nm in zip(d1, names) if x == 0.0]
    worst, wnm = 0.0, ""
    for x, y, nm in zip(d1, d2, names):
        if abs(x - y) > worst:
            worst, wnm = abs(x - y), nm
    print(f"\n== {label}: {a['cid']} (idx {a['idx']}) vs {b['cid']} "
          f"(idx {b['idx']}, distance {a['idx']-b['idx']}) ==")
    print(f"n={n} median {med!r} (rank [{rank}])"
          f" p10 {d1s[i10]!r} p90 {d1s[i90]!r} "
          f"spread {spread!r} -> {spread:.1f} п.п.")
    print(f"canary-vs-вариант {cd!r} -> {cd:+.2f}% "
          f"(cur {a['canary']} vs {b['canary']})")
    for k in ("parse/foxurl/corpus-all", "parse/foxjson/small",
              "find/foxsearch/zzz-absent-zzz", "parse/foxurl/11"):
        va, vb = av.get(k), bv.get(k)
        dd = (va - vb) / vb * 100.0 if (va and vb) else None
        print(f"  {k}: {va} vs {vb} -> {dd:+.2f}%" if dd is not None
              else f"  {k}: {va} vs {vb}")
    print(f"НУЛИ: {len(zeros)} {zeros[:12]}")
    print(f"FP DUAL-FORMULA max |f1-f2|: {worst!r} (worst {wnm})")
    return med


var1 = next(m for m in meta if m["cid"] == "87ec41e")   # idx 268 итерация 259
var2 = next(m for m in meta if m["cid"] == "45afa12")   # idx 252 итерация 244
m1 = deltas(last, var1, "ВАРИАНТ-ПАРА MEDIUM-хост vs итерация 259")
m2 = deltas(last, var2, "CROSS-CHECK MEDIUM-хост vs итерация 244")
print(f"\nвариант-медианы: {m1!r} / {m2!r} — в РЕЕСТР НЕ идут "
      f"(вариант-медиана в реестр НЕ идёт, урок w278)")
