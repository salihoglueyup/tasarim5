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
import TemizlikVeHijyenClient from './TemizlikVeHijyenClient';

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

  const title = t.serv_clean_meta_title || 'Profesyonel Apartman, Site ve Tesis Temizliği | Alo Yönetim';
  const description = t.serv_clean_meta_desc || 'TSE 13811 hijyen standartlarında, endüstriyel zemin yıkama makineleri ve sertifikalı personellerle 4 mevsim site, apartman ve plaza ortak alan temizliği.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/temizlik-ve-hijyen',
    lang,
    ogImageType: 'service',
    keywords: [
      'site temizlik şirketi',
      'apartman temizliği',
      'ortak alan temizliği',
      'merdiven temizliği',
      'otopark zemin yıkama',
      'tse 13811 hijyen',
      'endüstriyel tesis temizliği'
    ],
  });
}

export default async function TemizlikVeHijyenPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.clean_title || 'Temizlik ve Hijyen', url: '/hizmetler/temizlik-ve-hijyen' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Temizlik ve Hijyen Yönetimi',
    path: '/hizmetler/temizlik-ve-hijyen',
    description: 'Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği ve dezenfeksiyonu.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Temizlik',
  });

  const faqs = [
    {
      question: 'Site ve apartman temizliği hangi periyotlarla yapılır?',
      answer: 'Sitenizin büyüklüğü ve yönetim planına göre günlük kat temizliği, haftalık detaylı ortak alan yıkaması ve aylık kapalı otopark/zemin otomatı uygulamaları şeklinde planlanır. Tüm takvim şeffaf olarak ilan edilir.'
    },
    {
      question: 'Kullanılan temizlik kimyasalları insan sağlığı ve evcil hayvanlar için güvenli mi?',
      answer: 'Evet. Kullandığımız tüm ürünler Sağlık Bakanlığı ve TSE onaylı, biyolojik olarak parçalanabilir, ağır kimyasal içermeyen çevre dostu profesyonel endüstriyel temizleyicilerdir.'
    },
    {
      question: 'Temizlik personelinin SGK, kıyafet ve iş güvenliği (İSG) sorumluluğu kime aittir?',
      answer: 'Tüm personelin SGK girişleri, maaş ödemeleri, kıdem/ihbar tazminatları, iş elbiseleri ve 6331 sayılı İSG Kanunu kapsamındaki periyodik eğitimleri Alo Yönetim kurumsal sorumluluğundadır; site yönetimine hiçbir yasal risk yansımaz.'
    },
    {
      question: 'Kapalı otopark ve sığınak temizlikleri nasıl gerçekleştiriliyor?',
      answer: 'Kapalı otopark zeminleri endüstriyel binicili zemin yıkama otomatları ve yağ sökücü özel solüsyonlarla yıkanır; sığınak ve teknik alanlar ise periyodik olarak dezenfekte edilip tozlardan arındırılır.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: 'Profesyonel Apartman, Site ve Tesis Temizliği | Alo Yönetim',
    description: 'TSE 13811 standartlarında endüstriyel ortak alan temizlik ve hijyen hizmetleri.',
    path: '/hizmetler/temizlik-ve-hijyen',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <TemizlikVeHijyenClient />
    </>
  );
}
