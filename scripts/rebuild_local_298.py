#!/usr/bin/env python3
"""rebuild_local_298.py — плановый аппенд записи окна 298 в локальный
worklog (урок 290: rebuild-скрипты читают LOCAL и аппендят, ПЕРЕЗАПИСЬ
ЗАПРЕЩЕНА; коммит хвоста локального worklog в my-project git-репо ПОСЛЕ
окна). ОКНО 298 БЕЗ ВОССТАНОВИТЕЛЬНОЙ ЧАСТИ: СНАПШОТ-ОТКАТ #91 ударил
только /home/z/firefox-rs (восстановлен ПРЯМЫМ КЛОНОМ origin до 8869158
ДО всей работы, урок 157), my-project уцелел — локальный worklog 9853
строк (базис 7810 + конденсаты 189-279 + полные 280-297 из rebuild_297
окна 297), my-project git-репо bb0b4d8. Скрипт: assert базиса 9853 с
записью 297 и планом 298, extract записи 298 из repo WORKLOG.md
(заголовок '## 2026-11-02, Окно 298 ' до конца файла), АППЕНД к LOCAL.
Пути: REPO = /home/z/firefox-rs/WORKLOG.md, фолбэк /home/z/my-project/
firefox-rs/WORKLOG.md (прямой каталог, симлинк заблокирован — окно 209)."""
import re
from pathlib import Path
import sys

CAND = [Path("/home/z/firefox-rs/WORKLOG.md"),
        Path("/home/z/my-project/firefox-rs/WORKLOG.md")]
repo = next((p for p in CAND if p.exists()), None)
if repo is None:
    sys.exit("repo WORKLOG.md не найден ни по одному пути")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = repo.read_text(encoding="utf-8")
lines = raw.splitlines()
start = next((i for i, ln in enumerate(lines)
              if re.match(r"^## 2026-11-02, Окно 298 ", ln)), None)
assert start is not None, "нет заголовка окна 298 в repo WORKLOG.md"
entry = "\n".join(lines[start:]).rstrip() + "\n"
assert "Окно 299 (план)" in entry, "запись 298 без плана 299"
assert "286-й вердикт" in entry, "запись 298 без вердикта"

local_raw = LOCAL.read_text(encoding="utf-8")
n_local = len(local_raw.splitlines())
assert n_local == 9853, f"локальный базис {n_local} != 9853 строк"
assert "## 2026-11-02, Окно 297 " in local_raw, "нет записи 297 в LOCAL"
assert "Окно 298 (план)" in local_raw, "нет плана 298 в LOCAL"
hdrs = re.findall(r"^## .*Окно (\d+) ", local_raw, re.M)
assert "298" not in hdrs, "запись 298 уже в LOCAL — повторный аппенд запрещён"

LOCAL.write_text(local_raw.rstrip() + "\n" + entry, encoding="utf-8")
new_n = len(LOCAL.read_text(encoding="utf-8").splitlines())
print(f"УРОК 290 исполнен окном 298: аппенд {len(entry.splitlines())} строк "
      f"-> локальный worklog {n_local} -> {new_n} строк (запись 298)")
