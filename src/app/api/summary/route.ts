import { BASE_URL, SITE_NAME } from '@/lib/seo';
import { ORG_PHONE, ORG_EMAIL, ORG_SAME_AS, ORG_ADDRESS, ORG_GEO, ORG_LEGAL_NAME } from '@/lib/schemas';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import { HELD_CERTIFICATIONS } from '@/data/certificates';

/**
 * Makine-okur JSON özet uç noktası (SEO Master Plan V4 — Faz 143 & Extended GEO).
 * AI ajanları, entegrasyonlar ve LLM crawler'lar için markanın doğrulanmış yapılandırılmış veri seti.
 */
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const payload = {
    name: SITE_NAME,
    legalName: ORG_LEGAL_NAME,
    description:
      'İstanbul Kadıköy merkezli, ISO sertifikalı (9001, 14001, 45001, 27001, 10002) profesyonel mülk ve tesis yönetimi şirketi. Güvenlik, temizlik, teknik bakım, peyzaj, havuz, ilaçlama ve aidat/hukuk icra yönetimi.',
    url: BASE_URL,
    foundingDate: '2009',
    telephone: '+90 216 550 48 48',
    email: ORG_EMAIL,
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    sameAs: ORG_SAME_AS,
    certifications: [
      ...HELD_CERTIFICATIONS.map((c) => ({ code: c.standard, name: c.title, issuer: c.certBody })),
      { code: '5188 Belgesi', name: 'T.C. İçişleri Bakanlığı 5188 Özel Güvenlik Faaliyet İzin Belgesi' },
      { code: 'Valilik Ruhsatı', name: 'T.C. İstanbul Valiliği Özel Güvenlik Ruhsatı' },
    ],
    legalCompliance: [
      '634 sayılı Kat Mülkiyeti Kanunu (KMK)',
      '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
      '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)',
    ],
    services: SERVICES.map((s) => ({
      name: s.name,
      slug: s.slug,
      summary: s.summary,
      benefits: s.benefits,
      url: `${BASE_URL}${s.pillar}`,
    })),
    serviceAreas: DISTRICTS.map((d) => ({
      name: d.name,
      side: d.side,
      managedProjects: d.managedProjects,
      url: `${BASE_URL}/bolgeler/${d.slug}`,
    })),
    updatedAt: new Date().toISOString().split('T')[0],
  };

  return Response.json(payload, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
