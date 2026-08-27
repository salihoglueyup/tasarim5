# 📜 Proje Geliştirme Tarihi

Alo Yönetim web uygulamasının tüm önemli geliştirme adımlarının kronolojik kaydı.

---

## Faz 1 — Proje Temeli ve Temel Yapı
**Dönem:** 2024 başı

- Next.js 16 App Router altyapısı kuruldu
- Tailwind CSS 4, Framer Motion entegrasyonu
- Temel sayfa yapısı oluşturuldu (Ana sayfa, Hizmetler, Hakkımızda, İletişim)
- Prisma + PostgreSQL ORM kurulumu
- Docker Compose altyapısı kuruldu (PostgreSQL, Redis, N8N, Prisma Studio)
- JWT tabanlı Admin paneli oluşturuldu

---

## Faz 2 — SEO ve İçerik Altyapısı
**Dönem:** 2024 ortası

- Kapsamlı SEO planı hazırlandı (`docs/seo/MASTER_PLAN.md` — 250+ faz)
- JSON-LD şemaları eklendi (Organization, WebSite, LocalBusiness)
- Sitemap ve robots.txt otomasyonu
- Blog altyapısı (Tiptap editör, kategori/yazar sistemi)
- Referans projeleri modülü
- Lead yakalama sistemi (form → e-posta + Telegram bildirimi)

---

## Faz 3 — Servis Sayfaları ve Hesaplayıcılar
**Dönem:** 2024 sonu — 2025 başı

- 9 hizmet sayfası oluşturuldu (Peyzaj, Güvenlik, Temizlik, Havuz, Teknik Bakım vb.)
- Maliyet hesaplayıcı modülleri (Havuz, Güvenlik, Aidat, Bakım)
- Sektörel çözümler sayfası
- S.S.S (FAQ) modülü — veritabanı destekli, dinamik
- 500+ Sıkça Sorulan Soru üretildi ve seed scriptleriyle sisteme yüklendi

---

## Faz 4 — Çoklu Dil (i18n) Sistemi
**Dönem:** 2025

- Next.js App Router tabanlı `[lang]` klasör yapısı
- 4 dil desteği: Türkçe, İngilizce, Rusça, Arapça
- `src/i18n/locales/[lang]/common.json` sözlük sistemi
- `LanguageContext` (client-side) ve `getDictionary` (server-side) entegrasyonu
- RTL (sağdan sola) desteği — Arapça için Cairo font
- `scripts/translate.mjs` ile otomatik çeviri scripti
- Tüm hizmet sayfaları, hesaplayıcılar, Hakkımızda ve İletişim sayfaları çevrildi
- Animasyonlu metinlerdeki HTML yapısı tüm dillerde korundu

---

## Faz 5 — Canlı Sunucu ve Production Altyapısı
**Dönem:** Ağustos 2026

### Ortam Değişkenleri Standardizasyonu
- `.env` ve `.env.example` dosyaları birbirinden tamamen farklı yapıdaydı
- İkisi aynı yapıya getirildi — PostgreSQL, Redis, JWT, Analytics, Lead değişkenleri
- `docker/.env` kaldırıldı, tek kaynak olarak proje kökündeki `.env` benimsendi

### Docker ve Sunucu Yönetimi
- `Makefile` oluşturuldu — uzun Docker komutlarına kısa kısayollar
- `docker/data/` klasörü `.gitignore`'a eklendi (runtime verileri git'te takip edilmemeli)
- Canlı sunucuda git pull çakışması çözüldü — `git stash` + `git pull` akışı belgelendi
- PostgreSQL şifre uyumsuzluğu sorununa kalıcı çözüm dokumentasyona eklendi

### Veritabanı Seed Altyapısı
- `seed-faqs.ts` ve `seed-extended-faqs.ts` scriptleri `dotenv/config` ile düzeltildi
- `scripts/export-faqs.ts` — local veritabanından JSON export scripti
- `import-faqs.ts` — JSON'dan production veritabanına aktarım scripti
- `prisma/data/all_faqs_export.json` — 523 SSS verisi projeye dahil edildi

### Favicon ve Marka Görünürlüğü
- Kartal logosu gerçek favicon'a dönüştürüldü (Sharp ile)
- 4 boyut üretildi: 32x32, 180x180, 192x192, 512x512
- `src/app/[lang]/layout.tsx` metadata'sına `icons` bloğu eklendi
- `manifest.ts` PWA ikonları güncellendi
- Google Search Console'dan yeniden indeksleme talep edildi

### Güvenlik
- `public/.well-known/security.txt` oluşturuldu (Cloudflare uyarısı çözüldü)
- Dockerfile build aşamasında `JWT_SECRET` dummy değeri ile hata çözüldü
- `POSTGRES_PASSWORD` ve `REDIS_PASSWORD` tek yerden yönetilir hale getirildi

---

## Faz 6 — Core Web Vitals (CLS 0.000), Prisma 7.9.1, Evrensel Parlak Navbar & Dark Hero
**Dönem:** Ağustos 2026

### Core Web Vitals & CLS 0.000 Sıfırlama
- `content-visibility: auto; contain-intrinsic-size: 1px 600px;` kuralı section etiketlerinden kaldırıldı; 1080p ekranda footer ve sayfa itmesi tamamen sıfırlandı (CLS: **0.000**).
- Material Symbols fontu `&display=block` olarak entegre edildi; ligature metin kayması (FOUT) engellendi.
- Google Lighthouse Accessibility skoru **100/100 Tam Puan**'a ulaştırıldı (WCAG AAA > 7:1 renk kontrastı, tam ARIA etiketleri, form label bağlamaları).

### Prisma 7.9.1 & Sürücü Adaptörü Yükseltmesi
- Prisma 7.9.1'e yükseltildi ve `@prisma/adapter-pg` driver adapter ile `prisma.config.ts` mimarisine geçildi.
- Docker multi-stage build'de `runner` aşamasına `prisma.config.ts` ve `@prisma/adapter-pg` dahil edildi.
- `docker/web/entrypoint.sh` ile container açılışında `prisma db push` ve `node server.js` akışı otomatikleştirildi.

### Evrensel Parlak Navbar & Ultra-Premium Dark Hero
- `Header.tsx` içinde `isTopAndDarkHero = !isScrolled` yapılarak anasayfadaki kristal parlaklığındaki beyaz navbar, altın armalı beyaz logo ve cam efektli butonlar tüm sayfalara yayıldı.
- `PageHeader.tsx` anasayfa ve `/hakkimizda` ile birebir uyumlu Slate-950 titanium koyu gradyanına ve cam breadcrumbs rozetine yükseltildi.

---

## Git Commit İstatistikleri

| Konu | Commit Sayısı |
|---|---|
| i18n / Çeviriler | ~15 commit |
| Docker / Deployment | ~8 commit |
| Veritabanı / Seed | ~6 commit |
| SEO / Favicon | ~5 commit |
| Dokümantasyon | ~4 commit |
| Temizlik / Refactor | ~5 commit |
| **Toplam** | **~43 commit** |

---

## Öğrenilen Dersler

- **Docker volume şifresi:** PostgreSQL şifresi sadece ilk başlatmada ayarlanır. Değiştirilmek istenirse volume silinmeli.
- **git pull çakışması:** Sunucuda `npm install` yapılmışsa `package.json` değişebilir. `git stash` + `git pull` güvenli çözüm.
- **PowerShell wildcard:** `[lang]` gibi köşeli parantezli dizinler PowerShell'de sorun çıkarır. Tırnak kullanmak gerekir.
- **Docker build vs runtime:** `.env` dosyası Docker build sırasında görünmez, sadece container çalışırken.
- **Seed scriptleri:** `dotenv/config` import edilmezse `DATABASE_URL` boş gelir ve bağlantı hatası oluşur.
