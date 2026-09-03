import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

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
    name: 'ISO 14001:2015 Çevre Yönetim Sistemi',
    pdf: '/certificates/iso-14001.pdf',
    page: '/kurumsal/sertifikalar/iso-14001',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-45001',
    name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi',
    pdf: '/certificates/iso-45001.pdf',
    page: '/kurumsal/sertifikalar/iso-45001',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-26000',
    name: 'ISO 26000:2021 Sosyal Sorumluluk Kılavuzu',
    pdf: '/certificates/iso-26000.pdf',
    page: '/kurumsal/sertifikalar/iso-26000',
    lastmod: '2026-01-01',
  },
  {
    slug: 'iso-22301',
    name: 'ISO 22301:2019 İş Sürekliliği Yönetim Sistemi',
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
    name: 'ISO 10002:2018 Müşteri Memnuniyeti Yönetim Sistemi',
    pdf: '/certificates/iso-10002.pdf',
    page: '/kurumsal/sertifikalar/iso-10002',
    lastmod: '2026-01-01',
  },
];

const LEGAL_TEMPLATES = [
  {
    slug: '5188-valilik-guvenlik-izni-basvuru-dilekcesi',
    name: 'T.C. Valiliği 5188 Sayılı Kanun Özel Güvenlik İzni (ÖGİ) Başvuru Dilekçesi Şablonu',
    page: '/hizmetler/guvenlik-yonetimi',
    lastmod: '2026-02-01',
  },
  {
    slug: '5188-site-guvenlik-istihdam-karar-defteri-metni',
    name: 'KMK Madde 32 & 5188 Uyumlu Site Genel Kurulu Özel Güvenlik Karar Defteri Şablonu',
    page: '/hizmetler/guvenlik-yonetimi',
    lastmod: '2026-02-01',
  },
  {
    slug: 'kvkk-6698-site-kamera-kayit-aydinlatma-metni',
    name: '6698 Sayılı KVKK Uyumlu Site 4K Kamera ve Ziyaretçi Kaydı Aydınlatma Metni',
    page: '/hizmetler/guvenlik-yonetimi',
    lastmod: '2026-02-01',
  },
  {
    slug: '5188-nizamiye-guvenlik-gorev-talimatnamesi',
    name: '5188 Sayılı Kanun Madde 7 Uyumlu Nizamiye Özel Güvenlik Nöbet Talimatnamesi',
    page: '/hizmetler/guvenlik-yonetimi',
    lastmod: '2026-02-01',
  },
  {
    slug: 'kmk-634-yonetici-secimi-karar-sablonu',
    name: '634 Sayılı Kat Mülkiyeti Kanunu Madde 34 Yönetici Seçimi Karar Tutanağı',
    page: '/hizmetler/hukuk-ve-icra-danismanligi',
    lastmod: '2026-02-01',
  },
  {
    slug: 'kmk-20-aidat-gecikme-ihtarname-sablonu',
    name: 'KMK Madde 20/2 ve İİK Uyumlu Aidat ve Ortak Gider Noter İhtarnamesi Taslağı',
    page: '/hizmetler/hukuk-ve-icra-danismanligi',
    lastmod: '2026-02-01',
  },
];

export async function GET() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Ana Kalite Belgelerimiz Merkezi
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/kurumsal/kalite-belgelerimiz</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += `  </url>\n`;

  for (const cert of CERTIFICATES) {
    const fullPdfPath = path.join(process.cwd(), 'public', cert.pdf);
    if (fs.existsSync(fullPdfPath)) {
      // PDF doğrudan indexlensin
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${cert.pdf}</loc>\n`;
      xml += `    <lastmod>${cert.lastmod}</lastmod>\n`;
      xml += `    <changefreq>yearly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }

    // HTML landing page
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${cert.page}</loc>\n`;
    xml += `    <lastmod>${cert.lastmod}</lastmod>\n`;
    xml += `    <changefreq>yearly</changefreq>\n`;
    xml += `    <priority>0.65</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const doc of LEGAL_TEMPLATES) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${doc.page}#${doc.slug}</loc>\n`;
    xml += `    <lastmod>${doc.lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.75</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}
