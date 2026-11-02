#!/usr/bin/env python3
"""v304_prereg_calc.py — расчёт ДО машины (окно 304): точная реплика математики
tools/bench_history.py check_regression (порог 20.0) + реестр-кандидат + нули +
fp dual. Судимая 56cf4dd #320 (idx 319, FAST Формы-A canary 726792), пара
095148c #318 (idx 317, canary 895505, подформа «938k + memory-slow»),
distance 2, between ['e63ee47'] — авто-пара даст ШИРОКОЕ (контраст форм,
ВНИМАНИЕ плана окна 303; канон-свидетель Формы-A c9db45c #312 idx 311)."""
import json
import re
import statistics
from pathlib import Path

raw = Path("scripts/data304.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
assert n == 320 and runs[-1]["commit"]["id"].startswith("56cf4dd")

def vals_of(r):
    return {b["name"]: b["value"] for b in r["benches"]}

last_vals = vals_of(runs[-1])
pair_vals = vals_of(runs[317])
assert runs[317]["commit"]["id"].startswith("095148c")

# дельты — точный порядок машины
deltas, regressions = [], []
for name, v in last_vals.items():
    pv = pair_vals.get(name)
    if not pv or not v:
        continue
    delta = (v - pv) / pv * 100.0
    deltas.append(delta)
    if delta > 20.0:
        regressions.append((delta, name, pv, v))
ds = sorted(deltas)
nd = len(ds)
med = statistics.median(ds)
p10 = ds[int(nd * 0.10)]
p90 = ds[min(int(nd * 0.90), nd - 1)]
spread = p90 - p10
ca = pair_vals["parse/foxjson/session-5000"]
cb = last_vals["parse/foxjson/session-5000"]
cdelta = (cb - ca) / ca * 100.0

print(f"n дельт: {nd}")
print(f"MEDIAN {med!r} rank[{ds.index(med)}]" if med in ds else f"MEDIAN {med!r} (интерполяция)")
sidx = ds.index(med) if med in ds else None
if sidx is not None:
    lo = ds[sidx - 1] if sidx > 0 else None
    hi = ds[sidx + 1] if sidx < nd - 1 else None
    tie = (lo == med) or (hi == med)
    print(f"  соседи {lo!r} / {hi!r} — {'TIE' if tie else 'НЕ TIE'}")
print(f"P10 {p10!r} (rank[{ds.index(p10)}], соседи {ds[ds.index(p10)-1]!r} / {ds[ds.index(p10)+1]!r})")
print(f"P90 {p90!r} (rank[{ds.index(p90)}], соседи {ds[ds.index(p90)-1]!r} / {ds[ds.index(p90)+1]!r})")
print(f"SPREAD {spread!r} -> {spread:.1f} п.п. {'ШИРОКИЙ >20' if spread > 20 else 'УЗКИЙ <=20'}")
print(f"CANARY-vs-ПАРА {cdelta!r} -> {cdelta:+.2f}% ({cb} vs {ca})")
nulls = [(name) for name, v in last_vals.items()
         if pair_vals.get(name) and v == pair_vals[name]]
print(f"НУЛИ {len(nulls)}: {nulls}")
regressions.sort(reverse=True)
print(f"ФЛАГИ {len(regressions)} (>20%): "
      + " / ".join(f"{n2.split('/', 1)[1] if '/' in n2 else n2} +{dv:.1f}" for dv, n2, _, _ in regressions[:15]))
neg = [x for x in ds if x < 0]
print(f"отрицательных дельт: {len(neg)}; min {ds[0]:.2f} max {ds[-1]:.2f} ДИАПАЗОН {ds[0]:.2f}..{ds[-1]:.2f}")

fp = 0.0
worst = ""
for name, v in last_vals.items():
    pv = pair_vals.get(name)
    if not pv or not v:
        continue
    f1 = (v - pv) / pv * 100.0
    f2 = (v / pv - 1.0) * 100.0
    if abs(f1 - f2) > fp:
        fp, worst = abs(f1 - f2), name
print(f"fp dual max {fp!r} (worst {worst}) — {'CLEAN' if fp < 1e-9 else 'CHECK'}")

PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"), ("/foxsearch/", "/std/")]
def std_partner(name):
    for a, b in PAIR_RULES:
        if a in name:
            return name.replace(a, b, 1)
    return None
ratios = []
for name, v in last_vals.items():
    partner = std_partner(name)
    pv_p = pair_vals.get(partner) if partner else None
    pv = pair_vals.get(name)
    if not (partner and pv_p and pv and v and name in pair_vals):
        continue
    ratios.append((name.split("/")[1], (v / pv) / (last_vals[partner] / pv_p)))
rmed = {}
for crate in sorted({c for c, _ in ratios}):
    dsl = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
    if dsl:
        rmed[crate] = statistics.median(dsl)
print("ОТНОШЕНИЯ: " + " | ".join(f"{c} {v:+.1f}%" for c, v in sorted(rmed.items()))
      + f" (exact {' / '.join(f'{c} {rmed[c]!r}' for c in sorted(rmed))})")
span = (max(rmed.values()) - min(rmed.values())) if rmed else 0.0
suppressed = [c for c, v in rmed.items() if v <= -5.0]
top_crate = max(rmed, key=rmed.get) if rmed else None
elevated = top_crate is not None and rmed[top_crate] >= 8.0
print(f"span {span!r} -> {span:.0f} п.п.; suppressed {suppressed}; top {top_crate} "
      f"{rmed.get(top_crate, 0):+.2f}% elevated={elevated}")

if not regressions:
    note = (abs(cdelta) > 3) or spread > 20
    print(f"ПРОГНОЗ: ПАРИТЕТ exit 0 {'С ЗАМЕТКОЙ' if note else 'БЕЗ заметки'}")
else:
    if spread > 20.0:
        if suppressed:
            print("ПРОГНОЗ: ДРЕЙФ СРЕДЫ exit 3 (suppressed НЕ пуст)")
        elif elevated:
            print(f"ПРОГНОЗ: РЕГРЕСС exit 1 (elevated {top_crate})")
        else:
            print("ПРОГНОЗ: ДРЕЙФ СРЕДЫ exit 3 (глобальный сдвиг)")
    else:
        print("ПРОГНОЗ: РЕГРЕСС exit 1 (узкое распределение)")

cids = [r["commit"]["id"] for r in runs]
uniq = set(cids)
print(f"точек (уникальных cid): {len(uniq)} (записей {n})")
from collections import Counter
cnt = Counter(cids)
dups = {k[:7]: v for k, v in cnt.items() if v > 1}
print(f"дубли в истории: {dups if dups else 'НЕТ'} (белый список 7: 336e9ff/415fe95/2b6489b/6a239dc/76d4050/68e6dd4/ff7b23e)")
# контрол k3 пары
print(f"КОНТРОЛ serialize/foxurl/3: {pair_vals.get('serialize/foxurl/3')} -> "
      f"{last_vals.get('serialize/foxurl/3')} (картирование 2/3/19/4)")
# crates стазис
