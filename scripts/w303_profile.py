#!/usr/bin/env python3
"""w303_profile.py — СНАЧАЛА строка профиля (урок 229): судимая e63ee47
#319 (docs-пуш итерации 302, ожидаемый idx 318; check-runs: criterion
bench + history success 09:41:29Z, fmt+clippy+test+doc success 09:41:49Z).
План окна 302 'судимая = точка #319 (docs-пуш итерации 302 — коммит станет
известен по факту пуша, ожидаемый idx 318)' — сверка по ИНДЕКС-ПИННИНГУ
(уроки 133/204): судимая = meta[-1]; пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА
(уроки 198/204): FAST->095148c #318 (idx 317; ВНИМАНИЕ memory-slow
подформа — авто-пара даст ШИРОКОЕ, канон-свидетель Формы-A c9db45c #312
idx 311) / CLASSIC->6f22e55 #317 (idx 316) / MEDIUM->8869158 #314
(idx 313; при canary 895-940k ТРЕТИЙ ЧЛЕН подформы, пара 095148c УЗКОЕ
7-8 twin-норма). Точка #320 НЕ пришла ДО машины (CDN 319 записей,
meta[-1] = e63ee47, poll1==poll2 sha 3a5fac78 STABLE, урок W255).
Канон-кластер CLASSIC 1345000-1375000; Формы-A кластер 711824-816814;
подформа memory-slow canary 895505-938638, twin-норма zzz 350166-355810.
Контрол serialize/foxurl/3 ЗАКРЫТ (картирование 2/3/19/4, окно 292/298)."""
import json
import re
from pathlib import Path

DATA = "scripts/data303.js"
raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
print("total records:", n)
assert n == 319, f"ожидалось 319 записей, получено {n}"

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
assert last_cid == "e63ee47", f"судимая cid {last_cid} != e63ee47"

# --- строка профиля судимой #319 ---
canary = last_vals["parse/foxjson/session-5000"]
zzz = last_vals.get("find/foxsearch/zzz-absent-zzz")
small = last_vals.get("parse/foxjson/small")
corpus = last_vals.get("parse/foxurl/corpus-all")
v11 = last_vals["parse/foxurl/11"]
prof = v11 / canary
print(f"--- профиль судимой {last_cid} #319 ---")
print(f"класс [{last_cls}] (пороги FAST<900k / MEDIUM<1200k / CLASSIC>=1200k)")
if last_cls == "CLASSIC":
    frac = (canary - 1345000) / 30000
    print(f"canary {canary} канон-кластер 1345000-1375000: "
          f"{'INSIDE' if 1345000 <= canary <= 1375000 else 'OUTSIDE'}"
          + (f" (от нижней +{frac*100:.2f}% ширины)" if frac >= 0 else ""))
else:
    fa = 711_824 <= canary <= 816_814
    ms = 895_505 <= canary <= 938_638
    print(f"canary {canary} Формы-A кластер 711824-816814: "
          f"{'INSIDE' if fa else 'OUTSIDE'} | подформа memory-slow "
          f"895505-938638: {'INSIDE' if ms else 'OUTSIDE'}")
if zzz is not None:
    print(f"zzz {zzz} OLD-конверт 203811-226663: "
          f"{'INSIDE' if 203811 <= zzz <= 226663 else 'OUTSIDE'}"
          + (f" | FAST-конверт 108773-159730: "
             f"{'INSIDE' if 108773 <= zzz <= 159730 else 'OUTSIDE'}"
             f" | twin-норма memory-slow 350166-355810: "
             f"{'INSIDE' if 350166 <= zzz <= 355810 else 'OUTSIDE'}"
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

# визиты кластера: CLASSIC канон-кластер / FAST Формы-A кластер
lo, hi = (1_345_000, 1_375_000) if last_cls == "CLASSIC" else (711_824, 816_814)
visits = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get("parse/foxjson/session-5000")
    if c and lo <= c <= hi:
        p = vals.get("parse/foxurl/11", 0) / c
        visits.append((i, r["commit"]["id"][:7], p))
if last_cls == "CLASSIC":
    old_n = sum(1 for _, _, p in visits if p < 6.0e-05)
    new_n = len(visits) - old_n
    print(f"визит кластера: {len(visits)}-й ({old_n} OLD-канон + {new_n} NEW-скошенных)")
    if prof < 6.0e-05:
        oprof = sorted(p for _, _, p in visits if p < 6.0e-05)
        print(f"OLD-канон конверт n={old_n}: {oprof[0]:.4e}-{oprof[-1]:.4e} "
              f"(минимум окна 295 5.5299e-05 {'держится' if oprof[0] >= 5.5299e-05 - 1e-11 else 'РАСШИРЕН ВНИЗ'}; "
              f"INSIDE {'да' if oprof[0] <= prof <= oprof[-1] else 'НЕТ'})")
else:
    print(f"визит Формы-A кластера: {len(visits)}-й "
          f"({'INSIDE' if any(v[1] == last_cid for v in visits) else 'НЕ входит'})")

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
# маркер подформы
if zzz is not None and last_cls != "CLASSIC":
    print(f"маркер подформы: zzz {zzz} — канон ~350k "
          f"{'(INSIDE twin-нормы)' if 350166 <= zzz <= 355810 else ''}"
          f"{'; memory-slow УСИЛИВАЕТСЯ' if zzz >= 380_000 else ''}")
