"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';

interface CallbackFormProps {
  /** Lead'e eklenecek bağlam (kaynak, hesaplayıcı çıktısı vb.). */
  meta?: Record<string, string | number | boolean>;
  /** Widget içi kompakt kullanım için görsel varyant. */
  variant?: 'card' | 'inline';
}

/**
 * Geri-arama (callback) mini formu — CRO Track 2.
 * Ad + telefon → POST /api/lead (type:'callback'). Hem QuickCallWidget
 * içinde hem hesaplayıcı sonucunda tekrar kullanılır.
 */
export default function CallbackForm({ meta, variant = 'card' }: CallbackFormProps) {
  const { t, language } = useLanguage();
  const { status, errorKey, submit } = useLeadSubmit();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submit(
      { type: 'callback', name, phone, meta: { kaynak: 'geri-arama', dil: language, ...meta } },
      honeypot
    );
    if (ok) {
      import('@/lib/analytics').then(({ trackEvent, AnalyticsEvents }) => {
        trackEvent(AnalyticsEvents.submitContact, { form: 'callback' });
      });
      setName('');
      setPhone('');
    }
  };

  const wrapClass =
    variant === 'card'
      ? 'flex flex-col gap-3 bg-white dark:bg-white/5 p-5 rounded-2xl border border-gray-200 dark:border-white/10'
      : 'flex flex-col gap-3';

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className={`${wrapClass} items-center text-center`}>
        <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{t('cro_callback_success')}</p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-[var(--color-primary)] dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors';

  return (
    <form onSubmit={handleSubmit} className={wrapClass}>
      {variant === 'card' && (
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-[var(--color-primary)] dark:text-white">{t('cro_callback_title')}</h3>
          <p className="text-xs text-[var(--color-secondary)] dark:text-gray-400">{t('cro_callback_desc')}</p>
        </div>
      )}
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />
      <input
        type="text"
        required
        aria-label={t('cro_callback_name')}
        placeholder={t('cro_callback_name')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="tel"
        required
        aria-label={t('cro_callback_phone')}
        placeholder={t('cro_callback_phone')}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass}
      />
      {status === 'error' && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400 font-medium">
          {t((errorKey || 'lead_error_generic') as Parameters<typeof t>[0])}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[var(--color-primary)] dark:bg-white text-white dark:text-slate-900 font-bold text-sm py-3 rounded-xl shadow-md hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">call</span>
        {status === 'loading' ? t('cro_callback_sending') : t('cro_callback_btn')}
      </button>
    </form>
  );
}
