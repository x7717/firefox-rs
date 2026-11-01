#!/usr/bin/env python3
"""append_w283_repo.py — однокоммитная форма окна 283: запись окна 283
(v271_worklog_entry.txt) в repo WORKLOG.md И в локальный worklog (после
rebuild_local_283.py). Защита: repo WORKLOG ещё НЕ содержит 'Окно 283',
локальный уже содержит 'Окно 282' (через rebuild)."""
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")
ENTRY = Path("/home/z/my-project/firefox-rs/scripts/v271_worklog_entry.txt")

text = ENTRY.read_text(encoding="utf-8").rstrip() + "\n"
assert "Окно 283" in text and "итерация 283" in text

repo = REPO.read_text(encoding="utf-8")
assert "## 2026-11-01, Окно 283 (cron" not in repo, \
    "repo WORKLOG уже содержит запись Окна 283"
assert "## 2026-11-01, Окно 282 (cron" in repo
REPO.write_text(repo.rstrip() + "\n\n" + text, encoding="utf-8")

local = LOCAL.read_text(encoding="utf-8")
assert "## 2026-11-01, Окно 283 (cron" not in local, \
    "локальный worklog уже содержит запись Окна 283"
assert "## 2026-11-01, Окно 282 (cron" in local, \
    "локальный worklog НЕ восстановлен (нет записи Окна 282)"
LOCAL.write_text(local.rstrip() + "\n\n" + text, encoding="utf-8")
print("OK: запись окна 283 добавлена в repo WORKLOG.md и в локальный worklog")
