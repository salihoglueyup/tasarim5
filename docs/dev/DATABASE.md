# 🗄️ Veritabanı ve Prisma Rehberi

## Genel Bakış

- **ORM:** Prisma 7.9.1 (driver adapter: `@prisma/adapter-pg`)
- **Veritabanı:** PostgreSQL 16 / 15-alpine (Docker container: `aloyonetim-postgres`)
- **Şema:** `prisma/schema.prisma`
- **Prisma Config:** `prisma.config.ts` (Prisma v7 native config dosyası)
- **Prisma Client Başlatma (`src/lib/prisma.ts`):** `pg.Pool` ve `PrismaPg` adapter ile bağlantı havuzu yönetimi
- **Prisma Client Üretim Konumu:** `node_modules/@prisma/client` / `.prisma/client`

---

## Tablolar (Modeller)

| Model | Açıklama |
|---|---|
| `User` | Admin paneli kullanıcıları (JWT auth) |
| `Category` | Blog kategorileri (çoklu dil) |
| `Author` | Blog yazarları |
| `Post` | Blog yazıları (çoklu dil, Tiptap içerik) |
| `Faq` | Sıkça Sorulan Sorular (çoklu dil, 500+) |
| `Reference` | Referans projeler (çoklu dil, galeri) |
| `Partner` | İş ortakları/logolar |
| `Lead` | Form gönderileri (iletişim, teklif vs.) |
| `CalculatorConfig` | Hesaplayıcı maliyet ayarları |
| `CalculatorLog` | Hesaplama logları (analytics) |
| `SectoralSolution` | Sektörel çözümler (çoklu dil) |
| `AuditLog` | Admin panel işlem logları |

---

## Prisma Kurulumu

### İlk Kurulum / Sunucuda İlk Çalıştırma
```bash
# 1. Prisma Client üret (src/generated/prisma/ oluşturur)
npx prisma generate

# 2. Tabloları veritabanında oluştur
npx prisma db push

# 3. Veritabanını doldur
npx tsx import-faqs.ts
```

> `prisma db push` = şemayı veritabanına uygular (migration dosyası oluşturmaz).
> Docker başlarken de otomatik olarak `prisma db push` çalışır (Dockerfile CMD).

### Şema Değişikliği Yapıldığında
```bash
# Şemayı düzenledikten sonra:
npx prisma generate   # Client'ı güncelle
npx prisma db push    # Veritabanını güncelle
```

---

## Seed Scriptleri

### `import-faqs.ts` (Ana Script — 500+ soru)
```bash
npx tsx import-faqs.ts
```
- `prisma/data/all_faqs_export.json` dosyasını okur
- Mevcut SSS'leri **önce siler**, sonra tümünü yeniden ekler
- Türkçe + İngilizce + Rusça + Arapça içerir

### `seed-faqs.ts` (Çekirdek 13 soru)
```bash
npx tsx seed-faqs.ts
```
- `prisma/data/faqs_core_1.json` dosyasını okur
- Mevcut verileri silmez, üstüne ekler

### `prisma/seed-extended-faqs.ts` (Genişletilmiş 10 soru)
```bash
npx tsx prisma/seed-extended-faqs.ts
```
- Kod içinde sabit yazılmış 10 ek soru
- Zaten varsa atlar (idempotent)

### `scripts/export-faqs.ts` (Dışa Aktarma)
```bash
npx tsx scripts/export-faqs.ts
```
- Veritabanındaki tüm SSS'leri `prisma/data/all_faqs_export.json`'a yazar
- Sunucular arası veri taşıma için kullanılır

---

## Prisma Studio (Görsel DB Arayüzü)

Docker ile otomatik başlar, `localhost:5555` adresinde erişilebilir:
```
http://localhost:5555
```

Ya da yerel geliştirmede:
```bash
npx prisma studio
```

---

## Bağlantı Yapılandırması

`src/lib/prisma.ts` dosyası Prisma client'ı `pg` (node-postgres) driver adapter ile başlatır:

```typescript
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
```

**Local geliştirme** `DATABASE_URL`:
```
postgresql://alo_user:SIFRE@localhost:5432/aloyonetim?schema=public
```

**Docker içi** `DATABASE_URL` (docker-compose.yml):
```
postgresql://alo_user:SIFRE@postgres:5432/aloyonetim?schema=public
```

> `localhost` yerine `postgres` — Docker container ismi!

---

## Sık Yapılan Hatalar

### `Cannot find module '@/generated/prisma/client'`
```bash
npx prisma generate   # Client'ı üret
```

### `P1000: Authentication failed`
PostgreSQL volume eski şifreyle başlatılmış. Çözüm:
```bash
make down
rm -rf docker/data/postgres
make build
npx prisma generate
npx tsx import-faqs.ts
```

### `SASL: client password must be a string`
`.env` dosyasında `DATABASE_URL` okunamamış demek. `dotenv/config` import edilmeli:
```typescript
import 'dotenv/config';  // seed scriptlerinin başına ekle
```

---

**Önceki:** [DOCKER.md](DOCKER.md) — Docker mimarisi
**Sonraki:** [../i18n/README.md](../i18n/README.md) — Çoklu dil mimarisi
