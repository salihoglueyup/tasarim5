# 🐳 Docker Mimarisi

## Genel Bakış

Alo Yönetim, **5 Docker container**'dan oluşan bir mikroservis mimarisinde çalışır.
Tüm servisler `docker/docker-compose.yml` dosyasında tanımlanmıştır.

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

---

## Servisler

### 1. `aloyonetim-web` (Next.js 16)
- **Image:** Multi-stage Dockerfile (`docker/web/Dockerfile`)
- **Port:** `3001` (sadece localhost'a bağlı)
- **Bağımlılık:** `postgres` (healthy), `redis` (started)
- **Başlangıç komutu (`entrypoint.sh`):**
  1. `prisma db push` (Prisma 7 şemasını veritabanına otomatik senkronize eder)
  2. `node server.js` (Next.js standalone sunucuyu başlatır)
- **Prisma 7 Desteği:** `prisma.config.ts` ve `@prisma/adapter-pg` runner stage'e dahil edilmiştir

### 2. `aloyonetim-postgres` (PostgreSQL 16 / 15-alpine)
- **Image:** `postgres:15-alpine` (veya `postgres:16-alpine`)
- **Port:** `5432` (sadece localhost)
- **Volume:** `docker/data/postgres` → `/var/lib/postgresql/data`
- **Healthcheck:** `pg_isready -U alo_user -d aloyonetim`
- **Değişkenler:** `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`

> ⚠️ **Önemli:** PostgreSQL parolası **sadece ilk başlatmada** ayarlanır.
> Volume varken şifre değişikliği için volume'u silmek veya `ALTER USER` kullanmak gerekir.

### 3. `aloyonetim-redis` (Redis Alpine)
- **Image:** `redis:alpine`
- **Port:** `6379` (sadece localhost)
- **Volume:** `docker/data/redis` → `/data`
- **AOF persistence:** Açık (`appendonly yes`)
- **Şifre:** `--requirepass ${REDIS_PASSWORD}`

### 4. `aloyonetim-n8n` (N8N Otomasyon)
- **Image:** `docker.n8n.io/n8nio/n8n`
- **Port:** `5678` (sadece localhost)
- **Volume:** `docker/data/n8n` → `/home/node/.n8n`
- **Bağımlılık:** `postgres` (healthy)
- **Timezone:** `Europe/Istanbul`

### 5. `aloyonetim-prisma-studio` (DB GUI)
- **Image:** Web servisiyle aynı Dockerfile
- **Port:** `5555` (sadece localhost)
- **Komut:** `npx prisma studio --port 5555 --browser none`
- **Bağımlılık:** `postgres` (healthy)

---

## Dockerfile — Multi-Stage Build

```dockerfile
# Faz 1: deps → npm ci ile bağımlılıkları kur
# Faz 2: builder → prisma generate + next build
# Faz 3: runner → Sadece production dosyaları, prisma.config.ts, @prisma/adapter-pg ve entrypoint.sh (küçük image)
```

**Build-time ENV notları:**
- `DATABASE_URL=postgresql://dummy:dummy@...` → Prisma generate için sahte URL
- `JWT_SECRET=dummy_secret_for_build` → auth.ts güvenlik kontrolünü geçmek için
- Gerçek değerler **runtime**'da (`docker/web/entrypoint.sh` üzerinden) `.env` dosyasından gelir

---

## Ağ (Network)

Tüm container'lar `docker_default` ağında birbirini **ismiyle** çözümler:
- `web` → `postgres:5432` ile bağlantı (localhost değil!)
- `web` → `redis:6379` ile bağlantı
- `n8n` → `postgres:5432` ile bağlantı

Bu yüzden `DATABASE_URL` docker-compose içinde `@postgres:5432` şeklindedir,
`.env` dosyasındaki `@localhost:5432` ise **sadece local geliştirme** içindir.

---

## Volume Yönetimi

| Volume | Konum | İçerik | Sil? |
|---|---|---|---|
| `docker/data/postgres` | Host | Tüm veritabanı | ⚠️ Seed ile kurtarılabilir |
| `docker/data/redis` | Host | Cache + AOF log | ✅ Güvenli silinebilir |
| `docker/data/n8n` | Host | N8N workflow'ları | ⚠️ Kaybedilebilir |

---

## Ortam Değişkeni Akışı

```
Proje Kökü (.env)
       ↓
docker compose --env-file .env
       ↓
docker-compose.yml içindeki ${DEĞIŞKEN}
       ↓
Container'ın environment bölümüne enjekte edilir
       ↓
Next.js → process.env.DEĞIŞKEN
```

> `.env` dosyası Docker'ın **build** aşamasında değil, **run** aşamasında okunur.
> Bu nedenle image değişmeden şifre değiştirmek mümkündür (`make restart` yeterli).

---

## Sık Kullanılan Komutlar

```bash
# Başlat (yeniden derle)
make build

# Sadece web servisini yeniden başlat
docker compose -f docker/docker-compose.yml --env-file .env restart web

# Postgres'e bağlan
docker exec -it aloyonetim-postgres psql -U alo_user -d aloyonetim

# Redis'e bağlan
docker exec -it aloyonetim-redis redis-cli -a ${REDIS_PASSWORD}

# Web container içine gir
docker exec -it aloyonetim-web sh

# Image boyutlarına bak
docker images | grep docker
```

---

**Sonraki:** [DATABASE.md](DATABASE.md) — Veritabanı ve Prisma rehberi
