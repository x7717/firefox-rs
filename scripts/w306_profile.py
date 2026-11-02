#!/usr/bin/env python3
"""w306_profile.py — СНАЧАЛА строка профиля (урок 229): судимая bc87bb7
#322 (docs-пуш итерации 305, ожидаемый idx 321; CI 41438399869 success +
Benchmark 41438399920 success 11:38:21Z). План окна 305 'судимая = точка
#322 (docs-пуш итерации 305)' — сверка по ИНДЕКС-ПИННИНГУ (уроки 133/204):
судимая = meta[-1]; пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки 198/204):
CLASSIC-low->933038a #321 (idx 320, норма вкуса k3=4 16.2-24.8) /
CLASSIC-канон->6f22e55 #317 (idx 316) / FAST-Формы-A->56cf4dd #320 (idx 319) /
FAST-подформа->095148c #318 (idx 317) / MEDIUM-ядро->e63ee47 #319 (idx 318) /
MEDIUM-подформа->8869158 #314 (idx 313). CDN poll 1 FRESH 322 записей
sha256 61c8662c + РЕ-ПОЛЛ x2 ТОТ ЖЕ sha STABLE — урок W255, curl В ФАЙЛ.
ВНИМАНИЕ план: аномалии окна 305 (профиль [NEW] 6.192e-05 + corpus-all
1074) — если форма повторится, оформлять как подформу low-CLASSIC [NEW]."""
import json
import re
from pathlib import Path

DATA = "scripts/data306.js"
PREV = "scripts/data305.js"
raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
print("total records:", n)
assert n in (322, 323), f"ожидалось 322 (или 323 при сдвиге), получено {n}"

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
assert last_cid == "bc87bb7", f"судимая cid {last_cid} != bc87bb7"

# --- строка профиля судимой #322 ---
canary = last_vals["parse/foxjson/session-5000"]
zzz = last_vals.get("find/foxsearch/zzz-absent-zzz")
small = last_vals.get("parse/foxjson/small")
corpus = last_vals.get("parse/foxurl/corpus-all")
v11 = last_vals["parse/foxurl/11"]
k3 = last_vals.get("serialize/foxurl/3")
prof = v11 / canary
print(f"--- профиль судимой {last_cid} #322 ---")
print(f"класс [{last_cls}] (пороги FAST<900k / MEDIUM<1200k / CLASSIC>=1200k)")
if last_cls == "CLASSIC":
    print(f"canary {canary} канон-кластер 1345000-1375000: "
          f"{'INSIDE' if 1345000 <= canary <= 1375000 else 'OUTSIDE'}"
          f" | low-CLASSIC семья 1201000-1262000: "
          f"{'INSIDE' if 1_201_000 <= canary <= 1_262_000 else 'OUTSIDE'}"
          f" | вкус k3=4 1254000-1262000: "
          f"{'INSIDE' if 1_254_000 <= canary <= 1_262_000 else 'OUTSIDE'}"
          f" | вкус k3=3 1201000-1228000: "
          f"{'INSIDE' if 1_201_000 <= canary <= 1_228_000 else 'OUTSIDE'}")
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
          + (f" | low-CLASSIC вкус k3=4 333000-386000: "
             f"{'INSIDE' if 333_000 <= zzz <= 386_000 else 'OUTSIDE'}"
             f" (вкус k3=3 ~1201-1228k canary) | ВЫШЕ вкуса ="
             f" {((zzz-386000)/386000*100):+.1f}% к max"
             if last_cls == "CLASSIC" else
             f" | FAST-конверт 108773-159730: "
             f"{'INSIDE' if 108773 <= zzz <= 159730 else 'OUTSIDE'}"
             f" | twin-норма memory-slow 350166-355810: "
             f"{'INSIDE' if 350166 <= zzz <= 355810 else 'OUTSIDE'}"
             f" | MEDIUM-ядро zzz ~178k (окно 302/303): {'INSIDE' if 160000 <= zzz <= 200000 else 'OUTSIDE'}"
             f" (>=380k => memory-slow усиливается)"))
if small is not None:
    print(f"small {small} CLASSIC-норма 143-153: "
          f"{'INSIDE' if 143 <= small <= 153 else 'OUTSIDE'}"
          + (f" | low-CLASSIC вкус k3=4 129-131: "
             f"{'INSIDE' if 129 <= small <= 131 else 'OUTSIDE'}"
             f" | вкус k3=3 117-119: "
             f"{'INSIDE' if 117 <= small <= 119 else 'OUTSIDE'}"
             if last_cls == "CLASSIC" else
             f" | FAST-норма 77-89: "
             f"{'INSIDE' if 77 <= small <= 89 else 'OUTSIDE'}"))
if corpus is not None:
    print(f"corpus-all {corpus} OLD-зона 1163-1228: "
          f"{'INSIDE' if 1163 <= corpus <= 1228 else 'OUTSIDE'}"
          f" | NEW-скошенная 1219-1424 | Формы-A 568-667 | "
          f"low-canary подформа 597-825 | MEDIUM ядро 976-1014 | "
          f"low-CLASSIC вкус 927-938: "
          f"{'INSIDE' if 927 <= corpus <= 938 else 'OUTSIDE'}"
          f" | АНОМАЛИЯ окна 305 = 1074: {'ПОВТОРИЛАСЬ' if corpus >= 1000 else 'НЕ повторилась'}")
print(f"профиль {v11}/{canary} = {prof:.4e} [{'OLD' if prof < 6.0e-05 else 'NEW'}] "
      f"(дискриминатор окна 229, порог 6.0e-05)"
      + (f"; OLD-коридор 5.25-5.91e-05 (урок 31): "
         f"{'INSIDE' if 5.25e-05 <= prof <= 5.91e-05 else 'OUTSIDE'}"
         if prof < 6.0e-05 else "; АНОМАЛИЯ окна 305 [NEW] 6.192e-05: "
         f"{'ПОВТОРИЛАСЬ' if prof >= 6.0e-05 else 'НЕ повторилась'}"))

# --- low-CLASSIC k3=4 свидетели (для пары, окно 306: судимая low-CLASSIC) ---
if last_cls == "CLASSIC" and not (1_345_000 <= canary <= 1_375_000):
    wit = []
    for i in range(len(runs) - 1, -1, -1):
        v = vals(runs[i])
        c = v.get("parse/foxjson/session-5000")
        k3v = v.get("serialize/foxurl/3")
        if c and 1_254_000 <= c <= 1_262_000 and k3v == 4:
            wit.append((i, runs[i]["commit"]["id"][:7], c))
        if len(wit) >= 8:
            break
    print(f"low-CLASSIC k3=4 вкуса свидетели (ближайшие 8): {wit}")

# --- ночные дубли: последние 10 записей по cid ---
from collections import Counter
cnt = Counter(r["commit"]["id"][:7] for r in runs[-10:])
print("дубли последних 10:", dict(cnt), "—",
      "НОЧНЫХ ДУБЛЕЙ НЕТ" if all(v == 1 for v in cnt.values()) else "ЕСТЬ ДУБЛИ")

# --- CONTINUITY vs data305.js ---
rawp = Path(PREV).read_text()
dp = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                          rawp, re.S).group(1))
rp = dp["entries"]["Rust Benchmark"]
same = all(json.dumps(rp[i], sort_keys=True) == json.dumps(runs[i], sort_keys=True)
           for i in range(len(rp)))
print(f"CONTINUITY 0-{len(rp)-1}: dict-равны data305.js = {same}")
