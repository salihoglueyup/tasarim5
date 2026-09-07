import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = 86400; // Günde bir yenile (ISR)

function escapeXml(unsafe: string) {
  return (unsafe || '').replace(/[<>&'"]/g, function (c) {
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
  const videoEntries = [
    {
      pageUrl: `${BASE_URL}/`,
      thumbnailLoc: `${BASE_URL}/images/hero-poster-v5.webp`,
      title: 'Alo Yönetim — Profesyonel Tesis ve Site Yönetimi Tanıtım Filmi',
      description: 'İstanbul Kadıköy merkezli 39 ilçede ISO 41001 standartlarında profesyonel tesis yönetimi, 5188 güvenlik ve teknik bakım hizmetlerimizin tanıtım filmi.',
      contentLoc: `${BASE_URL}/video/brand-film.mp4`,
      duration: 90, // saniye
      publicationDate: '2026-01-15T08:00:00+03:00',
      familyFriendly: 'yes',
      requiresSubscription: 'no',
      uploader: 'Alo Yönetim',
      category: 'Tesis Yönetimi',
      tags: ['tesis yönetimi', 'site yönetimi', 'özel güvenlik', '5188', 'apartman yönetimi', 'iso 41001'],
    },
  ];

  // Yalnızca sunucuda fiziksel olarak var olan video dosyaları sitemap listesine eklenir (404 önleme)
  const validVideoEntries = videoEntries.filter((v) => {
    const relativePath = v.contentLoc.replace(BASE_URL, '').replace(/^\/+/, '');
    const diskPath = path.join(process.cwd(), 'public', relativePath);
    return fs.existsSync(diskPath);
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  for (const v of validVideoEntries) {
    xml += `  <url>\n`;
    xml += `    <loc>${v.pageUrl}</loc>\n`;
    xml += `    <video:video>\n`;
    xml += `      <video:thumbnail_loc>${v.thumbnailLoc}</video:thumbnail_loc>\n`;
    xml += `      <video:title>${escapeXml(v.title)}</video:title>\n`;
    xml += `      <video:description>${escapeXml(v.description)}</video:description>\n`;
    xml += `      <video:content_loc>${v.contentLoc}</video:content_loc>\n`;
    xml += `      <video:duration>${v.duration}</video:duration>\n`;
    xml += `      <video:publication_date>${v.publicationDate}</video:publication_date>\n`;
    xml += `      <video:family_friendly>${v.familyFriendly}</video:family_friendly>\n`;
    xml += `      <video:requires_subscription>${v.requiresSubscription}</video:requires_subscription>\n`;
    xml += `      <video:uploader info="${BASE_URL}">${escapeXml(v.uploader)}</video:uploader>\n`;
    xml += `      <video:category>${escapeXml(v.category)}</video:category>\n`;
    for (const tag of v.tags) {
      xml += `      <video:tag>${escapeXml(tag)}</video:tag>\n`;
    }
    xml += `    </video:video>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'X-Video-Sitemap': 'Google-Video-Sitemap-v1.1',
    },
  });
}
