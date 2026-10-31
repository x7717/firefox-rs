#!/usr/bin/env python3
"""v241_variant.py — окно 253: точка #259 289a974 [FAST canary 718003].
ВАРИАНТ-ПАРА vs 6259040 (idx 244, предыдущая FAST-запись), конверт
find/foxsearch/zzz-absent-zzz по ВСЕМ FAST-записям (закрытие вопроса
w249/w250/w251 «хост-конверт или экстремум bc328fa»), corpus-all
FAST-записей, профиль exact, canary-vs-FAST-якорь 1c96db6. Формулы =
analyze.py (dual-formula)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path("scripts/data253.js").read_text()
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

last = meta[-1]                                        # 289a974 idx 261
pair = next(m for m in meta if m["cid"] == "bc328fa")   # idx 256, кандидат
var = next(m for m in meta if m["cid"] == "6259040")    # idx 244, вариант
anchor = next(m for m in meta if m["cid"] == "1c96db6")  # FAST-якорь


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
    ca, cb = prev["canary"], cur["canary"]
    cd = (cb - ca) / ca * 100.0
    print(f"=== {title} ===")
    print(f"n={n} median={med!r} p10={p10!r} p90={p90!r}")
    print(f"spread={p90-p10!r} canary-vs-пара={cd!r} (cur {cb} vs {ca})")
    print(f"НУЛИ {len(zeros)}: {', '.join(zeros)}")
    print(f"fp max |f1-f2|={worst!r} (worst {wname})")


five(last, pair, f"ПАРА {last['cid']} (idx {last['idx']}) vs {pair['cid']} (idx {pair['idx']})")
print()
five(last, var, f"ВАРИАНТ-ПАРА {last['cid']} vs {var['cid']} (idx {var['idx']})")
print()

# FAST-якорь
fa = anchor["canary"]
cd_anchor = (last["canary"] - fa) / fa * 100.0
print(f"canary-vs-FAST-якорь 1c96db6 ({fa}): {cd_anchor!r} -> {cd_anchor:+.2f}%")
print(f"FAST-коридор 568-795k: canary {last['canary']} INSIDE: {568000 <= last['canary'] <= 795000}")
print()

# zzz конверт по всем FAST
fasts = [m for m in meta if m["cls"] == "FAST" and m["vals"].get("find/foxsearch/zzz-absent-zzz")]
zzzs = [(m["cid"], m["vals"]["find/foxsearch/zzz-absent-zzz"]) for m in fasts]
norm = sorted(v for _, v in zzzs if v < 300000)
patho = sorted(v for _, v in zzzs if v >= 300000)
last_zzz = last["vals"]["find/foxsearch/zzz-absent-zzz"]
med_norm = statistics.median(norm)
print(f"=== find/foxsearch/zzz-absent-zzz конверт по ВСЕМ FAST-записям ===")
print(f"FAST записей с zzz: {len(zzzs)}; нормальных (<300k): {len(norm)}, "
      f"патологических (>=300k): {len(patho)}")
print(f"нормальный конверт: min {norm[0]} ({next(c for c,v in zzzs if v==norm[0])}), "
      f"max {norm[-1]} ({next(c for c,v in zzzs if v==norm[-1])}), "
      f"span {norm[-1]/norm[0]:.13f}")
rank = sum(1 for v in norm if v <= last_zzz)
print(f"289a974 zzz {last_zzz} rank в нормальном конверте: {rank}/{len(norm)}")
print(f"медиана нормального конверта: {med_norm!r}")
print(f"289a974 vs медиана: {(last_zzz-med_norm)/med_norm*100!r}%")
bc = pair["vals"]["find/foxsearch/zzz-absent-zzz"]
print(f"bc328fa zzz {bc} rank: {sum(1 for v in norm if v <= bc)}/{len(norm)} "
      f"(vs медиана {(bc-med_norm)/med_norm*100!r}%)")
print()

# corpus-all FAST-записей
print("=== corpus-all (parse/foxurl) FAST-записей ===")
fast_ca = [(m["cid"], m["vals"].get("parse/foxurl/corpus-all")) for m in fasts]
print(", ".join(f"{c} {v}" for c, v in fast_ca[-8:]))
last_ca = last["vals"].get("parse/foxurl/corpus-all")
print(f"289a974 corpus-all: {last_ca}")

# профиль exact
v11 = last["vals"].get("parse/foxurl/11")
print(f"\nпрофиль exact 289a974: {v11/last['canary']!r} = {v11}/{last['canary']}")
