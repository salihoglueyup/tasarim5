"use client";

import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

export default function KVKK() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader 
        title={t('kvkk_page_title')} 
        description={t('kvkk_page_desc')} 
      />

      <article className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] p-12 md:p-20 rounded-[3rem] border border-[var(--color-outline)]/50 prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)]">
          
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">{t('kvkk_h1')}</h2>
          <p>
            {t('kvkk_p1')}
          </p>

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('kvkk_h2')}</h2>
          <p>
            {t('kvkk_p2')}
          </p>

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('kvkk_h3')}</h2>
          <p>
            {t('kvkk_p3')}
          </p>

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">{t('kvkk_h4')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('kvkk_p4') }} />

        </div>
      </article>
    </>
  );
}
