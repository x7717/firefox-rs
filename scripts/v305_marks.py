#!/usr/bin/env python3
"""v305_marks.py — АНАТОМИЯ окна 305: контраст форм в классе CLASSIC.
Судимая 933038a #321 (idx 320, low-CLASSIC canary 1275907, профиль
6.192e-05 [NEW], k3 4, zzz 365287, small 132, corpus-all 1074). Пара
машины = 6f22e55 #317 (idx 316, канон-CLASSIC canary 1362935 INSIDE
канон-кластера, профиль 5.650e-05 [OLD], k3 4). Гипотеза: широкая
auto-пара 61.3 п.п. = КОНТРАСТ ФОРМ ХОСТА (канон-CLASSIC vs low-CLASSIC),
НЕ код (crates/ стазис). Проверка: разброс судимой против СВИДЕТЕЛЕЙ
форм low-CLASSIC (k3=4 и k3=3 вкусы) и против канон-CLASSIC свидетелей.
"""
import json
import re
import statistics
from pathlib import Path

raw = Path("scripts/data305.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
n = len(runs)

def vals_of(r):
    return {b["name"]: b["value"] for b in r["benches"]}

last_vals = vals_of(runs[-1])
assert runs[-1]["commit"]["id"].startswith("933038a")

def spread_vs(pos_or_cid):
    """p90-p10 дельт судимой против записи-свидетеля."""
    if isinstance(pos_or_cid, int):
        pos = pos_or_cid
        cid = runs[pos]["commit"]["id"][:7]
    else:
        pos = next(i for i, r in enumerate(runs)
                   if r["commit"]["id"].startswith(pos_or_cid))
        cid = pos_or_cid
    pv = vals_of(runs[pos])
    ds = sorted((v - pv[name]) / pv[name] * 100.0
                for name, v in last_vals.items()
                if pv.get(name) and v and name in pv)
    if len(ds) < 10:
        return cid, pos, None, None, None
    p10 = ds[int(len(ds) * 0.10)]
    p90 = ds[int(len(ds) * 0.90)]
    return cid, pos, p90 - p10, statistics.median(ds), len(ds)

WITNESS_LOW_K4 = [("b1bf50c", "low k3=4, idx 287, canary 1261019"),
                  ("fe76381", "low k3=4, idx 299, canary 1259770"),
                  ("680b8e9", "low k3=4, idx 275, canary 1260391"),
                  ("5ae02bc", "low k3=4, idx 214, canary 1262371"),
                  ("5db125a", "low k3=4, idx 110, canary 1253700"),
                  ("102d44d", "low k3=4, idx 42, canary 1259331"),
                  ("fd0ab4b", "low k3=4, idx 27, canary 1257782"),
                  ("573f613", "low k3=4, idx 7, canary 1261716")]
WITNESS_LOW_K3 = [("97e1e53", "low k3=3, idx 213, canary 1225279"),
                  ("bca9f03", "low k3=3, idx 257, canary 1211767"),
                  ("0cb508b", "low k3=3, idx 295, canary 1216790"),
                  ("b74d5b2", "low k3=3, idx 298, canary 1223438")]
WITNESS_CANON = [("6f22e55", "канон-пара, idx 316, canary 1362935"),
                 ("b9c5c45", "канон, последние 10"),
                 ("be8f248", "канон, последние 10"),
                 ("d4214c9", "канон, последние 10"),
                 ("3b83288", "канон, последние 10")]

print("=== АНАТОМИЯ окна 305: судимая 933038a #321 (low-CLASSIC [NEW]) ===")
print("--- vs low-CLASSIC k3=4 свидетели ---")
for cid, note in WITNESS_LOW_K4:
    cid7, pos, sp, med, nd = spread_vs(cid)
    print(f"  {cid7} (idx {pos}) разброс {sp:.1f} п.п. median {med:+.1f}% n={nd} — {note}")
print("--- vs low-CLASSIC k3=3 свидетели ---")
for cid, note in WITNESS_LOW_K3:
    cid7, pos, sp, med, nd = spread_vs(cid)
    print(f"  {cid7} (idx {pos}) разброс {sp:.1f} п.п. median {med:+.1f}% n={nd} — {note}")
print("--- vs канон-CLASSIC свидетели ---")
for cid, note in WITNESS_CANON:
    cid7, pos, sp, med, nd = spread_vs(cid)
    print(f"  {cid7} (idx {pos}) разброс {sp:.1f} п.п. median {med:+.1f}% n={nd} — {note}")

# --- corpus-all судимой против исторических форм ---
print("--- corpus-all маркер ---")
lows_k4 = [930, 929, 933, 927, 938, 930, 930, 930]
print(f"low-CLASSIC k3=4 вкус: норма {min(lows_k4)}-{max(lows_k4)}; "
      f"судимая 1074 = +{(1074 - max(lows_k4)) / max(lows_k4) * 100:.1f}% выше максимума — "
      f"{'ВНЕ' if 1074 > max(lows_k4) else 'INSIDE'}")
print(f"профиль судимой 6.192e-05 [NEW] — ПЕРВЫЙ low-CLASSIC выше порога 6.0e-05 "
      f"(исторический диапазон вкуса 5.389-5.477e-05)")
