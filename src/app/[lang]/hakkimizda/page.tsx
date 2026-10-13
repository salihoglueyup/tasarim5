import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, organizationSchema } from '@/lib/schemas';
import CorporateEntityAiOverviewSeo from '@/components/seo/ai-overviews/CorporateEntityAiOverviewSeo';
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

  let title = 'Hakkımızda — 2009 yılından beri Tesis Yönetimi | Alo Yönetim';
  let description = "Alo Yönetim hakkında: 2009'dan beri İstanbul'da tesis ve site yönetimi, 5188 lisanslı güvenlik ve 39 ilçede hizmet.";

  if (lang === 'en') {
    title = 'About Us — Facility Management since 2009 | Alo Management';
    description = 'About Alo Management: facility and site management in Istanbul since 2009, Law 5188 licensed security and service across 39 districts.';
  } else if (lang === 'ru') {
    title = 'О нас — управление объектами с 2009 года | Alo Yonetim';
    description = 'Об Alo Yonetim: управление объектами и комплексами в Стамбуле с 2009 года, лицензированная охрана 5188, обслуживание в 39 районах.';
  } else if (lang === 'ar') {
    title = 'من نحن — إدارة المرافق منذ عام 2009 | Alo Management';
    description = 'عن شركة Alo Management: إدارة المرافق والمجمعات في إسطنبول منذ عام 2009 وأمن مرخّص وفق القانون 5188 وخدمة في 39 منطقة.';
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
    speakableSelectors: ['h1', 'p', '#corporate-instant-answer-text'],
  });

  const orgLd = organizationSchema();

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, orgLd]} />
      <HakkimizdaClient />
      {lang === 'tr' && (
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
          <CorporateEntityAiOverviewSeo />
        </div>
      )}
    </>
  );
}
