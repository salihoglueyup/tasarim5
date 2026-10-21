import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { resolveLegacyDistrictSlug, resolveLegacyTermSlug } from '@/lib/legacySlugs';
import { localePath } from '@/lib/i18n/localePath';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';
import QuoteCtaButton from '@/components/ui/widgets/QuoteCtaButton';
import TldrBlock from '@/components/ui/primitives/TldrBlock';
import SecurityLegalTemplateGeneratorSeo from '@/components/seo/facility/SecurityLegalTemplateGeneratorSeo';
import CleaningScheduleGeneratorSeo from '@/components/seo/facility/CleaningScheduleGeneratorSeo';
import FacilityLegalTemplateGeneratorSeo from '@/components/seo/facility/FacilityLegalTemplateGeneratorSeo';
import FacilityRfpDownloadModalSeo from '@/components/seo/facility/FacilityRfpDownloadModalSeo';
import FacilitySubSectorCrossNav from '@/components/seo/facility/FacilitySubSectorCrossNav';
import { buildMetadata, BASE_URL, localizedUrl, normalizeLocale } from '@/lib/seo';
import { synthesizeDistrictFacilityFaq } from '@/lib/seo/facility/facilityFaqSynthesizer';
import { generateVerifiedAuthorityGraph } from '@/lib/seo/audits/eeatAuditor';
import { buildDistrictFacilityGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import { getAdjacentDistrictMeshLinks } from '@/lib/seo/facility/facilityMeshLinkerEngine';
import {
  generateBreadcrumbs,
  webPageSchema,
  localServiceSchema,
  localBusinessAreaSchema,
  districtFacilityServiceSchema,
  districtSecurityServiceSchema,
  districtTechnicalServiceSchema,
  districtCleaningServiceSchema,
  ORG_PHONE,
} from '@/lib/schemas';

import { DISTRICTS, getDistrict } from '@/data/districts';
import { SERVICES, getService, isServiceAlias } from '@/data/services';
import { REAL_REFERENCES } from '@/data/realReferences';
import { ORG_CREDENTIALS } from '@/lib/schemas';
import { FACTS } from '@/lib/facts';
import DistrictAiOverviewSeo from '@/components/seo/ai-overviews/DistrictAiOverviewSeo';

import Icon from '@/components/ui/branding/Icon';
import { getDistrictLocalBrief } from '@/data/districtGuides';
import { getOfficialNeighborhoods } from '@/data/districtOfficialNeighborhoods';

const LOCAL_BRIEF_SERVICES = new Set(['site-yonetimi', 'apartman-yonetimi', 'bina-yonetimi', 'site-yonetim-sirketleri', 'profesyonel-site-yonetimi', 'tesis-yonetimi']);
// ISR (Faz 120): 96 kombinasyon sayfası günlük yeniden doğrulanır.
export const revalidate = 86400;
export const dynamicParams = true;

// Hizmet × ilçe matrisi yalnızca Türkçe indekslenir (bkz. src/lib/seo/indexPolicy.ts).
export function generateStaticParams() {
  return DISTRICTS.flatMap((d) =>
    SERVICES.map((s) => ({ lang: 'tr', ilce: d.slug, hizmet: s.slug })),
  );
}

/** Hizmete özgü 3. SSS sorusu — tüm sayfalarda aynı olmayacak şekilde farklılaştırıldı. */
const SERVICE_SPECIFIC_Q3: Record<string, { q: string; a: string }> = {
  'aidat-takibi': {
    q: 'Aidat ödenmezse yasal süreç nasıl işler?',
    a: 'Ödenmeyen aidatlar için önce yazılı ihtarname gönderilir; ardından 634 sayılı KMK m.20 kapsamında icra takibi başlatılır. Gecikmeler kayıt altında izlenir; süreç yönetim kurulu kararı ve sözleşme kapsamında yürütülür.',
  },
  'guvenlik-yonetimi': {
    q: 'Güvenlik personeli 5188 sayılı Kanun\'a uygun mu?',
    a: 'Güvenlik hizmeti 5188 sayılı Kanun kapsamında izinli ve lisanslı personelle verilmelidir. Sözleşme öncesi şirketin izin belgesini ve personelin kimlik ve sertifika kayıtlarını isteyebilirsiniz.',
  },
  'tesis-yonetimi': {
    q: 'Yıllık işletme projesi ne zaman ve nasıl hazırlanır?',
    a: 'İşletme projesi KMK m.37 kapsamında yıllık gider tahminini içerir ve kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç üç ay içinde geçici proje hazırlar (7579 sayılı Kanun). Gelir-gider tahmini ve demirbaş planı şeffaf biçimde raporlanır.',
  },
  'temizlik-ve-hijyen': {
    q: 'Temizlik hangi sıklıkla yapılır, programa nasıl ulaşırım?',
    a: 'Temizlik takvimi sitenizin büyüklüğüne ve sözleşme kapsamına göre günlük, haftalık veya 2 haftada bir olarak planlanır. Temizlik kayıtları sözleşmede belirlenen sıklıkta yönetime iletilir.',
  },
  'teknik-bakim': {
    q: 'Periyodik bakım raporları nasıl takip edilir?',
    a: 'Her bakım ziyareti sonrası dijital rapor site yönetimine iletilir; asansör, jeneratör ve ortak sistem kayıtları arşivlenir. Anlaşmazlık ya da sigorta durumunda hukuki geçerli belge niteliği taşır.',
  },
  'peyzaj-ve-bahce-bakimi': {
    q: 'Mevsimsel bakım programı nasıl planlanıyor?',
    a: 'İlkbahar çiçeklendirmesi, yaz sulama ve çim bakımı, sonbahar budama ve kışa hazırlık olarak 4 mevsim ayrı programa alınır. Sitenizin peyzaj karakterine göre özelleştirilmiş yıllık takvim sunulur.',
  },
  'havuz-bakimi-ve-hijyen': {
    q: 'Havuz suyu kalitesi nasıl kontrol ediliyor?',
    a: 'pH, klor, alkalinite ve bulanıklık değerleri düzenli ölçülür ve kayda alınır. Değerler ilgili mevzuatın aradığı aralığın dışına çıkarsa havuzun kullanıma kapatılması dahil önlemler yönetim kuruluyla birlikte kararlaştırılır.',
  },
  'hasere-ve-dezenfeksiyon': {
    q: 'İlaçlama sonrası sakinlerin dikkat etmesi gerekenler neler?',
    a: 'Havalandırma süresi için ilaçlama firmasının ürün etiketindeki talimat esastır; bu süre geçene kadar ilaçlanan alanlara girilmemesi önerilir. Uygulamadan önce kullanılacak ürünlerin ruhsat bilgisini isteyebilirsiniz.',
  },
  'hukuk-ve-icra-danismanligi': {
    q: 'Aidat icrası ne zaman başlatılır, süreç ne kadar sürer?',
    a: 'İhtarnameye rağmen ödeme yapılmayan durumlarda icra takibi başlatılır. Süreç ve süre; borçlunun itirazına, mahkeme ve icra dairesinin iş yüküne göre değişir, bu nedenle somut bir süre vaadi verilmez.',
  },
};

/** Hizmet×ilçe özel SSS — Q3 her hizmet için benzersiz. */
function serviceDistrictFaqs(serviceName: string, districtName: string, benefit: string, serviceSlug: string) {
  const q3 = SERVICE_SPECIFIC_Q3[serviceSlug] ?? {
    q: `${districtName}'de sözleşme süreci nasıl işliyor?`,
    a: `${districtName}'de ücretsiz keşif randevusu alırsınız; uzman ekibimiz sitenizi yerinde inceleyerek şeffaf ve kalem kalem hazırlanmış bir teklif sunar. Teklif onayı sonrası hemen süreci başlatırız.`,
  };
  return [
    {
      question: `${districtName}'de ${serviceName.toLowerCase()} ne kadar tutar?`,
      answer: `${districtName}'de ${serviceName.toLowerCase()} maliyeti; sitenizin büyüklüğü, ihtiyaç kapsamı ve hizmet sıklığına göre belirlenir. Ücretsiz keşif sonrası kalem kalem, gizli gider içermeyen net bir teklif sunarız.`,
    },
    {
      question: `${districtName}'de ${serviceName.toLowerCase()} hizmetiniz neleri kapsıyor?`,
      answer: `${districtName} genelinde sunduğumuz ${serviceName.toLowerCase()} hizmeti; ${benefit.toLowerCase()} başta olmak üzere sitenizin tüm ihtiyaçlarını profesyonel ekip ve düzenli raporlamayla karşılar.`,
    },
    { question: q3.q, answer: q3.a },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; hizmet: string }>;
}): Promise<Metadata> {
  const { lang, ilce, hizmet } = await params;
  const district = getDistrict(ilce);
  const service = getService(hizmet);
  if (!district || !service) {
    return buildMetadata({
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız sayfa bulunamadı.',
      path: `/bolgeler/${ilce}/${hizmet}`,
      lang,
      noindex: true,
    });
  }
  const neighborhoods = district.neighborhoods.slice(0, 2).join(', ');

  const isAlias = isServiceAlias(hizmet);
  const isFacility = service.slug === 'tesis-yonetimi';
  const isSecurity = service.slug === 'guvenlik-yonetimi';
  const isTechnical = service.slug === 'teknik-bakim';
  const isCleaning = service.slug === 'temizlik-ve-hijyen';
  const isDues = service.slug === 'aidat-takibi';
  const isLegal = service.slug === 'hukuk-danismanligi' || service.slug === 'hukuk-ve-icra-danismanligi';
  const isPool = service.slug === 'havuz-bakimi' || service.slug === 'havuz-bakimi-ve-hijyen';

  let metaTitle = `${district.name} ${service.name} — Profesyonel Yönetim | Alo Yönetim`;
  let metaDesc = `${district.name}'de ${service.name.toLowerCase()}: ${service.summary} ${neighborhoods} başta olmak üzere tüm mahallelerde ücretsiz keşif ve şeffaf teklif.`;
  let serviceKeywords: string[] = [];

  if (hizmet === 'site-yonetimi') {
    metaTitle = `${district.name} Site Yönetimi Şirketleri — Profesyonel Apartman ve Site Yönetimi | Alo Yönetim`;
    metaDesc = `${district.name}'de (${neighborhoods}) 634 sayılı KMK ve 7579 sayılı Kanun çerçevesinde profesyonel site yönetimi, TOKİ ve toplu konut işletmesi, aidat tahsilatı ve işletme projesi. Şeffaf muhasebe ve ücretsiz keşif.`;
    serviceKeywords = [
      `${district.name} site yönetimi`,
      `${district.name} site yönetim`,
      `${district.name} site yönetimleri`,
      `${district.name} site yönetim şirketi`,
      `${district.name} site yönetim şirketleri`,
      `${district.name} site yönetim firmaları`,
      `${district.name} profesyonel site yönetimi`,
      `${district.name} apartman ve site yönetimi`,
      `${district.name} apartman yönetim şirketi`,
      `${district.name} bina yönetim şirketi`,
      `${district.name} site yöneticiliği`,
      `${district.name} kmk site yönetimi`,
      `${district.name} toplu konut yönetimi`,
      `${district.name} toki site yönetimi`,
      ...district.neighborhoods.slice(0, 4).map((n) => `${n} site yönetimi`),
    ];
  } else if (hizmet === 'apartman-yonetimi') {
    metaTitle = `${district.name} Apartman Yönetimi Şirketleri — Profesyonel Apartman Yöneticiliği | Alo Yönetim`;
    metaDesc = `${district.name}'de apartman yönetimi ve yöneticilik hizmetleri: Aidat tahsilatı, asansör periyodik kontrolü, temizlik ve KMK m.34/35 danışmanlığı.`;
    serviceKeywords = [
      `${district.name} apartman yönetimi`,
      `${district.name} apartman yöneticiliği`,
      `${district.name} apartman yönetim şirketi`,
      `${district.name} apartman yönetim şirketleri`,
      `${district.name} bina yönetimi`,
      `${district.name} profesyonel apartman yöneticisi`,
    ];
  } else if (hizmet === 'bina-yonetimi') {
    metaTitle = `${district.name} Bina Yönetimi Şirketleri — Profesyonel Bina İşletmesi | Alo Yönetim`;
    metaDesc = `${district.name} genelinde apartman, bina ve iş merkezleri için KMK çerçevesinde profesyonel yönetim, şeffaf bütçe ve periyodik teknik bakım.`;
    serviceKeywords = [
      `${district.name} bina yönetimi`,
      `${district.name} bina yönetim şirketi`,
      `${district.name} bina yöneticiliği`,
    ];
  } else if (hizmet === 'site-yonetim-sirketleri' || hizmet === 'profesyonel-site-yonetimi') {
    metaTitle = `${district.name} Site Yönetim Şirketleri — Teklif Al | Alo Yönetim`;
    metaDesc = `${district.name} genelinde profesyonel site yönetim şirketleri arayan kat malikleri kurullarına KMK uyumlu şeffaf yönetim, 5188 güvenlik ve teknik bakım.`;
    serviceKeywords = [
      `${district.name} site yönetim şirketleri`,
      `${district.name} profesyonel site yönetimi`,
      `${district.name} site yönetim firmaları`,
    ];
  } else if (hizmet === 'asansor-bakimi' || hizmet === 'asansor-ariza') {
    metaTitle = `${district.name} Asansör Bakımı ve Arıza — Acil Servis & Yeşil Etiket | Alo Yönetim`;
    metaDesc = `${district.name}'de asansör arıza ve periyodik bakımı, yeşil etiket (periyodik kontrol) takibi ve jeneratör teknik servisi. Acil müdahale desteği.`;
    serviceKeywords = [
      `${district.name} asansör bakım`,
      `${district.name} asansör arıza`,
      `${district.name} asansör bakım firmaları`,
      `${district.name} asansör periyodik kontrol`,
      `${district.name} asansör yeşil etiket`,
      `${district.name} site teknik bakım`,
      `${district.name} jeneratör periyodik bakım`,
      `${district.name} bina teknik servisi`,
      `${district.name} hidrofor arıza servisi`,
    ];
  } else if (hizmet === 'apartman-temizligi' || hizmet === 'site-temizligi' || hizmet === 'merdiven-temizligi') {
    metaTitle = `${district.name} Apartman & Site Temizliği Şirketleri — Merdiven ve Ortak Alan Temizliği | Alo Yönetim`;
    metaDesc = `${district.name}'de periyodik merdiven yıkama, apartman ortak alan temizliği ve hijyen personeli temini. Ücretsiz keşif.`;
    serviceKeywords = [
      `${district.name} apartman temizliği`,
      `${district.name} site temizlik şirketi`,
      `${district.name} merdiven temizliği`,
      `${district.name} bina temizlik personeli`,
      `${district.name} ortak alan dezenfeksiyonu`,
    ];
  } else if (hizmet === 'guvenlik-sirketleri' || hizmet === 'guvenlik-firmalari' || hizmet === 'ozel-guvenlik' || isSecurity) {
    metaTitle = `${district.name} Güvenlik Şirketleri — 5188 Lisanslı Özel Güvenlik & Hızlı Teklif | Alo Yönetim`;
    metaDesc = `${district.name} güvenlik şirketleri arasında 5188 sayılı Kanun çerçevesinde özel güvenlik, devriye ve kamera izleme koordinasyonu. Ücretsiz keşif ve net teklif.`;
    serviceKeywords = [
      `${district.name} güvenlik şirketleri`,
      `${district.name} özel güvenlik şirketi`,
      `${district.name} güvenlik firması`,
      `${district.name} güvenlik firmaları`,
      `${district.name} site güvenliği`,
      `${district.name} apartman güvenliği`,
      `${district.name} 5188 özel güvenlik`,
      `${district.name} güvenlik personeli`,
      `${district.name} kameralı güvenlik`,
    ];
  } else if (isFacility) {
    metaTitle = `${district.name} Site Yönetimi Şirketleri — Ücretsiz Keşif | Alo Yönetim`;
    metaDesc = `${district.name}'de (${neighborhoods}) profesyonel site yönetimi, bina tesis yönetimi ve entegre tesis işletmesi. 5188 güvenlik, teknik bakım ve dijital aidat takibinde şeffaf çözüm. Hemen keşif alın.`;
    serviceKeywords = [
      `${district.name} tesis yönetimi`,
      `${district.name} tesis yönetim`,
      `${district.name} tesis yönetim şirketi`,
      `${district.name} tesis yönetim şirketleri`,
      `${district.name} tesis yönetim firmaları`,
      `${district.name} tesis yönetimi firmaları`,
      `${district.name} tesis yönetim hizmetleri`,
      `${district.name} entegre tesis yönetimi`,
      `${district.name} dijital tesis yönetimi`,
      `${district.name} bina tesis yönetimi`,
      `${district.name} site yönetimi`,
      `${district.name} apartman yönetimi`,
      `${district.name} bina yönetimi`,
      `${district.name} site yönetim şirketi`,
      `${district.name} profesyonel site yönetimi`,
      `${district.name} toki site yönetimi`,
      `${district.name} kmk site yönetimi`,
      ...district.neighborhoods.slice(0, 4).map((n) => `${n} tesis yönetimi`),
    ];
  } else if (isTechnical) {
    metaTitle = `${district.name} Asansör Bakımı ve Arıza — Acil Servis & Yeşil Etiket | Alo Yönetim`;
    metaDesc = `${district.name}'de (${district.neighborhoods.slice(0, 4).join(', ')}) asansör arıza ve periyodik bakımı, yeşil etiket (periyodik kontrol) takibi, hidrofor, kompanzasyon ve jeneratör teknik servisi. Acil müdahale desteği.`;
    serviceKeywords = [
      `${district.name} asansör bakım`,
      `${district.name} asansör arıza`,
      `${district.name} asansör bakım firmaları`,
      `${district.name} asansör periyodik kontrol`,
      `${district.name} asansör yeşil etiket`,
      `${district.name} site teknik bakım`,
      `${district.name} jeneratör periyodik bakım`,
      `${district.name} bina teknik servisi`,
      `${district.name} hidrofor arıza servisi`,
      `${district.name} kompanzasyon panosu bakımı`,
      ...district.neighborhoods.slice(0, 5).flatMap((n) => [`${n} asansör bakım`, `${n} asansör arıza`, `${n} asansör firması`]),
    ];
  } else if (isCleaning) {
    metaTitle = `${district.name} Site & Apartman Temizliği, Dış Cephe Cam Silimi — Alo Yönetim`;
    metaDesc = `${district.name}'de ortak alan temizliği, dış cephe cam temizliği ve ilaçlama koordinasyonu. Ücretsiz keşif.`;
    serviceKeywords = [
      `${district.name} site temizlik şirketi`,
      `${district.name} apartman temizliği`,
      `${district.name} dış cephe cam silimi`,
      `${district.name} dış cephe cam temizliği`,
      `${district.name} site böcek ilaçlama`,
      `${district.name} otopark zemin yıkama`,
    ];
  } else if (isDues) {
    metaTitle = `${district.name} Aidat Takibi & KMK 634 İcra Tahsilatı — Alo Yönetim`;
    metaDesc = `${district.name}'de ödenmeyen aidatlar için KMK 634 m.20 icra takibi, %5 gecikme tazminatı ve dijital aidat takibi. Ücretsiz danışmanlık alın!`;
    serviceKeywords = [
      `${district.name} aidat takibi`,
      `${district.name} aidat`,
      `${district.name} site aidatı tahsilatı`,
      `${district.name} aidat icra takibi`,
      `${district.name} bina aidat programı`,
      `${district.name} gecikme faizi aidat`,
    ];
  } else if (isLegal) {
    metaTitle = `${district.name} Kat Mülkiyeti Hukuku & Site Yönetimi Avukatı — Alo Yönetim`;
    metaDesc = `${district.name}'de KMK 634 genel kurul iptali, işletme projesi itirazları ve ilamsız icra takipleri için uzman hukuk danışmanlığı. Randevu alın!`;
    serviceKeywords = [
      `${district.name} kat mülkiyeti avukatı`,
      `${district.name} site yönetimi hukuku`,
      `${district.name} işletme projesi itiraz`,
      `${district.name} icra dairesi aidat`,
      `${district.name} kmk 634 dava avukatı`,
    ];
  } else if (isPool) {
    metaTitle = `${district.name} Site Havuz Bakımı, Kimyasal & Hijyen Servisi — Alo Yönetim`;
    metaDesc = `${district.name}'de havuz suyu ölçümü ve kaydı, periyodik filtre temizliği ve havuz kimyasalları yönetimi. Ücretsiz keşif randevusu alın.`;
    serviceKeywords = [
      `${district.name} havuz bakım firması`,
      `${district.name} site havuz bakımı`,
      `${district.name} havuz kimyasalları`,
      `${district.name} havuz suyu analizi`,
    ];
  }

  // Option A: If an alias was accessed, canonical points to canonical service page
  const canonicalPath = `/bolgeler/${district.slug}/${service.slug}`;
  const canonicalUrl = isAlias
    ? localizedUrl(canonicalPath, normalizeLocale(lang))
    : undefined;

  return buildMetadata({
    title: metaTitle,
    description: metaDesc,
    path: isAlias ? canonicalPath : `/bolgeler/${ilce}/${hizmet}`,
    canonicalUrl,
    lang,
    ogImageType: 'local',
    keywords: [
      ...serviceKeywords,
      ...service.keywords.map((k) => `${k} ${district.name}`),
      `${district.name} ${service.name.toLowerCase()}`,
      `${district.name} tesis yönetimi`,
    ],
  });
}

export default async function ServiceDistrictPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; hizmet: string }>;
}) {
  const { lang, ilce, hizmet } = await params;
  const district = getDistrict(ilce);
  const service = getService(hizmet);
  if (!district && service) {
    const fixed = resolveLegacyDistrictSlug(ilce);
    if (fixed) permanentRedirect(localePath(`/bolgeler/${fixed}/${service.slug}`, lang));
  }
  if (!district || !service) notFound();

  const isAlias = isServiceAlias(hizmet);
  const path = `/bolgeler/${district.slug}/${service.slug}`;
  const isFacility = service.slug === 'tesis-yonetimi';
  const isSecurity = service.slug === 'guvenlik-yonetimi';
  const isTechnical = service.slug === 'teknik-bakim';
  const isCleaning = service.slug === 'temizlik-ve-hijyen';

  const synthesizedDistrictFaq = isFacility ? synthesizeDistrictFacilityFaq(district.slug) : null;
  const localBrief = LOCAL_BRIEF_SERVICES.has(hizmet) || LOCAL_BRIEF_SERVICES.has(service.slug) ? getDistrictLocalBrief(district.slug) : null;
  const baseFaqs = (isFacility && synthesizedDistrictFaq)
    ? synthesizedDistrictFaq.faqs.map(f => ({ question: f.question, answer: f.answer }))
    : serviceDistrictFaqs(service.name, district.name, service.benefits[0], service.slug);
  const officialHood = getOfficialNeighborhoods(district.slug);
  const sameSideDistricts = DISTRICTS.filter((d) => d.side === district.side && d.slug !== district.slug);
  const slaForSide = district.side === 'Anadolu' ? FACTS.emergencyResponse.anatolian : FACTS.emergencyResponse.european;
  // Faz 23: GSC'deki ilçe bazlı güvenlik ve mahalle bazlı asansör sorguları için ek SSS (DistrictAiOverviewSeo şemasına da akar).
  const intentFaqs = isSecurity
    ? [
        {
          question: `${district.name} güvenlik şirketi seçerken nelere dikkat edilmeli?`,
          answer: `${district.name} için özel güvenlik şirketi seçerken 5188 sayılı Kanun kapsamındaki faaliyet izni, sahadaki her görevlinin geçerli ÖGG kimlik kartı, sitenin Valilik özel güvenlik izni (ÖGİ), SGK ve kıdem tazminatı sorumluluğunun sözleşmede şirkete ait olması ile vardiya ve devriye kayıtlarının düzenli raporlanması kontrol edilmelidir.`,
        },
        {
          question: `${district.name} sitelerinde özel güvenlik için Valilik izni gerekir mi?`,
          answer: `Evet. 5188 sayılı Kanun uyarınca bir sitenin özel güvenlik şirketinden hizmet alabilmesi için İl Özel Güvenlik Komisyonu kararıyla Valilik izni alınması gerekir. Başvuru dosyası genellikle site yönetimi ve hizmet verecek şirket birlikte hazırlar.`,
        },
      ]
    : isTechnical
      ? [
          {
            question: `${district.name} genelinde asansör arızasında ne yapılmalı?`,
            answer: `Kabinde mahsur kalan varsa önce asansör içindeki acil çağrı butonu ve 112 kullanılmalı; ardından bakım firmasının arıza hattına kayıt açılmalıdır. Yazılı SLA kapsamındaki acil müdahale hedefimiz (${district.side} Yakası) ${slaForSide}. Arıza ve onarım kayıtları yönetime raporlanır.`,
          },
          {
            question: `${district.name} asansör yeşil etiket (periyodik kontrol) ne zaman yapılır?`,
            answer: `Asansörler yılda bir kez A tipi muayene kuruluşunca periyodik kontrolden geçirilir. Yeşil etiket uygunluğu; mavi ve sarı etiket giderilmesi gereken kusurları; kırmızı etiket ise asansörün kullanıma kapatılması gerektiğini gösterir.`,
          },
        ]
      : [];
  const faqs = localBrief
    ? [...baseFaqs, ...intentFaqs, ...localBrief.faq.map(([question, answer]) => ({ question, answer }))]
    : [...baseFaqs, ...intentFaqs];

  let pageHeaderTitle = `${service.name} — ${district.name}`;
  let pageHeaderDesc = `${district.name} ve mahallelerinde profesyonel ${service.name.toLowerCase()} hizmeti.`;

  if (hizmet === 'site-yonetimi') {
    pageHeaderTitle = `${district.name} Site Yönetimi Şirketleri — Profesyonel Apartman ve Site Yönetimi`;
    pageHeaderDesc = `${district.name} genelinde 634 sayılı KMK çerçevesinde profesyonel site yönetimi, aidat takibi ve şeffaf işletme projesi. Ücretsiz keşif ve net teklif.`;
  } else if (hizmet === 'apartman-yonetimi') {
    pageHeaderTitle = `${district.name} Apartman Yönetimi Şirketleri — Profesyonel Apartman Yöneticiliği`;
    pageHeaderDesc = `${district.name} apartmanları için dışarıdan profesyonel yöneticilik, KMK m.34/35 idari ve mali yönetim, periyodik asansör/merdiven bakımı ve şeffaf aidat takibi.`;
  } else if (hizmet === 'bina-yonetimi') {
    pageHeaderTitle = `${district.name} Bina Yönetimi Şirketleri — Profesyonel Bina İşletmeciliği`;
    pageHeaderDesc = `${district.name} genelinde apartman, bina ve iş merkezleri için KMK çerçevesinde profesyonel yönetim, şeffaf bütçe ve periyodik teknik bakım.`;
  } else if (hizmet === 'site-yonetim-sirketleri' || hizmet === 'profesyonel-site-yonetimi') {
    pageHeaderTitle = `${district.name} Site Yönetim Şirketleri `;
    pageHeaderDesc = `${district.name} genelinde 634 sayılı KMK çerçevesinde profesyonel site ve tesis yönetimi, şeffaf muhasebe ve 5188 güvenlik.`;
  } else if (hizmet === 'asansor-bakimi' || hizmet === 'asansor-ariza') {
    pageHeaderTitle = `${district.name} Asansör Bakımı ve Arıza — Acil Servis & Yeşil Etiket`;
    pageHeaderDesc = `${district.name} genelinde asansör periyodik bakımı, yeşil etiket (periyodik kontrol) takibi, acil müdahale ve revizyon desteği.`;
  } else if (hizmet === 'apartman-temizligi' || hizmet === 'site-temizligi' || hizmet === 'merdiven-temizligi') {
    pageHeaderTitle = `${district.name} Apartman & Site Temizlik Şirketleri`;
    pageHeaderDesc = `${district.name} apartman ve siteleri için periyodik merdiven yıkama, bina içi dezenfeksiyon ve güvenilir temizlik personeli.`;
  } else if (hizmet === 'guvenlik-sirketleri' || hizmet === 'guvenlik-firmalari' || hizmet === 'ozel-guvenlik' || isSecurity) {
    pageHeaderTitle = `${district.name} Güvenlik Şirketleri — 5188 Lisanslı Özel Güvenlik ve Koruma`;
    pageHeaderDesc = `${district.name} genelinde 5188 sayılı Kanun çerçevesinde özel güvenlik personeli, devriye ve kamera izleme koordinasyonu.`;
  } else if (isFacility) {
    pageHeaderTitle = `${district.name} Profesyonel Tesis Yönetimi & Site İşletmeciliği`;
    pageHeaderDesc = `${district.name} genelinde 634 sayılı KMK çerçevesinde profesyonel tesis yönetimi, 5188 lisanslı güvenlik, teknik bakım ve şeffaf aidat muhasebesi.`;
  } else if (isTechnical) {
    pageHeaderTitle = `${district.name} Asansör Bakımı, Arıza Müdahalesi & Bina Teknik Servis`;
    pageHeaderDesc = `${district.name} genelinde asansör periyodik bakımı, yeşil etiket (periyodik kontrol) takibi, jeneratör ve kompanzasyon teknik işletmeciliği.`;
  } else if (isCleaning) {
    pageHeaderTitle = `${district.name} Apartman & Site Temizlik Şirketleri`;
    pageHeaderDesc = `${district.name} siteleri ve apartmanları için blok kat temizliği, dış cephe cam temizliği ve ilaçlama koordinasyonu.`;
  }

  const breadcrumbName = hizmet === 'site-yonetimi'
    ? `${district.name} Site Yönetimi`
    : hizmet === 'apartman-yonetimi'
    ? `${district.name} Apartman Yönetimi`
    : (hizmet === 'asansor-bakimi' || hizmet === 'asansor-ariza')
    ? `${district.name} Asansör Bakımı`
    : (hizmet === 'apartman-temizligi' || hizmet === 'site-temizligi' || hizmet === 'merdiven-temizligi')
    ? `${district.name} Apartman Temizliği`
    : (hizmet === 'guvenlik-sirketleri' || hizmet === 'guvenlik-firmalari' || hizmet === 'ozel-guvenlik' || isSecurity)
    ? `${district.name} Güvenlik Şirketleri`
    : isFacility
    ? `${district.name} Tesis Yönetimi`
    : isTechnical
    ? `${district.name} Teknik Bakım`
    : isCleaning
    ? `${district.name} Site Temizliği`
    : service.shortName;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
    { name: district.name, url: `/bolgeler/${district.slug}` },
    { name: breadcrumbName, url: path },
  ]);

  const serviceLd = localServiceSchema({
    serviceType: isFacility
      ? 'Entegre Tesis ve Mülk Yönetimi'
      : isSecurity
      ? 'Özel Güvenlik ve Site Emniyeti'
      : isTechnical
      ? 'Teknik Bakım ve Mühendislik'
      : isCleaning
      ? 'Site ve Endüstriyel Temizlik'
      : service.name,
    areaName: district.name,
    path,
    description: service.summary,
  });

  const enhancedServiceLd = {
    ...serviceLd,
    ...(isFacility
      ? {
          category: 'Entegre Tesis Yönetimi',
          hasCredential: ORG_CREDENTIALS,
        }
      : {
          isSubServiceOf: {
            '@type': 'Service',
            '@id': `${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi#service`,
            name: `${district.name} Tesis Yönetimi`,
            url: `${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi`,
            category: 'Entegre Tesis Yönetimi',
          },
          isPartOf: {
            '@id': `${BASE_URL}${service.pillar}#service`,
          },
        }),
  };

  const businessLd = localBusinessAreaSchema({
    areaName: district.name,
    geo: district.geo,
    url: path,
  });
  const pageLd = webPageSchema({
    name: pageHeaderTitle,
    description: isAlias ? pageHeaderDesc : service.summary,
    path,
    speakableSelectors: ['h1', '.tldr', '#district-service-instant-answer-text'],
  });

  const isSiteManagement = service.slug === 'site-yonetimi';
  const districtReferences = REAL_REFERENCES.filter((r) => r.district === district.name);
  const districtFacilityGraphLd = isFacility || isSiteManagement
    ? buildDistrictFacilityGraphSchema({
        districtSlug: district.slug,
        districtName: district.name,
        lang,
        pageTitle: pageHeaderTitle,
        pageDescription: pageHeaderDesc,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
        serviceSlug: isSiteManagement ? 'site-yonetimi' : 'tesis-yonetimi',
      })
    : null;

  const securityServiceLd = isSecurity
    ? districtSecurityServiceSchema({
        districtName: district.name,
        path,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
      })
    : null;

  const technicalServiceLd = isTechnical
    ? districtTechnicalServiceSchema({
        districtName: district.name,
        path,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
      })
    : null;

  const cleaningServiceLd = isCleaning
    ? districtCleaningServiceSchema({
        districtName: district.name,
        path,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
      })
    : null;

  const authorityLd = isFacility ? generateVerifiedAuthorityGraph() : null;

  const jsonLdData = districtFacilityGraphLd
    ? districtFacilityGraphLd
    : [
        pageLd,
        breadcrumbLd,
        enhancedServiceLd,
        businessLd,
        ...(authorityLd ? [authorityLd] : []),
        ...(securityServiceLd ? [securityServiceLd] : []),
        ...(technicalServiceLd ? [technicalServiceLd] : []),
        ...(cleaningServiceLd ? [cleaningServiceLd] : []),
      ];

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={jsonLdData} />
      <PageHeader
        title={pageHeaderTitle}
        description={pageHeaderDesc}
      />

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-14">
        {/* TL;DR (AI/snippet için) */}
        <TldrBlock>
          {isFacility ? (
            `${district.name}'de 634 sayılı KMK uyumlu profesyonel site ve tesis yönetimi için Alo Yönetim; şeffaf bütçe ve işletme projesi, 5188 lisanslı güvenlik, teknik bakım ve hijyen hizmeti sunar. Ücretsiz tesis keşfi için: 0216 550 48 48.`
          ) : isSecurity ? (
            `${district.name}'de 5188 sayılı Kanun kapsamında site ve tesis güvenliği için Alo Yönetim; 5188 kapsamında lisanslı güvenlik personeli ve kamera izleme sistemleriyle hizmet verir. Ücretsiz güvenlik keşfi için: 0216 550 48 48.`
          ) : isTechnical ? (
            `${district.name}'de bina ve site teknik işletmesi için Alo Yönetim; asansör bakımı, jeneratör kontrolleri, kompanzasyon takibi ve hidrofor kontrolü sunar. İletişim: 0216 550 48 48.`
          ) : isCleaning ? (
            `${district.name}'de profesyonel site ve bina temizliği için Alo Yönetim; kat koridoru temizliği, asansör dezenfeksiyonu, cam silimi ve ilaçlama hizmetleri sunar: 0216 550 48 48.`
          ) : (
            `${district.name}'de ${service.name.toLowerCase()} için Alo Yönetim; ${service.benefits[0].toLowerCase()} başta olmak üzere profesyonel ekiple hizmet verir. Ücretsiz keşif sonrası şeffaf, gizli gider içermeyen teklif sunulur. İletişim: 0216 550 48 48.`
          )}
        </TldrBlock>

        {/* Google AI Overviews & SGE Doğrulanmış Yerel Hizmet Özeti */}
        <DistrictAiOverviewSeo
          districtName={district.name}
          districtSlug={district.slug}
          side={district.side}
          slaTarget={district.side === 'Anadolu' ? FACTS.emergencyResponse.anatolian : FACTS.emergencyResponse.european}
          neighborhoods={district.neighborhoods}
          localNeeds={district.localNeeds}
          referenceCount={districtReferences.length}
          serviceName={service.name}
          serviceSlug={service.slug}
          extraFaqs={faqs}
        />

        {/* Giriş — hizmet + ilçe bağlamı (özgün) */}
        <div className="flex flex-col gap-5 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            {isFacility
              ? `${district.name}'de 634 Sayılı KMK Uyumlu Profesyonel Tesis Yönetimi`
              : isSecurity
              ? `${district.name}'de 5188 Lisanslı Güvenlik Şirketleri Arasında Neden Alo Yönetim?`
              : isTechnical
              ? `${district.name} Sitelerinde Asansör ve Teknik Bakım`
              : isCleaning
              ? `${district.name}'de Apartman ve Site Temizlik Hizmetleri`
              : service.name}
          </h2>
          <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
            {isFacility ? (
              <>
                {district.name} genelindeki sitelerde, rezidanslarda ve plazalarda Kat Mülkiyeti Kanunu&apos;na tam uygun şeffaf bütçe yönetimi, yasal işletme projesi, 5188 lisanslı güvenlik ve teknik işletme hizmeti sunuyoruz. İstanbul geneli kurumsal standartlarımız için <Link href="/hizmetler/tesis-yonetimi" className="text-slate-600 dark:text-slate-400 font-semibold underline hover:text-slate-800">entegre tesis yönetimi</Link> çözümlerimizi inceleyebilirsiniz.
              </>
            ) : isSecurity ? (
              <>
                {district.name} genelindeki sitelerde, rezidanslarda ve iş merkezlerinde 5188 sayılı Kanun çerçevesinde özel güvenlik hizmetini planlıyor ve koordine ediyoruz. 2009'dan beri faaliyet gösteriyoruz; sözleşme öncesinde izin ve personel belgelerini talep edebilirsiniz. Tüm operasyonlarımızı <Link href="/hizmetler/tesis-yonetimi" className="text-slate-600 dark:text-slate-400 font-semibold underline hover:text-slate-800">profesyonel tesis yönetimi</Link> altyapısıyla koordine ediyoruz.
              </>
            ) : isTechnical ? (
              <>
                {district.name} sitelerinin kritik mekanik ve elektrik altyapısını; asansör periyodik bakımı, yeşil etiket (periyodik kontrol) takibi, jeneratör ve kompanzasyon kontrolleriyle yönetiyoruz. Teknik altyapı hizmetlerimiz <Link href="/hizmetler/tesis-yonetimi" className="text-slate-600 dark:text-slate-400 font-semibold underline hover:text-slate-800">tesis yönetimi firmaları</Link> standartlarında yürütülür; acil durum müdahalesi sözleşmedeki yazılı hedefe göre planlanır.
              </>
            ) : isCleaning ? (
              <>
                {district.name} apartman ve sitelerinde kat koridoru temizliğinden dış cephe cam temizliğine ve ilaçlama koordinasyonuna kadar hijyen hizmetlerini planlıyoruz. Temizlik operasyonlarımız kurumsal <Link href="/hizmetler/tesis-yonetimi" className="text-slate-600 dark:text-slate-400 font-semibold underline hover:text-slate-800">tesis yönetimi</Link> şeffaflığı ve periyodik kontrol listeleriyle izlenir.
              </>
            ) : (
              service.summary
            )}
          </p>
          <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
            {district.intro} Bu nedenle {district.name}&apos;de {service.name.toLowerCase()} hizmetimizi,
            özellikle <strong>{district.localNeeds[0].toLowerCase()}</strong> ihtiyacını gözeterek
            planlıyoruz. {district.neighborhoods.slice(0, 3).join(', ')} başta olmak üzere ilçenin
            tüm mahallelerinde yerinde hizmet veriyoruz.
          </p>
        </div>

        {/* Yerel özet: mahalle tablosu + sık karşılaşılan iki durum (ilçe rehberinden) */}
        {localBrief && (
          <div className="flex flex-col gap-6 max-w-4xl">
            <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
              {district.name} mahalle mahalle: yönetimde öne çıkanlar
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                    <th className="p-4">Mahalle</th>
                    <th className="p-4">Tipik yapı</th>
                    <th className="p-4">Öne çıkan konular</th>
                  </tr>
                </thead>
                <tbody>
                  {localBrief.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-[var(--color-outline)]/40 align-top">
                      <td className="p-4 font-semibold text-[var(--color-primary)]">{r[0]}</td>
                      <td className="p-4 text-[var(--color-secondary)]">{r[1]}</td>
                      <td className="p-4 text-[var(--color-secondary)]">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-4">
              {localBrief.scenarios.map(([q, a]) => (
                <div key={q} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6">
                  <h3 className="font-bold text-[var(--color-primary)] mb-2">{q}</h3>
                  <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--color-secondary)]">
              Daha fazlası için{' '}
              <Link href={`/blog/${localBrief.guideSlug}`} className="font-semibold text-[var(--color-primary)] hover:underline">
                {district.name} site ve apartman yönetimi rehberini
              </Link>{' '}
              okuyabilirsiniz.
            </p>
          </div>
        )}

        {/* Tesis Yönetimi Hizmeti için Özel Denetim Matrisi & Radar & Hukuk Jeneratörü & B2B Şartname & Silo Ağı */}
        {isFacility && (
          <div className="flex flex-col gap-12">
            <FacilityLegalTemplateGeneratorSeo />

            {/* B2B Tesis Şartnamesi (RFP) İndirme Modalı */}
            <div className="bg-[var(--color-surface)] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                {district.name} B2B Tesis Şartnamesi
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3 mb-2">
                {district.name} Siteleri İçin Profesyonel Tesis Yönetim Şartnamesi İndirin
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] max-w-2xl mx-auto mb-6">
                {district.name} genelindeki siteler, rezidanslar ve ticari binalar için KMK m.34 divan protokolü, 5188 güvenlik planı ve teknik bakım şartname taslağını ücretsiz edinin.
              </p>
              <FacilityRfpDownloadModalSeo />
            </div>

            {/* 5'li Alt Sektör Silo Ağı Çapraz Gezintisi */}
            <FacilitySubSectorCrossNav />
          </div>
        )}

        {/* Güvenlik Hizmeti için Özel Rozetler & Denetim Matrisi */}
        {isSecurity && (
          <div className="flex flex-col gap-12">
            <SecurityLegalTemplateGeneratorSeo />
          </div>
        )}

        {/* Faz 23: İlçe bazlı güvenlik şirketi aramaları (Esenyurt, Büyükçekmece, Arnavutköy, Silivri, Çatalca...) */}
        {isSecurity && (
          <section
            aria-labelledby="ilce-guvenlik-agi"
            className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 flex flex-col gap-5"
          >
            <h2 id="ilce-guvenlik-agi" className="text-xl font-bold text-[var(--color-primary)]">
              {district.name} Güvenlik Şirketi Seçerken Kontrol Listesi
            </h2>
            <ul className="list-disc pl-6 flex flex-col gap-2 text-sm text-[var(--color-secondary)] leading-relaxed">
              <li>Şirketin İçişleri Bakanlığı&apos;ndan alınmış güncel <strong>5188 sayılı Kanun faaliyet izni</strong> bulunmalı.</li>
              <li>Sitenizin özel güvenlik hizmeti alabilmesi için <Link href="/sozluk/ozel-guvenlik-izni-ogi" className="underline font-semibold">Valilik özel güvenlik izni (ÖGİ)</Link> alınmalı.</li>
              <li>Sahadaki her görevlinin geçerli <Link href="/sozluk/ogg-karti-ozel-guvenlik-gorevlisi-kimlik-karti" className="underline font-semibold">ÖGG kimlik kartı</Link> olmalı; personel değişiminde yeni kart kontrol edilmeli.</li>
              <li>SGK, kıdem ve ihbar tazminatı sorumluluğunun şirkette olduğu sözleşmede açıkça yazılmalı.</li>
              <li>Vardiya devir tutanakları, devriye kayıtları ve <Link href="/sozluk/nizamiye-guvenlik-protokolu" className="underline font-semibold">nizamiye takip sistemi</Link> raporları yönetime düzenli sunulmalı.</li>
            </ul>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
              Kurumsal güvenlik, ekip hazırlığı ve yakın koruma hizmetleri grup markamız <strong>Alo Güvenlik</strong> tarafından,
              site ve tesis yönetimiyle aynı plan üzerinde yürütülür.
            </p>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-tertiary)] mb-3">
                {district.side} Yakası Özel Güvenlik Şirketleri — İlçe Bazlı Hizmet Ağı
              </h3>
              <div className="flex flex-wrap gap-2">
                {sameSideDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/bolgeler/${d.slug}/guvenlik-yonetimi`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/50 text-[var(--color-primary)] hover:border-slate-500/60 transition-colors"
                  >
                    {d.name} Güvenlik Şirketleri
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Teknik Bakım Hizmeti için Özel Denetim Matrisi & Radar */}
        {isTechnical && (
          <div className="flex flex-col gap-12">
          </div>
        )}

        {/* Faz 23: Mahalle bazlı asansör bakım/arıza aramaları (Bakırköy Şenlikköy, Basınköy, Florya; Küçükçekmece; Avcılar...) */}
        {isTechnical && officialHood && (
          <section
            aria-labelledby="mahalle-asansor-agi"
            className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 flex flex-col gap-4"
          >
            <h2 id="mahalle-asansor-agi" className="text-xl font-bold text-[var(--color-primary)]">
              {district.name} Mahallelerinde Asansör Bakım ve Arıza Servisi
            </h2>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
              {district.name} ilçesinin {officialHood.count} mahallesinin tamamında aylık periyodik asansör bakımı, arıza müdahalesi ve
              yıllık periyodik kontrol (<Link href="/sozluk/asansor-kirmizi-sari-mavi-yesil-etiket" className="underline font-semibold">yeşil, mavi, sarı, kırmızı etiket</Link>)
              hazırlığı koordine edilir. Yazılı SLA kapsamındaki acil müdahale hedefi ({district.side} Yakası): {slaForSide}.
            </p>
            <ul className="flex flex-wrap gap-2">
              {[...officialHood.neighborhoods, ...officialHood.popularSemts].map((n) => (
                <li
                  key={n}
                  className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/50 text-[var(--color-secondary)]"
                >
                  {n} asansör bakım ve arıza
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Temizlik ve Hijyen Hizmeti için Çizelge Oluşturucu & Denetim Matrisi */}
        {isCleaning && (
          <div className="flex flex-col gap-12">
            <CleaningScheduleGeneratorSeo districtName={district.name} />
          </div>
        )}

        {/* Faydalar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {service.benefits.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-5"
            >
              <Icon name="check_circle" className="text-slate-600 shrink-0" />
              <span className="text-sm text-[var(--color-secondary)] font-medium">{b}</span>
            </div>
          ))}
        </div>

        {/* Yerel SSS */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
            {district.name} {service.shortName} — Sıkça Sorulan Sorular
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <div
                key={f.question}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6"
              >

                <h3 className="font-bold text-[var(--color-primary)] mb-2">{f.question}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center text-center gap-6 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            {district.name}&apos;de {service.shortName.toLowerCase()} için teklif alın
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <QuoteCtaButton className="bg-[var(--color-primary)] text-[var(--color-surface)] font-bold py-3.5 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-md">
              Ücretsiz Teklif Al
            </QuoteCtaButton>
            <a
              href={`tel:${ORG_PHONE}`}
              className="border border-[var(--color-outline)]/60 text-[var(--color-primary)] bg-[var(--color-surface-variant)] font-bold py-3.5 px-8 rounded-xl hover:bg-slate-200/60 dark:hover:bg-[var(--color-outline)] transition-colors"
            >
              Hemen Ara: 0216 550 48 48
            </a>
          </div>
        </div>

        {/* İç linkler: pillar + diğer hizmetler + ilçe + komşu ilçe mesh */}
        <div className="flex flex-col gap-6 pt-4 border-t border-[var(--color-outline)]/40">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[var(--color-secondary)]">
              Ana Hizmet Merkezi:{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-slate-900 dark:text-white font-bold hover:underline">
                İstanbul Profesyonel Tesis Yönetimi ve Entegre Tesis İşletmeciliği
              </Link>{' '}
              ·{' '}
              <Link href={service.pillar} className="text-slate-900 dark:text-white font-semibold hover:underline">
                {service.name} hizmetimiz
              </Link>{' '}
              ·{' '}
              <Link href={`/bolgeler/${district.slug}`} className="text-slate-900 dark:text-white font-semibold hover:underline">
                {district.name} tüm hizmetler
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{district.name} Diğer Hizmetlerimiz</h3>
            <div className="flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/bolgeler/${district.slug}/${s.slug}`}
                  className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-full px-4 py-1.5 text-xs font-semibold text-[var(--color-primary)] hover:border-slate-900 dark:hover:border-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  {s.shortName} — {district.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Komşu İlçelerde Tesis Yönetimi</h3>
            <div className="flex flex-wrap gap-2">
              {getAdjacentDistrictMeshLinks(district.slug, lang).map((adj) => (
                <Link
                  key={adj.url}
                  href={adj.url}
                  className="bg-[var(--color-surface)] border border-slate-500/20 text-slate-600 dark:text-slate-400 rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-950/30 transition-colors"
                >
                  {adj.anchorText}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
