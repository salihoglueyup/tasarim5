# Deployment Rehberi — Alo Yönetim (Next.js 16 SSR)

Bu uygulama **tam SSR**'dir: middleware/proxy (`src/proxy.ts`), API route (`/api/lead`),
`next/image` optimizasyonu ve dinamik sayfalar içerir. Bu yüzden **statik export (`output: 'export'`)
uygun DEĞİLDİR** — bir Node.js sunucusu gerekir.

> **Node.js sürümü:** Next.js 16.2.10 → **Node `>=20.9.0` zorunlu.** 18 ve altı çalışmaz.

---

## Seçenek A — Vercel (önerilen, en kolay)

Uygulama Vercel için tasarlandı; middleware, API, `next/image` sıfır konfigürasyonla çalışır.

1. https://vercel.com → GitHub ile giriş → **Add New Project** → `salihoglueyup/tasarim5` reposunu içe aktar.
2. Framework otomatik **Next.js** algılanır. Build ayarlarına dokunma (varsayılan `next build`).
3. **Environment Variables** ekle (bkz. `LEADS_SETUP.md`):
   `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER` ve analytics ID'leri.
4. **Deploy.** Sonrası: her `git push` otomatik deploy olur. Domain'i Project → Settings → Domains'ten bağla.

---

## Seçenek B — cPanel (Setup Node.js App / Phusion Passenger)

Paylaşımlı cPanel'de çalışır ama kırılgandır. WordPress ana domaindeyse Next'i **alt alan adında**
yayınla (ör. `app.aloyonetim.com`) — aynı kökte PHP/`.htaccess` ile Node çakışır.

### cPanel "Setup Node.js App" alanları

| Alan | Değer |
|---|---|
| Node.js version | **20.x / 22.x** (≥20.9 — menüde yoksa çalışmaz) |
| Application mode | **Production** |
| NODE_ENV | **production** |
| Application root | Dosyaları yüklediğin klasör, ör. `aloyonetim` (`/home/KULLANICI/aloyonetim`) |
| Application URL | ör. `app.aloyonetim.com` |
| Application startup file | **`server.js`** (bu repoda hazır) |

### Adımlar
1. Repo dosyalarını Application root'a yükle (git clone ya da dosya yöneticisi). `node_modules/` ve
   `.next/` **yükleme** — sunucuda üreteceğiz.
2. cPanel Node.js App ekranında **"Run NPM Install"** (veya terminalde `npm ci`).
3. cPanel'in verdiği `source /home/.../bin/activate` komutuyla uygulama sanal ortamına gir, sonra
   **`npm run build`** çalıştır. (Build şart — `.next` üretilir.)
4. **Environment variables** bölümüne yukarıdaki env'leri ekle.
5. Startup file `server.js` olduğundan emin ol → **Restart**.

### `server.js` hakkında
- Passenger başlangıç dosyasını doğrudan çalıştırır (`npm start` değil); portu `process.env.PORT` ile verir.
- `package.json`'daki `start` script'i lokal/geliştirme için `next start` olarak kalır — dokunma.
- `output: 'standalone'` ile **birlikte kullanılmaz** (Next docs uyarısı).

### Bilinen cPanel tuzakları
- `next/image` için `sharp` paylaşımlı hostta derlenemeyebilir → gerekirse `npm i sharp` veya barındırıcıdan destek.
- RAM/işlem limitleri SSR'ı etkileyebilir; 502 alırsan Passenger loglarına bak.
- Deploy sonrası `/api/lead` ve dinamik sayfaları test et (curl ile 200/400 doğrula).

---

## Kendi sunucusuna taşırken (VPS)
Node ≥20.9 kurulu bir VPS'te en temiz yol: `npm ci && npm run build && npm run start` (veya `node server.js`)
+ önünde Nginx reverse proxy + `pm2` ile süreç yönetimi. İstersen `output: 'standalone'` ile minimal
`.next/standalone` çıktısı da alınabilir (bu durumda `server.js` custom dosyası kullanılmaz).
