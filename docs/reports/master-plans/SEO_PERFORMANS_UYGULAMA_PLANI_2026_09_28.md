# SEO & PERFORMANS UYGULAMA PLANI (2026-09-28)

Kaynak: SEOCU raporu (yayındaki sürüm, performans 76/100 → "Sayfa Hız Analizi" bu koşuda ölçülemedi) + `docker-web:latest` üretim imajı üzerinde yapılan ölçümler.
Ölçüm araçları: `docs` dışında, geçici script'lerle (ana sayfa anatomisi, RSC flight dökümü, chunk modül dökümü).

## 1. Ölçüm Bulguları (ana sayfa, üretim imajı)

| Ölçüm | Değer | Yorum |
| :--- | :--- | :--- |
| HTML | 615 KB | Ana içerik metni ~29 KB; geri kalanı işaretleme + gömülü veri |
| RSC flight (`__next_f`) | **313 KB** | Bunun **~171 KB'ı çeviri sözlüğü** (`LanguageProvider` tüm sözlüğü istemciye gömüyor) |
| JSON-LD | 58 KB, 8 blok | 23.6 KB WebPage+ProfessionalService+VideoObject+Service, 17.8 KB Organization+WebSite, 2× FAQPage, ItemList, Dataset |
| İlk yükte JS | 6.9 MB toplam / 295 dosya (site geneli) | Ana sayfa 31 chunk referansı yüklüyor |
| **`8133-….js`** | **1.28 MB** (ham) | Ana sayfa dahil çoğu sayfada yükleniyor. İçinde KMK mevzuat gezgini, ihtarname şablonları, havuz parametreleri, ağaç/peyzaj verisi, ilçe verisi… (109 modül) |
| `2480`, `6483`, `4142` chunk'ları | 245–377 KB | Dil sözlükleri (`common.json`) |
| Material Symbols ikonları | 203 adet, ~2000 karakter metin | `arrow_forward`, `expand_more`… sayfa metnine sızıyor |
| H1 öncesi başlıklar | 8 (H3/H4) | Header menüsünden geliyor; H sayısı 88, seviye atlaması var |
| `<head>` dışı `<link rel=preload>` | 1 | Hero görseli preload'u body içinde |
| `og:title` | "Alo Yönetim" | `<title>` ile aynı değil |
| Meta keywords | var (içinde "iso 41001") | Google kullanmıyor |
| `AggregateRating` | var | Kuruluş sayfasında kendi kendine verilen puan |
| `ISO 41001` geçen kaynak dosya | 129 | Sahip olunmayan standart; iddia olarak duruyor |

### Kök neden #1 — Barrel import şişkinliği
`src/components/index.ts` tüm alt dizinleri (`seo`, `sections`, `modals`, `layout`, …) `export *` ile topluyor. **34 dosya `@/components`**, **56 dosya `@/components/seo`** barrel'ından import ediyor. `'use client'` bileşenler barrel üzerinden geldiği için, hiç kullanılmasalar bile sayfa bundle'ına giriyor. 1.28 MB'lık chunk'ın nedeni bu.

### Kök neden #2 — Sözlüğün istemciye gömülmesi
`LanguageProvider` başlangıç sözlüğünü prop olarak alıyor → RSC payload'ında ~171 KB (ar için ~200 KB). Ayrıca dil değişince `import(\`.../common.json\`)` ile 250–380 KB'lık chunk'lar iniyor.

### Kök neden #3 — İkonlar metin olarak basılıyor
Material Symbols ligature fontu: ikon adı DOM'da metin olarak duruyor (203 adet). Font yüklenene kadar ve botlar için kirli içerik.

## 2. Plan (öncelik, etki, risk)

### Faz A — Performans temeli (en büyük kazanç)
| Adım | İş | Beklenen kazanç | Risk |
| :--- | :--- | :--- | :--- |
| A1 | **Barrel importlarını doğrudan dosya importlarına çevir** (90 dosya; kodmod script'i ile). `@/components` ve `@/components/seo` barrel'ları yalnızca test/geriye uyumluluk için kalır. | 1.28 MB chunk'ın ana sayfa/çoğu sayfadan çıkması; ilk yük JS'inde en az %30–50 düşüş | Düşük–orta (derleme + testler yakalar) |
| A2 | **Sözlüğü sayfa başına daralt:** istemciye yalnızca `t()` ile kullanılan anahtarlar gitsin (namespace'li sözlük veya build-time anahtar çıkarımı). Diğer diller için `import()` yerine kısmi JSON. | RSC flight −150 KB; dil chunk'ları −%70 | Orta |
| A3 | **Ağır SEO/veri bileşenlerini `next/dynamic` ile ayır** (KMK gezgini, ihtarname şablonları, havuz/peyzaj araçları): yalnızca kullanıldıkları sayfalarda ve tarayıcıda yüklensin. | Kalan ağır modüller sayfalardan çıkar | Düşük |
| A4 | **Ana sayfayı sadeleştir:** ilk ekran dışı bölümleri tembel yükle; görünmeyen/tekrarlayan SEO bölümlerini kaldır (17 `<section>`, 88 başlık, 163 link). JSON-LD'yi 8 bloktan tek `@graph`'a ve gerçekten gerekli tiplere indir. | HTML −%30, LCP iyileşir | Orta (içerik kararı) |
| A5 | **Hero/LCP:** preload'u `<head>`'e taşı, `fetchPriority` yalnızca LCP görselinde, kullanılmayan `preconnect/dns-prefetch`'leri (`fonts.gstatic`, `unsplash`) kaldır. | LCP −0.3–0.8 sn | Düşük |

### Faz B — İçerik kirliliği ve erişilebilirlik
| Adım | İş |
| :--- | :--- |
| B1 | **Material Symbols'ü SVG'ye geçir** (kendi barındırılan, yalnızca kullanılan ~60 ikon; `aria-hidden` SVG bileşeni). DOM'da ikon metni kalmaz; Google Fonts bağımlılığı biter. |
| B2 | **Başlık hiyerarşisi:** header/mobil menü/footer başlıkları `p/div`; H1 tek; H2→H4 atlamaları düzelt; yorumcu adları H3 olmaktan çıksın. |
| B3 | Favicon linklerine `type`/`sizes`; görsellere `width/height`; `title`siz linkler. |
| B4 | 404 sayfasına benzersiz başlık + `noindex`. |

### Faz C — Güven, şema ve meta (içerik kararı gerektirir)
| Adım | İş | Karar |
| :--- | :--- | :--- |
| C1 | `AggregateRating` şemasını kaldır (kuruluş sayfasında kendi verdiğin puan Google kurallarına aykırı). Gerçek, sayfada görünen yorumlar gelince `Review` olarak geri eklenir. | Onay |
| C2 | Sahip olunmayan **ISO 41001** ifadesi 129 dosyadan temizlenir (`credentialClaimsGuard` kuralı genişletilir). | Onay |
| C3 | `og:title`/`twitter:title` = sayfa başlığı; description 155 karakter altına, doğrulanamayan rakamlar (%30, %99.2…) çıkarılır; meta keywords kaldırılır. | Onay (rakamlar) |
| C4 | Ana sayfadaki FAQ şeması: görünen sorularla birebir tek blok, veya tamamen kaldır (rich result yok). Şema başlığı H1 ile uyumlu. | — |
| C5 | Dış linkler: `chatgpt.com`, `perplexity.ai` → `nofollow` veya kaldır. | — |

### Faz D — Altyapı (kod dışı)
| Adım | İş |
| :--- | :--- |
| D1 | `n8n.aloyonetim.com.tr` kaydını Proxied yap; 80/443'ü yalnızca Cloudflare IP'lerine aç (gerçek IP sızıntısı). |
| D2 | Kaynak sunucudaki TLS sertifikasının otomatik yenilendiğini doğrula (Cloudflare kenar sertifikası zaten otomatik). |
| D3 | Cloudflare'de statik/sayfa önbellek kuralları, Brotli, HTTP/3; TTFB (1.09 sn) izleme. |

### Faz E — Doğrulama
- Her fazdan sonra: `tsc`, vitest, Docker build, `home_anatomy` ölçümü (HTML, flight, JS, ikon, başlık sayaçları) ile önce/sonra tablosu.
- Deploy sonrası: SEOCU + PageSpeed Insights (mobil) + Search Console "Sayfa deneyimi".

## 3. Hedefler (deploy sonrası, ana sayfa)
| Metrik | Şimdi | Hedef |
| :--- | :--- | :--- |
| HTML | 615 KB | < 300 KB |
| RSC flight | 313 KB | < 90 KB |
| İlk yük JS (ham) | ~2.3 MB (31 chunk) | < 900 KB |
| Ikon metni | 203 | 0 |
| Başlık sıra/atlama | H1 öncesi 8 başlık | 0 |
| JSON-LD | 58 KB / 8 blok | < 25 KB / 1–2 blok |
| Mobil performans | ~60–76 | 85+ |

## 4. Uygulama sırası
A1 → A5 → B1 → A2 → A3 → B2–B4 → C1–C5 → A4. Her adım ayrı commit; A1 ve B1 en çok dosyaya dokunan adımlardır (kodmod + testlerle).
