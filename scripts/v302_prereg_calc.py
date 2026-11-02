#!/usr/bin/env python3
"""v302_prereg_calc.py — расчёт семи пунктов ПРЕ-РЕГИСТРАЦИИ окна 302 ДО
машины (формулы = analyze.py dual f1/f2; ИНДЕКС-ПИННИНГ уроки 133/204;
УРОК 229: СНАЧАЛА строка профиля — выполнена w302_profile.py: судимая
095148c #318 FAST-класс canary 895505, профиль 49/895505 = 5.4718e-05
[OLD], zzz 352954 INSIDE twin-нормы 350166-355810, corpus-all 693, small
87; пара по классу = c9db45c #312 idx 311 distance 6, SAME-PROFILE
[OLD] 5.5469e-05, FAST-коридор 3.0..14.0)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = "scripts/data302.js"
PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
              ("/foxsearch/", "/std/")]

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = ("FAST" if c < 900_000 else
           "MEDIUM" if c < 1_200_000 else "CLASSIC")
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "cls": cls,
                 "canary": c, "vals": vals})

n_rec = len(meta)
last = meta[-1]
assert last["cid"] == "095148c" and last["cls"] == "FAST", "судимая"
li = last["idx"]
prev = next((x for x in reversed(meta[:-1]) if x["cls"] == last["cls"]), None)
pi = prev["idx"]
between = [x["cid"] for x in meta[pi + 1:li]]
print(f"AUTOPAIR: {last['cid']} [{last['cls']}] vs {prev['cid']} "
      f"[{prev['cls']}] idx {li} vs {pi}, distance {li - pi}, "
      f"between={between or 'NOTHING between'}")

lv, pv = last["vals"], prev["vals"]
d1, d2, names = [], [], []
for name, v in lv.items():
    p = pv.get(name)
    if not p or not v:
        continue
    d1.append((v - p) / p * 100.0)
    d2.append((v / p - 1.0) * 100.0)
    names.append(name)
n = len(d1)
d1s, d2s = sorted(d1), sorted(d2)
med1 = statistics.median(d1)
med2 = statistics.median(d2)
ri = d1s.index(med1) if med1 in d1s else None
p10i, p90i = int(n * 0.10), min(int(n * 0.90), n - 1)
p10_1, p90_1 = d1s[p10i], d1s[p90i]
p10_2, p90_2 = d2s[p10i], d2s[p90i]
sp1, sp2 = p90_1 - p10_1, p90_2 - p10_2
ca, cb = prev["canary"], last["canary"]
cd1 = (cb - ca) / ca * 100.0
cd2 = (cb / ca - 1.0) * 100.0
zeros = [(nm, pv[nm], lv[nm]) for a, nm in zip(d1, names) if a == 0.0]
worst, wname = 0.0, ""
for a, b, nm in zip(d1, d2, names):
    if abs(a - b) > worst:
        worst, wname = abs(a - b), nm
flags = sorted(((a, nm) for a, nm in zip(d1, names) if a > 20.0), reverse=True)
mn, mx = min(d1), max(d1)

def at(ds, k):
    return ds[k] if 0 <= k < len(ds) else None

print(f"\nПЯТЬ ЗНАЧЕНИЙ (n={n}):")
print(f"  MEDIAN {med1!r} (f2 {med2!r}, |diff| {abs(med1-med2):.3e})"
      + (f" rank[{ri}] соседи {d1s[ri-1]!r} / {d1s[ri+1]!r}"
         if ri is not None and 0 < ri < n - 1 else
         (f" rank[{ri}] край" if ri is not None else " интерполирована")))
print(f"  P10 {p10_1!r} (f2 {p10_2!r}) deltas[{p10i}] соседи "
      f"deltas[{p10i-1}]={d1s[p10i-1]!r} / deltas[{p10i+1}]={at(d1s, p10i+1)!r}")
n90b = d1s[p90i + 1] if p90i + 1 < n else d1s[p90i]
k90b = p90i + 1 if p90i + 1 < n else p90i
print(f"  P90 {p90_1!r} (f2 {p90_2!r}) deltas[{p90i}] соседи "
      f"deltas[{p90i-1}]={d1s[p90i-1]!r} / deltas[{k90b}]={n90b!r}")
print(f"  SPREAD {sp1!r} -> {sp1:.1f} п.п. (f2 {sp2!r})")
print(f"  CANARY-vs-ПАРА {cd1!r} -> {cd1:+.2f}% (cur {cb} vs пара {ca})")
print(f"  НУЛИ {len(zeros)}: " + ", ".join(
    f"{nm} {b}->{a}" for nm, a, b in zeros))
print(f"  ДИАПАЗОН {mn:.1f} .. {mx!r}")
print(f"  FP DUAL max |f1-f2| {worst!r} worst {wname}")
print(f"  ФЛАГИ {len(flags)}"
      + (": " + " / ".join(f"{nm} +{a:.1f}" for a, nm in flags) if flags else ""))
print(f"  МАШИНА-СТРОКА: median {med1:+.2f}%, p10 {p10_1:+.2f}%, "
      f"p90 {p90_1:+.2f}% (разброс {sp1:.1f} п.п.), canary {cd1:+.2f}%")

ratios = []
for name, v in lv.items():
    prt = None
    for a, b in PAIR_RULES:
        if a in name:
            prt = name.replace(a, b, 1)
            break
    pp = pv.get(prt) if prt else None
    if prt and pp and pv.get(name) and v:
        ratios.append((name.split("/")[1], (v / pv[name]) / (lv[prt] / pp)))
rmed = {}
for crate in sorted({c for c, _ in ratios}):
    ds = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
    rmed[crate] = statistics.median(ds)
print("  ОТНОШЕНИЯ exact: " + " ".join(f"{c}={v!r}" for c, v in sorted(rmed.items())))
print("  ОТНОШЕНИЯ печатные: " + " | ".join(
    f"{c} {v:+.1f}%" for c, v in sorted(rmed.items())))
span = max(rmed.values()) - min(rmed.values())
sup = [c for c, v in rmed.items() if v <= -5.0]
top = max(rmed, key=rmed.get)
print(f"  span {span!r} -> {span:.0f}, suppressed {sup}, top {top} {rmed[top]:+.2f}")

mat = (med1 == 0.0)
print(f"\nРЕЕСТР: 210-й КАНДИДАТ {'МАТЕРИАЛИЗОВАЛСЯ' if mat else 'НЕ материализуется'}"
      + (f" — median 0.0 РОВНО rank[{ri}] (f2 {med2!r}, |diff| "
         f"{abs(med1-med2):.3e})" if mat else f" — median {med1!r} rank[{ri}] НЕ-нуль"))
if mat and 0 < ri < n - 1:
    print(f"  соседи rank[{ri-1}]={d1s[ri-1]!r} / rank[{ri+1}]={d1s[ri+1]!r}")

k3 = "serialize/foxurl/3"
wits = ["6f22e55", "be8f248", "b9c5c45", "d4214c9", "8869158", "3b83288",
        "c9db45c", "6370dbb", "a4241de", "86b4cf4"]
kv = {m["cid"]: m["vals"].get(k3) for m in meta if m["cid"] in wits}
print(f"\nКОНТРОЛ {k3}: {kv}")

from collections import Counter
cc = Counter(m["cid"] for m in meta)
dupes = {c: k for c, k in cc.items() if k > 1}
cnt = len(cc)
corpus_now = lv["parse/foxurl/corpus-all"]
corpus_prev_window = 1180
print(f"\nСЧЁТЧИКИ: точек {cnt} (записей {n_rec}); дубли {sorted(dupes)} "
      f"({len(dupes)})")
print(f"  corpus-all {corpus_prev_window} -> {corpus_now} "
      f"{(corpus_now-corpus_prev_window)/corpus_prev_window*100:+.2f}%")

tail = [(m["cid"], m["cls"]) for m in meta[-6:]]
print(f"  хвост 6 записей: {tail}")
