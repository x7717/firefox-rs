#!/usr/bin/env python3
"""v286_analyze.py — окно 286: точка #295 = b94692e (idx 297, класс CLASSIC
canary 1355496, СНАЧАЛА строку профиля, урок 229): профиль 78/1355496 =
5.75434e-05 [OLD-таг], corpus-all 1183 (ядро OLD-зоны 1180-1196), zzz
207906 INSIDE канонического конверта 206194-230590, small 143 (норма
144±3). Подпись: канонический CLASSIC-OLD-хост (кластер canary
1351095-1368414).
GUARD-пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки 198/204, ветка CLASSIC плана
окна 285): 0cb508b #293 (idx 295, distance 2, между idx 296 ОДНА запись
СМЕШАННОГО класса — 33c89cc FAST; КРОСС-ЗАПИСНАЯ пара). Пара SAME-PROFILE
[OLD] 5.7562e-05 vs [OLD] 5.8350e-05 (порог 6.0e-05, дискриминатор окна
229), НО хосты РАЗНЫХ форм (канонический ~1355k vs семейство canary-1220k:
zzz 207906 vs 336224, small 143 vs 118, corpus-all 1183 vs 963) — зеркало
окна 284 (0cb508b vs e915c61: разброс 67.2 ШИРОКИЙ, ДРЕЙФ) — ожидание
ШИРОКОГО разброса ВНЕ CLASSIC-коридора 2.2-4.5 (valid same-profile only,
урок 229) + МИРРОРНАЯ МИКРОАРХИТЕКТУРНАЯ ПОДПИСЬ (foxsearch относительно
УСКОРЕНА, foxjson относительно ЗАМЕДЛЕНА). FAST->33c89cc #294 (idx 296) /
MEDIUM->f92d0dd #292 (idx 294) НЕ актуальны. Формулы = bench_history.py
(двойная формула f1/f2). Реестр: серия = 0, следить за 194-м кандидатом
(median == +0.0 РОВНО материализуется; TIE-нули учитывать; вариант-медианы
в реестр НЕ идут). Дубли: белый список 10 (628dd1f копия-1/копия-2 —
двойной Store, idx 291 FAST + idx 292 CLASSIC)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
WHITELIST = {"336e9ff", "415fe95", "2b6489b", "6a239dc", "76d4050",
             "68e6dd4", "87d7d86", "ff7b23e", "f3a9631", "628dd1f"}
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data286.js"
TARGET_IDX, PAIR_IDX = 297, 295

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

# ИНДЕКС-ПИННИНГ (урок 204): assert по коммитам/классам/canary ДО расчётов
assert len(meta) == 298, f"записей {len(meta)} != 298"
last, pair = meta[TARGET_IDX], meta[PAIR_IDX]
assert last["cid"] == "b94692e" and last["cls"] == "CLASSIC", last
assert last["canary"] == 1355496, last["canary"]
assert pair["cid"] == "0cb508b" and pair["cls"] == "CLASSIC", pair
assert pair["canary"] == 1216790, pair["canary"]
assert meta[296]["cid"] == "33c89cc" and meta[296]["cls"] == "FAST"
assert meta[296]["canary"] == 784289
assert meta[294]["cid"] == "f92d0dd" and meta[294]["cls"] == "MEDIUM"
assert meta[293]["cid"] == "e915c61" and meta[293]["cls"] == "CLASSIC"
assert meta[292]["cid"] == "628dd1f" and meta[292]["cls"] == "CLASSIC"
assert meta[291]["cid"] == "628dd1f" and meta[291]["cls"] == "FAST"
assert meta[290]["cid"] == "cf857bd" and meta[290]["cls"] == "CLASSIC"
assert meta[289]["cid"] == "ef95f29" and meta[289]["cls"] == "CLASSIC"
assert meta[288]["cid"] == "b15f7d3" and meta[288]["cls"] == "MEDIUM"
assert meta[287]["cid"] == "b1bf50c" and meta[287]["cls"] == "CLASSIC"
assert meta[286]["cid"] == "e990865" and meta[286]["cls"] == "CLASSIC"
assert meta[285]["cid"] == "4eb8807" and meta[285]["cls"] == "FAST"
assert meta[284]["cid"] == "c0747e1" and meta[284]["cls"] == "CLASSIC"
assert meta[283]["cid"] == "d092b80" and meta[283]["cls"] == "CLASSIC"
assert meta[282]["cid"] == "fd7e926" and meta[282]["cls"] == "FAST"
assert meta[275]["cid"] == "680b8e9" and meta[275]["cls"] == "CLASSIC"
assert meta[214]["cid"] == "5ae02bc" and meta[214]["cls"] == "CLASSIC"
assert meta[55]["cid"] == "1c96db6" and meta[55]["cls"] == "FAST"

print(f"записей в истории: {len(meta)}")
from collections import Counter
cnt = Counter(m["cid"] for m in meta)
dubs = sorted(c for c, n in cnt.items() if n > 1)
print(f"коммитов-дублей: {len(dubs)} {dubs}")
print(f"  белый список {len(WHITELIST)}: "
      + ("СОВПАДАЕТ — НЕ расширяется (новых Store-дублей НЕТ)"
         if set(dubs) == WHITELIST else "РАСШИРЯЕТСЯ/ОТЛИЧАЕТСЯ"))
print(f"  точек (уникальных коммитов): {len(cnt)}")
dist = TARGET_IDX - PAIR_IDX
between = [f"{meta[j]['cid']} [{meta[j]['cls']}]" for j in range(PAIR_IDX + 1, TARGET_IDX)]
print(f"\nсудимая запись: idx {last['idx']} {last['cid']} [{last['cls']}] "
      f"canary={last['canary']}")
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
    lo = d1s[med_rank - 1] if med_rank > 0 else None
    hi = d1s[med_rank + 1] if med_rank < n - 1 else None
    print(f"  rank: [{med_rank}] соседи {lo!r} / {hi!r}")
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
print("НУЛИ-СПИСОК: " + (", ".join(zeros) if zeros else "нет"))
print(f"ДИАПАЗОН: {min(d1)!r} .. {max(d1)!r}")

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
if rmed:
    print(f"suppressed: {suppressed}, elevated: {elevated}, "
          f"top {top} {rmed[top]:+.2f}%, span {span!r} -> {span:.0f}")

ca_delta_corpus = ((lv["parse/foxurl/corpus-all"]
                    - pv["parse/foxurl/corpus-all"])
                   / pv["parse/foxurl/corpus-all"] * 100.0)
print(f"СЧЁТЧИК corpus-all: {pv['parse/foxurl/corpus-all']} -> "
      f"{lv['parse/foxurl/corpus-all']} {ca_delta_corpus!r} — "
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
              ">= ELEVATED и top >= ELEVATED — одностороннее движение)")
    else:
        print("ПРОГНОЗ ВЕРДИКТА: ДРЕЙФ exit 3 (иначе-ветка)")

if med_rank is not None and med == 0.0 and str(med) != "-0.0":
    print("РЕЕСТР-КАНДИДАТ: median МАТЕРИАЛИЗУЕТСЯ (+0.0 РОВНО) — 194-й, "
          "реестр 83 -> 84, серия 0 -> 1")
else:
    print("РЕЕСТР-КАНДИДАТ: median НЕ материализуется, реестр 83, серия 0")
