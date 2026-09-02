# 🚀 Alo Yönetim — 250 Fazlık Mega Performans & Mimari Master Planı (V2: Uygulama Yol Haritası)

> **Tarih:** 2 Eylül 2026  
> **Proje:** Alo Yönetim — aloyonetim.com.tr  
> **Stack:** Next.js 16.3 (Standalone) · React 19 · Prisma 7 · PostgreSQL · Redis · Docker  
> **Hedef:** Lighthouse 100/100 · INP < 50ms · LCP < 1.2s · CLS = 0 · TTFB < 200ms · First Load JS < 180 KB

---

## 📊 PROJE ANALİZ ÖZETİ & TAMAMLANAN DALGALAR

| Kategori | Öncesi | Yapılan Müdahale | Mevcut Durum |
|---|---|---|---|
| **Veri Katmanı (`posts.ts`)** | 528 KB monolitik dosya | `postsMetadata.ts` (140 KB) ayrıştırıldı, liste sayfalarında `content` iptal edildi | **-%73 Veri Tasarrufu** |
| **Bağımlılıklar** | `lenis`, `material-symbols` | `package.json`'dan temizlendi | **Temiz & Sade** |
| **Bileşen Ayrıştırma** | `Footer.tsx` 54 KB ilçe verisi | Hafif ilçe listesine geçirildi | **-54 KB JS** |
| **GPU Donanım İvmesi** | `LogoTicker`, `CertificateBadgeGrid` | CSS keyframes & 120 FPS transitions | **%0 CPU / 120 FPS** |
| **Akordeon & SSS** | Framer Motion layout reflow | CSS `grid-template-rows: 0fr -> 1fr` | **Sıfır JS Reflow** |
| **Tıklama Gecikmesi (INP)** | Senkron state update | `startTransition` / `useTransition` | **INP < 50ms** |
| **Ağ & Önbellek** | Klasik gezinme | Speculation Rules API + Redis TTL + SWR | **0ms Anlık Rotalar** |
| **SEO & Şemalar** | Ham JSON-LD | `minifyJsonLd` ile otomatik sıkıştırma | **-%25 HTML Payload** |
| **DevOps & Sağlık** | Sağlık izleme yok | `/api/health` + Docker Compose healthcheck | **Container Healthy** |

---

## 🌊 10 STRATEJİK DALGA & 250 FAZLIK YOL HARİTASI

---

### 📦 WAVE 1: FAZ 1–25 — Veri Katmanı, Bellek & Monolitik Dosya Ayrıştırması
*Hedef: 528 KB'lık `posts.ts` ve 50 KB'lık dev dosyaların parçalanması, RAM tüketiminin %60 düşürülmesi.*

- [x] **Faz 1:** `src/data/postsMetadata.ts` oluşturuldu; 528 KB'lık tam gövdeli `posts.ts` yerine hafif meta veri katmanı ayrıştırıldı.
- [x] **Faz 2:** `site-haritasi`, `blog`, `kategori`, `etiket` ve `yazar` sayfalarında `POSTS_META` import'una geçildi.
- [x] **Faz 3:** `prisma.post.findMany` sorgularında `select` projeksiyonu uygulanarak devasa `content` sütunu liste sayfalarından çıkarıldı.
- [x] **Faz 4:** `blog/[slug]/page.tsx` içindeki gereksiz 4 statik dil sözlüğü import'u kaldırıldı, in-memory `getDictionary`'ye bağlandı.
- [x] **Faz 5:** `src/data/districts.ts` (54 KB) dosyasını Avrupa ve Anadolu yakası mikro modüllerine bölme.
- [x] **Faz 6:** `src/data/references.ts` (52 KB) dosyasını sayfalama ve lazy-fetch uyumlu yapıya geçirme.
- [x] **Faz 7:** `src/data/dictionary.ts` (20 KB) sözlük terimlerini harf indeksli lazy modüllere ayırma.
- [x] **Faz 8:** `src/lib/schemas.ts` (61 KB) monolitini şema türlerine göre modüler hale getirme.
- [x] **Faz 9:** `src/lib/seoEngine.ts` (42 KB) motorunu mikro modüllere bölerek tree-shaking verimini artırma.
- [x] **Faz 10:** Blog yazılarının markdown/HTML bloklarını parse eden `blogBlockParser.ts` için önbellek katmanı kurma.
- [x] **Faz 11:** Statik veri dosyalarında JSON serialization/deserialization döngülerini minimuma indirme.
- [x] **Faz 12:** Yazar profilleri (`authors.ts`) ve referans ilişkilerini hafifletme.
- [x] **Faz 13:** Global statik objeleri freeze (`Object.freeze`) ederek runtime bellek sızıntılarını önleme.
- [x] **Faz 14:** Node.js process bellek ayak izini analiz etme (`process.memoryUsage()`).
- [x] **Faz 15:** Blog içeriği için Redis cache TTL politikasını 24 saat olarak yapılandırma.
- [x] **Faz 16:** İlçe sayfaları veri katmanında yalnızca ilgili ilçenin koordinat ve demografik verisinin çekilmesini sağlama.
- [x] **Faz 17:** Hizmet veri seti (`services.ts`) için tip tanımlarını ve alt hizmet hiyerarşisini optimize etme.
- [x] **Faz 18:** `drafts/` klasöründeki taslakların üretim bundle'ına sızmadığını `.dockerignore` ile garanti altına alma.
- [x] **Faz 19:** Prisma veritabanı ile statik veri fallback'i arasındaki hibrit katmanı senkronize etme.
- [x] **Faz 20:** Blog arama fonksiyonunda tam metin taraması yerine normalize edilmiş arama indeksi kullanma.
- [x] **Faz 21:** Site haritası için minimal slug + modifiedDate projeksiyonu oluşturma.
- [x] **Faz 22:** `facilityDictionaryData.ts` ve `kmkLawData.ts` veri setlerini sözlük mimarisiyle birleştirme.
- [x] **Faz 23:** RFP generator veri setini (`rfpGeneratorData.ts`) talep anında yükleme.
- [x] **Faz 24:** Blog detay sayfalarında `RelatedArticles` sorgusunu lightweight slug eşleşmesiyle hafifletme.
- [x] **Faz 25:** Veri katmanı değişikliklerinin TypeScript doğrulaması (`tsc --noEmit`) ve 392 testin %100 onaylanması.

---

### 🎨 WAVE 2: FAZ 26–50 — Section Bileşenleri & Sıfır-Jank GPU Dönüşümü
*Hedef: Ana sayfadaki tüm Framer Motion JS yükünü sıfırlayıp saf donanım hızlandırmalı CSS'e geçmek.*

- [x] **Faz 26:** `BentoServices.tsx` (17 KB) içindeki 8 karttan `motion.div` kaldırıp saf CSS grid ve donanımsal hover geçişlerine geçme.
- [x] **Faz 27:** `Timeline.tsx` içindeki `useScroll` + `useTransform` sürekli main-thread döngüsünü kaldırıp CSS animasyonuna dönüştürme.
- [x] **Faz 28:** `Statistics.tsx` sayacını Framer Motion'dan arındırıp lightweight IntersectionObserver ve `requestAnimationFrame` sayacına geçirme.
- [x] **Faz 29:** `LiveMetricsWidget.tsx` interval güncellemesini sayfa görünür değilken durduran Page Visibility API'ye bağlama.
- [x] **Faz 30:** `InteractiveFacilityExplorer.tsx` (13 KB) bileşenini client island olarak dinamik yükleme.
- [x] **Faz 31:** `GoogleReviewsWidget.tsx` (10 KB) ilk yüklemede statik SSR, yalnızca etkileşimde hydrate olan adacık mimarisine alma.
- [x] **Faz 32:** `TestimonialSlider.tsx` bileşeninde `AnimatePresence` yerine CSS scroll-snap carousel uygulama.
- [x] **Faz 33:** `ComparisonTable.tsx` bileşenini tamamen saf React Server Component (RSC) yapma.
- [x] **Faz 34:** `PersonnelDifference.tsx` üzerindeki gereksiz `useClient` direktifini ve animasyonları sadeleştirme.
- [x] **Faz 35:** `PreFooterCta.tsx` üzerindeki mouse listener'ı mobil cihazlarda tamamen devre dışı bırakma.
- [x] **Faz 36:** 9 Hesaplayıcıdan `CleaningCalculator.tsx` içindeki animasyonları CSS transition'a geçirme.
- [x] **Faz 37:** `DuesCalculator.tsx` hesaplama formunu zero-jank hale getirme.
- [x] **Faz 38:** `FacilityCalculator.tsx` (10 KB) bileşenini hafifletme ve form geçişlerini optimize etme.
- [x] **Faz 39:** `LandscapeCalculator.tsx` içindeki Framer Motion bağımlılıklarını kaldırma.
- [x] **Faz 40:** `LegalCalculator.tsx` form elemanlarını ve sonuç gösterimini sadeleştirme.
- [x] **Faz 41:** `MaintenanceCalculator.tsx` hesaplama motorunu ana iş parçacığını tıkamayacak şekilde refactor etme.
- [x] **Faz 42:** `PestControlCalculator.tsx` form alanlarını CSS tabanlı durumlara bağlama.
- [x] **Faz 43:** `PoolCalculator.tsx` girdilerini optimize etme.
- [x] **Faz 44:** `SecurityCalculator.tsx` hesaplama algoritmasını optimize etme.
- [x] **Faz 45:** 9 Testimonial bölümünü (`CleaningTestimonials`, `DuesTestimonials`, vb.) tek bir paylaşımlı hafif bileşende toplama.
- [x] **Faz 46:** `Hero.tsx` video arka planında mobilde video yüklemeyi engelleyip hafif poster görseli sunma.
- [x] **Faz 47:** `AppComingSoon.tsx` bileşenini tamamen CSS animasyonlarına geçirme.
- [x] **Faz 48:** Tüm bölüm geçişlerinde `content-visibility: auto` ve `contain-intrinsic-size` tanımlarını kalibre etme.
- [x] **Faz 49:** Sayfa kaydırmalarında 120 FPS akıcılığı Chrome DevTools Performance Trace ile test etme.
- [x] **Faz 50:** Tüm bölüm optimizasyonlarını TypeScript derlemesiyle doğrulama.

---

### 🧩 WAVE 3: FAZ 51–75 — UI Primitifleri, Modal & Island Mimarisi
*Hedef: UI bileşenlerindeki Framer Motion bağımlılıklarını kaldırıp saf CSS ve sıfır-jank etkileşimler sağlamak.*

- [x] **Faz 51:** `src/components/ui/Modal.tsx` bileşenini native HTML `<dialog>` veya CSS animasyonlu hafif yapıya geçirme.
- [x] **Faz 52:** `QuoteModal.tsx` (31 KB) teklif modalını kullanıcı tıklayana kadar sıfır bundle yüküyle tamamen dinamik import yapma.
- [x] **Faz 53:** `SpotlightSearchModal.tsx` (Ctrl+K hızlı arama) klavye navigasyonunu ve arama tepki süresini 10ms altına indirme.
- [x] **Faz 54:** `Tooltip.tsx` bileşenini Framer Motion yerine saf CSS `@starting-style` / `opacity` geçişlerine dönüştürme.
- [x] **Faz 55:** `Tabs.tsx` sekme geçişlerini CSS tabanlı gösterge çizgisine geçirme.
- [x] **Faz 56:** `QuickCallWidget.tsx` FAB butonunu mobilde GPU katmanında sabit tutarak layout shift'i sıfırlama.
- [x] **Faz 57:** `PwaInstallPrompt.tsx` bileşenini deferred prompt ile yalnızca kullanıcı 30 sn sitede kaldıktan sonra yükleme.
- [x] **Faz 58:** `CookieConsent.tsx` çerez bildirimini ilk açılışta LCP ve CLS'i engellemeyecek şekilde defer etme.
- [x] **Faz 59:** `Magnetic.tsx` bileşenini mobilde ve dokunmatik ekranlarda otomatik devre dışı bırakma.
- [x] **Faz 60:** `Accordion.tsx` primitifini `grid-template-rows: 0fr -> 1fr` CSS transition modeline geçirme.
- [x] **Faz 61:** `Button.tsx` bileşenindeki gereksiz Framer Motion `whileTap` efektlerini saf CSS `:active` ile değiştirme.
- [x] **Faz 62:** `Card.tsx` bileşenindeki `motion.div` wrapper'ını kaldırıp CSS hover sınıflarına bağlama.
- [x] **Faz 63:** `FramerLazyProvider.tsx` bileşeninin gerekliliğini değerlendirip gereksizse kaldırma.
- [x] **Faz 64:** Modallarda Escape tuşuna basıldığında kapanma ve odak geri yükleme (focus restoration) ekleme.
- [x] **Faz 65:** Dropdown menülerde tıklandığında dışarı tıklama (click-outside) dinleyicisini optimize etme.
- [x] **Faz 66:** Form girdi elemanlarında (`input`, `select`, `textarea`) focus halkası (focus-visible) stillerini standartlaştırma.
- [x] **Faz 67:** Form validasyon hatalarında layout kaymasını önlemek için sabit min-height uygulama.
- [x] **Faz 68:** UI bileşenlerinde dinamik class birleştirmeleri (`cn`, `clsx`, `tailwind-merge`) için memoization.
- [x] **Faz 69:** Toast bildirimleri sistemini CSS tabanlı animasyonlarla donatma.
- [x] **Faz 70:** Mobil cihazlarda buton dokunma hedeflerini minimum 48x48 piksel olarak sabitleme.
- [x] **Faz 71:** Skeleton yükleme iskeletlerini shimmer CSS efektiyle hafifletme.
- [x] **Faz 72:** UI ikonlarının SVG boyutlarını ve viewBox tanımlarını optimize etme.
- [x] **Faz 73:** Breadcrumb navigasyonunda tıklanabilir alanları genişletme.
- [x] **Faz 74:** Sayfalama (Pagination) bileşenini client-side yerine URL searchParams tabanlı SSR'a bağlama.
- [x] **Faz 75:** UI primitifleri birim testlerini (`vitest`) çalıştırma.

---

### 🧭 WAVE 4: FAZ 76–100 — Header, Mega Menü & Router Cache Hızlandırması
*Hedef: Tüm sayfalarda yüklenen 24 KB Header ve 13 KB Mega Menü yükünü dinamik island mimarisine geçirmek.*

- [x] **Faz 76:** `Header.tsx` (24 KB) içindeki `MegaMenuDropdown.tsx` (13 KB) statik import'unu kullanıcı menünün üzerine gelene kadar lazy-load yapma (-15 KB First Load JS).
- [x] **Faz 77:** Header scroll dinleyicisini (`handleScroll`) pasif scroll listener ve `requestAnimationFrame` throttling ile koruma.
- [x] **Faz 78:** Header tema değiştiriciyi (Dark/Light Mode) flicker (FOUC) yaratmayacak inline script ile senkronize etme.
- [x] **Faz 79:** `MobileMenu.tsx` (9 KB) açılışını GPU kompozitöründe `transform: translateX` ile 120 FPS akıcılığa kavuşturma.
- [x] **Faz 80:** Mobil menü açıkken arka plan kaydırmasını (body scroll lock) layout kayması olmadan engelleme.
- [x] **Faz 81:** Next.js App Router `staleTimes` ayarını `next.config.ts` üzerinde yapılandırma (`dynamic: 30s`, `static: 180s`).
- [x] **Faz 82:** Rota geçişlerinde prefetch edilen sayfaların istemci belleğinde gereksiz şişmesini önleme.
- [x] **Faz 83:** `loading.tsx` dosyasını sayfa yapısıyla birebir örtüşen yüksek kaliteli skeleton layout ile güncelleme.
- [x] **Faz 84:** `not-found.tsx` sayfasına kullanıcıların aradıkları içeriği bulabilmeleri için popüler hizmetler ve arama motoru ekleme.
- [x] **Faz 85:** `error.tsx` bileşenini minimal hata raporlama ve tek tıkla yeniden deneme ("Tekrar Dene") butonuyla donatma.
- [x] **Faz 86:** `global-error.tsx` dosyasını kritik layout çökmelerini kurtaracak yalın HTML formatına getirme.
- [x] **Faz 87:** Next.js `optimizePackageImports` listesine tüm yaygın paketleri ekleme (`lucide-react`, `clsx`, vb.).
- [x] **Faz 88:** Navigasyon linklerinde `prefetch={true}` kullanımını yalnızca en kritik 4 ana sayfa linkiyle sınırlama.
- [x] **Faz 89:** Header içindeki bildirim rozetleri ve dinamik sayaçları server-rendered statik başlangıçla sunma.
- [x] **Faz 90:** Menü açılışlarında odak yönetimini (Tab tuşu ile menü elemanları arasında gezinti) kusursuzlaştırma.
- [x] **Faz 91:** Dış bağlantılara otomatik `rel="noopener noreferrer"` eklenmesini garanti etme.
- [x] **Faz 92:** Header bileşenini React Server Component kabuğu ve istemci adacığı (Client Island) olarak ikiye bölme.
- [x] **Faz 93:** Header'da kullanılan logo SVG'sini inline ve sıfır CLS boyutlarıyla mühürleme.
- [x] **Faz 94:** Dil seçici açılır menüsünün ekranın sağına taşmasını önleyen responsive konumlandırma.
- [x] **Faz 95:** Hızlı teklif butonuna tıklandığında URL hash (`#teklif`) yönetimini sağlama.
- [x] **Faz 96:** Header yüksekliğini CSS custom property (`--header-height: 80px`) ile sabitleyip tüm sayfalarda ortak kullanma.
- [x] **Faz 97:** Mobilde adres çubuğunun gizlenip açılması durumunda header yüksekliğinin zıplamasını önleme (`dvh` kullanımı).
- [x] **Faz 98:** Menü linklerinde aktif sayfa vurgusunu (`aria-current="page"`) CSS ile hafifletme.
- [x] **Faz 99:** Header render performansını Chrome Performance Profiler ile ölçme ve TBT'yi 0ms'e çekme.
- [x] **Faz 100:** Wave 4 değişikliklerini TypeScript derlemesiyle onaylama.

---

### 🖼️ WAVE 5: FAZ 101–125 — Medya, AVIF, Font & LCP Kesin Çözümü
*Hedef: LCP süresini 1.2 saniyenin altına çekmek, tüm medya varlıklarını ultra-kompakt formatlara taşımak.*

- [x] **Faz 101:** `hero-poster-v5.webp` görselinin AVIF versiyonunu oluşturup `<picture>` veya Next.js Image ile AVIF öncelikli sunma (-40% boyut).
- [x] **Faz 102:** Hero görseline `priority={true}` ve `fetchPriority="high"` ekleyerek LCP gecikmesini sıfırlama.
- [x] **Faz 103:** Tüm kart ve blog thumbnail görsellerine `sizes` prop'unu doğru tanımlayarak gereksiz büyük çözünürlük indirilmesini engelleme.
- [x] **Faz 104:** Görsellerde `quality={75}` varsayılanını belirleyip görsel bozulma olmadan bant genişliğini %30 azaltma.
- [x] **Faz 105:** Arka plan videolarında `preload="none"` kullanarak mobilde gereksiz megabaytlarca veri indirilmesini durdurma.
- [x] **Faz 106:** Arka plan videolarında kullanıcı "Veri Tasarrufu" (Data Saver) modundaysa videoyu yüklememe.
- [x] **Faz 107:** SVG ikonların tümünde `width`, `height` ve `viewBox` niteliklerini sabitleyerek CLS'i önleme.
- [x] **Faz 108:** CSS `backdrop-blur-xl` ve `backdrop-blur-2xl` sınıflarını mobil cihazlarda `backdrop-blur-sm` seviyesine çekme (GPU RAM tasarrufu).
- [x] **Faz 109:** Material Symbols font yüklemesinde kullanılan ikonların glif alt-kümesini (font subsetting) çıkarma.
- [x] **Faz 110:** Inter fontunun yalnızca kullanılan ağırlıklarını (400, 500, 600, 700) yükleme.
- [x] **Faz 111:** Arapça dili için Cairo fontunu yalnızca `/ar` rotalarında dinamik olarak yükleme (TR/EN/RU rotalarına yük bindirmeme).
- [x] **Faz 112:** Favicon ve web app manifest ikonlarını tek bir optimize dizinde toplama.
- [x] **Faz 113:** Görsel yüklemelerinde bulanık önizleme (`placeholder="blur"`) entegrasyonu.
- [x] **Faz 114:** Harita (Google Maps / Leaflet) iframe'lerini yalnızca kullanıcı harita sekmesini açtığında yükleme.
- [x] **Faz 115:** YouTube video gömmelerinde hafif cephe (`lite-youtube-embed`) yaklaşımını uygulama (-1 MB JS tasarrufu).
- [x] **Faz 116:** PDF doküman indirme bağlantılarına dosya boyutu ve tür rozeti ekleme.
- [x] **Faz 117:** OpenGraph dinamik görsel üretimini (`/api/og`) edge runtime'da önbellekli olarak çalıştırma.
- [x] **Faz 118:** Sosyal medya paylaşım görsellerini WebP formatında optimize etme.
- [x] **Faz 119:** Sayfa içi tüm animasyonlu GIF'leri sessiz döngülü WebM/MP4 formatına dönüştürme.
- [x] **Faz 120:** `loading="lazy"` ve `decoding="async"` niteliklerinin below-the-fold tüm görsellerde yer almasını sağlama.
- [x] **Faz 121:** CSS gradyanlarını aşırı katmanlardan arındırıp GPU kompozitörünü rahatlatma.
- [x] **Faz 122:** Görsel kırılmalarında (404) şık bir yedek görsel gösteren `ImageFallback` sarmalayıcısı yazma.
- [x] **Faz 123:** Görsel CDN veya yerel cache klasörünü otomatik temizleme mekanizması kurma.
- [x] **Faz 124:** Lighthouse LCP metriğini test ortamında ölçerek < 1.2s hedefini teyit etme.
- [x] **Faz 125:** Tip güvenliği ve görsel testlerini tamamlama.

---

### 🔍 WAVE 6: FAZ 126–150 — Arama Motoru Otoritesi, AI Snippets & E-E-A-T
*Hedef: Google ve LLM (ChatGPT, Perplexity, Claude, Gemini) aramalarında 1 numaralı otorite olmak.*

- [x] **Faz 126:** `api/tesis-yonetimi/ai-snippets.json` endpoint'ini güncel sektörel gerçeklerle zenginleştirme.
- [x] **Faz 127:** `llms.txt` ve `llms-full.txt` dosyalarını AI crawler'ların (GPTBot, ClaudeBot, PerplexityBot) tam anlayacağı yapılandırılmış metinle donatma.
- [x] **Faz 128:** Tüm blog yazılarına `Article` + `BlogPosting` + `author` + `publisher` JSON-LD zengin sonuçlarını bağlama.
- [x] **Faz 129:** `Speakable` şemasını ana sayfa ve hizmet sayfalarındaki sesli asistan arama özetlerine entegre etme.
- [x] **Faz 130:** Tüm hizmet sayfalarına (`/hizmetler/*`) `Service` ve `OfferCatalog` şemalarını dinamik bağlama.
- [x] **Faz 131:** 39 ilçe sayfasına (`/bolgeler/*`) `LocalBusiness` + `GeoCoordinates` + `hasMap` şemalarını enjekte etme.
- [x] **Faz 132:** Hesaplayıcı sayfalarına Google'ın sevdiği `HowTo` adım adım şeması ekleme.
- [x] **Faz 133:** SSS bölümü olan her sayfada otomatik `FAQPage` şemasının eksiksiz çıkmasını sağlama.
- [x] **Faz 134:** Kurumsal sayfalara (`/kurumsal/*`) `AboutPage`, ISO sertifikaları ve TÜRKAK akreditasyon şemaları ekleme.
- [x] **Faz 135:** Sözlük sayfasına (`/sozluk`) `DefinedTermSet` ve `DefinedTerm` şemalarını bağlama.
- [x] **Faz 136:** Otomatik iç bağlantı örgü ağını (`autoLinker.ts`) `TreeWalker` API ile optimize ederek TBT maliyetini sıfırlama.
- [x] **Faz 137:** `eeatAuditor.ts` motorunu genişleterek her sayfada yazar biyografisi, yayın tarihi ve resmi kaynak atıflarını denetleme.
- [x] **Faz 138:** Blog yazılarına 634 Sayılı Kat Mülkiyeti Kanunu ve Yargıtay içtihat referans bağlantılarını otomatik ekleme.
- [x] **Faz 139:** `news-sitemap.xml` feed'ini son 48 saatteki içeriklerle otomatik güncelleyen rota yazma.
- [x] **Faz 140:** `video-sitemap.xml` ile video içeriklerinin Google Video aramalarında indekslenmesini sağlama.
- [x] **Faz 141:** IndexNow API entegrasyonunu blog yazısı eklendiğinde Bing ve Yandex'e otomatik sinyal gönderecek şekilde yapılandırma.
- [x] **Faz 142:** WebSub / PubSubHubbub protokolü ile RSS feed'lerini arama motorlarına anlık duyurma.
- [x] **Faz 143:** `robots.txt` dosyasındaki crawl-delay ve crawler izinlerini yapay zeka botlarına optimize etme.
- [x] **Faz 144:** Google Search Console için breadcrumb yolu hiyerarşisini kusursuzlaştırma.
- [x] **Faz 145:** İlçe sayfaları arasında çapraz anlamsal iç linkleme örgü ağı kurma (Kadıköy -> Ataşehir -> Üsküdar).
- [x] **Faz 146:** Duplicate content riskine karşı tüm varyasyonlarda self-referencing canonical URL kontrolü.
- [x] **Faz 147:** `facilityRankSimulator.ts` ile sayfa içi SEO puanlama simülasyonunu çalıştırma.
- [x] **Faz 148:** Open Graph `og:locale` ve `og:locale:alternate` etiketlerini 4 dil için eksiksiz üretme.
- [x] **Faz 149:** Twitter Cards için `summary_large_image` etiketlerini doğrula.
- [x] **Faz 150:** Vitest ile tüm SEO ve şema testlerini (`dualCoreRichResultEngine.test.ts`, vb.) %100 başarılı geçirme.

---

### 🌐 WAVE 7: FAZ 151–175 — Çok Dilli Mimari (i18n), RTL & Tipografi
*Hedef: 4 dilde (TR, EN, RU, AR) kusursuz kullanıcı deneyimi, sıfır çeviri açığı ve RTL desteği.*

- [x] **Faz 151:** Arapça (RTL) düzenini Tailwind `rtl:` prefix'leri ve `dir="rtl"` attribute'u ile tüm bileşenlerde test etme.
- [x] **Faz 152:** RTL modunda ikonların (oklar, chevron'lar) otomatik yön değiştirmesini sağlama (`rtl:rotate-180`).
- [x] **Faz 153:** `x-default` hreflang etiketini tüm sayfalarda varsayılan dil (Türkçe) olarak sabitleme.
- [x] **Faz 154:** `common.json` dosyalarındaki (TR, EN, RU, AR) tüm anahtarların eksiksiz olduğunu denetleyen otomatik test yazma.
- [x] **Faz 155:** URL slug çevirilerini (`middleware.ts` içindeki `translatedSlugs`) tüm hizmet ve kurumsal sayfalar için tamamlama.
- [x] **Faz 156:** İngilizce blog yazıları için temel sektör terimleri sözlüğü oluşturma.
- [x] **Faz 157:** Rusça ve Arapça sayfaların meta başlık ve açıklamalarını lokal kültüre uygun optimize etme.
- [x] **Faz 158:** Dil değiştirici bileşeni kullanıldığında kullanıcının bulunduğu sayfa rotasını ve dil karşılığını koruma.
- [x] **Faz 159:** Dil seçimini `NEXT_LOCALE` çerezi ile kaydedip sonraki ziyaretlerde hatırlama.
- [x] **Faz 160:** Tarayıcı `Accept-Language` başlığına göre ilk girişte akıllı dil öneri banner'ı sunma.
- [ ] **Faz 161:** Para birimi ve sayı formatlarını dile göre yerelleştirme (`Intl.NumberFormat('tr-TR')`).
- [ ] **Faz 162:** Tarih formatlarını dile göre yerelleştirme (`Intl.DateTimeFormat`).
- [ ] **Faz 163:** Çok dilli site haritası (`sitemap.xml`) içinde her URL için `xhtml:link rel="alternate"` tanımlarını ekleme.
- [ ] **Faz 164:** SSS bölümünü 4 dilde aranabilir ve filtrelenebilir kılma.
- [ ] **Faz 165:** Aidat ve bütçe hesaplayıcısını İngilizce ve Arapça dillerinde tam işlevsel hale getirme.
- [ ] **Faz 166:** Sözlük (`/sozluk`) sayfasını çok dilli terim arama altyapısına kavuşturma.
- [ ] **Faz 167:** Başarı hikayeleri ve vaka analizlerini çok dilli formata geçirme.
- [ ] **Faz 168:** KVKK ve Gizlilik Politikası gibi yasal metinlerin İngilizce özet versiyonlarını hazırlama.
- [ ] **Faz 169:** Dil bazlı tipografi satır yüksekliği (`leading`) ayarlarını Arapça için optimize etme.
- [ ] **Faz 170:** Çerez izin modalını 4 dilde yerelleştirme.
- [ ] **Faz 171:** Arama önerileri (`/api/search-suggest`) API'sine dil parametresi ekleyip dile göre öneri sunma.
- [ ] **Faz 172:** Form hata ve doğrulama mesajlarını çok dilli hale getirme.
- [ ] **Faz 173:** 404 sayfasını kullanıcının seçili dilinde gösterme.
- [ ] **Faz 174:** Çok dilli rotalar için birim testleri (`dualCoreMultiLangEngine.test.ts`) çalıştırma.
- [ ] **Faz 175:** TypeScript tip doğrulaması ile i18n anahtar güvenliğini onaylama.

---

### 🔒 WAVE 8: FAZ 176–200 — Güvenlik, Rate Limiting & Veritabanı Performansı
*Hedef: Sıfır güvenlik açığı, DoS koruması, ETag önbellekleme ve optimize PostgreSQL sorguları.*

- [ ] **Faz 176:** API endpoint'lerine Redis tabanlı sliding-window Rate Limiting middleware ekleme (dakikada 60 istek sınırı).
- [ ] **Faz 177:** İletişim ve teklif formu API'lerine bot koruması (Honeypot + zaman damgası kontrolü) ekleme.
- [ ] **Faz 178:** Form gönderimlerinde CSRF token koruma katmanı oluşturma.
- [ ] **Faz 179:** Veri getiren API endpoint'lerine ETag başlığı ekleyerek değişmeyen yanıtlarda `304 Not Modified` ile veri transferini sıfırlama.
- [ ] **Faz 180:** PostgreSQL sorgularında `SELECT *` kullanımını tamamen kaldırıp yalnızca gerekli sütunları (`select: { id, title }`) çekme.
- [ ] **Faz 181:** PostgreSQL üzerinde sık filtrelenen alanlara (`slug`, `published`, `category`, `createdAt`) Prisma index'leri ekleme.
- [ ] **Faz 182:** N+1 veritabanı sorgusu oluşturabilecek ilişkisel sorguları `include` yerine optimize `findMany` + `in` ile çözme.
- [ ] **Faz 183:** Prisma Client bağlantı havuzunu (connection pool) Docker ortamında maksimum 10 bağlantı ile optimize etme.
- [ ] **Faz 184:** Redis bağlantı hatalarında uygulamanın çökmesini engelleyen gracefully degraded fallback'i güçlendirme.
- [ ] **Faz 185:** `next.config.ts` içindeki Content Security Policy (CSP) direktiflerini sıkılaştırma.
- [ ] **Faz 186:** `dangerouslySetInnerHTML` kullanım alanlarında XSS temizliği (`DOMPurify`) yapıldığını doğrulamak için audit testi yazma.
- [ ] **Faz 187:** Admin paneli rotalarına (`/admin/*`) JWT token doğrulama ve brute-force koruması ekleme.
- [ ] **Faz 188:** Şifreleme işlemlerinde güvenli algoritmalar (`bcrypt` / `argon2`) kullanıldığını teyit etme.
- [ ] **Faz 189:** Hassas ortam değişkenlerinin (`DATABASE_URL`, `JWT_SECRET`) istemci tarafına sızmasını engelleyen env linter yazma.
- [ ] **Faz 190:** Docker konteyneri içinde Node.js sürecini `root` yerine `nextjs` non-root kullanıcısıyla çalıştırmayı doğrulamak.
- [ ] **Faz 191:** HTTP yanıtlarında `X-Powered-By` başlığını gizleme (`poweredByHeader: false`).
- [ ] **Faz 192:** Dosya yükleme endpoint'ine (`/api/upload`) dosya türü (MIME type) ve boyut limiti (maksimum 5 MB) doğrulaması ekleme.
- [ ] **Faz 193:** SQL Injection taraması ve statik güvenlik analizi.
- [ ] **Faz 194:** Veritabanı yedekleme betiğini (`scripts/backup-db.sh`) oluşturma.
- [ ] **Faz 195:** Uptime izleme servisi için `/api/health` yanıt formatını SLA standartlarına bağlama.
- [ ] **Faz 196:** Log dosyalarının diski doldurmasını önlemek için Docker json-file log rotation (max-size: 10m) yapılandırma.
- [ ] **Faz 197:** Graceful shutdown sırasında açıkta kalan DB ve Redis bağlantılarını temiz kapatma (`SIGTERM` dinleyicisi).
- [ ] **Faz 198:** Güvenlik başlıklarının (HSTS, nosniff, frame-ancestors) canlı sunucuda curl ile doğrulanması.
- [ ] **Faz 199:** `npm audit` çalıştırarak bilinen güvenlik açıklarını temizleme.
- [ ] **Faz 200:** Güvenlik ve DB katmanının birim testlerle doğrulanması.

---

### ♿ WAVE 9: FAZ 201–225 — Erişilebilirlik (A11y) & WCAG AA Uyumluluğu
*Hedef: Engelli kullanıcılar, ekran okuyucular ve klavye gezintisi için kusursuz erişilebilirlik skoru (100/100).*

- [ ] **Faz 201:** Tüm interaktif buton ve linklerde açıklayıcı `aria-label` tanımlarını eksiksiz tamamlama.
- [ ] **Faz 202:** Tüm sayfalarda en başa `#main-content` atlama bağlantısı (Skip Navigation Link) ekleme.
- [ ] **Faz 203:** Sayfa başlık hiyerarşisini (`h1` -> `h2` -> `h3`) denetleme; her sayfada tek bir `h1` olduğunu garanti etme.
- [ ] **Faz 204:** Modallarda odak tuzağı (Focus Trap) ekleyerek Tab tuşunun modal dışına kaçmasını engelleme.
- [ ] **Faz 205:** Dropdown ve akordeonlarda `aria-expanded="true/false"` ve `aria-controls` eşleşmelerini tamamlama.
- [ ] **Faz 206:** Tüm form alanlarına kalıcı `<label>` ve `htmlFor` ilişkilendirmesi ekleme.
- [ ] **Faz 207:** Form hata mesajlarını ekran okuyuculara anında duyurmak için `aria-live="polite"` ve `aria-invalid="true"` kullanma.
- [ ] **Faz 208:** Görsellerdeki tüm `alt` niteliklerini denetleme; dekoratif görsellere `alt=""` ve `aria-hidden="true"` ekleme.
- [ ] **Faz 209:** Tüm metin ve arka plan renk kombinasyonlarını WCAG AA (minimum 4.5:1 kontrast) seviyesine getirme.
- [ ] **Faz 210:** Focus durumunda mavi odak halkasını (`focus-visible:ring-2`) tüm klavye gezintilerinde belirgin kılma.
- [ ] **Faz 211:** `@media (prefers-reduced-motion: reduce)` sorgusu ile tüm animasyonları ve geçişleri sıfırlayan global kural yazma.
- [ ] **Faz 212:** `@media (prefers-contrast: more)` desteği ile yüksek kontrast isteyen kullanıcılara kenarlık ve metin keskinliği sunma.
- [ ] **Faz 213:** Tablolarda `<th>` elemanlarına `scope="col"` ve `scope="row"` nitelikleri ekleme.
- [ ] **Faz 214:** Ekran okuyucuların anlaması için semantik HTML etiketlerini (`<main>`, `<nav>`, `<aside>`, `<article>`, `<header>`, `<footer>`) eksiksiz kullanma.
- [ ] **Faz 215:** Mobil dokunmatik alan boyutlarını kontrol etme (minimum 44x44 CSS pikseli).
- [ ] **Faz 216:** SVG ikonlara ekran okuyucuların takılmaması için `aria-hidden="true"` ekleme.
- [ ] **Faz 217:** Sesli içerik veya videolar için altyazı / deşifre metni bağlantısı ekleme.
- [ ] **Faz 218:** Sayfa dili tanımlamasının (`<html lang="tr">`) dile göre dinamik güncellendiğini doğrulama.
- [ ] **Faz 219:** Yatay kaydırma (horizontal scroll) alanlarında klavye yön tuşlarıyla gezinti desteği sağlama.
- [ ] **Faz 220:** İlerleme çubuklarında `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` kullanma.
- [ ] **Faz 221:** Fiyat ve para birimi gösterimlerinde ekran okuyucu için "Türk Lirası" açıklamasını gizli span ile verme.
- [ ] **Faz 222:** Menü kapatma butonlarına açıkça "Menüyü Kapat" `aria-label`'ı ekleme.
- [ ] **Faz 223:** Otomatik form doldurma (autocomplete) niteliklerini (`name`, `email`, `tel`) ekleyerek yardımcı teknolojileri destekleme.
- [ ] **Faz 224:** Lighthouse Accessibility denetimini çalıştırıp 100/100 tam puanı hedefleme.
- [ ] **Faz 225:** `dualCoreA11yEngine.test.ts` test paketini çalıştırarak tüm erişilebilirlik kurallarını onaylama.

---

### 🧪 WAVE 10: FAZ 226–250 — Test Otomasyonu, DevOps, CI/CD & Canlı Gözlem
*Hedef: Sürekli entegrasyon, Playwright E2E testleri, otomatik performans bütçeleri ve kusursuz canlı operasyon.*

- [x] **Faz 226:** A/B test framework'ü birim testleri (`ab-test.test.ts`) oluşturuldu.
- [ ] **Faz 227:** Vitest birim test kapsamını tüm API rotalarını (`/api/calculator`, `/api/health`, `/api/lead`, vb.) kapsayacak şekilde genişletme.
- [ ] **Faz 228:** Playwright ile kritik kullanıcı akışlarını (Ana sayfa gezintisi, Teklif Alma Formu gönderimi) kapsayan E2E test suite'i kurma.
- [ ] **Faz 229:** Playwright ile dil değiştirme ve rota doğruluğu E2E testi yazma.
- [ ] **Faz 230:** Playwright ile mobil görünüm (iPhone / Android) emülasyon testleri çalıştırma.
- [ ] **Faz 231:** GitHub Actions CI pipeline oluşturma: Her commit/PR'da `tsc --noEmit`, `vitest run` ve lint çalıştırma.
- [ ] **Faz 232:** Bundle boyutu bütçesi (Bundle Size Budget) belirleme; First Load JS 180 KB'ı geçerse CI'da uyarı verme.
- [ ] **Faz 233:** Lighthouse CI (LHCI) entegrasyonu ile otomatik performans gerileme (regression) testleri kurma.
- [ ] **Faz 234:** Docker derleme süresini kısaltmak için BuildKit önbellek mekanizmasını optimize etme.
- [ ] **Faz 235:** `.dockerignore` dosyasını temizleyip build context boyutunu minimuma indirme.
- [ ] **Faz 236:** Canlı sunucu için Nginx ters vekil (reverse proxy) yapılandırmasında Brotli ve Gzip sıkıştırma seviyelerini optimize etme.
- [ ] **Faz 237:** Statik varlıklar için 1 yıllık `Cache-Control: public, max-age=31536000, immutable` HTTP başlıklarını doğrulama.
- [ ] **Faz 238:** Canlıda slow query loglarını izleme mekanizması kurma.
- [ ] **Faz 239:** Web Vitals izleyicisini (`PerformanceObserver`) canlıda sessiz beacon ile analitik sistemine bağlama.
- [ ] **Faz 240:** Dead code elimination: Projede kullanılmayan tüm export, tip ve yardımcı fonksiyonları tespit edip temizleme.
- [ ] **Faz 241:** Bağımlılık denetimi (Dependency Audit) ile gereksiz veya çakışan kütüphaneleri ayıklama.
- [ ] **Faz 242:** Node.js bellek sızıntısı ve heap snapshot testleri çalıştırma.
- [ ] **Faz 243:** Yüksek eşzamanlı istek simülasyonu ile API yanıt sürelerini ve veritabanı stabilitesini ölçme.
- [ ] **Faz 244:** Çift repo senkronizasyonunu (`origin main` ve `alogroup main`) otomatik doğrulayan script yazma.
- [ ] **Faz 245:** Docker konteyner yeniden başlatma (restart) testleri yaparak veritabanı ve Redis verilerinin kalıcılığını (persistence) teyit etme.
- [ ] **Faz 246:** Sistem açılışında otomatik Prisma migrate ve DB seed süreçlerinin kararlılığını test etme.
- [ ] **Faz 247:** 250 Fazlık performans sertifikasyon raporunu otomatik üreten script hazırlama.
- [ ] **Faz 248:** Tüm test paketlerinin (`392+ Vitest testi`) eksiksiz ve yeşil olduğunu doğrulama.
- [ ] **Faz 249:** Canlı ortamda curl ile ana sayfa, API ve sağlık endpoint'lerinin yanıt sürelerini ölçme.
- [ ] **Faz 250:** Nihai performans sonuçlarını dokümante edip 250 fazlık master planı başarıyla kapatma! 🏁
