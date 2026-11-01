#!/usr/bin/env python3
"""append_w279_repo.py — однокоммитная форма окна 279: запись окна 279
(v267_worklog_entry.txt) в repo WORKLOG.md И в локальный worklog
(после rebuild_local_279.py). Защита: repo WORKLOG ещё НЕ содержит
'Окно 279', локальный уже содержит 'Окно 278'."""
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")
ENTRY = Path("/home/z/my-project/firefox-rs/scripts/v267_worklog_entry.txt")

text = ENTRY.read_text(encoding="utf-8").rstrip() + "\n"
assert "Окно 279" in text and "итерация 279" in text

repo = REPO.read_text(encoding="utf-8")
assert "Окно 279" not in repo, "repo WORKLOG уже содержит Окно 279"
assert "Окно 278" in repo
REPO.write_text(repo.rstrip() + "\n\n" + text, encoding="utf-8")

local = LOCAL.read_text(encoding="utf-8")
assert "Окно 279" not in local, "локальный worklog уже содержит Окно 279"
assert "Окно 278" in local, "локальный worklog НЕ восстановлен (нет Окна 278)"
LOCAL.write_text(local.rstrip() + "\n\n" + text, encoding="utf-8")
print("OK: запись окна 279 добавлена в repo WORKLOG.md и в локальный worklog")
