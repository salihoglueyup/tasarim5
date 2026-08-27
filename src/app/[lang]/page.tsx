import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import JsonLd from '@/components/seo/JsonLd';
import { Hero, SeoTextSection } from '@/components';
import GoogleReviewsWidget from '@/components/sections/GoogleReviewsWidget';
import { buildMetadata } from '@/lib/seo';
import { professionalServiceSchema, videoObjectSchema, webPageSchema } from '@/lib/schemas';
import { getDictionary } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';

import { generateFacilityManagementGraph } from '@/lib/seo/facilityTopicGraph';

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
const IstanbulDuesHeatmapSeo = dynamic(() => import('@/components/seo/IstanbulDuesHeatmapSeo'), { ssr: true });
const KMKLawAssistantSeo = dynamic(() => import('@/components/seo/KMKLawAssistantSeo'), { ssr: true });
const ServiceAuthorityHubSeo = dynamic(() => import('@/components/seo/ServiceAuthorityHubSeo'), { ssr: true });


type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  
  const base = buildMetadata({
    title: t.home_meta_title_base || 'Alo Yönetim — Profesyonel Tesis Yönetimi',
    description: t.home_meta_desc || 'İstanbul genelinde 39 ilçede ISO 41001 standartlarında profesyonel tesis yönetimi, 5188 lisanslı özel güvenlik, teknik bakım ve şeffaf aidat muhasebesi. %30 maliyet tasarrufu ve 7/24 hizmet.',
    path: '/',
    lang,
    targetKeyword: 'tesis yönetimi',
    keywords: [
      'tesis yönetimi',
      'profesyonel tesis yönetimi',
      'istanbul tesis yönetimi',
      'entegre tesis yönetimi',
      'tesis yönetim şirketleri',
      'bina yönetimi',
      'site yönetimi',
      'iso 41001',
      '5188 özel güvenlik'
    ],
  });
  
  return {
    ...base,
    title: { absolute: t.home_meta_title_absolute || 'Alo Yönetim | İstanbul Profesyonel Tesis ve Site Yönetimi' },
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
  }).catch(() => []);

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
  }).catch(() => []);

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

  const facilityGraphLd = generateFacilityManagementGraph(lang);

  return (
    <>
      <JsonLd data={[pageLd, businessLd, videoLd, facilityGraphLd]} />
      <Hero />
      <SeoTextSection />
      <BentoServices />
      <IstanbulDuesHeatmapSeo />
      <WhyUsBentoGrid />
      <PersonnelDifference />
      <ComparisonTable />
      <KMKLawAssistantSeo />
      <InteractiveProcessSteps />
      <AppShowcase />
      <TestimonialSlider dbReferences={dbReferences} />
      <CertificateBadgeGrid />
      <Faq dbFaqs={dbFaqs} lang={lang} />
      
      {/* E-E-A-T Master Mevzuat & İç/Dış Bağlantı Otorite Hub'ı */}
      <section className="py-12 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <ServiceAuthorityHubSeo
          serviceName="Alo Yönetim Entegre Tesis ve Mülk Yönetim Ekosistemi"
          serviceCategory="Entegre Tesis Yönetimi"
          lawReferences={[
            {
              title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK) — Resmi Metin",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
              badge: "KMK 634",
              description: "Türkiye genelinde tüm bağımsız bölümler, apartmanlar, toplu konut siteleri ve plazalarda ortak alan mülkiyeti, yönetim planı ve işletme bütçesi ana kanunudur."
            },
            {
              title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun",
              sourceName: "T.C. İçişleri Bakanlığı EGM",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
              badge: "5188 Sayılı Kanun",
              description: "Konut ve ticari tesislerde görev yapan özel güvenlik personelinin eğitim standartları, valilik özel güvenlik izinleri (ÖGİ) ve denetim esasları."
            },
            {
              title: "ISO 41001:2018 Uluslararası Tesis Yönetim Sistemi Standardı",
              sourceName: "Türk Standardları Enstitüsü (TSE)",
              url: "https://www.tse.org.tr",
              badge: "ISO 41001 & TSE HYB",
              description: "Gayrimenkullerin ve yaşam alanlarının verimli, güvenli, sürdürülebilir ve maliyet tasarruflu işletilmesini belgeleyen dünya standardı."
            }
          ]}
          glossaryTerms={[
            {
              slug: "kat-mulkiyeti-kanunu-kmk",
              term: "Kat Mülkiyeti Kanunu (KMK)",
              summary: "Toplu yaşam alanlarında malik ve kiracıların haklarını, ortak alan kullanımını düzenleyen ana kanundur."
            },
            {
              slug: "aidat",
              term: "Site & Apartman Aidat Yönetimi",
              summary: "Ortak giderlerin şeffaf ve adil biçimde arsa payına göre paylaştırılması ve dijital muhasebe takibidir."
            },
            {
              slug: "5188-sayili-kanun",
              term: "5188 Lisanslı Özel Güvenlik",
              summary: "Nizamiye devriye, CCTV kamera analitiği ve plaka tanıma sistemleriyle 7/24 kesintisiz tesis emniyetidir."
            },
            {
              slug: "isletme-projesi",
              term: "Yıllık Site İşletme Projesi & Bütçe",
              summary: "Sitenin 1 yıllık tahmini gider bütçesi ve her bağımsız bölümün aylık ödeme planını içeren resmi projedir."
            }
          ]}
        />
      </section>

      <PreFooterCta />
    </>
  );
}
