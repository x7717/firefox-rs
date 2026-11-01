#!/usr/bin/env python3
"""append_w289_repo.py — окно 289: добавление записи окна 289 (из
scripts/v289_worklog_entry.txt) в конец repo WORKLOG.md И локального
зеркала /home/z/my-project/worklog.md (окно БЕЗ СНАПШОТ-ОТКАТА — зеркало
цело от rebuild_local_288.py, хвост = запись окна 288; ОДНОКОММИТНАЯ
форма, аддендум не создаётся). Стык без пустой строки — как w287->w288."""
from pathlib import Path

REPO = Path("/home/z/my-project/firefox-rs/WORKLOG.md")
LOCAL = Path("/home/z/my-project/worklog.md")
ENTRY = Path("/home/z/my-project/firefox-rs/scripts/v289_worklog_entry.txt")

entry = ENTRY.read_text(encoding="utf-8")
HDR = "## 2026-11-02, Окно 289 (cron 02:30 +08:00"
assert entry.startswith(HDR), entry[:60]

raw = REPO.read_text(encoding="utf-8")
assert HDR not in raw, "запись окна 289 уже в repo WORKLOG!"
out = raw.rstrip("\n") + "\n" + entry
if not out.endswith("\n"):
    out += "\n"
REPO.write_text(out, encoding="utf-8")
chk = REPO.read_text(encoding="utf-8")
assert HDR in chk
print(f"OK: repo WORKLOG.md {len(raw.splitlines())} -> "
      f"{len(chk.splitlines())} строк")

lraw = LOCAL.read_text(encoding="utf-8")
assert HDR not in lraw, "запись окна 289 уже в зеркале!"
assert "## 2026-11-02, Окно 288 (cron" in lraw, "в зеркале нет записи 288"
lout = lraw.rstrip("\n") + "\n" + entry
if not lout.endswith("\n"):
    lout += "\n"
LOCAL.write_text(lout, encoding="utf-8")
lchk = LOCAL.read_text(encoding="utf-8")
assert HDR in lchk
print(f"OK: локальное зеркало {len(lraw.splitlines())} -> "
      f"{len(lchk.splitlines())} строк (без отката, прямое добавление)")
