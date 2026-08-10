"use client";

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

export default function GizlilikPolitikasi() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader 
        title={t('gizlilik_title')} 
        description={t('gizlilik_desc')} 
      />

      <article className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] p-12 md:p-20 rounded-[3rem] border border-[var(--color-outline)]/50 prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)]">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">{t('gizlilik_h1')}</h2>
          <p>
            {t('gizlilik_p1')}
          </p>
          
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('gizlilik_h2')}</h2>
          <p>
            {t('gizlilik_p2')}
          </p>
          <div dangerouslySetInnerHTML={{ __html: t('gizlilik_ul2') }} />
          
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('gizlilik_h3')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('gizlilik_p3') }} />

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('gizlilik_h4')}</h2>
          <p>
            {t('gizlilik_p4')}
          </p>
        </div>
      </article>
    </>
  );
}
