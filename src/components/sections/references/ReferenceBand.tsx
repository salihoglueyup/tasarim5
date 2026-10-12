'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { featuredReferences } from '@/data/realReferences';
import ReferenceCard from './ReferenceCard';
import Icon from '@/components/ui/branding/Icon';

/**
 * Ana sayfa ve hizmet sayfalarında gösterilen kısa referans şeridi.
 * Önceki sürümdeki uydurma müşteri yorumlarının yerini alır; yalnızca gerçek referans adları gösterilir.
 */
export default function ReferenceBand({ limit = 8 }: { limit?: number }) {
  const { t, language } = useLanguage();
  const items = featuredReferences(limit);

  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-[var(--color-outline)]/60 bg-[var(--color-surface)] p-8 shadow-sm md:p-12">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('refx_band_title')}</h2>
        <p className="mt-3 text-sm font-light text-[var(--color-secondary)]">{t('refx_band_sub')}</p>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((r) => (
          <ReferenceCard key={r.slug} reference={r} lang={language} istanbulWideLabel={t('refx_istanbul_wide')} />
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link href="/referanslar" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:underline dark:text-white">
          <span>{t('refx_band_all')}</span>
          <Icon name="arrow_forward" className="text-base" />
        </Link>
      </div>
    </section>
  );
}
