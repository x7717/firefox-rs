#!/usr/bin/env python3
"""v239_variant.py — окно 251: САМОПАРА-ДУБЛЬ (f3a9631 copy2 vs copy1 —
два Store-прогона одного коммита: schedule-run bca9f03 Store 10:22:10Z +
push-Benchmark Store 10:32:36Z, один раннер), ВАРИАНТ-ПАРА f3a9631 vs
6cc807d (последняя foxsearch-нормальная CLASSIC-запись, idx 255),
кросс-дельты f3a9631 vs bca9f03 (foxsearch-нормальный vs
foxsearch-медленный — зеркало w250 в обратную сторону), foxsearch-конверт
проверка точки. Формулы = analyze.py (dual-formula)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path(sys.argv[1] if len(sys.argv) > 1 else "scripts/data251.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    meta.append({"cid": r["commit"]["id"][:7], "date": r["date"], "cls": cls,
                 "vals": vals})

last = meta[-1]          # f3a9631 copy2 (push-Store 10:32:36Z)
dupe = next(m for m in meta if m["cid"] == "f3a9631" and m is not last)
var = next(m for m in meta if m["cid"] == "6cc807d")    # idx 255, 1-based
slow = next(m for m in meta if m["cid"] == "bca9f03")   # idx 257, 1-based


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


print("=== САМОПАРА-ДУБЛЬ f3a9631 copy2 (idx 259) vs copy1 (idx 258) ===")
print(f"copy1 date={dupe['date']} copy2 date={last['date']}")
f = five(last["vals"], dupe["vals"])
print(f"n={f['n']} median={f['med']!r} p10={f['p10']!r} p90={f['p90']!r}")
print(f"spread={f['spread']!r} canary-vs={f['cd']!r} (cur {last['vals'][CANARY]} vs {dupe['vals'][CANARY]})")
print(f"fp max |f1-f2|={f['worst']!r} (worst {f['wname']})")
print(f"НУЛИ {len(f['zeros'])}: {', '.join(f['zeros'])}")
mx = max(((abs((last['vals'][k]-dupe['vals'][k])/dupe['vals'][k]*100.0), k)
          for k in last['vals'] if last['vals'].get(k) and dupe['vals'].get(k)))
print(f"MAX |delta| по всем 75: {mx[0]!r}% ({mx[1]})")

print("\n=== ВАРИАНТ-ПАРА f3a9631 (idx 259) vs 6cc807d (idx 255) ===")
g = five(last["vals"], var["vals"])
print(f"n={g['n']} median={g['med']!r} p10={g['p10']!r} p90={g['p90']!r}")
print(f"spread={g['spread']!r} -> {g['spread']:.1f} п.п.")
print(f"canary-vs={g['cd']!r} -> {g['cd']:+.2f}% (cur {last['vals'][CANARY]} vs {var['vals'][CANARY]})")

print("\n=== КРОСС-ДЕЛЬТЫ f3a9631 vs bca9f03 (нормальный vs медленный) ===")
h = five(last["vals"], slow["vals"])
print(f"median={h['med']!r} p10={h['p10']!r} p90={h['p90']!r}")
print(f"spread={h['spread']!r} canary-vs={h['cd']!r} (cur {last['vals'][CANARY]} vs {slow['vals'][CANARY]})")
for nm in ("find/foxsearch/zzz-absent-zzz", "find/foxsearch/Mozilla Corporation",
           "find/foxsearch/горячие пути", "multi/naive-fox/2",
           "multi/naive-fox/4", "multi/naive-std/2"):
    a = last["vals"].get(nm)
    b = slow["vals"].get(nm)
    if a and b:
        print(f"  {nm}: {a} vs {b} = {(a-b)/b*100.0:+.2f}%")

print("\n=== foxsearch-конверт: позиция точки #257 ===")
zz = sorted((m["vals"].get("find/foxsearch/zzz-absent-zzz"), m["cid"])
            for m in meta if m["cls"] == "CLASSIC"
            and m["vals"].get("find/foxsearch/zzz-absent-zzz"))
norm = [z for z, _ in zz if z < 300000]
print(f"CLASSIC с zzz: {len(zz)}, нормальных: {len(norm)}")
print(f"f3a9631 zzz {last['vals']['find/foxsearch/zzz-absent-zzz']} rank в нормальном конверте: "
      f"{sum(1 for z in norm if z < last['vals']['find/foxsearch/zzz-absent-zzz'])+1}/{len(norm)} "
      f"(медиана {statistics.median(norm)!r})")

print("\n=== corpus-all и профиль (три записи + якорь) ===")
for nm, m in (("f3a9631 c2", last), ("f3a9631 c1", dupe), ("6cc807d", var),
              ("bca9f03", slow),
              ("d70534f", next(x for x in meta if x["cid"] == "d70534f"))):
    v11 = m["vals"].get("parse/foxurl/11")
    ca = m["vals"].get("parse/foxurl/corpus-all")
    cn = m["vals"][CANARY]
    print(f"{nm}: canary={cn} corpus-all={ca} профиль={v11/cn:.4e}")
