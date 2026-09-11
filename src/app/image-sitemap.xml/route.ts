import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import { POSTS_META } from '@/data/postsMetadata';
import { REFERENCES_META } from '@/data/referencesMetadata';
import { CERTIFICATES } from '@/data/certificates';

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
    let posts: { slug: string; image: string | null; title: string }[] = [];
    let references: { slug: string; image: string | null; title: string }[] = [];

    // Görselli tüm blog yazılarını çek (DB sorgusu)
    try {
      posts = await prisma.post.findMany({
        where: { published: true, image: { not: null } },
        select: { slug: true, image: true, title: true }
      });
    } catch (err) {
      console.warn('Image Sitemap: Post DB fallback to static metadata:', err);
    }

    // Görselli tüm referansları çek (DB sorgusu)
    try {
      references = await prisma.reference.findMany({
        where: { published: true, image: { not: null } },
        select: { slug: true, image: true, title: true }
      });
    } catch (err) {
      console.warn('Image Sitemap: Reference DB fallback to static metadata:', err);
    }

    // DB boş veya ulaşılamazsa offline statik veri katmanını devreye sok
    if (!posts || posts.length === 0) {
      posts = POSTS_META.filter((p) => Boolean(p.image)).map((p) => ({
        slug: p.slug,
        image: p.image,
        title: p.title,
      }));
    }

    if (!references || references.length === 0) {
      references = REFERENCES_META.filter((r) => Boolean(r.image) && r.published !== false).map((r) => ({
        slug: r.slug,
        image: r.image,
        title: r.title,
      }));
    }

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
    xml += `      <image:loc>${BASE_URL}/images/hero-poster-v5.webp</image:loc>\n`;
    xml += `      <image:title>ISO 41001:2018 Uluslararası Tesis Yönetim Sertifikası — Alo Yönetim</image:title>\n`;
    xml += `      <image:caption>TÜRKAK ve ISO akreditasyonlu profesyonel tesis yönetimi ve kalite sertifikalarımız</image:caption>\n`;
    xml += `      <image:geo_location>İstanbul, Türkiye</image:geo_location>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;

    // 7 Bireysel Akredite Kalite Sertifikası Görselleri
    for (const cert of CERTIFICATES) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/kurumsal/sertifikalar/${cert.slug}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}/images/hero-poster-v5.webp</image:loc>\n`;
      xml += `      <image:title>${escapeXml(cert.name)} — ${escapeXml(cert.subtitle)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(cert.description)} (${escapeXml(cert.accreditation)})</image:caption>\n`;
      xml += `      <image:geo_location>İstanbul, Türkiye</image:geo_location>\n`;
      xml += `      <image:license>${BASE_URL}/kullanim-sartlari</image:license>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }

    // 9 Temel Hizmet Sayfası Görselleri
    for (const service of SERVICES) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${service.pillar}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}/api/og</image:loc>\n`;
      xml += `      <image:title>${escapeXml(service.name)} — Alo Yönetim Tesis Yönetimi</image:title>\n`;
      xml += `      <image:caption>${escapeXml(service.summary)}</image:caption>\n`;
      xml += `      <image:geo_location>İstanbul, Türkiye</image:geo_location>\n`;
      xml += `      <image:license>${BASE_URL}/kullanim-sartlari</image:license>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }

    // Tesis Yönetimi Dikey Alt Sektörleri ve Rehber Görselleri
    const facilitySubsectors = [
      { slug: 'rezidans-site-yonetimi', title: 'Rezidans ve Site Yönetimi', caption: 'Lüks rezidans ve toplu yaşam alanlarında 5188 güvenlik ve entegre tesis yönetimi' },
      { slug: 'plaza-yonetimi', title: 'Plaza ve İş Merkezi Yönetimi', caption: 'A+ plazalar ve ticari gayrimenkullerde akıllı bina otomasyonu ve tesis işletmesi' },
      { slug: 'toplu-konut-yonetimi', title: 'Toplu Konut ve Uydukent Yönetimi', caption: 'Geniş parsel ve çok bloklu toplu konut sitelerinde bütçe ve operasyon yönetimi' },
      { slug: 'sanayi-tesisi-yonetimi', title: 'Sanayi Tesisi ve Fabrika Yönetimi', caption: 'Endüstriyel tesisler ve lojistik merkezlerinde teknik bakım ve İSG yönetimi' },
      { slug: 'rehber', title: 'Entegre Tesis Yönetimi ve KMK 634 Rehberi', caption: 'KMK 634, ISO 41001 ve tesis yönetimi yasal mevzuat rehberi' },
    ];
    for (const sub of facilitySubsectors) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/hizmetler/tesis-yonetimi/${sub.slug}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}/api/og?title=${encodeURIComponent(sub.title)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(sub.title)} — Alo Yönetim</image:title>\n`;
      xml += `      <image:caption>${escapeXml(sub.caption)}</image:caption>\n`;
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
      xml += `      <image:loc>${BASE_URL}/api/og?title=${encodeURIComponent(district.name + ' Tesis Yönetimi')}&amp;type=local</image:loc>\n`;
      xml += `      <image:title>${escapeXml(district.name)} Tesis Yönetimi &amp; Site İşletmeciliği</image:title>\n`;
      xml += `      <image:caption>${escapeXml(district.name)} genelinde ISO 41001 standartlarında profesyonel tesis ve site yönetimi</image:caption>\n`;
      xml += `      <image:geo_location>${escapeXml(district.name)}, İstanbul, Türkiye</image:geo_location>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }

    // 169 Mahalle Yerel Tesis Yönetimi Görsel Haritası
    for (const district of DISTRICTS) {
      if (!district.neighborhoodData || district.neighborhoodData.length === 0) continue;
      for (const n of district.neighborhoodData) {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/bolgeler/${district.slug}/mahalleler/${n.slug}</loc>\n`;
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${BASE_URL}/api/og?title=${encodeURIComponent(n.name + ' Tesis Yönetimi')}&amp;type=local</image:loc>\n`;
        xml += `      <image:title>${escapeXml(n.name)} Mahallesi Tesis Yönetimi &amp; Site İşletmesi</image:title>\n`;
        xml += `      <image:caption>${escapeXml(district.name)} ${escapeXml(n.name)} Mahallesi ISO 41001 standartlarında profesyonel tesis ve site yönetimi</image:caption>\n`;
        xml += `      <image:geo_location>${escapeXml(n.name)}, ${escapeXml(district.name)}, İstanbul, Türkiye</image:geo_location>\n`;
        xml += `      <image:license>${BASE_URL}/kullanim-sartlari</image:license>\n`;
        xml += `    </image:image>\n`;
        xml += `  </url>\n`;
      }
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
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch (error) {
    console.error('Image Sitemap Critical Fallback:', error);
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>${BASE_URL}/</loc>\n    <image:image>\n      <image:loc>${BASE_URL}/images/hero-poster-v5.webp</image:loc>\n      <image:title>Alo Yönetim Profesyonel Tesis ve Mülk Yönetimi</image:title>\n    </image:image>\n  </url>\n</urlset>`;
    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  }
}
