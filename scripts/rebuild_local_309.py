#!/usr/bin/env python3
"""rebuild_local_309.py — аппенд записи окна 309 в локальный worklog
(урок 290: rebuild-скрипты читают LOCAL и аппендят, ПЕРЕЗАПИСЬ ЗАПРЕЩЕНА;
коммит хвоста локального worklog в my-project git-репо ПОСЛЕ окна).
ИДЕМПОТЕНТЕН: если записи окна 309 ещё нет — аппендит запись из repo
WORKLOG.md (блок от заголовка '## ..., Окно 309 ' до конца файла); если
уже есть — проверяет байт-равенство хвоста LOCAL vs repo."""
import re
import sys
from pathlib import Path

CAND = [Path("/home/z/firefox-rs/WORKLOG.md"),
        Path("/home/z/my-project/firefox-rs/WORKLOG.md")]


def has_window(p, w):
    try:
        return re.search(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ",
                         p.read_text(encoding="utf-8"), re.M) is not None
    except OSError:
        return False


repo_path = next((p for p in CAND if p.exists() and has_window(p, 309)), None)
if repo_path is None:
    sys.exit("repo WORKLOG.md с записью окна 309 не найден")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = repo_path.read_text(encoding="utf-8")
m = re.search(r"^## \d{4}-\d{2}-\d{2}, Окно 309 .*?(?=^## |\Z)", raw,
              re.M | re.S)
if not m:
    sys.exit("блок окна 309 не найден в repo WORKLOG.md")
blk = m.group(0)

local_raw = LOCAL.read_text(encoding="utf-8")
if re.search(r"^## \d{4}-\d{2}-\d{2}, Окно 309 ", local_raw, re.M):
    # уже есть — байт-проверка
    m2 = re.search(r"^## \d{4}-\d{2}-\d{2}, Окно 309 .*?(?=^## |\Z)",
                   local_raw, re.M | re.S)
    lt = m2.group(0) if m2 else ""
    rt = re.search(r"^## \d{4}-\d{2}-\d{2}, Окно 309 .*?(?=^## |\Z)",
                   raw, re.M | re.S).group(0)
    assert lt == rt, "хвост LOCAL (309) НЕ байт-равен repo WORKLOG.md"
    print("УРОК 290: запись окна 309 УЖЕ в LOCAL — байт-равенство ОК")
    sys.exit(0)

n_before = local_raw.count("\n")
LOCAL.write_text(local_raw.rstrip() + "\n" + blk, encoding="utf-8")
n_after = LOCAL.read_text(encoding="utf-8").count("\n")
print(f"УРОК 290 исполнен окном 309: аппенд {blk.count(chr(10))} строк "
      f"(запись окна 309) -> локальный worklog {n_before} -> {n_after} "
      f"строк")
