window.BENCHMARK_DATA = {
  "lastUpdate": 1792882342095,
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
      }
    ]
  }
}