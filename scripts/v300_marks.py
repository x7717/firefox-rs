#!/usr/bin/env python3
"""v300_marks.py — окно 300: маркеры записи be8f248 (точка #316, класс
CLASSIC canary 1355359; СНАЧАЛА строку профиля, урок 229 — выполнена
w300_profile.py: канонический CLASSIC OLD-канон, 167-й визит кластера,
профиль 5.6812e-05 [OLD] INSIDE конверта n=153). Пара (GUARD авто) =
b9c5c45 #315 (idx 314), distance 1, NOTHING between — СМЕЖНАЯ пара.
АНАТОМИЯ: (1) same-class CLASSIC свидетели (same-profile OLD-канон) —
b9c5c45 (пара) / d4214c9 #313 / 3b83288 #311 / 729d87c #309 / 9aeda95
#308 / 2069adf #307 / 581d0fb #306 — ожидание УЗКОГО (хост-форма);
(2) КОНТРАСТЫ чужих классов — 8869158 (MEDIUM, distance 2) / c9db45c
(FAST, 4) / 6370dbb (FAST, 11) — ожидание ШИРОКОГО. КОНТРОЛ
serialize/foxurl/3 (квантование 2/3/19/4 — свойство хоста, закрыт
окном 292). Формулы = analyze.py (урок 229: дискриминатор 6.0e-05)."""
import json
import re
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = "scripts/data300.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900_000 else ("MEDIUM" if c < 1_200_000 else "CLASSIC")
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "cls": cls,
                 "canary": c, "vals": vals})

last = meta[315]
assert last["cid"] == "be8f248" and last["cls"] == "CLASSIC"
assert last["canary"] == 1355359
lv = last["vals"]


def spread_of(i):
    pv = meta[i]["vals"]
    ds = sorted((v - pv[nm]) / pv[nm] * 100.0 for nm, v in lv.items()
                if pv.get(nm) and v)
    n = len(ds)
    return n, ds[int(n * 0.10)], ds[int(n * 0.90)]


print("АНАТОМИЯ — same-class CLASSIC свидетели (same-profile [OLD], "
      "ожидание УЗКОГО 2.2-4.5, урок 31/W276):")
WIT = [(314, "b9c5c45", "пара"), (312, "d4214c9", "CLASSIC"),
       (310, "3b83288", "CLASSIC"), (308, "729d87c", "CLASSIC"),
       (307, "9aeda95", "CLASSIC"), (306, "2069adf", "CLASSIC"),
       (305, "581d0fb", "CLASSIC")]
for i, cid, tag in WIT:
    assert meta[i]["cid"] == cid, f"idx {i}: {meta[i]['cid']} != {cid}"
    n, p10, p90 = spread_of(i)
    sp = p90 - p10
    prof_i = meta[i]["vals"]["parse/foxurl/11"] / meta[i]["canary"]
    print(f"  {cid} idx {i} [{tag}] distance {315-i}: spread {sp:.1f} п.п. "
          f"(p10 {p10:.1f} / p90 {p90:.1f}), профиль {prof_i:.4e} "
          f"[{'OLD' if prof_i < 6.0e-05 else 'NEW'}]")

print("АНАТОМИЯ — КОНТРАСТЫ чужих классов (ожидание ШИРОКОГО):")
CON = [(313, "8869158", "MEDIUM"), (311, "c9db45c", "FAST"),
       (304, "6370dbb", "FAST")]
for i, cid, tag in CON:
    assert meta[i]["cid"] == cid, f"idx {i}: {meta[i]['cid']} != {cid}"
    n, p10, p90 = spread_of(i)
    sp = p90 - p10
    print(f"  {cid} idx {i} [{tag}] distance {315-i}: spread {sp:.1f} п.п. "
          f"(p10 {p10:.1f} / p90 {p90:.1f})")

# --- пять значений (replica analyze.py) ---
prev = meta[314]
pv = prev["vals"]
d1, d2, names = [], [], []
for name, v in lv.items():
    p = pv.get(name)
    if not p or not v:
        continue
    d1.append((v - p) / p * 100.0)
    d2.append((v / p - 1.0) * 100.0)
    names.append(name)
d1s = sorted(d1)
n = len(d1)
import statistics
med1 = statistics.median(d1)
med2 = statistics.median(sorted(d2))
ri = d1s.index(med1)
zeros = [(nm, lv[nm], pv[nm]) for a, nm in zip(d1, names) if a == 0.0]
worst, wname = 0.0, ""
for a, b, nm in zip(d1, d2, names):
    if abs(a - b) > worst:
        worst, wname = abs(a - b), nm
flags = sorted(((a, nm) for a, nm in zip(d1, names) if a > 20.0), reverse=True)
print(f"\nПЯТЬ ЗНАЧЕНИЙ (n={n}): MEDIAN {med1!r} rank[{ri}] соседи "
      f"{d1s[ri-1]!r} / {d1s[ri+1]!r}")
print(f"P10 {d1s[int(n*0.10)]!r} deltas[{int(n*0.10)}] | "
      f"P90 {d1s[int(n*0.90)]!r} deltas[{int(n*0.90)}] | "
      f"SPREAD {d1s[int(n*0.90)]-d1s[int(n*0.10)]!r} -> "
      f"{d1s[int(n*0.90)]-d1s[int(n*0.10)]:.1f} п.п. УЗКИЙ <20")
cd = (lv[CANARY] - pv[CANARY]) / pv[CANARY] * 100.0
print(f"CANARY-vs-ПАРА {cd!r} -> {cd:+.2f}% (cur {lv[CANARY]} vs пара "
      f"{pv[CANARY]})")
print(f"НУЛИ {len(zeros)} ({', '.join(nm for nm, _, _ in zeros)})")
print(f"FP max |f1-f2| {worst!r} worst {wname}")
print(f"ФЛАГИ {len(flags)}"
      + (": " + " / ".join(f"{nm} +{a:.1f}" for a, nm in flags) if flags else ""))

k3 = "serialize/foxurl/3"
wits = ["be8f248", "b9c5c45", "d4214c9", "8869158", "3b83288", "c9db45c",
        "6370dbb", "a4241de", "86b4cf4"]
kv = {m["cid"]: m["vals"].get(k3) for m in meta if m["cid"] in wits}
print(f"\nКОНТРОЛ {k3}: {kv} (квантование 2/3/19/4; 4 = CLASSIC-норма; "
      f"контрол закрыт окном 292)")

cnt = len({m["cid"] for m in meta})
print(f"СЧЁТЧИКИ: точек {cnt} (записей {len(meta)}; +1 НОВАЯ точка за окно "
      f"— be8f248 #316); счётчик corpus-all 1183 -> "
      f"{lv['parse/foxurl/corpus-all']} "
      f"{(lv['parse/foxurl/corpus-all']-1183)/1183*100:+.2f}% СТОИТ (14) "
      f"— при OLD-канон судимой +8.0 и выше инкремент эры урока 229")
print("Серия пяти значений 99-300 ожидается 190/190 (СОТ ДЕВЯНОСТЫЙ) "
      "при 7/7 пре-регистрации")
