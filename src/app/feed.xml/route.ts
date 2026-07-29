import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { category: true, author: true },
    orderBy: { datePublished: 'desc' }
  });

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Alo Yönetim Blog</title>
  <description>Site ve tesis yönetimi hakkında güncel rehberler.</description>
  <link>${BASE_URL}/blog</link>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <description><![CDATA[${p.description}]]></description>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <category>${p.category.name}</category>
      <pubDate>${p.datePublished.toUTCString()}</pubDate>
    </item>
  `,
    )
    .join('')}
</channel>
</rss>`;
  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}
