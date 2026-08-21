import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, serviceSchema, faqPageSchema } from '@/lib/schemas';
import PlazaYonetimiClient from './PlazaYonetimiClient';

export const revalidate = 86400;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Plaza & Ofis Binası Tesis Yönetimi | Alo Yönetim İstanbul',
    description:
      'İstanbul plaza ve ofis binaları için HVAC yönetimi, enerji optimizasyonu, kiracı koordinasyonu ve 7/24 teknik destek. ISO sertifikalı kurumsal tesis yönetimi.',
    path: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'plaza tesis yönetimi',
      'ofis binası yönetimi',
      'ticari bina yönetimi',
      'iş merkezi yönetimi',
      'plaza yönetim şirketi',
      'HVAC yönetimi istanbul',
      'ofis yönetim firması',
      'kurumsal tesis yönetimi',
      'ticari tesis yönetimi istanbul',
      'AVM yönetimi',
    ],
  });
}

export default async function PlazaYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  void lang;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Hizmetler', url: '/hizmetler' },
    { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
    { name: 'Plaza & Ofis Binası Yönetimi', url: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Plaza & Ticari Bina Tesis Yönetimi',
    description:
      'İstanbul plaza ve ticari binalarda HVAC yönetimi, enerji optimizasyonu, kiracı koordinasyonu, 7/24 teknik destek ve kurumsal güvenlik.',
    path: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    priceRange: '₺₺₺',
  });

  const faqLd = faqPageSchema([
    {
      question: 'Plaza tesis yönetiminde en kritik hizmetler nelerdir?',
      answer:
        'HVAC sistemlerinin merkezi bakımı, enerji optimizasyonu, kiracı geçiş ve çıkış protokolleri, asansör/yürüyen merdiven bakımı ve 7/24 teknik destek plazalarda kritik öneme sahiptir.',
    },
    {
      question: 'Ticari binada enerji tasarrufu nasıl sağlanır?',
      answer:
        'Kompanzasyon sistemi ile reaktif güç cezası sıfırlanır; HVAC programlaması ile boş saatlerde enerji tüketimi azaltılır; LED dönüşümü ve akıllı aydınlatma sistemleri uygulanır. Ortalama %15-25 enerji tasarrufu elde edilir.',
    },
    {
      question: 'Kiracı yönetimi nasıl koordine edilir?',
      answer:
        'Her kiracı için bağımsız bölüm teslim-iade protokolü, ortak alan kullanım kuralları ve güvenlik kimlik kartı sistemi uygulanır. Kiracı şikayetleri dijital portal üzerinden takip edilir.',
    },
    {
      question: 'Plaza güvenliği nasıl sağlanır?',
      answer:
        '5188 lisanslı güvenlik personeli, araç plaka tanıma sistemi (PTS), turnike girişleri, CCTV izleme ve 7/24 güvenlik kontrol merkezi ile kapsamlı güvenlik sağlanır.',
    },
    {
      question: 'Acil teknik arızalarda müdahale süresi ne kadar?',
      answer:
        'SLA kapsamında kritik teknik arızalarda (asansör, HVAC, jeneratör) maksimum 45 dakika müdahale süresi taahhüt edilir. 7/24 acil teknik ekibimiz sahada hazır bulunur.',
    },
  ]);

  const pageLd = webPageSchema({
    name: 'Plaza & Ofis Binası Tesis Yönetimi | Alo Yönetim',
    description:
      'İstanbul plaza ve ofis binaları için HVAC yönetimi, enerji optimizasyonu ve kurumsal tesis yönetimi.',
    path: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <PlazaYonetimiClient />
    </>
  );
}
