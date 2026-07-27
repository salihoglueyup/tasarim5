# Performans Bütçesi

> **Amaç (SEO Master Plan V4 — Faz 210):** Core Web Vitals hedeflerini korumak için sayfa
> başına ağırlık ve metrik bütçeleri. Lighthouse CI ([lighthouserc.json](lighthouserc.json))
> bu eşikleri her PR'da denetler (Faz 208).

## Core Web Vitals hedefleri

| Metrik | Hedef | Uyarı eşiği (CI) |
|--------|-------|------------------|
| LCP (Largest Contentful Paint) | < 2.0s | 2.5s |
| INP (Interaction to Next Paint) | < 200ms | — |
| CLS (Cumulative Layout Shift) | < 0.05 | 0.05 |
| TBT (Total Blocking Time, lab) | < 200ms | 300ms |
| TTFB | < 0.6s | — |

## Lighthouse kategori hedefleri

| Kategori | Hedef | CI |
|----------|-------|-----|
| Performance | ≥ 90 | warn < 0.90 |
| Accessibility | ≥ 90 | warn < 0.90 |
| SEO | ≥ 95 | **error** < 0.95 |
| Best Practices | ≥ 90 | warn < 0.90 |

## Ağırlık bütçeleri (sayfa başına, sıkıştırılmış)

| Kaynak | Bütçe | Not |
|--------|-------|-----|
| İlk JS (initial) | ≤ 200 KB | Header/QuoteModal lazy (Faz 191/192) |
| CSS | ≤ 60 KB | Tailwind 4 JIT purge (Faz 196) |
| Font | ≤ 120 KB | Inter + Plus Jakarta, latin+latin-ext subset (Faz 185) |
| LCP görseli | ≤ 150 KB | hero-poster.webp (Faz 182) |
| 3rd-party (GA + Clarity) | ≤ 60 KB | lazyOnload (Faz 189) |
| Toplam (fold-üstü) | ≤ 600 KB | — |

## Uygulanan optimizasyonlar (Bölüm H)

- **LCP:** Hero video `preload="none"` + `poster="/images/hero-poster.webp"` (Faz 181/182)
- **Görsel:** `next/image` AVIF/WebP (`next.config.ts` formats); uzak görsel `images.unsplash.com` preconnect (Faz 197)
- **Font:** `next/font` self-host, `display:swap`, latin-ext subset (Faz 185)
- **CLS:** görsel/iframe'lerde `width/height`; `prefers-reduced-motion` desteği (Faz 187/202/203/204)
- **JS:** QuoteModal `next/dynamic` (Faz 192); ana sayfa fold-altı bileşenleri dinamik (Faz 194)
- **3rd-party:** Clarity `lazyOnload`; GA `@next/third-parties` (afterInteractive) yalnız env tanımlıysa (Faz 189/206)
- **Cache:** statik `/images`, `/video` için `max-age=31536000, immutable`; HSTS (Faz 205/36)
- **ISR/statik:** yerel, blog ve arşiv sayfaları SSG + ISR (revalidate 1g) (Faz 199)

## Bilinen borçlar / izleme

- **Material Symbols** ikon font'u stylesheet link ile yükleniyor (`display=swap`); render-blocking
  etkisi izlenmeli, gerekirse kritik ikonlar SVG'ye taşınmalı (Faz 186).
- **translations.ts** dile göre bölünebilir (Faz 193) — mevcut haliyle tek dosya yükleniyor.
- **Saha CWV (Faz 209):** `WebVitals` bileşeni GA4'e web-vitals gönderir; CrUX panosu ile
  lab-saha farkı izlenir.

## İzleme

- Lab: Lighthouse CI (her PR) + manuel mobil kısıtlı 4G testi (Faz 207).
- Saha: GA4 Web Vitals + Google Search Console CWV raporu (aylık gözden geçirme).
