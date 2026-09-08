"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DISTRICTS, getDistrictDues } from '@/data/districts';
import { useLanguage } from '@/context/LanguageContext';

const UI_TEXT: Record<string, {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  all: string;
  europe: string;
  anatolia: string;
  searchPlaceholder: string;
  marketAvg: string;
  aloManagement: string;
  savings: string;
  explore: string;
  footerInfo: string;
  footerCount: string;
}> = {
  tr: {
    badge: '39 İlçe Tesis Yönetimi ve Aidat Endeksi',
    titlePrefix: 'İstanbul Genelinde',
    titleHighlight: 'Bölgesel Tesis Yönetimi',
    subtitle: 'Her ilçenin yapılaşma ve mülk dinamiklerine özel işletme projeleri ve kanıtlanmış aidat tasarruf oranları.',
    all: 'Tümü (39)',
    europe: 'Avrupa (25)',
    anatolia: 'Anadolu (14)',
    searchPlaceholder: 'İlçe veya semt ara...',
    marketAvg: 'Piyasa Ort.',
    aloManagement: 'Alo Yönetim',
    savings: 'Tasarruf',
    explore: 'İncele',
    footerInfo: 'Tüm veriler İstanbul 39 ilçe güncel KMK işletme projeleri ve saha denetimleriyle doğrulanmıştır.',
    footerCount: 'Toplam 39 İlçe & 43+ Mahalle Kapsamı',
  },
  en: {
    badge: '39 District Facility Management & Dues Index',
    titlePrefix: 'Across Istanbul',
    titleHighlight: 'Regional Facility Management',
    subtitle: 'Tailored operating projects and proven dues savings rates for every district.',
    all: 'All (39)',
    europe: 'European Side (25)',
    anatolia: 'Asian Side (14)',
    searchPlaceholder: 'Search district or neighborhood...',
    marketAvg: 'Market Avg',
    aloManagement: 'Alo Management',
    savings: 'Savings',
    explore: 'Explore',
    footerInfo: 'All data verified with current KMK operating projects and field inspections.',
    footerCount: 'Total 39 Districts & 43+ Neighborhoods',
  },
  ru: {
    badge: 'Индекс управления объектами и взносов по 39 районам',
    titlePrefix: 'По всему Стамбулу',
    titleHighlight: 'Региональное управление объектами',
    subtitle: 'Индивидуальные эксплуатационные проекты и доказанная экономия взносов для каждого района.',
    all: 'Все (39)',
    europe: 'Европейская сторона (25)',
    anatolia: 'Азиатская сторона (14)',
    searchPlaceholder: 'Поиск района или квартала...',
    marketAvg: 'Среднее по рынку',
    aloManagement: 'Alo Management',
    savings: 'Экономия',
    explore: 'Подробнее',
    footerInfo: 'Все данные подтверждены проектами KMK и полевыми аудитами.',
    footerCount: 'Всего 39 районов и 43+ микрорайонов',
  },
  ar: {
    badge: 'مؤشر إدارة المرافق والرسوم في 39 منطقة',
    titlePrefix: 'في جميع أنحاء إسطنبول',
    titleHighlight: 'إدارة المرافق الإقليمية',
    subtitle: 'مشاريع تشغيلية مخصصة ومعدلات توفير مثبتة في الرسوم الشهرية لكل منطقة.',
    all: 'الكل (39)',
    europe: 'الجانب الأوروبي (25)',
    anatolia: 'الجانب الآسيوي (14)',
    searchPlaceholder: 'ابحث عن منطقة أو حي...',
    marketAvg: 'متوسط السوق',
    aloManagement: 'ألو للإدارة',
    savings: 'توفير',
    explore: 'استكشاف',
    footerInfo: 'جميع البيانات معتمدة من مشاريع إدارة KMK وعمليات التدقيق الميدانية.',
    footerCount: 'إجمالي 39 منطقة وأكثر من 43 حياً',
  },
};

export default function FacilityDistrictGridSeo() {
  const { language } = useLanguage();
  const t = UI_TEXT[language] || UI_TEXT.tr;
  const [selectedSide, setSelectedSide] = useState<'all' | 'Anadolu' | 'Avrupa'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language && language !== 'tr' ? `/${language}${path === '/' ? '' : path}` : path;
  };

  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((d) => {
      const matchesSide = selectedSide === 'all' || d.side === selectedSide;
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.neighborhoods.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSide && matchesSearch;
    });
  }, [selectedSide, searchQuery]);

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 md:p-10 shadow-sm">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold tracking-wider uppercase mb-3">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">hub</span>
            {t.badge}
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            {t.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">{t.titleHighlight}</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-2 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Controls: Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Side Tabs */}
          <div className="inline-flex p-1 bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-xl">
            {(
              [
                { id: 'all', label: t.all },
                { id: 'Avrupa', label: t.europe },
                { id: 'Anadolu', label: t.anatolia },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSide(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedSide === tab.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/70 rounded-xl px-4 py-2 pl-9 text-xs text-[var(--color-primary)] placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-colors"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-slate-400" aria-hidden="true">
              search
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 39 Districts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {filteredDistricts.map((d, index) => {
            const dues = getDistrictDues(d.slug);
            const targetUrl = getLocalizedPath(`/bolgeler/${d.slug}/tesis-yonetimi`);

            return (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
              >
                <Link
                  href={targetUrl}
                  prefetch={true}
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 hover:border-slate-400 transition-all duration-300 shadow-2xs hover:shadow-sm relative overflow-hidden"
                >
                  {/* Top Bar: Name & Side Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-[var(--color-primary)] transition-colors flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-[var(--color-secondary)]" aria-hidden="true">
                          location_on
                        </span>
                        {d.name}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60">
                        {d.side}
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--color-secondary)] line-clamp-2 leading-relaxed mb-3">
                      {d.intro}
                    </p>
                  </div>

                  {/* Dues & Performance Metrics */}
                  <div className="pt-3 border-t border-[var(--color-outline)]/40 mt-auto">
                    <div className="grid grid-cols-2 gap-2 mb-2.5">
                      <div className="bg-[var(--color-surface-variant)] rounded-lg p-2 border border-[var(--color-outline)]/60">
                        <div className="text-[9px] text-[var(--color-secondary)] uppercase font-medium">{t.marketAvg}</div>
                        <div className="text-xs font-bold text-[var(--color-primary)]">{dues.avgDuesM2} ₺/m²</div>
                      </div>
                      <div className="bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/20">
                        <div className="text-[9px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">{t.aloManagement}</div>
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{dues.aloDuesM2} ₺/m²</div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--color-primary)] transition-colors">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">trending_down</span>
                        %{dues.savingsRate} {t.savings}
                      </span>
                      <span className="inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        {t.explore}
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">chevron_right</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[16px]" aria-hidden="true">verified</span>
          {t.footerInfo}
        </div>
        <div className="font-semibold text-[var(--color-primary)]">
          {t.footerCount}
        </div>
      </div>
    </section>
  );
}
