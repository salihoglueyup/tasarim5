# 📚 Proje Dokümantasyonu

Bu dizin, **Alo Yönetim Web Uygulaması**'nın tüm teknik, içerik ve strateji belgelerini barındırır.

## 🗂️ Klasör Yapısı

```
docs/
├── dev/            → Geliştirici kılavuzları (kurulum, deploy, Docker, veritabanı)
├── admin/          → Admin paneli kullanım rehberi
├── i18n/           → Çoklu dil mimarisi ve çeviri rehberleri
├── architecture/   → Sistem mimarisi, lead sistemi, performans, erişilebilirlik
├── seo/            → SEO stratejisi, anahtar kelime haritası, yol haritası, raporlar
├── content/        → İçerik takvimi, kümeler, yazım kuralları
└── changelog/      → Proje geliştirme tarihi
```

---

## 📖 Hangi Belgeyi Ne Zaman Oku?

### 🚀 Kurulum & Deploy

| Durum | Belge |
|---|---|
| Projeyi ilk kez sunucuya kurmak istiyorum | [dev/DEPLOYMENT.md](dev/DEPLOYMENT.md) |
| Local geliştirme ortamı kurmak istiyorum | [dev/SETUP.md](dev/SETUP.md) |
| Docker servislerini anlamak istiyorum | [dev/DOCKER.md](dev/DOCKER.md) |
| Veritabanı / Prisma hakkında bilgi istiyorum | [dev/DATABASE.md](dev/DATABASE.md) |
| Kod katkısı yapacağım | [dev/CONTRIBUTING.md](dev/CONTRIBUTING.md) |
| Makefile komutlarını görmek istiyorum | [dev/DEPLOYMENT.md](dev/DEPLOYMENT.md) |

### 🛠️ Admin Paneli

| Durum | Belge |
|---|---|
| Admin panelini nasıl kullanırım | [admin/README.md](admin/README.md) |
| Blog yazısı nasıl eklerim | [admin/README.md](admin/README.md) |
| Lead'leri nereden görürüm | [admin/README.md](admin/README.md) |
| SSS nasıl yönetirim | [admin/README.md](admin/README.md) |

### 🌍 Çoklu Dil (i18n)

| Durum | Belge |
|---|---|
| Dil mimarisini anlamak istiyorum | [i18n/README.md](i18n/README.md) |
| Yeni çeviri eklemek istiyorum | [i18n/TRANSLATION_GUIDE.md](i18n/TRANSLATION_GUIDE.md) |

### 🏗️ Mimari & Teknik

| Durum | Belge |
|---|---|
| Proje mimarisini anlamak istiyorum | [architecture/OVERVIEW.md](architecture/OVERVIEW.md) |
| Lead/form sistemini kurmak istiyorum | [architecture/LEAD_SYSTEM.md](architecture/LEAD_SYSTEM.md) |
| Performans bütçesine bakmak istiyorum | [architecture/PERFORMANCE.md](architecture/PERFORMANCE.md) |
| Erişilebilirlik durumunu görmek istiyorum | [architecture/A11Y.md](architecture/A11Y.md) |

### 🔍 SEO

| Durum | Belge |
|---|---|
| SEO stratejisini anlamak istiyorum | [seo/README.md](seo/README.md) |
| Anahtar kelime haritasına bakmak istiyorum | [seo/KEYWORD_MAP.md](seo/KEYWORD_MAP.md) |
| SEO yol haritası | [seo/ROADMAP.md](seo/ROADMAP.md) |
| SEO denetim kontrol listesi (aylık) | [seo/AUDIT_CHECKLIST.md](seo/AUDIT_CHECKLIST.md) |
| Off-page / GBP aksiyonları | [seo/OFFPAGE_PLAN.md](seo/OFFPAGE_PLAN.md) |
| AI/GEO görünürlük stratejisi | [seo/GEO_STRATEGY.md](seo/GEO_STRATEGY.md) |
| 250+ faz optimizasyon planı | [seo/OPTIMIZATION_PLAN.md](seo/OPTIMIZATION_PLAN.md) |
| Aylık KPI raporları | [seo/reports/](seo/reports/) |

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
- **Ortam Değişkenleri Şablonu:** [../.env.example](../.env.example)
- **Docker Komutları:** `make help` veya [dev/DEPLOYMENT.md](dev/DEPLOYMENT.md)
- **Admin Paneli:** `https://aloyonetim.com.tr/tr/admin`
- **Prisma Studio:** `http://localhost:5555`

---

## 🏗️ Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Dil | TypeScript |
| Stil | Tailwind CSS 4 |
| Animasyon | Framer Motion |
| ORM | Prisma 7 (PostgreSQL adapter) |
| Veritabanı | PostgreSQL 15 |
| Önbellek | Redis (ioredis) |
| Auth | JOSE (JWT) |
| Container | Docker Compose |
| Otomasyon | N8N |
| CDN / Proxy | Cloudflare |
| i18n | Next.js App Router + JSON sözlükler (4 dil) |
| Barındırma | Kendi Linux sunucusu |
