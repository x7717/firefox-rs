#!/usr/bin/env python3
"""rebuild_local_301.py — плановый аппенд записей окон 297-301 в локальный
worklog (урок 290: rebuild-скрипты читают LOCAL и аппендят, ПЕРЕЗАПИСЬ
ЗАПРЕЩЕНА; коммит хвоста локального worklog в my-project git-репо ПОСЛЕ
окна). ВОССТАНОВИТЕЛЬНАЯ ЧАСТЬ: СНАПШОТ-ОТКАТ #94 ударил my-project —
локальный worklog снова в эре 188/213 (7810 строк; записи 297-300
потеряны локально, целы в repo WORKLOG.md; план окна 300 'восстановление
rebuild_local_300.py после окна' не пережил рецикл сессии). Скрипт:
assert базиса 7810 с хвостом эры 213 (Task: Окно 213 / Окно 214 план),
extract записей 297..301 из repo WORKLOG.md (от заголовка
'## ..., Окно 297 ' до конца файла), АППЕНД к LOCAL одним блоком.
Пути: REPO = /home/z/my-project/firefox-rs/WORKLOG.md (прямой каталог),
фолбэк /home/z/firefox-rs/WORKLOG.md."""
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
for w in ("297", "298", "299", "300", "301"):
    assert re.search(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ", entry, re.M), \
        f"нет записи окна {w} в извлечённом блоке"
assert "Окно 302 (план)" in entry, "блок без плана окна 302"
assert "289-й вердикт" in entry, "блок без вердикта 301"

local_raw = LOCAL.read_text(encoding="utf-8")
n_local = len(local_raw.splitlines())
assert n_local == 7810, f"локальный базис {n_local} != 7810 строк"
assert "Task: Окно 213" in local_raw, "нет хвоста эры 213 (Окно 213)"
assert "Окно 214 (план)" in local_raw, "нет плана 214 в LOCAL"
for w in ("297", "298", "299", "300", "301"):
    assert f"Окно {w} " not in local_raw, f"запись {w} уже в LOCAL"

LOCAL.write_text(local_raw.rstrip() + "\n" + entry, encoding="utf-8")
new_n = len(LOCAL.read_text(encoding="utf-8").splitlines())
print(f"УРОК 290 исполнен окном 301: аппенд {len(entry.splitlines())} строк "
      f"(записи 297-301) -> локальный worklog {n_local} -> {new_n} строк")
