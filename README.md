<div align="center">

# Alo Yönetim

**İstanbul'un Önde Gelen Profesyonel Tesis Yönetim Şirketi**

Aidat takibi · Güvenlik · Teknik bakım · Temizlik · Peyzaj · Hukuki danışmanlık

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

</div>

---

## 🚀 Hızlı Başlangıç

**Windows kullanıcıları** — `dev.bat`'a çift tıkla, menüden `[1]`'i seç.

**Manuel kurulum:**
```bash
git clone https://github.com/salihoglueyup/tasarim5.git
cd tasarim5
cp .env.example .env.local   # ortam değişkenlerini doldur
npm install
npm run dev
```

Tarayıcıda: **[http://localhost:3000](http://localhost:3000)**

---

## 🏗️ Proje Mimarisi

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 · App Router · Turbopack |
| Dil | TypeScript 5 |
| Stil | Tailwind CSS 4 (JIT) · Slate & Titanium paleti |
| Animasyon | Framer Motion (LazyMotion) |
| Barındırma | Vercel (Edge Network) |
| Veritabanı | Supabase (Leads tablosu) |
| E-posta | Resend |

### Klasör Yapısı (Özet)

```
src/
├── app/[lang]/          → i18n sayfalar (288 rota: /tr/* ve /en/*)
│   ├── hizmetler/       → 8 hizmet sayfası
│   ├── bolgeler/        → 12 ilçe × 8 hizmet (96 yerel sayfa)
│   └── blog/            → Blog sistemi (makale, yazar, etiket, kategori)
├── components/          → Layout, Section, UI, Blog, Modal bileşenleri
├── lib/                 → Schemas (JSON-LD), Translations (i18n), Analytics
└── hooks/               → useLeadSubmit, useScrollProgress vb.
```

> Detaylı mimari için: [docs/architecture/OVERVIEW.md](docs/architecture/OVERVIEW.md)

---

## ⚙️ Ortam Değişkenleri

`.env.example`'ı kopyala ve değerleri doldur:

```bash
cp .env.example .env.local
```

| Değişken | Açıklama |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitenin tam URL'si |
| `RESEND_API_KEY` | Lead e-posta bildirimleri |
| `TELEGRAM_BOT_TOKEN` | Anlık Telegram bildirimleri |
| `SUPABASE_URL` | Lead veritabanı |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 |

> Tam liste ve Vercel kurulumu: [docs/dev/DEPLOYMENT.md](docs/dev/DEPLOYMENT.md)

---

## 🗺️ Dokümantasyon

| Belge | Açıklama |
|---|---|
| [docs/dev/SETUP.md](docs/dev/SETUP.md) | Yerel kurulum ve sık sorulan sorunlar |
| [docs/dev/DEPLOYMENT.md](docs/dev/DEPLOYMENT.md) | Vercel deploy + ortam değişkenleri |
| [docs/dev/CONTRIBUTING.md](docs/dev/CONTRIBUTING.md) | Commit formatı, kod standartları, PR süreci |
| [docs/architecture/OVERVIEW.md](docs/architecture/OVERVIEW.md) | Proje mimarisi, klasör yapısı, render stratejisi |
| [docs/architecture/LEAD_SYSTEM.md](docs/architecture/LEAD_SYSTEM.md) | Lead/form sistemi kurulumu |
| [docs/seo/README.md](docs/seo/README.md) | SEO stratejisi ve belgelerine giriş |
| [docs/content/CALENDAR.md](docs/content/CALENDAR.md) | Blog yayın takvimi |

---

## 📊 Performans Hedefleri

| Metrik | Hedef | Durum |
|---|---|---|
| Lighthouse Performance | ≥ 90 | ✅ ~98 |
| Lighthouse SEO | ≥ 95 | ✅ ~98 |
| Lighthouse Accessibility | ≥ 90 | ✅ 100 |
| LCP | < 2.0s | ✅ ~1.1s |
| CLS | < 0.05 | ✅ 0.00 |
| İlk JS Bundle | < 200 KB | ✅ ~137 KB |
| Build süresi (288 rota) | — | ✅ ~5.8s |

---

## 🛠️ Geliştirici Komutları

```bash
npm run dev          # Dev sunucu (localhost:3000)
npm run build        # Production build
npm run start        # Production önizleme
npx tsc --noEmit     # TypeScript kontrolü
npx eslint src       # Lint kontrolü
npx playwright test  # E2E testler
node scripts/seo-audit.mjs        # SEO dosya denetimi
node scripts/validate-jsonld.mjs  # JSON-LD doğrulama
```

> **Windows kısayolu:** `dev.bat` — 22 işlemi tek menüden yönet

---

## 🌐 Canlı Ortam

- **Production:** [https://aloyonetim.com](https://aloyonetim.com)
- **Deploy:** Vercel (main branch → otomatik)
- **CI:** Lighthouse CI (`lighthouserc.json`)

---

## 📄 Lisans

Tüm hakları saklıdır © 2024 Alo Yönetim Tesis Yönetimi A.Ş.
