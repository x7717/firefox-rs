#!/usr/bin/env python3
"""v267_analyze.py — окно 279: точка #285 b1bf50c (класс CLASSIC canary
1261019 INSIDE зоны-930 canary-кластера 1260391-1262371 трёх визитов;
СНАЧАЛА строка профиля, урок 229). ПЕРВЫЙ ВИЗИТ ЗОНЫ-930 ПОСЛЕ w275:
профиль 68/1261019 = 5.3925e-05 [OLD-таг], corpus-all 930 = ЗОНА-930,
zzz 359407, small 131 — подпись зоны-930 из плана окна 278 СБЫЛАСЬ ДО
машины (canary ~1260k, corpus-all ~930, zzz >=300k). Прецеденты
зоны-930: 5ae02bc #213 (idx 214: 938/1262371/371561/131, w215) и
680b8e9 #265 (idx 275: 930/1260391/351428/130, w266 ТИХИЙ ПАРИТЕТ) —
стабильность хоста трёх визитов: canary ДЕЛЬТА <=0.16%, corpus-all
930-938, small 130-131, профиль 5.3867-5.3952e-05 (ДЕЛЬТА <=0.02e-05).
GUARD-пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (план окна 278, уроки 198/204):
CLASSIC->e990865 #284 (idx 286, СМЕЖНАЯ distance 1) — СБЫЛАСЬ ДО
машины (новая запись CLASSIC); MEDIUM->87ec41e #266 (idx 268) /
FAST->4eb8807 #283 (idx 285) НЕ актуальны. Пара КРОСС-ПРОФИЛЬНАЯ
([OLD] 5.3925e-05 vs [NEW] 7.6325e-05, дискриминатор окна 229, порог
6.0e-05) — CLASSIC-коридор 2.2-4.5 НЕ применим (same-profile only).
План окна 278, ветка зоны-930: 'ДРЕЙФ + зона-930 стабильна' — прогноз
вердикта ДРЕЙФ СРЕДЫ exit 3 (урок 148); canary-vs-пары -7.45% (cur
1261019 vs пара 1362588 — cur БЫСТРЕЕ, хост зоны-930 скоростнее
NEW-хоста); foxurl-отношения ожидаемо suppressed <= -5% (corpus-all
930 vs 1276). Формулы = bench_history.py (двойная формула f1/f2).
Класс: FAST<900k, MEDIUM<1.2M, CLASSIC иначе. Реестр: серия = 0,
следить за 187-м кандидатом (median == +0.0 материализуется, -0.0 не
идёт; вариант-медиана в реестр НЕ идёт)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
WHITELIST = {"336e9ff", "415fe95", "2b6489b", "6a239dc", "76d4050",
             "68e6dd4", "87d7d86", "ff7b23e", "f3a9631"}
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data279.js"

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

print(f"записей в истории: {len(meta)}")
from collections import Counter
cnt = Counter(m["cid"] for m in meta)
dubs = sorted(c for c, n in cnt.items() if n > 1)
print(f"коммитов-дублей: {len(dubs)} {dubs}")
print(f"  белый список {len(WHITELIST)}: "
      + ("СОВПАДАЕТ" if set(dubs) == WHITELIST else "РАСШИРЯЕТСЯ/ОТЛИЧАЕТСЯ"))
print(f"  точек (уникальных коммитов): {len(cnt)}")

last = meta[-1]
same = [m for m in meta[:-1] if m["cls"] == last["cls"]]
pair = same[-1] if same else None
between = [m["cid"] for m in meta[pair["idx"] + 1:last["idx"]]] if pair else []
dist = last["idx"] - pair["idx"] if pair else None
print(f"\nпоследняя запись: idx {last['idx']} {last['cid']} "
      f"[{last['cls']}] canary={last['canary']}")
print(f"пара (GUARD): {last['cid']} [{last['cls']}] vs {pair['cid']} "
      f"[{pair['cls']}] idx {last['idx']} vs {pair['idx']}, "
      f"distance {dist}, between={between}")


def prof(m):
    v11 = m["vals"].get("parse/foxurl/11")
    p = v11 / m["canary"]
    return p, "[OLD]" if p < 6.0e-05 else "[NEW]"


pl, tagl = prof(last)
pp, tagp = prof(pair)
same_profile = (pl < 6.0e-05) == (pp < 6.0e-05)
print(f"  профиль v11/canary: {last['cid']} {pl:.4e} {tagl} / "
      f"{pair['cid']} {pp:.4e} {tagp} — "
      f"{'SAME-PROFILE' if same_profile else 'CROSS-PROFILE'} "
      f"(дискриминатор окна 229, порог 6.0e-05)")

lv, pv = last["vals"], pair["vals"]
d1, d2, names = [], [], []
for name, v in lv.items():
    p = pv.get(name)
    if p and v:
        d1.append((v - p) / p * 100.0)
        d2.append((v / p - 1.0) * 100.0)
        names.append(name)
n = len(d1)
d1s = sorted(d1)
d2s = sorted(d2)
med = statistics.median(d1)
med_rank = d1s.index(med) if med in d1s else None
i10, i90 = int(n * 0.10), int(n * 0.90)
p10 = d1s[i10]
p90 = d1s[i90]
spread = p90 - p10
ca, cb = pair["canary"], last["canary"]
cd = (cb - ca) / ca * 100.0

print(f"\nсравнимых бенчей: n={n}")
print(f"МЕДИАНА: {med!r} (f2 {statistics.median(d2)!r}, "
      f"|diff| {abs(med - statistics.median(d2)):.3e})")
if med_rank is not None:
    print(f"  rank: [{med_rank}] соседи {d1s[med_rank-1]!r} / "
          f"{d1s[med_rank+1]!r}")
else:
    print(f"  rank: интерполирована {med!r}")
print(f"P10: {p10!r} (f2 {d2s[i10]!r}) deltas[{i10}] соседи "
      f"{d1s[i10-1]!r} / {d1s[i10+1]!r}")
print(f"P90: {p90!r} (f2 {d2s[i90]!r}) deltas[{i90}] соседи "
      f"{d1s[i90-1]!r} / {d1s[i90+1]!r}")
print(f"SPREAD: {spread!r} -> {spread:.1f} п.п. (f2 {d2s[i90]-d2s[i10]:.13f})")
print(f"CANARY-vs-ПАРА: {cd!r} -> {cd:+.2f}% (cur {cb} vs пара {ca})")
zeros = [nm for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ: {len(zeros)}")
worst, wname = 0.0, ""
for a, b, nm in zip(d1, d2, names):
    if abs(a - b) > worst:
        worst, wname = abs(a - b), nm
print(f"FP DUAL-FORMULA max |f1-f2|: {worst!r} (worst {wname})")

flags = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
print(f"\nФЛАГИ (>20%): {len(flags)}")
for a, nm in sorted(flags, reverse=True)[:15]:
    print(f"  ФЛАГ {a:+.1f}% {nm}")

PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
              ("/foxsearch/", "/std/")]


def std_partner(name):
    for a, b in PAIR_RULES:
        if a in name:
            return name.replace(a, b, 1)
    return None


ratios = []
for name, v in lv.items():
    partner = std_partner(name)
    pv_p = pv.get(partner) if partner else None
    pvv = pv.get(name)
    if not (partner and pv_p and pvv and v and name in pv):
        continue
    ratios.append((name.split("/")[1],
                   (v / pvv) / (lv[partner] / pv_p)))
rmed = {}
for crate in sorted({c for c, _ in ratios}):
    ds = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
    if ds:
        rmed[crate] = statistics.median(ds)
exact = ", ".join(f"{c}={rmed[c]!r}" for c in sorted(rmed))
print("ОТНОШЕНИЯ (крейт-медианы): "
      + " | ".join(f"{c} {rmed[c]:+.1f}%" for c in sorted(rmed))
      + f"   exact: {exact}")
suppressed = [c for c, v in rmed.items() if v <= -5.0]
elevated = [c for c, v in rmed.items() if v >= 8.0]
top = max(rmed, key=rmed.get) if rmed else None
span = (max(rmed.values()) - min(rmed.values())) if rmed else 0.0
print(f"suppressed: {suppressed}, elevated: {elevated}, "
      f"top {top} {rmed[top]:+.2f}%, "
      f"span {span!r} -> {span:.0f}" if rmed else "suppressed: [], span 0")

note = (abs(cd) > 3) or spread > 20
if not flags:
    if note:
        print("ПРОГНОЗ ВЕРДИКТА: ПАРИТЕТ exit 0 С ЗАМЕТКОЙ")
    else:
        print("ПРОГНОЗ ВЕРДИКТА: ПАРИТЕТ exit 0 БЕЗ заметки")
else:
    if suppressed:
        print("ПРОГНОЗ ВЕРДИКТА: ДРЕЙФ exit 3 (suppressed НЕ пуст — "
              "относительно УСКОРЕНА кодом не бывает)")
    elif elevated and not suppressed:
        print("ПРОГНОЗ ВЕРДИКТА: РЕГРЕСС-ветка возможна (все крейты "
              ">= SUPPRESSED и top >= ELEVATED — одностороннее движение)")
    else:
        print("ПРОГНОЗ ВЕРДИКТА: ДРЕЙФ exit 3 (иначе-ветка)")

if med_rank is not None and med == 0.0 and str(med) != "-0.0":
    print("РЕЕСТР-КАНДИДАТ: median МАТЕРИАЛИЗУЕТСЯ (+0.0) — 187-й")
else:
    print("РЕЕСТР-КАНДИДАТ: median НЕ материализуется")
