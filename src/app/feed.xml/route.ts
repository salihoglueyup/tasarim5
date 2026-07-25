import { BASE_URL } from '@/lib/seo';
import { POSTS } from '@/data/posts';
import { getCategory } from '@/data/posts';

/**
 * Blog RSS beslemesi (SEO Master Plan V4 — Faz 162).
 * /feed.xml adresinde yayınlanır (proxy nokta içeren yolları atlar).
 */
export const dynamic = 'force-static';
export const revalidate = 86400;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const sorted = [...POSTS].sort(
    (a, b) => +new Date(b.datePublished) - +new Date(a.datePublished),
  );

  const items = sorted
    .map((p) => {
      const cat = getCategory(p.category);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <description>${esc(p.description)}</description>
      ${cat ? `<category>${esc(cat.name)}</category>` : ''}
      <pubDate>${new Date(p.datePublished).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alo Yönetim Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Site ve tesis yönetimi, aidat, güvenlik ve mevzuat rehberleri.</description>
    <language>tr-TR</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(sorted[0]?.datePublished ?? Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
