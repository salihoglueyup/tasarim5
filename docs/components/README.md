# 🧩 Bileşen Haritası (Component Map)

> **Toplam:** 100+ React bileşeni, 8 ana kategori
> **Dizin:** src/components/

---

## 📂 Klasör Yapısı Genel Bakış

| Klasör | Bileşen Sayısı | Açıklama |
|---|---|---|
| layout/ | 5 | Sayfa iskeleti (Header, Footer, PageHeader) |
| sections/ | 15+ | Sayfa bölüm bileşenleri (Hero, Calculator) |
| seo/ | 82 | JSON-LD + yapılandırılmış veri bileşenleri |
| ui/ | 20+ | Atomik UI bileşenleri (Button, Card, Badge) |
| blog/ | 8 | Blog özel bileşenler |
| cro/ | 5 | Dönüşüm odaklı bileşenler |
| modals/ | 3 | Modal/overlay bileşenleri |
| admin/ | 10+ | Admin paneli bileşenleri |

---

## 🏗️ Layout Bileşenleri (src/components/layout/)

### Header.tsx
Ana navigasyon çubuğu. Evrensel parlak navbar sistemi.

Önemli özellikler:
- isScrolled: Kaydırma ile donmuş cam görünümü (bg-white/90 backdrop-blur-2xl)
- isTopAndDarkHero: Sayfa en üstünde tüm sayfalarda aktif — beyaz logo + kristal menü
- Dil değiştirici: 4 dil capsülü (tr/en/ru/ar)
- MegaMenuDropdown: Statik import ile sync yükleme
- handleLanguageChange: Dile göre eşdeğer sayfaya yönlendirme

### Footer.tsx
Site alt bölümü. Dil duyarlı linkler, NAP bilgileri, ISO rozet grid'i.

### PageHeader.tsx
Alt sayfa başlık bileşeni. Ultra-premium Dark Hero Slate-950 standardı.

Özellikler:
- bg-slate-950 titanium koyu gradyanı
- Cam breadcrumb rozeti (bg-white/10 backdrop-blur-md)
- Ambient glow efekti
- Otomatik breadcrumb oluşturma

### NavigationWrapper.tsx
Skip-to-content linki (erişilebilirlik). "İçeriğe Atla" sr-only + focus görünürlüğü.

### MegaMenuDropdown.tsx
Hizmetler mega menüsü. Hizmet kategorileri, ikonlar ve açıklamalar.

---

## 📑 Section Bileşenleri (src/components/sections/)

| Bileşen | Açıklama |
|---|---|
| Hero.tsx | Ana sayfa hero video bölümü (poster + fetchPriority=high) |
| BentoServices.tsx | Hizmetler bento grid (3D tilt, animasyon) |
| FacilityCalculator.tsx | Tesis yönetimi maliyet hesaplayıcı |
| DuesCalculator.tsx | Aidat hesaplayıcı |
| CleaningCalculator.tsx | Temizlik maliyet hesaplayıcı |
| SecurityCalculator.tsx | Güvenlik maliyet hesaplayıcı |
| TestimonialSlider.tsx | Müşteri yorumları slayt gösterisi |
| FacilityTestimonials.tsx | Tesis yönetimi referans yorumları |
| InteractiveFacilityExplorer.tsx | 3D tesis keşfetme aracı |
| RelatedServices.tsx | İlgili hizmet önerileri |

---

## 🔍 SEO Bileşenleri (src/components/seo/) — 82 Dosya

Bkz. [SEO_COMPONENTS.md](SEO_COMPONENTS.md) için tam detaylı referans.

**Kategori özeti:**
- **Temel:** JsonLd, LocalBusinessSeo, ServiceSeo, BlogSeo
- **Etkileşimli Araçlar:** InteractiveFacilityAuditRadarSeo, KMKLawAssistantSeo, GlobalSpotlightSearchSeo
- **Hesaplayıcılar:** FacilityManagementCalculatorSeo, InteractiveCostSimulatorSeo, SectoralRoiCalculatorSeo
- **İlçe Bazlı:** DistrictFacilityAuditTableSeo, DistrictSecurityAuditTableSeo, IstanbulDuesHeatmapSeo
- **Yasal & KMK:** FacilityLegalTemplateGeneratorSeo, KMKLegalProcessHowToSeo, FacilityLegalPrecedentsBrowserSeo
- **AI & GEO:** AIOptimizedSummary, VoiceSearchSpeakableSeo
- **Navigasyon:** DynamicBreadcrumb, SemanticLinker, TableOfContentsSeo

---

## 🎯 UI Atomik Bileşenleri (src/components/ui/)

Yeniden kullanılabilir tasarım sistemi bileşenleri.
Tüm bileşenler Slate & Titanium renk paleti ile uyumludur (mavi renk YOK).

---

## ✍️ Blog Bileşenleri (src/components/blog/)

| Bileşen | Açıklama |
|---|---|
| PostBody.tsx | Blog makale içerik render (MDX/Markdown + blok ayrıştırıcı) |
| BlogFAQExtractor.tsx | Blog içinden SSS extraction |

---

## 🔄 CRO (Dönüşüm) Bileşenleri (src/components/cro/)

Ziyaretçiyi müşteriye dönüştürmeye yönelik bileşenler:
- QuickCallWidget — Sabit çağrı butonu
- WhatsApp hızlı iletişim
- Teklif al CTA bölümleri

---

## 📋 Tasarım Kuralları

1. Mavi renk KULLANILMAZ (blue-*) — Proje paleti: Slate & Titanium
2. Framer Motion'da LazyMotion içinde m.* kullan (tree shaking)
3. Server Component varsayılan — gerekliyse 'use client' ekle
4. prefers-reduced-motion desteği zorunlu
5. Tüm görseller next/image ile (AVIF/WebP)

---

İlgili: LAYOUT_COMPONENTS.md, SECTIONS_COMPONENTS.md, SEO_COMPONENTS.md
