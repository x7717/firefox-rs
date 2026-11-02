#!/usr/bin/env python3
"""rebuild_local_306.py — плановый аппенд записей окон 297-306 в локальный
worklog (урок 290: rebuild-скрипты читают LOCAL и аппендят, ПЕРЕЗАПИСЬ
ЗАПРЕЩЕНА; коммит хвоста локального worklog в my-project git-репо ПОСЛЕ
окна). ВОССТАНОВИТЕЛЬНАЯ ЧАСТЬ: my-project worklog остаётся в эре 188/213
(7810 строк; записи 297-305 потеряны локально — rebuild_local_302.py и
rebuild_local_305.py не пережили рецикл сессии, my-project git-репо на
бэкапе 732adc6 эры 10-29; записи целы в repo WORKLOG.md). Скрипт: assert
базиса 7810 с хвостом эры 213 (Task: Окно 213 / Окно 214 план), extract
записей 297..306 из repo WORKLOG.md (от заголовка '## ..., Окно 297 ' до
конца файла), АППЕНД к LOCAL одним блоком. Пути: REPO =
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
              if re.match(r"^## \d{4}-\d{2}-\d{2}, Окно 297 ", ln)), None)
assert start is not None, "нет заголовка окна 297 в repo WORKLOG.md"
entry = "\n".join(lines[start:]).rstrip() + "\n"
for w in ("297", "298", "299", "300", "301", "302", "303", "304",
          "305", "306"):
    assert re.search(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ", entry, re.M), \
        f"нет записи окна {w} в извлечённом блоке"
assert "Окно 307 (план)" in entry, "блок без плана окна 307"
assert "294-й вердикт" in entry, "блок без вердикта 306"

local_raw = LOCAL.read_text(encoding="utf-8")
n_local = len(local_raw.splitlines())
assert n_local == 7810, f"локальный базис {n_local} != 7810 строк"
assert "Task: Окно 213" in local_raw, "нет хвоста эры 213 (Окно 213)"
assert "Окно 214 (план)" in local_raw, "нет плана 214 в LOCAL"
for w in ("297", "298", "299", "300", "301", "302", "303", "304",
          "305", "306"):
    assert f"Окно {w} " not in local_raw, f"запись {w} уже в LOCAL"

LOCAL.write_text(local_raw.rstrip() + "\n" + entry, encoding="utf-8")
new_n = len(LOCAL.read_text(encoding="utf-8").splitlines())
print(f"УРОК 290 исполнен окном 306: аппенд {len(entry.splitlines())} строк "
      f"(записи 297-306) -> локальный worklog {n_local} -> {new_n} строк")
