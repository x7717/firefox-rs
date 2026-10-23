#!/usr/bin/env bash
# Механическая поддержка репозитория (для системного cron).
# НЕ заменяет агента: только git sync, тесты и heartbeat-лог.
set -uo pipefail

REPO=/home/z/firefox-rs
LOG=$REPO/tools/heartbeat.log

cd "$REPO" || exit 1

echo "$(date -u '+%F %T') auto-continue: start" >> "$LOG"

# Синхронизация с GitHub
git pull --ff-only origin main >> "$LOG" 2>&1 || echo "$(date -u '+%F %T') git pull failed" >> "$LOG"

# Тесты (если есть cargo)
if command -v cargo >/dev/null 2>&1; then
  if cargo test --workspace >> "$LOG" 2>&1; then
    echo "$(date -u '+%F %T') cargo test: OK" >> "$LOG"
  else
    echo "$(date -u '+%F %T') cargo test: FAIL" >> "$LOG"
  fi
else
  echo "$(date -u '+%F %T') cargo not available" >> "$LOG"
fi

echo "$(date -u '+%F %T') auto-continue: done" >> "$LOG"
