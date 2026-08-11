# 🚀 Deployment Rehberi (Docker + Kendi Sunucu)

> Alo Yönetim, **kendi Linux sunucusunda Docker Compose** ile çalışır.
> Vercel kullanılmamaktadır.

---

## 📋 Ön Koşullar

Sunucuda şunlar kurulu olmalı:
- Docker Engine 24+
- Docker Compose v2 (`docker compose` — tire olmadan)
- Git
- Node.js 20+ (seed scriptleri için)
- `make` (Makefile kısayolları için — Linux'ta zaten kurulu gelir)

---

## 1. İlk Kurulum (Sıfırdan)

### 1.1 Projeyi Çek
```bash
git clone https://github.com/salihoglueyup/tasarim5.git aloyonetim
cd aloyonetim
```

### 1.2 Ortam Değişkenlerini Oluştur
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

### 1.3 Docker ile Başlat (İlk Kez)
```bash
make build
# veya uzun hali:
# docker compose -f docker/docker-compose.yml --env-file .env up -d --build
```

> İlk başlatmada Docker image'ı indirir ve Next.js'i derler — 5-10 dakika sürebilir.

### 1.4 Veritabanını Kur ve Doldur
PostgreSQL ayağa kalktıktan sonra (30 saniye bekle):
```bash
npx prisma generate
npx tsx import-faqs.ts        # 500+ SSS verisini yükle
```

### 1.5 Erişim Kontrolü
```bash
make status   # Tüm container'lar "healthy" olmalı
```

Tarayıcıda: `http://sunucu-ip:3001`

---

## 2. Güncelleme (Kod Değişikliği Sonrası)

```bash
git pull origin main
make build
```

> `make build` = yeniden derleme + servis yeniden başlatma

---

## 3. Makefile Kısayolları

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

---

## 4. Servisler ve Portlar

| Servis | Port | Açıklama |
|---|---|---|
| `aloyonetim-web` | 3001 | Next.js uygulaması |
| `aloyonetim-postgres` | 5432 | PostgreSQL veritabanı |
| `aloyonetim-redis` | 6379 | Redis önbellek |
| `aloyonetim-n8n` | 5678 | N8N otomasyon |
| `aloyonetim-prisma-studio` | 5555 | Prisma Studio (DB GUI) |

> **Not:** Portlar sadece `localhost`'a bağlıdır. Dışarıya açmak için Nginx/Cloudflare reverse proxy kullanılır.

---

## 5. Nginx Reverse Proxy

`docker/nginx/` klasöründe Nginx konfigürasyonu bulunur.
Cloudflare → Nginx → Next.js (3001) zinciriyle çalışır.

```
[Kullanıcı] → [Cloudflare CDN] → [Nginx:80/443] → [Next.js:3001]
```

---

## 6. Deploy Sonrası Kontroller

```bash
# Sitemap erişilebilir mi?
curl https://aloyonetim.com.tr/sitemap.xml

# robots.txt doğru mu?
curl https://aloyonetim.com.tr/robots.txt

# Security.txt var mı?
curl https://aloyonetim.com.tr/.well-known/security.txt

# Container'lar sağlıklı mı?
make status
```

---

## 7. Sorun Giderme

### Bad Gateway (502)
```bash
make logs-web   # Web container loglarını kontrol et
make status     # Tüm container'ların durumunu gör
```

### Veritabanı Bağlantı Hatası (P1000)
PostgreSQL volume eski şifreyle başlatılmış olabilir:
```bash
make down
rm -rf docker/data/postgres   # ⚠️ Veri silinir!
make build
make seed   # Veritabanını yeniden doldur
```

### git pull Çakışması (package.json vs.)
```bash
git stash
git pull origin main
npm install
```

---

## 8. Ortam Değişkenlerinin Tamamı

Detaylar için: [../../.env.example](./.env.example)

---

**Önceki:** [SETUP.md](SETUP.md) — Local geliştirme ortamı kurulumu
**Sonraki:** [DOCKER.md](DOCKER.md) — Docker mimarisi detayları
