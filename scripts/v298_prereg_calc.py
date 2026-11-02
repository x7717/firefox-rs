#!/usr/bin/env python3
"""v298_prereg_calc.py — расчёт деталей пре-регистрации окна 298 (индексы
deltas, соседи, диапазон, нули, коридор MEDIUM-пар, twin-статы, контрол
serialize/foxurl/3) по формулам bench_history.py/analyze.py (f1/f2 dual).
Реплика вычислительного ядра. Судимая окна 298: 8869158 #314 (idx 313,
MEDIUM canary 938523) — план окна 297 СБЫЛСЯ ТОЧНО; пара от ЕЁ класса
(уроки 133/204): da96246 #310 (idx 309), distance 4, between 3 НЕ-MEDIUM
вставки ['3b83288', 'c9db45c', 'd4214c9']."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("scripts/data298.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for r in runs:
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"cid": r["commit"]["id"][:7], "vals": vals,
                 "canary": vals.get(CANARY)})
last, prev = meta[-1], meta[309]
assert last["cid"] == "8869158" and prev["cid"] == "da96246", \
    f"assert индекс-пиннинг: {last['cid']} / {prev['cid']}"
assert last["canary"] == 938523 and prev["canary"] == 1185503
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
worst, wname = 0.0, ""
for a, b, nm in zip(d1, d2, names):
    if abs(a - b) > worst:
        worst, wname = abs(a - b), nm
print(f"fp dual max |f1-f2| {worst!r} (worst {wname})")
flags = sorted(((a, nm) for a, nm in zip(d1, names) if a > 20.0), reverse=True)
print(f"ФЛАГИ (>20%): {len(flags)}")
for a, nm in flags:
    print(f"  ФЛАГ +{a:.1f}%  {nm}: {pv[nm]:.0f} -> {lv[nm]:.0f}"
          f"  (микро={lv[nm] < 200})")
ca, cb = pv[CANARY], lv[CANARY]
cd1 = (cb - ca) / ca * 100.0
print(f"canary-vs-пары {cd1!r} -> {cd1:+.2f}% (cur {cb} vs пара {ca})")
k3 = "serialize/foxurl/3"
print(f"КОНТРОЛ {k3}: {pv[k3]} -> {lv[k3]}")
print(f"corpus-all: {pv.get('parse/foxurl/corpus-all')} -> "
      f"{lv.get('parse/foxurl/corpus-all')}")

# --- коридор MEDIUM-пар по истории (n и границы) ---
meds = []
for i, m in enumerate(meta):
    c = m["canary"]
    if c and 900_000 <= c < 1_200_000:
        meds.append((i, m))
spreads = []
for k in range(1, len(meds)):
    (ia, ma), (ib, mb) = meds[k - 1], meds[k]
    ds = sorted((v - ma["vals"][nm]) / ma["vals"][nm] * 100.0
                for nm, v in mb["vals"].items() if ma["vals"].get(nm) and v)
    if len(ds) >= 10:
        m = len(ds)
        spreads.append(round(ds[min(int(m * 0.90), m - 1)] - ds[int(m * 0.10)], 1))
print(f"коридор MEDIUM-пар по истории: {min(spreads)}-{max(spreads)} п.п. "
      f"(n={len(spreads)}); our {sp1:.1f} "
      f"{'INSIDE' if min(spreads) <= sp1 <= max(spreads) else 'OUTSIDE'}")

# --- twin-статы MEDIUM 936-938k (подформа) ---
twins = [(264, "9da4f3e"), (245, "6241266")]
for i, cid in twins:
    tv = meta[i]["vals"]
    zzz_t = tv["find/foxsearch/zzz-absent-zzz"]
    zzz_l = lv["find/foxsearch/zzz-absent-zzz"]
    ds = sorted((v - tv[nm]) / tv[nm] * 100.0
                for nm, v in lv.items() if tv.get(nm) and v)
    m = len(ds)
    print(f"twin {cid} idx {i}: canary {meta[i]['canary']} "
          f"(Δ canary {(lv[CANARY]-meta[i]['canary'])/meta[i]['canary']*100:+.3f}%), "
          f"spread {ds[min(int(m*0.90), m-1)] - ds[int(m*0.10)]:.1f} п.п., "
          f"zzz {zzz_t} -> {zzz_l} ({(zzz_l-zzz_t)/zzz_t*100:+.1f}%)")
