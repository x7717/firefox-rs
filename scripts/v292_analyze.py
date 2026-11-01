#!/usr/bin/env python3
"""v292_analyze.py — окно 292: точка #305 = 6370dbb (idx 304, класс FAST
canary 760737 — docs-пуш итерации 291, Benchmark 41343366098 success
19:45:52Z; план окна 291 'если #305 придёт ДО машины, судимой станет #305'
СБЫЛСЯ — СНАЧАЛА строку профиля, урок 229): канонический FAST-хост Формы-A —
canary 760737 INSIDE кластера Формы-A 711824-816814 (Дельта к паре -3.00%),
62-я запись Формы-A, corpus-all 574 INSIDE 568-667, zzz 117171 INSIDE
108773-159730, small 80 INSIDE 77-89, профиль 66/760737 = 5.3895e-05
[OLD-таг] INSIDE профиля-конверта Формы-A 5.1821e-05-6.1447e-05.
Пара (GUARD, ветка плана окна 291 пересчитана от ФАКТИЧЕСКОГО класса) =
БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки 198/204): 33c89cc #294 (idx 296, distance 8,
7 записей СМЕЖНЫХ классов между — b94692e/b74d5b2/fe76381/68f8b0a CLASSIC,
a4241de MEDIUM, 86b4cf4 CLASSIC, 7676353 CLASSIC). Пара ОДНОКЛАССНАЯ
SAME-ФОРМА SAME-PROFILE [OLD] 5.3895e-05 vs [OLD] 5.4827e-05 (порог 6.0e-05)
— FAST-коридор 3.0..14.0 ПРИМЕНИМ (same-profile, урок 229); ожидание
ВНУТРИ коридора по прецеденту окна 285 (33c89cc vs 628dd1f-1: 12.9 ВНУТРИ).
УРОК 148: флагов 0 -> exit 0 ДО spread-ветки. РЕЕСТР: серия = 0, следить за
200-м кандидатом (median == +0.0 РОВНО; TIE-нули учитывать; вариант-медианы
в реестр НЕ идут, урок w278). КОНТРОЛ: serialize/foxurl/3 квантование
(3->4->19 эволюция окон 288/290/291 — свойство хоста судимой).
Формулы = bench_history.py (dual f1/f2). МАШИНА: bench_history.py --check 20
по ПОЛНОМУ data292.js (305 записей, СРЕЗ НЕ НУЖЕН — meta[-1] = судимая)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data292.js"
TARGET_IDX, PAIR_IDX = 304, 296

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
assert len(meta) == 305, f"записей {len(meta)} != 305 (ПОЛНЫЙ CDN)"
last, pair = meta[TARGET_IDX], meta[PAIR_IDX]
assert last["cid"] == "6370dbb" and last["cls"] == "FAST", last
assert last["canary"] == 760737, last["canary"]
assert pair["cid"] == "33c89cc" and pair["cls"] == "FAST", pair
assert pair["canary"] == 784289, pair["canary"]
assert meta[303]["cid"] == "7676353" and meta[303]["cls"] == "CLASSIC"
assert meta[303]["canary"] == 1361339
assert meta[302]["cid"] == "86b4cf4" and meta[302]["cls"] == "CLASSIC"
assert meta[302]["canary"] == 1357706
assert meta[301]["cid"] == "a4241de" and meta[301]["cls"] == "MEDIUM"
assert meta[301]["canary"] == 1071504
assert meta[300]["cid"] == "68f8b0a" and meta[300]["cls"] == "CLASSIC"
assert meta[300]["canary"] == 1356551
assert meta[299]["cid"] == "fe76381" and meta[299]["cls"] == "CLASSIC"
assert meta[299]["canary"] == 1259770
assert meta[298]["cid"] == "b74d5b2" and meta[298]["cls"] == "CLASSIC"
assert meta[298]["canary"] == 1223438
assert meta[297]["cid"] == "b94692e" and meta[297]["cls"] == "CLASSIC"
assert meta[297]["canary"] == 1355496
assert meta[291]["cid"] == "628dd1f" and meta[291]["cls"] == "FAST"
assert meta[291]["canary"] == 799720
assert meta[285]["cid"] == "4eb8807" and meta[285]["cls"] == "FAST"
assert meta[285]["canary"] == 758270
assert meta[282]["cid"] == "fd7e926" and meta[282]["cls"] == "FAST"
assert meta[282]["canary"] == 744950
assert meta[231]["cid"] == "87d7d86" and meta[231]["cls"] == "FAST"
assert meta[231]["canary"] == 759538
assert meta[2]["cid"] == "470d380" and meta[2]["cls"] == "FAST"
assert meta[2]["canary"] == 711824

print(f"записей в истории: {len(meta)}")
from collections import Counter
cnt = Counter(m["cid"] for m in meta)
dubs = sorted(c for c, n in cnt.items() if n > 1)
WHITELIST = {"336e9ff", "415fe95", "2b6489b", "6a239dc", "76d4050",
             "68e6dd4", "87d7d86", "ff7b23e", "f3a9631", "628dd1f"}
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
      f"distance {dist}, {len(between)} записей СМЕЖНЫХ классов between={between}")

# --- строка профиля (урок 229): кластер Формы-A FAST 711824-816814 ---
LO, HI = 711824, 816814
cluster = [m for m in meta[:TARGET_IDX + 1]
           if m["cls"] == "FAST" and LO <= m["canary"] <= HI
           and 108773 <= m["vals"]["find/foxsearch/zzz-absent-zzz"] <= 159730
           and 77 <= m["vals"]["parse/foxjson/small"] <= 89
           and 568 <= m["vals"]["parse/foxurl/corpus-all"] <= 667]
print(f"\nПРОФИЛЬ-СТРОКА (урок 229): кластер Формы-A FAST {LO}-{HI}: "
      f"{len(cluster)} визитов (включая судимую)")

def prof(m):
    v11 = m["vals"].get("parse/foxurl/11")
    p = v11 / m["canary"]
    return p, "[OLD]" if p < 6.0e-05 else "[NEW]"

ps = [prof(m)[0] for m in cluster]
zs = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in cluster]
sms = [m["vals"]["parse/foxjson/small"] for m in cluster]
cas = [m["vals"]["parse/foxurl/corpus-all"] for m in cluster]
print(f"  конверт Формы-A: профиль {min(ps):.4e}-{max(ps):.4e}, "
      f"zzz {min(zs)}-{max(zs)}, small {min(sms)}-{max(sms)}, "
      f"corpus-all {min(cas)}-{max(cas)}")
pl, tagl = prof(last)
pp, tagp = prof(pair)
same_profile = (pl < 6.0e-05) == (pp < 6.0e-05)
print(f"  судимая: canary {last['canary']} INSIDE (Дельта к паре "
      f"{(last['canary']-pair['canary'])/pair['canary']*100:+.2f}%), zzz "
      f"{last['vals']['find/foxsearch/zzz-absent-zzz']} INSIDE, small "
      f"{last['vals']['parse/foxjson/small']} INSIDE, corpus-all "
      f"{last['vals']['parse/foxurl/corpus-all']} INSIDE, профиль "
      f"{pl:.4e} {tagl} (62-й визит Формы-A)")
print(f"  профиль v11/canary: {last['cid']} {pl:.4e} {tagl} / "
      f"{pair['cid']} {pp:.4e} {tagp} — "
      f"{'SAME-PROFILE' if same_profile else 'CROSS-PROFILE'} "
      f"(дискриминатор окна 229, порог 6.0e-05); FAST-коридор 3.0..14.0 "
      f"{'ПРИМЕНИМ (same-profile)' if same_profile else 'НЕ применим'}")

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
    v_from = pv[nm]
    v_to = lv[nm]
    print(f"  ФЛАГ {a:+.1f}%  {nm}: {v_from:.0f} -> {v_to:.0f}"
          f"  (микро={v_to < 200})")

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

# --- ПРОГНОЗ ВЕРДИКТА (формулы bench_history.py --check 20) ---
micro_note = bool(flags) and all(v_to < 200 for _, nm, v_from, v_to in
                                 [(a, nm, pv[nm], lv[nm]) for a, nm in flags]) \
    and all(abs(rmed.get(nm.split("/")[1], 0.0)) < 8.0 for _, nm in flags)
print(f"\nПРОГНОЗ ВЕРДИКТА:")
if not flags:
    note = (abs(cd) > 3 or spread > 20)
    print(f"  флагов 0 -> УРОК 148: exit 0 ДО spread-ветки; "
          f"{'ПАРИТЕТ С ЗАМЕТКОЙ' if note else 'ТИХИЙ ПАРИТЕТ'} exit 0 "
          f"({'|cvar| {:.2f} >= 3 ИЛИ spread > 20'.format(abs(cd)) if note else '|cvar| < 3 И spread <= 20'})")
else:
    if spread > 20.0:
        if suppressed:
            print("  ДРЕЙФ СРЕДЫ exit 3 (suppressed НЕ пуст)")
        elif rmed and rmed[top] >= 8.0:
            print("  РЕГРЕСС exit 1 (elevated)")
        else:
            print("  ДРЕЙФ СРЕДЫ exit 3 (глобальный сдвиг)")
    else:
        print(f"  РЕГРЕСС exit 1 (узкое распределение; ПРИМЕТКА iter.34 "
              f"{'ВЫВОДИТСЯ' if micro_note else 'НЕ выводится'} — exit-код НЕ меняется)")
mat = (med == 0.0)
print(f"РЕЕСТР-КАНДИДАТ (200-й): median {med!r} — "
      f"{'МАТЕРИАЛИЗОВАЛСЯ (реестр 83 -> 84)' if mat else 'НЕ материализуется (реестр остаётся 83, серия 0)'}")
cvar_ca = (last['vals']['parse/foxurl/corpus-all'] - pair['vals']['parse/foxurl/corpus-all']) / pair['vals']['parse/foxurl/corpus-all'] * 100.0
print(f"СЧЁТЧИК corpus-all: {pair['vals']['parse/foxurl/corpus-all']} -> "
      f"{last['vals']['parse/foxurl/corpus-all']} {cvar_ca!r}% — "
      f"{'ИНКРЕМЕНТ эры урока 229 (>= +8.0)' if cvar_ca >= 8.0 else 'ниже порога +8.0, счётчик СТОИТ (14)'}")
