import { translations, Language } from '@/i18n/translations';
import { generateBreadcrumbs, webPageSchema, digitalDocumentSchema, graph } from '@/lib/schemas';
import JsonLd from '@/components/seo/JsonLd';
import { BASE_URL } from '@/lib/seo';
import CertificatesClient from './CertificatesClient';

const CERT_SCHEMAS = [
  { name: 'Doğaya Saygı Sertifikası', description: 'Operasyonlarımızın doğaya ve ekosisteme saygılı şekilde yürütüldüğünü belgeleyen çevre sorumluluk sertifikası.', pdf: '/certificates/dogaya-saygi.pdf', about: 'Çevre Sorumluluğu', issuer: 'Türkiye Çevre Ajansı' },
  { name: 'ISO 14001:2026 Çevre Yönetim Sistemi', description: 'Doğal kaynakların etkin kullanımı ve atık yönetimi konularında uluslararası standartlara uygunluk belgesi.', pdf: '/certificates/iso-14001.pdf', about: 'Çevre Yönetim Sistemi', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2026-01-01' },
  { name: 'ISO 26000:2021 Sosyal Sorumluluk', description: 'Topluma ve paydaşlara karşı etik, adil ve şeffaf bir sorumluluk anlayışının belgesi.', pdf: '/certificates/iso-26000.pdf', about: 'Sosyal Sorumluluk', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2021-01-01' },
  { name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği', description: 'Çalışanların ve site sakinlerinin sağlığını ve güvenliğini garanti eden uluslararası standart.', pdf: '/certificates/iso-45001.pdf', about: 'İş Sağlığı ve Güvenliği', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2018-03-12' },
  { name: 'ISO 22301:2019 İş Sürekliliği Yönetimi', description: 'Kriz anlarında bile hizmetlerin kesintisiz devam etmesini sağlayan iş sürekliliği yönetim standardı.', pdf: '/certificates/iso-22301.pdf', about: 'İş Sürekliliği', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2019-10-31' },
  { name: 'ISO 31000:2018 Kurumsal Risk Yönetimi', description: 'Finansal ve operasyonel risklerin proaktif biçimde belirlenmesi ve yönetilmesi için uluslararası standart.', pdf: '/certificates/iso-31000.pdf', about: 'Risk Yönetimi', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2018-02-15' },
  { name: 'ISO 10002:2018 Müşteri Memnuniyeti', description: 'Sakinlerden gelen tüm talep ve şikayetlerin hızlı ve sistematik biçimde çözüme kavuşturulmasını belgeleyen standart.', pdf: '/certificates/iso-10002.pdf', about: 'Müşteri Memnuniyeti', issuer: 'ISO', issuerUrl: 'https://www.iso.org', date: '2018-07-01' },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang || 'tr') as Language;
  const t = (key: keyof typeof translations.tr) => translations[lang]?.[key] || translations.tr[key];

  return {
    title: `${t('certificates_title')} | Alo Yönetim`,
    description: t('certificates_desc'),
    openGraph: {
      title: `${t('certificates_title')} | Alo Yönetim`,
      description: t('certificates_desc'),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${resolvedParams.lang}/kurumsal/kalite-belgelerimiz`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og/corporate.jpg`,
          width: 1200,
          height: 630,
          alt: t('certificates_title'),
        }
      ],
    }
  };
}

export default async function CertificatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang || 'tr') as Language;
  const t = (key: keyof typeof translations.tr) => translations[lang]?.[key] || translations.tr[key];

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('nav_corporate'), url: '/kurumsal' },
    { name: t('nav_certificates'), url: '/kurumsal/kalite-belgelerimiz' }
  ]);

  const pageLd = webPageSchema({
    name: t('certificates_title'),
    description: t('certificates_desc'),
    path: '/kurumsal/kalite-belgelerimiz',
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
