import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
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

  const title = 'Siteler İçin Çatı GES ve Güneş Enerjisi | Alo Yönetim';
  const description = 'Sitelerde ortak alan elektrik faturasını %70 düşüren çatı tipi güneş enerjisi (GES) fizibilite, amortisman hesaplama ve anahtar teslim kurulum. Teklif alın!';

  return buildMetadata({
    title,
    description,
    path: '/surdurulebilirlik/ges-projeleri',
    lang,
    targetKeyword: 'çatı ges site yönetimi',
    ogImageType: 'default',
    keywords: [
      'çatı ges site yönetimi',
      'apartman güneş enerjisi',
      'site ortak alan elektrik tasarrufu',
      'ges amortisman hesaplama',
      'güneş paneli amortisman hesaplama',
      'epdk lisanssız elektrik üretimi'
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
    { name: t.ges_title || 'GES Projeleri', url: '/surdurulebilirlik/ges-projeleri' },
  ]);

  const pageLd = webPageSchema({
    name: t.ges_title || 'Çatı GES Güneş Enerjisi Projeleri',
    description: t.ges_desc || 'Toplu konut ve plazalarda güneş enerjisi ile ortak alan elektrik tasarrufu.',
    path: '/surdurulebilirlik/ges-projeleri',
    speakableSelectors: ['h1', 'p'],
  });

  const faqs = [
    {
      question: t.ges_faq_1_q || 'Sitelerde çatı GES kurmak için kat malikleri kurulu kararı nasıl alınmalıdır?',
      answer: t.ges_faq_1_a || 'Kat Mülkiyeti Kanunu uyarınca ortak alanlarda yapılacak yenilenebilir enerji yatırımları için kat malikleri kurulunun sayı ve arsa payı çoğunluğuyla karar alınması yeterlidir.'
    },
    {
      question: t.ges_faq_2_q || 'Güneş enerjisi sistemi kurulum maliyetini ne kadar sürede amorti eder?',
      answer: t.ges_faq_2_a || 'İstanbul iklim verilerine göre ortalama 3 ila 4 yıl içinde kendini amorti eder ve kalan 20+ yıl boyunca ortak alan elektriğini ücretsiz sağlar.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, faqLd]} />
      <GesProjeleriClient />
    </>
  );
}
