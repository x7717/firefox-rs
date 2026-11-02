#!/usr/bin/env python3
"""v294_analyze.py — окно 294: точка #308 = 9aeda95 (idx 307, класс CLASSIC
canary 1356953 — scripts-пуш rebuild_local_293.py, Benchmark 41361154370
success 23:14:50Z, pages 2989e5a 23:30:54Z; план окна 293 'если точка #308
придёт ДО машины, судимой станет #308, пара пересчитается от ЕЁ класса'
СБЫЛСЯ —Benchmark 9aeda95 success до старта окна). СНАЧАЛА строка профиля
(урок 229): канон-кластер CLASSIC 1345000-1375000, OLD-канон подформа
(68f8b0a-класса) — canary 1356953 INSIDE, zzz 206505 INSIDE OLD-конверта
203811-226663, small 146 INSIDE 143-153, corpus-all 1181 INSIDE 1163-1228,
профиль 77/1356953 = 5.6745e-05 [OLD].
Пара (GUARD, auto-pair машины = БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА, уроки 198/204):
2069adf #307 (idx 306, distance 1, NOTHING between — СМЕЖНАЯ). SAME-PROFILE
[OLD] vs [OLD] -> CLASSIC-коридор 2.2..4.5 применим (same-profile, уроки
229/31); ожидание УЗКОГО (прецеденты окон 276/293). УРОК 148: флагов 0 ->
exit 0 ДО spread-ветки. РЕЕСТР: 202-й кандидат (материализация при median
== +0.0 РОВНО; TIE-нули учитывать; вариант-медианы НЕ идут, урок w278).
КОНТРОЛ serialize/foxurl/3 ЗАКРЫТ окном 292 (квантование 3->4->19 —
свойство CLASSIC/NEW хостов; на Формы-A константа 2; на OLD-каноне 4).
Формулы = bench_history.py (dual f1/f2). МАШИНА: bench_history.py --check 20
по ПОЛНОМУ data294.js (308 записей, СРЕЗ НЕ НУЖЕН — meta[-1] = судимая)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data294.js"

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
assert len(meta) == 308, f"записей {len(meta)} != 308 (ПОЛНЫЙ CDN)"
last = meta[307]
assert last["cid"] == "9aeda95" and last["cls"] == "CLASSIC", last
assert last["canary"] == 1356953, last["canary"]
assert last["vals"]["find/foxsearch/zzz-absent-zzz"] == 206505
assert last["vals"]["parse/foxjson/small"] == 146
assert last["vals"]["parse/foxurl/corpus-all"] == 1181
assert last["vals"]["parse/foxurl/11"] == 77
assert meta[306]["cid"] == "2069adf" and meta[306]["cls"] == "CLASSIC"
assert meta[306]["canary"] == 1358353
assert meta[305]["cid"] == "581d0fb" and meta[305]["cls"] == "CLASSIC"
assert meta[305]["canary"] == 1359903
assert meta[304]["cid"] == "6370dbb" and meta[304]["cls"] == "FAST"
assert meta[304]["canary"] == 760737
assert meta[303]["cid"] == "7676353" and meta[303]["cls"] == "CLASSIC"
assert meta[303]["canary"] == 1361339
assert meta[302]["cid"] == "86b4cf4" and meta[302]["cls"] == "CLASSIC"
assert meta[302]["canary"] == 1357706
assert meta[301]["cid"] == "a4241de" and meta[301]["cls"] == "MEDIUM"
assert meta[301]["canary"] == 1071504
assert meta[300]["cid"] == "68f8b0a" and meta[300]["cls"] == "CLASSIC"
assert meta[300]["canary"] == 1356551

# GUARD auto-pair (урок 133): ближайший одноклассный предшественник из ДАННЫХ
guard = next(m for m in reversed(meta[:307]) if m["cls"] == last["cls"])
assert guard["idx"] == 306 and guard["cid"] == "2069adf", \
    f"GUARD pair {guard} != 2069adf idx 306"
pair = guard

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
dist = last["idx"] - pair["idx"]
between = [f"{meta[j]['cid']} [{meta[j]['cls']}]" for j in range(pair["idx"] + 1, last["idx"])]
print(f"\nсудимая запись: idx {last['idx']} {last['cid']} [{last['cls']}] "
      f"canary={last['canary']}")
print(f"пара (GUARD): {last['cid']} [{last['cls']}] vs {pair['cid']} "
      f"[{pair['cls']}] idx {last['idx']} vs {pair['idx']}, "
      f"distance {dist}, {len(between)} записей СМЕЖНЫХ классов between={between}")


def prof(m):
    v11 = m["vals"].get("parse/foxurl/11")
    p = v11 / m["canary"]
    return p, "[OLD]" if p < 6.0e-05 else "[NEW]"


# --- строка профиля (урок 229): канон-кластер CLASSIC 1345000-1375000 ---
LO, HI = 1345000, 1375000
cluster = [m for m in meta if m["cls"] == "CLASSIC" and LO <= m["canary"] <= HI]
olds = [m for m in cluster if prof(m)[0] < 6.0e-05]
news = [m for m in cluster if prof(m)[0] >= 6.0e-05]
print(f"\nПРОФИЛЬ-СТРОКА (урок 229): канон-кластер CLASSIC {LO}-{HI}: "
      f"{len(cluster)} визитов (включая судимую): {len(olds)} OLD-канон + "
      f"{len(news)} NEW-скошенных")
zc = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in olds]
sc = [m["vals"]["parse/foxjson/small"] for m in olds]
cc = [m["vals"]["parse/foxurl/corpus-all"] for m in olds]
pc = [prof(m)[0] for m in olds]
print(f"  OLD-канон конверты (из данных): профиль {min(pc):.4e}-{max(pc):.4e}, "
      f"zzz {min(zc)}-{max(zc)}, small {min(sc)}-{max(sc)}, "
      f"corpus-all {min(cc)}-{max(cc)}")
pl, tagl = prof(last)
pp, tagp = prof(pair)
lv, pv = last["vals"], pair["vals"]
zl = lv["find/foxsearch/zzz-absent-zzz"]
zp = pv["find/foxsearch/zzz-absent-zzz"]
sl = lv["parse/foxjson/small"]
sp = pv["parse/foxjson/small"]
cl_ = lv["parse/foxurl/corpus-all"]
cp = pv["parse/foxurl/corpus-all"]
same_profile = (pl < 6.0e-05) == (pp < 6.0e-05)
print(f"  судимая: canary {last['canary']} INSIDE (Дельта к паре "
      f"{(last['canary']-pair['canary'])/pair['canary']*100:+.2f}%), zzz {zl} "
      f"INSIDE, small {sl} INSIDE, corpus-all {cl_} INSIDE, профиль "
      f"{pl:.4e} {tagl} ({len(cluster)}-й визит кластера)")
print(f"  профиль v11/canary: {last['cid']} {pl:.4e} {tagl} / "
      f"{pair['cid']} {pp:.4e} {tagp} — "
      f"{'SAME-PROFILE' if same_profile else 'CROSS-PROFILE'} "
      f"(дискриминатор окна 229, порог 6.0e-05); CLASSIC-коридор 2.2..4.5 "
      f"{'ПРИМЕНИМ (same-profile)' if same_profile else 'НЕ применим'}")

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
mn = sorted(zip(d1, names))[:4]
mx = sorted(zip(d1, names), reverse=True)[:4]
print("min 4 пары: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in mn))
print("top 4 пары: " + " / ".join(f"{nm} {a:+.1f}" for a, nm in mx))

flags = [(a, nm) for a, nm in zip(d1, names) if a > 20.0]
print(f"\nФЛАГИ (>20%): {len(flags)}")
for a, nm in sorted(flags, reverse=True)[:15]:
    v_from = pv[nm]
    v_to = lv[nm]
    print(f"  ФЛАГ {a:+.1f}%  {nm}: {v_from:.0f} -> {v_to:.0f}"
          f"  (микро={v_to < 200})")
print(f"КОНТРОЛ serialize/foxurl/3: пара {pv.get('serialize/foxurl/3')} -> "
      f"{lv.get('serialize/foxurl/3')}")

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
              f"{'ВЫВОДИТСЯ' if (flags and all(lv[nm] < 200 for _, nm in flags) and all(abs(rmed.get(nm.split('/')[1], 0.0)) < 8.0 for _, nm in flags)) else 'НЕ выводится'} — exit-код НЕ меняется)")
mat = (med == 0.0)
print(f"РЕЕСТР-КАНДИДАТ (202-й): median {med!r} — "
      f"{'МАТЕРИАЛИЗОВАЛСЯ (реестр 83 -> 84)' if mat else 'НЕ материализуется (реестр остаётся 83, серия 0)'}")
cvar_ca = (cl_ - cp) / cp * 100.0
print(f"СЧЁТЧИК corpus-all: {cp} -> {cl_} {cvar_ca!r}% — "
      f"{'ИНКРЕМЕНТ эры урока 229 (>= +8.0)' if cvar_ca >= 8.0 else 'ниже порога +8.0, счётчик СТОИТ (14)'}")
