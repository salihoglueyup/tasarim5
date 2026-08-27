# 📚 Proje Dokümantasyonu

Bu dizin, **Alo Yönetim Web Uygulaması**'nın tüm teknik, içerik ve strateji belgelerini barındırır.

## 🗂️ Klasör Yapısı

```
docs/
├── dev/            → Geliştirici kılavuzları (kurulum, deploy, Docker, env, test)
├── admin/          → Admin paneli kullanım rehberi
├── i18n/           → Çoklu dil mimarisi ve çeviri rehberleri
├── architecture/   → Sistem mimarisi, middleware, API referansı, schema, lead sistemi
├── components/     → Bileşen haritası (layout, sections, SEO bileşenleri)
├── ai/             → AI & GEO motoru, bot telemetri, bilgi corpus
├── seo/            → SEO stratejisi, motorlar, keyword haritası, raporlar
├── content/        → İçerik takvimi, kümeler, yazım kuralları
├── optimization/   → Performans optimizasyon notları
└── changelog/      → Proje geliştirme tarihi
```

---

## 📖 Hangi Belgeyi Ne Zaman Oku?

### 🚀 Kurulum & Deploy

| Durum | Belge |
|---|---|
| Projeyi ilk kez kurmak istiyorum | [dev/SETUP.md](dev/SETUP.md) |
| Sunucuya deploy edeceğim | [dev/DEPLOYMENT.md](dev/DEPLOYMENT.md) |
| Docker servislerini anlamak istiyorum | [dev/DOCKER.md](dev/DOCKER.md) |
| Veritabanı / Prisma hakkında bilgi istiyorum | [dev/DATABASE.md](dev/DATABASE.md) |
| Tüm env değişkenlerini görmek istiyorum | [dev/ENVIRONMENT.md](dev/ENVIRONMENT.md) |
| Test altyapısını anlamak istiyorum | [dev/TESTING.md](dev/TESTING.md) |
| Kod katkısı yapacağım | [dev/CONTRIBUTING.md](dev/CONTRIBUTING.md) |

### 🛠️ Admin Paneli

| Durum | Belge |
|---|---|
| Admin panelini nasıl kullanırım | [admin/README.md](admin/README.md) |
| Blog yazısı nasıl eklerim | [admin/README.md](admin/README.md) |
| Lead'leri nereden görürüm | [admin/README.md](admin/README.md) |
| Bot telemetri verilerini görmek istiyorum | [ai/BOT_TELEMETRY.md](ai/BOT_TELEMETRY.md) |

### 🌍 Çoklu Dil (i18n)

| Durum | Belge |
|---|---|
| Dil mimarisini anlamak istiyorum | [i18n/README.md](i18n/README.md) |
| Yeni çeviri eklemek istiyorum | [i18n/TRANSLATION_GUIDE.md](i18n/TRANSLATION_GUIDE.md) |

### 🏗️ Mimari & Teknik

| Durum | Belge |
|---|---|
| Proje mimarisini anlamak istiyorum | [architecture/OVERVIEW.md](architecture/OVERVIEW.md) |
| Middleware'i anlamak istiyorum | [architecture/MIDDLEWARE.md](architecture/MIDDLEWARE.md) |
| Tüm API endpoint'lerini görmek istiyorum | [architecture/API_REFERENCE.md](architecture/API_REFERENCE.md) |
| JSON-LD şemalarını anlamak istiyorum | [architecture/SCHEMA_REFERENCE.md](architecture/SCHEMA_REFERENCE.md) |
| Lead/form sistemini kurmak istiyorum | [architecture/LEAD_SYSTEM.md](architecture/LEAD_SYSTEM.md) |
| Performans bütçesine bakmak istiyorum | [architecture/PERFORMANCE.md](architecture/PERFORMANCE.md) |
| Erişilebilirlik durumunu görmek istiyorum | [architecture/A11Y.md](architecture/A11Y.md) |

### 🧩 Bileşenler

| Durum | Belge |
|---|---|
| Hangi bileşen ne yapar? | [components/README.md](components/README.md) |
| 82 SEO bileşenini listelemek istiyorum | [components/SEO_COMPONENTS.md](components/SEO_COMPONENTS.md) |

### 🤖 AI & GEO Motoru

| Durum | Belge |
|---|---|
| GEO stratejisini anlamak istiyorum | [ai/GEO_ENGINE.md](ai/GEO_ENGINE.md) |
| Bot telemetri sistemini anlamak istiyorum | [ai/BOT_TELEMETRY.md](ai/BOT_TELEMETRY.md) |
| AI bilgi corpus'u anlamak istiyorum | [ai/AI_KNOWLEDGE_CORPUS.md](ai/AI_KNOWLEDGE_CORPUS.md) |

### 🔍 SEO

| Durum | Belge |
|---|---|
| SEO motor kütüphanesini anlamak istiyorum | [seo/SEO_ENGINE_REFERENCE.md](seo/SEO_ENGINE_REFERENCE.md) |
| SEO stratejisini anlamak istiyorum | [seo/README.md](seo/README.md) |
| Anahtar kelime haritasına bakmak istiyorum | [seo/KEYWORD_MAP.md](seo/KEYWORD_MAP.md) |
| SEO yol haritası | [seo/ROADMAP.md](seo/ROADMAP.md) |
| SEO denetim kontrol listesi (aylık) | [seo/AUDIT_CHECKLIST.md](seo/AUDIT_CHECKLIST.md) |
| AI/GEO görünürlük stratejisi | [seo/GEO_STRATEGY.md](seo/GEO_STRATEGY.md) |
| 250+ faz optimizasyon planı | [seo/OPTIMIZATION_PLAN.md](seo/OPTIMIZATION_PLAN.md) |
| GEO & AI motor raporu | [seo/GEO_AI_ARAMA_STRATEJI_VE_MOTOR_RAPORU.md](seo/GEO_AI_ARAMA_STRATEJI_VE_MOTOR_RAPORU.md) |

### ✍️ İçerik

| Durum | Belge |
|---|---|
| Yeni blog içeriği yazacağım | [content/CALENDAR.md](content/CALENDAR.md) |
| İçerik standartlarını öğrenmek istiyorum | [content/GUIDELINES.md](content/GUIDELINES.md) |
| İçerik kümelerini görmek istiyorum | [content/CLUSTERS.md](content/CLUSTERS.md) |

### 📜 Tarihçe

| Durum | Belge |
|---|---|
| Projenin geliştirme geçmişine bakmak istiyorum | [changelog/HISTORY.md](changelog/HISTORY.md) |

---

## 🔗 Hızlı Erişim

- **Ana README:** [../README.md](../README.md)
- **Ortam Değişkenleri:** [dev/ENVIRONMENT.md](dev/ENVIRONMENT.md) — Tam referans
- **Env Şablonu:** [../.env.example](../.env.example)
- **API Referansı:** [architecture/API_REFERENCE.md](architecture/API_REFERENCE.md)
- **Admin Paneli:** `https://aloyonetim.com.tr/tr/admin`
- **Prisma Studio:** `http://localhost:5555`
- **N8N Otomasyon:** `http://localhost:5678`

---



| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16.3.0 (App Router, Turbopack, React 19.2.4) |
| Dil | TypeScript 5 |
| Stil | Tailwind CSS 4 (PostCSS + Typography) |
| Animasyon | Framer Motion 12 |
| ORM | Prisma 7.9.1 (PostgreSQL adapter, `prisma.config.ts`) |
| Veritabanı | PostgreSQL 16 / 15-alpine (Port 5432) |
| Önbellek | Redis Alpine (ioredis + AOF, Port 6379) |
| Auth | JOSE (JWT tabanlı Admin Auth) |
| Container | Docker Compose (5 Servis: `web`, `postgres`, `redis`, `prisma-studio`, `n8n`) |
| Otomasyon | N8N Workflow Engine (Port 5678) |
| CDN / Proxy | Cloudflare (SSL + HSTS + Speculation Rules) |
| i18n | Next.js App Router + JSON sözlükler (4 dil: `tr`, `en`, `ru`, `ar`) |
| Barındırma | Kendi Linux sunucusu (Docker Multi-stage) |
