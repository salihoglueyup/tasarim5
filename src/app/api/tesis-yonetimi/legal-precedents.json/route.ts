import { BASE_URL } from '@/lib/seo';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';
import { createETagResponse } from '@/lib/security/etag';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const articleParam = url.searchParams.get('article');

  let filteredPrecedents = YARGITAY_LEGAL_PRECEDENTS;
  if (articleParam) {
    filteredPrecedents = YARGITAY_LEGAL_PRECEDENTS.filter((p) =>
      p.kmkArticle.includes(articleParam)
    );
  }

  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tesis Yönetimi Yargıtay Emsal Kararları ve 634 KMK Hukuki İçtihatları',
    description: 'Aidat gecikme tazminatı, asansör ortak gider muafiyeti, yönetici seçimi çift çoğunluğu ve ortak alan işgalleri hakkında bağlayıcı yüksek mahkeme kararları.',
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      logo: `${BASE_URL}/images/logo.png`,
      telephone: '+90 216 550 48 48',
    },
    itemListElement: filteredPrecedents.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Legislation',
        name: `${item.court} — ${item.subject}`,
        legislationIdentifier: `${item.docketNumber} / ${item.decisionNumber}`,
        legislationType: 'Yargıtay Emsal Kararı',
        legislationJurisdiction: 'TR',
        inLanguage: 'tr',
        datePublished: item.decisionDate,
        legislationPassedBy: {
          '@type': 'GovernmentOrganization',
          name: 'T.C. Yargıtay Başkanlığı',
          sameAs: 'https://www.wikidata.org/wiki/Q1549429',
        },
        url: item.canonicalUrl,
        abstract: item.rulingSummary,
      },
    })),
  };

  const payload = {
    metadata: {
      title: 'Tesis ve Site Yönetimi Yargıtay Emsal Kararları Açık Veri İndeksi',
      jurisdiction: 'Türkiye Cumhuriyeti',
      totalPrecedentsIndexed: filteredPrecedents.length,
      courtScope: 'T.C. Yargıtay (Hukuk Genel Kurulu, 5. HD, 18. HD, 20. HD)',
      primaryLaw: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      version: '2026.1',
      lastUpdated: '2026-08-04',
      ...(articleParam ? { filteredArticle: articleParam } : {}),
    },
    precedents: filteredPrecedents,
    schema: schemaLd,
  };

  return createETagResponse(req, payload, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Legal-Precedents-Index': 'Yargitay-KMK-Precedents-Knowledge-Graph',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
    cacheControl: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
  });
}
