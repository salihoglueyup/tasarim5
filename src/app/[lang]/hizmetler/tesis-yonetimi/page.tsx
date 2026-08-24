import type { Metadata } from 'next';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import {
  generateBreadcrumbs,
  webPageSchema,
  serviceSchema,
  faqPageSchema,
  professionalServiceSchema,
  credentialSchema,
} from '@/lib/schemas';
import { 
  KeywordAnalysisSeo, 
  VoiceSearchSpeakableSeo, 
  DefinedTermSetSeo 
} from '@/components/seo';
import { generateFacilityManagementGraph } from '@/lib/seo/facilityTopicGraph';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';
import TesisYonetimiClient from './TesisYonetimiClient';

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
  const serpMeta = getFacilitySerpMeta(lang);

  const title = t.serv_fac_meta_title || serpMeta.title;
  const description = t.serv_fac_meta_desc || serpMeta.description;

  return buildMetadata({
    title,
    description,
    path: serpMeta.canonicalPath,
    lang,
    targetKeyword: serpMeta.targetKeyword,
    ogImageType: 'service',
    keywords: serpMeta.keywords,
  });
}

export default async function TesisYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const pageTitle = t.serv_fac_name || 'Tesis Yönetimi';
  const pageDesc = t.fac_desc || 'İstanbul genelinde apartman, site, plaza ve entegre tesis yönetimi, 5188 özel güvenlik, temizlik, teknik bakım ve aidat icra takibi hizmetleri.';

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: pageTitle, url: '/hizmetler/tesis-yonetimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: pageTitle,
    description: pageDesc,
    path: '/hizmetler/tesis-yonetimi',
    priceRange: '₺₺',
  });

  const professionalLd = professionalServiceSchema({
    name: 'Alo Yönetim Profesyonel Tesis ve Mülk Yönetimi',
    description: 'İstanbul genelinde apartman, site, plaza ve endüstriyel tesisler için ISO 41001 standartlarında entegre tesis yönetimi hizmetleri.',
    path: '/hizmetler/tesis-yonetimi',
    areaServed: 'İstanbul, Türkiye (39 İlçe)',
  });

  const calculateActionLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tesis Yönetimi Canlı Bütçe & Tasarruf Simülatörü',
    url: `${BASE_URL}/api/tesis-yonetimi/calculate-budget`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    potentialAction: {
      '@type': 'CalculateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/api/tesis-yonetimi/calculate-budget?units={units}&blocks={blocks}&district={district}`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      'query-input': 'required name=units',
      result: {
        '@type': 'FinancialProduct',
        name: 'Tahmini Tesis Yönetimi Bütçesi ve %30 Tasarruf Raporu',
      },
    },
  };

  const faqs = [
    {
      question: t.fac_faq_1_q || 'Profesyonel tesis yönetimi neleri kapsar?',
      answer: t.fac_faq_1_a || 'Tesis yönetimi; 5188 sayılı kanuna uygun fiziki güvenlik, ortak alan temizliği, asansör ve jeneratör teknik bakımı, aidat takibi, KMK hukuki danışmanlığı, peyzaj ve havuz bakımını tek çatı altında entegre olarak kapsar.'
    },
    {
      question: t.fac_faq_2_q || 'Tesis yönetimi şirketiyle çalışmak aidatları düşürür mü?',
      answer: t.fac_faq_2_a || 'Evet. Toplu satın alma gücü, önleyici teknik bakım ve enerji tasarrufu uygulamaları sayesinde Alo Yönetim ile çalışan tesislerde işletme giderlerinde %20 ile %30 arasında somut maliyet tasarrufu sağlanır.'
    },
    {
      question: t.fac_faq_3_q || 'Yönetim devir süreci ne kadar sürer ve site sakinleri etkilenir mi?',
      answer: t.fac_faq_3_a || 'Devir teslim süreci ortalama 48 saat içinde tamamlanır. Mevcut hizmetlerde hiçbir kesinti yaşanmadan, tüm sistemler ve personel entegrasyonu pürüzsüzce gerçekleştirilir.'
    },
    {
      question: 'Tesis yönetimi hizmetinin aylık maliyeti nedir?',
      answer: 'Maliyet; bina tipi, daire sayısı ve hizmet kapsamına göre değişir. Rezidanslarda daire başına aylık ₺850-1.600, toplu konutlarda ₺550-1.100 aralığında değişmektedir. Kesin fiyat için ücretsiz keşif talep ediniz.',
    },
    {
      question: 'KMK Madde 37 işletme projesi nedir ve nasıl hazırlanır?',
      answer: 'İşletme projesi; yöneticinin her yıl hazırladığı, 12 aylık tahmini gelir-gider ve her kat malikine düşen avans tutarını gösteren belgedir. Tebliğden 7 gün içinde itiraz edilmezse kesinleşir ve icra takibine dayanak olur.',
    },
    {
      question: 'Asansör yeşil etiket yükümlülüğü nedir?',
      answer: 'Asansör Yönetmeliği kapsamında her asansörün yılda en az bir kez periyodik kontrolü ve yeşil etiket onayı zorunludur. Alo Yönetim yetkili A tipi muayene kuruluşlarıyla bu süreci takip eder.',
    },
    {
      question: 'Acil teknik arızalarda müdahale süresi ne kadar?',
      answer: 'SLA kapsamında kritik arızalar için maksimum 45 dakika müdahale süresi taahhüt edilir. 7/24 acil teknik ekibimiz kesintisiz hizmet vermektedir.',
    },
    {
      question: 'Tesis yönetim şirketi seçerken nelere dikkat edilmeli ve hangi yasal belgeler istenmelidir?',
      answer: 'ISO 41001:2018 ve TSE HYB 12850 belgelerinin güncelliği, 5188 Özel Güvenlik Faaliyet İzin Belgesi, en az 3 referans tesis, sözleşmedeki 45 dakikalık SLA süresi ve kıdem tazminatı sorumluluğu kontrol edilmelidir.',
    },
    {
      question: 'Kat Mülkiyeti Kanunu (KMK 34) uyarınca yönetici hangi oy çokluğu ile seçilir?',
      answer: '634 sayılı KMK Madde 34/4 gereğince yönetici; kat maliklerinin hem sayı (kişi sayısı) hem de arsa payı bakımından salt çoğunluğu (%50 + 1) tarafından seçilir.',
    },
  ];

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: `${pageTitle} | Alo Yönetim`,
    description: pageDesc,
    path: '/hizmetler/tesis-yonetimi',
    speakableSelectors: ['h1', 'h2', '.tldr', '.summary-badge'],
  });

  const facilityGraphLd = generateFacilityManagementGraph(lang);

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, professionalLd, calculateActionLd, faqLd, pageLd, facilityGraphLd, credentialSchema()]} />
      <KeywordAnalysisSeo
        title={pageTitle}
        description={pageDesc}
        path="/hizmetler/tesis-yonetimi"
        targetKeyword="tesis yönetimi"
        keywords={[
          'tesis yönetimi',
          'entegre tesis yönetimi',
          'istanbul tesis yönetimi',
          'bina yönetimi',
          'site yönetimi',
          'iso 41001',
          'kmk 634'
        ]}
      />
      <VoiceSearchSpeakableSeo
        question="İstanbul'da profesyonel tesis yönetimi hizmeti neleri kapsar?"
        directAnswer="Alo Yönetim; 634 sayılı KMK ve ISO 41001 standartlarında 5188 lisanslı güvenlik, TSE 13811 temizlik, asansör ve yangın teknik bakımı ile şeffaf aidat muhasebesini tek çatı altında sunar."
        lang={lang}
      />
      <DefinedTermSetSeo
        name="Tesis Yönetimi ve Kat Mülkiyeti Terimleri"
        description="Entegre tesis yönetimi, 634 sayılı KMK ve 5188 özel güvenlik yasal terimler sözlüğü."
        path="/hizmetler/tesis-yonetimi"
        terms={[
          {
            term: 'Tesis Yönetimi (Facility Management)',
            definition: 'Binaların idari, hukuki, teknik ve temizlik operasyonlarının ISO 41001:2018 standartlarında tek çatı altında profesyonelce yönetilmesidir.',
          },
          {
            term: 'İşletme Projesi (KMK Madde 37)',
            definition: '634 sayılı KMK 37. maddesi uyarınca anagayrimenkulün bir yıllık tahmini gelir ve giderlerini gösteren kesinleşmiş yasal bütçe belgesidir.',
          },
          {
            term: 'Yasal Gecikme Tazminatı (KMK Madde 20/2)',
            definition: 'Aidat borcunu gününde ödemeyen kat malikine re\'sen uygulanan aylık %5 oranındaki kanuni gecikme tazminatıdır.',
          },
          {
            term: 'Çift Çoğunluk Kuralı (KMK Madde 34/4)',
            definition: 'Yönetici seçiminde geçerli bir kararın oluşabilmesi için kat maliklerinin hem sayı hem arsa payı bakımından salt çoğunluğunun (%50+1) sağlanması şartıdır.',
          },
          {
            term: 'Asansör Yeşil Etiket Uyumu',
            definition: 'Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği uyarınca yılda bir zorunlu yapılan periyodik muayene ve güvenlik tescil belgesidir.',
          },
          {
            term: 'Kompanzasyon & Reaktif Güç Takibi',
            definition: 'Tesis elektrik panolarında reaktif enerji oranını denetleyerek elektrik dağıtım şirketinin kestiği yüksek cezaları %100 engelleyen teknik mühendislik izlemesidir.',
          },
          {
            term: 'Arsa Payı Esası (KMK Madde 20/1-c)',
            definition: 'Bakım, onarım, sigorta ve yönetici aylığı gibi ana gayrimenkul ortak giderlerinin her bağımsız bölümün tapudaki arsa payı oranında paylaştırılması ilkesidir.',
          },
          {
            term: 'Eşit Paylaşım İlkesi (KMK Madde 20/1-a)',
            definition: 'Kapıcı, kaloriferci, bahçıvan ve bekçi giderleri ile bunlar için toplanan avansın tüm kat malikleri arasında eşit olarak bölüştürülmesidir.',
          },
          {
            term: '5188 Sayılı Kanun Valilik İzni',
            definition: 'Apartman ve sitelerde fiziki güvenlik personeli istihdam edebilmek veya güvenlik şirketiyle çalışmak için İl Özel Güvenlik Komisyonu ve Valilikten alınması zorunlu yasal izin kararıdır.',
          },
          {
            term: 'Önleyici Koruyucu Bakım (Preventive Maintenance)',
            definition: 'Tesis bileşenlerinin (hidrofor, jeneratör, kazan dairesi) arızalanmasını beklemeden periyodik ölçüm ve testlerle ömrünü uzatan planlı mühendislik yönetimidir.',
          },
          {
            term: 'Denetçi Raporu (KMK Madde 41)',
            definition: 'Denetçinin veya denetim kurulunun yöneticinin hesap ve işlemlerini en geç üç ayda bir denetleyerek genel kurula sunduğu resmi mali ve idari teftiş raporudur.',
          },
          {
            term: 'Ortak Alan İşgali & Müdahalenin Men-i (KMK Madde 18)',
            definition: 'Kat maliklerinin sığınak, yangın merdiveni, çatı ve koridor gibi ortak alanları özel mülk gibi kapatmasını engelleyen ve eski hale getirilmesini sağlayan yasal süreçtir.',
          },
        ]}
      />
      <TesisYonetimiClient />
    </>
  );
}
