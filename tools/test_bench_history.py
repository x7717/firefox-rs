#!/usr/bin/env python3
"""Офлайн-тесты bench_history.py (детерминированные, без сети и gh-pages).

Запуск:  python3 tools/test_bench_history.py   (все ОК -> exit 0)

81 синтетический бенч (близко к реальным 75), чтобы окна p10/p90 вели себя
как в продакшене. Покрывает слой отношений итерации 32:
  1. crate_ratio_deltas — точные медианы на синтетике;
  2. ПАРИТЕТ идентичных прогонов (exit 0);
  3. узкий РЕГРЕСС с подтверждением отношениями (exit 1);
  4. ДРЕЙФ двусторонним движением отношений (exit 3);
  5. РЕГРЕСС, замаскированный широким разбросом (exit 1, новый путь);
  6. нет одноклассной пары (exit 2);
  7. равномерный дрейф скорости: все бенчи во флагах, отношения тихие
     (exit 1 + подсказка про дрейф в выводе).
"""
import contextlib
import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import bench_history as bh  # noqa: E402


def base_vals():
    """81 бенч: 22 пары с эталонами (fox-сторона = крейты) + 37 одиночек."""
    vals = {
        "parse/foxjson/session-5000": 1_000_000,
        "parse/serde_json/session-5000": 5_000_000,
        "parse/foxjson/strs-5000": 300_000,
        "parse/serde_json/strs-5000": 1_500_000,
        "parse/foxjson/nums-5000": 700_000,
        "parse/serde_json/nums-5000": 3_500_000,
        "parse/foxjson/small": 120,
        "parse/serde_json/small": 600,
        "find/foxsearch/mozilla": 180_000,
        "find/std/mozilla": 900_000,
        "find/foxsearch/paths": 180_000,
        "find/std/paths": 900_000,
        "find/foxsearch/absent": 180_000,
        "find/std/absent": 900_000,
        "canonical/foxurl/dirty-all": 900,
        "canonical/url_crate/dirty-all": 2_400,
        "multi/naive-fox/2": 1_300_000,
        "multi/naive-std/2": 6_500_000,
        "multi/naive-fox/4": 870_000,
        "multi/naive-std/4": 2_700_000,
        "multi/naive-fox/8": 2_040_000,
        "multi/naive-std/8": 6_480_000,
        "multi/foxsearch-multi/2": 195_000,
        "multi/foxsearch-multi/4": 510_000,
        "classifier/naive-std/8": 46_000,
        "classifier/naive-std/32": 312_000,
    }
    for i in range(14):  # микробенчи foxurl/url_crate
        vals[f"parse/foxurl/{i}"] = 500 + i
        vals[f"parse/url_crate/{i}"] = 2_500 + i
    for i in range(30):  # тихие одиночки-наполнители (без эталона)
        vals[f"misc/load-{i:02d}"] = 1_000 + i
    return vals


def run(cid, vals, cls="CLASSIC", canary=1_350_000):
    return {"cid": cid, "msg": cid, "ts": "2026-10-25T00:00", "cls": cls,
            "canary": canary, "vals": vals}


def scaled(vals, factors):
    out = dict(vals)
    for pat, f in factors.items():
        for name in list(out):
            if f"/{pat}/" in name or name.startswith(f"{pat}/"):
                out[name] = out[name] * f
    return out


def verdict_of(meta, threshold=20.0):
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        code = bh.check_regression(meta, threshold)
    return code, buf.getvalue()


def approx(a, b, tol=0.5):
    return abs(a - b) <= tol


def main():
    ok = True

    def check(name, cond, extra=""):
        nonlocal ok
        print(f"  {'OK ' if cond else 'FAIL'}  {name}"
              + (f" — {extra}" if extra and not cond else ""))
        ok = ok and cond

    # 1. crate_ratio_deltas: точные медианы
    prev, last = base_vals(), scaled(base_vals(), {"foxjson": 1.10, "foxsearch": 0.80})
    rmed = bh.crate_ratio_deltas(prev, last)
    check("ratios: foxjson +10%", approx(rmed["foxjson"], 10.0))
    check("ratios: foxsearch -20%", approx(rmed["foxsearch"], -20.0))
    check("ratios: foxurl ~0", approx(rmed["foxurl"], 0.0, 1e-9))

    # 2. ПАРИТЕТ идентичных прогонов
    code, out = verdict_of([run("aaa", base_vals()), run("bbb", base_vals())])
    check("parity -> 0", code == 0)

    # 3. узкий РЕГРЕСС (5/81 флагов < 10% -> p90 в тихой зоне), отношения подтверждают
    code, out = verdict_of([run("aaa", base_vals()),
                            run("bbb", scaled(base_vals(), {"foxjson": 1.25}))])
    check("narrow regress -> 1", code == 1)
    check("narrow: ratio подтверждает foxjson", "подтверждают крейт 'foxjson'" in out)

    # 4. ДРЕЙФ: отношения в обе стороны (вниз 13, вверх 19 -> p10/p90 широкие,
    #    верхняя группа +25% > порога -> флаги есть, как в реальных дрейф-парах)
    drift = scaled(base_vals(), {"foxsearch": 0.78, "multi": 0.78,
                                 "classifier": 0.78, "foxjson": 1.25, "foxurl": 1.25})
    code, out = verdict_of([run("aaa", base_vals()), run("bbb", drift)])
    check("two-sided drift -> 3", code == 3)
    check("drift: упомянут двусторонний сдвиг", "ОБЕ стороны" in out)

    # 5. РЕГРЕСС, замаскированный широким разбросом (новый путь итерации 32):
    #    23 флага/81 -> широкий разброс; отношения односторонние (+35/+30/+25)
    masked = scaled(base_vals(), {"foxjson": 1.35, "foxsearch": 1.30, "foxurl": 1.25})
    code, out = verdict_of([run("aaa", base_vals()), run("bbb", masked)])
    check("masked regress -> 1", code == 1)
    check("masked: указан крейт", "замаскированный разбросом" in out and "foxjson" in out)

    # 6. нет одноклассной пары (последний CLASSIC, предшественник только FAST)
    code, out = verdict_of([run("aaa", base_vals(), cls="FAST", canary=700_000),
                            run("bbb", base_vals(), cls="CLASSIC", canary=1_350_000)])
    check("no same-class pair -> 2", code == 2)

    # 7. равномерный дрейф скорости: ВСЕ бенчи во флагах, разброс узкий,
    #    отношения тихие -> РЕГРЕСС + подсказка про равномерный дрейф
    uniform = {k: v * 1.25 for k, v in base_vals().items()}
    code, out = verdict_of([run("aaa", base_vals()), run("bbb", uniform)])
    check("uniform speed drift -> 1", code == 1)
    check("uniform: подсказка про дрейф", "равномерный дрейф скорости" in out)

    print(f"\nитог: {'ВСЕ ТЕСТЫ ОК' if ok else 'ЕСТЬ ПРОВАЛЫ'}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
