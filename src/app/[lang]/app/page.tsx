import AppComingSoon from '@/components/sections/AppComingSoon';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

export default function AppPage() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Mobil Uygulama', url: '/app' },
  ]);

  const pageLd = webPageSchema({
    name: 'Alo Yönetim Mobil Uygulaması',
    description: 'Site yönetiminin tamamı cebinizde — yakında.',
    path: '/app',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <AppComingSoon />
    </>
  );
}
