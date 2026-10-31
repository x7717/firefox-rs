#!/usr/bin/env python3
"""rebuild_local_261.py — восстановление хвоста локального worklog после
СНАПШОТ-ОТКАТА #59 (окно 261): конденсаты 214-259 из repo WORKLOG.md +
ПОЛНАЯ запись окна 260 (уже в repo WORKLOG.md; запись 261 появится
однокоммитной формой этого же окна)."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()

idx = []
for i, ln in enumerate(lines):
    m = re.match(r"^## 2026-10-\d+, Окно (\d+) ", ln)
    if m and 214 <= int(m.group(1)) <= 259:
        idx.append((int(m.group(1)), i))
assert len(idx) == 45, f"ожидалось 45 заголовков 214-259 (без 229), найдено {len(idx)}"

start260 = next(i for i, ln in enumerate(lines)
                if re.match(r"^## 2026-10-31, Окно 260 ", ln))
full260 = "\n".join(lines[start260:]).rstrip() + "\n"

out = []
out.append("<!-- REBUILD после СНАПШОТ-ОТКАТА #59 (старт 00:30-сессии окна 261):")
out.append("     repo 97e1e53 (-47 итераций 214-260, эра окна 213), scripts/")
out.append("     репо в эре 213 (v2xx-инструменты восстановлены ff-only из git),")
out.append("     хвост локального worklog 214-260 потерян; восстановлен")
out.append("     конденсатами 214-259 из repo WORKLOG.md (заголовки окон, ~600")
out.append("     символов каждое) + ПОЛНАЯ запись 260 из repo WORKLOG.md. -->")
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
out.append(full260.rstrip())

with LOCAL.open("a", encoding="utf-8") as f:
    f.write("\n" + "\n".join(out) + "\n")

sz = LOCAL.stat().st_size
txt = LOCAL.read_text(encoding="utf-8")
print(f"local worklog: {sz} bytes; полных '##'-записей: "
      f"{len(re.findall(r'^## 2026-10-', txt, re.M))}; хвост:")
print("\n".join(txt.splitlines()[-4:]))
