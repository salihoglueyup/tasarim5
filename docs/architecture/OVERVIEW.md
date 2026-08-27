# 🏗️ Proje Mimarisine Genel Bakış

## Teknoloji Yığını

| Katman | Teknoloji | Sürüm |
|---|---|---|
| Framework | Next.js (App Router, Turbopack, React 19.2.4) | 16.3.0 |
| Dil | TypeScript | 5.x |
| Stil | Tailwind CSS (Slate & Titanyum Teması) | 4.x (PostCSS + Typography) |
| Animasyon | Framer Motion (`LazyMotion` & Springs) | 12.x |
| Font | Plus Jakarta Sans, Inter + Cairo (RTL) | next/font + Material Symbols |
| ORM | Prisma 7 (Driver Adapter: `@prisma/adapter-pg`) | 7.9.1 |
| Veritabanı | PostgreSQL (Docker: `aloyonetim-postgres`) | 16 / 15-alpine |
| Önbellek | Redis Alpine (ioredis + AOF) | Port 6379 |
| Auth | JOSE (JWT tabanlı Admin Auth) | 6.x |
| Barındırma | Kendi Linux sunucusu (Docker Compose) | 5 Servis |
| CDN / Proxy | Cloudflare (SSL + HSTS + Speculation Rules) | — |
| Otomasyon | N8N Workflow Engine | Port 5678 |
| AI / GEO Motoru | LLMs.txt, Semantik Veri Setleri & IndexNow | 20+ Özel Endpoint |

---

## Klasör Yapısı

```
src/
├── app/
│   ├── [lang]/                  ← i18n rotalar (tr / en / ru / ar)
│   │   ├── layout.tsx           ← Root layout, meta, analytics, icons, SW purge
│   │   ├── page.tsx             ← Ana sayfa (Hero poster + high priority)
│   │   ├── hizmetler/           ← Hizmet sayfaları (10+ detaylı hizmet)
│   │   ├── hakkimizda/          ← Kurumsal sayfalar (Dark Hero standardı)
│   │   ├── iletisim/            ← İletişim & Teklif formu
│   │   ├── sss/                 ← S.S.S (500+ soru, DB'den dinamik)
│   │   ├── blog/                ← Blog (liste, slug, yazar, etiket, kategori)
│   │   ├── referanslar/         ← Referans projeler (3D tilt & filtreler)
│   │   ├── admin/               ← Admin paneli (JWT korumalı, bot telemetri)
│   │   └── ...                  ← Diğer içerik sayfaları
│   ├── api/
│   │   ├── tesis-yonetimi/      ← KMK, AI snippets, benchmark, geo-feed, rfp
│   │   ├── admin/               ← Bot telemetry, schema lint, indexnow bulk
│   │   ├── seo/                 ← Bot analytics, audit, intent match, rank score
│   │   ├── geo/                 ← Districts geojson, nearest facility hub
│   │   ├── lead/route.ts        ← Lead yakalama uç noktası (Email/Telegram/DB)
│   │   ├── auth/                ← JWT login/logout
│   │   └── llms.txt/route.ts    ← AI motoru beslemesi (GEO)
│
├── components/
│   ├── layout/                  ← Header, Footer, NavigationWrapper
│   ├── sections/                ← Sayfa kesitleri (Hero, Calculator vb.)
│   ├── ui/                      ← Atomik bileşenler (Button, Card, Badge)
│   ├── blog/                    ← Blog özel bileşenler
│   ├── cro/                     ← Dönüşüm odaklı bileşenler
│   └── seo/                     ← JsonLd, meta bileşenleri
│
├── i18n/
│   ├── locales/
│   │   ├── tr/common.json       ← Türkçe (kaynak)
│   │   ├── en/common.json       ← İngilizce
│   │   ├── ru/common.json       ← Rusça
│   │   └── ar/common.json       ← Arapça
│   └── getDictionary.ts         ← Server-side çeviri yükleyici
│
├── context/
│   └── LanguageContext.tsx      ← Client-side dil context'i + t() fonksiyonu
│
├── lib/
│   ├── prisma.ts                ← Prisma client (pg adapter)
│   ├── auth.ts                  ← JWT doğrulama (JOSE)
│   ├── schemas.ts               ← JSON-LD şema fabrikası
│   ├── env.ts                   ← Tip güvenli env doğrulama
│   └── leads/                   ← Lead dispatch sistemi
│
└── hooks/                       ← useLeadSubmit, useScrollProgress vb.
```

---

## i18n Mimarisi

- **4 dil desteklenir:** Türkçe (`tr`), İngilizce (`en`), Rusça (`ru`), Arapça (`ar`)
- Tüm sayfalar `/[lang]/` altında: `/tr/hakkimizda`, `/en/about`
- **RTL desteği:** Arapça için `dir="rtl"` + Cairo font otomatik uygulanır
- Çeviriler `src/i18n/locales/[lang]/common.json` sözlüklerinde
- Server-side: `getDictionary(lang)` → `dict.hero.title`
- Client-side: `useLanguage()` → `t('hero.title')`
- Otomatik çeviri: `node scripts/translate.mjs`
- Detaylar: [../i18n/README.md](../i18n/README.md)

---

## Render Stratejisi

| Sayfa Tipi | Strateji | Revalidate |
|---|---|---|
| Ana sayfa, hizmetler | `dynamic` (SSR) | — |
| Blog makaleleri | SSG + ISR | 1 gün |
| Admin paneli | SSR (JWT middleware) | — |
| S.S.S sayfası | SSR (DB'den dinamik) | — |
| API rotaları | Route Handler | — |
| Sitemap, robots | Route Handler | — |

---

## Renk Paleti (Slate & Titanium)

```css
/* Ana renk sistemi — globals.css */
--color-primary:    slate-950 (koyu mod: white)
--color-secondary:  slate-600 (koyu mod: slate-300)
--color-surface:    white     (koyu mod: slate-900)

/* CTA Butonları */
bg-slate-900 text-white           /* Aydınlık mod */
dark:bg-white dark:text-slate-950 /* Koyu mod */

/* Vurgu rengi */
text-emerald-600  /* İkonlar, rozet sayaçları */
```

> **Not:** Mavi (`blue-*`) sınıfları projede kullanılmaz — bkz. [../dev/CONTRIBUTING.md](../dev/CONTRIBUTING.md)

---

## JSON-LD Schema Mimarisi

Tüm schema üretimi `src/lib/schemas.ts`'teki fabrika fonksiyonlarından gelir:

```
organizationSchema()       → Organization (NAP, sameAs, sosyal)
webSiteSchema()            → WebSite + SearchAction
serviceSchema(service)     → Service (hizmet detayları)
faqSchema(items)           → FAQPage
articleSchema(post)        → Article (blog)
breadcrumbSchema(items)    → BreadcrumbList
```

---

## Docker Mimarisi

```
[Cloudflare CDN] → [Nginx:80/443] → [Next.js:3001]
                                  → [Prisma Studio:5555]
                                  → [N8N:5678]

[Next.js] → [PostgreSQL:5432]
[Next.js] → [Redis:6379]
```

Detaylar: [../dev/DOCKER.md](../dev/DOCKER.md)

---

**İlgili belgeler:**
- [LEAD_SYSTEM.md](LEAD_SYSTEM.md) — Lead yakalama sistemi
- [PERFORMANCE.md](PERFORMANCE.md) — Core Web Vitals bütçesi
- [A11Y.md](A11Y.md) — Erişilebilirlik durumu
- [../dev/DOCKER.md](../dev/DOCKER.md) — Docker mimarisi
- [../dev/DATABASE.md](../dev/DATABASE.md) — Veritabanı ve Prisma
