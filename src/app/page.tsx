import {
  Hero,
  LogoTicker,
  LiveMetricsWidget,
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
      <LiveMetricsWidget />
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
