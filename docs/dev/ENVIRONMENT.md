# ⚙️ Ortam Değişkenleri (Environment Variables) Tam Referansı

> **Kaynak:** .env.example ve src/lib/env.ts (Zod şema doğrulaması)
> **Kural:** .env dosyası yalnızca local geliştirme için. Üretimde container env veya secrets manager kullan.

---

## Hızlı Başlangıç

`ash
cp .env.example .env
# Zorunlu değerleri doldur (★ işaretliler), sonra isteğe bağlı servisleri ekle
`

---

## 🗄️ Kategori 1 — Veritabanı & Önbellek

| Değişken | Zorunlu | Açıklama | Örnek |
|---|---|---|---|
| POSTGRES_PASSWORD | ★ | PostgreSQL parolası (Docker) | guclu_parola_2026! |
| DATABASE_URL | ★ | Prisma bağlantı dizesi | postgresql://alo_user:PW@localhost:5432/aloyonetim |
| REDIS_PASSWORD | ★ | Redis parolası | redis_secret_2026 |
| REDIS_URL | ★ | Redis bağlantı dizesi | redis://:PW@localhost:6379 |

> Docker ortamında DATABASE_URL içindeki @localhost → @postgres olarak değiştirilmeli.

---

## 🔐 Kategori 2 — Güvenlik & Kimlik Doğrulama

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| JWT_SECRET | ★ | Admin JWT şifreleme (min 64 karakter) |
| ADMIN_EMAIL | ★ | Admin giriş e-postası |
| ADMIN_PASSWORD | ★ | Admin giriş şifresi |
| NODE_ENV | Otomatik | development / test / production |

JWT_SECRET üretmek için: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

---

## 📊 Kategori 3 — Analytics & SEO

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| NEXT_PUBLIC_GTM_ID | ❌ | Google Tag Manager konteyner kimliği |
| NEXT_PUBLIC_GA_ID | ❌ | Google Analytics 4 ölçüm kimliği |
| GOOGLE_PLACES_API_KEY | ❌ | GMB puanı ve yorumları için |
| GOOGLE_PLACES_PLACE_ID | ❌ | İşletme Google Places kimliği |
| NEXT_PUBLIC_CLARITY_ID | ❌ | Microsoft Clarity (ısı haritası) |
| NEXT_PUBLIC_FB_PIXEL_ID | ❌ | Meta Pixel kimliği |
| NEXT_PUBLIC_GSC_VERIFICATION | ❌ | Google Search Console doğrulama |
| NEXT_PUBLIC_BING_VERIFICATION | ❌ | Bing Webmaster doğrulama |
| INDEXNOW_KEY | ❌ | IndexNow anlık indeksleme anahtarı |

---

## 📬 Kategori 4 — Lead Yakalama Kanalları

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| RESEND_API_KEY | ❌ | Resend e-posta servisi API anahtarı |
| LEAD_TO_EMAIL | ❌ | Lead bildirimleri hedef adresi |
| LEAD_FROM_EMAIL | ❌ | Gönderici e-posta (doğrulanmış domain) |
| TELEGRAM_BOT_TOKEN | ❌ | Telegram bot token |
| TELEGRAM_CHAT_ID | ❌ | Telegram hedef grup/kanal kimliği |
| SUPABASE_URL | ❌ | Supabase proje URL (opsiyonel depolama) |
| SUPABASE_SERVICE_ROLE_KEY | ❌ | Supabase service role key |

---

## 🔗 Kategori 5 — N8N & Webhook / CRO

| Değişken | Açıklama |
|---|---|
| N8N_WEBHOOK_URL | N8N otomasyon webhook adresi |
| NEXT_PUBLIC_WHATSAPP_NUMBER | WhatsApp tıkla-konuş numarası |

---

## 🔧 Zod Şema Doğrulaması (src/lib/env.ts)

Uygulama başlangıcında zorunlu değişkenler Zod ile doğrulanır.
Eksik veya geçersiz değişken varsa uygulama BAŞLATILMAZ.

Doğrulanan zorunlu değişkenler: DATABASE_URL, JWT_SECRET, NODE_ENV, N8N_WEBHOOK_URL (opsiyonel)

---

## 🔄 Docker Ortamında Env Akışı

.env (Proje Kökü) → docker compose --env-file .env → docker-compose.yml  → Container → entrypoint.sh

Not: .env dosyası Docker BUILD sırasında görünmez, yalnızca RUNTIME'da geçerlidir.

---

## 📋 Üretim Kontrol Listesi

- [ ] POSTGRES_PASSWORD ve REDIS_PASSWORD güçlü ve unique
- [ ] JWT_SECRET en az 64 karakter rastgele string
- [ ] DATABASE_URL container adı kullanıyor (@postgres:5432)
- [ ] ADMIN_EMAIL ve ADMIN_PASSWORD tanımlı
- [ ] NEXT_PUBLIC_ değişkenlerinde hassas bilgi yok
- [ ] .env dosyası .gitignore'da listeleniyor

İlgili: DOCKER.md, SETUP.md, ../architecture/LEAD_SYSTEM.md
