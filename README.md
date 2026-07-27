<div align="center">

<img src="https://raw.githubusercontent.com/salihoglueyup/tasarim5/seo/master-plan-v4/public/images/logos/new-icon-Photoroom.webp" alt="Alo Yönetim Logo" width="120" />

# Alo Yönetim

**İstanbul'un Önde Gelen Profesyonel Tesis Yönetim Uygulaması**

Aidat Yönetimi · Güvenlik · Teknik Bakım · Temizlik · Peyzaj · Hukuki Danışmanlık

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-98%2F100-green?logo=lighthouse&logoColor=white)](#-seo--performans)
[![Routes](https://img.shields.io/badge/Sayfalar-288%20Rota-1a1a2e?logoColor=white)](#-proje-mimarisi)
[![i18n](https://img.shields.io/badge/Dil-TR%20%7C%20EN-0055A4?logoColor=white)](#)
[![Status](https://img.shields.io/badge/Durum-Aktif%20Geliştirme-22c55e?logoColor=white)](#)

<br/>

[🌐 Canlı Siteyi Gör](https://aloyonetim.com) &nbsp;&nbsp;|&nbsp;&nbsp; [📚 Dokümantasyon](docs/README.md) &nbsp;&nbsp;|&nbsp;&nbsp; [🚀 Hızlı Başlangıç](#-hızlı-başlangıç)

</div>

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Öne Çıkan Özellikler](#-öne-çıkan-özellikler)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Proje Mimarisi](#-proje-mimarisi)
- [Ortam Değişkenleri](#-ortam-değişkenleri)
- [SEO & Performans](#-seo--performans)
- [Dokümantasyon](#-dokümantasyon)
- [Geliştirici Komutları](#-geliştirici-komutları)
- [Canlıya Alma](#-canlıya-alma)
- [Katkıda Bulunma](#-katkıda-bulunma)

---

## 🏢 Proje Hakkında

**Alo Yönetim**, İstanbul genelinde 12 ilçede faaliyet gösteren, **site, rezidans, AVM ve plaza** gibi yapıların profesyonel yönetimini sağlayan bir tesis yönetim şirketinin kurumsal web uygulamasıdır.

Bu repo; **Next.js 16 (App Router)** üzerine inşa edilmiş, çift dilli (TR/EN), 288 rotalı, tam SEO optimize edilmiş web uygulamasının kaynak kodunu içerir. Proje; programatik yerel SEO, AI/GEO görünürlük altyapısı, gerçek zamanlı lead yakalama sistemi ve Core Web Vitals odaklı performans mimarisiyle kurumsal standartlarda tasarlanmıştır.

---

## ✨ Öne Çıkan Özellikler

| Özellik | Detay |
|---|---|
| 🗺️ **288 Sayfa** | 12 ilçe × 8 hizmet programatik rota + blog + kurumsal sayfalar |
| 🌐 **Çift Dil** | /tr ve /en tam i18n — hreflang, canonical, alternates |
| 🤖 **GEO / AI SEO** | llms.txt, llms-full.txt, /api/summary — ChatGPT, Gemini, Perplexity uyumlu |
| 📊 **JSON-LD Schema** | Organization, Service, FAQ, Article, LocalBusiness, BreadcrumbList |
| ⚡ **~1.1s LCP** | Turbopack + ISR + Vercel Edge Network |
| ♿ **100 A11y** | WCAG 2.2 AA — klavye nav, focus-trap, ARIA, prefers-reduced-motion |
| 📧 **Lead Sistemi** | E-posta (Resend) + Telegram Bot + Supabase — env-gated, sıfır çökme |
| 🌙 **Dark Mode** | Sistem tercihi + manuel toggle — Slate & Titanium paleti |
| 🔒 **Güvenlik** | CSP, HSTS, X-Frame-Options, X-Content-Type başlıkları |
| 📈 **Lighthouse CI** | Her PR'da otomatik performans/SEO/a11y denetimi |
| 📡 **IndexNow** | Bing & Yandex anlık sayfa indeksleme |
| 🧮 **Hesaplama Araçları** | Aidat hesaplama, İstihdam köprüsü interaktif sayfalar |

---

## 🚀 Hızlı Başlangıç

### Windows — dev.bat (Önerilen)
\\\
dev.bat dosyasına çift tıkla → Menüden [1] seç → http://localhost:3000
\\\

### Manuel Kurulum
\\\ash
git clone https://github.com/salihoglueyup/tasarim5.git
cd tasarim5
cp .env.example .env.local   # Ortam değişkenlerini doldur
npm install
npm run dev
\\\

Tarayıcıda: **[http://localhost:3000](http://localhost:3000)**

> 📖 Detaylı kurulum: [docs/dev/SETUP.md](docs/dev/SETUP.md)

---

## 🏗️ Proje Mimarisi

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 · App Router · Turbopack |
| Dil | TypeScript 5 |
| Stil | Tailwind CSS 4 (JIT) · Slate & Titanium paleti |
| Animasyon | Framer Motion (LazyMotion) |
| Font | Plus Jakarta Sans (next/font) |
| Barındırma | Vercel (Edge Network) |
| Veritabanı | Supabase (Lead tablosu) |
| E-posta | Resend |
| Analitik | Google Analytics 4 · Microsoft Clarity |

### Klasör Yapısı

\\\
src/
├── app/[lang]/           → i18n sayfalar (288 rota: /tr/* ve /en/*)
│   ├── hizmetler/        → 8 hizmet sayfası
│   ├── bolgeler/         → 12 ilçe × 8 hizmet (96 yerel sayfa)
│   ├── blog/             → Blog (makale, yazar, etiket, kategori)
│   ├── hesaplayici/      → Aidat hesaplama aracı
│   └── kurumsal/         → Hakkımızda, vizyon, sürdürülebilirlik
├── components/           → Layout, Section, UI, Blog, Modal bileşenleri
├── lib/                  → Schemas (JSON-LD), Translations (i18n), Analytics
└── hooks/                → useLeadSubmit, useScrollProgress vb.
\\\

> 📖 Detaylı mimari: [docs/architecture/OVERVIEW.md](docs/architecture/OVERVIEW.md)

---

## ⚙️ Ortam Değişkenleri

\\\ash
cp .env.example .env.local
\\\

| Değişken | Açıklama | Zorunlu |
|---|---|---|
| \NEXT_PUBLIC_SITE_URL\ | Sitenin tam URL'si | ✅ |
| \NEXT_PUBLIC_WHATSAPP_NUMBER\ | WhatsApp numarası | ✅ |
| \RESEND_API_KEY\ | Lead e-posta bildirimleri | Opsiyonel |
| \TELEGRAM_BOT_TOKEN\ | Anlık Telegram bildirimleri | Opsiyonel |
| \SUPABASE_URL\ | Lead veritabanı URL | Opsiyonel |
| \SUPABASE_SERVICE_ROLE_KEY\ | Veritabanı gizli anahtarı ⚠️ | Opsiyonel |
| \NEXT_PUBLIC_GA_ID\ | Google Analytics 4 | Opsiyonel |
| \NEXT_PUBLIC_CLARITY_ID\ | Microsoft Clarity | Opsiyonel |
| \INDEXNOW_KEY\ | Bing/Yandex anlık indeks | Opsiyonel |

> ⚠️ \SUPABASE_SERVICE_ROLE_KEY\ asla \NEXT_PUBLIC_\ prefix'i almamalı.
> 📖 Tam Vercel kurulumu: [docs/dev/DEPLOYMENT.md](docs/dev/DEPLOYMENT.md)

---

## 🔍 SEO & Performans

### Core Web Vitals & Lighthouse

| Metrik | Hedef | Sonuç |
|---|---|---|
| Lighthouse Performance | ≥ 90 | ✅ **~98** |
| Lighthouse SEO | ≥ 95 | ✅ **~98** |
| Lighthouse Accessibility | ≥ 90 | ✅ **100** |
| LCP (Largest Contentful Paint) | < 2.0s | ✅ **~1.1s** |
| CLS (Cumulative Layout Shift) | < 0.05 | ✅ **0.00** |
| INP (Interaction to Next Paint) | < 200ms | ✅ **< 28ms** |
| İlk JS Bundle | < 200 KB | ✅ **~137 KB** |
| Build süresi (288 rota) | — | ✅ **~5.8s** |

### SEO Altyapısı

- 🗺️ **Dinamik Sitemap** — 288 URL, öncelik ve lastmod ile
- 🤖 **AI/GEO** — llms.txt, llms-full.txt, /api/summary uç noktası
- 📊 **Zengin Schema** — 8 farklı JSON-LD tipi, tek fabrikadan
- 📍 **Programatik Yerel SEO** — 12 ilçe × 8 hizmet = 96 benzersiz sayfa
- ⚡ **IndexNow** — Bing & Yandex'e anlık sayfa bildirimi
- 🔗 **Hreflang** — TR/EN çapraz dil etiketleri

> 📖 SEO stratejisi: [docs/seo/README.md](docs/seo/README.md)

---

## 🗺️ Dokümantasyon

| Belge | Açıklama |
|---|---|
| [docs/dev/SETUP.md](docs/dev/SETUP.md) | Yerel kurulum ve sık sorulan sorunlar |
| [docs/dev/DEPLOYMENT.md](docs/dev/DEPLOYMENT.md) | Vercel deploy + ortam değişkenleri tam listesi |
| [docs/dev/CONTRIBUTING.md](docs/dev/CONTRIBUTING.md) | Commit formatı, kod standartları, PR süreci |
| [docs/architecture/OVERVIEW.md](docs/architecture/OVERVIEW.md) | Mimari, klasör yapısı, render stratejisi |
| [docs/architecture/LEAD_SYSTEM.md](docs/architecture/LEAD_SYSTEM.md) | Lead/form sistemi kurulumu (Resend, Telegram, Supabase) |
| [docs/seo/README.md](docs/seo/README.md) | SEO stratejisi ve belgelerine giriş |
| [docs/content/CALENDAR.md](docs/content/CALENDAR.md) | Blog yayın takvimi ve mevsimsel planlama |

---

## 🛠️ Geliştirici Komutları

\\\ash
npm run dev                        # Dev sunucu → localhost:3000
npm run build                      # Production build (288 rota)
npm run start                      # Production önizleme
npx tsc --noEmit                   # TypeScript tip kontrolü
npx eslint src --ext .ts,.tsx      # Lint kontrolü
npx vitest run                     # Unit testler
npx playwright test                # E2E testler
node scripts/seo-audit.mjs         # SEO dosya denetimi
node scripts/validate-jsonld.mjs   # JSON-LD şema doğrulama
\\\

> 🪟 **Windows kısayolu:** \dev.bat\ — 22 geliştirici işlemini tek menüden yönet

---

## 🌐 Canlıya Alma

- **Production:** [https://aloyonetim.com](https://aloyonetim.com)
- **Platform:** Vercel (main branch → otomatik deploy)
- **CI:** Lighthouse CI (\lighthouserc.json\) — PR'da otomatik çalışır
- **Monitoring:** Google Analytics 4 + Microsoft Clarity + Web Vitals API

---

## 🤝 Katkıda Bulunma

\\\ash
# 1. Branch aç
git checkout -b feat/ozellik-adi

# 2. Değişikliğini yap, ardından test et
npm run build          # 288 rota hatasız derlenmelidir
npx tsc --noEmit       # Tip hatası olmamalı

# 3. Commit (Conventional Commits formatı)
git commit -m "feat(scope): kısa açıklama"

# 4. Push + Pull Request aç
git push origin feat/ozellik-adi
\\\

**Commit tipleri:** \eat\ · \ix\ · \perf\ · \style\ · \efactor\ · \docs\ · \chore\

> 📖 Detaylı katkı rehberi: [docs/dev/CONTRIBUTING.md](docs/dev/CONTRIBUTING.md)

---

## 📄 Lisans

Tüm hakları saklıdır © 2025 – 2026 Alo Yönetim Tesis Yönetimi A.Ş.
