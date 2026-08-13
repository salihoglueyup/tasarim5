"use client";

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import TableOfContents from '@/components/blog/TableOfContents';
import LegalPageSeo from '@/components/seo/LegalPageSeo';

export default function KVKK() {
  const { t, language } = useLanguage();
  
  const sections = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <>
      <LegalPageSeo 
        title={t('kvkk_page_title')}
        description={t('kvkk_page_desc')}
        path={`/${language}/kvkk-ve-aydinlatma-metni`}
      />

      <PageHeader 
        title={t('kvkk_page_title')} 
        description={t('kvkk_page_desc')} 
      />

      <article className="py-16 md:py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 lg:gap-16 items-start relative">
          
          <TableOfContents />

          <div className="bg-[var(--color-surface)] p-8 md:p-16 rounded-[2.5rem] border border-[var(--color-outline)]/50 shadow-sm relative">
            <div className="absolute top-8 right-8 md:top-12 md:right-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-[14px]">update</span>
                Son Güncelleme: 1 Ağustos 2026
              </span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)] pt-12 md:pt-8">
              {sections.map((i) => {
                const headingKey = `kvkk_h${i}` as Parameters<typeof t>[0];
                const paragraphKey = `kvkk_p${i}` as Parameters<typeof t>[0];
                
                const heading = t(headingKey);
                const paragraph = t(paragraphKey);

                if (heading === headingKey || !heading) return null;

                return (
                  <React.Fragment key={i}>
                    <h2 id={`madde-${i}`} className={`text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-6 scroll-mt-32 ${i > 1 ? 'mt-12' : ''}`}>
                      {heading}
                    </h2>
                    {paragraph && paragraph !== paragraphKey && (
                      <div dangerouslySetInnerHTML={{ __html: paragraph }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
