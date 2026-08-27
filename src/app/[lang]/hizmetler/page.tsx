import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, serviceSchema, webPageSchema } from '@/lib/schemas';
import HizmetlerClient from './HizmetlerClient';

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

  const title = t.services_meta_title || 'Tesis Yönetimi ve Profesyonel Bina Yönetim Hizmetleri | Alo Yönetim';
  const description = t.services_meta_desc || 'İstanbul genelinde 5188 özel güvenlik, temizlik, teknik bakım, aidat icra takibi ve peyzaj dahil kurumsal tesis yönetim çözümleri.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler',
    lang,
    ogImageType: 'service',
    keywords: [
      'tesis yönetimi hizmetleri',
      'site yönetimi firmaları',
      'apartman yönetimi',
      'bina işletme hizmetleri',
      'özel güvenlik yönetimi',
      'teknik bakım onarım',
      'site temizliği',
      'aidat tahsilatı',
      'kmk işletme projesi'
    ],
  });
}

export default async function HizmetlerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetlerimiz', url: '/hizmetler' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Entegre Tesis Yönetimi',
    path: '/hizmetler',
    description: t.services_desc || 'İstanbul genelinde profesyonel tesis, site, plaza ve toplu konut yönetim hizmetleri.',
    offerCatalogName: 'Alo Yönetim Tesis Yönetim Hizmetleri Kataloğu',
  });

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: t.services_title || 'Hizmetlerimiz',
    description: t.services_desc || 'Tüm profesyonel tesis ve site yönetim hizmetlerimiz.',
    path: '/hizmetler',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, serviceLd]} />
      <HizmetlerClient />
    </>
  );
}
