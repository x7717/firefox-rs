#!/usr/bin/env python3
"""v287_marks.py — окно 287: маркеры записи b74d5b2 (точка #299, класс
CLASSIC canary 1223438; СНАЧАЛА строку профиля, урок 229): профиль
71/1223438 = 5.8033e-05 [OLD-таг], zzz 333012, small 119, corpus-all 978.
ФОРМА = семейство canary-1220k (кластер canary 1201406-1225670; контраст
канонического CLASSIC-OLD ~1355k: b94692e zzz 207906 / small 143 /
corpus-all 1183; контраст формы 1260k: 680b8e9 / b1bf50c — small 130-131,
профиль ~5.39e-05; контраст пограничной записи c7206f4 canary 1228305 —
ВЫШЕ верхней границы кластера, к семье НЕ относится).
АНАТОМИЯ: (1) против canary-1220k same-form члена 0cb508b (idx 295,
distance 3) — ожидание УЗКОГО разброса (хост-идентичность); (2) против
канонического OLD-якоря d70534f (idx 66, canary 1356121) — canary-vs-якорь
OUTSIDE, прецеденты w218 (5673db9 -10.04%) / w284 (0cb508b -10.27%).
Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data287.js"

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

last = meta[298]
anchor = meta[66]
sameform = meta[295]
assert last["cid"] == "b74d5b2" and last["cls"] == "CLASSIC"
assert last["canary"] == 1223438
assert anchor["cid"] == "d70534f" and anchor["canary"] == 1356121
assert sameform["cid"] == "0cb508b" and sameform["canary"] == 1216790

# --- семейство canary-1220k (кластер canary 1201406-1225670) ---
LO, HI = 1201406, 1225670


def profv(m):
    v11 = m["vals"].get("parse/foxurl/11")
    return v11 / m["canary"]


fam = [m for m in meta if m["cls"] == "CLASSIC" and LO <= m["canary"] <= HI]
canF = [m["canary"] for m in fam]
zzzF = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in fam]
smF = [m["vals"]["parse/foxjson/small"] for m in fam]
caF = [m["vals"]["parse/foxurl/corpus-all"] for m in fam]
prF = [profv(m) for m in fam]
visit_no = len(fam)
print(f"CLASSIC в кластере canary-1220k [{LO}-{HI}]: {visit_no} записей "
      f"(включая судимую): " + ", ".join(m["cid"] for m in fam))
print(f"b74d5b2 = {visit_no}-й визит семейства (считая по хронологии)")
print(f"кластер canary: {min(canF)}-{max(canF)} "
      f"(Дельта {(max(canF) - min(canF)) / min(canF) * 100:.2f}%) — "
      f"1223438 {'INSIDE' if min(canF) <= 1223438 <= max(canF) else 'OUTSIDE'}")
print(f"zzz-конверт семьи: {min(zzzF)}-{max(zzzF)} — "
      f"333012 {'INSIDE' if min(zzzF) <= 333012 <= max(zzzF) else 'OUTSIDE'}")
print(f"small семьи: {min(smF)}-{max(smF)} — "
      f"119 {'INSIDE' if min(smF) <= 119 <= max(smF) else 'OUTSIDE'} "
      f"(норма 117-118, джиттер вверх — НЕ дискриминатор, урок окна 282)")
print(f"corpus-all семьи: {min(caF)}-{max(caF)} — "
      f"978 {'INSIDE' if min(caF) <= 978 <= max(caF) else 'OUTSIDE'} "
      f"(97e1e53 1056 — верхний выброс семьи)")
print(f"профиль-конверт семьи: {min(prF):.4e}-{max(prF):.4e} — "
      f"5.8033e-05 {'INSIDE' if min(prF) <= 5.8033e-05 <= max(prF) else 'OUTSIDE'}")


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


sp_same = anatomy(sameform, "same-form canary-1220k")
sp_anch = anatomy(anchor, "канонический OLD-якорь")
print(f"\nИТОГ-маркеры: same-form 0cb508b разброс {sp_same:.1f} п.п. "
      f"(УЗКИЙ — хост-идентичность), канон-якорь d70534f разброс "
      f"{sp_anch:.1f} п.п. (ШИРОКИЙ — чужая форма)")
