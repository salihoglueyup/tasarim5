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
import HasereVeDezenfeksiyonClient from './HasereVeDezenfeksiyonClient';

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

  const title = t.serv_pest_meta_title || 'Sağlık Bakanlığı Ruhsatlı Haşere İlaçlama ve Dezenfeksiyon | Alo Yönetim';
  const description = t.serv_pest_meta_desc || 'Apartman, site ve tesisler için Sağlık Bakanlığı onaylı biyosidal ürünlerle kokusuz, kalıcı böcek, kemirgen kontrolü ve periyodik dezenfeksiyon hizmeti.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/hasere-ve-dezenfeksiyon',
    lang,
    ogImageType: 'service',
    keywords: [
      'haşere ilaçlama',
      'site ilaçlama',
      'apartman böcek ilaçlama',
      'dezenfeksiyon hizmeti',
      'kemirgen fare kontrolü',
      'sağlık bakanlığı ruhsatlı ilaçlama',
      'tesis ilaçlama'
    ],
  });
}

export default async function HasereVeDezenfeksiyonPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.pest_title || 'Haşere İlaçlama', url: '/hizmetler/hasere-ve-dezenfeksiyon' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Haşere İlaçlama ve Dezenfeksiyon',
    path: '/hizmetler/hasere-ve-dezenfeksiyon',
    description: 'Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Biyosidal_%C3%BCr%C3%BCnler',
  });

  const faqs = [
    {
      question: 'İlaçlama sırasında ve sonrasında evden ya da binadan çıkmak gerekir mi?',
      answer: 'Kullandığımız kokusuz jel ve mikroenkapsüle solüsyonlar yaşam alanlarını terk etmeyi gerektirmez. Yalnızca kapalı otopark veya sığınak gibi alanlarda yapılan ULV soğuk sisleme uygulamalarında 2 saat havalandırma önerilir.'
    },
    {
      question: 'Kullanılan ilaçlar kedi, köpek ve evcil hayvanlar için güvenli mi?',
      answer: 'Evet. İlaçlarımız sadece hedef zararlının sinir ve sindirim sistemine etki eden, memeli hayvanlar ve insanlar üzerinde toksik etkisi bulunmayan Sağlık Bakanlığı ruhsatlı biyosidal ürünlerdir. Kemirgen yemleri ise sadece anahtarla açılan kilitli emniyetli kutularda muhafaza edilir.'
    },
    {
      question: 'Site ve apartmanlarda ilaçlama hangi sıklıkla yapılmalıdır?',
      answer: 'Halk sağlığı standartlarına göre ortak alanlar, rögarlar ve çöp odaları yılda en az 2-4 kez (mevsim geçişlerinde) periyodik olarak ilaçlanmalıdır.'
    },
    {
      question: 'İlaçlama sonrası haşereler ne kadar sürede tamamen yok olur?',
      answer: 'Jel uygulamaları hamamböceklerinde domino etkisiyle 3-5 gün içinde yuvanın tamamını kurutur. Sıvı rezidüel ilaçlar ise temas anından itibaren 24 saat içinde sonuç verir ve 3 aya kadar koruyucu bariyer sağlar.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: 'Haşere İlaçlama ve Dezenfeksiyon | Alo Yönetim',
    description: 'Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.',
    path: '/hizmetler/hasere-ve-dezenfeksiyon',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <HasereVeDezenfeksiyonClient />
    </>
  );
}
