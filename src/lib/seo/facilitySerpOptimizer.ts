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
    const title = `${district.name} Tesis Yönetimi & Site Yönetimi — %30 Aidat Tasarrufu & 5188 Güvenlik | Alo Yönetim`;
    const description = `${district.name} genelinde site, apartman ve rezidanslar için profesyonel tesis yönetimi. KMK 634 aidat icra takibi, 5188 lisanslı güvenlik ve %30 maliyet tasarrufu. 48 saatte ücretsiz teklif alın!`;
    const canonicalPath = `/bolgeler/${district.slug}/tesis-yonetimi`;
    const ogImageUrl = `${BASE_URL}/api/og?district=${encodeURIComponent(district.name)}&service=${encodeURIComponent('Tesis Yönetimi')}&title=${encodeURIComponent(`${district.name} Tesis Yönetimi & Site Yönetimi`)}&rating=${encodeURIComponent('★ 4.9 · ' + district.managedProjects + '+ Proje')}`;

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
        `${district.name} aidat takibi`,
        `${district.name} 5188 güvenlik`,
        'ISO 41001 tesis yönetimi',
        'KMK 634 işletme projesi',
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
  let title = 'Tesis Yönetimi İstanbul — ISO 41001 Entegre Tesis Yönetim Şirketi | Alo Yönetim';
  let description = 'İstanbul genelinde 39 ilçede 400+ tesis referansı. ISO 41001 sertifikalı profesyonel tesis yönetimi, 5188 güvenlik, teknik bakım ve %30 aidat tasarrufu. Teklif alın!';
  let targetKeyword = 'tesis yönetimi';

  if (lang === 'en') {
    title = 'Professional Facility Management Istanbul — ISO 41001 Certified Services';
    description = 'Integrated facility management across 39 Istanbul districts. ISO 41001 accredited property care, licensed security, technical maintenance, and 30% cost savings.';
    targetKeyword = 'facility management istanbul';
  } else if (lang === 'ru') {
    title = 'Профессиональное Управление Недвижимостью и Объектами в Стамбуле — ISO 41001';
    description = 'Комплексное управление жилыми и коммерческими объектами в Стамбуле. Лицензированная охрана 5188, техническое обслуживание и экономия бюджета до 30%.';
    targetKeyword = 'управление недвижимостью стамбул';
  } else if (lang === 'ar') {
    title = 'إدارة المرافق والممتلكات المتكاملة في إسطنبول — معايير ISO 41001';
    description = 'إدارة مجمعات سكنية وأبراج تجارية في 39 منطقة في إسطنبول. أمن وحراسة مرخصة، صيانة فنية وإدارة رسوم دقيقة مع توفير 30% في الميزانية.';
    targetKeyword = 'إدارة المرافق اسطنبول';
  }

  const canonicalPath = '/hizmetler/tesis-yonetimi';
  const ogImageUrl = `${BASE_URL}/api/og?service=${encodeURIComponent('Tesis Yönetimi')}&title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('ISO 41001 Standartlarında 39 İlçede Entegre Yönetim')}&rating=${encodeURIComponent('★ 4.9 · 400+ Tesis Referansı')}`;

  return {
    title,
    description,
    targetKeyword,
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
