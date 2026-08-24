import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Günde bir yenile (ISR)

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
  try {
    // Görselli tüm blog yazılarını çek
    const posts = await prisma.post.findMany({
      where: { published: true, image: { not: null } },
      select: { slug: true, image: true, title: true }
    });

    // Görselli tüm referansları çek
    const references = await prisma.reference.findMany({
      where: { published: true, image: { not: null } },
      select: { slug: true, image: true, title: true }
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Ana sayfa sabit görseli
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/</loc>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/images/hero-poster-v5.webp</image:loc>\n`;
    xml += `      <image:title>Alo Yönetim Profesyonel Tesis ve Mülk Yönetimi</image:title>\n`;
    xml += `      <image:caption>İstanbul genelinde 5188 güvenlik, entegre tesis yönetimi ve aidat tahsilat çözümleri</image:caption>\n`;
    xml += `      <image:geo_location>Kadıköy, İstanbul, Türkiye</image:geo_location>\n`;
    xml += `      <image:license>${BASE_URL}/kullanim-sartlari</image:license>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;

    // Kalite Belgeleri Sayfası Görseli (ISO 41001 & 9001)
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/kurumsal/kalite-belgelerimiz</loc>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/images/iso-41001-certificate.webp</image:loc>\n`;
    xml += `      <image:title>ISO 41001:2018 Uluslararası Tesis Yönetim Sertifikası — Alo Yönetim</image:title>\n`;
    xml += `      <image:caption>TÜRKAK ve ISO akreditasyonlu profesyonel tesis yönetimi ve kalite sertifikalarımız</image:caption>\n`;
    xml += `      <image:geo_location>İstanbul, Türkiye</image:geo_location>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;

    // 9 Temel Hizmet Sayfası Görselleri
    for (const service of SERVICES) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${service.pillar}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}/og</image:loc>\n`;
      xml += `      <image:title>${escapeXml(service.name)} — Alo Yönetim Tesis Yönetimi</image:title>\n`;
      xml += `      <image:caption>${escapeXml(service.summary)}</image:caption>\n`;
      xml += `      <image:geo_location>İstanbul, Türkiye</image:geo_location>\n`;
      xml += `      <image:license>${BASE_URL}/kullanim-sartlari</image:license>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }

    // 39 İlçe Tesis Yönetimi Görsel Haritası
    for (const district of DISTRICTS) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}/og?title=${encodeURIComponent(district.name + ' Tesis Yönetimi')}&type=local</image:loc>\n`;
      xml += `      <image:title>${escapeXml(district.name)} Tesis Yönetimi &amp; Site İşletmeciliği</image:title>\n`;
      xml += `      <image:caption>${escapeXml(district.name)} genelinde ISO 41001 standartlarında profesyonel tesis ve site yönetimi</image:caption>\n`;
      xml += `      <image:geo_location>${escapeXml(district.name)}, İstanbul, Türkiye</image:geo_location>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }

    // Blog yazıları
    for (const post of posts) {
      if (!post.image) continue;
      const imageUrl = post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`;
      
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(post.title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(post.title)} — Alo Yönetim Bilgi Merkezi</image:caption>\n`;
      xml += `      <image:geo_location>İstanbul, Türkiye</image:geo_location>\n`;
      xml += `      <image:license>${BASE_URL}/kullanim-sartlari</image:license>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }

    // Referans projeleri
    for (const ref of references) {
      if (!ref.image) continue;
      const imageUrl = ref.image.startsWith('http') ? ref.image : `${BASE_URL}${ref.image.startsWith('/') ? '' : '/'}${ref.image}`;
      
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/referanslar/${ref.slug}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(ref.title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(ref.title)} — Alo Yönetim Referans Projesi</image:caption>\n`;
      xml += `      <image:geo_location>İstanbul, Türkiye</image:geo_location>\n`;
      xml += `      <image:license>${BASE_URL}/kullanim-sartlari</image:license>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Image Sitemap Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
