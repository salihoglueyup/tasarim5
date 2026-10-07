"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
import { TRANSLATED_TERMS, type TranslatedLang } from '@/data/dictionaryTranslated';
import Icon from '@/components/ui/branding/Icon';

/** en/ru/ar için çevrilmiş 20 temel terimin liste sayfası. */
export default function SozlukTranslatedClient({ lang }: { lang: TranslatedLang }) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 bg-slate-950 text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-[var(--spacing-gutter)] text-center flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-extrabold tracking-wide">
            <Icon name="menu_book" className="text-[15px]" />
            <span>{tk('sozx_badge')}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">{tk('sozx_h1')}</h1>
          <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">{tk('sozx_lead')}</p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-[var(--spacing-gutter)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] mb-8">{tk('sozx_list_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="glossary-instant-answer-text">
            {TRANSLATED_TERMS.map((item) => {
              const text = item[lang];
              return (
                <Link
                  key={item.slug}
                  href={localePath(`/sozluk/${item.slug}`, language)}
                  className="group p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all flex flex-col gap-3"
                >
                  <h3 className="text-base font-bold text-[var(--color-primary)]">{text.term}</h3>
                  <p className="text-sm text-[var(--color-secondary)] leading-relaxed line-clamp-3">{text.definition}</p>
                  <span className="mt-auto text-xs font-bold text-[var(--color-primary)] flex items-center gap-1">
                    {tk('sozx_read')}
                    <Icon name="arrow_forward" className="text-sm group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-[var(--color-surface-variant)]/50 border border-[var(--color-outline)]/60 text-sm text-[var(--color-secondary)] flex flex-col gap-3">
            <p>{tk('sozx_note')}</p>
            <Link href={localePath('/sozluk', 'tr')} className="font-semibold text-[var(--color-primary)] underline w-fit">
              {tk('sozx_note_link')}
            </Link>
            <p className="text-xs">{tk('sozx_disclaimer')}</p>
          </div>
        </div>
      </section>

      <section className="py-14 px-[var(--spacing-gutter)] bg-[var(--color-surface-variant)]/30 border-t border-[var(--color-outline)]/60">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] mb-5">{tk('sozx_cta_title')}</h2>
          <Link
            href={localePath('/teklif-al', language)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {tk('sozx_cta_btn')}
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </section>
    </div>
  );
}
