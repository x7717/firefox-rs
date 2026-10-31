#!/usr/bin/env python3
"""v243_variant.py — окно 255: точка #261 e24e80f [MEDIUM canary 992228,
OLD-профиль 5.745e-05]. ПАРА (GUARD) vs 45afa12 (idx 252, NEW-профиль
7.203e-05) — КРОСС-ПРОФИЛЬ (урок 229: коридоры валидны только
same-profile); ВАРИАНТ-ПАРА vs b760fe9 (idx 248, ближайшая OLD-профиль
MEDIUM) — same-profile кросс-чек каноничности; пул MEDIUM OLD/NEW;
corpus-all и zzz кластеры по профилям. Формулы = analyze.py
(dual-formula)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path("scripts/data255.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    v11 = vals.get("parse/foxurl/11")
    prof = v11 / c if c and v11 else None
    tag = ("OLD" if prof < 6.0e-05 else "NEW") if prof else "?"
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "canary": c,
                 "cls": cls, "prof": prof, "tag": tag, "vals": vals})

last = meta[-1]                                        # e24e80f idx 263
pair = next(m for m in meta if m["cid"] == "45afa12")   # idx 252, GUARD (NEW)
var = next(m for m in meta if m["cid"] == "b760fe9")    # idx 248, OLD-вариант


def five(cur, prev, title):
    d1, d2, names = [], [], []
    for name, v in cur["vals"].items():
        p = prev["vals"].get(name)
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
    flags = [(nm, a) for a, nm in zip(d1, names) if abs(a) > 20.0]
    ca_, cb_ = prev["canary"], cur["canary"]
    cd = (cb_ - ca_) / ca_ * 100.0
    print(f"=== {title} ===")
    print(f"n={n} median={med!r} p10={p10!r} p90={p90!r}")
    print(f"spread={p90-p10!r} canary-vs-пара={cd!r} (cur {cb_} vs {ca_})")
    print(f"НУЛИ {len(zeros)}: {', '.join(zeros) if zeros else 'нет'}")
    print(f"ФЛАГОВ {len(flags)}: {', '.join(f'{nm} {a:+.1f}' for nm, a in flags) if flags else '0'}")
    print(f"fp max |f1-f2|={worst!r} (worst {wname})")
    print(f"профили: cur {cur['tag']} {cur['prof']*1e5:.4f}e-05 / prev {prev['tag']} "
          f"{prev['prof']*1e5:.4f}e-05 -> {'SAME-PROFILE' if cur['tag']==prev['tag'] else 'CROSS-PROFILE'}")
    return med, p10, p90, len(flags)


five(last, pair, f"ПАРА (GUARD) {last['cid']} (idx {last['idx']}) vs {pair['cid']} (idx {pair['idx']})")
print()
five(last, var, f"ВАРИАНТ-ПАРА {last['cid']} vs {var['cid']} (idx {var['idx']})")
print()

# пул MEDIUM
print("=== пул MEDIUM (OLD/NEW профили) ===")
meds = [m for m in meta if m["cls"] == "MEDIUM"]
olds = [m for m in meds if m["tag"] == "OLD"]
news = [m for m in meds if m["tag"] == "NEW"]
print(f"MEDIUM записей: {len(meds)}; OLD-профиль: {len(olds)}, NEW-профиль: {len(news)}")
print("OLD-MEDIUM (все):", ", ".join(f"idx{m['idx']} {m['cid']} {m['canary']}" for m in olds))
oc = sorted(m["canary"] for m in olds)
nc = sorted(m["canary"] for m in news)
print(f"OLD canary кластер: {oc[0]}-{oc[-1]} (медиана {statistics.median(oc)!r})")
print(f"NEW canary кластер: {nc[0]}-{nc[-1]} (медиана {statistics.median(nc)!r})")
print(f"e24e80f canary {last['canary']} INSIDE OLD-кластера: {oc[0] <= last['canary'] <= oc[-1]}")
print()

# corpus-all по профилям
print("=== corpus-all (parse/foxurl) MEDIUM по профилям ===")
oca = sorted(m["vals"].get("parse/foxurl/corpus-all") or 0 for m in olds)
nca = sorted(m["vals"].get("parse/foxurl/corpus-all") or 0 for m in news)
last_ca = last["vals"].get("parse/foxurl/corpus-all")
print(f"OLD corpus-all кластер: {oca[0]}-{oca[-1]} (медиана {statistics.median(oca)!r})")
print(f"NEW corpus-all кластер: {nca[0]}-{nca[-1]} (медиана {statistics.median(nca)!r})")
print(f"e24e80f corpus-all {last_ca} INSIDE OLD-кластера: {oca[0] <= last_ca <= oca[-1]}")
print()

# zzz по профилям
zzz_name = "find/foxsearch/zzz-absent-zzz"
ozzz = sorted(m["vals"].get(zzz_name) or 0 for m in olds)
nzzz = sorted(m["vals"].get(zzz_name) or 0 for m in news)
last_zzz = last["vals"].get(zzz_name)
print(f"=== {zzz_name} MEDIUM по профилям ===")
print(f"OLD zzz кластер: {ozzz[0]}-{ozzz[-1]} (медиана {statistics.median(ozzz)!r})")
print(f"NEW zzz кластер: {nzzz[0]}-{nzzz[-1]} (медиана {statistics.median(nzzz)!r})")
rank = sum(1 for v in ozzz if v <= last_zzz)
print(f"e24e80f zzz {last_zzz} rank OLD-кластера: {rank}/{len(ozzz)}")
print(f"vs OLD-медиана: {(last_zzz-statistics.median(ozzz))/statistics.median(ozzz)*100!r}%")
print()

# профиль exact
print(f"профиль exact e24e80f: {last['prof']!r} = "
      f"{last['vals'].get('parse/foxurl/11')}/{last['canary']}")
print(f"OLD-коридор 5.25-5.91e-05: INSIDE {5.25e-05 <= last['prof'] <= 5.91e-05}")
pv = var["prof"]
print(f"профиль варианта b760fe9: {pv!r} — Δ {(last['prof']-pv)/pv*100!r}%")
