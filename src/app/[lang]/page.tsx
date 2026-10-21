import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import JsonLd from '@/components/seo/schema/JsonLd';
import Hero from '@/components/sections/core/Hero';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { professionalServiceSchema, videoObjectSchema, webPageSchema } from '@/lib/schemas';
import { getDictionary } from '@/lib/i18n';
import { CURATED_FAQS } from '@/data/faqCurated';

import { generateFacilityManagementGraph } from '@/lib/seo/facility/facilityTopicGraph';
import HomeAiOverviewGroundingSeo from '@/components/seo/ai-overviews/HomeAiOverviewGroundingSeo';

// Heavy components loaded dynamically for performance
const BentoServices = dynamic(() => import('@/components/sections/core/BentoServices'), { ssr: true });
const WhyUsBentoGrid = dynamic(() => import('@/components/sections/core/WhyUsBentoGrid'), { ssr: true });
const PersonnelDifference = dynamic(() => import('@/components/sections/core/PersonnelDifference'), { ssr: true });
const ComparisonTable = dynamic(() => import('@/components/sections/core/ComparisonTable'), { ssr: true });
const InteractiveProcessSteps = dynamic(() => import('@/components/sections/core/InteractiveProcessSteps'), { ssr: true });
const PreFooterCta = dynamic(() => import('@/components/sections/core/PreFooterCta'), { ssr: true });
const TestimonialSlider = dynamic(() => import('@/components/sections/testimonials/TestimonialSlider'), { ssr: true });
const CertificateBadgeGrid = dynamic(() => import('@/components/sections/trust/CertificateBadgeGrid'), { ssr: true });
const Faq = dynamic(() => import('@/components/sections/trust/Faq'), { ssr: true });
const KMKLawAssistantSeo = dynamic(() => import('@/components/seo/kmk/KMKLawAssistantSeo'), { ssr: true });


export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const revalidate = 3600;

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  
  const base = buildMetadata({
    title: t.home_meta_title_base || 'Alo Yönetim — İstanbul Profesyonel Site ve Tesis Yönetimi',
    description: t.home_meta_desc || 'İstanbul 39 ilçede profesyonel site ve tesis yönetimi: lisanslı güvenlik, teknik bakım, şeffaf aidat takibi ve hukuki destek.',
    path: '/',
    lang,
    targetKeyword: 'alo yönetim',
    keywords: [
      'alo yönetim',
      'alo yönetim istanbul',
      'profesyonel site yönetimi',
      'istanbul site ve tesis yönetimi',
      'site yönetim şirketleri',
      'apartman yönetimi firmaları',
      'bina yönetimi',
      '5188 özel güvenlik izinli site yönetimi'
    ],
  });
  
  const absoluteTitle = t.home_meta_title_absolute || 'Alo Yönetim | İstanbul Profesyonel Site ve Tesis Yönetim Şirketi';
  return {
    ...base,
    title: { absolute: absoluteTitle },
    // Paylaşım önizlemeleri (og/twitter) sayfa başlığıyla aynı olmalı
    openGraph: { ...base.openGraph, title: absoluteTitle },
    twitter: { ...base.twitter, title: absoluteTitle },
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  // Anasayfa SSS'si özenle yazılmış statik kaynaktan gelir (aidat, işletme projesi, gecikme tazminatı, yönetici seçimi, hukuk, güvenlik, teknik ve hizmetler).
  const HOME_FAQ_IDS = ['faq-01', 'faq-02', 'faq-03', 'faq-05', 'faq-11', 'faq-19', 'faq-24', 'faq-28', 'faq-33', 'faq-45'];
  const dbFaqs: any[] = CURATED_FAQS.filter((f) => HOME_FAQ_IDS.includes(f.id));

  const businessLd = professionalServiceSchema({
    description: t.business_ld_desc || 'Profesyonel mülk ve tesis yönetimi, güvenlik, temizlik ve teknik bakım hizmetleri. Kadıköy merkezli, İstanbul genelinde premium tesis yönetimi sunuyoruz.',
  });

  const videoLd = videoObjectSchema({
    name: t.video_ld_name || 'Alo Yönetim Tanıtım Filmi',
    description: t.video_ld_desc || 'Profesyonel mülk ve tesis yönetimi hizmetlerimizi tanıtan kurumsal filmimiz.',
    thumbnailUrl: '/images/hero-poster-v5.webp',
    contentUrl: '/video/brand-film.mp4',
    uploadDate: '2026-01-15T08:00:00+03:00',
    duration: 'PT1M30S',
  });

  const pageLd = webPageSchema({
    name: t.page_ld_name || 'Alo Yönetim | Kurumsal Tesis ve Bina Yönetim Çözümleri',
    description: t.page_ld_desc || 'İstanbul Kadıköy merkezli profesyonel apartman, site, plaza ve tesis yönetimi.',
    path: '/',
    speakableSelectors: ['#home-hero-h1', '#home-ai-overview-answer', '#speakable-content'],
  });

  const facilityGraphLd = generateFacilityManagementGraph(lang);

  return (
    <>
      <JsonLd data={[pageLd, businessLd, videoLd, facilityGraphLd]} />
      <Hero />
      <div className="lazy-section"><BentoServices /></div>
      <div className="lazy-section"><WhyUsBentoGrid /></div>
      <div className="lazy-section"><PersonnelDifference dict={lang === 'tr' ? undefined : t} lang={lang} /></div>
      <div className="lazy-section"><ComparisonTable dict={lang === 'tr' ? undefined : t} lang={lang} /></div>
      {lang === 'tr' && <div className="lazy-section"><KMKLawAssistantSeo /></div>}
      <div className="lazy-section"><InteractiveProcessSteps /></div>
      <div className="lazy-section"><TestimonialSlider /></div>
      <div className="lazy-section"><CertificateBadgeGrid /></div>
      <div className="lazy-section"><Faq dbFaqs={dbFaqs} lang={lang} /></div>
      <HomeAiOverviewGroundingSeo lang={lang} />

      <PreFooterCta />
    </>
  );
}
