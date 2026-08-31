import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';

export interface FacilitySerpMeta {
  title: string;
  description: string;
  targetKeyword: string;
  keywords: string[];
  canonicalPath: string;
  ogImageUrl: string;
  kpis: { label: string; value: string }[];
}

/**
 * "Tesis Yönetimi" Arama Niyetine Göre Özel Optimize Edilmiş SERP & CTR Güçlendirici.
 * 
 * Google ve Yandex'te "tesis yönetimi", "istanbul tesis yönetimi" veya "[ilçe] tesis yönetimi"
 * aramalarında en yüksek tıklama oranını (CTR) yakalayacak şekilde dinamik E-E-A-T ve güven sinyalleri üretir.
 */
export function getFacilitySerpMeta(lang = 'tr', districtSlug?: string): FacilitySerpMeta {
  const district = districtSlug ? DISTRICTS.find((d) => d.slug === districtSlug) : null;
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;

  if (district) {
    const title = `${district.name} Tesis Yönetimi & Site Yönetimi — Profesyonel Yönetim Şirketi | Alo Yönetim`;
    const description = `${district.name} genelinde apartman, site ve rezidanslar için KMK 634 uyumlu profesyonel site ve tesis yönetimi. 5188 güvenlik, aidat icra takibi ve %30 maliyet tasarrufu ile 15-25 dk SLA güvencesi!`;
    const canonicalPath = `/bolgeler/${district.slug}/tesis-yonetimi`;
    const ogImageUrl = `${BASE_URL}/api/og?district=${encodeURIComponent(district.name)}&service=${encodeURIComponent('Site ve Tesis Yönetimi')}&title=${encodeURIComponent(`${district.name} Site ve Tesis Yönetimi`)}&rating=${encodeURIComponent('★ 4.9 · ' + district.managedProjects + '+ Proje')}`;

    return {
      title,
      description,
      targetKeyword: `${district.name} site yönetimi`,
      keywords: [
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
        'ISO 41001 tesis yönetimi',
        'KMK 634 işletme projesi',
      ],
      canonicalPath,
      ogImageUrl,
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
  let targetKeyword = 'tesis yönetimi';

  if (lang === 'en') {
    title = 'Professional Property, Site & Facility Management Istanbul — ISO 41001 | Alo Yönetim';
    description = 'Integrated residential site and facility management across 39 Istanbul districts. ISO 41001 accredited property care, licensed security, and 30% budget savings.';
    targetKeyword = 'site management istanbul';
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

  return {
    title,
    description,
    targetKeyword,
    keywords: [
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
    ],
    canonicalPath,
    ogImageUrl,
    kpis: [
      { label: 'Toplam Referans', value: '400+ Tesis' },
      { label: 'Ortalama Bütçe Tasarrufu', value: '%28.4' },
      { label: 'Acil Müdahale SLA', value: '45 Dakika' },
      { label: 'Tahsilat Başarısı', value: '%99.2' },
    ],
  };
}
