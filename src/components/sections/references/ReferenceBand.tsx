'use client';

import { useState } from 'react';
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
  const [activeSector, setActiveSector] = useState<ReferenceSector | 'all'>('all');

  const items =
    activeSector !== 'all'
      ? selectReferences({ sectors: [activeSector], limit })
      : slugs?.length || sectors?.length
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
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Referans Kategori Filtresi">
          <button
            type="button"
            onClick={() => setActiveSector('all')}
            aria-pressed={activeSector === 'all'}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeSector === 'all'
                ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950'
                : 'border-[var(--color-outline)]/60 bg-[var(--color-background)] text-[var(--color-secondary)] hover:border-slate-900 hover:text-[var(--color-primary)] dark:hover:border-white'
            }`}
          >
            <span>{t('refx_tab_all')}</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 font-bold">
              {REAL_REFERENCES.length}
            </span>
          </button>
          {SECTORS.map((sec) => {
            const label = t(SECTOR_LABEL_KEYS[sec]);
            const isSelected = activeSector === sec;
            return (
              <button
                key={sec}
                type="button"
                onClick={() => setActiveSector(isSelected ? 'all' : sec)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950'
                    : 'border-[var(--color-outline)]/60 bg-[var(--color-background)] text-[var(--color-secondary)] hover:border-slate-900 hover:text-[var(--color-primary)] dark:hover:border-white'
                }`}
              >
                <span>{label}</span>
                <span className="rounded-full bg-slate-900/10 px-2 py-0.5 font-bold text-[var(--color-primary)] dark:bg-white/10">
                  {counts[sec]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((r) => (
          <ReferenceCard key={r.slug} reference={r} lang={language} istanbulWideLabel={t('refx_istanbul_wide')} />
        ))}
      </ul>

      {language === 'tr' && (
        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[var(--color-outline)]/40 pt-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--color-outline)]/50 bg-[var(--color-background)] p-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Vaka Özeti · Toplu Konut & Rezidans
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-secondary)]">
              <strong className="text-[var(--color-primary)]">Innovia 3, Dome Residence ve Kiptaş Sahilpark Evleri</strong> ölçeğindeki toplu yapılarda akıllı bina sistemleri, enerji verimliliği ve KMK m.20/37 uyumlu dijital aidat muhasebesiyle şeffaf bütçe yönetimi sağlıyoruz.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-outline)]/50 bg-[var(--color-background)] p-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Vaka Özeti · Sağlık & Kamu Tesisleri
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-secondary)]">
              <strong className="text-[var(--color-primary)]">VM Medical Park Maltepe, Yunus Emre Hastanesi ve Belediyeler</strong> dahil kritik tesislerde ISO 14001 sürdürülebilirlik standartlarında steril hijyen ve kesintisiz mekanik-elektrik sürekliliği yürütüyoruz.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-outline)]/50 bg-[var(--color-background)] p-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Vaka Özeti · Kurumsal, Sanayi & Medya
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-secondary)]">
              <strong className="text-[var(--color-primary)]">Türk Eximbank, Sözcü Gazetesi ve Matbaaları ile İşkent Sanayi Sitesi</strong> operasyonlarında 5188 sayılı Kanun kapsamında Valilik izinli özel güvenlik, PTS/CCTV ve yazılı SLA teknik bakım desteği sunuyoruz.
            </p>
          </div>
        </div>
      )}

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
