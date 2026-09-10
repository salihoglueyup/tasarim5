import AppComingSoon from '@/components/sections/AppComingSoon';
import JsonLd from '@/components/seo/JsonLd';
import MobileAppLiveSimulatorSeo from '@/components/seo/MobileAppLiveSimulatorSeo';
import PageHeader from '@/components/layout/PageHeader';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

export default function AppPage() {
  const breadcrumbs = [
    { name: 'Anasayfa', url: '/' },
    { name: 'Mobil Uygulama', url: '/app' },
  ];

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const pageLd = webPageSchema({
    name: 'Alo Yönetim Mobil Uygulaması',
    description: 'Site yönetiminin tamamı cebinizde — canlı interaktif demo.',
    path: '/app',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <PageHeader 
        title="Alo Yönetim Mobil Uygulaması"
        description="Site yönetiminin tamamı cebinizde — Akıllı bina yönetimi, anlık bildirimler ve online aidat takibi."
        breadcrumbs={breadcrumbs}
      />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] py-12">
        <MobileAppLiveSimulatorSeo />
      </div>
      <AppComingSoon />
    </>
  );
}
