import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { generateBreadcrumbs, webPageSchema, digitalDocumentSchema } from '@/lib/schemas';
import JsonLd from '@/components/seo/JsonLd';
import CertificatesClient from './CertificatesClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CERT_SCHEMAS = [
  { name: 'Doğaya Saygı Sertifikası', description: 'Operasyonlarımızın doğaya ve ekosisteme saygılı şekilde yürütüldüğünü belgeleyen çevre sorumluluk sertifikası.', pdf: '/certificates/dogaya-saygi.pdf', about: 'Çevre Sorumluluğu', issuer: 'Türkiye Çevre Ajansı' },
  { name: 'ISO 14001:2026 Çevre Yönetim Sistemi', description: 'Doğal kaynakların etkin kullanımı ve atık yönetimi konularında uluslararası standartlara uygunluk belgesi.', pdf: '/certificates/iso-14001.pdf', about: 'Çevre Yönetim Sistemi', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2026-01-01' },
  { name: 'ISO 26000:2021 Sosyal Sorumluluk', description: 'Topluma ve paydaşlara karşı etik, adil ve şeffaf bir sorumluluk anlayışının belgesi.', pdf: '/certificates/iso-26000.pdf', about: 'Sosyal Sorumluluk', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2021-01-01' },
  { name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği', description: 'Çalışanların ve site sakinlerinin sağlığını ve güvenliğini garanti eden uluslararası standart.', pdf: '/certificates/iso-45001.pdf', about: 'İş Sağlığı ve Güvenliği', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2018-03-12' },
  { name: 'ISO 22301:2019 İş Sürekliliği Yönetimi', description: 'Kriz anlarında bile hizmetlerin kesintisiz devam etmesini sağlayan iş sürekliliği yönetim standardı.', pdf: '/certificates/iso-22301.pdf', about: 'İş Sürekliliği', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2019-10-31' },
  { name: 'ISO 31000:2018 Kurumsal Risk Yönetimi', description: 'Finansal ve operasyonel risklerin proaktif biçimde belirlenmesi ve yönetilmesi için uluslararası standart.', pdf: '/certificates/iso-31000.pdf', about: 'Risk Yönetimi', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2018-02-15' },
  { name: 'ISO 10002:2018 Müşteri Memnuniyeti', description: 'Sakinlerden gelen tüm talep ve şikayetlerin hızlı ve sistematik biçimde çözüme kavuşturulmasını belgeleyen standart.', pdf: '/certificates/iso-10002.pdf', about: 'Müşteri Memnuniyeti', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2018-07-01' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const title = 'Kalite Belgelerimiz & ISO Akreditasyonlarımız — ISO 41001 & 5188 | Alo Yönetim';
  const description = 'ISO 41001:2018 Tesis Yönetimi, ISO 9001, ISO 14001, ISO 45001 ve 5188 Sayılı Kanun lisanslı kalite ve güvenlik akreditasyonlarımız. Kurumsal belgelerimizi inceleyin!';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/kalite-belgelerimiz',
    lang,
    ogImageType: 'default',
    keywords: [
      'kalite belgelerimiz',
      'iso sertifikaları site yönetimi',
      'türkak akredite belgeler',
      'iso 14001 çevre belgesi',
      'iso 45001 isg belgesi'
    ],
  });
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_corporate || 'Kurumsal', url: '/kurumsal' },
    { name: t.nav_certificates || 'Kalite Belgelerimiz', url: '/kurumsal/kalite-belgelerimiz' }
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.certificates_title || 'Kalite Belgelerimiz & ISO Akreditasyonlarımız',
    description: t.certificates_desc || 'Alo Yönetim kurumsal kalite, ISO ve TÜRKAK akreditasyon sertifikaları.',
    path: '/kurumsal/kalite-belgelerimiz',
    speakableSelectors: ['h1', 'p'],
  });

  const certSchemas = CERT_SCHEMAS.map((c) =>
    digitalDocumentSchema({
      name: c.name,
      description: c.description,
      url: c.pdf,
      datePublished: c.date,
      issuerName: c.issuer,
      issuerUrl: c.issuerUrl,
      about: c.about,
    })
  );

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, ...certSchemas]} />
      <CertificatesClient />
    </>
  );
}
