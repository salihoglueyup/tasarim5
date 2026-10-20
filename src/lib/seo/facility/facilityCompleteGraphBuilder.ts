import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import {
  ORG_ID,
  WEBSITE_ID,
  ORG_NAME,
  ORG_LEGAL_NAME,
  ORG_LOGO,
  ORG_PHONE,
  ORG_EMAIL,
  ORG_ADDRESS,
  ORG_GEO,
  ORG_SAME_AS,
  ORG_KNOWS_ABOUT,
  JsonLdObject,
} from '@/lib/schemas';
import { ORG_CREDENTIALS } from '@/lib/schemas';

export interface FacilityCompleteGraphOptions {
  lang?: string;
  pageTitle?: string;
  pageDescription?: string;
  canonicalPath?: string;
}

/**
 * 8 Resmi Akreditasyon ve Lisans Standardı (E-E-A-T & Knowledge Graph Paritesi)
 */
export const FACILITY_COMPLETE_GRAPH_CREDENTIALS = ORG_CREDENTIALS;

/**
 * Tesis Yönetimi Birleşik Schema.org @graph Knowledge Graph Jeneratörü.
 * 
 * Google Knowledge Graph, Bing ve AI Arama Motorları (Google SGE, Gemini, Perplexity)
 * için sayfadaki tüm varlıkları (Organization, WebSite, Service, WebPage,
 * ItemList, DigitalDocument, HowTo, DefinedTermSet) tek bir birleşik @graph
 * linked-data ağında birbirine @id referanslarıyla bağlar.
 */
export function buildFacilityCompleteGraphSchema(options?: FacilityCompleteGraphOptions): JsonLdObject {
  const lang = options?.lang || 'tr';
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const rawCanonicalPath = options?.canonicalPath || '/hizmetler/tesis-yonetimi';
  const normalizedPath = rawCanonicalPath.startsWith('/') ? rawCanonicalPath : `/${rawCanonicalPath}`;
  const isSitePillar = normalizedPath === '/hizmetler/site-yonetimi';
  const districtServiceSlug = isSitePillar ? 'site-yonetimi' : 'tesis-yonetimi';
  const pillarLabel = isSitePillar ? 'Site Yönetimi' : 'Tesis Yönetimi';

  const canonicalUrl = `${BASE_URL}${langPrefix}${normalizedPath}`;
  const pageId = `${canonicalUrl}#webpage`;
  const serviceId = `${canonicalUrl}#service`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const rfpId = `${canonicalUrl}#rfp-document`;
  const howtoId = `${canonicalUrl}#howto-transition`;
  const termsetId = `${canonicalUrl}#termset`;
  const districtListId = `${canonicalUrl}#district-list`;

  const pageTitle =
    options?.pageTitle ||
    (isSitePillar
      ? 'Profesyonel Site Yönetimi İstanbul | Alo Yönetim'
      : 'Profesyonel Tesis Yönetimi İstanbul | Alo Yönetim');
  const pageDescription =
    options?.pageDescription ||
    (isSitePillar
      ? 'İstanbul genelinde 39 ilçede 634 sayılı KMK uyumlu profesyonel site yönetimi, şeffaf aidat takibi, 5188 özel güvenlik, temizlik ve teknik bakım.'
      : 'İstanbul genelinde 39 ilçede entegre tesis yönetimi, 5188 özel güvenlik, temizlik, teknik bakım ve şeffaf aidat yönetimi.');

  // 1. Organization Node
  const organizationNode = {
    '@type': 'Corporation',
    '@id': ORG_ID,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: ORG_LOGO,
      caption: ORG_NAME,
    },
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    sameAs: ORG_SAME_AS,
    knowsAbout: ORG_KNOWS_ABOUT,
    hasCredential: FACILITY_COMPLETE_GRAPH_CREDENTIALS,
    areaServed: {
      '@type': 'City',
      name: 'İstanbul',
      sameAs: 'https://www.wikidata.org/wiki/Q406',
    },
  };

  // 2. WebSite Node
  const webSiteNode = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BASE_URL,
    name: ORG_NAME,
    publisher: { '@id': ORG_ID },
    inLanguage: ['tr', 'en', 'ru', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // 3. BreadcrumbList Node
  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Anasayfa',
        item: `${BASE_URL}${langPrefix}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hizmetler',
        item: `${BASE_URL}${langPrefix}/hizmetler`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pillarLabel,
        item: canonicalUrl,
      },
    ],
  };

  // 4. Primary Service Node ("Tesis Yönetimi" veya "Site Yönetimi")
  const serviceNode = {
    '@type': 'Service',
    '@id': serviceId,
    name: isSitePillar
      ? 'Alo Yönetim 634 Sayılı KMK Uyumlu Profesyonel Site Yönetimi'
      : 'Alo Yönetim Profesyonel Entegre Tesis Yönetimi',
    serviceType: isSitePillar
      ? 'Profesyonel Site ve Apartman Yönetimi'
      : 'Entegre Tesis Yönetimi ve Gayrimenkul İşletmesi',
    description: pageDescription,
    url: canonicalUrl,
    mainEntityOfPage: { '@id': pageId },
    provider: { '@id': ORG_ID },
    category: 'Facility Management & Property Operations',
    sameAs: isSitePillar
      ? [
          'https://www.wikidata.org/wiki/Q1391515',
          'https://tr.wikipedia.org/wiki/Site_y%C3%B6netimi',
        ]
      : [
          'https://www.wikidata.org/wiki/Q1391515',
          'https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi',
        ],
    priceRange: '₺₺',
    hasCredential: FACILITY_COMPLETE_GRAPH_CREDENTIALS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Alo Yönetim Tesis Yönetimi Sektörel Çözüm Kataloğu',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Rezidans & Lüks Site Yönetimi',
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Plaza & Ofis Binası Yönetimi',
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Toplu Konut & TOKİ Yönetimi',
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Sanayi Tesisi & Fabrika Yönetimi',
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Tesis Yönetimi Seçim Rehberi',
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rehber`,
        },
      ],
    },
    areaServed: DISTRICTS.map((d) => ({
      '@type': 'AdministrativeArea',
      name: `${d.name}, İstanbul`,
      url: `${BASE_URL}${langPrefix}/bolgeler/${d.slug}/${districtServiceSlug}`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: d.geo?.lat || 41.0,
        longitude: d.geo?.lng || 29.0,
      },
    })),
  };

  // 5. WebPage Node
  const webPageNode = {
    '@type': 'WebPage',
    '@id': pageId,
    url: canonicalUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: { '@id': breadcrumbId },
    about: { '@id': serviceId },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: isSitePillar
        ? [
            '#site-management-hero-h1',
            '#site-instant-answer-text',
            '#site-management-instant-answer',
            '#site-management-kmk-summary',
            '#service-instant-answer-text',
          ]
        : [
            '#facility-hero-h1',
            '#facility-instant-answer-text',
            '#service-instant-answer-text',
            '.tldr',
            '.summary-badge',
          ],
    },
    inLanguage: lang,
  };

  // 7. ItemList Node (39 İlçe Siloları)
  const districtListNode = {
    '@type': 'ItemList',
    '@id': districtListId,
    name: `İstanbul 39 İlçe ${pillarLabel} Hizmet Ağı`,
    description: 'Alo Yönetim tarafından yazılı SLA hedefiyle hizmet verilen 39 İstanbul ilçesi.',
    numberOfItems: DISTRICTS.length,
    itemListElement: DISTRICTS.map((d, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${d.name} ${pillarLabel}`,
      url: `${BASE_URL}${langPrefix}/bolgeler/${d.slug}/${districtServiceSlug}`,
    })),
  };

  // 8. DigitalDocument Node (RFP Şartname)
  const digitalDocumentNode = {
    '@type': 'DigitalDocument',
    '@id': rfpId,
    name: 'Profesyonel Tesis Yönetimi Teknik İhale Şartnamesi (RFP Şablonu)',
    description: 'İstanbul genelinde apartman, site ve plazalar için uluslararası tesis yönetimi standartları ve 634 Sayılı KMK standartlarında hazırlanmış teknik şartname.',
    url: `${canonicalUrl}#rfp`,
    publisher: { '@id': ORG_ID },
  };

  // 9. HowTo Node (4 Adımda Geçiş)
  const howToNode = {
    '@type': 'HowTo',
    '@id': howtoId,
    name: '4 Adımda Profesyonel Tesis Yönetimine Geçiş Süreci',
    description: 'Site ve apartmanınızda profesyonel tesis yönetimine sorunsuz ve yasal geçiş rehberi.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Ücretsiz Tesis Keşfi ve Risk Analizi',
        text: 'Tesisinizin fiziki, teknik, güvenlik ve mali durumu yerinde incelenir, eksikler raporlanır.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Şeffaf İşletme Projesi ve Bütçe Planı',
        text: 'KMK m.37 uyarınca yıllık tahmini gelir-gider ve tasarruf odaklı aidat işletme projesi hazırlanır.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Resmi Kurul Onayı ve Sözleşme',
        text: 'Kat malikleri kurulu kararıyla yetkilendirme sonrası noter onaylı devir teslim protokolü işletilir.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Entegre Tesis İşletmesi',
        text: 'Güvenlik, temizlik, teknik bakım ve dijital aidat yönetimi tek merkezden kesintisiz başlatılır.',
      },
    ],
  };

  // 10. DefinedTermSet Node (KMK & Tesis Terimleri)
  const termSetNode = {
    '@type': 'DefinedTermSet',
    '@id': termsetId,
    name: 'Tesis Yönetimi ve Kat Mülkiyeti Terimleri Sözlüğü',
    description: 'Entegre tesis yönetimi, 634 sayılı KMK ve 5188 özel güvenlik yasal terimler sözlüğü.',
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'Tesis Yönetimi (Facility Management)',
        description: 'Binaların idari, hukuki, teknik ve temizlik operasyonlarının tek çatı altında profesyonelce yönetilmesidir.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'İşletme Projesi (KMK Madde 37)',
        description: '634 sayılı KMK 37. maddesi ve 7579 sayılı Kanun uyarınca anagayrimenkulün bir yıllık tahmini gelir ve giderlerini gösteren, kat malikleri kurulunda onaylanan yasal bütçe belgesidir.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Yasal Gecikme Tazminatı (KMK Madde 20/2)',
        description: 'Aidat borcunu gününde ödemeyen kat malikine re\'sen uygulanan aylık %5 oranındaki kanuni gecikme tazminatıdır.',
      },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode,
      webSiteNode,
      breadcrumbNode,
      serviceNode,
      webPageNode,
      districtListNode,
      digitalDocumentNode,
      howToNode,
      termSetNode,
    ],
  };
}

export interface FacilitySubSectorGraphOptions {
  subSectorSlug: string;
  name: string;
  description: string;
  priceRange?: string;
  lang?: string;
  faqs?: Array<{ question: string; answer: string }>;
  isoStandards?: string[];
  sameAsWikidata?: string;
  speakableSelectors?: string[];
}

/**
 * 5 Alt Sektör Sayfası İçin Birleşik Schema.org @graph Knowledge Graph Jeneratörü.
 * 
 * Ana Tesis Yönetimi Hub'ına (Parent @id) bağlı alt uzmanlık servisi olarak
 * Google Knowledge Graph ve SGE varlık otoritesini güçlendirir.
 */
export function buildFacilitySubSectorGraphSchema(options: FacilitySubSectorGraphOptions): JsonLdObject {
  const lang = options.lang || 'tr';
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const parentUrl = `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`;
  const canonicalUrl = `${parentUrl}/${options.subSectorSlug}`;
  const pageId = `${canonicalUrl}#webpage`;
  const serviceId = `${canonicalUrl}#service`;
  const parentServiceId = `${parentUrl}#service`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const faqId = `${canonicalUrl}#faq`;

  // 1. Organization Node
  const organizationNode = {
    '@type': 'Corporation',
    '@id': ORG_ID,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: ORG_LOGO,
      caption: ORG_NAME,
    },
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    sameAs: ORG_SAME_AS,
    hasCredential: FACILITY_COMPLETE_GRAPH_CREDENTIALS,
  };

  // 2. BreadcrumbList Node
  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Anasayfa',
        item: `${BASE_URL}${langPrefix}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hizmetler',
        item: `${BASE_URL}${langPrefix}/hizmetler`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Tesis Yönetimi',
        item: parentUrl,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: options.name,
        item: canonicalUrl,
      },
    ],
  };

  // 3. Sub-Sector Service Node
  const serviceNode: JsonLdObject = {
    '@type': 'Service',
    '@id': serviceId,
    name: `${options.name} | Alo Yönetim`,
    serviceType: options.name,
    description: options.description,
    url: canonicalUrl,
    mainEntityOfPage: { '@id': pageId },
    provider: { '@id': ORG_ID },
    isPartOf: { '@id': parentServiceId },
    category: 'Facility & Property Management Sub-Sector Solution',
    priceRange: options.priceRange || '₺₺',
    sameAs: options.sameAsWikidata
      ? [options.sameAsWikidata, 'https://www.wikidata.org/wiki/Q1391515']
      : ['https://www.wikidata.org/wiki/Q1391515'],
    hasCredential: FACILITY_COMPLETE_GRAPH_CREDENTIALS,
    areaServed: DISTRICTS.map((d) => ({
      '@type': 'AdministrativeArea',
      name: `${d.name}, İstanbul`,
      url: `${BASE_URL}${langPrefix}/bolgeler/${d.slug}/tesis-yonetimi`,
    })),
  };

  // 4. WebPage Node
  const webPageNode = {
    '@type': 'WebPage',
    '@id': pageId,
    url: canonicalUrl,
    name: `${options.name} | Alo Yönetim İstanbul`,
    description: options.description,
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: { '@id': breadcrumbId },
    about: { '@id': serviceId },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: options.speakableSelectors || ['h1', 'p'],
    },
    inLanguage: lang,
  };

  // 5. FAQPage Node
  const faqList = options.faqs && options.faqs.length > 0 ? options.faqs : [];
  const faqPageNode =
    faqList.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': faqId,
          isPartOf: { '@id': pageId },
          mainEntity: faqList.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null;

  const graphNodes = [organizationNode, breadcrumbNode, serviceNode, webPageNode];
  if (faqPageNode) {
    graphNodes.push(faqPageNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };
}

export interface DistrictFacilityGraphOptions {
  districtSlug: string;
  districtName: string;
  lang?: string;
  pageTitle?: string;
  pageDescription?: string;
  geo?: { lat: number; lng: number };
  neighborhoods?: string[];
  faqs?: Array<{ question: string; answer: string }>;
}

/**
 * 39 İlçe Tesis ve Mülk Yönetimi Sayfaları İçin Birleşik Schema.org @graph Knowledge Graph Jeneratörü.
 * 
 * Yerel arama niyetini (Local SEO) yakalamak ve ana Tesis Yönetimi hub'ına (Parent @id)
 * PageRank aktarmak için Google LocalBusiness ve Service düğümlerini tek bir linked-data ağında bağlar.
 */
export function buildDistrictFacilityGraphSchema(options: DistrictFacilityGraphOptions): JsonLdObject {
  const lang = options.lang || 'tr';
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const parentUrl = `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/bolgeler/${options.districtSlug}/tesis-yonetimi`;
  const districtHubUrl = `${BASE_URL}${langPrefix}/bolgeler/${options.districtSlug}`;
  const pageId = `${canonicalUrl}#webpage`;
  const serviceId = `${canonicalUrl}#service`;
  const localBusinessId = `${canonicalUrl}#localbusiness`;
  const parentServiceId = `${parentUrl}#service`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const faqId = `${canonicalUrl}#faq`;

  const pageTitle = options.pageTitle || `${options.districtName} Tesis Yönetimi | Alo Yönetim İstanbul`;
  const pageDescription =
    options.pageDescription ||
    `${options.districtName} genelinde apartman, site, plaza ve konut projeleri için 5188 güvenlik ve şeffaf maliyet yönetimiyle profesyonel tesis yönetimi.`;

  // 1. Organization Node
  const organizationNode = {
    '@type': 'Corporation',
    '@id': ORG_ID,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: ORG_LOGO,
      caption: ORG_NAME,
    },
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    sameAs: ORG_SAME_AS,
    hasCredential: FACILITY_COMPLETE_GRAPH_CREDENTIALS,
  };

  // 2. LocalBusiness / Operations Node
  const localBusinessNode = {
    '@type': 'LocalBusiness',
    '@id': localBusinessId,
    name: `Alo Yönetim ${options.districtName} Tesis Operasyon Merkezi`,
    url: canonicalUrl,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      addressLocality: options.districtName,
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    geo: options.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: options.geo.lat,
          longitude: options.geo.lng,
        }
      : ORG_GEO,
  };

  // 3. BreadcrumbList Node
  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Anasayfa',
        item: `${BASE_URL}${langPrefix}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bölgeler',
        item: `${BASE_URL}${langPrefix}/bolgeler`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: options.districtName,
        item: districtHubUrl,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${options.districtName} Tesis Yönetimi`,
        item: canonicalUrl,
      },
    ],
  };

  // 4. District Service Node
  const serviceNode: JsonLdObject = {
    '@type': 'Service',
    '@id': serviceId,
    name: `${options.districtName} Tesis ve Mülk Yönetimi | Alo Yönetim`,
    serviceType: 'Entegre Tesis Yönetimi ve Yerel Gayrimenkul İşletmesi',
    description: pageDescription,
    url: canonicalUrl,
    mainEntityOfPage: { '@id': pageId },
    provider: { '@id': ORG_ID },
    isPartOf: { '@id': parentServiceId },
    category: 'District Facility & Property Management Solution',
    priceRange: '₺₺',
    sameAs: [
      'https://www.wikidata.org/wiki/Q1391515',
      'https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi',
    ],
    hasCredential: FACILITY_COMPLETE_GRAPH_CREDENTIALS,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${options.districtName}, İstanbul`,
      geo: options.geo
        ? {
            '@type': 'GeoCoordinates',
            latitude: options.geo.lat,
            longitude: options.geo.lng,
          }
        : undefined,
    },
  };

  // 5. WebPage Node
  const webPageNode = {
    '@type': 'WebPage',
    '@id': pageId,
    url: canonicalUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: { '@id': breadcrumbId },
    about: { '@id': serviceId },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.tldr', 'p'],
    },
    inLanguage: lang,
  };

  // 6. FAQPage Node
  const faqList = options.faqs && options.faqs.length > 0 ? options.faqs : [];
  const faqPageNode =
    faqList.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': faqId,
          isPartOf: { '@id': pageId },
          mainEntity: faqList.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null;

  const graphNodes = [organizationNode, localBusinessNode, breadcrumbNode, serviceNode, webPageNode];
  if (faqPageNode) {
    graphNodes.push(faqPageNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };
}


