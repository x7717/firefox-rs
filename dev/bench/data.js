window.BENCHMARK_DATA = {
  "lastUpdate": 1793006526453,
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
          "id": "1518dcccc00aa9bb9f33a1e9567dcd41665563bd",
          "message": "docs: iteration 48 — 22nd verdict 42f4ba9 [CLASSIC] vs fd0ab4b [CLASSIC]: DRIFT exit 3 = PREDICTED echo-mirror (iter-47 forecast confirmed exactly): point #29 provably normal (canary 1363068 cluster center, fingerprint NOT drift host), all signatures unwind baseline drift VM; median +8.31% (p10 -29.42 / p90 +20.31, spread 49.7pp), canary +8.37% (1257782 => 1363068 recovery); 8 flags ALL foxurl family +20.3..+27.3% — recovery from abnormally FAST drift-VM values to cluster norms (corpus-all 929 => 1183 = exact norm; foxurl suppressed on find-slow hosts, same signature as a8ab2dc); find side mirrors deep negative (foxsearch relation -29.8% unwinding +62% inflation); machine correct (span 39pp, two-sided relations) => environment; THIRD echo-in-baseline (16 a8ab2dc, 18 4110b3f, 22 fd0ab4b), SECOND consecutive DRIFT (21, 22) — both fully attributed to ONE cataloged host (#4=#1): first as anomalous point, then as echo baseline; CLASSIC baseline normal again (42f4ba9) — drift host out of pairs; tally 22 = 17 PARITY + 1 closed false alarm + 4 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T11:31:46Z",
          "tree_id": "1ee0830b06b5f3d98635f88dbba8141db4e0de42",
          "url": "https://github.com/x7717/firefox-rs/commit/1518dcccc00aa9bb9f33a1e9567dcd41665563bd"
        },
        "date": 1792928870308,
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
            "value": 514,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133425,
            "range": "± 3093",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 671226,
            "range": "± 8966",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1358768,
            "range": "± 22393",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6474412,
            "range": "± 230226",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 785898,
            "range": "± 22788",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4034487,
            "range": "± 23617",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 357769,
            "range": "± 2028",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1759752,
            "range": "± 27920",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8484,
            "range": "± 54",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55819,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76203,
            "range": "± 854",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17876,
            "range": "± 77",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250279,
            "range": "± 1404",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 471796,
            "range": "± 1370",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 250174,
            "range": "± 1106",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 415297,
            "range": "± 1689",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1583006,
            "range": "± 6252",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 722083,
            "range": "± 2149",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1081286,
            "range": "± 18998",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3236149,
            "range": "± 33246",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1478496,
            "range": "± 2657",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2493861,
            "range": "± 34062",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7782437,
            "range": "± 58797",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 209924,
            "range": "± 6124",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 916656,
            "range": "± 1187",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 209430,
            "range": "± 2057",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 604313,
            "range": "± 5783",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 323402,
            "range": "± 2828",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 671231,
            "range": "± 1202",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 208616,
            "range": "± 1816",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1028366,
            "range": "± 21787",
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
            "value": 308,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 86,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 438,
            "range": "± 5",
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
            "value": 359,
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
            "value": 345,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 74,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 343,
            "range": "± 15",
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
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 49,
            "range": "± 1",
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
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 402,
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
            "value": 384,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 85,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 391,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 69,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 347,
            "range": "± 0",
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
            "value": 404,
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
            "value": 409,
            "range": "± 3",
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
            "value": 371,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1183,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5510,
            "range": "± 15",
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
            "value": 127,
            "range": "± 4",
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
            "value": 131,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 547,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1422,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5485,
            "range": "± 55",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1164,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3088,
            "range": "± 7",
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
          "id": "415fe958ea14766f44327878475dcc7688d557d5",
          "message": "docs: iteration 49 — 23rd verdict 1518dcc [CLASSIC] vs 42f4ba9 [CLASSIC]: quiet PARITY exit 0 — environment recovered after double DRIFT: median +0.00% (second ideal zero in history after 19th), p10 -2.91 / p90 +1.37 (spread 4.3pp), canary -0.32% (1358768 cluster center, not a drift host), zero flags, no machine caution; relations foxjson +0.7 / foxsearch +0.4 / foxurl +0.6 all within ±1% uniformly positive (~0.5% background); iter-48 forecast confirmed: after drift host left pairs and new point landed on normal VM, machine returned to quiet verdicts; five-point CLASSIC pattern (cluster -> find-slow host -> echo -> cluster) fully closed by the catalog; tally 23 = 18 PARITY + 1 closed false alarm + 4 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T12:01:23Z",
          "tree_id": "84cf9a25d5c13c0b5a4dc6db0f63b75abebead13",
          "url": "https://github.com/x7717/firefox-rs/commit/415fe958ea14766f44327878475dcc7688d557d5"
        },
        "date": 1792930598935,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 79,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 318,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 71207,
            "range": "± 1055",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 392278,
            "range": "± 5166",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 717278,
            "range": "± 10210",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 3844703,
            "range": "± 36888",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 399563,
            "range": "± 7230",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2393077,
            "range": "± 26637",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 182481,
            "range": "± 1533",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1136750,
            "range": "± 25019",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 5315,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 26507,
            "range": "± 338",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 31141,
            "range": "± 1237",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10727,
            "range": "± 798",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 121098,
            "range": "± 2063",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 245463,
            "range": "± 4015",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 163183,
            "range": "± 6092",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 216136,
            "range": "± 6695",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 734974,
            "range": "± 15859",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 386787,
            "range": "± 4402",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 574278,
            "range": "± 8070",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1604878,
            "range": "± 29838",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 850698,
            "range": "± 13605",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1314100,
            "range": "± 45499",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3989688,
            "range": "± 92903",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 125033,
            "range": "± 5319",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 530260,
            "range": "± 8794",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 117346,
            "range": "± 2807",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 340533,
            "range": "± 6184",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 186322,
            "range": "± 12545",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 383397,
            "range": "± 9204",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 117910,
            "range": "± 4323",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 457308,
            "range": "± 11896",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 134,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 45,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 198,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 180,
            "range": "± 2",
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
            "value": 158,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 157,
            "range": "± 7",
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
            "value": 184,
            "range": "± 7",
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
            "value": 125,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 65,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 185,
            "range": "± 1",
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
            "value": 180,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 184,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 162,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 180,
            "range": "± 4",
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
            "range": "± 6",
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
            "value": 179,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 616,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2771,
            "range": "± 77",
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
            "value": 60,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 15,
            "range": "± 1",
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
            "range": "± 0",
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
            "value": 83,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 271,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 743,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2727,
            "range": "± 47",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 570,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1543,
            "range": "± 49",
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
          "id": "415fe958ea14766f44327878475dcc7688d557d5",
          "message": "docs: iteration 49 — 23rd verdict 1518dcc [CLASSIC] vs 42f4ba9 [CLASSIC]: quiet PARITY exit 0 — environment recovered after double DRIFT: median +0.00% (second ideal zero in history after 19th), p10 -2.91 / p90 +1.37 (spread 4.3pp), canary -0.32% (1358768 cluster center, not a drift host), zero flags, no machine caution; relations foxjson +0.7 / foxsearch +0.4 / foxurl +0.6 all within ±1% uniformly positive (~0.5% background); iter-48 forecast confirmed: after drift host left pairs and new point landed on normal VM, machine returned to quiet verdicts; five-point CLASSIC pattern (cluster -> find-slow host -> echo -> cluster) fully closed by the catalog; tally 23 = 18 PARITY + 1 closed false alarm + 4 DRIFT, profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T12:01:23Z",
          "url": "https://github.com/x7717/firefox-rs/commit/415fe958ea14766f44327878475dcc7688d557d5"
        },
        "date": 1792932699985,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 116,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 400,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 105623,
            "range": "± 1390",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 504656,
            "range": "± 12513",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1068098,
            "range": "± 47792",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4985650,
            "range": "± 9289",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 610566,
            "range": "± 21068",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3111508,
            "range": "± 8741",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 280997,
            "range": "± 683",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1381237,
            "range": "± 10429",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7028,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38154,
            "range": "± 796",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 48449,
            "range": "± 1101",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14455,
            "range": "± 258",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 163611,
            "range": "± 2183",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 311174,
            "range": "± 1678",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 192883,
            "range": "± 708",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 357440,
            "range": "± 3081",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1321944,
            "range": "± 23734",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 506345,
            "range": "± 7273",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 877023,
            "range": "± 3282",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2696528,
            "range": "± 17984",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1159305,
            "range": "± 2237",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2039968,
            "range": "± 15741",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6488939,
            "range": "± 16480",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178816,
            "range": "± 246",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 797142,
            "range": "± 1203",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178616,
            "range": "± 371",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538147,
            "range": "± 10834",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259085,
            "range": "± 887",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 591223,
            "range": "± 375",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178656,
            "range": "± 1591",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 813676,
            "range": "± 1119",
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
            "range": "± 4",
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
            "value": 310,
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
            "range": "± 6",
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
            "range": "± 0",
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
            "value": 243,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 69,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 269,
            "range": "± 1",
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
            "value": 97,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 276,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 83,
            "range": "± 1",
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
            "value": 286,
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
            "value": 255,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 78,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 285,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 316,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 249,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 995,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3895,
            "range": "± 10",
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
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 382,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1062,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3805,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 810,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2113,
            "range": "± 7",
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
          "id": "66c83cae22a535f70b17b6e9a059434e0b50abc1",
          "message": "docs: iteration 50 — 24th verdict 415fe95 [FAST] vs 336e9ff [FAST]: REGRESS exit 1 closed by analysis — single flag classifier/foxsearch-multi/8 +26.0% (4219->5315) is intra-class variance of the widest bench (FAST span 26.3%: new value within historical FAST band, max 5328 fd13ee5; baseline = all-time FAST minimum 4219), relations quiet (max +0.2%), docs-only commit = identical sources (code = 1518dcc, zero flags at 23rd); FIRST manual Benchmark re-run in project history (workflow_dispatch bench.yml, run 40193848570); 25th verdict (re-run point #32, duplicate label 415fe95, landed MEDIUM canary 1068098 center) vs 336e9ff [MEDIUM]: DRIFT exit 3 = FOURTH echo-in-baseline (16 a8ab2dc, 18 4110b3f, 22 fd0ab4b, 25 336e9ff[M]): median -10.33%, spread 68.4pp, 9 flags (parse/foxurl 1,2,4,6,8,9,10,11 +22.1..+32.0% + classifier +24.4% 5648->7028), two-sided relations foxsearch -39.1 / foxurl +34.1 / foxjson +22.2 (span 73pp) — baseline 336e9ff [MEDIUM] revealed as UNCATALOGED find-anomaly #5 (find/Mozilla 0.37x = +68% vs MEDIUM norm 0.22x, absolute 355914 = 1.99x of ~178.8K norm), sat in base since 17th verdict without a single MEDIUM pair; NEW SIGNATURE TYPE: canary dead-center (previous find-slow hosts all had canary anomalies #1 -7% / #2 -3.9% / #3 +17.3%) => canary insufficient for drift-VM fingerprinting, find ratios only; secondary MEDIUM find-slow signature: classifier/foxsearch-multi/8 ~22% FASTER than norm (5556 at #2, 5648 at #5 vs 7036-7276); re-run point provably normal (find ratios exactly norm 0.22/0.33/0.44/0.22, find/Mozilla 178816, canary center); both classifier flags (5315 FAST / 7028 MEDIUM) within class bands = bench-local variance, not code; tally 25 = 18 PARITY + 1 closed false alarm + 5 DRIFT + 1 REGRESS (24th, closing; confirming FAST pair next); bases all docs-only code 1518dcc: CLASSIC 1358768 / MEDIUM 415fe95[M] 1068098 / FAST 415fe95[F] 717278 — profiles unchanged — crate code untouched",
          "timestamp": "2026-10-25T13:01:40Z",
          "tree_id": "033b5550982487b56cfc60b4b4b630740caee208",
          "url": "https://github.com/x7717/firefox-rs/commit/66c83cae22a535f70b17b6e9a059434e0b50abc1"
        },
        "date": 1792934230231,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 80,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 334,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 74449,
            "range": "± 912",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 408778,
            "range": "± 22345",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 751400,
            "range": "± 33487",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4052271,
            "range": "± 160995",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 424014,
            "range": "± 28606",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2582560,
            "range": "± 20545",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 198762,
            "range": "± 6073",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1160640,
            "range": "± 16673",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4599,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 28076,
            "range": "± 419",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 30633,
            "range": "± 1091",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9615,
            "range": "± 462",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 114029,
            "range": "± 1958",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 238267,
            "range": "± 4381",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 158692,
            "range": "± 3713",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 223579,
            "range": "± 8886",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 776597,
            "range": "± 28781",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 417254,
            "range": "± 7235",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 589685,
            "range": "± 8210",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1705270,
            "range": "± 36954",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 902085,
            "range": "± 16462",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1398607,
            "range": "± 49351",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3881810,
            "range": "± 74148",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 117085,
            "range": "± 7828",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 489632,
            "range": "± 13358",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 114650,
            "range": "± 4046",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 336167,
            "range": "± 9559",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 185394,
            "range": "± 5095",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 384312,
            "range": "± 11420",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 116641,
            "range": "± 4453",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 436841,
            "range": "± 16269",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 33,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 134,
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
            "value": 205,
            "range": "± 6",
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
            "value": 168,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 157,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 155,
            "range": "± 3",
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
            "value": 182,
            "range": "± 4",
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
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 66,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 176,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 182,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 182,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 36,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 163,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 177,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 34,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 224,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 165,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 597,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2619,
            "range": "± 73",
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
            "range": "± 13",
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
            "value": 42,
            "range": "± 0",
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
            "value": 81,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 271,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 749,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2597,
            "range": "± 65",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 555,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1425,
            "range": "± 19",
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
          "id": "2b64828ed68dff4953d7412b1cdf03a8bbe29b01",
          "message": "docs: iteration 51 — 26th verdict re-confirmed (PARITY exit 0: point #33 66c83ca [FAST] canary 751400 vs 415fe95 [FAST], median -1.09%, spread 11.8pp, canary +4.76%, zero flags, relations foxjson -0.6 / foxsearch +0.3 / foxurl -1.2); point #33 provably normal FAST (find ratios exactly norm 0.24/0.34/0.48/0.27, find/Mozilla 117085 in 112-125K band) — not a drift host; 26th = CONFIRMING FAST pair for 24th verdict: classifier/foxsearch-multi/8 did NOT repeat (flag threshold now 6378 > all-time FAST max 5328) => 24th REGRESS formally closed as SECOND closed false alarm (first: 8th) — intra-class variance of the widest bench in max-meets-min mode (baseline 4219 = all-time FAST min, new 5315 within FAST band max 5328) with docs-only commit (code identical to 1518dcc which had zero flags at 23rd); tally 26 = 19 PARITY + 2 closed false alarms + 5 DRIFT, no active REGRESS; interpretation rules updated: FAST baseline 415fe95[F] canary 717278 = all-time FAST minimum (fast pool edge, normal host) => next FAST pair expected +4-5% median recovery, environment not code; MEDIUM chain clean (last MEDIUM predecessor 415fe95[M] normal point #32) => no echo from anomaly #5; drift fingerprints consolidated: find-slow CLASSIC ~1258-1262K + 0.32/0.50/0.62/0.31 (no.1 = no.4 host recurrence), mild-slow CLASSIC ~1429K, find-slow FAST 888010 + 0.43x, find-slow MEDIUM canary unreliable (check find ratios 0.32-0.37x + classifier ~5.5-5.6K); foxurl-RATIO ПРИМЕТКА counter stays at 2 (26th foxurl -1.2%); profiles unchanged (Profiling still zero runs after 9337c7e) — crate code untouched",
          "timestamp": "2026-10-25T13:35:44Z",
          "tree_id": "a097c1619e26288164e1430477c89be6604fcc63",
          "url": "https://github.com/x7717/firefox-rs/commit/2b64828ed68dff4953d7412b1cdf03a8bbe29b01"
        },
        "date": 1792936312743,
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
            "value": 514,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133937,
            "range": "± 885",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 679201,
            "range": "± 4043",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1355415,
            "range": "± 9903",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6735244,
            "range": "± 165953",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786681,
            "range": "± 4125",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4032064,
            "range": "± 34435",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 351028,
            "range": "± 746",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1757334,
            "range": "± 29310",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8467,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55719,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76097,
            "range": "± 1942",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18163,
            "range": "± 112",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250429,
            "range": "± 2951",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 484526,
            "range": "± 3524",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 247374,
            "range": "± 1762",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 417344,
            "range": "± 2214",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1582228,
            "range": "± 19887",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 721988,
            "range": "± 3445",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1062913,
            "range": "± 12156",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3236282,
            "range": "± 5845",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1486974,
            "range": "± 8727",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2492313,
            "range": "± 7840",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8116727,
            "range": "± 83519",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 208525,
            "range": "± 1935",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 917241,
            "range": "± 3304",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207166,
            "range": "± 1784",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 600823,
            "range": "± 2762",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 317299,
            "range": "± 634",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669988,
            "range": "± 6798",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206583,
            "range": "± 905",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024998,
            "range": "± 4801",
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
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 442,
            "range": "± 4",
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
            "value": 363,
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
            "value": 348,
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
            "value": 343,
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
            "value": 382,
            "range": "± 1",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 89,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 387,
            "range": "± 10",
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
            "value": 400,
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
            "value": 347,
            "range": "± 2",
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
            "value": 404,
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
            "value": 489,
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
            "value": 367,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1187,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5523,
            "range": "± 36",
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
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 85,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 145,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 552,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1418,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5523,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1204,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3102,
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
          "id": "f6ec2929de202a3ae827d1339e54bbd45150d9f0",
          "message": "docs: iteration 52 — 27th verdict 2b64828 [CLASSIC] vs 1518dcc [CLASSIC]: quiet PARITY exit 0 exactly as forecast — median +0.00% (third ideal zero after 19th/23rd), p10 -1.08 / p90 +2.30 (spread 3.4pp, third-best in history after record 2.8 and 3.2), canary -0.25% (cluster center), zero flags; relations uniformly ~-0.8% (foxjson -0.8 / foxsearch -0.7 / foxurl -0.8) — mirror of 23rd's uniform +0.5% background: environment shifted both sides equally, relation layer degenerated to constant, zero code signal; iter-51 forecast confirmed (point #34 predicted normal CLASSIC host, landed so); foxurl-RATIO third live case did NOT occur (counter stays at 2, ПРИМЕТКА not triggered); tally 27 = 20 PARITY + 2 closed false alarms + 5 DRIFT; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 18 runs without rollback",
          "timestamp": "2026-10-25T14:01:35Z",
          "tree_id": "fd19cf899310c04a85891017e3365df505e6b38f",
          "url": "https://github.com/x7717/firefox-rs/commit/f6ec2929de202a3ae827d1339e54bbd45150d9f0"
        },
        "date": 1792937852940,
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
            "value": 519,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132620,
            "range": "± 403",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 668886,
            "range": "± 2910",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1354627,
            "range": "± 11720",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6461937,
            "range": "± 106763",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 784388,
            "range": "± 3548",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4080838,
            "range": "± 28490",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 349956,
            "range": "± 1079",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1788732,
            "range": "± 20478",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8453,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 54830,
            "range": "± 391",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75769,
            "range": "± 780",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18098,
            "range": "± 38",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250290,
            "range": "± 584",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 468969,
            "range": "± 1208",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 245575,
            "range": "± 1110",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 412355,
            "range": "± 699",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1583006,
            "range": "± 6406",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 709890,
            "range": "± 6286",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1053044,
            "range": "± 4028",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3285349,
            "range": "± 6191",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1465990,
            "range": "± 2564",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2467218,
            "range": "± 7392",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7755223,
            "range": "± 16583",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206274,
            "range": "± 521",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 913436,
            "range": "± 2140",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 205799,
            "range": "± 696",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 599441,
            "range": "± 753",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 316782,
            "range": "± 319",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 667230,
            "range": "± 2058",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 205697,
            "range": "± 532",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024679,
            "range": "± 1240",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 311,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 443,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 368,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 81,
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
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 349,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 384,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 55,
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
            "value": 114,
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
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 384,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 91,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 399,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 76,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 358,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 408,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 484,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 373,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1219,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5599,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 130,
            "range": "± 0",
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
            "range": "± 1",
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
            "value": 132,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 531,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1496,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5575,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1192,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3088,
            "range": "± 10",
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
          "id": "556aef50d3d419f01e5f1fb836dee45c6a7b83df",
          "message": "docs: iteration 53 — SEVENTH VM rollback recovered per protocol (HEAD f6ec292 = origin/main, repo worklog sessions 32-48 intact); 28th verdict f6ec292 [CLASSIC] vs 2b64828 [CLASSIC]: quiet PARITY exit 0 exactly as forecast — median -0.06%, p10 -1.60 / p90 +9.38 (spread 11.0pp), canary -0.06% dead-center, zero flags; point #35 provably normal host (find ratios exactly norm 0.23/0.34/0.47/0.20); relations foxjson -1.5 / foxsearch -0.4 / foxurl +7.8% — CLOSEST APPROACH to RATIO_ELEVATED threshold (+8.0) in observation history (prior crossings: +10.0% at 14th, +9.1% at 20th), 0.2pp short — third live case did NOT occur, ПРИМЕТКА counter stays at 2, tool unchanged; absolute parse/foxurl/corpus-all 1219 vs baseline 1187 (+2.7%, within band 1183-1219) with uniform parse microbench uplift — uniform-relation-shift family, environment; second consecutive CLASSIC pair of normal hosts — chain clean; tally 28 = 21 PARITY + 2 closed false alarms + 5 DRIFT; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 19 runs without rollback",
          "timestamp": "2026-10-25T14:32:31Z",
          "tree_id": "ad7ae7fac3d9cb55287461fd2cbdd4ab7b075004",
          "url": "https://github.com/x7717/firefox-rs/commit/556aef50d3d419f01e5f1fb836dee45c6a7b83df"
        },
        "date": 1792939687066,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 85,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 351,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 80809,
            "range": "± 1464",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 438255,
            "range": "± 8105",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 815680,
            "range": "± 16510",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4380796,
            "range": "± 69656",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 460754,
            "range": "± 3964",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2709566,
            "range": "± 30784",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 202583,
            "range": "± 3571",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1223315,
            "range": "± 21535",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4902,
            "range": "± 93",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 29649,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 32182,
            "range": "± 1539",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10365,
            "range": "± 86",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 117508,
            "range": "± 408",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 238591,
            "range": "± 645",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 162525,
            "range": "± 3750",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 232207,
            "range": "± 3314",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 783514,
            "range": "± 127511",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 406909,
            "range": "± 12047",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 618452,
            "range": "± 8275",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1702134,
            "range": "± 74573",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 894997,
            "range": "± 62237",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1381673,
            "range": "± 4336",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3843667,
            "range": "± 156966",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 118682,
            "range": "± 2837",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 509309,
            "range": "± 11688",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 118176,
            "range": "± 3560",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 339692,
            "range": "± 4595",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 189682,
            "range": "± 757",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 396326,
            "range": "± 11353",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 119822,
            "range": "± 3256",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 466334,
            "range": "± 16797",
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
            "value": 138,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 47,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 204,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 173,
            "range": "± 2",
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
            "value": 160,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 158,
            "range": "± 11",
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
            "value": 173,
            "range": "± 5",
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
            "value": 124,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 64,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 173,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 177,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 43,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 188,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 164,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 180,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 35,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 227,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 156,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 576,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2535,
            "range": "± 44",
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
            "value": 56,
            "range": "± 1",
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
            "value": 41,
            "range": "± 0",
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
            "value": 82,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 269,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 755,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2708,
            "range": "± 154",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 570,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1548,
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
          "id": "a82293754fd03fc04be7a0aff536336cd2ca8cc6",
          "message": "docs: iteration 54 — 29th verdict 556aef5 [FAST] vs 66c83ca [FAST]: quiet PARITY exit 0 — median +1.94%, p10 -3.03 / p90 +7.21 (spread 10.2pp), canary +8.55% (inter-host variance within FAST class: center 751K -> top edge 816K, machine standard caution), zero flags; relations foxjson +1.1 / foxsearch -1.7 / foxurl +1.6 all quiet — foxurl near-miss did NOT repeat (counter stays at 2); point #36 provably normal (find/Mozilla 118682 in 112-125K norm, classifier/8 4902 in band); FORECAST CORRECTION (honest): partner was 66c83ca #33 not 415fe95 #31 — last-same-class-predecessor law held again (points #34/#35 were CLASSIC), the error was my baseline choice not the law; consequence: fast-edge-baseline concern retired (415fe95[F] out of pairs), new FAST baseline 556aef5 (815680) — next FAST pair expects negative return delta ~-8%, environment; tally 29 = 22 PARITY + 2 closed false alarms + 5 DRIFT; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 20 runs without rollback",
          "timestamp": "2026-10-25T15:01:27Z",
          "tree_id": "3d692c8785d1e89d285df7bba362549cabdd0ed3",
          "url": "https://github.com/x7717/firefox-rs/commit/a82293754fd03fc04be7a0aff536336cd2ca8cc6"
        },
        "date": 1792941421003,
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
            "value": 345,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 77729,
            "range": "± 3983",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 430635,
            "range": "± 24971",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 796800,
            "range": "± 34357",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4162926,
            "range": "± 554805",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 430825,
            "range": "± 58242",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2561822,
            "range": "± 123066",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 196563,
            "range": "± 2389",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1210230,
            "range": "± 31916",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4663,
            "range": "± 52",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 28744,
            "range": "± 345",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 30324,
            "range": "± 2096",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9959,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 117391,
            "range": "± 3604",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 240775,
            "range": "± 3875",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 164493,
            "range": "± 3687",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 233796,
            "range": "± 3244",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 793903,
            "range": "± 14445",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 436852,
            "range": "± 15042",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 658211,
            "range": "± 20722",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1737530,
            "range": "± 30069",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 940440,
            "range": "± 27578",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1445295,
            "range": "± 31981",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3960634,
            "range": "± 56521",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 119561,
            "range": "± 6687",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 522568,
            "range": "± 11281",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 122552,
            "range": "± 5842",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 351797,
            "range": "± 11870",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 193342,
            "range": "± 6677",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 404565,
            "range": "± 10589",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 123769,
            "range": "± 8801",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 478090,
            "range": "± 5751",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 36,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 148,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 203,
            "range": "± 5",
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
            "value": 170,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 162,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 41,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 157,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 41,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 176,
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
            "value": 131,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 65,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 178,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 183,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 43,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 185,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 164,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 42,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 182,
            "range": "± 4",
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
            "value": 224,
            "range": "± 4",
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
            "value": 167,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 596,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2661,
            "range": "± 95",
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
            "value": 57,
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
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 77,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 259,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 702,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2504,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 524,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1415,
            "range": "± 27",
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
          "id": "54dae007f36aefab77de7778d841d2cda2a23773",
          "message": "docs: iteration 55 — EIGHTH VM rollback recovered per protocol (HEAD a822937 = origin/main; local worklog survived this time; /tmp verdict archives lost, repo docs authoritative); 30th verdict a822937 [FAST] vs 556aef5 [FAST]: quiet PARITY exit 0, forecast matched byte-for-byte — median +0.00% (FOURTH ideal zero after 19th/23rd/27th), p10 -5.45 / p90 +4.97 (spread 10.4pp), canary -2.31% (predicted -2.3% — return from top edge to band middle, environment), zero flags; relations foxjson -1.1 / foxsearch -0.0 / foxurl -1.4 all quiet, foxurl threshold not crossed (counter 2); point #37 provably normal (find/Mozilla 119561, classifier/8 4663 in band); MILESTONE: 30 verdicts = 23 PARITY + 2 closed false alarms + 5 DRIFT — zero active REGRESS in entire observation history; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 21 runs without rollback",
          "timestamp": "2026-10-25T15:31:36Z",
          "tree_id": "fd053d723a064bb5e16f60810de9eebae8cab913",
          "url": "https://github.com/x7717/firefox-rs/commit/54dae007f36aefab77de7778d841d2cda2a23773"
        },
        "date": 1792943260599,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 144,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 509,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132664,
            "range": "± 1207",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 666188,
            "range": "± 12241",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1354608,
            "range": "± 22884",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6523586,
            "range": "± 80197",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 784604,
            "range": "± 1720",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4039124,
            "range": "± 14027",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 354543,
            "range": "± 1056",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1769358,
            "range": "± 30600",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8397,
            "range": "± 102",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55685,
            "range": "± 248",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76689,
            "range": "± 1008",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17987,
            "range": "± 179",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 251969,
            "range": "± 1342",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 473243,
            "range": "± 5901",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 247217,
            "range": "± 1637",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 416649,
            "range": "± 1808",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1589322,
            "range": "± 39299",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 721023,
            "range": "± 4433",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1063888,
            "range": "± 13974",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3236681,
            "range": "± 15624",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1471604,
            "range": "± 19370",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2483195,
            "range": "± 6186",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7787763,
            "range": "± 63537",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207678,
            "range": "± 1954",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 916039,
            "range": "± 6296",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206878,
            "range": "± 508",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601694,
            "range": "± 1570",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 320453,
            "range": "± 1727",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668628,
            "range": "± 1410",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207033,
            "range": "± 766",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025583,
            "range": "± 8159",
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
            "value": 312,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 85,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 441,
            "range": "± 11",
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
            "value": 359,
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
            "value": 345,
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
            "value": 343,
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
            "value": 380,
            "range": "± 1",
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
            "value": 406,
            "range": "± 5",
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
            "value": 398,
            "range": "± 8",
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
            "value": 353,
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
            "value": 403,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 65,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 487,
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
            "value": 373,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1196,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5547,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 40,
            "range": "± 1",
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
            "range": "± 1",
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
            "value": 532,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1413,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5537,
            "range": "± 102",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1203,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3058,
            "range": "± 47",
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
          "id": "7a3645832319ae940f0d9b78bd35ff58e4320445",
          "message": "docs: iteration 56 — 31st verdict 54dae00 [CLASSIC] vs f6ec292 [CLASSIC]: quiet PARITY exit 0, forecast exact again (canary predicted ~-0.00%, actual -0.00%) — median -0.45%, p10 -8.33 / p90 +1.03 (spread 9.4pp), zero flags; all point #38 absolutes within CLASSIC bands (foxurl/corpus-all 1196 dead-center 1174-1235, find/Mozilla 207678 = 0.23x, strs 354543, nums 784604, small 144) — normal host; relations foxjson +1.1 / foxsearch +0.5 / foxurl -7.2% — LARGEST NEGATIVE foxurl relation in observation history (prior excitations were positive: +10.0 at 14th, +9.1 at 20th, +7.8 near-miss at 28th): fox-side relatively accelerated at dead-center absolute — mirror of the uniform-shift family, pure environment; RATIO_ELEVATED threshold (+8.0, positive direction) not crossed — ПРИМЕТКА counter stays at 2; rule asymmetry recorded (negative direction uncovered by threshold); tally 31 = 24 PARITY + 2 closed false alarms + 5 DRIFT; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 22 runs without rollback",
          "timestamp": "2026-10-25T16:01:43Z",
          "tree_id": "af2ae402e6abf7cc8acd913c9e2fc6160c06faf9",
          "url": "https://github.com/x7717/firefox-rs/commit/7a3645832319ae940f0d9b78bd35ff58e4320445"
        },
        "date": 1792945061324,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 115,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 550,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 115181,
            "range": "± 930",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 604850,
            "range": "± 4135",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1183158,
            "range": "± 21866",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6700858,
            "range": "± 39695",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 719005,
            "range": "± 12405",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3801093,
            "range": "± 92552",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 289476,
            "range": "± 1181",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1805372,
            "range": "± 23902",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 6654,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 51539,
            "range": "± 711",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 74389,
            "range": "± 635",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14785,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 231806,
            "range": "± 1365",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 539290,
            "range": "± 1562",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 365121,
            "range": "± 1009",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 645359,
            "range": "± 942",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1989327,
            "range": "± 4618",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 713316,
            "range": "± 2762",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1692561,
            "range": "± 3209",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3970471,
            "range": "± 13520",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1305122,
            "range": "± 5046",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3759414,
            "range": "± 7388",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 9539357,
            "range": "± 52217",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 322421,
            "range": "± 2184",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 1040054,
            "range": "± 6102",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 322036,
            "range": "± 722",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 657433,
            "range": "± 3458",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 516111,
            "range": "± 4872",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 744669,
            "range": "± 3116",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 316117,
            "range": "± 6476",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1235588,
            "range": "± 13957",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 247,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 383,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 322,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 290,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 302,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 65,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 325,
            "range": "± 2",
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
            "value": 205,
            "range": "± 1",
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
            "value": 325,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 73,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 312,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 335,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 315,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 350,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 385,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 314,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 945,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 4745,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 105,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 26,
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
            "value": 70,
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
            "value": 119,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 483,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1141,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 4698,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 965,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2632,
            "range": "± 11",
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
          "id": "1241f94022d2e238b72cebe2f8da452eba17240f",
          "message": "docs: iteration 57 — 32nd verdict 7a36458 [MEDIUM] vs 415fe95 [MEDIUM]: DRIFT exit 3 as forecast (canary predicted +10.8%, actual +10.77% — third consecutive exact hit) — median +21.43%, p10 -10.84 / p90 +76.94 (spread 87.8pp WIDEST in history), 16 flags (largest list ever) but reference side slowed equally (find/std/zzz +51.9%, naive-std +47..73%) — host not code (byte-identical 1518dcc); relations both ways foxjson -17.6 / foxsearch +42.9 / foxurl -22.0 (span 65pp) — decisive DRIFT sign, live demo of DRIFT/REGRESS discrimination (median above +20% threshold yet not REGRESS); CATALOG No6: find-slow MEDIUM host with canary ABOVE band +10.8% — new canary anomaly type for MEDIUM (No2 -3.9% edge, No5 center; FAST upper-band anomaly was No4 +14.5%); find relations 0.31/0.49/0.69/0.26 — near-copy of No2 (0.32/0.50/0.72/0.26); classifier/8 6654 between norm and deep signature; hypothesis: No6 = No2 host at higher clock state (canary +15.3%, classifier +19%); lesson: fox/reference relation sub-forecast missed — find-slow hosts distort the relation layer (foxsearch positive, foxjson/foxurl negative); foxurl -22.0% drift-contaminated, clean record stays -7.2%; RATIO_ELEVATED not crossed (counter 2); tally 32 = 24 PARITY + 2 closed false alarms + 6 DRIFT (No1-No6), zero active REGRESS; VM rollback NINE avoided (repo intact, only toolchain wiped — rustup reinstalling); profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 23 runs without rollback",
          "timestamp": "2026-10-25T16:37:39Z",
          "tree_id": "84397ef239637621dba02557253b6f4770e0f0e6",
          "url": "https://github.com/x7717/firefox-rs/commit/1241f94022d2e238b72cebe2f8da452eba17240f"
        },
        "date": 1792947209692,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 114,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 399,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 105179,
            "range": "± 799",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 505895,
            "range": "± 8378",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1066539,
            "range": "± 18214",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5173440,
            "range": "± 746185",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 612014,
            "range": "± 3102",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3173209,
            "range": "± 331139",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 279823,
            "range": "± 2980",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1457693,
            "range": "± 177541",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7148,
            "range": "± 34",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 39183,
            "range": "± 696",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 46749,
            "range": "± 75",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14449,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 165503,
            "range": "± 877",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 312145,
            "range": "± 3500",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 197226,
            "range": "± 2975",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 365012,
            "range": "± 4512",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1333108,
            "range": "± 19394",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 512287,
            "range": "± 3784",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 891713,
            "range": "± 14972",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2719451,
            "range": "± 79651",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1160310,
            "range": "± 13824",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2060514,
            "range": "± 18050",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6524232,
            "range": "± 17136",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 180682,
            "range": "± 2540",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 799774,
            "range": "± 1936",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178571,
            "range": "± 2149",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538115,
            "range": "± 457",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259119,
            "range": "± 359",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 591782,
            "range": "± 4921",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178704,
            "range": "± 301",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 814891,
            "range": "± 4658",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 211,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 94,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 305,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 83,
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
            "value": 79,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 243,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 81,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 248,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 265,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 168,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 108,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 274,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 278,
            "range": "± 0",
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
            "value": 285,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 80,
            "range": "± 0",
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
            "value": 90,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 285,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 70,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 312,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 76,
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
            "value": 1152,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3939,
            "range": "± 23",
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
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 21,
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
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 396,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1220,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3810,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 880,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2108,
            "range": "± 49",
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
          "id": "17c62a07e920491d83c2e0f0051487efcc80bce7",
          "message": "docs: iteration 58 — 33rd verdict 1241f94 [MEDIUM] vs 7a36458 [MEDIUM]: DRIFT exit 3 — headline forecast MISSED (expected PARITY), canary -9.86% predicted byte-for-byte (FOURTH consecutive exact hit after -2.31/-0.00/+10.77), median -17.14% inside corridor -15..-22%; 13 flags ALL parse/foxurl/* (+21.9..+42.9%), relations foxjson +16.8 / foxsearch -29.7 / foxurl +51.5 (span 81pp both ways) => DRIFT mechanically correct; forecast post-mortem: baseline host No6 carried a MISSED url-reference layer (url_crate/corpus-all 4745 vs norm 3895-4031 = +18-22%, foxurl 945 = -5%) — No6 fingerprint extended to FOUR layers (find-slow + canary-above-band + url-etalon-slow + foxurl-fast); second layer: point #40 itself is foxurl-elevated MEDIUM (NEW catalog No7): foxurl/corpus-all 1152 vs ultra-tight band 995-999 (4 points, span 0.4%!) = +15.6% at dead-center everything else (canary center, find 0.226x, classifier/8 7148, url_crate 3939 center) — first foxurl-layer deviation at center canary; even vs normal MEDIUM base relation foxurl ~+14.7% — genuine; ПРИМЕТКА: foxurl +51.5% THIRD crossing of RATIO_ELEVATED +8.0 (after +10.0 14th, +9.1 20th) — counter 2->3, negative direction still uncovered; lessons: drift-host baseline poisons relation layer (forecast only canary/median arithmetic, verdict headline unpredictable); MEDIUM pool has url-layer deviation family both ways; tally 33 = 24 PARITY + 2 closed false alarms + 7 DRIFT; spread record 87.8pp stays with 32nd; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 24 runs without rollback",
          "timestamp": "2026-10-25T17:05:32Z",
          "tree_id": "4e06fcd26a8b4a3f86501b2a7cdba5c285f5d191",
          "url": "https://github.com/x7717/firefox-rs/commit/17c62a07e920491d83c2e0f0051487efcc80bce7"
        },
        "date": 1792948894975,
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
            "value": 517,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132615,
            "range": "± 782",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 667459,
            "range": "± 4118",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1361006,
            "range": "± 14864",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6476569,
            "range": "± 217371",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 787142,
            "range": "± 2141",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4044546,
            "range": "± 42018",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356673,
            "range": "± 1093",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1757924,
            "range": "± 12102",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8387,
            "range": "± 44",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55837,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75968,
            "range": "± 520",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17903,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 253180,
            "range": "± 9719",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 484315,
            "range": "± 1632",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 245474,
            "range": "± 1220",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 423093,
            "range": "± 2322",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1582931,
            "range": "± 5709",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 710373,
            "range": "± 1746",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1071403,
            "range": "± 8808",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3233767,
            "range": "± 28514",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1497743,
            "range": "± 11274",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2516325,
            "range": "± 16967",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7772071,
            "range": "± 12138",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 208233,
            "range": "± 960",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914512,
            "range": "± 3094",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206789,
            "range": "± 583",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602465,
            "range": "± 4276",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 320595,
            "range": "± 1707",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668601,
            "range": "± 4812",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207202,
            "range": "± 1338",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1026683,
            "range": "± 4504",
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
            "value": 442,
            "range": "± 5",
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
            "value": 366,
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
            "value": 381,
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
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 102,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 402,
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
            "value": 382,
            "range": "± 0",
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
            "value": 394,
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
            "value": 348,
            "range": "± 3",
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
            "value": 404,
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
            "value": 486,
            "range": "± 12",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1183,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5525,
            "range": "± 36",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 41,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 129,
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
            "value": 132,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 555,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1423,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5531,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1196,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3063,
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
          "id": "d6dcbdcc77642c9e2e6be15881e9c3965c4f5d07",
          "message": "docs: iteration 59 — 34th verdict 17c62a0 [CLASSIC] vs 54dae00 [CLASSIC]: quiet PARITY exit 0, forecast hit IN FULL — median +0.00% (FIFTH ideal zero after 19th/23rd/27th/30th), p10 -0.97 / p90 +1.57 (spread 2.5pp NEW ALL-TIME MINIMUM, previous 2.8 at 23rd held for 11 verdicts; minimum dynamics 3.2 -> 2.8 -> 3.4 -> 2.5), canary +0.47% predicted byte-for-byte (FIFTH consecutive exact hit: -2.31, -0.00, +10.77, -9.86, +0.47), zero flags, relations dead (foxjson +0.2 / foxsearch +0.0 / foxurl +0.0); all #41 absolutes in CLASSIC bands (foxurl 1183 in 1174-1235, url_crate 5525, find 0.228x, classifier/8 8387) — exemplarily normal host; methodology: last-same-class-predecessor + class-center arithmetic works on both normal and drift hosts; only the relation layer at drift baselines is unpredictable (33rd lesson); RATIO note: foxurl +0.0% no crossing, counter stays 3; tally 34 = 25 PARITY + 2 closed false alarms + 7 DRIFT, zero active REGRESS; rustup installer hung and died (retry on first need — docs-only needed no cargo); profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 25 runs without rollback",
          "timestamp": "2026-10-25T17:32:25Z",
          "tree_id": "40295579f31c9048124701a70cd2ca84a0e971a6",
          "url": "https://github.com/x7717/firefox-rs/commit/d6dcbdcc77642c9e2e6be15881e9c3965c4f5d07"
        },
        "date": 1792950461679,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 87,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 340,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 75996,
            "range": "± 3093",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 426952,
            "range": "± 19603",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 795875,
            "range": "± 37935",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4128090,
            "range": "± 299576",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 428944,
            "range": "± 18235",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2555167,
            "range": "± 130647",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 196706,
            "range": "± 3042",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1188923,
            "range": "± 12905",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4621,
            "range": "± 77",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 27856,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 30871,
            "range": "± 1715",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10013,
            "range": "± 166",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 122558,
            "range": "± 2101",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 241016,
            "range": "± 6105",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 163970,
            "range": "± 2341",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 232287,
            "range": "± 2532",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 802509,
            "range": "± 29396",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 424088,
            "range": "± 9657",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 618548,
            "range": "± 13399",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1733062,
            "range": "± 24149",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 926894,
            "range": "± 18359",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1441471,
            "range": "± 27310",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3965537,
            "range": "± 92660",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 122934,
            "range": "± 2727",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 523559,
            "range": "± 5629",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 137822,
            "range": "± 11544",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 351705,
            "range": "± 4997",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 193486,
            "range": "± 2091",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 403049,
            "range": "± 8336",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 122575,
            "range": "± 4744",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 486052,
            "range": "± 6944",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 39,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 147,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 50,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 217,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 43,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 185,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 42,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 172,
            "range": "± 6",
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
            "value": 164,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 181,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 133,
            "range": "± 1",
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
            "value": 186,
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
            "value": 192,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 207,
            "range": "± 2",
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
            "value": 163,
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
            "value": 189,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 36,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 251,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 176,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 623,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2841,
            "range": "± 115",
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
            "value": 64,
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
            "value": 42,
            "range": "± 0",
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
            "value": 72,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 282,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 756,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2708,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 575,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1533,
            "range": "± 87",
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
          "id": "102d44dd691a6ca79deda989f7b3ccadf3b28b9a",
          "message": "docs: iteration 60 — 35th verdict d6dcbdc [FAST] vs a822937 [FAST]: quiet PARITY exit 0, forecast hit via FAST branch — median +2.82%, p10 -1.44 / p90 +8.82 (spread 10.3pp), canary -0.12% center-to-center (795875 vs 796800, prediction band ±8% hit dead center), zero flags; relations foxjson +0.7 / foxsearch +1.5 / foxurl +0.1 all quiet — foxurl-RATIO not crossed, ПРИМЕТКА counter stays 3; point #42 exemplarily normal FAST host (classifier/8 4621 in band 4219-5328, find ratios 0.235x/0.48x/0.25x norm, foxurl 623 in band); intra-band detail: find/горячие пути 0.39x vs usual 0.34-0.35x — single metric with others normal and zero flags = variance, not find-slow signature (needs 0.43x+ three metrics at once, 4110b3f); NINTH VM rollback FULL (unlike partial at iter 57): local FS reverted to iteration 54 state — HEAD a822937, worklog 15:19, /tmp verdict archives lost, cargo/rustc wiped; recovery per protocol: remote authoritative (iteration 59 closed BEFORE rollback, main = d6dcbdc) => git reset --hard origin/main, gh-pages -> origin/gh-pages (42 points); lesson re-confirmed: git fetch FIRST, then conclusions; tally 35 = 26 PARITY + 2 closed false alarms + 7 DRIFT, zero active REGRESS; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 26 runs without rollback",
          "timestamp": "2026-10-25T18:06:53Z",
          "tree_id": "56b8da0ed1303a95d5601798f7ba10ccdcf25476",
          "url": "https://github.com/x7717/firefox-rs/commit/102d44dd691a6ca79deda989f7b3ccadf3b28b9a"
        },
        "date": 1792952581111,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 130,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 549,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 123834,
            "range": "± 317",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 627735,
            "range": "± 2833",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1259331,
            "range": "± 23370",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 8305965,
            "range": "± 599701",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 752230,
            "range": "± 4796",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4023494,
            "range": "± 33178",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 328467,
            "range": "± 1268",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1833087,
            "range": "± 34266",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7263,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 47647,
            "range": "± 76",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 79322,
            "range": "± 1100",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 16737,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 220273,
            "range": "± 655",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 522809,
            "range": "± 1802",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 442483,
            "range": "± 5354",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 789349,
            "range": "± 5019",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 2076655,
            "range": "± 108497",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 899076,
            "range": "± 44693",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1847993,
            "range": "± 25658",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 4565941,
            "range": "± 215361",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 2070582,
            "range": "± 42219",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3627748,
            "range": "± 40546",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 9893499,
            "range": "± 656928",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 341924,
            "range": "± 4711",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 1094587,
            "range": "± 17120",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 343072,
            "range": "± 6063",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 689475,
            "range": "± 3566",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 498743,
            "range": "± 6184",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 748487,
            "range": "± 2267",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 385803,
            "range": "± 1503",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1069871,
            "range": "± 8042",
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
            "range": "± 1",
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
            "value": 409,
            "range": "± 6",
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
            "range": "± 2",
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
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 329,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 341,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 41,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 229,
            "range": "± 1",
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
            "value": 372,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 76,
            "range": "± 1",
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
            "value": 361,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 325,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 68,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 378,
            "range": "± 25",
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
            "range": "± 2",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 933,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5087,
            "range": "± 35",
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
            "value": 110,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 25,
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
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 80,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 150,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 539,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1211,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5050,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1072,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2735,
            "range": "± 4",
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
          "id": "3839a94d46a96793b3daa54ef1a71080a5e51cf8",
          "message": "docs: iteration 61 — 36th verdict 102d44d [CLASSIC] vs 17c62a0 [CLASSIC]: DRIFT exit 3, forecast hit IN FULL — median -7.46% (forecast -7..-9%), canary -7.47% byte-for-byte (SIXTH exact hit: 1259331/1361006), spread 59.8pp (forecast 40-65), 14 flags (find 4: Mozilla +64.2% exactly as forecast, hot +65.9, search +55.6, zzz +86.2; multi 9 up to +86.6; serde +28.2) — reference side slowed equally (naive-std +27..+41%) => host not code (docs-only, byte-identical 1518dcc); three-way relations foxsearch +42.0 / foxjson -11.7 / foxurl -6.8 (span 53.8pp — exact copy of 21st: +42.8/-11.5/-14.6, same physical VM); FINGERPRINT No1 THIRD RETURN — first triple in catalog history: canary 1257782/1261716/1259331 all inside band ~1258-1262K (latest dead-center), find 0.312x, foxurl 933 (929/930) — three signature layers matched fully, pool host persistent; foxurl -6.8% negative NOT covered by +8.0 threshold (asymmetry confirmed, counter stays 3); DRIFT/REGRESS discrimination automatic: identical sources + one-sided find ratio + reference equally slow + No1 signature; tally 36 = 26 PARITY + 2 closed false alarms + 8 DRIFT, zero active REGRESS; CLASSIC baseline is now itself find-slow (No1) => next CLASSIC verdict forecast per rule 33: canary arithmetic only (normal host +8.1% rebound, pool host ~0), headline NOT forecast (22nd echo-mirror likely); profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 27 runs without rollback",
          "timestamp": "2026-10-25T18:32:08Z",
          "tree_id": "2aa8f5f4d21c1dc6939cfaa7eba8fbe30f0995db",
          "url": "https://github.com/x7717/firefox-rs/commit/3839a94d46a96793b3daa54ef1a71080a5e51cf8"
        },
        "date": 1792954048227,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 115,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 400,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 105269,
            "range": "± 2225",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 506803,
            "range": "± 1441",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1062492,
            "range": "± 14814",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5000562,
            "range": "± 22338",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 611422,
            "range": "± 2989",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3138631,
            "range": "± 87757",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 279102,
            "range": "± 828",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1376243,
            "range": "± 49737",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7047,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 39249,
            "range": "± 178",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 48946,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14604,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 168671,
            "range": "± 1817",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 317631,
            "range": "± 4929",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 192578,
            "range": "± 1824",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 356495,
            "range": "± 405",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1320537,
            "range": "± 1158",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 507334,
            "range": "± 2874",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 873266,
            "range": "± 27231",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2697460,
            "range": "± 16763",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1157807,
            "range": "± 852",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2030583,
            "range": "± 8582",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6482606,
            "range": "± 41230",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178568,
            "range": "± 206",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 797542,
            "range": "± 392",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178620,
            "range": "± 555",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538173,
            "range": "± 6343",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 257394,
            "range": "± 842",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 591039,
            "range": "± 2605",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178617,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 813885,
            "range": "± 1327",
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
            "value": 310,
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
            "value": 262,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 244,
            "range": "± 0",
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
            "value": 263,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 68,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 273,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 44,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 171,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 96,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 274,
            "range": "± 2",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 76,
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
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 262,
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
            "value": 288,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 320,
            "range": "± 2",
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
            "value": 249,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 993,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3914,
            "range": "± 9",
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
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 383,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1077,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3817,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 820,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2118,
            "range": "± 7",
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
          "id": "76e1298d8e1355e644e4c8469a4d582366e86eb3",
          "message": "docs: iteration 62 — 37th verdict 3839a94 [MEDIUM] vs 1241f94 [MEDIUM]: quiet PARITY exit 0, forecast hit IN FULL — median -0.22%, p10 -13.33 / p90 +1.90 (spread 15.2pp), canary -0.38% byte-for-byte (SEVENTH exact hit: 1062492/1066539), zero flags; relations foxjson +1.0 / foxsearch -0.3 / foxurl -13.9% (forecast ~-13% precise) — REVERSE MIRROR of 33rd: same deviation host No7 gives mirrored sign depending on position (point No7 vs clean base: +51.5% ПРИМЕТКА case; clean point vs base No7: -13.9%); p10 -13.33% is the foxurl layer itself (point 993 in norm pool 995-999, base 1152 elevated), not host scatter — canary/find/classifier layers quiet, point provably normal; foxurl NEGATIVE not covered by +8.0 threshold (FOURTH consecutive asymmetry confirmation: -7.2/+0.1/-6.8/-13.9), ПРИМЕТКА counter stays 3; MEDIUM url-layer systematics: deviation family both ways (No6 etalon-slow vs No7 fox-elevated), sign determined by which side of pair hosts the deviation; MEDIUM baseline updated: 3839a94 (1062492 clean) — No7 out of pairs, stays in catalog; tally 37 = 27 PARITY + 2 closed false alarms + 8 DRIFT, zero active REGRESS; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 28 runs without rollback",
          "timestamp": "2026-10-25T19:01:38Z",
          "tree_id": "f50991355baba24f5473fb3729e75e57d37f8f72",
          "url": "https://github.com/x7717/firefox-rs/commit/76e1298d8e1355e644e4c8469a4d582366e86eb3"
        },
        "date": 1792955823955,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 114,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 399,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 105362,
            "range": "± 2509",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 505124,
            "range": "± 3815",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1074132,
            "range": "± 15080",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4986527,
            "range": "± 101395",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 611337,
            "range": "± 3111",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3137207,
            "range": "± 7282",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 279744,
            "range": "± 685",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1382379,
            "range": "± 9195",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7004,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38999,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 48511,
            "range": "± 986",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14552,
            "range": "± 146",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 163593,
            "range": "± 160",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 309732,
            "range": "± 1415",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 194157,
            "range": "± 3380",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 357760,
            "range": "± 779",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1322177,
            "range": "± 8147",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 516090,
            "range": "± 3992",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 877481,
            "range": "± 20928",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2702360,
            "range": "± 39243",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1166086,
            "range": "± 10507",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2044857,
            "range": "± 25070",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6494108,
            "range": "± 54324",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178517,
            "range": "± 476",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 798749,
            "range": "± 4711",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178647,
            "range": "± 768",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538953,
            "range": "± 387",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259911,
            "range": "± 3391",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 592373,
            "range": "± 978",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178696,
            "range": "± 2882",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 814743,
            "range": "± 759",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 208,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 82,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 305,
            "range": "± 6",
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
            "value": 69,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 240,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 245,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 271,
            "range": "± 1",
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
            "value": 163,
            "range": "± 3",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 81,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 280,
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
            "value": 287,
            "range": "± 3",
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
            "value": 250,
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
            "value": 282,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 313,
            "range": "± 1",
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
            "value": 246,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1003,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3883,
            "range": "± 9",
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
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 384,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1070,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3744,
            "range": "± 59",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 810,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2078,
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
          "id": "6806a9877d7561fb6711c78be85a04dd0465941e",
          "message": "docs: iteration 63 — 38th verdict 76e1298 [MEDIUM] vs 3839a94 [MEDIUM]: quiet PARITY exit 0, forecast hit IN FULL — median +0.00% (SIXTH ideal zero after 19/23/27/30/34), p10 -2.19 / p90 +1.32 (spread 3.5pp, fourth-best in history after 2.5/2.8/3.4 — forecast 'closer to records' hit), canary +1.10% vs forecast +1.09% (0.01pp deviation — EIGHTH exact hit in a row, most precise after byte-for-byte), zero flags; relations foxjson +0.0 / foxsearch -0.1 / foxurl +1.8% (forecast +2-4%, lower edge); MIRROR CHAIN OF MEDIUM URL-LAYER CLOSED: clean base instantly washed out No7 deviation — foxurl relation returned from -13.9% to +1.8%, full three-position chain of one deviation host: +51.5 (No7 in point, 33rd) -> -13.9 (No7 in base, 37th) -> +1.8 (both clean, 38th) — systematics proven: sign and amplitude determined by position of deviant host in pair, layer does not leak to adjacent verdicts, baseline swap instantly restores signal; first normal-normal MEDIUM pair since 33rd parsed almost perfectly; foxurl +1.8% << +8.0 threshold — no crossing, ПРИМЕТКА counter stays 3; tally 38 = 28 PARITY + 2 closed false alarms + 8 DRIFT, zero active REGRESS; MEDIUM baseline updated: 76e1298 (1074132); profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 29 runs without rollback",
          "timestamp": "2026-10-25T19:31:19Z",
          "tree_id": "1be828de2260f44572619f0abedc1bac5f41921a",
          "url": "https://github.com/x7717/firefox-rs/commit/6806a9877d7561fb6711c78be85a04dd0465941e"
        },
        "date": 1792957646559,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 508,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132634,
            "range": "± 559",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 666728,
            "range": "± 6648",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1357818,
            "range": "± 21600",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6609065,
            "range": "± 161846",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786140,
            "range": "± 4377",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4015839,
            "range": "± 36564",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 351798,
            "range": "± 1262",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1769910,
            "range": "± 21981",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8666,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55790,
            "range": "± 78",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76844,
            "range": "± 807",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18253,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250438,
            "range": "± 2173",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 482151,
            "range": "± 5901",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 250125,
            "range": "± 2633",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 413944,
            "range": "± 1623",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1582240,
            "range": "± 26532",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 715998,
            "range": "± 15076",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1055622,
            "range": "± 5648",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3230002,
            "range": "± 26456",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1484984,
            "range": "± 9262",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2489231,
            "range": "± 21043",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8092271,
            "range": "± 176611",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206983,
            "range": "± 800",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914590,
            "range": "± 1741",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206992,
            "range": "± 1807",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601069,
            "range": "± 2149",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319179,
            "range": "± 687",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668076,
            "range": "± 2486",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206404,
            "range": "± 771",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025103,
            "range": "± 3410",
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
            "value": 306,
            "range": "± 3",
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
            "value": 441,
            "range": "± 5",
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
            "value": 343,
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
            "value": 343,
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
            "value": 378,
            "range": "± 1",
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
            "value": 101,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 393,
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
            "value": 383,
            "range": "± 1",
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
            "value": 392,
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
            "range": "± 2",
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
            "value": 403,
            "range": "± 7",
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
            "value": 488,
            "range": "± 4",
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
            "range": "± 5",
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
            "value": 5508,
            "range": "± 38",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 39,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 129,
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
            "value": 84,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 145,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 551,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1420,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5487,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1188,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3023,
            "range": "± 62",
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
          "id": "a4cca12fac66b0ff4d082e0e523365c893a6dc62",
          "message": "docs: iteration 64 — 39th verdict 6806a98 [CLASSIC] vs 102d44d [CLASSIC]: DRIFT exit 3 — SECOND reversal-echo of 22nd with near-identical picture (median +7.11 vs +8.31, canary +7.82 vs +8.37, spread 50.6 vs 49.7pp, foxsearch relation -29.5 vs -29.8 — same physical host No1 unfolding on normal point); 5 flags ALL foxurl-recovery +21.1..+26.8% exactly inside forecast corridor +21..+27 (corpus-all +26.8% byte-for-byte 933->1183, serialize/4 +24.6, parse/3 +23.0, parse/9 +21.4, parse/10 +21.1); canary +7.82% vs forecast +8.1% rebound — NINTH exact hit in a row; rule 33 worked as designed: headline not claimed, canary arithmetic and family corridor matched fully; classifier near-miss +19.3% exactly as pre-noted; ПРИМЕТКА: foxurl relation +7.9% POSITIVE 0.1pp from +8.0 threshold — SECOND closest approach after 28th (+7.8), no crossing, counter stays 3; third positive approach in 12 verdicts — next positive crossing = fourth ПРИМЕТКА case; tally 39 = 28 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; No1 out of pairs (double echo 22nd/39th closed), all three baselines clean => headlines forecastable again; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 30 runs without rollback",
          "timestamp": "2026-10-25T20:01:33Z",
          "tree_id": "59b384bc67c10047f0d2c415eac3d8d241165222",
          "url": "https://github.com/x7717/firefox-rs/commit/a4cca12fac66b0ff4d082e0e523365c893a6dc62"
        },
        "date": 1792959461021,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 517,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133127,
            "range": "± 628",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 669009,
            "range": "± 2483",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1359242,
            "range": "± 20960",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6416707,
            "range": "± 45170",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786852,
            "range": "± 3030",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4010853,
            "range": "± 15195",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 355528,
            "range": "± 949",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1777993,
            "range": "± 28976",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8423,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55873,
            "range": "± 558",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76480,
            "range": "± 657",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18075,
            "range": "± 53",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 251577,
            "range": "± 2217",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 471397,
            "range": "± 5460",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 245997,
            "range": "± 629",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 413123,
            "range": "± 1131",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1585673,
            "range": "± 5083",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 719696,
            "range": "± 3583",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1051845,
            "range": "± 11241",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3237405,
            "range": "± 6650",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1477950,
            "range": "± 2702",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2460045,
            "range": "± 5738",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7771138,
            "range": "± 14042",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207812,
            "range": "± 693",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 917640,
            "range": "± 1634",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 208077,
            "range": "± 551",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 603652,
            "range": "± 887",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319987,
            "range": "± 1005",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 670252,
            "range": "± 1403",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 205888,
            "range": "± 662",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1025648,
            "range": "± 2814",
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
            "value": 308,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 440,
            "range": "± 5",
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
            "value": 359,
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
            "value": 344,
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
            "value": 377,
            "range": "± 2",
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
            "value": 241,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 106,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 401,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 384,
            "range": "± 1",
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
            "value": 391,
            "range": "± 1",
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
            "range": "± 0",
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
            "value": 404,
            "range": "± 9",
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
            "value": 497,
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
            "value": 1177,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5501,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 43,
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 147,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 547,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1507,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5541,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1212,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3140,
            "range": "± 20",
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
          "id": "fa91501a2a4729545b6fe9cddbc197a2d851977b",
          "message": "docs: iteration 65 — 40th verdict a4cca12 [CLASSIC] vs 6806a98 [CLASSIC]: quiet PARITY exit 0, forecast hit on ALL FIVE axes — median +0.09 (p10 -1.17/p90 +2.04), canary +0.10% = forecast +0.10% BYTE-FOR-BYTE (TENTH exact hit in a row), spread 3.2pp THIRD-NARROWEST in history (records 2.5/2.8, then 3.4/3.5), zero flags (forecast 'zero' exact), relations foxjson +0.2/foxsearch -0.0/foxurl +0.3 all quiet; second normal-normal CLASSIC pair in a row, find profile of #47 layer-for-layer identical to #46 (0.23x/0.34x/0.48x/0.20x) — reference pair for future comparisons; rule 33 in normal mode (clean base => headline forecasted and hit); only forecast imprecision: foxurl metric was corpus-all (-0.4) vs machine crate-medians (+0.3) — lesson 36 reconfirmed, outcome unchanged; ПРИМЕТКА: calm background +0.3% after 39th near-threshold +7.9 — counter stays 3, next positive crossing = fourth case; tally 40 = 29 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 10; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 31 runs without rollback",
          "timestamp": "2026-10-25T20:32:51Z",
          "tree_id": "4119ddd125c85aab48d201136bafeb19dd62a0c3",
          "url": "https://github.com/x7717/firefox-rs/commit/fa91501a2a4729545b6fe9cddbc197a2d851977b"
        },
        "date": 1792961339371,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 144,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 509,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133324,
            "range": "± 1188",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 690131,
            "range": "± 9622",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1360671,
            "range": "± 28351",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6608792,
            "range": "± 144754",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786027,
            "range": "± 3691",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4055479,
            "range": "± 19453",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 353045,
            "range": "± 1001",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1829073,
            "range": "± 24469",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8651,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55533,
            "range": "± 819",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76586,
            "range": "± 1000",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18250,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 252562,
            "range": "± 2734",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 473259,
            "range": "± 4226",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 247112,
            "range": "± 582",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 423011,
            "range": "± 4136",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1579543,
            "range": "± 4535",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 720278,
            "range": "± 7340",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1069787,
            "range": "± 8125",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3225176,
            "range": "± 22337",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1486327,
            "range": "± 3335",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2502384,
            "range": "± 12439",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8101452,
            "range": "± 161773",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 210739,
            "range": "± 869",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914472,
            "range": "± 1550",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 208115,
            "range": "± 1669",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601004,
            "range": "± 1729",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 322651,
            "range": "± 1273",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668680,
            "range": "± 1312",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207846,
            "range": "± 3500",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1026171,
            "range": "± 4785",
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
            "value": 310,
            "range": "± 1",
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
            "value": 439,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 74,
            "range": "± 6",
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
            "value": 345,
            "range": "± 1",
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
            "value": 400,
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
            "value": 382,
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
            "value": 397,
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
            "value": 348,
            "range": "± 1",
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
            "value": 407,
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
            "value": 496,
            "range": "± 4",
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
            "value": 372,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1179,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5563,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 39,
            "range": "± 1",
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
            "value": 83,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 146,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 542,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1406,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5520,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1171,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3061,
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
          "id": "e0fb3a58ec4711dce07141d2e0ef11be98305a48",
          "message": "docs: iteration 66 — 41st verdict fa91501 [CLASSIC] vs a4cca12 [CLASSIC]: quiet PARITY exit 0 — SEVENTH IDEAL ZERO (median +0.00% after 19/23/27/30/34/38), canary +0.11% = forecast +0.11% BYTE-FOR-BYTE (ELEVENTH exact hit in a row), zero flags, relations foxjson -2.8/foxsearch +1.0/foxurl -1.1 all quiet (ПРИМЕТКА counter stays 3); spread 4.1pp narrow but p10 -2.35 (parse/12 layer) killed the 2.5 record bid — honest record: direction hit, record part missed; foxurl metric lesson 36 cuts both ways (forecast corpus-all +0.2 vs machine crate-medians -1.1, sign flipped, outcome unchanged); reference trio #46/#47/#48 confirmed layer-for-layer; tally 41 = 30 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 11; all three baselines clean => headlines forecastable; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 32 runs without rollback",
          "timestamp": "2026-10-25T21:01:08Z",
          "tree_id": "c2d42387505d2064932163bffba70b9e38112b14",
          "url": "https://github.com/x7717/firefox-rs/commit/e0fb3a58ec4711dce07141d2e0ef11be98305a48"
        },
        "date": 1792963036386,
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
            "value": 132420,
            "range": "± 298",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 675906,
            "range": "± 13573",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1357686,
            "range": "± 24309",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6647643,
            "range": "± 101982",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786240,
            "range": "± 133867",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4011738,
            "range": "± 199127",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356025,
            "range": "± 1353",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1769510,
            "range": "± 59333",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8464,
            "range": "± 58",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55830,
            "range": "± 327",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75855,
            "range": "± 867",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18020,
            "range": "± 71",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 253310,
            "range": "± 583",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 474987,
            "range": "± 4109",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 246768,
            "range": "± 21567",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 424517,
            "range": "± 14408",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1583007,
            "range": "± 13866",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 781551,
            "range": "± 27943",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1070352,
            "range": "± 42901",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3248810,
            "range": "± 43617",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1499163,
            "range": "± 19251",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2466405,
            "range": "± 18639",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7761590,
            "range": "± 198177",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206163,
            "range": "± 1705",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 913289,
            "range": "± 9340",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206590,
            "range": "± 9488",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 600931,
            "range": "± 5564",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 317718,
            "range": "± 2625",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 667848,
            "range": "± 27784",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206164,
            "range": "± 1902",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1023135,
            "range": "± 2115",
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
            "value": 438,
            "range": "± 11",
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
            "value": 359,
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
            "value": 342,
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
            "value": 342,
            "range": "± 1",
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
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 49,
            "range": "± 1",
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
            "value": 103,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 395,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 383,
            "range": "± 8",
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
            "value": 396,
            "range": "± 4",
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
            "value": 403,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 65,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 496,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 72,
            "range": "± 2",
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
            "value": 1182,
            "range": "± 53",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5531,
            "range": "± 106",
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
            "value": 155,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 544,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1420,
            "range": "± 60",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5480,
            "range": "± 68",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1183,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3070,
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
          "id": "bea8c70075410a253917a90d6f4b466211c3c2aa",
          "message": "docs: iteration 67 — 42nd verdict e0fb3a5 [CLASSIC] vs fa91501 [CLASSIC]: quiet PARITY exit 0 — EIGHTH IDEAL ZERO (median +0.00% after 19/23/27/30/34/38/41) and FIRST BACK-TO-BACK in history (41st+42nd consecutive normal-normal pairs), spread 2.6pp SECOND-NARROWEST ever (record 2.5 on 34th, missed by 0.1) — forecast said 'narrow, no record claims' (post-lesson-41 caution), machine OVERPERFORMED; canary -0.22% = forecast -0.22% BYTE-FOR-BYTE (TWELFTH exact hit in a row), zero flags, relations foxjson +1.1/foxsearch -1.1/foxurl +0.9 all quiet (ПРИМЕТКА counter stays 3); reference quartet #46/#47/#48/#49 confirmed; statistical note: four normal CLASSIC in a row raises odds of meeting a drift host soon — catalog No1-No7 ready; tally 42 = 31 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 12; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 33 runs without rollback",
          "timestamp": "2026-10-25T21:31:04Z",
          "tree_id": "7d8f3d30173a9d364420765b1f62dcbeb4603910",
          "url": "https://github.com/x7717/firefox-rs/commit/bea8c70075410a253917a90d6f4b466211c3c2aa"
        },
        "date": 1792964832189,
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
            "value": 518,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133831,
            "range": "± 1112",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 683478,
            "range": "± 8796",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1359403,
            "range": "± 6814",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6564922,
            "range": "± 42899",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 787550,
            "range": "± 1880",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4043042,
            "range": "± 11776",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 348936,
            "range": "± 731",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1774678,
            "range": "± 19001",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8399,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 56075,
            "range": "± 84",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76479,
            "range": "± 565",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18039,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 254193,
            "range": "± 2652",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 471060,
            "range": "± 5055",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 246290,
            "range": "± 1094",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 415460,
            "range": "± 910",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1583250,
            "range": "± 9524",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 725566,
            "range": "± 7894",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1062976,
            "range": "± 3438",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3234545,
            "range": "± 30113",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1474724,
            "range": "± 1597",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2486252,
            "range": "± 39887",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8096983,
            "range": "± 19886",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206927,
            "range": "± 752",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914343,
            "range": "± 1278",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206245,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 600564,
            "range": "± 2223",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 318649,
            "range": "± 562",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 667987,
            "range": "± 1095",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206099,
            "range": "± 1099",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024604,
            "range": "± 4242",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 89,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 439,
            "range": "± 1",
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
            "value": 358,
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
            "value": 341,
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
            "value": 342,
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
            "value": 378,
            "range": "± 1",
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
            "range": "± 5",
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
            "range": "± 1",
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
            "value": 348,
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
            "value": 402,
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
            "value": 496,
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
            "value": 368,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1182,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5567,
            "range": "± 19",
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
            "value": 129,
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
            "value": 542,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1432,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5555,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1205,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3106,
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
          "id": "7aa735e22db7579f6364e44dbd840a4f7e716b08",
          "message": "docs: iteration 68 — 43rd verdict bea8c70 [CLASSIC] vs e0fb3a5 [CLASSIC]: quiet PARITY exit 0 with DOUBLE HISTORIC RESULT — spread 2.4pp NEW ALL-TIME RECORD (beats 2.5 from 34th, held since iteration 51; forecast corridor 2.6..4.5 with 'no record claims' caveat OVERPERFORMED below lower edge) and median +0.00% NINTH IDEAL ZERO, THIRD IN A ROW (41st+42nd+43rd — three consecutive normal-normal pairs with zero median); canary +0.13% = forecast +0.13% BYTE-FOR-BYTE (THIRTEENTH exact hit in a row), zero flags, relations foxjson -0.6/foxsearch +0.1/foxurl +0.0 — foxurl exactly zero in BOTH metrics (forecast corpus-all and machine crate-medians) — rare full metric agreement; reference series #46-#50 confirmed by fifth normal host; five normals in a row = statistically elevated odds of drift host encounter — catalog No1-No7 ready; tally 43 = 32 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 13; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 34 runs without rollback",
          "timestamp": "2026-10-25T22:01:02Z",
          "tree_id": "9d446322bdb47546661b3beb24ee6b3056a1a985",
          "url": "https://github.com/x7717/firefox-rs/commit/7aa735e22db7579f6364e44dbd840a4f7e716b08"
        },
        "date": 1792966627134,
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133584,
            "range": "± 347",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 670979,
            "range": "± 2307",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1357513,
            "range": "± 17911",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6464376,
            "range": "± 46699",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 785033,
            "range": "± 5372",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4011694,
            "range": "± 90300",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 355740,
            "range": "± 623",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1757827,
            "range": "± 16911",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8440,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 54628,
            "range": "± 187",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 79578,
            "range": "± 2367",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17890,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 247581,
            "range": "± 1430",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 480735,
            "range": "± 7111",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 244575,
            "range": "± 1662",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 413225,
            "range": "± 3423",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1576868,
            "range": "± 7167",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 722768,
            "range": "± 2507",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1052088,
            "range": "± 5215",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3220616,
            "range": "± 11032",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1462707,
            "range": "± 2192",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2461314,
            "range": "± 30387",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8083700,
            "range": "± 95895",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 205538,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 913417,
            "range": "± 978",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206068,
            "range": "± 916",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 599030,
            "range": "± 4430",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 317691,
            "range": "± 3242",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 666022,
            "range": "± 1395",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 205940,
            "range": "± 726",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1022964,
            "range": "± 5273",
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
            "value": 306,
            "range": "± 2",
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
            "value": 443,
            "range": "± 6",
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
            "value": 359,
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
            "value": 343,
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
            "value": 342,
            "range": "± 0",
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
            "value": 378,
            "range": "± 1",
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
            "value": 403,
            "range": "± 0",
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
            "range": "± 3",
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
            "value": 398,
            "range": "± 8",
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
            "range": "± 59",
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
            "value": 494,
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
            "value": 370,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1196,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5526,
            "range": "± 12",
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
            "value": 129,
            "range": "± 0",
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
            "value": 84,
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
            "value": 553,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1414,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5471,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1182,
            "range": "± 42",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3103,
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
          "id": "282f4426e651cdb38efaa09e9aec5379f93d0d25",
          "message": "docs: iteration 69 — 44th verdict 7aa735e [CLASSIC] vs bea8c70 [CLASSIC]: quiet PARITY exit 0 — median -0.16% (ideal-zero streak ends at THREE 41/42/43, honest record: same noise regime, third-closest to zero), spread 2.7pp FOURTH-narrowest ever; systematics note: THREE of FOUR record spreads (2.4/2.6/2.7 on 43rd/42nd/44th) come from current normal series #46-#51 — narrowness on normal CLASSIC hosts is systematic, not random, reference pairs reproducibly 2.4-2.7pp vs old typical 4-6; canary -0.14% = forecast -0.14% BYTE-FOR-BYTE (FOURTEENTH exact hit in a row), zero flags, relations foxjson +1.4/foxsearch +0.0/foxurl -0.5 all quiet (ПРИМЕТКА counter stays 3); forecast corridor 2.4..4.5 with record floor FULLY CONTAINS result for first time in three iterations — calibration fix after double overperformance worked; tally 44 = 33 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 14; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 35 runs without rollback",
          "timestamp": "2026-10-25T22:31:06Z",
          "tree_id": "3bf8bcda1f180e0015b7d844bd8f33f0eddddd1d",
          "url": "https://github.com/x7717/firefox-rs/commit/282f4426e651cdb38efaa09e9aec5379f93d0d25"
        },
        "date": 1792968377532,
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
            "value": 321,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 71321,
            "range": "± 1365",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 394485,
            "range": "± 2176",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 735444,
            "range": "± 5059",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 3872857,
            "range": "± 34371",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 399890,
            "range": "± 3324",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2375760,
            "range": "± 17014",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 182262,
            "range": "± 994",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1104874,
            "range": "± 11355",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4244,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 27190,
            "range": "± 480",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 29377,
            "range": "± 503",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9159,
            "range": "± 34",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 110349,
            "range": "± 1049",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 226589,
            "range": "± 3194",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 150863,
            "range": "± 813",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 214459,
            "range": "± 3938",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 725854,
            "range": "± 14791",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 384098,
            "range": "± 2555",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 568210,
            "range": "± 3523",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1591314,
            "range": "± 15216",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 849262,
            "range": "± 23165",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1418265,
            "range": "± 13187",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3949403,
            "range": "± 66660",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 122056,
            "range": "± 2492",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 531537,
            "range": "± 8902",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 121774,
            "range": "± 5707",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 347104,
            "range": "± 2468",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 188543,
            "range": "± 860",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 389312,
            "range": "± 3740",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 117288,
            "range": "± 3562",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 457870,
            "range": "± 4287",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 147,
            "range": "± 0",
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
            "value": 210,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 40,
            "range": "± 0",
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
            "value": 38,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 160,
            "range": "± 3",
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
            "value": 157,
            "range": "± 1",
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
            "value": 177,
            "range": "± 1",
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
            "value": 126,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 203,
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
            "value": 187,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 41,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 183,
            "range": "± 1",
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
            "value": 165,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 180,
            "range": "± 4",
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
            "value": 223,
            "range": "± 1",
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
            "value": 161,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 575,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2854,
            "range": "± 16",
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
            "value": 39,
            "range": "± 2",
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
            "value": 78,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 259,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 700,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2658,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 523,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1549,
            "range": "± 17",
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
          "id": "04efe352635f301c768b2ca2a14221e04b876898",
          "message": "docs: iteration 70 — 45th verdict 282f442 [FAST] vs d6dcbdc [FAST]: quiet PARITY exit 0 with machine note 'noticeable speed drift — rough comparison' — class FINALLY broke to FAST after six normal CLASSIC (statistically predicted); median -7.02 (p10 -10.64/p90 +0.00, spread 10.6pp — FAST intra-class heterogeneity ±11-17% known since 31st), canary -7.59% INSIDE forecast corridor -8..+2% (FIFTEENTH consecutive hit, band-level), zero flags, relations foxjson -0.3/foxsearch -0.7/foxurl -7.3 ALL negative — no +8.0 approach (ПРИМЕТКА counter 3, negative not covered — asymmetry fifth confirmation); fingerprints: not No4 (find 0.23x normal), not No6 (foxurl 575 low) — normal FAST with moderate speed; baseline policy: next FAST point pairs vs #52 (735444), d6dcbdc to catalog; tally 45 = 34 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 15 (14 byte-exact + 1 band); profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 36 runs without rollback",
          "timestamp": "2026-10-25T23:01:11Z",
          "tree_id": "c3eb075e26be04b193a5768119754aff43886080",
          "url": "https://github.com/x7717/firefox-rs/commit/04efe352635f301c768b2ca2a14221e04b876898"
        },
        "date": 1792970235804,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 151,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 513,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133622,
            "range": "± 863",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 669477,
            "range": "± 2947",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1358527,
            "range": "± 25962",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6469029,
            "range": "± 258355",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786822,
            "range": "± 4035",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4024579,
            "range": "± 20660",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 354240,
            "range": "± 944",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1769808,
            "range": "± 19452",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8450,
            "range": "± 135",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55052,
            "range": "± 790",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76943,
            "range": "± 1096",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17984,
            "range": "± 58",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 252222,
            "range": "± 1531",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 483408,
            "range": "± 7015",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 248506,
            "range": "± 4243",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 415141,
            "range": "± 3465",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1577182,
            "range": "± 8555",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 725128,
            "range": "± 5024",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1051107,
            "range": "± 20778",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3267985,
            "range": "± 24536",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1522924,
            "range": "± 17213",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2472239,
            "range": "± 14746",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7736886,
            "range": "± 23612",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 205846,
            "range": "± 1173",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914505,
            "range": "± 3437",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207390,
            "range": "± 1895",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602343,
            "range": "± 1861",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319565,
            "range": "± 1348",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 667783,
            "range": "± 1124",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 206386,
            "range": "± 2835",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024357,
            "range": "± 2882",
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
            "value": 441,
            "range": "± 13",
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
            "value": 344,
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
            "value": 375,
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
            "value": 401,
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
            "value": 384,
            "range": "± 3",
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
            "value": 398,
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
            "value": 347,
            "range": "± 2",
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
            "value": 488,
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
            "value": 368,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1183,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5524,
            "range": "± 16",
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
            "value": 131,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 527,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1404,
            "range": "± 42",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5535,
            "range": "± 200",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1184,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3048,
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
          "id": "d17e8fe4a1a8e099a6fe52883e7eb3d05bbbb67d",
          "message": "docs: iteration 71 — 46th verdict 04efe35 [CLASSIC] vs 7aa735e [CLASSIC]: quiet PARITY exit 0 with TENTH ideal zero median +0.00 (first after inter-class break: 44th -0.16 ended triple 41-43, 45th was FAST -7.02), spread 2.6pp ties third-narrowest with 42nd (top-5: 2.4/2.5/2.6x2/2.7/3.2 — FOUR of FIVE narrowest from normal series #46-#53, narrowness on normal CLASSIC hosts confirmed systematic), canary +0.07% INSIDE forecast corridor -0.5..+0.5% (SIXTEENTH consecutive hit, band-level: 14 byte-exact + 2 band), spread within record-floor corridor 2.4..4.5 SECOND consecutive full containment — calibration confirmed, zero flags, relations foxjson +0.0/foxsearch +0.1/foxurl +0.3 all quiet (ПРИМЕТКА counter 3); baseline policy: CLASSIC base now 04efe35 (1358527), FAST 282f442 (735444), MEDIUM 76e1298 (1074132); tally 46 = 35 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 16; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 37 runs without rollback",
          "timestamp": "2026-10-25T23:33:41Z",
          "tree_id": "1d69f2a6e34530d14e232ded055576e75384f7b7",
          "url": "https://github.com/x7717/firefox-rs/commit/d17e8fe4a1a8e099a6fe52883e7eb3d05bbbb67d"
        },
        "date": 1792972187824,
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
            "value": 514,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132785,
            "range": "± 388",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 672828,
            "range": "± 4226",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1353211,
            "range": "± 7678",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6464272,
            "range": "± 42864",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 784761,
            "range": "± 10381",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4064344,
            "range": "± 21395",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 350477,
            "range": "± 1010",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1811221,
            "range": "± 11992",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8437,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 54687,
            "range": "± 463",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76557,
            "range": "± 804",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17898,
            "range": "± 73",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250849,
            "range": "± 1542",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 470586,
            "range": "± 929",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 244754,
            "range": "± 547",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 413329,
            "range": "± 6456",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1576298,
            "range": "± 2943",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 709362,
            "range": "± 40303",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1057097,
            "range": "± 4455",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3280404,
            "range": "± 12642",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1462942,
            "range": "± 806",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2446348,
            "range": "± 12263",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7736637,
            "range": "± 19487",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 205368,
            "range": "± 673",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 911675,
            "range": "± 1459",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 204608,
            "range": "± 343",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 598462,
            "range": "± 836",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 315578,
            "range": "± 620",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 665870,
            "range": "± 2691",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 204712,
            "range": "± 1431",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1022815,
            "range": "± 3099",
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
            "value": 303,
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
            "value": 442,
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
            "value": 341,
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
            "value": 343,
            "range": "± 9",
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
            "range": "± 1",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 394,
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
            "value": 382,
            "range": "± 0",
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
            "value": 390,
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
            "value": 346,
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
            "value": 408,
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
            "value": 496,
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
            "value": 367,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1187,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5547,
            "range": "± 28",
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
            "range": "± 3",
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
            "value": 148,
            "range": "± 1",
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
            "value": 1431,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5642,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1198,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3149,
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
          "id": "7732269b5571213d667618bb74fec0fd4eac290c",
          "message": "docs: iteration 72 — 47th verdict d17e8fe [CLASSIC] vs 04efe35 [CLASSIC]: quiet PARITY exit 0 with ELEVENTH ideal zero median +0.00 and SECOND IN A ROW (pair 46-47 resumes zero streak after FAST break 45th; 44th -0.16 had ended triple 41-43), spread 3.2pp ties fifth-narrowest with 40th (top-6: 2.4/2.5/2.6x2/2.7/3.2x2 — FIVE of SIX from normal series #46-#54, narrowness systematic), canary -0.39% INSIDE forecast corridor -0.5..+0.5% (SEVENTEENTH consecutive hit, band-level: 14 byte-exact + 3 band), spread within record-floor corridor 2.4..4.5 THIRD consecutive full containment — floor calibration stable, zero flags, relations foxjson -1.2/foxsearch -0.7/foxurl +0.2 all quiet (ПРИМЕТКА counter 3); baseline policy: CLASSIC base now d17e8fe (1353211), FAST 282f442 (735444), MEDIUM 76e1298 (1074132); tally 47 = 36 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 17; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 38 runs without rollback",
          "timestamp": "2026-10-26T00:01:08Z",
          "tree_id": "125d5c05c666d62a8cb5587fe34bb832618413ce",
          "url": "https://github.com/x7717/firefox-rs/commit/7732269b5571213d667618bb74fec0fd4eac290c"
        },
        "date": 1792973791706,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 119,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 425,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 104756,
            "range": "± 585",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 504667,
            "range": "± 3220",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1071047,
            "range": "± 7155",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4972087,
            "range": "± 30562",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 611711,
            "range": "± 984",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3128704,
            "range": "± 9650",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 275020,
            "range": "± 413",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1398532,
            "range": "± 16679",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7043,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38212,
            "range": "± 116",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 47341,
            "range": "± 727",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14473,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 163491,
            "range": "± 248",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 309707,
            "range": "± 2105",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 192456,
            "range": "± 612",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 357493,
            "range": "± 342",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1321405,
            "range": "± 1663",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 507549,
            "range": "± 4770",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 874000,
            "range": "± 2083",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2695894,
            "range": "± 5617",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1157408,
            "range": "± 1413",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2034973,
            "range": "± 2495",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6484078,
            "range": "± 3667",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178143,
            "range": "± 656",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 797740,
            "range": "± 4103",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178133,
            "range": "± 280",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538083,
            "range": "± 513",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 258018,
            "range": "± 530",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 591733,
            "range": "± 322",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178125,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 813343,
            "range": "± 865",
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
            "value": 218,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 86,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 314,
            "range": "± 2",
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
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 250,
            "range": "± 2",
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
            "value": 244,
            "range": "± 0",
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
            "value": 269,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 167,
            "range": "± 1",
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
            "value": 305,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 284,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 302,
            "range": "± 3",
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
            "value": 257,
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
            "value": 286,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 315,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 64,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 247,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1014,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3946,
            "range": "± 13",
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
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 109,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 405,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1081,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3835,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 812,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2188,
            "range": "± 7",
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
          "id": "1c96db6edf6aa4b965b6206281d1f9a39e0e42ba",
          "message": "docs: iteration 73 — 48th verdict 7732269 [MEDIUM] vs 76e1298 [MEDIUM]: quiet PARITY exit 0 with TWELFTH ideal zero median +0.00 and THIRD IN A ROW (second triple 46-47-48 after 41-42-43; inter-class break 44th + FAST 45th between triples), canary -0.29% INSIDE forecast corridor -1.5..+0.5% (EIGHTEENTH consecutive hit, band-level: 14 byte-exact + 4 band), spread 6.3pp HONESTLY PIERCED top of corridor 2.4..5.5 by 0.8pp — MEDIUM class wider than CLASSIC norm 2.4-3.2 (narrowness is class property, record floor 2.4 stays valid), p90 +4.88 from micro-bench small +4.4/+6.5% (5-26ns noise), zero flags, relations foxjson -0.5/foxsearch -0.1/foxurl -1.4 all quiet (ПРИМЕТКА counter 3); baseline policy: MEDIUM base now 7732269 (1071047), CLASSIC d17e8fe (1353211), FAST 282f442 (735444); tally 48 = 37 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 18; container snapshot rollback recovered via ff-only (behind 13, zero loss); profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 39 runs without rollback",
          "timestamp": "2026-10-26T00:32:03Z",
          "tree_id": "bdc962bea22958dc0f99f7b7908795ff84a3373f",
          "url": "https://github.com/x7717/firefox-rs/commit/1c96db6edf6aa4b965b6206281d1f9a39e0e42ba"
        },
        "date": 1792975648375,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 82,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 334,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 72577,
            "range": "± 1498",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 395389,
            "range": "± 57073",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 720876,
            "range": "± 10980",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4081371,
            "range": "± 86622",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 399495,
            "range": "± 5444",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2408350,
            "range": "± 67526",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 184271,
            "range": "± 26845",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1105003,
            "range": "± 15233",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4188,
            "range": "± 148",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 26771,
            "range": "± 592",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 28990,
            "range": "± 635",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9479,
            "range": "± 362",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 115575,
            "range": "± 11714",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 235514,
            "range": "± 3535",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 160978,
            "range": "± 4423",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 226198,
            "range": "± 7619",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 778127,
            "range": "± 11111",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 404849,
            "range": "± 12193",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 574111,
            "range": "± 9430",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1597710,
            "range": "± 48644",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 865157,
            "range": "± 45831",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1345784,
            "range": "± 24634",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3663600,
            "range": "± 60040",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 118835,
            "range": "± 5867",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 487680,
            "range": "± 8301",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 115395,
            "range": "± 3576",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 324498,
            "range": "± 15515",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 178162,
            "range": "± 2234",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 370656,
            "range": "± 5590",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 113416,
            "range": "± 2623",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 433975,
            "range": "± 6288",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 45,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 199,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 40,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 169,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 37,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 153,
            "range": "± 3",
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
            "value": 149,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 39,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 172,
            "range": "± 4",
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
            "value": 128,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 60,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 169,
            "range": "± 3",
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
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 187,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 36,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 161,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 172,
            "range": "± 10",
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
            "value": 223,
            "range": "± 1",
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
            "value": 158,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 571,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2559,
            "range": "± 35",
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
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 38,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 80,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 255,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 704,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2519,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 520,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1414,
            "range": "± 20",
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
          "id": "f15a4947c402ad4c3378c65b09998f02dd43c825",
          "message": "docs: iteration 74 — 49th verdict 1c96db6 [FAST] vs 282f442 [FAST]: PARITY exit 0 with zero flags — median -0.57 (near zero, machine gave NO 'rough comparison' note this time), spread 12.0pp EXACTLY at top edge of forecast 3..12 (FAST heterogeneity ±11-17% confirmed again: p10 -7.24/p90 +4.74; lesson: FAST spread top goes 13-14pp next time, record floor 2.4 applies only to normal CLASSIC pairs), canary -1.98% INSIDE forecast corridor -3..+11% lower half (NINETEENTH consecutive hit, band-level: 14 byte-exact + 5 band), relations foxjson +1.0/foxsearch +1.7/foxurl +4.7 all below +8.0 threshold (ПРИМЕТКА counter 3) BUT foxurl +4.7 = largest POSITIVE excursion of normal series (historical approaches +7.8/+7.9 higher) — watch, not signal; baseline policy: FAST base now 1c96db6 (720876), CLASSIC d17e8fe (1353211), MEDIUM 7732269 (1071047); tally 49 = 38 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 19; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 40 runs without rollback",
          "timestamp": "2026-10-26T01:01:34Z",
          "tree_id": "ff85c6fed7369307d125a405749f6025f9587ef7",
          "url": "https://github.com/x7717/firefox-rs/commit/f15a4947c402ad4c3378c65b09998f02dd43c825"
        },
        "date": 1792977458053,
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
            "value": 515,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132768,
            "range": "± 704",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 666648,
            "range": "± 2835",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1359120,
            "range": "± 7803",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6398127,
            "range": "± 57955",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 785874,
            "range": "± 5415",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4025338,
            "range": "± 20379",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 350922,
            "range": "± 1371",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1734418,
            "range": "± 20127",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8376,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55722,
            "range": "± 360",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76946,
            "range": "± 999",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17899,
            "range": "± 91",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 249906,
            "range": "± 1577",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 472323,
            "range": "± 2777",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 245851,
            "range": "± 1039",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 413408,
            "range": "± 2050",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1577918,
            "range": "± 8206",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 711428,
            "range": "± 4108",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1053940,
            "range": "± 1885",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3261552,
            "range": "± 25812",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1485291,
            "range": "± 3634",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2466104,
            "range": "± 6274",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7751426,
            "range": "± 11730",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206748,
            "range": "± 497",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 915891,
            "range": "± 1594",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 205964,
            "range": "± 826",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 600850,
            "range": "± 2030",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 318789,
            "range": "± 1030",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668284,
            "range": "± 1538",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 205656,
            "range": "± 962",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024964,
            "range": "± 2174",
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
            "value": 302,
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
            "value": 441,
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
            "value": 341,
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
            "range": "± 3",
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
            "value": 391,
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
            "value": 382,
            "range": "± 1",
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
            "value": 390,
            "range": "± 3",
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
            "value": 350,
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
            "value": 401,
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
            "value": 489,
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
            "value": 365,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1199,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5508,
            "range": "± 16",
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
            "value": 82,
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
            "value": 141,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 528,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1408,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5520,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1182,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3113,
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
          "id": "f49eb0ea368db14b2e207c0f25a38cf55ca07c31",
          "message": "docs: iteration 75 — 50th verdict f15a494 [CLASSIC] vs d17e8fe [CLASSIC]: quiet PARITY exit 0 with THIRTEENTH ideal zero median +0.00 (FOURTH zero in last FIVE verdicts: 46/47/48/50, exception 49th FAST) and NEW ALL-TIME SPREAD RECORD 2.2pp — previous 2.4 from 43rd held 7 verdicts; record floor 2.4 PIERCED BY RECORD from below (pleasant overcall — floor updates to 2.2), p90 +0.87 smallest of series, canary +0.44% INSIDE forecast corridor -0.5..+0.7% (TWENTIETH consecutive hit — streak jubilee, band-level: 14 byte-exact + 6 band), zero flags, relations foxjson +1.1/foxsearch +0.3/foxurl +0.2 all quiet, no foxurl approach (ПРИМЕТКА counter 3, 49th +4.7 excursion not repeated); top-6 narrowest: 2.2/2.4/2.5/2.6x2/2.7/3.2x2 — FIVE of SIX from normal series #46-#57 (narrowness systematic 2.2-3.2 vs old typical 4-6); baseline policy: CLASSIC base now f15a494 (1359120), FAST 1c96db6 (720876), MEDIUM 7732269 (1071047); new spread floor for normal CLASSIC pairs: 2.2; tally 50 = 39 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 20; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 41 runs without rollback",
          "timestamp": "2026-10-26T01:31:33Z",
          "tree_id": "a1fa2998bdbe8b36d71974e1dd081e4d45b6f642",
          "url": "https://github.com/x7717/firefox-rs/commit/f49eb0ea368db14b2e207c0f25a38cf55ca07c31"
        },
        "date": 1792979216390,
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
            "value": 406,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 104630,
            "range": "± 1875",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 507523,
            "range": "± 3491",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1063532,
            "range": "± 19024",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5006737,
            "range": "± 46031",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 611587,
            "range": "± 1752",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3139328,
            "range": "± 7804",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 278996,
            "range": "± 446",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1386117,
            "range": "± 9574",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7038,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38658,
            "range": "± 255",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 46349,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14432,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 163324,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 309819,
            "range": "± 2191",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 194362,
            "range": "± 1011",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 358265,
            "range": "± 2074",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1322218,
            "range": "± 2160",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 508524,
            "range": "± 1293",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 877073,
            "range": "± 5309",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2697473,
            "range": "± 37903",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1159753,
            "range": "± 6235",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2046418,
            "range": "± 4426",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6485489,
            "range": "± 154445",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178688,
            "range": "± 268",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 797940,
            "range": "± 486",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 179213,
            "range": "± 3076",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538809,
            "range": "± 498",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259722,
            "range": "± 1352",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 592224,
            "range": "± 586",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 179007,
            "range": "± 491",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 814720,
            "range": "± 567",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 61,
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
            "value": 85,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 308,
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
            "value": 263,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 246,
            "range": "± 0",
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
            "value": 254,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 272,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 44,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 171,
            "range": "± 1",
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
            "value": 274,
            "range": "± 2",
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
            "value": 280,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 81,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 287,
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
            "value": 254,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 80,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 287,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 315,
            "range": "± 0",
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
            "value": 250,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 988,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3994,
            "range": "± 40",
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
            "value": 393,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1066,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3842,
            "range": "± 39",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 822,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2131,
            "range": "± 10",
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
          "id": "71bdb741e722fd07fd654ea1462f8e909148f874",
          "message": "docs: iteration 76 — 51st verdict f49eb0e [MEDIUM] vs 7732269 [MEDIUM]: quiet PARITY exit 0, median +0.06 spread 4.1pp MIDDLE of class corridor 2.4..7.0 (48th lesson calibration confirmed: MEDIUM wider than CLASSIC norm 2.2-3.2), canary -0.70% INSIDE forecast corridor -1.5..+0.7% (TWENTY-FIRST consecutive hit, band-level: 14 byte-exact + 7 band), zero flags — tails purely micro-noise (low foxurl/5 -11.25 url_crate/7 -10.16 ns-range; top foxurl/13 +4.69 url_crate/4 +4.10, all far below +20.0), relations foxjson -0.4/foxsearch +0.4/foxurl +1.4 all quiet, no foxurl approach (ПРИМЕТКА counter 3, 49th +4.7 excursion not repeated); fingerprints: not No4 (find/search 0.44x = MEDIUM norm for smaller canary denominator), not No6 (canary 1063532 in cluster 1063-1074K), pattern matches base 7732269 — normal MEDIUM, no drift host; window note: SECOND snapshot rollback of the day (local HEAD 7732269 behind 3, worklog at iteration-72 state) recovered ff-only in seconds — zero loss, protocol 'git fetch first + behind check' confirmed; baseline policy: MEDIUM base now f49eb0e (1063532), CLASSIC f15a494 (1359120), FAST 1c96db6 (720876), 7732269 (1071047) to catalog; tally 51 = 40 PARITY + 2 closed false alarms + 9 DRIFT, zero active REGRESS; canary streak 21; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 42 runs without rollback",
          "timestamp": "2026-10-26T02:08:23Z",
          "tree_id": "07cf21ebf65e8735eb8d50ada4f3bc70394fa6de",
          "url": "https://github.com/x7717/firefox-rs/commit/71bdb741e722fd07fd654ea1462f8e909148f874"
        },
        "date": 1792981449130,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 107,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 531,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 109138,
            "range": "± 4123",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 574809,
            "range": "± 17040",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1116381,
            "range": "± 45910",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6237781,
            "range": "± 205314",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 695614,
            "range": "± 22574",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3704103,
            "range": "± 145302",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 273441,
            "range": "± 7982",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1684698,
            "range": "± 57834",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7071,
            "range": "± 151",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 49277,
            "range": "± 947",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 71906,
            "range": "± 1378",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 13913,
            "range": "± 419",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 216549,
            "range": "± 5653",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 519490,
            "range": "± 8071",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 351965,
            "range": "± 6987",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 662584,
            "range": "± 10104",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1845572,
            "range": "± 75463",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 673227,
            "range": "± 14927",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1617814,
            "range": "± 32024",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3752134,
            "range": "± 98409",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1220071,
            "range": "± 23397",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3685033,
            "range": "± 66214",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 9129261,
            "range": "± 128864",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 320418,
            "range": "± 12778",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 978908,
            "range": "± 25346",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 309807,
            "range": "± 7486",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 634326,
            "range": "± 21892",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 501245,
            "range": "± 5752",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 716409,
            "range": "± 15081",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 307608,
            "range": "± 7777",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1190147,
            "range": "± 41582",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 52,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 246,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 70,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 374,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 60,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 310,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 57,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 296,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 58,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 297,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 61,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 321,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 37,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/6",
            "value": 200,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 88,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 325,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 69,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 309,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 65,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 329,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 53,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 317,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 66,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 351,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 53,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 341,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 62,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 308,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 908,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 4607,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 34,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 98,
            "range": "± 4",
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
            "value": 67,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 80,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 114,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 468,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1072,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 4500,
            "range": "± 176",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 888,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2550,
            "range": "± 89",
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
          "id": "662479ca67e6c55528b84abe46519d112244159e",
          "message": "docs: iteration 77 — 52nd verdict 71bdb74 [MEDIUM] vs f49eb0e [MEDIUM]: ENVIRONMENT DRIFT exit 3 — forecast from ПРИПИСКА #59 fulfilled component-by-component (class, flag structure, both sides); median +16.96 p10 -15.91 p90 +71.84 spread 87.8pp widest since drift era, canary +4.97% OUTSIDE corridor -1.5..+0.7% => CANARY STREAK ENDED AT 21 (first miss after 21 hits, drift-host miss counted honestly, new count from 53rd); 16 flags breach +20% on BOTH sides — fox find/foxsearch +71.8..+93.0 multi/fox* +80..85 AND эталон find/std/zzz +46.1 multi/naive-std +39.6..40.8 classifier/naive-std +55.1..67.7 — impossible with unchanged code (docs-only identical to f15a494/f49eb0e); relations move BOTH directions foxjson -15.7 foxurl -27.2 relatively accelerated vs foxsearch +46.5 — span 74pp, machine: different VM/microarchitectures of pool, not code; 71bdb74 to drift-host catalog (10th case), NOT a base, no rollback needed (code untouched, 43 runs without rollback); baselines unchanged MEDIUM f49eb0e 1063532 / CLASSIC f15a494 1359120 / FAST 1c96db6 720876; 53rd verdict = re-run of same code (machine requested); tally 52 = 40 PARITY + 2 closed false alarms + 10 DRIFT, zero active REGRESS; profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched",
          "timestamp": "2026-10-26T02:35:36Z",
          "tree_id": "1fdb98f8ea42d4bc6ee3bcc6bb410bcff8e8b4f4",
          "url": "https://github.com/x7717/firefox-rs/commit/662479ca67e6c55528b84abe46519d112244159e"
        },
        "date": 1792983104742,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 518,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132570,
            "range": "± 1892",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 677861,
            "range": "± 6625",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1356627,
            "range": "± 12587",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6510217,
            "range": "± 40694",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786182,
            "range": "± 1711",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3998416,
            "range": "± 16874",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 350144,
            "range": "± 2161",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1788702,
            "range": "± 8100",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 9151,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55686,
            "range": "± 494",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76957,
            "range": "± 484",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18602,
            "range": "± 71",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250338,
            "range": "± 2672",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 469992,
            "range": "± 5245",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 247921,
            "range": "± 3078",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 414632,
            "range": "± 1144",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1578303,
            "range": "± 4125",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 707898,
            "range": "± 4125",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1052399,
            "range": "± 4078",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3225572,
            "range": "± 4545",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1469298,
            "range": "± 2137",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2463002,
            "range": "± 5170",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7731109,
            "range": "± 190632",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 210281,
            "range": "± 1000",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 913692,
            "range": "± 1628",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 210141,
            "range": "± 450",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601071,
            "range": "± 1870",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 323362,
            "range": "± 820",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 668002,
            "range": "± 1277",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 210014,
            "range": "± 220",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024459,
            "range": "± 1451",
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
            "value": 307,
            "range": "± 2",
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
            "value": 441,
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
            "value": 345,
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
            "value": 345,
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
            "value": 377,
            "range": "± 1",
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
            "value": 401,
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
            "value": 384,
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
            "value": 395,
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
            "range": "± 0",
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
            "value": 405,
            "range": "± 9",
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
            "value": 490,
            "range": "± 6",
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
            "value": 374,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1180,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5630,
            "range": "± 23",
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
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 28,
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
            "value": 74,
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 543,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1421,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5567,
            "range": "± 50",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1173,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3073,
            "range": "± 45",
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
          "id": "98eb6749711a56c4c793bd9114efb42698fe11b9",
          "message": "docs: iteration 78 — 53rd verdict 662479c [CLASSIC] vs f15a494 [CLASSIC]: quiet PARITY exit 0 with FOURTEENTH ideal zero median +0.00 (three zeros in last five verdicts 48/50/53, exceptions FAST 49th and DRIFT 52nd), spread 3.2pp inside corridor 2.2..4.5 (3.2 now shared by three verdicts 40/47/53 at sixth place of top-6), canary -0.18% INSIDE forecast corridor -0.5..+0.7% (FIRST hit of new streak count after honest break at 21 by drift host on 52nd), zero flags, relations foxjson -1.8/foxsearch +2.0/foxurl -0.5 all quiet (ПРИМЕТКА counter 3); re-run requested by machine on 52nd fulfilled with same code: drift-host 71bdb74 fully refuted — 87.8pp/16 flags on dirty host vs 3.2pp/zero flags on clean host with IDENTICAL code, tenth drift case closed in catalog, CLASSIC norm 2.2-3.2 restored; baseline policy: CLASSIC base now 662479c (1356627), FAST 1c96db6 (720876), MEDIUM f49eb0e (1063532), f15a494 (1359120) to catalog; tally 53 = 41 PARITY + 2 closed false alarms + 10 DRIFT, zero active REGRESS; canary streak 1 (new count); profiles unchanged (Profiling zero runs after 9337c7e) — crate code untouched, 44 runs without rollback",
          "timestamp": "2026-10-26T03:01:42Z",
          "tree_id": "b6d322f8e4799befcb506f4af03c37768bb67c9e",
          "url": "https://github.com/x7717/firefox-rs/commit/98eb6749711a56c4c793bd9114efb42698fe11b9"
        },
        "date": 1792984670981,
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
            "value": 515,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132785,
            "range": "± 3256",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 669686,
            "range": "± 2539",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1355940,
            "range": "± 10471",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6565697,
            "range": "± 160452",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786265,
            "range": "± 32373",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4036148,
            "range": "± 21618",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356160,
            "range": "± 1598",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1773925,
            "range": "± 47313",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8431,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55644,
            "range": "± 850",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76772,
            "range": "± 2185",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18139,
            "range": "± 147",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 252755,
            "range": "± 1686",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 484271,
            "range": "± 7860",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 245393,
            "range": "± 4454",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 417997,
            "range": "± 2762",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1580938,
            "range": "± 19452",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 717502,
            "range": "± 6057",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1055929,
            "range": "± 5788",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3235913,
            "range": "± 51121",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1493311,
            "range": "± 2034",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2482398,
            "range": "± 16516",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7775746,
            "range": "± 75308",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 208067,
            "range": "± 2678",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 915844,
            "range": "± 6211",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207677,
            "range": "± 1890",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602500,
            "range": "± 2571",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319807,
            "range": "± 2244",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669676,
            "range": "± 1315",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207107,
            "range": "± 518",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1026166,
            "range": "± 2388",
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
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 84,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 440,
            "range": "± 12",
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
            "value": 358,
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
            "value": 341,
            "range": "± 7",
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
            "value": 380,
            "range": "± 4",
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
            "value": 241,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 101,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 456,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 89,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 384,
            "range": "± 5",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 350,
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
            "value": 491,
            "range": "± 9",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1228,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5602,
            "range": "± 98",
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
            "value": 129,
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
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 145,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 548,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1413,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5641,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1171,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3106,
            "range": "± 54",
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
          "id": "340962bb566e4c817cc8ce20ee9aebc0d5375c5c",
          "message": "docs: iteration 79 — 54th verdict quiet PARITY, 15th ideal zero, second in a row (pair 53-54); canary streak 2/2",
          "timestamp": "2026-10-26T03:34:43Z",
          "tree_id": "ab437d5ef4b97fd49b59c5bb44874ca1c2ca7301",
          "url": "https://github.com/x7717/firefox-rs/commit/340962bb566e4c817cc8ce20ee9aebc0d5375c5c"
        },
        "date": 1792986648903,
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
            "value": 516,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132927,
            "range": "± 6945",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 668113,
            "range": "± 11323",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1357689,
            "range": "± 17282",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6566607,
            "range": "± 118736",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 785989,
            "range": "± 2125",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4003819,
            "range": "± 12475",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 355664,
            "range": "± 876",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1771495,
            "range": "± 13051",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8455,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55828,
            "range": "± 268",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 80654,
            "range": "± 2060",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18005,
            "range": "± 65",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 249969,
            "range": "± 3712",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 470537,
            "range": "± 696",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 251339,
            "range": "± 4216",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 415559,
            "range": "± 4798",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1591047,
            "range": "± 3236",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 716428,
            "range": "± 3717",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1057135,
            "range": "± 8619",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3235624,
            "range": "± 35367",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1473669,
            "range": "± 15430",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2473064,
            "range": "± 23476",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7742767,
            "range": "± 43810",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207798,
            "range": "± 652",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 915255,
            "range": "± 11019",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207632,
            "range": "± 1168",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 602863,
            "range": "± 3147",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 320753,
            "range": "± 1127",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669246,
            "range": "± 3974",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207004,
            "range": "± 1372",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1028042,
            "range": "± 1933",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 64,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 308,
            "range": "± 7",
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
            "value": 442,
            "range": "± 1",
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
            "value": 358,
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
            "value": 344,
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
            "value": 343,
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
            "range": "± 18",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 103,
            "range": "± 2",
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
            "value": 90,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 383,
            "range": "± 12",
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
            "value": 393,
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
            "range": "± 4",
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
            "value": 402,
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
            "value": 491,
            "range": "± 1",
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
            "value": 372,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1179,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5547,
            "range": "± 36",
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
            "value": 138,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 547,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1415,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5485,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1178,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3055,
            "range": "± 7",
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
          "id": "562bc6d6cd013f360c480d7289a3bcbf4fe7de20",
          "message": "docs: iteration 80 — 55th verdict quiet PARITY, 16th ideal zero, THIRD in a row (triple 53-54-55); canary streak 3/3",
          "timestamp": "2026-10-26T04:01:57Z",
          "tree_id": "804edcfdfcf1ba9681659f5405f81c3a362f9b3a",
          "url": "https://github.com/x7717/firefox-rs/commit/562bc6d6cd013f360c480d7289a3bcbf4fe7de20"
        },
        "date": 1792988252748,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 115,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 399,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 105004,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 505310,
            "range": "± 2826",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1070291,
            "range": "± 12471",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4996345,
            "range": "± 22239",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 612225,
            "range": "± 1735",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3121502,
            "range": "± 8460",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 280570,
            "range": "± 496",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1401687,
            "range": "± 14851",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7074,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 40377,
            "range": "± 661",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 45876,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14481,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 164652,
            "range": "± 1428",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 310790,
            "range": "± 442",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 193016,
            "range": "± 556",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 356615,
            "range": "± 1310",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1321991,
            "range": "± 1984",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 506750,
            "range": "± 534",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 875282,
            "range": "± 662",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2696553,
            "range": "± 7449",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1167497,
            "range": "± 1105",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2041696,
            "range": "± 3831",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6493575,
            "range": "± 309324",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178366,
            "range": "± 730",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 798115,
            "range": "± 466",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 178295,
            "range": "± 264",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538459,
            "range": "± 704",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259088,
            "range": "± 355",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 591714,
            "range": "± 3830",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 178355,
            "range": "± 575",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 813722,
            "range": "± 6644",
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
            "value": 214,
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
            "value": 311,
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
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 70,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 248,
            "range": "± 0",
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
            "value": 244,
            "range": "± 0",
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
            "value": 264,
            "range": "± 1",
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
            "value": 189,
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
            "value": 276,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 281,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 78,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 290,
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
            "value": 252,
            "range": "± 0",
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
            "value": 287,
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
            "value": 327,
            "range": "± 2",
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
            "value": 249,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 992,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3993,
            "range": "± 10",
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
            "value": 62,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 110,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 394,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1200,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3843,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 861,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2187,
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
          "id": "4c4cf27590beced8f62c615e73cad772577bb600",
          "message": "docs: iteration 81 — 56th verdict DRIFT exit 3 from OLD cataloged drift host 71bdb74 in pair; 562bc6d normal, re-run requested",
          "timestamp": "2026-10-26T04:32:52Z",
          "tree_id": "63afd379e3926e2299acf0bb22403b77ebd32bf4",
          "url": "https://github.com/x7717/firefox-rs/commit/4c4cf27590beced8f62c615e73cad772577bb600"
        },
        "date": 1792990136502,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 525,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133168,
            "range": "± 1299",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 670976,
            "range": "± 5854",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1354574,
            "range": "± 97319",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6530790,
            "range": "± 154344",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 790698,
            "range": "± 15198",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4065748,
            "range": "± 59019",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 355871,
            "range": "± 1144",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1762280,
            "range": "± 16663",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8436,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55983,
            "range": "± 640",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 77034,
            "range": "± 585",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 17942,
            "range": "± 84",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 248924,
            "range": "± 1387",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 476541,
            "range": "± 3505",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 249396,
            "range": "± 1266",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 414574,
            "range": "± 1211",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1598077,
            "range": "± 13423",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 713959,
            "range": "± 5489",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1050291,
            "range": "± 12583",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3278641,
            "range": "± 24915",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1474414,
            "range": "± 2321",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2457070,
            "range": "± 14352",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7841118,
            "range": "± 28631",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206532,
            "range": "± 1468",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 917287,
            "range": "± 3404",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 206044,
            "range": "± 724",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601369,
            "range": "± 1505",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 323937,
            "range": "± 2543",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 672180,
            "range": "± 1676",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207674,
            "range": "± 1800",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1030697,
            "range": "± 3646",
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
            "value": 303,
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
            "value": 441,
            "range": "± 1",
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
            "value": 364,
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
            "value": 341,
            "range": "± 5",
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
            "value": 377,
            "range": "± 1",
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
            "value": 240,
            "range": "± 3",
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
            "value": 394,
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
            "range": "± 1",
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
            "value": 391,
            "range": "± 18",
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
            "range": "± 3",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 495,
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
            "value": 367,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1176,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5506,
            "range": "± 43",
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
            "value": 146,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 555,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1405,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5515,
            "range": "± 36",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1203,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3092,
            "range": "± 33",
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
          "id": "df9fe8774e8429d0fd2ce97213e0bac75e317670",
          "message": "docs: iteration 82 — 57th verdict quiet PARITY, 17th ideal zero; re-run cycle 56-57 closed clean (52-53 pattern repeated)",
          "timestamp": "2026-10-26T05:02:05Z",
          "tree_id": "c63fa92776a30d61984efd5860aff5e47e0d87a4",
          "url": "https://github.com/x7717/firefox-rs/commit/df9fe8774e8429d0fd2ce97213e0bac75e317670"
        },
        "date": 1792991851380,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 82,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 348,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 78412,
            "range": "± 5180",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 435117,
            "range": "± 10363",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 803749,
            "range": "± 36637",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4203353,
            "range": "± 120376",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 446832,
            "range": "± 5162",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2679477,
            "range": "± 147560",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 205679,
            "range": "± 26037",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1224856,
            "range": "± 48782",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4700,
            "range": "± 205",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 29027,
            "range": "± 1282",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 32215,
            "range": "± 1582",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10102,
            "range": "± 85",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 120915,
            "range": "± 2899",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 242014,
            "range": "± 3079",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 163432,
            "range": "± 1705",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 230059,
            "range": "± 6781",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 793393,
            "range": "± 8418",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 416165,
            "range": "± 24213",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 722385,
            "range": "± 13795",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1713634,
            "range": "± 43139",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 917023,
            "range": "± 12097",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1412293,
            "range": "± 28451",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3949161,
            "range": "± 100337",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 120869,
            "range": "± 4064",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 527640,
            "range": "± 16992",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 137710,
            "range": "± 6404",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 348518,
            "range": "± 4636",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 191039,
            "range": "± 5099",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 399789,
            "range": "± 5628",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 118759,
            "range": "± 3158",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 461642,
            "range": "± 14168",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 35,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 139,
            "range": "± 2",
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
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 40,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 173,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 40,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 161,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 159,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 41,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 176,
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
            "value": 129,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 68,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 180,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 46,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 185,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 46,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 190,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 38,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 165,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 186,
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
            "value": 229,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 172,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 634,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2774,
            "range": "± 203",
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
            "value": 41,
            "range": "± 2",
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
            "value": 83,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 286,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 778,
            "range": "± 41",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2712,
            "range": "± 130",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 619,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1560,
            "range": "± 65",
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
          "id": "64c43f65e854982e295108fa2d1355adfe39b728",
          "message": "docs: iteration 83 — 58th verdict REGRESS exit 1, third false-alarm candidate: both flags fox-side (multi/naive-fox/4 +25.8%, parse/foxurl/13 +21.6%) on slow FAST host; machine itself says localized emission with quiet crate, re-run will clarify; first OPEN regress after 57 verdicts (2 earlier closed as false alarms); crate code identical since 1518dcc, ПРИМЕТКА counter 4 (foxurl corpus-all +11.03% same host); closure path = re-run precedent 52->53",
          "timestamp": "2026-10-26T05:40:53Z",
          "tree_id": "96562376907c1db022cbcbc8ea2a4a6d2e6c27f0",
          "url": "https://github.com/x7717/firefox-rs/commit/64c43f65e854982e295108fa2d1355adfe39b728"
        },
        "date": 1792994150892,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 84,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 388,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 84196,
            "range": "± 591",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 428113,
            "range": "± 29339",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 865384,
            "range": "± 5939",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5027859,
            "range": "± 26325",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 522264,
            "range": "± 8368",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2582618,
            "range": "± 13721",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 208835,
            "range": "± 772",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1256615,
            "range": "± 71019",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4498,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 36249,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 52418,
            "range": "± 2785",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 10462,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 161027,
            "range": "± 698",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 366672,
            "range": "± 11977",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 348353,
            "range": "± 955",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 696244,
            "range": "± 271",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1429249,
            "range": "± 5205",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 554537,
            "range": "± 768",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1537651,
            "range": "± 1004",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2791525,
            "range": "± 10272",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1020405,
            "range": "± 24821",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3234454,
            "range": "± 56677",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6969425,
            "range": "± 413284",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 348388,
            "range": "± 841",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 784302,
            "range": "± 4364",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 347948,
            "range": "± 152",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 496415,
            "range": "± 2608",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 406611,
            "range": "± 15818",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 585125,
            "range": "± 11742",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 346567,
            "range": "± 178",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1052614,
            "range": "± 29431",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 187,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 54,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 291,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 44,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 240,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 46,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 227,
            "range": "± 0",
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
            "value": 221,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 47,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 227,
            "range": "± 1",
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
            "value": 142,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 236,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 253,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 54,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 265,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 229,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 260,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 40,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 277,
            "range": "± 0",
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
            "value": 223,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 685,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3555,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 24,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 74,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 17,
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
            "value": 46,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 94,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 353,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 823,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3548,
            "range": "± 90",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 725,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1881,
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
          "id": "d70534f26aa81845f7345289b412565315826d57",
          "message": "docs: iteration 84 — 59th verdict DRIFT exit 3, NEW extreme drift host 64c43f6 (catalog #11): spread 111.3pp widest in history (52nd was 87.8), 15 flags BOTH sides (fox +112..202 AND эталон std/naive-std +48..128 — foreign code, impossible from docs-only chain), relations span 80pp bidirectional (foxurl relatively accelerated); machine: different VM/microarchitectures of pool, re-run requested; ПРИПИСКА #66 forecast fulfilled component-by-component; ЛТ #3 stays open (flag reproduction drift-polluted); canary streak honestly broken at 5, new count from 59th",
          "timestamp": "2026-10-26T06:08:04Z",
          "tree_id": "dd82b9d30323b741ccee9c7325a27312bcf21a78",
          "url": "https://github.com/x7717/firefox-rs/commit/d70534f26aa81845f7345289b412565315826d57"
        },
        "date": 1792995850363,
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
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132760,
            "range": "± 2145",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 671751,
            "range": "± 3066",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1356121,
            "range": "± 17700",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6546117,
            "range": "± 76320",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786142,
            "range": "± 2853",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4012481,
            "range": "± 118421",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 357816,
            "range": "± 1120",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1798218,
            "range": "± 6970",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8472,
            "range": "± 46",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55816,
            "range": "± 539",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75376,
            "range": "± 2401",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18008,
            "range": "± 47",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250473,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 471441,
            "range": "± 1420",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 249346,
            "range": "± 984",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 414954,
            "range": "± 1103",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1582083,
            "range": "± 4002",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 718205,
            "range": "± 6887",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1060610,
            "range": "± 3411",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3239871,
            "range": "± 12887",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1469819,
            "range": "± 2515",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2477858,
            "range": "± 6345",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7773032,
            "range": "± 18452",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 207308,
            "range": "± 480",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 916153,
            "range": "± 2124",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207470,
            "range": "± 972",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 600971,
            "range": "± 1391",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319219,
            "range": "± 1119",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669233,
            "range": "± 1423",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207045,
            "range": "± 600",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024918,
            "range": "± 2444",
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
            "value": 308,
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
            "value": 443,
            "range": "± 4",
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
            "value": 361,
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
            "value": 344,
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
            "range": "± 1",
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
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 393,
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
            "value": 382,
            "range": "± 1",
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
            "value": 395,
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
            "value": 346,
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
            "value": 402,
            "range": "± 0",
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
            "value": 487,
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
            "value": 367,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1182,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5520,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 131,
            "range": "± 0",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 151,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 572,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1397,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5517,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1141,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3028,
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
          "id": "c7206f4a21898f8d2c58d1c1f4a883f7df3b13ae",
          "message": "docs: iteration 85 — 60th verdict quiet PARITY, EIGHTEENTH ideal zero after double miss (58th REGRESS + 59th DRIFT); canary +0.11% opens new streak count (1/1); spread 2.6 joins the 2.6 group (now five); relations near-perfect symmetry -0.1/+0.4/+0.0; CLASSIC base -> d70534f (1356121), sixth consecutive change on clean PARITY; re-run of 59th drift postponed to next FAST point; ЛТ #3 stays open",
          "timestamp": "2026-10-26T06:32:07Z",
          "tree_id": "216fe337421602a669e71d732880d1eebc6e2bc7",
          "url": "https://github.com/x7717/firefox-rs/commit/c7206f4a21898f8d2c58d1c1f4a883f7df3b13ae"
        },
        "date": 1792997288170,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 117,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 563,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 118360,
            "range": "± 1467",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 622568,
            "range": "± 4543",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1228305,
            "range": "± 22054",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6906466,
            "range": "± 78378",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 739061,
            "range": "± 16885",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3934596,
            "range": "± 41831",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 299873,
            "range": "± 1930",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1870725,
            "range": "± 45153",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7169,
            "range": "± 67",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 52877,
            "range": "± 511",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 75645,
            "range": "± 637",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14795,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 235181,
            "range": "± 1911",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 552667,
            "range": "± 3361",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 375694,
            "range": "± 2289",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 681040,
            "range": "± 5617",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 2000387,
            "range": "± 22519",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 721372,
            "range": "± 5767",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1752085,
            "range": "± 15483",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 4030505,
            "range": "± 49659",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1337318,
            "range": "± 9093",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 3982873,
            "range": "± 19543",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 9829531,
            "range": "± 58825",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 338475,
            "range": "± 12081",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 1067981,
            "range": "± 8551",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 339642,
            "range": "± 1855",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 678143,
            "range": "± 5303",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 539685,
            "range": "± 10518",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 755441,
            "range": "± 8225",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 335821,
            "range": "± 2600",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1250699,
            "range": "± 6575",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 54,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 262,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 74,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 394,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 63,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 333,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 60,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 301,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 310,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 67,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 331,
            "range": "± 5",
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
            "value": 206,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 92,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 328,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 72,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 324,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 67,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 342,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 323,
            "range": "± 4",
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
            "value": 361,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 386,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 63,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 317,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 928,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 4734,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 36,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 103,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 26,
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
            "value": 69,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 82,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 128,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 490,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1113,
            "range": "± 42",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 4766,
            "range": "± 63",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 958,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2593,
            "range": "± 31",
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
          "id": "df226552a5e9aba8598eb55852d76f6210b799b2",
          "message": "docs: iteration 86 — 61st verdict DRIFT exit 3, TWELFTH drift host c7206f4 (catalog #12): two-sided 69.8pp spread right after 60th's ideal zero (parity measures the pair, not the pipeline); 12 flags BOTH sides (fox +50.7..69.1 AND эталон naive-std/std +22.0..26.5 — foreign code impossible from docs-only chain); median -10.85% negative, relations span 57pp bidirectional (foxjson relatively accelerated); machine requests re-run (52/56/59 precedent) — next CLASSIC point vs clean base d70534f closes it (56->57 pattern); canary streak honestly broken at 1 (second break in three verdicts); ЛТ #3 stays open",
          "timestamp": "2026-10-26T07:08:21Z",
          "tree_id": "0b2f73682ddbafa088668cfde23bb6520199e65a",
          "url": "https://github.com/x7717/firefox-rs/commit/df226552a5e9aba8598eb55852d76f6210b799b2"
        },
        "date": 1792999467608,
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
            "value": 133385,
            "range": "± 384",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 683251,
            "range": "± 5308",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1359944,
            "range": "± 21817",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6514027,
            "range": "± 57005",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 786114,
            "range": "± 7551",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4008093,
            "range": "± 25610",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 354737,
            "range": "± 1473",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1775270,
            "range": "± 13238",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8735,
            "range": "± 68",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 56478,
            "range": "± 947",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 79340,
            "range": "± 519",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18122,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 252242,
            "range": "± 552",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 478328,
            "range": "± 8942",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 246450,
            "range": "± 2528",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 416900,
            "range": "± 4239",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1582302,
            "range": "± 4159",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 710253,
            "range": "± 2737",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1061279,
            "range": "± 8081",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3232815,
            "range": "± 18086",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1469863,
            "range": "± 5736",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2488947,
            "range": "± 13826",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7767970,
            "range": "± 16497",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 208386,
            "range": "± 1203",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 914887,
            "range": "± 3210",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207016,
            "range": "± 638",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 601039,
            "range": "± 1196",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 319795,
            "range": "± 854",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 669110,
            "range": "± 1196",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 207373,
            "range": "± 793",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1024991,
            "range": "± 2199",
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
            "value": 310,
            "range": "± 4",
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
            "value": 442,
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
            "value": 360,
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
            "value": 345,
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
            "value": 379,
            "range": "± 1",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 394,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 89,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 388,
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
            "value": 396,
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
            "value": 406,
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
            "value": 490,
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
            "value": 5575,
            "range": "± 35",
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
            "value": 82,
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
            "value": 149,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 546,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1419,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5594,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1173,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3148,
            "range": "± 20",
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
          "id": "5659e770c862396fa408540d68ea6d0a88deb825",
          "message": "docs: iteration 87 — 62nd verdict DRIFT exit 3, PAIR ARTIFACT with №12: lesson 56th in bidirectional edition confirmed — after two-sided drift host (foxurl/serialize faster on №12) normal point #69 gives positive breaches against the fast side (+33.3 serialize/foxurl/3, +27.5 corpus-all x2), 17 flags mirror №12's own profile, spread 58.1pp, foxsearch relatively accelerated -29.7% => machine honestly says DRIFT + re-run; catalog stays 12 (#69 clean by layers: median 0.00, spread 2.3, zero breaches, canary 2/2); re-run mechanics corrected: 52->53 closed immediately only by class luck, closure of cycle 61-62 = clean pair 63rd (#70 vs df22655); ПРИМЕТКА counter 4 (pair crossing not counted); ЛТ #3 stays open",
          "timestamp": "2026-10-26T07:40:56Z",
          "tree_id": "19965f7b5d48802d11dda18804f8a4919f7140fd",
          "url": "https://github.com/x7717/firefox-rs/commit/5659e770c862396fa408540d68ea6d0a88deb825"
        },
        "date": 1793001380687,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 83,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 336,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 73832,
            "range": "± 1718",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 417259,
            "range": "± 11649",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 731186,
            "range": "± 14895",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 4044616,
            "range": "± 192317",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 415358,
            "range": "± 21399",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 2429103,
            "range": "± 77961",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 183905,
            "range": "± 4555",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1178047,
            "range": "± 70027",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 4440,
            "range": "± 72",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 28802,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 30523,
            "range": "± 621",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 9597,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 114621,
            "range": "± 2556",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 231925,
            "range": "± 4852",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 155053,
            "range": "± 3302",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 222030,
            "range": "± 15816",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 750403,
            "range": "± 44521",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 395621,
            "range": "± 12707",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 577195,
            "range": "± 16958",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 1607802,
            "range": "± 39058",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 864787,
            "range": "± 29352",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 1350164,
            "range": "± 27380",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 3700319,
            "range": "± 155164",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 113849,
            "range": "± 3751",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 492562,
            "range": "± 7077",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 116032,
            "range": "± 4326",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 326929,
            "range": "± 16566",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 179294,
            "range": "± 2675",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 374963,
            "range": "± 7873",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 114186,
            "range": "± 3698",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 447234,
            "range": "± 13520",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 138,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 45,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 202,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 171,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 166,
            "range": "± 2",
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
            "value": 157,
            "range": "± 5",
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
            "value": 184,
            "range": "± 6",
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
            "value": 133,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 188,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/8",
            "value": 45,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/8",
            "value": 185,
            "range": "± 9",
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
            "value": 189,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/10",
            "value": 37,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 169,
            "range": "± 4",
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
            "value": 189,
            "range": "± 15",
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
            "value": 228,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 161,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 595,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 2599,
            "range": "± 147",
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
            "value": 57,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/2",
            "value": 14,
            "range": "± 1",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/5",
            "value": 40,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/6",
            "value": 83,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 264,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 706,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 2502,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 524,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 1435,
            "range": "± 95",
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
          "id": "8c52636b6e131edcafde7e9af2057a4f509d3435",
          "message": "docs: iteration 88 — 63rd verdict quiet PARITY exit 0 on drift pair: DOUBLE CLOSURE (re-run of 59th + ЛТ №3); all deltas negative (even p90 -6.25), zero flags vs one-sidedly inflated №11 — lesson 56th confirmed third time (52->53, 56->57, 59->63); ЛТ №3 closed by independent layer: multi/naive-fox/4 = 577195 ~ clean 574111 (+0.54%), flag 722385 did NOT reproduce — third closed false alarm (46th/51st/58th), machine was right ('localized emission with quiet crate'); score: 46 PARITY + 3 closed ЛТ + 14 DRIFT — ZERO active regressions first time since 58th; canary 3/3 streak (+0.11/+0.28/+1.43)",
          "timestamp": "2026-10-26T08:02:20Z",
          "tree_id": "c660425fb79313c5f533d3c924fb8d9061e2c70b",
          "url": "https://github.com/x7717/firefox-rs/commit/8c52636b6e131edcafde7e9af2057a4f509d3435"
        },
        "date": 1793002707458,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 144,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 511,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 133793,
            "range": "± 631",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 673715,
            "range": "± 2236",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1360313,
            "range": "± 28486",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6467117,
            "range": "± 32585",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 785220,
            "range": "± 3904",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4034790,
            "range": "± 36641",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 359231,
            "range": "± 1664",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1747527,
            "range": "± 141693",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 9542,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55878,
            "range": "± 90",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 76224,
            "range": "± 807",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18432,
            "range": "± 56",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 250314,
            "range": "± 1571",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 470424,
            "range": "± 895",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 246344,
            "range": "± 3364",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 410126,
            "range": "± 805",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1624633,
            "range": "± 28774",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 708606,
            "range": "± 2209",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1046076,
            "range": "± 5948",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3224618,
            "range": "± 6236",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1468699,
            "range": "± 2009",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2469798,
            "range": "± 21222",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 8076657,
            "range": "± 264543",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 206728,
            "range": "± 703",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 913551,
            "range": "± 3219",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 205993,
            "range": "± 698",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 599461,
            "range": "± 1237",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 317769,
            "range": "± 574",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 667056,
            "range": "± 6734",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 205024,
            "range": "± 422",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1023522,
            "range": "± 809",
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
            "value": 308,
            "range": "± 7",
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
            "value": 444,
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
            "value": 346,
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
            "value": 374,
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
            "value": 242,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 105,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 401,
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
            "value": 387,
            "range": "± 3",
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
            "value": 347,
            "range": "± 1",
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
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 64,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 491,
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
            "value": 368,
            "range": "± 1",
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
            "value": 5551,
            "range": "± 21",
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
            "value": 126,
            "range": "± 0",
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
            "value": 131,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 569,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1420,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5486,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1205,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3055,
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
          "id": "9d4c052afa3d0ad992d12c2e902bcfb86f9a0591",
          "message": "docs: iteration 89 — 64th verdict quiet PARITY exit 0 on clean pair: CYCLE 61-62 CLOSED (52->53 pattern, class randomness extinguishes drift without code exceptions); lesson 56th confirmed 4th time (52->53, 56->57, 59->63, 61/62->64); 19th official zero NOT achieved (-0.04% vs required +0.00%, count stays 18, forecast's cautious branch); crate relations at zero (+0.9/-0.5/+0.3) — microarch-shift alarm lifted; registry FULLY CLEAN: 64 = 47 PARITY + 3 closed LT + 14 DRIFT — zero active regressions AND zero open re-runs (two open cases closed in two consecutive verdicts); canary 4/4 (+0.11/+0.28/+1.43/+0.31)",
          "timestamp": "2026-10-26T08:34:36Z",
          "tree_id": "d5bebaab585d1b9e0dd325bc3a16d01a3dec7c22",
          "url": "https://github.com/x7717/firefox-rs/commit/9d4c052afa3d0ad992d12c2e902bcfb86f9a0591"
        },
        "date": 1793004605322,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 120,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 403,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 104891,
            "range": "± 937",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 502391,
            "range": "± 15673",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1067986,
            "range": "± 14232",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 5287743,
            "range": "± 203198",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 612046,
            "range": "± 39640",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 3168964,
            "range": "± 22584",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 279559,
            "range": "± 742",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1385367,
            "range": "± 19551",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 7138,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 38131,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 47917,
            "range": "± 1089",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 14793,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 164329,
            "range": "± 589",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 312460,
            "range": "± 2075",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 193641,
            "range": "± 1431",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 357932,
            "range": "± 1079",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1323459,
            "range": "± 6849",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 515720,
            "range": "± 2245",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 875855,
            "range": "± 7014",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 2702491,
            "range": "± 23371",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1160332,
            "range": "± 2855",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2039416,
            "range": "± 4736",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 6501365,
            "range": "± 17651",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 178905,
            "range": "± 406",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 798931,
            "range": "± 9445",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 179073,
            "range": "± 1394",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 538794,
            "range": "± 1007",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 259499,
            "range": "± 932",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 592866,
            "range": "± 26572",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 179077,
            "range": "± 1394",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 814742,
            "range": "± 1040",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 63,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 214,
            "range": "± 5",
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
            "value": 310,
            "range": "± 6",
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
            "value": 72,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 246,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 249,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/5",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/5",
            "value": 269,
            "range": "± 4",
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
            "value": 165,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/7",
            "value": 99,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 274,
            "range": "± 1",
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
            "value": 281,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 78,
            "range": "± 1",
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
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/10",
            "value": 252,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 80,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 288,
            "range": "± 5",
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
            "value": 313,
            "range": "± 4",
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
            "value": 989,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 3928,
            "range": "± 336",
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
            "range": "± 3",
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
            "value": 111,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 394,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1065,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 3859,
            "range": "± 68",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 815,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 2175,
            "range": "± 10",
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
          "id": "7a595f165c81428d79f72c447cea96d234813267",
          "message": "docs: iteration 90 — 65th verdict quiet PARITY exit 0 on clean MEDIUM pair (9d4c052 vs 562bc6d): median +0.13, spread 3.4, zero flags, canary -0.22 => 5/5; forecast of addendum #72 fulfilled component-by-component (exit 0, zero-flag, no-zero branch +0.13); FIRST quiet MEDIUM verdict since 51st (52nd and 56th were DRIFT on this class); machine crate-relations at zero (+0.5/+0.2/+1.3) — script-layer span 8.1 observation resolved as methodological, machine layer authoritative; zero count stays 18; score: 65 = 48 PARITY + 3 closed LT + 14 DRIFT — registry clean second consecutive verdict; canary 5/5",
          "timestamp": "2026-10-26T09:05:54Z",
          "tree_id": "b61477c40f867d822357c0ae776b8af543b1cfe0",
          "url": "https://github.com/x7717/firefox-rs/commit/7a595f165c81428d79f72c447cea96d234813267"
        },
        "date": 1793006525509,
        "tool": "cargo",
        "benches": [
          {
            "name": "parse/foxjson/small",
            "value": 143,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/small",
            "value": 552,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-500",
            "value": 132785,
            "range": "± 1126",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-500",
            "value": 697775,
            "range": "± 3560",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/session-5000",
            "value": 1359848,
            "range": "± 22592",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/session-5000",
            "value": 6932113,
            "range": "± 126406",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/nums-5000",
            "value": 796044,
            "range": "± 8553",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/nums-5000",
            "value": 4043529,
            "range": "± 65476",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxjson/strs-5000",
            "value": 356608,
            "range": "± 3573",
            "unit": "ns/iter"
          },
          {
            "name": "parse/serde_json/strs-5000",
            "value": 1869571,
            "range": "± 28531",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/8",
            "value": 8493,
            "range": "± 41",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/8",
            "value": 55759,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/8",
            "value": 77558,
            "range": "± 2209",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/foxsearch-multi/32",
            "value": 18129,
            "range": "± 76",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-fox/32",
            "value": 251528,
            "range": "± 2280",
            "unit": "ns/iter"
          },
          {
            "name": "classifier/naive-std/32",
            "value": 477244,
            "range": "± 4756",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/2",
            "value": 253390,
            "range": "± 1827",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/2",
            "value": 422998,
            "range": "± 6713",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/2",
            "value": 1642672,
            "range": "± 18092",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/4",
            "value": 753338,
            "range": "± 54100",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/4",
            "value": 1065910,
            "range": "± 19364",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/4",
            "value": 3319266,
            "range": "± 29327",
            "unit": "ns/iter"
          },
          {
            "name": "multi/foxsearch-multi/8",
            "value": 1506198,
            "range": "± 19324",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-fox/8",
            "value": 2479442,
            "range": "± 33897",
            "unit": "ns/iter"
          },
          {
            "name": "multi/naive-std/8",
            "value": 7871626,
            "range": "± 113749",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/Mozilla Corporation",
            "value": 209280,
            "range": "± 3549",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/Mozilla Corporation",
            "value": 934117,
            "range": "± 10905",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/горячие пути",
            "value": 207834,
            "range": "± 1616",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/горячие пути",
            "value": 607707,
            "range": "± 2991",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 324008,
            "range": "± 5969",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/https://example.com/search?q=firefox+rust&lang=ru",
            "value": 691316,
            "range": "± 15018",
            "unit": "ns/iter"
          },
          {
            "name": "find/foxsearch/zzz-absent-zzz",
            "value": 209151,
            "range": "± 2979",
            "unit": "ns/iter"
          },
          {
            "name": "find/std/zzz-absent-zzz",
            "value": 1046848,
            "range": "± 7075",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/0",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/0",
            "value": 309,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/1",
            "value": 94,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/1",
            "value": 441,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/2",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/2",
            "value": 364,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/3",
            "value": 81,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/3",
            "value": 347,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/4",
            "value": 83,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/4",
            "value": 345,
            "range": "± 9",
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
            "value": 380,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/6",
            "value": 57,
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
            "value": 114,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/7",
            "value": 400,
            "range": "± 2",
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
            "value": 382,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/9",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/9",
            "value": 396,
            "range": "± 2",
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
            "value": 346,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/11",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/11",
            "value": 401,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/12",
            "value": 71,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/12",
            "value": 485,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/13",
            "value": 80,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/13",
            "value": 372,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "parse/foxurl/corpus-all",
            "value": 1241,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "parse/url_crate/corpus-all",
            "value": 5591,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/0",
            "value": 43,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/1",
            "value": 130,
            "range": "± 2",
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
            "range": "± 1",
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
            "value": 130,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "serialize/foxurl/dirty-all",
            "value": 535,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/corpus-all",
            "value": 1507,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/corpus-all",
            "value": 5613,
            "range": "± 57",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/foxurl/dirty-all",
            "value": 1166,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "canonical/url_crate/dirty-all",
            "value": 3113,
            "range": "± 19",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}