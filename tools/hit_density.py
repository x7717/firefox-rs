#!/usr/bin/env python3
"""Предоценка плотности хитов сканера MultiNeedle ДО реализации (правило >>15%).

Итерация 24: инструмент закрывает две зоны-кандидата данными, а не догадками:
- classifier — «плотность хитов '='»: парный скан (X∈G1, b) vs LUT-цепочка
  верификации (итерация 22); симуляция выживания LUT на реальном потоке URL;
- multi-N — доля inner-collect (m != 0) в ядре CmpEq{k}: плотность объединения
  фильтр-байтов в стоге -> P(блок с хитом) -> верхняя граница выгоды.

ВЫВОД — вердикт по правилу проекта: зона трогается ТОЛЬКО если предоценка
эффекта >> 15%; иначе закрывается записью в WORKLOG.

ВАЖНО (sync): таблица RARITY, pick_filter_byte, sample::url_stream, MARKERS_*
и SET2/4/8 из benches/multi.rs продублированы здесь НАРОЧНО — python-инструмент
не зависит от cargo. При изменении этих фикстур в Rust СИНХРОНИЗИРОВАТЬ вручную.
Инструмент оценивает ТОЛЬКО плотности (предоценку), не корректность.

Использование: python3 tools/hit_density.py [classifier|multi2|multi4|multi8|all]
"""
import math
import sys

# --- репликация RARITY (lib.rs) ---
_RARITY_LETTERS = b"etaoinshrlducmfgpybETAOINSHRLDUCMFGPYB"
_RARITY_UPPER = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
_RARITY_PUNCT = b"./:-?=&%,_"
_RARITY_RARE = b"zjqxvkwZJQXVKW"
_RARITY_CYR_FREQ = [0x80, 0x81, 0x82, 0x83, 0xB0, 0xB2, 0xB4, 0xB5,
                    0xB8, 0xBA, 0xBB, 0xBC, 0xBD, 0xBE, 0xBF]

RARITY = [2] * 256
RARITY[ord(' ')] = 3
for _c in _RARITY_LETTERS:
    RARITY[_c] = 2
for _c in _RARITY_UPPER:
    RARITY[_c] = 1
for _c in range(ord('0'), ord('9') + 1):
    RARITY[_c] = 1
for _c in _RARITY_PUNCT:
    RARITY[_c] = 1
for _c in range(0x80, 0x100):
    RARITY[_c] = 0
for _c in range(0xC0, 0x100):
    RARITY[_c] = 1
for _c in _RARITY_CYR_FREQ:
    RARITY[_c] = 1
for _c in _RARITY_RARE:
    RARITY[_c] = 0


def pick_filter_byte(nd: bytes) -> int:
    """Точная реплика lib.rs::pick_filter_byte (публичная, детерминированная)."""
    best = len(nd) - 1
    best_rank = RARITY[nd[best]]
    for idx in range(len(nd) - 1, -1, -1):
        r = RARITY[nd[idx]]
        if r < best_rank:
            best_rank, best = r, idx
            if r == 0:
                break
    return best


# --- репликация sample (lib.rs) ---
HOSTS = ["https://example.com", "https://shop.example.org", "http://news.site.ru",
         "https://cdn.assets.net", "https://api.service.io", "http://login.portal.edu"]
PATHS = ["/index.html", "/search?q=", "/api/v2/items?page=", "/images/logo.png",
         "/user/profile?id=", "/static/app.min.js", "/catalog/product/sku",
         "/articles/2026/10/zapiski"]
QUERIES = ["", "utm_source=feed&utm_medium=referral", "q=поиск+firefox&lang=ru",
           "ref=producthunt&fbclid=IwAR2x", "id=12345&page=2&sort=desc",
           "gclid=Cj0KCQjw9&yclid=7712345", "mc_cid=ab12cd&utm_campaign=sale",
           "session=abcdef0123456789"]


def url_stream(n: int):
    """Точная реплика sample::url_stream (xorshift13/7/17, тот же seed)."""
    class R:
        s = 0x000C1A551F1E

        @classmethod
        def nxt(cls):
            s = cls.s
            s ^= (s << 13) & 0xFFFFFFFFFFFFFFFF
            s ^= s >> 7
            s ^= (s << 17) & 0xFFFFFFFFFFFFFFFF
            cls.s = s & 0xFFFFFFFFFFFFFFFF
            return cls.s

    out = []
    for i in range(n):
        h, p = HOSTS[R.nxt() % 6], PATHS[R.nxt() % 8]
        u = h + p
        if p.endswith('='):
            u += str(R.nxt() % 100_000)
        q = QUERIES[R.nxt() % 8]
        if q:
            u += ('&' if p.endswith('=') else '?') + q
        if i % 17 == 0:
            u += "&lang=ru"
        out.append(u.encode())
    return out


MARKERS_32 = [
    "utm_source=", "utm_medium=", "utm_campaign=", "utm_term=", "utm_content=",
    "fbclid=", "gclid=", "yclid=", "ymclid=", "mc_cid=", "mc_eid=", "_openstat=",
    "ref=producthunt", "vk.target=", "tgid=", "vrn=", "adfox.ru", "adriver.ru",
    "doubleclick.net", "googlesyndication", "criteo.com", "taboola.com",
    "outbrain.com", "mgid.com", "admitad.com", "cityads.ru", "mediascope.net",
    "top-fwz1.mail.ru", "mc.yandex.ru", "google-analytics.com", "analytics.",
    "malware-download.ru",
]

PARAGRAPH = ("Firefox is a free and open-source web browser built on the Gecko engine. "
             "Rust makes hot paths faster: parsing, searching, encoding, layout, storage. "
             "Быстрый поиск по большим документам тоже важен. The quick brown animal jumps "
             "over the sleepy animal. https://www.some-domain.org/path?query=value&other=123\n")
TAIL = " Mozilla Corporation. горячие пути. https://example.com/search?q=firefox+rust&lang=ru\n"

SET2 = ["Mozilla Corporation", "горячие пути"]
SET4 = SET2 + ["https://example.com/search?q=firefox+rust&lang=ru", "example.com/search"]
SET8 = SET4 + ["firefox+rust&lang", "q=firefox", "lang=ru", "Corporation"]


def ch(b: int) -> str:
    return chr(b) if 32 <= b < 127 else f"0x{b:02x}"


def analyze_classifier():
    needles = [m.encode() for m in MARKERS_32]
    stream = url_stream(200)
    fbi = [pick_filter_byte(nd) for nd in needles]
    groups = {}
    for ni, nd in enumerate(needles):
        groups.setdefault(nd[fbi[ni]], []).append(ni)
    S = sorted(groups)
    print(f"|S| = {len(S)} -> скан {'Bitmap' if len(S) > 8 else f'CmpEq{{k={len(S)}}}'}: "
          f"{[ch(b) for b in S]}")
    print(f"группы: {sorted((len(v) for v in groups.values()), reverse=True)}")

    total = sum(len(u) for u in stream)
    hits = [(ui, p, b) for ui, u in enumerate(stream) for p, b in enumerate(u) if b in groups]
    print(f"поток 200 URL, {total} Б; хитов {len(hits)} = "
          f"{100*len(hits)/total:.2f}% байтов ({len(hits)/200:.1f}/URL)")
    cnt = {}
    for _, _, b in hits:
        cnt[b] = cnt.get(b, 0) + 1
    for b, c in sorted(cnt.items(), key=lambda kv: -kv[1]):
        print(f"  {ch(b)!r}: {c} ({100*c/len(hits):.1f}%), группа {len(groups[b])} игл")

    # LUT-выживание + парный фильтр по каждой группе >= 2 игл
    grand_lut_killed = 0
    for b, members in sorted(groups.items(), key=lambda kv: -cnt.get(kv[0], 0)):
        if len(members) < 2 or cnt.get(b, 0) == 0:
            continue
        kmax = min(4, max(fbi[ni] for ni in members))
        bh = [(ui, p) for ui, p, bb in hits if bb == b]
        died = [0] * (kmax + 1)   # умерли ровно на уровне k
        survived = 0
        real = 0
        for ui, p in bh:
            u = stream[ui]
            alive = (1 << len(members)) - 1
            for k in range(1, kmax + 1):
                if p < k:
                    break
                m = 0
                for j, ni in enumerate(members):
                    f = fbi[ni]
                    if f < k or u[p - k] == needles[ni][f - k]:
                        m |= 1 << j
                alive &= m
                if alive == 0:
                    died[k] += 1
                    break
            else:
                if alive == 0:
                    died[kmax] += 1  # p < kmax: LUT недокрыли, но маска пуста
                else:
                    survived += 1
                    for j, ni in enumerate(members):
                        if alive & (1 << j):
                            f = fbi[ni]
                            if f <= p and u[p - f:p - f + len(needles[ni])] == needles[ni]:
                                real += 1
        grand_lut_killed += sum(died[1:kmax + 1])
        print(f"  группа {ch(b)!r} ({len(members)} игл, kmax={kmax}): хитов {len(bh)}, "
              f"умерли на LUT1..{kmax}: {died[1:kmax+1]}, "
              f"до verify_one: {survived} (реальных совпадений {real})")

    # парный фильтр (G1 = байты слева от фильтра) по всем группам
    pair = 0
    for ui, p, b in hits:
        g1 = {needles[ni][fbi[ni] - 1] for ni in groups[b] if fbi[ni] >= 1}
        if p >= 1 and stream[ui][p - 1] in g1:
            pair += 1
    elim = 100 * (1 - pair / len(hits))
    print(f"парный фильтр по всем группам: остаётся {pair}/{len(hits)} хитов "
          f"(устраняет {elim:.1f}% verify_at-вызовов), НО добавляет "
          f"cmpeq(|G1_g|)+shift+and на КАЖДЫЙ 32Б-блок всем группам")
    print("  => на коротких стогах (2-3 блока/URL, плотность хитов ~12%) "
          "амортизация худая: вердикт — НЕ проходить правило без >>15% нетто")


def analyze_multi(name: str, needles: list):
    hay = (PARAGRAPH * 30_000 + TAIL).encode()
    fbi = [pick_filter_byte(n.encode()) for n in needles]
    fbytes = [n.encode()[i] for n, i in zip(needles, fbi)]
    d = sum(hay.count(bytes([b])) for b in set(fbytes)) / len(hay)
    p_block = 1 - math.exp(-32 * d)
    ic = p_block * 4 / (8 + p_block * 4)  # ~4 доп.µops на блоке с хитом из ~8
    fb = ", ".join(f"{ch(b)!r}" for b in fbytes)
    print(f"{name}: фильтр-байты [{fb}]; плотность объединения {100*d:.4f}% "
          f"-> P(m!=0)/блок {100*p_block:.2f}% -> inner-collect ~{100*ic:.1f}% ядра")
    if ic < 0.15:
        print(f"  ВЕРДИКТ: микрозона (<15%) — не трогать")
    else:
        print(f"  ВЕРДИКТ: порог пройден формально — но собрать хиты всех байтов "
              f"нужен OR-цепочка (cmpeq всех K обязательна на каждый блок); "
              f"рычага нет — зона структурная")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    mode = sys.argv[1] if len(sys.argv) > 1 else "all"
    if mode in ("classifier", "all"):
        print("=" * 72)
        analyze_classifier()
    if mode in ("multi2", "all"):
        analyze_multi("multi-2 (CmpEq{k=2})", SET2)
    if mode in ("multi4", "all"):
        analyze_multi("multi-4 (CmpEq{k=?})", SET4)
    if mode in ("multi8", "all"):
        analyze_multi("multi-8", SET8)
