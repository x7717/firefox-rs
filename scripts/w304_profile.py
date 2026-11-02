#!/usr/bin/env python3
"""w304_profile.py — СНАЧАЛА строка профиля (урок 229): судимая 56cf4dd
#320 (docs-пуш итерации 303, ожидаемый idx 319; CI 41426474836 +
Benchmark 41426474834 success 10:09:21Z, повторный CI 41430786348
success 10:41:13Z, pages 6b5ae3a 10:24:58Z). План окна 303 'судимая =
точка #320 (docs-пуш итерации 303 — коммит станет известен по факту
пуша, ожидаемый idx 319)' — сверка по ИНДЕКС-ПИННИНГУ (уроки 133/204):
судимая = meta[-1]; пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки 198/204):
MEDIUM-ядро->e63ee47 #319 (idx 318) / CLASSIC->6f22e55 #317 (idx 316) /
FAST->095148c #318 (idx 317, memory-slow внимание) / MEDIUM-подформа->
8869158 #314 (idx 313, twin-норма 7.2-8.2 при canary 895-940k). Точка
#321 НЕ пришла ДО машины (CDN 320 записей, meta[-1] = 56cf4dd, poll1 ==
poll2 sha 3f028ccb STABLE — урок W255, curl В ФАЙЛ). ЯДРО-маркер:
canary 1067-1072k + k3=3 + corpus-all 976-1014 => MEDIUM-ядро (пары
УЗКИЕ 2.4-3.1). Контрол serialize/foxurl/3 ЗАКРЫТ (картирование
2/3/19/4, окно 292/298)."""
import json
import re
from pathlib import Path

DATA = "scripts/data304.js"
PREV = "scripts/data303.js"
raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
print("total records:", n)
assert n == 320, f"ожидалось 320 записей, получено {n}"

def vals(r):
    return {b["name"]: b["value"] for b in r["benches"]}

def row(pos):
    r = runs[pos]
    v = vals(r)
    canary = v.get("parse/foxjson/session-5000")
    v11 = v.get("parse/foxurl/11")
    prof = v11 / canary if v11 and canary else None
    tag = ("OLD" if prof < 6.0e-05 else "NEW") if prof else "?"
    cls = ("FAST" if canary < 900_000 else
           "MEDIUM" if canary < 1_200_000 else "CLASSIC")
    print(f"idx {pos if pos >= 0 else n+pos} cid {r['commit']['id'][:7]}: "
          f"[{cls}] canary {canary} v11 {v11} профиль {prof:.4e} [{tag}]")
    return r["commit"]["id"][:7], cls, canary, prof, v

last_cid, last_cls, last_canary, last_prof, last_vals = row(-1)
row(-2)
row(-3)
assert last_cid == "56cf4dd", f"судимая cid {last_cid} != 56cf4dd"

# --- строка профиля судимой #320 ---
canary = last_vals["parse/foxjson/session-5000"]
zzz = last_vals.get("find/foxsearch/zzz-absent-zzz")
small = last_vals.get("parse/foxjson/small")
corpus = last_vals.get("parse/foxurl/corpus-all")
v11 = last_vals["parse/foxurl/11"]
k3 = last_vals.get("serialize/foxurl/3")
prof = v11 / canary
print(f"--- профиль судимой {last_cid} #320 ---")
print(f"класс [{last_cls}] (пороги FAST<900k / MEDIUM<1200k / CLASSIC>=1200k)")
if last_cls == "CLASSIC":
    frac = (canary - 1345000) / 30000
    print(f"canary {canary} канон-кластер 1345000-1375000: "
          f"{'INSIDE' if 1345000 <= canary <= 1375000 else 'OUTSIDE'}"
          + (f" (от нижней +{frac*100:.2f}% ширины)" if frac >= 0 else ""))
else:
    fa = 711_824 <= canary <= 816_814
    ms = 895_505 <= canary <= 938_638
    core = 1_067_000 <= canary <= 1_072_000
    print(f"canary {canary} Формы-A кластер 711824-816814: "
          f"{'INSIDE' if fa else 'OUTSIDE'} | подформа memory-slow "
          f"895505-938638: {'INSIDE' if ms else 'OUTSIDE'}"
          + (f" | ЯДРО-маркер 1067000-1072000: "
             f"{'INSIDE' if core else 'OUTSIDE'}"
             f" | MEDIUM-ядро 976000-1186000: "
             f"{'INSIDE' if 976_000 <= canary <= 1_186_000 else 'OUTSIDE'}"
             if last_cls == "MEDIUM" else ""))
print(f"k3 serialize/foxurl/3 = {k3} (картирование 2/3/19/4: 2=FAST/подформа/"
      f"двойня, 3=MEDIUM-ядро, 4=OLD-канон CLASSIC, 19=NEW-скошенная)")
if zzz is not None:
    print(f"zzz {zzz} OLD-конверт 203811-226663: "
          f"{'INSIDE' if 203811 <= zzz <= 226663 else 'OUTSIDE'}"
          + (f" | FAST-конверт 108773-159730: "
             f"{'INSIDE' if 108773 <= zzz <= 159730 else 'OUTSIDE'}"
             f" | twin-норма memory-slow 350166-355810: "
             f"{'INSIDE' if 350166 <= zzz <= 355810 else 'OUTSIDE'}"
             f" | MEDIUM-ядро zzz ~178k (окно 302/303): {'INSIDE' if 160000 <= zzz <= 200000 else 'OUTSIDE'}"
             f" (>=380k => memory-slow усиливается)"
             if last_cls != "CLASSIC" else ""))
if small is not None:
    print(f"small {small} CLASSIC-норма 143-153: "
          f"{'INSIDE' if 143 <= small <= 153 else 'OUTSIDE'}"
          + (f" | FAST-норма 77-89: "
             f"{'INSIDE' if 77 <= small <= 89 else 'OUTSIDE'}"
             if last_cls != "CLASSIC" else ""))
if corpus is not None:
    print(f"corpus-all {corpus} OLD-зона 1163-1228: "
          f"{'INSIDE' if 1163 <= corpus <= 1228 else 'OUTSIDE'}"
          f" | NEW-скошенная 1219-1424 | Формы-A 568-667 | "
          f"low-canary подформа 597-825 | MEDIUM ядро 976-1014")
print(f"профиль {v11}/{canary} = {prof:.4e} [{'OLD' if prof < 6.0e-05 else 'NEW'}] "
      f"(дискриминатор окна 229, порог 6.0e-05)"
      + (f"; OLD-коридор 5.25-5.91e-05 (урок 31): "
         f"{'INSIDE' if 5.25e-05 <= prof <= 5.91e-05 else 'OUTSIDE'}"
         if prof < 6.0e-05 else ""))

# --- MEDIUM-ядро кластер: визиты ---
if last_cls == "MEDIUM" and 1_067_000 <= canary <= 1_072_000:
    visits = []
    for i, r in enumerate(runs):
        v = vals(r)
        c = v.get("parse/foxjson/session-5000")
        if c and 1_067_000 <= c <= 1_072_000:
            visits.append((i, r["commit"]["id"][:7], c))
    print(f"визиты ЯДРО-кластера 1067-1072k: {len(visits)} "
          f"-> {[(i, c) for i, cid, c in visits[-6:]]}")

# --- ночные дубли: последние 10 записей по cid ---
from collections import Counter
cnt = Counter(r["commit"]["id"][:7] for r in runs[-10:])
print("дубли последних 10:", dict(cnt), "—",
      "НОЧНЫХ ДУБЛЕЙ НЕТ" if all(v == 1 for v in cnt.values()) else "ЕСТЬ ДУБЛИ")

# --- CONTINUITY vs data303.js ---
rawp = Path(PREV).read_text()
dp = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                          rawp, re.S).group(1))
rp = dp["entries"]["Rust Benchmark"]
same = all(json.dumps(rp[i], sort_keys=True) == json.dumps(runs[i], sort_keys=True)
           for i in range(len(rp)))
print(f"CONTINUITY 0-{len(rp)-1}: dict-равны data303.js = {same}")

# --- точки vs записи ---
uniq = len({r["commit"]["id"] for r in runs})
print(f"точек {uniq} (записей {n})")
