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

  let title = 'Hakkımızda — 15+ Yıl Kurumsal Tesis Yönetimi | Alo Yönetim';
  let description = 'Alo Yönetim ve Organizasyon A.Ş. hakkında: 15+ yıl tecrübe, 340+ seçkin proje, ISO 41001 & 5188 lisanslı güvenlik ile İstanbul\'un lider tesis yönetim şirketi.';

  if (lang === 'en') {
    title = 'About Us — 15+ Years Corporate Facility Management | Alo Management';
    description = 'About Alo Management: 15+ years experience, 340+ premier projects, ISO 41001 & Law 5188 licensed security leader in Istanbul.';
  } else if (lang === 'ru') {
    title = 'О нас — 15+ лет корпоративного управления объектами | Alo Yonetim';
    description = 'Об Alo Yonetim: 15+ лет опыта, 340+ объектов, ISO 41001 и лицензированная охрана 5188 — лидер управления недвижимостью в Стамбуле.';
  } else if (lang === 'ar') {
    title = 'من نحن — 15+ عاماً من الريادة في إدارة المرافق | Alo Management';
    description = 'عن شركة Alo Management: خبرة 15+ عاماً، 340+ مشروعاً، معايير ISO 41001 وترخيص أمني 5188 في إسطنبول.';
  }

  return buildMetadata({
    title,
    description,
    path: '/hakkimizda',
    lang,
    targetKeyword: lang === 'en' ? 'about alo management' : lang === 'ru' ? 'об alo yonetim' : 'alo yönetim hakkında',
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
