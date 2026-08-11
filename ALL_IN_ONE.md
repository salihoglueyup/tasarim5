# 📚 ALO YÖNETİM — ALL IN ONE MASTER DOKÜMANTASYON

> Bu dosya, projedeki tüm teknik, mimari, veritabanı, Docker, deployment, i18n, admin paneli, SEO, içerik ve geliştirme tarihçesi dokümanlarının **eksiksiz tam metin birleşimidir**.

---

# 📑 İÇİNDEKİLER

- [Bölüm 1: Proje Kurulumu ve Geliştirme (dev/)](#bölüm-1-proje-kurulumu-ve-geliştirme-dev)
  - [1.1 Yerel Geliştirme Kurulumu (SETUP.md)](#11-yerel-geliştirme-kurulumu-setupmd)
  - [1.2 Deployment Rehberi (DEPLOYMENT.md)](#12-deployment-rehberi-deploymentmd)
  - [1.3 Katkı Kılavuzu (CONTRIBUTING.md)](#13-katkı-kılavuzu-contributingmd)
  - [1.4 Docker Mimarisi (DOCKER.md)](#14-docker-mimarisi-dockermd)
  - [1.5 Veritabanı ve Prisma Rehberi (DATABASE.md)](#15-veritabanı-ve-prisma-rehberi-databasemd)
- [Bölüm 2: Admin Paneli Kullanım Kılavuzu (admin/)](#bölüm-2-admin-paneli-kullanım-kılavuzu-admin)
- [Bölüm 3: Çoklu Dil (i18n) Mimarisi ve Çeviri (i18n/)](#bölüm-3-çoklu-dil-i18n-mimarisi-ve-çeviri-i18n)
  - [3.1 Çoklu Dil Mimarisi (i18n/README.md)](#31-çoklu-dil-mimarisi-i18nreadmemd)
  - [3.2 Çeviri Ekleme Rehberi (i18n/TRANSLATION_GUIDE.md)](#32-çeviri-ekleme-rehberi-i18ntranslation_guidemd)
- [Bölüm 4: Mimari ve Sistem Tasarımı (architecture/)](#bölüm-4-mimari-ve-sistem-tasarımı-architecture)
  - [4.1 Mimarisine Genel Bakış (OVERVIEW.md)](#41-mimarisine-genel-bakış-overviewmd)
  - [4.2 Lead Yakalama Sistemi (LEAD_SYSTEM.md)](#42-lead-yakalama-sistemi-lead_systemmd)
  - [4.3 Performans Bütçesi (PERFORMANCE.md)](#43-performans-bütçesi-performancemd)
  - [4.4 Erişilebilirlik ve Güven Denetimi (A11Y.md)](#44-erişilebilirlik-ve-güven-denetimi-a11ymd)
- [Bölüm 5: SEO ve AI Engine Optimization (seo/)](#bölüm-5-seo-ve-ai-engine-optimization-seo)
  - [5.1 SEO Belgeleri Genel Bakış (seo/README.md)](#51-seo-belgeleri-genel-bakış-seoreadmemd)
  - [5.2 SEO Yol Haritası (ROADMAP.md)](#52-seo-yol-haritası-roadmapmd)
  - [5.3 Anahtar Kelime Eşleme Matrisi (KEYWORD_MAP.md)](#53-anahtar-kelime-eşleme-matrisi-keyword_mapmd)
  - [5.4 AI / GEO Stratejisi (GEO_STRATEGY.md)](#54-ai--geo-stratejisi-geo_strategymd)
  - [5.5 Off-Page ve Backlink Planı (OFFPAGE_PLAN.md)](#55-off-page-ve-backlink-planı-offpage_planmd)
  - [5.6 Aylık SEO Denetim Kontrol Listesi (AUDIT_CHECKLIST.md)](#56-aylık-seo-denetim-kontrol-listesi-audit_checklistmd)
  - [5.7 SEO KPI Rapor Şablonu (KPI_TEMPLATE.md)](#57-seo-kpi-rapor-şablonu-kpi_templatemd)
  - [5.8 Ağustos 2026 İlk KPI Raporu (reports/2026-08.md)](#58-ağustos-2026-i̇lk-kpi-raporu-reports2026-08md)
- [Bölüm 6: İçerik Yönetimi ve Stratejisi (content/)](#bölüm-6-i̇çerik-yönetimi-ve-stratejisi-content)
  - [6.1 İçerik Belgeleri Genel Bakış (content/README.md)](#61-i̇çerik-belgeleri-genel-bakış-contentreadmemd)
  - [6.2 Editoryal İçerik Takvimi (CALENDAR.md)](#62-editoryal-i̇çerik-takvimi-calendarmd)
  - [6.3 İçerik Cluster Haritası (CLUSTERS.md)](#63-i̇çerik-cluster-haritası-clustersmd)
  - [6.4 İçerik Yönetişim Dokümanı (GUIDELINES.md)](#64-i̇çerik-yönetişim-dokümanı-guidelinesmd)
- [Bölüm 7: Proje Geliştirme Tarihçesi (changelog/)](#bölüm-7-proje-geliştirme-tarihçesi-changelog)
  - [7.1 Proje Geliştirme Tarihi (HISTORY.md)](#71-proje-geliştirme-tarihi-historymd)

---

# Bölüm 1: Proje Kurulumu ve Geliştirme (dev/)

## 1.1 Yerel Geliştirme Kurulumu (SETUP.md)

### Gereksinimler

| Araç | Minimum Sürüm | Kontrol |
|---|---|---|
| Node.js | 22.x (LTS) | `node -v` |
| npm | 10.x | `npm -v` |
| Git | 2.x | `git --version` |
| Docker Desktop | 24.x | `docker -v` |

### 1. Depoyu Klonla

```bash
git clone https://github.com/salihoglueyup/tasarim5.git aloyonetim
cd aloyonetim
```

### 2. Ortam Değişkenlerini Ayarla

`.env.example` dosyasını kopyala ve değerleri doldur:

```bash
cp .env.example .env
nano .env   # veya istediğin editörle aç
```

**Yerel geliştirme için zorunlu değişkenler:**

| Değişken | Açıklama | Örnek |
|---|---|---|
| `POSTGRES_PASSWORD` | PostgreSQL şifresi | `guclu_sifre_123` |
| `REDIS_PASSWORD` | Redis şifresi | `redis_sifre_456` |
| `JWT_SECRET` | Admin panel JWT anahtarı | En az 64 karakter rastgele string |
| `DATABASE_URL` | Prisma bağlantısı | `postgresql://alo_user:SIFRE@localhost:5432/aloyonetim?schema=public` |
| `REDIS_URL` | Redis bağlantısı | `redis://:SIFRE@localhost:6379` |

**Opsiyonel (lead bildirimleri için):**

| Değişken | Açıklama |
|---|---|
| `RESEND_API_KEY` | E-posta gönderimi |
| `TELEGRAM_BOT_TOKEN` | Telegram bildirimleri |
| `TELEGRAM_CHAT_ID` | Hedef Telegram kanalı |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 |

> Hiçbir lead değişkeni yoksa bile uygulama çalışır — formlar sessizce loglanır.

### 3. Docker ile Veritabanını Başlat

```bash
# Tüm servisleri başlat (PostgreSQL, Redis, N8N, Prisma Studio)
make up

# Veya uzun hali:
docker compose -f docker/docker-compose.yml --env-file .env up -d
```

### 4. Bağımlılıkları Yükle

```bash
npm install
npx prisma generate   # Prisma Client'ı oluştur
```

### 5. Dev Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcıda aç: **http://localhost:3001**

> Port 3001 kullanılır (3000 değil) — `package.json`'da `next dev -p 3001` olarak tanımlı.

### 6. (Opsiyonel) Veritabanını Doldur

SSS verilerini yüklemek için:
```bash
npx tsx import-faqs.ts
```

### Faydalı Komutlar

```bash
npm run build      # Production build kontrolü
npm run lint       # ESLint kontrolü
npx tsc --noEmit   # TypeScript tip kontrolü
npm test           # Vitest birim testleri
make status        # Docker container durumları
make logs-web      # Next.js logları
```

---

## 1.2 Deployment Rehberi (DEPLOYMENT.md)

> Alo Yönetim, **kendi Linux sunucusunda Docker Compose** ile çalışır. Vercel kullanılmamaktadır.

### Ön Koşullar

Sunucuda şunlar kurulu olmalı:
- Docker Engine 24+
- Docker Compose v2 (`docker compose` — tire olmadan)
- Git
- Node.js 20+ (seed scriptleri için)
- `make` (Makefile kısayolları için — Linux'ta zaten kurulu gelir)

### 1. İlk Kurulum (Sıfırdan)

#### 1.1 Projeyi Çek
```bash
git clone https://github.com/salihoglueyup/tasarim5.git aloyonetim
cd aloyonetim
```

#### 1.2 Ortam Değişkenlerini Oluştur
```bash
cp .env.example .env
nano .env   # Gerçek şifreleri ve ayarları gir
```

Mutlaka doldurulması gerekenler:
```bash
POSTGRES_PASSWORD=guclu_bir_sifre
REDIS_PASSWORD=guclu_bir_redis_sifresi
JWT_SECRET=en_az_64_karakter_rastgele_bir_string
DATABASE_URL="postgresql://alo_user:${POSTGRES_PASSWORD}@postgres:5432/aloyonetim?schema=public"
REDIS_URL="redis://:${REDIS_PASSWORD}@redis:6379"
```

#### 1.3 Docker ile Başlat (İlk Kez)
```bash
make build
# veya uzun hali:
# docker compose -f docker/docker-compose.yml --env-file .env up -d --build
```

> İlk başlatmada Docker image'ı indirir ve Next.js'i derler — 5-10 dakika sürebilir.

#### 1.4 Veritabanını Kur ve Doldur
PostgreSQL ayağa kalktıktan sonra (30 saniye bekle):
```bash
npx prisma generate
npx tsx import-faqs.ts        # 500+ SSS verisini yükle
```

#### 1.5 Erişim Kontrolü
```bash
make status   # Tüm container'lar "healthy" olmalı
```
Tarayıcıda: `http://sunucu-ip:3001`

### 2. Güncelleme (Kod Değişikliği Sonrası)

```bash
git pull origin main
make build
```
> `make build` = yeniden derleme + servis yeniden başlatma

### 3. Makefile Kısayolları

| Komut | Açıklama |
|---|---|
| `make build` | Yeniden derle + başlat |
| `make up` | Başlat (derleme olmadan) |
| `make down` | Durdur |
| `make restart` | Yeniden başlat |
| `make logs` | Tüm logları izle |
| `make logs-web` | Sadece web loglarını izle |
| `make status` | Container durumlarını göster |
| `make seed` | Prisma generate + FAQ import |
| `make clean` | Durdur + volume'ları sil ⚠️ |

### 4. Servisler ve Portlar

| Servis | Port | Açıklama |
|---|---|---|
| `aloyonetim-web` | 3001 | Next.js uygulaması |
| `aloyonetim-postgres` | 5432 | PostgreSQL veritabanı |
| `aloyonetim-redis` | 6379 | Redis önbellek |
| `aloyonetim-n8n` | 5678 | N8N otomasyon |
| `aloyonetim-prisma-studio` | 5555 | Prisma Studio (DB GUI) |

### 5. Nginx Reverse Proxy

`docker/nginx/` klasöründe Nginx konfigürasyonu bulunur.
Cloudflare → Nginx → Next.js (3001) zinciriyle çalışır:
```
[Kullanıcı] → [Cloudflare CDN] → [Nginx:80/443] → [Next.js:3001]
```

### 6. Sorun Giderme

#### Bad Gateway (502)
```bash
make logs-web   # Web container loglarını kontrol et
make status     # Tüm container'ların durumunu gör
```

#### Veritabanı Bağlantı Hatası (P1000)
PostgreSQL volume eski şifreyle başlatılmış olabilir:
```bash
make down
rm -rf docker/data/postgres   # ⚠️ Veri silinir!
make build
make seed   # Veritabanını yeniden doldur
```

---

## 1.3 Katkı Kılavuzu (CONTRIBUTING.md)

### Commit Mesajı Formatı
[Conventional Commits](https://www.conventionalcommits.org/) standardını kullanıyoruz:

```
<tip>(<kapsam>): <kısa açıklama>
```

| Tip | Kullanım |
|---|---|
| `feat` | Yeni özellik |
| `fix` | Hata düzeltme |
| `perf` | Performans iyileştirme |
| `style` | Sadece görsel/CSS değişikliği |
| `refactor` | Yeniden düzenleme (davranış değişmez) |
| `docs` | Sadece dokümantasyon |
| `chore` | Yapılandırma, bağımlılık, araç |
| `test` | Test ekleme/güncelleme |
| `i18n` | Çeviri ekleme/güncelleme |

### Kod Standartları
- **Tailwind CSS**: Mavi (`blue-*`) renk sınıfı kullanma — Proje paleti Slate/Titanium'dur.
  - Vurgu rengi: `text-emerald-600`
- **TypeScript**: `any` kullanmaktan kaçın.
- **i18n**: Yeni UI metinleri `src/i18n/locales/tr/common.json`'a eklenir. Otomatik çeviri için: `node scripts/translate.mjs`.

---

## 1.4 Docker Mimarisi (DOCKER.md)

Alo Yönetim, **5 Docker container**'dan oluşan bir mikroservis mimarisinde çalışır.

```
docker/
├── docker-compose.yml     → Tüm servislerin tanımı
├── data/                  → Kalıcı veriler (git-ignored)
│   ├── postgres/          → PostgreSQL veritabanı dosyaları
│   ├── redis/             → Redis AOF dosyaları
│   └── n8n/               → N8N veritabanı ve konfigürasyonu
├── nginx/                 → Nginx reverse proxy konfigürasyonu
└── web/
    └── Dockerfile         → Next.js uygulaması için multi-stage build
```

### Ağ (Network)
Tüm container'lar `docker_default` ağında birbirini **ismiyle** çözümler:
- `web` → `postgres:5432` ile bağlantı
- `web` → `redis:6379` ile bağlantı
- `n8n` → `postgres:5432` ile bağlantı

---

## 1.5 Veritabanı ve Prisma Rehberi (DATABASE.md)

- **ORM:** Prisma 7.x (driver adapter: `@prisma/adapter-pg`)
- **Veritabanı:** PostgreSQL 15 (Docker container: `aloyonetim-postgres`)
- **Şema:** `prisma/schema.prisma`

### Modeller
- `User`: Admin paneli kullanıcıları
- `Category`, `Author`, `Post`: Blog modülü (çoklu dil)
- `Faq`: Sıkça Sorulan Sorular (çoklu dil, 500+)
- `Reference`, `Partner`: Referanslar ve logolar
- `Lead`: Form gönderileri
- `CalculatorConfig`, `CalculatorLog`: Hesaplayıcı ayarları ve logları

---

# Bölüm 2: Admin Paneli Kullanım Kılavuzu (admin/)

URL: **`https://aloyonetim.com.tr/tr/admin`**

### Modüller:
1. **📬 Lead Yönetimi (`/admin/leads`)**: İletişim, teklif, geri arama taleplerini izleme.
2. **📝 Blog Yazıları (`/admin/blog/posts`)**: Tiptap zengin editör ile yazı yayınlama.
3. **📂 Blog Kategorileri (`/admin/blog/categories`)**: Kategorileri düzenleme.
4. **👤 Blog Yazarları (`/admin/blog/authors`)**: Yazar profilleri.
5. **❓ S.S.S Yönetimi (`/admin/faqs`)**: Soru ve cevapların 4 dilde yönetilmesi.
6. **🏢 Referanslar ve Logolar (`/admin/references`, `/admin/partners`)**: Görsel galeriler.
7. **🧮 Hesaplayıcı Ayarları (`/admin/calculator`)**: Birim fiyat parametreleri.

---

# Bölüm 3: Çoklu Dil (i18n) Mimarisi ve Çeviri (i18n/)

## 3.1 Çoklu Dil Mimarisi (i18n/README.md)

Alo Yönetim **4 dili** destekler:
- `tr` — Türkçe (Varsayılan)
- `en` — İngilizce
- `ru` — Rusça
- `ar` — Arapça (RTL desteği, `dir="rtl"` + Cairo fontu)

## 3.2 Çeviri Ekleme Rehberi (i18n/TRANSLATION_GUIDE.md)

### Adımlar:
1. `src/i18n/locales/tr/common.json` dosyasına yeni anahtarı ekle.
2. Otomatik çeviri scriptini çalıştır:
   ```bash
   node scripts/translate.mjs
   ```
3. `en`, `ru`, `ar` dosyalarının otomatik güncellendiğini kontrol et.

---

# Bölüm 4: Mimari ve Sistem Tasarımı (architecture/)

## 4.1 Mimarisine Genel Bakış (OVERVIEW.md)
Next.js 16 App Router, Tailwind 4, Framer Motion, Prisma 7, PostgreSQL ve Redis entegrasyonu.

## 4.2 Lead Yakalama Sistemi (LEAD_SYSTEM.md)
Form gönderimleri (`POST /api/lead`) üç kanala iletilir:
1. **PostgreSQL DB**: `Lead` tablosuna kayıt (otomatik)
2. **Resend E-posta**: `RESEND_API_KEY` mevcutsa
3. **Telegram Bot**: `TELEGRAM_BOT_TOKEN` mevcutsa

Spam Koruması: Honeypot (`company` alanı), Min-süre (2 sn) ve Rate-limit.

## 4.3 Performans Bütçesi (PERFORMANCE.md)
- **LCP**: < 2.0s
- **INP**: < 200ms
- **CLS**: < 0.05
- **İlk JS Bütçesi**: ≤ 200 KB

## 4.4 Erişilebilirlik ve Güven Denetimi (A11Y.md)
WCAG 2.1 AA uyumu, `:focus-visible` odak halkası, `Skip-to-content` linki, `prefers-reduced-motion` tam desteği.

---

# Bölüm 5: SEO ve AI Engine Optimization (seo/)

## 5.1 SEO Yol Haritası (ROADMAP.md)
250 Fazlık SEO Master Plan V4 tamamlanma durumu ve V5 gelecek fırsاتları.

- **hreflang Matrisi (`src/lib/seo.ts`)**: 4 dil için (`tr-TR`, `en-US`, `ru-RU`, `ar-SA` ve `x-default`) otomatik `hreflang` ve canonical URL üretimi.
- **Sitemap Alternates (`src/app/sitemap.ts`)**: Tüm static, dinamik ve bölgesel rotalar 4 dil için `alternates.languages` ile haritalanır.

- **`/llms.txt`**: Kısa özet ve marka kimliği.
- **`/llms-full.txt`**: Veritabanından (PostgreSQL `prisma.faq` ve `prisma.post`) 520+ SSS sorusu ve blog yazılarıyla **dinamik** olarak üretilen derin AI rehberi.
- **IndexNow Anlık İndeksleme**: Bing ve Yandex'e sayfa değişikliklerini anında bildiren `src/lib/indexnow.ts` ve `scripts/notify-indexnow.mjs`.
- **`/api/summary`**: Makine-okur özet API.

## 5.4 Off-Page ve Backlink Planı (OFFPAGE_PLAN.md)
Google Business Profile (GBP), Bing Places, yerel rehberler ve NAP tutarlılığı stratejisi.

## 5.5 Ağustos 2026 İlk KPI Raporu (reports/2026-08.md)
Canlı altyapı, 523 SSS verisi, kartal logosu favicon ve security.txt kurulumunu belgeleyen ilk referans rapor.

---

# Bölüm 6: İçerik Yönetimi ve Stratejisi (content/)

## 6.1 Editoryal İçerik Takvimi (CALENDAR.md)
Haftada 1 makale yayın ritmi, Ağustos-Aralık 2026 dönem planı ve mevsimsel konu dağılımı.

## 6.2 İçerik Cluster Haritası (CLUSTERS.md)
50+ Konuluk Pillar-Cluster eşlemesi:
- Tesis Yönetimi
- Hukuk & İcra
- Güvenlik
- Teknik Bakım
- Temizlik & Hijyen
- Havuz & Peyzaj

---

# Bölüm 7: Proje Geliştirme Tarihçesi (changelog/)

## 7.1 Proje Geliştirme Tarihi (HISTORY.md)
- **Faz 1**: Next.js 16, Tailwind 4, Prisma, Docker altyapısı.
- **Faz 2**: SEO Master Plan V4, JSON-LD, Blog altyapısı.
- **Faz 3**: 9 Hizmet sayfası, 4 Maliyet Hesaplayıcı, 500+ SSS.
- **Faz 4**: 4 Dilli i18n sistemi, RTL (Arapça) desteği.
- **Faz 5 (Ağustos 2026)**: Canlı sunucu deployment, `.env` & `Makefile` standardizasyonu, Sharp ile Favicon üretimi, `security.txt` ve Dokümantasyon reorganizasyonu.
