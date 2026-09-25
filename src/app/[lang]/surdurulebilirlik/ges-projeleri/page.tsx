import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, faqPageSchema } from '@/lib/schemas';
import GesProjeleriClient from './GesProjeleriClient';

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

  const title = 'Siteler İçin Çatı GES ve Güneş Enerjisi Projeleri | Alo Yönetim';
  const description =
    'Sitelerde ortak alan elektrik faturasını %70-85 düşüren çatı tipi güneş enerjisi (GES), 634 KMK m.42 yasal karar şablonu, EPDK mahsuplaşma ve EV şarj entegrasyonu rehberi.';

  return buildMetadata({
    title,
    description,
    path: '/surdurulebilirlik/ges-projeleri',
    lang,
    targetKeyword: 'sitelerde çatı ges güneş enerjisi',
    ogImageType: 'default',
    keywords: [
      'sitelerde çatı ges',
      'site ortak alan güneş enerjisi',
      'çatı ges amortisman hesaplama',
      'apartman ges karar örneği',
      '634 kmk madde 42 ges çoğunluk',
      'epdk 5 1 ç lisanssız elektrik üretimi',
      'site otopark ev şarj ges entegrasyonu',
      'bedaş çağrı mektubu ges',
      'sitelerde güneş paneli su sızdırma garantisi',
    ],
  });
}

export default async function GesProjeleriPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.sust_hub_title || 'Sürdürülebilirlik', url: '/surdurulebilirlik' },
    { name: t.ges_title || 'Sitelerde Çatı GES Projeleri', url: '/surdurulebilirlik/ges-projeleri' },
  ]);

  const pageLd = webPageSchema({
    type: 'ItemPage',
    name: 'Siteler İçin Çatı GES ve Güneş Enerjisi Projeleri | Alo Yönetim',
    description:
      'Toplu konut ve sitelerde ortak elektrik giderini %70-85 düşüren çatı tipi güneş enerjisi santrali, EPDK mahsuplaşma ve EV şarj entegrasyonu.',
    path: '/surdurulebilirlik/ges-projeleri',
    speakableSelectors: ['h1', 'h2', 'p'],
  });

  const faqs = [
    {
      question: 'Sitelerde çatı GES kurmak için genel kurulda oy birliği mi yoksa çoğunluk mu gerekir?',
      answer:
        '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 42 uyarınca ortak alanların faydalı yenilik ve ilaveleri kapsamında değerlendirildiğinden, kat maliklerinin sayı ve arsa payı çoğunluğuyla karar alınması yasal olarak yeterlidir (oy birliği aranmaz).',
    },
    {
      question: 'Paneller monte edilirken çatı su yalıtımı delinir mi? Su sızdırma riski var mıdır?',
      answer:
        'Kesinlikle hayır. Düz teras çatılarda delme işlemi yapılmayan rüzgar balastlı (ağırlıklı) alüminyum konstrüksiyon kullanılır. Eğimli çatılarda ise çift kat EPDM contalı sızdırmaz montaj kitleri uygulanır ve 10 yıl su sızdırmazlık garanti sertifikası verilir.',
    },
    {
      question: 'GES yatırım maliyetini kiracılar mı yoksa ev sahipleri mi öder?',
      answer:
        'Güneş santrali binanın ayrılmaz bir demirbaşı ve kalıcı değer artırıcı yatırımı olduğundan, kurulum maliyeti ev sahiplerine (kat maliklerine) aittir. Faturanın düşmesiyle azalan aidat ise kiracılara da anında nakit tasarruf sağlar.',
    },
    {
      question: 'Bulutlu havalarda veya kış mevsiminde sitenin elektriği kesilir mi?',
      answer:
        'Hayır. Sistem on-grid (şebeke bağlantılı) çalışır. Güneşin yetersiz olduğu anlarda veya gece saatlerinde şehir şebekesi (BEDAŞ/AYEDAŞ) kesintisiz güç sağlamaya devam eder.',
    },
  ];

  const faqLd = faqPageSchema(faqs); // Schema.org @type: FAQPage

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Sitelerde Çatı GES Kurulumu ve Yasal İzin Süreci',
    description: 'Toplu konut ve apartman sitelerinde çatı güneş enerjisi santrali kurmanın 6 resmi adımı.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Statik Çatı ve Güneşlenme Keşfi',
        text: 'Mühendislerimiz çatı taşıma kapasitesini ve güneşlenme açısını 3D simülasyonla inceler.',
      },
      {
        '@type': 'HowToStep',
        name: 'KMK m.42 Karar Protokolü',
        text: 'Kat malikleri kurulunda sayı ve arsa payı çoğunluğuyla resmi karar alınır.',
      },
      {
        '@type': 'HowToStep',
        name: 'Dağıtım Şirketi Bağlantı Çağrı Mektubu',
        text: 'EPDK 5/1-ç kapsamında BEDAŞ veya AYEDAŞ elektrik dağıtım şirketine resmi başvuru yapılır.',
      },
      {
        '@type': 'HowToStep',
        name: 'TEDAŞ Proje Onayı',
        text: 'TEDAŞ standartlarında elektriksel ve statik projeler onaylatılır.',
      },
      {
        '@type': 'HowToStep',
        name: 'Tier-1 Panel Montajı',
        text: 'Membran delinmeden balastlı montaj ve akıllı inverter kurulumu tamamlanır.',
      },
      {
        '@type': 'HowToStep',
        name: 'Çift Yönlü Sayaç ve Mahsuplaşma',
        text: 'Geçici kabul yapılarak çift yönlü sayaç takılır ve aylık mahsuplaşma başlar.',
      },
    ],
  };

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, faqLd, howToLd]} />
      <GesProjeleriClient lang={lang} />
    </>
  );
}
