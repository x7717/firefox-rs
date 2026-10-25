#!/usr/bin/env python3
"""bench_history.py — класс-осознанный анализатор истории бенчей (gh-pages data.js).

Зачем: алерт github-action-benchmark (>150%) слеп к классу CI-раннера.
На идентичном коде session-5000 = 712K (FAST) / 1070K (MEDIUM) / 1357K (CLASSIC)
ns/iter — переворот класса выглядит как +85% «регресс», реальный +20% невидим.
Единственный корректный сигнал — сравнение прогонов ОДНОГО класса (см. docs/PROFILING.md,
«Протокол измерений», сессия 23).

Использование:
  bench_history.py data.js                 # обзор: прогоны+классы, тренд, fox/std
  bench_history.py data.js --check 20      # вердикт: последний прогон vs последний
                                           # ОДНОКЛАССНЫЙ; exit 0 паритет /
                                           # 1 регресс / 2 нет пары / 3 дрейф среды
  bench_history.py --fetch                 # взять data.js из origin/gh-pages (git)

Порог canary (как в .github/workflows/bench.yml, шаг "Runner class canary"):
  session-5000 < 900_000 -> FAST; < 1_200_000 -> MEDIUM; иначе CLASSIC.
Зависимости: только stdlib.
"""
import argparse
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

FAST_T = 900_000
CLASSIC_T = 1_200_000
CANARY = "parse/foxjson/session-5000"
CANARY_FALLBACK = "find/foxsearch/zzz-absent-zzz"

# пары "оптимизированная реализация" / "эталон" — внутри-прогонный паритет не зависит от класса
PAIR_RULES = [
    ("/foxjson/", "/serde_json/"),
    ("/foxurl/", "/url_crate/"),      # parse/... и canonical/...
    ("/foxsearch/", "/std/"),         # find/...
]
FOCUS = [
    "parse/foxjson/session-5000", "parse/foxjson/strs-5000",
    "parse/foxjson/nums-5000", "parse/foxjson/small",
    "parse/foxurl/corpus-all", "find/foxsearch/Mozilla Corporation",
]


def classify(canary):
    if canary is None:
        return "UNKNOWN"
    if canary < FAST_T:
        return "FAST"
    if canary < CLASSIC_T:
        return "MEDIUM"
    return "CLASSIC"


def load_datajs(path):
    raw = Path(path).read_text()
    m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
    if not m:
        sys.exit(f"FAIL: window.BENCHMARK_DATA не найден в {path}")
    return json.loads(m.group(1))


def runs_table(d):
    runs = d["entries"].get("Rust Benchmark", [])
    if not runs:
        sys.exit("FAIL: пустой entries['Rust Benchmark']")
    out = []
    for r in runs:
        vals = {b["name"]: b["value"] for b in r["benches"]}
        canary = vals.get(CANARY, vals.get(CANARY_FALLBACK))
        out.append({
            "cid": r["commit"]["id"][:7],
            "msg": r["commit"]["message"].splitlines()[0][:60],
            "ts": str(r["commit"]["timestamp"])[:16],
            "cls": classify(canary),
            "canary": canary,
            "vals": vals,
        })
    return out


def std_partner(name):
    for a, b in PAIR_RULES:
        if a in name:
            cand = name.replace(a, b, 1)
            return cand
    return None


def print_overview(meta):
    print(f"прогонов в истории: {len(meta)}\n")
    print("== прогоны (новые внизу) ==")
    for m in meta:
        print(f"  {m['cid']}  {m['ts']}  {m['cls']:<7} canary={m['canary']}")
        print(f"           {m['msg']}")
    names = list(meta[0]["vals"].keys())
    print("\n== тренд ключевых бенчей (ns/iter, [класс]) ==")
    for n in FOCUS:
        if n not in names:
            continue
        cells = "  ".join(f"{m['cid']}[{m['cls'][:1]}]={m['vals'][n]:.0f}" for m in meta)
        print(f"  {n:<34} {cells}")
    print("\n== внутри-прогонный паритет fox/эталон (класс-независимый сигнал) ==")
    for m in meta:
        rs = []
        for name, v in m["vals"].items():
            partner = std_partner(name)
            if partner and partner in m["vals"] and v:
                rs.append(f"{name.split('/', 1)[0]}/{name.split('/')[-1][:14]} {v / m['vals'][partner]:.2f}x")
        print(f"  {m['cid']} [{m['cls']:<7}] " + "  ".join(rs))


def check_regression(meta, threshold_pct):
    """Вердикт: последний прогон vs последний ОДНОКЛАССНЫЙ предшественник.

    Коды выхода: 0 ПАРИТЕТ, 1 РЕГРЕСС, 2 нет пары, 3 ДРЕЙФ среды.

    Итерация 31: одноклассная пара может сидеть на разных VM пула —
    дрейф бывает и скоростным (все бенчи в одну сторону, FAST +11-17%),
    и МИКРОАРХИТЕКТУРНЫМ (семейства в противоположные стороны: find/multi
    -20-23% vs parse/serialize +11% на паре 573f613/2052ec8). Признак
    дрейфа при наличии флагов: широкий разброс распределения дельт
    (p90-p10 > 20 п.п.) — сдвиг глобален, а не локализован в коде.
    Локализованный выброс при узком распределении — настоящий РЕГРЕСС
    (иначе, например, регресс самого canary-бенча был бы замаскирован).
    """
    import statistics
    last = meta[-1]
    prev = next((m for m in reversed(meta[:-1]) if m["cls"] == last["cls"]), None)
    if prev is None:
        print(f"ПРЕДУПРЕЖДЕНИЕ: нет одноклассного предшественника для [{last['cls']}] "
              f"({last['cid']}) — вердикт невозможен, накопите историю.")
        return 2
    print(f"== вердикт {last['cid']} [{last['cls']}] vs {prev['cid']} [{prev['cls']}] "
          f"(порог +{threshold_pct}%) ==")
    deltas, regressions = [], []
    for name, v in last["vals"].items():
        pv = prev["vals"].get(name)
        if not pv or not v:
            continue
        delta = (v - pv) / pv * 100.0
        deltas.append(delta)
        if delta > threshold_pct:
            regressions.append((delta, name, pv, v))
    if not deltas:
        print("  нет сравнимых бенчей")
        return 2
    deltas.sort()
    med = statistics.median(deltas)
    p10 = deltas[int(len(deltas) * 0.10)]
    p90 = deltas[min(int(len(deltas) * 0.90), len(deltas) - 1)]
    spread = p90 - p10
    ca, cb = prev.get("canary"), last.get("canary")
    cdelta = (cb - ca) / ca * 100.0 if ca and cb else None
    print(f"  распределение дельт: median {med:+.2f}%, p10 {p10:+.2f}%, "
          f"p90 {p90:+.2f}% (разброс {spread:.1f} п.п.)"
          + (f", canary {cdelta:+.2f}%" if cdelta is not None else ""))
    if not regressions:
        note = " (внимание: заметный дрейф скорости — сравнение грубое)" \
               if (cdelta is not None and abs(cdelta) > 3) or spread > 20 else ""
        print(f"  ПАРИТЕТ: ни один бенч не превышает +{threshold_pct}% "
              f"от одноклассного предшественника.{note}")
        return 0
    regressions.sort(reverse=True)
    for delta, name, pv, v in regressions[:15]:
        print(f"  ФЛАГ +{delta:.1f}%  {name}: {pv:.0f} -> {v:.0f}")
    if spread > 20.0:
        print(f"\n  ИТОГ: ДРЕЙФ СРЕДЫ — разброс дельт {spread:.1f} п.п. широкий, "
              f"сдвиг глобальный (разные VM/микроархитектуры пула), а не "
              f"локализованное изменение кода. Флаги — часть общего "
              f"перетасовки. Для точного вердикта — повторный прогон.")
        return 3
    print(f"\n  ИТОГ: РЕГРЕСС — {len(regressions)} бенчей(а) выше порога при "
          f"узком распределении (разброс {spread:.1f} п.п.) — локализованный "
          f"выброс, требуется разбор кода.")
    return 1


def fetch_datajs():
    out = subprocess.run(
        ["git", "show", "origin/gh-pages:dev/bench/data.js"],
        capture_output=True, text=True)
    if out.returncode != 0:
        sys.exit(f"FAIL: git show origin/gh-pages:dev/bench/data.js — {out.stderr.strip()}\n"
                 f"Сделайте git fetch origin gh-pages:refs/remotes/origin/gh-pages")
    f = tempfile.NamedTemporaryFile("w", suffix=".js", delete=False)
    f.write(out.stdout)
    f.close()
    return f.name


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("datajs", nargs="?", help="путь к data.js (gh-pages: dev/bench/data.js)")
    ap.add_argument("--fetch", action="store_true",
                    help="взять data.js из origin/gh-pages через git show")
    ap.add_argument("--check", nargs="?", type=float, const=20.0, default=None,
                    metavar="PCT", help="вердикт регресса vs одноклассный предшественник")
    args = ap.parse_args()

    path = fetch_datajs() if args.fetch else args.datajs
    if not path:
        ap.error("укажите data.js или --fetch")
    meta = runs_table(load_datajs(path))
    print_overview(meta)
    if args.check is not None:
        sys.exit(check_regression(meta, args.check))


if __name__ == "__main__":
    main()
