# 📬 Lead Yakalama Sistemi

Site formları (iletişim, teklif sihirbazı, bülten, geri-arama) tek bir uç noktaya
(`POST /api/lead`) gider ve oradan **üç kanala paralel** dağıtılır: e-posta, Telegram,
**Prisma veritabanı**. Her kanal **env-gated**'dir — ilgili ortam değişkeni yoksa o kanal
sessizce atlanır, akış çökmez.

**Mimari:**
```
Form → POST /api/lead
         ↓
   [Validasyon + Honeypot + Rate-limit]
         ↓
   ┌─────┴─────────────────────────┐
   ↓             ↓                 ↓
E-posta       Telegram          PostgreSQL
(Resend)     (Bot API)       (Prisma → Lead tablosu)
```

Kod konumu:
- Route: `src/app/api/lead/route.ts`
- Dispatch: `src/lib/leads/`
- Hook: `src/hooks/useLeadSubmit.ts`

---

## 1) Veritabanı — Prisma (PostgreSQL)

Lead'ler **otomatik olarak** `Lead` tablosuna kaydedilir — ek kurulum gerekmez.
Docker başlarken `prisma db push` çalışır ve tablo oluşturulur.

```prisma
model Lead {
  id        String   @id @default(cuid())
  type      String   // 'contact' | 'callback' | 'quote' | 'newsletter'
  name      String?
  phone     String?
  email     String?
  subject   String?
  message   String?
  meta      String?  // JSON string
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

Admin panelinden görüntülemek için: `/{lang}/admin/leads`
Prisma Studio'dan görüntülemek için: `localhost:5555`

---

## 2) E-posta — Resend (Opsiyonel)

1. [resend.com](https://resend.com) → hesap aç, **API Keys**'ten anahtar üret
2. `aloyonetim.com.tr` domain'ini **Domains** altında doğrula (SPF/DKIM DNS kayıtları)
3. `.env`'e ekle:
```bash
RESEND_API_KEY=re_xxxx
LEAD_TO_EMAIL=bildirim@aloyonetim.com.tr
LEAD_FROM_EMAIL=noreply@aloyonetim.com.tr
```

> Doğrulanana kadar `LEAD_FROM_EMAIL` yerine Resend test adresi (`onboarding@resend.dev`) kullanılır.

---

## 3) Telegram — Bot API (Opsiyonel, Ücretsiz)

1. Telegram'da **@BotFather** → `/newbot` → token'ı al
2. Botu hedef grup/kanala ekle
3. `chat_id`'yi öğren:
```bash
curl https://api.telegram.org/bot<TOKEN>/getUpdates
# gelen JSON'daki chat.id değeri
```
4. `.env`'e ekle:
```bash
TELEGRAM_BOT_TOKEN=1234567890:ABC...
TELEGRAM_CHAT_ID=-1001234567890
```

---

## Spam Koruması (Route İçinde)

| Koruma | Açıklama |
|---|---|
| **Honeypot** | Gizli `company` alanı doluysa sessiz 200 (bot tuzağı) |
| **Min-süre** | Form açılışından <2 sn gönderim reddedilir (`elapsedMs`) |
| **Rate-limit** | IP başına dakikada 5 istek (Redis üzerinden) |

---

## Yerel Test

```bash
npm run dev

# Geçerli talep (veritabanına kaydedilir):
curl -s -X POST localhost:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{"type":"contact","name":"Test","phone":"05555555555","message":"deneme"}'

# Honeypot (bot) → sessiz ok (kaydedilmez):
curl -s -X POST localhost:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{"type":"contact","name":"x","phone":"05555555555","company":"bot"}'

# Eksik alan → 400:
curl -s -X POST localhost:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{"type":"contact"}'
```

---

## Lead Kanalları Özeti

| Kanal | Env Değişkeni | Zorunlu? | Açıklama |
|---|---|---|---|
| PostgreSQL | Otomatik (Docker) | ✅ Evet | Her lead kaydedilir |
| E-posta | `RESEND_API_KEY` | ❌ Hayır | Anlık e-posta bildirimi |
| Telegram | `TELEGRAM_BOT_TOKEN` | ❌ Hayır | Anlık mesaj bildirimi |

> Hiçbir opsiyonel kanal yapılandırılmasa bile lead'ler veritabanında birikir.
> Admin panelinden `/{lang}/admin/leads` adresinden okunabilir.

---

**Önceki:** [OVERVIEW.md](OVERVIEW.md) — Genel mimari
**Sonraki:** [PERFORMANCE.md](PERFORMANCE.md) — Performans bütçesi
