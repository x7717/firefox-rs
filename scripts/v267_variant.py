#!/usr/bin/env python3
"""v267_variant.py — окно 279: точка #285 b1bf50c (зона-930, canary
1261019, профиль 5.3925e-05 [OLD-таг]). ВАРИАНТ-ПАРА vs 680b8e9
(idx 275, w266 ТИХИЙ ПАРИТЕТ) — ПЕРВОЕ same-host сравнение зоны-930
с самой собой после w275/w266 — решающий тест идентичности хоста
(прецедент w278: вариант-пара e990865 vs 3215b78 median 0.0 РОВНО,
spread 2.5 INSIDE, хост-идентичность доказана); cross-check vs
5ae02bc (idx 214, w215) — третий визит зоны-930. Ожидание: canary
+0.05% (1261019 vs 1260391), corpus-all 0.00% (930 vs 930), spread
INSIDE same-profile-коридора. Формулы = analyze.py (dual-formula)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data279.js").read_text()
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

last = meta[-1]                                        # b1bf50c idx 287


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


var1 = next(m for m in meta if m["cid"] == "680b8e9")   # idx 275 w266
var2 = next(m for m in meta if m["cid"] == "5ae02bc")   # idx 214 w215
m1 = deltas(last, var1, "ВАРИАНТ-ПАРА зона-930 vs w266")
m2 = deltas(last, var2, "CROSS-CHECK зона-930 vs w215")
print(f"\nвариант-медианы: {m1!r} / {m2!r} — в РЕЕСТР НЕ идут "
      f"(вариант-медиана в реестр НЕ идёт, урок w278)")
