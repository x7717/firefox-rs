#!/usr/bin/env python3
"""v303_marks.py — АНАТОМИЯ окна 303 (до машины, реплика v302_marks.py):
свидетели MEDIUM-класса для проверки гипотезы 'судимая = MEDIUM-ядро'
(corpus-all 994 INSIDE 976-1014; serialize/foxurl/3 = 3 — картирование
a4241de; canary 1069443 OUTSIDE подформы 895505-938638). Ожидание:
судимая vs MEDIUM-ядро свидетели УЗКИЕ, vs подформа 8869158 ШИРОКОЕ
87.5 (auto-пара) => широкая auto-пара = контраст форм хоста, НЕ код."""
import json
import re
import statistics
from pathlib import Path

raw = Path("scripts/data303.js").read_text()
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
    if not c or c >= 1_200_000 or c < 900_000:
        continue  # только MEDIUM
    k3 = vals.get("serialize/foxurl/3")
    sp = spread_vs(vals)
    corpus = vals.get("parse/foxurl/corpus-all")
    rows.append((sp[3], i, r["commit"]["id"][:7], c, k3, corpus, sp))
rows.sort()
print(f"MEDIUM-свидетелей: {len(rows)}")
print("== ПЯТЬ УЗКИХ (судимая vs свидетель) ==")
for sp, i, cid, c, k3, corpus, full in rows[:5]:
    print(f"  {cid} idx {i} canary {c} k3 {k3} corpus {corpus}: "
          f"spread {sp:.1f} (med {full[0]:+.2f} p10 {full[1]:+.2f} p90 {full[2]:+.2f} n={full[4]})")
print("== ПЯТЬ ШИРОКИХ ==")
for sp, i, cid, c, k3, corpus, full in rows[-5:]:
    print(f"  {cid} idx {i} canary {c} k3 {k3} corpus {corpus}: "
          f"spread {sp:.1f} (med {full[0]:+.2f})")
# ключевые свидетели
print("== КЛЮЧЕВЫЕ ==")
for target in ("8869158", "a4241de", "da96246", "9da4f3e", "6241266"):
    for sp, i, cid, c, k3, corpus, full in rows:
        if cid == target:
            print(f"  {cid} idx {i} canary {c} k3 {k3} corpus {corpus}: "
                  f"spread {sp:.1f} (med {full[0]:+.2f} p10 {full[1]:+.2f} p90 {full[2]:+.2f})")
            break
    else:
        print(f"  {target}: НЕТ в MEDIUM (другой класс)")
# картирование k3 судимой
k3_last = last_vals.get("serialize/foxurl/3")
print(f"КОНТРОЛ: судимая k3 = {k3_last} (3 = a4241de MEDIUM-ядро; "
      f"2 = FAST/подформа/двойня; 4 = OLD-канон CLASSIC; 19 = NEW-скошенная)")
