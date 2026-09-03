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

  const title = 'Hakkımızda — 15+ Yıl Kurumsal Tesis Yönetimi | Alo Yönetim';
  const description = 'Alo Yönetim ve Organizasyon A.Ş. hakkında: 15+ yıl tecrübe, 120+ proje, ISO 41001 & 5188 lisanslı güvenlik ile İstanbul\'un lider tesis yönetim şirketi.';

  return buildMetadata({
    title,
    description,
    path: '/hakkimizda',
    lang,
    targetKeyword: 'alo yönetim hakkında',
    ogImageType: 'default',
    keywords: [
      'alo yönetim hakkında',
      'alo yönetim ve organizasyon',
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
    { name: t.nav_home || 'Anasayfa', url: lang === 'tr' ? '/' : `/${lang}` },
    { name: t.about_title || t.nav_about || 'Hakkımızda', url: lang === 'tr' ? '/hakkimizda' : `/${lang}/hakkimizda` }
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
