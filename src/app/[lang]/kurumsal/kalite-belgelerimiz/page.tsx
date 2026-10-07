import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { generateBreadcrumbs, webPageSchema, organizationSchema, digitalDocumentSchema } from '@/lib/schemas';
import JsonLd from '@/components/seo/schema/JsonLd';
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


  return buildMetadata({
    title: t.crt_meta_title,
    description: t.crt_meta_desc,
    path: '/kurumsal/kalite-belgelerimiz',
    lang,
    ogImageType: 'default',
    keywords: t.crt_meta_keywords.split('|'),
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
    { name: t.nav_home, url: '/' },
    { name: t.nav_corporate, url: '/kurumsal' },
    { name: t.nav_certificates, url: '/kurumsal/kalite-belgelerimiz' }
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.certificates_title,
    description: t.certificates_desc,
    path: '/kurumsal/kalite-belgelerimiz',
    speakableSelectors: ['h1', 'p', '#accreditation-instant-answer-text'],
  });

  const orgLd = organizationSchema();

  const certSchemas = CERTIFICATES.map((c) =>
    digitalDocumentSchema({
      name: `${c.name} — No: ${c.certificateNumber}`,
      description: `${t[`crt_desc_${c.slug}` as keyof typeof t] as string} ${c.issuer} (${c.accreditation}).`,
      url: c.pdf,
      datePublished: c.datePublished,
      issuerName: c.issuer,
      issuerUrl: c.issuerUrl,
      about: c.about,
    })
  );

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, orgLd, ...certSchemas]} />
      <CertificatesClient lang={lang} />
    </>
  );
}

