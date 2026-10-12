"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/page/PageHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import CallbackForm from '@/components/cro/CallbackForm';

import { calculateShare, formatRatio, formatTry, type ShareMethod } from '@/lib/hesaplayici';

import Icon from '@/components/ui/branding/Icon';
import { localePath } from '@/lib/i18n/localePath';

const GUIDE_LINKS = [
  { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi' },
  { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  { href: '/hizmetler/aidat-takibi' },
  { href: '/hizmetler/teknik-bakim' },
];

const INPUT_CLASS =
  'w-full rounded-xl border border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)] px-4 py-3 text-lg font-semibold text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)]';

/** Bütçe: kullanıcı kendi tutarını girer; araç piyasa verisi veya tasarruf tahmini eklemez. */
export default function CalculatorClient() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  const [budget, setBudget] = useState<string>('');
  const [method, setMethod] = useState<ShareMethod>('equal');
  const [units, setUnits] = useState<string>('');
  const [landNum, setLandNum] = useState<string>('');
  const [landDen, setLandDen] = useState<string>('');

  const result = calculateShare({
    monthlyBudget: Number(budget.replace(',', '.')),
    method,
    units: Number(units),
    landShareNumerator: Number(landNum),
    landShareDenominator: Number(landDen),
  });

  const methods: { id: ShareMethod; label: string; desc: string }[] = [
    { id: 'equal', label: tk('calc_method_equal'), desc: tk('calc_method_equal_desc') },
    { id: 'land', label: tk('calc_method_land'), desc: tk('calc_method_land_desc') },
  ];

  return (
    <>
      <PageHeader title={t('calc_page_title')} description={t('calc_page_desc')} />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        {/* Özet rehber */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wide">
              <Icon name="calculate" className="text-[18px] text-emerald-600 dark:text-emerald-400" />
              <span>{tk('calx_guide_badge')}</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-[var(--color-surface-variant)] px-3 py-1 rounded-lg border border-[var(--color-outline)]/60">
              {tk('calx_guide_tag')}
            </span>
          </div>

          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal">
            <p>{tk('calx_guide_p1')}</p>
            <p>{tk('calx_guide_p2')}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {GUIDE_LINKS.map((l, i) => (
                <Link
                  key={l.href}
                  href={localePath(l.href, language)}
                  className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {tk(`calx_link_${i + 1}`)}
                </Link>
              ))}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Girdiler */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/50 shadow-sm flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-3">
              <Icon name="tune" className="text-[var(--color-primary)] text-3xl" />
              {t('calc_params_title')}
            </h2>

            <div className="flex flex-col gap-2">
              <label htmlFor="calc-budget" className="font-semibold text-[var(--color-primary)] text-lg">
                {tk('calc_budget_label')}
              </label>
              <input
                id="calc-budget"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={INPUT_CLASS}
              />
              <p className="text-xs text-[var(--color-secondary)]">{tk('calc_budget_hint')}</p>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="font-semibold text-[var(--color-primary)] text-lg mb-2">{tk('calc_method_title')}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {methods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-colors ${
                      method === m.id
                        ? 'border-[var(--color-primary)] bg-[var(--color-surface-variant)]'
                        : 'border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]/60'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold text-[var(--color-primary)]">
                      <input
                        type="radio"
                        name="calc-method"
                        checked={method === m.id}
                        onChange={() => setMethod(m.id)}
                        className="accent-slate-900 dark:accent-white"
                      />
                      {m.label}
                    </span>
                    <span className="text-xs text-[var(--color-secondary)]">{m.desc}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {method === 'equal' ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="calc-units" className="font-semibold text-[var(--color-primary)] text-lg">
                  {tk('calc_unit_label')}
                </label>
                <input
                  id="calc-units"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="calc-land-num" className="font-semibold text-[var(--color-primary)]">
                      {tk('calc_land_num')}
                    </label>
                    <input
                      id="calc-land-num"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      value={landNum}
                      onChange={(e) => setLandNum(e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="calc-land-den" className="font-semibold text-[var(--color-primary)]">
                      {tk('calc_land_den')}
                    </label>
                    <input
                      id="calc-land-den"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      value={landDen}
                      onChange={(e) => setLandDen(e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>
                <p className="text-xs text-[var(--color-secondary)]">{tk('calc_land_hint')}</p>
              </div>
            )}
          </div>

          {/* Sonuç */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div
              layout
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] p-8 md:p-12 rounded-[2.5rem] shadow-sm flex flex-col gap-8"
            >
              <span className="w-fit bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                {t('calc_report_tag')}
              </span>

              {result.valid ? (
                <>
                  <div className="flex flex-col gap-2">
                    <span className="text-[var(--color-secondary)] text-sm font-light">{tk('calc_result_monthly')}</span>
                    <span className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)]">
                      {formatTry(result.monthlyShare, language)}
                    </span>
                  </div>
                  <hr className="border-[var(--color-outline)]/40" />
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-[var(--color-secondary)]">{tk('calc_result_annual')}</span>
                      <span className="text-2xl font-bold text-[var(--color-primary)]">{formatTry(result.annualShare, language)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-[var(--color-secondary)]">{tk('calc_result_ratio')}</span>
                      <span className="text-2xl font-bold text-[var(--color-primary)]">{formatRatio(result.ratio, language)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-[var(--color-secondary)]">{tk('calc_result_empty')}</p>
              )}

              <div className="bg-[var(--color-surface-variant)] p-5 rounded-2xl border border-[var(--color-outline)]/60 flex items-start gap-3">
                <Icon name="info" className="text-slate-600 dark:text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{tk('calc_disclaimer_share')}</p>
              </div>

              <Link
                href={localePath('/teklif-al', language)}
                className="bg-[var(--color-primary)] text-[var(--color-surface)] hover:opacity-90 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                {t('calc_btn_quote')}
                <Icon name="arrow_forward" className="text-base" />
              </Link>
            </motion.div>

            {/* Hesaplayıcı → lead: yalnızca girilen değerler iletilir. */}
            <div className="mt-6">
              <div className="mb-3 px-1">
                <h3 className="font-bold text-[var(--color-primary)]">{t('calc_lead_title')}</h3>
                <p className="text-xs text-[var(--color-secondary)]">{t('calc_lead_desc')}</p>
              </div>
              <CallbackForm
                variant="card"
                meta={{
                  kaynak: 'hesaplayici',
                  yontem: method,
                  aylikButce: budget,
                  bagimsizBolum: method === 'equal' ? units : '',
                  arsaPayi: method === 'land' ? `${landNum}/${landDen}` : '',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
