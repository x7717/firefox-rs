#!/usr/bin/env python3
"""analyze.py — независимый анализатор окна (пять значений + GUARD + дубли).

Роли: (1) парс dataNNN.js, (2) класс + пара последней записи, (3) пять значений
полной точности двумя формулами (fp dual-formula), (4) флаги/нули/реестр,
(5) ночные дубли schedule (белый список 7), (6) GUARD-сверка кандидата.
Запуск: python3 scripts/analyze.py [data214.js]
"""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
CANARY_FALLBACK = "find/foxsearch/zzz-absent-zzz"
FAST_T, CLASSIC_T = 900_000, 1_200_000
WHITELIST_DUPES = {"336e9ff", "415fe95", "2b6489b", "6a239dc",
                   "76d4050", "68e6dd4", "ff7b23e"}
PAIR_RULES = [("/foxjson/", "/serde_json/"), ("/foxurl/", "/url_crate/"),
              ("/foxsearch/", "/std/")]


def classify(c):
    if c is None:
        return "UNKNOWN"
    return "FAST" if c < FAST_T else ("MEDIUM" if c < CLASSIC_T else "CLASSIC")


def partner(name):
    for a, b in PAIR_RULES:
        if a in name:
            return name.replace(a, b, 1)
    return None


def main(path):
    raw = Path(path).read_text()
    m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
    d = json.loads(m.group(1))
    runs = d["entries"]["Rust Benchmark"]
    meta = []
    for r in runs:
        vals = {b["name"]: b["value"] for b in r["benches"]}
        canary = vals.get(CANARY, vals.get(CANARY_FALLBACK))
        meta.append({"cid": r["commit"]["id"][:7], "cls": classify(canary),
                     "canary": canary, "vals": vals})
    print(f"записей в истории: {len(runs)}")

    from collections import Counter
    cc = Counter(m["cid"] for m in meta)
    dupes = {c: n for c, n in cc.items() if n > 1}
    print(f"коммитов-дублей: {len(dupes)} {sorted(dupes)}")
    print(f"  белый список 7: {'СОВПАДАЕТ' if set(dupes) == WHITELIST_DUPES else 'РАСХОЖДЕНИЕ!'}")
    print(f"  точек (уникальных коммитов): {len(cc)}")

    last = meta[-1]
    li = len(meta) - 1
    print(f"\nпоследняя запись: idx {li} {last['cid']} [{last['cls']}] "
          f"canary={last['canary']}")
    prev = next((x for x in reversed(meta[:-1]) if x["cls"] == last["cls"]), None)
    if prev is None:
        sys.exit("нет одноклассного предшественника")
    pi = meta.index(prev)
    between = [x["cid"] for x in meta[pi + 1:li]]
    print(f"пара (GUARD): {last['cid']} [{last['cls']}] vs {prev['cid']} "
          f"[{prev['cls']}] idx {li} vs {pi}, distance {li - pi}, "
          f"between={between or 'NOTHING between'}")

    lv, pv = last["vals"], prev["vals"]
    d1, d2, names = [], [], []
    for name, v in lv.items():
        p = pv.get(name)
        if not p or not v:
            continue
        d1.append((v - p) / p * 100.0)
        d2.append((v / p - 1.0) * 100.0)
        names.append(name)
    n = len(d1)
    d1s, d2s = sorted(d1), sorted(d2)
    worst, wname = 0.0, ""
    zeros = 0
    for a, b, nm in zip(d1, d2, names):
        diff = abs(a - b)
        if diff > worst:
            worst, wname = diff, nm
        if a == 0.0:
            zeros += 1
            if repr(a) != repr(b):
                print(f"  НУЛЬ НЕ байт-равен: {nm} {a!r} vs {b!r}")
    med1 = statistics.median(d1)
    med2 = statistics.median(d2)
    p10_1 = d1s[int(n * 0.10)]
    p90_1 = d1s[min(int(n * 0.90), n - 1)]
    p10_2 = d2s[int(n * 0.10)]
    p90_2 = d2s[min(int(n * 0.90), n - 1)]
    sp1, sp2 = p90_1 - p10_1, p90_2 - p10_2
    ca, cb = prev["canary"], last["canary"]
    cd1 = (cb - ca) / ca * 100.0
    cd2 = (cb / ca - 1.0) * 100.0
    print(f"\nсравнимых бенчей: n={n}")
    if med1 in d1s:
        ri = d1s.index(med1)
        print(f"МЕДИАНА: {med1!r} (f2 {med2!r}, |diff| {abs(med1-med2):.3e})")
        print(f"  rank: [{ri}] соседи {d1s[ri-1]!r} / "
              f"{d1s[ri+1]!r}" if 0 < ri < n - 1 else f"  rank: [{ri}] край")
    else:
        print(f"МЕДИАНА интерполирована: {med1!r} (f2 {med2!r})")
    print(f"P10: {p10_1!r} (f2 {p10_2!r})")
    print(f"P90: {p90_1!r} (f2 {p90_2!r})")
    print(f"SPREAD: {sp1!r} -> {sp1:.1f} п.п. (f2 {sp2!r})")
    print(f"CANARY-vs-ПАРА: {cd1!r} -> {cd1:+.2f}% (f2 {cd2!r}) "
          f"(cur {cb} vs пара {ca})")
    print(f"НУЛИ: {zeros}")
    print(f"FP DUAL-FORMULA max |f1-f2|: {worst!r} (worst {wname})")

    flags = sorted(((a, nm) for a, nm in zip(d1, names) if a > 20.0), reverse=True)
    print(f"\nФЛАГИ (>20%): {len(flags)}")
    for a, nm in flags:
        print(f"  ФЛАГ +{a:.1f}%  {nm}: {pv[nm]:.0f} -> {lv[nm]:.0f}"
              f"  (микро={lv[nm] < 200})")

    ratios = []
    for name, v in lv.items():
        prt = partner(name)
        pp = pv.get(prt) if prt else None
        if prt and pp and pv.get(name) and v:
            ratios.append((name.split("/")[1], (v / pv[name]) / (lv[prt] / pp)))
    rmed = {}
    for crate in sorted({c for c, _ in ratios}):
        ds = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
        rmed[crate] = statistics.median(ds)
    print("ОТНОШЕНИЯ (крейт-медианы): "
          + " | ".join(f"{c} {v:+.1f}%" for c, v in sorted(rmed.items()))
          + "   exact: " + " ".join(f"{c}={v!r}" for c, v in sorted(rmed.items())))
    sup = [c for c, v in rmed.items() if v <= -5.0]
    top = max(rmed, key=rmed.get)
    span = max(rmed.values()) - min(rmed.values())
    print(f"suppressed: {sup}, top {top} {rmed[top]:+.2f}, span {span!r} -> {span:.0f}")
    if not flags:
        note = (abs(cd1) > 3 or sp1 > 20)
        print(f"ПРОГНОЗ ВЕРДИКТА: ПАРИТЕТ exit 0 {'С ЗАМЕТКОЙ' if note else 'БЕЗ заметки'}")
    elif sp1 > 20.0:
        if sup:
            print("ПРОГНОЗ ВЕРДИКТА: ДРЕЙФ СРЕДЫ exit 3 (suppressed НЕ пуст: "
                  + ", ".join(sup) + ")")
        elif rmed[top] >= 8.0:
            print("ПРОГНОЗ ВЕРДИКТА: РЕГРЕСС exit 1 (elevated)")
        else:
            print("ПРОГНОЗ ВЕРДИКТА: ДРЕЙФ СРЕДЫ exit 3 (глобальный сдвиг)")
    else:
        print("ПРОГНОЗ ВЕРДИКТА: РЕГРЕСС exit 1 (узкое распределение)")
    mat = (med1 == 0.0)
    print(f"РЕЕСТР-КАНДИДАТ: median {'МАТЕРИАЛИЗОВАЛСЯ' if mat else 'НЕ материализуется'}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "scripts/data214.js")
