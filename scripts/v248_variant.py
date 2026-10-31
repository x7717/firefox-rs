#!/usr/bin/env python3
"""v248_variant.py — окно 260: точка #266 87ec41e [MEDIUM canary 1067291,
NEW-профиль 7.12e-05 — хост ротировал на NEW после 3 CLASSIC OLD].
ПАРА vs 9da4f3e (idx 264, кандидат по урокам 198/204 — MEDIUM OLD
5.54e-05 => КРОСС-ПРОФИЛЬ, ожидание ДРЕЙФ-формы урок 148/229); ВАРИАНТ-ПАРА
vs 45afa12 (idx 252, SAME-HOST NEW-MEDIUM каноничность — canary 1068947,
corpus-all 1000==1000, zzz 178784); профиль exact; NEW-коридор 6.55-7.65e-05
(урок 229); corpus-all MEDIUM-записей (закон хост x класс). Формулы = analyze.py
(dual-formula)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"

raw = Path("scripts/data260.js").read_text()
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

last = meta[-1]                                        # 87ec41e idx 268
pair = next(m for m in meta if m["cid"] == "9da4f3e")   # idx 264, кандидат GUARD
var = next(m for m in meta if m["cid"] == "45afa12")    # idx 252, SAME-HOST NEW
anchor = next(m for m in meta if m["cid"] == "d70534f")  # CLASSIC-якорь (штатно)


def five(cur, prev, title, corridor):
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
    flags = [nm for a, nm in zip(d1, names) if abs(a) > 20.0]
    ca, cb = prev["canary"], cur["canary"]
    cd = (cb - ca) / ca * 100.0
    print(f"=== {title} ===")
    print(f"n={n} median={med!r} p10={p10!r} p90={p90!r}")
    print(f"spread={p90-p10!r} canary-vs-пара={cd!r} (cur {cb} vs {ca})")
    print(f"ФЛАГИ |дельта|>20: {len(flags)}")
    print(f"НУЛИ {len(zeros)}: {', '.join(zeros)}")
    print(f"fp max |f1-f2|={worst!r} (worst {wname})")
    if corridor:
        print(f"NEW-MEDIUM same-host коридор 2.2..4.5: spread "
              f"{p90-p10:.13f} INSIDE: {2.2 <= p90-p10 <= 4.5}")
    else:
        print(f"кросс-профиль NEW vs OLD — коридор 2.2..4.5 НЕ применим (урок 229)")
    print(f"min 4: " + "; ".join(
        f"{nm} {a:+.1f}" for a, nm in sorted(zip(d1, names))[:4]))
    print(f"top 5: " + "; ".join(
        f"{nm} {a:+.1f}" for a, nm in sorted(zip(d1, names), reverse=True)[:5]))
    return flags


flags_pair = five(last, pair, f"ПАРА {last['cid']} (idx {last['idx']}) vs {pair['cid']} (idx {pair['idx']})", corridor=False)
print()
flags_var = five(last, var, f"ВАРИАНТ-ПАРА {last['cid']} vs {var['cid']} (idx {var['idx']}, SAME-HOST)", corridor=True)
print()

# профиль exact + раскол
v11 = last["vals"].get("parse/foxurl/11")
prof = v11 / last["canary"]
print(f"профиль exact {last['cid']}: {prof!r} = {v11}/{last['canary']}")
print(f"NEW-коридор 6.55-7.65e-05 (урок 229): INSIDE {6.55e-05 <= prof <= 7.65e-05}; "
      f"OLD-порог 6.0e-05: {prof < 6.0e-05}")
pf = pair["vals"].get("parse/foxurl/11") / pair["canary"]
print(f"профиль пары {pair['cid']}: {pf!r} — КРОСС-ПРОФИЛЬ Δ {(prof-pf)/pf*100!r}%")
vf = var["vals"].get("parse/foxurl/11") / var["canary"]
print(f"профиль same-host {var['cid']}: {vf!r} — SAME-PROFILE Δ {(prof-vf)/vf*100!r}%")
print()

# corpus-all MEDIUM-записей (закон хост x класс)
print("=== corpus-all (parse/foxurl) MEDIUM-записей (последние 10) ===")
meds = [m for m in meta if m["cls"] == "MEDIUM"]
ca_list = [(m["cid"], m["vals"].get("parse/foxurl/corpus-all")) for m in meds]
print(", ".join(f"{c} {v:.0f}" for c, v in ca_list[-10:]))
last_ca = last["vals"].get("parse/foxurl/corpus-all")
print(f"{last['cid']} corpus-all: {last_ca:.0f}")
print()

# zzz хост-позиции
zzz_name = "find/foxsearch/zzz-absent-zzz"
print("=== zzz MEDIUM-записей (последние 10) ===")
zzzs = [(m["cid"], m["vals"].get(zzz_name)) for m in meds if m["vals"].get(zzz_name)]
print(", ".join(f"{c} {v:.0f}" for c, v in zzzs[-10:]))
last_zzz = last["vals"].get(zzz_name)
print(f"{last['cid']} zzz: {last_zzz:.0f} "
      f"({'NEW-позиция <300k' if last_zzz < 300000 else 'OLD-позиция >=300k'})")

# итог флагов
print()
print(f"ИТОГ: флагов ПАРА={len(flags_pair)} ВАРИАНТ={len(flags_var)}")
print("ДРЕЙФ-протокол w212/w242: повторный прогон = НОВАЯ запись, откат НЕ нужен"
      if flags_pair else "ПАРИТЕТ-форма")
