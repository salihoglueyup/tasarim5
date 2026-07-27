"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { JsonLd } from '@/components';
import { generateBreadcrumbs, professionalServiceSchema, webPageSchema } from '@/lib/schemas';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';

export default function Iletisim() {
  const { t, language } = useLanguage();

  const offices = [
    {
      city: t('contact_office_1_city'),
      address: t('contact_office_1_address'),
      phone: "0850 000 00 00",
      email: "istanbul@aloyonetim.com",
      mapUrl: "https://maps.google.com/?q=Kadikoy+Istanbul",
      isHQ: true
    },
    {
      city: t('contact_office_2_city'),
      address: t('contact_office_2_address'),
      phone: "0312 000 00 00",
      email: "ankara@aloyonetim.com",
      mapUrl: "https://maps.google.com/?q=Cankaya+Ankara",
      isHQ: false
    },
    {
      city: t('contact_office_3_city'),
      address: t('contact_office_3_address'),
      phone: "0232 000 00 00",
      email: "izmir@aloyonetim.com",
      mapUrl: "https://maps.google.com/?q=Bayrakli+Izmir",
      isHQ: false
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const { status, errorKey, submit: submitLead } = useLeadSubmit();
  const submitted = status === 'success';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submitLead(
      {
        type: 'contact',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        meta: { kaynak: 'iletisim-formu', dil: language },
      },
      honeypot
    );
    if (ok) {
      import('@/lib/analytics').then(({ trackEvent, AnalyticsEvents }) => {
        trackEvent(AnalyticsEvents.submitContact);
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
    }
  };

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('contact_title'), url: '/iletisim' }
  ]);

  const contactPageLd = webPageSchema({
    type: 'ContactPage',
    name: t('contact_title'),
    description: t('contact_desc'),
    path: '/iletisim',
  });

  // Merkezi ProfessionalService: NAP, geo, çalışma saatleri ve departman bazlı
  // contactPoint'ler tek kaynaktan gelir (SEO V4 Faz 61/62).
  const businessLd = professionalServiceSchema({ description: t('contact_desc') });

  return (
    <>
      <JsonLd data={[contactPageLd, breadcrumbLd, businessLd]} />
      <PageHeader 
        title={t('contact_title')} 
        description={t('contact_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-8 md:p-14 rounded-[3rem] border border-[var(--color-outline)]/60 shadow-sm flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">{t('contact_form_title')}</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light">
              {t('contact_form_desc')}
            </p>

            {submitted ? (
              <div role="status" aria-live="polite" className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/50 p-8 rounded-2xl text-center flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
                <div className="font-bold text-lg text-emerald-900 dark:text-emerald-300">{t('contact_form_success_title')}</div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400">{t('contact_form_success_desc')}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot — botlar için görünmez; gerçek kullanıcı doldurmaz. */}
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
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{t('contact_form_label_name')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact_form_ph_name')}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{t('contact_form_label_phone')}</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      aria-required="true"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('contact_form_ph_phone')}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{t('contact_form_label_email')}</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      aria-required="true"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact_form_ph_email')}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{t('contact_form_label_message')}</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    aria-required="true"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact_form_ph_message')}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                  />
                </div>

                {status === 'error' && (
                  <p role="alert" aria-live="assertive" className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {t((errorKey || 'lead_error_generic') as Parameters<typeof t>[0])}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transition-opacity mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? t('contact_form_sending') : t('contact_form_btn')}
                </button>
              </form>
            )}
          </div>

          {/* Contact Direct Info */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full">
                {t('contact_direct_badge')}
              </span>
              <h3 className="text-3xl font-bold mt-4">{t('contact_direct_title')}</h3>
            </div>

            <div className="flex flex-col gap-6 border-y border-white/15 py-6">
              <a href="tel:08500000000" className="flex items-center gap-4 text-gray-200 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl text-slate-300">call</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400">{t('contact_direct_cs')}</div>
                  <div className="text-xl font-bold">0850 000 00 00</div>
                </div>
              </a>

              <a href="https://wa.me/905550000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-200 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">chat</span>
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold">{t('contact_direct_wa')}</div>
                  <div className="text-lg font-bold">{t('contact_direct_wa_btn')}</div>
                </div>
              </a>
            </div>

            <div className="text-xs text-gray-300 font-light leading-relaxed">
              {t('contact_direct_hours')}
            </div>
          </div>

        </div>

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((o, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)]">{o.city}</h3>
              <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{o.address}</p>
              <div className="pt-2 text-xs font-bold text-slate-900 dark:text-white">{o.phone}</div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
