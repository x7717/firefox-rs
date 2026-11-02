#!/usr/bin/env python3
"""w302_profile.py — СНАЧАЛА строка профиля (урок 229): судимая 095148c
#318 (docs-пуш итерации 301, ожидаемый idx 317; Benchmark 41418418207).
План окна 301 'судимая = точка #318' — сверка по ИНДЕКС-ПИННИНГУ (уроки
133/204): судимая = meta[-1]; пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки
198/204): CLASSIC->6f22e55 #317 (idx 316) / FAST->c9db45c #312 (idx 311) /
MEDIUM->8869158 #314 (idx 313, кандидат-пара «938k + memory-slow»). Канон-
кластер CLASSIC 1345000-1375000; OLD-канон подформа (68f8b0a-класса)
профиль <6.0e-05 / NEW-скошенная >=6.0e-05. Минимум OLD-конверта окна 295
5.5299e-05. Контрол serialize/foxurl/3 ЗАКРЫТ (картирование 2/3/19/4 +
2 на MEDIUM-low, окно 292/298)."""
import json
import re
from pathlib import Path

DATA = "scripts/data302.js"
raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
print("total records:", n)
assert n == 318, f"ожидалось 318 записей, получено {n}"

def row(pos):
    r = runs[pos]
    vals = {b["name"]: b["value"] for b in r["benches"]}
    canary = vals.get("parse/foxjson/session-5000")
    v11 = vals.get("parse/foxurl/11")
    prof = v11 / canary if v11 and canary else None
    tag = ("OLD" if prof < 6.0e-05 else "NEW") if prof else "?"
    cls = ("FAST" if canary < 900_000 else
           "MEDIUM" if canary < 1_200_000 else "CLASSIC")
    print(f"idx {pos if pos >= 0 else n+pos} cid {r['commit']['id'][:7]}: "
          f"[{cls}] canary {canary} v11 {v11} профиль {prof:.4e} [{tag}]")
    return r["commit"]["id"][:7], cls, canary, prof, vals

last_cid, last_cls, last_canary, last_prof, last_vals = row(-1)
row(-2)
row(-3)
assert last_cid == "095148c", f"судимая cid {last_cid} != 095148c"

# --- строка профиля судимой #318 ---
canary = last_vals["parse/foxjson/session-5000"]
zzz = last_vals.get("find/foxsearch/zzz-absent-zzz")
small = last_vals.get("parse/foxjson/small")
corpus = last_vals.get("parse/foxurl/corpus-all")
v11 = last_vals["parse/foxurl/11"]
prof = v11 / canary
print(f"--- профиль судимой {last_cid} #318 ---")
print(f"класс [{last_cls}] (пороги FAST<900k / MEDIUM<1200k / CLASSIC>=1200k)")
frac = (canary - 1345000) / 30000
print(f"canary {canary} канон-кластер 1345000-1375000: "
      f"{'INSIDE' if 1345000 <= canary <= 1375000 else 'OUTSIDE'}"
      + (f" (от нижней +{frac*100:.2f}% ширины)" if frac >= 0 else ""))
print(f"zzz {zzz} OLD-конверт 203811-226663: "
      f"{'INSIDE' if 203811 <= zzz <= 226663 else 'OUTSIDE'}")
print(f"small {small} CLASSIC-норма 143-153: "
      f"{'INSIDE' if 143 <= small <= 153 else 'OUTSIDE'}")
print(f"corpus-all {corpus} OLD-зона 1163-1228: "
      f"{'INSIDE' if 1163 <= corpus <= 1228 else 'OUTSIDE'}"
      f" | NEW-скошенная 1219-1424 | Формы-A 568-667 | MEDIUM ядро 976-1014")
print(f"профиль {v11}/{canary} = {prof:.4e} [{'OLD' if prof < 6.0e-05 else 'NEW'}] "
      f"(дискриминатор окна 229, порог 6.0e-05)")

# визиты кластера: все записи с canary в 1345000-1375000
visits = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get("parse/foxjson/session-5000")
    if c and 1_345_000 <= c <= 1_375_000:
        p = vals.get("parse/foxurl/11", 0) / c
        visits.append((i, r["commit"]["id"][:7], p))
old_n = sum(1 for _, _, p in visits if p < 6.0e-05)
new_n = len(visits) - old_n
print(f"визит кластера: {len(visits)}-й ({old_n} OLD-канон + {new_n} NEW-скошенных)")
if prof < 6.0e-05:
    oprof = sorted(p for _, _, p in visits if p < 6.0e-05)
    print(f"OLD-канон конверт n={old_n}: {oprof[0]:.4e}-{oprof[-1]:.4e} "
          f"(минимум окна 295 5.5299e-05 {'держится' if oprof[0] >= 5.5299e-05 - 1e-11 else 'РАСШИРЕН ВНИЗ'}; "
          f"INSIDE {'да' if oprof[0] <= prof <= oprof[-1] else 'НЕТ'}; "
          f"широкий OLD-коридор 5.25-5.91e-05, урок 31: "
          f"{'INSIDE' if 5.25e-05 <= prof <= 5.91e-05 else 'OUTSIDE'})")

# --- пара: БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки 198/204) ---
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get("parse/foxjson/session-5000")
    cls = ("FAST" if c < 900_000 else
           "MEDIUM" if c < 1_200_000 else "CLASSIC")
    meta.append((i, r["commit"]["id"][:7], cls, c, vals))
prev = next((x for x in reversed(meta[:-1]) if x[2] == last_cls), None)
pi, pcid, pcls, pcanary, pvals = prev
between = [x[1] for x in meta[pi + 1:n - 1]]
pprof = pvals["parse/foxurl/11"] / pcanary
print(f"--- пара (БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА, уроки 198/204) ---")
print(f"пара: {last_cid} [{last_cls}] vs {pcid} [{pcls}] idx {n-1} vs {pi}, "
      f"distance {n-1-pi}, between={between or 'NOTHING between'}")
print(f"  профиль пары: {pcid} {pprof:.4e} [{'OLD' if pprof < 6.0e-05 else 'NEW'}] — "
      f"{'SAME-PROFILE' if (pprof < 6.0e-05) == (prof < 6.0e-05) else 'CROSS-PROFILE'}")
same_cls_idx = [i for i, _, c2, _, _ in meta if c2 == last_cls]
print(f"  одноклассных записей [{last_cls}]: {len(same_cls_idx)}")
k3_last = last_vals.get("serialize/foxurl/3")
k3_pair = pvals.get("serialize/foxurl/3")
print(f"КОНТРОЛ serialize/foxurl/3: {k3_pair} -> {k3_last}")
print(f"canary-vs-пары: ({canary} vs {pcanary}) "
      f"{(canary - pcanary) / pcanary * 100:+.2f}%")
