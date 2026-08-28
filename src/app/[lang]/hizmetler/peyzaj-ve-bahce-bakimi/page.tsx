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
import PeyzajVeBahceBakimiClient from './PeyzajVeBahceBakimiClient';

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

  const title = 'Site & Tesis Peyzaj ve Bahçe Bakımı — Ziraat Mühendisliği | Alo Yönetim';
  const description = 'Siteler için 4 mevsim periyodik çim biçme, ağaç budama, gübreleme ve akıllı otomatik sulama bakımı. Ziraat mühendisi denetimli profesyonel peyzaj hizmeti.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/peyzaj-ve-bahce-bakimi',
    lang,
    targetKeyword: 'site peyzaj bakımı',
    ogImageType: 'service',
    keywords: [
      'peyzaj bakımı',
      'site peyzaj bakımı',
      'site bahçe bakımı',
      'çim biçme budama',
      'otomatik sulama sistemleri',
      'apartman peyzaj yönetimi',
      'ziraat mühendisi danışmanlığı'
    ],
  });
}

export default async function PeyzajVeBahceBakimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.land_title || 'Peyzaj ve Bahçe Bakımı', url: '/hizmetler/peyzaj-ve-bahce-bakimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Peyzaj ve Bahçe Bakımı',
    path: '/hizmetler/peyzaj-ve-bahce-bakimi',
    description: 'Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Peyzaj_mimarl%C4%B1%C4%9F%C4%B1',
  });

  const faqs = [
    {
      question: 'Site ve sitelerin bahçe bakımında hangi periyotlar uygulanır?',
      answer: 'İlkbahar ve yaz aylarında haftalık çim biçme ve günlük sulama kontrolü; sonbaharda yaprak toplama, budama ve dip gübreleme; kışın ise don koruma ve ağaç bakımı şeklinde 12 aylık periyodik takvim uygulanır.'
    },
    {
      question: 'Otomatik sulama sistemi arızalarında ve su tasarrufunda ne yapıyorsunuz?',
      answer: 'Teknik ekibimiz patlak boru, tıkalı nozul ve vana arızalarına aynı gün müdahale eder. Akıllı yağmur sensörleri takılarak gereksiz sulama engellenir ve ortak alan su faturası %30-40 oranında düşürülür.'
    },
    {
      question: 'Ağaç budama işlemleri için belediyeden izin almak gerekir mi?',
      answer: 'Büyük gövdeli ve tescilli anıt ağaçların derin budaması veya kesimi için ilgili İlçe Belediyesi Park ve Bahçeler Müdürlüğü\'nden izin alınması şarttır. Bu yasal izin süreçlerini ziraat mühendisimiz site adına yürütür.'
    },
    {
      question: 'Çimlerin sararması ve kurumasını önlemek için hangi yöntemler kullanılıyor?',
      answer: 'Toprak sıkışması vertiküt (havalandırma) makinesiyle giderilir, kök bölgesine uygun NPK gübresi verilir, mantar enfeksiyonlarına karşı koruyucu ilaçlama yapılır ve gölgeye dayanıklı tohumlarla ara ekim yapılır.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: 'Peyzaj Tasarımı ve Bahçe Bakım Yönetimi | Alo Yönetim',
    description: 'Site ve tesisler için 4 mevsim profesyonel bahçe ve peyzaj bakımı.',
    path: '/hizmetler/peyzaj-ve-bahce-bakimi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <PeyzajVeBahceBakimiClient />
    </>
  );
}
