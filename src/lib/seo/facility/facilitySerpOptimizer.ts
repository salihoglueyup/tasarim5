import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { FACTS } from '@/lib/facts';
import {
  DomainPillar,
  getKeywordsByPillar,
  getPillarTitleTemplate,
  getPillarDescriptionTemplate
} from '../audits/domainKeywordsTaxonomy';

export interface FacilitySerpMeta {
  title: string;
  description: string;
  targetKeyword: string;
  keywords: string[];
  canonicalPath: string;
  ogImageUrl: string;
  kpis: { label: string; value: string }[];
  pillar: DomainPillar;
}

export interface FacilitySerpOptions {
  lang?: string;
  districtSlug?: string;
  pillar?: DomainPillar;
}

/**
 * Çift Çekirdekli (Dual-Core) SERP & CTR Güçlendirici Motor.
 * 
 * 'site' (Site & Apartman Yönetimi), 'facility' (Entegre Tesis & Plaza) veya
 * 'hybrid' (Çift Kanatlı) arama niyetine göre özel optimize edilmiş meta etiketleri üretir.
 */
export function getFacilitySerpMeta(
  langOrOptions: string | FacilitySerpOptions = 'tr',
  districtSlugParam?: string,
  pillarParam: DomainPillar = 'hybrid'
): FacilitySerpMeta {
  let lang = 'tr';
  let districtSlug = districtSlugParam;
  let pillar: DomainPillar = pillarParam;

  if (typeof langOrOptions === 'object' && langOrOptions !== null) {
    lang = langOrOptions.lang || 'tr';
    districtSlug = langOrOptions.districtSlug;
    pillar = langOrOptions.pillar || 'hybrid';
  } else {
    lang = langOrOptions;
  }

  const district = districtSlug ? DISTRICTS.find((d) => d.slug === districtSlug) : null;
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;

  if (district) {
    let title = getPillarTitleTemplate(pillar, district.name);
    let description = getPillarDescriptionTemplate(pillar, district.name);
    let targetKeyword = pillar === 'facility' ? `${district.name} tesis yönetimi` : `${district.name} site yönetimi`;

    // Faz 157: EN, RU ve AR için kültürel ve yerel arama niyetine göre optimize edilmiş meta etiketleri
    if (lang === 'en') {
      title = `Professional Property & Facility Management in ${district.name}, Istanbul | Alo Yönetim`;
      description = `Integrated residential site and facility management across ${district.name}, Istanbul: licensed 5188 security, technical maintenance, cleaning and dues follow-up. ISO certified.`;
      targetKeyword = `${district.name} property management istanbul`;
    } else if (lang === 'ru') {
      title = `Управление Жилыми Комплексами и Объектами в ${district.name}, Стамбул | Alo Yönetim`;
      description = `Комплексное управление жилыми комплексами и зданиями в районе ${district.name}, Стамбул: лицензированная охрана 5188, техническое обслуживание, уборка и контроль взносов.`;
      targetKeyword = `управление недвижимостью ${district.name.toLowerCase()} стамбул`;
    } else if (lang === 'ar') {
      title = `إدارة المجمعات السكنية والمرافق في ${district.name} إسطنبول | Alo Yönetim`;
      description = `خدمات إدارة المجمعات السكنية والأبراج الاحترافية في منطقة ${district.name} بإسطنبول: أمن مرخص 5188 وصيانة فنية ونظافة ومتابعة المستحقات.`;
      targetKeyword = `إدارة المجمعات ${district.name} اسطنبول`;
    }

    const canonicalPath = `/bolgeler/${district.slug}/tesis-yonetimi`;
    const ogServiceTitle = pillar === 'facility' ? 'Entegre Tesis Yönetimi' : 'Site ve Tesis Yönetimi';
    const ogImageUrl = `${BASE_URL}/api/og?district=${encodeURIComponent(district.name)}&service=${encodeURIComponent(ogServiceTitle)}&title=${encodeURIComponent(title)}`;

    const keywords = [
      `${district.name} site yönetimi`,
      `${district.name} apartman yönetimi`,
      `${district.name} bina yönetimi`,
      `${district.name} tesis yönetimi`,
      `${district.name} profesyonel site yönetimi`,
      `${district.name} site yönetim şirketleri`,
      `${district.name} site yönetim firmaları`,
      `${district.name} site yöneticiliği`,
      `${district.name} aidat takibi`,
      `${district.name} 5188 güvenlik`,
      ...getKeywordsByPillar(pillar).slice(0, 5),
    ];

    return {
      title,
      description,
      targetKeyword,
      keywords,
      canonicalPath,
      ogImageUrl,
      pillar,
      kpis: [
        { label: 'Faaliyet', value: `${FACTS.foundingYear}'dan beri` },
        { label: 'Hizmet Kapsamı', value: `${FACTS.districtCount} İlçe` },
        { label: 'Referans', value: `${FACTS.referenceCount} Kurum` },
        { label: 'Acil Müdahale Hedefi', value: district.side === 'Anadolu' ? FACTS.emergencyResponse.anatolian : FACTS.emergencyResponse.european },
      ],
    };
  }

  // Ana Hub Sayfası
  let title = 'Profesyonel Site ve Tesis Yönetimi İstanbul — KMK 634 | Alo Yönetim';
  let description = 'İstanbul genelinde 39 ilçede ILAS akrediteli ISO belgeli profesyonel site ve tesis yönetimi, 5188 lisanslı güvenlik, teknik bakım ve şeffaf aidat takibi.';
  let targetKeyword = pillar === 'site' ? 'site yönetimi' : 'tesis yönetimi';

  if (pillar === 'site') {
    title = 'Site Yönetim Şirketi İstanbul — KMK 634 Uyumlu | Alo Yönetim';
    description = 'İstanbul genelinde 39 ilçede konut siteleri, apartmanlar ve rezidanslar için 634 sayılı KMK uyumlu profesyonel site yönetimi, şeffaf aidat takibi ve 5188 güvenlik.';
  } else if (pillar === 'facility') {
    title = 'Tesis Yönetimi İstanbul — ILAS Akrediteli ISO Belgeli | Alo Yönetim';
    description = 'Plaza, iş merkezi, OSB ve endüstriyel tesisler için entegre tesis yönetimi, teknik bakım ve işletme yönetimi.';
  }

  if (lang === 'en') {
    title = 'Professional Property, Site & Facility Management Istanbul | Alo Yönetim';
    description = 'Integrated residential site and facility management across 39 Istanbul districts. ILAS-accredited ISO certified property care, licensed security and transparent dues follow-up.';
    targetKeyword = pillar === 'site' ? 'site management istanbul' : 'facility management istanbul';
  } else if (lang === 'ru') {
    title = 'Профессиональное Управление Жилыми Комплексами и Объектами в Стамбуле | Alo Yönetim';
    description = 'Комплексное управление жилыми комплексами и объектами в 39 районах Стамбула. Лицензированная охрана 5188, техническое обслуживание и прозрачный контроль взносов.';
    targetKeyword = 'управление жилыми комплексами стамбул';
  } else if (lang === 'ar') {
    title = 'إدارة المجمعات السكنية والمرافق الاحترافية في إسطنبول | Alo Yönetim';
    description = 'إدارة مجمعات سكنية وأبراج في 39 منطقة بإسطنبول. أمن مرخص وصيانة فنية ومتابعة شفافة للمستحقات.';
    targetKeyword = 'إدارة المجمعات السكنية اسطنبول';
  }

  const canonicalPath = pillar === 'site' ? '/hizmetler/site-yonetimi' : '/hizmetler/tesis-yonetimi';
  const ogImageUrl = `${BASE_URL}/api/og?service=${encodeURIComponent('Site ve Tesis Yönetimi')}&title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('39 İlçede Entegre Tesis ve Site Yönetimi')}`;

  const allKeywords = [
    'site yönetimi',
    'profesyonel site yönetimi',
    'site yönetim şirketi',
    'site yönetim şirketleri',
    'site yönetim firmaları',
    'apartman ve site yönetimi',
    'apartman yöneticiliği',
    'site yöneticiliği',
    'istanbul site yönetimi',
    'tesis yönetimi',
    'entegre tesis yönetimi',
    'bina ve tesis yönetimi',
    'plaza tesis yönetimi',
    'rezidans tesis yönetimi',
    'toplu konut yönetimi',
    'uluslararası tesis yönetimi standartları tesis yönetimi',
    'KMK 634 işletme projesi',
    ...getKeywordsByPillar(pillar).slice(0, 10),
  ];

  return {
    title,
    description,
    targetKeyword,
    keywords: Array.from(new Set(allKeywords)),
    canonicalPath,
    ogImageUrl,
    pillar,
    kpis: [
      { label: 'Faaliyet', value: `${FACTS.foundingYear}'dan beri` },
      { label: 'Hizmet Kapsamı', value: `${FACTS.districtCount} İlçe` },
      { label: 'Referans', value: `${FACTS.referenceCount} Kurum` },
      { label: 'Ekip', value: `~${FACTS.teamSize} Kişi` },
    ],
  };
}
