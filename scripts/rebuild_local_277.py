#!/usr/bin/env python3
"""rebuild_local_277.py — восстановление хвоста локального worklog после
СНАПШОТ-ОТКАТА #74 (окно 277, план окна 276: ПЯТЬДЕСЯТ ПЯТЫЙ
пережитый): конденсаты 214-273 из repo WORKLOG.md +
ПОЛНЫЕ записи 274/275/276 (уже в repo WORKLOG.md; запись 277 появится
однокоммитной формой этого же окна). Локальный worklog ТОЖЕ откатился
к эре 213 (27 '##'-записей, окон 274/275/276 нет)."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()

idx = []
for i, ln in enumerate(lines):
    m = re.match(r"^## 2026-1[01]-\d+, Окно (\d+) ", ln)
    if m and 214 <= int(m.group(1)) <= 273:
        idx.append((int(m.group(1)), i))
assert len(idx) == 59, f"ожидалось 59 заголовков 214-273 (без 229), найдено {len(idx)}"

start274 = next(i for i, ln in enumerate(lines)
                if re.match(r"^## 2026-11-01, Окно 274 ", ln))
full274_276 = "\n".join(lines[start274:]).rstrip() + "\n"

out = []
out.append("<!-- REBUILD после СНАПШОТ-ОТКАТА #74 (старт 15:30-сессии окна 277):")
out.append("     repo в эру окна 213 (97e1e53, итерации 214-276 отсутствовали),")
out.append("     scripts/ репо в эре 213 (v2xx-инструменты восстановлены ff-only")
out.append("     из git, ДВАДЦАТЬ ТРЕТИЙ раз подряд), хвост локального worklog")
out.append("     214-276 потерян (локальный worklog ТОЖЕ откатился к эре 213,")
out.append("     27 '##'-записей); восстановлен конденсатами 214-273 из repo")
out.append("     WORKLOG.md (заголовки окон, ~600 символов каждое) + ПОЛНЫЕ записи")
out.append("     274/275/276 из repo WORKLOG.md. -->")
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
out.append(full274_276.rstrip())

with LOCAL.open("a", encoding="utf-8") as f:
    f.write("\n" + "\n".join(out) + "\n")

sz = LOCAL.stat().st_size
txt = LOCAL.read_text(encoding="utf-8")
print(f"local worklog: {sz} bytes; полных '##'-записей: "
      f"{len(re.findall(r'^## 2026-1[01]-', txt, re.M))}; хвост:")
print("\n".join(txt.splitlines()[-3:])[:300])
