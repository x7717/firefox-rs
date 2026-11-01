#!/usr/bin/env python3
"""v291_variant.py — окно 291: точка #303 86b4cf4 (idx 302, CLASSIC canary
1357706, NEW-скошенная подформа e990865-класса) — ВАРИАНТ-СВИДЕТЕЛЬСТВО
same-form подформы: vs e990865 (idx 286, distance 16) / 3215b78 (idx 276,
distance 26) / d50c58c (idx 239, distance 63) — ожидание УЗКОГО разброса
(хост-идентичность); КОНТРАСТ чужих форм: vs 68f8b0a (idx 300, OLD-канон,
ПАРА) / fe76381 (idx 299, 1260k) / b74d5b2 (idx 298, canary-1220k) /
a4241de (idx 301, MEDIUM) / 33c89cc (idx 296, FAST) — ожидание ШИРОКОГО
(прецеденты w284/286/287/288/289: 67.2/57.3/71.1/19.2/52.6).
ХОСТ-ИДЕНТИЧНОСТЬ подтверждается узкими same-form разбросами.
Вариант-медианы в РЕЕСТР НЕ идут (урок w278). Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data291.js"

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

last = meta[302]
assert last["cid"] == "86b4cf4" and last["cls"] == "CLASSIC"
WITNESSES = [(286, "e990865"), (276, "3215b78"), (239, "d50c58c")]
CONTRAST = [(300, "68f8b0a"), (299, "fe76381"), (298, "b74d5b2"),
            (301, "a4241de"), (296, "33c89cc")]


def compare(other_idx, other_cid, tag):
    o = meta[other_idx]
    assert o["cid"] == other_cid, (o["cid"], other_cid)
    lv, pv = last["vals"], o["vals"]
    d1, d2, names = [], [], []
    for name, v in lv.items():
        p = pv.get(name)
        if p and v:
            d1.append((v - p) / p * 100.0)
            d2.append((v / p - 1.0) * 100.0)
            names.append(name)
    d1s = sorted(d1)
    n = len(d1)
    med = statistics.median(d1)
    p10, p90 = d1s[int(n * 0.10)], d1s[int(n * 0.90)]
    spread = p90 - p10
    cd = (last["canary"] - o["canary"]) / o["canary"] * 100.0
    zeros = sum(1 for a in d1 if a == 0.0)
    sm_l = lv["parse/foxjson/small"]
    sm_o = o["vals"]["parse/foxjson/small"]
    zzz_l = lv["find/foxsearch/zzz-absent-zzz"]
    zzz_o = o["vals"]["find/foxsearch/zzz-absent-zzz"]
    ca_l = lv["parse/foxurl/corpus-all"]
    ca_o = o["vals"]["parse/foxurl/corpus-all"]
    print(f"{tag}: vs {other_cid} (idx {other_idx}, distance "
          f"{last['idx'] - other_idx}) median {med!r}, spread "
          f"{spread!r} -> {spread:.1f}, canary {cd:+.2f}%, {zeros} нулей, "
          f"small {(sm_l-sm_o)/sm_o*100:+.2f}%, zzz "
          f"{(zzz_l-zzz_o)/zzz_o*100:+.2f}%, corpus-all "
          f"{(ca_l-ca_o)/ca_o*100:+.2f}%")


print("=== ВАРИАНТ-СВИДЕТЕЛЬСТВО ОКНА 291 (86b4cf4, NEW-скошенная подформа) ===")
print("--- same-form NEW-скошенные свидетели (ожидание УЗКИХ) ---")
for idx_, cid_ in WITNESSES:
    compare(idx_, cid_, "WITNESS")
print("--- контраст чужих форм (ожидание ШИРОКИХ) ---")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "CONTRAST")
