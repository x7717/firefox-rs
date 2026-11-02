#!/usr/bin/env python3
"""v302_marks.py — окно 302: маркеры записи 095148c (точка #318, класс
FAST canary 895505 — docs-пуш итерации 301; СНАЧАЛА строку профиля, урок
229 — выполнена w302_profile.py: НЕ Формы-A — canary OUTSIDE кластера
711824-816814, zzz 352954 INSIDE twin-нормы 350166-355810, corpus-all 693
INSIDE low-canary подформы 597-825, профиль 5.4718e-05 [OLD]). Пара
(GUARD авто) = c9db45c #312 (idx 311), distance 6, 5 вставок НЕ
одноклассны. АНАТОМИЯ: (1) same-class FAST Формы-A свидетели — c9db45c
(пара) / 6370dbb #305 / 33c89cc #294 — ожидание ШИРОКОГО (судимая НЕ
Формы-A); (2) twin-свидетели memory-slow подформы — 8869158 #314
(MEDIUM) / 9da4f3e #264 / 6241266 #245 (MEDIUM-двойня canary ~936-938k)
— ожидание УЗКОГО. КОНТРОЛ serialize/foxurl/3 (квантование 2/3/19/4).
Формулы = analyze.py (урок 229: дискриминатор 6.0e-05)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = "scripts/data302.js"

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

last = meta[317]
assert last["cid"] == "095148c" and last["cls"] == "FAST"
assert last["canary"] == 895505
lv = last["vals"]


def spread_of(i):
    pv = meta[i]["vals"]
    ds = sorted((v - pv[nm]) / pv[nm] * 100.0 for nm, v in lv.items()
                if pv.get(nm) and v)
    n = len(ds)
    return n, ds[int(n * 0.10)], ds[int(n * 0.90)]


print("АНАТОМИЯ — same-class FAST Формы-A свидетели (ожидание ШИРОКОГО — "
      "судимая НЕ Формы-A):")
WIT = [(311, "c9db45c", "пара"), (304, "6370dbb", "FAST"),
       (296, "33c89cc", "FAST")]
for i, cid, tag in WIT:
    assert meta[i]["cid"] == cid, f"idx {i}: {meta[i]['cid']} != {cid}"
    n, p10, p90 = spread_of(i)
    sp = p90 - p10
    prof_i = meta[i]["vals"]["parse/foxurl/11"] / meta[i]["canary"]
    print(f"  {cid} idx {i} [{tag}] distance {317-i}: spread {sp:.1f} п.п. "
          f"(p10 {p10:.1f} / p90 {p90:.1f}), профиль {prof_i:.4e} "
          f"[{'OLD' if prof_i < 6.0e-05 else 'NEW'}]")

print("АНАТОМИЯ — twin-свидетели memory-slow подформы (ожидание УЗКОГО):")
TWIN = [(313, "8869158", "MEDIUM memory-slow"), (264, "9da4f3e", "MEDIUM twin"),
        (245, "6241266", "MEDIUM twin")]
for i, cid, tag in TWIN:
    assert meta[i]["cid"] == cid, f"idx {i}: {meta[i]['cid']} != {cid}"
    n, p10, p90 = spread_of(i)
    sp = p90 - p10
    zzz_i = meta[i]["vals"].get("find/foxsearch/zzz-absent-zzz")
    print(f"  {cid} idx {i} [{tag}] distance {317-i}: spread {sp:.1f} п.п. "
          f"(p10 {p10:.1f} / p90 {p90:.1f}), canary {meta[i]['canary']}, "
          f"zzz {zzz_i}")

# --- пять значений (replica analyze.py) ---
prev = meta[311]
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
      f"{d1s[int(n*0.90)]-d1s[int(n*0.10)]:.1f} п.п. ШИРОКИЙ >20")
cd = (lv[CANARY] - pv[CANARY]) / pv[CANARY] * 100.0
print(f"CANARY-vs-ПАРА {cd!r} -> {cd:+.2f}% (cur {lv[CANARY]} vs пара "
      f"{pv[CANARY]})")
print(f"НУЛИ {len(zeros)} ({', '.join(nm for nm, _, _ in zeros)})")
print(f"FP max |f1-f2| {worst!r} worst {wname}")
print(f"ФЛАГИ {len(flags)}"
      + (": " + " / ".join(f"{nm} +{a:.1f}" for a, nm in flags[:5]) if flags else ""))

k3 = "serialize/foxurl/3"
wits = ["095148c", "c9db45c", "6370dbb", "33c89cc", "8869158", "9da4f3e",
        "6241266", "6f22e55", "be8f248", "a4241de", "86b4cf4"]
kv = {m["cid"]: m["vals"].get(k3) for m in meta if m["cid"] in wits}
print(f"\nКОНТРОЛ {k3}: {kv} (квантование 2/3/19/4; 2 = FAST; "
      f"контрол закрыт окном 292)")

cnt = len({m["cid"] for m in meta})
print(f"СЧЁТЧИКИ: точек {cnt} (записей {len(meta)}; +1 НОВАЯ точка за окно "
      f"— 095148c #318); счётчик corpus-all 1180 -> "
      f"{lv['parse/foxurl/corpus-all']} "
      f"{(lv['parse/foxurl/corpus-all']-1180)/1180*100:+.2f}% (судимая НЕ "
      f"OLD-канон — инкремент эры урока 229 НЕ применим)")
print("Серия пяти значений 99-302 ожидается 192/192 (СОТ ДЕВЯНОСТО "
      "ВТОРОЙ) при 7/7 пре-регистрации")
