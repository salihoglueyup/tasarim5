import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import JsonLd from '@/components/seo/JsonLd';
import { Hero, SeoTextSection } from '@/components';
import GoogleReviewsWidget from '@/components/sections/GoogleReviewsWidget';
import { buildMetadata } from '@/lib/seo';
import { professionalServiceSchema, videoObjectSchema, webPageSchema } from '@/lib/schemas';
import { getDictionary } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';

// Heavy components loaded dynamically for performance
const BentoServices = dynamic(() => import('@/components/sections/BentoServices'), { ssr: true });
const WhyUsBentoGrid = dynamic(() => import('@/components/sections/WhyUsBentoGrid'), { ssr: true });
const PersonnelDifference = dynamic(() => import('@/components/sections/PersonnelDifference'), { ssr: true });
const ComparisonTable = dynamic(() => import('@/components/sections/ComparisonTable'), { ssr: true });
const InteractiveProcessSteps = dynamic(() => import('@/components/sections/InteractiveProcessSteps'), { ssr: true });
const AppShowcase = dynamic(() => import('@/components/sections/AppShowcase'), { ssr: true });
const PreFooterCta = dynamic(() => import('@/components/sections/PreFooterCta'), { ssr: true });
const TestimonialSlider = dynamic(() => import('@/components/sections/TestimonialSlider'), { ssr: true });
const CertificateBadgeGrid = dynamic(() => import('@/components/sections/CertificateBadgeGrid'), { ssr: true });
const Faq = dynamic(() => import('@/components/sections/Faq'), { ssr: true });

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  
  const base = buildMetadata({
    title: t.home_meta_title_base || 'Alo Yönetim',
    description: t.home_meta_desc || 'İstanbul Kadıköy merkezli profesyonel mülk, site, apartman, plaza ve tesis yönetimi. Şeffaf aidat takibi, 7/24 güvenlik, temizlik ve teknik bakımla gayrimenkullerinizi güvenle yönetiyoruz. Ücretsiz keşif için hemen ulaşın.',
    path: '/',
    lang,
    keywords: ['mülk yönetimi', 'tesis yönetimi', 'bina yönetimi', 'site yönetimi', 'profesyonel yönetim', 'aidat takip programı'],
  });
  
  return {
    ...base,
    title: { absolute: t.home_meta_title_absolute || 'Alo Yönetim | Profesyonel Mülk, Site ve Tesis Yönetimi' },
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const dbFaqs = await prisma.faq.findMany({
    take: 5,
    where: {
      NOT: {
        question: {
          contains: 'ilçesinde'
        }
      }
    },
    orderBy: { order: 'asc' },
    select: { 
      question: true, question_en: true, question_ru: true, question_ar: true,
      answer: true, answer_en: true, answer_ru: true, answer_ar: true
    }
  });


  const dbReferences = await prisma.reference.findMany({
    where: { testimonialText: { not: null } },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      testimonialAuthor: true,
      testimonialText: true,
      title: true,
      units: true,
      location: true,
      image: true,
      category: true
    }
  });

  const businessLd = professionalServiceSchema({
    description: t.business_ld_desc || 'Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri. Kadıköy merkezli, İstanbul genelinde premium tesis yönetimi sunuyoruz.',
    aggregateRating: { ratingValue: '4.9', reviewCount: '340' },
  });

  const videoLd = videoObjectSchema({
    name: t.video_ld_name || 'Alo Yönetim Tanıtım Filmi',
    description: t.video_ld_desc || 'Profesyonel mülk ve tesis yönetimi hizmetlerimizi tanıtan kurumsal filmimiz.',
    thumbnailUrl: '/images/hero-poster.webp',
    contentUrl: '/video/brand-film.mp4',
    uploadDate: '2026-01-15T08:00:00+03:00',
    duration: 'PT1M30S',
  });

  const pageLd = webPageSchema({
    name: t.page_ld_name || 'Alo Yönetim | Kurumsal Tesis ve Bina Yönetim Çözümleri',
    description: t.page_ld_desc || 'İstanbul Kadıköy merkezli profesyonel apartman, site, plaza ve tesis yönetimi.',
    path: '/',
    speakableSelectors: ['#speakable-content'],
  });

  return (
    <>
      <JsonLd data={[pageLd, businessLd, videoLd]} />
      <Hero />
      <SeoTextSection />
      <BentoServices />
      <WhyUsBentoGrid />
      <PersonnelDifference />
      <ComparisonTable />
      <InteractiveProcessSteps />
      <AppShowcase />
      <TestimonialSlider dbReferences={dbReferences} />
      <CertificateBadgeGrid />
      <Faq dbFaqs={dbFaqs} lang={lang} />
      <PreFooterCta />
    </>
  );
}
