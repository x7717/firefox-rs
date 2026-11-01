#!/usr/bin/env python3
"""probe289.py — окно 289: пин-таблица хвоста + идентификация формы
68f8b0a (canary 1356551) — ожидание канонический CLASSIC-OLD ~1356k
(урок 229 — СНАЧАЛА строку профиля); скан канон-кластера CLASSIC
[1345000-1375000] по всей истории + e990865 скошенная NEW-ветвь."""
import json
import re
from pathlib import Path

CANARY = "parse/foxjson/session-5000"
raw = Path("/home/z/my-project/firefox-rs/scripts/data289.js").read_text()
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

print("== пин-таблица idx 280-300 ==")
for m in meta[280:]:
    v = m["vals"]
    prof = v["parse/foxurl/11"] / m["canary"]
    print(f"idx {m['idx']}: {m['cid']} [{m['cls']}] canary={m['canary']} "
          f"zzz={v['find/foxsearch/zzz-absent-zzz']} "
          f"small={v['parse/foxjson/small']} "
          f"corpus-all={v['parse/foxurl/corpus-all']} проф={prof:.4e}")

print("\n== якоря: idx 66 / 55 / 66-Old-таг ==")
for i in (66, 55):
    m = meta[i]
    v = m["vals"]
    prof = v["parse/foxurl/11"] / m["canary"]
    print(f"idx {i}: {m['cid']} [{m['cls']}] canary={m['canary']} "
          f"zzz={v['find/foxsearch/zzz-absent-zzz']} "
          f"small={v['parse/foxjson/small']} "
          f"corpus-all={v['parse/foxurl/corpus-all']} проф={prof:.4e}")

print("\n== канон-кластер CLASSIC canary [1345000-1375000]: вся история ==")
fam = [m for m in meta if m["cls"] == "CLASSIC"
       and 1345000 <= m["canary"] <= 1375000]
print(f"членов в истории: {len(fam)}; 1356551 INSIDE? "
      f"{1345000 <= 1356551 <= 1375000}")
old = [m for m in fam
       if m["vals"]["parse/foxurl/11"] / m["canary"] < 6.0e-05]
new = [m for m in fam
       if m["vals"]["parse/foxurl/11"] / m["canary"] >= 6.0e-05]
print(f"OLD-таг: {len(old)}, NEW-таг (скошенная ветвь): {len(new)} "
      + ("(" + ", ".join(m['cid'] for m in new) + ")" if new else ""))
print("последние 12 членов:", ", ".join(
    f"{m['cid']}(idx {m['idx']})" for m in fam[-12:]))

print("\n== ближайшие одноклассные CLASSIC до idx 300 (машина, строка 191) ==")
prevs = [m for m in meta[:300] if m["cls"] == "CLASSIC"]
for m in prevs[-3:]:
    print(f"  idx {m['idx']}: {m['cid']} canary={m['canary']}")
print(f"машина возьмёт: {prevs[-1]['cid']} idx {prevs[-1]['idx']}")

print("\n== serialize/foxurl/3 (КОНТРОЛ окна 288) ==")
for m in meta[297:]:
    print(f"  idx {m['idx']} {m['cid']}: serialize/foxurl/3 = "
          f"{m['vals'].get('serialize/foxurl/3')}")
