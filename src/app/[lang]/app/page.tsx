import AppComingSoon from '@/components/sections/AppComingSoon';
import JsonLd from '@/components/seo/JsonLd';
import MobileAppLiveSimulatorSeo from '@/components/seo/MobileAppLiveSimulatorSeo';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

export default function AppPage() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Mobil Uygulama', url: '/app' },
  ]);

  const pageLd = webPageSchema({
    name: 'Alo Yönetim Mobil Uygulaması',
    description: 'Site yönetiminin tamamı cebinizde — canlı interaktif demo.',
    path: '/app',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] py-8">
        <MobileAppLiveSimulatorSeo />
      </div>
      <AppComingSoon />
    </>
  );
}
