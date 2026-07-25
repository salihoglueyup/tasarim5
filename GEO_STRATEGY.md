# GEO / Yapay Zeka Motoru SEO Stratejisi (Generative Engine Optimization)

> **Amaç:** Alo Yönetim'in ChatGPT, Perplexity, Google AI Overviews, Gemini ve Claude
> gibi üretken motorların yanıtlarında **kaynak olarak gösterilmesi** ve **doğru temsil
> edilmesi**. Bu belge, SEO Master Plan V4 Bölüm F (Faz 131–150) kapsamında uygulanan
> altyapıyı ve sürdürülen izleme döngüsünü tanımlar.

## 1. Uygulanan altyapı (kod)

| Sinyal | Konum | Faz |
|--------|-------|-----|
| `llms.txt` (kısa AI özeti + entity cümleleri + EN özet) | `/llms.txt` (`src/app/llms.txt/route.ts`) | 131/137/147 |
| `llms-full.txt` (derin içerik + mevzuat + Q&A) | `/llms-full.txt` | 133/136 |
| Makine-okur JSON özet | `/api/summary` | 143 |
| AI crawler izinleri (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) | `src/app/robots.ts` | 132 |
| TL;DR özet blokları | `TldrBlock` — yerel sayfalar | 134 |
| Soru-cevap (FAQPage) | Ana sayfa, hizmetler, SSS, tüm yerel sayfalar | 135/142 |
| Alıntılanabilir veri/mevzuat (KMK m.20, 5188) | `llms-full.txt`, sözlük | 136 |
| Entity netliği ("İstanbul merkezli profesyonel tesis yönetimi şirketi") | `llms.txt`, Organization schema | 137 |
| `speakable` (h1 + .tldr) | Ana sayfa + yerel sayfalar | 139 |
| Tazelik ("2026 itibarıyla", `dateModified`) | `llms.txt`, blog schema | 141 |
| Entity grafiği (Organization/@id, sameAs) | `src/lib/schemas.ts` | 138 |

## 2. AI crawler politikası (Faz 132 — karar)

**Karar: İZİN VER.** Görünürlük ve doğru temsil, içeriğin AI motorlarınca taranmasını
gerektirir. `robots.ts` yalnız `/admin`, `/api`, `/_next` alanlarını tüm botlara kapatır;
GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot,
Applebot-Extended dahil AI botlarına içerik taramaya açıktır.

> Not: `/api/summary` robots'ta `/api` altında olduğu için crawler'lara kapalıdır; bu uç
> nokta doğrudan-fetch yapan AI ajanları içindir (indekslenmesi amaçlanmaz).

## 3. Marka bilgi grafiği tutarlılığı (Faz 138)

Aşağıdaki değerler **tek kaynaktan** (`src/lib/schemas.ts`) türetilir ve schema, `llms.txt`,
`/api/summary` ile içerik arasında **birebir aynıdır**:

- **Ad:** Alo Yönetim · **Legal:** Alo Yönetim Tesis Yönetimi A.Ş.
- **Kuruluş:** 2015 · **Merkez:** Kadıköy, İstanbul, TR
- **Telefon:** +90 216 550 48 48 · **E-posta:** istanbul@aloyonetim.com
- **sameAs:** Twitter, LinkedIn, Instagram, Facebook, YouTube

Off-page kanallarda (Google Business Profile, dizinler — Bölüm J) da bu NAP birebir
korunmalıdır.

## 4. AI temsil doğruluğu denetimi (Faz 144) — aylık

Aşağıdaki sorguları ChatGPT / Perplexity / Gemini / Google AI Overviews üzerinde çalıştır ve
yanıtları kaydet:

1. "Alo Yönetim nedir?" / "What is Alo Yönetim?"
2. "İstanbul'da profesyonel site yönetimi firması öner"
3. "Kadıköy'de tesis yönetimi hizmeti veren firmalar"
4. "Aidat icra takibi nasıl yapılır?" (marka anılıyor mu?)

**Kontrol:** Ad, konum, hizmetler, telefon doğru mu? Yanlış/eksikse ilgili sayfada entity
cümlesini ve `llms-full.txt`'i güçlendir.

## 5. AI trafiği ölçümü (Faz 145)

GA4'te aşağıdaki referrer kaynaklarını ayrı bir segment/gösterge tablosunda izle:
`chatgpt.com`, `chat.openai.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`,
`claude.ai`. Aylık AI-kaynaklı oturum ve dönüşümleri raporla.

## 6. Harici varlık kaydı (Faz 148 — opsiyonel)

Uygun olduğunda Wikidata / Google Business Profile / sektörel dizinlerde işletme varlığı
oluştur ve `sameAs`'e ekle. Bilgi grafiği güvenini artırır (Bölüm J ile koordineli).

## 7. Semantik HTML / JS-bağımsız içerik (Faz 149)

Yerel sayfalar, sözlük, hub ve `llms.txt`/`llms-full.txt` sunucu tarafında (RSC/route
handler) render edilir; kritik içerik JavaScript olmadan HTML'de mevcuttur. AI crawler'ların
JS-render sınırından etkilenmez. (Karşılaştırma bölümü `ComparisonTable`, satır başına net
`h3/h4/p` başlıklarıyla makine-okur; görsel kart tasarımı korunmuştur.)

## 8. İzleme döngüsü (özet takvim)

| Dönem | Görev |
|-------|-------|
| Aylık | AI temsil denetimi (§4), AI trafiği raporu (§5) |
| Çeyreklik | `llms.txt`/`llms-full.txt` güncelliği, yeni hizmet/bölge ekleme |
| Yıllık | Tazelik ifadelerinin ("2026 itibarıyla") güncellenmesi, entity tutarlılık denetimi |
