# ⚙️ Yerel Geliştirme Kurulumu

## Gereksinimler

| Araç | Minimum Sürüm | Kontrol |
|---|---|---|
| Node.js | 20.x (LTS) | `node -v` |
| npm | 10.x | `npm -v` |
| Git | 2.x | `git --version` |

## 1. Depoyu Klonla

```bash
git clone https://github.com/salihoglueyup/tasarim5.git
cd tasarim5
```

## 2. Ortam Değişkenlerini Ayarla

`.env.example` dosyasını kopyala ve değerleri doldur:

```bash
cp .env.example .env.local
```

Zorunlu değişkenler:

| Değişken | Açıklama | Kaynak |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitenin tam URL'si | Örn: `https://aloyonetim.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp numarası | Örn: `905xxxxxxxxx` |
| `RESEND_API_KEY` | E-posta gönderimi | [resend.com](https://resend.com) |
| `TELEGRAM_BOT_TOKEN` | Telegram bildirimleri | @BotFather |
| `TELEGRAM_CHAT_ID` | Telegram hedef kanalı | getUpdates API |
| `SUPABASE_URL` | Veritabanı URL | [supabase.com](https://supabase.com) |
| `SUPABASE_SERVICE_ROLE_KEY` | Veritabanı anahtarı | Supabase Dashboard |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | GA4 yönetici paneli |

> Hiçbir değer yoksa bile uygulama çalışır — lead kanalları sessizce atlanır.

## 3. Bağımlılıkları Yükle

```bash
npm install
```

## 4. Dev Sunucusunu Başlat

```bash
npm run dev
# veya dev.bat'tan [1] seç
```

Tarayıcıda aç: [http://localhost:3000](http://localhost:3000)

---

## 🪟 Windows Kullanıcıları: dev.bat Menüsü

Proje kök dizinindeki `dev.bat` dosyasına çift tıklayarak tüm işlemleri menüden yapabilirsin.

## Faydalı Komutlar

```bash
npm run build      # Production build
npm run start      # Production önizleme
npx tsc --noEmit   # TypeScript kontrolü
npx eslint src     # Lint kontrolü
```

## Sık Karşılaşılan Sorunlar

### `.next/` ile ilgili hatalar
```bash
# dev.bat [17] veya:
rm -rf .next && npm run dev
```

### node_modules sorunları
```bash
# dev.bat [18] veya:
rm -rf node_modules .next && npm install
```

### Ortam değişkeni eksik uyarısı
`.env.local` dosyasının var olduğundan emin ol — `.env.example`'dan kopyalanabilir.

---

**Sonraki:** [DEPLOYMENT.md](DEPLOYMENT.md) — Vercel'e deploy
