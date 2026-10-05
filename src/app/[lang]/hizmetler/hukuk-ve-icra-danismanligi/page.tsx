import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { 
  generateBreadcrumbs, 
  webPageSchema, 
  serviceSchema, 
  faqPageSchema,
  legalServiceSchema,
} from '@/lib/schemas';
import HukukVeIcraDanismanligiClient from './HukukVeIcraDanismanligiClient';

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

  const title = 'KMK 634 Hukuk & Aidat İcra Danışmanlığı — İlamsız Takip & %5 Faiz | Alo Yönetim';
  const description = 'KMK 634 kapsamında ödenmeyen aidatlar için noter ihtarnamesi, Örnek No: 7 ilamsız icra takibi, aylık %5 gecikme tazminatı ve kesinleşmiş işletme projesi danışmanlığı.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
    lang,
    targetKeyword: 'kat mülkiyeti hukuku',
    ogImageType: 'service',
    keywords: [
      'kat mülkiyeti hukuku',
      'aidat icra takibi',
      'kmk 634 danışmanlığı',
      'site yönetimi avukat',
      'apartman yönetimi dava',
      'site genel kurul yönetimi',
      'yönetim planı hazırlama'
    ],
  });
}

export default async function HukukVeIcraDanismanligiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.legal_title || 'Hukuk ve İcra Danışmanlığı', url: '/hizmetler/hukuk-ve-icra-danismanligi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Hukuk ve İcra Danışmanlığı',
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
    description: 'Kat Mülkiyeti Kanunu (KMK 634) kapsamında aidat alacakları icra takibi, genel kurul yönetimi ve hukuki danışmanlık hizmetleri.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Hukuk',
  });

  const legalLd = legalServiceSchema({
    name: 'Alo Yönetim Kat Mülkiyeti Hukuku ve İcra Danışmanlığı',
    description: '634 Sayılı Kat Mülkiyeti Kanunu kapsamında aidat icra takipleri, genel kurul yönetimi ve hukuki danışmanlık.',
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
  });

  const faqs = [
    {
      question: 'Aidat borcunu ödemeyen malik veya kiracıya karşı icra süreci nasıl işler?',
      answer: '634 sayılı Kat Mülkiyeti Kanunu Madde 20 uyarınca ortak gider ve avans payını zamanında ödemeyen kat malikine aylık %5 gecikme tazminatı işler. Uygulamada önce yazılı ihtar gönderilmesi tavsiye edilir (yasal bir zorunluluk değildir). Kesinleşmiş işletme projesine veya kurul kararına dayanılarak ilamsız icra takibi (Örnek No: 7) başlatılabilir; borçlu ödeme emrine 7 gün içinde itiraz edebilir. İtiraz halinde İİK m.68 kapsamında itirazın kaldırılması ya da yetkili mahkemede itirazın iptali yolları işler.'
    },
    {
      question: 'Genel kurul toplantı çağrısı kaç gün önceden yapılmalıdır?',
      answer: 'KMK Madde 29 gereğince, olağan toplantı çağrısının toplantı tarihinden en az 15 gün önce tüm kat maliklerine imza karşılığı veya taahhütlü mektupla tebliğ edilmesi şarttır. İlk toplantıda yeter sayı (arsa payı ve sayı çoğunluğu) sağlanamazsa ikinci toplantı en geç 15 gün içinde yapılır; iki toplantı arasında en az 7 gün bulunmalıdır. İkinci toplantıda olağan kararlar katılanların çoğunluğuyla alınır; nitelikli çoğunluk gerektiren kararlarda bu kural geçerli değildir.'
    },
    {
      question: 'Site yönetim planı nasıl değiştirilir?',
      answer: 'Genel yapılarda KMK m.28/3 uyarınca bütün kat maliklerinin beşte dördünün (4/5) oyu gerekir; birden fazla yapıdan oluşan toplu yapılarda (siteler) ise 22 Mayıs 2026\'da yürürlüğe giren 7579 sayılı Kanun\'la değişen KMK m.70 uyarınca üçte ikinin (2/3) oyu aranır. Karar noter onaylı karar defterine işlenerek Tapu Müdürlüğü\'ne tescil ettirilir.'
    },
    {
      question: 'Gürültü ve komşuluk hukuku ihlallerinde yönetim ne yapabilir?',
      answer: 'KMK Madde 18, kat maliklerine birbirlerine saygı gösterme ve rahatsızlık vermeme yükümlülüğü getirir. Yazılı uyarılara rağmen rahatsızlık sürerse yönetici veya diğer kat malikleri Sulh Hukuk Mahkemesi\'nden hâkimin müdahalesini isteyebilir; gürültü şikâyetleri ayrıca belediye zabıtasına da iletilebilir.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: 'KMK 634 Hukuk ve Aidat İcra Danışmanlığı | Alo Yönetim',
    description: 'Kat Mülkiyeti Kanunu kapsamında profesyonel icra ve yönetim danışmanlığı.',
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, legalLd, faqLd, pageLd]} />
      <HukukVeIcraDanismanligiClient />
    </>
  );
}
