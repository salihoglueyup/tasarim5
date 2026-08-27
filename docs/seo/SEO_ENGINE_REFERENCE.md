# 🔎 SEO Motor Referansı (src/lib/seo/)

> **Toplam:** 60 TypeScript dosyası — Alo Yönetim'in gelişmiş SEO motoru altyapısı
> Her modül bağımsız bir SEO görevi üstlenir ve Middleware veya API route'larında kullanılır.

---

## 📂 Modül Haritası

### 🤖 Bot & AI İzleme Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| aiBotTelemetry.ts | AI crawler tespiti ve loglama (GPTBot, ClaudeBot, Perplexity, DeepSeek) | middleware.ts |
| botTracker.ts | Genel bot izleme ve sınıflandırma | middleware.ts, /api/admin/bot-tracker |
| botVerifier.ts | Bot kimliği doğrulama (DNS reverse lookup) | middleware.ts |
| facilityBotAuditLog.ts | Tesis rotası crawl olaylarını logla | middleware.ts |
| facilitySeoPatrol.ts | SEO motorlarını periyodik denetim | cron |

---

### 🔗 Link Grafiği & Dahili Bağlantı Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| facilityLinkGraphBuilder.ts | Sayfa bağlantı grafiği oluştur | SSG build, /api/seo |
| facilityInternalLinkingOptimizer.ts | İç bağlantı fırsatlarını optimize et | /api/seo/analyze-content |
| facilityCrossServiceLinker.ts | Hizmetler arası çapraz bağlantı | hizmet sayfaları |
| facilityCompleteGraphBuilder.ts (25KB) | Tam kurumsal varlık grafiği | /api/tesis-yonetimi/entity-graph.jsonld |
| facilityPageRankSimulationEngine.ts | PageRank simülasyonu | /api/seo/facility-rank-score |
| facilitySiloRankPasser.ts | Silo yapısında PageRank iletimi | /api/seo/facility-rank-score |

---

### 📊 Sıralama Simülatörü & Analiz Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| facilitySerpRankSimulator.ts | Google SERP sıralama simülasyonu | /api/seo/facility-rank-score |
| facilitySearchRankAnalyzer.ts | Arama sıralama analizi | /api/seo |
| facilitySerpOptimizer.ts | SERP snippet optimizasyonu | hizmet sayfaları |
| facilityAutonomousAuditor.ts | Bağımsız SEO denetim motoru | cron, /api/admin |

---

### 🗺️ Tematik Grafik & Konu Kümesi Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| facilityTopicGraph.ts (8.7KB) | ISO 41001 & KMK 634 semantik tematik grafik | /api/tesis-yonetimi/entity-graph.jsonld |
| facilityDistrictComparator.ts | İlçe bazlı karşılaştırma verisi | /api/tesis-yonetimi/compare-districts |
| facilityGroupAndLegalEcosystem.ts | Bina grubu ve yasal ekosistem | /api/tesis-yonetimi/legal-precedents.json |

---

### ✍️ İçerik & AI Snippet Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| facilityAiSnippetEngine.ts | AI arama snippet'leri oluştur | /api/tesis-yonetimi/ai-snippets.json |
| facilityFaqSynthesizer.ts | SSS içeriği sentezle | /api/tesis-yonetimi/faq.json |
| facilityVoiceAiSynthesizer.ts | Sesli arama Q&A sentezi | /api/tesis-yonetimi/voice-qa.json |
| facilityBlogClusterEngine.ts | Blog küme yapısı ve içerik planı | /api/seo |
| facilityExternalCitations.ts | Dış kaynak atıf yönetimi | blog, hizmet sayfaları |

---

### 🏗️ Edge & CDN Optimizasyon Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| facilityEdgeOptimizer.ts | Edge CDN ETag & header optimizasyonu | middleware.ts |
| edgeGeoResolver.ts | Coğrafi konum tespiti (Edge) | middleware.ts |
| edgeHeaderInjector.ts | RFC 8288 Link header enjeksiyonu | middleware.ts |
| crawlBudgetDefender.ts | URL param crawl budget koruması | middleware.ts |
| etagEngine.ts | ETag hash üretimi | middleware.ts |

---

### 🔄 Yönlendirme Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| smartRedirect.ts (11.4KB) | Bağlam duyarlı akıllı yönlendirme | middleware.ts |
| siloRedirector.ts | SEO silo yapısı yönlendirme | middleware.ts |

---

### 📡 IndexNow & Yayın Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| facilityIndexNowPinger.ts | Tek URL IndexNow bildirimi | /api/tesis-yonetimi/ping-indexnow |
| indexNowQueue.ts | Kuyruğa alınmış IndexNow bildirimleri | /api/admin/indexnow-bulk |
| webSubPublisher.ts | WebSub (WebHook) yayın bildirimleri | /api/seo/websub-notify |

---

### 🛡️ Denetim & Kalite Motorları

| Dosya | Amaç | Kullanım Yeri |
|---|---|---|
| eeatAuditor.ts | E-E-A-T (Experience, Expertise, Authority, Trust) denetim | /api/admin/seo-health |
| schemaLinter.ts | JSON-LD schema hata denetleyici | /api/admin/schema-lint |
| schemaMinifier.ts | Schema boyut küçültücü | SSG build |
| intentClassifier.ts | Arama niyeti sınıflandırma | /api/seo/intent-match |

---

## 🧩 Motor Bağımlılık Grafiği

`
middleware.ts
├── aiBotTelemetry.ts
├── botTracker.ts / botVerifier.ts
├── facilityBotAuditLog.ts
├── facilityEdgeOptimizer.ts
│   └── etagEngine.ts
├── edgeHeaderInjector.ts
├── crawlBudgetDefender.ts
├── edgeGeoResolver.ts
└── smartRedirect.ts
    └── siloRedirector.ts

/api/tesis-yonetimi/*
├── facilityTopicGraph.ts
├── facilityCompleteGraphBuilder.ts
├── facilityAiSnippetEngine.ts
├── facilityFaqSynthesizer.ts
├── facilityVoiceAiSynthesizer.ts
├── facilityIndexNowPinger.ts
└── facilityDistrictComparator.ts

/api/seo/*
├── facilitySerpRankSimulator.ts
├── facilityPageRankSimulationEngine.ts
├── facilityInternalLinkingOptimizer.ts
├── facilitySearchRankAnalyzer.ts
├── intentClassifier.ts
└── eeatAuditor.ts
`

---

## 📋 Test Kapsamı

25+ test dosyası — Bkz. docs/dev/TESTING.md için tam test listesi.

Hızlı test:
`ash
# Tüm SEO motor testleri:
npx vitest run src/lib/seo/

# Belirli motor:
npx vitest run src/lib/seo/facilityTopicGraph.test.ts
`

---

İlgili: ../architecture/MIDDLEWARE.md, ../architecture/API_REFERENCE.md, ../ai/GEO_ENGINE.md
