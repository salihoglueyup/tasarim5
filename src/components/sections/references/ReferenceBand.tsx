'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  REAL_REFERENCES,
  SECTORS,
  countBySector,
  featuredReferences,
  selectReferences,
  type ReferenceSector,
} from '@/data/realReferences';
import ReferenceCard from './ReferenceCard';
import Icon from '@/components/ui/branding/Icon';

const SECTOR_LABEL_KEYS = {
  site: 'refx_s_site',
  saglik: 'refx_s_saglik',
  ticari: 'refx_s_ticari',
  is_merkezi: 'refx_s_is_merkezi',
  kamu: 'refx_s_kamu',
  turizm: 'refx_s_turizm',
} as const;

export interface ReferenceBandProps {
  limit?: number;
  sectors?: readonly ReferenceSector[];
  slugs?: readonly string[];
  showSectorSummary?: boolean;
}

/**
 * Ana sayfa, hizmet, alt sektör ve teklif sayfalarında gösterilen referans şeridi.
 * Yalnızca src/data/realReferences.ts içindeki 52 gerçek kurumsal referansı gösterir.
 */
export default function ReferenceBand({
  limit = 8,
  sectors,
  slugs,
  showSectorSummary = true,
}: ReferenceBandProps) {
  const { t, language } = useLanguage();
  const items =
    slugs?.length || sectors?.length
      ? selectReferences({ slugs, sectors, limit })
      : featuredReferences(limit);
  const counts = countBySector();

  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-[var(--color-outline)]/60 bg-[var(--color-surface)] p-8 shadow-sm md:p-12">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('refx_band_title')}</h2>
        <p className="mt-3 text-sm font-light text-[var(--color-secondary)]">{t('refx_band_sub')}</p>
      </div>

      {showSectorSummary && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {SECTORS.map((sec) => {
            const label = t(SECTOR_LABEL_KEYS[sec]);
            return (
              <Link
                key={sec}
                href="/referanslar"
                title={`${label} (${counts[sec]}) — Alo Yönetim Kurumsal Referanslar`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-outline)]/60 bg-[var(--color-background)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-secondary)] transition-colors hover:border-slate-900 hover:text-[var(--color-primary)] dark:hover:border-white"
              >
                <span>{label}</span>
                <span className="rounded-full bg-slate-900/10 px-2 py-0.5 font-bold text-[var(--color-primary)] dark:bg-white/10">
                  {counts[sec]}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((r) => (
          <ReferenceCard key={r.slug} reference={r} lang={language} istanbulWideLabel={t('refx_istanbul_wide')} />
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link
          href="/referanslar"
          title={`${t('refx_band_all')} (${REAL_REFERENCES.length})`}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:underline dark:text-white"
        >
          <span>
            {t('refx_band_all')} ({REAL_REFERENCES.length})
          </span>
          <Icon name="arrow_forward" className="text-base" />
        </Link>
      </div>
    </section>
  );
}
