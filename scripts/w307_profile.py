#!/usr/bin/env python3
"""w307_profile.py — СНАЧАЛА строка профиля (урок 229): судимая окна 307 =
meta[-1] = 65e4922 idx 324 (docs-пуш аддендум итерации 306, CI
41442107355 success + Benchmark 41442107292 success 12:07:19Z). План
окна 306 'судимая = точка #323 (docs-пуш итерации 306, ожидаемый idx
322)' СДВИНУЛСЯ: аддендум 65e4922 ТОЖЕ получил Benchmark => 324 записи
ожидались, ФАКТ = 325 (schedule Benchmark 41440487960, старт bc87bb7
11:54:45Z, завершился ПОСЛЕ пушей — Store атрибуция main-типу на момент
Store = 65e4922, прецеденты w228 87d7d86 / w251 f3a9631 / w281 628dd1f).
ИНДЕКС-ПИННИНГ (уроки 133/204): судимая = meta[-1] = 65e4922 idx 324
[CLASSIC-канон canary 1351596]; 65e4922 = 11-й Store-дубль (копия-1 idx
322 [FAST 775759] класс-конфликт, копия-2 idx 324 [CLASSIC 1351596]) —
расширение белого списка 10 -> 11 ТОЛЬКО с пре-регистрацией диффа
(урок 204, в этом скрипте). Пара от класса судимой (уроки 198/204):
CLASSIC-канон->6f22e55 #317 (idx 316, canary 1362935) — ветка плана
окна 306; distance 8, между idx 317-323 НЕТ канон-CLASSIC.
CDN poll 1 FRESH 325 записей sha256 d5f5163b + РЕ-ПОЛЛ x2 ТОТ ЖЕ sha
STABLE — урок W255, curl В ФАЙЛ, data307.js = ПОЛНЫЙ CDN (урок 156)."""
import json
import re
from collections import Counter
from pathlib import Path

DATA = "scripts/data307.js"
PREV = "scripts/data306.js"
raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
print("total records:", n)
assert n == 325, f"ожидалось 325, получено {n}"

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
row(-4)
assert last_cid == "65e4922", f"судимая cid {last_cid} != 65e4922"

# --- строка профиля судимой #325 (idx 324) ---
canary = last_vals["parse/foxjson/session-5000"]
zzz = last_vals.get("find/foxsearch/zzz-absent-zzz")
small = last_vals.get("parse/foxjson/small")
corpus = last_vals.get("parse/foxurl/corpus-all")
v11 = last_vals["parse/foxurl/11"]
k3 = last_vals.get("serialize/foxurl/3")
prof = v11 / canary
print(f"--- профиль судимой {last_cid} idx 324 ---")
print(f"класс [{last_cls}] (пороги FAST<900k / MEDIUM<1200k / CLASSIC>=1200k)")
print(f"canary {canary} канон-кластер 1345000-1375000: "
      f"{'INSIDE' if 1345000 <= canary <= 1375000 else 'OUTSIDE'}"
      f" | low-CLASSIC семья 1201000-1262000: "
      f"{'INSIDE' if 1_201_000 <= canary <= 1_262_000 else 'OUTSIDE'}"
      f" | вкус k3=4 1254000-1262000: "
      f"{'INSIDE' if 1_254_000 <= canary <= 1_262_000 else 'OUTSIDE'}"
      f" | вкус k3=3 1201000-1228000: "
      f"{'INSIDE' if 1_201_000 <= canary <= 1_228_000 else 'OUTSIDE'}")
print(f"k3 serialize/foxurl/3 = {k3} (картирование 2/3/19/4: 2=FAST/подформа/"
      f"двойня, 3=MEDIUM-ядро, 4=OLD-канон CLASSIC, 19=NEW-скошенная)")
if zzz is not None:
    print(f"zzz {zzz} OLD-конверт 203811-226663: "
          f"{'INSIDE' if 203811 <= zzz <= 226663 else 'OUTSIDE'}"
          f" | низкий-конверт вкуса k3=3/канон 203811-231085 (zzz-конверт "
          f"сводки): {'INSIDE' if 203811 <= zzz <= 231085 else 'OUTSIDE'}")
if small is not None:
    print(f"small {small} CLASSIC-норма 143-153: "
          f"{'INSIDE' if 143 <= small <= 153 else 'OUTSIDE'}")
if corpus is not None:
    print(f"corpus-all {corpus} OLD-зона 1163-1228: "
          f"{'INSIDE' if 1163 <= corpus <= 1228 else 'OUTSIDE'}"
          f" | NEW-скошенная 1219-1424 | Формы-A 568-667 | "
          f"low-canary подформа 597-825 | MEDIUM ядро 976-1014 | "
          f"low-CLASSIC вкус 927-938 | аномалия окна 305 = 1074")
print(f"профиль {v11}/{canary} = {prof:.4e} [{'OLD' if prof < 6.0e-05 else 'NEW'}] "
      f"(дискриминатор окна 229, порог 6.0e-05)"
      + (f"; OLD-коридор 5.25-5.91e-05 (урок 31, канон-форма): "
         f"{'INSIDE' if 5.25e-05 <= prof <= 5.91e-05 else 'OUTSIDE'}"
         if prof < 6.0e-05 else ""))

# --- 11-й Store-дубль 65e4922: пре-регистрация диффа копий (урок 204) ---
c1, c2 = vals(runs[322]), vals(runs[324])
assert runs[322]["commit"]["id"][:7] == "65e4922" and runs[324]["commit"]["id"][:7] == "65e4922"
common = [k for k in c1 if k in c2]
diff = [(k, c1[k], c2[k], (c2[k]-c1[k])/c1[k]*100.0)
        for k in common if c1[k] != c2[k]]
same = len(common) - len(diff)
print(f"--- ДУБЛЬ 65e4922 (пре-регистрация диффа, урок 204) ---")
print(f"копия-1 idx 322 [FAST canary {c1['parse/foxjson/session-5000']}] "
      f"(schedule 41440487960, Store-атрибуция main на момент Store); "
      f"копия-2 idx 324 [CLASSIC canary {c2['parse/foxjson/session-5000']}] "
      f"(push Benchmark 41442107292)")
print(f"общих bench: {len(common)}, РАЗЛИЧНЫХ: {len(diff)}, ИДЕНТИЧНЫХ: {same}")
for k, a, b, pct in sorted(diff, key=lambda x: -abs(x[3]))[:8]:
    print(f"  {k}: {a} -> {b} ({pct:+.2f}%)")
c1s = c1["parse/foxjson/session-5000"]
c2s = c2["parse/foxjson/session-5000"]
print(f"canary сдвиг копий: {(c2s-c1s)/c1s*100.0:+.2f}% ({c1s} vs {c2s}) — "
      f"класс-конфликт FAST/CLASSIC (3-й после 87d7d86 w228, 628dd1f w281); "
      f"white-list 10 -> 11 С ПРЕ-РЕГИСТРАЦИЕЙ")

# --- ночные дубли: последние 10 записей по cid ---
cnt = Counter(r["commit"]["id"][:7] for r in runs[-10:])
print("дубли последних 10:", dict(cnt), "—",
      "ЕСТЬ ДУБЛЬ 65e4922 (11-й, пре-регистрирован выше)"
      if any(v > 1 for v in cnt.values()) else "НОЧНЫХ ДУБЛЕЙ НЕТ")

# --- канон-CLASSIC свидетели (для пары, окно 307: судимая канон) ---
wit = []
for i in range(len(runs) - 1, -1, -1):
    v = vals(runs[i])
    c = v.get("parse/foxjson/session-5000")
    if c and 1_345_000 <= c <= 1_375_000:
        wit.append((i, runs[i]["commit"]["id"][:7], c))
    if len(wit) >= 8:
        break
print(f"канон-CLASSIC свидетели (ближайшие 8, новые сверху): {wit}")

# --- CONTINUITY vs data306.js ---
rawp = Path(PREV).read_text()
dp = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                          rawp, re.S).group(1))
rp = dp["entries"]["Rust Benchmark"]
same = all(json.dumps(rp[i], sort_keys=True) == json.dumps(runs[i], sort_keys=True)
           for i in range(len(rp)))
print(f"CONTINUITY 0-{len(rp)-1}: dict-равны data306.js = {same}")
