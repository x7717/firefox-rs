#!/usr/bin/env python3
"""w297_profile.py — СНАЧАЛА строка профиля (урок 229): судимая d4214c9 #313."""
import json
import re
from pathlib import Path

raw = Path("scripts/data297.js").read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
print("total records:", len(runs))
for pos in (-1, -2, -3):
    r = runs[pos]
    vals = {b["name"]: b["value"] for b in r["benches"]}
    canary = vals.get("parse/foxjson/session-5000")
    v11 = vals.get("parse/foxurl/11")
    prof = v11 / canary if v11 and canary else None
    tag = "OLD" if prof and prof < 6.0e-05 else "NEW"
    print(f"idx {len(runs)+pos} cid {r['commit']['id'][:7]}: canary {canary} "
          f"v11 {v11} профиль {prof:.4e} [{tag}]")

vals = {b["name"]: b["value"] for b in runs[-1]["benches"]}
canary = vals["parse/foxjson/session-5000"]
zzz = vals.get("find/foxsearch/zzz-absent-zzz")
small = vals.get("parse/foxjson/small")
corpus = vals.get("parse/foxurl/corpus-all")
prof = vals["parse/foxurl/11"] / canary
print("--- профиль судимой d4214c9 #313 ---")
print(f"canary {canary} канон-кластер 1345000-1375000: "
      f"{'INSIDE' if 1345000 <= canary <= 1375000 else 'OUTSIDE'}")
print(f"профиль {prof!r} = {prof:.4e} [{'OLD' if prof < 6.0e-05 else 'NEW'}]")
print(f"zzz {zzz} OLD-конверт 203811-226663: "
      f"{'INSIDE' if 203811 <= zzz <= 226663 else 'OUTSIDE'}")
print(f"small {small} норма 143-153: {'INSIDE' if 143 <= small <= 153 else 'OUTSIDE'}")
print(f"corpus-all {corpus} OLD-канон 1163-1228: "
      f"{'INSIDE' if 1163 <= corpus <= 1228 else 'OUTSIDE'}")
# позиция в канон-кластере
lo, hi = 1345000, 1375000
if lo <= canary <= hi:
    print(f"позиция в кластере: от нижней {(canary-lo)/(hi-lo)*100:.2f}% ширины")
