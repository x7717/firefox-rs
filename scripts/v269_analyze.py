#!/usr/bin/env python3
"""v269_analyze.py — окно 281: точка #290 = 628dd1f копия-2 (idx 292,
класс CLASSIC canary 1360959, СНАЧАЛА строка профиля, урок 229):
профиль 77/1360959 = 5.6578e-05 [OLD-таг], corpus-all 1177, zzz 206194,
small 143 — ПОДПИСЬ CLASSIC-OLD-ХОСТА (canary кластер 1360293-1364127,
zzz конверт 203811-231085, small норма 144±3, профиль OLD 5.25-5.91e-05);
corpus-all 1177 = 3 НИЖЕ нижней границы OLD-зоны 1180-1196 — ВТОРОЙ выход
за зону после 1204 (верхняя сторона, w274 НАБЛЮДЕНИЕ) — НАБЛЮДЕНИЕ, зону
НЕ расширять (подпись canary/zzz/small/профиль INSIDE => хост тот же).
КОПИЯ-2: 628dd1f x2 — idx 291 [FAST 799720] = push-run 41299414382 vs
idx 292 [CLASSIC 1360959] = schedule-run 41299661512 (19-е schedule-
событие, предсказано окном 280 'следить за запоздалым bench-Store' —
СБЫЛОСЬ); КЛАСС-КОНФЛИКТ FAST/CLASSIC на одном коммите — ВТОРОЙ в реестре
дублей после 87d7d86 (w228); прецеденты w203/w206/w228: судится ПОСЛЕДНЯЯ
запись (копия-2). GUARD-пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки 198/204):
CLASSIC->cf857bd #288 (idx 290, distance 2, 1 запись между idx 291 =
копия-1 FAST того же коммита — прецедент w203 '1 запись между — копия-1
MEDIUM того же коммита'); пин плана окна 280 CLASSIC->b1bf50c (idx 287)
устарел — план писался ДО пушей cf857bd/628dd1f (3 новые записи вместо
одной ожидаемой), правило урока 198/204 применено к фактической
конфигурации. Пара SAME-PROFILE [OLD] 5.6578e-05 vs [OLD] 5.5870e-05,
same-host OLD-кластер. CLASSIC-коридор 2.2-4.5 (same-profile).
Формулы = bench_history.py (двойная формула f1/f2). Класс: FAST<900k,
MEDIUM<1.2M, CLASSIC иначе. Реестр: серия = 0, следить за 189-м
кандидатом (median == +0.0 РОВНО материализуется; TIE-нули учитывать;
вариант-медианы в реестр НЕ идут)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
WHITELIST = {"336e9ff", "415fe95", "2b6489b", "6a239dc", "76d4050",
             "68e6dd4", "87d7d86", "ff7b23e", "f3a9631"}
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data281.js"
TARGET_IDX, PAIR_IDX, COPY1_IDX = 292, 290, 291

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

# ИНДЕКС-ПИННИНГ (урок 204): assert по коммитам/классам ДО любых расчётов
assert len(meta) == 293, f"записей {len(meta)} != 293"
last, pair, copy1 = meta[TARGET_IDX], meta[PAIR_IDX], meta[COPY1_IDX]
assert last["cid"] == "628dd1f" and last["cls"] == "CLASSIC", last
assert last["canary"] == 1360959, last["canary"]
assert pair["cid"] == "cf857bd" and pair["cls"] == "CLASSIC", pair
assert pair["canary"] == 1360293, pair["canary"]
assert copy1["cid"] == "628dd1f" and copy1["cls"] == "FAST", copy1
assert copy1["canary"] == 799720, copy1["canary"]
assert meta[289]["cid"] == "ef95f29" and meta[289]["cls"] == "CLASSIC"
assert meta[288]["cid"] == "b15f7d3" and meta[288]["cls"] == "MEDIUM"

print(f"записей в истории: {len(meta)}")
from collections import Counter
cnt = Counter(m["cid"] for m in meta)
dubs = sorted(c for c, n in cnt.items() if n > 1)
print(f"коммитов-дублей: {len(dubs)} {dubs}")
WL2 = WHITELIST | {"628dd1f"}
print(f"  белый список {len(WL2)} (9 + 628dd1f): "
      + ("СОВПАДАЕТ (расширение пре-регистрировано)" if set(dubs) == WL2
         else "ОТЛИЧАЕТСЯ"))
print(f"  точек (уникальных коммитов): {len(cnt)}")
print(f"  класс-конфликт 628dd1f: копия-1 idx 291 [FAST {copy1['canary']}] "
      f"(push-run 41299414382) vs копия-2 idx 292 [CLASSIC {last['canary']}] "
      f"(schedule-run 41299661512) — ВТОРОЙ после 87d7d86 (w228)")
between = [f"{meta[j]['cid']} [{meta[j]['cls']}]" for j in range(PAIR_IDX + 1, TARGET_IDX)]
dist = TARGET_IDX - PAIR_IDX
print(f"\nсудимая запись (копия-2, прецедент w203/w206/w228): idx {last['idx']} "
      f"{last['cid']} [{last['cls']}] canary={last['canary']}")
print(f"пара (GUARD): {last['cid']} копия-2 [{last['cls']}] vs {pair['cid']} "
      f"[{pair['cls']}] idx {last['idx']} vs {pair['idx']}, distance {dist}, "
      f"between={between} (копия-1 FAST того же коммита)")


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
print("НУЛИ-СПИСОК: " + ", ".join(zeros))

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

ca_delta_corpus = ((lv["parse/foxurl/corpus-all"]
                    - pv["parse/foxurl/corpus-all"])
                   / pv["parse/foxurl/corpus-all"] * 100.0)
print(f"СЧЁТЧИК corpus-all: {pv['parse/foxurl/corpus-all']} -> "
      f"{lv['parse/foxurl/corpus-all']} {ca_delta_corpus:+.2f}% — "
      f"{'ИНКРЕМЕНТ' if ca_delta_corpus > 8.0 else 'ниже порога +8.0, счётчик НЕ двигается'}")

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
    print("РЕЕСТР-КАНДИДАТ: median МАТЕРИАЛИЗУЕТСЯ (+0.0 РОВНО) — 189-й, "
          "реестр 81 -> 82, серия 0 -> 1")
else:
    print("РЕЕСТР-КАНДИДАТ: median НЕ материализуется, реестр 81, серия 0")
