import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, courseSchema, webPageSchema } from '@/lib/schemas';
import GuvenlikAkademisiClient from './GuvenlikAkademisiClient';

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

  const title = t.aca_meta_title || 'Güvenlik Akademisi — 5188 Lisanslı Özel Güvenlik Eğitimi | Alo Yönetim';
  const description = t.aca_meta_desc || '5188 sayılı kanun kapsamında silahlı/silahsız özel güvenlik temel eğitimi, yenileme programları, CCTV kamera takibi ve tesis emniyeti sertifikasyonu.';

  return buildMetadata({
    title,
    description,
    path: '/guvenlik-akademisi',
    lang,
    ogImageType: 'service',
    keywords: [
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

  const courses = [
    { title: t.aca_feat_1_title || '5188 Sayılı Kanun ve Hukuki Sorumluluklar', desc: t.aca_feat_1_desc || 'Özel güvenlik mevzuatı ve yetkiler.' },
    { title: t.aca_feat_2_title || 'Yangın, Afet ve Tahliye Yönetimi', desc: t.aca_feat_2_desc || 'Acil durum planları ve kriz yönetimi.' },
    { title: t.aca_feat_3_title || 'Stres Yönetimi ve İletişim Teknikleri', desc: t.aca_feat_3_desc || 'Sakin ilişkileri ve çatışma çözümü.' },
    { title: t.aca_feat_4_title || 'Protokol ve Nezaket Kuralları', desc: t.aca_feat_4_desc || 'Rezidans ve plaza karşılama standartları.' }
  ];

  const courseLds = courses.map((f) =>
    courseSchema({
      name: f.title,
      description: f.desc,
      path: '/guvenlik-akademisi',
    }),
  );

  const pageLd = webPageSchema({
    name: t.aca_page_title || 'Güvenlik Akademisi',
    description: t.aca_page_desc || '5188 sayılı kanun kapsamında lisanslı özel güvenlik eğitim programları.',
    path: '/guvenlik-akademisi',
    speakableSelectors: ['h1', 'p'],
  });

  const aloGuvenlikLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Alo Güvenlik Kursu',
    url: 'https://www.guvenlikkursu.com/',
  };

  const ucgGuvenlikLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: '3G Güvenlik Merkezi',
    url: 'https://3gguvenlik.com/',
  };

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, ...courseLds, aloGuvenlikLd, ucgGuvenlikLd]} />
      <GuvenlikAkademisiClient />
    </>
  );
}
