# 🤖 Bot Telemetri Sistemi

> **Amaç:** AI crawler ve arama botlarının site crawl davranışını izlemek,
> kayıt altına almak ve admin panelinde raporlamak.

---

## Mimari Genel Bakış

`
Gelen İstek → middleware.ts
     ↓
detectAndLogAiCrawler() ← aiBotTelemetry.ts
     ↓
Bot tanındı mı?
     ├── Evet → recordBotCrawlEvent() ← facilityBotAuditLog.ts
     │           ↓
     │         In-memory log + /api/admin/bot-telemetry
     │
     └── Hayır → Geç
`

---

## 📦 Modül Referansı

### aiBotTelemetry.ts — Ana Dedektör

**Fonksiyon:** detectAndLogAiCrawler(userAgent, pathname, clientIp, statusCode)

Tanınan AI botları (User-Agent pattern eşleşmesi):
| Bot | Şirket | Kullanım |
|---|---|---|
| GPTBot | OpenAI | ChatGPT web erişimi |
| PerplexityBot | Perplexity AI | Perplexity arama |
| Claude-Web | Anthropic | Claude web tarayıcı |
| Applebot | Apple | Siri, Apple Intelligence |
| Google-Extended | Google | Gemini, AI Overviews |
| CCBot | Common Crawl | Genel LLM eğitim verisi |
| Amazonbot | Amazon | Alexa, Amazon AI |
| DeepSeek | DeepSeek AI | DeepSeek asistanı |

---

### botTracker.ts — Genel Bot İzleme

**Fonksiyon:** trackBot(userAgent, path, ip)

Hem AI hem arama motorlarını kategorize eder:
- AICrawler — LLM/yapay zeka tarayıcıları
- SearchEngine — Googlebot, bingbot, YandexBot
- SecurityScanner — güvenlik tarama araçları
- Unknown — tanımlanamayan botlar

---

### botVerifier.ts — Kimlik Doğrulama

**Fonksiyon:** verifyBot(ip, userAgent)

Gerçek bot olduğunu doğrular: DNS reverse lookup ile IP'nin bot sahibi AS'a ait olduğunu kontrol eder.
Sahteci bot tespiti için kritiktir.

---

### facilityBotAuditLog.ts — Crawl Olay Loglama

**Fonksiyon:** recordBotCrawlEvent(botName, botType, pathname, statusCode, ip, userAgent)

Tesis rotaları için detaylı crawl log kaydı:
- Timestamp, bot adı ve tipi
- Crawl edilen sayfa path'i
- HTTP durum kodu (200, 304)
- IP adresi ve tam User-Agent

---

## 📊 Admin Paneli Bot Telemetri

**URL:** /{lang}/admin/bot-telemetry

**API:** GET /api/admin/bot-telemetry (JWT gerekli)

Gösterilen metrikler:
- Son 24/7/30 günde toplam bot ziyareti
- Bot türü dağılımı (AI vs Search Engine)
- En çok crawl edilen sayfalar
- 304 Not Modified oranı (önbellek etkinliği)
- IP bazlı crawl yoğunluğu

---

## ⚙️ Crawl Budget Defender

**Modül:** src/lib/seo/crawlBudgetDefender.ts

**Fonksiyon:** analyzeCrawlBudget(searchParams)

URL parametrelerini analiz ederek gereksiz crawl'ı önler:
- ?utm_* parametreleri → X-Robots-Tag: noindex
- ?fbclid=*, ?gclid=* reklam parametreleri → noindex
- ?ref=*, ?source=* → noindex
- Temiz URL'ler → normal indexleme

---

## 📈 Kullanım İstatistikleri

**X-Facility-Cache-Hit Header:** Tesis sayfaları için 304 önbellek isabet oranı.

Yüksek 304 oranı = Bot crawl etkinliği iyi (bant genişliği tasarrufu + crawl budget koruması).

---

İlgili: GEO_ENGINE.md, ../architecture/MIDDLEWARE.md, ../seo/SEO_ENGINE_REFERENCE.md
