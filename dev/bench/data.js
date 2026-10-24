window.BENCHMARK_DATA = {
  "lastUpdate": 1792876599454,
  "repoUrl": "https://github.com/x7717/firefox-rs",
  "entries": {
    "Rust Benchmark": [
      {
        "commit": {
          "author": {
            "name": "Z User",
            "email": "z@container"
          },
          "committer": {
            "name": "Z User",
            "email": "z@container"
          },
          "id": "692786f843aa3a1cb33f3acdfb2c3dd96c881ff4",
          "message": "docs: iteration 26 — rollback parity verdict 0.17%, fresh SIGPROF baselines (no new >>15% zones), bench-history root cause\n\n- Benchmark 36db40c raw bench lines: find/foxsearch Mozilla/hot/zzz\n  spread 0.17% < 1% — batch path B rollback fully restored parity;\n  foxsearch-vs-std ratios 0.22-0.44x, all controls in historical ranges.\n- Fresh SIGPROF profiles under config B (4 workloads, 7076 samples):\n  leaders identical to closed zones (foxjson strings/nums, foxurl\n  authority, canonical serialization); parse_raw 16.67% inside its\n  historical 13.6-15.6% noise band; no new >>15% zone outside the\n  closed list — code untouched, profiles recorded as baseline in\n  docs/PROFILING.md.",
          "timestamp": "2026-10-24T20:42:18Z",
          "url": "https://github.com/x7717/firefox-rs/commit/692786f843aa3a1cb33f3acdfb2c3dd96c881ff4"
        },
        "date": 1792876599096,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 513,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132903,
            "range": "± 560",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 677318,
            "range": "± 6718",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1356897,
            "range": "± 12656",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 7539608,
            "range": "± 585137",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786216,
            "range": "± 8106",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4212104,
            "range": "± 68853",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 350655,
            "range": "± 1798",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1780287,
            "range": "± 28957",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8388,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 54600,
            "range": "± 753",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76290,
            "range": "± 768",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18153,
            "range": "± 116",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 252283,
            "range": "± 1068",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 485568,
            "range": "± 6640",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 247191,
            "range": "± 2135",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 415367,
            "range": "± 2490",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1583644,
            "range": "± 27928",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 725701,
            "range": "± 4517",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1072720,
            "range": "± 19038",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3232503,
            "range": "± 14531",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1481319,
            "range": "± 20771",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2478860,
            "range": "± 16858",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7777009,
            "range": "± 17298",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207102,
            "range": "± 942",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 915883,
            "range": "± 2289",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206894,
            "range": "± 2099",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 604158,
            "range": "± 3703",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 320650,
            "range": "± 2992",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 672208,
            "range": "± 5995",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 208136,
            "range": "± 1650",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025669,
            "range": "± 10826",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 309,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 440,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 362,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 350,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 345,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 378,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 241,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 399,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 387,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 398,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 71,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 347,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 402,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 492,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 75,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 368,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1195,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5512,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 127,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 148,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 541,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1425,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5491,
            "range": "± 139",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1175,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3082,
            "range": "± 12",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}