#!/usr/bin/env python3
"""append_w250_full_local.py — восстановление ПОЛНОЙ записи окна 250 в
локальный worklog из repo WORKLOG.md (конденсаты 214-249 уже добавлены
rebuild_local_250.py; окно 250 — полная запись)."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")

raw = REPO.read_text(encoding="utf-8")
lines = raw.splitlines()
start = None
for i, ln in enumerate(lines):
    if re.match(r"^## 2026-10-31, Окно 250 ", ln):
        start = i
        break
assert start is not None, "window 250 heading not found"
# конец записи: строка "- Окно 251 (план): ..." блок тянется до конца файла
entry = "\n".join(lines[start:]) + "\n"
LOCAL.open("a", encoding="utf-8").write("\n" + entry)
print(f"OK: full window 250 record ({len(lines) - start} lines) appended")
