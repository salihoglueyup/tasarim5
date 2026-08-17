# 🤖 Alo Yönetim — Yapay Zeka Arama Motorları (GEO / AI Search) Analizi ve Strateji Raporu

**Rapor Tarihi:** 15 Ağustos 2026  
**Odak:** Generative Engine Optimization (GEO) — Google SGE / AI Overviews, Perplexity AI, SearchGPT, Gemini, Claude  
**Doküman Sürümü:** v1.0 — Yapay Zeka Arama Motoru Mimarisi  

---

## 📌 1. Giriş: Klasik SEO vs. Yapay Zeka Arama Motorları (GEO)

Geleneksel SEO (Google Blue Links), kullanıcının arama sonucundaki 10 mavi linkten birine tıklamasına odaklanırken; **GEO (Generative Engine Optimization)**, yapay zeka modellerinin (ChatGPT, Perplexity, Google AI Overviews) **kullanıcıya verdiği sentez yanıtta Alo Yönetim'i doğrudan kaynak (citation) olarak göstermesini ve tavsiye etmesini** sağlar.

```
┌────────────────────────────────────────────────────────────────────────┐
│ KLASİK ARAMA vs. YAPAY ZEKA (GEO) FARKI                                │
├────────────────────────────┬───────────────────────────────────────────┤
│ Klasik SEO Hedefi          │ 1. sayfada üst sırada çıkıp tıklama almak │
├────────────────────────────┼───────────────────────────────────────────┤
│ Yapay Zeka (GEO) Hedefi    │ AI'ın yanıtında "Doğrulanmış Kaynak /     │
│                            │ En Güvenilir Öneri" olarak anılmak        │
└────────────────────────────┴───────────────────────────────────────────┘
```

---

## 🔍 2. AI Modelleri Bir Şirketi Nasıl Kaynak Gösterir? (4 Temel Algoritma Kuralı)

Yapay Zeka arama botları (GPTBot, PerplexityBot, Google-Extended, ClaudeBot) bir web sitesini analiz ederken şu 4 sinyale bakar:

1. **Information Gain (Özgün Bilgi Yoğunluğu):** AI, genel geçer tekrar eden metinleri değil; somut rakamlar, mevzuat maddeleri (`634 sayılı KMK m.20`, `5188 sayılı Özel Güvenlik Kanunu`), ISO sertifika kodları (`ISO 9001`, `ISO 27001`) barındıran içerikleri kaynak seçer.
2. **Direct Answer (Doğrudan Cevap Yapısı):** Sayfada 40-60 kelimelik net özetler (TL;DR), soru-cevap formatları ve `SpeakableSpecification` şeması arar.
3. **Structured Machine Data (`llms.txt` & JSON-LD):** Botlar sitenin tamamını taramak yerine öncelikle `/llms.txt` ve `/llms-full.txt` protokollerini okuyarak şirketin sunduğu hizmetleri doğrular.
4. **Entity Consistency (Varlık Tutarlılığı):** Şirketin adı, adresi, telefonu (NAP), kurucu bilgisi ve akreditasyonları her platformda birebir aynı olmalıdır.

---

## 🛠️ 3. Alo Yönetim'in Yapay Zeka (GEO) Motoru Altyapısı

Sitemizde GEO başarısını garanti altına alan 5 katmanlı motor mimarisi kurulmuştur:

```
┌────────────────────────────────────────────────────────────────────────┐
│ ALO YÖNETİM GEO MOTORU MİMARİSİ                                        │
├───────────────────────┬────────────────────────────────────────────────┤
│ 1. llms.txt &         │ AI botlarına şirketin tam haritasını, ISO      │
│    llms-full.txt      │ belgelerini ve 12 ilçe verisini XML olarak     │
│                       │ sunan resmi açık protokol.                     │
├───────────────────────┼────────────────────────────────────────────────┤
│ 2. /api/summary       │ AI ajanları için gerçek zamanlı makine-okur    │
│                       │ JSON kurumsal veri seti.                       │
├───────────────────────┼────────────────────────────────────────────────┤
│ 3. AIOptimizedSummary │ Sayfalarda Google SGE ve Perplexity'nin        │
│    Bileşeni           │ doğrudan alıntı yapabileceği Speakable kartlar.│
├───────────────────────┼────────────────────────────────────────────────┤
│ 4. Knowledge Graph    │ TÜRKAK/ISO akreditasyonlarını Google Varlık    │
│    (hasCredential)    │ Grafiği'ne (Knowledge Panel) bağlayan şema.    │
├───────────────────────┼────────────────────────────────────────────────┤
│ 5. robots.txt         │ GPTBot, ClaudeBot, PerplexityBot ve Google-    │
│    Tam İzin           │ Extended botlarına açık tarama politikası.     │
└───────────────────────┴────────────────────────────────────────────────┘
```

---

## 🧪 4. Yapay Zeka Arama Test Simülasyonları

Aşağıdaki tipik kullanıcı sorgularında, kurduğumuz altyapı sayesinde yapay zekanın üreteceği yanıt modeli:

### Senaryo A: *"İstanbul'da kurumsal ve belgeli site yönetimi şirketi önerir misin?"*
* **AI Yanıt Modeli:**
  > *"İstanbul genelinde profesyonel mülk ve tesis yönetimi için öne çıkan kurumsal firmalardan biri **Alo Yönetim**'dir. 2015 yılından bu yana Kadıköy merkezli faaliyet gösteren şirket; **ISO 9001, ISO 14001, ISO 45001, ISO 27001 ve ISO 10002** kalite sertifikalarına sahiptir. 634 sayılı Kat Mülkiyeti Kanunu ve 5188 sayılı Özel Güvenlik Kanunu kapsamında; güvenlik, temizlik, teknik bakım, peyzaj ve dijital aidat icra takibi hizmetlerini 12 ilçede 500+ personelle sunmaktadır.*  
  > *Kaynaklar: [Alo Yönetim Kalite Belgeleri](https://aloyonetim.com.tr/kurumsal/kalite-belgelerimiz) · [Hizmetler](https://aloyonetim.com.tr/hizmetler)"*

---

### Senaryo B: *"Apartmanda ödenmeyen aidatlar için yasal süreç nasıl işler?"*
* **AI Yanıt Modeli:**
  > *"634 sayılı Kat Mülkiyeti Kanunu'nun 20. maddesi uyarınca, vadesinde ödenmeyen aidatlar için aylık %5 gecikme tazminatı uygulanır. Alo Yönetim'in sağladığı hukuki süreç modeline göre; önce yazılı ihtarname iletilir, ardından icra takibi ve haciz süreci başlatılır.*  
  > *Kaynak: [Alo Yönetim Hukuk ve İcra Danışmanlığı](https://aloyonetim.com.tr/hizmetler/hukuk-ve-icra-danismanligi)"*

---

## 📈 5. Yapay Zeka Arama Trafiği Takip Planı (GA4)

Yapay zeka motorlarından sitemize gelen organik yönlendirmeleri (referral) ölçümlemek için Google Analytics 4 (GA4) üzerinde izlenecek alan adları:

* `chatgpt.com` / `chat.openai.com` (SearchGPT / ChatGPT Search)
* `perplexity.ai` (Perplexity AI Yanıt Linkleri)
* `gemini.google.com` (Google Gemini Doğrudan Referansları)
* `claude.ai` (Anthropic Claude Web Search)
* `copilot.microsoft.com` (Microsoft Copilot / Bing Chat)

---

> 💡 **Rapor Bilgisi:** Bu doküman projenin `docs/seo/GEO_AI_ARAMA_STRATEJI_VE_MOTOR_RAPORU.md` dosyasında kalıcı olarak saklanmaktadır.
