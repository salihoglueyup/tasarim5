import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, professionalServiceSchema, webPageSchema, ORG_NAME, ORG_PHONE } from '@/lib/schemas';
import ContactAiOverviewCardSeo from '@/components/seo/ai-overviews/ContactAiOverviewCardSeo';
import VoiceConversationalAiSnippetSeo from '@/components/seo/ai-overviews/VoiceConversationalAiSnippetSeo';
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

  let title = 'İletişim & Tesis Destek Hattı | Alo Yönetim';
  let description = 'Alo Yönetim genel merkez, acil teknik servis hattı ve 39 ilçe saha ekipleriyle hemen iletişime geçin. Ücretsiz keşif ve danışmanlık: 0216 550 48 48.';

  if (lang === 'en') {
    title = 'Contact Us & Facility Support Line | Alo Management';
    description = 'Contact Alo Management headquarters, emergency response line and mobile field technicians across 39 districts of Istanbul: +90 216 550 48 48.';
  } else if (lang === 'ru') {
    title = 'Контакты и Поддержка Объектов | Alo Yonetim';
    description = 'Свяжитесь с центральным офисом Alo Yonetim, аварийной службой и мобильными бригадами в Стамбуле: +90 216 550 48 48.';
  } else if (lang === 'ar') {
    title = 'اتصل بنا وخط الدعم الفني للمرافق | Alo Management';
    description = 'تواصل مع المقر الرئيسي لشركة Alo Management وخط الاستجابة للطوارئ وفرق العمل الميدانية في إسطنبول: 48 48 550 0216.';
  }

  const base = buildMetadata({
    title,
    description,
    path: '/iletisim',
    lang,
    targetKeyword: lang === 'en' ? 'alo management contact' : lang === 'ru' ? 'контакты alo yonetim' : 'alo yönetim iletişim',
    ogImageType: 'default',
    keywords: [
      'alo yönetim iletişim',
      'alo iletişim',
      'alo resmi sitesi',
      'alo istanbul',
      'site yönetimi telefon numarası',
      'tesis yönetimi genel merkez',
      'kadıköy site yönetimi',
      'alo yönetim adres'
    ],
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      emails: ['info@aloyonetim.com.tr'],
      phoneNumbers: ['+90 216 550 48 48'],
      countryName: 'Turkey',
    },
  };
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
    speakableSelectors: ['h1', 'p', '#contact-instant-answer-text', '#voice-conversational-answer-text'],
  });

  const serviceLd = professionalServiceSchema({
    description: t.contact_desc || 'Profesyonel Tesis ve Site Yönetimi Müşteri Hizmetleri.',
  });

  return (
    <>
      <JsonLd data={[contactPageLd, breadcrumbLd, serviceLd]} />
      <IletisimClient />
      {lang === 'tr' && (
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16 flex flex-col gap-10">
          <VoiceConversationalAiSnippetSeo lang={lang} />
          <ContactAiOverviewCardSeo />
        </div>
      )}
    </>
  );
}
