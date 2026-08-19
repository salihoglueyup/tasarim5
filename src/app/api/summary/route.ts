import { BASE_URL, SITE_NAME } from '@/lib/seo';
import { ORG_PHONE, ORG_EMAIL, ORG_SAME_AS, ORG_ADDRESS, ORG_GEO, ORG_LEGAL_NAME } from '@/lib/schemas';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';

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
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    sameAs: ORG_SAME_AS,
    certifications: [
      { code: 'ISO 9001:2015', name: 'Kalite Yönetim Sistemi' },
      { code: 'ISO 14001:2015', name: 'Çevre Yönetim Sistemi' },
      { code: 'ISO 45001:2018', name: 'İş Sağlığı ve Güvenliği' },
      { code: 'ISO 27001:2022', name: 'Bilgi Güvenliği Yönetimi' },
      { code: 'ISO 10002:2018', name: 'Müşteri Memnuniyeti Yönetimi' },
      { code: 'TSE HYB 12850', name: 'TSE Hizmet Yeterlilik Belgesi' },
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
    },
  });
}
