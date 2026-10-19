<div align="center">

<img src="https://raw.githubusercontent.com/salihoglueyup/tasarim5/seo/master-plan-v4/public/images/logos/new-icon-Photoroom.webp" alt="Alo Yönetim Logo" width="120" />

# Alo Yönetim

**İstanbul Profesyonel Site, Rezidans, Plaza ve Tesis Yönetimi Platformu**

Aidat Yönetimi · 5188 Özel Güvenlik · Teknik Bakım · Temizlik · Peyzaj · Hukuki Süreç Takibi

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7.9-2D3748?logo=prisma&logoColor=white)](https://prisma.io)
[![Docker](https://img.shields.io/badge/Docker-5%20Servis-2496ED?logo=docker&logoColor=white)](docker/docker-compose.yml)
[![i18n](https://img.shields.io/badge/Dil-TR%20%7C%20EN%20%7C%20RU%20%7C%20AR-0055A4?logoColor=white)](#)
[![Status](https://img.shields.io/badge/Durum-Aktif%20Geliştirme-22c55e?logoColor=white)](#)

<br/>

[🌐 Canlı Siteyi Gör](https://aloyonetim.com.tr) &nbsp;&nbsp;|&nbsp;&nbsp; [📚 Dokümantasyon](docs/README.md) &nbsp;&nbsp;|&nbsp;&nbsp; [🚀 Hızlı Başlangıç](#-hızlı-başlangıç)

</div>

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Öne Çıkan Özellikler](#-öne-çıkan-özellikler)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Proje Mimarisi](#-proje-mimarisi)
- [Ortam Değişkenleri](#-ortam-değişkenleri)
- [SEO, GEO & Doğrulanmış Veri İlkeleri](#-seo-geo--doğrulanmış-veri-ilkeleri)
- [Dokümantasyon](#-dokümantasyon)
- [Geliştirici Komutları](#-geliştirici-komutları)

---

## 🏢 Proje Hakkında

**Alo Yönetim**, 2009'dan beri İstanbul genelinde 39 ilçede site, apartman, rezidans, iş merkezi/plaza ve sanayi tesislerine profesyonel yönetim, 5188 sayılı Kanun kapsamında özel güvenlik, temizlik, teknik bakım ve bahçe/peyzaj hizmetleri sunan kurumsal yapı yönetim platformudur.

Bu repo; **Next.js 16.3 (App Router)**, **React 19**, **PostgreSQL 15 + Prisma 7**, **Redis** ve **n8n** otomasyon altyapısı üzerine inşa edilmiş, 4 dilli (`tr`, `en`, `ru`, `ar`), yerel SEO ve yapay zekâ arama motoru (GEO / AI Overviews) uyumlu kurumsal web uygulamasının kaynak kodunu içerir.

---

## ✨ Öne Çıkan Özellikler

| Özellik | Detay |
|---|---|
| 🌐 **4 Dilli i18n (TR/EN/RU/AR)** | Türkçe canonical (`/`) + `/en`, `/ru`, `/ar` çevrilmiş URL slug'ları, RTL (Arapça) desteği ve dil bazlı indeksleme politikası (`indexPolicy.ts`) |
| 📌 **Tek Doğruluk Kaynağı (`facts.ts`)** | Tüm kurumsal sayılar, SLA hedefleri ve referanslar `src/lib/facts.ts` ve `src/data/realReferences.ts` üzerinden beslenir; `sourceHonesty.test.ts` ile doğrulanamayan iddialar engellenir |
| 🗺️ **Yerel SEO & İlçe Rehberleri** | 39 ilçe kapsama alanı, mahalle tabloları, ilçeye özgü yönetim senaryoları ve 12 kapsamlı ilçe site yönetimi rehberi |
| 🤖 **GEO / AI Arama Altyapısı** | `llms.txt`, `llms-full.txt`, `/api/ai/*`, `/api/tesis-yonetimi/*` ve `Accept: text/markdown` içerik müzakeresi |
| ⚙️ **30 Aktif n8n İş Akışı** | Lead zenginleştirme, talep triajı, Postgres bakım/snapshot, 39 ilçe canlılık kontrolü, gecikmiş aidat hatırlatıcı (`n8n/w01`–`w30`) |
| 🧮 **İnteraktif Araçlar & KMK 634** | Aidat paylaşım & 2026 artış sınırı hesaplayıcıları, 57 maddelik KMK sözlüğü (`/sozluk`), 46 küratörlü SSS (`/sss`) |
| 🛡️ **Yönetim Paneli (`/admin`)** | `jose` JWT tabanlı kimlik doğrulama, Tiptap zengin metin editörü, blog/SSS/referans/lead yönetimi ve bot telemetri ekranları |
| 🔒 **Güvenlik & Performans** | Dotfile/bot exploit kalkanı (`middleware.ts`), CSP, HSTS, ETag `304 Not Modified`, Speculation Rules API |

---

## 🚀 Hızlı Başlangıç

### Yerel Geliştirme
```bash
cp .env.example .env
npm install
npm run dev
```

Tarayıcıda: **[http://localhost:3001](http://localhost:3001)**

### Docker Compose (Tam Altyapı: Web + Postgres + Redis + n8n + Prisma Studio)
```bash
cd docker
docker compose up -d --build
```

> 📖 Detaylı kurulum: [docs/dev/SETUP.md](docs/dev/SETUP.md) ve [docs/dev/DOCKER.md](docs/dev/DOCKER.md)

---

## 🏗️ Proje Mimarisi

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16.3 · App Router · React 19.2 |
| Dil | TypeScript 5 |
| Stil | Tailwind CSS 4 · Slate & Titanium paleti |
| Animasyon | Framer Motion (`LazyMotion`) |
| Veritabanı & ORM | PostgreSQL 15 (`aloyonetim-postgres`) · Prisma 7 (`@prisma/adapter-pg`) |
| Önbellek & Limit | Redis Alpine (`ioredis`) |
| Otomasyon | n8n (`docker.n8n.io/n8nio/n8n`, PostgreSQL `n8n` şeması) |
| Kimlik Doğrulama | `jose` (JWT Cookie Session) + `bcryptjs` |

### Klasör Yapısı

```
src/
├── app/
│   ├── [lang]/           → 4 dilli sayfa rotaları (tr canonical, en, ru, ar)
│   │   ├── hizmetler/    → 9 ana hizmet + tesis-yonetimi alt silosu (plaza, rezidans, sanayi, toplu konut, rehber)
│   │   ├── bolgeler/     → İlçe, ilçe×hizmet ve mahalle sayfaları
│   │   ├── blog/         → Editoryal makaleler ve ilçe yönetim rehberleri
│   │   ├── sozluk/       → KMK 634 ve site yönetimi terimler sözlüğü
│   │   ├── sss/          → 4 dilli küratörlü Sıkça Sorulan Sorular
│   │   ├── hesaplayici/  → KMK m.20 ortak gider paylaşım hesaplayıcısı
│   │   ├── kmk-2026-degisiklikleri/ → 7579 sayılı Kanun rehberi ve artış hesaplayıcısı
│   │   └── admin/        → Yönetim paneli (post, faq, lead, reference, seo-health)
│   └── api/              → Lead, FAQ, OG, AI/GEO, Tesis Yönetimi ve Admin API uçları
├── components/           → layout, sections, seo, blog, admin, modals, ui bileşenleri
├── data/                 → KMK mevzuatı, sözlük, küratörlü SSS, ilçe rehberleri, gerçek referanslar
├── i18n/                 → 4 dilli JSON sözlükleri (tr, en, ru, ar) ve çeviri belleği
└── lib/                  → facts.ts, prisma.ts, redis.ts, seo.ts, schemas.ts ve alt motorlar
```

> 📖 Detaylı mimari: [docs/architecture/OVERVIEW.md](docs/architecture/OVERVIEW.md)

---

## ⚙️ Ortam Değişkenleri

| Değişken | Açıklama | Zorunlu |
|---|---|---|
| `DATABASE_URL` | PostgreSQL bağlantı adresi | ✅ |
| `REDIS_URL` | Redis bağlantı adresi | Opsiyonel (fallback mevcut) |
| `JWT_SECRET` | Admin paneli oturum anahtarı | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Sitenin tam URL'si (`https://aloyonetim.com.tr`) | ✅ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Kurumsal WhatsApp hattı | ✅ |
| `TELEGRAM_BOT_TOKEN` | Anlık lead bildirimleri | Opsiyonel |
| `N8N_URL` | n8n iç servis adresi (`http://n8n:5678`) | Opsiyonel |
| `INDEXNOW_KEY` | Bing/Yandex anlık indeksleme anahtarı | Opsiyonel |

> 📖 Tam ortam değişkenleri ve sunucu kurulumu: [docs/dev/ENVIRONMENT.md](docs/dev/ENVIRONMENT.md) ve [docs/dev/DEPLOYMENT.md](docs/dev/DEPLOYMENT.md)

---

## 🔍 SEO, GEO & Doğrulanmış Veri İlkeleri

- **Tek Kaynak (`src/lib/facts.ts`):** Şirket kuruluş yılı (`2009`), ekip büyüklüğü (`90`), kapsama alanı (`39` ilçe), gerçek referans sayısı (`REAL_REFERENCES.length`) ve yazılı SLA acil müdahale hedefleri (Anadolu Yakası 30 dk, Avrupa Yakası 1 saat) yalnızca buradan okunur.
- **İddia Koruması (`sourceHonesty.test.ts`):** Doğrulanamayan oran, sahte müşteri yorumu, uydurma fiyat paketi veya kesin hukuki taahhüt ifadeleri birim testlerle engellenir.
- **İndeksleme Politikası (`src/lib/seo/indexPolicy.ts`):** Yabancı dillerde (`en`, `ru`, `ar`) yalnızca gerçekten çevrilmiş sayfalar indekslenir (`index, follow`); çevirisi tamamlanmamış alt sayfalar otomatik `noindex, follow` alır.
- **AI / GEO Uçları:** `/llms.txt`, `/llms-full.txt`, `/api/tesis-yonetimi/llm-facts.json`, `/api/tesis-yonetimi/kmk-law-index.json` ve `/api/markdown/*`.

---

## 🗺️ Dokümantasyon

| Belge | Açıklama |
|---|---|
| [docs/CHANGELOG-2026-10.md](docs/CHANGELOG-2026-10.md) | Ekim 2026 içerik temizliği, SEO ve çok dilli güncellemeler özeti |
| [docs/ai-overviews-plani-2026-10.md](docs/ai-overviews-plani-2026-10.md) | Google AI Overviews / yapay zekâ görünürlüğü eylem planı |
| [docs/hukuk-kontrol-listesi-2026-10.md](docs/hukuk-kontrol-listesi-2026-10.md) | Sitedeki mevzuat/KMK ifadeleri için avukat kontrol listesi |
| [docs/architecture/OVERVIEW.md](docs/architecture/OVERVIEW.md) | Mimari, klasör yapısı, Docker ve render stratejisi |
| [docs/dev/DOCKER.md](docs/dev/DOCKER.md) | 5 servisli Docker Compose kurulumu ve yönetimi |
| [docs/dev/DATABASE.md](docs/dev/DATABASE.md) | PostgreSQL, Prisma 7 ve migration işlemleri |

---

## 🛠️ Geliştirici Komutları

```bash
npm run dev                        # Dev sunucu → localhost:3001
npm run build                      # Production build (Next.js standalone)
npm run start                      # Production sunucu → localhost:3001
npx tsc --noEmit                   # TypeScript tip kontrolü
npm run lint                       # ESLint kontrolü
npm test                           # Vitest birim ve koruma testleri (144 test dosyası)
npm run test:e2e                   # Playwright E2E testleri
npm run validate:jsonld            # JSON-LD şema doğrulama
npm run seo:audit                  # SEO dosya denetimi
```

---

## 📄 Lisans

Tüm hakları saklıdır © 2009 – 2026 Alo Yönetim ve İnşaat Hizmetleri Ltd. Şti.
