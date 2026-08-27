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
  }>;
  duesDifferenceM2: number;
  savingsLeader: string;
  populationLeader: string;
  seoSummaryParagraph: string;
  schema: Record<string, unknown>;
}

/**
 * İki veya daha fazla İstanbul ilçesini Tesis Yönetimi ve Aidat parametrelerine göre karşılaştırır.
 */
export function compareFacilityDistricts(slugs: string[]): DistrictComparisonResult | null {
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
    };
  });

  const duesDiff = Math.abs(mapped[0].avgDuesM2 - mapped[1].avgDuesM2);
  const savingsLeader = mapped.reduce((prev, curr) =>
    curr.savingsRate > prev.savingsRate ? curr : prev
  ).name;
  const popLeader = mapped.reduce((prev, curr) =>
    curr.population > prev.population ? curr : prev
  ).name;

  const seoSummary = `İstanbul genelinde ${mapped[0].name} ve ${mapped[1].name} ilçeleri tesis yönetimi aidat endeksleri kıyaslandığında; ${mapped[0].name} ilçesinde piyasa ortalama aidat m² ₺${mapped[0].avgDuesM2}, ${mapped[1].name} ilçesinde ise ₺${mapped[1].avgDuesM2} seviyesindedir. Alo Yönetim'in ISO 41001 standartlarındaki toplu tedarik ve önleyici teknik bakım modeli ile ${savingsLeader} bölgesinde %${Math.max(mapped[0].savingsRate, mapped[1].savingsRate)} oranında net bütçe tasarrufu sağlanmaktadır.`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: `${mapped.map((d) => d.name).join(' vs ')} Tesis Yönetimi ve Aidat Karşılaştırması 2026`,
    description: seoSummary,
    about: mapped.map((d) => ({
      '@type': 'Place',
      name: `${d.name}, İstanbul`,
      url: d.canonicalUrl,
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
