import { BASE_URL, SITE_NAME } from '@/lib/seo';
import { ORG_PHONE, ORG_EMAIL, ORG_SAME_AS } from '@/lib/schemas';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';

/**
 * Makine-okur JSON özet uç noktası (SEO Master Plan V4 — Faz 143).
 * AI ajanları ve entegrasyonlar için markanın yapılandırılmış özeti.
 */
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const payload = {
    name: SITE_NAME,
    legalName: 'Alo Yönetim Tesis Yönetimi A.Ş.',
    description:
      'İstanbul Kadıköy merkezli profesyonel mülk ve tesis yönetimi şirketi. Güvenlik, temizlik, teknik bakım, peyzaj, havuz, ilaçlama ve aidat/hukuk yönetimi.',
    url: BASE_URL,
    foundingDate: '2015',
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    address: {
      streetAddress: 'Eğitim Mah. Kasap İsmail Sk. No:15/19',
      addressLocality: 'Kadıköy',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    sameAs: ORG_SAME_AS,
    services: SERVICES.map((s) => ({
      name: s.name,
      slug: s.slug,
      summary: s.summary,
      url: `${BASE_URL}${s.pillar}`,
    })),
    serviceAreas: DISTRICTS.map((d) => ({
      name: d.name,
      side: d.side,
      url: `${BASE_URL}/bolgeler/${d.slug}`,
    })),
    updatedAt: '2026-01-01',
  };

  return Response.json(payload, {
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
  });
}
