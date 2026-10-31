#!/usr/bin/env python3
"""v238_variant.py — окно 250: ПАРА (bca9f03 vs 6cc807d), ВАРИАНТ-ПАРА
bca9f03 vs b760fe9 (idx 248 — foxsearch-медленный OLD-хост, знаменатель
ДРЕЙФ-пары w245: 315784 = 1.77x нормальных) — проверка SAME
foxsearch-подписи; конверт foxsearch-семьи по ВСЕМ CLASSIC-записям
(foxsearch-дискриминатор: OLD-пул гетерогенен по foxsearch при
одинаком OLD-профиле); corpus-all CLASSIC-записей (закон хост x класс);
профиль exact. Формулы = analyze.py (dual-formula)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path(sys.argv[1] if len(sys.argv) > 1 else "scripts/data250.js").read_text()
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

last = meta[-1]                      # bca9f03 idx 258-я запись (idx 257, 0-based 257)
pair = next(m for m in meta if m["cid"] == "6cc807d")   # idx 255 (1-based), кандидат
var = next(m for m in meta if m["cid"] == "b760fe9")    # idx 248 (1-based), вариант


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


print("=== ПАРА bca9f03 (idx 257) vs 6cc807d (idx 255) ===")
f = five(last["vals"], pair["vals"])
print(f"n={f['n']} median={f['med']!r} p10={f['p10']!r} p90={f['p90']!r}")
print(f"spread={f['spread']!r} canary-vs-пара={f['cd']!r} (cur {last['canary']} vs {pair['canary']})")
print(f"fp max |f1-f2|={f['worst']!r} (worst {f['wname']})")
print(f"НУЛИ {len(f['zeros'])}: {', '.join(f['zeros'])}")

print("\n=== ВАРИАНТ-ПАРА bca9f03 (idx 257) vs b760fe9 (idx 248) ===")
g = five(last["vals"], var["vals"])
print(f"n={g['n']} median={g['med']!r} p10={g['p10']!r} p90={g['p90']!r}")
print(f"spread={g['spread']!r} -> {g['spread']:.1f} п.п.")
print(f"canary-vs={g['cd']!r} -> {g['cd']:+.2f}% (cur {last['canary']} vs {var['canary']})")
# foxsearch-семья vs b760fe9 (SAME foxsearch-подпись?)
for nm in ("find/foxsearch/zzz-absent-zzz", "find/foxsearch/Mozilla Corporation",
           "find/foxsearch/горячие пути",
           "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru"):
    a = last["vals"].get(nm)
    b = var["vals"].get(nm)
    if a and b:
        print(f"  {nm}: {a} vs {b} = {(a-b)/b*100.0:+.2f}%")

print("\n=== foxsearch-конверт (find/foxsearch/zzz-absent-zzz) по ВСЕМ CLASSIC-записям ===")
zz = []
for m in meta:
    if m["cls"] == "CLASSIC":
        z = m["vals"].get("find/foxsearch/zzz-absent-zzz")
        if z:
            zz.append((z, m["cid"]))
zz.sort()
norm = [z for z, _ in zz if z < 300000]
patho = [z for z, _ in zz if z >= 300000]
print(f"CLASSIC записей с zzz: {len(zz)}; нормальных (<300k): {len(norm)}, патологических (>=300k): {len(patho)}")
print(f"нормальный конверт: min {min(norm)} ({next(c for z,c in zz if z==min(norm))}), "
      f"max {max(norm)} ({next(c for z,c in zz if z==max(norm))}), span {max(norm)/min(norm)!r}")
print(f"медиана нормального конверта: {statistics.median(norm)!r}")
print(f"патологические (>=300k): {[(z,c) for z,c in zz if z>=300000]}")
print(f"bca9f03 zzz {last['vals'].get('find/foxsearch/zzz-absent-zzz')} vs медиана: "
      f"{(last['vals'].get('find/foxsearch/zzz-absent-zzz')-statistics.median(norm))/statistics.median(norm)*100.0!r}%")

print("\n=== corpus-all CLASSIC-записи (последние) ===")
classic_idx = [i for i, m in enumerate(meta) if m["cls"] == "CLASSIC"]
for i in classic_idx[-6:]:
    m = meta[i]
    print(f"запись {i+1} {m['cid']} canary={m['canary']} corpus-all={m['vals'].get('parse/foxurl/corpus-all')}")
ca_cur = last["vals"]["parse/foxurl/corpus-all"]
ca_prev = pair["vals"]["parse/foxurl/corpus-all"]
print(f"СЧЁТЧИК: {last['cid']} {ca_cur} vs {pair['cid']} {ca_prev} = "
      f"{(ca_cur-ca_prev)/ca_prev*100.0!r}%")

print("\n=== профиль exact (parse/foxurl/11 / canary) ===")
for nm, m in (("bca9f03", last), ("6cc807d", pair), ("b760fe9", var),
              ("d70534f", next(x for x in meta if x["cid"] == "d70534f"))):
    v11 = m["vals"].get("parse/foxurl/11")
    print(f"{nm}: {v11}/{m['canary']} = {v11/m['canary']!r}")
