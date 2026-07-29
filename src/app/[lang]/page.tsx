import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero, LogoTicker, SeoTextSection, JsonLd } from '@/components';
import { buildMetadata } from '@/lib/seo';
import { professionalServiceSchema, videoObjectSchema, webPageSchema } from '@/lib/schemas';

// Heavy components loaded dynamically for performance (Code Splitting - Faz 47)
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const base = buildMetadata({
    title: 'Alo Yönetim',
    description:
      'İstanbul Kadıköy merkezli profesyonel mülk, site, apartman, plaza ve tesis yönetimi. Şeffaf aidat takibi, 7/24 güvenlik, temizlik ve teknik bakımla gayrimenkullerinizi güvenle yönetiyoruz. Ücretsiz keşif için hemen ulaşın.',
    path: '/',
    lang,
    keywords: ['mülk yönetimi', 'tesis yönetimi', 'bina yönetimi', 'site yönetimi', 'profesyonel yönetim', 'aidat takip programı'],
  });
  // Ana sayfada başlık template'ini (%s | Alo Yönetim) baypas et; marka tekrarını önle.
  return {
    ...base,
    title: { absolute: 'Alo Yönetim | Profesyonel Mülk, Site ve Tesis Yönetimi' },
  };
}

import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Veritabanından Faq'ları çek (Eğer yoksa [] döner, child component fallback kullanır)
  const dbFaqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
    select: { question: true, answer: true }
  });

  // Veritabanından İş Ortaklarını (Partners) çek
  const dbPartners = await prisma.partner.findMany({
    orderBy: { order: 'asc' },
    select: { name: true, logo: true }
  });

  // Veritabanından Müşteri Yorumlarını (References) çek
  const dbReferences = await prisma.reference.findMany({
    where: {
      testimonialText: { not: null } // Sadece yorumu olanları al
    },
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

  // Ana sayfa varlık grafiği: WebPage → ProfessionalService (rating) → VideoObject
  // (SEO V4 Faz 43/46/54/57). NAP/geo/saatler merkezi schema fabrikasından gelir.
  const businessLd = professionalServiceSchema({
    description:
      'Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri. Kadıköy merkezli, İstanbul genelinde premium tesis yönetimi sunuyoruz.',
    aggregateRating: { ratingValue: '4.9', reviewCount: '340' },
  });

  const videoLd = videoObjectSchema({
    name: 'Alo Yönetim Tanıtım Filmi',
    description: 'Profesyonel mülk ve tesis yönetimi hizmetlerimizi tanıtan kurumsal filmimiz.',
    thumbnailUrl: '/images/hero-poster.webp',
    contentUrl: '/video/brand-film.mp4',
    uploadDate: '2026-01-15T08:00:00+03:00',
    duration: 'PT1M30S',
  });

  const pageLd = webPageSchema({
    name: 'Alo Yönetim | Kurumsal Tesis ve Bina Yönetim Çözümleri',
    description:
      'İstanbul Kadıköy merkezli profesyonel apartman, site, plaza ve tesis yönetimi.',
    path: '/',
    speakableSelectors: ['h1', '.seo-intro'],
  });

  return (
    <>
      <JsonLd data={[pageLd, businessLd, videoLd]} />
      <Hero />
      <SeoTextSection />
      <LogoTicker dbPartners={dbPartners} />
      <BentoServices />
      <WhyUsBentoGrid />
      <PersonnelDifference />
      <ComparisonTable />
      <InteractiveProcessSteps />
      <AppShowcase />
      <TestimonialSlider dbReferences={dbReferences} />
      <CertificateBadgeGrid />
      <Faq dbFaqs={dbFaqs} />
      <PreFooterCta />
    </>
  );
}
