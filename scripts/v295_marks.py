#!/usr/bin/env python3
"""v295_marks.py — окно 295: маркеры записи 729d87c (точка #309, класс
CLASSIC canary 1374335; СНАЧАЛА строку профиля, урок 229): канон-кластер
1345000-1375000, OLD-канон подформа (68f8b0a-класса). АНАТОМИЯ: (1) same-form
OLD-канон свидетели — 9aeda95 (пара, idx 307) / 581d0fb (idx 305) / 7676353
(idx 303) / 68f8b0a (idx 300) / b94692e (idx 297) / d092b80 (idx 283) /
d70534f-якорь (idx 66) — ожидание УЗКОГО разброса (хост-идентичность);
(2) КОНТРАСТ чужих классов/форм — 6370dbb (idx 304, FAST) / 86b4cf4 (idx 302,
NEW-скошенная) / a4241de (idx 301, MEDIUM) / fe76381 (idx 299, 1260k) /
b74d5b2 (idx 298, 1223k) / 33c89cc (idx 296, FAST) — ожидание ШИРОКОГО.
КОНТРОЛ serialize/foxurl/3 (квантование 2/4/19 — свойство хоста, закрыт
окном 292). Формулы = analyze.py (урок 229: дискриминатор 6.0e-05)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data295.js"

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

last = meta[308]
assert last["cid"] == "729d87c" and last["cls"] == "CLASSIC"
assert last["canary"] == 1374335
lv = last["vals"]

# --- строка профиля (урок 229) ---
v11 = lv["parse/foxurl/11"]
prof = v11 / last["canary"]
zzz = lv["find/foxsearch/zzz-absent-zzz"]
small = lv["parse/foxjson/small"]
call = lv["parse/foxurl/corpus-all"]
print(f"ПРОФИЛЬ-СТРОКА: canary {last['canary']} INSIDE кластера 1345000-1375000 "
      f"(верхняя треть: от нижней +{(last['canary']-1345000)/30000:.2f}%)")
print(f"  профиль v11/canary = {v11}/{last['canary']} = {prof!r} [{('OLD' if prof<6.0e-05 else 'NEW')}]")
print(f"  zzz {zzz} | small {small} | corpus-all {call}")

# визит кластера: CLASSIC с canary в 1345000-1375000
visits = [m for m in meta if m["cls"] == "CLASSIC"
          and 1345000 <= m["canary"] <= 1375000]
# OLD-канон vs NEW-скошенная по профилю
old_n = [m for m in visits
         if m["vals"].get("parse/foxurl/11", 0) / m["canary"] < 6.0e-05]
new_n = [m for m in visits if m not in old_n]
print(f"  визит канон-кластера: {len(visits)}-й ({len(old_n)} OLD-канон + "
      f"{len(new_n)} NEW-скошенных)")

# OLD-канон эмпрический конверт профиля (все OLD-канон визиты кластера)
olprofs = sorted(m["vals"]["parse/foxurl/11"] / m["canary"] for m in old_n)
print(f"  OLD-канон конверт профиля (история, n={len(olprofs)}): "
      f"{olprofs[0]:.4e} - {olprofs[-1]:.4e}")
inside_env = olprofs[0] <= prof <= olprofs[-1]
print(f"  текущий {prof:.4e} {'INSIDE' if inside_env else 'OUTSIDE'} "
      f"исторического OLD-канон конверта; vs недавний конверт "
      f"5.5448e-05-5.8978e-05: {'INSIDE' if 5.5448e-05<=prof<=5.8978e-05 else 'ЧУТЬ НИЖЕ нижней границы (-0.27%)'}")
print(f"  широкий OLD-коридор 5.25-5.91e-05 (урок 31): "
      f"{'INSIDE' if 5.25e-05<=prof<=5.91e-05 else 'OUTSIDE'}")

# --- пять значений: p10/p90 rank + соседи, нули, диапазон ---
prev = meta[307]
assert prev["cid"] == "9aeda95"
pv = prev["vals"]
d1, d2, names = [], [], []
for name, v in lv.items():
    p = pv.get(name)
    if not p or not v:
        continue
    d1.append((v - p) / p * 100.0)
    d2.append((v / p - 1.0) * 100.0)
    names.append(name)
n = len(d1)
d1s = sorted(d1)
med = statistics.median(d1)
assert med == 0.0
ri = d1s.index(med)
i10 = int(n * 0.10)
i90 = min(int(n * 0.90), n - 1)
print(f"\nМЕДИАНА 0.0 rank[{ri}] соседи {d1s[ri-1]!r} / {d1s[ri+1]!r} "
      f"(TIE {'ДА' if d1s[ri+1] == 0.0 else 'НЕТ'})")
print(f"P10 {d1s[i10]!r} deltas[{i10}] соседи {d1s[i10-1]!r} / {d1s[i10+1]!r}")
print(f"P90 {d1s[i90]!r} deltas[{i90}] соседи {d1s[i90-1]!r} / {d1s[i90+1]!r}")
zeros = [(a, nm) for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ {len(zeros)}: " + ", ".join(nm for _, nm in zeros))
print(f"ДИАПАЗОН {min(d1)!r} .. {max(d1)!r}")
worst = max(zip((abs(a - b) for a, b in zip(d1, d2)), names))
print(f"FP max |f1-f2| {worst[0]!r} worst {worst[1]}")

# --- контрол serialize/foxurl/3 ---
c3p, c3l = pv.get("serialize/foxurl/3"), lv.get("serialize/foxurl/3")
print(f"\nКОНТРОЛ serialize/foxurl/3: {c3p} -> {c3l} "
      f"({'НУЛЬ' if c3p == c3l else f'{(c3l-c3p)/c3p*100:+.1f}%'})")
c3w = {"6370dbb": None, "86b4cf4": None, "a4241de": None}
for m in meta:
    if m["cid"] in c3w:
        c3w[m["cid"]] = m["vals"].get("serialize/foxurl/3")
print(f"  на контрастах: {c3w}")

# --- corpus-all счётчик ---
print(f"\nСЧЁТЧИК corpus-all: {pv['parse/foxurl/corpus-all']} -> {lv['parse/foxurl/corpus-all']} "
      f"{(lv['parse/foxurl/corpus-all']-pv['parse/foxurl/corpus-all'])/pv['parse/foxurl/corpus-all']*100:+.2f}% "
      f"({'ИНКРЕМЕНТ ЭРЫ' if (lv['parse/foxurl/corpus-all']-pv['parse/foxurl/corpus-all'])/pv['parse/foxurl/corpus-all']*100 >= 8.0 else 'СТОИТ'})")

# --- анатомия: same-form свидетели vs контрасты ---
def spread_vs(widx):
    w = meta[widx]
    wv = w["vals"]
    ds = []
    for name, v in lv.items():
        p = wv.get(name)
        if not p or not v:
            continue
        ds.append((v - p) / p * 100.0)
    ds.sort()
    sp = ds[min(int(len(ds)*0.90), len(ds)-1)] - ds[int(len(ds)*0.10)]
    fl = sum(1 for x in ds if x > 20.0)
    return w, sp, fl

print("\nСВИДЕТЕЛИ same-form OLD-канон:")
for widx, cid in [(307, "9aeda95"), (305, "581d0fb"), (303, "7676353"),
                  (300, "68f8b0a"), (297, "b94692e"), (283, "d092b80"),
                  (66, "d70534f")]:
    w, sp, fl = spread_vs(widx)
    dist = 308 - widx
    assert w["cid"] == cid, (w["cid"], cid)
    print(f"  vs {cid} idx {widx} distance {dist}: spread {sp:.1f} п.п., флагов {fl}")
print("КОНТРАСТЫ чужие классы/формы:")
for widx, cid in [(304, "6370dbb"), (302, "86b4cf4"), (301, "a4241de"),
                  (299, "fe76381"), (298, "b74d5b2"), (296, "33c89cc")]:
    w, sp, fl = spread_vs(widx)
    assert w["cid"] == cid, (w["cid"], cid)
    print(f"  vs {cid} idx {widx} [{w['cls']}]: spread {sp:.1f} п.п., флагов {fl}")

# --- крейт-стазис: пуш 9aeda95 vs пуш 729d87c (git) ---
print("\nкрейт-стазис проверяется git-диффом 9aeda95->729d87c crates/ (см. bash)")

# --- ночной след дублей: 729d87c и 9aeda95 по 1 записи? ---
from collections import Counter
cc = Counter(m["cid"] for m in meta)
print(f"дубли: 729d87c x{cc['729d87c']}, 9aeda95 x{cc['9aeda95']} "
      f"(ожидаем x1 x1 — НОЧНОЙ СЛЕД ДУБЛЕЙ НЕТ)")
