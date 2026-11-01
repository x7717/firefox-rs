#!/usr/bin/env python3
"""probe288.py — окно 288: пин-таблица хвоста истории + идентификация формы
fe76381 (canary 1259770) по кластерам CLASSIC (урок 229 — СНАЧАЛА строку
профиля; формы: канон ~1355k / canary-1220k кластер 1201406-1225670 /
форма 1260k 680b8e9/b1bf50c small 130-131 проф ~5.39e-05)."""
import json
import re
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("/home/z/my-project/firefox-rs/scripts/data288.js").read_text()
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

print("== пин-таблица idx 280-299 ==")
for m in meta[280:]:
    v = m["vals"]
    prof = v["parse/foxurl/11"] / m["canary"]
    print(f"idx {m['idx']}: {m['cid']} [{m['cls']}] canary={m['canary']} "
          f"zzz={v['find/foxsearch/zzz-absent-zzz']} "
          f"small={v['parse/foxjson/small']} "
          f"corpus-all={v['parse/foxurl/corpus-all']} проф={prof:.4e}")

print("\n== якоря: idx 66 / 55 / 275 / 287 ==")
for i in (66, 55, 275, 287):
    m = meta[i]
    v = m["vals"]
    prof = v["parse/foxurl/11"] / m["canary"]
    print(f"idx {i}: {m['cid']} [{m['cls']}] canary={m['canary']} "
          f"zzz={v['find/foxsearch/zzz-absent-zzz']} "
          f"small={v['parse/foxjson/small']} "
          f"corpus-all={v['parse/foxurl/corpus-all']} проф={prof:.4e}")

print("\n== кластер canary-1220k [1201406-1225670]: fe76381 внутри? ==")
LO, HI = 1201406, 1225670
in_cluster = [m for m in meta if m["cls"] == "CLASSIC"
              and LO <= m["canary"] <= HI]
print(f"членов в истории: {len(in_cluster)}; 1259770 INSIDE? "
      f"{LO <= 1259770 <= HI}")

print("\n== ВСЕ CLASSIC с canary 1230000-1300000 (кандидаты формы 1260k) ==")
for m in meta:
    if m["cls"] == "CLASSIC" and 1230000 <= m["canary"] <= 1300000:
        v = m["vals"]
        prof = v["parse/foxurl/11"] / m["canary"]
        print(f"idx {m['idx']}: {m['cid']} canary={m['canary']} "
              f"zzz={v['find/foxsearch/zzz-absent-zzz']} "
              f"small={v['parse/foxjson/small']} "
              f"corpus-all={v['parse/foxurl/corpus-all']} проф={prof:.4e}")

print("\n== ближайшие одноклассные CLASSIC до idx 299 (машина, строка 191) ==")
for m in reversed(meta[299:0:-1]):
    pass
prevs = [m for m in meta[:299] if m["cls"] == "CLASSIC"]
print("последние 3 CLASSIC-предшественника:")
for m in prevs[-3:]:
    print(f"  idx {m['idx']}: {m['cid']} canary={m['canary']}")
print(f"машина возьмёт: {prevs[-1]['cid']} idx {prevs[-1]['idx']} "
      f"(= b74d5b2 idx 298?)")
