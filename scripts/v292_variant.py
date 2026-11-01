#!/usr/bin/env python3
"""v292_variant.py — окно 292: точка #305 6370dbb (idx 304, FAST canary
760737, Формы-A 62-й визит) — ВАРИАНТ-СВИДЕТЕЛЬСТВО same-form Формы-A:
vs 628dd1f копия-1 (idx 291, distance 13) / 4eb8807 (idx 285, distance 19) /
fd7e926 (idx 282, distance 22) / 87d7d86 (idx 231, distance 73) — ожидание
УЗКОГО разброса (хост-идентичность Формы-A); КОНТРАСТ чужих классов/форм:
vs 7676353 (idx 303, CLASSIC OLD-канон) / 86b4cf4 (idx 302, NEW-скошенная
подформа) / a4241de (idx 301, MEDIUM) / 68f8b0a (idx 300, CLASSIC) /
fe76381 (idx 299, CLASSIC 1260k) — ожидание ШИРОКОГО (кросс-класс).
ПАРА = 33c89cc (idx 296) —_same-form Формы-A, судится машиной отдельно.
Вариант-медианы в РЕЕСТР НЕ идут (урок w278). Формулы = analyze.py."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data292.js"

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

last = meta[304]
assert last["cid"] == "6370dbb" and last["cls"] == "FAST"
assert last["canary"] == 760737
WITNESSES = [(291, "628dd1f"), (285, "4eb8807"), (282, "fd7e926"),
             (231, "87d7d86")]
CONTRAST = [(303, "7676353"), (302, "86b4cf4"), (301, "a4241de"),
            (300, "68f8b0a"), (299, "fe76381")]
PAIR = (296, "33c89cc")


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


print("=== ВАРИАНТ-СВИДЕТЕЛЬСТВО ОКНА 292 (6370dbb, FAST Формы-A) ===")
print("--- same-form Формы-A свидетели (ожидание УЗКИХ) ---")
for idx_, cid_ in WITNESSES:
    compare(idx_, cid_, "WITNESS")
print("--- ПАРА (машина судит отдельно) ---")
compare(*PAIR, "PAIR")
print("--- контраст чужих классов/форм (ожидание ШИРОКИХ) ---")
for idx_, cid_ in CONTRAST:
    compare(idx_, cid_, "CONTRAST")
