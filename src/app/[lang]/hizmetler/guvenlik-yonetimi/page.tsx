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
import GuvenlikYonetimiClient from './GuvenlikYonetimiClient';

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

  const title = '5188 Özel Güvenlik Şirketi — Site, Plaza & Tesis Güvenlik Hizmetleri | Alo Yönetim';
  const description = '5188 sayılı Kanun kapsamında Valilik izinli lisanslı özel güvenlik, 7/24 devriye, CCTV kamera izleme ve fiziki koruma hizmetleri. 48 saatte teklif alın!';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/guvenlik-yonetimi',
    lang,
    targetKeyword: 'özel güvenlik şirketi',
    ogImageType: 'service',
    keywords: [
      'özel güvenlik şirketi',
      'özel güvenlik şirketleri',
      '5188 özel güvenlik',
      'site güvenliği',
      'apartman güvenliği',
      'tesis güvenliği',
      'özel güvenlik firmaları',
      'fiziki güvenlik',
      'kamera izleme cctv',
      'plaka tanıma sistemi'
    ],
  });
}

export default async function GuvenlikYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.sec_title || 'Güvenlik Yönetimi', url: '/hizmetler/guvenlik-yonetimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Profesyonel Güvenlik Yönetimi',
    path: '/hizmetler/guvenlik-yonetimi',
    description: '5188 sayılı Özel Güvenlik Kanunu uyumlu, 7/24 CCTV kamera takibi, plaka tanıma ve lisanslı güvenlik personeli ile profesyonel site güvenlik yönetimi.',
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/%C3%96zel_g%C3%BCvenlik_g%C3%B6revlisi',
  });

  const faqs = [
    {
      question: 'Sitemizde özel güvenlik görevlendirmek için yasal prosedür nedir?',
      answer: '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca, sitede özel güvenlik istihdam edilebilmesi için İl Özel Güvenlik Komisyonu\'na başvuru yapılarak Valilik izni alınmalıdır. Alo Yönetim olarak tüm başvuru, izin ve onay süreçlerini site adına anahtar teslim yürütüyoruz.'
    },
    {
      question: 'Güvenlik görevlilerinin yetki ve sorumlulukları nelerdir?',
      answer: 'Güvenlik görevlileri 5188 sayılı kanun kapsamında; siteye giriş yapan ziyaretçilerin kimlik kontrolünü yapma, eşyaları X-ray/dedektörden geçirme, suçüstü durumunda yakalama ve genel kolluk kuvvetlerine teslim etme yetkisine sahiptir.'
    },
    {
      question: 'Gece devriyeleri ve nöbet denetimleri nasıl yapılıyor?',
      answer: 'Güvenlik personeli belirlenen kritik noktalardaki RFID/QR devriye istasyonlarını saat başı okutur. Turlar dijital yönetim panelimize anlık aktarılır; nöbet uykusu veya tur aksaması yaşanmaması için merkez denetim ekiplerimizce habersiz gece teftişleri yapılır.'
    },
    {
      question: 'Güvenlik kameraları ve kayıt saklama süresi nedir?',
      answer: 'Site ortak alan güvenlik kameraları 7/24 kesintisiz kayıt altına alınır. KVKK (Kişisel Verilerin Korunması Kanunu) Aydınlatma Metni çerçevesinde görüntüler şifreli NVR sunucularında en az 30 gün yasal saklama süresiyle muhafaza edilir.'
    }
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: '5188 Lisanslı Özel Güvenlik ve Tesis Emniyeti | Alo Yönetim',
    description: '5188 sayılı kanun kapsamında lisanslı site ve tesis özel güvenlik yönetimi.',
    path: '/hizmetler/guvenlik-yonetimi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <GuvenlikYonetimiClient />
    </>
  );
}
