/**
 * Şeffaf Hizmet & Fiyatlandırma Paketleri Veri Modeli (servicePricingPackagesData.ts)
 * 
 * Google Search Generative Experience (SGE), SearchGPT ve Schema.org OfferCatalog /
 * PriceSpecification standartlarında kurumsal yönetim paketleri ve şeffaf gösterge aralıkları.
 * (Kesinlikle simülatör/hesaplayıcı değildir; şeffaf gösterge kataloğudur.)
 */

export interface ServicePricingPackage {
  id: string;
  name: string;
  badge: string;
  targetScale: string;
  targetUnitCount: string;
  indicativePriceRange: string;
  priceCurrency: 'TRY';
  minMonthlyFee: number;
  maxMonthlyFee: number;
  unitPriceEstimate: string;
  billingFrequency: 'Monthly';
  highlightText: string;
  isPopular: boolean;
  deliverables: string[];
  slaResponseTime: string;
  financialReportingFrequency: string;
  softwareIncluded: string;
  ctaText: string;
  ctaHref: string;
}

export const SERVICE_PRICING_PACKAGES: ServicePricingPackage[] = [
  {
    id: 'butik-apartman-yonetimi',
    name: 'Butik Apartman & Küçük Site Paketi',
    badge: '10 - 40 Bağımsız Bölüm',
    targetScale: 'Butik Konut Yapıları',
    targetUnitCount: '10 – 40 Daire',
    indicativePriceRange: '₺4.500 – ₺9.500 / Ay',
    priceCurrency: 'TRY',
    minMonthlyFee: 4500,
    maxMonthlyFee: 9500,
    unitPriceEstimate: 'Daire başı ort. ₺180 – ₺240 / ay',
    billingFrequency: 'Monthly',
    highlightText: 'Komşuluk ilişkilerini zedelemeden resmi KMK 634 disiplini ve sıfır yönetici stresi.',
    isPopular: false,
    deliverables: [
      '634 Sayılı KMK Madde 37 Uyumlu Yıllık İşletme Projesi ve Tebligatlar',
      'Apsiyon Mobil Uygulaması (7/24 Şeffaf Kasa, Ekstre ve Kredi Kartı ile Aidat)',
      'Aylık Düzenli Gelir-Gider Tablosu ve Banka Mutabakat Raporu',
      'Hukuk Departmanımız ile Geciken Aidatlarda İlamsız İcra Takibi (İİK m.68)',
      'Haftalık Ortak Alan Temizlik & Çöp Toplama Organizasyonu',
      'Asansör ve Yangın Tesisatı Aylık Periyodik Muayene Takibi',
    ],
    slaResponseTime: '45 Dakika Mobil Acil Servis',
    financialReportingFrequency: 'Aylık Düzenli Raporlama',
    softwareIncluded: 'Apsiyon Mobil Lisansı Dahil',
    ctaText: 'Apartmanınız İçin Keşif İsteyin',
    ctaHref: '/teklif-al?paket=butik',
  },
  {
    id: 'orta-olcekli-konut-sitesi',
    name: 'Orta Ölçekli Konut Sitesi Yönetimi',
    badge: '40 - 150 Bağımsız Bölüm (En Çok Tercih Edilen)',
    targetScale: 'Orta Ölçekli Siteler',
    targetUnitCount: '40 – 150 Daire',
    indicativePriceRange: '₺12.000 – ₺28.000 / Ay',
    priceCurrency: 'TRY',
    minMonthlyFee: 12000,
    maxMonthlyFee: 28000,
    unitPriceEstimate: 'Daire başı ort. ₺190 – ₺280 / ay',
    billingFrequency: 'Monthly',
    highlightText: '5188 Güvenlik, teknik bakım ve %99.2 aidat tahsilat garantisi ile eksiksiz site huzuru.',
    isPopular: true,
    deliverables: [
      '5188 Sayılı Kanuna Uygun Sertifikalı Özel Güvenlik ve Giriş-Çıkış Kontrolü',
      'Apsiyon Entegre Plaka Tanıma (PTS) ve Akıllı Geçiş Sistemi Yönetimi',
      'Sıfır Reaktif Ceza Garantisi ile Kompanzasyon & Enerji Optimizasyonu',
      'Peyzaj ve Bahçe Bakımı, Otomatik Sulama ve Havuz Hijyen Denetimi',
      'Sözleşmeli Tedarikçilerden Toplu Satın Alma ile %20-30 Bütçe Tasarrufu',
      'Noter Onaylı Genel Kurul Organizasyonu ve Karar Defteri Kapanış Tasdiki',
    ],
    slaResponseTime: '30 Dakika Mobil Teknik Müdahale',
    financialReportingFrequency: 'Canlı Mobil Bakiye + Aylık Denetim Raporu',
    softwareIncluded: 'Apsiyon Mobil + PTS + Sayaç Okuma Entegrasyonu',
    ctaText: 'Siteniz İçin Detaylı Teklif Alın',
    ctaHref: '/teklif-al?paket=orta-olcek',
  },
  {
    id: 'buyuk-toplu-yapi-rezidans',
    name: 'Büyük Toplu Yapı & Rezidans Yönetimi',
    badge: '150 - 500+ Bağımsız Bölüm',
    targetScale: 'Büyük Siteler & Rezidanslar',
    targetUnitCount: '150 – 500+ Daire & Ticari Alan',
    indicativePriceRange: '₺35.000 – ₺85.000 / Ay',
    priceCurrency: 'TRY',
    minMonthlyFee: 35000,
    maxMonthlyFee: 85000,
    unitPriceEstimate: 'Daire başı ort. ₺220 – ₺350 / ay',
    billingFrequency: 'Monthly',
    highlightText: 'Tam zamanlı yerleşik Tesis Müdürü, merkezi temsilciler kurulu yönetimi ve kurumsal güvence.',
    isPopular: false,
    deliverables: [
      'Yerleşik Tam Zamanlı Tesis Müdürü ve Muhasebe Sorumlusu',
      '7/24 Vardiyalı Özel Güvenlik, Resepsiyon ve Vale Koordinasyonu',
      'Merkezi Sistem Isınma / Isı Payölçer Kalorimetre Okuma ve Adil Fatura Paylaşımı',
      'Elektromekanik Sistemler (Chiller, Trafo, Jeneratör, Yangın) 7/24 Teknik Kadro',
      'KMK Madde 66-74 Toplu Yapı Temsilciler Kurulu ve Blok Yöneticileri Koordinasyonu',
      'Sosyal Tesis, Kapalı Havuz, Fitness ve Spa Alanı Kurumsal İşletmesi',
    ],
    slaResponseTime: '15 Dakika Yerleşik Teknik Ekip Müdahalesi',
    financialReportingFrequency: 'Haftalık İcra/Finans Tablosu + Aylık Denetçi Paneli',
    softwareIncluded: 'Kurumsal ERP + Apsiyon Kurumsal + Turnike/Geçiş Entegrasyonu',
    ctaText: 'Toplu Yapı / Rezidans Teklifi İsteyin',
    ctaHref: '/teklif-al?paket=toplu-yapi',
  },
  {
    id: 'plaza-ticari-tesis-yonetimi',
    name: 'A+ Plaza & Ticari İş Merkezi Yönetimi',
    badge: 'B2B Kurumsal Gayrimenkul',
    targetScale: 'Plazalar, İş Merkezleri & Fabrikalar',
    targetUnitCount: '10.000 – 100.000+ m² Kapalı Alan',
    indicativePriceRange: '₺50.000 – ₺150.000+ / Ay',
    priceCurrency: 'TRY',
    minMonthlyFee: 50000,
    maxMonthlyFee: 150000,
    unitPriceEstimate: 'm² başına özel SLA fizibilite teklifi',
    billingFrequency: 'Monthly',
    highlightText: 'ISO 41001 standartlarında bina yaşam döngüsü, BMS/SCADA izleme ve Platinum SLA garantisi.',
    isPopular: false,
    deliverables: [
      'ISO 41001, ISO 9001, ISO 45001 ve ISO 50001 Sertifikalı Entegre İşletme',
      'BMS (Bina Otomasyonu) ve SCADA ile 7/24 Kesintisiz Enerji & İklimlendirme Takibi',
      'İş Sağlığı ve Güvenliği (İSG) Yasal Sorumluluk ve Sıfır Kaza Protokolü',
      'Kiracı & Mülk Sahibi İlişkileri, Kira & Aidat Mutabakat Yönetimi',
      'Sözleşmeli Taşeron (Asansör, Jeneratör, Soğutma Kuleleri) KPI ve SLA Denetimi',
      'Yeşil Bina (LEED / BREEAM) ve Sıfır Atık Yönetim Sistemi Uyum Desteği',
    ],
    slaResponseTime: '15 Dakika Mission-Critical Müdahale',
    financialReportingFrequency: 'Gerçek Zamanlı BI Dashboard + Aylık Yönetim Raporu',
    softwareIncluded: 'BMS/IoT Entegre Tesis Portalı + B2B RFP Raporlama',
    ctaText: 'Plaza & Tesis İçin Kurumsal Teklif Alın',
    ctaHref: '/teklif-al?paket=plaza',
  },
];
