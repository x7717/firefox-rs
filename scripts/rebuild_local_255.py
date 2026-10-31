#!/usr/bin/env python3
"""rebuild_local_255.py — восстановление хвоста локального worklog после
СНАПШОТ-ОТКАТА #53 (окно 255): конденсаты 214-253 из repo WORKLOG.md +
ПОЛНЫЕ записи окон 254 и 255 (обе уже в repo WORKLOG.md)."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()

idx = []
for i, ln in enumerate(lines):
    m = re.match(r"^## 2026-10-\d+, Окно (\d+) ", ln)
    if m and 214 <= int(m.group(1)) <= 253:
        idx.append((int(m.group(1)), i))
assert len(idx) == 39, f"ожидалось 39 заголовков 214-253 (без 229), найдено {len(idx)}"

start254 = next(i for i, ln in enumerate(lines)
                if re.match(r"^## 2026-10-31, Окно 254 ", ln))
start255 = next(i for i, ln in enumerate(lines)
                if re.match(r"^## 2026-10-31, Окно 255 ", ln))
full254 = "\n".join(lines[start254:start255]).rstrip() + "\n"
full255 = "\n".join(lines[start255:]).rstrip() + "\n"

out = []
out.append("<!-- REBUILD после СНАПШОТ-ОТКАТА #53 (старт 21:00-сессии окна 255):")
out.append("     repo 97e1e53 (-41 итерация 214-254, эра окна 213), scripts/ стёрт")
out.append("     ЧЕТВЁРТЫЙ раз подряд (восстановлен ff-only из git), хвост локального")
out.append("     worklog 214-254 потерян; восстановлен конденсатами 214-253 из repo")
out.append("     WORKLOG.md (заголовки окон, ~600 символов каждое) + ПОЛНЫЕ записи")
out.append("     254 и 255 из repo WORKLOG.md. -->")
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
out.append(full254.rstrip())
out.append(full255.rstrip())

with LOCAL.open("a", encoding="utf-8") as f:
    f.write("\n" + "\n".join(out) + "\n")

sz = LOCAL.stat().st_size
txt = LOCAL.read_text(encoding="utf-8")
print(f"local worklog: {sz} bytes; полных '##'-записей: "
      f"{len(re.findall(r'^## 2026-10-', txt, re.M))}; хвост:")
print("\n".join(txt.splitlines()[-4:]))
