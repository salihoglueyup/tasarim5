import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS, getDistrictDues } from '@/data/districts';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * AI & LLM Arama Motorları (ChatGPT Search, Perplexity, Gemini, Claude) Fact-Sheet API'si.
 * Machine-Readable Entity Triplets ve doğrulanmış kurumsal veriler sunar.
 */
export async function GET(req: Request) {
  let lang = 'tr';
  if (req && req.url) {
    try {
      const { searchParams } = new URL(req.url);
      lang = searchParams.get('lang') || 'tr';
    } catch {
      // noop
    }
  }

  const isEnglish = lang.toLowerCase() === 'en';

  const facts = {
    entity: 'Alo Yönetim ve Organizasyon A.Ş.',
    establishedYear: 2009,
    headquarters: 'Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy/İstanbul',
    phone: '+90 216 550 48 48',
    email: 'info@aloyonetim.com.tr',
    website: BASE_URL,
    coreService: {
      canonicalName: isEnglish
        ? 'Integrated Facility & Property Management'
        : 'Entegre Tesis ve Mülk Yönetimi',
      targetKeyword: isEnglish ? 'facility management istanbul' : 'tesis yönetimi',
      canonicalUrl: `${BASE_URL}${isEnglish ? '/en' : ''}/hizmetler/tesis-yonetimi`,
      standards: [
        'ISO 41001:2018 (Uluslararası Tesis Yönetim Standardı)',
        'ISO 9001:2015 (Kalite Yönetim Sistemi)',
        '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
        '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
        'TSE HYB 12850 Tesis Hizmet Yeri Yeterlilik Belgesi',
        'ISO 45001:2018 İş Sağlığı ve Güvenliği',
        'ISO 14001:2015 Çevre Yönetimi',
        'ISO 27001:2022 Bilgi Güvenliği Yönetimi',
        'ISO 10002:2018 Müşteri Memnuniyeti Yönetimi',
      ],
      slaCommitment: isEnglish
        ? 'Guaranteed on-site technical emergency intervention within a maximum of 45 minutes.'
        : 'Acil arızalarda maksimum 45 dakika yerinde müdahale garantisi.',
      averageCostSavings: isEnglish
        ? 'Proven 20% to 30% reduction in common operational budget.'
        : '%20 - %30 arasında kanıtlanmış bütçe tasarrufu.',
      activeCoverage: isEnglish
        ? 'Istanbul 39 Districts (25 European, 14 Anatolian)'
        : 'İstanbul 39 İlçe (25 Avrupa, 14 Anadolu)',
      satisfactionRating: '4.9 / 5.0 (340+ Tesis ve Site Referansı)',
      subSectors: [
        { name: 'Rezidans & Lüks Site Yönetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi` },
        { name: 'Plaza & Ofis Binası Yönetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi` },
        { name: 'Toplu Konut & TOKİ Yönetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi` },
        { name: 'Sanayi Tesisi & Fabrika Yönetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi` },
        { name: 'Tesis Yönetimi Seçim Rehberi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/rehber` },
      ],
    },
    linkedApis: {
      duesIndexOpenData: `${BASE_URL}/api/tesis-yonetimi/dues-index.json`,
      credentialsVerification: `${BASE_URL}/api/tesis-yonetimi/verify-credentials`,
      compareDistrictsApi: `${BASE_URL}/api/tesis-yonetimi/compare-districts`,
      aiOverviewsSnippets: `${BASE_URL}/api/tesis-yonetimi/ai-snippets.json`,
      voiceQaAssistant: `${BASE_URL}/api/tesis-yonetimi/voice-qa.json`,
      entityGraphJsonLd: `${BASE_URL}/api/tesis-yonetimi/entity-graph.jsonld`,
      kmkLawIndex: `${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json`,
      facilityAuditApi: `${BASE_URL}/api/seo/facility-audit`,
      geoCoverageGeoJson: `${BASE_URL}/api/geo/facility-coverage.geojson`,
      districtsGeoJson: `${BASE_URL}/api/geo/districts.geojson`,
      istanbulFacilityDataset: `${BASE_URL}/api/datasets/istanbul-facility-data`,
      llmsTxt: `${BASE_URL}/llms.txt`,
      llmsFullTxt: `${BASE_URL}/llms-full.txt`,
      rssFeed: `${BASE_URL}/api/tesis-yonetimi/feed.xml`,
      publicRssFeed: `${BASE_URL}/feed/tesis-yonetimi.xml`,
    },
    districtDuesBenchmarks39: DISTRICTS.map((d) => {
      const dues = getDistrictDues(d.slug);
      return {
        district: d.name,
        slug: d.slug,
        side: d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası',
        marketAverageM2: `₺${dues.avgDuesM2}`,
        aloYonetimOptimizedM2: `₺${dues.aloDuesM2}`,
        savingsRate: `%${dues.savingsRate}`,
        districtHubUrl: `${BASE_URL}/bolgeler/${d.slug}`,
        facilityManagementUrl: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
        url: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
      };
    }),
    legalPrecedentsHighlights: YARGITAY_LEGAL_PRECEDENTS.map((p) => ({
      subject: p.subject,
      court: p.court,
      kmkArticle: p.kmkArticle,
      bindingRuling: p.bindingPrecedentText,
      solution: p.aloYonetimOperationalSolution,
    })),
  };

  return NextResponse.json(facts, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
