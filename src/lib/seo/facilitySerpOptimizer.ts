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
    const title = `${district.name} Tesis Yönetimi — ISO 41001 & 5188 Lisanslı Profesyonel Yönetim`;
    const description = `${district.name} genelinde apartman, site, plaza ve rezidanslar için ISO 41001 standartlarında entegre tesis yönetimi. 7/24 güvenlik, şeffaf aidat ve %30 maliyet tasarrufu.`;
    const canonicalPath = `/bolgeler/${district.slug}/tesis-yonetimi`;
    const ogImageUrl = `${BASE_URL}/api/og?district=${encodeURIComponent(district.name)}&service=${encodeURIComponent('Tesis Yönetimi')}&title=${encodeURIComponent(`${district.name} Tesis Yönetimi`)}&rating=${encodeURIComponent('★ 4.9 · ' + district.managedProjects + '+ Proje')}`;

    return {
      title,
      description,
      targetKeyword: `${district.name} tesis yönetimi`,
      keywords: [
        `${district.name} tesis yönetimi`,
        `${district.name} profesyonel site yönetimi`,
        `${district.name} apartman yönetimi`,
        `${district.name} bina yönetimi`,
        `${district.name} tesis yönetim şirketleri`,
        `${district.name} entegre tesis yönetimi`,
        'ISO 41001 tesis yönetimi',
        '5188 güvenlik',
      ],
      canonicalPath,
      ogImageUrl,
      kpis: [
        { label: 'Yönetilen Proje', value: `${district.managedProjects}+ Tesis` },
        { label: 'Ortalama Tasarruf', value: '%28' },
        { label: 'SLA Müdahale', value: '45 Dk' },
        { label: 'Müşteri Memnuniyeti', value: '%98.5' },
      ],
    };
  }

  // Ana Hub Sayfası
  const title = 'Profesyonel Tesis Yönetimi İstanbul — ISO 41001 Standartlarında Entegre Yönetim';
  const description = 'İstanbul genelinde 39 ilçede 400+ tesis referansı. ISO 41001 onaylı entegre tesis yönetimi, 5188 özel güvenlik, teknik bakım, aidat takibi ve %30 bütçe tasarrufu.';
  const canonicalPath = '/hizmetler/tesis-yonetimi';
  const ogImageUrl = `${BASE_URL}/api/og?service=${encodeURIComponent('Tesis Yönetimi')}&title=${encodeURIComponent('Profesyonel Tesis Yönetimi İstanbul')}&subtitle=${encodeURIComponent('ISO 41001 Standartlarında 39 İlçede Entegre Yönetim')}&rating=${encodeURIComponent('★ 4.9 · 400+ Tesis Referansı')}`;

  return {
    title,
    description,
    targetKeyword: 'tesis yönetimi',
    keywords: [
      'tesis yönetimi',
      'profesyonel tesis yönetimi',
      'istanbul tesis yönetimi',
      'entegre tesis yönetimi',
      'tesis yönetim şirketleri',
      'tesis yönetim firmaları',
      'site ve tesis yönetimi',
      'bina ve tesis yönetimi',
      'plaza tesis yönetimi',
      'rezidans tesis yönetimi',
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
