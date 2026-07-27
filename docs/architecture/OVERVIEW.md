# 🏗️ Proje Mimarisine Genel Bakış

## Teknoloji Yığını

| Katman | Teknoloji | Sürüm |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Bundler | Turbopack | (Next.js ile birlikte) |
| Dil | TypeScript | 5.x |
| Stil | Tailwind CSS | 4.x (JIT) |
| Animasyon | Framer Motion (`LazyMotion`) | 12.x |
| Font | Plus Jakarta Sans (next/font) | — |
| Barındırma | Vercel (Edge Network) | — |

---

## Klasör Yapısı

```
src/
├── app/
│   ├── [lang]/                  ← i18n rotalar (tr / en)
│   │   ├── layout.tsx           ← Root layout, meta, analytics
│   │   ├── page.tsx             ← Ana sayfa
│   │   ├── hizmetler/           ← Hizmet sayfaları (8 hizmet)
│   │   ├── bolgeler/            ← Yerel sayfalar (12 ilçe × 8 hizmet)
│   │   ├── blog/                ← Blog (liste, slug, yazar, etiket, kategori)
│   │   ├── iletisim/            ← İletişim formu
│   │   ├── teklif-al/           ← Teklif sihirbazı
│   │   ├── hesaplayici/         ← Aidat hesaplama aracı
│   │   └── ...                  ← Diğer içerik sayfaları
│   ├── api/
│   │   ├── lead/route.ts        ← Lead yakalama uç noktası
│   │   └── summary/route.ts     ← AI özet uç noktası (GEO)
│   ├── sitemap.ts               ← Dinamik sitemap (288 rota)
│   ├── robots.ts                ← robots.txt (AI bot politikası dahil)
│   ├── llms.txt/route.ts        ← AI motoru beslemesi (GEO)
│   └── llms-full.txt/route.ts   ← Genişletilmiş AI içeriği
│
├── components/
│   ├── layout/                  ← Header, Footer, NavigationWrapper
│   ├── sections/                ← Sayfa kesitleri (Hero, Statistics vb.)
│   ├── ui/                      ← Atomik bileşenler (Button, Card, Badge)
│   ├── blog/                    ← Blog özel bileşenler
│   ├── cro/                     ← Dönüşüm odaklı bileşenler (CallbackForm)
│   └── modals/                  ← Portal, Quote, Login modal'ları
│
├── lib/
│   ├── schemas.ts               ← JSON-LD şema fabrikası (Organization, FAQ vb.)
│   ├── translations.ts          ← i18n metin sözlüğü (tr/en)
│   ├── analytics.ts             ← GA4 event helper'ları
│   └── leads/                   ← Lead dispatch sistemi
│
└── hooks/                       ← useLeadSubmit, useScrollProgress vb.
```

---

## i18n Mimarisi

- Tüm sayfalar `/[lang]/` altında: `/tr/hakkimizda`, `/en/about`
- `lang` parametresi `tr` veya `en` alır
- Çeviriler merkezi `translations.ts`'te — `t(key)` fonksiyonuyla erişilir
- `hreflang` ve canonical meta tag'ler `layout.tsx`'te otomatik oluşur

## Render Stratejisi

| Sayfa Tipi | Strateji | Revalidate |
|---|---|---|
| Ana sayfa, hizmetler | `dynamic` (SSR) | — |
| Blog makaleleri | SSG + ISR | 1 gün |
| Bölge/ilçe sayfaları | SSG (`generateStaticParams`) | 1 gün |
| API rotaları | Serverless Function | — |
| Sitemap, robots, llms | Route Handler | — |

## Renk Paleti (Slate & Titanium)

```css
/* Ana renk sistemi — globals.css */
--color-primary:    slate-950 (koyu mod: white)
--color-secondary:  slate-600 (koyu mod: slate-300)
--color-surface:    white     (koyu mod: slate-900)

/* CTA Butonları */
bg-slate-900 text-white      /* Aydınlık mod */
dark:bg-white dark:text-slate-950  /* Koyu mod */

/* Vurgu rengi */
text-emerald-600             /* İkonlar, rozet sayaçları */
```

> **Not:** Mavi (`blue-*`) sınıfları projede kullanılmaz — bkz. [../dev/CONTRIBUTING.md](../dev/CONTRIBUTING.md)

## JSON-LD Schema Mimarisi

Tüm schema üretimi `src/lib/schemas.ts`'teki fabrika fonksiyonlarından gelir:

```
organizationSchema()       → Organization (NAP, sameAs, sosyal)
webSiteSchema()            → WebSite + SearchAction
serviceSchema(service)     → Service (hizmet detayları)
localBusinessSchema(ilce)  → LocalBusiness (yerel sayfalar)
faqSchema(items)           → FAQPage
articleSchema(post)        → Article (blog)
breadcrumbSchema(items)    → BreadcrumbList
```

---

**İlgili belgeler:**
- [LEAD_SYSTEM.md](LEAD_SYSTEM.md) — Lead yakalama sistemi kurulumu
- [PERFORMANCE.md](PERFORMANCE.md) — Core Web Vitals bütçesi
- [A11Y.md](A11Y.md) — Erişilebilirlik durumu
