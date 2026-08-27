# 🚀 Alo Yönetim — Hepsi Bir Arada (All-in-One) Proje Master Dokümantasyonu

Bu belge, **Alo Yönetim Web Uygulaması**'nın tüm altyapı, mimari, geliştirme, deploy, veritabanı, SEO, çoklu dil ve içerik yönetimi kılavuzlarını tek bir çatı altında toplayan ana referans dokümanıdır.

---

## 📌 İçindekiler

1. [Proje Genel Bakışı & Teknoloji Yığını](#1-proje-genel-bakışı--teknoloji-yığını)
2. [Yerel Geliştirme (Local Setup)](#2-yerel-geliştirme-local-setup)
3. [Docker & Sunucu Deployment Rehberi](#3-docker--sunucu-deployment-rehberi)
4. [Makefile Kısayolları ve Yönetim](#4-makefile-kısayolları-ve-yönetim)
5. [Veritabanı (Prisma 7 & PostgreSQL) ve Seed Altyapısı](#5-veritabanı-prisma-7--postgresql-ve-seed-altyapısı)
6. [Çoklu Dil (i18n) ve RTL (Arapça) Mimarisi](#6-çoklu-dil-i18n-ve-rtl-arapça-mimarisi)
7. [Admin Paneli ve İçerik Yönetimi](#7-admin-paneli-ve-içerik-yönetimi)
8. [Lead Yakalama ve Bildirim Sistemi (E-posta, Telegram, DB)](#8-lead-yakalama-ve-bildirim-sistemi-e-posta-telegram-db)
9. [SEO, GEO (AI Engine Optimization) ve Schema Mimarisi](#9-seo-geo-ai-engine-optimization-ve-schema-mimarisi)
10. [İçerik Stratejisi, Kümeler ve Editoryal Takvim](#10-i̇çerik-stratejisi-kümeler-ve-editoryal-takvim)
11. [Performans (Core Web Vitals) ve Erişilebilirlik (A11y)](#11-performans-core-web-vitals-ve-erişilebilirlik-a11y)
12. [Proje Geliştirme Tarihçesi ve İstatistikler](#12-proje-geliştirme-tarihçesi-ve-i̇statistikler)
13. [Detaylı Döküman Haritası](#13-detaylı-döküman-haritası)

---

## 1. Proje Genel Bakışı & Teknoloji Yığını

Alo Yönetim; site, rezidans, AVM ve toplu yapı yönetimi, güvenlik, temizlik, peyzaj ve teknik bakım hizmetleri sunan kurumsal bir platformdur.

### 🛠️ Altyapı Bileşenleri

| Katman | Teknoloji / Kütüphane | Sürüm / Detay |
|---|---|---|
| **Framework** | Next.js (App Router, Turbopack) | 16.3.0 (React 19.2.4) |
| **Dil** | TypeScript | 5.x |
| **Stil / Tasarım** | Tailwind CSS (Slate & Titanyum Teması) | 4.x (PostCSS + Typography) |
| **Animasyon** | Framer Motion (`LazyMotion` & Springs) | 12.x |
| **Fontlar** | Plus Jakarta Sans, Inter & Cairo (RTL) | `next/font` + Material Symbols Outlined |
| **ORM** | Prisma 7 (Driver Adapter: `@prisma/adapter-pg`, `prisma.config.ts`) | 7.9.1 |
| **Veritabanı** | PostgreSQL (Docker Container) | 16 / 15-alpine |
| **Önbellek (Cache)** | Redis (ioredis + AOF Persistence) | Alpine (Port 6379) |
| **Kimlik Doğrulama** | JOSE (JWT tabanlı Admin Auth) | 6.x |
| **Containerization** | Docker & Docker Compose (5 Servis) | 24.x+ / v2 (`web`, `postgres`, `redis`, `prisma-studio`, `n8n`) |
| **Otomasyon** | N8N Workflow Engine | Docker Container (Port 5678) |
| **Reverse Proxy & CDN** | Nginx & Cloudflare | SSL + HSTS + Speculation Rules API |
| **Çoklu Dil (i18n)** | App Router `[lang]` + JSON Sözlükler | 4 Dil (`tr`, `en`, `ru`, `ar`) |
| **Yapay Zeka / GEO** | LLMs.txt, AI Telemetry, Entity Graph, IndexNow | 20+ Özel AI ve Semantik Motor |

---

## 2. Yerel Geliştirme (Local Setup)

### Gerekli Araçlar
- **Node.js**: `v20.x` veya `v22.x (LTS)`
- **npm**: `v10.x`
- **Docker Desktop**: `v24.x+`
- **Git**

### Kurulum Adımları

1. **Repoyu Klonla:**
   ```bash
   git clone https://github.com/salihoglueyup/tasarim5.git aloyonetim
   cd aloyonetim
   ```

2. **Ortam Değişkenlerini Hazırla:**
   ```bash
   cp .env.example .env
   ```
   `.env` dosyasında veritabanı ve Redis şifrelerini belirle:
   ```env
   POSTGRES_PASSWORD=guclu_sifre_123
   REDIS_PASSWORD=guclu_redis_sifre_456
   JWT_SECRET=en_az_64_karakter_rastgele_bir_string
   DATABASE_URL="postgresql://alo_user:guclu_sifre_123@localhost:5432/aloyonetim?schema=public"
   REDIS_URL="redis://:guclu_redis_sifre_456@localhost:6379"
   ```

3. **Veritabanı Servislerini Başlat:**
   ```bash
   make up
   ```

4. **Bağımlılıkları Yükle & Prisma Client Üret:**
   ```bash
   npm install
   npx prisma generate
   ```

5. **Geliştirme Sunucusunu Çalıştır:**
   ```bash
   npm run dev
   ```
   👉 Yerel erişim: **`http://localhost:3001`**

---

## 3. Docker & Sunucu Deployment Rehberi

Uygulama canlı ortamda Linux sunucusunda **5 Docker container** ile mikroservis mimarisinde çalışır.

### Servis Mimarisi

```
[Kullanıcı] → [Cloudflare CDN] → [Nginx :80/443] → [aloyonetim-web :3001]
                                                 → [aloyonetim-prisma-studio :5555]
                                                 → [aloyonetim-n8n :5678]

[aloyonetim-web] → [aloyonetim-postgres :5432]
[aloyonetim-web] → [aloyonetim-redis :6379]
```

### 🚀 Sunucuda Güncelleme & Deploy
```bash
git pull origin main
make build
```
> `make build` komutu Next.js standalone imajını multi-stage olarak derler ve container'ları günceller.

---

## 4. Makefile Kısayolları ve Yönetim

Sunucuda ve yerelde işlemleri hızlandırmak için `Makefile` kullanılır:

```makefile
make build        # Tüm imajları yeniden derler ve başlatır (up -d --build)
make up           # Container'ları arka planda başlatır
make down         # Container'ları durdurur
make restart      # Servisleri yeniden başlatır
make status       # Container durumlarını ve healthcheck sonuçlarını gösterir
make logs         # Tüm container loglarını canlı izler
make logs-web     # Sadece Next.js web container loglarını izler
make seed         # Prisma Client üretir ve 523 SSS verisini veritabanına aktarır
make clean        # ⚠️ Tüm container'ları ve veritabanı volume'larını siler
```

---

## 5. Veritabanı (Prisma 7 & PostgreSQL) ve Seed Altyapısı

### Prisma Modelleri (`prisma/schema.prisma`)
- **`User`**: Admin kullanıcıları ve kimlik doğrulama
- **`Faq`**: 500+ Çoklu dilli Sıkça Sorulan Soru (tr, en, ru, ar)
- **`Post` / `Category` / `Author`**: Dinamik blog modülü
- **`Lead`**: Form başvuru verileri
- **`Reference` / `Partner`**: Referans projeler ve partner logoları
- **`CalculatorConfig` / `CalculatorLog`**: Maliyet hesaplama araçları ayarları ve analizleri

### 📦 SSS (FAQ) Veri Aktarımı
523 soruluk kapsamlı SSS verisi `prisma/data/all_faqs_export.json` dosyasında saklanır.

Veritabanını doldurmak için:
```bash
npx tsx import-faqs.ts
# veya
make seed
```

---

## 6. Çoklu Dil (i18n) ve RTL (Arapça) Mimarisi

Uygulama tam kapsamlı **4 dil** desteklemektedir:

| Dil | Kod | Yön | Özel Ayar |
|---|---|---|---|
| **Türkçe** | `tr` | LTR | Varsayılan dil |
| **İngilizce** | `en` | LTR | Global erişim |
| **Rusça** | `ru` | LTR | Bölgesel erişim |
| **Arapça** | `ar` | RTL | `dir="rtl"` + Cairo Fontu |

### Kullanım Mantığı
- **Server Side**: `const dict = await getDictionary(lang);`
- **Client Side**: `const { t } = useLanguage();` (`t('hero.title')`)
- **Otomatik Çeviri Scripti**: Türkçe sözlüğe (`src/i18n/locales/tr/common.json`) yeni anahtar eklendiğinde:
  ```bash
  node scripts/translate.mjs
  ```
  tüm diller otomatik güncellenir.

---

## 7. Admin Paneli ve İçerik Yönetimi

Admin Paneline **`https://aloyonetim.com.tr/tr/admin`** adresinden erişilir.

### Modüller:
1. **📬 Lead Yönetimi (`/admin/leads`)**: İletişim ve teklif formlarını görüntüleme, okundu işaretleme.
2. **📝 Blog Yönetimi (`/admin/blog/posts`)**: Tiptap Zengin Metin Editörü ile makale oluşturma, yayınlama ve taslak kontrolü.
3. **❓ S.S.S Yönetimi (`/admin/faqs`)**: Soru ve cevapların 4 dilde düzenlenmesi.
4. **🏢 Referanslar ve Logolar (`/admin/references`, `/admin/partners`)**: Görsel varlık ve müşteri logosu yönetimi.
5. **🧮 Hesaplayıcı Ayarları (`/admin/calculator`)**: Aidat, güvenlik, havuz ve bakım hesaplayıcı birim fiyat parametreleri.

---

## 8. Lead Yakalama ve Bildirim Sistemi (E-posta, Telegram, DB)

Form gönderimleri (`POST /api/lead`) **üç kanala paralel** iletilir:

```
[İletişim / Teklif Formu] → POST /api/lead
                                 │
                 ┌───────────────┼───────────────┐
                 ↓               ↓               ↓
           [PostgreSQL DB]   [Resend E-posta] [Telegram Bot]
           (Otomatik Lead)  (RESEND_API_KEY)  (TELEGRAM_BOT_TOKEN)
```

- **Spam Koruması**: Honeypot tuzağı (`company` gizli alanı), minimum 2 saniye bekleme süresi ve IP tabanlı rate limit.

---

## 9. SEO, GEO (AI Engine Optimization) ve Schema Mimarisi

- **Sayfa-Özel SEO Metadata Layout'ları**: `/sozluk`, `/hesaplayici`, `/sektorel-cozumler`, `/guvenlik-akademisi` ve `/site-haritasi` sayfalarına özgü hedeflenmiş SEO başlıkları ve meta açıklamaları.
- **HTML Site Haritası İç Linklemesi (`/site-haritasi`)**: 12 İstanbul ilçesinin tesis yönetimi sayfalarına doğrudan bağlamsal iç linkleme.

### 🤖 GEO (AI Engine Optimization)
ChatGPT, Perplexity, Claude ve Gemini gibi AI motorlarında doğru temsil edilmek için:
- **`/llms.txt`**: Kısa AI marka ve altyapı özeti.
- **`/llms-full.txt`**: Veritabanındaki 520+ SSS sorusu ve blog yazılarıyla **dinamik** olarak beslenen AI rehberi.
- **IndexNow Anlık İndeksleme**: Bing ve Yandex'e yeni/güncellenen sayfaları milisaniyeler içinde bildiren `src/lib/indexnow.ts` ve `scripts/notify-indexnow.mjs` modülü.
- **`/api/summary`**: Makine-okur özet uç noktası.

---

## 10. İçerik Stratejisi, Kümeler ve Editoryal Takvim

- **İçerik Kümeleri (`docs/content/CLUSTERS.md`)**: Hukuk, Güvenlik, Teknik Bakım, Temizlik ve Tesis Yönetimi pillar sayfaları.
- **Yayın Ritmi (`docs/content/CALENDAR.md`)**: Haftada 1 yeni makale, 12 ayda bir `dateModified` güncellemesi.

---

## 11. Performans (Core Web Vitals) and Erişilebilirlik (A11y)

### Performans Bütçeleri (`docs/architecture/PERFORMANCE.md`)
- **LCP**: < 2.0 sn
- **INP**: < 200 ms
- **CLS**: < 0.05
- **İlk JS Bütçesi**: ≤ 200 KB

### Erişilebilirlik (`docs/architecture/A11Y.md`)
- WCAG 2.1 AA Standartları
- `Skip-to-content` linki
- ARIA etiketleri ve görünür odak halkası (`:focus-visible`)
- `prefers-reduced-motion` tam desteği

---

## 12. Proje Geliştirme Tarihçesi ve İstatistikler

- **Faz 1 (2024 başı)**: Next.js 16, Tailwind CSS 4, Prisma + PostgreSQL, Docker altyapısı.
- **Faz 2 (2024 ortası)**: 250 fazlık SEO Master Plan V4, JSON-LD altyapısı, Blog sistemi.
- **Faz 3 (2024 sonu)**: 9 Hizmet sayfası, 4 Maliyet Hesaplayıcı, 500+ SSS üretimi.
- **Faz 4 (2025)**: 4 Dilli i18n sistemi, RTL (Arapça) entegrasyonu, Otomatik çeviri scripti.
- **Faz 5 (Ağustos 2026)**: Canlı sunucu kurulumu, `.env` ve `Makefile` standardizasyonu, Sharp ile Favicon üretimi, `security.txt` yapılandırması ve dokümantasyon organizasyonu.

---

## 13. Detaylı Döküman Haritası

Daha spesifik konularda derinlemesine bilgi almak için aşağıdaki özel belgelere başvurabilirsiniz:

| Bölüm | Konu | Belge Bağlantısı |
|---|---|---|
| **Deploy & Sunucu** | Docker deploy & sunucu adımları | [docs/dev/DEPLOYMENT.md](docs/dev/DEPLOYMENT.md) |
| **Docker** | Servisler, ağ ve volume mimarisi | [docs/dev/DOCKER.md](docs/dev/DOCKER.md) |
| **Veritabanı** | Prisma şeması & seed rehberi | [docs/dev/DATABASE.md](docs/dev/DATABASE.md) |
| **Geliştirme** | Local ortam kurulumu | [docs/dev/SETUP.md](docs/dev/SETUP.md) |
| **Katkı** | Git ve kodlama standartları | [docs/dev/CONTRIBUTING.md](docs/dev/CONTRIBUTING.md) |
| **Admin** | Admin Paneli kullanım kılavuzu | [docs/admin/README.md](docs/admin/README.md) |
| **i18n** | Çoklu dil altyapısı | [docs/i18n/README.md](docs/i18n/README.md) |
| **Çeviri** | Yeni çeviri ekleme adımları | [docs/i18n/TRANSLATION_GUIDE.md](docs/i18n/TRANSLATION_GUIDE.md) |
| **SEO Roadmap** | SEO Yol haritası ve V5 tohumları | [docs/seo/ROADMAP.md](docs/seo/ROADMAP.md) |
| **SEO Master Plan**| 250 Fazlık Ana SEO Planı | [docs/seo/OPTIMIZATION_PLAN.md](docs/seo/OPTIMIZATION_PLAN.md) |
| **GEO / AI** | ChatGPT / Perplexity stratejisi | [docs/seo/GEO_STRATEGY.md](docs/seo/GEO_STRATEGY.md) |
| **SEO Raporu** | Ağustos 2026 İlk KPI Raporu | [docs/seo/reports/2026-08.md](docs/seo/reports/2026-08.md) |
| **Tarihçe** | Tüm geliştirme kronolojisi | [docs/changelog/HISTORY.md](docs/changelog/HISTORY.md) |
