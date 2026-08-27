# 🌐 API Endpoint Referansı

> **Toplam:** 22 endpoint grubu — Next.js Route Handler (App Router)
> **Temel URL:** https://aloyonetim.com.tr
> **Auth:** Belirtilmemişse public endpoint'tir.

---

## 📋 Hızlı Referans Tablosu

| Grup | Endpoint | Method | Auth | Açıklama |
|---|---|---|---|---|
| Lead | /api/lead | POST | - | Form başvurusu yarat |
| Auth | /api/auth/login | POST | - | Admin JWT token al |
| Auth | /api/auth/logout | POST | JWT | Admin oturumu kapat |
| Tesis | /api/tesis-yonetimi/ai-snippets.json | GET | - | AI snippet veri seti |
| Tesis | /api/tesis-yonetimi/benchmark.json | GET | - | Performans karşılaştırma |
| Tesis | /api/tesis-yonetimi/calculate-budget | POST | - | Bütçe hesaplama |
| Tesis | /api/tesis-yonetimi/compare-districts | GET | - | İlçe karşılaştırma |
| Tesis | /api/tesis-yonetimi/definitions.json | GET | - | Sözlük/tanımlar |
| Tesis | /api/tesis-yonetimi/dictionary.json | GET | - | Terim sözlüğü |
| Tesis | /api/tesis-yonetimi/dues-index.json | GET | - | Aidat endeksi |
| Tesis | /api/tesis-yonetimi/entity-graph.jsonld | GET | - | Schema.org entity grafik |
| Tesis | /api/tesis-yonetimi/faq.json | GET | - | SSS veri seti |
| Tesis | /api/tesis-yonetimi/feed.xml | GET | - | RSS/Atom yayın akışı |
| Tesis | /api/tesis-yonetimi/geo-feed.xml | GET | - | Coğrafi RSS beslemesi |
| Tesis | /api/tesis-yonetimi/kmk-law-index.json | GET | - | KMK mevzuat indeksi |
| Tesis | /api/tesis-yonetimi/knowledge.json | GET | - | Bilgi tabanı JSON |
| Tesis | /api/tesis-yonetimi/legal-precedents.json | GET | - | Hukuki emsal veritabanı |
| Tesis | /api/tesis-yonetimi/legal-templates | POST | - | Yasal belge şablonu üret |
| Tesis | /api/tesis-yonetimi/llm-facts.json | GET | - | LLM için yapılandırılmış gerçekler |
| Tesis | /api/tesis-yonetimi/ping-indexnow | POST | - | IndexNow URL bildirimi |
| Tesis | /api/tesis-yonetimi/rfp-generator | POST | - | RFP teklif belgesi oluştur |
| Tesis | /api/tesis-yonetimi/verify-credentials | POST | - | ISO sertifika doğrulama |
| Tesis | /api/tesis-yonetimi/voice-qa.json | GET | - | Sesli arama Q&A veri seti |
| Admin | /api/admin/ai-crawler-logs | GET | JWT | AI bot crawl logları |
| Admin | /api/admin/bot-telemetry | GET | JWT | Bot telemetri özeti |
| Admin | /api/admin/bot-tracker | GET | JWT | Bot izleme detayları |
| Admin | /api/admin/indexnow-bulk | POST | JWT | Toplu IndexNow bildirimi |
| Admin | /api/admin/schema-lint | POST | JWT | JSON-LD schema doğrulama |
| Admin | /api/admin/seo-health | GET | JWT | SEO sağlık durumu |
| Admin | /api/admin/seo-status | GET | JWT | SEO motor durumu |
| Admin | /api/admin/warm-facility-cache | POST | JWT | Tesis önbellek ısınma |
| SEO | /api/seo/analyze-content | POST | - | İçerik SEO analizi |
| SEO | /api/seo/audit-page | POST | - | Sayfa SEO denetimi |
| SEO | /api/seo/bot-analytics | GET | - | Bot analitikleri |
| SEO | /api/seo/facility-audit | POST | - | Tesis SEO denetimi |
| SEO | /api/seo/facility-knowledge | GET | - | Tesis bilgi tabanı |
| SEO | /api/seo/facility-rank-score | GET | - | Tesis sıralama skoru |
| SEO | /api/seo/intent-match | POST | - | Arama niyeti eşleştirme |
| SEO | /api/seo/verify-authority | GET | - | Otorite doğrulama |
| SEO | /api/seo/websub-notify | POST | - | WebSub bildirim |
| Geo | /api/geo/districts.geojson | GET | - | İstanbul ilçeleri GeoJSON |
| Geo | /api/geo/facility-coverage.geojson | GET | - | Hizmet kapsamı GeoJSON |
| Geo | /api/geo/istanbul.kml | GET | - | İstanbul KML harita |
| Geo | /api/geo/nearest-facility-hub | POST | - | En yakın hizmet merkezi |
| AI | /api/ai/* | GET | - | AI bilgi bağlamı endpoint'leri |
| Diğer | /api/calculator/* | POST | - | Hesaplayıcı API'leri |
| Diğer | /api/cron/* | - | Cron token | Zamanlanmış görevler |
| Diğer | /api/reviews | GET | - | Google GMB yorumları |
| Diğer | /api/search-suggest | GET | - | Arama önerisi |
| Diğer | /api/security | GET | - | Güvenlik kontrolleri |
| Diğer | /api/datasets/* | GET | - | Ham veri seti endpoint'leri |
| Diğer | /api/indexnow | POST | - | Tekil IndexNow bildirimi |
| Diğer | /api/knowledge-graph | GET | - | Bilgi grafik export |
| Diğer | /api/og | GET | - | OG görsel üretici |
| Diğer | /api/terms | GET | - | Sözlük terimleri |
| Diğer | /api/upload | POST | JWT | Dosya yükleme |
| Diğer | /api/summary | GET | - | Kurumsal özet AI beslemesi |
| Diğer | /api/facility | GET | - | Tesis veri seti |

---

## 📌 Kritik Endpoint Detayları

### POST /api/lead — Form Başvurusu

`
İstek gövdesi:
{
  "type": "contact" | "callback" | "quote" | "newsletter",
  "name": "string (opsiyonel)",
  "phone": "string (opsiyonel)",
  "email": "string (opsiyonel)",
  "subject": "string (opsiyonel)",
  "message": "string (opsiyonel)",
  "elapsedMs": number (bot tuzağı: <2000 → reddedilir),
  "company": "string (honeypot: dolu olursa sessiz 200 döner)"
}

Başarı yanıtı: { "success": true }
Hata yanıtları:
  400 → Eksik zorunlu alan
  429 → Rate limit aşımı (IP başına 5/dakika)
`

### GET /api/tesis-yonetimi/entity-graph.jsonld — Varlık Grafiği

Schema.org Service, Organization, DefinedTermSet, ItemList tiplerini birleştiren kapsamlı JSON-LD grafiği.
AI botları tarafından X-AI-Entity-Graph header üzerinden öncelikli olarak okunur.

### POST /api/tesis-yonetimi/rfp-generator — RFP Belge Üretici

Tesis yönetimi için özelleştirilmiş teklif belgesi (RFP) şablonu üretir.
Giriş: tesis tipi, alan bilgileri, hizmet kategorileri.
Çıkış: PDF veya Markdown formatında hazır teklif belgesi.

### GET /api/geo/facility-coverage.geojson — Coğrafi Kapsam

İstanbul'daki 12+ hizmet ilçesinin kapsamını GeoJSON formatında sunar.
Harita bileşenlerinde ve AI botlarına coğrafi bağlam sağlamak için kullanılır.

### GET /api/admin/bot-telemetry — Bot Telemetri (JWT Gerekli)

AI crawler ve arama botlarının crawl aktivitesini özetler.
Admin paneli botlar sekmesinde görüntülenir.

---

## 🔐 JWT Kimlik Doğrulama

Admin endpoint'leri dmin_session HTTP-only cookie gerektirir.

`
POST /api/auth/login
Body: { "email": "...", "password": "..." }
Yanıt: Set-Cookie: admin_session=<JWT> (HttpOnly, Secure, SameSite=Strict)
`

Token geçerlilik süresi: 24 saat
JWT yapısı: { userId, role: "ADMIN", exp }

---

## ⚡ Rate Limiting

/api/lead endpoint'i Redis üzerinden IP başına rate limit uygular:
- Limit: 5 istek / dakika
- Aşımda: HTTP 429 Too Many Requests

---

İlgili: ../architecture/LEAD_SYSTEM.md, ../ai/GEO_ENGINE.md, ../seo/SEO_ENGINE_REFERENCE.md
