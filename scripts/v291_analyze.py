#!/usr/bin/env python3
"""v291_analyze.py — окно 291: точка #303 = 86b4cf4 (idx 302, класс CLASSIC
canary 1357706 — ветка CLASSIC плана окна 290 СБЫЛАСЬ; СНАЧАЛА строку профиля,
урок 229): канон-кластер 1345000-1375000 (159-й визит, 145 OLD + 14
NEW-скошенных), НО подформа = NEW-скошенная e990865-класса — 14-й визит
подформы (13 предшественников f6ec292/7a595f1/3090369/64a636a/6a239dc/
81ac280/40b8fd0/87dc814/87d7d86/eace4a8/d50c58c/3215b78/e990865): профиль
95/1357706 = 6.9971e-05 INSIDE 6.1036e-05-8.2396e-05, zzz 231854 INSIDE
205697-344989 (ВЫШЕ OLD-канона 203811-226663), small 147 INSIDE 143-150,
corpus-all 1274 INSIDE 1219-1424. НЕ [OLD]-канон (68f8b0a 5.6024e-05,
fe76381 5.4772e-05). Пара (GUARD, ветка CLASSIC плана окна 290) =
БЛИЖАЙШАЯ ЗАПИСЬ КЛАССА (уроки 198/204): 68f8b0a #301 (idx 300, distance 2,
1 запись между — a4241de MEDIUM idx 301). Пара ОДНОКЛАССНАЯ
КРОСС-ПРОФИЛЬНАЯ: [NEW] 6.9971e-05 vs [OLD] 5.6024e-05 (дискриминатор окна
229, порог 6.0e-05) — same-cluster (оба канон-кластер 1345-1375k), формы
РАЗНЫЕ (NEW-скошенная vs OLD-канон); ожидание ШИРОКОГО разброса по
прецеденту окна 229 31.2 (класс-коридор 2.2-4.5 НЕ применим —
same-profile SAME-FORM only, урок 229). УРОК 158: флагов 0 НЕ ожидается.
Данные: data291.js ПОЛНЫЙ CDN 304 записи (план окна 290: БЕЗ среза);
машина судит по data291_mach.js СРЕЗ до 303 (meta[-1]=86b4cf4 — запись
#304 7676353 [CLASSIC canary 1361339, OLD-канон] пришла ПОСЛЕ плана
(pages build 408f297), судится в окне 292; прецедент среза w288/w290).
Счётчик урока 156 ДЕВИАНТНАЯ ФОРМА: машина 'прогонов в истории: 303' !=
data291.js 304 != CDN 304 (СРЕЗ). Реестр: серия = 0, следить за 199-м
кандидатом (median == +0.0 РОВНО; TIE-нули учитывать; вариант-медианы в
реестр НЕ идут, урок w278). Формулы = bench_history.py (dual f1/f2)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data291.js"
TARGET_IDX, PAIR_IDX = 302, 300

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
assert len(meta) == 304, f"записей {len(meta)} != 304 (ПОЛНЫЙ CDN)"
last, pair = meta[TARGET_IDX], meta[PAIR_IDX]
assert last["cid"] == "86b4cf4" and last["cls"] == "CLASSIC", last
assert last["canary"] == 1357706, last["canary"]
assert pair["cid"] == "68f8b0a" and pair["cls"] == "CLASSIC", pair
assert pair["canary"] == 1356551, pair["canary"]
assert meta[301]["cid"] == "a4241de" and meta[301]["cls"] == "MEDIUM"
assert meta[301]["canary"] == 1071504
assert meta[303]["cid"] == "7676353" and meta[303]["cls"] == "CLASSIC"
assert meta[303]["canary"] == 1361339
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
assert meta[286]["cid"] == "e990865" and meta[286]["cls"] == "CLASSIC"
assert meta[286]["canary"] == 1362588
assert meta[276]["cid"] == "3215b78" and meta[276]["cls"] == "CLASSIC"
assert meta[276]["canary"] == 1359579
assert meta[239]["cid"] == "d50c58c" and meta[239]["cls"] == "CLASSIC"
assert meta[239]["canary"] == 1359292
assert meta[66]["cid"] == "d70534f" and meta[66]["cls"] == "CLASSIC"
assert meta[66]["canary"] == 1356121
assert meta[55]["cid"] == "1c96db6" and meta[55]["cls"] == "FAST"
assert meta[55]["canary"] == 720876

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
      f"distance {dist}, between={between}")

# --- строка профиля (урок 229): канон-кластер CLASSIC 1345000-1375000 ---
LO, HI = 1345000, 1375000
cluster = [m for m in meta[:TARGET_IDX + 1]
           if m["cls"] == "CLASSIC" and LO <= m["canary"] <= HI]
print(f"\nПРОФИЛЬ-СТРОКА (урок 229): канон-кластер CLASSIC {LO}-{HI}: "
      f"{len(cluster)} визитов (включая судимую)")

def prof(m):
    v11 = m["vals"].get("parse/foxurl/11")
    p = v11 / m["canary"]
    return p, "[OLD]" if p < 6.0e-05 else "[NEW]"

news = [m for m in cluster if prof(m)[1] == "[NEW]"]
olds = [m for m in cluster if prof(m)[1] == "[OLD]"]
print(f"  NEW-скошенных {len(news)} (e990865-класса), OLD {len(olds)}")
if news:
    np = [prof(m)[0] for m in news]
    nz = [m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in news]
    nsm = [m["vals"]["parse/foxjson/small"] for m in news]
    nca = [m["vals"]["parse/foxurl/corpus-all"] for m in news]
    print(f"  подформа envelope: профиль {min(np):.4e}-{max(np):.4e}, "
          f"zzz {min(nz)}-{max(nz)}, small {min(nsm)}-{max(nsm)}, "
          f"corpus-all {min(nca)}-{max(nca)}")
pl, tagl = prof(last)
pp, tagp = prof(pair)
same_profile = (pl < 6.0e-05) == (pp < 6.0e-05)
print(f"  судимая: canary {last['canary']} INSIDE, zzz "
      f"{last['vals']['find/foxsearch/zzz-absent-zzz']} INSIDE, small "
      f"{last['vals']['parse/foxjson/small']} INSIDE, corpus-all "
      f"{last['vals']['parse/foxurl/corpus-all']} INSIDE, профиль "
      f"{pl:.4e} {tagl} (14-й визит подформы e990865-класса)")
print(f"  профиль v11/canary: {last['cid']} {pl:.4e} {tagl} / "
      f"{pair['cid']} {pp:.4e} {tagp} — "
      f"{'SAME-PROFILE' if same_profile else 'CROSS-PROFILE'} "
      f"(дискриминатор окна 229, порог 6.0e-05); same-cluster, но формы "
      f"РАЗНЫЕ (NEW-скошенная vs OLD-канон) — "
      f"КРОСС-ПРОФИЛЬНАЯ пара, ожидание ШИРОКОГО (прецедент окна 229 31.2)")

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
