#!/usr/bin/env python3
"""v286_marks.py — окно 286: маркеры записи b94692e (точка #295, класс
CLASSIC canary 1355496; СНАЧАЛА строку профиля, урок 229): профиль
78/1355496 = 5.7544e-05 [OLD-таг], corpus-all 1183 (ядро OLD-зоны
1180-1196), zzz 207906, small 143.
ФОРМА = канонический CLASSIC-OLD-хост (под-форма OLD-профиля канарейного
кластера ~1351k-1368k; контраст NEW-профиля под-формы: 3215b78 v11 102 /
e990865 v11 104 — профиль 7.50e-05/7.64e-05 [NEW]; контраст семейства
canary-1220k: 0cb508b zzz 336224 / small 118 / corpus 963; контраст
формы 1260k: 680b8e9 / b1bf50c — zzz ~351-359k).
АНАТОМИЯ против CLASSIC-OLD-якоря d70534f (idx 66, canary 1356121,
профиль 5.6041e-05 [OLD]; прецедент окна 284 — canary-vs-якорь d70534f).
Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data286.js"

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

last = meta[297]
anchor = meta[66]
assert last["cid"] == "b94692e" and last["cls"] == "CLASSIC"
assert last["canary"] == 1355496
assert anchor["cid"] == "d70534f" and anchor["canary"] == 1356121

# --- канонический CLASSIC-OLD под-форма (canary кластер >= 1330000 И
#     профиль < 6.0e-05 — дискриминатор окна 229) ---
def profv(m):
    v11 = m["vals"].get("parse/foxurl/11")
    return v11 / m["canary"]

olds = [m for m in meta if m["cls"] == "CLASSIC" and m["canary"] >= 1330000
        and profv(m) < 6.0e-05]
news = [m for m in meta if m["cls"] == "CLASSIC" and m["canary"] >= 1330000
        and profv(m) >= 6.0e-05]
canO = [m["canary"] for m in olds]
zzzO = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in olds]
smO = [m["vals"]["parse/foxjson/small"] for m in olds]
caO = [m["vals"]["parse/foxurl/corpus-all"] for m in olds]
prO = [profv(m) for m in olds]
visit_no = len(olds)
print(f"CLASSIC canary-кластера >=1330000: OLD-подформа {len(olds)}, "
      f"NEW-подформа {len(news)} ({', '.join(m['cid'] for m in news[:6])})")
print(f"b94692e = {visit_no}-я запись OLD-подформы (считая по хронологии)")
print(f"кластер canary OLD-подформы: {min(canO)}-{max(canO)} "
      f"(Дельта {(max(canO) - min(canO)) / min(canO) * 100:.2f}%) — "
      f"1355496 {'INSIDE' if min(canO) <= 1355496 <= max(canO) else 'OUTSIDE'}")
print(f"zzz-конверт OLD-подформы: {min(zzzO)}-{max(zzzO)} — "
      f"207906 {'INSIDE' if min(zzzO) <= 207906 <= max(zzzO) else 'OUTSIDE'}")
print(f"small OLD-подформы: {min(smO)}-{max(smO)} — "
      f"143 {'INSIDE' if min(smO) <= 143 <= max(smO) else 'OUTSIDE'} "
      f"(норма 144±3, джиттер вверх до {max(smO)} — НЕ дискриминатор, "
      f"урок окна 282)")
print(f"corpus-all OLD-подформы: {min(caO)}-{max(caO)} — "
      f"1183 {'INSIDE' if min(caO) <= 1183 <= max(caO) else 'OUTSIDE'} "
      f"(ядро зоны 1180-1196)")
print(f"профиль-конверт OLD-подформы: {min(prO):.4e}-{max(prO):.4e} — "
      f"5.7544e-05 {'INSIDE' if min(prO) <= 5.75434e-05 <= max(prO) else 'OUTSIDE'}")

# --- АНАТОМИЯ против CLASSIC-OLD-якоря d70534f ---
lv, pv = last["vals"], anchor["vals"]
d1, names = [], []
for name, v in lv.items():
    p = pv.get(name)
    if p and v:
        d1.append((v - p) / p * 100.0)
        names.append(name)
d1s = sorted(d1)
n = len(d1)
med = statistics.median(d1)
p10, p90 = d1s[int(n * 0.10)], d1s[int(n * 0.90)]
spread = p90 - p10
cd = (last["canary"] - anchor["canary"]) / anchor["canary"] * 100.0
flagsA = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
zerosA = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"\nАНАТОМИЯ против якоря d70534f (idx 66): canary {cd!r} -> {cd:+.2f}% "
      f"({'INSIDE кластера OLD-подформы' if min(canO) <= last['canary'] <= max(canO) else 'OUTSIDE'})")
print(f"  слои: median {med!r} ({'НЕ-нуль' if med != 0.0 else 'НУЛЬ'}), "
      f"p10 {p10!r}, p90 {p90!r}, разброс {spread!r} -> {spread:.1f} п.п.")
print(f"  пробои против якоря (>20%): {len(flagsA)}")
for a, nm in sorted(flagsA, reverse=True)[:10]:
    print(f"    {a:+.1f}% {nm}")
print(f"  нулей против якоря: {len(zerosA)}")
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
print("ОТНОШЕНИЯ против якоря: "
      + " | ".join(f"{c} {rmed[c]:+.2f}" for c in sorted(rmed))
      + f"   exact: " + ", ".join(f"{c}={rmed[c]!r}" for c in sorted(rmed)))
ca_now = last["vals"]["parse/foxurl/corpus-all"]
ca_anch = anchor["vals"]["parse/foxurl/corpus-all"]
print(f"corpus-all vs якорь: {ca_anch} vs {ca_now} "
      f"{(ca_now - ca_anch) / ca_anch * 100:+.2f}%")
