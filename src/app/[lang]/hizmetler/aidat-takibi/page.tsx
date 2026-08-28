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
import AidatTakibiClient from './AidatTakibiClient';

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

  const title = 'Profesyonel Aidat Takibi & Tahsilat Yönetimi — KMK 634 m.20 | Alo Yönetim';
  const description = 'Site ve apartmanlar için %99 tahsilat garantili dijital aidat takip sistemi. Kredi kartıyla online ödeme, otomatik banka entegrasyonu ve yasal icra takibi.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/aidat-takibi',
    lang,
    targetKeyword: 'aidat takibi',
    ogImageType: 'service',
    keywords: [
      'aidat takibi',
      'profesyonel aidat tahsili',
      'online aidat ödeme',
      'site aidat takip programı',
      'apartman aidat tahsilatı',
      'kat mülkiyeti aidat takibi',
      'aidat icra takibi',
      'şeffaf site muhasebesi',
      'tesis yönetimi aidat'
    ],
  });
}

export default async function AidatTakibiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.dues_title || 'Aidat Takibi', url: '/hizmetler/aidat-takibi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Online Aidat Takibi ve Finansal Yönetim',
    path: '/hizmetler/aidat-takibi',
    description: 'Site ve apartmanlar için %99 tahsilat oranlı dijital aidat takip programı, online kredi kartı ile ödeme, otomatik banka entegrasyonu ve şeffaf muhasebe yönetimi.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Aidat',
  });

  const faqs = [
    {
      question: 'Aidat ödemeleri hangi yöntemlerle yapılabilir?',
      answer: 'Alo Yönetim mobil uygulaması ve web portalı üzerinden kredi kartı, banka kartı (tek çekim veya taksitli), otomatik ödeme talimatı ve anlaşmalı banka IBAN hesaplarına havale/EFT ile 7/24 güvenle ödeme yapabilirsiniz.'
    },
    {
      question: 'Geciken aidatlara yasal gecikme faizi nasıl uygulanır?',
      answer: '634 Sayılı Kat Mülkiyeti Kanunu Madde 20/2 uyarınca, gününde ödenmeyen aidat ve ortak avans borçları için aylık %5 yasal gecikme tazminatı tahakkuk ettirilir. Sistemimiz bu hesabı kuruşu kuruşuna otomatik işletir.'
    },
    {
      question: 'Kiracı olarak aidat ödemekten kim sorumludur?',
      answer: 'Kat Mülkiyeti Kanunu uyarınca, kiracı bağımsız bölümün olağan işletme ve kullanım giderleri (kapıcı, güvenlik, temizlik, ortak elektrik vb.) aidatından sorumludur. Demirbaş, çatı onarımı veya asansör yenileme gibi ana gayrimenkul değerini artıran harcamalardan ise mülk sahibi (kat maliki) sorumludur.'
    },
    {
      question: 'Aidat borcum ve geçmiş ödemelerim için resmi döküm alabilir miyim?',
      answer: 'Evet. Mobil uygulamamız veya web panelinizden dilediğiniz tarih aralığına ait ıslak imzalı/karekodlu ekstre ve tahsilat makbuzlarını PDF formatında tek tıkla indirebilirsiniz.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: 'Online Aidat Takibi ve Finansal Yönetim | Alo Yönetim',
    description: 'Site ve apartmanlar için %99 tahsilat oranlı dijital aidat takip programı.',
    path: '/hizmetler/aidat-takibi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <AidatTakibiClient />
    </>
  );
}
