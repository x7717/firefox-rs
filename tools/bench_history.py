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

Итерация 32: слой ОТНОШЕНИЙ fox/эталон (крейт-медианы). Отношение
fox/эталон внутри одного прогона иммунно к СКОРОСТНОМУ дрейфу (FAST-пара
470d380/9337c7e: canary +14.4%, отношения <= +-1%) но НЕ иммунно к
МИКРОАРХИТЕКТУРНОМУ (крейт-медианы движутся в ОБЕ стороны: foxsearch
+41..+47% при foxurl/foxjson -6..-29%). Асимметрия: регресс гонит
отношения своего крейта только ВВЕРХ; дрейф — в обе стороны. Поэтому
при широком разбросе абс. дельт (старый вердикт ДРЕЙФ) пара уточняется:
  - есть крейт с медианой <= SUPPRESSED (относительно УСКОРЕН — кодом
    не бывает) => ДРЕЙФ;
  - все крейты >= SUPPRESSED и top >= ELEVATED => РЕГРЕСС, замаскированный
    разбросом (локализованный, отношения указывают крейт);
  - иначе => ДРЕЙФ (повторный прогон).
Калибровка (8 тихих пар, 24 крейт-медианы): max +4.3% / min -1.5% /
span <= 4.8 п.п.; дрейф-пары (6): min <= -6.4%, span >= 40 п.п.

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

# пороги слоя отношений (калибровка итерации 32, см. шапку)
RATIO_ELEVATED = 8.0     # крейт-медиана >= +8% — крейт подозрительно замедлен
RATIO_SUPPRESSED = -5.0  # <= -5% — крейт относительно УСКОРЕН (регрессом не бывает)
MICRO_NS = 200           # итерация 34: микробенчи <200 нс стоят впритык к порогу
                         # (тихий max 20.9% на FAST-парах; см. итерацию 33)

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


def crate_ratio_deltas(prev_vals, last_vals):
    """Медианные дельты отношений fox/эталон по крейтам (foxjson/foxurl/foxsearch).

    Отношение считается только с fox-стороны (партнёр через std_partner).
    Возврат: {крейт: медианная дельта, %}. Иммунно к скоростному дрейфу,
    НЕ иммунно к микроархитектурному (см. шапку модуля).
    """
    import statistics
    ratios = []
    for name, v in last_vals.items():
        partner = std_partner(name)
        pv_p = prev_vals.get(partner) if partner else None
        pv = prev_vals.get(name)
        if not (partner and pv_p and pv and v and name in prev_vals):
            continue
        ratios.append((name.split("/")[1],
                       (v / pv) / (last_vals[partner] / pv_p)))
    out = {}
    for crate in sorted({c for c, _ in ratios}):
        ds = [(r - 1.0) * 100.0 for c, r in ratios if c == crate]
        if ds:
            out[crate] = statistics.median(ds)
    return out


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

    Итерация 32: при широком разбросе вердикт уточняется ОТНОШЕНИЯМИ
    fox/эталон (крейт-медианы; см. шапку модуля). Регресс гонит отношения
    своего крейта только вверх; дрейф — в обе стороны. Широкий разброс +
    крейт >= +8% при отсутствии крейтов <= -5% => РЕГРЕСС, замаскированный
    разбросом. Ограничение: регресс ПОД микроарх. дрейфом (крейты в обе
    стороны) одним сравнением не разрешается — только повторный прогон.

    Итерация 34: одиночный флаг МИКРОБЕНЧА (<200 нс) при тихом крейт-медиане
    — известный шумовой паттерн (serialize/foxurl/6 +20.9% [FAST],
    serialize/foxurl/2 +44.8% [CLASSIC] — обе пары идентичного кода);
    помечается ПРИМЕТКОЙ в выводе, exit-код не меняется. Партнёрские
    (std) бенчи между одноклассными прогонами шумят сильнее fox-бенчей
    (до ~28% при парном canary 0.3%) — только крейт-медианы устойчивы.
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
    rmed = crate_ratio_deltas(prev["vals"], last["vals"])
    if rmed:
        print("  отношения fox/эталон (крейт-медианы): "
              + " | ".join(f"{c} {v:+.1f}%" for c, v in sorted(rmed.items())))
    if not regressions:
        note = " (внимание: заметный дрейф скорости — сравнение грубое)" \
               if (cdelta is not None and abs(cdelta) > 3) or spread > 20 else ""
        print(f"  ПАРИТЕТ: ни один бенч не превышает +{threshold_pct}% "
              f"от одноклассного предшественника.{note}")
        return 0
    regressions.sort(reverse=True)
    for delta, name, pv, v in regressions[:15]:
        print(f"  ФЛАГ +{delta:.1f}%  {name}: {pv:.0f} -> {v:.0f}")
    # Итерация 34: второй случай шумового флага микробенча на паре
    # идентичного кода (serialize/foxurl/6 +20.9% [FAST, итерация 32];
    # serialize/foxurl/2 +44.8% [CLASSIC, 9a8d319 vs 5806b33] — все флаги
    # микробенчи <200 нс при тихом крейт-медиане. Одиночный флаг микробенча
    # одним сравнением неразрешим — помечаем в выводе, exit-код не меняем
    # (решение сессии 29, план итерации 34, п.3).
    if all(v < MICRO_NS for _, _, _, v in regressions):
        crates = {n.split("/")[1] for _, n, _, _ in regressions}
        if all(abs(rmed.get(c, 0.0)) < RATIO_ELEVATED for c in crates):
            print(f"  ПРИМЕТКА (итерация 34): все флаги — микробенчи <{MICRO_NS} нс "
                  f"при тихом крейт-медиане отношений — известный шумовой "
                  f"паттерн (на парах идентичного кода бывали serialize/foxurl/6 "
                  f"+20.9% [FAST] и serialize/foxurl/2 +44.8% [CLASSIC]). "
                  f"Повторный прогон решает; exit-код не меняется.")
    top_crate = max(rmed, key=rmed.get) if rmed else None
    if spread > 20.0:
        suppressed = [c for c, v in rmed.items() if v <= RATIO_SUPPRESSED]
        elevated = top_crate is not None and rmed[top_crate] >= RATIO_ELEVATED
        span = (max(rmed.values()) - min(rmed.values())) if rmed else 0.0
        if suppressed:
            print(f"\n  ИТОГ: ДРЕЙФ СРЕДЫ — разброс дельт {spread:.1f} п.п. широкий, "
                  f"отношения движутся в ОБЕ стороны ("
                  + ", ".join(f"{c} {rmed[c]:+.1f}%" for c in suppressed)
                  + f" — относительно ускорены; span {span:.0f} п.п.) — "
                  f"разные VM/микроархитектуры пула, не код. "
                  f"Для точного вердикта — повторный прогон.")
            return 3
        if elevated:
            print(f"\n  ИТОГ: РЕГРЕСС, замаскированный разбросом — отношения "
                  f"указывают на крейт '{top_crate}' ({rmed[top_crate]:+.1f}%) при "
                  f"тихих остальных (нет крейтов <= {RATIO_SUPPRESSED:.0f}%) — "
                  f"движение одностороннее, кодом объяснимо, средой нет. "
                  f"Разбор {top_crate}.")
            return 1
        print(f"\n  ИТОГ: ДРЕЙФ СРЕДЫ — разброс дельт {spread:.1f} п.п. широкий, "
              f"сдвиг глобальный (разные VM/микроархитектуры пула), а не "
              f"локализованное изменение кода. Флаги — часть общего "
              f"перетасовки. Для точного вердикта — повторный прогон.")
        return 3
    if rmed and top_crate is not None and rmed[top_crate] >= RATIO_ELEVATED:
        print(f"\n  ИТОГ: РЕГРЕСС — {len(regressions)} бенчей(а) выше порога при "
              f"узком распределении (разброс {spread:.1f} п.п.); отношения "
              f"подтверждают крейт '{top_crate}' ({rmed[top_crate]:+.1f}%). "
              f"Разбор кода.")
    elif rmed and top_crate is not None:
        share = len(regressions) / len(deltas)
        if share > 0.5:
            print(f"\n  ИТОГ: РЕГРЕСС — {len(regressions)} бенчей(а) выше порога при "
                  f"узком распределении (разброс {spread:.1f} п.п.); отношения тихие "
                  f"(max {rmed[top_crate]:+.1f}%) — при флагах у ВСЕХ бенчей это "
                  f"похоже на равномерный дрейф скорости; повторный прогон уточнит.")
        else:
            print(f"\n  ИТОГ: РЕГРЕСС — {len(regressions)} бенчей(а) выше порога при "
                  f"узком распределении (разброс {spread:.1f} п.п.); отношения тихие "
                  f"(max {rmed[top_crate]:+.1f}%) — локализованный выброс при тихом "
                  f"крейте; повторный прогон уточнит (для микробенчей — известный "
                  f"шумовой паттерн, см. ПРИМЕТКУ выше).")
    else:
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
