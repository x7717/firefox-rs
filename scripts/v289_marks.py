#!/usr/bin/env python3
"""v289_marks.py — окно 289: маркеры записи 68f8b0a (точка #301, класс
CLASSIC canary 1356551; СНАЧАЛА строку профиля, урок 229): профиль
11/1356551 = 5.6024e-05 [OLD-таг], zzz 210896, small 143, corpus-all 1189.
ФОРМА = канонический CLASSIC-OLD ~1356k (доминирующая форма пула; кластер
1345000-1375000: 157 членов за историю, 144 OLD + 13 NEW-скошенных;
контраст формы 1260k: 680b8e9/b1bf50c/fe76381 — small 130-131, zzz
333-386k, corpus-all 927-938; контраст canary-1220k: small 117-119, zzz
321-342k).
АНАТОМИЯ: (1) против same-form канона b94692e (idx 297, distance 3) —
ожидание УЗКОГО разброса (хост-идентичность); (2) против 1260k-члена
b1bf50c (idx 287, canary 1261019) — canary-vs OUTSIDE (чужая форма,
прецедент окна 288: 19.2 против canary-1220k-пары, 65.0 против канона).
Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data289.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900000 else ("MEDIUM" if c < 1200000 else "CLASSIC")
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "cls": cls,
                 "canary": c, "vals": vals})

last = meta[300]
sameform = meta[297]
other_form = meta[287]
assert last["cid"] == "68f8b0a" and last["cls"] == "CLASSIC"
assert last["canary"] == 1356551
assert sameform["cid"] == "b94692e" and sameform["canary"] == 1355496
assert other_form["cid"] == "b1bf50c" and other_form["canary"] == 1261019

# --- канон-кластер (доминирующая форма) ---
LO, HI = 1345000, 1375000


def profv(m):
    v11 = m["vals"].get("parse/foxurl/11")
    return v11 / m["canary"]


fam = [m for m in meta if m["cls"] == "CLASSIC" and LO <= m["canary"] <= HI]
assert fam[-1]["cid"] == "68f8b0a", fam[-1]
fam_old = [m for m in fam if profv(m) < 6.0e-05]
fam_new = [m for m in fam if profv(m) >= 6.0e-05]
canF = [m["canary"] for m in fam]
zzzF = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in fam]
smF = [m["vals"]["parse/foxjson/small"] for m in fam]
caF = [m["vals"]["parse/foxurl/corpus-all"] for m in fam]
prF = [profv(m) for m in fam_old]
recent = [m for m in fam if m["idx"] >= 280]
visit_no = len(fam)
print(f"CLASSIC в канон-кластере [{LO}-{HI}]: {visit_no} записей (включая "
      f"судимую); OLD-таг {len(fam_old)}, NEW-скошенных {len(fam_new)} "
      f"({', '.join(m['cid'] for m in fam_new)})")
print(f"68f8b0a = {visit_no}-й визит канона (доминирующая форма пула); "
      f"недавняя эра (idx>=280): {len(recent)} членов: "
      + ", ".join(m["cid"] for m in recent))
print(f"кластер canary: {min(canF)}-{max(canF)} "
      f"(Дельта {(max(canF) - min(canF)) / min(canF) * 100:.2f}%) — "
      f"1356551 {'INSIDE' if min(canF) <= 1356551 <= max(canF) else 'OUTSIDE'}")
print(f"zzz-конверт канона: {min(zzzF)}-{max(zzzF)} — "
      f"210896 {'INSIDE' if min(zzzF) <= 210896 <= max(zzzF) else 'OUTSIDE'}")
print(f"small канона: {min(smF)}-{max(smF)} — "
      f"143 {'INSIDE' if min(smF) <= 143 <= max(smF) else 'OUTSIDE'}")
print(f"corpus-all канона: {min(caF)}-{max(caF)} — "
      f"1189 {'INSIDE' if min(caF) <= 1189 <= max(caF) else 'OUTSIDE'}")
print(f"профиль-конверт канона (OLD-таг {len(fam_old)}): "
      f"{min(prF):.4e}-{max(prF):.4e} — "
      f"5.6024e-05 {'INSIDE' if min(prF) <= 5.6024e-05 <= max(prF) else 'OUTSIDE'}")


def anatomy(other, tag):
    lv, pv = last["vals"], other["vals"]
    d1, d2, names = [], [], []
    for name, v in lv.items():
        p = pv.get(name)
        if p and v:
            d1.append((v - p) / p * 100.0)
            d2.append((v / p - 1.0) * 100.0)
            names.append(name)
    d1s = sorted(d1)
    n = len(d1)
    med = statistics.median(d1)
    p10, p90 = d1s[int(n * 0.10)], d1s[int(n * 0.90)]
    spread = p90 - p10
    cd = (last["canary"] - other["canary"]) / other["canary"] * 100.0
    flagsA = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
    zerosA = [nm for a, nm in zip(d1, names) if a == 0.0]
    print(f"\nАНАТОМИЯ против {tag} {other['cid']} (idx {other['idx']}, "
          f"canary {other['canary']}): canary {cd!r} -> {cd:+.2f}%")
    print(f"  слои: median {med!r} ({'НЕ-нуль' if med != 0.0 else 'НУЛЬ'}), "
          f"p10 {p10!r}, p90 {p90!r}, разброс {spread!r} -> {spread:.1f} п.п.")
    print(f"  пробои против ({tag}, >20%): {len(flagsA)}")
    for a, nm in sorted(flagsA, reverse=True)[:10]:
        print(f"    {a:+.1f}% {nm}")
    print(f"  нулей против {tag}: {len(zerosA)}")
    min5 = sorted(zip(d1, names))[:4]
    max5 = sorted(zip(d1, names), reverse=True)[:5]
    print("  min: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in min5))
    print("  top: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in max5))
    PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
                  ("/foxsearch/", "/std/")]

    def std_partner(name):
        for a, b in PAIR_RULES:
            if a in name:
                return name.replace(a, b, 1)
        return None

    ratios = []
    for name, v in lv.items():
        partner = std_partner(name)
        if not (partner and pv.get(partner) and pv.get(name) and v):
            continue
        ratios.append((name.split("/")[1],
                       (v / pv[name]) / (lv[partner] / pv[partner])))
    rmed = {}
    for crate in sorted({c for c, _ in ratios}):
        ds = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
        if ds:
            rmed[crate] = statistics.median(ds)
    print("ОТНОШЕНИЯ против " + tag + ": "
          + " | ".join(f"{c} {rmed[c]:+.2f}" for c in sorted(rmed))
          + "   exact: " + ", ".join(f"{c}={rmed[c]!r}" for c in sorted(rmed)))
    ca_now = last["vals"]["parse/foxurl/corpus-all"]
    ca_anch = other["vals"]["parse/foxurl/corpus-all"]
    print(f"corpus-all vs {tag}: {ca_anch} vs {ca_now} "
          f"{(ca_now - ca_anch) / ca_anch * 100:+.2f}%")
    return spread


sp_same = anatomy(sameform, "same-form канон")
sp_other = anatomy(other_form, "чужая форма 1260k")
print(f"\nИТОГ-маркеры: same-form b94692e разброс {sp_same:.1f} п.п. "
      f"(УЗКИЙ — хост-идентичность), чужая форма 1260k b1bf50c разброс "
      f"{sp_other:.1f} п.п. (ШИРОКИЙ — другая форма)")
