"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const ALL_SERVICES = [
  { nameKey: 'nav_security', path: '/hizmetler/guvenlik-yonetimi', icon: 'security' },
  { nameKey: 'nav_facility_mgmt', path: '/hizmetler/tesis-yonetimi', icon: 'account_balance_wallet' },
  { nameKey: 'nav_cleaning', path: '/hizmetler/temizlik-ve-hijyen', icon: 'cleaning_services' },
  { nameKey: 'nav_tech_maintenance', path: '/hizmetler/teknik-bakim', icon: 'engineering' },
  { nameKey: 'nav_landscaping', path: '/hizmetler/peyzaj-ve-bahce-bakimi', icon: 'park' },
  { nameKey: 'nav_pool_care', path: '/hizmetler/havuz-bakimi-ve-hijyen', icon: 'pool' },
  { nameKey: 'nav_pest_control', path: '/hizmetler/hasere-ve-dezenfeksiyon', icon: 'bug_report' },
  { nameKey: 'nav_legal', path: '/hizmetler/hukuk-ve-icra-danismanligi', icon: 'gavel' },
  { nameKey: 'nav_dues', path: '/hizmetler/aidat-takibi', icon: 'account_balance_wallet' }
];

interface RelatedServicesProps {
  currentPath: string;
}

export default function RelatedServices({ currentPath }: RelatedServicesProps) {
  const { t } = useLanguage();
  const currentIndex = ALL_SERVICES.findIndex(s => s.path === currentPath);
  
  const related = [];
  for (let i = 1; i <= 4; i++) {
    const idx = (Math.max(0, currentIndex) + i) % ALL_SERVICES.length;
    if (ALL_SERVICES[idx].path !== currentPath && related.length < 3) {
      related.push(ALL_SERVICES[idx]);
    }
  }

  return (
    <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto border-t border-slate-100 dark:border-white/5">
      <div className="flex flex-col items-center md:items-start mb-10">
        <h3 className="text-2xl font-bold text-[var(--color-primary)]">{t('related_services_title')}</h3>
        <p className="text-[var(--color-secondary)] font-light mt-2 text-sm">{t('related_services_desc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((service, idx) => (
          <Link key={idx} href={service.path} className="group flex items-center gap-4 p-6 bg-[var(--color-surface)] border border-slate-200/60 dark:border-white/10 rounded-2xl hover:border-slate-400 dark:hover:border-white/40 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">{service.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[var(--color-primary)] group-hover:opacity-80 transition-opacity">{(t as any)(service.nameKey)}</span>
              <span className="text-xs text-[var(--color-secondary)] mt-1 flex items-center gap-1">{t('related_services_inspect')} <span className="material-symbols-outlined text-[10px]">arrow_forward</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
