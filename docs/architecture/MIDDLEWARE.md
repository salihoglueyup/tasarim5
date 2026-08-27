# 🛡️ Middleware Mimarisi

> **Dosya:** src/middleware.ts (335 satır, 14KB)
> Next.js Edge Runtime'da her istek için çalışır. 7 katmanlı işlem hattına sahiptir.

---

## Genel Bakış — Middleware İşlem Hattı

`
Gelen İstek
     ↓
[0]  Güvenlik Kalkanı       → .env, .php, .sql, dotfile erişimlerini 403 ile engelle
     ↓
[0.5] AI Bot Telemetrisi   → GPTBot, ClaudeBot, Perplexity, DeepSeek logla
     ↓
[1]  Statik & API Bypass   → /_next, /api, görseller, fontlar → doğrudan geç
     ↓
[1.5] URL Normalizasyonu   → Büyük harf → 301 yönlendirme
     ↓
[2]  Kimlik Doğrulama      → /admin/* → JWT cookie kontrolü
     ↓
[3]  Dil Yönlendirmesi     → Locale tespiti, slug çevirisi, canonical yönlendirme
     ↓
[4]  Enterprise SEO Headers → ETag, Link RFC 8288, X-Robots-Tag, AI yönlendirme
     ↓
Yanıt
`

---

## 🔐 Katman 0 — Güvenlik Kalkanı

**Amaç:** Kötü amaçlı bot ve tarayıcıların hassas dosyalara erişimini engeller.

Engellenen path desenleri:
- /@fs, /.env, /.aws, /.claude, /.git, /.bash, /.config
- .php, .sql, .bak, .ini, .conf, .log, .yml, .yaml uzantıları

`
Sonuç: HTTP 403 Forbidden (metin yanıt)
`

---

## 🤖 Katman 0.5 — AI Bot Telemetrisi

**Modül:** src/lib/seo/aiBotTelemetry.ts → detectAndLogAiCrawler()

Tanınan AI botları:
- GPTBot (ChatGPT), PerplexityBot, Claude-Web, Applebot
- Google-Extended (Gemini), CCBot, Amazonbot, DeepSeek

Her crawl olayı anlık loglanır (bot adı, tip, path, durum kodu, IP, user-agent).
Log saklama: src/lib/seo/facilityBotAuditLog.ts

---

## ⚡ Katman 1 — Statik Dosya & API Bypass

Aşağıdaki path'ler middleware işlemi atlar (NextResponse.next()):
- /_next — Next.js dahili varlıkları
- /api — Tüm API route handler'lar
- /icon, /apple-icon — Uygulama ikonları
- .png, .jpg, .webp, .svg, .pdf, .xml, .txt, .webmanifest, .ico

---

## 🔤 Katman 1.5 — URL Normalizasyonu

**SEO Kuralı:** Tüm URL'ler küçük harf olmalıdır (duplicate content önleme).

`
/TR/Hizmetler → 301 → /tr/hizmetler
/EN/About     → 301 → /en/about
`

---

## 🔑 Katman 2 — Kimlik Doğrulama (Admin Guard)

**Korunan rotalar:** /*/admin/* (login sayfası hariç)
**Token:** HTTP-only cookie dmin_session (JOSE JWT)

`
İstek → /tr/admin/dashboard
     ↓
cookie admin_session var mı?
     ↓ (hayır)
→ 302 /tr/admin/login

     ↓ (evet, decrypt)
session.role === 'ADMIN'?
     ↓ (hayır)
→ 302 /tr/admin/login

     ↓ (evet)
→ Admin paneline giriş
`

Zaten giriş yapmış kullanıcı /admin/login'e gelirse /admin/dashboard'a yönlendirilir.

---

## 🌍 Katman 3 — Dil Yönlendirmesi & Slug Çevirisi

**Desteklenen diller:** tr (varsayılan), en, ru, ar

### 3a. /tr Canonical Temizliği

`
/tr/hizmetler → 301 → /hizmetler   (SEO canonical: tr prefix kaldırılır)
/tr           → 301 → /
`

### 3b. Locale Yok → Rewrite

`
/hizmetler → rewrite → /tr/hizmetler (tarayıcıda /tr görünmez)
`

### 3c. Otomatik Dil Tespiti

Tarayıcı Accept-Language başlığına göre varsayılan dil tr değilse (örn: ru) ziyaretçi /ru'ya yönlendirilir.

### 3d. Slug Çevirisi (Translated Slugs)

İngilizce, Rusça ve Arapça URL'ler Türkçe App Router klasörlerine rewrite edilir:

| Gelen URL | Rewrite Hedefi |
|---|---|
| /en/services | /en/hizmetler |
| /en/facility-management | /en/hizmetler/tesis-yonetimi |
| /ru/uslugi | /ru/hizmetler |
| /ar/khadamat | /ar/hizmetler |
| /en/about | /en/hakkimizda |
| /en/contact | /en/iletisim |
| /en/get-quote | /en/teklif-al |

Tam çeviri haritası: src/middleware.ts L19-103 (translatedSlugs objesi)

---

## 📡 Katman 4 — Enterprise SEO Response Headers

**Kapsam:** /admin ve /api dışındaki tüm sayfalar

### 4a. ETag & 304 Not Modified Kalkanı (Tesis Rotaları)

Tesis yönetimi sayfalarında (/tesis-yonetimi) içerik hash'i hesaplanır:
- Bot If-None-Match header ile cache'den sorgularsa → HTTP 304 döner (bant genişliği sıfır)
- Cache hit olayı bot audit log'a kaydedilir

**Modül:** src/lib/seo/facilityEdgeOptimizer.ts → generateFacilityContentHash()

### 4b. Crawl Budget Defender

URL parametreleri denetlenir (?utm_*, ?fbclid=* vb.):
- Analitik parametreli URL'ler → X-Robots-Tag: noindex, follow

**Modül:** src/lib/seo/crawlBudgetDefender.ts → nalyzeCrawlBudget()

### 4c. Standard SEO Headers (Tüm Sayfalar)

`
X-Robots-Tag          → max-image-preview:large, max-snippet:-1
X-Topical-Authority   → Alo Yonetim - Profesyonel Tesis Yonetimi (ISO 41001 & KMK 634)
X-Dataset-Reference   → /api/geo/facility-coverage.geojson
Link                  → RFC 8288 hreflang + sitemap + RSS + entity-graph link header'ları
`

### 4d. AI Bot Özel Yönlendirme Headers

GPTBot, PerplexityBot, ClaudeBot, Google-Extended tespit edilirse:

`
X-AI-Knowledge-Protocol  → /llms.txt
X-AI-Knowledge-Corpus    → /llms-full.txt
X-AI-Knowledge-Endpoint  → /api/ai/facility-agent-context.json
X-AI-Legal-Precedents    → /api/tesis-yonetimi/legal-precedents.json
X-AI-RFP-Generator       → /api/tesis-yonetimi/rfp-generator
X-AI-Entity-Graph        → /api/tesis-yonetimi/entity-graph.jsonld
`

---

## ⚙️ Middleware Matcher Konfigürasyonu

`	ypescript
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|video|fonts).*)'],
};
`

Middleware ÇALIŞMAZ: /api/*, /_next/static/*, /images/*, /video/*, /fonts/*

---

## 🧩 Bağımlı Modüller

| Modül | Kullanım |
|---|---|
| src/lib/auth.ts → decrypt() | Admin JWT cookie şifresi çözme |
| src/lib/seo/edgeHeaderInjector.ts | buildHttpLinkHeader, buildXRobotsTag |
| src/lib/seo/crawlBudgetDefender.ts | analyzeCrawlBudget |
| src/lib/seo/aiBotTelemetry.ts | detectAndLogAiCrawler |
| src/lib/seo/facilityEdgeOptimizer.ts | buildFacilityEdgeHeaders, generateFacilityContentHash |
| src/lib/seo/facilityBotAuditLog.ts | recordBotCrawlEvent |
| @formatjs/intl-localematcher | Dil eşleştirme |
| negotiator | Accept-Language başlık ayrıştırıcı |

---

İlgili: OVERVIEW.md, ../seo/SEO_ENGINE_REFERENCE.md, ../ai/BOT_TELEMETRY.md
