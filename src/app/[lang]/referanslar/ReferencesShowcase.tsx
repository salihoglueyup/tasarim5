'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { REAL_REFERENCES, SECTORS, countBySector, type ReferenceSector } from '@/data/realReferences';
import ReferenceCard from '@/components/sections/references/ReferenceCard';

const SECTOR_KEY = {
  site: 'refx_s_site',
  saglik: 'refx_s_saglik',
  ticari: 'refx_s_ticari',
  is_merkezi: 'refx_s_is_merkezi',
  kamu: 'refx_s_kamu',
  turizm: 'refx_s_turizm',
} as const;

export default function ReferencesShowcase() {
  const { t, language } = useLanguage();
  const [active, setActive] = useState<ReferenceSector | 'all'>('all');
  const counts = useMemo(() => countBySector(), []);
  const visible = active === 'all' ? REAL_REFERENCES : REAL_REFERENCES.filter((r) => r.sector === active);

  return (
    <section className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-gutter)] py-14">
      {/* Rakam şeridi: yalnızca listeden sayılan gerçek değerler */}
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {SECTORS.map((s) => (
          <div key={s} className="rounded-2xl border border-[var(--color-outline)]/70 bg-[var(--color-surface)] p-5 text-center dark:border-white/10">
            <dt className="order-2 text-xs font-medium text-slate-500 dark:text-slate-400">{t(SECTOR_KEY[s])}</dt>
            <dd className="text-3xl font-extrabold text-slate-900 dark:text-white">{counts[s]}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">{t('refx_note_counts')}</p>

      <div role="tablist" aria-label={t('refx_title')} className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {(['all', ...SECTORS] as const).map((s) => {
          const selected = active === s;
          return (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(s)}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition-all ${
                selected
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
              }`}
            >
              {s === 'all' ? `${t('refx_tab_all')} (${REAL_REFERENCES.length})` : `${t(SECTOR_KEY[s])} (${counts[s]})`}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => (
          <ReferenceCard key={r.slug} reference={r} lang={language} istanbulWideLabel={t('refx_istanbul_wide')} />
        ))}
      </ul>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">{t('refx_note_request')}</p>
        <Link
          href="/teklif-al"
          className="inline-flex items-center rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
          {t('refx_cta')}
        </Link>
      </div>
    </section>
  );
}
