#!/usr/bin/env python3
"""rebuild_local_280.py — восстановление хвоста локального worklog после
СНАПШОТ-ОТКАТА #77 (окно 280, прогноз окна 279 СБЫЛСЯ ТОЧНО: 'при
откате в окне 280 — #77, ПЯТЬДЕСЯТ ВОСЬМОЙ пережитый'): конденсаты
214-276 из repo WORKLOG.md + ПОЛНЫЕ записи 277/278/279/280 (все уже в
repo WORKLOG.md — запись 280 появилась однокоммитной формой ef95f29
этого же окна, данные cf857bd). Локальный worklog откатился к эре 213
(хвост = запись окна 213 с планом 'Окно 214')."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()

idx = []
for i, ln in enumerate(lines):
    m = re.match(r"^## 2026-1[01]-\d+, Окно (\d+) ", ln)
    if m and 214 <= int(m.group(1)) <= 276:
        idx.append((int(m.group(1)), i))
assert len(idx) == 62, f"ожидалось 62 заголовков 214-276 (без 229), найдено {len(idx)}"
assert idx[-1][0] == 276, f"последний конденсат {idx[-1][0]} != 276"

start277 = next(i for i, ln in enumerate(lines)
                if re.match(r"^## 2026-11-01, Окно 277 ", ln))
full277_280 = "\n".join(lines[start277:]).rstrip() + "\n"
assert "Окно 278" in full277_280 and "Окно 280" in full277_280

# защита: локальный worklog должен быть в эре 213 (без '##'-заголовков 214+)
local_raw = LOCAL.read_text(encoding="utf-8")
n_h = len(re.findall(r"^## ", local_raw, re.M))
hdrs = re.findall(r"^## .*Окно (\d+) ", local_raw, re.M)
assert not [h for h in hdrs if int(h) >= 214], \
    f"локальный worklog не в эре 213: найдены заголовки {[h for h in hdrs if int(h) >= 214]}"
assert "Окно 213" in local_raw, "эра 213 не опознана"

out = []
out.append("<!-- REBUILD после СНАПШОТ-ОТКАТА #77 (старт 18:30-сессии окна 280):")
out.append("     repo в эру окна 213 (97e1e53, итерации 214-280 отсутствовали),")
out.append("     восстановлен ff-only ДВАДЦАТЬ ШЕСТОЙ раз подряд (урок 157),")
out.append("     cron/ на месте (в git), хвост локального worklog потерян")
out.append("     (локальный worklog ТОЖЕ откатился к эре 213, последняя запись")
out.append("     эры окна 213); восстановлен конденсатами 214-276 из repo")
out.append("     WORKLOG.md (заголовки окон, ~600 символов каждое) + ПОЛНЫЕ")
out.append("     записи 277/278/279/280 из repo WORKLOG.md. -->")
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
out.append(full277_280.rstrip())

LOCAL.write_text(local_raw.rstrip() + "\n\n" + "\n".join(out) + "\n",
                 encoding="utf-8")
print(f"OK: локальный worklog восстановлен (было {n_h} '##'-записей эры 213); "
      f"добавлены конденсаты 214-276 ({len(idx)} шт + 229 вручную) и "
      f"ПОЛНЫЕ записи 277/278/279/280 ({len(full277_280.splitlines())} строк).")
