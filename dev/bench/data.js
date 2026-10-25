window.BENCHMARK_DATA = {
  "lastUpdate": 1792927156717,
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
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "9b89cc13092dc28a5172f150aecdfb97ed34ad09",
          "message": "docs: iteration 26 addendum — gh-pages bootstrapped (e1b2942), history writing verified live (a985378); archive/path-b-batch restored on remote",
          "timestamp": "2026-10-24T21:24:41Z",
          "tree_id": "e9f2e2047d7884d589f5e339d1186407ab89d3e4",
          "url": "https://github.com/x7717/firefox-rs/commit/9b89cc13092dc28a5172f150aecdfb97ed34ad09"
        },
        "date": 1792877999929,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 114,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 403,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 105354,
            "range": "± 2186",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 511880,
            "range": "± 18385",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1069795,
            "range": "± 23820",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5058532,
            "range": "± 3036643",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 614695,
            "range": "± 13756",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3206060,
            "range": "± 175504",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 278272,
            "range": "± 4640",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1480779,
            "range": "± 85085",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7276,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38963,
            "range": "± 802",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 49394,
            "range": "± 815",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14820,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 168172,
            "range": "± 2770",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 315819,
            "range": "± 6134",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 196499,
            "range": "± 6032",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 368456,
            "range": "± 8958",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1331142,
            "range": "± 14645",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 515131,
            "range": "± 9300",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 884198,
            "range": "± 18556",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2697554,
            "range": "± 65984",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1155982,
            "range": "± 1334",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2032750,
            "range": "± 3555",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6485296,
            "range": "± 34425",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178760,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 798202,
            "range": "± 1545",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178577,
            "range": "± 306",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538521,
            "range": "± 2059",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259801,
            "range": "± 375",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 591927,
            "range": "± 1721",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178626,
            "range": "± 302",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 813902,
            "range": "± 5190",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 62,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 216,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 85,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 308,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 260,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 72,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 244,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 249,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 71,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 271,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 182,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 276,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 84,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 284,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 80,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 293,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 67,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 255,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 79,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 287,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 61,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 318,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 67,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 252,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 996,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 4031,
            "range": "± 69",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 110,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 391,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1065,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3873,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 822,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2203,
            "range": "± 13",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "470d380db884922303f339c15244c7e022d01e37",
          "message": "ci(bench)+docs: iteration 27 — runner class canary, cross-runner variance quantified (49-76% same-code spread)\n\n- 5 Benchmark runs of code-identical commits (36db40c..9b89cc1) reveal\n  three runner speed classes (FAST/MEDIUM/CLASSIC; canary session-5000\n  720-774K / 1063-1070K / 1357K ns); per-bench cross-runner spread\n  49-76% while within-run identical-workload spread stays 0.10-1.50%.\n- The 150% history alert is class-blind: real +20% regressions are\n  invisible, class flips read as +85%. Protocol: compare same-class\n  runs only; primary regression signal = within-run fox/std ratios.\n- Runner class canary step added to bench.yml (prints class into log\n  and Step Summary; logic verified offline 5/5 on the real logs).\n- Fingerprint table + measurement protocol recorded in PROFILING.md.\n- parse_value_tok (session 46.2%) decomposition: numbers closed, container\n  navigation closed-with-numbers (<=12% headroom, negative balance for\n  compact JSON), bools micro — no new >>15% zone, crate code untouched.\n- Local VM rolled back to iter-6 snapshot before the session; repo\n  restored from remote (9b89cc1), toolchain reinstalled, 69/69 tests green.",
          "timestamp": "2026-10-24T22:08:51Z",
          "tree_id": "5c08a038010ee42d5aac9b89c65e029c848af516",
          "url": "https://github.com/x7717/firefox-rs/commit/470d380db884922303f339c15244c7e022d01e37"
        },
        "date": 1792880662039,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 317,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 70453,
            "range": "± 719",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 392925,
            "range": "± 2516",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 711824,
            "range": "± 3117",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 3860423,
            "range": "± 10289",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 397441,
            "range": "± 18360",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2368433,
            "range": "± 7192",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 180416,
            "range": "± 482",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1101387,
            "range": "± 24158",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4250,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 26259,
            "range": "± 112",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 28514,
            "range": "± 525",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9140,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 111691,
            "range": "± 271",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 220105,
            "range": "± 1469",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 150324,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 213406,
            "range": "± 4746",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 720073,
            "range": "± 3692",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 379507,
            "range": "± 5314",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 568144,
            "range": "± 3021",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1586442,
            "range": "± 7405",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 838787,
            "range": "± 23353",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1307524,
            "range": "± 3676",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3659188,
            "range": "± 178658",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 110975,
            "range": "± 2961",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 485431,
            "range": "± 4033",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 111289,
            "range": "± 3827",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 321642,
            "range": "± 2312",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 175611,
            "range": "± 522",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 368177,
            "range": "± 4123",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 111126,
            "range": "± 1771",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 429165,
            "range": "± 5995",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 132,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 192,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 165,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 161,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 150,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 164,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 122,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 60,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 167,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 172,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 175,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 154,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 172,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 212,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 159,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 570,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2567,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 18,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 56,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 38,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 245,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 693,
            "range": "± 201",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2516,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 511,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1407,
            "range": "± 146",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "33267d33e40578226dd3c63a5018a9fa0508ccfe",
          "message": "tools+docs: iteration 28 — bench_history.py (class-aware regression verdict), history integrity 75/75, canary live-validated FAST\n\n- tools/bench_history.py: parses gh-pages dev/bench/data.js (stdlib only);\n  overview with self-classification by canary thresholds (synced with\n  bench.yml), focus trend, intra-run fox/reference parity (27 pairs);\n  --check PCT compares newest run vs newest SAME-CLASS predecessor —\n  closes the class-blindness gap of the g-a-b 150% alert (exit 0 parity /\n  1 regression / 2 no same-class pair); --fetch via git show\n- offline-verified on real data (3 runs, one per class) + synthetic\n  (+25% detection exit 1, parity exit 0)\n- history integrity: all 75 data.js values of run 470d380 match the raw\n  split criterion log after ERROR+bench pair rejoining — byte-exact\n- canary live-validated: 'runner class: FAST (canary=711824)'\n- parity across classes: headline ratios stable (session/nums/strs\n  0.16-0.21x, find 0.22-0.26x); micro-benches <100 ns noisy — use corpus-all\n- crate code untouched (all zones closed, no new >>15% areas)",
          "timestamp": "2026-10-24T22:36:15Z",
          "tree_id": "79fb6af181956ff522b921a8544eb89deae1687a",
          "url": "https://github.com/x7717/firefox-rs/commit/33267d33e40578226dd3c63a5018a9fa0508ccfe"
        },
        "date": 1792882341532,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 511,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133083,
            "range": "± 849",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 673082,
            "range": "± 4804",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1355932,
            "range": "± 141976",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6516450,
            "range": "± 46569",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786084,
            "range": "± 8799",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4021735,
            "range": "± 9590",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 349133,
            "range": "± 1029",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1756125,
            "range": "± 21796",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8380,
            "range": "± 157",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55587,
            "range": "± 690",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75684,
            "range": "± 1246",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18093,
            "range": "± 43",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250752,
            "range": "± 2576",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 472145,
            "range": "± 5024",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 248573,
            "range": "± 836",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 419796,
            "range": "± 1026",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1582194,
            "range": "± 12131",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 716214,
            "range": "± 3310",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1058547,
            "range": "± 2559",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3233129,
            "range": "± 8138",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1471867,
            "range": "± 10212",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2482111,
            "range": "± 8699",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7753671,
            "range": "± 25796",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206548,
            "range": "± 517",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 915735,
            "range": "± 1990",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207270,
            "range": "± 3776",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602244,
            "range": "± 1398",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 320233,
            "range": "± 504",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669110,
            "range": "± 1092",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207263,
            "range": "± 562",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025785,
            "range": "± 15432",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 446,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 73,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 364,
            "range": "± 1",
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
            "value": 346,
            "range": "± 1",
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
            "value": 346,
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
            "value": 379,
            "range": "± 2",
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
            "value": 242,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 401,
            "range": "± 1",
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
            "value": 384,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 395,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 348,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 405,
            "range": "± 3",
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
            "value": 490,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 370,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1183,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5508,
            "range": "± 260",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 41,
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
            "value": 29,
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
            "value": 147,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 548,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1409,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5524,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1179,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3124,
            "range": "± 9",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "b4e4b573d61ad145e24f9e7e9418aa5e28480fce",
          "message": "docs: iteration 28 addendum — first live same-class pair 69267f/33267d3 CLASSIC: canary -0.07%, find spread <0.5%, bench_history --check verdict PARITY exit 0",
          "timestamp": "2026-10-24T22:54:52Z",
          "tree_id": "5587f5ca958b028244a0425bde52c0ca712cf7c7",
          "url": "https://github.com/x7717/firefox-rs/commit/b4e4b573d61ad145e24f9e7e9418aa5e28480fce"
        },
        "date": 1792883413271,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 114,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 402,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 105312,
            "range": "± 510",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 502659,
            "range": "± 5323",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1067490,
            "range": "± 13903",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5049233,
            "range": "± 62270",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 610799,
            "range": "± 15010",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3138907,
            "range": "± 28502",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 275230,
            "range": "± 552",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1383126,
            "range": "± 17259",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7036,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38265,
            "range": "± 276",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 46296,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14457,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 166333,
            "range": "± 430",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 312417,
            "range": "± 2067",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 194931,
            "range": "± 896",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 358396,
            "range": "± 423",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1321776,
            "range": "± 860",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 509620,
            "range": "± 1374",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 877395,
            "range": "± 2539",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2698503,
            "range": "± 10309",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1164669,
            "range": "± 616",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2044732,
            "range": "± 5880",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6486052,
            "range": "± 26719",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 179146,
            "range": "± 523",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 798148,
            "range": "± 871",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 179202,
            "range": "± 612",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538652,
            "range": "± 408",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259009,
            "range": "± 448",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 592210,
            "range": "± 453",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 179809,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 815037,
            "range": "± 1018",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 215,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 83,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 308,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 260,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 245,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 241,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 269,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 164,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 268,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 279,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 289,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 251,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 77,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 284,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 314,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 250,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 999,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3912,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 112,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 392,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1074,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3781,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 821,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2120,
            "range": "± 18",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "86ef9611cd17ea5efbd5b86afe5e773894880866",
          "message": "docs: iteration 29 — VM rollback recovery (2nd, ~5min by protocol), --check 20% threshold empirically validated on 150 same-class comparisons (0 false positives, max noise 13.57%)\n\n- intra-class spread over ALL 75 benches on both same-class pairs:\n  CLASSIC 692786f/33267d3 median 0.42% p90 2.76% max 13.57%;\n  MEDIUM 9b89cc1/b4e4b57 median 1.05% p90 3.23% max 9.89%\n- zero benches beyond ±20% threshold on identical code; verdict\n  simulation: 0 false regressions; threshold margin 1.47x\n- micro-benches (<100 ns) are quiet within a class (median 0-1.6%,\n  max 5.6%) — no absolute floor needed in bench_history.py\n- environment restored after 2nd VM rollback of the day (~5 min):\n  reset to origin/main b4e4b57, rustup 1.99.1, 69/69 tests green\n- crate code untouched (zones closed, no new >>15% areas)",
          "timestamp": "2026-10-24T23:33:50Z",
          "tree_id": "6cbfd28009e83205692aa008b2b94036b977f7f8",
          "url": "https://github.com/x7717/firefox-rs/commit/86ef9611cd17ea5efbd5b86afe5e773894880866"
        },
        "date": 1792885795430,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 148,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 509,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133147,
            "range": "± 480",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 671915,
            "range": "± 3504",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1359678,
            "range": "± 22049",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6473067,
            "range": "± 184255",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 785261,
            "range": "± 2449",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4031506,
            "range": "± 20122",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356334,
            "range": "± 5595",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1766397,
            "range": "± 217128",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8455,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 54624,
            "range": "± 830",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76603,
            "range": "± 564",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17993,
            "range": "± 413",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 249927,
            "range": "± 1283",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 467982,
            "range": "± 8713",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 247701,
            "range": "± 1307",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 414129,
            "range": "± 1904",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1581637,
            "range": "± 46601",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 718476,
            "range": "± 4359",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1058339,
            "range": "± 5378",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3284143,
            "range": "± 38017",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1472892,
            "range": "± 4449",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2480052,
            "range": "± 15507",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8107492,
            "range": "± 46451",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207033,
            "range": "± 1506",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 915877,
            "range": "± 9587",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207185,
            "range": "± 1855",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601312,
            "range": "± 2254",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319463,
            "range": "± 1648",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669045,
            "range": "± 3342",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206719,
            "range": "± 395",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1026037,
            "range": "± 2368",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 449,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 361,
            "range": "± 3",
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
            "value": 344,
            "range": "± 0",
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
            "value": 347,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 77,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 377,
            "range": "± 5",
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
            "value": 242,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 394,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 390,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 397,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 70,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 349,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 407,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 507,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 369,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1174,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5667,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 39,
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
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 147,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 571,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1414,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5551,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1213,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3144,
            "range": "± 16",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "9337c7e8ffd037dbd8a62f9f228f569337ef0404",
          "message": "ci(profile)+docs: iteration 30 — runner class canary in profile.yml, cross-run profile variance quantified (user fns ±3pp, system frames ±7pp)\n\n- profile.yml perf job now self-classifies its runner (canary session-5000,\n  thresholds synced with bench.yml; criterion bench runs AFTER perf record\n  so compilation doesn't distort the profile; rejoin of criterion split\n  lines same as bench.yml Normalize; 5/5 offline tests — caught and fixed\n  a rejoin bug where ERROR text was kept instead of prefix only)\n- profile variance study: two CI Profiling runs of identical crate code\n  (2026-10-23, docs-only diff): foxsearch 13 common frames median |d| 0.38pp\n  max 1.11; foxjson 196 frames median 0.22 p90 1.78 BUT tail is system\n  frames ([libc] +7.26, page-fault chain +5.24, realloc chain +4.80 —\n  correlated memory-subsystem noise); user functions parse_value +3.23,\n  parse_string -1.56 own-time\n- protocol tightened: a zone counts as NEW only if it is a user function\n  AND shift >5pp OR confirmed by a second profile; fault/realloc swings\n  are environment noise, not code structure\n- crate code untouched (zones closed, no new >>15% areas)",
          "timestamp": "2026-10-25T01:07:44Z",
          "tree_id": "1f247bce9396816346ee1fd4ca0444ab7ef6e40a",
          "url": "https://github.com/x7717/firefox-rs/commit/9337c7e8ffd037dbd8a62f9f228f569337ef0404"
        },
        "date": 1792891386624,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 89,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 357,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 78502,
            "range": "± 4677",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 446063,
            "range": "± 18071",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 814637,
            "range": "± 18729",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4510315,
            "range": "± 279858",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 456209,
            "range": "± 38208",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2737872,
            "range": "± 78887",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 206176,
            "range": "± 9865",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1248185,
            "range": "± 102166",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4720,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 29948,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 32928,
            "range": "± 601",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10429,
            "range": "± 420",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 128267,
            "range": "± 6884",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 251780,
            "range": "± 4531",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 172931,
            "range": "± 3160",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 243651,
            "range": "± 8378",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 837579,
            "range": "± 11667",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 432615,
            "range": "± 16024",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 651815,
            "range": "± 8917",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1790132,
            "range": "± 23962",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 957457,
            "range": "± 15109",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1481037,
            "range": "± 30267",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 4071591,
            "range": "± 209620",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 123071,
            "range": "± 2112",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 541840,
            "range": "± 9016",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 123916,
            "range": "± 3727",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 355630,
            "range": "± 8116",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 194691,
            "range": "± 4982",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 406021,
            "range": "± 7316",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 120686,
            "range": "± 3523",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 477302,
            "range": "± 7990",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 37,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 145,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 49,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 209,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 42,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 181,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 41,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 170,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 166,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 43,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 182,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 30,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 134,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 185,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 186,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 45,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 191,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 39,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 174,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 188,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 233,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 174,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 631,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2825,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 273,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 760,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2706,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 562,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1552,
            "range": "± 96",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "573f6138a78910e814f69040c76881f83eccf73f",
          "message": "docs: iteration 30 addendum — profile.yml canary live-validated twice in one run (matrix legs on DIFFERENT classes: CLASSIC + FAST), 4th verdict PARITY, intra-FAST canary spread +14.4%",
          "timestamp": "2026-10-25T01:30:57Z",
          "tree_id": "81b1dec68caa19236b6fd862c658d1d6610e7ffc",
          "url": "https://github.com/x7717/firefox-rs/commit/573f6138a78910e814f69040c76881f83eccf73f"
        },
        "date": 1792892818764,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 130,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 550,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 123922,
            "range": "± 870",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 631063,
            "range": "± 1673",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1261716,
            "range": "± 42551",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 7025267,
            "range": "± 161195",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 755750,
            "range": "± 23592",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3961982,
            "range": "± 38074",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 333043,
            "range": "± 4995",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1859169,
            "range": "± 39166",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7300,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 48023,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 78934,
            "range": "± 542",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 16668,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 220149,
            "range": "± 568",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 520437,
            "range": "± 1520",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 385629,
            "range": "± 1852",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 671219,
            "range": "± 2571",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1967474,
            "range": "± 41288",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 829828,
            "range": "± 3488",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1618286,
            "range": "± 6879",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 4031818,
            "range": "± 270783",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1557100,
            "range": "± 12931",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3670622,
            "range": "± 25895",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 9072359,
            "range": "± 123809",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 335469,
            "range": "± 3881",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 1057222,
            "range": "± 2627",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 334591,
            "range": "± 1877",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 684374,
            "range": "± 2231",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 472268,
            "range": "± 851",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 745630,
            "range": "± 4876",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 333526,
            "range": "± 1436",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1072684,
            "range": "± 7364",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 280,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 408,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 334,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 321,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 329,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 341,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 229,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 93,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 372,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 347,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 360,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 325,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 377,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 436,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 333,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 930,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5057,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 108,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 24,
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
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 154,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 538,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1208,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5037,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1058,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2770,
            "range": "± 8",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "2052ec804c35e367ab7795a37e8605e6352cadcd",
          "message": "docs: iteration 31 — FAST class heterogeneous (+11-17% intra-class drift, 20% threshold margin down to 1.19x), three-class spread table complete, classified v0.7 profile baselines (parse_value_tok 42.92% CI, find_byte_avx2 92.08%)\n\n- FAST pair 470d380/9337c7e: ALL 75 benches shifted +11-17% same direction\n  (median 11.11%) vs CLASSIC 0.42% / MEDIUM 1.05% — FAST pool contains\n  sub-classes of speed (711K vs 815K canary on identical code)\n- consequences: for FAST pairs the primary regression signal is intra-run\n  fox/std ratios; a real +15% regression inside FAST is invisible against\n  drift; at >=3 FAST pairs sub-classify or use a separate threshold\n- classified v0.7 CI profile baselines (run 40149413851): foxjson CLASSIC\n  leg parse_value_tok 42.92% own-time (cross-validates local SIGPROF 46.2%\n  session from iteration 26); foxsearch FAST leg find_byte_avx2 92.08%\n- crate code untouched (zones closed, no new >>15% areas)",
          "timestamp": "2026-10-25T01:33:30Z",
          "tree_id": "e7bb9298c37af88fb999f47231f0284f449b8191",
          "url": "https://github.com/x7717/firefox-rs/commit/2052ec804c35e367ab7795a37e8605e6352cadcd"
        },
        "date": 1792892977580,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 512,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133450,
            "range": "± 5495",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 680643,
            "range": "± 7347",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1355115,
            "range": "± 23994",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6608927,
            "range": "± 116610",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786762,
            "range": "± 28306",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3998323,
            "range": "± 28180",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 357293,
            "range": "± 908",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1798397,
            "range": "± 162876",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8486,
            "range": "± 93",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55741,
            "range": "± 467",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76508,
            "range": "± 1158",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18057,
            "range": "± 179",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250092,
            "range": "± 3110",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 473057,
            "range": "± 10616",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 248357,
            "range": "± 1358",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 415610,
            "range": "± 2406",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1581196,
            "range": "± 7243",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 722762,
            "range": "± 3608",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1061201,
            "range": "± 7692",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3237245,
            "range": "± 30672",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1489599,
            "range": "± 3743",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2479754,
            "range": "± 25903",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7770207,
            "range": "± 121206",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206832,
            "range": "± 2999",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914001,
            "range": "± 17823",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206650,
            "range": "± 1072",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601164,
            "range": "± 1658",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319917,
            "range": "± 2367",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668441,
            "range": "± 5624",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206534,
            "range": "± 1112",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025595,
            "range": "± 2411",
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
            "value": 311,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 89,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 446,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 73,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 358,
            "range": "± 0",
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
            "value": 347,
            "range": "± 7",
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
            "value": 343,
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
            "value": 376,
            "range": "± 2",
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
            "value": 242,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 405,
            "range": "± 9",
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
            "value": 389,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 400,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 348,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 76,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 406,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 493,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 371,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1179,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5502,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 128,
            "range": "± 2",
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
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 83,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 143,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 545,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1429,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5533,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1196,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3101,
            "range": "± 15",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "a8ab2dce2ef08f478bdfc0ba6d672866d5eadd4b",
          "message": "tools+docs: iteration 31 addendum — verdict distinguishes DRIFT vs REGRESSION (exit 3 vs 1), CLASSIC pool heterogeneity revised: microarchitectural drift (find/multi -20-23% vs parse/serialize +11%, p10-p90 51pp) on parallel runs 573f613/2052ec8\n\n- first live FIRING verdict: 7 foxurl micro-benches +21-27% on docs-only\n  pair -> analyzed as environment drift, not regression\n- delta distribution is bimodal: pool contains CPUs favoring AVX2 scan\n  vs scalar parsing (canary normalization does NOT cancel this)\n- bench_history.py --check upgraded: p10-p90 spread > 20pp with flags ->\n  DRIFT (exit 3, re-run needed); localized outlier with narrow spread ->\n  REGRESSION (exit 1, canary masking excluded); 4/4 offline tests\n- 9 runs accumulated (CLASSIC x5, MEDIUM x2, FAST x2); intra-class canary\n  spreads: CLASSIC 7.4%, FAST 14.4%, MEDIUM 0.2%",
          "timestamp": "2026-10-25T01:58:49Z",
          "tree_id": "c86b2a44e3307630b910ee94d8bdb66449a3e89c",
          "url": "https://github.com/x7717/firefox-rs/commit/a8ab2dce2ef08f478bdfc0ba6d672866d5eadd4b"
        },
        "date": 1792894442352,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 99,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 481,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 100219,
            "range": "± 5628",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 525122,
            "range": "± 8837",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1026152,
            "range": "± 17442",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5927820,
            "range": "± 51324",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 615115,
            "range": "± 30225",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3348019,
            "range": "± 63981",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 250667,
            "range": "± 2437",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1569612,
            "range": "± 17854",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 5556,
            "range": "± 62",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 44919,
            "range": "± 1542",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 64217,
            "range": "± 463",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 12601,
            "range": "± 211",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 200098,
            "range": "± 2407",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 465441,
            "range": "± 3451",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 322953,
            "range": "± 2364",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 582035,
            "range": "± 6267",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1737301,
            "range": "± 15385",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 633041,
            "range": "± 6712",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1522138,
            "range": "± 5725",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3441599,
            "range": "± 69371",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1148347,
            "range": "± 10355",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3306575,
            "range": "± 10741",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8438941,
            "range": "± 106098",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 287688,
            "range": "± 5164",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 907548,
            "range": "± 13291",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 286255,
            "range": "± 10022",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 569551,
            "range": "± 3182",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 460569,
            "range": "± 5374",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 642253,
            "range": "± 8127",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 278240,
            "range": "± 1153",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1055980,
            "range": "± 6216",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 224,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 64,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 344,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 55,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 289,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 52,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 262,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 269,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 56,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 287,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 180,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 81,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 289,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 63,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 284,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 301,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 48,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 287,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 315,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 339,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 278,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 822,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 4184,
            "range": "± 47",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 22,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 61,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 72,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 111,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 432,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 980,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 4151,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 843,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2280,
            "range": "± 18",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "3007eaa5279744ad541ac42b19e4b46184062a5a",
          "message": "tools+docs: iteration 32 — fox/ref ratio layer in --check verdict (crate medians, sign asymmetry: regression pushes ratios only up, drift both ways; ELEVATED +8 / SUPPRESSED -5 calibrated on 14 identical-code pairs), masked-regression detection (wide spread + one-sided ratios -> exit 1), deterministic offline tests in repo (13/13, 81-bench synthetic)",
          "timestamp": "2026-10-25T02:47:51Z",
          "tree_id": "ef6a2a4c17b953b9b13dda6cc7f16f2a8c2e6e96",
          "url": "https://github.com/x7717/firefox-rs/commit/3007eaa5279744ad541ac42b19e4b46184062a5a"
        },
        "date": 1792897404310,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 84,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 343,
            "range": "± 50",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 76278,
            "range": "± 5381",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 424743,
            "range": "± 25274",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 773088,
            "range": "± 7017",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4113332,
            "range": "± 292308",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 424551,
            "range": "± 3757",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2546329,
            "range": "± 242083",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 197752,
            "range": "± 15551",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1192936,
            "range": "± 31357",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4799,
            "range": "± 378",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 28697,
            "range": "± 543",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 31033,
            "range": "± 759",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10134,
            "range": "± 702",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 120042,
            "range": "± 975",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 232085,
            "range": "± 2856",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 160464,
            "range": "± 11932",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 229194,
            "range": "± 3072",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 779054,
            "range": "± 22785",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 407133,
            "range": "± 19358",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 608395,
            "range": "± 9416",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1688153,
            "range": "± 33831",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 891424,
            "range": "± 5729",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1408168,
            "range": "± 15321",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3936207,
            "range": "± 193144",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 120015,
            "range": "± 3921",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 515223,
            "range": "± 21317",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 117275,
            "range": "± 2775",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 340181,
            "range": "± 7482",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 189432,
            "range": "± 11686",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 399948,
            "range": "± 10228",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 119405,
            "range": "± 2956",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 461323,
            "range": "± 10406",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 35,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 141,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 48,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 206,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 176,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 166,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 43,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 166,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 43,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 178,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 29,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 129,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 67,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 180,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 45,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 184,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 44,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 186,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 40,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 167,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 43,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 185,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 227,
            "range": "± 60",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 40,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 165,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 607,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2690,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 19,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 59,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 81,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 258,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 747,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2656,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 553,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1480,
            "range": "± 39",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "4a3c7e37d450abb7b113d2fbd0f0b11b1db0e11c",
          "message": "docs: iteration 32 addendum — 11th gh-pages point 3007eaa [FAST], 5th verdict PARITY with ratio layer live (canary -5.1%, crate ratios <= +-0.7%), FAST trio complete (3 pairs, all ratios quiet <= +-1.7%), micro-bench false alarm extinguished by ratio layer",
          "timestamp": "2026-10-25T03:09:42Z",
          "tree_id": "faa8061d9503abf65880c3fdce46d97362d47dbd",
          "url": "https://github.com/x7717/firefox-rs/commit/4a3c7e37d450abb7b113d2fbd0f0b11b1db0e11c"
        },
        "date": 1792898750527,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 516,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132673,
            "range": "± 2178",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 670239,
            "range": "± 3573",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1357241,
            "range": "± 50221",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6597302,
            "range": "± 124160",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786744,
            "range": "± 5285",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4035259,
            "range": "± 20925",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 355095,
            "range": "± 971",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1772232,
            "range": "± 13778",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8484,
            "range": "± 168",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 54671,
            "range": "± 612",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 79522,
            "range": "± 2135",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18034,
            "range": "± 260",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 254268,
            "range": "± 1708",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 470848,
            "range": "± 1053",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 248593,
            "range": "± 925",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 416020,
            "range": "± 2800",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1587227,
            "range": "± 5253",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 723178,
            "range": "± 8103",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1063765,
            "range": "± 3103",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3239779,
            "range": "± 15659",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1468651,
            "range": "± 4757",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2499127,
            "range": "± 43840",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7758229,
            "range": "± 38855",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 210822,
            "range": "± 2584",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914464,
            "range": "± 5020",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 209881,
            "range": "± 1989",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602035,
            "range": "± 1534",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 321964,
            "range": "± 4690",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669091,
            "range": "± 3369",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 210322,
            "range": "± 2345",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1026373,
            "range": "± 4264",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 309,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 445,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 360,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 75,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 347,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 73,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 345,
            "range": "± 4",
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
            "value": 377,
            "range": "± 2",
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
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 396,
            "range": "± 3",
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
            "value": 385,
            "range": "± 66",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 397,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 348,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 404,
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
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 367,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1182,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5568,
            "range": "± 416",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 128,
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 84,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 142,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 548,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1416,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5568,
            "range": "± 130",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1184,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3079,
            "range": "± 70",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "5806b333a02d1742750daa932061ad58a9c8c997",
          "message": "docs: iteration 33 — threshold +20% confirmed on 21 identical-code pairs (0.1% false flags, micro-benches <200ns on FAST pairs at threshold: 20.9% quiet max), FAST subclassification REJECTED (ratio layer neutralizes 14.4% canary spread, <= +-1.7% on all 3 pairs), 6th verdict PARITY (cleanest: spread 2.6pp, canary +0.16%)",
          "timestamp": "2026-10-25T03:34:59Z",
          "tree_id": "23db97a994dc6a9a9a7f8e2e9fdc42972b979af9",
          "url": "https://github.com/x7717/firefox-rs/commit/5806b333a02d1742750daa932061ad58a9c8c997"
        },
        "date": 1792900264178,
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
            "value": 508,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133572,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 680691,
            "range": "± 4483",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1366854,
            "range": "± 22103",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6620114,
            "range": "± 93763",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 791984,
            "range": "± 6738",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4046664,
            "range": "± 15693",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 357807,
            "range": "± 800",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1754499,
            "range": "± 38860",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 9526,
            "range": "± 229",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55754,
            "range": "± 94",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 78443,
            "range": "± 1032",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18501,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250176,
            "range": "± 1741",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 473604,
            "range": "± 2698",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 249211,
            "range": "± 6447",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 416020,
            "range": "± 1487",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1595166,
            "range": "± 6566",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 725424,
            "range": "± 4351",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1063100,
            "range": "± 19623",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3325444,
            "range": "± 22712",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1557237,
            "range": "± 4423",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2488762,
            "range": "± 10916",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8239620,
            "range": "± 201323",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207241,
            "range": "± 760",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 938572,
            "range": "± 8662",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206679,
            "range": "± 481",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 617985,
            "range": "± 5970",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 320927,
            "range": "± 728",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 705899,
            "range": "± 11799",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207055,
            "range": "± 718",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1048483,
            "range": "± 5249",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 312,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 90,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 441,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 76,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 365,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 76,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 352,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 75,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 351,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 80,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 382,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 51,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 245,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 105,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 405,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 90,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 386,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 87,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 402,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 70,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 352,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 79,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 405,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 67,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 483,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 74,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 372,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1213,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5618,
            "range": "± 47",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 132,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 29,
            "range": "± 1",
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
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 87,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 151,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 554,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1444,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5623,
            "range": "± 85",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1193,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3087,
            "range": "± 28",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "9a8d31954b4101a0ca8a1c6f0f55d1acdb8da05c",
          "message": "tools: bench-exp.yml — paired server-CPU re-evaluation harness (workflow_dispatch on any ref; artifact-only, no gh-pages writes; experiment+main jobs)",
          "timestamp": "2026-10-25T04:09:01Z",
          "tree_id": "fd22d272561d66160669fdee6b692bd39683bdf6",
          "url": "https://github.com/x7717/firefox-rs/commit/9a8d31954b4101a0ca8a1c6f0f55d1acdb8da05c"
        },
        "date": 1792902317085,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 521,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133554,
            "range": "± 3776",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 676887,
            "range": "± 11553",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1357017,
            "range": "± 26364",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6472788,
            "range": "± 25082",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786835,
            "range": "± 2468",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4026749,
            "range": "± 11265",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356588,
            "range": "± 2440",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1790108,
            "range": "± 27369",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8423,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55686,
            "range": "± 132",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75970,
            "range": "± 725",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17908,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250469,
            "range": "± 1341",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 471440,
            "range": "± 731",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 246311,
            "range": "± 2212",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 412973,
            "range": "± 2663",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1581313,
            "range": "± 4383",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 714275,
            "range": "± 1855",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1056267,
            "range": "± 1292",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3234789,
            "range": "± 23465",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1531252,
            "range": "± 5674",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2474216,
            "range": "± 23438",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7759713,
            "range": "± 13018",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207890,
            "range": "± 856",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 916570,
            "range": "± 1274",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 208317,
            "range": "± 1828",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 603325,
            "range": "± 826",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 321891,
            "range": "± 3739",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 670604,
            "range": "± 1317",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 208155,
            "range": "± 12407",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1027275,
            "range": "± 17458",
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
            "value": 312,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 88,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 449,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 360,
            "range": "± 1",
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
            "value": 351,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 73,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 345,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 78,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 380,
            "range": "± 10",
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
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 399,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 89,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 383,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 400,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 349,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 77,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 439,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 499,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 371,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1184,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5623,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 128,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 42,
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
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 83,
            "range": "± 1",
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
            "value": 545,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1429,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5612,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1201,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3172,
            "range": "± 15",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "c5dc07b66c98036256690fc78a411570dbc3ed09",
          "message": "tools+docs: iteration 34 — ПРИМЕТКА for micro-bench flags in --check (exit codes unchanged, tests 17/17), server-CPU re-evaluation of fused-auth-scan v0.8.1 via bench-exp.yml (stays archived: aggregate corpus-all +13.9% blocks merge while per-URL wins are real 13/14), partner (std) bench cross-host noise up to +28% documented",
          "timestamp": "2026-10-25T04:44:26Z",
          "tree_id": "9a1e2c5c43b1bf608cf482770d6f882a884ac456",
          "url": "https://github.com/x7717/firefox-rs/commit/c5dc07b66c98036256690fc78a411570dbc3ed09"
        },
        "date": 1792904431589,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 512,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133243,
            "range": "± 728",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 678825,
            "range": "± 4117",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1362361,
            "range": "± 119416",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6551649,
            "range": "± 191652",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 787560,
            "range": "± 8715",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4023598,
            "range": "± 20770",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 355565,
            "range": "± 1139",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1763108,
            "range": "± 13425",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8500,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55792,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 77959,
            "range": "± 666",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18137,
            "range": "± 66",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250624,
            "range": "± 519",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 485660,
            "range": "± 6295",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 249243,
            "range": "± 1793",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 416300,
            "range": "± 1437",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1583057,
            "range": "± 2872",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 714529,
            "range": "± 7478",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1065542,
            "range": "± 10243",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3234002,
            "range": "± 4074",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1479154,
            "range": "± 4523",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2479488,
            "range": "± 15232",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7759614,
            "range": "± 12392",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 208682,
            "range": "± 740",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 917787,
            "range": "± 8935",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 210190,
            "range": "± 1438",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602861,
            "range": "± 924",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 323152,
            "range": "± 967",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669983,
            "range": "± 1196",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 208231,
            "range": "± 1054",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1026528,
            "range": "± 4125",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 309,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 86,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 448,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 364,
            "range": "± 1",
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
            "value": 347,
            "range": "± 1",
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
            "value": 346,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 381,
            "range": "± 3",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 103,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 403,
            "range": "± 2",
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
            "value": 397,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 405,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 346,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 78,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 403,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 489,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
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
            "value": 1196,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5733,
            "range": "± 41",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 128,
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
            "value": 146,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 551,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1412,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5683,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1178,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3096,
            "range": "± 18",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "4dc751f3a5b1e8978e3ba7947e54ab200590ee6e",
          "message": "docs: iteration 35 — pool check from existing data: partner noise is rare single-run spikes (median span std 2.5% vs fox 3.3%; serde/session-5000 +16% in 692786f, find/std/search?q +5.4% in 5806b33, foxurl/2 flapper 50% span confirmed), the +28% bench-exp case remains unique, 9th verdict PARITY reconfirmed — crate code untouched",
          "timestamp": "2026-10-25T05:06:56Z",
          "tree_id": "ebcdfb9aab49122710456773877d6ca5afbf6f2c",
          "url": "https://github.com/x7717/firefox-rs/commit/4dc751f3a5b1e8978e3ba7947e54ab200590ee6e"
        },
        "date": 1792905779672,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 147,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 510,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133045,
            "range": "± 493",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 673861,
            "range": "± 20174",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1360650,
            "range": "± 32100",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 7373585,
            "range": "± 303940",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 788310,
            "range": "± 15281",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4045080,
            "range": "± 143900",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 350707,
            "range": "± 7609",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1779837,
            "range": "± 22265",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8385,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55765,
            "range": "± 349",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75482,
            "range": "± 467",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17808,
            "range": "± 132",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250891,
            "range": "± 2312",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 478022,
            "range": "± 6202",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 248506,
            "range": "± 659",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 414695,
            "range": "± 3713",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1584852,
            "range": "± 6292",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 724036,
            "range": "± 3339",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1076909,
            "range": "± 14405",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3274051,
            "range": "± 32988",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1500042,
            "range": "± 32228",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2494715,
            "range": "± 10224",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8139560,
            "range": "± 74341",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 209917,
            "range": "± 2428",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 921260,
            "range": "± 1977",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207824,
            "range": "± 3216",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 603396,
            "range": "± 10187",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 323852,
            "range": "± 7045",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 673481,
            "range": "± 13126",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 208575,
            "range": "± 1396",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1030991,
            "range": "± 3150",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 65,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 309,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 87,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 445,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 367,
            "range": "± 9",
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
            "value": 346,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 73,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 346,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 379,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 242,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 104,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 400,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 90,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 382,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 397,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 346,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 406,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 488,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 74,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 369,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1187,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5528,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 128,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 30,
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
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 146,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 550,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1411,
            "range": "± 64",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5545,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1178,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3102,
            "range": "± 25",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "d21b815be267ae723fb742f01d0ab5b29c5a9724",
          "message": "docs: iteration 36 — 10th verdict PARITY (4dc751f vs c5dc07b docs-only pair: median +0.00%, spread 3.1pp, canary -0.13%, quietest ratio cluster foxjson -0.4 / foxsearch -0.3 / foxurl +1.6), rustup reinstalled (rustc 1.99.1) and deferred local verification done 69/69 + fmt + clippy green matching CI, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T05:35:55Z",
          "tree_id": "b8df386e7fe8674611e2f55e47a1862d5789f36b",
          "url": "https://github.com/x7717/firefox-rs/commit/d21b815be267ae723fb742f01d0ab5b29c5a9724"
        },
        "date": 1792907486259,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 86,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 351,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 77302,
            "range": "± 3828",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 429295,
            "range": "± 3045",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 775565,
            "range": "± 28999",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4971351,
            "range": "± 243491",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 442258,
            "range": "± 13847",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2700084,
            "range": "± 116197",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 204226,
            "range": "± 4256",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1232538,
            "range": "± 11888",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4790,
            "range": "± 64",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 29386,
            "range": "± 319",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 32377,
            "range": "± 748",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10237,
            "range": "± 152",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 119434,
            "range": "± 1390",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 245466,
            "range": "± 2996",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 165295,
            "range": "± 2741",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 234702,
            "range": "± 3215",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 808018,
            "range": "± 16875",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 421370,
            "range": "± 9731",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 619116,
            "range": "± 5185",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1745616,
            "range": "± 117165",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 906924,
            "range": "± 18332",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1404934,
            "range": "± 36692",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3940793,
            "range": "± 96365",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 121529,
            "range": "± 4176",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 525160,
            "range": "± 31082",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 121164,
            "range": "± 3796",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 344785,
            "range": "± 25630",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 190813,
            "range": "± 1977",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 396836,
            "range": "± 7549",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 119386,
            "range": "± 3093",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 465640,
            "range": "± 9218",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 36,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 156,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 216,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 41,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 182,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 172,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 165,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 188,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 131,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 65,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 180,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 188,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 44,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 188,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 38,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 164,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 42,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 194,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 235,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 39,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 177,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 601,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2856,
            "range": "± 47",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 19,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 59,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 83,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 278,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 744,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2791,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 560,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1552,
            "range": "± 58",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "fd13ee5d42f8b9310985e94cf9f004c9aa8343f4",
          "message": "docs: iteration 37 — 11th verdict d21b815 [FAST] vs 3007eaa: REGRESS exit 1 with FIRST-ever partner-side flag (parse/serde_json/session-5000 +20.9%, fox ratios quiet foxjson -0.0 / foxsearch +0.4 / foxurl -5.2 crossed RATIO_SUPPRESSED) — classified as 4th single-run partner spike and 2nd on same bench (flapper candidate 2/17), exit codes untouched per asymmetry principle, partner PRIMETKA deferred until 2nd live-caught case, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T06:04:45Z",
          "tree_id": "737bc1e2b5518595fc93c5d288aa95c484904e61",
          "url": "https://github.com/x7717/firefox-rs/commit/fd13ee5d42f8b9310985e94cf9f004c9aa8343f4"
        },
        "date": 1792909219224,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 86,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 343,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 75343,
            "range": "± 5093",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 425598,
            "range": "± 27648",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 775905,
            "range": "± 23133",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4756395,
            "range": "± 669245",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 433785,
            "range": "± 6117",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2550476,
            "range": "± 185464",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 193003,
            "range": "± 12472",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1179146,
            "range": "± 32822",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 5328,
            "range": "± 166",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 28934,
            "range": "± 1110",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 30492,
            "range": "± 738",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10354,
            "range": "± 205",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 114883,
            "range": "± 7281",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 231785,
            "range": "± 21597",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 160059,
            "range": "± 5567",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 227037,
            "range": "± 7468",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 770483,
            "range": "± 32003",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 412808,
            "range": "± 28032",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 607281,
            "range": "± 20631",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1681604,
            "range": "± 49233",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 907589,
            "range": "± 18663",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1412198,
            "range": "± 67486",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3927975,
            "range": "± 296123",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 120750,
            "range": "± 2437",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 519033,
            "range": "± 7072",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 120125,
            "range": "± 5656",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 348634,
            "range": "± 11030",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 190632,
            "range": "± 5099",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 392657,
            "range": "± 19430",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 118832,
            "range": "± 4588",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 459555,
            "range": "± 19492",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 36,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 140,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 199,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 174,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 164,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 162,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 176,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 29,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 133,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 64,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 177,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 45,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 182,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 188,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 38,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 167,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 44,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 184,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 222,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 40,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 169,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 609,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2727,
            "range": "± 71",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 20,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 41,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 81,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 264,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 750,
            "range": "± 46",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2684,
            "range": "± 65",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 563,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1523,
            "range": "± 122",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "5d764939db2943f30cc95a607c68e8c1bf146d8e",
          "message": "docs: iteration 38 — 12th verdict fd13ee5 [FAST] vs d21b815 [FAST] consecutive-FAST pair (canary +0.04%): PARITY, serde/session-5000 flag did NOT repeat => single-spike hypothesis confirmed (2/18 non-consecutive), 11th verdict closed as partner-noise false alarm, partner PRIMETKA correctly not implemented (2nd live case never came), verdict tally 12 = 11 PARITY + 1 false-alarm REGRESS, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T06:32:04Z",
          "tree_id": "0086625da95c732dbb3f70377568fc96a4320db6",
          "url": "https://github.com/x7717/firefox-rs/commit/5d764939db2943f30cc95a607c68e8c1bf146d8e"
        },
        "date": 1792910851438,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 83,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 349,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 74989,
            "range": "± 1369",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 426705,
            "range": "± 6852",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 770095,
            "range": "± 9066",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4163567,
            "range": "± 127497",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 428951,
            "range": "± 12606",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2566733,
            "range": "± 35566",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 198815,
            "range": "± 9723",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1173507,
            "range": "± 64655",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4586,
            "range": "± 65",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 28557,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 30387,
            "range": "± 1452",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9743,
            "range": "± 88",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 116627,
            "range": "± 1409",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 235895,
            "range": "± 2909",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 161684,
            "range": "± 5454",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 226596,
            "range": "± 3420",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 779583,
            "range": "± 39894",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 418672,
            "range": "± 7914",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 608583,
            "range": "± 16489",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1725227,
            "range": "± 61881",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 886796,
            "range": "± 13595",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1424681,
            "range": "± 22552",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3934458,
            "range": "± 67392",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 118788,
            "range": "± 3097",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 527350,
            "range": "± 9699",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 119287,
            "range": "± 6770",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 348176,
            "range": "± 4712",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 190243,
            "range": "± 1855",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 397674,
            "range": "± 9488",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 139309,
            "range": "± 2013",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 472045,
            "range": "± 11088",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 36,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 145,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 206,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 178,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 164,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 161,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 180,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 128,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 66,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 180,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 185,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 45,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 185,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 39,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 166,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 43,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 184,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 35,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 227,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 39,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 168,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 607,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2716,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 59,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 271,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 741,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2708,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 556,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1504,
            "range": "± 177",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "4742c83cfa27b8611ff178194eb442231df755c5",
          "message": "docs: iteration 39 — 13th verdict 5d76493 [FAST] vs fd13ee5 [FAST]: PARITY (median +0.00%, spread 5.1pp, canary -0.75%, ratios quiet), first-ever CONSECUTIVE FAST trio (all same-code): canary 776/776/770K spread 0.75%, fox span median 2.5% matching CLASSIC 3.3%, zero benches > +20% => FAST heterogeneity (iter 31) is speed-environment-driven (canary drift), not class-intrinsic — retrospective confirmation of iter 33 rejecting FAST subclassification, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T07:03:44Z",
          "tree_id": "e640bc2438d87a8bbf550c036a067bc7903c077e",
          "url": "https://github.com/x7717/firefox-rs/commit/4742c83cfa27b8611ff178194eb442231df755c5"
        },
        "date": 1792912729160,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 84,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 338,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 74560,
            "range": "± 1465",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 413972,
            "range": "± 3290",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 757115,
            "range": "± 13304",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4005863,
            "range": "± 184101",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 419131,
            "range": "± 19959",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2490358,
            "range": "± 144392",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 189196,
            "range": "± 3799",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1153793,
            "range": "± 53279",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4505,
            "range": "± 66",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 27941,
            "range": "± 399",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 30397,
            "range": "± 389",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9623,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 113786,
            "range": "± 2227",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 229152,
            "range": "± 5505",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 158940,
            "range": "± 3624",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 221975,
            "range": "± 2830",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 791649,
            "range": "± 82807",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 400046,
            "range": "± 7747",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 595343,
            "range": "± 12438",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1645568,
            "range": "± 165425",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 893700,
            "range": "± 28074",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1404344,
            "range": "± 29326",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3966219,
            "range": "± 358368",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 117582,
            "range": "± 4326",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 510649,
            "range": "± 9558",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 115540,
            "range": "± 4931",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 331560,
            "range": "± 6644",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 181485,
            "range": "± 2734",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 381799,
            "range": "± 19095",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 118184,
            "range": "± 2953",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 453072,
            "range": "± 14501",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 38,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 138,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 50,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 201,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 172,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 160,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 158,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 47,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 174,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 123,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 69,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 174,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 49,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 181,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 48,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 180,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 44,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 160,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 46,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 182,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 38,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 224,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 166,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 667,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2729,
            "range": "± 152",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 59,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 82,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 272,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 787,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2594,
            "range": "± 93",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 554,
            "range": "± 38",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1473,
            "range": "± 21",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "4110b3f22414989623417b8b8d5305972fd1b52c",
          "message": "docs: iteration 40 — 14th verdict 4742c83 [FAST] vs 5d76493 [FAST] 4th consecutive FAST: PARITY zero abs flags (median -1.43%, spread 11.4pp) with FIRST RATIO_ELEVATED crossing at PARITY (foxurl +10.0%) — decomposed as family-level build-layout/run lottery (parse/foxurl/* all +5..+12% together, url_crate partners -2..-4% faster, serialize exactly 0.0%, identical sources), verdict machine correct: elevated ratio without abs flags keeps PARITY, 4-FAST canary drift 2.5%, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T07:33:22Z",
          "tree_id": "af3460499637f43c76aeab2555b4ca2c6468a8ab",
          "url": "https://github.com/x7717/firefox-rs/commit/4110b3f22414989623417b8b8d5305972fd1b52c"
        },
        "date": 1792914510274,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 86,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 404,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 85817,
            "range": "± 2080",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 432785,
            "range": "± 31891",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 888010,
            "range": "± 24459",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5135198,
            "range": "± 258501",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 533023,
            "range": "± 7382",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2964881,
            "range": "± 171407",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 215059,
            "range": "± 7671",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1267074,
            "range": "± 53098",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4594,
            "range": "± 236",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 37627,
            "range": "± 1561",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 53921,
            "range": "± 763",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10669,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 167914,
            "range": "± 8324",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 372341,
            "range": "± 12695",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 350435,
            "range": "± 2578",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 690364,
            "range": "± 4277",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1466204,
            "range": "± 73044",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 573977,
            "range": "± 7838",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1573634,
            "range": "± 18848",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2894125,
            "range": "± 30342",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1033597,
            "range": "± 28780",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3367263,
            "range": "± 54447",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7166623,
            "range": "± 77826",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 350048,
            "range": "± 4090",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 808189,
            "range": "± 16476",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 350623,
            "range": "± 2513",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 519166,
            "range": "± 6183",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 441526,
            "range": "± 8953",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 608046,
            "range": "± 13245",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 348069,
            "range": "± 2095",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1094608,
            "range": "± 66216",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 192,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 56,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 292,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 45,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 244,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 45,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 233,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 44,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 228,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 46,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 229,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 146,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 240,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 60,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 256,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 52,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 266,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 233,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 49,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 261,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 39,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 286,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 230,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 703,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3652,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 77,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 48,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 57,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 100,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 370,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 904,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3911,
            "range": "± 154",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 754,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1975,
            "range": "± 90",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "06dc3b8f455b90ce08f8f93faa8a6c9ff1d09699",
          "message": "docs: iteration 41 — 15th verdict 4110b3f [FAST] vs 4742c83 [FAST]: FIRST FORMAL ENVIRONMENT DRIFT (exit 3, branch previously synthetic+replay only) — 15 family-wide flags all in find/multi/classifier BOTH sides (fox find/foxsearch +194..+204%, multi/naive-fox +140..+211%; std find +59..+142%, naive-std +76..+85%), spread 138.3pp historic max, canary +17.29% (888010, FAST-record, 1.35% off 900K boundary), co-directed 11x disproportionate slowdown — ratios two-sided foxsearch +70.4 / foxurl -25.7 / foxjson +3.5 quiet => asymmetry discriminator correctly rejected REGRESS, identical sources (docs-only) => code regression impossible, no re-run needed — 3rd live find-selective VM anomaly catalog (573f613 +62%/-7%, a8ab2dc +61%/~0, 4110b3f +198%/+17.3%): parse-based canary systematically blind to find-family drift, P-RIMETKA not applicable (family flags), tally 15 = 13 PARITY + 1 closed false alarm + 1 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T08:08:03Z",
          "tree_id": "b2e43999b697f36a07e66923b441ec6c81da6422",
          "url": "https://github.com/x7717/firefox-rs/commit/06dc3b8f455b90ce08f8f93faa8a6c9ff1d09699"
        },
        "date": 1792916606213,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 114,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 398,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 104985,
            "range": "± 3125",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 505478,
            "range": "± 4412",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1070185,
            "range": "± 12261",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5131917,
            "range": "± 146675",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 611556,
            "range": "± 1345",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3132834,
            "range": "± 130704",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 278872,
            "range": "± 1686",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1380108,
            "range": "± 6893",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7058,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38835,
            "range": "± 156",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 46361,
            "range": "± 196",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14522,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 169034,
            "range": "± 1224",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 311341,
            "range": "± 1647",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 193327,
            "range": "± 2861",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 358274,
            "range": "± 908",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1321432,
            "range": "± 4989",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 507676,
            "range": "± 3243",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 874547,
            "range": "± 1062",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2694254,
            "range": "± 38971",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1169075,
            "range": "± 1257",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2041702,
            "range": "± 10393",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6480558,
            "range": "± 193233",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178594,
            "range": "± 1022",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 797560,
            "range": "± 7689",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178780,
            "range": "± 297",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538114,
            "range": "± 344",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 261210,
            "range": "± 989",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 592058,
            "range": "± 1074",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178597,
            "range": "± 828",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 814340,
            "range": "± 601",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 61,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 213,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 314,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 259,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 72,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 244,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 241,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 263,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 165,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 275,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 282,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 292,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 253,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 79,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 288,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 313,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 248,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 996,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3920,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 107,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 397,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1065,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3830,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 800,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2188,
            "range": "± 5",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "b3125c47ac74111c72324845a7906dfd41c16bb7",
          "message": "docs: iteration 42 — 16th verdict 06dc3b8 [MEDIUM] vs a8ab2dc [MEDIUM] DRIFT exit 3 (2nd consecutive formal drift) but drift IN THE BASELINE: class-aware pairing reached back 12 points over the 5-FAST streak to the last MEDIUM = cataloged drift VM a8ab2dc (iter 31/41), new point provably normal (canary 1070185 exact MEDIUM cluster norm, all ratios typical) — every ratio movement attributable to old point (find abnormally slow 0.32x/0.50x/0.72x, foxurl/foxjson abnormally fast 0.19-0.21x), 12 flags all explained, P-RIMETKA inapplicable twice (5.5us flag + elevated medians), no re-run needed; CORRECTION of iter-41 prediction: exit 2 never fires when a same-class predecessor exists — machine pairs last same-class points, not neighbors; no pool migration (canary 888K did not repeat); tally 16 = 13 PARITY + 1 closed false alarm + 2 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T08:33:40Z",
          "tree_id": "e93af2b1a5003bba2283f41de6931a5cd419031b",
          "url": "https://github.com/x7717/firefox-rs/commit/b3125c47ac74111c72324845a7906dfd41c16bb7"
        },
        "date": 1792918188608,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 144,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 512,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133503,
            "range": "± 3111",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 676086,
            "range": "± 6046",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1358273,
            "range": "± 81130",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 7108867,
            "range": "± 294050",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 788199,
            "range": "± 21827",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4103807,
            "range": "± 30499",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356949,
            "range": "± 1757",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1774205,
            "range": "± 19229",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8472,
            "range": "± 36",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55676,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 77436,
            "range": "± 986",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18065,
            "range": "± 70",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 252475,
            "range": "± 1316",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 473795,
            "range": "± 1971",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 252290,
            "range": "± 4015",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 439062,
            "range": "± 6628",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1609731,
            "range": "± 10520",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 801749,
            "range": "± 21686",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1093339,
            "range": "± 18444",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3275804,
            "range": "± 45983",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1510272,
            "range": "± 28702",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2517265,
            "range": "± 19784",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7765460,
            "range": "± 20550",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 208425,
            "range": "± 1947",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 916175,
            "range": "± 3506",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207779,
            "range": "± 4536",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602650,
            "range": "± 1998",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 320804,
            "range": "± 1516",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 670697,
            "range": "± 4065",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207813,
            "range": "± 774",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1027979,
            "range": "± 2279",
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
            "value": 316,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 88,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 446,
            "range": "± 2",
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
            "value": 354,
            "range": "± 1",
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
            "value": 348,
            "range": "± 2",
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
            "value": 375,
            "range": "± 2",
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
            "value": 242,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 399,
            "range": "± 4",
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
            "value": 391,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 401,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 346,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 76,
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
            "value": 484,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 366,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1188,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5526,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 39,
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
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 145,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 546,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1411,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5500,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1189,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3043,
            "range": "± 39",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "336e9ff5322b7dc2b743a7a6dfdea94e77313981",
          "message": "docs: iteration 43 — 17th verdict b3125c4 [CLASSIC] vs 4dc751f [CLASSIC]: PARITY exit 0 and CLEANEST IN HISTORY — median -0.04%, spread 3.6pp, canary -0.17% (1358273 dead-center CLASSIC cluster), zero flags, ratios foxjson +0.0 / foxsearch -0.1 / foxurl -0.7: FIRST time all three crate ratios inside ±1% (previous best 10th verdict -0.4/-0.3/+1.6) — both anomalous points (drift VM 4110b3f, echo baseline a8ab2dc) out of pairs, environment fully recovered to ~0.5% background precision, iter-42 prediction confirmed; schedule-Benchmark (bench.yml schedule trigger) still running on b3125c4 — first duplicate-commit entry expected in gh-pages, --check date-ordered same-class pairing handles it natively (possible first same-commit pair); tally 17 = 14 PARITY + 1 closed false alarm + 2 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T09:02:11Z",
          "url": "https://github.com/x7717/firefox-rs/commit/336e9ff5322b7dc2b743a7a6dfdea94e77313981"
        },
        "date": 1792919244995,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 101,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 486,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 102418,
            "range": "± 1087",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 533363,
            "range": "± 2817",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1058566,
            "range": "± 30526",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6038893,
            "range": "± 43866",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 638552,
            "range": "± 6744",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3389513,
            "range": "± 17369",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 254758,
            "range": "± 6272",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1610808,
            "range": "± 23836",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 5648,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 45632,
            "range": "± 258",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 64322,
            "range": "± 811",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 12860,
            "range": "± 223",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 210770,
            "range": "± 4216",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 480995,
            "range": "± 10632",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 347736,
            "range": "± 1953",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 637535,
            "range": "± 3113",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1768989,
            "range": "± 16539",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 659195,
            "range": "± 10320",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1691056,
            "range": "± 32420",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3581412,
            "range": "± 55496",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1234444,
            "range": "± 24841",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3773359,
            "range": "± 38295",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8552407,
            "range": "± 72521",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 355914,
            "range": "± 3903",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 950794,
            "range": "± 15485",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 354619,
            "range": "± 15991",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 604317,
            "range": "± 7713",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 486523,
            "range": "± 5309",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 685854,
            "range": "± 15109",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 345340,
            "range": "± 2257",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1120215,
            "range": "± 17675",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 50,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 240,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 68,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 367,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 56,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 302,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 57,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 284,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 56,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 288,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 58,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 300,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 184,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 83,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 290,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 65,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 293,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 61,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 306,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 50,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 292,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 60,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 320,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 51,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 347,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 59,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 297,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 837,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 4259,
            "range": "± 126",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 32,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 92,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 74,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 106,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 441,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1058,
            "range": "± 36",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 4520,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 913,
            "range": "± 32",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2414,
            "range": "± 84",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "336e9ff5322b7dc2b743a7a6dfdea94e77313981",
          "message": "docs: iteration 43 — 17th verdict b3125c4 [CLASSIC] vs 4dc751f [CLASSIC]: PARITY exit 0 and CLEANEST IN HISTORY — median -0.04%, spread 3.6pp, canary -0.17% (1358273 dead-center CLASSIC cluster), zero flags, ratios foxjson +0.0 / foxsearch -0.1 / foxurl -0.7: FIRST time all three crate ratios inside ±1% (previous best 10th verdict -0.4/-0.3/+1.6) — both anomalous points (drift VM 4110b3f, echo baseline a8ab2dc) out of pairs, environment fully recovered to ~0.5% background precision, iter-42 prediction confirmed; schedule-Benchmark (bench.yml schedule trigger) still running on b3125c4 — first duplicate-commit entry expected in gh-pages, --check date-ordered same-class pairing handles it natively (possible first same-commit pair); tally 17 = 14 PARITY + 1 closed false alarm + 2 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T09:02:11Z",
          "tree_id": "f7e9f80ec06044e8b46f829dc9ca121762b3aa75",
          "url": "https://github.com/x7717/firefox-rs/commit/336e9ff5322b7dc2b743a7a6dfdea94e77313981"
        },
        "date": 1792919849127,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 79,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 345,
            "range": "± 43",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 71869,
            "range": "± 3733",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 394711,
            "range": "± 33181",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 741325,
            "range": "± 48677",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 3877756,
            "range": "± 27522",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 401600,
            "range": "± 28148",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2371963,
            "range": "± 136123",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 184025,
            "range": "± 3652",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1110141,
            "range": "± 10277",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4219,
            "range": "± 78",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 26510,
            "range": "± 995",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 29828,
            "range": "± 761",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9180,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 109779,
            "range": "± 878",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 221331,
            "range": "± 2560",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 151076,
            "range": "± 843",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 213038,
            "range": "± 1803",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 729837,
            "range": "± 67174",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 384911,
            "range": "± 1163",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 570510,
            "range": "± 22518",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1601009,
            "range": "± 48966",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 848646,
            "range": "± 15563",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1312192,
            "range": "± 19709",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3663180,
            "range": "± 257276",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 112896,
            "range": "± 4363",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 478849,
            "range": "± 5329",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 113128,
            "range": "± 6801",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 322096,
            "range": "± 14814",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 177593,
            "range": "± 6013",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 366668,
            "range": "± 3430",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 108773,
            "range": "± 1497",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 433569,
            "range": "± 8432",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 131,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 189,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 163,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 152,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 150,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 166,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 124,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 61,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 170,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 171,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 173,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 155,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 174,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 214,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 158,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 571,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2533,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 56,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/3",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/4",
            "value": 38,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 38,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 78,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 262,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 699,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2534,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 534,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1476,
            "range": "± 85",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "748391ddb43ef6761a6346ed323fce8558e7183f",
          "message": "docs: iteration 44 — 18th verdict 336e9ff [FAST] #25 vs 4110b3f [FAST]: PARITY exit 0 with median -28.00% (p10 -59.78 / p90 -12.39, spread 47.4pp), canary -16.52% (741325 normal FAST cluster), zero flags — SECOND drift-in-baseline echo (mirror of 16th): baseline = cataloged drift VM 4110b3f, all deltas negative (p90 < 0, first all-negative verdict), relations unwind baseline anomaly foxsearch -39.4 / foxurl +21.4 / foxjson -2.3, new point provably normal (FAST norms everywhere); PREDICTION CORRECTION #2: FINAL-2 predicted 4742c83 as pair — wrong, 4110b3f is itself FAST and later in date order, drift points retain class and remain legitimate pairing partners (iter-42 lesson confirmed live); schedule mechanics live-confirmed: #24 published with label 336e9ff = duplicate label with #25, 1:1 points-to-commits era ended, tool handled natively; tally 18 = 15 PARITY + 1 closed false alarm + 2 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T09:33:56Z",
          "tree_id": "842056237ce3cec567ea4919255977f5a0230b6f",
          "url": "https://github.com/x7717/firefox-rs/commit/748391ddb43ef6761a6346ed323fce8558e7183f"
        },
        "date": 1792921807296,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 510,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132645,
            "range": "± 549",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 665107,
            "range": "± 5061",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1365237,
            "range": "± 13261",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 7436618,
            "range": "± 766002",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 790165,
            "range": "± 19331",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4182474,
            "range": "± 208076",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356606,
            "range": "± 11348",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1778809,
            "range": "± 48265",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8471,
            "range": "± 90",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55764,
            "range": "± 204",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76714,
            "range": "± 711",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18019,
            "range": "± 62",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 254321,
            "range": "± 4012",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 474205,
            "range": "± 8598",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 259784,
            "range": "± 7591",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 429619,
            "range": "± 6292",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1587353,
            "range": "± 4626",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 717246,
            "range": "± 3465",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1061376,
            "range": "± 5121",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3240376,
            "range": "± 33216",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1476236,
            "range": "± 12080",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2485953,
            "range": "± 13009",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7765523,
            "range": "± 129036",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207172,
            "range": "± 402",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 916630,
            "range": "± 9856",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206159,
            "range": "± 952",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602262,
            "range": "± 1956",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319779,
            "range": "± 799",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669620,
            "range": "± 3164",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206659,
            "range": "± 1133",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024645,
            "range": "± 14689",
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
            "value": 313,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 87,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 443,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 362,
            "range": "± 1",
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
            "value": 348,
            "range": "± 5",
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
            "value": 348,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 379,
            "range": "± 4",
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
            "value": 243,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 103,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 403,
            "range": "± 1",
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
            "value": 383,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 399,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 349,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 76,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 403,
            "range": "± 2",
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
            "value": 497,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 370,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1189,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5573,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 128,
            "range": "± 2",
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
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 131,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 540,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1404,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5587,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1186,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3135,
            "range": "± 22",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "08dc0c82322e5dbbcffafc9f3cf4ca7b58037aa0",
          "message": "docs: iteration 45 — 19th verdict 748391d [CLASSIC] vs b3125c4 [CLASSIC]: IDEAL PARITY exit 0 and NEW CLEANLINESS RECORD — median +0.00%, p10 -1.62 / p90 +1.58 (spread 3.2pp historic minimum, prev best 3.6pp from 17th), canary +0.51% (1365237 dead-center CLASSIC cluster), zero flags, relations foxjson -0.4 / foxsearch -0.4 / foxurl -0.4 — FIRST time all three IDENTICAL: environment shifted fox and эталон uniformly, relation layer degenerated to constant (zero code signal, maximally stable environment); partner correctly = last CLASSIC predecessor b3125c4 #23 per prediction-correction-#2 lesson (#24 MEDIUM / #25 FAST skipped natively); tally 19 = 16 PARITY + 1 closed false alarm + 2 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T10:01:20Z",
          "tree_id": "38a5ad9f1ee817a121896452b556c11bc1e11da6",
          "url": "https://github.com/x7717/firefox-rs/commit/08dc0c82322e5dbbcffafc9f3cf4ca7b58037aa0"
        },
        "date": 1792923442091,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 513,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 139535,
            "range": "± 2525",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 677602,
            "range": "± 5112",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1429265,
            "range": "± 17592",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6512510,
            "range": "± 53592",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786926,
            "range": "± 17200",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4016884,
            "range": "± 19679",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 357080,
            "range": "± 1195",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1757661,
            "range": "± 19896",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8446,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55291,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76640,
            "range": "± 1735",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18179,
            "range": "± 72",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 251179,
            "range": "± 1423",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 472882,
            "range": "± 7910",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 249887,
            "range": "± 3546",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 415876,
            "range": "± 2436",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1583277,
            "range": "± 6195",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 721061,
            "range": "± 18893",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1065442,
            "range": "± 3932",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3240717,
            "range": "± 78707",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1475292,
            "range": "± 5555",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2485987,
            "range": "± 5847",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8095340,
            "range": "± 131091",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 208137,
            "range": "± 3016",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 913793,
            "range": "± 1680",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 208069,
            "range": "± 3530",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 603421,
            "range": "± 1533",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 321083,
            "range": "± 2049",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668125,
            "range": "± 976",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207394,
            "range": "± 1168",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025504,
            "range": "± 2097",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 70,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 310,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 442,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 364,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 349,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 350,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 381,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 57,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 242,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 114,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 407,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 96,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 387,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 400,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 353,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 405,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 72,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 497,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 394,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1235,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5626,
            "range": "± 75",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 128,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 29,
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
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 84,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 131,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 527,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1506,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5616,
            "range": "± 64",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1208,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3174,
            "range": "± 68",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "fd0ab4b632be0a353d8fcddfbbcb696448c1b93f",
          "message": "docs: iteration 46 — 20th verdict 08dc0c8 [CLASSIC] vs 748391d [CLASSIC]: PARITY exit 0 but FIRST CLASSIC point OUTSIDE homogeneous cluster upward — canary 1429265 (+4.69%, CLASSIC record, +4.5% above 1355-1367K band): new mild-slow pool VM, uniform shift (median +0.52%, p10 -1.18 / p90 +10.53, spread 11.7pp), machine caution note (|canary| > 3%); zero flags; foxurl relation +9.1% = SECOND analytic RATIO_ELEVATED on foxurl (first: 14th verdict +10.0% family layout lottery) — zero flags + docs-only commits + quiet foxsearch => foxurl family most sensitive to VM cache/memory topology, not code; machine does not annotate RATIO in flag-free PARITY branch (analytic note only); consequence: CLASSIC baseline now mild-slow — next in-cluster CLASSIC point expected negative median ~-4% mirror, not regress; tally 20 = 17 PARITY + 1 closed false alarm + 2 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T10:34:09Z",
          "tree_id": "3d858e0fdbc5374ba141a3201e9a48dd182da813",
          "url": "https://github.com/x7717/firefox-rs/commit/fd0ab4b632be0a353d8fcddfbbcb696448c1b93f"
        },
        "date": 1792925414534,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 129,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 550,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 124347,
            "range": "± 351",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 629266,
            "range": "± 17803",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1257782,
            "range": "± 53585",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 7021492,
            "range": "± 171181",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 753013,
            "range": "± 3610",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3914150,
            "range": "± 11277",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 328128,
            "range": "± 983",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1825328,
            "range": "± 14681",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7273,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 47702,
            "range": "± 115",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 78657,
            "range": "± 770",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 16797,
            "range": "± 135",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 221214,
            "range": "± 430",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 519743,
            "range": "± 2167",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 398395,
            "range": "± 2421",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 699706,
            "range": "± 5168",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1981780,
            "range": "± 129249",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 810696,
            "range": "± 3250",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1653955,
            "range": "± 7400",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3987856,
            "range": "± 11645",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1527217,
            "range": "± 2637",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3530274,
            "range": "± 7480",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 9030002,
            "range": "± 22580",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 336488,
            "range": "± 5930",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 1052991,
            "range": "± 2623",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 342701,
            "range": "± 1956",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 683947,
            "range": "± 1175",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 458824,
            "range": "± 537",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 744241,
            "range": "± 1844",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 337158,
            "range": "± 1824",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1077633,
            "range": "± 4014",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 280,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 73,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 408,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 334,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 321,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 328,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 341,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 229,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 372,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 347,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 360,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 58,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 325,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 377,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 436,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 333,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 929,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5057,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 108,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 24,
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
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 149,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 534,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1207,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5028,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1060,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2729,
            "range": "± 12",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "z@container",
            "name": "Z User"
          },
          "committer": {
            "email": "z@container",
            "name": "Z User"
          },
          "distinct": true,
          "id": "42f4ba92bb6e14e3cf39ff05e902f08470d323e0",
          "message": "docs: iteration 47 — 21st verdict fd0ab4b [CLASSIC] vs 08dc0c8 [CLASSIC]: DRIFT exit 3 — point #28 landed on a find-slow VM: median -8.24% (p10 -22.89 / p90 +42.01, spread 64.9pp), canary -12.00% (1257782, 7.3% BELOW cluster), 10 flags fox find/multi +42.0..+68.2% (8) vs эталон multi/naive-std +23.1..+25.2% (2), std find quiet — co-directed ~2.5-3x disproportion, same family as anomalies #1-3; machine correct (wide spread + two-sided relations foxsearch +42.8 / foxjson -11.5 / foxurl -14.6, span 57pp); KEY: fingerprint IDENTICAL to cataloged anomaly #1 573f613 — canary 1261716 vs 1257782 (0.31%), find ratios 0.32/0.50/0.62/0.31 vs 0.32/0.49/0.63/0.31 — SAME POOL VM RECURRING, first recurrence of a drift VM in observation history: pool VMs are persistent hosts drawn repeatedly, drift signatures are stable fingerprints (find-slow CLASSIC VM: canary ~1258-1262K + find 0.32/0.50/0.62/0.31); anomaly catalog #4 (same host as #1); docs-only => no re-run (identical-sources argument); CLASSIC baseline now drift VM — next CLASSIC point = echo-mirror (not regress) or quiet parity on same VM; tally 21 = 17 PARITY + 1 closed false alarm + 3 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T11:03:13Z",
          "tree_id": "048e42b367dc2b130c24cb6977f3f7cdbc483a6b",
          "url": "https://github.com/x7717/firefox-rs/commit/42f4ba92bb6e14e3cf39ff05e902f08470d323e0"
        },
        "date": 1792927156359,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 146,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 507,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132861,
            "range": "± 355",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 676241,
            "range": "± 10965",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1363068,
            "range": "± 29370",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6540374,
            "range": "± 186948",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786463,
            "range": "± 3181",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4028593,
            "range": "± 26714",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 351841,
            "range": "± 1464",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1788179,
            "range": "± 29035",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8387,
            "range": "± 60",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 54751,
            "range": "± 523",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76061,
            "range": "± 408",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18007,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 247873,
            "range": "± 1504",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 472794,
            "range": "± 5689",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 248058,
            "range": "± 4771",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 417434,
            "range": "± 2268",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1587174,
            "range": "± 9692",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 743730,
            "range": "± 10464",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1063268,
            "range": "± 4513",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3237117,
            "range": "± 9167",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1480337,
            "range": "± 25100",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2491559,
            "range": "± 13835",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8106613,
            "range": "± 100658",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 209158,
            "range": "± 5201",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914703,
            "range": "± 7921",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207286,
            "range": "± 885",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 600566,
            "range": "± 4930",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319335,
            "range": "± 1038",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 667709,
            "range": "± 1190",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207061,
            "range": "± 2270",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025054,
            "range": "± 8905",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 310,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 86,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 445,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 364,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 75,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 347,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 73,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 350,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 384,
            "range": "± 0",
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
            "range": "± 0",
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
            "range": "± 2",
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
            "value": 385,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 399,
            "range": "± 39",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 352,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 77,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 407,
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
            "value": 495,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 370,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1183,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5558,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 131,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 29,
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
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 149,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 551,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1407,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5570,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1209,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3144,
            "range": "± 30",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}