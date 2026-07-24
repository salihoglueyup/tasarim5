# 🚀 ALO YÖNETİM — SEO MASTER PLAN V3 (100 FAZ)

> **Proje:** Alo Yönetim Web Sitesi  
> **Framework:** Next.js 16.2.10 (App Router, Turbopack)  
> **Oluşturulma Tarihi:** 24 Temmuz 2026  
> **Son Güncelleme:** 24 Temmuz 2026  
> **Amaç:** Teknik SEO, İçerik SEO, Performans ve Kullanıcı Deneyimi optimizasyonlarıyla Google arama sonuçlarında **#1 pozisyona** ulaşmak.  
> **Hedef Lighthouse Skoru:** Performans ≥90 | SEO ≥95 | A11Y ≥90 | Best Practices ≥95

---

## 📂 PROJE DOSYA HARİTASI

```
Tasarım 5/
├── public/
│   ├── documents/                 ← BOŞ ❌
│   ├── favicon/
│   │   └── favicon.ico            (2.9KB)
│   ├── images/
│   │   ├── badges/                ← BOŞ ❌
│   │   ├── logos/
│   │   │   ├── logo.png           (4.4MB) ← ÇOK BÜYÜK 🔴
│   │   │   ├── logo-horizontal.png (134KB)
│   │   │   ├── new-icon.png       (4.2MB) ← ÇOK BÜYÜK 🔴
│   │   │   └── new-icon-Photoroom.png (1.7MB) ← BÜYÜK 🟡
│   │   ├── references/            ← BOŞ ❌
│   │   ├── services/              ← BOŞ ❌
│   │   └── team/                  ← BOŞ ❌
│   ├── video/
│   │   └── brand-film.mp4         (2.3MB)
│   ├── robots.txt                 (202B)
│   └── sitemap.xml                (2.2KB) ← ÇAKIŞMA RİSKİ 🔴
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             (5KB) — Root metadata, OG, Twitter, hreflang
│   │   ├── page.tsx               (2.5KB) — Ana sayfa + LocalBusiness schema
│   │   ├── sitemap.ts             (1.5KB) — Dinamik sitemap üretici
│   │   ├── globals.css            (2KB)
│   │   ├── not-found.tsx          (2.5KB) — Hardcoded TR ❌
│   │   ├── basari-hikayeleri/     — BreadcrumbList ✅
│   │   ├── blog/                  — Blog + Article schema ✅
│   │   │   └── [slug]/            — Dinamik blog detay
│   │   ├── guvenlik-akademisi/    — EducationalOrganization ✅
│   │   ├── hakkimizda/
│   │   ├── hesaplayici/
│   │   ├── hizmetler/             — 8 alt hizmet sayfası + layout.tsx
│   │   ├── iletisim/              — ContactPage + LocalBusiness ✅
│   │   ├── istihdam-koprusu/      — BreadcrumbList ✅
│   │   ├── kurumsal/              — 3 alt sayfa (vizyon, kalite, sürdürülebilirlik)
│   │   ├── kvkk-ve-aydinlatma-metni/
│   │   ├── referanslar/           — BreadcrumbList ✅
│   │   ├── sektorel-cozumler/     — ItemList + BreadcrumbList ✅
│   │   ├── sss/                   — FAQPage + BreadcrumbList ✅
│   │   ├── surdurulebilirlik/ges-projeleri/
│   │   └── teklif-al/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx         (19.7KB) — Büyük, newsletter formu içeriyor
│   │   │   ├── Header.tsx         (24.8KB) — Mega menü, çok büyük
│   │   │   ├── LoginModal.tsx     (10.5KB)
│   │   │   ├── NavigationWrapper.tsx (1.2KB)
│   │   │   └── PageHeader.tsx     (4.2KB) — Kendi BreadcrumbList üretiyor ⚠️
│   │   ├── sections/              — 13 bileşen (Hero, Bento, Testimonial vb.)
│   │   └── ui/                    — 18 bileşen (QuoteModal 29KB ← ÇOK BÜYÜK)
│   │
│   ├── context/
│   │   ├── LanguageContext.tsx     — Client-side i18n (tr/en)
│   │   └── QuoteContext.tsx
│   │
│   ├── i18n/
│   │   └── translations.ts       (148KB) — 877+ çeviri anahtarı
│   │
│   └── lib/
│       └── schemas.ts            — generateBreadcrumbs helper
│
├── next.config.ts                — image formats, 2 redirect
├── package.json                  — Next 16.2.10, React 19.2.4, framer-motion, lenis
└── SEO_MASTER_PLAN_V3.md         ← BU DOSYA
```

---

## 📊 PROJE ANALİZ SONUÇLARI

### ✅ Mevcut Durum (Tamamlananlar)
| # | Öğe | Durum | Dosya |
|---|-----|-------|-------|
| 1 | Dinamik Sitemap | ✅ | `src/app/sitemap.ts` — 30 rota + 4 blog |
| 2 | robots.txt | ✅ | `public/robots.txt` |
| 3 | Root Metadata | ✅ | `src/app/layout.tsx` — OG, Twitter, hreflang |
| 4 | Font display:swap | ✅ | `src/app/layout.tsx` — Inter, Plus Jakarta |
| 5 | Organization Schema | ✅ | `src/app/layout.tsx` — JSON-LD |
| 6 | LocalBusiness Schema | ✅ | `src/app/page.tsx` + `iletisim/page.tsx` |
| 7 | BreadcrumbList | ✅ | 15+ sayfada + PageHeader bileşeni |
| 8 | FAQPage Schema | ✅ | `src/app/sss/page.tsx` |
| 9 | Blog + Article Schema | ✅ | `blog/page.tsx` + `blog/[slug]/page.tsx` |
| 10 | Service Schema | ✅ | 8 hizmet alt sayfası |
| 11 | EducationalOrganization | ✅ | `guvenlik-akademisi/page.tsx` |
| 12 | ContactPage Schema | ✅ | `iletisim/page.tsx` |
| 13 | ItemList Schema | ✅ | `sektorel-cozumler/page.tsx` |
| 14 | GTM lazyOnload | ✅ | `src/app/layout.tsx` |
| 15 | next/image AVIF/WebP | ✅ | `next.config.ts` |
| 16 | Dynamic imports | ✅ Kısmi | `page.tsx` — TestimonialSlider, CertificateBadge, Faq |
| 17 | CookieConsent | ✅ | `src/components/ui/CookieConsent.tsx` |
| 18 | 404 Sayfası | ✅ Basit | `src/app/not-found.tsx` |

### ❌ Tespit Edilen Eksiklikler ve Fırsatlar

| # | Eksiklik | Etki | Öncelik |
|---|----------|------|---------|
| 1 | `og-image.jpg` dosyası public'te **yok** | Sosyal medya paylaşımlarında görsel kırık | 🔴 Acil |
| 2 | Logo dosyaları **10MB+** toplam | İlk yükleme süresi çok uzun, LCP kötü | 🔴 Acil |
| 3 | `public/sitemap.xml` statik dosya vs `sitemap.ts` | Google hangi sitemap'i kullanacak belli değil | 🔴 Acil |
| 4 | Hero video `preload="auto"` | Mobilde 2.3MB otomatik indirme → veri israfı | 🔴 Acil |
| 5 | PageHeader duplicate BreadcrumbList | Aynı sayfa 2 BreadcrumbList üretiyor | 🟠 Yüksek |
| 6 | `robots.txt` `/*?*` kuralı | Query string'li sayfalar taranmıyor | 🟠 Yüksek |
| 7 | PWA Manifest dosyası yok | Add to home screen, PWA puanı düşük | 🟡 Orta |
| 8 | Not-Found hardcoded Türkçe | İngilizce kullanıcılar Türkçe 404 görür | 🟡 Orta |
| 9 | CookieConsent hardcoded Türkçe | İngilizce kullanıcılar Türkçe çerez mesajı görür | 🟡 Orta |
| 10 | Boş image klasörleri (4 adet) | SEO için görsel içerik eksik | 🟡 Orta |
| 11 | Canonical link sayfa bazlı yönetimi yok | Duplicate content riski | 🟡 Orta |
| 12 | Internal link stratejisi zayıf | Sayfa otoritesi dağıtımı yetersiz | 🟡 Orta |
| 13 | İçerik derinliği yetersiz (thin content) | Google düşük kalite sinyali | 🟡 Orta |
| 14 | Core Web Vitals izleme yok | Performans gerileme tespiti yapılamıyor | 🟢 Normal |
| 15 | 500/Error sayfası yok | Kullanıcı deneyimi kötü | 🟢 Normal |
| 16 | Redirect haritası çok kısa (2 kural) | Eski URL'ler 404 verir | 🟢 Normal |
| 17 | CSS critical path optimizasyonu yok | FCP gecikmesi | 🟢 Normal |
| 18 | Video poster/fallback image yok | LCP kötüleşir | 🟢 Normal |
| 19 | QuoteModal 29KB tek dosya | Bundle boyutu şişik | 🔵 Düşük |
| 20 | Header 24KB tek dosya | Code splitting fırsatı | 🔵 Düşük |

---

## 🎯 HEDEF ANAHTAR KELİMELER STRATEJİSİ

### Ana Hedef Keyword'ler (High Volume)
| Keyword | Tahmini Aylık Arama | Rekabet | Hedef Sayfa |
|---------|---------------------|---------|-------------|
| site yönetimi İstanbul | 1.000+ | Yüksek | `/` (Ana Sayfa) |
| apartman yönetimi | 2.500+ | Yüksek | `/` |
| tesis yönetimi | 1.500+ | Orta | `/hizmetler/tesis-yonetimi` |
| özel güvenlik firması İstanbul | 800+ | Orta | `/hizmetler/guvenlik-yonetimi` |
| bina yönetim şirketi | 600+ | Orta | `/hakkimizda` |

### Long-Tail Keyword'ler (Düşük Rekabet, Yüksek Dönüşüm)
| Keyword | Hedef Sayfa |
|---------|-------------|
| İstanbul Kadıköy site yönetim firması | `/iletisim` |
| apartman aidat takip programı | `/hizmetler/tesis-yonetimi` |
| 5188 sayılı kanun güvenlik eğitimi | `/guvenlik-akademisi` |
| site ortak alan temizlik ücreti | `/hizmetler/temizlik-ve-hijyen` |
| kat mülkiyeti kanunu aidat borcu | `/hizmetler/hukuk-ve-icra-danismanligi` |
| havuz pH klor ölçümü | `/hizmetler/havuz-bakimi-ve-hijyen` |
| site güneş enerji santrali (GES) | `/surdurulebilirlik/ges-projeleri` |
| apartman haşere ilaçlama İstanbul | `/hizmetler/hasere-ve-dezenfeksiyon` |
| profesyonel peyzaj bakımı fiyatları | `/hizmetler/peyzaj-ve-bahce-bakimi` |
| site yönetimi teklif al | `/teklif-al` |

### İçerik Kümeleme (Topic Cluster) Stratejisi
```
                    ┌── Güvenlik Yönetimi
                    ├── Temizlik & Hijyen
                    ├── Teknik Bakım
  [Ana Sayfa] ──────├── Tesis Yönetimi (Pillar Page)
  "Site Yönetimi"   ├── Peyzaj & Bahçe
                    ├── Havuz Bakımı
                    ├── Haşere & Dezenfeksiyon
                    └── Hukuk & İcra

  [Blog] ──────┬── Aidat Rehberleri (→ Tesis Yönetimi)
               ├── Güvenlik İpuçları (→ Güvenlik Yönetimi)
               ├── Yasal Bilgiler (→ Hukuk & İcra)
               └── Bakım Rehberleri (→ Teknik Bakım)
```

---

## 🔧 BÖLÜM A: TEKNİK ALTYAPI & KRİTİK HATALAR (Faz 1–10)

### Faz 1: OG Image Oluşturma ve Public Dizini Düzenleme
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~30 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `public/og-image.jpg` (YENİ), `src/app/layout.tsx` (KONTROL) |

**Yapılacaklar:**
- `public/og-image.jpg` oluştur (1200×630px, JPG, <200KB)
  - Marka renkleri (#2D2D3A slate, beyaz)
  - Alo Yönetim logosu ortalanmış
  - Tagline: "Profesyonel Mülk ve Tesis Yönetimi"
- Alternatif: `src/app/opengraph-image.tsx` ile Next.js dinamik OG resmi (Faz 91'de detaylandırılacak)
- Layout'taki `images: [{ url: "/og-image.jpg" }]` referansının çalıştığını doğrula

**Kabul Kriterleri:**
- [x] `/og-image.jpg` URL'si 200 döndürüyor
- [x] WhatsApp/Telegram'da link paylaşıldığında görsel çıkıyor
- [x] Dosya boyutu < 200KB

---

### Faz 2: Logo Dosyalarını Optimize Etme
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~45 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `public/images/logos/*` (4 dosya) |

**Mevcut Durum:**
| Dosya | Boyut | Hedef |
|-------|-------|-------|
| `logo.png` | 4.4MB | < 100KB (WebP) |
| `new-icon.png` | 4.2MB | < 80KB (WebP) |
| `new-icon-Photoroom.png` | 1.7MB | < 50KB (WebP) |
| `logo-horizontal.png` | 134KB | < 40KB (WebP) |

**Yapılacaklar:**
- Her logo için WebP versiyonu oluştur
- `Logo.tsx` bileşeninde `next/image` ile servis et (zaten yapılmış, boyut kontrolü)
- Orijinal PNG'leri yedekle, WebP'leri ana dosya yap
- `src/components/ui/Logo.tsx` → image path'lerini güncelle

**Kabul Kriterleri:**
- [ ] Toplam logo boyutu < 270KB (şu an: ~10.5MB)
- [ ] Tüm sayfalar logolarla sorunsuz render oluyor
- [ ] Lighthouse Image optimizasyon uyarısı yok

---

### Faz 3: Statik sitemap.xml Çakışmasını Çöz
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~10 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `public/sitemap.xml` (SİL), `src/app/sitemap.ts` (KONTROL) |

**Sorun:** `public/sitemap.xml` (statik, 2.2KB) ve `src/app/sitemap.ts` (dinamik) aynı anda var. Next.js build sırasında statik dosya öncelik alabilir ve dinamik sitemap asla serve edilmeyebilir.

**Yapılacaklar:**
- `public/sitemap.xml` dosyasını sil
- `npm run build` çalıştır
- Build çıktısında `/sitemap.xml` route'unun listelendiğini doğrula
- `curl https://aloyonetim.com/sitemap.xml` ile erişilebilirliği test et

**Kabul Kriterleri:**
- [ ] `public/sitemap.xml` silinmiş
- [ ] Build output'ta `○ /sitemap.xml` satırı görünüyor ✅ (Zaten görünüyor)
- [ ] Dinamik sitemap 30+ URL içeriyor

---

### Faz 4: robots.txt Geliştirme
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~15 dk |
| **Bağımlılık** | Faz 3 (sitemap doğrulanmış olmalı) |
| **Dosyalar** | `public/robots.txt` |

**Mevcut İçerik:**
```
User-Agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /*?*     ← SORUNLU
Sitemap: https://aloyonetim.com/sitemap.xml
```

**Sorun:** `Disallow: /*?*` kuralı Google'ın query parametreli sayfaları (örn. UTM parametreleri, filtreli sayfalar) taramasını engelliyor. Ayrıca bazı arama motorları bu wildcard'ı farklı yorumlayabiliyor.

**Yapılacaklar:**
- `/*?*` kuralını kaldır veya `Disallow: /*?` olarak düzelt
- Medya dosyaları için `Allow: /images/`, `Allow: /video/` ekle
- Bot bazlı kurallar ekle (opsiyonel: AI botları engellemek için)
- Next.js `src/app/robots.ts` alternatifini değerlendir

**Hedef İçerik:**
```
User-Agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /_next/

# AI Crawler Engelleme (Opsiyonel)
User-Agent: GPTBot
Disallow: /

User-Agent: CCBot
Disallow: /

Sitemap: https://aloyonetim.com/sitemap.xml
```

**Kabul Kriterleri:**
- [ ] `/*?*` kuralı kaldırılmış veya düzeltilmiş
- [ ] Google Search Console'da robots.txt tester ile doğrulama
- [ ] Anahtar sayfalar "Allowed" olarak görünüyor

---

### Faz 5: Video Poster Image Ekleme
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~30 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/components/sections/Hero.tsx`, `public/images/hero-poster.webp` (YENİ) |

**Sorun:** Hero bölümündeki video `preload="auto"` ile yükleniyor. Mobilde 2.3MB video otomatik indiriliyor. Poster image olmadığı için video yüklenene kadar siyah ekran veya gradient görünüyor.

**Mevcut Kod (Hero.tsx satır 29-37):**
```tsx
<video 
  ref={videoRef}
  autoPlay loop muted playsInline 
  preload="auto"          // ← SORUN: Mobilde gereksiz 2.3MB
  src="/video/brand-film.mp4" 
  className="..."
/>
```

**Yapılacaklar:**
- Brand filminin ilk karesini çıkar → `public/images/hero-poster.webp` (< 100KB)
- Video etiketine `poster="/images/hero-poster.webp"` ekle
- `preload="auto"` → `preload="metadata"` olarak değiştir
- Mobilde videoyu tamamen devre dışı bırakma seçeneği (Faz 46'da detaylanacak)

**Hedef Kod:**
```tsx
<video 
  ref={videoRef}
  autoPlay loop muted playsInline 
  preload="metadata"
  poster="/images/hero-poster.webp"
  src="/video/brand-film.mp4" 
  className="..."
/>
```

**Kabul Kriterleri:**
- [ ] Poster image var ve < 100KB
- [ ] Video yüklenene kadar poster görünüyor
- [ ] Mobilde gereksiz veri tüketimi azalmış

---

### Faz 6: PWA Manifest Dosyası Oluşturma
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~30 dk |
| **Bağımlılık** | Faz 7 (favicon seti) |
| **Dosyalar** | `src/app/manifest.ts` (YENİ) |

**Yapılacaklar:**
- `src/app/manifest.ts` oluştur (Next.js App Router convention)
- App bilgilerini tanımla:
  - `name`: "Alo Yönetim — Profesyonel Tesis Yönetimi"
  - `short_name`: "Alo Yönetim"
  - `theme_color`: "#2D2D3A"
  - `background_color`: "#F5F5F7"
  - `display`: "standalone"
- Icon boyutları: 192×192, 384×384, 512×512 (WebP + PNG)

**Kabul Kriterleri:**
- [ ] `/manifest.webmanifest` URL'si 200 döndürüyor
- [ ] Lighthouse PWA uyarısı azalmış
- [ ] Chrome DevTools > Application > Manifest doğru görünüyor

---

### Faz 7: Favicon Seti Tamamlama
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~20 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/icon.tsx` veya `public/favicon/` altına statik dosyalar |

**Mevcut:** Sadece `favicon.ico` (2.9KB) var.

**Yapılacaklar:**
- `apple-touch-icon.png` (180×180) oluştur
- `favicon-32x32.png` ve `favicon-16x16.png` oluştur
- `src/app/icon.tsx` ile Next.js convention'ına uygun favicon üretimi
- `src/app/apple-icon.tsx` ile apple-touch-icon üretimi

**Kabul Kriterleri:**
- [ ] Safari'de apple-touch-icon görünüyor
- [ ] Tüm tarayıcılarda favicon doğru render ediliyor
- [ ] Lighthouse favicon uyarısı yok

---

### Faz 8: `next.config.ts` SEO Headers Ekleme
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~30 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `next.config.ts` |

**Mevcut Config:**
```ts
// Sadece images ve 2 redirect var
```

**Eklenecek Headers:**
```ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/video/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ];
}
```

**Kabul Kriterleri:**
- [ ] Response header'larında security header'lar görünüyor
- [ ] Statik varlıklar uzun süreli cache'leniyor
- [ ] Lighthouse Best Practices skoru artmış

---

### Faz 9: 404 Sayfası SEO Optimizasyonu
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~45 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/not-found.tsx` |

**Sorunlar:**
1. Tüm metinler hardcoded Türkçe (i18n desteksiz)
2. Popüler sayfalar/arama önerisi yok — kullanıcı kaybediliyor
3. SEO analitiği yok — hangi URL'lerin 404 verdiği bilinmiyor

**Yapılacaklar:**
- Hardcoded metinleri `useLanguage()` hook'una taşı
- "Belki bunları arıyorsunuz" bölümü ekle (Hizmetler, İletişim, Blog linkleri)
- Site içi arama kutusu veya önerilen sayfalar carousel'i
- 404 event'i GTM'e gönder (hangi URL'ler kırık?)

**Kabul Kriterleri:**
- [ ] TR ve EN dillerinde 404 sayfası çalışıyor
- [ ] Minimum 5 iç link mevcut
- [ ] Kullanıcı kolayca ana sayfaya veya hizmetlere ulaşabiliyor

---

### Faz 10: 500 / Hata Sayfası Oluşturma
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~30 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/error.tsx` (YENİ), `src/app/global-error.tsx` (YENİ) |

**Yapılacaklar:**
- `src/app/error.tsx` oluştur (sayfa bazlı hatalar)
- `src/app/global-error.tsx` oluştur (uygulama geneli hatalar)
- Kullanıcı dostu mesaj: "Bir sorun oluştu. Lütfen tekrar deneyin."
- "Tekrar Dene" butonu (reset fonksiyonu)
- Ana sayfa ve iletişim linkleri
- Hata loglama (console + ileride Sentry entegrasyonu)

**Kabul Kriterleri:**
- [ ] `error.tsx` render test'i başarılı
- [ ] Reset butonu çalışıyor
- [ ] i18n destekli mesajlar

---

## 🏗️ BÖLÜM B: STRUCTURED DATA GENİŞLETME (Faz 11–20)

### Faz 11: PageHeader Duplicate Schema Temizliği
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐⭐ Zor |
| **Süre** | ~60 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/components/layout/PageHeader.tsx`, tüm `page.tsx` dosyaları |

**Sorun:** `PageHeader.tsx` (satır 30-47) kendi BreadcrumbList JSON-LD'sini üretiyor. Ayrıca birçok sayfa dosyasında (`referanslar`, `basari-hikayeleri`, `guvenlik-akademisi` vb.) `generateBreadcrumbs()` ile ayrı bir BreadcrumbList eklendi. Bu durum aynı sayfada **2 adet BreadcrumbList** oluşturuyor.

**Karar Noktası:**
- **Seçenek A:** PageHeader'daki schema'yı kaldır, sayfa bazlı schema'ları koru (Önerilen — daha esnek)
- **Seçenek B:** Sayfa bazlı schema'ları kaldır, PageHeader'daki merkezi schema'yı koru

**Yapılacaklar:**
- `PageHeader.tsx` satır 30-54 arası JSON-LD script bloğunu kaldır
- Tüm sayfaların kendi `generateBreadcrumbs()` çağrılarının doğru çalıştığını doğrula
- Google Rich Results Test ile duplicate kontrolü

**Kabul Kriterleri:**
- [ ] Her sayfada yalnızca 1 adet BreadcrumbList var
- [ ] Google Rich Results Test "Valid" döndürüyor
- [ ] Breadcrumb görsel bileşeni (pill) hala görünüyor

---

### Faz 12: Organization Schema Zenginleştirme
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~20 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/layout.tsx` (satır 86-107) |

**Mevcut Schema Eksiklikleri:**
- `sameAs` → Sadece Twitter ve LinkedIn var, Instagram/Facebook/YouTube eksik
- `foundingDate` → Yok
- `numberOfEmployees` → Yok
- `slogan` → Yok
- `areaServed` → Sadece "TR" var, İstanbul ilçeleri belirtilmeli
- `logo` → `icon.png` referansı var ama dosya public'te yok

**Eklenecek Alanlar:**
```json
{
  "foundingDate": "2015",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "500+" },
  "slogan": "Profesyonel Mülk ve Tesis Yönetimi",
  "areaServed": {
    "@type": "City",
    "name": "İstanbul"
  },
  "sameAs": [
    "https://twitter.com/aloyonetim",
    "https://www.linkedin.com/company/aloyonetim",
    "https://www.instagram.com/aloyonetim",
    "https://www.facebook.com/aloyonetim",
    "https://www.youtube.com/@aloyonetim"
  ]
}
```

**Kabul Kriterleri:**
- [ ] Schema Markup Validator'da hata yok
- [ ] 5+ sameAs linki mevcut
- [ ] foundingDate ve numberOfEmployees eklenmiş

---

### Faz 13: WebSite Schema + SearchAction (Sitelinks Search Box)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~30 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/layout.tsx` |

**Amaç:** Google arama sonuçlarında "Alo Yönetim" arandığında, doğrudan site içi arama kutusu (Sitelinks Search Box) gösterilmesi.

**Eklenecek Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Alo Yönetim",
  "url": "https://aloyonetim.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://aloyonetim.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Not:** Arama fonksiyonu sitede yoksa, en azından blog sayfasına yönlendirme yapılabilir. İleride gerçek arama implementasyonu (Faz 44'te) yapılacak.

**Kabul Kriterleri:**
- [ ] WebSite schema Rich Results Test'te valid
- [ ] SearchAction URL template doğru çalışıyor

---

### Faz 14: AggregateRating Schema (Ana Sayfa)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~15 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/page.tsx` (LocalBusiness schema'sına ekleme) |

**Amaç:** Google arama sonuçlarında yıldız derecelendirmesi gösterilmesi.

**Eklenecek (LocalBusiness içine):**
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "340",
  "bestRating": "5",
  "worstRating": "1"
}
```

**Kabul Kriterleri:**
- [ ] Rich Results Test'te yıldız görünüyor
- [ ] Değerler gerçek müşteri puanlarına dayanıyor

---

### Faz 15: VideoObject Schema (Hero Bölümü)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐ Kolay |
| **Süre** | ~20 dk |
| **Bağımlılık** | Faz 5 (video poster) |
| **Dosyalar** | `src/app/page.tsx` |

**Eklenecek Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Alo Yönetim Tanıtım Filmi",
  "description": "Profesyonel mülk ve tesis yönetimi hizmetlerimizi tanıtan kurumsal filmimiz.",
  "thumbnailUrl": "https://aloyonetim.com/images/hero-poster.webp",
  "uploadDate": "2026-01-15T08:00:00+03:00",
  "contentUrl": "https://aloyonetim.com/video/brand-film.mp4",
  "duration": "PT1M30S",
  "publisher": {
    "@type": "Organization",
    "name": "Alo Yönetim"
  }
}
```

**Kabul Kriterleri:**
- [ ] Google Video arama sonuçlarında indekslenme potansiyeli
- [ ] Schema valid

---

### Faz 16: HowTo Schema (İşlem Adımları Bölümü)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~30 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/components/sections/InteractiveProcessSteps.tsx` veya `src/app/page.tsx` |

**Amaç:** Ana sayfadaki "Nasıl Çalışırız?" süreç adımlarını `HowTo` schema ile tanımla.

**Kabul Kriterleri:**
- [ ] Rich Results Test'te HowTo preview görünüyor
- [ ] Her adım `HowToStep` olarak tanımlı

---

### Faz 17: Review Schema (Testimonial Slider)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~30 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/components/sections/TestimonialSlider.tsx` |

**Mevcut:** TestimonialSlider zaten bir schema bloğu içeriyor (satır 107-110). Mevcut schema'yı zenginleştir.

**Kabul Kriterleri:**
- [ ] Her review'da `reviewRating`, `author`, `datePublished` var
- [ ] Schema valid

---

### Faz 18: Event Schema (Güvenlik Akademisi Eğitimleri)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~25 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/guvenlik-akademisi/page.tsx` |

**Kabul Kriterleri:**
- [ ] Event schema'da `startDate`, `location`, `organizer` mevcut
- [ ] Google Events arama sonuçlarında görünme potansiyeli

---

### Faz 19: JobPosting Schema (İstihdam Köprüsü)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~25 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/istihdam-koprusu/page.tsx` |

**Kabul Kriterleri:**
- [ ] JobPosting schema'da `title`, `datePosted`, `hiringOrganization` mevcut
- [ ] Google Jobs arama sonuçlarında görünme potansiyeli

---

### Faz 20: Product/Offer Schema (Sektörel Çözümler)
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐ Orta |
| **Süre** | ~25 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/sektorel-cozumler/page.tsx` |

**Kabul Kriterleri:**
- [ ] Her çözüm paketi `Service` + `Offer` schema ile tanımlı
- [ ] `areaServed`, `priceRange` alanları mevcut

---

## 📝 BÖLÜM C: İÇERİK SEO & SAYFA BAZLI OPTİMİZASYON (Faz 21–35)

### Faz 21: Ana Sayfa İçerik Derinliği Artırma
| Özellik | Değer |
|---------|-------|
| **Zorluk** | ⭐⭐⭐ Zor |
| **Süre** | ~90 dk |
| **Bağımlılık** | Yok |
| **Dosyalar** | `src/app/page.tsx`, ilgili section bileşenleri |

**Sorun:** Ana sayfa büyük oranda bileşen tabanlı. Metin içeriği yetersiz (thin content riski). Google bot'u sayfada yeterli "okunabilir içerik" bulamıyor olabilir.

**Yapılacaklar:**
- Hero alt bölüme 200+ kelimelik metin bloğu ekle ("Neden Alo Yönetim?")
- BentoServices kartlarına daha uzun açıklama metinleri
- ComparisonTable'a SEO dostu başlık ve açıklama
- Minimum toplam 800+ kelime sayfa genelinde
- H1 → H2 → H3 heading hiyerarşisi kontrolü

**Hedef Keyword'ler:**
- "İstanbul site yönetimi" (H1 civarında)
- "profesyonel apartman yönetimi" (H2'lerde)
- "tesis yönetim firması" (gövde metinde)

**Kabul Kriterleri:**
- [ ] Sayfa genelinde 800+ kelime
- [ ] Doğru heading hiyerarşisi (H1 > H2 > H3)
- [ ] Hedef keyword'ler doğal olarak yerleştirilmiş

---

### Faz 22–30: Hizmet Sayfaları İçerik Optimizasyonu
Her hizmet sayfası için:

| Faz | Sayfa | Hedef Keyword | Dosya |
|-----|-------|---------------|-------|
| 22 | Hizmetler Ana | tesis yönetimi hizmetleri | `hizmetler/page.tsx` |
| 23 | Güvenlik Yönetimi | özel güvenlik İstanbul | `hizmetler/guvenlik-yonetimi/page.tsx` |
| 24 | Tesis Yönetimi | profesyonel bina yönetimi | `hizmetler/tesis-yonetimi/page.tsx` |
| 25 | Temizlik ve Hijyen | endüstriyel temizlik firması | `hizmetler/temizlik-ve-hijyen/page.tsx` |
| 26 | Teknik Bakım | asansör bakım firması İstanbul | `hizmetler/teknik-bakim/page.tsx` |
| 27 | Peyzaj Bakımı | site peyzaj bakımı | `hizmetler/peyzaj-ve-bahce-bakimi/page.tsx` |
| 28 | Havuz Bakımı | havuz bakımı İstanbul | `hizmetler/havuz-bakimi-ve-hijyen/page.tsx` |
| 29 | Haşere Dezenfeksiyon | ilaçlama firması İstanbul | `hizmetler/hasere-ve-dezenfeksiyon/page.tsx` |
| 30 | Hukuk ve İcra | aidat borcu hukuki takip | `hizmetler/hukuk-ve-icra-danismanligi/page.tsx` |

**Her sayfa için yapılacaklar:**
- 1000+ kelimelik long-form içerik
- H2/H3 alt başlıklar ile yapılandırılmış
- Inline SSS bölümü (FAQPage schema ile)
- En az 3 internal link (diğer hizmetler + blog)
- CTA butonu (Teklif Al)
- Süre: Her biri ~60 dk

---

### Faz 31–35: Kurumsal ve Özel Sayfa İçerik Optimizasyonu

| Faz | Sayfa | Hedef | Dosya |
|-----|-------|-------|-------|
| 31 | Hakkımızda | E-E-A-T sinyalleri, tarihçe | `hakkimizda/page.tsx` |
| 32 | Blog İçerik Stratejisi | 20 blog başlık listesi | Doküman |
| 33 | Kurumsal Sayfalar | Vizyon, Kalite, Sürdürülebilirlik | `kurumsal/*/page.tsx` |
| 34 | SSS İçerik Genişletme | 20+ soru, kategorize | `sss/page.tsx` |
| 35 | GES Projeleri | ROI hesaplama, maliyet analizi | `surdurulebilirlik/ges-projeleri/page.tsx` |

---

## 🔗 BÖLÜM D: INTERNAL LINKING & SİTE MİMARİSİ (Faz 36–45)

| Faz | Konu | Zorluk | Süre | Dosyalar |
|-----|------|--------|------|----------|
| 36 | Breadcrumb navigasyon tutarlılığı | ⭐⭐ | 45dk | Tüm page.tsx + PageHeader |
| 37 | Footer internal link optimizasyonu | ⭐⭐ | 30dk | `Footer.tsx` |
| 38 | Hizmet sayfaları "İlgili Hizmetler" bölümü | ⭐⭐⭐ | 90dk | 8 hizmet page.tsx |
| 39 | Blog ↔ Hizmet karşılıklı link ağı | ⭐⭐ | 45dk | Blog + hizmet sayfaları |
| 40 | Referanslar ↔ Başarı Hikayeleri bağlantı döngüsü | ⭐⭐ | 30dk | İlgili page.tsx'ler |
| 41 | Uzun sayfalar için sayfa içi anchor linkler | ⭐⭐ | 45dk | Hakkımızda, SSS |
| 42 | CTA tutarlılık denetimi | ⭐ | 20dk | Tüm sayfalar |
| 43 | Orphan page (yetim sayfa) tespiti | ⭐⭐ | 30dk | Tüm site |
| 44 | Navigation derinliği optimizasyonu | ⭐⭐ | 30dk | `Header.tsx` |
| 45 | HTML Sitemap sayfası oluşturma | ⭐⭐ | 45dk | `src/app/site-haritasi/page.tsx` (YENİ) |

---

## ⚡ BÖLÜM E: CORE WEB VITALS & PERFORMANS (Faz 46–60)

| Faz | Konu | Zorluk | Süre | Dosyalar |
|-----|------|--------|------|----------|
| 46 | Hero video mobil lazy loading | ⭐⭐⭐ | 60dk | `Hero.tsx` |
| 47 | Component code splitting denetimi | ⭐⭐⭐ | 60dk | Büyük bileşenler |
| 48 | CSS critical path optimizasyonu | ⭐⭐⭐ | 45dk | `globals.css` |
| 49 | Material Symbols font optimizasyonu | ⭐⭐⭐ | 60dk | `layout.tsx` |
| 50 | Third-party script optimizasyonu | ⭐⭐ | 30dk | `layout.tsx` |
| 51 | Image optimization denetimi | ⭐⭐ | 30dk | Tüm Image bileşenleri |
| 52 | LCP optimizasyonu | ⭐⭐⭐ | 45dk | Hero, font preload |
| 53 | CLS düzeltmeleri | ⭐⭐ | 30dk | Resimler, fontlar |
| 54 | INP optimizasyonu | ⭐⭐⭐ | 45dk | Event handler'lar |
| 55 | Lenis smooth scroll performans denetimi | ⭐⭐ | 30dk | `SmoothScroll.tsx` |
| 56 | CustomCursor performans optimizasyonu | ⭐⭐ | 30dk | `CustomCursor.tsx` |
| 57 | NoiseOverlay gerekliliği değerlendirmesi | ⭐ | 15dk | `NoiseOverlay.tsx` |
| 58 | Framer Motion bundle optimizasyonu | ⭐⭐⭐ | 45dk | Tüm framer-motion imports |
| 59 | Next.js Image config iyileştirme | ⭐⭐ | 30dk | `next.config.ts` |
| 60 | Web Vitals izleme altyapısı kurma | ⭐⭐⭐ | 60dk | `layout.tsx`, yeni util |

---

## 🌍 BÖLÜM F: ULUSLARARASILAŞTIRMA & HREFLANG (Faz 61–70)

| Faz | Konu | Zorluk | Süre | Dosyalar |
|-----|------|--------|------|----------|
| 61 | i18n routing stratejisi belirleme | ⭐⭐⭐ | 60dk | Mimari karar |
| 62 | Hreflang etiketleri doğrulama | ⭐⭐ | 30dk | `layout.tsx` |
| 63 | İngilizce çeviri tamamlanma kontrolü | ⭐⭐ | 45dk | `translations.ts` |
| 64 | Almanca içerik stratejisi | ⭐ | 15dk | Karar noktası |
| 65 | Not-Found + CookieConsent i18n | ⭐⭐ | 45dk | İlgili .tsx dosyaları |
| 66 | SEO-friendly URL'lerde dil desteği | ⭐⭐⭐ | 60dk | Middleware, routing |
| 67 | OG locale çoklu dil desteği | ⭐⭐ | 30dk | `layout.tsx` |
| 68 | JSON-LD inLanguage alanları | ⭐⭐ | 30dk | Tüm schema'lar |
| 69 | Content-Language HTTP header | ⭐⭐ | 20dk | `next.config.ts` |
| 70 | Dil değiştirici SEO uyumluluğu | ⭐⭐ | 30dk | `Header.tsx` |

---

## 🛡️ BÖLÜM G: GÜVENLİK, YASAL UYUMLULUK & TRUST SİNYALLERİ (Faz 71–80)

| Faz | Konu | Zorluk | Süre | Dosyalar |
|-----|------|--------|------|----------|
| 71 | KVKK sayfası içerik + schema | ⭐⭐ | 45dk | `kvkk-ve-aydinlatma-metni/page.tsx` |
| 72 | Çerez Politikası sayfası oluşturma | ⭐⭐ | 60dk | YENİ sayfa |
| 73 | Gizlilik Politikası sayfası | ⭐⭐ | 60dk | YENİ sayfa |
| 74 | Kullanım Şartları sayfası | ⭐⭐ | 60dk | YENİ sayfa |
| 75 | Trust badge ve sertifika görselleri | ⭐⭐ | 45dk | `public/images/badges/` |
| 76 | Google Business Profile entegrasyonu | ⭐ | 15dk | Schema kontrolü |
| 77 | Sosyal medya profil bağlantıları | ⭐ | 15dk | `layout.tsx`, `Footer.tsx` |
| 78 | Author/Expert profil sayfaları | ⭐⭐⭐ | 60dk | YENİ bileşen |
| 79 | Testimonial doğrulama ve kaynak gösterimi | ⭐⭐ | 30dk | `TestimonialSlider.tsx` |
| 80 | Schema.org toplu doğrulama testi | ⭐⭐ | 45dk | Tüm sayfalar |

---

## 📊 BÖLÜM H: ANALİTİK, İZLEME & RAPORLAMA (Faz 81–90)

| Faz | Konu | Zorluk | Süre | Dosyalar |
|-----|------|--------|------|----------|
| 81 | Google Search Console entegrasyonu hazırlığı | ⭐ | 15dk | Meta tag veya DNS |
| 82 | GA4 kurulumu (GTM üzerinden) | ⭐⭐ | 30dk | GTM config |
| 83 | Conversion tracking (form, tel, whatsapp) | ⭐⭐ | 45dk | GTM events |
| 84 | Custom events tanımlama | ⭐⭐ | 30dk | GTM events |
| 85 | Performans izleme dashboard | ⭐⭐ | 30dk | GA4 + CrUX |
| 86 | SEO KPI dashboard oluşturma | ⭐⭐ | 30dk | Doküman |
| 87 | Heatmap / kullanıcı davranışı analizi | ⭐⭐ | 30dk | Clarity/Hotjar |
| 88 | A/B test altyapısı | ⭐⭐⭐ | 60dk | Mimari |
| 89 | Otomatik SEO sağlık kontrolü scripti | ⭐⭐⭐ | 60dk | Script (YENİ) |
| 90 | Aylık SEO rapor şablonu | ⭐ | 30dk | Doküman (.md) |

---

## 🏆 BÖLÜM I: GELİŞMİŞ TEKNİKLER & EDGE CASES (Faz 91–100)

| Faz | Konu | Zorluk | Süre | Dosyalar |
|-----|------|--------|------|----------|
| 91 | Dinamik OG Image Generation (ImageResponse) | ⭐⭐⭐ | 60dk | `opengraph-image.tsx` (YENİ) |
| 92 | ISR değerlendirmesi (blog sayfaları) | ⭐⭐⭐ | 45dk | Blog page'ler |
| 93 | Edge Middleware bot algılama | ⭐⭐⭐ | 45dk | `middleware.ts` (YENİ) |
| 94 | XML Sitemap bölümlendirme | ⭐⭐⭐ | 45dk | `sitemap.ts` |
| 95 | Structured Data @graph birleştirme | ⭐⭐⭐ | 60dk | Tüm schema'lar |
| 96 | Link rel preload/prefetch stratejisi | ⭐⭐ | 30dk | `layout.tsx` |
| 97 | Redirect chain denetimi | ⭐⭐ | 30dk | `next.config.ts` |
| 98 | A11Y final denetimi (WCAG 2.1 AA) | ⭐⭐⭐ | 90dk | Tüm bileşenler |
| 99 | Lighthouse CI pipeline kurulumu | ⭐⭐⭐ | 60dk | CI/CD config |
| 100 | Final SEO audit ve canlıya hazırlık | ⭐⭐⭐ | 120dk | Tüm proje |

---

## 📋 ÖZET TABLOSU

| Bölüm | Faz Aralığı | Konu | Öncelik | Toplam Süre |
|--------|-------------|------|---------|-------------|
| **A** | 1–10 | Teknik Altyapı & Kritik Hatalar | 🔴 Acil | ~5 saat |
| **B** | 11–20 | Structured Data Genişletme | 🟠 Yüksek | ~4 saat |
| **C** | 21–35 | İçerik SEO & Sayfa Optimizasyonu | 🟠 Yüksek | ~15 saat |
| **D** | 36–45 | Internal Linking & Site Mimarisi | 🟡 Orta | ~6 saat |
| **E** | 46–60 | Core Web Vitals & Performans | 🟡 Orta | ~10 saat |
| **F** | 61–70 | Uluslararasılaştırma & Hreflang | 🟢 Normal | ~6 saat |
| **G** | 71–80 | Güvenlik, Yasal & Trust Sinyalleri | 🟢 Normal | ~7 saat |
| **H** | 81–90 | Analitik, İzleme & Raporlama | 🔵 Düşük | ~6 saat |
| **I** | 91–100 | Gelişmiş Teknikler & Edge Cases | 🔵 Düşük | ~10 saat |
| | | | **TOPLAM** | **~69 saat** |

---

## 📅 ÖNERİLEN UYGULAMA TAKVİMİ

| Hafta | Bölüm | Açıklama |
|-------|-------|----------|
| Hafta 1 | A (Faz 1-10) | Kritik hataları düzelt, temel altyapıyı kur |
| Hafta 2 | B (Faz 11-20) | Structured data'yı zenginleştir |
| Hafta 3-4 | C (Faz 21-35) | İçerik derinliği artır (en uzun bölüm) |
| Hafta 5 | D (Faz 36-45) | İç bağlantı ağını ör |
| Hafta 6-7 | E (Faz 46-60) | Performansı optimize et |
| Hafta 8 | F (Faz 61-70) | Çoklu dil desteğini kur |
| Hafta 9 | G (Faz 71-80) | Yasal sayfalar ve güven sinyalleri |
| Hafta 10 | H (Faz 81-90) | Analitik ve izleme |
| Hafta 11 | I (Faz 91-100) | Son dokunuşlar ve canlıya çıkış |

---

## 🔑 BAŞARI METRİKLERİ

| Metrik | Mevcut (Tahmini) | Hedef |
|--------|-------------------|-------|
| Lighthouse Performance | ~65 | ≥ 90 |
| Lighthouse SEO | ~80 | ≥ 95 |
| Lighthouse A11Y | ~75 | ≥ 90 |
| Lighthouse Best Practices | ~80 | ≥ 95 |
| Core Web Vitals LCP | ~4s | < 2.5s |
| Core Web Vitals CLS | ~0.15 | < 0.1 |
| Core Web Vitals INP | ~300ms | < 200ms |
| Organik Trafik (Aylık) | 0 | 5.000+ (6 ay sonra) |
| İndexlenmiş Sayfa | ~30 | 50+ |
| Rich Results Oranı | %30 | %80+ |

---

> **⚠️ ÖNEMLİ NOTLAR:**
> 1. Bu plan, mevcut projenin derinlemesine analizine dayanmaktadır.
> 2. Her fazın uygulaması sırasında güncel projeye göre adaptasyon yapılacaktır.
> 3. Fazlar sıralı uygulanmalıdır; her bölüm bir öncekinin tamamlanmasına bağlıdır.
> 4. İçerik fazları (Bölüm C) en uzun sürecek bölümdür — sabır gerektirir.
> 5. Build testi (`npm run build`) her 10 fazda bir yapılmalıdır.
> 6. Google Search Console ve Rich Results Test her bölüm sonunda kontrol edilmelidir.
