import { getDistrict, getDistrictDues, DISTRICTS, type District } from '@/data/districts';
import { BASE_URL } from '@/lib/seo';

export interface DistrictComparisonResult {
  districts: Array<{
    name: string;
    slug: string;
    side: 'Anadolu' | 'Avrupa';
    population: number;
    avgDuesM2: number;
    aloDuesM2: number;
    savingsRate: number;
    localNeeds: string[];
    managedProjects: number;
    canonicalUrl: string;
    geo?: { lat: number; lng: number };
  }>;
  duesDifferenceM2: number;
  savingsLeader: string;
  populationLeader: string;
  seoSummaryParagraph: string;
  schema: Record<string, unknown>;
}

/**
 * İki veya daha fazla İstanbul ilçesini Tesis Yönetimi ve Aidat parametrelerine göre karşılaştırır.
 * 4 dilde (TR, EN, RU, AR) lokalize özet ve schema.org Table yapısı üretir.
 */
export function compareFacilityDistricts(
  slugs: string[],
  lang: string = 'tr'
): DistrictComparisonResult | null {
  const validDistricts: District[] = [];

  for (const slug of slugs) {
    const d = getDistrict(slug);
    if (d && !validDistricts.some((item) => item.slug === d.slug)) {
      validDistricts.push(d);
    }
  }

  if (validDistricts.length < 2) {
    // Varsayılan Kadıköy ve Beşiktaş kıyaslaması
    const d1 = getDistrict('kadikoy') || DISTRICTS[0];
    const d2 = getDistrict('besiktas') || DISTRICTS[1];
    validDistricts.push(d1, d2);
  }

  const mapped = validDistricts.map((d) => {
    const dues = getDistrictDues(d.slug);
    return {
      name: d.name,
      slug: d.slug,
      side: d.side,
      population: d.population,
      avgDuesM2: dues.avgDuesM2,
      aloDuesM2: dues.aloDuesM2,
      savingsRate: dues.savingsRate,
      localNeeds: d.localNeeds,
      managedProjects: d.managedProjects,
      canonicalUrl: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
      geo: d.geo,
    };
  });

  const duesDiff = Math.abs(mapped[0].avgDuesM2 - mapped[1].avgDuesM2);
  const savingsLeader = mapped.reduce((prev, curr) =>
    curr.savingsRate > prev.savingsRate ? curr : prev
  ).name;
  const popLeader = mapped.reduce((prev, curr) =>
    curr.population > prev.population ? curr : prev
  ).name;
  const maxSavings = Math.max(mapped[0].savingsRate, mapped[1].savingsRate);

  const normalizedLang = (lang || 'tr').toLowerCase();
  let seoSummary = '';
  let schemaName = '';

  switch (normalizedLang) {
    case 'en':
      seoSummary = `Comparing facility management and dues indices for ${mapped[0].name} and ${mapped[1].name} across Istanbul; market average dues per m² is ₺${mapped[0].avgDuesM2} in ${mapped[0].name} and ₺${mapped[1].avgDuesM2} in ${mapped[1].name}. With Alo Yönetim's ISO 41001 certified bulk procurement and preventive maintenance model, ${savingsLeader} achieves a net budget savings of ${maxSavings}%.`;
      schemaName = `${mapped.map((d) => d.name).join(' vs ')} Facility Management & Dues Comparison 2026`;
      break;
    case 'ru':
      seoSummary = `Сравнивая индексы управления объектами и взносов для районов ${mapped[0].name} и ${mapped[1].name} в Стамбуле; средний взнос за м² составляет ₺${mapped[0].avgDuesM2} в ${mapped[0].name} и ₺${mapped[1].avgDuesM2} в ${mapped[1].name}. Благодаря модели оптовых закупок и превентивного обслуживания по стандарту ISO 41001 от Alo Yönetim, в районе ${savingsLeader} достигается чистая экономия бюджета в ${maxSavings}%.`;
      schemaName = `${mapped.map((d) => d.name).join(' vs ')} Сравнение управления объектами и взносов 2026`;
      break;
    case 'ar':
      seoSummary = `مقارنة مؤشرات إدارة المرافق والرسوم لمنطقتي ${mapped[0].name} و ${mapped[1].name} في إسطنبول؛ يبلغ متوسط الرسوم لكل م² ₺${mapped[0].avgDuesM2} في ${mapped[0].name} و ₺${mapped[1].avgDuesM2} في ${mapped[1].name}. مع نموذج المشتريات المجمعة والصيانة الوقائية المعتمد وفق ISO 41001 من Alo Yönetim، يتحقق توفير صافٍ في الميزانية بنسبة ${maxSavings}% في منطقة ${savingsLeader}.`;
      schemaName = `${mapped.map((d) => d.name).join(' vs ')} مقارنة إدارة المرافق والرسوم 2026`;
      break;
    default:
      seoSummary = `İstanbul genelinde ${mapped[0].name} ve ${mapped[1].name} ilçeleri tesis yönetimi aidat endeksleri kıyaslandığında; ${mapped[0].name} ilçesinde piyasa ortalama aidat m² ₺${mapped[0].avgDuesM2}, ${mapped[1].name} ilçesinde ise ₺${mapped[1].avgDuesM2} seviyesindedir. Alo Yönetim'in ISO 41001 standartlarındaki toplu tedarik ve önleyici teknik bakım modeli ile ${savingsLeader} bölgesinde %${maxSavings} oranında net bütçe tasarrufu sağlanmaktadır.`;
      schemaName = `${mapped.map((d) => d.name).join(' vs ')} Tesis Yönetimi ve Aidat Karşılaştırması 2026`;
      break;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: schemaName,
    description: seoSummary,
    about: mapped.map((d) => ({
      '@type': 'LocalBusiness',
      name: `Alo Yönetim ${d.name} Tesis Yönetimi`,
      url: d.canonicalUrl,
      telephone: '+90 216 550 48 48',
      priceRange: '₺₺',
      currenciesAccepted: 'TRY',
      parentOrganization: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Alo Yönetim',
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
      },
      ...(d.geo?.lat && d.geo?.lng
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: d.geo.lat,
              longitude: d.geo.lng,
            },
          }
        : {}),
      address: {
        '@type': 'PostalAddress',
        addressLocality: d.name,
        addressRegion: 'İstanbul',
        addressCountry: 'TR',
      },
    })),
  };

  return {
    districts: mapped,
    duesDifferenceM2: duesDiff,
    savingsLeader,
    populationLeader: popLeader,
    seoSummaryParagraph: seoSummary,
    schema,
  };
}
