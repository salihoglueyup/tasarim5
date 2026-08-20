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
import HavuzBakimiVeHijyenClient from './HavuzBakimiVeHijyenClient';

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

  const title = t.serv_pool_meta_title || 'Yüzme Havuzu Bakımı ve Kimyasal Şartlandırma | Alo Yönetim';
  const description = t.serv_pool_meta_desc || 'Sertifikalı havuz operatörlerimizle açık ve kapalı yüzme havuzları için günlük kimyasal analiz, filtre ters yıkama, dip süpürme ve Sağlık Bakanlığı onaylı hijyen.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/havuz-bakimi-ve-hijyen',
    lang,
    ogImageType: 'service',
    keywords: [
      'havuz bakımı',
      'yüzme havuzu bakımı',
      'havuz kimyasalları klor ph',
      'site havuz işletmesi',
      'havuz suyu analizi',
      'sağlık bakanlığı havuz hijyeni'
    ],
  });
}

export default async function HavuzBakimiVeHijyenPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.pool_title || 'Havuz Bakımı', url: '/hizmetler/havuz-bakimi-ve-hijyen' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Havuz Bakımı ve Hijyen',
    path: '/hizmetler/havuz-bakimi-ve-hijyen',
    description: 'Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Y%C3%BCzme_havuzu',
  });

  const faqs = [
    {
      question: 'Havuz suyu ölçümleri hangi sıklıkla yapılır ve nasıl ilan edilir?',
      answer: 'Sağlık Bakanlığı standartları uyarınca açık ve kapalı yüzme havuzlarında serbest klor, bağlı klor ve pH ölçümleri günde en az 3 defa yapılır. Sonuçlar dijital panoya ve mobil uygulamamıza anlık işlenir.'
    },
    {
      question: 'Havuz operatörleriniz sertifikalı mı?',
      answer: 'Evet. Tüm havuz teknik sorumlularımız MEB ve TSSF onaylı "Havuz Suyu Operatörlüğü" belgesine ve periyodik hijyen eğitimlerine sahiptir.'
    },
    {
      question: 'Açık havuzların kışa hazırlık (kışlama) bakımı nasıl yapılır?',
      answer: 'Sezon kapanışında havuz suyu boşaltılmaz; kışlama kimyasalları (kış koruyucu yosun önleyici ve don önleyici) eklenerek filtrasyon rölantiye alınır ve havuz emniyet brandası ile örtülür.'
    },
    {
      question: 'Akredite laboratuvar su analizleri yapılıyor mu?',
      answer: 'Evet. Ayda bir kez İl Sağlık Müdürlüğü yetkili akredite halk sağlığı laboratuvarları tarafından mikrobiyolojik (E.coli, Pseudomonas, vb.) ve kimyasal su analizleri yapılarak resmi uygunluk raporu alınır.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: 'Yüzme Havuzu Bakımı ve Kimyasal Şartlandırma | Alo Yönetim',
    description: 'Açık ve kapalı yüzme havuzları için periyodik teknik bakım ve Sağlık Bakanlığı onaylı hijyen.',
    path: '/hizmetler/havuz-bakimi-ve-hijyen',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <HavuzBakimiVeHijyenClient />
    </>
  );
}
