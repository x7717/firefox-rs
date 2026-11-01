#!/usr/bin/env python3
"""v288_marks.py — окно 288: маркеры записи fe76381 (точка #300, класс
CLASSIC canary 1259770; СНАЧАЛА строку профиля, урок 229): профиль
11/1259770 = 5.4772e-05 [OLD-таг], zzz 376702, small 130, corpus-all 930.
ФОРМА = семейство 1260k (кластер canary 1253700-1262371; контраст
канарей-1220k кластер 1201406-1225670 — 1259770 OUTSIDE сверху; контраст
канона ~1355k: b94692e zzz 207906 / small 143 / corpus-all 1183;
пограничная c7206f4 canary 1228305 — между семьями, к 1260k НЕ относится).
АНАТОМИЯ: (1) против same-form 1260k члена b1bf50c (idx 287, distance 12)
— ожидание УЗКОГО разброса (хост-идентичность); (2) против канонического
OLD-якоря d70534f (idx 66, canary 1356121) — canary-vs-якорь OUTSIDE
(прецедент формы: b1bf50c ~1261k vs d70534f ~-7.0%).
Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data288.js"

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

last = meta[299]
anchor = meta[66]
sameform = meta[287]
assert last["cid"] == "fe76381" and last["cls"] == "CLASSIC"
assert last["canary"] == 1259770
assert anchor["cid"] == "d70534f" and anchor["canary"] == 1356121
assert sameform["cid"] == "b1bf50c" and sameform["canary"] == 1261019

# --- семейство 1260k (кластер canary 1253700-1262371, границы = 7
#     предшественников; судимая INSIDE) ---
LO, HI = 1253700, 1262371


def profv(m):
    v11 = m["vals"].get("parse/foxurl/11")
    return v11 / m["canary"]


fam = [m for m in meta if m["cls"] == "CLASSIC" and LO <= m["canary"] <= HI]
assert fam[-1]["cid"] == "fe76381", fam[-1]
canF = [m["canary"] for m in fam]
zzzF = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in fam]
smF = [m["vals"]["parse/foxjson/small"] for m in fam]
caF = [m["vals"]["parse/foxurl/corpus-all"] for m in fam]
prF = [profv(m) for m in fam]
visit_no = len(fam)
print(f"CLASSIC в кластере 1260k [{LO}-{HI}]: {visit_no} записей "
      f"(включая судимую): " + ", ".join(m["cid"] for m in fam))
print(f"fe76381 = {visit_no}-й визит семейства (считая по хронологии)")
print(f"кластер canary: {min(canF)}-{max(canF)} "
      f"(Дельта {(max(canF) - min(canF)) / min(canF) * 100:.2f}%) — "
      f"1259770 {'INSIDE' if min(canF) <= 1259770 <= max(canF) else 'OUTSIDE'}")
print(f"zzz-конверт семьи: {min(zzzF)}-{max(zzzF)} — "
      f"376702 {'INSIDE' if min(zzzF) <= 376702 <= max(zzzF) else 'OUTSIDE'}")
print(f"small семьи: {min(smF)}-{max(smF)} — "
      f"130 {'INSIDE' if min(smF) <= 130 <= max(smF) else 'OUTSIDE'} "
      f"(норма 130-131)")
print(f"corpus-all семьи: {min(caF)}-{max(caF)} — "
      f"930 {'INSIDE' if min(caF) <= 930 <= max(caF) else 'OUTSIDE'}")
# профиль: конверт с судимой + конверт 7 предшественников (проверка выброса)
fam_prior = [m for m in fam if m["cid"] != "fe76381"]
prP = [profv(m) for m in fam_prior]
pr_min, pr_max = min(prP), max(prP)
pl = profv(last)
pr_all_min, pr_all_max = min(prF), max(prF)
verdict = "INSIDE" if pr_min <= pl <= pr_max else "OUTSIDE"
print(f"профиль-конверт семьи (с судимой): {pr_all_min:.4e}-{pr_all_max:.4e} "
      f"— {pl:.4e} {'INSIDE' if pr_all_min <= pl <= pr_all_max else 'OUTSIDE'}")
print(f"профиль-конверт 7 предшественников: {pr_min:.4e}-{pr_max:.4e} — "
      f"{pl:.4e} {verdict} "
      f"(верхний выброс +{(pl - pr_max) / pr_max * 100:.2f}% над max; "
      f"OLD-таг сохраняется, порог 6.0e-05; прецедент верхнего выброса "
      f"семьи: 97e1e53 corpus-all 1056)")


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


sp_same = anatomy(sameform, "same-form 1260k")
sp_anch = anatomy(anchor, "канонический OLD-якорь")
print(f"\nИТОГ-маркеры: same-form b1bf50c разброс {sp_same:.1f} п.п. "
      f"(УЗКИЙ — хост-идентичность), канон-якорь d70534f разброс "
      f"{sp_anch:.1f} п.п. (ШИРОКИЙ — чужая форма)")
