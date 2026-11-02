#!/usr/bin/env python3
"""v304_marks.py — АНАТОМИЯ окна 304 (до машины, реплика v303_marks.py):
свидетели FAST-класса Формы-A (canary INSIDE 711824-816814) для проверки
гипотезы 'судимая = Формы-A' (canary 726792, k3=2, zzz 115037 INSIDE
FAST-конверт, small 83 INSIDE 77-89, corpus-all 591 INSIDE 568-667).
Ожидание: судимая vs Формы-A свидетели УЗКИЕ INSIDE коридора 3.0..14.0
(канон-свидетель c9db45c #312 idx 311), vs подформа 095148c #318
(пара) ШИРОКОЕ ~77-115 => широкая auto-пара = КОНТРАСТ ФОРМ ХОСТА,
НЕ код (зеркало окон 302/303)."""
import json
import re
import statistics
from pathlib import Path

raw = Path("scripts/data304.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)
last_vals = {b["name"]: b["value"] for b in runs[-1]["benches"]}

def spread_vs(pv):
    ds = []
    for name, v in last_vals.items():
        p = pv.get(name)
        if p and v:
            ds.append((v - p) / p * 100.0)
    ds.sort()
    if not ds:
        return None
    p10 = ds[int(len(ds) * 0.10)]
    p90 = ds[min(int(len(ds) * 0.90), len(ds) - 1)]
    return statistics.median(ds), p10, p90, p90 - p10, len(ds)

rows = []
for i, r in enumerate(runs[:-1]):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    c = vals.get("parse/foxjson/session-5000")
    if not c or not (900_000 > c >= 700_000):
        continue  # FAST-зона: Формы-A 711824-816814 + соседние
    if not (711_824 <= c <= 816_814):
        continue  # строго Формы-A кластер
    k3 = vals.get("serialize/foxurl/3")
    sp = spread_vs(vals)
    corpus = vals.get("parse/foxurl/corpus-all")
    rows.append((sp[3], i, r["commit"]["id"][:7], c, k3, corpus, sp))
rows.sort()
print(f"Формы-A свидетелей: {len(rows)}")
print("== ПЯТЬ УЗКИХ (судимая vs свидетель) ==")
for sp, i, cid, c, k3, corpus, full in rows[:5]:
    print(f"  {cid} idx {i} canary {c} k3 {k3} corpus {corpus}: "
          f"spread {sp:.1f} (med {full[0]:+.2f} p10 {full[1]:+.2f} p90 {full[2]:+.2f} n={full[4]})")
print("== ПЯТЬ ШИРОКИХ ==")
for sp, i, cid, c, k3, corpus, full in rows[-5:]:
    print(f"  {cid} idx {i} canary {c} k3 {k3} corpus {corpus}: "
          f"spread {sp:.1f} (med {full[0]:+.2f})")
print("== КЛЮЧЕВЫЕ ==")
for target in ("095148c", "c9db45c", "6370dbb", "8869158", "e63ee47"):
    for sp, i, cid, c, k3, corpus, full in rows:
        if cid == target:
            print(f"  {cid} idx {i} canary {c} k3 {k3} corpus {corpus}: "
                  f"spread {sp:.1f} (med {full[0]:+.2f} p10 {full[1]:+.2f} p90 {full[2]:+.2f})")
            break
    else:
        vv = None
        for i, r in enumerate(runs):
            if r["commit"]["id"].startswith(target):
                vv = ({b["name"]: b["value"] for b in r["benches"]}, i)
                break
        if vv:
            v, i = vv
            sp = spread_vs(v)
            print(f"  {target} idx {i}: НЕ Формы-A (canary {v.get('parse/foxjson/session-5000')}), "
                  f"spread судимой vs него {sp[3]:.1f} (med {sp[0]:+.2f})" if sp else f"  {target}: нет данных")
        else:
            print(f"  {target}: не найден")
