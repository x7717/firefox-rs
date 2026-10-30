#!/usr/bin/env python3
"""rebuild_local_230.py — восстановление хвоста локального worklog (214-229)
condensировано из repo WORKLOG.md (после СНАПШОТ-ОТКАТА #28, эра 213),
затем_APPEND_окно 230 (пре-регистрация будет дописана отдельно)."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()

# заголовки окон 214..228 (окно 229 без "##"-заголовка — добавляется вручную)
idx = []
for i, ln in enumerate(lines):
    m = re.match(r"^## 2026-10-\d+, Окно (\d+) ", ln)
    if m and 214 <= int(m.group(1)) <= 228:
        idx.append((int(m.group(1)), i))
assert len(idx) == 15, f"ожидалось 15 окон 214-228, найдено {len(idx)}"

out = []
out.append("<!-- REBUILD после СНАПШОТ-ОТКАТА #28 (старт 01:30-сессии окна 230):")
out.append("     repo 97e1e53 (-23 коммита, эра окна 213), хвост локального worklog")
out.append("     214-229 потерян; восстановлен condensировано из repo WORKLOG.md")
out.append("     (заголовки окон, ~600 символов каждое; полные записи — в repo). -->")
for wno, i in idx:
    head = lines[i][:600]
    out.append(f"- {head}")
# окно 229 — без "##"-заголовка в repo WORKLOG, конденсат вручную
out.append(
    "- [окно 229, конденсат] итерация 229: 217-й вердикт РЕГРЕСС exit 1 "
    "(eace4a8 #234 vs 49728a4 #233, CLASSIC СМЕЖНАЯ idx 235 vs 234, "
    "разброс 31.2 ШИРОКИЙ; 8 флагов parse/foxurl/1-13; ДИФФЕРЕНЦИАТОР "
    "url_crate ОБРАТНО -4.5..-16.2; КЛЮЧЕВОЕ ОТКРЫТИЕ: ГЕТЕРОГЕННОСТЬ ПУЛА "
    "CLASSIC, дискриминатор v11/canary OLD 5.57-5.77e-05 vs NEW 6.55-7.65e-05 "
    "— РАЗНЫЕ ХОСТЫ пула (раннер-лотерея), вердикт = кросс-профильная пара "
    "OLD/NEW, ОТКАТ КОДА НЕ ТРЕБУЕТСЯ; КОРРЕКЦИЯ КОРИДОРА: CLASSIC 2.2..4.5 "
    "валиден только same-profile; canary #234 vs якорь +1.32% INSIDE — "
    "седьмой нормальный CLASSIC; СЧЁТЧИК foxurl corpus-all: инкремент "
    "1175->1314 +11.83%, счётчик 10 -> 11 С ПРОФ-ОГОВОРКОЙ; реестр 68 "
    "(137-й НЕ материализовался); точек 228 (записей 236); код не тронут — "
    "53-й docs-коммит 177-229; СНАПШОТ-ОТКАТ #27, scripts/ и cron/ пережили "
    "ВОСЬМОЙ; пре-регистрация 7/7, смоук+перезапуск 5/5 байт-идентичны "
    "(REAL_EXIT=1, 734 строки))")
out.append("")

with LOCAL.open("a", encoding="utf-8") as f:
    f.write("\n".join(out))
print(f"OK: appended rebuild 214-229 ({len(idx)} окон) -> {LOCAL}")
