#!/usr/bin/env python3
"""rebuild_local_307.py — плановое восстановление записи окна 307 в
локальном worklog (урок 290: rebuild-скрипты читают LOCAL и аппендят,
ПЕРЕЗАПИСЬ ЗАПРЕЩЕНА; коммит хвоста локального worklog в my-project
git-репо ПОСЛЕ окна). ИДЕМПОТЕНТЕН: если записи 297-307 ещё нет —
аппендит недостающий хвост из repo WORKLOG.md (от ПЕРВОГО отсутствующего
заголовка '## ..., Окно NNN ' до конца файла); если уже есть — проверяет
байт-равенство хвоста LOCAL vs repo. История исполнения: окно 307
запустило rebuild_local_306.py ПОСЛЕ аппенда записи 307 в repo WORKLOG —
экстракция 'от Окно 297 до EOF' уже включила запись 307, поэтому LOCAL
получил 297-307 одним блоком (9537 строк), и скрипт работает в режиме
ПРОВЕРКИ. Пути: REPO = /home/z/my-project/firefox-rs/WORKLOG.md (прямой
каталог), фолбэк /home/z/firefox-rs/WORKLOG.md."""
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
starts = {}
for w in range(297, 308):
    i = next((k for k, ln in enumerate(lines)
              if re.match(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ", ln)), None)
    starts[w] = i
assert all(v is not None for v in starts.values()), \
    f"не все записи 297-307 в repo: {starts}"
entry297 = "\n".join(lines[starts[297]:]).rstrip() + "\n"
assert "294-й вердикт" in entry297, "блок 297-307 без вердикта 306"
assert "295-й вердикт" in entry297, "блок 297-307 без вердикта 307"
assert "точка #326" in entry297.replace("\n", " "), "блок без плана окна 308"

local_raw = LOCAL.read_text(encoding="utf-8")
n_local = len(local_raw.splitlines())

have307 = re.search(r"^## \d{4}-\d{2}-\d{2}, Окно 307 ", local_raw, re.M)
if have307:
    # режим ПРОВЕРКИ: хвост LOCAL (от заголовка 307) байт-равен repo
    i = local_raw.find(local_raw[have307.start():].splitlines()[0])
    lt = local_raw[i:].rstrip() + "\n"
    j = raw.find(lines[starts[307]])
    rt = raw[j:].rstrip() + "\n"
    assert lt == rt, "хвост LOCAL (307) НЕ байт-равен repo WORKLOG.md"
    print(f"УРОК 290 окно 307: LOCAL уже содержит записи 297-307 "
          f"({n_local} строк), хвост байт-равен repo — режим ПРОВЕРКИ OK")
else:
    # режим АППЕНДА: добавить недостающий хвост (от первой отсутствующей)
    missing = [w for w in range(297, 308)
               if not re.search(rf"^## \d{{4}}-\d{{2}}-\d{{2}}, Окно {w} ",
                                local_raw, re.M)]
    assert missing, "нет отсутствующих записей, но и нет 307 — противоречие"
    first = missing[0]
    block = "\n".join(lines[starts[first]:]).rstrip() + "\n"
    LOCAL.write_text(local_raw.rstrip() + "\n" + block, encoding="utf-8")
    new_n = len(LOCAL.read_text(encoding="utf-8").splitlines())
    print(f"УРОК 290 исполнен окном 307: аппенд {len(block.splitlines())} "
          f"строк (записи {first}-307) -> локальный worklog {n_local} -> "
          f"{new_n} строк")
