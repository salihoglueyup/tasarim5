# ⚙️ Yerel Geliştirme Kurulumu

## Gereksinimler

| Araç | Minimum Sürüm | Kontrol |
|---|---|---|
| Node.js | 22.x (LTS) | `node -v` |
| npm | 10.x | `npm -v` |
| Git | 2.x | `git --version` |
| Docker Desktop | 24.x | `docker -v` |

---

## 1. Depoyu Klonla

```bash
git clone https://github.com/salihoglueyup/tasarim5.git aloyonetim
cd aloyonetim
```

---

## 2. Ortam Değişkenlerini Ayarla

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

---

## 3. Docker ile Veritabanını Başlat

```bash
# Tüm servisleri başlat (PostgreSQL, Redis, N8N, Prisma Studio)
make up

# Veya uzun hali:
docker compose -f docker/docker-compose.yml --env-file .env up -d
```

---

## 4. Bağımlılıkları Yükle

```bash
npm install
npx prisma generate   # Prisma Client'ı oluştur
```

---

## 5. Dev Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcıda aç: [http://localhost:3001](http://localhost:3001)

> Port 3001 kullanılır (3000 değil) — `package.json`'da `next dev -p 3001` olarak tanımlı.

---

## 6. (Opsiyonel) Veritabanını Doldur

SSS verilerini yüklemek için:
```bash
npx tsx import-faqs.ts
```

---

## Faydalı Komutlar

```bash
npm run build      # Production build kontrolü
npm run lint       # ESLint kontrolü
npx tsc --noEmit   # TypeScript tip kontrolü
npm test           # Vitest birim testleri
make status        # Docker container durumları
make logs-web      # Next.js logları
```

---

## Sık Karşılaşılan Sorunlar

### `.next/` ile ilgili hatalar
```bash
Remove-Item -Recurse -Force .next   # PowerShell
rm -rf .next                         # Linux/Mac
npm run dev
```

### Veritabanı bağlantı hatası
```bash
make status   # Postgres container'ın çalıştığını kontrol et
make up       # Çalışmıyorsa başlat
```

### `Cannot find module '@/generated/prisma/client'`
```bash
npx prisma generate
```

### Ortam değişkeni eksik uyarısı
`.env` dosyasının var olduğundan emin ol — `.env.example`'dan kopyalanabilir.

---

**Sonraki:** [DEPLOYMENT.md](DEPLOYMENT.md) — Sunucuya deploy
