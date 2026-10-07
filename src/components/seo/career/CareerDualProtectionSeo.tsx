"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

type Tab = 'both' | 'managers' | 'employees';
const MGR_ICONS = ['savings', 'gavel', 'swap_horiz', 'receipt_long'];
const EMP_ICONS = ['payments', 'verified_user', 'school', 'trending_up'];

export default function CareerDualProtectionSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [activeTab, setActiveTab] = useState<Tab>('both');

  const tabs: { id: Tab; key: string }[] = [
    { id: 'both', key: 'ist_dual_tab_both' },
    { id: 'managers', key: 'ist_dual_tab_mgr' },
    { id: 'employees', key: 'ist_dual_tab_emp' },
  ];

  const column = (prefix: 'mgr' | 'emp', icons: string[], headIcon: string, link: string) => (
    <div className="bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--color-outline)]/60 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-[var(--color-on-primary)] flex items-center justify-center shrink-0">
              <Icon name={headIcon} className="text-2xl" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--color-secondary)] font-bold">
                {tk(`ist_dual_${prefix}_side`)}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
                {tk(`ist_dual_${prefix}_title`)}
              </h3>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-outline)] text-[var(--color-primary)] shrink-0">
            {tk(`ist_dual_${prefix}_count`)}
          </span>
        </div>

        <div className="space-y-6">
          {icons.map((icon, idx) => (
            <div key={icon} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name={icon} className="text-lg" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                    {tk(`ist_${prefix}_${idx + 1}_title`)}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)] shrink-0">
                    {tk(`ist_${prefix}_${idx + 1}_tag`)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                  {tk(`ist_${prefix}_${idx + 1}_desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/60 flex items-center justify-end text-xs">
        <a href="#basvuru-formu" className="font-semibold text-[var(--color-primary)] hover:underline">
          {tk(link)}
        </a>
      </div>
    </div>
  );

  return (
    <section id="cift-yonlu-guvence" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <Icon name="balance" className="text-sm" />
            <span>{tk('ist_dual_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('ist_dual_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('ist_dual_desc')}
          </p>

          <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {tk(tab.key)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(activeTab === 'both' || activeTab === 'managers') && column('mgr', MGR_ICONS, 'apartment', 'ist_dual_mgr_link')}
          {(activeTab === 'both' || activeTab === 'employees') && column('emp', EMP_ICONS, 'badge', 'ist_dual_emp_link')}
        </div>
      </div>
    </section>
  );
}
