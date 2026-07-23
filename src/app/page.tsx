import {
  Hero,
  LogoTicker,
  BentoServices,
  WhyUsBentoGrid,
  ComparisonTable,
  InteractiveProcessSteps,
  AppShowcase,
  TestimonialSlider,
  CertificateBadgeGrid,
  Faq,
  PreFooterCta
} from '@/components';

export default function Home() {
  return (
    <>
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
