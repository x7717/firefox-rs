#!/usr/bin/env python3
"""v310_continuity.py — проверка CONTINUITY data310.js vs data309.js
(записи 0..325 dict-равны; новые 326=be56765, 327=7548a23) + строка
профиля судимой (СНАЧАЛА строку профиля, урок 229) + класс meta[-1]."""
import json
import re
from pathlib import Path


def load(p):
    raw = Path(p).read_text()
    m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
    return json.loads(m.group(1))["entries"]["Rust Benchmark"]


old = load("scripts/data309.js")
new = load("scripts/data310.js")
n_old, n_new = len(old), len(new)
print(f"data309.js: {n_old} записей; data310.js: {n_new} записей")

# CONTINUITY: все старые записи dict-равны
assert n_new >= n_old, "НЕТ откатов: new < old!"
cont = all(old[i] == new[i] for i in range(n_old))
print(f"CONTINUITY 0..{n_old-1}: {'DICT-РАВНЫ' if cont else 'РАСХОЖДЕНИЕ!'}")
assert cont

# Новые записи
for i in range(n_old, n_new):
    r = new[i]
    c = r["commit"]["id"][:7]
    print(f"НОВАЯ запись idx {i}: {c} | {r['commit']['message'][:60]!r}")

# СНАЧАЛА строка профиля судимой (урок 229)
vals = {b["name"]: b["value"] for b in new[-1]["benches"]}
canary = vals["parse/foxjson/session-5000"]
v11 = vals["parse/foxurl/11"]
k3 = vals.get("serialize/foxurl/3")
zzz = vals.get("find/foxsearch/zzz-absent-zzz")
small = vals.get("parse/foxjson/small")
corpus = vals.get("parse/foxurl/corpus-all")
prof = v11 / canary
cls = "FAST" if canary < 900_000 else ("MEDIUM" if canary < 1_200_000 else "CLASSIC")
era = "OLD" if prof < 6.0e-05 else "NEW"
print(f"\n=== СУДИМАЯ meta[-1] idx {n_new-1} ===")
print(f"canary {canary} | v11 {v11} | профиль {v11}/{canary} = {prof:.4e} [{era}]")
print(f"k3 serialize/foxurl/3 = {k3} | zzz {zzz} | small {small} | corpus-all {corpus}")
print(f"umbrella-класс: {cls}")

# Пара: последний ОДНОКЛАССНЫЙ предшественник (МАШИННОЕ правило, урок 305)
def umbrella(run):
    v = {b["name"]: b["value"] for b in run["benches"]}
    c = v["parse/foxjson/session-5000"]
    return "FAST" if c < 900_000 else ("MEDIUM" if c < 1_200_000 else "CLASSIC")


preds = []
for i in range(n_new - 2, -1, -1):
    if umbrella(new[i]) == cls:
        preds.append(i)
        if len(preds) == 3:
            break
print("\n=== КАНДИДАТЫ-ПАРЫ (последние 3 одноклассных предшественника) ===")
for i in preds:
    pv = {b["name"]: b["value"] for b in new[i]["benches"]}
    pc = pv["parse/foxjson/session-5000"]
    pk3 = pv.get("serialize/foxurl/3")
    pzzz = pv.get("find/foxsearch/zzz-absent-zzz")
    psm = pv.get("parse/foxjson/small")
    pcor = pv.get("parse/foxurl/corpus-all")
    pp = pv["parse/foxurl/11"] / pc
    dist = (n_new - 1) - i
    print(f"idx {i} {new[i]['commit']['id'][:7]} [{umbrella(new[i])}] "
          f"canary {pc} профиль {pp:.4e} [{'OLD' if pp < 6e-05 else 'NEW'}] "
          f"k3 {pk3} zzz {pzzz} small {psm} corpus-all {pcor} | distance {dist}")
