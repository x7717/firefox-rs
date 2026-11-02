#!/usr/bin/env python3
"""v297_prereg_calc.py — расчёт деталей пре-регистрации окна 297 (индексы
deltas, соседи, диапазон, нули, контрол serialize/foxurl/3) по формулам
analyze.py (f1/f2 dual). Реплика вычислительного ядра analyze.py.
Судимая окна 297: d4214c9 #313 (idx 312) — ИНДЕКС-ПИННИНГ урок 204:
Benchmark d4214c9 41382471173 успел ДО машины => судимая = meta[-1] = #313,
пара пересчитана от ЕЁ класса: 3b83288 #311 (idx 310), distance 2,
between ['c9db45c'] (FAST вставка idx 311)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data297.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"cid": r["commit"]["id"][:7], "vals": vals})
last, prev = meta[-1], meta[-3]
assert last["cid"] == "d4214c9" and prev["cid"] == "3b83288", \
    f"assert индекс-пиннинг: {last['cid']} / {prev['cid']}"
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
i10, i90 = int(n * 0.10), min(int(n * 0.90), n - 1)
p10_1, p90_1 = d1s[i10], d1s[i90]
print(f"n={n}")
print(f"p10 idx deltas[{i10}] = {p10_1!r} (f2 {d2s[i10]!r})")
print(f"  соседи deltas[{i10-1}] = {d1s[i10-1]!r} / deltas[{i10+1}] = {d1s[i10+1]!r}")
print(f"p90 idx deltas[{i90}] = {p90_1!r} (f2 {d2s[i90]!r})")
print(f"  соседи deltas[{i90-1}] = {d1s[i90-1]!r} / deltas[{i90+1}] = {d1s[i90+1]!r}")
sp1 = p90_1 - p10_1
print(f"spread {sp1!r} -> {sp1:.1f} п.п. (f2 {d2s[i90]-d2s[i10]!r})")
print(f"ДИАПАЗОН {d1s[0]!r} .. {d1s[-1]!r}")
med1 = statistics.median(d1)
med2 = statistics.median(d2)
ri = d1s.index(med1)
print(f"median {med1!r} (f2 {med2!r}, |diff| {abs(med1-med2):.3e}) rank[{ri}] "
      f"соседи {d1s[ri-1]!r} / {d1s[ri+1]!r}")
zeros = [(nm, lv[nm], pv[nm]) for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ: {len(zeros)}")
print("  " + " + ".join(nm for nm, _, _ in zeros))
ca, cb = pv[CANARY], lv[CANARY]
cd1 = (cb - ca) / ca * 100.0
print(f"canary-vs-пары {cd1!r} -> {cd1:+.2f}% (cur {cb} vs пара {ca})")
k3 = "serialize/foxurl/3"
print(f"КОНТРОЛ {k3}: {pv[k3]} -> {lv[k3]}")
worst, wname = 0.0, ""
for a, b, nm in zip(d1, d2, names):
    if abs(a - b) > worst:
        worst, wname = abs(a - b), nm
print(f"fp dual max |f1-f2| {worst!r} (worst {wname})")
# corpus-all счётчик
print(f"corpus-all: {pv.get('parse/foxurl/corpus-all')} -> {lv.get('parse/foxurl/corpus-all')}")
pc, cc = pv.get('parse/foxurl/corpus-all'), lv.get('parse/foxurl/corpus-all')
if pc:
    print(f"  инкремент {(cc-pc)/pc*100.0!r} (порог +8.0)")
# min/max 4 пары
top4 = sorted(zip(d1, names))[:4]
bot4 = sorted(zip(d1, names), reverse=True)[:4]
print("min 4:", " / ".join(f"{nm} {v:.1f}" for v, nm in top4))
print("top 4:", " / ".join(f"{nm} +{v:.1f}" for v, nm in bot4))
