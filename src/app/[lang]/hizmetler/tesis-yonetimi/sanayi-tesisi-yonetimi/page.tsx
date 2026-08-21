import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, serviceSchema, faqPageSchema } from '@/lib/schemas';
import SanayiTesisiYonetimiClient from './SanayiTesisiYonetimiClient';

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
    title: 'Sanayi Tesisi & Fabrika Tesis Yönetimi | Alo Yönetim İstanbul',
    description:
      'İstanbul sanayi tesisi ve fabrikalar için ISO 45001 iş güvenliği, ağır teknik bakım, yangın sistemi yönetimi ve perimetre güvenliği. Endüstriyel tesis yönetimi uzmanı.',
    path: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'sanayi tesis yönetimi',
      'fabrika tesis yönetimi',
      'endüstriyel tesis yönetimi',
      'ISO 45001 tesis yönetimi',
      'sanayi güvenliği',
      'fabrika bakım yönetimi',
      'lojistik tesis yönetimi',
      'sanayi yönetim şirketi',
      'endüstriyel güvenlik istanbul',
      'fabrika yönetim firması',
    ],
  });
}

export default async function SanayiTesisiYonetimiPage({
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
    { name: 'Sanayi Tesisi & Fabrika Yönetimi', url: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Sanayi Tesisi & Endüstriyel Tesis Yönetimi',
    description:
      'İstanbul sanayi ve fabrika tesislerinde ISO 45001 iş güvenliği denetimi, ağır teknik bakım, yangın sistemi, perimetre güvenliği ve endüstriyel hijyen.',
    path: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    priceRange: '₺₺₺',
  });

  const faqLd = faqPageSchema([
    {
      question: 'Sanayi tesislerinde ISO 45001 uyumu nasıl sağlanır?',
      answer:
        'Risk değerlendirmesi, acil durum planları, güvenlik eğitimleri, KKD (kişisel koruyucu donanım) standartları ve periyodik iç denetimler ISO 45001 kapsamında uygulanır. Alo Yönetim bu süreçleri belgeli olarak yürütür.',
    },
    {
      question: 'Endüstriyel tesis bakım yönetimi nasıl planlanır?',
      answer:
        'Önleyici bakım takvimi (PPM) oluşturulur; kritik ekipmanlar için yedek parça stok yönetimi yapılır; arıza takibi dijital CMMS sistemi üzerinden yürütülür. Üretim sürekliliği birincil önceliktir.',
    },
    {
      question: 'Yangın güvenliği ve hidrofor sistemleri nasıl yönetilir?',
      answer:
        'Yangın söndürme sistemleri (sprinkler, gaz sistemi) yılda bir yetkili servis tarafından bakıma tabi tutulur; yangın hidroforu 3 ayda bir çalışma testi yapılır. Tüm belgeler düzenli tutulur.',
    },
    {
      question: 'Sanayi tesisinde perimetre güvenliği nasıl sağlanır?',
      answer:
        '5188 lisanslı devriyeli güvenlik, araç giriş-çıkış kayıt sistemi, termal kameralar ve gece görüş sistemleri ile güçlendirilmiş çevre güvenliği sağlanır.',
    },
    {
      question: 'Endüstriyel zemin ve atık yönetimi nasıl yapılır?',
      answer:
        'Endüstriyel zemin temizliği için özel makine ve kimyasallar kullanılır. Atık yönetimi çevre mevzuatı (Çevre Kanunu, ISO 14001) çerçevesinde belgelenmiş şekilde yürütülür.',
    },
  ]);

  const pageLd = webPageSchema({
    name: 'Sanayi Tesisi & Fabrika Tesis Yönetimi | Alo Yönetim',
    description:
      'İstanbul sanayi ve fabrika tesislerinde ISO 45001 iş güvenliği, ağır teknik bakım ve endüstriyel tesis yönetimi.',
    path: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <SanayiTesisiYonetimiClient />
    </>
  );
}
