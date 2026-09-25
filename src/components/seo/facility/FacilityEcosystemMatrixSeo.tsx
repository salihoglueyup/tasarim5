"use client";

import React from 'react';
import Link from 'next/link';
import JsonLd from '@/components/seo/schema/JsonLd';
import { useLanguage } from '@/context/LanguageContext';

export interface EcosystemService {
  id: string;
  title: string;
  badge: string;
  icon: string;
  path: string;
  description: string;
  metric: string;
  tag: string;
  accentColor: 'blue' | 'indigo' | 'emerald' | 'amber' | 'cyan' | 'purple';
}

export const ECOSYSTEM_SERVICES: EcosystemService[] = [
  {
    id: 'guvenlik',
    title: '5188 Lisanslı Özel Güvenlik',
    badge: 'Valilik & İçişleri Lisanslı',
    icon: 'shield_person',
    path: '/hizmetler/guvenlik-yonetimi',
    description: 'Nizamiye geçiş kontrolü, 7/24 CCTV yapay zeka video analitiği, plaka tanıma sistemi (PTS) ve acil durum tahliye protokolleri.',
    metric: '%100 Valilik Lisansı • 7/24 Devriye',
    tag: 'Güvenlik & Asayiş',
    accentColor: 'blue',
  },
  {
    id: 'teknik-bakim',
    title: 'Kestirimci Teknik Mühendislik',
    badge: 'A Tipi Muayene & MMO',
    icon: 'engineering',
    path: '/hizmetler/teknik-bakim',
    description: 'Asansör yeşil etiket koordinasyonu, senkron jeneratör, hidrofor, yangın sprinkler ve kompanzasyon panosu yönetimi.',
    metric: '45 Dk SLA Müdahale • %0 Reaktif Ceza',
    tag: 'Elektromekanik',
    accentColor: 'cyan',
  },
  {
    id: 'temizlik',
    title: 'TSE 13811 Endüstriyel Temizlik',
    badge: 'Nano-Gümüş Dezenfeksiyon',
    icon: 'cleaning_services',
    path: '/hizmetler/temizlik-ve-hijyen',
    description: 'Blok girişleri, kat holleri, panoramik asansör kabinleri, kapalı otopark zeminleri ve çöp şutlarının hijyen sterilizasyonu.',
    metric: 'Sertifikalı Eko-Kimyasal • Günlük Denetim',
    tag: 'Hijyen & Sanitasyon',
    accentColor: 'emerald',
  },
  {
    id: 'aidat',
    title: 'Şeffaf Bütçe & Aidat Muhasebesi',
    badge: 'KMK Madde 37 Uyumlu',
    icon: 'payments',
    path: '/hizmetler/aidat-takibi',
    description: 'Apsiyon entegrasyonu, 7/24 mobil sakin portali, 3D Secure online kredi kartı tahsilatı ve şeffaf canlı banka hesap dökümü.',
    metric: '%99.2 Yıllık Tahsilat • 0 Bütçe Açığı',
    tag: 'Mali Yönetim',
    accentColor: 'amber',
  },
  {
    id: 'site-yonetimi',
    title: '634 Sayılı KMK Konut Yönetimi',
    badge: 'Kat Mülkiyeti Hukuku',
    icon: 'home_work',
    path: '/hizmetler/site-yonetimi',
    description: 'Kat Malikleri Olağan/Olağanüstü Genel Kurul organizasyonu, divan yönetimi, noter tebliğleri ve komşuluk huzuru garantisi.',
    metric: '150+ Yönetilen Site • 34.000+ Bağımsız Bölüm',
    tag: 'İdari & Hukuki',
    accentColor: 'indigo',
  },
  {
    id: 'hukuk',
    title: 'KMK & İcra Hukuk Teftişi',
    badge: 'İİK m.68 & Sulh Hukuk',
    icon: 'gavel',
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
    description: 'Geciken aidatlara aylık %5 yasal gecikme tazminatı işletimi, ihtarname ve mahkeme kararı aranmaksızın ilamsız icra takibi.',
    metric: '7 Günde Yasal Takip • Tam Hukuki Koruma',
    tag: 'Hukuk Danışmanlığı',
    accentColor: 'purple',
  },
  {
    id: 'peyzaj',
    title: 'Peyzaj & Otomatik Sulama',
    badge: '4 Mevsim Periyodik Bakım',
    icon: 'park',
    path: '/hizmetler/peyzaj-ve-bahce-bakimi',
    description: 'Çim havalandırma, mevsimlik çiçeklendirme, ağaç budama, bitki hastalıklarıyla biyolojik mücadele ve sensörlü sulama altyapısı.',
    metric: '%35 Su Tasarrufu • Ziraat Mühendisi Onaylı',
    tag: 'Çevre & Yeşil Alan',
    accentColor: 'emerald',
  },
  {
    id: 'havuz',
    title: 'Sosyal Tesis & Yüzme Havuzu',
    badge: 'T.C. Sağlık Bakanlığı Onaylı',
    icon: 'pool',
    path: '/hizmetler/havuz-bakimi-ve-hijyen',
    description: 'Açık/kapalı yüzme havuzlarının günlük klor-pH analizi, ters yıkama filtrasyonu, sauna/buhar odası hijyeni ve sertifikalı cankurtaran.',
    metric: 'Günlük Numune Ölçümü • %100 Hijyen Güvencesi',
    tag: 'Sosyal Donatı',
    accentColor: 'cyan',
  },
  {
    id: 'ilaclama',
    title: 'Biyosidal Vektör & Haşere Kontrolü',
    badge: 'Ruhsatlı Biyosidal Ürünler',
    icon: 'bug_report',
    path: '/hizmetler/hasere-ve-dezenfeksiyon',
    description: 'Kapalı otopark, sığınak ve çatı katlarında kemirgen yem istasyonları, hamamböceği jelleme ve insan sağlığına zararsız kokusuz ULV sisleme.',
    metric: 'T.C. Sağlık Bakanlığı Ruhsatlı • Garantili Çözüm',
    tag: 'Vektör Kontrolü',
    accentColor: 'amber',
  },
];

const ACCENT_STYLES = {
  blue: {
    badge: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/80',
    icon: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]',
    borderHover: 'hover:border-[var(--color-primary)]/50 hover:shadow-sm',
  },
  indigo: {
    badge: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/80',
    icon: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]',
    borderHover: 'hover:border-[var(--color-primary)]/50 hover:shadow-sm',
  },
  emerald: {
    badge: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/80',
    icon: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]',
    borderHover: 'hover:border-[var(--color-primary)]/50 hover:shadow-sm',
  },
  amber: {
    badge: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/80',
    icon: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]',
    borderHover: 'hover:border-[var(--color-primary)]/50 hover:shadow-sm',
  },
  cyan: {
    badge: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/80',
    icon: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]',
    borderHover: 'hover:border-[var(--color-primary)]/50 hover:shadow-sm',
  },
  purple: {
    badge: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/80',
    icon: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]',
    borderHover: 'hover:border-[var(--color-primary)]/50 hover:shadow-sm',
  },
};

interface FacilityEcosystemMatrixSeoProps {
  className?: string;
}

export default function FacilityEcosystemMatrixSeo({
  className = '',
}: FacilityEcosystemMatrixSeoProps) {
  const { language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'en' ? `/en${path === '/' ? '' : path}` : path;
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Alo Yönetim Entegre Tesis Yönetimi Hizmet Ekosistemi',
    description: 'Konut siteleri, plazalar ve karma yaşam projeleri için 9 temel entegre yönetim ve operasyonel disiplin.',
    numberOfItems: ECOSYSTEM_SERVICES.length,
    itemListElement: ECOSYSTEM_SERVICES.map((srv, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: srv.title,
      description: srv.description,
      url: `https://aloyonetim.com${srv.path}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />

      <section
        id="entegre-ekosistem"
        aria-label="Entegre Tesis Yönetimi Hizmet Ekosistemi"
        className={`w-full bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-sm ${className}`}
      >
        {/* Üst Başlık & Rozet */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400" aria-hidden="true">
              hub
            </span>
            <span>Tam Entegre Çözüm Ekosistemi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Alo Yönetim{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-slate-600 to-[var(--color-secondary)] dark:from-white dark:via-slate-200 dark:to-slate-400">
              Entegre Tesis Yönetimi
            </span>{' '}
            Disiplinleri
          </h2>

          <p className="text-sm sm:text-base text-[var(--color-secondary)] font-normal mt-3 leading-relaxed">
            Tek çatı altında senkronize edilen 9 temel operasyonel uzmanlık. Dış kaynak karmaşası ve koordinasyon kopukluğu olmadan, ISO 41001 standartlarında kesintisiz tesis işletmesi:
          </p>
        </div>

        {/* 3x3 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_SERVICES.map((srv) => {
            const styles = ACCENT_STYLES[srv.accentColor];
            return (
              <Link
                key={srv.id}
                href={getLocalizedPath(srv.path)}
                className={`group flex flex-col justify-between p-6 rounded-2xl bg-[var(--color-surface-variant)]/40 hover:bg-[var(--color-surface)] border border-[var(--color-outline)]/50 ${styles.borderHover} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden`}
              >
                <div>
                  {/* Kart Üst Bilgisi: İkon, Tag & Standart Rozeti */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${styles.icon} group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                        {srv.icon}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${styles.badge}`}>
                      {srv.badge}
                    </span>
                  </div>

                  {/* Kategori Tag */}
                  <span className="text-[11px] font-semibold text-[var(--color-tertiary)] uppercase tracking-wider block mb-1">
                    {srv.tag}
                  </span>

                  {/* Hizmet Başlığı */}
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] group-hover:opacity-85 transition-opacity mb-2 leading-snug">
                    {srv.title}
                  </h3>

                  {/* 1-2 Cümlelik Net Değer Önerisi */}
                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-normal leading-relaxed mb-4">
                    {srv.description}
                  </p>
                </div>

                {/* Kart Altı: Metrik ve İncele Linki */}
                <div className="pt-4 border-t border-[var(--color-outline)]/40 flex items-center justify-between gap-2 mt-auto">
                  <span className="text-[11px] font-medium text-[var(--color-secondary)]">
                    {srv.metric}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-primary)] group-hover:opacity-80 inline-flex items-center gap-1 transition-transform group-hover:translate-x-0.5 shrink-0">
                    <span>Disiplin Kapsamı</span>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Alt Bilgi Bandı: Kurumsal SLA & Entegrasyon */}
        <div className="mt-10 p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-lg" aria-hidden="true">
              verified
            </span>
            <span className="font-semibold text-[var(--color-primary)]">
              Tüm hizmetler tek sözleşme, tek fatura ve tek SLA garantisi altında birleştirilir.
            </span>
          </div>
          <Link
            href="/teklif-al"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-surface)] hover:opacity-90 font-bold text-xs transition-all shrink-0"
          >
            <span>Entegre Teklif Al</span>
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

