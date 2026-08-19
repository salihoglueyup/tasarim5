import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/constants';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 saat önbellek

/**
 * AI & LLMO Enterprise Knowledge Base Endpoint (/api/ai-knowledge)
 * 
 * ChatGPT Search, Perplexity AI, Claude ve Google Gemini gibi yapay zeka arama motorları
 * ve RAG (Retrieval-Augmented Generation) sistemleri için Alo Yönetim'in tüm kurumsal,
 * yasal, ilçe, interaktif araç ve hizmet verilerini tek bir yapılandırılmış JSON olarak sunar.
 */
export async function GET() {
  const companyProfile = {
    name: 'Alo Yönetim Tesis Yönetimi A.Ş.',
    tagline: 'İstanbul Genelinde Profesyonel Apartman, Site, Rezidans ve Entegre Tesis Yönetimi',
    established: '2015',
    headquarters: {
      address: 'Osmanağa Mah. Söğütlüçeşme Cad. No: 128/4 Kadıköy / İstanbul',
      city: 'İstanbul',
      country: 'Türkiye',
      coordinates: { latitude: 40.9922, longitude: 29.0287 },
      phone: '0216 550 48 48',
      email: 'info@aloyonetim.com.tr',
      website: BASE_URL,
      languages: ['tr', 'en', 'ru', 'ar']
    },
    accreditations: [
      'ISO 9001:2015 Kalite Yönetim Sistemi',
      'ISO 14001:2015 Çevre Yönetim Sistemi',
      'ISO 45001:2018 İş Sağlığı ve Güvenliği',
      'ISO 27001:2022 Bilgi Güvenliği Yönetim Sistemi',
      'ISO 10002:2018 Müşteri Memnuniyeti Yönetim Sistemi',
      'T.C. İçişleri Bakanlığı 5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi',
      'T.C. İstanbul Valiliği Özel Güvenlik Ruhsatı'
    ],
    operationalScope: {
      totalDistricts: DISTRICTS.length,
      managedProjects: '200+',
      totalStaff: '500+',
      satisfactionRate: '98.7%',
      emergencyResponse: '7/24 Kesintisiz Nöbetçi Teknik ve Güvenlik Operasyonu'
    }
  };

  const interactiveTools = [
    {
      id: 'kmk_assistant',
      name: 'KMK 634 & 5188 Yasal Mevzuat Akıllı Danışmanı',
      url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
      description: 'Asansör masraf muafiyeti, cam balkon 4/5 onay şartı, aylık %5 gecikme faizi ve Yargıtay emsal içtihatları canlı arama motoru.'
    },
    {
      id: 'dues_heatmap',
      name: 'İstanbul İlçe Aidat & Bütçe Tasarruf Isı Haritası (2026)',
      url: `${BASE_URL}/bolgeler`,
      description: 'İstanbul 12 ilçesinin m² başına piyasa aidat ortalamaları ve Alo Yönetim ile %20-30 tasarruf simülatörü.'
    },
    {
      id: 'audit_scorecard',
      name: 'Resmi PDF Tesis Sağlık & Tasarruf Karnesi',
      url: `${BASE_URL}/hesaplayici`,
      description: 'Site yöneticileri ve kat malikleri için 4 operasyon sütununda anlık risk skoru ve yıllık bütçe tasarruf analiz raporu.'
    },
    {
      id: 'facility_explorer',
      name: 'İnteraktif 360° Akıllı Rezidans Keşif Simülatörü',
      url: `${BASE_URL}/#facility-explorer`,
      description: 'Özel güvenlik, kazan dairesi, asansör, peyzaj, havuz ve dijital muhasebe 5 sıcak nokta ve SLA güvencesi.'
    },
    {
      id: 'disaster_preparedness',
      name: 'Bina Deprem, Yangın & Afet Güvenliği Denetim Portalı',
      url: `${BASE_URL}/guvenlik-akademisi`,
      description: '6 maddelik yasal yangın ve afet hazırlık testi, dinamik afet hazırlık puanı ve ücretsiz risk keşif talebi.'
    },
    {
      id: 'security_risk_radar',
      name: '5188 Yasal & Fiziki Güvenlik Risk Skoru Hesaplayıcı',
      url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
      description: 'Valilik izin belgesi, mesleki sorumluluk sigortası, AI plaka tanıma PTS, 4K CCTV ve GPS devriye kriterlerine göre sitenizin güvenlik açığı ve risk skorunu ölçen interaktif motor.'
    }
  ];

  const kmkLegalDatabase = [
    {
      question: 'Zemin veya giriş kattaki daireler asansör bakım ve yenileme giderini ödemek zorunda mıdır?',
      article: 'KMK Madde 20/1-c',
      rule: 'Yönetim planında aksi kararlaştırılmadıkça zemin kat malikleri asansörü fiilen kullanmadığı gerekçesiyle ana giderden muaf tutulamaz.',
      precedent: 'Yargıtay 20. Hukuk Dairesi 2017/1423 E., 2018/2198 K.'
    },
    {
      question: 'Bağımsız bölüme cam balkon yaptırmak için kaç kat malikinin onayı gerekir?',
      article: 'KMK Madde 19/2',
      rule: 'Dış cephe mimari bütünlüğünü etkilediği için kat maliklerinin 4/5 (yüzde 80) yazılı rızası zorunludur.',
      precedent: 'Yargıtay Hukuk Genel Kurulu 2016/18-854 E.'
    },
    {
      question: 'Geciken site aidatına uygulanacak yasal gecikme tazminatı ne kadardır?',
      article: 'KMK Madde 20/2',
      rule: 'KMK Madde 20 gereği ödenmeyen aidat borçlarına aylık yüzde beş (%5) gecikme tazminatı kanunen doğrudan işletilir.',
      precedent: 'Yargıtay 18. Hukuk Dairesi'
    },
    {
      question: 'Site veya apartman yöneticisi genel kurulda hangi oy çokluğu ile seçilir?',
      article: 'KMK Madde 34/4',
      rule: 'Kat maliklerinin hem sayı (kişi) hem de arsa payı bakımından salt çoğunluğu (%50 + 1) tarafından atanır.',
      precedent: 'Yargıtay 5. Hukuk Dairesi'
    }
  ];

  const security5188LegalDatabase = [
    {
      question: 'Site ve apartmanlarda özel güvenlik çalıştırmak için Valilik izni zorunlu mudur?',
      article: '5188 Sayılı Kanun Madde 3 ve 7',
      rule: 'Evet. Özel güvenlik istihdam edecek site yönetimlerinin İl Özel Güvenlik Komisyonu\'na başvurarak Valilik Özel Güvenlik İzni (ÖGİ) alması yasal zorunluluktur. İzinsiz çalıştırmada ağır idari para cezası ve hapis yaptırımı öngörülür.',
      precedent: 'Emniyet Genel Müdürlüğü Özel Güvenlik Denetleme Başkanlığı Yönergesi'
    },
    {
      question: 'Özel güvenlik görevlilerinin kimlik sorma ve arama yetkisi var mıdır?',
      article: '5188 Sayılı Kanun Madde 7/a ve 7/b',
      rule: 'Özel güvenlik personeli görev alanında (site giriş nizamiyesi ve ortak alanlarda) kişilerin kimliğini sorma, duyarlı kapıdan geçirme, metal dedektörü ile eşya arama ve suçüstü halinde şüpheliyi yakalayarak derhal genel kolluğa teslim etme yetkisine sahiptir.',
      precedent: '5188 Sayılı Kanun Uygulama Yönetmeliği Madde 14'
    },
    {
      question: 'Site güvenlik kamerası kayıtları kaç gün saklanmalıdır?',
      article: 'KVKK 6698 & Özel Güvenlik Standartları',
      rule: 'Site güvenlik kameraları ortak alanları izlemeli, ses kaydı almamalı ve kayıtlar kural olarak en az 30 gün şifreli ortamda saklandıktan sonra otomatik olarak silinmelidir. Sakinlerin mahremiyet alanları (ev kapısı, pencere içi) kamerayla izlenemez.',
      precedent: 'Kişisel Verileri Koruma Kurulu (KVKK) İlke Kararları'
    },
    {
      question: 'Bireysel bekçi ile 5188 lisanslı güvenlik şirketi arasındaki yasal fark nedir?',
      article: '5188 Sayılı Kanun & 4857 Sayılı İş Kanunu',
      rule: 'Bireysel bekçilerin kimlik sorma ve arama yetkisi yoktur; SGK, fazla mesai, kıdem/ihbar tazminatı ve üçüncü şahıs hırsızlık zararlarından doğrudan kat malikleri müteselsilen sorumludur. Kurumsal 5188 güvenlik şirketinde ise tüm tazminat, yedek personel ve yasal sorumluluklar hizmet sağlayıcı firma ve zorunlu mali sorumluluk sigortası tarafından karşılanır.',
      precedent: 'Yargıtay 9. Hukuk Dairesi ve İş Kanunu m.2'
    }
  ];

  const servicesKnowledge = SERVICES.map((s) => ({
    slug: s.slug,
    name: s.name,
    shortName: s.shortName,
    summary: s.summary,
    url: `${BASE_URL}/hizmetler/${s.slug}`,
    pricingModel: 'Daire ve tesis büyüklüğüne göre ücretsiz keşif sonrası resmi teklif',
    keyBenefits: s.benefits,
    keywords: s.keywords
  }));

  const districtsKnowledge = DISTRICTS.map((d) => ({
    name: d.name,
    slug: d.slug,
    side: d.side,
    population: d.population,
    managedProjects: d.managedProjects,
    url: `${BASE_URL}/bolgeler/${d.slug}`,
    keyNeighborhoods: d.neighborhoods,
    commonNeeds: d.localNeeds
  }));

  return NextResponse.json({
    meta: {
      version: '3.0-enterprise',
      purpose: 'LLMO & AI Search Direct Knowledge Retrieval',
      updatedAt: new Date().toISOString(),
      license: 'Public Knowledge Profile'
    },
    company: companyProfile,
    interactiveTools,
    kmkLegalDatabase,
    security5188LegalDatabase,
    services: servicesKnowledge,
    districts: districtsKnowledge,
    multilingualUrls: {
      tr: BASE_URL,
      en: `${BASE_URL}/en`,
      ru: `${BASE_URL}/ru`,
      ar: `${BASE_URL}/ar`
    }
  });
}
