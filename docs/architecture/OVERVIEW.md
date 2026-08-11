# 🏗️ Proje Mimarisine Genel Bakış

## Teknoloji Yığını

| Katman | Teknoloji | Sürüm |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Bundler | Turbopack | (Next.js ile birlikte) |
| Dil | TypeScript | 5.x |
| Stil | Tailwind CSS | 4.x (JIT) |
| Animasyon | Framer Motion (`LazyMotion`) | 12.x |
| Font | Plus Jakarta Sans + Cairo (RTL) | next/font |
| ORM | Prisma | 7.x |
| Veritabanı | PostgreSQL | 15 |
| Önbellek | Redis | Alpine |
| Auth | JOSE (JWT) | 6.x |
| Barındırma | Kendi Linux sunucusu (Docker) | — |
| CDN / Proxy | Cloudflare | — |
| Otomasyon | N8N | — |

---

## Klasör Yapısı

```
src/
├── app/
│   ├── [lang]/                  ← i18n rotalar (tr / en / ru / ar)
│   │   ├── layout.tsx           ← Root layout, meta, analytics, icons
│   │   ├── page.tsx             ← Ana sayfa
│   │   ├── hizmetler/           ← Hizmet sayfaları (9 hizmet)
│   │   ├── hakkimizda/          ← Kurumsal sayfalar
│   │   ├── iletisim/            ← İletişim formu
│   │   ├── sss/                 ← S.S.S (veritabanından dinamik)
│   │   ├── blog/                ← Blog (liste, slug, yazar, etiket, kategori)
│   │   ├── referanslar/         ← Referans projeler
│   │   ├── admin/               ← Admin paneli (JWT korumalı)
│   │   └── ...                  ← Diğer içerik sayfaları
│   ├── api/
│   │   ├── lead/route.ts        ← Lead yakalama uç noktası
│   │   ├── auth/                ← JWT login/logout
│   │   └── faqs/                ← SSS API
│   ├── sitemap.ts               ← Dinamik sitemap
│   ├── robots.ts                ← robots.txt
│   ├── manifest.ts              ← PWA manifest (favicon ikonları)
│   ├── favicon.ico              ← Kartal logosu (32x32)
│   └── llms.txt/route.ts        ← AI motoru beslemesi (GEO)
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
