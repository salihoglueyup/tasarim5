import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, organizationSchema } from '@/lib/schemas';
import HakkimizdaClient from './HakkimizdaClient';

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

  const title = t.about_meta_title || 'Hakkımızda — Kurumsal Tesis ve Bina Yönetim Vizyonumuz | Alo Yönetim';
  const description = t.about_meta_desc || '15+ yıllık tecrübe, 45.000+ bağımsız bölüm ve 1.200+ uzman saha kadrosuyla İstanbul genelinde şeffaf ve kurumsal tesis yönetimi öncüsü.';

  return buildMetadata({
    title,
    description,
    path: '/hakkimizda',
    lang,
    ogImageType: 'default',
    keywords: [
      'alo yönetim hakkında',
      'kurumsal tesis yönetimi',
      'site yönetim şirketi istanbul',
      'bina yönetim vizyonu',
      'iso 41001 tesis standartları',
      '5188 özel güvenlik kurumsal'
    ],
  });
}

export default async function HakkimizdaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_corporate || 'Kurumsal', url: '/kurumsal' },
    { name: t.nav_about || 'Hakkımızda', url: '/hakkimizda' }
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.about_title || 'Hakkımızda',
    description: t.about_desc || 'Alo Yönetim kurumsal kimliği, yönetim ekibi ve tesis işletim vizyonu.',
    path: '/hakkimizda',
    speakableSelectors: ['h1', 'p'],
  });

  const orgLd = organizationSchema();

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, orgLd]} />
      <HakkimizdaClient />
    </>
  );
}
