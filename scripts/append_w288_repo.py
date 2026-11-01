#!/usr/bin/env python3
"""append_w288_repo.py — окно 288: добавление записи окна 288 (из
scripts/v288_worklog_entry.txt) в конец repo WORKLOG.md. ОДНОКОММИТНАЯ
форма (аддендум не создаётся). Стык без пустой строки — как w286->w287."""
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
ENTRY = Path("/home/z/my-project/firefox-rs/scripts/v288_worklog_entry.txt")

raw = REPO.read_text(encoding="utf-8")
entry = ENTRY.read_text(encoding="utf-8")
assert entry.startswith("## 2026-11-02, Окно 288 ("), entry[:60]
assert "## 2026-11-02, Окно 288 (cron" not in raw, \
    "запись окна 288 уже в repo WORKLOG!"

out = raw.rstrip("\n") + "\n" + entry
if not out.endswith("\n"):
    out += "\n"
REPO.write_text(out, encoding="utf-8")

chk = REPO.read_text(encoding="utf-8")
assert "## 2026-11-02, Окно 288 (cron 02:00 +08:00" in chk
print(f"OK: WORKLOG.md {len(raw.splitlines())} -> {len(chk.splitlines())} строк; "
      f"запись окна 288 добавлена в конец")
