#!/usr/bin/env bash
# w273_ci_check.sh — CI + Benchmark status for push 809fea1 (window 272) + latest runs
# УРОК W273: token НЕ хардкодить (GitHub push protection) — читать из env GH_TOKEN.
set -u
: "${GH_TOKEN:?set GH_TOKEN env var (token НЕ коммитится в репо)}"
API="https://api.github.com/repos/x7717/firefox-rs/actions/runs?per_page=12"
curl -sS -H "Authorization: token $GH_TOKEN" "$API" -o /tmp/ci_runs.json
python3 - <<'EOF'
import json
d = json.load(open('/tmp/ci_runs.json'))
print("total runs:", d.get('total_count'))
for r in d.get('workflow_runs', [])[:12]:
    print(f"- id={r['id']} name={r['name']!r} head={r['head_sha'][:7]} "
          f"status={r['status']} concl={r['conclusion']} event={r['event']} "
          f"created={r['created_at']}")
EOF