"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const DISCIPLINES = [
  { id: 'guvenlik', icon: 'security', duties: 4, certs: 3 },
  { id: 'temizlik', icon: 'cleaning_services', duties: 4, certs: 3 },
  { id: 'teknik', icon: 'engineering', duties: 4, certs: 3 },
  { id: 'concierge', icon: 'concierge', duties: 4, certs: 3 },
];

interface Props {
  onSelectCategory?: (category: string) => void;
}

export default function CareerDisciplinesGridSeo({ onSelectCategory }: Props) {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [selected, setSelected] = useState<string>('guvenlik');

  const index = Math.max(0, DISCIPLINES.findIndex((d) => d.id === selected));
  const active = DISCIPLINES[index];
  const n = index + 1;

  return (
    <section id="hizmet-branslari" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="engineering" className="text-sm" />
            <span>{tk('ist_dis_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('ist_dis_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('ist_dis_desc')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {DISCIPLINES.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                selected === d.id
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] shadow-sm'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/80 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40'
              }`}
            >
              <Icon name={d.icon} className="text-lg" />
              <span>{tk(`ist_dis_${i + 1}_title`)}</span>
            </button>
          ))}
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 mb-2">
                {tk(`ist_dis_${n}_badge`)}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
                {tk(`ist_dis_${n}_title`)}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#basvuru-formu"
                onClick={() => onSelectCategory && onSelectCategory(active.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <span>{tk('ist_dis_apply')}</span>
                <Icon name="arrow_forward" className="text-sm" />
              </a>
              <a
                href="#basvuru-formu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{tk('ist_dis_request')}</span>
              </a>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--color-secondary)] mb-8 leading-relaxed max-w-4xl">
            {tk(`ist_dis_${n}_tagline`)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-bold text-sm">
                <Icon name="task_alt" className="text-base" />
                <span>{tk('ist_dis_duties')}</span>
              </div>
              <ul className="space-y-2.5">
                {Array.from({ length: active.duties }, (_, i) => i + 1).map((d) => (
                  <li key={d} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-secondary)]">
                    <span className="text-[var(--color-primary)] font-bold mt-0.5">•</span>
                    <span>{tk(`ist_dis_${n}_d${d}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-bold text-sm">
                <Icon name="verified" className="text-base" />
                <span>{tk('ist_dis_certs')}</span>
              </div>
              <ul className="space-y-2.5">
                {Array.from({ length: active.certs }, (_, i) => i + 1).map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-secondary)]">
                    <Icon name="check_circle" className="text-xs text-[var(--color-primary)] mt-0.5" />
                    <span>{tk(`ist_dis_${n}_c${c}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
