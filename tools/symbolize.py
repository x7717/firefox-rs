#!/usr/bin/env python3
"""Символизация сырого профиля tools/sampler.rs (адреса RIP) через nm.

Смещения: RIP из сигнального хендлера — ВИРТУАЛЬНЫЙ адрес работающего
бинарника. Для не-PIE совпадает с файловым; для PIE нужно вычесть базу.
На Linux _start обычно в 0x40... для не-PIE; PIE-бинарники грузятся у
0x55.... Мы берём nm --numeric-sort и ищем ближайший символ НИЖЕ адреса,
предварительно при желании вычтя базу загрузки (env BASE=0x...).

Использование:
  python3 tools/symbolize.py <binary> <raw.prof> [--top 25]
"""
import subprocess
import sys
from bisect import bisect_right


def load_symbols(binary: str):
    out = subprocess.run(
        ["nm", "-C", "--defined-only", "--numeric-sort", binary],
        capture_output=True, text=True, check=True,
    ).stdout
    addrs, names = [], []
    for line in out.splitlines():
        parts = line.split(" ", 2)
        if len(parts) < 3 or parts[1] not in ("t", "T"):
            continue
        try:
            a = int(parts[0], 16)
        except ValueError:
            continue
        addrs.append(a)
        names.append(parts[2])
    return addrs, names


def main():
    binary, raw = sys.argv[1], sys.argv[2]
    top_n = 25
    if "--top" in sys.argv:
        top_n = int(sys.argv[sys.argv.index("--top") + 1])
    base = 0
    if "BASE" in __import__("os").environ:
        base = int(__import__("os").environ["BASE"], 0)

    addrs, names = load_symbols(binary)
    if not addrs:
        print("нет текстовых символов — собрано без symtab?", file=sys.stderr)
        sys.exit(1)

    counts = {}
    total = 0
    with open(raw) as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            ip = int(line, 16) - base
            i = bisect_right(addrs, ip) - 1
            if i < 0:
                continue
            # эвристика отсечения ошибочных привязок к далёким символам
            if i + 1 < len(addrs) and addrs[i + 1] - addrs[i] > 1 << 20:
                continue
            counts[names[i]] = counts.get(names[i], 0) + 1
            total += 1

    if total == 0:
        print("0 сэмплов — профайлер не сработал (проверить ITIMER/сигналы)",
              file=sys.stderr)
        sys.exit(1)

    print(f"сэмплов: {total}")
    print(f"{'%':>6}  {'cum%':>6}  функция")
    cum = 0.0
    for name, c in sorted(counts.items(), key=lambda kv: -kv[1])[:top_n]:
        pct = 100.0 * c / total
        cum += pct
        print(f"{pct:6.2f}  {cum:6.2f}  {name}")


if __name__ == "__main__":
    main()
