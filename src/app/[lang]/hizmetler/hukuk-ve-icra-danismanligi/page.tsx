import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
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

  const title = 'Kat Mülkiyeti Hukuku & Aidat İcra Danışmanlığı — KMK 634 | Alo Yönetim';
  const description = 'KMK 634 kapsamında geciken aidatlar için ilamsız icra takibi, %5 gecikme tazminatı tahsili ve genel kurul hukuki danışmanlığı. Avukat destekli şeffaf süreç.';

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
      answer: '634 sayılı Kat Mülkiyeti Kanunu Madde 20 uyarınca, öncelikle noter veya iadeli taahhütlü mektupla yasal ihtarname gönderilir. 7 günlük yasal süre içinde ödeme yapılmazsa İcra Dairesi nezdinde ilamsız icra takibi (Örnek No: 7) başlatılır; borçlu itiraz ederse sulh hukuk mahkemesinde itirazın iptali davası açılır.'
    },
    {
      question: 'Genel kurul toplantı çağrısı kaç gün önceden yapılmalıdır?',
      answer: 'KMK Madde 29 gereğince, olağan toplantı çağrısının toplantı tarihinden en az 15 gün önce tüm kat maliklerine imza karşılığı veya taahhütlü mektupla tebliğ edilmesi şarttır. İlk toplantıda yeter sayı (arsa payı ve sayı çoğunluğu) sağlanamazsa, ikinci toplantı en geç 15 gün içinde yapılır.'
    },
    {
      question: 'Site yönetim planı nasıl değiştirilir?',
      answer: '634 sayılı KMK Madde 28 uyarınca, site yönetim planının değiştirilebilmesi için bütün kat maliklerinin beşte dördünün (4/5) oyu şarttır. Karar noter onaylı karar defterine işlenerek Tapu Müdürlüğü\'ne tescil ettirilir.'
    },
    {
      question: 'Gürültü ve komşuluk hukuku ihlallerinde yönetim ne yapabilir?',
      answer: 'KMK Madde 18 komşuluk haklarına saygı yükümlülüğü getirir. Yazılı uyarılara rağmen rahatsızlık devam ederse, yönetim kurulu kararıyla Sulh Hukuk Mahkemesi\'nden hâkimin müdahalesi talep edilebilir ve yasal idari para cezası uygulatılabilir.'
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
