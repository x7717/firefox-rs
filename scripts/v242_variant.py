#!/usr/bin/env python3
"""v242_variant.py — окно 254: точка #260 763e4a5 [CLASSIC canary 1358968].
ВАРИАНТ-ПАРА vs f3a9631 (idx 259, #257-copy2 — CLASSIC перед f27086a),
cross-check каноничности с обеих сторон; CLASSIC-коридор spread 2.2..4.5
(same-profile, урок 229); corpus-all CLASSIC-записей (закон хост x класс);
профиль exact; canary-vs-CLASSIC-якорь d70534f. Формулы = analyze.py
(dual-formula)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path("scripts/data254.js").read_text()
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

last = meta[-1]                                        # 763e4a5 idx 262
pair = next(m for m in meta if m["cid"] == "f27086a")   # idx 260, кандидат
var = next(m for m in meta if m["cid"] == "f3a9631")    # первая копия idx 258? -> берём последнюю
# f3a9631 дубль: берём копию СРАЗУ ПЕРЕД f27086a (idx 259, #257-copy2)
cand = [m for m in meta if m["cid"] == "f3a9631"]
var = cand[-1]
anchor = next(m for m in meta if m["cid"] == "d70534f")  # CLASSIC-якорь


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
    print(f"CLASSIC-коридор 2.2..4.5 (same-profile): spread "
          f"{p90-p10:.13f} INSIDE: {2.2 <= p90-p10 <= 4.5}")


five(last, pair, f"ПАРА {last['cid']} (idx {last['idx']}) vs {pair['cid']} (idx {pair['idx']})")
print()
five(last, var, f"ВАРИАНТ-ПАРА {last['cid']} vs {var['cid']} (idx {var['idx']})")
print()

# CLASSIC-якорь
fa = anchor["canary"]
cd_anchor = (last["canary"] - fa) / fa * 100.0
print(f"canary-vs-CLASSIC-якорь d70534f ({fa}): {cd_anchor!r} -> {cd_anchor:+.2f}%")
print()

# профиль exact + OLD-коридор
v11 = last["vals"].get("parse/foxurl/11")
prof = v11 / last["canary"]
print(f"профиль exact {last['cid']}: {prof!r} = {v11}/{last['canary']}")
print(f"OLD-коридор 5.25-5.91e-05: INSIDE {5.25e-05 <= prof <= 5.91e-05}; "
      f"NEW-порог 6.55e-05: {prof >= 6.55e-05}")
pf = pair["vals"].get("parse/foxurl/11") / pair["canary"]
print(f"профиль пары {pair['cid']}: {pf!r} — SAME-PROFILE Δ {(prof-pf)/pf*100!r}%")
print()

# corpus-all CLASSIC-записей (закон хост x класс)
print("=== corpus-all (parse/foxurl) CLASSIC-записей (последние 10) ===")
classics = [m for m in meta if m["cls"] == "CLASSIC"]
ca_list = [(m["cid"], m["vals"].get("parse/foxurl/corpus-all")) for m in classics]
print(", ".join(f"{c} {v}" for c, v in ca_list[-10:]))
last_ca = last["vals"].get("parse/foxurl/corpus-all")
print(f"{last['cid']} corpus-all: {last_ca}")
print()

# zzz CLASSIC-конверт
zzz_name = "find/foxsearch/zzz-absent-zzz"
zzzs = [(m["cid"], m["vals"].get(zzz_name)) for m in classics
        if m["vals"].get(zzz_name)]
norm = sorted(v for _, v in zzzs if v < 300000)
patho = sorted(v for _, v in zzzs if v >= 300000)
last_zzz = last["vals"].get(zzz_name)
med_norm = statistics.median(norm)
print(f"=== {zzz_name} конверт по CLASSIC-записям ===")
print(f"CLASSIC записей с zzz: {len(zzzs)}; нормальных (<300k): {len(norm)}, "
      f"патологических (>=300k): {len(patho)}")
print(f"нормальный конверт: min {norm[0]}, max {norm[-1]}, медиана {med_norm!r}")
rank = sum(1 for v in norm if v <= last_zzz)
print(f"{last['cid']} zzz {last_zzz} rank: {rank}/{len(norm)} "
      f"(vs медиана {(last_zzz-med_norm)/med_norm*100!r}%)")
