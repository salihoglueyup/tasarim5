"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, professionalServiceSchema, webPageSchema, ORG_NAME, ORG_ADDRESS, ORG_GEO, ORG_PHONE } from '@/lib/schemas';
import { ORG_ADDRESS_DISPLAY, ORG_PHONE_DISPLAY } from '@/lib/constants';
import { LocalBusinessSeo } from '@/components';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CallbackForm from '@/components/cro/CallbackForm';

const contactSchema = z.object({
  name: z.string().min(3, { message: 'Lütfen geçerli bir isim giriniz.' }),
  phone: z.string().min(10, { message: 'Geçerli bir telefon numarası giriniz.' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz.' }),
  subject: z.string().min(1, { message: 'Lütfen bir konu seçiniz.' }),
  message: z.string().min(10, { message: 'Mesajınız en az 10 karakter olmalıdır.' }).max(500, { message: 'Mesajınız en fazla 500 karakter olabilir.' }),
});
type ContactFormValues = z.infer<typeof contactSchema>;

import { Variants } from 'framer-motion';

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

export default function Iletisim() {
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

  const [rating, setRating] = useState({ ratingValue: '4.9', reviewCount: '150' });

  useEffect(() => {
    fetch('/api/reviews').then(res => res.json()).then(data => {
      if(data.ratingValue) setRating({ ratingValue: data.ratingValue, reviewCount: data.reviewCount });
    }).catch(err => console.error(err));
  }, []);

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

  const serviceLd = professionalServiceSchema({
    description: t('contact_desc'),
    aggregateRating: rating
  });

  const faqs = [
    { q: t('contact_faq_1_q'), a: t('contact_faq_1_a') },
    { q: t('contact_faq_2_q'), a: t('contact_faq_2_a') },
    { q: t('contact_faq_3_q'), a: t('contact_faq_3_a') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0B1120]">
      <JsonLd data={[contactPageLd, breadcrumbLd, serviceLd]} />
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
      
      {/* ÜST HERO BÖLÜMÜ (Light/Ferah Tema, Grid Desen) */}
      <div className="w-full bg-[var(--color-background)] dark:bg-[#0B1120] pt-40 pb-56 px-4 flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle Grid Pattern for Light Mode */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60 dark:opacity-100" />
        
        {/* Background Glows (Hafifletildi) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-brand-500/5 dark:bg-brand-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-slate-500/5 dark:bg-slate-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              {isOpenNow && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpenNow ? 'bg-slate-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-200">
              {isOpenNow ? t('contact_open_now') : t('contact_closed_now')}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-primary)] dark:text-white"
          >
            {t('contact_hero_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] dark:from-white dark:to-gray-400">{t('contact_hero_title_2')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--color-secondary)] dark:text-gray-400 font-medium leading-relaxed"
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
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{t('contact_info_hq')}</span>
                    <span className="text-sm font-medium leading-relaxed text-gray-200">{ORG_ADDRESS_DISPLAY}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof Alt Kısım */}
            <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[var(--color-primary)] bg-gray-600"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[var(--color-primary)] bg-gray-500"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[var(--color-primary)] bg-brand-500 flex items-center justify-center text-[10px] font-bold text-white">+500</div>
                </div>
                <div>
                  <div className="flex gap-1 text-amber-400 text-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <div className="text-xs font-medium text-gray-300 mt-1">{t('contact_social_proof')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF: Formlar */}
          <div className="lg:w-3/5 p-8 md:p-12 relative">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full">
              
              {/* Quick Call Widget */}
              <motion.div variants={itemVariants} className="bg-amber-50 dark:bg-amber-500/5 p-6 rounded-2xl border border-amber-100 dark:border-amber-500/10 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-300">{t('contact_quick_call_title')}</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-500/70 font-medium">{t('contact_quick_call_desc')}</p>
                  </div>
                </div>
                <CallbackForm variant="inline" />
              </motion.div>

              {/* İletişim Formu */}
              <motion.div variants={itemVariants} className="flex-1">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[var(--color-primary)]">{t('contact_detailed_form_title')}</h2>
                </div>

                {submitted ? (
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-700/50 p-8 rounded-2xl text-center flex flex-col items-center gap-3 h-full justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-800 dark:text-slate-300 mb-2">check_circle</span>
                    <div className="font-bold text-xl text-slate-900 dark:text-slate-100">{t('contact_form_success_title')}</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">{t('contact_form_success_desc')}</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute left-[-9999px] w-px h-px opacity-0" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input id="contact-name" type="text" {...register('name')} placeholder={t('contact_form_label_name')} className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} text-sm text-[var(--color-primary)] dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors`} />
                        <span className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-[20px] ${errors.name ? 'text-red-500' : 'text-gray-400'}`}>person</span>
                        <AnimatePresence>
                          {errors.name && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-[11px] font-bold mt-1 ml-1">{errors.name.message}</motion.p>}
                        </AnimatePresence>
                      </div>

                      <div className="relative">
                        <input id="contact-phone" type="tel" {...register('phone')} placeholder={t('contact_form_label_phone')} className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} text-sm text-[var(--color-primary)] dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors`} />
                        <span className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-[20px] ${errors.phone ? 'text-red-500' : 'text-gray-400'}`}>call</span>
                        <AnimatePresence>
                          {errors.phone && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-[11px] font-bold mt-1 ml-1">{errors.phone.message}</motion.p>}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input id="contact-email" type="email" {...register('email')} placeholder={t('contact_form_label_email')} className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} text-sm text-[var(--color-primary)] dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors`} />
                        <span className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-[20px] ${errors.email ? 'text-red-500' : 'text-gray-400'}`}>mail</span>
                        <AnimatePresence>
                          {errors.email && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-[11px] font-bold mt-1 ml-1">{errors.email.message}</motion.p>}
                        </AnimatePresence>
                      </div>

                      <div className="relative">
                        <select id="contact-subject" {...register('subject')} defaultValue="" className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} text-sm text-[var(--color-primary)] dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors appearance-none cursor-pointer`}>
                          <option value="" disabled hidden>{t('contact_form_subject_default')}</option>
                          <option value={t('contact_form_subject_quote')}>{t('contact_form_subject_quote')}</option>
                          <option value={t('contact_form_subject_job')}>{t('contact_form_subject_job')}</option>
                          <option value={t('contact_form_subject_support')}>{t('contact_form_subject_support')}</option>
                          <option value={t('contact_form_subject_other')}>{t('contact_form_subject_other')}</option>
                        </select>
                        <span className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors text-[20px] ${errors.subject ? 'text-red-500' : 'text-gray-400'}`}>expand_more</span>
                        <AnimatePresence>
                          {errors.subject && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-[11px] font-bold mt-1 ml-1">{errors.subject.message}</motion.p>}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="relative">
                      <textarea id="contact-message" rows={5} {...register('message')} placeholder={t('contact_form_label_message')} className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} text-sm text-[var(--color-primary)] dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors resize-none`} />
                      <div className={`absolute right-3 bottom-3 text-[10px] font-bold transition-colors ${messageVal.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                        {messageVal.length} / 500
                      </div>
                      <AnimatePresence>
                        {errors.message && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-[11px] font-bold mt-1 ml-1">{errors.message.message}</motion.p>}
                      </AnimatePresence>
                    </div>

                    {status === 'error' && (
                      <div role="alert" aria-live="assertive" className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-500/10 p-3 rounded-xl">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        {t((errorKey || 'lead_error_generic') as Parameters<typeof t>[0])}
                      </div>
                    )}

                    <button type="submit" disabled={status === 'loading'} className="w-full bg-[var(--color-primary)] dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl shadow-md hover:opacity-95 transition-all mt-1 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn">
                      {status === 'loading' ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                          {t('contact_form_sending')}
                        </>
                      ) : (
                        <>
                          <span>{t('contact_form_btn')}</span>
                          <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover/btn:translate-x-1">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ALT BÖLÜM: SSS VE HARİTA (Grid Layout) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* SSS Accordion */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="bg-white dark:bg-[var(--color-surface)] border border-gray-100 dark:border-[var(--color-outline)]/60 p-6 md:p-8 rounded-[2rem] shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-brand-500 bg-brand-500/10 p-2 rounded-xl">forum</span>
              {t('contact_faq_header')}
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-white/5">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 text-left text-sm font-bold text-[var(--color-primary)] flex justify-between items-center transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="pr-4">{faq.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} className="material-symbols-outlined text-gray-400 shrink-0 text-xl">
                      expand_more
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-white dark:bg-transparent border-t border-gray-100 dark:border-white/5">
                        <div className="p-5 text-sm text-[var(--color-secondary)] leading-relaxed font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Harita */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 relative group bg-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650893386043!2d29.023812876615754!3d40.989104420601334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab867d73c73bb%3A0xa9dc21cc996e300!2sOsmana%C4%9Fa%2C%20Misak%C4%B1%20Milli%20Sk.%20No%3A94%20A%2C%2034714%20Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105 dark:invert-[.9] dark:hue-rotate-180 dark:grayscale-[50%] dark:contrast-125"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/50 dark:border-white/10 p-4 rounded-2xl shadow-xl z-20 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shrink-0">
                  <span className="material-symbols-outlined text-[16px]">store</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary)] text-xs">{t('contact_map_hq')}</h4>
                  <p className="text-[10px] text-[var(--color-secondary)]">{t('contact_map_city')}</p>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Osmanağa+Mah.+Misakı+Milli+Sok.+No:94A+Kadıköy/İstanbul" target="_blank" rel="noopener noreferrer" className="mt-1 bg-brand-500 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors">
                <span className="material-symbols-outlined text-[14px]">directions</span>
                {t('contact_map_directions')}
              </a>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
