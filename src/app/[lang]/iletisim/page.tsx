import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, professionalServiceSchema, webPageSchema, ORG_NAME, ORG_PHONE } from '@/lib/schemas';
import IletisimClient from './IletisimClient';

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

  let title = 'İletişim & 7/24 Tesis Destek Hattı | Alo Yönetim';
  let description = 'Alo Yönetim genel merkez, 7/24 acil teknik servis hattı ve 39 ilçe saha ekipleriyle hemen iletişime geçin. Ücretsiz keşif ve danışmanlık: 0216 550 48 48.';

  if (lang === 'en') {
    title = 'Contact Us & 24/7 Facility Support Line | Alo Management';
    description = 'Contact Alo Management headquarters, 24/7 emergency response line and mobile field technicians across 39 districts of Istanbul: +90 216 550 48 48.';
  } else if (lang === 'ru') {
    title = 'Контакты и Круглосуточная Поддержка Объектов | Alo Yonetim';
    description = 'Свяжитесь с центральным офисом Alo Yonetim, круглосуточной аварийной службой и мобильными бригадами в Стамбуле: +90 216 550 48 48.';
  } else if (lang === 'ar') {
    title = 'اتصل بنا وخط الدعم الفني للمرافق 24/7 | Alo Management';
    description = 'تواصل مع المقر الرئيسي لشركة Alo Management وخط الاستجابة للطوارئ 24/7 وفرق العمل الميدانية في إسطنبول: 48 48 550 0216.';
  }

  return buildMetadata({
    title,
    description,
    path: '/iletisim',
    lang,
    targetKeyword: lang === 'en' ? 'alo management contact' : lang === 'ru' ? 'контакты alo yonetim' : 'alo yönetim iletişim',
    ogImageType: 'default',
    keywords: [
      'alo yönetim iletişim',
      'site yönetimi telefon numarası',
      'tesis yönetimi genel merkez',
      'kadıköy site yönetimi',
      'alo yönetim adres'
    ],
  });
}

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: lang === 'tr' ? '/' : `/${lang}` },
    { name: t.contact_title || 'İletişim', url: lang === 'tr' ? '/iletisim' : `/${lang}/iletisim` }
  ]);

  const contactPageLd = webPageSchema({
    type: 'ContactPage',
    name: t.contact_title || 'İletişim',
    description: t.contact_desc || 'Alo Yönetim iletişim kanalları, genel merkez adresi ve canlı çağrı merkezi.',
    path: '/iletisim',
    speakableSelectors: ['h1', 'p'],
  });

  const serviceLd = professionalServiceSchema({
    description: t.contact_desc || 'Profesyonel Tesis ve Site Yönetimi Müşteri Hizmetleri.',
  });

  return (
    <>
      <JsonLd data={[contactPageLd, breadcrumbLd, serviceLd]} />
      <IletisimClient />
    </>
  );
}
