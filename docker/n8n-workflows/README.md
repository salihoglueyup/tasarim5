# Alo Yönetim — n8n Workflow Kurulum Rehberi

## Genel Bakış

| Dosya | Workflow | Tetikleyici |
|-------|----------|-------------|
| `w1-linkedin-autopost.json` | LinkedIn Otomatik Post | Salı + Perşembe 10:00 |
| `w2-lead-sync.json` | LinkedIn Lead Gen Form Sync | Her 30 dakika |
| `w3-teklif-webhook.json` | Teklif Formu Zenginleştirme | Webhook POST |
| `w4-competitor-monitoring.json` | Rakip Reklam İzleme | Pazartesi 09:00 |
| `w5-linkedin-stats.json` | Sayfa İstatistikleri | Cuma 17:00 |
| `w6-ai-outreach.json` | AI Destekli Outreach | Hafta içi 14:00 |
| `w7-daily-followup.json` | Günlük Takip Hatırlatıcı | Hafta içi 08:30 |
| `w8-weekly-report.json` | Haftalık Performans Raporu | Cuma 17:05 |

---

## 1. Ön Koşullar

### Prisma Migrate

```powershell
cd "C:\Gelistirme\Alo Yönetim"
npx prisma migrate dev --name linkedin-automation-models
```

3 yeni tablo oluşur: `LinkedInOutreach`, `LinkedInAdSnapshot`, `LinkedInMetrics`

---

## 2. Env Değişkenleri

`docker/.env` dosyasına eklendi (boş değerleri doldur):

```env
LINKEDIN_CLIENT_ID=         # LinkedIn Developer Portal
LINKEDIN_CLIENT_SECRET=     # LinkedIn Developer Portal
LINKEDIN_COMPANY_ID=        # Şirket sayfası URL'indeki sayı
LINKEDIN_ACCESS_TOKEN=      # n8n OAuth sonrası buraya yaz
GOOGLE_SHEETS_CREDENTIALS=  # base64 Service Account JSON
LINKEDIN_CONTENT_SHEET_ID=  # Sheets dosya URL'indeki ID
WHATSAPP_ACCESS_TOKEN=      # Meta Business System User token
WHATSAPP_PHONE_NUMBER_ID=   # WhatsApp Business numarası ID'si
WHATSAPP_TO_NUMBER=         # +905XXXXXXXXX formatında
OPENAI_API_KEY=             # platform.openai.com
```

---

## 3. LinkedIn OAuth Kurulumu

### LinkedIn Developer Portal
1. https://www.linkedin.com/developers/apps → uygulamana gir
2. **Auth** sekmesi → Redirect URLs'e `http://n8n.aloyonetim.com.tr/rest/oauth2-credential/callback` ekle
3. Client ID ve Secret'ı kopyala → `docker/.env`'e yaz

### n8n Credential
1. `localhost:5678` → Credentials → New
2. Type: **LinkedIn OAuth2 API**
3. Client ID + Secret gir → OAuth flow tamamla
4. Credential adını `Alo Yönetim LinkedIn` yap
5. Access token oluştuktan sonra `LINKEDIN_ACCESS_TOKEN`'ı da güncelle

---

## 4. Google Sheets Kurulumu

### Service Account
1. https://console.cloud.google.com → Yeni Proje veya mevcut
2. APIs & Services → Enable **Google Sheets API**
3. Credentials → Service Account → JSON key indir
4. JSON'ı base64'e çevir: `[System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("credentials.json"))` (PowerShell)
5. `GOOGLE_SHEETS_CREDENTIALS`'a yaz

### İçerik Takvimi Spreadsheet
1. Yeni Google Sheets oluştur
2. Sayfa adı: **İçerik Takvimi**
3. Kolonlar: `A=Tarih` | `B=PostMetni` | `C=Durum` | `D=YayınTarihi`
4. Durum değerleri: `Bekliyor` / `Yayınlandı`
5. Service Account e-postasını spreadsheet'e **Editor** olarak ekle
6. Spreadsheet ID'yi URL'den kopyala → `LINKEDIN_CONTENT_SHEET_ID`'ye yaz

### n8n Credential
1. n8n → Credentials → New → **Google Sheets OAuth2 API**
2. Service Account JSON'ı kullan
3. Credential adı: `Google Sheets Alo Yönetim`

---

## 5. WhatsApp Meta Cloud API Kurulumu

1. https://developers.facebook.com → App oluştur veya mevcut app'e gir
2. **WhatsApp** ürününü ekle → Getting Started
3. Test phone number ID'yi kopyala → `WHATSAPP_PHONE_NUMBER_ID`
4. Temporary Access Token → `WHATSAPP_ACCESS_TOKEN`
5. Bildirim alacak numarayı doğrula → `WHATSAPP_TO_NUMBER` (örn. `+905505504848`)

> **Production için:** System User Access Token oluştur (90 gün yerine kalıcı)

---

## 6. n8n'e Workflow Import

1. `localhost:5678` aç
2. Sol menü → **Workflows** → **Import from file**
3. Her JSON dosyasını sırayla import et
4. Her workflow'da credential'ları kendi bağlantılarınla değiştir:
   - `postgres-cred` → Alo Yönetim PostgreSQL
   - `telegram-cred` → Alo Yönetim Telegram
   - `gsheets-cred` → Google Sheets Alo Yönetim
5. Workflow'u **Active** yap

---

## 7. PostgreSQL Credential (n8n)

n8n → Credentials → New → **PostgreSQL**:
```
Host: postgres          (Docker servis adı)
Port: 5432
Database: aloyonetim
User: alo_user
Password: [POSTGRES_PASSWORD değeri]
SSL: false
```

---

## 8. Telegram Credential (n8n)

n8n → Credentials → New → **Telegram API**:
```
Access Token: [TELEGRAM_BOT_TOKEN değeri]
```

---

## 9. Test Sırası

```
1. W7 — Execute Workflow → Telegram'a lead listesi gelmeli
2. W3 — curl -X POST http://localhost:3001/api/lead \
         -H "Content-Type: application/json" \
         -d '{"type":"quote","name":"Test","phone":"05001234567"}' \
         → WhatsApp bildirimi gelmeli
3. W1 — Sheets'e "Bekliyor" satırı ekle → Trigger → LinkedIn post
4. W5 — Execute → LinkedInMetrics tablosunda satır oluşmalı
5. W8 — Execute → Email + Telegram rapor gelmeli
6. W2 — Execute → LinkedIn lead form responses çekilmeli
7. W4 — Execute → Reklamlar taranmalı
8. W6 — DRY-RUN: "Outreach Kaydet" nodeunu devre dışı bırak → sadece log
```

---

## Notlar

- **W3**: `N8N_WEBHOOK_URL` env'i zaten `http://localhost:5678/webhook/yeni-talep` → Next.js bu URL'e atıyor. n8n'de webhook URL'in tam olarak `/webhook/yeni-talep` olduğundan emin ol.
- **W6**: İlk 2 hafta dry-run çalıştır. LinkedIn connection request API'si deneysel — `POST /v2/connections` endpoint aktifse devam et, değilse Manuel outreach metni Telegram'a gelir.
- **W2 cursor**: `AuditLog` tablosunu cursor store olarak kullanıyor (action=`linkedin_lead_sync_cursor`).
