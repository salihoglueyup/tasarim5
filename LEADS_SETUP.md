# Lead Yakalama Kurulumu (Fonksiyonel Katman — Track 1)

Site formları (iletişim, teklif sihirbazı, bülten, geri-arama) tek bir uç noktaya
(`POST /api/lead`) gider ve oradan **üç kanala paralel** dağıtılır: e-posta, Telegram,
veritabanı. Her kanal **env-gated**'dir — ilgili ortam değişkeni yoksa o kanal sessizce
atlanır, akış çökmez. Hiç kanal yapılandırılmasa bile form kullanıcıya başarı gösterir
(talep sunucu log'una düşer). Bu yüzden kod, env eklenmeden de güvenle canlıya çıkabilir.

Mimari: `src/lib/leads/` (validate → dispatch → notify-email / notify-telegram / store-db),
route: `src/app/api/lead/route.ts`, ortak istemci hook'u: `src/hooks/useLeadSubmit.ts`.

## 1) E-posta — Resend
1. https://resend.com → hesap aç, **API Keys**'ten anahtar üret.
2. `aloyonetim.com` domain'ini **Domains** altında doğrula (SPF/DKIM DNS kayıtları). Doğrulanana
   kadar `LEAD_FROM_EMAIL` yerine Resend test adresi (`onboarding@resend.dev`) kullanılır.
3. Env: `RESEND_API_KEY`, `LEAD_TO_EMAIL` (virgülle çoklu adres olabilir), `LEAD_FROM_EMAIL`.

## 2) Telegram — Bot API (ücretsiz, anlık)
1. Telegram'da **@BotFather** → `/newbot` → token'ı al → `TELEGRAM_BOT_TOKEN`.
2. Botu hedef grup/kanala ekle (veya bota özelden bir mesaj at).
3. `chat_id`'yi öğren: tarayıcıda `https://api.telegram.org/bot<TOKEN>/getUpdates` aç, gelen
   JSON'daki `chat.id` değerini `TELEGRAM_CHAT_ID`'ye yaz (grup ise negatif olabilir).

## 3) Veritabanı — Supabase
1. https://supabase.com → proje oluştur. **Settings → API**'den `Project URL` → `SUPABASE_URL`,
   `service_role` anahtarı → `SUPABASE_SERVICE_ROLE_KEY` (**yalnız sunucuda**; asla client'a koyma).
2. SQL Editor'de `leads` tablosunu oluştur:

```sql
create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  type        text not null,
  name        text,
  phone       text,
  email       text,
  message     text,
  meta        jsonb
);
-- service_role zaten RLS'i bypass eder; anon erişime kapalı bırak (RLS açık, policy yok).
alter table public.leads enable row level security;
```

## Vercel'e ekleme
Proje → **Settings → Environment Variables** → yukarıdaki anahtarları **Production** (ve istenirse
Preview) için ekle → **Redeploy**. `NEXT_PUBLIC_WHATSAPP_NUMBER` istemciye gömülür (public).

## Lokal test
```bash
npm run build && npm run start
# Geçerli talep (env yoksa kanallar 'skipped' ama ok:true):
curl -s -X POST localhost:3000/api/lead -H "Content-Type: application/json" \
  -d '{"type":"contact","name":"Test","phone":"05555555555","message":"deneme"}'
# Honeypot (bot) → sessiz ok:
curl -s -X POST localhost:3000/api/lead -H "Content-Type: application/json" \
  -d '{"type":"contact","name":"x","phone":"05555555555","company":"bot"}'
# Eksik alan → 400:
curl -s -X POST localhost:3000/api/lead -H "Content-Type: application/json" -d '{"type":"contact"}'
```

## Spam koruma (route içinde)
- **Honeypot:** gizli `company` alanı doluysa sessiz 200 (bot).
- **Min-süre:** form açılışından <2 sn gönderim reddedilir (`elapsedMs`).
- **Rate-limit:** IP başına dakikada 5 istek (bellek-içi; kalıcı için Upstash Redis'e taşınabilir).
