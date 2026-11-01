#!/usr/bin/env python3
"""v262_variant.py — окно 274: точка #280 fd7e926 [класс FAST canary
744950 INSIDE FAST-коридора 568-795k — ПРОГНОЗ РОТАЦИИ ОКНА 273 СБЫЛСЯ:
FAST после ТРИНАДЦАТИ CLASSIC подряд; FAST-пул ГОМОГЕННЫЙ OLD — при
OLD-профиле ПАРИТЕТ-форма same-host, урок 229]. ПАРА vs 289a974 (idx
261, кандидат по урокам 198/204 — БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА FAST;
distance 21, между 20 записей ВСЕ не-FAST — кросс-записная пара,
прецедент w253); ВАРИАНТ-ПАРА vs bc328fa (idx 256, прецедент-пара
w253, преемственность внутри FAST-кластера), cross-check каноничности;
FAST-коридор spread 3.0..14.0 (прецедент w253: 8.9 п.п. INSIDE);
corpus-all FAST-записей (закон хост x класс, кластер 569-703);
профиль exact; canary-vs-FAST-якорь 1c96db6. Формулы =
analyze.py (dual-formula)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path("scripts/data274.js").read_text()
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

last = meta[-1]                                        # fd7e926 idx 282
pair = next(m for m in meta if m["cid"] == "289a974")   # idx 261, GUARD FAST
cand = [m for m in meta if m["cid"] == "bc328fa"]
var = cand[-1]                                          # idx 256, прецедент w253
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
    print(f"FAST-коридор 3.0..14.0 (прецедент w253): spread "
          f"{p90-p10:.13f} INSIDE: {3.0 <= p90-p10 <= 14.0}")


five(last, pair, f"ПАРА {last['cid']} (idx {last['idx']}) vs "
                 f"{pair['cid']} (idx {pair['idx']})")
print()
five(last, var, f"ВАРИАНТ-ПАРА {last['cid']} vs {var['cid']} "
                f"(idx {var['idx']})")
print()

fa = anchor["canary"]
cd_anchor = (last["canary"] - fa) / fa * 100.0
print(f"canary-vs-FAST-якорь 1c96db6 ({fa}): {cd_anchor!r} -> "
      f"{cd_anchor:+.2f}%")
print()

v11 = last["vals"].get("parse/foxurl/11")
prof = v11 / last["canary"]
print(f"профиль exact {last['cid']}: {prof!r} = {v11}/{last['canary']}")
print(f"OLD-коридор 5.25-5.91e-05: INSIDE {5.25e-05 <= prof <= 5.91e-05}; "
      f"NEW-порог 6.55e-05: {prof >= 6.55e-05}")
pf = pair["vals"].get("parse/foxurl/11") / pair["canary"]
print(f"профиль пары {pair['cid']}: {pf!r} — SAME-PROFILE Δ "
      f"{(prof-pf)/pf*100!r}%")
print()

print("=== corpus-all (parse/foxurl) FAST-записей (последние 10) ===")
fasts = [m for m in meta if m["cls"] == "FAST"]
ca_list = [(m["cid"], m["vals"].get("parse/foxurl/corpus-all"))
           for m in fasts]
print(", ".join(f"{c} {v}" for c, v in ca_list[-10:]))
last_ca = last["vals"].get("parse/foxurl/corpus-all")
print(f"{last['cid']} corpus-all: {last_ca}")
print()

zzz_name = "find/foxsearch/zzz-absent-zzz"
zzzs = [(m["cid"], m["vals"].get(zzz_name)) for m in fasts
        if m["vals"].get(zzz_name)]
norm = sorted(v for _, v in zzzs if v < 300000)
patho = sorted(v for _, v in zzzs if v >= 300000)
last_zzz = last["vals"].get(zzz_name)
med_norm = statistics.median(norm)
print(f"=== {zzz_name} конверт по FAST-записям ===")
print(f"FAST записей с zzz: {len(zzzs)}; нормальных (<300k): {len(norm)}, "
      f"патологических (>=300k): {len(patho)}")
print(f"нормальный конверт: min {norm[0]}, max {norm[-1]}, медиана {med_norm!r}")
rank = sum(1 for v in norm if v <= last_zzz)
print(f"{last['cid']} zzz {last_zzz} rank: {rank}/{len(norm)} "
      f"(vs медиана {(last_zzz-med_norm)/med_norm*100!r}%)")
