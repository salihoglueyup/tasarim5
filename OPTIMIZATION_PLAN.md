# 🚀 Alo Yönetim — MEGA Performans & Optimizasyon Planı (250 Faz)

> **Tarih:** 27 Temmuz 2026  
> **Versiyon:** 2.0  
> **Hedef:** Lighthouse 95+ | First Load JS < 150 KB | LCP < 1.5s | CLS 0 | INP < 50ms  
> **Kapsam:** Her katmanda agresif hız optimizasyonu — Bundle, Runtime, Network, Rendering, UX

---

## 🎯 Mevcut Durum Analizi (Tespitler)

| Dosya / Alan | Boyut / Sorun | Öncelik |
|---|---|---|
| `translations.ts` | **163 KB** — tüm diller tek dosyada, client'a gidiyor | 🔴 Kritik |
| `framer-motion` | **~130 KB gzip** — tam modül yükleniyor | 🔴 Kritik |
| `QuoteModal.tsx` | **30 KB** — tek modal, SSR'da bile yükleniyor | 🟠 Yüksek |
| `Header.tsx` | **25 KB** — devasa, mobil menü + masaüstü aynı bundle | 🟠 Yüksek |
| `Footer.tsx` | **24 KB** — saat widget, bülten formu hep yüklü | 🟡 Orta |
| `schemas.ts` | **19 KB** — tüm şemalar client'a gitmemeli | 🟡 Orta |
| `hero-poster.webp` | **582 KB** — çok büyük | 🔴 Kritik |
| `brand-film.mp4` | **2.3 MB** tek versiyon, mobil varyant yok | 🟠 Yüksek |
| Material Symbols Font | **~300 KB** — tam set yükleniyor | 🟠 Yüksek |
| `body transition-colors` | Layout thrashing riski | 🟡 Orta |

---

## BÖLÜM A: BUNDLE KÜÇÜltme & TREE-SHAKING (Faz 1–30)

### Faz 1 — Framer Motion → LazyMotion Dönüşümü
`layout.tsx`'e `<LazyMotion features={domAnimation} strict>` sarmalayıcı ekle. Tüm dosyalarda `import { motion }` → `import { m }` yap. **~60 KB tasarruf.**

### Faz 2 — Framer Motion: Kullanılmayan Hook Temizliği
`useSpring`, `useTransform`, `useScroll` sadece kullanıldığı bileşenlerden import edilsin. Barrel export'lardan çekme.

### Faz 3 — Framer Motion AnimatePresence İzolasyonu
`AnimatePresence` sadece modal/dropdown gibi conditional render yapılarında kullanılsın. Static section'lardan kaldır.

### Faz 4 — translations.ts Bölme (Kritik!)
163 KB'lık devasa dosyayı `tr.json` ve `en.json` olarak ayır. Sadece aktif dilin dosyasını `dynamic import` ile yükle. **~80 KB tasarruf (kullanılmayan dil yüklenmez).**

### Faz 5 — translations.ts: Sayfa Bazlı Chunk'lama
Her sayfanın çevirilerini ayrı dosyaya böl: `tr/home.json`, `tr/services.json`, `tr/blog.json`... Sadece ziyaret edilen sayfanın çevirileri yüklensin.

### Faz 6 — translations.ts: Kritik / Lazy Ayrımı
Header, Footer, Hero gibi her sayfada görünen çevirileri `common.json` olarak ayır (~5 KB). Geri kalanı lazy load.

### Faz 7 — QuoteModal Dynamic Import
`QuoteModal.tsx` (30 KB) → `dynamic(() => import(...), { ssr: false })` ile sadece butona tıklandığında yükle.

### Faz 8 — LoginModal Dynamic Import
LoginModal da aynı şekilde lazy load edilsin. Kullanıcı login butonuna basana kadar yüklenmesin.

### Faz 9 — CookieConsent Zaten Lazy ✅ (Doğrulama)
`dynamic()` ile yükleniyor. `ssr: false` olduğunu doğrula.

### Faz 10 — Ana Sayfa Below-the-fold Bileşenleri → ssr: false
ComparisonTable, AppShowcase, TestimonialSlider, CertificateBadgeGrid, Faq, PreFooterCta → `ssr: false` + skeleton placeholder.

### Faz 11 — Header.tsx Mobil Menü Lazy Split
Mobil menü (AnimatePresence + devasa dropdown) ayrı bir `MobileMenu.tsx` bileşenine taşı. `dynamic(() => ..., { ssr: false })` ile hamburger'a tıklanınca yükle.

### Faz 12 — Header.tsx Masaüstü Mega Menü Lazy Split
Mega menü dropdown'ları ayrı `MegaMenuDropdown.tsx`'e çıkar. Hover'da prefetch, click'te yükle.

### Faz 13 — Footer İstanbul Saati Widget'ı → requestIdleCallback
`setInterval(1000)` yerine `requestIdleCallback` + daha seyrek güncelleme (60 saniye).

### Faz 14 — Footer Bülten Formu Lazy Load
Bülten formu viewport'a girene kadar yüklenmemeli. `IntersectionObserver` ile lazy.

### Faz 15 — schemas.ts → Server-Only
`schemas.ts` (19 KB) sadece Server Component'lerde kullanılmalı. `'server-only'` import guard ekle. Client bundle'dan tamamen çıkar.

### Faz 16 — seo.ts → Server-Only
`seo.ts` (4 KB) de sadece metadata oluşturmak için. Server-only yap.

### Faz 17 — analytics.ts Lazy Import
Analytics sadece kullanıcı etkileşiminde gerekli. İlk yüklemede import etme, event tetiklendiğinde `import()`.

### Faz 18 — ab-test.ts Dead Code Kontrolü
Eğer aktif A/B testi yoksa bu modül bundle'dan çıksın.

### Faz 19 — Barrel Export Optimizasyonu
`components/index.ts` barrel file tree-shaking'i engelleyebilir. Turbopack/Webpack `sideEffects: false` olduğunu doğrula.

### Faz 20 — @next/third-parties Conditional Import
GA/Clarity env yoksa bu paket hiç import edilmesin. Layout'ta zaten conditional ama `import` statement'ı hala var.

### Faz 21 — Lenis Bundle Boyutu Kontrolü
`lenis` paketinin gzip boyutunu kontrol et. Alternatif: native CSS `scroll-behavior: smooth` + custom easing.

### Faz 22 — react-intersection-observer Gerekliliği
Framer Motion zaten `whileInView` desteği sunuyor. Bu paket gerçekten gerekli mi? Gereksizse kaldır.

### Faz 23 — Package.json: Kullanılmayan Dependency Audit
`npx depcheck` çalıştır. Kullanılmayan bağımlılıkları tespit edip kaldır.

### Faz 24 — next/dynamic vs React.lazy Karşılaştırması
Next.js 16'da hangisi daha verimli? Gerekirse geçiş yap.

### Faz 25 — Chunk Adlandırma Stratejisi
`webpackChunkName` veya Turbopack chunk naming ile debug kolaylığı.

### Faz 26 — Bundle Analyzer Kurulumu
`@next/bundle-analyzer` ekle, `ANALYZE=true npm run build` komutu tanımla.

### Faz 27 — Bundle Analyzer Rapor Çıkarma
İlk analiz raporunu çıkar, en büyük 10 chunk'ı belgele.

### Faz 28 — Source Map Stratejisi
Production'da `hidden-source-map` kullan (debug için ama client'a açık olmasın).

### Faz 29 — Package Lock Audit
`npm audit` çalıştır, güvenlik açıklı paketleri güncelle.

### Faz 30 — Minimum Bundle Hedefi Kontrolü
İlk yükleme JS < 150 KB hedefini ölç ve belgele.

---

## BÖLÜM B: GÖRSEL & MEDYA OPTİMİZASYONU (Faz 31–55)

### Faz 31 — Hero Poster Sıkıştırma
`hero-poster.webp` (582 KB) → 1920×1080, quality 75 WebP. **Hedef: < 120 KB.**

### Faz 32 — Hero Poster: AVIF Alternatifi
AVIF formatı WebP'den %30 daha küçük. `<picture>` ile AVIF → WebP → JPG fallback zinciri.

### Faz 33 — Hero Poster: Responsive Boyutlar
`srcSet` ile 640w, 1024w, 1920w varyantları oluştur. Mobil'de küçük poster yüklensin.

### Faz 34 — Hero Poster: Blur Placeholder (LQIP)
10×6 px blur hash oluştur, CSS `background-image` olarak inline et. Poster yüklenene kadar blur göster.

### Faz 35 — Hero Video: Mobil Varyant (720p)
FFmpeg: `ffmpeg -i brand-film.mp4 -vf scale=720:-2 -crf 28 -preset veryslow brand-film-mobile.mp4`  
**Hedef: < 600 KB.**

### Faz 36 — Hero Video: Masaüstü Optimize (1080p CRF 24)
`ffmpeg -i brand-film.mp4 -crf 24 -preset veryslow brand-film-desktop.mp4`

### Faz 37 — Hero Video: `<source media>` ile Cihaz Ayrımı
```html
<source src="/video/brand-film-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
<source src="/video/brand-film-desktop.mp4" type="video/mp4" />
```

### Faz 38 — Hero Video: WebM/AV1 Codec Alternatifi
AV1 codec ile %40 daha küçük video. Destekleyen tarayıcılara AV1 sun.

### Faz 39 — Hero Video: Intersection Observer ile Play/Pause
Video viewport dışına çıkınca pause et. CPU/pil tasarrufu.

### Faz 40 — Testimonial Avatar: next/image ile Optimize
Tüm avatar URL'leri `next/image` ile sarılsın. `width={64} height={64} quality={75}`.

### Faz 41 — Testimonial Avatar: Local Fallback
Unsplash URL'leri harici bağımlılık. Yerel optimize SVG placeholder veya WebP avatarları ekle.

### Faz 42 — Logo Görselleri: SVG Dönüşümü
`logo.webp`, `logo-horizontal.webp` → SVG'ye çevir (vektörel, sıfır KB ek yük).

### Faz 43 — Logo Görselleri: Inline SVG
Küçük logolar için SVG'yi doğrudan JSX'e embed et. HTTP isteği sıfır.

### Faz 44 — Badge Görselleri Audit
`public/images/badges/` klasörünü kontrol et. Boyut ve format optimizasyonu.

### Faz 45 — Service Görselleri Audit
`public/images/services/` klasörünü kontrol et.

### Faz 46 — Team Görselleri Audit
`public/images/team/` klasörünü kontrol et.

### Faz 47 — Reference Görselleri Audit
`public/images/references/` klasörünü kontrol et.

### Faz 48 — OG Image Optimize
`public/og-image.png` → WebP'ye çevir veya route-based dynamic OG image kullan.

### Faz 49 — Tüm `<img>` → `<Image>` Geçişi
Projede native `<img>` kullanan yer kaldı mı? Tamamını `next/image`'a geçir.

### Faz 50 — next/image: sizes Prop Ekleme
Tüm `<Image>` bileşenlerine doğru `sizes` prop'u ekle (responsive hint).

### Faz 51 — next/image: priority Prop Audit
Sadece LCP elemanına `priority` ver. Diğerlerinde olmamalı.

### Faz 52 — Favicon/Apple-icon Optimizasyonu
SVG favicon, apple-touch-icon boyut kontrolü.

### Faz 53 — Sprite Sheet: Tekrarlayan İkonlar
Birden fazla yerde kullanılan küçük görseller varsa tek sprite.

### Faz 54 — Image CDN Hazırlığı
Vercel/Cloudflare Image CDN header'ları ve cache stratejisi.

### Faz 55 — Lazy Image Loading Doğrulama
Tüm below-fold görsellerin `loading="lazy"` olduğunu doğrula.

---

## BÖLÜM C: FONT OPTİMİZASYONU (Faz 56–70)

### Faz 56 — Material Symbols: Kullanılan İkon Envanteri
Projedeki tüm `material-symbols-outlined` kullanımlarını grep'le, tam listeyi çıkar.

### Faz 57 — Material Symbols: Subset URL
Google Fonts `?text=` parametresiyle sadece kullanılan glyph'leri yükle. **~250 KB tasarruf.**

### Faz 58 — Material Symbols: Self-Host Alternatifi
Font dosyasını local'e indir, subset'le, `@font-face` ile yükle. CDN bağımlılığı kaldır.

### Faz 59 — Material Symbols → Inline SVG Dönüşümü (Kritik İkonlar)
Hero, Header, QuickCallWidget'taki kritik ikonları (5-10 adet) inline SVG'ye çevir. Font yüklenene kadar beklemek yerine anında görünsün.

### Faz 60 — Inter Font: Subset Kontrolü
`latin-ext` subset zaten var ✅. Kullanılmayan weight'leri (100, 200, 300, 900) kaldır.

### Faz 61 — Plus Jakarta Sans: Weight Optimizasyonu
`weight: ["400","500","600","700","800"]` — 800 gerçekten kullanılıyor mu? Gereksiz weight kaldır.

### Faz 62 — Font Display Swap Doğrulama
Her iki font'ta `display: 'swap'` var ✅. Font FOUT (Flash of Unstyled Text) kontrolü.

### Faz 63 — Font Preload: Kritik Font
En çok kullanılan font weight'i (600/700 Plus Jakarta) için `<link rel="preload">` ekle.

### Faz 64 — Font Fallback Metrik Eşleştirme
`adjustFontFallback` özelliğini kullan. System font → custom font geçişinde CLS'yi sıfırla.

### Faz 65 — Variable Font Değerlendirmesi
Plus Jakarta Sans variable font versiyonu var mı? Tek dosyayla tüm weight'ler.

### Faz 66 — Font Loading API ile Kontrol
`document.fonts.ready` ile font yüklenene kadar critical text'i gizleme stratejisi.

### Faz 67 — Woff2 Format Doğrulama
Google Fonts zaten woff2 sunuyor ✅. Self-host durumunda doğrula.

### Faz 68 — Font Cache Stratejisi
Font dosyaları `Cache-Control: immutable, max-age=31536000` ile cache'lensin.

### Faz 69 — IconFontLoader Optimizasyonu
`IconFontLoader.tsx` bileşeninin yükleme stratejisini incele. `requestIdleCallback` kullanıyor mu?

### Faz 70 — Font Boyut Raporu
Toplam font yükü (KB) hesapla ve belgele.

---

## BÖLÜM D: CSS OPTİMİZASYONU (Faz 71–90)

### Faz 71 — Critical CSS Extraction
Above-the-fold CSS'i inline `<style>` olarak head'e ekle. Geri kalanı async yükle.

### Faz 72 — Tailwind CSS Purge Doğrulama
Tailwind 4 otomatik purge yapıyor. Build çıktısındaki CSS boyutunu ölç.

### Faz 73 — Kullanılmayan CSS Sınıfları Tespiti
`PurgeCSS` veya Chrome Coverage aracıyla kullanılmayan CSS miktarını ölç.

### Faz 74 — CSS Custom Properties (Değişkenler) Audit
`globals.css`'teki tüm `--color-*`, `--spacing-*` değişkenlerinin gerçekten kullanılıp kullanılmadığını kontrol et.

### Faz 75 — Dark Mode CSS: Kullanılıyor mu?
Birçok bileşende `dark:` prefix var. Dark mode toggle varsa koru. Yoksa kaldır ve KB kazan.

### Faz 76 — body `transition-colors duration-500` Kaldırma
Body'de `transition-colors` → tüm child'lar etkileniyor. Sadece tema toggle'ı varsa `background-color` ile sınırla.

### Faz 77 — `cursor-none` Mobilde Gereksiz
Body'de `cursor-none` → Mobilde işe yaramaz ama CSS parse ediliyor. Media query ile sınırla.

### Faz 78 — `selection:bg-blue-500/30` Tutarlılık
Selection rengi `globals.css`'teki `::selection` ile çakışıyor mu? Tek kaynakta tutarlı ol.

### Faz 79 — Scrollbar CSS: Dark Mode Uyumu
Scrollbar renkleri dark mode'da güncelleniyor mu?

### Faz 80 — CSS contain Property
Bağımsız bölümlere (section) `contain: content` veya `contain: layout style` ekle. Paint scope'unu daralt.

### Faz 81 — CSS will-change Stratejisi
Animasyonlu elemanlar için `will-change: transform` ekle, animasyon bitince kaldır.

### Faz 82 — CSS Layer Sıralaması
`@layer` ile specificity kontrolü. Tailwind vs custom CSS çakışmalarını önle.

### Faz 83 — @media Sorgu Birleştirme
Tekrarlayan media query bloklarını birleştir (CSS boyutu azalır).

### Faz 84 — CSS Nesting Kontrolü
Modern CSS nesting kullanılabilir. Kod okunurluğu artar, boyut aynı kalır.

### Faz 85 — Backdrop-blur Performansı
`backdrop-blur-md`, `backdrop-blur-xl` → GPU-intensive. Mobilde `backdrop-blur` yerine `bg-opacity` kullan.

### Faz 86 — Box-shadow Optimize
Çok katmanlı `shadow-2xl` → Mobilde tek katman `shadow-md` yeterli.

### Faz 87 — Gradient Performansı
Çok karmaşık gradient'ler (Hero overlay gibi) → Solid renk fallback ekle.

### Faz 88 — CSS Minification Doğrulama
PostCSS/cssnano build pipeline'da çalışıyor mu? Doğrula.

### Faz 89 — Unused @keyframes Temizliği
`globals.css`'teki `shimmer` animasyonu kullanılıyor mu? Kullanılmıyorsa kaldır.

### Faz 90 — Final CSS Boyutu Raporu
Toplam CSS yükü (KB) hesapla ve belgele.

---

## BÖLÜM E: JAVASCRIPT RUNTIME OPTİMİZASYONU (Faz 91–120)

### Faz 91 — CustomCursor SSR Hydration Fix
`typeof window !== 'undefined'` → SSR'da hydration mismatch. `useEffect` + state ile yönet.

### Faz 92 — CustomCursor Mobilde Devre Dışı (Güvenli)
`useEffect` içinde `matchMedia('(pointer: coarse)')` ile kontrol. İlk render'da null dön.

### Faz 93 — CustomCursor: requestAnimationFrame Throttle
Her mousemove'da state güncellemek yerine RAF ile throttle et.

### Faz 94 — NoiseOverlay: Mobilde Kaldır
SVG noise overlay mobilde görsel etkisi düşük ama GPU layer oluşturuyor. `md:block hidden` yap.

### Faz 95 — NoiseOverlay: CSS contain
`contain: strict` ekle. Paint scope'unu izole et.

### Faz 96 — SmoothScroll: Lenis RAF İyileştirmesi
Sayfa scroll edilmediğinde RAF durmalı. `lenis.on('scroll', ...)` ile idle detection.

### Faz 97 — SmoothScroll: Mobilde Native Scroll
Mobilde Lenis gereksiz overhead. `(max-width: 768px)` → native scroll.

### Faz 98 — Statistics Counter: RAF Leak Kontrolü
Counter animasyonu bitmeden component unmount olursa RAF iptal ediliyor mu? `cancelAnimationFrame`.

### Faz 99 — Footer Saat: setInterval → requestIdleCallback
Her saniye güncelleme gereksiz. 60 saniyede bir güncelle veya `requestIdleCallback` kullan.

### Faz 100 — Event Listener Cleanup Audit
Tüm `useEffect`'lerde event listener cleanup'ı var mı? Memory leak taraması.

### Faz 101 — useState Birleştirme
Birden fazla ilişkili state'i `useReducer` veya tek `useState({ ... })` ile birleştir.

### Faz 102 — useCallback: Header onClick Handler'ları
Header'daki navigasyon handler'ları her render'da yeniden oluşuyor. `useCallback` ile memo.

### Faz 103 — React.memo: StatCard, Badge, Card
Pure presentational bileşenleri `React.memo` ile sar. Gereksiz re-render'ı önle.

### Faz 104 — useMemo: MENU_ITEMS Sabiti
Header'daki `MENU_ITEMS` her render'da yeniden oluşuyor. Modül seviyesinde sabit veya `useMemo`.

### Faz 105 — React DevTools Profiler ile Hotspot Tespiti
Dev mode'da profiler çalıştır. En çok render olan bileşenleri tespit et.

### Faz 106 — Console.log / Console.warn Temizliği
Production build'de console çıktısı olmamalı. Tüm debug log'ları temizle.

### Faz 107 — Error Boundary Performansı
`error.tsx`, `global-error.tsx` dosyaları minimal olmalı. Ağır import yok.

### Faz 108 — LanguageContext Re-render Optimizasyonu
`t()` fonksiyonu her render'da yeni referans mı oluşturuyor? `useCallback` ile memo.

### Faz 109 — QuoteContext Lazy Init
`QuoteProvider` → QuoteModal state'i sadece gerektiğinde init edilmeli.

### Faz 110 — Passive Event Listeners Audit
Tüm scroll/touch/wheel event'leri `{ passive: true }` mı? Tara ve düzelt.

### Faz 111 — Long Task Detection
`PerformanceObserver` ile 50ms üzeri görevleri tespit et.

### Faz 112 — Web Worker Değerlendirmesi
Ağır hesaplama var mı? (analytics data processing) → Web Worker.

### Faz 113 — requestIdleCallback Kullanımı
Düşük öncelikli işler (analytics, non-critical state update) → `requestIdleCallback`.

### Faz 114 — Intersection Observer: Threshold Optimizasyonu
`threshold: 0` (varsayılan) yerine ihtiyaca göre ayarla. Gereksiz callback tetiklenmesini önle.

### Faz 115 — Virtual Scrolling Değerlendirmesi
Blog listesi veya referans sayfası çok öğe içeriyorsa → virtualization.

### Faz 116 — Debounce: Arama ve Form Input
Form input'larında keystroke bazlı işlem varsa debounce uygula.

### Faz 117 — JSON.stringify Maliyeti
Schema JSON-LD render'ında `JSON.stringify` maliyeti yüksek. Server'da bir kez hesapla.

### Faz 118 — Map/Filter Chain Optimizasyonu
Uzun array zincirleri (`.map().filter().map()`) → tek `.reduce()` ile birleştir.

### Faz 119 — Object Spread Maliyeti
Derin object spread (`{...obj}`) → immutability için gerekli mi kontrol et.

### Faz 120 — Final JS Runtime Raporu
Toplam JS execution time ölç ve belgele.

---

## BÖLÜM F: NETWORK & CACHING (Faz 121–145)

### Faz 121 — Preconnect: Analytics Domain'leri
`<link rel="preconnect" href="https://www.google-analytics.com" />` ekle.

### Faz 122 — Preconnect: Clarity Domain
`<link rel="preconnect" href="https://www.clarity.ms" />` ekle.

### Faz 123 — DNS Prefetch Genişletme
`dns-prefetch` → connect.facebook.net (FB Pixel varsa).

### Faz 124 — Resource Hints: Prefetch Sonraki Sayfa
Anasayfadan en çok tıklanan sayfayı (hizmetler?) `<link rel="prefetch">` ile ön yükle.

### Faz 125 — Resource Hints: Prerender Değerlendirmesi
Chrome'un `<link rel="prerender">` desteği. Teklif-al sayfası için düşün.

### Faz 126 — HTTP Cache Headers: HTML Sayfalar
Dinamik sayfalar: `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`.

### Faz 127 — HTTP Cache Headers: Static Assets
JS/CSS: `Cache-Control: public, max-age=31536000, immutable` (Next.js varsayılan ✅).

### Faz 128 — HTTP Cache Headers: API Routes
Lead submission API → `Cache-Control: no-store`.

### Faz 129 — ETag Doğrulama
Static dosyalarda ETag header'ı var mı? 304 Not Modified ile bant genişliği tasarrufu.

### Faz 130 — Brotli Sıkıştırma
Vercel/hosting Brotli destekliyor mu? Gzip'den %15-20 daha küçük.

### Faz 131 — HTTP/2 Server Push Değerlendirmesi
Kritik CSS/JS dosyaları server push ile gönderilsin mi?

### Faz 132 — HTTP/3 (QUIC) Desteği
Hosting platformu HTTP/3 destekliyor mu? Daha hızlı bağlantı.

### Faz 133 — CDN Edge Caching
Vercel Edge Network veya Cloudflare ile statik varlıkları edge'de cache'le.

### Faz 134 — Image CDN (imgix/Cloudinary Değerlendirmesi)
Uzak görselleri CDN üzerinden on-demand optimize et.

### Faz 135 — Fetch Priority API
Kritik kaynaklar: `fetchpriority="high"`. Önemsizler: `fetchpriority="low"`.

### Faz 136 — Early Hints (103)
Server 103 Early Hints desteği. Kritik CSS/font'ları erken gönder.

### Faz 137 — Service Worker: Static Asset Cache
PWA için service worker. Offline'da statik sayfaları göster.

### Faz 138 — Service Worker: Runtime Cache Stratejisi
API çağrıları → stale-while-revalidate. Görseller → cache-first.

### Faz 139 — Service Worker: Background Sync
Form gönderimi başarısız olursa → background sync ile kuyrukla.

### Faz 140 — next.config.ts: poweredByHeader false
`poweredByHeader: false` → X-Powered-By header'ını kaldır (güvenlik + boyut).

### Faz 141 — next.config.ts: compress true
Gzip sıkıştırma aktif mi? Varsayılan true ama doğrula.

### Faz 142 — Stale-While-Revalidate Stratejisi
ISR (Incremental Static Regeneration) kullanılabilecek sayfaları tespit et.

### Faz 143 — API Route Edge Runtime
Lead submission API → Edge Runtime ile daha düşük latency.

### Faz 144 — Streaming SSR Değerlendirmesi
`loading.tsx` + React Suspense ile streaming SSR. İlk byte daha hızlı.

### Faz 145 — Network Waterfall Analizi
Chrome DevTools Network tab ile waterfall analizi yap. Sıralı yüklemeleri paralele çevir.

---

## BÖLÜM G: CORE WEB VITALS — LCP (Faz 146–165)

### Faz 146 — LCP Element Tespiti
Chrome DevTools → Performance → LCP element hangisi? (Hero poster? Video? H1?)

### Faz 147 — LCP Poster: Preload
`<link rel="preload" as="image" href="/images/hero-poster.webp" fetchpriority="high">` ekle.

### Faz 148 — LCP Poster: next/image priority
Poster'ı `<Image priority>` ile render et.

### Faz 149 — LCP: Server Response Time (TTFB)
TTFB < 200ms mi? Hosting performance kontrolü.

### Faz 150 — LCP: Render-Blocking Resources
Hangi CSS/JS dosyaları render'ı blokluyor? Chrome Coverage ile tespit et.

### Faz 151 — LCP: Font Loading Etkisi
Font swap sırasında LCP text'i görünür mü? `font-display: swap` doğrulaması.

### Faz 152 — LCP: CSS Inline Critical Path
Hero bölümünün CSS'ini inline `<style>` ile head'e taşı.

### Faz 153 — LCP: Hero H1 Optimizasyonu
H1 text node LCP ise → font preload + inline critical CSS ile hızlandır.

### Faz 154 — LCP: Image Decode
`decoding="async"` → poster decode'u main thread'i bloklamasın.

### Faz 155 — LCP: Layout Shift Öncesi
LCP elemanı render olmadan önce placeholder doğru boyutta mı? CLS kontrol.

### Faz 156 — LCP: Third-party Script Etkisi
GA, Clarity scriptleri LCP'yi geciktiriyor mu? `lazyOnload` doğrulaması.

### Faz 157 — LCP: Document Parse Time
HTML parse süresi. Gereksiz inline script var mı?

### Faz 158 — LCP: Main Thread Blocking
50ms+ main thread blocking → Long task analizi.

### Faz 159 — LCP: Connection Negotiation
TTFB yüksekse → DNS, TLS, TCP overhead kontrolü. Preconnect ile azalt.

### Faz 160 — LCP: Resource Load Delay
LCP kaynağı ne zaman discover ediliyor? `<link rel="preload">` ile erken keşif.

### Faz 161 — LCP: Element Render Delay
LCP kaynağı yüklendi ama render geç mi? JS blocking kontrolü.

### Faz 162 — LCP Budget: 1.5s Hedefi
Tüm LCP optimizasyonlarından sonra 1.5s altını hedefle.

### Faz 163 — LCP: Mobil Performans Testi
3G throttle ile mobil LCP ölç.

### Faz 164 — LCP: Farklı Sayfa Tipleri
Anasayfa, hizmet sayfaları, blog detay → her birinin LCP'sini ayrı ölç.

### Faz 165 — LCP: Field Data vs Lab Data
CrUX (Chrome User Experience Report) ile gerçek kullanıcı LCP'si.

---

## BÖLÜM H: CORE WEB VITALS — CLS (Faz 166–180)

### Faz 166 — CLS: Görsel Boyut Belirleme
Tüm `<Image>` ve `<img>` etiketlerinde `width` ve `height` var mı?

### Faz 167 — CLS: Font Swap Kayması
Font yüklendiğinde layout kayması oluyor mu? `adjustFontFallback` ile çöz.

### Faz 168 — CLS: Dynamic Content Injection
Bülten formu, CookieConsent gibi geç yüklenen elemanlar layout kaydırıyor mu?

### Faz 169 — CLS: Skeleton Placeholder Boyutları
Lazy load bileşenlerinin placeholder'ları doğru boyutta mı?

### Faz 170 — CLS: Ad/Banner Alanı Rezerve
Gelecekte reklam alanı eklenecekse şimdiden alan rezerve et.

### Faz 171 — CLS: Animasyon Kaynaklı Kayma
`whileInView` animasyonlarında `opacity: 0, y: 30` → başlangıç pozisyonu layout kayması yaratıyor mu?

### Faz 172 — CLS: Embed/iframe Boyutları
Harita embed'i varsa aspect-ratio ile boyut kilitle.

### Faz 173 — CLS: Tab/Accordion İçerik
Tab/Accordion açılışında sayfa kayıyor mu? `min-height` ile önle.

### Faz 174 — CLS: LogoTicker Layout
LogoTicker bileşeni render olurken boyut değişimi var mı?

### Faz 175 — CLS: Header Yükseklik Sabitliği
Scroll'da header değişiyor mu (sticky transition)? Yükseklik sabit mi?

### Faz 176 — CLS: QuickCallWidget Pozisyon
Fixed widget ilk render'da doğru pozisyonda mı?

### Faz 177 — CLS: Mobilde Farklı Layout Kontrolü
Mobil breakpoint'lerde CLS ayrı ölç.

### Faz 178 — CLS: Late-loading Web Font İkonlar
Material Symbols yüklenene kadar ikon alanı boş mu? Fallback boyut reservasyonu.

### Faz 179 — CLS: Cumulative Score Hesaplama
Sayfa boyunca toplam CLS < 0.05 hedefi.

### Faz 180 — CLS: DevTools Layout Shift Regions
Chrome DevTools → Rendering → Layout Shift Regions ile görselleştir.

---

## BÖLÜM I: CORE WEB VITALS — INP (Faz 181–195)

### Faz 181 — INP: Event Handler Profiling
En yavaş click/tap handler'ları tespit et. > 200ms olanları optimize et.

### Faz 182 — INP: Header Dropdown Etkileşim Süresi
Mega menü açılış süresi. Framer Motion animasyonu main thread'i blokluyor mu?

### Faz 183 — INP: QuoteModal Açılış Süresi
30 KB'lık modal'ın ilk açılış süresi. Dynamic import sonrası süre ölçümü.

### Faz 184 — INP: Form Input Responsiveness
QuoteModal form input'larında keystroke gecikme var mı?

### Faz 185 — INP: Scroll Event Handling
Scroll event'lerinde passive flag + debounce/throttle.

### Faz 186 — INP: Button Click Visual Feedback
`active:scale-95` gibi tactile feedback anında mı çalışıyor?

### Faz 187 — INP: Language Toggle Response
Dil değiştirme butonu kaç ms'de tamamlanıyor? Tüm sayfa re-render olabilir.

### Faz 188 — INP: Navigation (Route Change)
Sayfa değişim süresi. Prefetch ile hızlandır.

### Faz 189 — INP: Testimonial Slider Geçiş
Next/prev butonu → AnimatePresence + state update → kaç ms?

### Faz 190 — INP: Accordion Toggle
FAQ accordion açılışında kaç ms main thread bloklanıyor?

### Faz 191 — INP: CookieConsent Dismiss
Cookie banner kapatılırken gecikme var mı?

### Faz 192 — INP: Mobile Touch Events
Mobilde tap delay var mı? `touch-action: manipulation` ile 300ms delay'i kaldır.

### Faz 193 — INP: Yield to Main Thread
Uzun JavaScript görevlerini `scheduler.yield()` veya `setTimeout(0)` ile böl.

### Faz 194 — INP: React Concurrent Features
`useTransition` ile düşük öncelikli state update'leri. UI duyarlılığı artar.

### Faz 195 — INP: Budget < 50ms
Tüm etkileşimlerde < 50ms yanıt süresi hedefi.

---

## BÖLÜM J: ERİŞİLEBİLİRLİK PERFORMANSI (Faz 196–215)

### Faz 196 — Skip Navigation Link
Sayfa başına `<a href="#main-content" class="sr-only focus:not-sr-only">İçeriğe Geç</a>`.

### Faz 197 — ARIA Landmark Doğrulaması
`<main id="main-content">`, `<nav>`, `<footer>` kontrolü.

### Faz 198 — Focus Trap: Modal'lar
Modal açıkken Tab ile focus modal dışına çıkmasın.

### Faz 199 — Focus Visible Stilleri
`:focus-visible` zaten var ✅. Kontrast ve görünürlük kontrolü.

### Faz 200 — Kontrast Oranı Kontrolü
`--color-tertiary` (#86869B) → beyaz üzerinde 4.5:1 mı? WCAG AA doğrula.

### Faz 201 — Alt Text Anlamlılık Kontrolü
Tüm `alt` text'leri anlamlı ve açıklayıcı mı?

### Faz 202 — Form Label Eksikliği Tespiti
Tüm `<input>`'ların `<label>` veya `aria-label`'ı var mı?

### Faz 203 — aria-required ve aria-invalid
Form alanlarında doğrulama durumu bilgisi.

### Faz 204 — Tab Order Mantıksal Sıra
Tab sırası görsel sırayla uyuşuyor mu?

### Faz 205 — Screen Reader Testi
NVDA/VoiceOver ile kritik akışları test et.

### Faz 206 — Reduced Motion: Framer Motion
`prefers-reduced-motion: reduce` durumunda animasyonlar devre dışı mı? ✅ CSS'te var, JS'te de kontrol et.

### Faz 207 — Reduced Motion: Lenis
Lenis zaten kontrol ediyor ✅. Doğrula.

### Faz 208 — Reduced Motion: Video Autoplay
Hareket hassasiyeti olan kullanıcılar için video autoplay'i durdur.

### Faz 209 — Color Blind Friendly Palette
Renk körlüğü simülatörleriyle UI'ı kontrol et.

### Faz 210 — Touch Target Boyutu
Mobilde tıklanabilir alanlar minimum 44×44px mi?

### Faz 211 — Heading Hierarchy (h1 → h6)
Her sayfada tek h1, mantıksal heading sıralaması.

### Faz 212 — Language Attribute
`<html lang="tr">` / `<html lang="en">` doğru ayarlanıyor ✅.

### Faz 213 — Print Stylesheet
Yazdırma görünümü (basılı teklif vb.) için `@media print` CSS.

### Faz 214 — Axe/Lighthouse Accessibility Audit
`npx axe` veya Lighthouse Accessibility puanı → 95+ hedef.

### Faz 215 — WCAG 2.2 AA Compliance Checklist
Tüm kriterleri tek tek kontrol et ve belgele.

---

## BÖLÜM K: PRODUCTION HARDENING (Faz 216–240)

### Faz 216 — .env.example Oluşturma
Tüm `NEXT_PUBLIC_*` değişkenlerini belgele.

### Faz 217 — CSP (Content Security Policy)
`next.config.ts`'e CSP header ekle.

### Faz 218 — Subresource Integrity (SRI)
3rd-party script'lere `integrity` hash ekle.

### Faz 219 — X-DNS-Prefetch-Control
`X-DNS-Prefetch-Control: on` header.

### Faz 220 — Feature Policy Genişletme
`Permissions-Policy` → accelerometer, gyroscope vb. kısıtla.

### Faz 221 — Error Page UX İyileştirmesi
404/500 sayfalarında navigasyon, arama ve popüler linkler.

### Faz 222 — Scroll-to-Top Butonu
Uzun sayfalarda sağ alt "Yukarı Çık" butonu.

### Faz 223 — Page Transition Progress Bar
Sayfa geçişlerinde üst bar animasyonu.

### Faz 224 — Skeleton Loading States
Tüm lazy bileşenler için shimmer/skeleton placeholder.

### Faz 225 — Optimistic UI Updates
Form gönderimlerinde anında başarı feedback'i, arka planda API çağrısı.

### Faz 226 — Connection Speed Detection
`navigator.connection` ile yavaş bağlantıda video/animasyonu kapat.

### Faz 227 — Memory Leak Detection
Chrome DevTools Memory tab ile heap snapshot karşılaştırma.

### Faz 228 — Performance Budget Enforcement
CI/CD'de bundle boyutu threshold: PR'da limitin üstüne çıkarsa uyar.

### Faz 229 — Lighthouse CI GitHub Action
Her PR'da otomatik Lighthouse testi. Score < 90 ise fail.

### Faz 230 — Sentry/Error Tracking Hazırlığı
Production hata izleme altyapısı.

### Faz 231 — Real User Monitoring (RUM)
Web Vitals gerçek kullanıcı metrikleri izleme.

### Faz 232 — A/B Test Performans Etkisi
A/B test script'leri render'ı geciktiriyor mu?

### Faz 233 — Third-party Script Audit
Tüm 3rd-party script'lerin toplam etkisini ölç.

### Faz 234 — Security Headers Final Audit
OWASP header checklist ile tüm güvenlik header'larını doğrula.

### Faz 235 — robots.txt Final Doğrulama
Crawl budget optimizasyonu. Gereksiz path'leri blokla.

### Faz 236 — sitemap.xml Performans Etkisi
Sitemap boyutu. Büyükse sitemap index kullan.

### Faz 237 — RSS Feed Doğrulama
`/feed.xml` → W3C Feed Validator ile test et.

### Faz 238 — Build Süresi Optimizasyonu
Turbopack build süresi hedefi < 10s.

### Faz 239 — Docker/Deploy Optimizasyonu
Multi-stage Docker build ile minimal image.

### Faz 240 — Production Checklist Final
TODO/MOCK temizliği, env doğrulama, son build testi.

---

## BÖLÜM L: ÖLÇÜM, TEST & RAPORLAMA (Faz 241–250)

### Faz 241 — Lighthouse Lab Test: Anasayfa
Desktop + Mobile Lighthouse puanları.

### Faz 242 — Lighthouse Lab Test: Hizmet Sayfası
İç sayfa performans ölçümü.

### Faz 243 — Lighthouse Lab Test: Blog Detay
İçerik ağırlıklı sayfa performansı.

### Faz 244 — WebPageTest Tam Analiz
Filmstrip, waterfall, CPU throttle ile detaylı test.

### Faz 245 — GTmetrix Raporu
Tam sayfa yükleme süresi ve optimizasyon önerileri.

### Faz 246 — Chrome UX Report (CrUX)
Gerçek kullanıcı verileriyle Core Web Vitals.

### Faz 247 — Mobil 3G Simulasyon Testi
Slow 3G ile tüm sayfaları test et.

### Faz 248 — Rakip Karşılaştırma
En yakın 3 rakibin Lighthouse puanlarıyla karşılaştır.

### Faz 249 — Optimizasyon Öncesi/Sonrası Karşılaştırma Raporu
Tüm metrikleri tablo halinde belgele.

### Faz 250 — Sürekli İzleme Planı
Haftalık Lighthouse CI + aylık CrUX raporu altyapısı.

---

## 📊 Öncelik Matrisi

| Öncelik | Fazlar | Tahmini Kazanç |
|---|---|---|
| 🔴 **Kritik** (Hemen yap) | 1, 4-6, 7, 10-11, 31, 56-59 | ~200 KB bundle + ~400 KB medya tasarrufu |
| 🟠 **Yüksek** (İlk hafta) | 2-3, 13, 15-17, 35-37, 76, 91-94 | ~50 KB bundle + runtime iyileştirme |
| 🟡 **Orta** (İkinci hafta) | 20-23, 40-49, 71-73, 96-99 | Medya + CSS optimizasyonu |
| 🟢 **Düşük** (Sürekli) | 100-120, 196-215, 241-250 | Polish + monitoring |

## 🎯 Hedef Metrikler

| Metrik | Mevcut (Tahmin) | Hedef | Agresif Hedef |
|---|---|---|---|
| **First Load JS** | ~350 KB | < 150 KB | < 100 KB |
| **LCP** | ~3.5s | < 2.0s | < 1.5s |
| **CLS** | ~0.15 | < 0.05 | 0 |
| **INP** | ~150ms | < 75ms | < 50ms |
| **TTFB** | ~400ms | < 200ms | < 100ms |
| **Lighthouse Perf** | ~70 | 90+ | 95+ |
| **Lighthouse Access.** | ~85 | 95+ | 100 |
| **Total Page Weight** | ~1.5 MB | < 800 KB | < 500 KB |
| **Build Time** | ~15s | < 10s | < 5s |
