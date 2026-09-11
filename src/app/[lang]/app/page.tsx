import ApsiyonMobileHub from '@/components/sections/ApsiyonMobileHub';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

export default function AppPage() {
  const breadcrumbs = [
    { name: 'Anasayfa', url: '/' },
    { name: 'Alo Yönetim & Apsiyon Mobil Portalı', url: '/app' },
  ];

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const pageLd = webPageSchema({
    name: 'Alo Yönetim Sakin & Yönetici Mobil Portalı — Apsiyon Güvencesiyle',
    description: 'Site ve tesis yönetiminin tamamı cebinizde — Apsiyon entegre canlı interaktif portal, online aidat ödeme ve talep takibi.',
    path: '/app',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      
      {/* Apsiyon Resmi Marka Kimliğiyle Güçlendirilmiş Bütünleşik Mobil Vitrini */}
      <ApsiyonMobileHub />
    </>
  );
}
