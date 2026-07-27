# 🚀 ALO YÖNETİM — SEO MASTER PLAN V4 (250 FAZ)

> **Proje:** Alo Yönetim Web Sitesi (Kurumsal Tesis & Mülk Yönetimi)
> **Framework:** Next.js 16.2.10 (App Router, Turbopack) · React 19.2.4 · Tailwind CSS 4
> **Diller:** Türkçe (varsayılan) + İngilizce — `src/app/[lang]/` dinamik segment
> **Oluşturulma:** 24 Temmuz 2026
> **Önceki plan:** `SEO_MASTER_PLAN_V3.md` (100 faz, 1–90 uygulandı — arşivde/git geçmişinde)
> **Bu sürümün amacı:** V3'te "yapıldı" denen ama gerçekte eksik kalan işleri **denetleyip
> düzeltmek** + programatik yerel SEO, GEO/AI-SEO, içerik cluster ve off-page sütunlarında
> **tamamen yeni ileri seviye** işlerle Google + AI motorlarında **#1 görünürlüğe** ulaşmak.

**Hedef skorlar:** Lighthouse Performans ≥ 95 · SEO 100 · A11Y ≥ 95 · Best Practices 100 ·
Core Web Vitals: LCP < 2.0s · INP < 200ms · CLS < 0.05

---

## 📑 İÇİNDEKİLER

| Bölüm | Konu | Faz Aralığı | Faz Sayısı |
|-------|------|-------------|------------|
| A | Denetim & Kritik Düzeltmeler | 1–20 | 20 |
| B | Teknik SEO & İndeksleme | 21–40 | 20 |
| C | Structured Data / JSON-LD Derinleştirme | 41–70 | 30 |
| D | On-Page & İçerik SEO | 71–100 | 30 |
| E | Programatik Yerel SEO | 101–130 | 30 |
| F | GEO / Yapay Zeka Motoru SEO | 131–150 | 20 |
| G | İçerik & Blog Cluster | 151–180 | 30 |
| H | Core Web Vitals & Performans | 181–210 | 30 |
| I | UX, Erişilebilirlik (A11y) & Trust | 211–230 | 20 |
| J | Off-Page, Yerel İşaretler & Analitik | 231–250 | 20 |
| | **TOPLAM** | **1–250** | **250** |

---

## 🎯 YÖNETİCİ ÖZETİ — V4, V3'ten Neden Farklı?

V3 planı sağlam bir temel kurdu (sitemap, robots, temel JSON-LD, OG/Twitter meta, font
optimizasyonu). Ancak bu oturumdaki **canlı kod denetimi**, birkaç kritik işin commit
mesajlarında "tamamlandı" görünmesine rağmen **kodda mevcut olmadığını** ortaya çıkardı.
V4, bu boşlukları kapatmakla başlar (Bölüm A), sonra dört stratejik sütunda ölçeklenir:

1. **Programatik Yerel SEO** — İstanbul'un 39 ilçesi × 8 hizmet = yüzlerce yerel arama niyeti
   için otomatik landing sayfaları ("Kadıköy site yönetimi", "Beşiktaş güvenlik hizmeti"…).
2. **GEO / Yapay Zeka SEO** — ChatGPT, Perplexity, Gemini gibi motorların yanıtlarında
   kaynak gösterilmek için `llms.txt`, alıntılanabilir veri blokları, entity netliği.
3. **İçerik & Blog Cluster** — pillar-cluster mimarisiyle konu otoritesi.
4. **Off-Page & Yerel İşaretler** — Google Business Profile, citation, backlink, analitik.

---

## 🔬 GÜNCEL DURUM DENETİMİ — "İddia Edilen" vs "Gerçek"

Aşağıdaki tablo, V4'ün Bölüm A'sının çıkış noktasıdır. Kod tabanı bu oturumda tarandı.

| # | Öğe | Commit İddiası | Gerçek Durum (Kod) | Kanıt |
|---|-----|----------------|--------------------|-------|
| 1 | Dinamik canonical | "dynamic canonicals" (cdc42d9) | ❌ **Yok** — hiçbir sayfada `alternates.canonical` | `grep -rl alternates src` → 0 |
| 2 | hreflang (tr/en) | i18n yapısı kuruldu | ❌ **Yok** — metadata'da `languages` tanımı yok | `grep -rn languages src/app` → boş |
| 3 | OG görseli | OG/Twitter kartları | ❌ **Kırık** — root `/og-image.png`, hizmet layout'ları `/og-image.jpg`; dosya yok, dinamik route yok | `layout.tsx:50`, `guvenlik-yonetimi/layout.tsx:10` |
| 4 | Dinamik OG route | — | ❌ Yok — `opengraph-image.tsx` / `twitter-image.tsx` yok | `find src -iname opengraph-image*` → boş |
| 5 | Sitemap | Dinamik sitemap | ⚠️ `src/app/sitemap.ts` var ama tek dil, statik `lastModified: new Date()`, i18n alternates yok | `sitemap.ts` |
| 6 | robots.txt | AI crawler engelleme | ⚠️ Var ama sadece GPTBot/CCBot; ClaudeBot/PerplexityBot/Google-Extended kararı yok | `public/robots.txt` |
| 7 | Mock Analytics ID | GA/Clarity | ⚠️ Placeholder canlıda: `G-MOCKGA12345`, `MOCK-CLARITY-ID`, `G-MOCK-...VERIFICATION` | `layout.tsx:39,151,156` |
| 8 | Görsel içerik | services/team/references/badges | ❌ 4 klasör **boş**; görseller Unsplash remote | `public/images/*` |
| 9 | Logo boyutu | — | 🔴 `logo.png` 4.4MB, `new-icon.png` 4.2MB — LCP riski | `public/images/logos/` |
| 10 | llms.txt / AI-SEO | — | ❌ Yok | `public/llms.txt` → yok |
| 11 | Breadcrumb | 15+ sayfa + PageHeader | ⚠️ `PageHeader` kendi BreadcrumbList'ini üretiyor → duplicate riski | `PageHeader.tsx` |
| 12 | Middleware→Proxy | — | ✅ Bu oturumda `src/proxy.ts`'e taşındı (Next 16) | `src/proxy.ts` |

> **Not:** `og-image` dosyası kullanıcı tarafından bilerek silindi. V4, dosyayı geri koymak
> yerine **dinamik `opengraph-image.tsx` route** önerir (Faz 3–4) ve tüm layout referanslarını
> tek tip hale getirir.

---

## 🗝️ ANAHTAR KELİME & ENTITY STRATEJİSİ

### Ana hedef keyword'ler (yüksek hacim)
| Keyword | Niyet | Hedef Sayfa |
|---------|-------|-------------|
| site yönetimi / site yönetim şirketi | ticari | `/` |
| apartman yönetimi | ticari | `/` |
| tesis yönetimi | ticari | `/hizmetler/tesis-yonetimi` |
| bina yönetim şirketi | ticari | `/hakkimizda` |
| özel güvenlik firması istanbul | ticari | `/hizmetler/guvenlik-yonetimi` |

### Long-tail & dönüşüm odaklı
`apartman aidat takip programı` · `site ortak alan temizlik ücreti` · `kat mülkiyeti kanunu
aidat borcu` · `havuz pH klor ölçümü` · `5188 sayılı kanun güvenlik eğitimi` · `apartman
haşere ilaçlama istanbul` · `site güneş enerji santrali GES` · `site yönetimi teklif al`

### Yerel keyword şablonu (Bölüm E'nin motoru)
`{hizmet} {ilçe}` → "güvenlik yönetimi Kadıköy", "temizlik hizmeti Ataşehir",
"site yönetimi Beşiktaş", "tesis yönetimi Üsküdar" … (39 ilçe × 8 hizmet + genel).

### Topic Cluster (pillar → cluster)
```
[Ana Sayfa: "Site/Tesis Yönetimi"]  ← PILLAR
   ├─ /hizmetler/tesis-yonetimi        (alt-pillar)
   ├─ /hizmetler/guvenlik-yonetimi     → blog: güvenlik ipuçları
   ├─ /hizmetler/temizlik-ve-hijyen    → blog: hijyen rehberleri
   ├─ /hizmetler/teknik-bakim          → blog: bakım kılavuzları
   ├─ /hizmetler/hukuk-ve-icra...      → blog: yasal/mevzuat
   ├─ /hizmetler/havuz-bakimi...       → blog: havuz kimyası
   ├─ /hizmetler/hasere-ve-dezenfeksiyon
   └─ /hizmetler/peyzaj-ve-bahce-bakimi
[Yerel Sayfalar: {hizmet}-{ilçe}] → ilgili hizmet pillar'ına link
```

---

## 📐 FAZ FORMATI

Her faz aşağıdaki mikro-şablonu izler:

> **Faz N: Başlık**
> `Zorluk: ⭐/⭐⭐/⭐⭐⭐` · `Süre: ~X` · `Bağımlılık: Faz Y / Yok`
> **Dosya(lar):** gerçek yol
> **Yapılacaklar:** madde madde teknik adımlar
> **Kabul kriteri:** [ ] doğrulanabilir çıktı

---

# 🔧 BÖLÜM A — DENETİM & KRİTİK DÜZELTMELER (Faz 1–20)

> Amaç: V3'te eksik kalan/kırık işleri kapatmak. Bu bölüm **öncelikli**; sonraki tüm
> bölümler buradaki canonical/hreflang/schema altyapısına dayanır.

### Faz 1: Merkezi SEO yardımcı modülü (`buildMetadata`)
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `src/lib/seo.ts` (YENİ)
**Yapılacaklar:**
- Tüm sayfaların ortak `Metadata` üreteceği tek bir `buildMetadata({ title, description, path, lang, images?, keywords?, noindex? })` fabrikası yaz.
- Fonksiyon içinde otomatik: `alternates.canonical`, `alternates.languages` (tr/en + x-default), `openGraph`, `twitter`, `robots`.
- `BASE_URL` sabitini burada tanımla ve her yerde bunu kullan.
**Kabul kriteri:**
- [ ] `buildMetadata` import edilerek en az 1 sayfada çalışıyor
- [ ] Ürettiği objede canonical + languages alanları dolu

### Faz 2: Canonical altyapısını tüm sayfalara yay
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 1`
**Dosya:** `src/app/[lang]/layout.tsx`, tüm `**/layout.tsx` ve `page.tsx` metadata blokları
**Yapılacaklar:**
- Her sayfanın `metadata`/`generateMetadata`'sını `buildMetadata` üzerinden üret.
- Canonical daima **prefix'siz TR** URL'yi işaret etsin (proxy mantığıyla tutarlı: `/hizmetler` ✔, `/tr/hizmetler` ✘).
- `metadataBase` yalnız root layout'ta bir kez tanımlansın.
**Kabul kriteri:**
- [ ] `grep -rl "canonical" src/app | wc -l` ≥ sayfa sayısı
- [ ] Render edilen HTML'de `<link rel="canonical">` her sayfada tekil

### Faz 3: hreflang + x-default matrisi
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 1`
**Dosya:** `src/lib/seo.ts`, `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- `alternates.languages` = `{ 'tr-TR': <path>, 'en-US': /en<path>, 'x-default': <path> }`.
- Root layout `<html lang>` zaten dinamik — doğrula.
**Kabul kriteri:**
- [ ] Her sayfada `hreflang="tr-TR|en-US|x-default"` alternate linkleri render ediliyor
- [ ] hreflang test aracı hatasız

### Faz 4: Dinamik `opengraph-image` route
`Zorluk: ⭐⭐⭐` · `Süre: ~3s` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/opengraph-image.tsx` (YENİ)
**Yapılacaklar:**
- Next.js `ImageResponse` ile 1200×630 dinamik OG görseli üret (marka rengi #2D2D3A, logo, sayfa başlığı).
- Statik dosya bağımlılığını kaldır (kullanıcı `og-image.png`'yi bilerek sildi).
**Kabul kriteri:**
- [ ] `/opengraph-image` 200 + `image/png`
- [ ] Sosyal paylaşım debugger'da görsel görünüyor

### Faz 5: OG/Twitter görsel referanslarını tekilleştir
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 4`
**Dosya:** `src/app/[lang]/layout.tsx`, 8 hizmet `layout.tsx`
**Yapılacaklar:**
- Tüm `/og-image.png` ve `/og-image.jpg` referanslarını kaldır; dinamik route'a bırak veya tek tutarlı yol kullan.
**Kabul kriteri:**
- [ ] `grep -rn "og-image" src` → tutarsız referans kalmadı

### Faz 6: `twitter-image` route (opsiyonel ayrık)
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 4`
**Dosya:** `src/app/[lang]/twitter-image.tsx` (YENİ, opsiyonel)
**Yapılacaklar:**
- Twitter için farklı kart görseli isteniyorsa ayrı route; değilse OG paylaşılır.
**Kabul kriteri:**
- [ ] Twitter Card Validator hatasız

### Faz 7: Statik `sitemap.xml` çakışma kontrolü
`Zorluk: ⭐` · `Süre: ~20dk` · `Bağımlılık: Yok`
**Dosya:** `public/`, `src/app/sitemap.ts`
**Yapılacaklar:**
- `public/sitemap.xml` statik dosyası varsa sil (dinamik `sitemap.ts` ile çakışır).
**Kabul kriteri:**
- [ ] `/sitemap.xml` tek kaynaktan (dinamik) geliyor

### Faz 8: `sitemap.ts` çok dilli + gerçek lastmod
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 3`
**Dosya:** `src/app/sitemap.ts`
**Yapılacaklar:**
- Her rota için `alternates.languages` (tr/en) ekle.
- `lastModified` sabit `new Date()` yerine içerik/derleme tarihinden türet.
**Kabul kriteri:**
- [ ] Sitemap'te her URL için hreflang alternates blokları var

### Faz 9: robots geliştirme + AI crawler politikası
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Yok`
**Dosya:** `public/robots.txt` → `src/app/robots.ts` (dinamik) önerilir
**Yapılacaklar:**
- Statik dosyayı `src/app/robots.ts`'e taşı (host/sitemap dinamik).
- AI crawler kararı: ClaudeBot, PerplexityBot, Google-Extended, Bytespider, Amazonbot (Bölüm F Faz 132 ile hizala).
**Kabul kriteri:**
- [ ] `/robots.txt` dinamik, `Sitemap:` mutlak URL

### Faz 10: Mock Analytics ID'lerini `.env`'e taşı
`Zorluk: ⭐` · `Süre: ~45dk` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/layout.tsx`, `.env.local` (YENİ), `.env.example` (YENİ)
**Yapılacaklar:**
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`.
- Değer yoksa ilgili script render edilmesin (mock yayına çıkmasın).
- **Not:** Kullanıcı mock değerleri şimdilik bırakmayı seçti; bu faz altyapıyı hazırlar.
**Kabul kriteri:**
- [ ] ID'ler env'den okunuyor, boşsa script eklenmiyor

### Faz 11: PageHeader duplicate BreadcrumbList temizliği
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `src/components/layout/PageHeader.tsx`, `src/lib/schemas.ts`
**Yapılacaklar:**
- Breadcrumb JSON-LD üretimini tek kaynağa indir; sayfa + PageHeader ikilemesini kaldır.
**Kabul kriteri:**
- [ ] Her sayfada tek `BreadcrumbList` JSON-LD

### Faz 12: Logo/görsel ağırlık optimizasyonu (4MB+ → <150KB)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** `public/images/logos/*`
**Yapılacaklar:**
- `logo.png` (4.4MB), `new-icon.png` (4.2MB) → WebP/AVIF'e optimize; gereksiz PNG'leri kaldır; `next/image` ile doğru boyutta çağır.
**Kabul kriteri:**
- [ ] Logo dosyaları toplam < 500KB, LCP darboğazı yok

### Faz 13: Boş görsel klasörleri kararı
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `public/images/{services,team,references,badges}`
**Yapılacaklar:**
- Gerçek görsellerle doldur (Unsplash bağımlılığını azalt) ya da klasörleri kaldır; kalıcı Unsplash kullanımı belgelensin.
**Kabul kriteri:**
- [ ] Boş klasör kalmadı veya bilinçli belgelendi

### Faz 14: Görsel `alt` metni denetimi
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** tüm `*.tsx` içindeki `<img>`/`<Image>`
**Yapılacaklar:**
- Alt metni eksik görselleri tara; keyword içeren betimleyici alt metinler yaz (i18n `t()` ile).
**Kabul kriteri:**
- [ ] Alt'sız görsel = 0

### Faz 15: Başlık hiyerarşisi (H1 tekliği) denetimi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** tüm sayfa/section bileşenleri
**Yapılacaklar:**
- Her sayfada tek `<h1>`; H2/H3 semantik sırada; görsel-büyük ama semantik-yanlış başlıkları düzelt.
**Kabul kriteri:**
- [ ] Her route'ta tam 1 H1, başlık atlaması yok

### Faz 16: Thin-content denetimi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** politika/kurumsal + ince hizmet sayfaları
**Yapılacaklar:**
- 300 kelime altı sayfaları listele; Bölüm D'de derinleştir veya `noindex` ver.
**Kabul kriteri:**
- [ ] İnce sayfa envanteri çıkarıldı ve karar verildi

### Faz 17: 404 sayfası i18n + SEO
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/not-found.tsx`
**Yapılacaklar:**
- Hard-code Türkçe metinleri `t()` ile i18n'e bağla; faydalı iç linkler ekle; doğru 404 status.
**Kabul kriteri:**
- [ ] EN kullanıcı İngilizce 404 görüyor, HTTP 404 doğru

### Faz 18: 500 / error sayfaları i18n
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/error.tsx`, `src/app/[lang]/global-error.tsx`
**Yapılacaklar:**
- Kullanıcı dostu, i18n, markalı hata sayfaları + retry aksiyonu.
**Kabul kriteri:**
- [ ] Hata durumunda markalı + i18n ekran

### Faz 19: Kırık iç link & redirect haritası denetimi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** `next.config.ts` (redirects), tüm `<Link href>`
**Yapılacaklar:**
- İç linkleri gerçek route'larla karşılaştır; ölü linkleri düzelt; eski URL'ler için redirect kurallarını genişlet (şu an 2 kural).
**Kabul kriteri:**
- [ ] 404'e giden iç link yok; eski URL'ler 301 ile doğru hedefte

### Faz 20: WebVitals ölçüm doğrulaması
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 10`
**Dosya:** `src/components/layout/WebVitals.tsx`
**Yapılacaklar:**
- `WebVitals`'ın LCP/INP/CLS'i GA4'e gönderdiğini doğrula; event adlarını standardize et.
**Kabul kriteri:**
- [ ] GA4'te web-vitals event'leri düşüyor

---

# 🧭 BÖLÜM B — TEKNİK SEO & İNDEKSLEME (Faz 21–40)

> Amaç: Tarama bütçesi, indeksleme kontrolü ve doğru sinyallerle Google'ın siteyi eksiksiz
> ve tekilleştirilmiş biçimde anlamasını sağlamak.

### Faz 21: Sitemap index mimarisi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 8`
**Dosya:** `src/app/sitemap.ts` → `generateSitemaps()` ile bölümlü
**Yapılacaklar:**
- Sayfa sayısı büyüdükçe (yerel sayfalar Bölüm E) sitemap'i parçalara böl: `sitemap/0.xml` (statik), `/1.xml` (hizmetler), `/2.xml` (yerel), `/3.xml` (blog).
**Kabul kriteri:**
- [ ] Sitemap index + alt sitemap'ler GSC'de geçerli

### Faz 22: Image sitemap
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 21`
**Dosya:** `src/app/sitemap.ts`
**Yapılacaklar:**
- Önemli görselleri `images` alanıyla sitemap'e ekle (hizmet görselleri, referanslar).
**Kabul kriteri:**
- [ ] Görsel URL'leri sitemap'te listeleniyor

### Faz 23: Video sitemap + VideoObject uyumu
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 21`
**Dosya:** `src/app/sitemap.ts`, `src/app/[lang]/page.tsx`
**Yapılacaklar:**
- Hero `brand-film.mp4` için video sitemap girdisi; sayfadaki VideoObject JSON-LD ile alanları eşitle (thumbnail, duration, contentUrl).
**Kabul kriteri:**
- [ ] Video, Rich Results Video test'inden geçiyor

### Faz 24: Doğru `lastmod` stratejisi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 8`
**Dosya:** `src/app/sitemap.ts`, içerik kaynakları
**Yapılacaklar:**
- Her rota için gerçek son değişiklik tarihi (git/CMS/frontmatter); "hepsi bugün" sinyalini kaldır.
**Kabul kriteri:**
- [ ] `lastmod` gerçekçi ve sayfa bazında farklı

### Faz 25: `robots.ts` per-path ince ayar
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 9`
**Dosya:** `src/app/robots.ts`
**Yapılacaklar:**
- `/api`, `/admin`, arama/query URL'leri, teşekkür sayfaları için `disallow`; önemli yollar `allow`.
**Kabul kriteri:**
- [ ] Gereksiz yollar taramaya kapalı, değerli yollar açık

### Faz 26: URL normalizasyonu & trailing slash politikası
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 2`
**Dosya:** `next.config.ts`, `src/proxy.ts`
**Yapılacaklar:**
- Tek biçim: trailing slash yok, küçük harf, TR prefix yok. Proxy + canonical ile tutarlı.
**Kabul kriteri:**
- [ ] Aynı içeriğe giden URL varyantları 301 ile tekilleşiyor

### Faz 27: Self-referencing canonical doğrulaması
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 2`
**Dosya:** tüm sayfalar
**Yapılacaklar:**
- Her sayfa kendi temiz URL'sine canonical versin; parametreli/filtreli varyantlar ana sayfaya canonical.
**Kabul kriteri:**
- [ ] Screaming Frog/manuel: canonical zinciri temiz

### Faz 28: Pagination & liste sayfaları (blog)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 27`
**Dosya:** `src/app/[lang]/blog/page.tsx`
**Yapılacaklar:**
- Sayfalı listelerde canonical + benzersiz title (`Sayfa 2`), thin/duplicate önleme.
**Kabul kriteri:**
- [ ] Pagination sayfaları duplicate uyarısı vermiyor

### Faz 29: IndexNow entegrasyonu (Bing/Yandex)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** `public/<key>.txt` (YENİ), yayın script'i
**Yapılacaklar:**
- IndexNow anahtar dosyası + içerik güncellemelerinde ping (deploy hook).
**Kabul kriteri:**
- [ ] IndexNow anahtarı doğrulandı, ping 200 dönüyor

### Faz 30: Google & Bing site doğrulama (env)
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 10`
**Dosya:** `src/app/[lang]/layout.tsx` (`verification`)
**Yapılacaklar:**
- `verification.google` ve `verification.other['msvalidate.01']` env'den; GSC + Bing Webmaster doğrulaması.
**Kabul kriteri:**
- [ ] GSC ve Bing'de mülk doğrulandı

### Faz 31: Soft-404 önleme
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 17`
**Dosya:** dinamik route'lar (`blog/[slug]`, ileride `[ilce]`)
**Yapılacaklar:**
- Var olmayan slug'larda gerçek 404 (`notFound()`), 200'le boş içerik değil.
**Kabul kriteri:**
- [ ] Geçersiz slug → HTTP 404

### Faz 32: `noindex` ince/yasal sayfa stratejisi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 16`
**Dosya:** ilgili `layout.tsx`/metadata
**Yapılacaklar:**
- Teşekkür/önizleme/duplicate yasal metinler için `robots: { index:false, follow:true }`.
**Kabul kriteri:**
- [ ] Değeri düşük sayfalar index dışı

### Faz 33: RSS/Atom feed (blog)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/blog/rss.xml/route.ts` (YENİ)
**Yapılacaklar:**
- Blog için RSS feed; `<link rel="alternate" type="application/rss+xml">` ekle.
**Kabul kriteri:**
- [ ] Geçerli RSS, feed reader'da açılıyor

### Faz 34: JSON-LD `@id` grafiği & node bağlama
`Zorluk: ⭐⭐⭐` · `Süre: ~2s` · `Bağımlılık: Bölüm C`
**Dosya:** `src/lib/schemas.ts`
**Yapılacaklar:**
- Organization/WebSite/WebPage/LocalBusiness node'larını `@id` ile birbirine bağla (bilgi grafiği).
**Kabul kriteri:**
- [ ] Schema node'ları `@id` referanslarıyla tutarlı graf oluşturuyor

### Faz 35: Crawl budget & internal 3xx temizliği
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 19`
**Dosya:** tüm `<Link>`, `next.config.ts`
**Yapılacaklar:**
- İç linklerden geçen redirect'leri kaldır (doğrudan final URL'e link); redirect zincirlerini kes.
**Kabul kriteri:**
- [ ] İç linklerde 3xx zinciri yok

### Faz 36: `next.config.ts` gelişmiş header/güvenlik
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `next.config.ts`
**Yapılacaklar:**
- HSTS, CSP (temel), `X-Content-Type-Options` (mevcut) + görsel/font cache immutable (mevcut) doğrula.
**Kabul kriteri:**
- [ ] securityheaders.com skoru ≥ A

### Faz 37: Structured breadcrumb ↔ URL uyumu
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 11`
**Dosya:** breadcrumb üretim yerleri
**Yapılacaklar:**
- Breadcrumb item URL'leri canonical URL'lerle birebir aynı olsun.
**Kabul kriteri:**
- [ ] Breadcrumb URL'leri canonical'la eşleşiyor

### Faz 38: 404/500 için sitemap-dışı tutma
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 21`
**Dosya:** `src/app/sitemap.ts`
**Yapılacaklar:**
- Yalnız 200 dönen indekslenebilir sayfalar sitemap'te.
**Kabul kriteri:**
- [ ] Sitemap yalnız canlı, indekslenebilir URL içeriyor

### Faz 39: Dil çerezine/`Accept-Language`'e göre yönlendirme SEO'su
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 3`
**Dosya:** `src/proxy.ts`
**Yapılacaklar:**
- Otomatik dil yönlendirmesi botları döngüye sokmasın; `x-default` net; 302 değil temiz rewrite.
**Kabul kriteri:**
- [ ] Googlebot her iki dili de tarayabiliyor, döngü yok

### Faz 40: GSC entegrasyon & indeksleme denetimi (baz ölçüm)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 30`
**Dosya:** — (operasyonel)
**Yapılacaklar:**
- Sitemap'i GSC'ye gönder; "Kapsam" raporundan indeksleme temel çizgisini al.
**Kabul kriteri:**
- [ ] Sitemap GSC'de işlendi, hata/uyarı listesi çıkarıldı

---

# 🏗️ BÖLÜM C — STRUCTURED DATA / JSON-LD DERİNLEŞTİRME (Faz 41–70)

> Amaç: `src/lib/schemas.ts`'i (şu an yalnız `generateBreadcrumbs` var) merkezi bir şema
> fabrikasına dönüştürmek ve zengin sonuç (rich result) fırsatlarını eksiksiz kullanmak.

### Faz 41: Merkezi schema fabrikası kurulumu
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** `src/lib/schemas.ts`
**Yapılacaklar:**
- Her şema tipi için tip-güvenli üretici fonksiyonlar (`schema.org` tiplerine sadık) + tek `JsonLd` render bileşeni.
**Kabul kriteri:**
- [ ] Tüm JSON-LD tek modülden üretiliyor, sayfalarda inline literal kalmadı

### Faz 42: Organization şemasını tam alanla zenginleştir
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 41`
**Dosya:** `src/lib/schemas.ts`, `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- `legalName`, `taxID`/`vatID`, `foundingDate`, `founder`, `address`, `logo` (ImageObject), `sameAs`, `contactPoint[]`, `knowsAbout`.
**Kabul kriteri:**
- [ ] Organization Rich Results hatasız

### Faz 43: `ProfessionalService` / `LocalBusiness` yükseltme
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41`
**Dosya:** `src/app/[lang]/page.tsx`, `iletisim/page.tsx`
**Yapılacaklar:**
- `LocalBusiness` → `ProfessionalService`; `priceRange`, `areaServed` (GeoCircle İstanbul), `openingHoursSpecification`, `hasMap`, `geo`.
**Kabul kriteri:**
- [ ] LocalBusiness rich result tüm zorunlu alanlarla geçiyor

### Faz 44: `Service` + `hasOfferCatalog` (8 hizmet)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 41`
**Dosya:** 8 hizmet sayfası
**Yapılacaklar:**
- Her hizmet için `Service` (`serviceType`, `provider`, `areaServed`, `hasOfferCatalog` → alt hizmet kalemleri).
**Kabul kriteri:**
- [ ] Her hizmet sayfasında geçerli Service schema

### Faz 45: `Offer` / `PriceSpecification`
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 44`
**Dosya:** hizmet + sektörel sayfalar
**Yapılacaklar:**
- Fiyat aralığı/teklif modeli için `Offer` (`priceCurrency: TRY`, `availability`); net fiyat yoksa `priceRange`.
**Kabul kriteri:**
- [ ] Offer schema doğrulanıyor (yanıltıcı fiyat yok)

### Faz 46: Gerçek-kaynaklı `AggregateRating`
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 43`
**Dosya:** `src/app/[lang]/page.tsx`
**Yapılacaklar:**
- Sabit `4.9/340` yerine gerçek yorum kaynağına bağla (Google/CMS); politika ihlali riskini kaldır.
**Kabul kriteri:**
- [ ] Rating gerçek veriyle eşleşiyor, sayfada görünür

### Faz 47: `Review` şeması (Testimonial)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 46`
**Dosya:** `src/components/sections/TestimonialSlider.tsx`
**Yapılacaklar:**
- Her yorum için `Review` (`author`, `reviewRating`, `datePublished`, `reviewBody`); sayfada görünür yorumlarla birebir.
**Kabul kriteri:**
- [ ] Review schema, görünen içerikle tutarlı

### Faz 48: `FAQPage` genişletme (hizmet + yerel)
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41`
**Dosya:** `sss/page.tsx`, hizmet sayfaları, ileride yerel
**Yapılacaklar:**
- Her hizmet sayfasına sayfaya özgü 4-6 SSS + `FAQPage` schema; PAA hedefleme.
**Kabul kriteri:**
- [ ] Hizmet sayfalarında FAQ rich result

### Faz 49: `HowTo` şeması (süreç adımları)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41`
**Dosya:** `src/components/sections/InteractiveProcessSteps.tsx`
**Yapılacaklar:**
- "Nasıl çalışırız" adımlarını `HowTo` (`step[]`, `HowToStep`, görsel) olarak işaretle.
**Kabul kriteri:**
- [ ] HowTo schema geçerli

### Faz 50: `Course` + `EducationalOrganization` (Akademi)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41`
**Dosya:** `guvenlik-akademisi/page.tsx`
**Yapılacaklar:**
- Eğitimleri `Course` (`provider`, `hasCourseInstance`, `courseMode`); kurum `EducationalOrganization`.
**Kabul kriteri:**
- [ ] Course rich result geçerli

### Faz 51: `Event` şeması (eğitim takvimi)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 50`
**Dosya:** `guvenlik-akademisi/page.tsx`
**Yapılacaklar:**
- Planlı eğitimler için `Event` (`startDate`, `location`, `eventAttendanceMode`, `offers`).
**Kabul kriteri:**
- [ ] Event rich result geçerli

### Faz 52: `JobPosting` (İstihdam Köprüsü)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41`
**Dosya:** `istihdam-koprusu/page.tsx`
**Yapılacaklar:**
- Açık pozisyonlar için `JobPosting` (`title`, `hiringOrganization`, `jobLocation`, `datePosted`, `validThrough`, `employmentType`).
**Kabul kriteri:**
- [ ] Google for Jobs uyumlu

### Faz 53: `Person` (yönetim/ekip)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 41`
**Dosya:** `hakkimizda/page.tsx`
**Yapılacaklar:**
- Ekip üyeleri için `Person` (`jobTitle`, `worksFor`, `image`, `sameAs`) — E-E-A-T sinyali.
**Kabul kriteri:**
- [ ] Person node'ları Organization'a bağlı

### Faz 54: `VideoObject` tam uyumu (Hero)
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 23`
**Dosya:** `src/app/[lang]/page.tsx`, `Hero.tsx`
**Yapılacaklar:**
- `thumbnailUrl`, `uploadDate`, `duration`, `contentUrl` gerçek değerlerle; poster görseliyle hizala.
**Kabul kriteri:**
- [ ] Video rich result + video sitemap tutarlı

### Faz 55: `ImageObject` & lisans bilgisi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 41`
**Dosya:** logo/marka görselleri
**Yapılacaklar:**
- Logo ve önemli görseller için `ImageObject` (`license`, `creditText`, `creator`) — Google Images.
**Kabul kriteri:**
- [ ] Görsel lisans metadata'sı mevcut

### Faz 56: `BlogPosting` / `Article` tam alan
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41`
**Dosya:** `blog/[slug]/page.tsx`, `blog/[slug]/layout.tsx`
**Yapılacaklar:**
- `headline`, `author` (Person), `datePublished`/`dateModified`, `image`, `publisher`, `mainEntityOfPage`.
**Kabul kriteri:**
- [ ] Article rich result geçerli

### Faz 57: `WebPage` @type her sayfada
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 34`
**Dosya:** `src/lib/schemas.ts`
**Yapılacaklar:**
- Her sayfa için uygun `WebPage`/`ContactPage`/`AboutPage`/`CollectionPage` node'u + `isPartOf` WebSite.
**Kabul kriteri:**
- [ ] Her sayfada WebPage node'u WebSite'a bağlı

### Faz 58: `WebSite` + `SearchAction` doğrulama
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 41`
**Dosya:** `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- Mevcut SearchAction'ın gerçek arama URL'sine (blog arama) işaret ettiğini doğrula.
**Kabul kriteri:**
- [ ] Sitelinks search box aday sinyali geçerli

### Faz 59: `speakable` işaretlemesi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 57`
**Dosya:** blog + SSS
**Yapılacaklar:**
- Sesli asistan/AI için `speakable` (`cssSelector`) önemli özet bloklarına.
**Kabul kriteri:**
- [ ] speakable schema geçerli

### Faz 60: `sameAs` sosyal profil bağlama
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 42`
**Dosya:** `src/lib/schemas.ts`
**Yapılacaklar:**
- Tüm doğrulanmış sosyal + dizin profillerini `sameAs`'e ekle (bilgi paneli sinyali).
**Kabul kriteri:**
- [ ] sameAs tam ve doğrulanmış URL'ler

### Faz 61: `ContactPoint` çoklu departman
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 42`
**Dosya:** `src/lib/schemas.ts`
**Yapılacaklar:**
- Satış/destek/acil için ayrı `ContactPoint` (`contactType`, `availableLanguage`, `areaServed`).
**Kabul kriteri:**
- [ ] Departman bazlı contactPoint node'ları

### Faz 62: `OpeningHoursSpecification` detay
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 43`
**Dosya:** `page.tsx`, `iletisim/page.tsx`
**Yapılacaklar:**
- 7/24 hizmet ile ofis saatlerini ayrıştır; tatil istisnaları.
**Kabul kriteri:**
- [ ] Çalışma saatleri schema gerçeği yansıtıyor

### Faz 63: `areaServed` GeoCircle/GeoShape
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 43`
**Dosya:** `src/lib/schemas.ts`
**Yapılacaklar:**
- İstanbul için GeoCircle (merkez + yarıçap) veya ilçe listesi; Bölüm E yerel sayfalarıyla paylaş.
**Kabul kriteri:**
- [ ] areaServed coğrafi olarak net

### Faz 64: `Product` / `Offer` (Sektörel çözümler)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 45`
**Dosya:** `sektorel-cozumler/page.tsx`
**Yapılacaklar:**
- Paket/çözümleri `Product`+`Offer` veya `Service` olarak işaretle; mevcut ItemList'i zenginleştir.
**Kabul kriteri:**
- [ ] Sektörel paketler yapılandırılmış veriyle

### Faz 65: `hasCredential` / sertifikalar (ISO vb.)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 42`
**Dosya:** `kurumsal/kalite-politikamiz`, `CertificateBadgeGrid`
**Yapılacaklar:**
- ISO/kalite belgelerini `hasCredential` (`EducationalOccupationalCredential`) + görünür rozet.
**Kabul kriteri:**
- [ ] Sertifikalar hem görsel hem schema

### Faz 66: `award` / başarılar
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 42`
**Dosya:** `hakkimizda`, `basari-hikayeleri`
**Yapılacaklar:**
- Ödül/başarıları `award` alanına; başarı hikayeleri `CreativeWork`/`CaseStudy` yaklaşımı.
**Kabul kriteri:**
- [ ] Ödüller schema'da

### Faz 67: `knowsAbout` / entity uzmanlık
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 42`
**Dosya:** `src/lib/schemas.ts`
**Yapılacaklar:**
- Organization `knowsAbout`: site yönetimi, KMK, 5188, tesis yönetimi… (topikal otorite sinyali).
**Kabul kriteri:**
- [ ] knowsAbout konu listesi mevcut

### Faz 68: Schema ↔ görünür içerik uyum denetimi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41–67`
**Dosya:** tüm schema'lı sayfalar
**Yapılacaklar:**
- Google politikası: JSON-LD'deki her iddia sayfada görünür olmalı; görünmeyen alanları temizle.
**Kabul kriteri:**
- [ ] Rich Results manuel spam politikası ihlali yok

### Faz 69: Schema validasyon CI adımı
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 41`
**Dosya:** `seo-audit.js`/yeni script
**Yapılacaklar:**
- Build sonrası JSON-LD'yi çıkarıp şema doğrulayan otomatik kontrol.
**Kabul kriteri:**
- [ ] Geçersiz schema build'i uyarıyor

### Faz 70: Rich Results toplu doğrulama & kayıt
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 41–69`
**Dosya:** — (operasyonel)
**Yapılacaklar:**
- Tüm sayfa tiplerini Rich Results Test + GSC "Geliştirmeler" raporuyla doğrula; sonuç tablosu.
**Kabul kriteri:**
- [ ] Her şema tipi en az 1 sayfada "geçerli"

---

# 📝 BÖLÜM D — ON-PAGE & İÇERİK SEO (Faz 71–100)

> Amaç: Her sayfayı hedef keyword'e göre başlık, meta, başlık hiyerarşisi, içerik derinliği
> ve iç bağlantı açısından optimize etmek; featured snippet ve PAA fırsatlarını yakalamak.

### Faz 71: Keyword → sayfa eşleme matrisi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** `SEO_KEYWORD_MAP.md` (YENİ, referans)
**Yapılacaklar:**
- Her sayfaya 1 birincil + 2-3 ikincil keyword ata; cannibalization'ı önle (aynı keyword tek sayfa).
**Kabul kriteri:**
- [ ] Her indekslenebilir sayfanın net birincil keyword'ü var

### Faz 72: Title etiketi formülleri
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 71`
**Dosya:** tüm metadata (`buildMetadata`)
**Yapılacaklar:**
- Formül: `Birincil Keyword | Fayda | Alo Yönetim`; ≤ 60 karakter; her sayfa benzersiz.
**Kabul kriteri:**
- [ ] Duplicate title yok, uzunluklar uygun

### Faz 73: Meta description optimizasyonu
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 71`
**Dosya:** tüm metadata
**Yapılacaklar:**
- 140-160 karakter, CTA + keyword; her sayfa benzersiz; i18n tr/en.
**Kabul kriteri:**
- [ ] Duplicate/eksik description yok

### Faz 74: H1 stratejisi (keyword hizalı)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 15,71`
**Dosya:** sayfa bileşenleri
**Yapılacaklar:**
- Her H1 birincil keyword içersin, title'dan farklı ama uyumlu.
**Kabul kriteri:**
- [ ] H1 keyword hizalı ve tekil

### Faz 75: H2/H3 semantik + keyword varyasyonları
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 74`
**Dosya:** sayfa bileşenleri
**Yapılacaklar:**
- Alt başlıklara long-tail/LSI varyasyonları; soru formatlı H2'ler (PAA hedefi).
**Kabul kriteri:**
- [ ] Alt başlıklar konuyu semantik kapsıyor

### Faz 76: Hizmet sayfalarında içerik derinliği
`Zorluk: ⭐⭐⭐` · `Süre: ~4s` · `Bağımlılık: Faz 71`
**Dosya:** 8 hizmet sayfası + `translations.ts`
**Yapılacaklar:**
- Her hizmet için 1000+ kelime: kapsam, süreç, faydalar, fiyatlandırma mantığı, SSS, vaka.
**Kabul kriteri:**
- [ ] Her hizmet sayfası ≥ 1000 kelime, özgün

### Faz 77: Entity/LSI keyword zenginleştirme
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 76`
**Dosya:** hizmet + blog içerikleri
**Yapılacaklar:**
- İlgili varlıklar (KMK, aidat, demirbaş, 5188, ISO 9001…) doğal geçişlerle.
**Kabul kriteri:**
- [ ] İçerik konu varlıklarını kapsıyor

### Faz 78: İç bağlantı anchor optimizasyonu
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 71`
**Dosya:** `RelatedServices.tsx`, içerik gövdeleri
**Yapılacaklar:**
- Genel ("tıklayın") yerine keyword-zengin anchor; her sayfadan ≥3 kontekstuel iç link.
**Kabul kriteri:**
- [ ] Anchor metinleri açıklayıcı ve keyword hizalı

### Faz 79: Görsel dosya adı SEO'su
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 14`
**Dosya:** `public/images/*`
**Yapılacaklar:**
- `IMG_1234.jpg` → `site-guvenlik-kamera-sistemi.webp` gibi keyword'lü dosya adları.
**Kabul kriteri:**
- [ ] Görsel dosya adları açıklayıcı

### Faz 80: İçindekiler (TOC) + jump link
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 75`
**Dosya:** uzun hizmet/blog sayfaları
**Yapılacaklar:**
- Otomatik TOC (H2/H3'ten), `id` anchor'lar → jump-to-section sitelink şansı.
**Kabul kriteri:**
- [ ] Uzun sayfalarda çalışan TOC

### Faz 81: Featured snippet hedefleme (paragraf)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 75`
**Dosya:** hizmet/blog
**Yapılacaklar:**
- "X nedir?" sorularına 40-55 kelimelik net tanım bloğu (snippet formatı).
**Kabul kriteri:**
- [ ] Hedef sorularda tanım bloğu mevcut

### Faz 82: Featured snippet hedefleme (liste/tablo)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 81`
**Dosya:** hizmet/blog
**Yapılacaklar:**
- "adımlar", "fiyat karşılaştırma" gibi sorgular için sıralı liste + tablo blokları.
**Kabul kriteri:**
- [ ] Liste/tablo snippet adayları mevcut

### Faz 83: People Also Ask (PAA) genişletme
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 48`
**Dosya:** SSS + hizmet FAQ'ları
**Yapılacaklar:**
- Gerçek arama sorularını FAQ'a ekle (SORU + kısa net cevap), `FAQPage` schema ile eşle.
**Kabul kriteri:**
- [ ] PAA benzeri sorular kapsandı

### Faz 84: Sözlük / terimler sayfası
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 77`
**Dosya:** `src/app/[lang]/sozluk/page.tsx` (YENİ)
**Yapılacaklar:**
- Sektör terimleri (aidat, demirbaş, KMK, işletme projesi…) tanım sayfası + `DefinedTermSet` schema; iç linkleme merkezi.
**Kabul kriteri:**
- [ ] Sözlük sayfası yayında ve linklenmiş

### Faz 85: Karşılaştırma içeriği (biz vs alternatif)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 76`
**Dosya:** `ComparisonTable.tsx`, hizmet sayfaları
**Yapılacaklar:**
- "Profesyonel yönetim vs kendi kendine yönetim" karşılaştırma tabloları (karar-aşaması niyeti).
**Kabul kriteri:**
- [ ] Karşılaştırma içeriği özgün ve tablolu

### Faz 86: Above-the-fold değer önerisi netliği
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `Hero.tsx`, hizmet hero'ları
**Yapılacaklar:**
- İlk ekranda net değer önerisi + keyword; CTA görünür.
**Kabul kriteri:**
- [ ] Hero mesajı keyword + fayda içeriyor

### Faz 87: CTA yerleşimi & dönüşüm-SEO dengesi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** hizmet + yerel sayfalar
**Yapılacaklar:**
- İçerik boyunca stratejik "Teklif Al" CTA'ları (QuoteModal) — SEO içeriğini bölmeden.
**Kabul kriteri:**
- [ ] Her uzun sayfada ≥2 CTA

### Faz 88: Okunabilirlik & biçim
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 76`
**Dosya:** içerik gövdeleri
**Yapılacaklar:**
- Kısa paragraf, bullet, kalın anahtar ifadeler; mobil okunabilirlik.
**Kabul kriteri:**
- [ ] Paragraflar ≤ 3-4 cümle, taranabilir

### Faz 89: Türkçe slug & karakter tutarlılığı
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 26`
**Dosya:** route slug'ları, blog slug'ları
**Yapılacaklar:**
- ASCII, tireli, keyword'lü slug (`havuz-bakimi-ve-hijyen`) tutarlılığı; Türkçe karakter → ASCII map.
**Kabul kriteri:**
- [ ] Tüm slug'lar tutarlı ve keyword'lü

### Faz 90: Breadcrumb görünür + schema metinleri
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 11`
**Dosya:** `PageHeader.tsx`
**Yapılacaklar:**
- Görünür breadcrumb metinleri keyword'lü ve schema ile birebir.
**Kabul kriteri:**
- [ ] Görünür + schema breadcrumb eşleşiyor

### Faz 91: Semantik HTML5 landmark
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** layout + section bileşenleri
**Yapılacaklar:**
- `header/nav/main/article/section/aside/footer` doğru kullanım (crawl + a11y).
**Kabul kriteri:**
- [ ] Her sayfada tek `main`, doğru landmark'lar

### Faz 92: Veri/istatistik tabloları
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 82`
**Dosya:** hizmet/blog
**Yapılacaklar:**
- Sektör verileri, karşılaştırma tabloları (AI ve snippet için alıntılanabilir).
**Kabul kriteri:**
- [ ] Sayfalarda yapılandırılmış veri tabloları

### Faz 93: İçerik tazeliği & `dateModified`
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 56`
**Dosya:** blog + hizmet metadata
**Yapılacaklar:**
- "Güncelleme tarihi" görünür + `dateModified` schema; düzenli güncelleme döngüsü.
**Kabul kriteri:**
- [ ] Güncellenen içerikte tarih hem görünür hem schema

### Faz 94: E-E-A-T yazar kutusu
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 53`
**Dosya:** `blog/[slug]`, yazar sayfaları
**Yapılacaklar:**
- Uzmanlık/görev bilgisi olan yazar kutusu + `Person` schema + yazar arşiv sayfası.
**Kabul kriteri:**
- [ ] Her makalede kimliklendirilmiş yazar

### Faz 95: Kaynak & atıf (dış otorite)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 94`
**Dosya:** blog içerikleri
**Yapılacaklar:**
- Mevzuat/resmi kaynaklara atıf (KMK, mevzuat.gov.tr) — güven sinyali.
**Kabul kriteri:**
- [ ] İddialı içeriklerde otoriter atıf var

### Faz 96: Anahtar kelime kanibalizasyon denetimi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 71`
**Dosya:** — (analiz)
**Yapılacaklar:**
- Aynı keyword'e yarışan sayfaları birleştir/farklılaştır; canonical/redirect kararı.
**Kabul kriteri:**
- [ ] Keyword başına tek hedef sayfa

### Faz 97: Orphan sayfa denetimi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 78`
**Dosya:** navigasyon + içerik linkleri
**Yapılacaklar:**
- Hiç iç link almayan sayfaları tespit et; en az bir kontekstuel link ver.
**Kabul kriteri:**
- [ ] Orphan sayfa = 0

### Faz 98: Anlam bütünlüğü — konu kapsama denetimi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 76`
**Dosya:** hizmet + pillar
**Yapılacaklar:**
- Her pillar'ın alt konuları eksiksiz kapsadığını (content gap) denetle.
**Kabul kriteri:**
- [ ] Belirlenen içerik boşlukları kapatıldı

### Faz 99: Çok dilli içerik paritesi (tr/en)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 3`
**Dosya:** `src/i18n/translations.ts`
**Yapılacaklar:**
- EN çevirilerin eksiksiz olduğunu doğrula; eksik anahtarlar TR fallback göstermesin.
**Kabul kriteri:**
- [ ] EN sayfalarda Türkçe metin sızıntısı yok

### Faz 100: On-page skorlama & denetim şablonu
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 71–99`
**Dosya:** `seo-audit.js`
**Yapılacaklar:**
- Sayfa başına title/desc/H1/kelime sayısı/iç link kontrol eden otomatik on-page skoru.
**Kabul kriteri:**
- [ ] `seo-audit.js` on-page raporu üretiyor

---

# 📍 BÖLÜM E — PROGRAMATİK YEREL SEO (Faz 101–130)

> Amaç: İstanbul'un ilçeleri × hizmetler kombinasyonu için otomatik, özgün ve değerli yerel
> landing sayfaları üretip "yakınımdaki site yönetimi" tipi yüzlerce yerel niyeti yakalamak.
> **Kritik risk:** thin/duplicate content — her sayfa gerçek yerel değer taşımalı (Faz 118).

### Faz 101: İlçe veri modeli
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** `src/data/districts.ts` (YENİ)
**Yapılacaklar:**
- Her ilçe için: `slug`, `ad`, `nüfus`, `öneKıkanBölgeler`, `enlem/boylam`, `kısaTanım`, `yerelİhtiyaçlar`.
**Kabul kriteri:**
- [ ] İstanbul ilçeleri tip-güvenli veri olarak mevcut

### Faz 102: Hizmet veri modeli (yerel için)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `src/data/services.ts` (YENİ)
**Yapılacaklar:**
- 8 hizmetin makine-okur verisi (`slug`, `ad`, `özet`, `faydalar`, `keywords`).
**Kabul kriteri:**
- [ ] Hizmetler tek kaynaktan besleniyor

### Faz 103: `[ilce]` dinamik route iskeleti
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 101`
**Dosya:** `src/app/[lang]/bolgeler/[ilce]/page.tsx` (YENİ)
**Yapılacaklar:**
- İlçe genel landing (`/bolgeler/kadikoy`): tüm hizmetler + yerel içerik.
**Kabul kriteri:**
- [ ] İlçe sayfaları route'lanıyor

### Faz 104: `generateStaticParams` ile ön-üretim
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 103`
**Dosya:** `bolgeler/[ilce]/page.tsx`
**Yapılacaklar:**
- Tüm ilçeleri build'de statik üret (SSG); yeni ilçe eklenince otomatik.
**Kabul kriteri:**
- [ ] İlçe sayfaları statik prerender

### Faz 105: Hizmet × ilçe matris route
`Zorluk: ⭐⭐⭐` · `Süre: ~3s` · `Bağımlılık: Faz 103`
**Dosya:** `src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx` (YENİ)
**Yapılacaklar:**
- `/bolgeler/kadikoy/guvenlik-yonetimi` gibi kombinasyon sayfaları; `generateStaticParams` matris.
**Kabul kriteri:**
- [ ] Hizmet×ilçe sayfaları üretiliyor

### Faz 106: Yerel landing içerik şablonu (özgünleştirilmiş)
`Zorluk: ⭐⭐⭐` · `Süre: ~4s` · `Bağımlılık: Faz 105`
**Dosya:** yerel sayfa bileşenleri
**Yapılacaklar:**
- Şablon + ilçeye özel değişken bloklar (yerel bölgeler, ulaşım, tipik konut dokusu) — spin değil gerçek varyasyon.
**Kabul kriteri:**
- [ ] Sayfalar arası benzerlik oranı düşük (özgün)

### Faz 107: Yerel dinamik metadata
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 1,105`
**Dosya:** yerel `generateMetadata`
**Yapılacaklar:**
- `{Hizmet} {İlçe} | Alo Yönetim` title, ilçe-özel description, canonical, hreflang.
**Kabul kriteri:**
- [ ] Her yerel sayfada benzersiz title/desc/canonical

### Faz 108: Yerel `LocalBusiness` + `areaServed` schema
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 63,105`
**Dosya:** yerel sayfa JSON-LD
**Yapılacaklar:**
- İlçe koordinatı + `areaServed` ilçe adı; `Service` provider olarak Organization.
**Kabul kriteri:**
- [ ] Yerel sayfalarda geçerli LocalBusiness/Service schema

### Faz 109: Yerel `GeoCoordinates` & harita
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 101`
**Dosya:** yerel sayfa
**Yapılacaklar:**
- İlçe merkez koordinatı + gömülü harita (lazy iframe) — yerel alaka sinyali.
**Kabul kriteri:**
- [ ] Her yerel sayfada doğru koordinat + harita

### Faz 110: İç linkleme — ilçe ↔ hizmet ↔ ana
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 105`
**Dosya:** yerel + hizmet + `Footer`
**Yapılacaklar:**
- İlçe sayfası → ilgili hizmet pillar; hizmet → popüler ilçeler; footer'da bölge dizini.
**Kabul kriteri:**
- [ ] Yerel sayfalar iç link grafiğine entegre

### Faz 111: Bölge dizini (hub) sayfası
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 103`
**Dosya:** `src/app/[lang]/bolgeler/page.tsx` (YENİ)
**Yapılacaklar:**
- Tüm ilçeleri listeleyen hub + `CollectionPage`/`ItemList` schema; orphan önleme.
**Kabul kriteri:**
- [ ] Bölge hub sayfası tüm ilçelere linkli

### Faz 112: Yerel sayfalar sitemap segmenti
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 21,105`
**Dosya:** `src/app/sitemap.ts`
**Yapılacaklar:**
- Yerel URL'leri ayrı sitemap segmentine ekle (`sitemap/2.xml`).
**Kabul kriteri:**
- [ ] Yerel sayfalar sitemap'te

### Faz 113: İlçe önceliklendirme (nüfus/potansiyel)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 101`
**Dosya:** `src/data/districts.ts`
**Yapılacaklar:**
- Yüksek potansiyelli ilçelere (Kadıköy, Ataşehir, Beşiktaş, Üsküdar, Maltepe…) öncelik + daha zengin içerik.
**Kabul kriteri:**
- [ ] Öncelik alanı ile sıralama yapılabiliyor

### Faz 114: Yerel referans/vaka enjeksiyonu
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 106`
**Dosya:** yerel şablon
**Yapılacaklar:**
- İlçede yönetilen (gerçek/temsili) proje sayısı, yerel testimonial — özgünlük + güven.
**Kabul kriteri:**
- [ ] Her yerel sayfada yerel kanıt bloğu

### Faz 115: Yerel SSS (ilçe-özel)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 48,106`
**Dosya:** yerel şablon
**Yapılacaklar:**
- "Kadıköy'de site yönetimi ne kadar?" gibi ilçe-özel FAQ + `FAQPage` schema.
**Kabul kriteri:**
- [ ] Yerel FAQ rich result

### Faz 116: "Yakınımda" / near-me optimizasyonu
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 108`
**Dosya:** yerel içerik + schema
**Yapılacaklar:**
- Konum ifadeleri, semt adları, "yakınınızdaki ekip" mesajı; mobil arama niyeti.
**Kabul kriteri:**
- [ ] Near-me sinyalleri mevcut

### Faz 117: NAP tutarlılığı (yerel sayfalar)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 60`
**Dosya:** `Footer`, yerel schema
**Yapılacaklar:**
- İsim/Adres/Telefon her yerde birebir aynı (citation'larla da — Bölüm J).
**Kabul kriteri:**
- [ ] Tüm NAP referansları tutarlı

### Faz 118: Thin/duplicate content koruması
`Zorluk: ⭐⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 106`
**Dosya:** yerel şablon + metadata
**Yapılacaklar:**
- Minimum özgün kelime eşiği; yeterli özgünlük yoksa `noindex`; benzerlik denetimi script'i.
**Kabul kriteri:**
- [ ] Düşük-özgünlük yerel sayfa index dışı

### Faz 119: Yerel canonical stratejisi
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 27,105`
**Dosya:** yerel metadata
**Yapılacaklar:**
- Her yerel sayfa self-canonical; çakışan varyantlar tekilleşsin.
**Kabul kriteri:**
- [ ] Yerel canonical zinciri temiz

### Faz 120: ISR / performans (yerel ölçek)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 104`
**Dosya:** yerel route segment config
**Yapılacaklar:**
- Yüzlerce sayfa için ISR/`revalidate`; build süresini kontrol altında tut.
**Kabul kriteri:**
- [ ] Build süresi kabul edilebilir, sayfalar hızlı

### Faz 121: Yerel hero & görsel varyasyon
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 106`
**Dosya:** yerel şablon
**Yapılacaklar:**
- İlçe adı + temsili görsel; alt metinde ilçe+hizmet.
**Kabul kriteri:**
- [ ] Yerel hero özgünleştirilmiş

### Faz 122: Yerel CTA & dönüşüm
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 87`
**Dosya:** yerel şablon
**Yapılacaklar:**
- İlçeye özel "hemen teklif al" + tıkla-ara; yerel telefon vurgusu.
**Kabul kriteri:**
- [ ] Yerel sayfalarda net CTA

### Faz 123: Yerel blog bağlantısı
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 110`
**Dosya:** yerel şablon
**Yapılacaklar:**
- İlgili blog rehberlerine linkler (konu otoritesi + iç link akışı).
**Kabul kriteri:**
- [ ] Yerel → blog linkleri mevcut

### Faz 124: Mahalle katmanı (opsiyonel derinlik)
`Zorluk: ⭐⭐⭐` · `Süre: ~3s` · `Bağımlılık: Faz 118`
**Dosya:** `src/data/neighborhoods.ts` (YENİ, opsiyonel)
**Yapılacaklar:**
- Yalnız yüksek potansiyelli ilçelerde mahalle sayfaları — thin content riskine karşı seçici.
**Kabul kriteri:**
- [ ] Mahalle sayfaları yalnız değer taşıyanlarda

### Faz 125: Yerel breadcrumb
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 90`
**Dosya:** yerel şablon
**Yapılacaklar:**
- `Ana > Bölgeler > Kadıköy > Güvenlik Yönetimi` breadcrumb + schema.
**Kabul kriteri:**
- [ ] Yerel breadcrumb hem görünür hem schema

### Faz 126: Yerel `dateModified` & tazelik
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 93`
**Dosya:** yerel metadata
**Yapılacaklar:**
- Yerel sayfa güncelleme tarihleri; periyodik veri tazeleme.
**Kabul kriteri:**
- [ ] Yerel sayfalarda tazelik sinyali

### Faz 127: Yerel indeksleme kademeli açılış
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 112`
**Dosya:** sitemap + robots
**Yapılacaklar:**
- Toplu 300+ sayfayı bir anda değil, kademeli sitemap ile sun (kalite algısı).
**Kabul kriteri:**
- [ ] Kademeli yayın planı belgelendi

### Faz 128: Yerel rakip/GAP analizi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 113`
**Dosya:** — (analiz)
**Yapılacaklar:**
- İlçe bazında rakip sıralamalarını incele; içerik açıklarını yerel şablona ekle.
**Kabul kriteri:**
- [ ] Öncelikli ilçeler için GAP notları

### Faz 129: Yerel şema ↔ içerik uyum denetimi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 68,108`
**Dosya:** yerel sayfalar
**Yapılacaklar:**
- Yerel schema iddiaları sayfada görünür olsun (spam politikası).
**Kabul kriteri:**
- [ ] Yerel schema-içerik uyumlu

### Faz 130: Yerel SEO performans ölçümü
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 40`
**Dosya:** — (operasyonel, GSC)
**Yapılacaklar:**
- İlçe sorgularında görünürlük/tıklama izleme; düşük performanslı sayfaları iyileştir/birleştir.
**Kabul kriteri:**
- [ ] Yerel sayfa performans raporu

---

# 🤖 BÖLÜM F — GEO / YAPAY ZEKA MOTORU SEO (Faz 131–150)

> Amaç: Generative Engine Optimization — ChatGPT, Perplexity, Gemini, Google AI Overviews gibi
> motorların yanıtlarında Alo Yönetim'in kaynak olarak gösterilmesi ve doğru temsil edilmesi.

### Faz 131: `llms.txt` oluştur
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** `public/llms.txt` (YENİ) veya `src/app/llms.txt/route.ts`
**Yapılacaklar:**
- Sitenin AI-dostu özeti: kim, ne hizmet, önemli sayfalara linkler (llms.txt standardı).
**Kabul kriteri:**
- [ ] `/llms.txt` 200, geçerli format

### Faz 132: AI crawler politikası kararı (robots)
`Zorluk: ⭐⭐` · `Süre: ~1s` · `Bağımlılık: Faz 9`
**Dosya:** `src/app/robots.ts`
**Yapılacaklar:**
- GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bytespider için izin/engel stratejisi (görünürlük istiyorsak İZİN ver — mevcut GPTBot/CCBot engeli gözden geçir).
**Kabul kriteri:**
- [ ] AI crawler politikası bilinçli ve belgeli

### Faz 133: `llms-full.txt` (derin içerik)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 131`
**Dosya:** `public/llms-full.txt` / route
**Yapılacaklar:**
- Hizmet/SSS özetlerinin markdown tam metni (AI'nın doğru alıntı yapması için).
**Kabul kriteri:**
- [ ] Derin içerik dosyası güncel

### Faz 134: TL;DR / özet blokları
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 81`
**Dosya:** hizmet/blog başları
**Yapılacaklar:**
- Sayfa başında 2-3 cümlelik net özet (AI motorları özeti alıntılar).
**Kabul kriteri:**
- [ ] Önemli sayfalarda TL;DR bloğu

### Faz 135: Soru-cevap formatlı içerik
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 83`
**Dosya:** hizmet/blog/FAQ
**Yapılacaklar:**
- Doğal dil sorularına net, kendi kendine yeten cevap blokları (AI çıkarımı kolaylaştırır).
**Kabul kriteri:**
- [ ] Q&A blokları bağımsız anlaşılır

### Faz 136: Alıntılanabilir istatistik/veri
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 92`
**Dosya:** hizmet/blog
**Yapılacaklar:**
- Kaynak gösterilen somut veriler ("5188 sayılı kanun uyarınca…", "İstanbul'da X"); AI alıntı olasılığını artırır.
**Kabul kriteri:**
- [ ] Sayfalarda net, atıflı veri noktaları

### Faz 137: Entity netliği & tanım cümleleri
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 84`
**Dosya:** sözlük + hizmet
**Yapılacaklar:**
- "Alo Yönetim, İstanbul merkezli bir profesyonel tesis yönetimi şirketidir." tarzı net entity cümleleri.
**Kabul kriteri:**
- [ ] Marka/hizmet tanımları açık

### Faz 138: Marka bilgi grafiği tutarlılığı
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 34,60`
**Dosya:** schema + içerik
**Yapılacaklar:**
- İsim, kuruluş, konum, hizmet iddiaları schema + içerik + off-page'de birebir tutarlı (AI güveni).
**Kabul kriteri:**
- [ ] Marka bilgileri kanallar arası tutarlı

### Faz 139: `speakable` + sesli asistan
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 59`
**Dosya:** blog/FAQ
**Yapılacaklar:**
- Sesli okunacak özet bölümlerini işaretle.
**Kabul kriteri:**
- [ ] speakable geçerli

### Faz 140: Karşılaştırma tablolarını AI için yapılandır
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 85`
**Dosya:** karşılaştırma bileşenleri
**Yapılacaklar:**
- Net başlıklı, makine-okur tablolar (AI karşılaştırma sorularına yanıt kaynağı).
**Kabul kriteri:**
- [ ] Tablolar semantik `<table>` + başlıklı

### Faz 141: Güncel tarih & tazelik işaretleri (AI)
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 93`
**Dosya:** içerik + schema
**Yapılacaklar:**
- "2026 itibarıyla" gibi tazelik ifadeleri + `dateModified` (AI güncel kaynağı tercih eder).
**Kabul kriteri:**
- [ ] İçerik güncellik sinyali taşıyor

### Faz 142: Prompt-benzeri başlıklar
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 75`
**Dosya:** blog/FAQ başlıkları
**Yapılacaklar:**
- Kullanıcıların AI'a sorduğu doğal dil kalıpları başlıklara ("Site yönetim ücreti nasıl hesaplanır?").
**Kabul kriteri:**
- [ ] Başlıklar doğal dil sorgu kalıbında

### Faz 143: Yapılandırılmış özet API/uç (opsiyonel)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 133`
**Dosya:** `src/app/api/summary/route.ts` (opsiyonel)
**Yapılacaklar:**
- Makine-okur JSON özet uç noktası (AI ajanları için).
**Kabul kriteri:**
- [ ] JSON özet uç noktası çalışıyor (opsiyonel)

### Faz 144: AI temsil doğruluğu denetimi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 138`
**Dosya:** — (operasyonel)
**Yapılacaklar:**
- ChatGPT/Perplexity/Gemini'ye markayı sor; yanlış temsili düzeltmek için içerik/entity güçlendir.
**Kabul kriteri:**
- [ ] AI yanıtlarında marka doğru temsil ediliyor

### Faz 145: AI trafiği ölçümü
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 20`
**Dosya:** analytics (GA4 referrer segmentleri)
**Yapılacaklar:**
- chatgpt.com, perplexity.ai, gemini vb. referrer'ları ayrı segment; AI trafiğini izle.
**Kabul kriteri:**
- [ ] AI kaynaklı trafik raporlanabiliyor

### Faz 146: Alıntı-değeri içerik güçlendirme
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 136`
**Dosya:** blog/hizmet
**Yapılacaklar:**
- Orijinal içgörü, mini araştırma, kontrol listeleri (AI'nın atıf vermek isteyeceği içerik).
**Kabul kriteri:**
- [ ] Özgün, alıntılanabilir içerik blokları

### Faz 147: Çok dilli AI görünürlüğü
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 99,131`
**Dosya:** `llms.txt` + EN içerik
**Yapılacaklar:**
- EN özet + entity cümleleri (İngilizce AI sorgularında görünürlük).
**Kabul kriteri:**
- [ ] EN AI özeti mevcut

### Faz 148: Wikidata/harici varlık kaydı (opsiyonel)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 138`
**Dosya:** — (harici)
**Yapılacaklar:**
- Uygunsa Wikidata/işletme varlık kaydı; `sameAs` ile bağla (bilgi grafiği güveni).
**Kabul kriteri:**
- [ ] Harici varlık referansı (mümkünse) mevcut

### Faz 149: AI-dostu semantik HTML denetimi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 91`
**Dosya:** tüm sayfalar
**Yapılacaklar:**
- Temiz, semantik, JS'e gömülü olmayan içerik (AI crawler'lar JS-render sınırlı olabilir).
**Kabul kriteri:**
- [ ] Kritik içerik JS olmadan da HTML'de

### Faz 150: GEO strateji dokümanı & izleme döngüsü
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 131–149`
**Dosya:** `GEO_STRATEGY.md` (YENİ)
**Yapılacaklar:**
- AI görünürlük stratejisini + periyodik AI temsil kontrol takvimini belgele.
**Kabul kriteri:**
- [ ] GEO strateji + izleme belgesi hazır

---

# 📚 BÖLÜM G — İÇERİK & BLOG CLUSTER (Faz 151–180)

> Amaç: Pillar-cluster mimarisiyle konu otoritesi kurmak; blog'u gerçek bir içerik motoruna
> dönüştürmek (şu an `sitemap.ts`'te 4 örnek slug var).

### Faz 151: Blog içerik altyapısı kararı (MDX vs veri)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** `src/content/blog/` (YENİ) veya `src/data/posts.ts`
**Yapılacaklar:**
- MDX dosya tabanlı içerik + frontmatter (title, slug, date, author, tags, description, cover) kararı; mevcut hard-coded slug'lardan taşı.
**Kabul kriteri:**
- [ ] Blog içeriği tek, ölçeklenebilir kaynaktan

### Faz 152: Pillar sayfa mimarisi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 71`
**Dosya:** 8 hizmet sayfası (pillar rolü)
**Yapılacaklar:**
- Her hizmet = pillar; ilgili cluster makalelerine link listesi bölümü.
**Kabul kriteri:**
- [ ] Her pillar cluster'ına link veriyor

### Faz 153: Cluster haritası
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 152`
**Dosya:** `CONTENT_CLUSTERS.md` (YENİ)
**Yapılacaklar:**
- 8 pillar × 5-8 cluster konusu = editoryal harita; her makale bir pillar'a bağlı.
**Kabul kriteri:**
- [ ] Tüm planlı içerik pillar'a eşlenmiş

### Faz 154: 50+ keyword'lü konu listesi
`Zorluk: ⭐⭐` · `Süre: ~2.5s` · `Bağımlılık: Faz 153`
**Dosya:** `CONTENT_CLUSTERS.md`
**Yapılacaklar:**
- Arama hacmi/niyet bazlı 50+ blog konusu, birincil keyword + niyet + hedef pillar.
**Kabul kriteri:**
- [ ] En az 50 konu keyword'le listelendi

### Faz 155: Editoryal takvim
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 154`
**Dosya:** `CONTENT_CALENDAR.md` (YENİ)
**Yapılacaklar:**
- Yayın sıklığı, öncelik, mevsimsellik (aidat dönemi, kış bakımı vb.).
**Kabul kriteri:**
- [ ] 3-6 aylık yayın takvimi hazır

### Faz 156: Blog kategori taksonomisi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 151`
**Dosya:** `src/app/[lang]/blog/kategori/[kategori]/page.tsx` (YENİ)
**Yapılacaklar:**
- Kategori arşiv sayfaları + `CollectionPage` schema; iç link akışı.
**Kabul kriteri:**
- [ ] Kategori sayfaları çalışıyor ve linkli

### Faz 157: Tag sistemi
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 156`
**Dosya:** `blog/etiket/[etiket]/page.tsx` (YENİ)
**Yapılacaklar:**
- Etiket arşivleri; aşırı tag'den kaçın (thin arşiv riski), `noindex` gerekirse.
**Kabul kriteri:**
- [ ] Tag arşivleri değer taşıyor, thin değil

### Faz 158: İlgili yazılar (related posts)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 153`
**Dosya:** `blog/[slug]/page.tsx`
**Yapılacaklar:**
- Aynı cluster/tag'den ilgili yazılar; iç link + oturum süresi.
**Kabul kriteri:**
- [ ] Her makalede 3+ ilgili yazı

### Faz 159: Yazar sayfaları & arşiv
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 94`
**Dosya:** `blog/yazar/[yazar]/page.tsx` (YENİ)
**Yapılacaklar:**
- Yazar biyografisi + uzmanlık + makale listesi (E-E-A-T).
**Kabul kriteri:**
- [ ] Yazar arşiv sayfaları + Person schema

### Faz 160: Blog `Article` schema tamamlama
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 56`
**Dosya:** `blog/[slug]`
**Yapılacaklar:**
- Tüm makalelerde eksiksiz Article schema (Faz 56 ile hizala).
**Kabul kriteri:**
- [ ] Article rich result tüm makalelerde

### Faz 161: Dinamik blog OG görseli
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 4`
**Dosya:** `blog/[slug]/opengraph-image.tsx` (YENİ)
**Yapılacaklar:**
- Makale başlığı + kategoriyle dinamik OG görseli.
**Kabul kriteri:**
- [ ] Her makalede özgün OG görseli

### Faz 162: Blog RSS + abonelik
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 33`
**Dosya:** RSS route + newsletter (Footer mevcut)
**Yapılacaklar:**
- RSS'i blog'a bağla; newsletter formunu gerçek bir sağlayıcıya (opsiyonel).
**Kabul kriteri:**
- [ ] RSS + abonelik akışı çalışıyor

### Faz 163: Blog arama
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 151`
**Dosya:** `blog/page.tsx`
**Yapılacaklar:**
- İstemci-taraflı arama (SearchAction schema'yla eşleşen gerçek arama).
**Kabul kriteri:**
- [ ] Blog araması çalışıyor, SearchAction gerçek

### Faz 164: Blog pagination + canonical
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 28`
**Dosya:** `blog/page.tsx`
**Yapılacaklar:**
- Sayfalı liste, doğru canonical/title.
**Kabul kriteri:**
- [ ] Pagination duplicate üretmiyor

### Faz 165: Uzun-form rehber (pillar-length)
`Zorluk: ⭐⭐⭐` · `Süre: ~4s` · `Bağımlılık: Faz 154`
**Dosya:** blog içerik
**Yapılacaklar:**
- 2000+ kelime kapsamlı rehberler ("Site Yönetimi A'dan Z'ye") — otorite içeriği.
**Kabul kriteri:**
- [ ] En az 3 kapsamlı rehber yayında

### Faz 166: Vaka çalışması şablonu
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 66`
**Dosya:** `basari-hikayeleri` + blog
**Yapılacaklar:**
- Problem-çözüm-sonuç formatı + metrikler; `Article`/`CaseStudy`.
**Kabul kriteri:**
- [ ] Vaka şablonu + en az 2 örnek

### Faz 167: İnfografik & görsel içerik
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 79`
**Dosya:** blog görselleri
**Yapılacaklar:**
- Özgün infografikler (backlink çekici) + alt/dosya adı SEO'su.
**Kabul kriteri:**
- [ ] En az 1 özgün infografik

### Faz 168: Video içerik entegrasyonu
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 54`
**Dosya:** blog + hizmet
**Yapılacaklar:**
- Gömülü video + `VideoObject` (varsa YouTube kanal bağı).
**Kabul kriteri:**
- [ ] Video içerik schema ile

### Faz 169: SSS → blog köprüleme
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 83`
**Dosya:** `sss/page.tsx`, blog
**Yapılacaklar:**
- Kısa SSS cevaplarından detaylı blog rehberlerine "daha fazla" linkleri.
**Kabul kriteri:**
- [ ] SSS ↔ blog çapraz linkler

### Faz 170: Mevsimsel/kampanya içeriği
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 155`
**Dosya:** blog
**Yapılacaklar:**
- Aidat dönemi, kış tesisat, havuz sezonu gibi zamanlı içerikler.
**Kabul kriteri:**
- [ ] Mevsimsel içerik takvimde

### Faz 171: Güncel mevzuat/hukuk içeriği
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 95`
**Dosya:** blog (hukuk cluster)
**Yapılacaklar:**
- KMK, aidat icra, kat malikleri kararları — otoriter, atıflı içerik.
**Kabul kriteri:**
- [ ] Hukuk cluster'ında ≥3 içerik

### Faz 172: İçerik güncelleme döngüsü
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 93`
**Dosya:** editoryal süreç
**Yapılacaklar:**
- Eski içerikleri periyodik tazele (`dateModified` güncelle, veri yenile).
**Kabul kriteri:**
- [ ] Güncelleme döngüsü tanımlı

### Faz 173: Cannibalization önleme (blog)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 96`
**Dosya:** blog içerik
**Yapılacaklar:**
- Benzer konulu makaleleri birleştir/farklılaştır; her keyword tek makale.
**Kabul kriteri:**
- [ ] Blog içi kanibalizasyon yok

### Faz 174: Orphan makale önleme
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 97,158`
**Dosya:** blog + pillar
**Yapılacaklar:**
- Her makaleye pillar/related/kategori üzerinden ≥3 iç link.
**Kabul kriteri:**
- [ ] Orphan makale = 0

### Faz 175: İçerik derinliği & konu kapsama (blog)
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 98`
**Dosya:** blog
**Yapılacaklar:**
- Her cluster'ın alt sorularını (PAA) kapsadığını denetle; boşlukları doldur.
**Kabul kriteri:**
- [ ] Cluster'lar konuyu tam kapsıyor

### Faz 176: Blog iç link otomasyonu
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 84`
**Dosya:** içerik render
**Yapılacaklar:**
- Terim geçince otomatik ilgili sayfa/sözlük linki (aşırıya kaçmadan).
**Kabul kriteri:**
- [ ] Anahtar terimler otomatik linkleniyor

### Faz 177: Okuma süresi & ilerleme
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 151`
**Dosya:** `blog/[slug]`
**Yapılacaklar:**
- Okuma süresi + scroll progress (etkileşim sinyali).
**Kabul kriteri:**
- [ ] Makalelerde okuma süresi gösteriliyor

### Faz 178: İçerik paylaşım & sosyal kanca
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 161`
**Dosya:** `blog/[slug]`
**Yapılacaklar:**
- Paylaş butonları + doğru OG/Twitter kartları (Bölüm A ile).
**Kabul kriteri:**
- [ ] Paylaşımda doğru kart görünüyor

### Faz 179: İçerik performans analizi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 40`
**Dosya:** — (GSC/GA4)
**Yapılacaklar:**
- Makale bazında tıklama/pozisyon; düşük performansı iyileştir veya birleştir.
**Kabul kriteri:**
- [ ] İçerik performans raporu

### Faz 180: İçerik yönetişim dokümanı
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 151–179`
**Dosya:** `CONTENT_GUIDELINES.md` (YENİ)
**Yapılacaklar:**
- Yazım stili, SEO kontrol listesi, schema zorunlulukları, yayın öncesi checklist.
**Kabul kriteri:**
- [ ] İçerik üretim rehberi hazır

---

# ⚡ BÖLÜM H — CORE WEB VITALS & PERFORMANS (Faz 181–210)

> Amaç: LCP < 2.0s, INP < 200ms, CLS < 0.05. Performans hem sıralama faktörü hem dönüşüm.
> Bilinen darboğaz: 4MB+ logolar, hero video, üçüncü-parti script'ler.

### Faz 181: LCP elemanı tespiti & optimizasyonu
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 12`
**Dosya:** `Hero.tsx`, LCP görsel/metin
**Yapılacaklar:**
- Gerçek LCP elemanını ölç; hero görselini `priority` + doğru boyutla; gereksiz animasyonu geciktir.
**Kabul kriteri:**
- [ ] Lab LCP < 2.0s (mobil)

### Faz 182: Hero video → poster + akıllı yükleme
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 181`
**Dosya:** `Hero.tsx`
**Yapılacaklar:**
- `poster` (hero-poster.webp) göster; video `preload="none"`/lazy; mobilde otomatik indirmeyi kıs.
**Kabul kriteri:**
- [ ] Video LCP'yi geciktirmiyor, poster hızlı

### Faz 183: Responsive `sizes` & srcset
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 12`
**Dosya:** tüm `next/image`
**Yapılacaklar:**
- Her görselde doğru `sizes`; gereksiz büyük indirmeleri engelle.
**Kabul kriteri:**
- [ ] Görseller viewport'a uygun boyutta iniyor

### Faz 184: AVIF/WebP kalite ayarı
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `next.config.ts` (formats mevcut)
**Yapılacaklar:**
- Kalite/format dengesi; kritik görsellerde ağırlık kontrolü.
**Kabul kriteri:**
- [ ] Görsel ağırlıkları optimize

### Faz 185: TR font subset + preload
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- `next/font` (Inter, Plus Jakarta) Latin-Extended/TR subset; kritik font preload; `display:swap` (mevcut) doğrula.
**Kabul kriteri:**
- [ ] Font kaynaklı CLS/gecikme yok

### Faz 186: Material Symbols yükleme optimizasyonu
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- Icon font'u (stylesheet link) blocking'den çıkar; yalnız kullanılan ikonları al veya SVG'ye geç.
**Kabul kriteri:**
- [ ] İkon font'u render-blocking değil

### Faz 187: CLS — layout rezervasyonu
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Yok`
**Dosya:** görsel/embed/reklam alanları
**Yapılacaklar:**
- Tüm görsel/iframe/embed'lere `width/height`/aspect-ratio; geç yüklenen içeriğe yer ayır.
**Kabul kriteri:**
- [ ] CLS < 0.05

### Faz 188: INP — ana thread & JS bölme
`Zorluk: ⭐⭐⭐` · `Süre: ~3s` · `Bağımlılık: Yok`
**Dosya:** ağır bileşenler (`Header`, `QuoteModal`)
**Yapılacaklar:**
- Uzun görevleri böl, event handler'ları optimize et, gereksiz re-render azalt.
**Kabul kriteri:**
- [ ] INP < 200ms

### Faz 189: Üçüncü-parti script defer (GA/Clarity)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 10`
**Dosya:** `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- Clarity/GA `afterInteractive`/`lazyOnload`; onay öncesi yükleme politikası (KVKK ile).
**Kabul kriteri:**
- [ ] Analytics ana yükü geciktirmiyor

### Faz 190: Bundle analizi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** build config
**Yapılacaklar:**
- Bundle analyzer ile büyük parçaları tespit; `translations.ts` (148KB), Header, QuoteModal.
**Kabul kriteri:**
- [ ] En büyük 5 bundle parçası belgelendi

### Faz 191: `Header` code-splitting
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 190`
**Dosya:** `src/components/layout/Header.tsx`
**Yapılacaklar:**
- Mega menü/mobil menüyü dinamik yükle; ilk yükü küçült.
**Kabul kriteri:**
- [ ] Header initial JS'i azaldı

### Faz 192: `QuoteModal` lazy yükleme
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 190`
**Dosya:** `QuoteModal.tsx`, `QuoteContext`
**Yapılacaklar:**
- Modalı yalnız açılınca yükle (zaten büyük dosya).
**Kabul kriteri:**
- [ ] QuoteModal ilk yükte inmiyor

### Faz 193: i18n bundle stratejisi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 190`
**Dosya:** `src/i18n/translations.ts`
**Yapılacaklar:**
- 148KB çeviriyi dile göre böl; yalnız aktif dili yükle.
**Kabul kriteri:**
- [ ] Tek dilde tüm çeviriler inmiyor

### Faz 194: Dynamic import denetimi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 190`
**Dosya:** `page.tsx` (mevcut `ssr:true` dynamic'ler)
**Yapılacaklar:**
- Fold-altı bileşenlerde `ssr` + loading davranışını gözden geçir; gereksiz dynamic'i sadeleştir.
**Kabul kriteri:**
- [ ] Dynamic strateji tutarlı

### Faz 195: Prefetch stratejisi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** `<Link>` kullanımları
**Yapılacaklar:**
- Kritik yollar prefetch; düşük değerli linklerde prefetch kapat (bant genişliği).
**Kabul kriteri:**
- [ ] Prefetch bilinçli uygulanmış

### Faz 196: Tailwind purge & unused CSS
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Yok`
**Dosya:** Tailwind 4 config, `globals.css`
**Yapılacaklar:**
- Kullanılmayan CSS'i ele; kritik CSS'i optimize et.
**Kabul kriteri:**
- [ ] CSS ağırlığı minimize

### Faz 197: preconnect/dns-prefetch denetimi
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Yok`
**Dosya:** `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- Yalnız gerçekten kullanılan origin'lere preconnect (fonts, unsplash); gereksizleri kaldır.
**Kabul kriteri:**
- [ ] Resource hint'ler yalın ve doğru

### Faz 198: Görsel CDN / uzak görsel politikası
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 13`
**Dosya:** `next.config.ts` remotePatterns
**Yapılacaklar:**
- Unsplash bağımlılığını azalt veya optimize; kritik görselleri yerelleştir.
**Kabul kriteri:**
- [ ] Kritik görseller kontrol altında

### Faz 199: ISR / statik üretim genelleme
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 120`
**Dosya:** route segment config'ler
**Yapılacaklar:**
- Mümkün olan her sayfayı statik/ISR yap (şu an çoğu `ƒ` dinamik); TTFB düşür.
**Kabul kriteri:**
- [ ] Statik/ISR sayfa oranı arttı

### Faz 200: Streaming SSR & Suspense
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 199`
**Dosya:** ağır sayfalar
**Yapılacaklar:**
- Suspense sınırlarıyla kademeli render; fold-üstü hızlı.
**Kabul kriteri:**
- [ ] İlk içerik daha erken boyanıyor

### Faz 201: Skeleton / loading durumları
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 200`
**Dosya:** `loading.tsx` dosyaları
**Yapılacaklar:**
- Route-level `loading.tsx` skeleton'lar (algılanan hız + CLS azalt).
**Kabul kriteri:**
- [ ] Ağır rotalarda skeleton var

### Faz 202: Lenis smooth-scroll performans denetimi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 188`
**Dosya:** `SmoothScroll.tsx`
**Yapılacaklar:**
- Lenis'in INP/scroll-jank etkisini ölç; düşük-güç cihaz/`prefers-reduced-motion` desteği.
**Kabul kriteri:**
- [ ] Smooth-scroll jank/INP'yi bozmuyor

### Faz 203: Framer Motion animasyon bütçesi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 188`
**Dosya:** animasyonlu bileşenler
**Yapılacaklar:**
- Fold-üstü ağır animasyonları hafiflet; `will-change` disiplinli; reduced-motion.
**Kabul kriteri:**
- [ ] Animasyonlar performansı düşürmüyor

### Faz 204: CustomCursor/NoiseOverlay maliyeti
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 188`
**Dosya:** `CustomCursor.tsx`, `NoiseOverlay.tsx`
**Yapılacaklar:**
- Sürekli çalışan efektlerin CPU/GPU maliyetini ölç; mobilde kapat.
**Kabul kriteri:**
- [ ] Efektler mobilde performansı bozmuyor

### Faz 205: Cache-Control & immutable varlıklar
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 36`
**Dosya:** `next.config.ts` (mevcut headers)
**Yapılacaklar:**
- Statik varlıklar için uzun cache (mevcut) doğrula; hashed asset'ler immutable.
**Kabul kriteri:**
- [ ] Statik varlıklar uzun süre cache'li

### Faz 206: Üçüncü-parti font/analytics bütçesi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 189`
**Dosya:** layout
**Yapılacaklar:**
- Toplam üçüncü-parti ağırlığını ölç ve sınırla.
**Kabul kriteri:**
- [ ] 3rd-party ağırlık bütçe içinde

### Faz 207: Mobil performans özel denetimi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 181-206`
**Dosya:** — (test)
**Yapılacaklar:**
- Kısıtlı 4G + orta cihazda Lighthouse; mobil-öncelik.
**Kabul kriteri:**
- [ ] Mobil Lighthouse Performans ≥ 90

### Faz 208: Lighthouse CI entegrasyonu
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 207`
**Dosya:** CI config (YENİ)
**Yapılacaklar:**
- PR'larda otomatik Lighthouse; eşik altı skorlarda uyarı.
**Kabul kriteri:**
- [ ] Lighthouse CI çalışıyor, eşikli

### Faz 209: Gerçek kullanıcı ölçümü (RUM/CrUX)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 20`
**Dosya:** WebVitals + GA4
**Yapılacaklar:**
- Saha CWV'yi (CrUX/GA4) izle; lab-saha farkını kapat.
**Kabul kriteri:**
- [ ] Saha CWV panosu mevcut

### Faz 210: Performans bütçesi dokümanı
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 181-209`
**Dosya:** `PERFORMANCE_BUDGET.md` (YENİ)
**Yapılacaklar:**
- JS/CSS/görsel/font başına ağırlık bütçeleri + izleme.
**Kabul kriteri:**
- [ ] Performans bütçesi belgelendi

---

# ♿ BÖLÜM I — UX, ERİŞİLEBİLİRLİK (A11Y) & TRUST (Faz 211–230)

> Amaç: Erişilebilirlik (hem yasal hem SEO/UX sinyali) ve güven sinyallerini güçlendirmek.
> A11y iyileştirmeleri semantik yapı üzerinden SEO'yu da besler.

### Faz 211: Otomatik a11y denetimi (baz)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Yok`
**Dosya:** — (axe/Lighthouse a11y)
**Yapılacaklar:**
- axe-core/Lighthouse ile tüm sayfa tiplerini tara; ihlalleri önceliklendir.
**Kabul kriteri:**
- [ ] A11y ihlal envanteri çıkarıldı

### Faz 212: ARIA rolleri & etiketleri
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 211`
**Dosya:** interaktif bileşenler (menü, modal, tabs, accordion)
**Yapılacaklar:**
- Doğru `aria-label`, `aria-expanded`, `role`; gereksiz ARIA'yı kaldır.
**Kabul kriteri:**
- [ ] İnteraktif öğeler doğru ARIA'lı

### Faz 213: Klavye navigasyonu
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 212`
**Dosya:** menü, modal, slider, form
**Yapılacaklar:**
- Tam klavye erişimi; modal focus-trap; ESC ile kapat.
**Kabul kriteri:**
- [ ] Tüm etkileşimler klavyeyle yapılabiliyor

### Faz 214: Focus görünürlüğü
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 213`
**Dosya:** `globals.css`
**Yapılacaklar:**
- Görünür focus halkaları (CustomCursor `cursor-none` ile çakışmayı çöz).
**Kabul kriteri:**
- [ ] Odak her zaman görünür

### Faz 215: Renk kontrastı
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 211`
**Dosya:** tema/renk değişkenleri
**Yapılacaklar:**
- Metin/arka plan kontrastı WCAG AA (özellikle koyu hero üstü metin).
**Kabul kriteri:**
- [ ] Kontrast oranları AA sağlıyor

### Faz 216: Skip-to-content linki
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 91`
**Dosya:** `src/app/[lang]/layout.tsx`
**Yapılacaklar:**
- "İçeriğe geç" skip link (klavye + ekran okuyucu).
**Kabul kriteri:**
- [ ] Çalışan skip link mevcut

### Faz 217: Semantik landmark & ekran okuyucu
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 91`
**Dosya:** layout + section
**Yapılacaklar:**
- Doğru landmark, gizli başlıklar, `sr-only` yardımcı metinler.
**Kabul kriteri:**
- [ ] Ekran okuyucu sayfayı mantıklı geziyor

### Faz 218: Form erişilebilirliği
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 212`
**Dosya:** `iletisim`, `QuoteModal`, `LoginModal`, newsletter
**Yapılacaklar:**
- `<label>` bağlama, hata mesajları `aria-describedby`, `required`/`aria-invalid`.
**Kabul kriteri:**
- [ ] Formlar erişilebilir ve doğru hata bildirimi

### Faz 219: `prefers-reduced-motion`
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 203`
**Dosya:** animasyonlar, Lenis
**Yapılacaklar:**
- Hareket azaltma tercihinde animasyon/smooth-scroll'u kıs.
**Kabul kriteri:**
- [ ] reduced-motion'da sakin deneyim

### Faz 220: Cookie consent i18n & UX
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 189`
**Dosya:** `CookieConsent.tsx`
**Yapılacaklar:**
- Hard-code Türkçe metni i18n'e bağla; granüler onay (analitik/pazarlama) + KVKK uyumu.
**Kabul kriteri:**
- [ ] Cookie banner i18n + granüler onay

### Faz 221: 404/error i18n doğrulama (UX)
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 17,18`
**Dosya:** `not-found.tsx`, `error.tsx`
**Yapılacaklar:**
- Hata sayfalarında yardımcı arama/link + i18n.
**Kabul kriteri:**
- [ ] Hata sayfaları iki dilde faydalı

### Faz 222: Trust rozetleri & sertifika görselleri
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 65`
**Dosya:** `CertificateBadgeGrid.tsx`, `public/images/badges`
**Yapılacaklar:**
- ISO/üyelik/sertifika görsellerini ekle (boş `badges` klasörü) + `hasCredential` schema.
**Kabul kriteri:**
- [ ] Sertifikalar görünür + schema

### Faz 223: Müşteri logoları & sosyal kanıt
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 13`
**Dosya:** `LogoTicker.tsx`, `references`
**Yapılacaklar:**
- Gerçek referans logoları (izinli) + `references` klasörünü doldur.
**Kabul kriteri:**
- [ ] Referans logoları gerçek ve alt'lı

### Faz 224: Güven içeriği (garanti, üyelikler)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 222`
**Dosya:** ana sayfa + hizmet
**Yapılacaklar:**
- Garanti, sigorta, oda/dernek üyelikleri; E-E-A-T güçlendirme.
**Kabul kriteri:**
- [ ] Güven unsurları içerikte

### Faz 225: İletişim netliği (NAP görünür)
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 117`
**Dosya:** `Footer`, `iletisim`, `QuickCallWidget`
**Yapılacaklar:**
- Telefon/adres/e-posta her yerde net + tıkla-ara/tıkla-yol.
**Kabul kriteri:**
- [ ] NAP görünür ve tıklanabilir

### Faz 226: KVKK/gizlilik erişilebilirliği
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Yok`
**Dosya:** politika sayfaları + footer linkleri
**Yapılacaklar:**
- KVKK, gizlilik, çerez, kullanım şartlarına kolay erişim + güncel tarih.
**Kabul kriteri:**
- [ ] Yasal sayfalar footer'dan erişilir, güncel

### Faz 227: HTTPS/HSTS & güvenlik algısı
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 36`
**Dosya:** `next.config.ts` headers
**Yapılacaklar:**
- HSTS + güvenli header'lar (mevcut X-Frame vb. doğrula).
**Kabul kriteri:**
- [ ] Güvenlik header seti tam

### Faz 228: Mobil dokunma hedefleri & UX
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 207`
**Dosya:** buton/link boyutları
**Yapılacaklar:**
- Min 44px dokunma hedefi; mobil menü/CTA ergonomisi.
**Kabul kriteri:**
- [ ] Mobil dokunma hedefleri yeterli

### Faz 229: Dil değiştirici UX & hreflang uyumu
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 3`
**Dosya:** `Header`, `LanguageContext`
**Yapılacaklar:**
- Dil değiştirici aynı sayfanın diğer dil URL'sine gitsin (hreflang ile tutarlı), ana sayfaya değil.
**Kabul kriteri:**
- [ ] Dil değiştirme eşdeğer sayfaya gidiyor

### Faz 230: A11y regresyon testi
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 211-229`
**Dosya:** CI (Faz 208 ile)
**Yapılacaklar:**
- CI'da otomatik a11y kontrolü; regresyonda uyarı.
**Kabul kriteri:**
- [ ] A11y CI kontrolü aktif

---

# 🌐 BÖLÜM J — OFF-PAGE, YEREL İŞARETLER & ANALİTİK (Faz 231–250)

> Amaç: Site dışı otorite (backlink, citation), yerel varlık (Google Business Profile) ve
> ölçüm/raporlama altyapısını kurmak. Bu bölümün çoğu **harici hesap/aksiyon** gerektirir.

### Faz 231: Google Business Profile kurulum/doğrulama
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 43`
**Dosya:** — (harici, GBP)
**Yapılacaklar:**
- İşletme profilini oluştur/doğrula; NAP sitedekiyle birebir; kategori/hizmet alanı.
**Kabul kriteri:**
- [ ] GBP doğrulandı ve yayında

### Faz 232: GBP kategori & öznitelikler
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 231`
**Dosya:** — (GBP)
**Yapılacaklar:**
- Birincil kategori (Property management company) + ikincil kategoriler; hizmet listesi; hizmet alanları (ilçeler).
**Kabul kriteri:**
- [ ] Kategoriler ve hizmet alanları eksiksiz

### Faz 233: GBP görsel & post akışı
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 231`
**Dosya:** — (GBP)
**Yapılacaklar:**
- Logo/kapak/işletme görselleri + düzenli GBP post (güncelleme/kampanya).
**Kabul kriteri:**
- [ ] GBP görselleri + düzenli post planı

### Faz 234: GBP yorum stratejisi
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 231`
**Dosya:** — (GBP) + site
**Yapılacaklar:**
- Yorum toplama akışı (memnun müşteri → yorum linki), yanıtlama politikası; site rating'iyle tutarlılık.
**Kabul kriteri:**
- [ ] Yorum toplama/yanıt süreci tanımlı

### Faz 235: NAP citation — TR dizinleri
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 117`
**Dosya:** — (harici)
**Yapılacaklar:**
- Türkiye yerel dizinleri (rehberler, sektörel listeler); NAP tutarlılığı; `sameAs`'e ekle.
**Kabul kriteri:**
- [ ] Öncelikli dizinlerde tutarlı NAP

### Faz 236: Sektörel & yerel dizin kayıtları
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 235`
**Dosya:** — (harici)
**Yapılacaklar:**
- Tesis/site yönetimi dernek/sektör dizinleri; oda üyeliği listelemeleri.
**Kabul kriteri:**
- [ ] Sektörel dizin kayıtları yapıldı

### Faz 237: Backlink stratejisi & hedef listesi
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 165`
**Dosya:** `OFFPAGE_PLAN.md` (YENİ)
**Yapılacaklar:**
- Konu-otoriter siteler, misafir yazı, kaynak-sayfa fırsatları; alıntılanabilir içerik (Faz 167 infografik) ile.
**Kabul kriteri:**
- [ ] Önceliklendirilmiş backlink hedef listesi

### Faz 238: Dijital PR & basın
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 237`
**Dosya:** — (harici)
**Yapılacaklar:**
- Basın bülteni/haber değeri olan veri (mini araştırma); yerel/sektörel yayınlar.
**Kabul kriteri:**
- [ ] En az 1 PR fırsatı yürütüldü

### Faz 239: Sosyal profil tutarlılığı & sameAs bağlama
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 60`
**Dosya:** `Footer` sosyal linkleri, schema `sameAs`
**Yapılacaklar:**
- LinkedIn/Instagram/Facebook/YouTube/X profillerini doğrula, profil bilgisi NAP ile tutarlı, schema'ya bağla.
**Kabul kriteri:**
- [ ] Sosyal profiller tutarlı ve schema'da

### Faz 240: GA4 event & dönüşüm kurulumu
`Zorluk: ⭐⭐` · `Süre: ~2s` · `Bağımlılık: Faz 10,20`
**Dosya:** `layout.tsx`, event tetikleyicileri
**Yapılacaklar:**
- Teklif-al, tıkla-ara, form gönderimi, telefon tıklaması → GA4 event/dönüşüm.
**Kabul kriteri:**
- [ ] Ana dönüşümler GA4'te izleniyor

### Faz 241: GSC entegrasyon & performans izleme
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 30,40`
**Dosya:** — (GSC)
**Yapılacaklar:**
- Sorgu/sayfa/CTR/pozisyon izleme; fırsat sorguları için içerik iyileştirme döngüsü.
**Kabul kriteri:**
- [ ] GSC performans panosu aktif

### Faz 242: Bing Webmaster & diğer motorlar
`Zorluk: ⭐` · `Süre: ~30dk` · `Bağımlılık: Faz 30`
**Dosya:** — (Bing)
**Yapılacaklar:**
- Bing Webmaster doğrulama + sitemap; Yandex (gerekiyorsa).
**Kabul kriteri:**
- [ ] Bing'de mülk + sitemap işlendi

### Faz 243: Dönüşüm hunisi & hedefler
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 240`
**Dosya:** GA4 keşif/funnel
**Yapılacaklar:**
- Giriş → hizmet → teklif hunisi; düşüş noktalarını iyileştir (SEO+CRO kesişimi).
**Kabul kriteri:**
- [ ] Huni raporu ve iyileştirme listesi

### Faz 244: Sıralama izleme (rank tracking)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 71`
**Dosya:** — (araç/GSC)
**Yapılacaklar:**
- Ana + yerel + long-tail keyword'ler için pozisyon izleme; haftalık trend.
**Kabul kriteri:**
- [ ] Keyword pozisyon takibi kuruldu

### Faz 245: Rakip analizi (sürekli)
`Zorluk: ⭐⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 128`
**Dosya:** — (analiz)
**Yapılacaklar:**
- Rakip içerik/backlink/yerel görünürlük; içerik ve off-page açıklarını kapat.
**Kabul kriteri:**
- [ ] Rakip GAP raporu + aksiyon

### Faz 246: Backlink profil sağlığı & disavow
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 237`
**Dosya:** — (GSC/araç)
**Yapılacaklar:**
- Toksik/spam linkleri izle; gerekirse disavow; anchor dağılımını doğal tut.
**Kabul kriteri:**
- [ ] Backlink profili izleniyor, temiz

### Faz 247: Yerel görünürlük ölçümü (harita paketi)
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 231`
**Dosya:** — (GBP Insights)
**Yapılacaklar:**
- Harita paketi görünürlüğü, "yol tarifi/arama" aksiyonları; ilçe bazlı performans.
**Kabul kriteri:**
- [ ] Yerel görünürlük metrikleri izleniyor

### Faz 248: KPI raporlama şablonu
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Faz 240-247`
**Dosya:** `SEO_KPI_REPORT_TEMPLATE.md` (YENİ — eski silinen sürümün güncellenmişi)
**Yapılacaklar:**
- Aylık KPI: organik trafik, dönüşüm, pozisyon, CWV, indeksleme, yerel görünürlük, backlink.
**Kabul kriteri:**
- [ ] Tekrarlanabilir KPI raporu şablonu

### Faz 249: Aylık SEO denetim döngüsü
`Zorluk: ⭐` · `Süre: ~1s` · `Bağımlılık: Faz 248`
**Dosya:** `SEO_AUDIT_CHECKLIST.md` (YENİ)
**Yapılacaklar:**
- Aylık kontrol listesi (teknik + içerik + off-page + CWV); `seo-audit.js` otomasyonuyla.
**Kabul kriteri:**
- [ ] Aylık denetim rutini tanımlı

### Faz 250: Yıllık strateji revizyonu & yol haritası
`Zorluk: ⭐` · `Süre: ~1.5s` · `Bağımlılık: Tümü`
**Dosya:** bu doküman + `SEO_ROADMAP.md`
**Yapılacaklar:**
- Sonuçlara göre stratejiyi revize et; yeni fırsatları (yeni hizmet/ilçe/AI kanalı) planla; V5 tohumları.
**Kabul kriteri:**
- [ ] Yıllık revizyon ve sonraki dönem yol haritası

---

## 📋 ÖZET TABLOSU

| Bölüm | Faz | Ana Çıktı | Öncelik |
|-------|-----|-----------|---------|
| A | 1–20 | Canonical/hreflang/OG/robots/schema temel düzeltmeleri | 🔴 Acil |
| B | 21–40 | Sitemap index, indeksleme kontrolü, IndexNow | 🔴 Yüksek |
| C | 41–70 | Merkezi schema fabrikası + tüm rich result'lar | 🟠 Yüksek |
| D | 71–100 | On-page + içerik derinliği + snippet hedefleme | 🟠 Yüksek |
| E | 101–130 | Programatik yerel sayfalar (ilçe × hizmet) | 🟡 Orta-Yüksek |
| F | 131–150 | GEO/AI görünürlük (llms.txt, entity) | 🟡 Orta |
| G | 151–180 | Blog cluster + içerik motoru | 🟡 Orta |
| H | 181–210 | Core Web Vitals + performans | 🟠 Yüksek |
| I | 211–230 | A11y + trust sinyalleri | 🟢 Normal |
| J | 231–250 | Off-page + yerel + analitik + raporlama | 🟢 Süregelen |

## 📅 ÖNERİLEN UYGULAMA SIRASI (dalgalar)

1. **Dalga 1 (Temel):** Bölüm A → B → C çekirdeği (canonical/hreflang/OG/schema).
2. **Dalga 2 (İçerik & Performans):** Bölüm D + H (on-page + CWV birlikte).
3. **Dalga 3 (Ölçekleme):** Bölüm E (programatik yerel) + G (blog cluster).
4. **Dalga 4 (Görünürlük):** Bölüm F (GEO/AI) + I (a11y/trust).
5. **Dalga 5 (Otorite & Ölçüm):** Bölüm J (off-page + analitik + raporlama) — süregelen.

> Bağımlılık kuralı: Faz 1 (`buildMetadata`) neredeyse tüm metadata fazlarının ön koşuludur;
> Bölüm C schema fabrikası, D/E/F/G'deki schema fazlarını besler. Önce altyapı, sonra ölçek.

## 🏆 BAŞARI METRİKLERİ (KPI)

| Metrik | Baz | 3 Ay | 6 Ay | 12 Ay |
|--------|-----|------|------|-------|
| Organik oturum | ölç | +%40 | +%120 | +%300 |
| İndekslenen sayfa | ~35 | +yerel | 300+ | 500+ |
| İlk sayfa keyword | ölç | +25 | +80 | +200 |
| Yerel harita paketi görünürlük | 0 | öncelikli ilçeler | çoğu ilçe | tam İstanbul |
| Lighthouse (Perf/SEO/A11y) | ölç | 90/100/90 | 92/100/95 | 95/100/95 |
| Core Web Vitals (saha) | ölç | LCP<2.5 | LCP<2.0 | tümü yeşil |
| AI motorlarında atıf | 0 | görünürlük | düzenli | referans kaynağı |

---

## 📝 NOTLAR & KAPSAM

- **Bu doküman planlamadır.** Her fazın kod uygulaması ayrı ayrı, kabul kriterleri doğrulanarak yapılır.
- **Mock Analytics ID'leri** (GA/Clarity/verification) kullanıcı isteğiyle şimdilik yerinde; Faz 10 altyapıyı hazırlar, gerçek değerler sonra girilir.
- **`og-image` dosyası** kullanıcı tarafından bilerek silindi; V4 dosyayı geri koymaz, dinamik `opengraph-image` route'u önerir (Faz 4–5).
- **`middleware` → `proxy`** göçü bu oturumda tamamlandı (`src/proxy.ts`); canonical/URL fazları bu yapıyla hizalıdır.
- Doküman yaşayan bir plandır; her dalga sonrası KPI'lara göre güncellenir (Faz 250).

<!-- SON -->


