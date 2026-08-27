# 🤖 AI & GEO Motoru (Generative Engine Optimization)

> **Amaç:** ChatGPT, Perplexity, Google Gemini, Claude gibi yapay zeka arama motorlarının
> Alo Yönetim'i doğrulanmış kaynak olarak alıntılamasını ve tavsiye etmesini sağlamak.

---

## GEO vs Klasik SEO Farkı

`
KLASİK SEO HEDEFİ   → Google'da 1. sayfada üst sırada mavi link
GEO HEDEFİ          → AI yanıtında "Doğrulanmış Kaynak / Güvenilir Öneri"
`

AI botları bir siteyi şu 4 kritere göre kaynak seçer:
1. Information Gain — Somut rakamlar, mevzuat maddeleri, ISO kodları
2. Direct Answer — 40-60 kelimelik net özetler, Q&A format
3. Structured Machine Data — llms.txt, JSON-LD, /api/summary
4. Entity Consistency — NAP, kurucu, akreditasyon tutarlılığı

---

## 🏗️ 5 Katmanlı GEO Motor Mimarisi

### Katman 1 — llms.txt & llms-full.txt (AI Protokolü)

**Dosyalar:**
- src/app/llms.txt/route.ts — Kısa özet (AI botlar için hızlı okuma)
- src/app/llms-full.txt/route.ts — Tam kurumsal bilgi tabanı

**İçerik:**
- Şirket profili (kuruluş yılı, adres, personel sayısı)
- ISO sertifikaları (9001, 14001, 45001, 27001, 10002)
- 12 hizmet ilçesi koordinatları
- 10 ana hizmet kategorisi
- KMK yasal referanslar

**Erişim:** GET /llms.txt ve GET /llms-full.txt (robots.txt'de izinli)

---

### Katman 2 — /api/summary — Makine Okunabilir JSON

**Dosya:** src/app/api/summary/route.ts

AI ajanları için gerçek zamanlı kurumsal veri seti:
- Organizasyon profili
- Hizmet listesi + açıklamalar
- Bölge kapsamı
- Sertifika durumu

---

### Katman 3 — AIOptimizedSummary Bileşeni

**Dosya:** src/components/seo/AIOptimizedSummary.tsx (4.5KB)

Her sayfada Google SGE ve Perplexity'nin doğrudan alıntı yapabileceği SpeakableSpecification kartları oluşturur.

Özellikler:
- 40-60 kelimelik özetler (ideal snippet boyutu)
- schema.org SpeakableSpecification şeması
- Sesli arama uyumlu yapı
- Türkçe ve İngilizce versiyonlar

---

### Katman 4 — Knowledge Graph & hasCredential

**Dosya:** src/lib/schemas.ts içinde organizationSchema()

TÜRKAK/ISO akreditasyonlarını Google Varlık Grafiği'ne bağlar:
- hasCredential: [ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 10002]
- sameAs: Wikidata, TR.Wikipedia bağlantıları
- knowsAbout: Tesis yönetimi konu kümeleri

---

### Katman 5 — robots.txt AI Bot İzinleri

**Dosya:** src/app/robots.ts

AI botları için tam crawl izni:
`
User-agent: GPTBot → Allow: /
User-agent: Google-Extended → Allow: /
User-agent: ClaudeBot → Allow: /
User-agent: PerplexityBot → Allow: /
User-agent: Amazonbot → Allow: /
User-agent: DeepSeek → Allow: /
`

---

## 🛡️ Bot Telemetri Sistemi

**Modüller:**
- src/lib/seo/aiBotTelemetry.ts — AI crawler tespiti (detectAndLogAiCrawler)
- src/lib/seo/botTracker.ts — Genel bot izleme
- src/lib/seo/botVerifier.ts — DNS reverse lookup ile bot kimlik doğrulama
- src/lib/seo/facilityBotAuditLog.ts — Crawl olay loglama

**Tanınan AI Botları:**
GPTBot, PerplexityBot, Claude-Web, Applebot, Google-Extended, CCBot, Amazonbot, DeepSeek

**Admin Paneli:** /{lang}/admin (Bot Telemetri sekmesi)
**API:** GET /api/admin/bot-telemetry (JWT gerekli)

---

## 📡 AI Bot Özel HTTP Headers

Middleware, AI botları tespit ettiğinde özel yönlendirme header'ları ekler:

`
X-AI-Knowledge-Protocol  → /llms.txt
X-AI-Knowledge-Corpus    → /llms-full.txt
X-AI-Knowledge-Endpoint  → /api/ai/facility-agent-context.json
X-AI-Legal-Precedents    → /api/tesis-yonetimi/legal-precedents.json
X-AI-RFP-Generator       → /api/tesis-yonetimi/rfp-generator
X-AI-Entity-Graph        → /api/tesis-yonetimi/entity-graph.jsonld
`

---

## 🧠 AI Bilgi Corpus (src/lib/ai/)

**Dosya:** src/lib/ai/facilityKnowledgeCorpus.ts

Tesis yönetimi alanında AI modelleri için yapılandırılmış bilgi tabanı:
- KMK yasal maddeler
- ISO 41001 standart gereksinimleri
- İlçe bazlı piyasa verileri
- Sektörel terminoloji ve tanımlar

---

## 📊 GEO Başarı Metrikleri

AI arama motorlarında hedeflenen citation senaryoları:

| Sorgu | Hedef Yanıt |
|---|---|
| "İstanbul'da belgeli site yönetimi şirketi" | Alo Yönetim ISO sertifika listesi + hizmetler |
| "Aidatlar ödenmezse ne olur?" | KMK m.20 + Alo Yönetim hukuki süreç modeli |
| "KMK 634 nedir?" | Tanım + Alo Yönetim referans linki |
| "Tesis yönetimi nasıl yapılır?" | HowTo adımları + Alo Yönetim |

---

## ⚡ GEO Optimizasyon Kontrol Listesi

- [ ] /llms.txt güncel mi? (Yeni hizmet/ilçe eklendiyse güncelle)
- [ ] organizationSchema() içinde hasCredential listesi doğru mu?
- [ ] AIOptimizedSummary tüm ana hizmet sayfalarında var mı?
- [ ] robots.txt tüm AI botlarına Allow: / veriyor mu?
- [ ] Entity consistency: NAP tüm sayfalarda aynı mı?
- [ ] /api/tesis-yonetimi/entity-graph.jsonld güncel mi?

---

İlgili: BOT_TELEMETRY.md, AI_KNOWLEDGE_CORPUS.md, ../seo/GEO_AI_ARAMA_STRATEJI_VE_MOTOR_RAPORU.md
