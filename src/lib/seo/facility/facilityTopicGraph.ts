import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { ORG_CREDENTIALS } from '@/lib/schemas';
import {
  ORG_ID,
  ORG_NAME,
  ORG_LEGAL_NAME,
  ORG_PHONE,
  ORG_EMAIL,
  ORG_ADDRESS,
  ORG_GEO,
  JsonLdObject
} from '@/lib/schemas';

/**
 * "Tesis Yönetimi" ISO 41001 & KMK 634 Semantik Topikal Otorite Grafiği (Alo Yönetim).
 * 
 * Google Knowledge Graph, Schema.org ve AI arama motorlarına (Gemini, Perplexity, ChatGPT Search)
 * Alo Yönetim'in "Tesis Yönetimi" alanında BELCERT/ILAS belgeli kurumsal otoritesi
 * olduğunu hiyerarşik varlık düğümleriyle (Entity Nodes) kanıtlar.
 */

interface LocalizedTopicGraphContent {
  name: string;
  serviceType: string;
  description: string;
  catalogName: string;
  serviceOutput: string;
}

const TOPIC_GRAPH_LOCALES: Record<string, LocalizedTopicGraphContent> = {
  tr: {
    name: 'Alo Yönetim Profesyonel Site ve Entegre Tesis Yönetimi',
    serviceType: 'Profesyonel Site ve Entegre Tesis Yönetimi',
    description:
      'İstanbul genelinde apartman, site, plaza, rezidans ve endüstriyel tesisler için ISO 41001 standartlarında 7/24 güvenlik, ortak alan temizliği, asansör ve jeneratör teknik bakımı, şeffaf aidat muhasebesi ve KMK hukuki danışmanlığı kapsayan profesyonel tesis yönetimi.',
    catalogName: 'Alo Yönetim Tesis Yönetimi Paketleri ve Sektörel Çözümleri',
    serviceOutput: '%25-35 Ortak Bütçe Tasarrufu, %99.2 Aidat Tahsilat Başarısı, Sıfır Hukuki Risk ve 7/24 Kesintisiz Güvenlik',
  },
  en: {
    name: 'Alo Yönetim Professional Property & Integrated Facility Management',
    serviceType: 'Professional Property & Integrated Facility Management',
    description:
      'ILAS-accredited ISO certified professional facility management across Istanbul for apartments, residential complexes, business towers, and industrial estates encompassing 24/7 security, cleaning, technical maintenance, transparent dues accounting, and legal consulting.',
    catalogName: 'Alo Yönetim Facility Management Packages and Sectoral Solutions',
    serviceOutput: '25-35% Common Budget Savings, 99.2% Dues Collection Success, Zero Legal Risk, and 24/7 Uninterrupted Security',
  },
  ru: {
    name: 'Alo Yönetim Профессиональное Управление Недвижимостью и Объектами',
    serviceType: 'Профессиональное Управление Недвижимостью и Объектами',
    description:
      'Профессиональное управление объектами недвижимости в Стамбуле по стандарту ISO 41001 для жилых комплексов, резиденций и бизнес-центров: круглосуточная охрана, уборка, техническое обслуживание, прозрачный учет взносов и юридический консалтинг.',
    catalogName: 'Пакеты услуг и отраслевые решения по управлению объектами Alo Yönetim',
    serviceOutput: 'Экономия общего бюджета 25-35%, 99.2% успешный сбор взносов, нулевой юридический риск и круглосуточная безопасность',
  },
  ar: {
    name: 'Alo Yönetim إدارة العقارات والمرافق المتكاملة الاحترافية',
    serviceType: 'إدارة العقارات والمرافق المتكاملة الاحترافية',
    description:
      'إدارة مرافق احترافية معتمدة وفق معايير ISO 41001 في جميع أنحاء إسطنبول للمجمعات السكنية والأبراج التجارية والمنشآت الصناعية تشمل الأمن على مدار الساعة والتنظيف والصيانة الفنية والمحاسبة القانونية الشفافة للرسوم.',
    catalogName: 'باقات وحلول إدارة المرافق القطاعية من Alo Yönetim',
    serviceOutput: 'توفير 25-35% من الميزانية المشتركة، نجاح تحصيل الرسوم بنسبة 99.2%، صفر مخاطر قانونية وأمن مستمر 24/7',
  },
};

export function generateFacilityManagementGraph(lang = 'tr'): JsonLdObject {
  const normalizedLang = (lang || 'tr').toLowerCase();
  const loc = TOPIC_GRAPH_LOCALES[normalizedLang] || TOPIC_GRAPH_LOCALES.tr;
  const langPrefix = normalizedLang === 'tr' ? '' : `/${normalizedLang}`;
  const serviceUrl = `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/#service-facility-management`,
    name: loc.name,
    alternateName: [
      'Site Yönetimi',
      'Profesyonel Site Yönetimi',
      'Apartman ve Site Yönetimi',
      'Site Yönetim Şirketleri İstanbul',
      'Site Yönetim Firmaları',
      'Entegre Tesis Yönetimi',
      'Profesyonel Tesis Yönetimi İstanbul',
      'ISO 41001 Tesis Yönetim Hizmetleri',
      'Site ve Tesis İşletmeciliği',
      'Facility Management Istanbul',
    ],
    serviceType: loc.serviceType,
    description: loc.description,
    url: serviceUrl,
    mainEntityOfPage: serviceUrl,
    sameAs: [
      'https://www.wikidata.org/wiki/Q1391515', // Facility Management Wikidata QID
      'https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi',
    ],
    category: 'Facility Management & Property Operations',
    provider: {
      '@type': 'Corporation',
      '@id': ORG_ID,
      name: ORG_NAME,
      legalName: ORG_LEGAL_NAME,
      telephone: ORG_PHONE,
      email: ORG_EMAIL,
      address: ORG_ADDRESS,
      geo: ORG_GEO,
    },
    serviceOutput: {
      '@type': 'Thing',
      name: loc.serviceOutput,
    },
    // ISO ve Yasal Standartlar (Topikal Otorite)
    hasCredential: ORG_CREDENTIALS,
    // 8 Alt Uzmanlık Servisi (Spokes) ile Hiyerarşik Bağlantı
    isRelatedTo: [
      {
        '@type': 'Service',
        name: '5188 Lisanslı Özel Güvenlik Yönetimi',
        url: `${BASE_URL}${langPrefix}/hizmetler/guvenlik-yonetimi`,
        sameAs: 'https://www.wikidata.org/wiki/Q11024344',
      },
      {
        '@type': 'Service',
        name: 'Profesyonel Ortak Alan Temizliği ve Hijyen',
        url: `${BASE_URL}${langPrefix}/hizmetler/temizlik-ve-hijyen`,
        sameAs: 'https://www.wikidata.org/wiki/Q38782',
      },
      {
        '@type': 'Service',
        name: 'Önleyici Teknik Bakım, Asansör & Jeneratör İşletmesi',
        url: `${BASE_URL}${langPrefix}/hizmetler/teknik-bakim`,
        sameAs: 'https://www.wikidata.org/wiki/Q42848',
      },
      {
        '@type': 'Service',
        name: 'Dijital Aidat Takibi & Şeffaf Bütçe Muhasebesi',
        url: `${BASE_URL}${langPrefix}/hizmetler/aidat-takibi`,
        sameAs: 'https://www.wikidata.org/wiki/Q4116214',
      },
      {
        '@type': 'Service',
        name: 'Kat Mülkiyeti Kanunu (KMK 634) Hukuki Danışmanlık ve İcra Takibi',
        url: `${BASE_URL}${langPrefix}/hizmetler/hukuk-ve-icra-danismanligi`,
        sameAs: 'https://www.wikidata.org/wiki/Q1489069',
      },
      {
        '@type': 'Service',
        name: '4 Mevsim Profesyonel Peyzaj ve Bahçe Bakımı',
        url: `${BASE_URL}${langPrefix}/hizmetler/peyzaj-ve-bahce-bakimi`,
        sameAs: 'https://www.wikidata.org/wiki/Q328786',
      },
      {
        '@type': 'Service',
        name: 'TSE Standartlarında Yüzme Havuzu Bakımı ve Hijyeni',
        url: `${BASE_URL}${langPrefix}/hizmetler/havuz-bakimi-ve-hijyen`,
        sameAs: 'https://www.wikidata.org/wiki/Q309995',
      },
      {
        '@type': 'Service',
        name: 'Sağlık Bakanlığı Onaylı Biyosidal Haşere İlaçlama',
        url: `${BASE_URL}${langPrefix}/hizmetler/hasere-ve-dezenfeksiyon`,
        sameAs: 'https://www.wikidata.org/wiki/Q1058252',
      },
    ],
    // Hizmet Verilen 39 İlçe
    areaServed: DISTRICTS.map((d) => ({
      '@type': 'City',
      name: `${d.name}, İstanbul`,
      url: `${BASE_URL}${langPrefix}/bolgeler/${d.slug}/tesis-yonetimi`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: d.geo.lat,
        longitude: d.geo.lng,
      },
    })),
    // Sektörel Çözümler Kataloğu
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: loc.catalogName,
      itemListElement: [
        {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Rezidans ve Lüks Konut Tesis Yönetimi',
            url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Plaza, İş Merkezi ve Ofis Kuleleri Tesis Yönetimi',
            url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Büyük Ölçekli Site ve Toplu Yapı Tesis Yönetimi',
            url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Sanayi, Fabrika ve Lojistik Tesisleri Yönetimi',
            url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Tesis Yönetimi Seçim ve Geçiş Rehberi',
            url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rehber`,
          },
        },
      ],
    },
    // Değerlendirme Puanı (E-E-A-T & Google Rich Results)
    aggregateRating: {
      '@type': 'AggregateRating',
      itemReviewed: {
        '@type': 'Service',
        name: loc.name,
        url: serviceUrl,
        provider: {
          '@type': 'Organization',
          name: ORG_NAME,
          url: BASE_URL,
        },
      },
      ratingValue: '4.9',
      reviewCount: '340',
      ratingCount: '340',
      bestRating: '5',
      worstRating: '1',
    },
  };
}
