"use client";

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

export default function CerezPolitikasi() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader 
        title={t('cerez_title')} 
        description={t('cerez_desc')} 
      />

      <article className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] p-12 md:p-20 rounded-[3rem] border border-[var(--color-outline)]/50 prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)]">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">{t('cerez_h1')}</h2>
          <p>
            {t('cerez_p1')}
          </p>
          
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('cerez_h2')}</h2>
          <p>
            {t('cerez_p2')}
          </p>
          <div dangerouslySetInnerHTML={{ __html: t('cerez_ul2') }} />
          
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('cerez_h3')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('cerez_p3') }} />

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('cerez_h4')}</h2>
          <p>
            {t('cerez_p4')}
          </p>
        </div>
      </article>
    </>
  );
}
