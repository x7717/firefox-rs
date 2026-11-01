#!/usr/bin/env python3
"""v272_variant.py — окно 284: точка #293 0cb508b (idx 295, класс CLASSIC,
canary 1216790, профиль 5.8350e-05 [OLD-таг], corpus-all 963, zzz 336224,
small 118) — БЫСТРЫЙ ХОСТ семейства canary-1220k (canary-vs-якорь d70534f
-10.27%; прецеденты w217/w218: 5673db9 canary 1219985, w218 ДРЕЙФ exit 3).
ВАРИАНТ-ПАРА vs 5673db9 (idx 217, distance 78, w218 ДРЕЙФ exit 3) —
решающий тест идентичности хоста (прецедент w279: same-host сравнение
зоны-930 с самой собой spread 8.4 -> ХОСТ-ИДЕНТИЧНОСТЬ); CROSS-CHECK vs
23129b8 (idx 170, distance 125, corpus-all 963 vs 963 — ка-близнец);
расширенные same-form свидетели dd9c671 (idx 187) / b73b531 (idx 135) /
7e6ffe0 (idx 90); КОНТРАСТ зоны-930 (b1bf50c idx 287 / 680b8e9 idx 275) —
ожидание ШИРОКОГО разброса (другая форма хоста). Вариант-медианы в РЕЕСТР
НЕ идут (урок w278). Формулы = analyze.py (dual-formula f1/f2)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data284.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"idx": i, "cid": r["commit"]["id"][:7],
                 "canary": vals.get(CANARY), "vals": vals})

last = meta[295]
assert last["cid"] == "0cb508b" and last["canary"] == 1216790


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
    print(f"n={n} median {med!r} (rank [{rank}]) p10 {d1s[i10]!r} "
          f"p90 {d1s[i90]!r} spread {spread!r} -> {spread:.1f} п.п.")
    print(f"canary-vs-вариант {cd!r} -> {cd:+.2f}% "
          f"(cur {a['canary']} vs {b['canary']})")
    for k in ("parse/foxurl/corpus-all", "parse/foxjson/small",
              "find/foxsearch/zzz-absent-zzz", "parse/foxurl/11"):
        va, vb = av.get(k), bv.get(k)
        dd = (va - vb) / vb * 100.0 if (va and vb) else None
        print(f"  {k}: {va} vs {vb} -> {dd:+.2f}%" if dd is not None
              else f"  {k}: {va} vs {vb}")
    print(f"НУЛИ: {len(zeros)}")
    print(f"FP DUAL-FORMULA max |f1-f2|: {worst!r} (worst {wnm})")
    return med


v1 = next(m for m in meta if m["cid"] == "5673db9")    # idx 217 w218
v2 = next(m for m in meta if m["cid"] == "23129b8")    # idx 170
v3 = next(m for m in meta if m["cid"] == "dd9c671")    # idx 187
v4 = next(m for m in meta if m["cid"] == "b73b531")    # idx 135
v5 = next(m for m in meta if m["cid"] == "7e6ffe0")    # idx 90
c1 = next(m for m in meta if m["cid"] == "b1bf50c")    # idx 287 зона-930
c2 = next(m for m in meta if m["cid"] == "680b8e9")    # idx 275 зона-930
m1 = deltas(last, v1, "ВАРИАНТ-ПАРА canary-1220k vs w218")
m2 = deltas(last, v2, "CROSS-CHECK canary-1220k ка-близнец w171")
deltas(last, v3, "same-form свидетель w188")
deltas(last, v4, "same-form свидетель w136")
deltas(last, v5, "same-form свидетель w91")
deltas(last, c1, "КОНТРАСТ зона-930 w279 (ожидание ШИРОКОГО)")
deltas(last, c2, "КОНТРАСТ зона-930 w266 (ожидание ШИРОКОГО)")
print(f"\nвариант-медианы: {m1!r} / {m2!r} — в РЕЕСТР НЕ идут "
      f"(урок w278)")
