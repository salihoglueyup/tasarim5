"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ORG_NAME, ORG_ADDRESS, ORG_GEO, ORG_PHONE } from '@/lib/schemas';
import { ORG_ADDRESS_DISPLAY, ORG_PHONE_DISPLAY } from '@/lib/constants';
import { LocalBusinessSeo, NapAuthorityBadgeSeo } from '@/components/seo';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CallbackForm from '@/components/cro/CallbackForm';
import { Variants } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(3, { message: 'Lütfen geçerli bir isim giriniz.' }),
  phone: z.string().min(10, { message: 'Geçerli bir telefon numarası giriniz.' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz.' }),
  subject: z.string().min(1, { message: 'Lütfen bir konu seçiniz.' }),
  message: z.string().min(10, { message: 'Mesajınız en az 10 karakter olmalıdır.' }).max(500, { message: 'Mesajınız en fazla 500 karakter olabilir.' }),
});
type ContactFormValues = z.infer<typeof contactSchema>;

// Animasyonlar
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function IletisimClient() {
  const { t, language } = useLanguage();
  const [honeypot, setHoneypot] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isOpenNow, setIsOpenNow] = useState(false);

  // Canlı Çalışma Saatleri Kontrolü (TR Saati - UTC+3)
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const utcHour = now.getUTCHours();
      const trHour = (utcHour + 3) % 24;
      const day = now.getUTCDay(); // 0=Pazar, 1=Pzt, ..., 6=Cmt
      // Hafta içi 09:00 - 18:00
      if (day >= 1 && day <= 5 && trHour >= 9 && trHour < 18) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const { status, errorKey, submit: submitLead } = useLeadSubmit();
  const submitted = status === 'success';

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  });
  const messageVal = watch('message', '');

  const onSubmit = async (data: ContactFormValues) => {
    const ok = await submitLead(
      {
        type: 'contact',
        name: data.name,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        message: data.message,
        meta: { kaynak: 'iletisim-formu', dil: language },
      },
      honeypot
    );
    if (ok) {
      import('@/lib/analytics').then(({ trackEvent, AnalyticsEvents }) => {
        trackEvent(AnalyticsEvents.submitContact);
      });
      // Trigger new GTM Event Architecture (Faz 4.3)
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          formType: 'contact',
          language: language
        });
      }
      reset();
    }
  };

  const faqs = [
    { q: t('contact_faq_1_q'), a: t('contact_faq_1_a') },
    { q: t('contact_faq_2_q'), a: t('contact_faq_2_a') },
    { q: t('contact_faq_3_q'), a: t('contact_faq_3_a') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0B1120]">
      <LocalBusinessSeo 
        businessName={ORG_NAME}
        telephone={ORG_PHONE}
        address={{
          streetAddress: ORG_ADDRESS.streetAddress,
          addressLocality: ORG_ADDRESS.addressLocality,
          addressRegion: ORG_ADDRESS.addressRegion,
          postalCode: ORG_ADDRESS.postalCode,
          addressCountry: ORG_ADDRESS.addressCountry
        }}
        geo={{
          latitude: ORG_GEO.latitude,
          longitude: ORG_GEO.longitude
        }}
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe"]}
      />
      
      {/* ÜST HERO BÖLÜMÜ (Titanium & Slate Koyu Tema) */}
      <div className="w-full bg-slate-950 text-white pt-40 pb-56 px-4 flex flex-col items-center text-center relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#15151C] to-slate-900 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
        
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-slate-700/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-slate-800/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full shadow-sm backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              {isOpenNow && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpenNow ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {isOpenNow ? t('contact_open_now') : t('contact_closed_now')}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl"
          >
            {t('contact_hero_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400">{t('contact_hero_title_2')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed"
          >
            {t('contact_hero_desc')}
          </motion.p>
        </div>
      </div>

      {/* FLOATING CARD CONTAINER (Ana İletişim Kartı) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-40 relative z-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row items-stretch"
        >
          {/* SOL TARAF: İletişim Bilgileri (Marka Rengi - Primary) */}
          <div className="lg:w-2/5 w-full bg-[var(--color-primary)] dark:bg-black/50 text-[var(--color-on-primary)] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
            {/* Kart İçi Dekoratif Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8">{t('contact_info_title')}</h3>
              <p className="text-gray-300 mb-10 font-medium">{t('contact_info_desc')}</p>
              
              <div className="flex flex-col gap-8">
                <a href={`tel:${ORG_PHONE}`} className="group flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-brand-500 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-xl group-hover:text-white">call</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{t('contact_info_cs')}</span>
                    <span className="text-xl font-bold">{ORG_PHONE_DISPLAY}</span>
                  </div>
                </a>
                
                <a href="mailto:info@aloyonetim.com.tr" className="group flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-slate-700 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-xl group-hover:text-white">mail</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{t('contact_info_email')}</span>
                    <span className="text-lg font-medium">info@aloyonetim.com.tr</span>
                  </div>
                </a>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl text-white">location_on</span>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{t('contact_info_hq' as any)}</span>
                    <span className="text-sm font-medium leading-relaxed text-gray-200">{ORG_ADDRESS_DISPLAY}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-300">{t('contact_info_emergency' as any)}</span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {t('contact_info_emergency_badge' as any)}
              </span>
            </div>
          </div>

          {/* SAĞ TARAF: Modern İletişim Formu */}
          <div className="lg:w-3/5 w-full p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('contact_form_title' as any)}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{t('contact_form_desc' as any)}</p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-8 text-center flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">{t('contact_form_success_title' as any)}</h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 max-w-md">{t('contact_form_success_desc' as any)}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
                  {/* Honeypot Spam Koruması */}
                  <input
                    type="text"
                    name="website_url_check"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorKey && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-300">
                      {errorKey}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{t('contact_form_name_label' as any)}</label>
                      <input 
                        {...register('name')}
                        id="name" 
                        type="text" 
                        placeholder={t('contact_form_name_ph' as any)}
                        className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-brand-500/20'}`}
                      />
                      {errors.name && <span className="text-xs text-red-500 mt-0.5">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{t('contact_form_phone_label' as any)}</label>
                      <input 
                        {...register('phone')}
                        id="phone" 
                        type="tel" 
                        placeholder={t('contact_form_phone_ph' as any)}
                        className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-brand-500/20'}`}
                      />
                      {errors.phone && <span className="text-xs text-red-500 mt-0.5">{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{t('contact_form_email_label' as any)}</label>
                      <input 
                        {...register('email')}
                        id="email" 
                        type="email" 
                        placeholder={t('contact_form_email_ph' as any)}
                        className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-brand-500/20'}`}
                      />
                      {errors.email && <span className="text-xs text-red-500 mt-0.5">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{t('contact_form_subject_label' as any)}</label>
                      <div className="relative">
                        <select 
                          {...register('subject')}
                          id="subject" 
                          className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${errors.subject ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-brand-500/20'}`}
                        >
                          <option value="">{t('contact_form_subject_opt_default' as any)}</option>
                          <option value="teklif">{t('contact_form_subject_opt_offer' as any)}</option>
                          <option value="teknik">{t('contact_form_subject_opt_tech' as any)}</option>
                          <option value="guvenlik">{t('contact_form_subject_opt_sec' as any)}</option>
                          <option value="diger">{t('contact_form_subject_opt_other' as any)}</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
                          arrow_drop_down
                        </span>
                      </div>
                      {errors.subject && <span className="text-xs text-red-500 mt-0.5">{errors.subject.message}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{t('contact_form_msg_label' as any)}</label>
                      <span className={`text-[11px] ${messageVal.length > 500 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                        {messageVal.length}/500
                      </span>
                    </div>
                    <textarea 
                      {...register('message')}
                      id="message" 
                      rows={4} 
                      placeholder={t('contact_form_msg_ph' as any)}
                      className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-brand-500/20'}`}
                    ></textarea>
                    {errors.message && <span className="text-xs text-red-500 mt-0.5">{errors.message.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>{t('contact_form_btn_send' as any)}</span>
                        <span className="material-symbols-outlined text-sm">send</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* DOĞRULANMIŞ KURUMSAL KÜNYE & MERKEZİ NAP ROZETİ (E-E-A-T & Local SEO) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NapAuthorityBadgeSeo />
      </div>

      {/* SIKÇA SORULAN SORULAR BÖLÜMÜ */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-widest bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-1.5 rounded-full inline-block mb-3">
            {t('contact_faq_badge' as any)}
          </span>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">{t('contact_faq_title')}</h3>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-5 text-left font-bold text-slate-800 dark:text-gray-200 flex justify-between items-center gap-4 cursor-pointer hover:text-brand-500 dark:hover:text-white"
              >
                <span>{faq.q}</span>
                <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-brand-500' : ''}`}>
                  expand_more
                </span>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-50 dark:border-white/5 leading-relaxed font-light">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* HARİTA VE ÇALIŞMA SAATLERİ (Full Width Bölüm) */}
      <div className="w-full bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Lokasyon Açıklaması */}
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-widest bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-1.5 rounded-full w-fit">
                {t('contact_loc_badge' as any)}
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t('contact_loc_title' as any)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {t('contact_loc_desc' as any)}
              </p>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                  <span className="material-symbols-outlined text-slate-600 text-lg">schedule</span>
                  <span>{t('contact_loc_hours' as any)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                  <span className="material-symbols-outlined text-slate-600 text-lg">local_parking</span>
                  <span>{t('contact_loc_parking' as any)}</span>
                </div>
              </div>
            </div>

            {/* Google Harita Entegrasyonu */}
            <div className="lg:col-span-2 w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.649622987158!2d29.0289!3d40.9901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab8677a28e833%3A0x6b4026bb4e81561!2zS2FkxLFrw7Z5LCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Alo Yönetim Genel Merkez Ofisi Konumu"
              ></iframe>
            </div>

          </div>
        </div>
      </div>

      <CallbackForm />
    </div>
  );
}
