# 🚀 Deployment Rehberi (Vercel)

## Genel Bakış

Uygulama **Vercel** üzerinde barındırılır. Ana branch push'u otomatik olarak production'a deploy olur.

- **Şube stratejisi:** `main` → Production, `seo/*` → Preview
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Build komutu:** `next build`
- **Output:** `.next/`

---

## 1. İlk Kurulum (Yeni Vercel Projesi)

1. [vercel.com](https://vercel.com) → "New Project"
2. GitHub reposunu import et (`salihoglueyup/tasarim5`)
3. Framework: **Next.js** otomatik algılanır
4. **Environment Variables** ekle (aşağıdaki tam liste)
5. **Deploy** → Production URL alırsın

---

## 2. Ortam Değişkenleri (Tam Liste)

Vercel Proje → Settings → Environment Variables bölümüne ekle:

### Zorunlu — Site Kimliği
| Değişken | Örnek Değer | Ortam |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aloyonetim.com.tr` | Production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `905216550xxxx` | Hepsi |

### Lead Yakalama (Opsiyonel ama önerilen)
| Değişken | Açıklama | Ortam |
|---|---|---|
| `RESEND_API_KEY` | E-posta bildirimi | Production |
| `LEAD_TO_EMAIL` | Bildirimlerin gideceği e-posta | Production |
| `LEAD_FROM_EMAIL` | Gönderici e-posta (doğrulanmış domain) | Production |
| `TELEGRAM_BOT_TOKEN` | Anlık Telegram bildirimleri | Production |
| `TELEGRAM_CHAT_ID` | Hedef grup/kanal ID | Production |
| `SUPABASE_URL` | Veritabanı URL | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | Veritabanı gizli anahtarı ⚠️ | Production |

### Analitik (Opsiyonel)
| Değişken | Açıklama |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity Project ID |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta Pixel ID |

### Gelişmiş
| Değişken | Açıklama |
|---|---|
| `INDEXNOW_KEY` | Bing/Yandex IndexNow anahtarı |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console doğrulama |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster doğrulama |

> **⚠️ Güvenlik:** `SUPABASE_SERVICE_ROLE_KEY` ve `RESEND_API_KEY` asla `NEXT_PUBLIC_` prefix'i almaz — sadece sunucu tarafında kullanılır.

---

## 3. Deploy Akışı

```
git push origin main
       ↓
  Vercel Webhook
       ↓
  next build (Turbopack)
       ↓
  288 statik rota generate
       ↓
  Edge Network'e deploy
       ↓
  aloyonetim.com.tr güncellendi
```

### Preview Deploy (Feature Branch)
```bash
git checkout -b feature/yeni-ozellik
git push origin feature/yeni-ozellik
# Vercel otomatik preview URL üretir
```

---

## 4. Domain Ayarı

1. Vercel → Project → Settings → Domains
2. `aloyonetim.com.tr` ekle
3. DNS yöneticisinde (Cloudflare/Namecheap vb.):
   - A kaydı: `76.76.21.21` (Vercel IP)
   - CNAME: `www` → `cname.vercel-dns.com`
4. Resend için DKIM/SPF kayıtları (lead e-postaları için)

---

## 5. Deploy Sonrası Kontroller

```bash
# Sitemap erişilebilir mi?
curl https://aloyonetim.com.tr/sitemap.xml

# robots.txt doğru mu?
curl https://aloyonetim.com.tr/robots.txt

# JSON-LD geçerli mi?
node scripts/validate-jsonld.mjs

# SEO audit
node scripts/seo-audit.mjs
```

---

## 6. Lighthouse CI (Opsiyonel)

`lighthouserc.json` hazır. GitHub Actions ile bağlamak için:

```yaml
# .github/workflows/lighthouse.yml
- uses: treosh/lighthouse-ci-action@v11
  with:
    configPath: ./lighthouserc.json
```

---

**Sonraki:** [../architecture/LEAD_SYSTEM.md](../architecture/LEAD_SYSTEM.md) — Lead sistemi kurulumu
