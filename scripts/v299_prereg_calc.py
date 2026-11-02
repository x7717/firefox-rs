#!/usr/bin/env python3
"""v299_prereg_calc.py — расчёт деталей пре-регистрации окна 299 (индексы
deltas, соседи, диапазон, нули, контрол serialize/foxurl/3 свидетели,
corpus-all, класс-статистика) по формулам bench_history.py/analyze.py
(f1/f2 dual). Судимая окна 299: b9c5c45 #315 (idx 314, CLASSIC canary
1360679 — docs-пуш итерации 298, Benchmark 41388627098 success). План
окна 298 'судимая = точка #315' СБЫЛСЯ ТОЧНО; пара от ЕЁ класса (уроки
133/204): d4214c9 #313 (idx 312, CLASSIC canary 1361935), distance 2,
between ['8869158' MEDIUM] — одна вставка НЕ одноклассна."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
K3 = "serialize/foxurl/3"
raw = Path("scripts/data299.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"i": i, "cid": r["commit"]["id"][:7], "vals": vals,
                 "canary": vals.get(CANARY)})
last, prev = meta[-1], meta[312]
assert last["cid"] == "b9c5c45" and prev["cid"] == "d4214c9", \
    f"assert индекс-пиннинг: {last['cid']} / {prev['cid']}"
assert last["canary"] == 1360679 and prev["canary"] == 1361935
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
for nm, a, b in zeros:
    print(f"  нуль {nm}: {b} -> {a}")
worst, wname = 0.0, ""
for a, b, nm in zip(d1, d2, names):
    if abs(a - b) > worst:
        worst, wname = abs(a - b), nm
print(f"fp dual max |f1-f2| {worst!r} (worst {wname})")
flags = sorted(((a, nm) for a, nm in zip(d1, names) if a > 20.0), reverse=True)
print(f"ФЛАГИ (>20%): {len(flags)}")
for a, nm in flags:
    print(f"  ФЛАГ +{a:.1f}%  {nm}: {pv[nm]:.0f} -> {lv[nm]:.0f}  (микро={lv[nm] < 200})")
ca, cb = pv[CANARY], lv[CANARY]
cd1 = (cb - ca) / ca * 100.0
print(f"canary-vs-пары {cd1!r} -> {cd1:+.2f}% (cur {cb} vs пара {ca})")
print(f"КОНТРОЛ {K3}: {pv[K3]} -> {lv[K3]}")
print(f"corpus-all: {pv.get('parse/foxurl/corpus-all')} -> "
      f"{lv.get('parse/foxurl/corpus-all')} "
      f"({(lv.get('parse/foxurl/corpus-all')-pv.get('parse/foxurl/corpus-all'))/pv.get('parse/foxurl/corpus-all')*100:+.2f}%)")

# --- контрол свидетели (квантование 2/3/19/4) ---
wits = ["b9c5c45", "d4214c9", "8869158", "3b83288", "c9db45c", "6370dbb",
        "a4241de", "86b4cf4"]
kv = {m["cid"]: m["vals"].get(K3) for m in meta if m["cid"] in wits}
print(f"КОНТРОЛ свидетели {K3}: {kv}")

# --- CLASSIC-статистика: same-profile [OLD] спреды последовательных
# CLASSIC-пар по истории (аналог коридора) ---
cls_idx = [m["i"] for m in meta if m["canary"] and m["canary"] >= 1_200_000]
spreads = []
for k in range(1, len(cls_idx)):
    ia, ib = cls_idx[k - 1], cls_idx[k]
    if ib - ia > 4:
        continue  # только близкие пары (distance <= 4)
    ma, mb = meta[ia], meta[ib]
    pa = ma["vals"]["parse/foxurl/11"] / ma["canary"]
    pb = mb["vals"]["parse/foxurl/11"] / mb["canary"]
    if (pa < 6.0e-05) != (pb < 6.0e-05):
        continue  # same-profile only
    ds = sorted((v - ma["vals"][nm]) / ma["vals"][nm] * 100.0
                for nm, v in mb["vals"].items() if ma["vals"].get(nm) and v)
    if len(ds) >= 10:
        m = len(ds)
        spreads.append(round(ds[int(m * 0.90)] - ds[int(m * 0.10)], 1))
print(f"CLASSIC same-profile спреды (distance<=4, n={len(spreads)}): "
      f"{min(spreads)}-{max(spreads)} п.п.; our {sp1:.1f} "
      f"{'INSIDE' if min(spreads) <= sp1 <= max(spreads) else 'OUTSIDE'}")
print(f"CLASSIC-коридор урок 31/W276: 2.2-4.5 п.п. — our {sp1:.1f} "
      f"{'INSIDE' if 2.2 <= sp1 <= 4.5 else 'OUTSIDE'} (на нижней границе)")
