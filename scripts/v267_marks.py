#!/usr/bin/env python3
"""v267_marks.py — окно 279: дополнительные маркеры записи b1bf50c
(точка #285, класс CLASSIC canary 1261019 INSIDE зоны-930 canary-
кластера 1260391-1262371; СНАЧАЛА строка профиля, урок 229; ТРЕТИЙ
ВИЗИТ ЗОНЫ-930: профиль 5.3925e-05 [OLD-таг], corpus-all 930, zzz
359407, small 131 — прецеденты 5ae02bc #213 w215 / 680b8e9 #265 w266).
Маркеры: p10/p90 sorted-neighbors, реестр зон CLASSIC-записей (закон
хост x класс: OLD 1180-1196 / НОВАЯ-930 / НОВАЯ-1273 / NEW 1314-1424),
zzz конверт зоны-930 (прецеденты 315831-385803) vs CLASSIC-конверт
203811-231085, профиль точный, зона-930 canary-кластер проверка,
foxjson/small зона-930-норма 130±1 vs CLASSIC-норма 144±3, АНАТОМИЯ
против CLASSIC-якоря d70534f (штатно, прецедент w278/w268).
Формулы = analyze.py."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data279.js").read_text()
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

last = meta[-1]
lv = last["vals"]

# --- профиль точный и кластер зоны-930 ---
v11 = lv.get("parse/foxurl/11")
prof = v11 / last["canary"]
print(f"профиль точный v11/canary: {v11}/{last['canary']} = {prof!r} "
      f"-> {prof:.6e} [{'OLD' if prof < 6.0e-05 else 'NEW'}-таг]")
z930 = [m for m in meta if 900 <= (m['vals'].get('parse/foxurl/corpus-all') or 0) <= 947
        and m["cls"] == "CLASSIC"]
print(f"зона-930 CLASSIC-визиты: {[(m['cid'], m['idx']) for m in z930]}")
cans = [m["canary"] for m in z930]
profs = [m['vals'].get('parse/foxurl/11') / m['canary'] for m in z930]
smalls = [m['vals'].get('parse/foxjson/small') for m in z930]
zzzs = [m['vals'].get('find/foxsearch/zzz-absent-zzz') for m in z930]
cas = [m['vals'].get('parse/foxurl/corpus-all') for m in z930]
print(f"  canary кластер: {min(cans)}-{max(cans)} "
      f"(Дельта {((max(cans)-min(cans))/min(cans))*100:.2f}%)")
print(f"  профиль кластер: {min(profs):.4e}-{max(profs):.4e} "
      f"(Дельта {((max(profs)-min(profs))/min(profs))*100:.2f}%)")
print(f"  corpus-all: {sorted(set(cas))}, small: {sorted(set(smalls))}")
print(f"  zzz конверт зоны-930: {min(zzzs)}-{max(zzzs)} "
      f"(cur {lv.get('find/foxsearch/zzz-absent-zzz')} — "
      f"{'INSIDE' if min(zzzs) <= lv.get('find/foxsearch/zzz-absent-zzz') <= max(zzzs) else 'OUTSIDE'})")

# --- реестр зон CLASSIC-записей ---
zones = {"OLD 1180-1196": 0, "НОВАЯ-930": 0, "НОВАЯ-1273": 0,
         "NEW 1314-1424": 0, "др.": 0}
for m in meta:
    if m["cls"] != "CLASSIC":
        continue
    ca = m["vals"].get("parse/foxurl/corpus-all") or 0
    if 1180 <= ca <= 1196:
        zones["OLD 1180-1196"] += 1
    elif 900 <= ca <= 947:
        zones["НОВАЯ-930"] += 1
    elif 1260 <= ca <= 1290:
        zones["НОВАЯ-1273"] += 1
    elif 1314 <= ca <= 1424:
        zones["NEW 1314-1424"] += 1
    else:
        zones["др."] += 1
print(f"реестр зон CLASSIC-записей (закон хост x класс): {zones}")

# --- АНАТОМИЯ против CLASSIC-якоря d70534f ---
anchor = next(m for m in meta if m["cid"] == "d70534f")
av = anchor["vals"]
d1, d2, names = [], [], []
for name, v in lv.items():
    p = av.get(name)
    if p and v:
        d1.append((v - p) / p * 100.0)
        d2.append((v / p - 1.0) * 100.0)
        names.append(name)
n = len(d1)
d1s = sorted(d1)
med = statistics.median(d1)
i10, i90 = int(n * 0.10), int(n * 0.90)
cd = (last["canary"] - anchor["canary"]) / anchor["canary"] * 100.0
cdp = sorted(zip(d1, names))
flags = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
mins = cdp[:4]
tops = sorted(cdp, reverse=True)[:5]
print(f"\nАНАТОМИЯ vs CLASSIC-якорь d70534f (idx {anchor['idx']}, "
      f"canary {anchor['canary']}):")
print(f"  canary-vs-якорь {cd:+.2f}%, n={n}, median {med:+.2f}, "
      f"p10 {d1s[i10]:+.2f} (deltas[{i10}]), p90 {d1s[i90]:+.2f} "
      f"(deltas[{i90}]), разброс {d1s[i90]-d1s[i10]:.1f} п.п.")
print(f"  ПРОБОЕВ(флагов) {len(flags)}, нулей {len(zeros)}")
print(f"  min 4: " + ", ".join(f"{nm} {a:+.1f}" for a, nm in mins))
print(f"  top 5: " + ", ".join(f"{nm} {a:+.1f}" for a, nm in tops))
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
    ap = av.get(partner) if partner else None
    avv = av.get(name)
    if not (partner and ap and avv and v and name in av):
        continue
    ratios.append((name.split("/")[1], (v / avv) / (lv[partner] / av[partner])))
rmed = {}
for crate in sorted({c for c, _ in ratios}):
    ds = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
    if ds:
        rmed[crate] = statistics.median(ds)
print("  ОТНОШЕНИЯ против якоря: "
      + " | ".join(f"{c} {rmed[c]:+.2f}" for c in sorted(rmed))
      + f"   exact: " + ", ".join(f"{c}={rmed[c]!r}" for c in sorted(rmed)))
