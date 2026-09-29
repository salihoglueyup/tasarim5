# GÜNLÜK GELİŞTİRME RAPORU — PERFORMANS VE SEO UYGULAMA PLANI, 2. TUR (2026-09-29)

Kaynak plan: [SEO_PERFORMANS_UYGULAMA_PLANI_2026_09_28.md](../master-plans/SEO_PERFORMANS_UYGULAMA_PLANI_2026_09_28.md) — 1. tur raporu: [RAPOR_GUNLUK_PERFORMANS_SEO_2026_09_28_B.md](RAPOR_GUNLUK_PERFORMANS_SEO_2026_09_28_B.md).
Ölçüm: `docker-web:latest` üretim imajı ayrı porta (DB/Redis olmadan) kaldırılarak ana sayfa (`/tr`) ölçüldü; ayrıca SEOCU (seocu.com) ve Google PageSpeed Insights (Lighthouse, Moto G Power + Yavaş 4G) canlı sitede tarandı.

## SEOCU skoru

| Zaman | Skor | Not |
| :--- | :--- | :--- |
| Gün başı | 91/100 | 5 kontrol öncesi rapor (bir önceki deploy'u yansıtıyordu) |
| 1. düzeltme turu sonrası | 95/100 | çift preload + FAQPage şema/H1 uyumsuzluğu giderildi |
| 2. düzeltme turu sonrası | 92/100 | kalan title-siz linkler kapatıldı; düşüş PageSpeed canlı ölçüm varyansı, kod tarafında gerileme yok |

## Yapılanlar

1. **Çift preload (Hero + sprite)**: `Hero.tsx`'teki deprecated `priority={true}` (Next.js 16'da `preload`/`fetchPriority` ile çakışıyordu) kaldırıldı, `loading="eager"` + mevcut `fetchPriority="high"` bırakıldı; `layout.tsx`'teki elle eklenmiş sabit-boyutlu hero preload'u silinip Next'in kendi responsive (`imageSrcSet`) preload'una bırakıldı. Sprite ikon preload'u ham `<link>` yerine React 19'un otomatik dedupe eden `preload()` API'sine taşındı. Doğrulama (üretim HTML'i): hero-poster preload 2→**1**, sprite.svg preload 2→**1**.
2. **FAQPage şema/H1 uyumsuzluğu**: `KMKLawAssistantSeo.tsx`'teki FAQPage şemasının ana sayfa H1'iyle alakasız `name` alanı ("Kat Mülkiyeti Kanunu (KMK 634)...") kaldırıldı — Google için zorunlu değil, `mainEntity` yeterli. SEOCU raporu artık "Name/headline değerleri title ve ana H1 konusu ile uyumlu" diyor.
3. **Title etiketi olmayan linkler**: Ana sayfada 13 link (Hero'daki 2 CTA, BentoServices'teki 8 link — güvenlik/hesaplayıcı/teknik-bakım/tesis-yönetimi alt sayfaları/teklif-al, PersonnelDifference'daki istihdam-köprüsü, PreFooterCta ve ComparisonTable'daki teklif-al, KMKLawAssistantSeo'daki hukuk-danışmanlığı CTA'sı) `title` attribute'undan yoksundu; hepsine eklendi. SEOCU listesi 9-10 kalemden 0'a indi.
4. **PageSpeed/Lighthouse (mobil, Yavaş 4G) bulguları**: LCP 6,6 sn — Performans dışında Erişilebilirlik 96, Best Practices 100, SEO 100, Ajan Tabanlı Tarama 3/3.
   - **GA4 bant genişliği çakışması**: `AnalyticsScripts.tsx`'te `@next/third-parties/google`'ın `GoogleAnalytics` bileşeni, GTM/Clarity/FB Pixel'in aksine `shouldLoad` (idle/etkileşim sonrası gecikmeli yükleme) state'ini beklemeden sayfa açılır açılmaz `gtag.js`'i preload ediyordu — yavaş bağlantılarda bu, LCP görseliyle bant genişliği için yarışıyordu. Diğerleriyle aynı gecikmeli yükleme mantığına bağlandı.
   - **Kontrast (Erişilebilirlik)**: `--color-tertiary` (#86869B — SSS alt metinleri, arama placeholder'ı, küçük ikon butonları) beyaz zeminde ~3,6:1 kontrasta sahipti, WCAG AA'nın (küçük metin için) istediği 4,5:1'in altında. #707086'ya koyulaştırıldı (~4,8:1).
5. **Test/derleme durumu**: Her adımdan sonra `tsc --noEmit` temiz, `vitest run` 130 dosya / 1136 test yeşil, `docker-web:latest` build'i başarılı; her commit öncesi gerçek üretim imajı ayrı porta kaldırılıp curl ile doğrulandı.

## Kalanlar

- **`imageSrcSet` preload uyarıları (Hero + Logo)**: SEOCU'nun "href eksik" dediği 2 preload aslında Next.js 16'nın standart responsive-preload davranışı (web.dev/preload-responsive-images) — gerçek bir sorun değil, checker false positive'i.
- **GTM dns-prefetch "kullanılmıyor" uyarısı**: Kaynak muhtemelen kullanılıyor (GTM script'i JS ile enjekte edildiği için SEOCU'nun statik HTML taraması göremiyor) — checker sınırlaması, kod tarafında aksiyon yok.
- **Render-blocking CSS (~600 ms tasarruf, Lighthouse)**: `globals.css` + `fonts.css`'in standart `<link rel="stylesheet">` olarak yüklenmesi — Next'in CSS bundling'inin doğal maliyeti; kritik CSS ayrıştırma gibi daha büyük bir refactor gerektiriyor, bu turda dokunulmadı.
- **Kullanılmayan JS (~136 KiB) / Eski JavaScript polyfill (~12 KiB)**: Lighthouse tarafından işaretlendi, henüz incelenmedi.
- **AI içerik analizi önerileri** (kod değil, içerik/iş kararı): somut vaka analizi/rakamlar eklenmesi, video/infografik zenginleştirme, "Yöneticilerimiz Ne Diyor?" bölümünün gerçek proje/daire sayısıyla desteklenmesi — sahibin verisini bekliyor.
- **Altyapı (D)**: `n8n` DNS/Cloudflare proxy ayarları — kod dışı, kullanıcıda.

## Commit'ler (bu tur)

- `b8b659e8` — perf(seo): çift preload ve FAQPage şema/H1 uyumsuzluğu düzeltildi
- `79cae510` — seo(links): ana sayfa CTA linklerine title attribute eklendi
- `04e09a56` — seo(links): kalan title-siz 3 link için title attribute eklendi
- `67618df9` — perf(seo): GA4 gecikmeli yükleme ve WCAG AA kontrast düzeltmesi
