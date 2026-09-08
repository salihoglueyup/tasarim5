import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';

export const dynamic = 'force-static';
export const revalidate = 86400;

const ORG_ID = `${BASE_URL}/#organization`;

export async function GET() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#defined-term`,
    name: 'Tesis Yönetimi',
    alternateName: ['Entegre Tesis Yönetimi', 'Site Yönetimi', 'Profesyonel Tesis İşletmeciliği', 'Facility Management'],
    description:
      'Tesis yönetimi; apartman, site, rezidans, plaza ve sanayi tesisleri gibi çok katlı veya karma kullanımlı yapılarda güvenlik, temizlik, teknik bakım, peyzaj, aidat tahsilat ve hukuki danışmanlık hizmetlerinin entegre ve profesyonel biçimde yürütülmesidir. 634 Sayılı Kat Mülkiyeti Kanunu (KMK) ve 5188 Sayılı Özel Güvenlik Kanunu çerçevesinde uygulanır.',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Alo Yönetim Tesis Yönetimi Bilgi Bankası',
      url: `${BASE_URL}/sozluk`,
    },
    sameAs: [
      'https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi',
      'https://www.wikidata.org/wiki/Q1391515',
    ],
    url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    provider: {
      '@id': ORG_ID,
      '@type': 'Organization',
      name: 'Alo Yönetim',
      legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      logo: `${BASE_URL}/images/logo.png`,
      telephone: '+90 216 550 48 48',
      foundingDate: '2009',
      areaServed: 'İstanbul',
      knowsAbout: [
        '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
        'ISO 41001 Tesis Yönetim Sistemi',
        '5188 Sayılı Özel Güvenlik Hizmetleri',
        'Site ve Rezidans Yönetimi',
        'Bütçe ve İşletme Projesi Yönetimi',
      ],
    },
    subServices: [
      {
        '@type': 'Service',
        name: '5188 Lisanslı Özel Güvenlik Yönetimi',
        url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
        sameAs: 'https://www.wikidata.org/wiki/Q11024344',
        description: '5188 Sayılı Özel Güvenlik Kanunu uyarınca lisanslı güvenlik personeli, PTS sistemi ve CCTV yönetimi.',
      },
      {
        '@type': 'Service',
        name: 'TSE 13811 Sertifikalı Temizlik & Hijyen',
        url: `${BASE_URL}/hizmetler/temizlik-ve-hijyen`,
        sameAs: 'https://www.wikidata.org/wiki/Q38782',
        description: 'Ortak alan temizliği, merdiven yıkama, otopark ve dış cephe bakımı.',
      },
      {
        '@type': 'Service',
        name: 'Teknik Bakım & Arıza Yönetimi',
        url: `${BASE_URL}/hizmetler/teknik-bakim`,
        sameAs: 'https://www.wikidata.org/wiki/Q42848',
        description: 'Asansör yeşil etiket, jeneratör periyodik bakım, hidrofor ve kompanzasyon sistemi.',
      },
      {
        '@type': 'Service',
        name: 'Aidat Takibi & İcra Danışmanlığı',
        url: `${BASE_URL}/hizmetler/aidat-takibi`,
        sameAs: 'https://www.wikidata.org/wiki/Q4116214',
        description: 'SMS/kredi kartı aidat tahsilat, KMK m.37 işletme projesi ve hukuki icra desteği.',
      },
      {
        '@type': 'Service',
        name: 'Havuz Bakımı & Hijyen',
        url: `${BASE_URL}/hizmetler/havuz-bakimi-ve-hijyen`,
        sameAs: 'https://www.wikidata.org/wiki/Q309995',
        description: 'Sağlık Bakanlığı standartlarında klor/pH ölçümü, filtre bakımı ve havuz hijyen raporu.',
      },
      {
        '@type': 'Service',
        name: 'Peyzaj & Bahçe Bakımı',
        url: `${BASE_URL}/hizmetler/peyzaj-ve-bahce-bakimi`,
        sameAs: 'https://www.wikidata.org/wiki/Q328786',
        description: 'Otomatik sulama sistemi, çim biçme, budama ve mevsimlik bitki bakımı.',
      },
    ],
    propertyTypes: [
      {
        type: 'Rezidans & Lüks Site',
        url: `${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
        characteristics: ['7/24 concierge', 'VIP güvenlik', 'havuz/sauna yönetimi', 'lüks SLA'],
      },
      {
        type: 'Ticari Plaza & Ofis Binası',
        url: `${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
        characteristics: ['HVAC yönetimi', 'kiracı koordinasyonu', 'enerji tasarrufu'],
      },
      {
        type: 'Toplu Konut',
        url: `${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
        characteristics: ['aidat optimizasyonu', 'sosyal tesis yönetimi', 'KMK uyumluluk'],
      },
      {
        type: 'Sanayi Tesisi & Fabrika',
        url: `${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
        characteristics: ['ISO 45001 güvenlik', 'ağır teknik bakım', 'yangın sistemi'],
      },
      {
        type: 'Apartman',
        url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
        characteristics: ['aidat takibi', 'ortak alan temizliği', 'teknik bakım'],
      },
    ],
    legalFramework: [
      {
        name: 'ISO 41001:2018 Uluslararası Tesis Yönetim Sistemi',
        url: 'https://www.iso.org/standard/68021.html',
        relevance: 'Entegre tesis yönetimi operasyonel mükemmellik ve süreç standardı',
      },
      {
        name: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
        article: 'Madde 20, 37, 38, 40',
        url: 'https://www.mevzuat.gov.tr/mevzuatmetin/1.5.634.pdf',
        relevance: 'Kat malikleri yükümlülükleri, işletme projesi, yönetici hakları ve aidat icra',
      },
      {
        name: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
        url: 'https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5188.pdf',
        relevance: 'Lisanslı özel güvenlik personeli çalıştırma zorunluluğu ve denetim',
      },
      {
        name: 'TSE 13811 Temizlik Hizmetleri Standardı',
        relevance: 'Profesyonel temizlik hizmetleri kalite ve hijyen standardı',
      },
      {
        name: 'ISO 45001 İş Sağlığı ve Güvenliği',
        relevance: 'Tesis çalışanları için sağlık ve güvenlik yönetim sistemi',
      },
    ],
    credentials: [
      { name: 'ISO 41001:2018 Tesis Yönetim Sistemi', issuer: 'Uluslararası Akreditasyon' },
      { name: 'ISO 9001 Kalite Yönetim Sistemi', issuer: 'Türk Standartları Enstitüsü' },
      { name: 'ISO 14001 Çevre Yönetim Sistemi', issuer: 'TSE' },
      { name: 'ISO 45001 İSG Yönetim Sistemi', issuer: 'TSE' },
      { name: '5188 Özel Güvenlik Faaliyet Belgesi', issuer: 'İçişleri Bakanlığı' },
      { name: 'TSE HYB Temizlik Hizmet Yeterlilik Belgesi', issuer: 'TSE' },
    ],
    geographicCoverage: {
      '@type': 'City',
      name: 'İstanbul',
      containsPlace: DISTRICTS.map((d) => ({
        '@type': 'AdministrativeArea',
        name: d.name,
        url: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
        geo: { '@type': 'GeoCoordinates', latitude: d.geo.lat, longitude: d.geo.lng },
      })),
    },
    performanceBenchmarks: {
      averageMonthlySavings: '%26',
      averageTransferTime: '48 saat',
      clientRetentionRate: '%94',
      responseTimeSLA: '45 dakika',
      portfolioSize: `${DISTRICTS.reduce((acc, d) => acc + d.managedProjects, 0)}+ aktif proje`,
    },
    apiEndpoints: {
      faq: `${BASE_URL}/api/tesis-yonetimi/faq.json`,
      geoFeed: `${BASE_URL}/api/tesis-yonetimi/geo-feed.xml`,
      benchmark: `${BASE_URL}/api/tesis-yonetimi/benchmark.json`,
      dictionary: `${BASE_URL}/api/tesis-yonetimi/dictionary.json`,
      definitions: `${BASE_URL}/api/tesis-yonetimi/definitions.json`,
      legalPrecedents: `${BASE_URL}/api/tesis-yonetimi/legal-precedents.json`,
      aiSnippets: `${BASE_URL}/api/tesis-yonetimi/ai-snippets.json`,
      voiceQa: `${BASE_URL}/api/tesis-yonetimi/voice-qa.json`,
      duesIndex: `${BASE_URL}/api/tesis-yonetimi/dues-index.json`,
      kmkLawIndex: `${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json`,
      entityGraph: `${BASE_URL}/api/tesis-yonetimi/entity-graph.jsonld`,
    },
    faqEndpoint: `${BASE_URL}/api/tesis-yonetimi/faq.json`,
    geoFeedEndpoint: `${BASE_URL}/api/tesis-yonetimi/geo-feed.xml`,
    benchmarkEndpoint: `${BASE_URL}/api/tesis-yonetimi/benchmark.json`,
    dictionaryEndpoint: `${BASE_URL}/api/tesis-yonetimi/dictionary.json`,
    districtPageCount: DISTRICTS.length,
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
