import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero, LogoTicker, SeoTextSection } from '@/components';

// Heavy components loaded dynamically for performance (Code Splitting - Faz 47)
const BentoServices = dynamic(() => import('@/components').then(mod => mod.BentoServices), { ssr: true });
const WhyUsBentoGrid = dynamic(() => import('@/components').then(mod => mod.WhyUsBentoGrid), { ssr: true });
const ComparisonTable = dynamic(() => import('@/components').then(mod => mod.ComparisonTable), { ssr: true });
const InteractiveProcessSteps = dynamic(() => import('@/components').then(mod => mod.InteractiveProcessSteps), { ssr: true });
const AppShowcase = dynamic(() => import('@/components').then(mod => mod.AppShowcase), { ssr: true });
const PreFooterCta = dynamic(() => import('@/components').then(mod => mod.PreFooterCta), { ssr: true });
const TestimonialSlider = dynamic(() => import('@/components').then(mod => mod.TestimonialSlider), { ssr: true });
const CertificateBadgeGrid = dynamic(() => import('@/components').then(mod => mod.CertificateBadgeGrid), { ssr: true });
const Faq = dynamic(() => import('@/components').then(mod => mod.Faq), { ssr: true });

export const metadata: Metadata = {
  title: 'Alo Yönetim | Kurumsal Tesis ve Bina Yönetim Çözümleri',
  description: 'İstanbul Kadıköy merkezli profesyonel apartman, site, plaza ve tesis yönetimi. Aidat takibi, temizlik ve güvenlik hizmetleri.',
  keywords: ['tesis yönetimi', 'bina yönetimi', 'site yönetimi', 'profesyonel yönetim', 'aidat takip programı']
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Alo Yönetim',
    image: 'https://aloyonetim.com/icon.png',
    description: 'Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri. Kadıköy merkezli, İstanbul genelinde premium tesis yönetimi sunuyoruz.',
    '@id': 'https://aloyonetim.com',
    url: 'https://aloyonetim.com',
    telephone: '+902165504848',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Eğitim Mahallesi, Kasap İsmail Sk. No: 15 / 19',
      addressLocality: 'Kadıköy',
      addressRegion: 'İstanbul',
      postalCode: '34722',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.990,
      longitude: 29.030
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '340',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Alo Yönetim Tanıtım Filmi',
    description: 'Profesyonel mülk ve tesis yönetimi hizmetlerimizi tanıtan kurumsal filmimiz.',
    thumbnailUrl: 'https://aloyonetim.com/images/hero-poster.webp',
    uploadDate: '2026-01-15T08:00:00+03:00',
    contentUrl: 'https://aloyonetim.com/video/brand-film.mp4',
    duration: 'PT1M30S',
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, videoJsonLd]) }}
      />
      <Hero />
      <SeoTextSection />
      <LogoTicker />
      <BentoServices />
      <WhyUsBentoGrid />
      <ComparisonTable />
      <InteractiveProcessSteps />
      <AppShowcase />
      <TestimonialSlider />
      <CertificateBadgeGrid />
      <Faq />
      <PreFooterCta />
    </>
  );
}
