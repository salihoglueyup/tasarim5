import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import GuvenlikAkademisiClient from './GuvenlikAkademisiClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return [{ lang: 'tr' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const title = t.aca_meta_title || 'Güvenlik Akademisi — 5188 Güvenlik Eğitimi | Alo Yönetim';
  const description = t.aca_meta_desc || '5188 sayılı Kanun kapsamında özel güvenlik görevlisi eğitimi, kimlik kartı ve yenileme süreçleri hakkında bilgilendirme.';

  return buildMetadata({
    title,
    description,
    path: '/guvenlik-akademisi',
    lang,
    ogImageType: 'service',
    canonicalUrl: 'https://www.guvenlikkursu.com/',
    targetKeyword: 'alo güvenlik kursu',
    keywords: [
      'alo güvenlik',
      'alo güvenlik kursu',
      'özel güvenlik kursu',
      '5188 güvenlik eğitimi',
      'özel güvenlik kimlik kartı',
      'güvenlik akademisi istanbul',
      'silahlı güvenlik sertifikası',
      'cctv eğitimi'
    ],
  });
}

export default async function GuvenlikAkademisiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.aca_page_title || 'Güvenlik Akademisi', url: '/guvenlik-akademisi' }
  ]);

  const pageLd = webPageSchema({
    name: t.aca_page_title || 'Güvenlik Akademisi',
    description: t.aca_page_desc || '5188 sayılı kanun kapsamında lisanslı özel güvenlik eğitim programları.',
    path: '/guvenlik-akademisi',
    speakableSelectors: ['h1', 'p', '#academy-instant-answer-text'],
  });

  const aloGuvenlikLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Alo Güvenlik Kursu',
    url: 'https://www.guvenlikkursu.com/',
    sameAs: [
      'https://www.guvenlikkursu.com/',
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'Alo Yönetim Grubu',
      url: 'https://aloyonetim.com.tr',
    },
  };

  const ucgGuvenlikLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: '3G Güvenlik Merkezi',
    url: 'https://3gguvenlik.com/',
  };

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, aloGuvenlikLd, ucgGuvenlikLd]} />
      <GuvenlikAkademisiClient lang={lang} />
    </>
  );
}
