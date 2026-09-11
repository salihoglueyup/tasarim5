import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';
import { createETagResponse } from '@/lib/security/etag';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const articleParam = url.searchParams.get('article');
  const formatParam = url.searchParams.get('format');

  let filteredPrecedents = YARGITAY_LEGAL_PRECEDENTS;
  if (articleParam) {
    filteredPrecedents = YARGITAY_LEGAL_PRECEDENTS.filter((p) =>
      p.kmkArticle.includes(articleParam)
    );
  }

  // RFC 4180 Uyumlu Açık Veri CSV Dışa Aktarımı
  if (formatParam === 'csv') {
    const csvHeaders = ['ID', 'Mahkeme', 'Esas_No', 'Karar_No', 'Karar_Tarihi', 'KMK_Maddesi', 'Dava_Konusu', 'Hukum_Ozeti', 'Baglayici_Ictihat_Metni', 'Alo_Yonetim_Cozumu', 'Kanonik_URL'];
    const csvRows = filteredPrecedents.map((p) => [
      p.id,
      `"${(p.court || '').replace(/"/g, '""')}"`,
      `"${(p.docketNumber || '').replace(/"/g, '""')}"`,
      `"${(p.decisionNumber || '').replace(/"/g, '""')}"`,
      p.decisionDate,
      `"${(p.kmkArticle || '').replace(/"/g, '""')}"`,
      `"${(p.subject || '').replace(/"/g, '""')}"`,
      `"${(p.rulingSummary || '').replace(/"/g, '""')}"`,
      `"${(p.bindingPrecedentText || '').replace(/"/g, '""')}"`,
      `"${(p.aloYonetimOperationalSolution || '').replace(/"/g, '""')}"`,
      p.canonicalUrl,
    ].join(','));

    const csvContent = '\uFEFF' + [csvHeaders.join(','), ...csvRows].join('\r\n');
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'inline; filename="yargitay-kmk-emsal-kararlari.csv"',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
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

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'T.C. Yargıtay Kat Mülkiyeti Kanunu Emsal Kararları Açık Veri Seti',
    description: 'Site ve bina yönetiminde aidat borçları, asansör ortak gider muafiyeti, cam balkon izinleri ve yönetici seçimi hakkında bağlayıcı Yargıtay emsal kararları veri seti.',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
    },
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/legal-precedents.json`,
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/legal-precedents.json?format=csv`,
      },
    ],
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
    datasetSchema,
  };

  return createETagResponse(req, payload, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Legal-Precedents-Index': 'Yargitay-KMK-Precedents-Knowledge-Graph',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      Link: `<${BASE_URL}/api/tesis-yonetimi/legal-precedents.json?format=csv>; rel="alternate"; type="text/csv"`,
    },
    cacheControl: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
  });
}
