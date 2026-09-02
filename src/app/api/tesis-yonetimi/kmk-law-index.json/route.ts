import { KMK_LAW_INDEX } from '@/data/kmkLawData';
import { createETagResponse } from '@/lib/security/etag';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET(req: Request) {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Tesis Yönetimi Mevzuat İndeksi',
    description: 'Site ve apartman işletmeciliğini düzenleyen 634 sayılı KMK yasa maddeleri, cezalar ve uygulama kılavuzu.',
    itemListElement: KMK_LAW_INDEX.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Legislation',
        name: `KMK Madde ${item.articleNumber}: ${item.title}`,
        legislationIdentifier: `634 Sayılı Kanun Madde ${item.articleNumber}`,
        legislationType: 'Kanun Maddesi',
        legislationJurisdiction: 'TR',
        url: item.legalAnchor,
        abstract: item.summary,
      },
    })),
  };

  const payload = {
    metadata: {
      title: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Bütüncül Açık Veri İndeksi',
      lawNumber: '634',
      publicationDate: '1965-06-23',
      jurisdiction: 'Türkiye Cumhuriyeti',
      totalArticlesIndexed: KMK_LAW_INDEX.length,
      version: '2026.1',
    },
    articles: KMK_LAW_INDEX,
    schema: schemaLd,
  };

  return createETagResponse(req, payload, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-KMK-Index': 'KMK-634-Facility-Management-Law-Graph',
    },
    cacheControl: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
  });
}
