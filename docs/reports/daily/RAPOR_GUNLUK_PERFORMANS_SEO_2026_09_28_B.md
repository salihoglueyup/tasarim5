# GÜNLÜK GELİŞTİRME RAPORU — PERFORMANS VE SEO UYGULAMA PLANI, 1. TUR (2026-09-28, akşam)

Kaynak plan: [SEO_PERFORMANS_UYGULAMA_PLANI_2026_09_28.md](../master-plans/SEO_PERFORMANS_UYGULAMA_PLANI_2026_09_28.md).
Ölçüm: `docker-web:latest` üretim imajı ayrı porta (DB/Redis olmadan) kaldırılarak ana sayfa (`/tr`) ölçüldü.

## Önce / Sonra (ana sayfa, üretim imajı)

| Metrik | Önce | Sonra |
| :--- | :--- | :--- |
| HTML | 615 KB | **405 KB** |
| RSC flight (`__next_f`) | 313 KB | **105 KB** |
| İlk yükte JS (ham) | ~2.9 MB+ (1.28 MB'lık tek chunk dahil, 31 chunk referansı) | **979 KB** (20 dosya) |
| Sayfa metnine sızan ikon adı | 203 (`arrow_forward`, `expand_more`…) | **0** |
| H1'den önce gelen başlık | 8 (footer başlıkları) | **0** (H1 ilk sırada) |
| Başlık seviye atlaması | 1 | **0** |
| Suspense iskeleti (`<template id="B:0">`), içerik footer'dan sonra akıyordu | var | **yok** |
| `og:title` | "Alo Yönetim" | sayfa başlığıyla aynı |
| `AggregateRating` şeması | var (4.9 / 340) | **yok** |
| `<meta name="keywords">` | var (içinde "iso 41001") | **yok** |
| Body içinde `<link>` | 1 (logo preload) | **0** |
| Google Fonts'a bağımlılık | build + çalışma zamanı | **yok** (fontlar ve ikonlar kendi alan adımızdan) |

## Yapılanlar
1. **Barrel importları** (`@/components`, `@/components/seo`): 82 dosyada 121 import, TypeScript checker'lı kodmod ile doğrudan dosya importuna çevrildi. Ana sayfadan 1.28 MB'lık gereksiz chunk çıktı.
2. **Ikonlar**: 270 dosyada 1427 `material-symbols-outlined` span'i `<Icon />` (SVG sprite, 359 ikon, 154 KB ham / ~55 KB gzip, tek önbelleklenebilir dosya) oldu. Boyut davranışı eskisiyle aynı (24 px). `icon.test.ts` her sabit ikon adının sprite'ta olmasını ve eski span kalmamasını denetler.
3. **Fontlar** (önceki commit): Inter, Plus Jakarta Sans, Cairo `public/fonts` altında; Render/sunucu build'inin Google'a çıkamaması sorunu kalıcı çözüldü.
4. **Sözlük payload'ı**: Türkçe sözlük zaten istemci paketinde olduğundan RSC payload'ına tekrar yazılmıyor (−171 KB). Kodda hiçbir yerde kullanılmayan 477 çeviri anahtarı 4 dilden silindi; 152 sayfa × 4 dil taranarak ham anahtar sızıntısı olmadığı doğrulandı.
5. **Sayfa geçişi**: SSR içeriğini `opacity:0` ile gizleyen framer-motion `template.tsx` yerine JS'siz CSS animasyonu (LCP'yi hidrasyona bağımlı olmaktan çıkardı).
6. **Statik üretim + iskelet**: 9 genel sayfaya `generateStaticParams` (+`revalidate`); genel sayfalardaki `loading.tsx` Suspense sınırı kaldırıldı (admin altına taşındı) → içerik DOM sırasında, HTML'de footer'dan önce.
7. **Güven/şema**: `AggregateRating` ve yıldız arayüzü kaldırıldı (uydurma yorumlu, kullanılmayan `GoogleReviewsWidget` silindi); ISO 41001 (ve 9001/27001) uyum/belge iddiaları 99 dosyadan temizlendi, `credentialClaimsGuard`'a `iso41001-compliance-claim` kuralı eklendi.
8. **Meta/HTML**: ana sayfa açıklaması ≤155 karakter ve iddiasız; meta keywords yayınlanmıyor; footer başlıkları paragraf, SSS/yorum başlık seviyeleri düzeltildi; 404 için benzersiz başlık + noindex; favicon `type`; "yapay zekaya sor" dış linklerine `nofollow`; logo preload/`fetchPriority` kaldırıldı; `/icons` önbellek başlığı ve sprite preload'u.
9. Test durumu: 130 dosya / 1136 test geçiyor, `tsc` temiz, Docker build başarılı.

## Kalanlar
- **JSON-LD**: ana sayfada hâlâ 8 blok / 57 KB (Organization+WebSite her sayfada 17.8 KB); tek `@graph`'a indirme ve gereksiz tipleri kırpma yapılmadı.
- **FAQPage**: ana sayfada duruyor (yalnızca görünen sorular; zengin sonuç yok). Karar bekliyor.
- **Ana sayfa sadeleştirme**: 17 bölüm / 79 başlık / 163 link; alt bölümlerin tembel yüklenmesi ve tekrarlayan SEO bölümlerinin azaltılması yapılmadı.
- **Ağır SEO bileşenleri** `next/dynamic`: barrel temizliğinden sonra ana sayfadan çıktı; diğer sayfalarda ayrıca ölçülmedi.
- **ISO 41001**: standardı anlatan içerikte (rehber, sözlük, hub referans linkleri) ISO 41001 geçmeye devam ediyor (ana sayfada 9 yer) — bilinçli; uyum/belge iddiaları temizlendi.
- **Öncesinden kalma bozuk metinler**: kaynakta `Alo Yönetimör.`, `Alo Yönetim550 TL` gibi yapışık/bozuk metin örnekleri var (eski otomatik değişimlerden); ayrı bir temizlik turu gerekiyor.
- **Sahte/yer tutucu görünen içerik**: "Ahmet Yılmaz" vb. yorumcu ve ekip kayıtları, çelişen rakamlar (müdahale süresi, tesis sayısı, tahsilat oranı) sahibinin gerçek verisini bekliyor.
- **Altyapı (D)**: `n8n` DNS kaydını Proxied yapma, 80/443'ü yalnızca Cloudflare IP'lerine açma, TLS yenilemeyi doğrulama, önbellek kuralları — kod dışı, kullanıcıda.
