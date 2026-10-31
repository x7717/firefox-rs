#!/usr/bin/env python3
"""rebuild_local_249.py — восстановление хвоста локального worklog (214-248)
condensировано из repo WORKLOG.md (после СНАПШОТ-ОТКАТА #47, эра окна 213),
затем APPEND окно 249 (пре-регистрация дописывается отдельно)."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()

idx = []
for i, ln in enumerate(lines):
    m = re.match(r"^## 2026-10-\d+, Окно (\d+) ", ln)
    if m and 214 <= int(m.group(1)) <= 248:
        idx.append((int(m.group(1)), i))
assert len(idx) == 34, f"ожидалось 34 окна 214-248 (без 229), найдено {len(idx)}"

out = []
out.append("<!-- REBUILD после СНАПШОТ-ОТКАТА #47 (старт 17:30-сессии окна 249):")
out.append("     repo 97e1e53 (-49 коммитов, эра окна 213), хвост локального worklog")
out.append("     214-248 потерян; восстановлен condensировано из repo WORKLOG.md")
out.append("     (заголовки окон, ~600 символов каждое; полные записи — в repo")
out.append("     WORKLOG.md). -->")
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
LOCAL.open("a", encoding="utf-8").write("\n".join(out) + "\n")
print(f"OK: appended {len(out)} lines (condensate 214-248) to {LOCAL}")
