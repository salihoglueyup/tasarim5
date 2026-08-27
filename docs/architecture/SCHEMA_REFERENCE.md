# 📐 JSON-LD Schema Fabrikası Referansı

> **Kaynak:** src/lib/schemas.ts (58KB, 1000+ satır)
> Tüm JSON-LD şema üretimi bu fabrika modülünden merkezileştirilir.

---

## Temel Sabitler ve Organizasyon Verisi

`	ypescript
// Projenin temel sabitleri (schemas.ts içinden)
BASE_URL = "https://aloyonetim.com.tr"
ORG_ID   = "https://aloyonetim.com.tr/#organization"
ORG_NAME = "Alo Yönetim"
ORG_LEGAL_NAME = "Alo Yönetim Tesis Hizmetleri"
ORG_PHONE = "+902165504848"
ORG_EMAIL = "info@aloyonetim.com.tr"
ORG_ADDRESS = { street: "Moda Cad.", city: "Kadıköy", region: "İstanbul" }
ORG_GEO = { lat: 40.9947, lng: 29.0239 }
`

---

## 📦 Şema Fabrikaları — Tam Referans

### 1. organizationSchema()

**Tip:** Organization / Corporation
**Kullanım:** Tüm sayfalarda <JsonLd /> bileşeni ile

İçerik: Şirket adı, logo, NAP, sosyal medya linkleri (sameAs), kuruluş yılı, alanOfFocus, TÜRKAK/ISO hasCredential

`	ypescript
import { organizationSchema } from '@/lib/schemas';
const schema = organizationSchema();
// → { "@type": "Corporation", name: "Alo Yönetim", ... }
`

---

### 2. webSiteSchema()

**Tip:** WebSite + SearchAction (Sitelinks arama kutusu)
**Kullanım:** Root layout veya ana sayfa

`	ypescript
const schema = webSiteSchema();
// → { "@type": "WebSite", url: BASE_URL, potentialAction: { "@type": "SearchAction" } }
`

---

### 3. serviceSchema(service)

**Tip:** Service
**Kullanım:** Her hizmet sayfasında

Parametreler:
- service.name — Hizmet adı
- service.description — Hizmet açıklaması
- service.url — Hizmet sayfası URL
- service.areaServed — Hizmet verilen bölgeler
- service.price — Fiyat aralığı (opsiyonel)

`	ypescript
const schema = serviceSchema({
  name: "Tesis Yönetimi",
  description: "ISO 41001 standartlarında...",
  url: "/hizmetler/tesis-yonetimi"
});
`

---

### 4. faqSchema(items)

**Tip:** FAQPage + Question + Answer
**Kullanım:** SSS sayfası, hizmet sayfaları SSS bölümleri

`	ypescript
const schema = faqSchema([
  { question: "Aidat nedir?", answer: "Kat malikleri tarafından..." }
]);
`

---

### 5. articleSchema(post)

**Tip:** Article / BlogPosting
**Kullanım:** Blog makale sayfaları

Parametreler: başlık, özet, yazar, yayın tarihi, güncelleme tarihi, görsel, kategori

---

### 6. breadcrumbSchema(items)

**Tip:** BreadcrumbList + ListItem
**Kullanım:** Tüm alt sayfalarda otomatik (DynamicBreadcrumb bileşeni)

`	ypescript
const schema = breadcrumbSchema([
  { name: "Ana Sayfa", url: "/" },
  { name: "Hizmetler", url: "/hizmetler" },
  { name: "Tesis Yönetimi", url: "/hizmetler/tesis-yonetimi" }
]);
`

---

### 7. localBusinessSchema()

**Tip:** LocalBusiness / ProfessionalService
**Kullanım:** İletişim sayfası, yerel arama hedefli sayfalar

Tam NAP + açılış saatleri + servis alanı (12 ilçe) + coğrafi koordinatlar

---

### 8. eventSchema(event)

**Tip:** Event
**Kullanım:** Etkinlik duyuruları

---

### 9. howToSchema(steps)

**Tip:** HowTo + HowToStep
**Kullanım:** Adım adım kılavuz içerikleri, KMK yasal süreç açıklamaları

---

### 10. reviewSchema / aggregateRatingSchema

**Tip:** AggregateRating
**Kullanım:** Değerlendirme yıldızları (Google GMB entegrasyonu)

---

### 11. videoSchema(video)

**Tip:** VideoObject
**Kullanım:** Video içerikli sayfalarda

---

### 12. jobPostingSchema(job)

**Tip:** JobPosting
**Kullanım:** Kariyer/istihdam sayfaları

---

### 13. courseSchema / educationalSchema

**Tip:** Course, EducationalOrganization
**Kullanım:** Güvenlik akademisi sayfası

---

### 14. definedTermSetSchema(terms)

**Tip:** DefinedTermSet + DefinedTerm
**Kullanım:** Sözlük sayfası (500+ terim)

---

### 15. speakableSchema

**Tip:** SpeakableSpecification
**Kullanım:** Sesli arama ve GEO optimizasyonu (AIOptimizedSummary bileşeni)

---

### 16. imageObjectSchema(image)

**Tip:** ImageObject
**Kullanım:** Görseller için zengin meta (alt, boyut, lisans)

---

### 17. personSchema(person)

**Tip:** Person
**Kullanım:** Blog yazarları, şirket yetkilileri

---

### 18. siteNavigationSchema(links)

**Tip:** SiteNavigationElement + ItemList
**Kullanım:** Ana navigasyon yapısı

---

### 19. checklistSchema(items)

**Tip:** ItemList (denetim kontrol listesi için)
**Kullanım:** Tesis denetim listeleri, güvenlik kontrolleri

---

### 20. caseStudySchema(study)

**Tip:** Article (vaka çalışması varyantı)
**Kullanım:** Referans proje detay sayfaları

---

## 🧩 JsonLd Bileşeni Kullanımı

`	sx
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema } from '@/lib/schemas';

// Server Component içinde:
<JsonLd data={organizationSchema()} />
<JsonLd data={serviceSchema({ name: "..." })} />
`

Birden fazla şema aynı sayfada kullanılabilir (array olarak da verilebilir).

---

## 🔍 Schema.org Doğrulama

`
https://search.google.com/test/rich-results
https://validator.schema.org/
`

Yerel lint için:
`ash
# Admin API ile schema doğrulama:
curl -X POST /api/admin/schema-lint \
  -H "Content-Type: application/json" \
  -d '{"url": "https://aloyonetim.com.tr/hizmetler/tesis-yonetimi"}'
`

---

## 📊 Schema Kullanım Haritası

| Sayfa | Kullanılan Şemalar |
|---|---|
| Ana Sayfa | Organization, WebSite, LocalBusiness, FAQ, AggregateRating |
| Hizmet Sayfaları | Service, BreadcrumbList, FAQ, HowTo, SpeakableSpecification |
| Blog Makaleleri | Article/BlogPosting, Person, BreadcrumbList |
| SSS Sayfası | FAQPage, BreadcrumbList |
| İletişim | LocalBusiness, Organization |
| Sözlük | DefinedTermSet, DefinedTerm |
| Referanslar | ItemList, CaseStudy |
| İstihdam | JobPosting |
| Güvenlik Akademisi | Course, EducationalOrganization |

---

İlgili: ../components/SEO_COMPONENTS.md, ../seo/SEO_ENGINE_REFERENCE.md
