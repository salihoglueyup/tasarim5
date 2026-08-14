import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 2592000; // 30 gün

const CERTIFICATES = [
  {
    slug: 'dogaya-saygi',
    name: 'Doğaya Saygı Sertifikası — Çevreye Duyarlı Hizmet',
    pdf: '/certificates/dogaya-saygi.pdf',
    page: '/kurumsal/sertifikalar/dogaya-saygi',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-14001',
    name: 'ISO 14001:2026 Çevre Yönetim Sistemi',
    pdf: '/certificates/iso-14001.pdf',
    page: '/kurumsal/sertifikalar/iso-14001',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-26000',
    name: 'ISO 26000:2021 Sosyal Sorumluluk',
    pdf: '/certificates/iso-26000.pdf',
    page: '/kurumsal/sertifikalar/iso-26000',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-45001',
    name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği',
    pdf: '/certificates/iso-45001.pdf',
    page: '/kurumsal/sertifikalar/iso-45001',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-22301',
    name: 'ISO 22301:2019 İş Sürekliliği Yönetimi',
    pdf: '/certificates/iso-22301.pdf',
    page: '/kurumsal/sertifikalar/iso-22301',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-31000',
    name: 'ISO 31000:2018 Kurumsal Risk Yönetimi',
    pdf: '/certificates/iso-31000.pdf',
    page: '/kurumsal/sertifikalar/iso-31000',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-10002',
    name: 'ISO 10002:2018 Müşteri Memnuniyeti',
    pdf: '/certificates/iso-10002.pdf',
    page: '/kurumsal/sertifikalar/iso-10002',
    lastmod: '2026-01-01',
  },
];

export async function GET() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const cert of CERTIFICATES) {
    // PDF doğrudan indexlensin
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${cert.pdf}</loc>\n`;
    xml += `    <lastmod>${cert.lastmod}</lastmod>\n`;
    xml += `    <changefreq>yearly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;

    // HTML landing page
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${cert.page}</loc>\n`;
    xml += `    <lastmod>${cert.lastmod}</lastmod>\n`;
    xml += `    <changefreq>yearly</changefreq>\n`;
    xml += `    <priority>0.65</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
}
