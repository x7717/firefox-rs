#!/usr/bin/env python3
"""v272_marks.py — окно 284: маркеры записи 0cb508b (точка #293, класс
CLASSIC canary 1216790; СНАЧАЛА строка профиля, урок 229): профиль
71/1216790 = 5.8350e-05 [OLD-таг] INSIDE профиля-конверта формы, zzz
336224 INSIDE zzz-конверта, small 118 = норма формы, corpus-all 963.
ФОРМА = БЫСТРЫЙ ХОСТ семейства canary-1220k (canary-vs-якорь d70534f
-10.27%; прецедент w218: 5673db9 canary 1219985, тот же вердикт-паттерн
12 флагов foxsearch/multi + spread 68.3; список формы: 7e6ffe0 idx 90 /
b73b531 idx 135 / 23129b8 idx 170 / dd9c671 idx 187 / 97e1e53 idx 213 /
5673db9 idx 217 / bca9f03 idx 257 / 0cb508b idx 295). Маркеры: реестр зон
CLASSIC-записей (закон хост x класс: OLD 1180-1196 / НОВАЯ-930 /
НОВАЯ-1273 / NEW 1314-1424 / др.), zzz-конверт формы, small-норма 117-118,
АНАТОМИЯ против CLASSIC-якоря d70534f (idx 66, штатно, прецедент
w278/w279). Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data284.js"

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

last = meta[295]
assert last["cid"] == "0cb508b" and last["cls"] == "CLASSIC"
assert last["canary"] == 1216790
lv = last["vals"]

# --- профиль точный и кластер формы canary-1220k ---
v11 = lv.get("parse/foxurl/11")
prof = v11 / last["canary"]
print(f"профиль точный v11/canary: {v11}/{last['canary']} = {prof!r} "
      f"-> {prof:.6e} [{'OLD' if prof < 6.0e-05 else 'NEW'}-таг]")
fam = [m for m in meta if m["cls"] == "CLASSIC"
       and 1201406 <= m["canary"] <= 1225670]
print(f"форма canary-1220k, CLASSIC-визиты: "
      f"{[(m['cid'], m['idx']) for m in fam]}")
cans = [m["canary"] for m in fam]
profs = [m["vals"].get("parse/foxurl/11") / m["canary"] for m in fam]
smalls = [m["vals"].get("parse/foxjson/small") for m in fam]
zzzs = [m["vals"].get("find/foxsearch/zzz-absent-zzz") for m in fam]
cas = [m["vals"].get("parse/foxurl/corpus-all") for m in fam]
print(f"  canary кластер: {min(cans)}-{max(cans)} "
      f"(Дельта {(max(cans)-min(cans))/min(cans)*100:.2f}%) — "
      f"cur {last['canary']} "
      f"{'INSIDE' if min(cans) <= last['canary'] <= max(cans) else 'OUTSIDE'}")
print(f"  профиль конверт: {min(profs):.4e}-{max(profs):.4e} — "
      f"cur {prof:.4e} "
      f"{'INSIDE' if min(profs) <= prof <= max(profs) else 'OUTSIDE'}")
print(f"  small: {sorted(set(smalls))} (норма формы 117-118) — "
      f"cur {lv.get('parse/foxjson/small')}")
print(f"  zzz конверт формы: {min(zzzs)}-{max(zzzs)} — "
      f"cur {lv.get('find/foxsearch/zzz-absent-zzz')} "
      f"{'INSIDE' if min(zzzs) <= lv.get('find/foxsearch/zzz-absent-zzz') <= max(zzzs) else 'OUTSIDE'}")
print(f"  corpus-all (слабый маркер формы): {sorted(set(cas))} — "
      f"cur {lv.get('parse/foxurl/corpus-all')}")

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
print(f"\nреестр зон CLASSIC-записей: {zones}")
others = sorted({(m["vals"].get("parse/foxurl/corpus-all"), m["cid"], m["idx"])
                 for m in meta if m["cls"] == "CLASSIC"
                 and (m["vals"].get("parse/foxurl/corpus-all") or 0) not in
                 (range(1180, 1197), range(900, 948), range(1260, 1291),
                  range(1314, 1425))}
                )
print(f"  'др.'-записи (вкл. форму canary-1220k ca 938-1056): "
      f"{others[-12:]}")

# --- АНАТОМИЯ против CLASSIC-якоря d70534f (штатно, прецедент w278/w279) ---
anchor = next(m for m in meta if m["cid"] == "d70534f")
pv = anchor["vals"]
cd = (last["canary"] - anchor["canary"]) / anchor["canary"] * 100.0
names = [k for k, v in lv.items() if pv.get(k) and v]
d1 = [(v - pv[k]) / pv[k] * 100.0 for k, v in lv.items() if pv.get(k) and v]
n = len(d1)
s = sorted(d1)
meda = statistics.median(d1)
p10, p90 = s[int(n * 0.10)], s[int(n * 0.90)]
zeros = sum(1 for x in d1 if x == 0.0)
flags = [x for x in d1 if x > 20.0]
PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
              ("/foxsearch/", "/std/")]


def partner(nm):
    for a, b in PAIR_RULES:
        if a in nm:
            return nm.replace(a, b, 1)
    return None


ratios = {}
for nm, v in lv.items():
    p = partner(nm)
    if p and pv.get(p) and pv.get(nm) and v:
        ratios.setdefault(nm.split("/")[1], []).append(
            ((v / pv[nm]) / (lv[p] / pv[p]) - 1.0) * 100.0)
rmed = {c: statistics.median(ds) for c, ds in ratios.items() if ds}
prs = sorted(zip(d1, names))
print(f"\nАНАТОМИЯ против CLASSIC-якоря d70534f (idx {anchor['idx']}, "
      f"canary {anchor['canary']}): canary-vs-якорь {cd:+.2f}% "
      f"{'OUTSIDE' if abs(cd) > 2.0 else 'INSIDE'} — быстрый хост "
      f"(семейство canary-1220k, прецедент w218: -10.04%), "
      f"median {meda!r}, p10 {p10!r}, p90 {p90!r}, "
      f"spread {p90 - p10:.1f}, {len(flags)} пробоев, {zeros} нулей")
print(f"  min 4: " + " / ".join(f"{nm} {x:+.1f}" for x, nm in prs[:4]))
print(f"  top 5: " + " / ".join(f"{nm} {x:+.1f}"
                                for x, nm in sorted(prs, reverse=True)[:5]))
print("  отношения против якоря: "
      + " / ".join(f"{c} {rmed[c]:+.2f}" for c in sorted(rmed)))
