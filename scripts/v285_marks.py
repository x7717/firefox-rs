#!/usr/bin/env python3
"""v285_marks.py — окно 285: маркеры записи 33c89cc (точка #294, класс
FAST canary 784289; СНАЧАЛА строка профиля, урок 229): профиль 43/784289
= 5.4827e-05 [OLD-таг] INSIDE Формы-A-конверта, zzz 121807 INSINE
Формы-A-конверта, small 85 = норма Формы-A, corpus-all 604.
ФОРМА = канонический FAST-хост Формы-A (контраст Форме-B: canary
865000-895000, zzz 346000-391000, corpus-all 683-795 — 8 записей:
4110b3f/64c43f6/9fa0b62/8fe7de6/b264d7c/2cf09ae/a41eeab/a383f78).
АНАТОМИЯ против FAST-якоря 1c96db6 (idx 55, canary 720876; штатно,
прецедент окна 213). Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data285.js"

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

last = meta[296]
anchor = meta[55]
assert last["cid"] == "33c89cc" and last["cls"] == "FAST"
assert last["canary"] == 784289
assert anchor["cid"] == "1c96db6" and anchor["canary"] == 720876

# --- FAST под-формы ---
fasts = [m for m in meta if m["cls"] == "FAST"]
FORM_B = {"4110b3f", "64c43f6", "9fa0b62", "8fe7de6", "b264d7c",
          "2cf09ae", "a41eeab", "a383f78"}
formA = [m for m in fasts if m["cid"] not in FORM_B]
formB = [m for m in fasts if m["cid"] in FORM_B]
canA = [m["canary"] for m in formA]
zzzA = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in formA]
smA = [m["vals"]["parse/foxjson/small"] for m in formA]
caA = [m["vals"]["parse/foxurl/corpus-all"] for m in formA]


def profv(m):
    v11 = m["vals"].get("parse/foxurl/11")
    return v11 / m["canary"]


prA = [profv(m) for m in formA]
visit_no = len(formA)
print(f"FAST всего {len(fasts)}, Форма-A {len(formA)}, Форма-B {len(formB)}")
print(f"33c89cc = {visit_no}-я запись Формы-A (считая по хронологии Формы-A)")
print(f"кластер canary Формы-A: {min(canA)}-{max(canA)} "
      f"(Дельта {(max(canA) - min(canA)) / min(canA) * 100:.2f}%) — "
      f"784289 {'INSIDE' if min(canA) <= 784289 <= max(canA) else 'OUTSIDE'}")
print(f"zzz-конверт Формы-A: {min(zzzA)}-{max(zzzA)} — "
      f"121807 {'INSIDE' if min(zzzA) <= 121807 <= max(zzzA) else 'OUTSIDE'}")
print(f"small-норма Формы-A: {min(smA)}-{max(smA)} — "
      f"85 {'INSIDE' if min(smA) <= 85 <= max(smA) else 'OUTSIDE'}")
print(f"corpus-all Формы-A: {min(caA)}-{max(caA)} — "
      f"604 {'INSIDE' if min(caA) <= 604 <= max(caA) else 'OUTSIDE'}")
print(f"профиль-конверт Формы-A: {min(prA):.4e}-{max(prA):.4e} — "
      f"5.4827e-05 {'INSIDE' if min(prA) <= 5.482673e-05 <= max(prA) else 'OUTSIDE'}")

# --- АНАТОМИЯ против FAST-якоря 1c96db6 ---
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
print(f"\nАНАТОМИЯ против якоря 1c96db6 (idx 55): canary {cd!r} -> {cd:+.2f}% "
      f"({'INSIDE кластера Формы-A' if min(canA) <= last['canary'] <= max(canA) else 'OUTSIDE'})")
print(f"  слои: median {med!r} ({'НЕ-нуль' if med != 0.0 else 'НУЛЬ'}), "
      f"p10 {p10!r}, p90 {p90!r}, разброс {spread!r} -> {spread:.1f} п.п. "
      f"({'ВНУТРИ' if 3.0 <= spread <= 14.0 else 'ВНЕ'} FAST-коридора 3.0..14.0)")
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
