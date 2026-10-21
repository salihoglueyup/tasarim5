"use client";

import ReferenceBand from '@/components/sections/references/ReferenceBand';
import type { ReferenceSector } from '@/data/realReferences';

export interface ServiceTestimonialItem {
  quote: string;
  author: string;
  role: string;
  project: string;
}

export interface ServiceTestimonialsSharedProps {
  titleKey: string;
  descKey: string;
  testimonials: ServiceTestimonialItem[];
  sectors?: readonly ReferenceSector[];
  slugs?: readonly string[];
  limit?: number;
}

/**
 * Hizmet sayfası anahtarına (titleKey) göre 52 referanslık portföyümüzden
 * o hizmet disipliniyle en doğrudan örtüşen referans seçkisi.
 */
const SERVICE_REFERENCE_MAP: Record<
  string,
  { sectors: readonly ReferenceSector[]; slugs: readonly string[] }
> = {
  // Tesis & Site Yönetimi (FacilityTestimonials)
  testi_dues_title: {
    sectors: ['site', 'is_merkezi', 'ticari'],
    slugs: [
      'dome-residence',
      'innovia-3',
      'kiptas-sahilpark-evleri',
      'ciragan-residence',
      'goztepe-soyak-residence',
      'nef-cekmekoy-camlitepe-sitesi',
      'atlas-is-merkezi',
      'exim-bank',
    ],
  },
  // 5188 Özel Güvenlik (SecurityTestimonials)
  testi_sec_title: {
    sectors: ['kamu', 'saglik', 'ticari', 'turizm'],
    slugs: [
      'irak-konsoloslugu',
      'atasehir-belediyesi',
      'kadikoy-belediyesi',
      'exim-bank',
      'sozcu-gazetesi',
      'vm-medical-park-maltepe',
      'kumresort-hotel',
      'sariyer-spor-kulubu',
    ],
  },
  // Profesyonel Temizlik & Hijyen (CleaningTestimonials)
  testi_clean_title: {
    sectors: ['saglik', 'kamu', 'is_merkezi'],
    slugs: [
      'vm-medical-park-maltepe',
      'yunus-emre-hastanesi',
      'durmusoglu-saglik',
      'vakifbank-umut-cocuklari',
      'aile-ve-sosyal-politikalar-merkezleri',
      'atlas-is-merkezi',
      'atlantis-ticaret-merkezi',
      'fuar-ve-etkinlik-organizasyonlari',
    ],
  },
  // Teknik Bakım, Asansör & Mühendislik (MaintenanceTestimonials)
  testi_maint_title: {
    sectors: ['ticari', 'is_merkezi', 'site'],
    slugs: [
      'iskent-sanayi-sitesi',
      'hursan-geri-donusum',
      'koza-gida',
      'miles-makine',
      'yavuz-metal',
      'adalet-is-merkezi',
      'gecem-dinlence',
      'cagdas-yayincilik',
    ],
  },
  // Aidat Takibi & Bütçe Yönetimi (DuesTestimonials)
  testi_fac_title: {
    sectors: ['site'],
    slugs: [
      'feriha-ozyuva-sitesi',
      'meklim-mimoza-sitesi',
      'meseli-gold-park-sitesi',
      'mim-konaklari-sitesi',
      'palandoken-sitesi',
      'kosuyolu-konaklari',
      'atasehir-konaklari',
      'bagkur-sitesi',
    ],
  },
  // Hukuk & İcra Danışmanlığı (LegalTestimonials)
  testi_legal_title: {
    sectors: ['site', 'ticari'],
    slugs: [
      'site-59',
      'hoby-life-sitesi',
      'greenland-sitesi',
      'camlica-konaklari',
      'koru-sitesi',
      'mega-life-site',
      'ada-city',
      'guner-sitesi',
    ],
  },
  // Peyzaj & Bahçe Bakımı (LandscapeTestimonials)
  testi_land_title: {
    sectors: ['site', 'turizm'],
    slugs: [
      'bizimtepe-villalari',
      'nef-cekmekoy-camlitepe-sitesi',
      'greenland-sitesi',
      'koru-sitesi',
      'camlica-konaklari',
      'kosuyolu-konaklari',
      'mim-konaklari-sitesi',
      'kumresort-hotel',
    ],
  },
  // Havuz Bakımı & Hijyen (PoolTestimonials)
  testi_pool_title: {
    sectors: ['site', 'turizm'],
    slugs: [
      'dome-residence',
      'innovia-3',
      'ciragan-residence',
      'goztepe-soyak-residence',
      'kiptas-sahilpark-evleri',
      'hoby-life-sitesi',
      'kumresort-hotel',
      'bizimtepe-villalari',
    ],
  },
  // Haşere & Biyosidal Dezenfeksiyon (PestControlTestimonials)
  testi_pest_title: {
    sectors: ['saglik', 'kamu', 'ticari'],
    slugs: [
      'koza-gida',
      'vm-medical-park-maltepe',
      'yunus-emre-hastanesi',
      'aile-ve-sosyal-politikalar-merkezleri',
      'vakifbank-umut-cocuklari',
      'sozcu-gazetesi',
      'korkusuz-gazetesi',
      'lotus-organizasyon',
    ],
  },
};

/**
 * Hizmet sayfalarındaki referans şeridi bölümü.
 * Her hizmet sayfasında o hizmetle ilişkili sektör ve kurumlarımızı öne çıkarır.
 */
export default function ServiceTestimonialsShared(props: ServiceTestimonialsSharedProps) {
  const mapped = SERVICE_REFERENCE_MAP[props.titleKey];
  return (
    <ReferenceBand
      limit={props.limit ?? 8}
      sectors={props.sectors ?? mapped?.sectors}
      slugs={props.slugs ?? mapped?.slugs}
    />
  );
}
