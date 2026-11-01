#!/usr/bin/env python3
"""rebuild_local_279.py — восстановление хвоста локального worklog после
СНАПШОТ-ОТКАТА #76 (окно 279, прогноз окна 278 СБЫЛСЯ ТОЧНО: 'при
откате в окне 279 — #76, ПЯТЬДЕСЯТ СЕДЬМОЙ пережитый'): конденсаты
214-275 из repo WORKLOG.md + ПОЛНЫЕ записи 276/277/278 (уже в repo
WORKLOG.md; запись 279 появится однокоммитной формой этого же окна).
Локальный worklog ТОЖЕ откатился к эре 188 (287 '##'-записей,
последняя эры окна 188; окон 276/277/278 нет)."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()

idx = []
for i, ln in enumerate(lines):
    m = re.match(r"^## 2026-1[01]-\d+, Окно (\d+) ", ln)
    if m and 214 <= int(m.group(1)) <= 275:
        idx.append((int(m.group(1)), i))
assert len(idx) == 61, f"ожидалось 61 заголовков 214-275 (без 229), найдено {len(idx)}"
assert idx[-1][0] == 275, f"последний конденсат {idx[-1][0]} != 275"

start276 = next(i for i, ln in enumerate(lines)
                if re.match(r"^## 2026-11-01, Окно 276 ", ln))
full276_278 = "\n".join(lines[start276:]).rstrip() + "\n"
assert "Окно 278" in full276_278 and "Окно 279" not in full276_278

# защита: локальный worklog должен быть в эре 188 (287 '##'-записей)
local_raw = LOCAL.read_text(encoding="utf-8")
n_h = len(re.findall(r"^## ", local_raw, re.M))
assert n_h == 287, f"локальный worklog не в эре 188: {n_h} '##'-записей != 287"
assert "Окно 276" not in local_raw and "Окно 275" not in local_raw

out = []
out.append("<!-- REBUILD после СНАПШОТ-ОТКАТА #76 (старт 17:30-сессии окна 279):")
out.append("     repo в эру окна 213 (97e1e53, итерации 214-278 отсутствовали),")
out.append("     scripts/ репо в эру 213 (v2xx-инструменты восстановлены ff-only")
out.append("     из git, ДВАДЦАТЬ ПЯТЫЙ раз подряд, урок 157), хвост локального")
out.append("     worklog потерян (локальный worklog ТОЖЕ откатился к эре 188,")
out.append("     287 '##'-записей, последняя эры окна 188); восстановлен конденсатами")
out.append("     214-275 из repo WORKLOG.md (заголовки окон, ~600 символов каждое) +")
out.append("     ПОЛНЫЕ записи 276/277/278 из repo WORKLOG.md. -->")
for wno, i in idx:
    head = lines[i][:600]
    out.append(f"- {head}")
# окно 229 — без "##"-заголовка в repo WORKLOG, конденсат вручную (из урока 157)
out.append(
    "- [окно 229, конденсат] итерация 229: 217-й вердикт РЕГРЕСС exit 1 "
    "(eace4a8 #234 vs 49728a4 #233, CLASSIC СМЕЖНАЯ idx 235 vs 234, "
    "разброс 31.2 ШИРОКИЙ; 8 флагов parse/foxurl/1-13; ДИФФЕРЕНЦИАТОР "
    "url_crate ОБРАТНО; КЛЮЧЕВОЕ ОТКРЫТИЕ: ГЕТЕРОГЕННОСТЬ ПУЛА CLASSIC, "
    "дискриминатор v11/canary OLD 5.57-5.77e-05 vs NEW 6.55-7.65e-05 — "
    "РАЗНЫЕ ХОСТЫ пула (раннер-лотерея), вердикт = кросс-профильная пара, "
    "ОТКАТ КОДА НЕ ТРЕБУЕТСЯ; КОРРЕКЦИЯ КОРИДОРА: CLASSIC 2.2..4.5 валиден "
    "только same-profile; СЧЁТЧИК corpus-all +11.83%, счётчик 10 -> 11; "
    "реестр 68 (137-й НЕ); точек 228 (записей 236); откат #27, ВОСЬМОЙ)")
out.append(full276_278.rstrip())

LOCAL.write_text(local_raw.rstrip() + "\n\n" + "\n".join(out) + "\n",
                 encoding="utf-8")
print(f"OK: локальный worklog восстановлен (было {n_h} '##'-записей эры 188); "
      f"добавлены конденсаты 214-275 ({len(idx)} шт + 229 вручную) и "
      f"ПОЛНЫЕ записи 276/277/278 ({len(full276_278.splitlines())} строк).")
