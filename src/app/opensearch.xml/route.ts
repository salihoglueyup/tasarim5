import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { ORG_NAME } from '@/lib/schemas';

export const dynamic = 'force-static';
export const revalidate = 2592000; // 30 Gün

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>${ORG_NAME}</ShortName>
  <Description>${ORG_NAME} Profesyonel Tesis Yönetimi, 5188 Güvenlik, Aidat ve İlçe Hizmetleri Arama Motoru</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <OutputEncoding>UTF-8</OutputEncoding>
  <Image width="16" height="16" type="image/x-icon">${BASE_URL}/favicon.ico</Image>
  <Image width="64" height="64" type="image/png">${BASE_URL}/icon-192.png</Image>
  <Url type="text/html" method="get" template="${BASE_URL}/blog?q={searchTerms}" />
  <Url type="application/x-suggestions+json" method="get" template="${BASE_URL}/api/search-suggest?q={searchTerms}" />
  <moz:SearchForm>${BASE_URL}</moz:SearchForm>
  <Developer>Alo Yönetim Teknoloji ve SEO Ekibi</Developer>
  <Contact>info@aloyonetim.com.tr</Contact>
  <Tags>tesis yönetimi apartman site yönetimi özel güvenlik 5188 aidat takibi istanbul</Tags>
  <Attribution>© 2026 ${ORG_NAME}. Tüm Hakları Saklıdır.</Attribution>
</OpenSearchDescription>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}
