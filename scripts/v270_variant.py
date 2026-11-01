#!/usr/bin/env python3
"""v270_variant.py — окно 282: вариант-свидетельство для точки #291
(e915c61, idx 293, CLASSIC OLD-хост). Вариант-пары = предыдущие записи
OLD-кластера: vs ef95f29 (idx 289, distance 4 — между idx 290-292:
cf857bd CLASSIC + копия-1 FAST + копия-2 CLASSIC) и vs c0747e1 (idx 284,
distance 9 — 8 записей между). Решающий тест идентичности хоста
(прецедент w280/w281): same-host разброс CLASSIC-OLD наблюдаемый 2.5-3.6
п.п. (после окна 282: 2.5-3.6); вариант-медианы в РЕЕСТР НЕ идут (урок
w278)."""
import json
import re
import statistics
import sys
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
DATA = sys.argv[1] if len(sys.argv) > 1 else "scripts/data282.js"

raw = Path(DATA).read_text()
d = json.loads(re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$",
                         raw, re.S).group(1))
runs = d["entries"]["Rust Benchmark"]
meta = []
for i, r in enumerate(runs):
    vals = {b["name"]: b["value"] for b in r["benches"]}
    meta.append({"idx": i, "cid": r["commit"]["id"][:7],
                 "canary": vals.get(CANARY), "vals": vals})

last = meta[293]
assert last["cid"] == "e915c61" and last["canary"] == 1351861
for vp in (289, 284):
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
    print(f"vs {var['cid']} (idx {var['idx']}, distance {293 - var['idx']}): "
          f"median {med!r} (rank [{'[' + str(rank) + ']' if rank is not None else 'интерп'}]), "
          f"spread {spread!r} -> {spread:.1f}, canary {cd:+.2f}% "
          f"(cur {last['canary']} vs {var['canary']}), {zeros} нулей, "
          f"small {sm_l} vs {sm_p} ({(sm_l - sm_p) / sm_p * 100.0:+.2f}%), "
          f"zzz {zz_l} vs {zz_p} ({(zz_l - zz_p) / zz_p * 100.0:+.2f}%), "
          f"corpus-all {ca_l} vs {ca_p} ({(ca_l - ca_p) / ca_p * 100.0:+.2f}%)")
