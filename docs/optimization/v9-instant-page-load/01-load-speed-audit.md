# ⚡ v9 Sayfa Yükleme Hızı (Hyper-Speed) - Darboğaz Analizi ve Audit Raporu

**Tarih:** 27 Temmuz 2026  
**Hedef:** Sayfa ilk yüklenim hızını (Initial Page Load Speed) maksimuma çıkarmak, LCP süresini 1.0 saniyenin altına indirmek ve TTFB / FCP ağ gecikmelerini tamamen sıfırlamak.

---

## 🔍 1. Mevcut Durum Analizi (Darboğazlar ve Fırsatlar)

Sitemiz v7 ve v8 optimizasyonlarıyla akıcılık (stutter-free) ve link ön-yükleme konusunda muazzam bir seviyeye ulaştı. Ancak, tarayıcının **sayfayı ilk kez açtığı anda (Cold Start / Initial Load)** gerçekleştirdiği ağ isteklerini incelediğimizde sayfa yükleme hızını daha da şahlandıracak 3 temel darboğaz ve gelişim alanı tespit edilmiştir:

### 🚨 Darboğaz 1: Material Symbols İkon Fontunun Geç Yüklenmesi (FOIT / FOUC Riski)
- **Tespit:** Şu anda `IconFontLoader.tsx` bileşeni, Material Symbols ikon stylesheet dosyasını (`fonts.googleapis.com`) tarayıcı boştayken (`requestIdleCallback`) veya 1 saniye gecikmeli yüklemektedir.
- **Etkisi:** Sayfa ilk yüklendiğinde (özellikle mobil cihazlarda veya yavaş internette) ilk 1-2 saniye boyunca butonlardaki ve kartlardaki ikonlar görünmemekte (FOIT - Flash of Invisible Text) veya ikonların sonradan yüklenip belirmesi anlık bir görsel sıçramaya (CLS) neden olmaktadır.
- **Çözüm Fırsatı:** İkon stil dosyasını ağ öncelikli hale getirmek (`preload as="style"`) veya kritik navigasyon ikonlarını doğrudan inline/lokal mimariye taşıyarak dış font gecikmesini tamamen ortadan kaldırmak.

### 🚨 Darboğaz 2: 3. Parti Ağ Bağlantılarında (Third-Party Domains) SSL/TLS El Sıkışma Gecikmesi
- **Tespit:** Sitemiz resimler için `images.unsplash.com`, fontlar için `fonts.googleapis.com` / `fonts.gstatic.com` ve analitik için Google Tag Manager / Microsoft Clarity CDN'lerine bağlanmaktadır. Currently, tarayıcı bu alan adlarına ancak ilgili kaynakla karşılaştığında el sıkışma (DNS lookup + TCP handshake + TLS negotiation) başlatmaktadır.
- **Etkisi:** Her yeni alan adı bağlantısı sayfa yüklenirken 100 ms ile 300 ms arasında gecikme yaratır.
- **Çözüm Fırsatı:** HTML `<head>` katmanına ve `next.config.ts` başlıklarına `<link rel="preconnect">` ve `<link rel="dns-prefetch">` tanımları eklenerek, tarayıcının sayfa HTML'ini indirirken arka planda bu sunucularla tüneli hazır etmesi (Pre-warming) sağlanacaktır.

### 🚨 Darboğaz 3: Katman Altı (Below-the-Fold) Bileşenlerin Hydration Yükü
- **Tespit:** Ana sayfada (`page.tsx`) yer alan 10 büyük bölüm (`BentoServices`, `WhyUsBentoGrid`, `ComparisonTable`, `Faq` vb.) `next/dynamic` ile asenkron import edilse de, `{ ssr: true }` ayarı nedeniyle tarayıcı sayfa yüklenirken bu bileşenlerin JS bundle parçalarını da ana sayfayla birlikte indirmektedir.
- **Etkisi:** Sayfanın ilk etkileşime geçme süresi (TTI - Time to Interactive) ve ana iş parçacığı bloklanma süresi (TBT) mobil cihazlarda birkaç yüz milisaniye artabilmektedir.
- **Çözüm Fırsatı:** Görüş alanına girene kadar ağır JS kodlarının indirilmesini geciktiren akıllı **Intersection Observer tabanlı Lazy Boundary** veya Next.js route prefetching stratejisinin hassas ayarlanması.

---

## 📊 2. Hedeflenen Web Vitals (CWV) Sıçraması

| Metrik | Mevcut Ort. Değer | v9 Hedefi (Hyper-Speed) | Optimizasyon Anahtarı |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | ~1.4s | **< 0.9s** | Preload Poster + Preconnect CDN + Zero-Block Icons |
| **FCP** (First Contentful Paint) | ~0.8s | **< 0.5s** | Critical CSS + Resource Hints |
| **TTFB** (Time to First Byte) | ~0.4s | **< 0.2s** | Edge Caching & HSTS Preload |
| **TBT** (Total Blocking Time) | ~120ms | **< 50ms** | ClientWidgets & Below-the-Fold Code Splitting |
| **CLS** (Cumulative Layout Shift) | 0.00 | **0.00** | İkon ve Font Boyut Sabitleme |
