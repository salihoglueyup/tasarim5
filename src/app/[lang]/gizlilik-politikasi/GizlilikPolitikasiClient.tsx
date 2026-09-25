"use client";

import React from 'react';
import PageHeader from '@/components/layout/page/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import TableOfContents from '@/components/blog/TableOfContents';
import LegalPageSeo from '@/components/seo/schema/LegalPageSeo';
import LegalEnglishSummary from '@/components/legal/LegalEnglishSummary';

export default function GizlilikPolitikasiClient() {
  const { t, language } = useLanguage();
  
  const sections = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <>
      <LegalPageSeo 
        title={t('gizlilik_title')}
        description={t('gizlilik_desc')}
        path={`/${language}/gizlilik-politikasi`}
      />

      <PageHeader 
        title={t('gizlilik_title')} 
        description={t('gizlilik_desc')} 
      />

      <article className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start relative">
          
          <aside className="space-y-6 lg:sticky lg:top-28">
            <TableOfContents contentSelector="#article-content" className="w-full" />
          </aside>

          <div 
            id="article-content"
            className="bg-[var(--color-surface)] dark:bg-[#15161E] p-6 sm:p-10 md:p-14 lg:p-16 rounded-3xl border border-[var(--color-outline)]/80 dark:border-white/10 shadow-xs relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[var(--color-outline)]/60 dark:border-white/10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Gizlilik & Kişisel Veri Güvenliği Politikası
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-2xs">
                Son Güncelleme: 1 Ağustos 2026
              </span>
            </div>

            {/* Faz 168: Gizlilik Politikası İngilizce Özet Versiyonu */}
            <LegalEnglishSummary type="privacy" lang={language} />

            <div className="space-y-8">
              {sections.map((i) => {
                const headingKey = `gizlilik_h${i}` as Parameters<typeof t>[0];
                const paragraphKey = `gizlilik_p${i}` as Parameters<typeof t>[0];
                
                const heading = t(headingKey);
                const paragraph = t(paragraphKey);

                if (heading === headingKey || !heading) return null;

                return (
                  <section 
                    key={i} 
                    className="pb-8 border-b border-[var(--color-outline)]/40 dark:border-white/5 last:border-b-0 last:pb-0"
                  >
                    <h2 
                      id={`madde-${i}`} 
                      className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 scroll-mt-32 flex items-center gap-2.5"
                    >
                      <span className="w-1.5 h-5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                      <span>{heading}</span>
                    </h2>
                    {paragraph && paragraph !== paragraphKey && (
                      <div 
                        className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base space-y-2.5 [&_strong]:text-slate-900 dark:[&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_br]:block [&_br]:content-[''] [&_br]:mb-1.5"
                        dangerouslySetInnerHTML={{ __html: paragraph }} 
                      />
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
