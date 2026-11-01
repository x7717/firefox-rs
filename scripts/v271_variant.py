#!/usr/bin/env python3
"""v271_variant.py — окно 283: вариант-свидетельство для точки #292
(f92d0dd, idx 294, MEDIUM хост). Вариант-пары = предыдущие записи
канонического MEDIUM-кластера (НЕ пара): vs 87ec41e (idx 268, distance
26 — между idx 269-293 25 записей смешанных классов) и vs 45afa12
(idx 252, distance 42). Решающий тест идентичности хоста (прецедент
w280/w281/w282): same-host разброс MEDIUM наблюдаемый вычисляется;
вариант-медианы в РЕЕСТР НЕ идут (урок w278)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data283.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"idx": i, "cid": r["commit"]["id"][:7],
                 "canary": vals.get(CANARY), "vals": vals})

last = meta[294]
assert last["cid"] == "f92d0dd" and last["canary"] == 1070321
for vp in (268, 252):
    var = meta[vp]
    lv, pv = last["vals"], var["vals"]
    d1 = [(v - pv[k]) / pv[k] * 100.0 for k, v in lv.items()
          if pv.get(k) and v]
    n = len(d1)
    s = sorted(d1)
    med = statistics.median(d1)
    rank = s.index(med) if med in s else None
    p10, p90 = s[int(n * 0.10)], s[int(n * 0.90)]
    spread = p90 - p10
    cd = (last["canary"] - var["canary"]) / var["canary"] * 100.0
    zeros = sum(1 for a in d1 if a == 0.0)
    sm_l = lv.get("parse/foxjson/small")
    sm_p = pv.get("parse/foxjson/small")
    zz_l = lv.get("find/foxsearch/zzz-absent-zzz")
    zz_p = pv.get("find/foxsearch/zzz-absent-zzz")
    ca_l = lv.get("parse/foxurl/corpus-all")
    ca_p = pv.get("parse/foxurl/corpus-all")
    print(f"vs {var['cid']} (idx {var['idx']}, distance {294 - var['idx']}): "
          f"median {med!r} (rank [{'[' + str(rank) + ']' if rank is not None else 'интерп'}]), "
          f"spread {spread!r} -> {spread:.1f}, canary {cd:+.2f}% "
          f"(cur {last['canary']} vs {var['canary']}), {zeros} нулей, "
          f"small {sm_l} vs {sm_p} ({(sm_l - sm_p) / sm_p * 100.0:+.2f}%), "
          f"zzz {zz_l} vs {zz_p} ({(zz_l - zz_p) / zz_p * 100.0:+.2f}%), "
          f"corpus-all {ca_l} vs {ca_p} ({(ca_l - ca_p) / ca_p * 100.0:+.2f}%)")
