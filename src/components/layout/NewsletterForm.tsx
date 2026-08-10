"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';

/**
 * Faz 14: Footer Bülten Formu Lazy Load
 * Bülten formu ve bağlı olduğu lead submission/validasyon mantığı
 * sadece kullanıcı sayfanın en altına (Footer'a) indiğinde asenkron olarak yüklenir.
 */
export default function NewsletterForm() {
  const { t, language } = useLanguage();
  const [emailInput, setEmailInput] = useState("");
  const { status: subStatus, submit: submitLead } = useLeadSubmit();
  const isSubscribed = subStatus === 'success';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const ok = await submitLead({
      type: 'newsletter',
      email: emailInput,
      meta: { kaynak: 'footer-bulten', dil: language },
    });
    if (ok) setEmailInput("");
  };

  return (
    <form onSubmit={handleSubscribe} className="flex items-center gap-3 w-full">
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 shrink-0 inline-block max-sm:hidden">
        {t('footer_newsletter_title')}
      </span>
      <div className="relative flex-grow sm:w-72">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          {t('footer_newsletter_placeholder')}
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          aria-label={t('footer_newsletter_placeholder')}
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder={t('footer_newsletter_placeholder')}
          className="w-full bg-gray-200/70 dark:bg-white/10 text-gray-900 dark:text-white text-xs px-4 py-3 rounded-full border border-gray-300/80 dark:border-white/15 focus:outline-none focus:border-slate-900 dark:focus:border-white pr-12 transition-colors placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={subStatus === 'loading'}
          className="absolute right-1 top-1 bottom-1 w-9 h-9 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-60"
          aria-label="Kayıt Ol"
        >
          <span className="material-symbols-outlined text-sm font-bold">send</span>
        </button>
      </div>
      {isSubscribed && (
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">{t('footer_newsletter_success')}</span>
      )}
      {subStatus === 'error' && (
        <span role="alert" className="text-xs font-bold text-red-500 shrink-0">{t('lead_error_generic')}</span>
      )}
    </form>
  );
}
