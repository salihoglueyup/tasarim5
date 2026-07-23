import dynamic from 'next/dynamic';
import {
  Hero,
  LogoTicker,
  BentoServices,
  WhyUsBentoGrid,
  ComparisonTable,
  InteractiveProcessSteps,
  AppShowcase,
  PreFooterCta
} from '@/components';

// Heavy components loaded dynamically (Faz 3)
const TestimonialSlider = dynamic(() => import('@/components').then(mod => mod.TestimonialSlider), { ssr: true });
const CertificateBadgeGrid = dynamic(() => import('@/components').then(mod => mod.CertificateBadgeGrid), { ssr: true });
const Faq = dynamic(() => import('@/components').then(mod => mod.Faq), { ssr: true });

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
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
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
