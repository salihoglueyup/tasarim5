import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { KMK_LAW_INDEX } from '@/data/kmkLawData';
import { createETagResponse } from '@/lib/security/etag';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const formatParam = url.searchParams.get('format');
  const categoryParam = url.searchParams.get('category');

  let filteredArticles = KMK_LAW_INDEX;
  if (categoryParam) {
    filteredArticles = KMK_LAW_INDEX.filter((a) => a.category === categoryParam);
  }

  // RFC 4180 Uyumlu Açık Veri CSV Dışa Aktarımı
  if (formatParam === 'csv') {
    const csvHeaders = ['Madde_No', 'Baslik', 'Kategori', 'Ozet', 'Pratik_Uygulama', 'Featured_Snippet_Soru', 'Dogrudan_Cevap', 'Yasal_Link'];
    const csvRows = filteredArticles.map((a) => [
      a.articleNumber,
      `"${(a.title || '').replace(/"/g, '""')}"`,
      `"${(a.category || '').replace(/"/g, '""')}"`,
      `"${(a.summary || '').replace(/"/g, '""')}"`,
      `"${(a.practicalApplication || '').replace(/"/g, '""')}"`,
      `"${(a.featuredSnippetQuestion || '').replace(/"/g, '""')}"`,
      `"${(a.directSnippetAnswer || '').replace(/"/g, '""')}"`,
      a.legalAnchor,
    ].join(','));

    const csvContent = '\uFEFF' + [csvHeaders.join(','), ...csvRows].join('\r\n');
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'inline; filename="kmk-634-mevzuat-indeksi.csv"',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  }

  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Tesis Yönetimi Mevzuat İndeksi',
    description: 'Site ve apartman işletmeciliğini düzenleyen 634 sayılı KMK yasa maddeleri, cezalar ve uygulama kılavuzu.',
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      logo: `${BASE_URL}/images/logo.png`,
      telephone: '+90 216 550 48 48',
    },
    itemListElement: filteredArticles.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Legislation',
        name: `KMK Madde ${item.articleNumber}: ${item.title}`,
        legislationIdentifier: `634 Sayılı Kanun Madde ${item.articleNumber}`,
        legislationType: 'Kanun Maddesi',
        legislationJurisdiction: 'TR',
        inLanguage: 'tr',
        legislationPassedBy: {
          '@type': 'GovernmentOrganization',
          name: 'Türkiye Büyük Millet Meclisi (TBMM)',
          sameAs: 'https://www.wikidata.org/wiki/Q640108',
        },
        url: item.legalAnchor,
        abstract: item.summary,
      },
    })),
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Açık Veri Seti',
    description: 'Site, rezidans ve apartman yönetiminde ortak alanlar, aidat borçları, yönetici seçimi ve işletme projeleri hakkında 634 sayılı KMK açık veri seti.',
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
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json`,
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json?format=csv`,
      },
    ],
  };

  const payload = {
    metadata: {
      title: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Bütüncül Açık Veri İndeksi',
      lawNumber: '634',
      publicationDate: '1965-06-23',
      jurisdiction: 'Türkiye Cumhuriyeti',
      totalArticlesIndexed: filteredArticles.length,
      version: '2026.1',
    },
    articles: filteredArticles,
    schema: schemaLd,
    datasetSchema,
  };

  return createETagResponse(req, payload, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-KMK-Index': 'KMK-634-Facility-Management-Law-Graph',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      Link: `<${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json?format=csv>; rel="alternate"; type="text/csv"`,
    },
    cacheControl: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
  });
}
