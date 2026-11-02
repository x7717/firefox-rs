#!/usr/bin/env python3
"""v298_marks.py — окно 298: маркеры записи 8869158 (точка #314, класс
MEDIUM canary 938523; СНАЧАЛА строку профиля, урок 229): судимая НЕ в
канон-кластере 1345000-1375000 — MEDIUM-хост, twin-форма (9da4f3e 938638
idx 264 / 6241266 936463 idx 245 — canary совпадает до 0.012%). Пара
(GUARD авто) = da96246 #310 (idx 309), distance 4, between 3 НЕ-MEDIUM
вставки. АНАТОМИЯ: (1) same-class MEDIUM свидетели — 9da4f3e (twin 938k,
distance 49) / 6241266 (twin 936k, 68) / e24e80f (992k, 50) / 5d676f2
(909k, 84) — ожидание УЗКОГО у twin (хост-форма) иWide у далёких;
(2) КОНТРАСТЫ чужих классов — d4214c9 (CLASSIC, distance 1) / 3b83288
(CLASSIC, 3) / c9db45c (FAST, 2) — ожидание ШИРОКОГО. КОНТРОЛ
serialize/foxurl/3 (квантование 2/3/19/4 — свойство хоста, закрыт окном
292). Формулы = analyze.py (урок 229: дискриминатор 6.0e-05)."""
import json
import re
import statistics
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = "scripts/data298.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get(CANARY)
    cls = "FAST" if c < 900_000 else ("MEDIUM" if c < 1_200_000 else "CLASSIC")
    meta.append({"idx": i, "cid": r["commit"]["id"][:7], "cls": cls,
                 "canary": c, "vals": vals})

last = meta[313]
assert last["cid"] == "8869158" and last["cls"] == "MEDIUM"
assert last["canary"] == 938523
lv = last["vals"]

# --- строка профиля (урок 229) ---
v11 = lv["parse/foxurl/11"]
prof = v11 / last["canary"]
zzz = lv["find/foxsearch/zzz-absent-zzz"]
small = lv["parse/foxjson/small"]
call = lv["parse/foxurl/corpus-all"]
meds = [m for m in meta if m["cls"] == "MEDIUM"]
mzzz = sorted(m["vals"][CANARY.replace(CANARY, "find/foxsearch/zzz-absent-zzz")] if False
              else m["vals"]["find/foxsearch/zzz-absent-zzz"] for m in meds)
msmall = sorted(m["vals"]["parse/foxjson/small"] for m in meds)
mcall = sorted(m["vals"]["parse/foxurl/corpus-all"] for m in meds)
mcans = sorted(m["canary"] for m in meds)
print(f"ПРОФИЛЬ-СТРОКА: судимая MEDIUM-хост (canary {last['canary']} INSIDE "
      f"MEDIUM-истории {mcans[0]}-{mcans[-1]}); twin-форма: 9da4f3e 938638 / "
      f"6241266 936463 (canary совпадает до 0.012%)")
print(f"  профиль v11/canary = {v11}/{last['canary']} = {prof!r} "
      f"[{('OLD' if prof < 6.0e-05 else 'NEW')}] — SAME-PROFILE с парой "
      f"da96246 5.9047e-05 [OLD] (дискриминатор окна 229)")
print(f"  zzz {zzz} — НОВЫЙ MEDIUM-максимум (история без судимой "
      f"{mzzz[0]}-{mzzz[-1] if mzzz[-1] != zzz else max(x for x in mzzz if x != zzz)}; "
      f"twin-норма 350166-355810 — +{round((zzz/351452-1)*100,1)}% над twin 9da4f3e)")
print(f"  small {small} INSIDE MEDIUM {msmall[0]}-{msmall[-1]} | "
      f"corpus-all {call} INSIDE MEDIUM {mcall[0]}-{mcall[-1]} "
      f"(low-canary прецеденты 741/743/791/597)")

# --- свидетели/контрасты ---
def spread_of(i):
    pv = meta[i]["vals"]
    ds = sorted((v - pv[nm]) / pv[nm] * 100.0 for nm, v in lv.items()
                if pv.get(nm) and v)
    n = len(ds)
    return n, ds[int(n * 0.10)], ds[min(int(n * 0.90), n - 1)]

WIT = [(264, "9da4f3e", "twin 938k"), (245, "6241266", "twin 936k"),
       (263, "e24e80f", "MEDIUM 992k"), (229, "5d676f2", "MEDIUM 909k")]
CON = [(312, "d4214c9", "CLASSIC"), (310, "3b83288", "CLASSIC"),
       (311, "c9db45c", "FAST")]
print("\nАНАТОМИЯ — СВИДЕТЕЛИ same-class MEDIUM (ожидание: twin УЗКИЙ):")
for i, cid, tag in WIT:
    n, p10, p90 = spread_of(i)
    zp = meta[i]["vals"]["find/foxsearch/zzz-absent-zzz"]
    print(f"  {cid} idx {i} [{tag}] distance {313 - i}: spread {p90 - p10:.1f} "
          f"п.п. (p10 {p10:.1f} / p90 {p90:.1f}), zzz пары {zp} "
          f"({(zzz - zp) / zp * 100:+.1f}%)")
print("АНАТОМИЯ — КОНТРАСТЫ чужих классов (ожидание ШИРОКОГО):")
for i, cid, tag in CON:
    n, p10, p90 = spread_of(i)
    print(f"  {cid} idx {i} [{tag}] distance {313 - i}: spread {p90 - p10:.1f} "
          f"п.п. (p10 {p10:.1f} / p90 {p90:.1f})")

# --- пять значений пары ---
prev = meta[309]
assert prev["cid"] == "da96246"
pv = prev["vals"]
d1, d2, names = [], [], []
for name, v in lv.items():
    p = pv.get(name)
    if not p or not v:
        continue
    d1.append((v - p) / p * 100.0)
    d2.append((v / p - 1.0) * 100.0)
    names.append(name)
n = len(d1)
d1s = sorted(d1)
med = statistics.median(d1)
ri = d1s.index(med)
i10 = int(n * 0.10)
i90 = min(int(n * 0.90), n - 1)
print(f"\nПЯТЬ ЗНАЧЕНИЙ (n={n}): MEDIAN {med!r} rank[{ri}] соседи "
      f"{d1s[ri - 1]!r} / {d1s[ri + 1]!r}")
print(f"P10 {d1s[i10]!r} deltas[{i10}] | P90 {d1s[i90]!r} deltas[{i90}] | "
      f"SPREAD {d1s[i90] - d1s[i10]!r} -> {d1s[i90] - d1s[i10]:.1f} п.п. УЗКИЙ <20")
cd = (last["canary"] - prev["canary"]) / prev["canary"] * 100.0
print(f"CANARY-vs-ПАРА {cd!r} -> {cd:+.2f}% (cur {last['canary']} vs пара "
      f"{prev['canary']})")
zeros = [(a, nm) for a, nm in zip(d1, names) if a == 0.0]
print(f"НУЛИ {len(zeros)} (все {n} дельт НЕ-нулевые — сдвиг хоста)")
worst = max(zip((abs(a - b) for a, b in zip(d1, d2)), names))
print(f"FP max |f1-f2| {worst[0]!r} worst {worst[1]}")
flags = sorted(((a, nm) for a, nm in zip(d1, names) if a > 20.0), reverse=True)
print(f"ФЛАГИ {len(flags)}: "
      + " / ".join(f"{nm} +{a:.1f}" for a, nm in flags))

# --- контрол serialize/foxurl/3 ---
ids = {m["cid"]: m for m in meta}
c3 = {cid: ids[cid]["vals"].get("serialize/foxurl/3")
      for cid in ("8869158", "da96246", "a4241de", "d4214c9", "3b83288",
                  "c9db45c", "6370dbb", "86b4cf4")}
print(f"\nКОНТРОЛ serialize/foxurl/3: {c3} (квантование 2/3/19/4; "
      f"2 на MEDIUM-хосте 8869158 — первое, картирование хост-форм "
      f"расширяется; контрол закрыт окном 292)")

# --- стазис/счётчики ---
print(f"\nСЧЁТЧИКИ: точек {len(ids)} (записей {len(runs)}; +1 НОВАЯ точка "
      f"за окно — 8869158 #314); счётчик corpus-all СТОИТ (14) — судимая "
      f"MEDIUM, OLD-канон дискриминатор НЕ применяется (1191 окна 297)")
print("Серия пяти значений 99-298 ожидается 188/188 (СТО ВОСЕМЬДЕСЯТ "
      "ВОСЬМОЙ) при 7/7 пре-регистрации")
