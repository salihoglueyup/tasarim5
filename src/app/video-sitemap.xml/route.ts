import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

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
      thumbnailLoc: `${BASE_URL}/images/hero-poster.webp`,
      title: 'Alo Yönetim — Profesyonel Tesis ve Site Yönetimi Tanıtım Filmi',
      description: 'İstanbul Kadıköy merkezli 39 ilçede ISO 41001 standartlarında profesyonel tesis yönetimi, 5188 güvenlik ve teknik bakım hizmetlerimizin tanıtım filmi.',
      contentLoc: `${BASE_URL}/video/brand-film.mp4`,
      duration: 90, // saniye
      publicationDate: '2026-01-15T08:00:00+03:00',
      familyFriendly: 'yes',
      requiresSubscription: 'no',
      uploader: 'Alo Yönetim ve Organizasyon A.Ş.',
      category: 'Tesis Yönetimi',
      tags: ['tesis yönetimi', 'site yönetimi', 'özel güvenlik', '5188', 'apartman yönetimi', 'iso 41001'],
    },
    {
      pageUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
      thumbnailLoc: `${BASE_URL}/images/hero-poster-v5.webp`,
      title: 'Entegre Tesis Yönetimi ve İşletme Projesi Prosedürleri',
      description: '634 Sayılı Kat Mülkiyeti Kanunu ve ISO 41001 kapsamında yıllık işletme bütçesi hazırlığı ve %30 tasarruf modeli.',
      contentLoc: `${BASE_URL}/video/facility-overview.mp4`,
      duration: 120,
      publicationDate: '2026-02-01T10:00:00+03:00',
      familyFriendly: 'yes',
      requiresSubscription: 'no',
      uploader: 'Alo Yönetim Operasyon Kurulu',
      category: 'Tesis Yönetimi',
      tags: ['entegre tesis yönetimi', 'işletme projesi', 'kmk 634', 'bütçe tasarrufu'],
    },
    {
      pageUrl: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
      thumbnailLoc: `${BASE_URL}/images/hero-poster.webp`,
      title: '5188 Sayılı Kanun Kapsamında Fiziki Güvenlik ve CCTV İzleme',
      description: 'T.C. İçişleri Bakanlığı ve Valilik izinli lisanslı özel güvenlik görevlileri, 7/24 devriye ve kamera denetim süreçleri.',
      contentLoc: `${BASE_URL}/video/security-operations.mp4`,
      duration: 75,
      publicationDate: '2026-02-10T12:00:00+03:00',
      familyFriendly: 'yes',
      requiresSubscription: 'no',
      uploader: 'Alo Yönetim Güvenlik Masası',
      category: 'Özel Güvenlik',
      tags: ['özel güvenlik şirketi', '5188 güvenlik', 'cctv kamera', 'site emniyeti'],
    },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  for (const v of videoEntries) {
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
