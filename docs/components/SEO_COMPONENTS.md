# 🎨 SEO Bileşenleri Tam Referansı (src/components/seo/)

> **Toplam:** 82 SEO bileşeni — JSON-LD yapılandırılmış veri, etkileşimli araçlar ve AI beslemeleri
> Tüm bileşenler Server Component'tir (aksi belirtilmediği sürece).

---

## 📦 Temel JSON-LD Bileşenleri

| Bileşen | Şema Tipi | Kullanım Sayfası |
|---|---|---|
| JsonLd.tsx | Generic JSON-LD wrapper | Tüm sayfalar |
| LocalBusinessSeo.tsx | LocalBusiness | İletişim, bölge sayfaları |
| ServiceSeo.tsx | Service | Hizmet sayfaları |
| BlogSeo.tsx | Article / BlogPosting | Blog makale sayfası |
| BlogArticleEcosystemSeo.tsx | Article + ItemList + FAQ | Blog makale ekosistemi |
| AggregateRatingSeo.tsx | AggregateRating | Ana sayfa, hizmet sayfaları |
| ReviewListSeo.tsx | Review | Değerlendirme listesi |
| EventSeo.tsx | Event | Etkinlik sayfaları |
| JobPostingSeo.tsx | JobPosting | İstihdam sayfası |
| PersonSeo.tsx | Person | Yazar profilleri |
| ItemListSeo.tsx | ItemList | Liste sayfaları |
| SiteNavigationSeo.tsx | SiteNavigationElement | Navigasyon yapısı |
| LegalPageSeo.tsx | WebPage (legal) | Yasal sayfalar (KVKK, Gizlilik) |
| ImageWithSeo.tsx | ImageObject | Görseller |
| VideoWithSeo.tsx | VideoObject | Video içerikler |
| GTMDataLayer.tsx | - | GTM veri katmanı push |

---

## 🧭 Navigasyon & Yapı Bileşenleri

| Bileşen | Açıklama |
|---|---|
| DynamicBreadcrumb.tsx | Otomatik BreadcrumbList şeması + görsel gezinme çizgisi |
| DynamicFAQ.tsx | FAQPage şeması + açılır kapanır UI |
| TableOfContentsSeo.tsx | İçindekiler tablosu (makaleler için) + ItemList şeması |
| SemanticLinker.tsx | Otomatik dahili bağlantı motoru (10K+ terimi tanır) |
| GeoTargetAreaSeo.tsx | Bölge bazlı coğrafi hedefleme şeması |
| NeighborhoodDirectorySeo.tsx | Mahalle dizini yapılandırılmış verisi |

---

## 🤖 AI & Sesli Arama Bileşenleri

| Bileşen | Açıklama |
|---|---|
| AIOptimizedSummary.tsx | Google SGE / Perplexity için SpeakableSpecification + TL;DR kartı |
| VoiceSearchSpeakableSeo.tsx | Sesli arama için Speakable şema + kısa yanıt yapısı |
| InstantAnswerCardSeo.tsx | Anında cevap kartı (featured snippet hedefli) |
| KeywordAnalysisSeo.tsx | Anahtar kelime analiz görsel bileşeni |
| LiveMetricBadgeSeo.tsx | Gerçek zamanlı metrik rozeti (ISO, sertifika sayıları) |

---

## 🏢 Tesis Yönetimi Özel Bileşenleri

| Bileşen | Açıklama | Sayfa |
|---|---|---|
| FacilityComparisonMatrixSeo.tsx | Tesis türleri karşılaştırma matrisi | tesis-yonetimi |
| FacilityDistrictGridSeo.tsx | İlçe bazlı tesis grid'i | tesis-yonetimi |
| FacilityEcoHealthScoreSeo.tsx | Eko-sağlık skor tablosu | sürdürülebilirlik |
| FacilityGroupSecurityTrustSeo.tsx | Güven grubu şema bileşeni | tesis-yonetimi |
| FacilityManagementCalculatorSeo.tsx | Tesis maliyet hesaplayıcı + Schema | hesaplayici |
| FacilitySubSectorCrossNav.tsx | Alt sektör çapraz navigasyon | hizmetler |
| ServiceAuthorityHubSeo.tsx | Hizmet otorite merkezi | hizmetler |
| ServiceComparisonMatrixSeo.tsx | Hizmet karşılaştırma matrisi | hizmetler |
| InteractiveFacilityAuditRadarSeo.tsx | Tesis denetim radar grafiği | tesis-yonetimi |

---

## ⚖️ KMK & Yasal Bileşenler

| Bileşen | Açıklama | Boyut |
|---|---|---|
| KMKLawAssistantSeo.tsx | KMK hukuk asistanı tam bileşen | 21.6KB |
| KMKLegalProcessHowToSeo.tsx | KMK yasal süreç adımları HowTo şeması | 10.7KB |
| KMKLegalTemplateGeneratorSeo.tsx | KMK yasal belge şablonu üretici | 15.2KB |
| FacilityLegalTemplateGeneratorSeo.tsx | Tesis yasal şablon üretici | 16.9KB |
| FacilityLegalPrecedentsBrowserSeo.tsx | Hukuki emsal tarayıcı | 9.6KB |
| FacilityRfpDownloadModalSeo.tsx | RFP teklif belgesi indirme modalı | 12.3KB |
| MevzuatReferenceSeo.tsx | Mevzuat referans bileşeni | 5.3KB |

---

## 🗺️ İlçe Bazlı Bileşenler

| Bileşen | Açıklama |
|---|---|
| DistrictFacilityAuditTableSeo.tsx | İlçe tesis denetim tablosu (11.1KB) |
| DistrictCleaningAuditTableSeo.tsx | İlçe temizlik denetim tablosu (9.1KB) |
| DistrictSecurityAuditTableSeo.tsx | İlçe güvenlik denetim tablosu (10.3KB) |
| DistrictTechnicalAuditTableSeo.tsx | İlçe teknik denetim tablosu (9KB) |
| DistrictComparisonMatrixSeo.tsx | İlçe karşılaştırma matrisi (10.8KB) |
| DistrictNeighborhoodDuesTableSeo.tsx | İlçe mahalle aidat tablosu (6.4KB) |
| DistrictLocalHighlightsSeo.tsx | İlçe yerel öne çıkanlar (4.6KB) |
| DistrictSecurityClusterSeo.tsx | İlçe güvenlik kümesi |
| DistrictSecuritySpotlightSeo.tsx | İlçe güvenlik spot ışığı |
| IstanbulDuesHeatmapSeo.tsx | İstanbul aidat ısı haritası (19.3KB) |

---

## 🔒 Güvenlik Bileşenleri

| Bileşen | Açıklama |
|---|---|
| SecurityComparisonTableSeo.tsx | Güvenlik çözümleri karşılaştırma (9.7KB) |
| SecurityLegalTemplateGeneratorSeo.tsx | Güvenlik yasal şablon üretici (15.6KB) |
| SecurityTechMatrixSeo.tsx | Güvenlik teknoloji matrisi (6.8KB) |
| SecurityTrustBadgeGridSeo.tsx | Güvenlik güven rozet grid'i (5.1KB) |
| InteractiveSecurityRiskRadarSeo.tsx | Güvenlik risk radar grafiği (12.4KB) |
| TrustVerificationAuditSeo.tsx | Güven doğrulama denetimi (9.2KB) |
| EmergencyServiceBadgeSeo.tsx | Acil servis rozeti |
| EmergencyDisasterAuditSeo.tsx | Afet hazırlık denetimi (8.3KB) |
| EmergencyPreparednessAuditSeo.tsx | Acil hazırlık denetimi (9.3KB) |

---

## 💰 Hesaplayıcı & ROI Bileşenleri

| Bileşen | Açıklama |
|---|---|
| InteractiveCostSimulatorSeo.tsx | Etkileşimli maliyet simülatörü (10KB) |
| SectoralRoiCalculatorSeo.tsx | Sektörel ROI hesaplayıcı (9.3KB) |
| DynamicPriceOfferSeo.tsx | Dinamik fiyat teklifi (7.1KB) |

---

## 📝 İçerik Zenginleştirme Bileşenleri

| Bileşen | Açıklama |
|---|---|
| HowToSeo.tsx | Adım adım rehber HowTo şeması |
| ChecklistAuditSeo.tsx | Denetim kontrol listesi (8.8KB) |
| ComparisonTableSeo.tsx | Genel karşılaştırma tablosu |
| CaseStudySeo.tsx | Vaka çalışması şeması |
| SemanticTopicClusterSeo.tsx | Semantik konu kümesi (10.3KB) |
| DefinedTermSetSeo.tsx | Sözlük/terim kümesi (19.9KB) |
| GlobalSpotlightSearchSeo.tsx | Global spotlight arama (13.1KB) |
| MobileAppLiveSimulatorSeo.tsx | Mobil app canlı simülatör (16KB) |
| QuizAuditScoreSeo.tsx | Quiz denetim skoru (10.5KB) |
| SocialProofTickerSeo.tsx | Sosyal kanıt ticker bandı |
| CoreWebVitalsOptimizerSeo.tsx | CWV optimizasyon bileşeni |
| LeadQuickModalSeo.tsx | Hızlı lead modal (12.8KB) |
| CleaningScheduleGeneratorSeo.tsx | Temizlik programı üretici (14.4KB) |
| InteractiveCleaningAuditRadarSeo.tsx | Temizlik denetim radar (14.6KB) |
| InteractiveTechnicalAuditRadarSeo.tsx | Teknik denetim radar (14.7KB) |

---

## 📤 Dışa Aktarma (src/components/seo/index.ts)

`	ypescript
// Tüm SEO bileşenleri tek index'ten import edilebilir:
import { JsonLd, DynamicBreadcrumb, AIOptimizedSummary } from '@/components/seo';
import { KMKLawAssistantSeo, FacilityComparisonMatrixSeo } from '@/components/seo';
`

---

İlgili: README.md, ../architecture/SCHEMA_REFERENCE.md, ../ai/GEO_ENGINE.md
