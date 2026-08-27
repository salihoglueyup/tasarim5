"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const ALL_SERVICES = [
  { nameKey: 'nav_facility_mgmt', path: '/hizmetler/tesis-yonetimi', icon: 'domain', isFlagship: true },
  { nameKey: 'nav_security', path: '/hizmetler/guvenlik-yonetimi', icon: 'shield_person' },
  { nameKey: 'nav_cleaning', path: '/hizmetler/temizlik-ve-hijyen', icon: 'cleaning_services' },
  { nameKey: 'nav_tech_maintenance', path: '/hizmetler/teknik-bakim', icon: 'engineering' },
  { nameKey: 'nav_dues', path: '/hizmetler/aidat-takibi', icon: 'account_balance_wallet' },
  { nameKey: 'nav_legal', path: '/hizmetler/hukuk-ve-icra-danismanligi', icon: 'gavel' },
  { nameKey: 'nav_landscaping', path: '/hizmetler/peyzaj-ve-bahce-bakimi', icon: 'park' },
  { nameKey: 'nav_pool_care', path: '/hizmetler/havuz-bakimi-ve-hijyen', icon: 'pool' },
  { nameKey: 'nav_pest_control', path: '/hizmetler/hasere-ve-dezenfeksiyon', icon: 'bug_report' },
];

interface RelatedServicesProps {
  currentPath: string;
}

export default function RelatedServices({ currentPath }: RelatedServicesProps) {
  const { t, language } = useLanguage();
  const isFacilityPage = currentPath === '/hizmetler/tesis-yonetimi' || currentPath.startsWith('/hizmetler/tesis-yonetimi');

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'en' ? `/en${path === '/' ? '' : path}` : path;
  };

  let related: Array<(typeof ALL_SERVICES)[0]> = [];

  if (!isFacilityPage) {
    // Diğer kardeş hizmet sayfalarındayken her zaman 1. sıraya Amiral Gemisi "Tesis Yönetimi"ni yerleştir
    const facilityService = ALL_SERVICES.find((s) => s.path === '/hizmetler/tesis-yonetimi')!;
    const others = ALL_SERVICES.filter((s) => s.path !== currentPath && s.path !== '/hizmetler/tesis-yonetimi').slice(0, 2);
    related = [facilityService, ...others];
  } else {
    // Tesis Yönetimi sayfasındayken Güvenlik, Temizlik ve Teknik Bakım hizmetlerini göster
    related = ALL_SERVICES.filter((s) => s.path !== '/hizmetler/tesis-yonetimi').slice(0, 3);
  }

  return (
    <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto border-t border-slate-100 dark:border-white/5">
      <div className="flex flex-col items-center md:items-start mb-10">
        <h3 className="text-2xl font-bold text-[var(--color-primary)]">{t('related_services_title')}</h3>
        <p className="text-[var(--color-secondary)] font-light mt-2 text-sm">{t('related_services_desc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((service, idx) => {
          const isSpecial = service.path === '/hizmetler/tesis-yonetimi' && !isFacilityPage;
          return (
            <Link
              key={idx}
              href={getLocalizedPath(service.path)}
              className={`group flex items-center gap-4 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                isSpecial
                  ? 'bg-gradient-to-br from-blue-900/20 via-slate-900/10 to-slate-900/40 border-2 border-blue-500/40 hover:border-blue-500 shadow-md'
                  : 'bg-[var(--color-surface)] border border-slate-200/60 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/40 hover:shadow-lg'
              }`}
            >
              {isSpecial && (
                <span className="absolute top-2.5 right-3 text-[10px] font-extrabold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">
                  Amiral Gemisi Çözüm
                </span>
              )}
              <div
                className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                  isSpecial
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white'
                }`}
              >
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-bold group-hover:opacity-80 transition-opacity ${isSpecial ? 'text-blue-600 dark:text-blue-400' : 'text-[var(--color-primary)]'}`}>
                  {(t as any)(service.nameKey) || service.nameKey}
                </span>
                <span className="text-xs text-[var(--color-secondary)] mt-1 flex items-center gap-1">
                  {t('related_services_inspect')} <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
