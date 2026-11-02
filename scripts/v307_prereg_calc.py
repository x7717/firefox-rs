#!/usr/bin/env python3
"""v307_prereg_calc.py — расчёт ДО машины (окно 307): точная реплика математики
tools/bench_history.py check_regression (порог 20.0) + нули + fp dual.
Судимая 65e4922 idx 324 (CLASSIC-канон canary 1351596, k3=4 — docs-пуш
аддендум итерации 306; CI 41442107355 + Benchmark 41442107292 success
12:07:19Z). ПАРА = МАШИННОЕ ПРАВИЛО (урок 305 — прецедент КРОСС-ФОРМАЛЬНОЙ
пары 933038a-vs-6f22e55): последний ОДНОКЛАССНЫЙ (umbrella-CLASSIC)
предшественник = bc87bb7 #322 (idx 321, low-CLASSIC вкус k3=4 canary
1257441), distance 3, 2 вставки НЕ одноклассны (idx 322 = 65e4922-копия
FAST-дубля schedule-Store, idx 323 = 0d13b4b FAST) — пара КРОСС-ФОРМАЛЬНАЯ
канон vs low-вкус. ССЫЛОЧНАЯ ветка плана окна 306 'CLASSIC-канон->
6f22e55 #317 (idx 316)' считается ВТОРОЙ (канон-vs-канон, коридор урока
31 2.2-4.5 применим) — для сверки. CDN STABLE d5f5163b; аномалии окна 305
НЕ повторились (профиль [OLD] 5.6230e-05, corpus-all 1184); 65e4922 =
11-й Store-дубль, пре-регистрация диффа в v307_profile.log."""
import json
import re
import statistics
from pathlib import Path

raw = Path("scripts/data307.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
assert n == 325 and runs[-1]["commit"]["id"].startswith("65e4922")

def vals_of(r):
    return {b["name"]: b["value"] for b in r["benches"]}

def cls_of(v):
    c = v["parse/foxjson/session-5000"]
    return "FAST" if c < 900_000 else ("MEDIUM" if c < 1_200_000 else "CLASSIC")

last_vals = vals_of(runs[-1])

def machine_math(pair_pos, label):
    pair_vals = vals_of(runs[pair_pos])
    pc = pair_vals["parse/foxjson/session-5000"]
    pv11 = pair_vals["parse/foxurl/11"]
    pk3 = pair_vals.get("serialize/foxurl/3")
    pzzz = pair_vals.get("find/foxsearch/zzz-absent-zzz")
    psmall = pair_vals.get("parse/foxjson/small")
    pcorpus = pair_vals.get("parse/foxurl/corpus-all")
    pprof = pv11 / pc
    print(f"=== {label}: пара {runs[pair_pos]['commit']['id'][:7]} (idx {pair_pos}): "
          f"[{cls_of(pair_vals)}] canary {pc} v11 {pv11} профиль {pprof:.4e} "
          f"[{'OLD' if pprof < 6.0e-05 else 'NEW'}] k3 {pk3} zzz {pzzz} small "
          f"{psmall} corpus-all {pcorpus}")
    deltas, regressions = [], []
    for name, v in last_vals.items():
        pv = pair_vals.get(name)
        if not pv or not v:
            continue
        delta = (v - pv) / pv * 100.0
        deltas.append(delta)
        if delta > 20.0:
            regressions.append((delta, name, pv, v))
    ds = sorted(deltas)
    nd = len(ds)
    med = statistics.median(ds)
    p10 = ds[int(nd * 0.10)]
    p90 = ds[int(nd * 0.90)]
    spread = p90 - p10
    ca = pair_vals["parse/foxjson/session-5000"]
    cb = last_vals["parse/foxjson/session-5000"]
    cdelta = (cb - ca) / ca * 100.0
    print(f"n дельт: {nd}")
    print(f"MEDIAN {med!r} rank[{ds.index(med)}]" if med in ds else f"MEDIAN {med!r} (интерполяция)")
    sidx = ds.index(med) if med in ds else None
    if sidx is not None:
        lo = ds[sidx - 1] if sidx > 0 else None
        hi = ds[sidx + 1] if sidx < nd - 1 else None
        tie = (lo == med) or (hi == med)
        print(f"  соседи {lo!r} / {hi!r} — {'TIE' if tie else 'НЕ TIE'}")
    print(f"P10 {p10!r} (rank[{ds.index(p10)}])")
    print(f"P90 {p90!r} (rank[{ds.index(p90)}])")
    print(f"SPREAD {spread!r} -> {spread:.1f} п.п. "
          f"{'ШИРОКИЙ >20' if spread > 20 else 'УЗКИЙ <=20'}")
    print(f"CANARY-vs-ПАРА {cdelta!r} -> {cdelta:+.2f}% ({cb} vs {ca})")
    nulls = [(name) for name, v in last_vals.items()
             if pair_vals.get(name) and v == pair_vals[name]]
    print(f"НУЛИ {len(nulls)}: {nulls}")
    regressions.sort(reverse=True)
    print(f"ФЛАГИ {len(regressions)} (>20%): "
          + " / ".join(f"{n2.split('/', 1)[1] if '/' in n2 else n2} +{dv:.1f}"
                       for dv, n2, _, _ in regressions[:15]))
    neg = [x for x in ds if x < 0]
    print(f"отрицательных дельт: {len(neg)}; ДИАПАЗОН {ds[0]:.2f}..{ds[-1]:.2f}")
    fp = 0.0
    worst = ""
    for name, v in last_vals.items():
        pv = pair_vals.get(name)
        if not pv or not v:
            continue
        f1 = (v - pv) / pv * 100.0
        f2 = (v / pv - 1.0) * 100.0
        if abs(f1 - f2) > fp:
            fp, worst = abs(f1 - f2), name
    print(f"fp dual max {fp!r} (worst {worst}) — {'CLEAN' if fp < 1e-9 else 'CHECK'}")
    PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
                  ("/foxsearch/", "/std/")]
    def std_partner(name):
        for a, b in PAIR_RULES:
            if a in name:
                return name.replace(a, b, 1)
        return None
    ratios = []
    for name, v in last_vals.items():
        partner = std_partner(name)
        pv_p = pair_vals.get(partner) if partner else None
        pv = pair_vals.get(name)
        if not (partner and pv_p and pv and v and name in pair_vals):
            continue
        ratios.append((name.split("/")[1], (v / pv) / (last_vals[partner] / pv_p)))
    rmed = {}
    for crate in sorted({c for c, _ in ratios}):
        dsl = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
        if dsl:
            rmed[crate] = statistics.median(dsl)
    print("ОТНОШЕНИЯ: " + " | ".join(f"{c} {v:+.1f}%" for c, v in sorted(rmed.items())))
    span = (max(rmed.values()) - min(rmed.values())) if rmed else 0.0
    suppressed = [c for c, v in rmed.items() if v <= -5.0]
    top_crate = max(rmed, key=rmed.get) if rmed else None
    elevated = top_crate is not None and rmed[top_crate] >= 8.0
    print(f"span {span!r} -> {span:.0f} п.п.; suppressed {suppressed}; top {top_crate} "
          f"{rmed.get(top_crate, 0):+.2f}% elevated={elevated}")
    if not regressions:
        note = (abs(cdelta) > 3) or spread > 20
        print(f"ПРОГНОЗ [{label}]: ПАРИТЕТ exit 0 {'С ЗАМЕТКОЙ' if note else 'БЕЗ заметки'}")
    else:
        if spread > 20.0:
            if suppressed:
                print(f"ПРОГНОЗ [{label}]: ДРЕЙФ СРЕДЫ exit 3 (suppressed НЕ пуст)")
            elif elevated:
                print(f"ПРОГНОЗ [{label}]: РЕГРЕСС exit 1 (elevated {top_crate})")
            else:
                print(f"ПРОГНОЗ [{label}]: ДРЕЙФ СРЕДЫ exit 3 (глобальный сдвиг)")
        else:
            print(f"ПРОГНОЗ [{label}]: РЕГРЕСС exit 1 (узкое распределение)")
    return spread, cdelta, len(regressions)

print("########## ПЕРВИЧНАЯ ПАРА (машина, урок 305-прецедент) ##########")
s1, c1_, f1_ = machine_math(321, "машина bc87bb7")
print()
print("########## ССЫЛОЧНАЯ ВЕТКА (план окна 306, канон-vs-канон) ##########")
s2, c2_, f2_ = machine_math(316, "ветка 6f22e55")
print()
print(f"РЕЕСТР: серия = 0 (214-й НЕ материализовался окном 306) — следить за 215-м")
