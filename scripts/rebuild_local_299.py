#!/usr/bin/env python3
"""rebuild_local_299.py — плановый аппенд записи окна 299 в локальный
worklog (урок 290: rebuild-скрипты читают LOCAL и аппендят, ПЕРЕЗАПИСЬ
ЗАПРЕЩЕНА; коммит хвоста локального worklog в my-project git-репо ПОСЛЕ
окна). ОКНО 299 БЕЗ ВОССТАНОВИТЕЛЬНОЙ ЧАСТИ ФАЙЛА: СНАПШОТ-ОТКАТ #92
ударил /home/z/firefox-rs (по-прежнему отсутствует; симлинк заблокирован
средой — окно 209) и my-project git-репо (на бэкапе 732adc6, коммиты
уроков 290 окон 297/298 потеряны — bb0b4d8 невалиден), НО файл локального
worklog уцелел ВТОРОЙ раз подряд: 10019 строк (базис + конденсаты +
полные 280-298 + план 299). Скрипт: assert базиса 10019 с записью 298 и
планом 299, extract записи 299 из repo WORKLOG.md (заголовок
'## 2026-11-02, Окно 299 ' до конца файла), АППЕНД к LOCAL. Пути: REPO =
/home/z/my-project/firefox-rs/WORKLOG.md (прямой каталог), фолбэк
/home/z/firefox-rs/WORKLOG.md."""
import re
from pathlib import Path
import sys

CAND = [Path("/home/z/my-project/firefox-rs/WORKLOG.md"),
        Path("/home/z/firefox-rs/WORKLOG.md")]
repo = next((p for p in CAND if p.exists()), None)
if repo is None:
    sys.exit("repo WORKLOG.md не найден ни по одному пути")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = repo.read_text(encoding="utf-8")
lines = raw.splitlines()
start = next((i for i, ln in enumerate(lines)
              if re.match(r"^## 2026-11-02, Окно 299 ", ln)), None)
assert start is not None, "нет заголовка окна 299 в repo WORKLOG.md"
entry = "\n".join(lines[start:]).rstrip() + "\n"
assert "Окно 300 (план)" in entry, "запись 299 без плана 300"
assert "287-й вердикт" in entry, "запись 299 без вердикта"

local_raw = LOCAL.read_text(encoding="utf-8")
n_local = len(local_raw.splitlines())
assert n_local == 10019, f"локальный базис {n_local} != 10019 строк"
assert "## 2026-11-02, Окно 298 " in local_raw, "нет записи 298 в LOCAL"
assert "Окно 299 (план)" in local_raw, "нет плана 299 в LOCAL"
hdrs = re.findall(r"^## .*Окно (\d+) ", local_raw, re.M)
assert "299" not in hdrs, "запись 299 уже в LOCAL — повторный аппенд запрещён"

LOCAL.write_text(local_raw.rstrip() + "\n" + entry, encoding="utf-8")
new_n = len(LOCAL.read_text(encoding="utf-8").splitlines())
print(f"УРОК 290 исполнен окном 299: аппенд {len(entry.splitlines())} строк "
      f"-> локальный worklog {n_local} -> {new_n} строк (запись 299)")
