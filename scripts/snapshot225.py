#!/usr/bin/env python3
"""Window 227: data225.js snapshot + structure verification (CDN==GIT byte check done separately)."""
import re, json, hashlib, sys

path = sys.argv[1] if len(sys.argv) > 1 else 'scripts/data225.js'
raw = open(path).read()
m = re.search(r"window\.BENCHMARK_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.S)
if not m:
    print('PARSE FAIL: no window.BENCHMARK_DATA found'); sys.exit(2)
d = json.loads(m.group(1))
entries = d['entries']['Rust Benchmark']
print('entries:', len(entries))
print('sha256:', hashlib.sha256(open(path, 'rb').read()).hexdigest())
for e in entries[-5:]:
    canary = [b['value'] for b in e['benches'] if b['name'] == 'parse/foxjson/session-5000'][0]
    print(e['commit']['id'][:7], e['date'], 'canary', canary)
