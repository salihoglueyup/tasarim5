import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import {
  DomainPillar,
  getKeywordsByPillar,
  getPillarTitleTemplate,
  getPillarDescriptionTemplate
} from './domainKeywordsTaxonomy';

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
    const title = getPillarTitleTemplate(pillar, district.name);
    const description = getPillarDescriptionTemplate(pillar, district.name);
    const canonicalPath = `/bolgeler/${district.slug}/tesis-yonetimi`;
    const targetKeyword = pillar === 'facility' ? `${district.name} tesis yönetimi` : `${district.name} site yönetimi`;
    const ogServiceTitle = pillar === 'facility' ? 'Entegre Tesis Yönetimi' : 'Site ve Tesis Yönetimi';
    const ogImageUrl = `${BASE_URL}/api/og?district=${encodeURIComponent(district.name)}&service=${encodeURIComponent(ogServiceTitle)}&title=${encodeURIComponent(title)}&rating=${encodeURIComponent('★ 4.9 · ' + district.managedProjects + '+ Proje')}`;

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
        { label: 'Yönetilen Proje', value: `${district.managedProjects}+ Site` },
        { label: 'Ortalama Tasarruf', value: '%30' },
        { label: 'SLA Müdahale', value: '15-25 Dk' },
        { label: 'Tahsilat Başarısı', value: '%99.2' },
      ],
    };
  }

  // Ana Hub Sayfası
  let title = 'Profesyonel Site ve Tesis Yönetimi İstanbul — ISO 41001 & KMK 634 | Alo Yönetim';
  let description = 'İstanbul genelinde 39 ilçede 340+ konut sitesi ve rezidans referansı. ISO 41001 sertifikalı profesyonel site ve tesis yönetimi, 5188 lisanslı güvenlik, teknik bakım ve %99.2 aidat tahsilat garantisi!';
  let targetKeyword = pillar === 'site' ? 'site yönetimi' : 'tesis yönetimi';

  if (pillar === 'site') {
    title = 'Profesyonel Site ve Apartman Yönetimi Şirketi İstanbul | Alo Yönetim';
    description = 'İstanbul genelinde 39 ilçede konut siteleri, apartmanlar ve rezidanslar için 634 sayılı KMK uyumlu profesyonel site yönetimi, şeffaf aidat tahsilatı ve 5188 güvenlik!';
  } else if (pillar === 'facility') {
    title = 'Entegre Tesis Yönetimi İstanbul — ISO 41001 & B2B Kurumsal İşletme | Alo Yönetim';
    description = 'Plaza, iş merkezi, OSB ve endüstriyel tesisler için ISO 41001 standartlarında entegre tesis yönetimi, 7/24 teknik bakım ve enerji optimizasyonu.';
  }

  if (lang === 'en') {
    title = 'Professional Property, Site & Facility Management Istanbul — ISO 41001 | Alo Yönetim';
    description = 'Integrated residential site and facility management across 39 Istanbul districts. ISO 41001 accredited property care, licensed security, and 30% budget savings.';
    targetKeyword = pillar === 'site' ? 'site management istanbul' : 'facility management istanbul';
  } else if (lang === 'ru') {
    title = 'Профессиональное Управление Жилыми Комплексами и Объектами в Стамбуле | Alo Yönetim';
    description = 'Комплексное управление жилыми комплексами и объектами в 39 районах Стамбула. Лицензированная охрана 5188, техническое обслуживание и экономия бюджета до 30%.';
    targetKeyword = 'управление жилыми комплексами стамбул';
  } else if (lang === 'ar') {
    title = 'إدارة المجمعات السكنية والمرافق الاحترافية في إسطنبول — معايير ISO 41001 | Alo Yönetim';
    description = 'إدارة مجمعات سكنية وأبراج في 39 منطقة بإسطنبول. أمن مرخص، صيانة فنية وإدارة مستحقات دقيقة بنسبة تحصيل 99.2% وتوفير 30% بالميزانية.';
    targetKeyword = 'إدارة المجمعات السكنية اسطنبول';
  }

  const canonicalPath = '/hizmetler/tesis-yonetimi';
  const ogImageUrl = `${BASE_URL}/api/og?service=${encodeURIComponent('Site ve Tesis Yönetimi')}&title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('ISO 41001 Standartlarında 39 İlçede Entegre Yönetim')}&rating=${encodeURIComponent('★ 4.9 · 340+ Referans Proje')}`;

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
    'ISO 41001 tesis yönetimi',
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
      { label: 'Toplam Referans', value: '340+ Site & Tesis' },
      { label: 'Ortalama Bütçe Tasarrufu', value: '%30' },
      { label: 'Acil Müdahale SLA', value: '15-25 Dk' },
      { label: 'Tahsilat Başarısı', value: '%99.2' },
    ],
  };
}
