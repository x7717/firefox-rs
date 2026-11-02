#!/usr/bin/env python3
"""w308_profile.py — СНАЧАЛА строка профиля (урок 229): судимая окна 308 =
meta[-1] = 07c98d1 idx 325 (docs-пуш итерации 307, CI 41446664448 success
+ Benchmark 41446664287 success 12:40:47Z; pages 153ee63 12:56:55Z).
План окна 307 'судимая = точка #326 (docs-пуш итерации 307, ожидаемый
idx 325)' СБЫЛСЯ ТОЧНО: CDN 326 записей, meta[-1] = 07c98d1, точек больше
НЕ пришло (точек ПАРАМИ/ТРОЙКАМИ не было — schedule-Store дублей НЕТ,
assert по факту). Пара от класса судимой (индекс-пиннинг уроки 133/204;
МАШИННОЕ правило урок 305 — последний ОДНОКЛАССНЫЙ umbrella-предшественник):
кандидаты-пары CLASSIC-канон->65e4922 #325 (idx 324) /
CLASSIC-low->bc87bb7 #322 (idx 321, норма вкуса k3=4 16.2-24.8) /
FAST-Формы-A->56cf4dd #320 (idx 319, норма 5.4-16.7) /
FAST-подформа->095148c #318 (idx 317, twin-норма 7.2-8.2) /
MEDIUM-ядро->e63ee47 #319 (idx 318, ЯДРО-норма 2.4-3.1) /
MEDIUM-подформа->8869158 #314 (idx 313).
Для ДРЕЙФ-разрешения окна 307 — естественный повторный прогон придёт со
следующей одноклассной записью. CDN poll x3 ТОТ ЖЕ sha256 9d1c7e7f STABLE
(урок W255), data308.js = ПОЛНЫЙ CDN БЕЗ СРЕЗА (урок 156, 17-й раз)."""
import json
import re
from collections import Counter
from pathlib import Path

DATA = "scripts/data308.js"
PREV = "scripts/data307.js"
raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
print("total records:", n)
assert n == 326, f"ожидалось 326, получено {n}"


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
assert last_cid == "07c98d1", f"судимая cid {last_cid} != 07c98d1"

# --- строка профиля судимой #326 (idx 325) ---
canary = last_vals["parse/foxjson/session-5000"]
zzz = last_vals.get("find/foxsearch/zzz-absent-zzz")
small = last_vals.get("parse/foxjson/small")
corpus = last_vals.get("parse/foxurl/corpus-all")
v11 = last_vals["parse/foxurl/11"]
k3 = last_vals.get("serialize/foxurl/3")
prof = v11 / canary
print(f"--- профиль судимой {last_cid} idx 325 ---")
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

# --- ночные дубли: последние 10 записей по cid ---
cnt = Counter(r["commit"]["id"][:7] for r in runs[-10:])
dup = any(v > 1 for v in cnt.values())
print("дубли последних 10:", dict(cnt), "—",
      "ЕСТЬ ДУБЛЬ" if dup else "НОЧНЫХ ДУБЛЕЙ НЕТ (12-й Store-дубль НЕ прибыл)")
if dup:
    print("!!! ПРИ НОВОМ Store-дубле — расширение белого списка ТОЛЬКО "
          "с пре-регистрацией диффа (урок 204)")

# --- МАШИННОЕ ПРАВИЛО пары (урок 305): последний ОДНОКЛАССНЫЙ
# umbrella-предшественник судимой ---
umb = {"FAST": "FAST", "MEDIUM": "MEDIUM", "CLASSIC": "CLASSIC"}[last_cls]
pair_pos = None
between = []
for i in range(n - 2, -1, -1):
    v = vals(runs[i])
    c = v.get("parse/foxjson/session-5000")
    ccls = ("FAST" if c < 900_000 else
            "MEDIUM" if c < 1_200_000 else "CLASSIC") if c else "?"
    if ccls == umb:
        pair_pos = i
        break
    between.append(runs[i]["commit"]["id"][:7])
assert pair_pos is not None, "одноклассный предшественник НЕ найден"
pv = vals(runs[pair_pos])
pc = pv["parse/foxjson/session-5000"]
pv11 = pv["parse/foxurl/11"]
pk3 = pv.get("serialize/foxurl/3")
pprof = pv11 / pc
pcls = ("FAST" if pc < 900_000 else
        "MEDIUM" if pc < 1_200_000 else "CLASSIC")
print(f"--- МАШИННАЯ ПАРА (урок 305): {runs[pair_pos]['commit']['id'][:7]} "
      f"(idx {pair_pos}) [{pcls}] canary {pc} v11 {pv11} профиль "
      f"{pprof:.4e} [{'OLD' if pprof < 6.0e-05 else 'NEW'}] k3 {pk3}; "
      f"distance {n-1-pair_pos}, between ({len(between)}): {between}")
print(f"пара umbrella-класс {'СОВПАДАЕТ'}: {umb} vs {umb}")

# --- канон-CLASSIC свидетели ---
wit = []
for i in range(len(runs) - 1, -1, -1):
    v = vals(runs[i])
    c = v.get("parse/foxjson/session-5000")
    if c and 1_345_000 <= c <= 1_375_000:
        wit.append((i, runs[i]["commit"]["id"][:7], c))
    if len(wit) >= 8:
        break
print(f"канон-CLASSIC свидетели (ближайшие 8, новые сверху): {wit}")

# --- CONTINUITY vs data307.js ---
rawp = Path(PREV).read_text()
dp = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                          rawp, re.S).group(1))
rp = dp["entries"]["Rust Benchmark"]
same = all(json.dumps(rp[i], sort_keys=True) == json.dumps(runs[i], sort_keys=True)
           for i in range(len(rp)))
print(f"CONTINUITY 0-{len(rp)-1}: dict-равны data307.js = {same}")
