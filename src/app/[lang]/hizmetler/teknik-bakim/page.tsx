import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { 
  generateBreadcrumbs, 
  webPageSchema, 
  serviceSchema, 
  faqPageSchema 
} from '@/lib/schemas';
import TeknikBakimClient from './TeknikBakimClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const title = 'Bina & Site Teknik Bakım Hizmetleri — Asansör, Jeneratör & HVAC | Alo Yönetim';
  const description = 'Asansör yeşil etiket muayenesi, jeneratör, hidrofor ve kompanzasyon panosu bakımı. 7/24 kesintisiz mobil teknik servis ve %0 reaktif ceza güvencesi.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/teknik-bakim',
    lang,
    targetKeyword: 'bina teknik bakım',
    ogImageType: 'service',
    keywords: [
      'teknik bakım',
      'bina teknik bakım',
      'asansör bakımı',
      'asansör arıza servisi',
      'jeneratör periyodik bakım',
      'bina hidrofor bakımı',
      'kompanzasyon panosu reaktif ceza',
      'yangın tesisatı bakımı',
      'site teknik işletme',
      'tesis teknik servis'
    ],
  });
}

export default async function TeknikBakimPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.tech_title || 'Teknik Bakım', url: '/hizmetler/teknik-bakim' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Teknik Bakım ve Onarım',
    path: '/hizmetler/teknik-bakim',
    description: 'Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Bak%C4%B1m_(teknik)',
  });

  const faqs = [
    {
      question: 'Asansörlerin aylık bakımı ve yıllık muayenesi nasıl takip edilir?',
      answer: 'Asansör İşletme ve Bakım Yönetmeliği gereğince aylık periyodik bakımlar yetkili servisimizce yapılır ve tescil defterine işlenir. Yıllık A tipi muayene kuruluşu denetiminde yeşil etiket alınması süreci teknik ekibimizce koordine edilir.'
    },
    {
      question: 'Jeneratör ve hidrofor arızalarında acil müdahale süresi nedir?',
      answer: '7/24 kesintisiz nöbetçi teknik servisimiz acil durumlarda ortalama 30-45 dakika içinde siteye intikal eder; jeneratör devreye alma ve bypass sistemleri anında işletilir.'
    },
    {
      question: 'Kazan dairesi, ısıtma ve ortak havalandırma bakımları neleri kapsar?',
      answer: 'Kazan baca gazı emisyon ölçümleri, brülör ayarları, genleşme tankı azot basınç testleri ve sirkülasyon pompalarının mekanik salmastra kontrolleri uzman teknisyenlerimizce periyodik olarak yapılır.'
    },
    {
      question: 'Teknik bakım sözleşmesinde malzeme ve işçilik garantisi var mı?',
      answer: 'Evet. Yapılan tüm işçilik hizmetleri 1 yıl, değişimi yapılan orijinal yedek parçalar ise 2 yıl üretici ve servis garantisi altındadır.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: 'Bina ve Tesis Teknik Bakım, Onarım ve Mobil Servis | Alo Yönetim',
    description: 'Asansör, jeneratör ve hidrofor sistemleri için 7/24 mobil teknik servis.',
    path: '/hizmetler/teknik-bakim',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <TeknikBakimClient />
    </>
  );
}
