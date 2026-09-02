import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';
import { ORG_NAME } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Saatte bir tazele

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { category: true, author: true },
    orderBy: { datePublished: 'desc' },
    take: 30
  });

  const latestUpdated = posts.length > 0 && posts[0].datePublished
    ? new Date(posts[0].datePublished).toISOString()
    : new Date().toISOString();

  const entries = posts.map(p => {
    const postUrl = `${BASE_URL}/blog/${p.slug}`;
    const pubIso = new Date(p.datePublished).toISOString();
    const authorName = p.author?.name || 'Alo Yönetim Uzman Masası';
    const catName = p.category?.name || 'Site Yönetimi';

    return `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link href="${postUrl}" />
    <id>${postUrl}</id>
    <updated>${pubIso}</updated>
    <summary>${escapeXml(p.description || p.title)}</summary>
    <category term="${escapeXml(catName)}" />
    <author>
      <name>${escapeXml(authorName)}</name>
    </author>
  </entry>`;
  }).join('\n');

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${ORG_NAME} Blog &amp; Bilgi Merkezi</title>
  <subtitle>Profesyonel Tesis Yönetimi, 5188 Özel Güvenlik, KMK Hukuk ve Aidat Tahsilatı Rehberleri</subtitle>
  <!-- Faz 142: WebSub (PubSubHubbub) Google Hub Tanımları -->
  <link rel="hub" href="https://pubsubhubbub.appspot.com/" />
  <link href="${BASE_URL}/feed.xml" rel="self" type="application/atom+xml" />
  <link href="${BASE_URL}/blog" />
  <id>${BASE_URL}/blog</id>
  <updated>${latestUpdated}</updated>
  <rights>© 2026 ${ORG_NAME}. Tüm Hakları Saklıdır.</rights>
  <author>
    <name>${ORG_NAME} Hukuk &amp; Operasyon Kurulu</name>
    <email>info@aloyonetim.com.tr</email>
  </author>
${entries}
</feed>`;

  return new NextResponse(atomFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      Link: `<https://pubsubhubbub.appspot.com/>; rel="hub", <${BASE_URL}/feed.xml>; rel="self"`,
    },
  });
}

