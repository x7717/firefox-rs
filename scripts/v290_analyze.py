#!/usr/bin/env python3
"""v290_analyze.py — окно 290: точка #302 = a4241de (idx 301, класс MEDIUM
canary 1071504, СНАЧАЛА строку профиля, урок 229): профиль 71/1071504 =
6.6262e-05 [NEW], zzz 179133, small 114, corpus-all 983. Подпись:
канонический MEDIUM ~1071k (кластер 1061107-1074132; контраст MEDIUM-1029k
82ccccf-формы: small 99-101, zzz 291-303k; контраст 1121-1186k: small
115-117, zzz 307-340k). GUARD-пара = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки
198/204, ветка MEDIUM плана окна 289): f92d0dd #292 (idx 294, distance 7,
6 записей СМЕШАННЫХ классов между — 0cb508b/33c89cc/b94692e/b74d5b2/
fe76381/68f8b0a). Пара ОДНОКЛАССНАЯ И ОДНОФОРМАЛЬНАЯ: канонический MEDIUM
~1071k vs ~1070k (f92d0dd: zzz 178699 / small 114 / corpus-all 1031) —
ПЕРВАЯ ОДНОФОРМАЛЬНАЯ пара после серии кросс-формальных 284/286/287/288/
289; прецедент окна 283 (та же структура MEDIUM vs MEDIUM, distance 6):
разброс 4.3 УЗКИЙ, same-host MEDIUM-наблюдаемый 3.3-4.5, 0 флагов, exit 0
БЕЗ заметки. Ожидание УЗКОГО разброса <=20 (сквозной прецедент окна 283);
CLASSIC-коридор 2.2-4.5 НЕ применим (MEDIUM-класс; MEDIUM-наблюдаемый
3.3-4.5). CANARY-vs-пары +0.11% INSIDE. Формулы = bench_history.py
(двойная формула f1/f2). Реестр: серия = 0, следить за 198-м кандидатом
(median == +0.0 РОВНО материализуется; TIE-нули учитывать; вариант-медианы
в реестр НЕ идут). Урок 156 ДЕВИАНТНАЯ ФОРМА: CDN 303 записей, data290.js
срезан до 302 (обе новые записи #302+#303 пришли одновременно; машина
видит 'прогонов в истории: 302' != CDN 303 — прецедент окна 206 dedup /
окна 288 срез-300). FAST->33c89cc #294 (idx 296) / CLASSIC->68f8b0a #301
(idx 300) НЕ актуальны. Дубли: белый список 10 (628dd1f копия-1/копия-2)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
WHITELIST = {"336e9ff", "415fe95", "2b6489b", "6a239dc", "76d4050",
             "68e6dd4", "87d7d86", "ff7b23e", "f3a9631", "628dd1f"}
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data290.js"
TARGET_IDX, PAIR_IDX = 301, 294

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
assert len(meta) == 302, f"записей {len(meta)} != 302"
last, pair = meta[TARGET_IDX], meta[PAIR_IDX]
assert last["cid"] == "a4241de" and last["cls"] == "MEDIUM", last
assert last["canary"] == 1071504, last["canary"]
assert pair["cid"] == "f92d0dd" and pair["cls"] == "MEDIUM", pair
assert pair["canary"] == 1070321, pair["canary"]
assert meta[300]["cid"] == "68f8b0a" and meta[300]["cls"] == "CLASSIC"
assert meta[300]["canary"] == 1356551
assert meta[299]["cid"] == "fe76381" and meta[299]["cls"] == "CLASSIC"
assert meta[299]["canary"] == 1259770
assert meta[298]["cid"] == "b74d5b2" and meta[298]["cls"] == "CLASSIC"
assert meta[298]["canary"] == 1223438
assert meta[297]["cid"] == "b94692e" and meta[297]["cls"] == "CLASSIC"
assert meta[297]["canary"] == 1355496
assert meta[296]["cid"] == "33c89cc" and meta[296]["cls"] == "FAST"
assert meta[296]["canary"] == 784289
assert meta[295]["cid"] == "0cb508b" and meta[295]["cls"] == "CLASSIC"
assert meta[295]["canary"] == 1216790
assert meta[288]["cid"] == "b15f7d3" and meta[288]["cls"] == "MEDIUM"
assert meta[288]["canary"] == 1071072
assert meta[268]["cid"] == "87ec41e" and meta[268]["cls"] == "MEDIUM"
assert meta[268]["canary"] == 1067291
assert meta[252]["cid"] == "45afa12" and meta[252]["cls"] == "MEDIUM"
assert meta[252]["canary"] == 1068947
assert meta[66]["cid"] == "d70534f" and meta[66]["cls"] == "CLASSIC"
assert meta[66]["canary"] == 1356121
assert meta[55]["cid"] == "1c96db6" and meta[55]["cls"] == "FAST"
assert meta[55]["canary"] == 720876

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

# --- строка профиля (урок 229): кластер канонического MEDIUM ---
LO, HI = 1060000, 1080000
cluster = [m for m in meta[:TARGET_IDX + 1]
           if m["cls"] == "MEDIUM" and LO <= m["canary"] <= HI]
print(f"\nПРОФИЛЬ-СТРОКА (урок 229): канонический MEDIUM-кластер {LO}-{HI}: "
      f"{len(cluster)} визитов (включая судимую)")
cmin = min(m["canary"] for m in cluster)
cmax = max(m["canary"] for m in cluster)
zzzs = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in cluster]
cas = [m["vals"]["parse/foxurl/corpus-all"] for m in cluster]
profs = [m["vals"]["parse/foxurl/11"] / m["canary"] for m in cluster]
print(f"  canary envelope {cmin}-{cmax}; zzz envelope {min(zzzs)}-{max(zzzs)}; "
      f"corpus-all envelope {min(cas)}-{max(cas)}; "
      f"профиль envelope {min(profs):.4e}-{max(profs):.4e}")


def prof(m):
    v11 = m["vals"].get("parse/foxurl/11")
    p = v11 / m["canary"]
    return p, "[OLD]" if p < 6.0e-05 else "[NEW]"


pl, tagl = prof(last)
pp, tagp = prof(pair)
same_profile = (pl < 6.0e-05) == (pp < 6.0e-05)
print(f"  судимая: canary {last['canary']} INSIDE, zzz "
      f"{last['vals']['find/foxsearch/zzz-absent-zzz']} INSIDE, small "
      f"{last['vals']['parse/foxjson/small']} канон, corpus-all "
      f"{last['vals']['parse/foxurl/corpus-all']} INSIDE, профиль "
      f"{pl:.4e} {tagl}")
print(f"  профиль v11/canary: {last['cid']} {pl:.4e} {tagl} / "
      f"{pair['cid']} {pp:.4e} {tagp} — "
      f"{'SAME-PROFILE' if same_profile else 'CROSS-PROFILE'} "
      f"(дискриминатор окна 229, порог 6.0e-05); ФОРМА ОДНА "
      f"(канонический MEDIUM ~1071k vs ~1070k) — ОДНОФОРМАЛЬНАЯ пара, "
      f"ПЕРВАЯ после серии кросс-формальных 284/286/287/288/289")

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
    print(f"  ФЛАГ {a:+.1f}%  {nm}: {v_from:.0f} -> {v_to:.0f}")

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
