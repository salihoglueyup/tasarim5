import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { generateBreadcrumbs, webPageSchema, digitalDocumentSchema } from '@/lib/schemas';
import JsonLd from '@/components/seo/JsonLd';
import { CERTIFICATES } from '@/data/certificates';
import CertificatesClient from './CertificatesClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const title = 'Kalite Belgelerimiz ve ISO Akreditasyonları | Alo Yönetim';
  const description = 'ISO 10002, ISO 14001, ISO 22301, ISO 26000, ISO 31000, ISO 45001 ve Doğaya Saygı sertifikalarımız. BELCERT ve ILAS akreditasyonlu kurumsal kalite belgelerimizi inceleyin.';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/kalite-belgelerimiz',
    lang,
    ogImageType: 'default',
    keywords: [
      'kalite belgelerimiz',
      'iso sertifikaları site yönetimi',
      'belcert akredite belgeler',
      'ilas akredite iso belgeleri',
      'iso 14001 çevre belgesi',
      'iso 45001 isg belgesi',
      'doğaya saygı sertifikası'
    ],
  });
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_corporate || 'Kurumsal', url: '/kurumsal' },
    { name: t.nav_certificates || 'Kalite Belgelerimiz', url: '/kurumsal/kalite-belgelerimiz' }
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.certificates_title || 'Kalite Belgelerimiz & ISO Akreditasyonlarımız',
    description: t.certificates_desc || 'Alo Yönetim kurumsal kalite, BELCERT ve ILAS uluslararası akreditasyon sertifikaları.',
    path: '/kurumsal/kalite-belgelerimiz',
    speakableSelectors: ['h1', 'p'],
  });

  const certSchemas = CERTIFICATES.map((c) =>
    digitalDocumentSchema({
      name: `${c.name} — No: ${c.certificateNumber}`,
      description: `${c.description} Belgelendiren: ${c.issuer} (${c.accreditation}).`,
      url: c.pdf,
      datePublished: c.datePublished,
      issuerName: c.issuer,
      issuerUrl: c.issuerUrl,
      about: c.about,
    })
  );

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, ...certSchemas]} />
      <CertificatesClient />
    </>
  );
}
