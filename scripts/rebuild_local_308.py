#!/usr/bin/env python3
"""rebuild_local_308.py — плановое восстановление записей окон 297-308 в
локальном worklog (урок 290: rebuild-скрипты читают LOCAL и аппендят,
ПЕРЕЗАПИСЬ ЗАПРЕЩЕНА; коммит хвоста локального worklog в my-project
git-репо ПОСЛЕ окна). ИДЕМПОТЕНТЕН: если записи 297-308 ещё нет —
аппендит недостающий хвост из repo WORKLOG.md (от ПЕРВОГО отсутствующего
заголовка '## ..., Окно NNN ' до конца файла); если уже есть — проверяет
байт-равенство хвоста LOCAL vs repo. ОСОБЕННОСТЬ СЕССИИ 22:30: в этом
санбоксе /home/z/my-project/firefox-rs — УСТАРЕВШАЯ копия эры 213
(97e1e53), поэтому выбор REPO по наличию заголовков окон 297 И 308 (НЕ по
порядку путей). Пути: фолбэк /home/z/firefox-rs/WORKLOG.md (свежий clone
сессии). LOCAL = /home/z/my-project/worklog.md (эра 213, 7810 строк;
записи 214-296 локально потеряны — цела в repo WORKLOG.md, форма
восстановления окон 306/307: блок 297-EOF одним аппендом)."""
import re
from pathlib import Path
import sys

CAND = [Path("/home/z/firefox-rs/WORKLOG.md"),
        Path("/home/z/my-project/firefox-rs/WORKLOG.md")]


def has_window(p, w):
    try:
        return re.search(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ",
                         p.read_text(encoding="utf-8"), re.M) is not None
    except OSError:
        return False


repo_path = next((p for p in CAND if p.exists() and has_window(p, 297)
                  and has_window(p, 308)), None)
if repo_path is None:
    sys.exit("repo WORKLOG.md с записями 297 и 308 не найден")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = repo_path.read_text(encoding="utf-8")
lines = raw.splitlines()
starts = {}
for w in range(297, 309):
    i = next((k for k, ln in enumerate(lines)
              if re.match(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ", ln)), None)
    starts[w] = i
assert all(v is not None for v in starts.values()), \
    f"не все записи 297-308 в repo: {starts}"
block = "\n".join(lines[starts[297]:]).rstrip() + "\n"
assert "294-й вердикт" in block, "блок 297-308 без вердикта 306"
assert "295-й вердикт" in block, "блок 297-308 без вердикта 307"
assert "296-й вердикт" in block, "блок 297-308 без вердикта 308"
assert "точка #327" in block.replace("\n", " "), "блок без плана окна 309"

local_raw = LOCAL.read_text(encoding="utf-8")
n_local = len(local_raw.splitlines())

have308 = re.search(r"^## \d{4}-\d{2}-\d{2}, Окно 308 ", local_raw, re.M)
if have308:
    lt = local_raw[local_raw.find(local_raw[have308.start():].splitlines()[0]):].rstrip() + "\n"
    j = raw.find(lines[starts[308]])
    rt = raw[j:].rstrip() + "\n"
    assert lt == rt, "хвост LOCAL (308) НЕ байт-равен repo WORKLOG.md"
    print(f"УРОК 290 окно 308: LOCAL уже содержит записи 297-308 "
          f"({n_local} строк), хвост байт-равен repo — режим ПРОВЕРКИ OK")
else:
    missing = [w for w in range(297, 309)
               if not re.search(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ",
                                local_raw, re.M)]
    assert missing, "нет отсутствующих записей, но и нет 308 — противоречие"
    first = missing[0]
    blk = "\n".join(lines[starts[first]:]).rstrip() + "\n"
    LOCAL.write_text(local_raw.rstrip() + "\n" + blk, encoding="utf-8")
    new_n = len(LOCAL.read_text(encoding="utf-8").splitlines())
    print(f"УРОК 290 исполнен окном 308: аппенд {len(blk.splitlines())} "
          f"строк (записи {first}-308) -> локальный worklog {n_local} -> "
          f"{new_n} строк (пропуск 214-296 остаётся: цел в repo)")
