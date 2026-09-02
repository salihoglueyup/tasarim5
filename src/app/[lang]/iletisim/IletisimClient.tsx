"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ORG_NAME, ORG_ADDRESS, ORG_GEO, ORG_PHONE } from '@/lib/schemas';
import { ORG_ADDRESS_DISPLAY, ORG_PHONE_DISPLAY } from '@/lib/constants';
import { LocalBusinessSeo } from '@/components/seo';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { waLink } from '@/lib/cro';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Building2,
  Car,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(3, { message: 'Lütfen geçerli bir ad ve soyad giriniz.' }),
  phone: z.string().min(10, { message: 'Lütfen en az 10 haneli geçerli bir telefon numarası giriniz.' }),
  email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi giriniz.' }),
  subject: z.string().min(1, { message: 'Lütfen bir konu seçiniz.' }),
  message: z.string().min(10, { message: 'Mesajınız en az 10 karakter olmalıdır.' }).max(500, { message: 'Mesajınız en fazla 500 karakter olabilir.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function IletisimClient() {
  const { t, language } = useLanguage();
  const [honeypot, setHoneypot] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isOpenNow, setIsOpenNow] = useState(false);

  // Güvenli yerelleştirme yardımcısı (Asla raw key döndürmez)
  const safeT = (key: string, fallback: string) => {
    const val = t(key as any);
    if (!val || val === key || val.startsWith('contact_') || val.startsWith('CONTACT_')) {
      return fallback;
    }
    return val;
  };

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
    formState: { errors },
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
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          formType: 'contact',
          language,
        });
      }
      reset();
    }
  };

  const faqs = useMemo(
    () => [
      {
        q: safeT('contact_faq_1_q', 'Teklif alma ve yerinde keşif süreci nasıl işler?'),
        a: safeT(
          'contact_faq_1_a',
          'Talebiniz bize ulaştıktan sonra 2 saat içinde uzman tesis yöneticimiz sizi arar. Binanızın büyüklüğüne ve ihtiyaçlarına göre 24 saat içinde ücretsiz keşif planlanır ve 634 KMK uyumlu şeffaf işletme projesi taslağı sunulur.'
        ),
      },
      {
        q: safeT('contact_faq_2_q', 'Acil teknik arızalarda müdahale süreniz nedir?'),
        a: safeT(
          'contact_faq_2_a',
          '7/24 aktif mobil teknik servis filomuz sayesinde asansör kalması, ana boru patlaması veya elektrik kesintisi gibi kritik arızalara İstanbul genelinde ortalama 45 dakika içinde müdahale ediyoruz.'
        ),
      },
      {
        q: safeT('contact_faq_3_q', 'Genel merkezimizde randevusuz görüşme yapabilir miyiz?'),
        a: safeT(
          'contact_faq_3_a',
          'Kadıköy genel merkezimiz hafta içi 09:00 - 18:00 saatleri arasında açıktır. Ancak ilgili birim müdürümüzün hazır bulunması ve size özel detaylı sunum yapabilmemiz için randevu oluşturmanızı tavsiye ederiz.'
        ),
      },
      {
        q: 'Mevcut site yöneticiliğinden profesyonel yönetime geçiş nasıl yapılır?',
        a: 'Kat Malikleri Kurulu Genel Kurulunda salt çoğunluk (arsa payı ve sayı çoğunluğu) ile şirketimize yetki verilmesi yeterlidir. Karar sonrasında eski yönetimden tüm evrak, defter ve mali hesap devri uzman hukuk ekibimiz tarafından tutanakla devralınır.',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors">
      <LocalBusinessSeo
        businessName={ORG_NAME}
        telephone={ORG_PHONE}
        address={{
          streetAddress: ORG_ADDRESS.streetAddress,
          addressLocality: ORG_ADDRESS.addressLocality,
          addressRegion: ORG_ADDRESS.addressRegion,
          postalCode: ORG_ADDRESS.postalCode,
          addressCountry: ORG_ADDRESS.addressCountry,
        }}
        geo={{
          latitude: ORG_GEO.latitude,
          longitude: ORG_GEO.longitude,
        }}
        areaServed={['İstanbul', 'Kadıköy', 'Ataşehir', 'Üsküdar', 'Maltepe', 'Beşiktaş', 'Sarıyer']}
      />

      {/* 1. HERO BÖLÜMÜ */}
      <section className="relative pt-36 pb-36 md:pt-44 md:pb-44 overflow-hidden bg-slate-950 text-white border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 -z-10" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          {/* Canlı Durum Rozeti */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold mb-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              {isOpenNow && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpenNow ? 'bg-emerald-400' : 'bg-rose-500'}`} />
            </span>
            <span className="text-slate-200">
              {isOpenNow ? 'Genel Merkezimiz Şu Anda Açık (09:00 - 18:00)' : 'Mesai Dışı — 7/24 Acil Çağrı Hattı Aktif'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl text-white drop-shadow-sm">
            {safeT('contact_hero_title_1', 'Bizimle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">{safeT('contact_hero_title_2', 'İletişime Geçin')}</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            {safeT(
              'contact_hero_desc',
              'İstanbul genelinde 120+ prestijli site ve tesis için şeffaf aidat yönetimi, 5188 güvenlik ve 7/24 teknik bakım çözümleri sunuyoruz.'
            )}
          </p>
        </div>
      </section>

      {/* 2. AMİRAL İLETİŞİM KARTI (2 Kolonlu Modern Kart) */}
      <section className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 mb-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/15 dark:shadow-black/50 border border-slate-200/80 dark:border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* SOL KOLON: Kurumsal Kanallar & Hızlı Bağlantılar (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Hızlı Ulaşım Kanalları</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                7/24 Doğrudan Destek
              </h2>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed font-light">
                Teklif talepleriniz, acil arıza bildirimleri veya yerinde keşif randevusu için bize dilediğiniz kanaldan ulaşabilirsiniz.
              </p>

              <div className="space-y-5">
                {/* Çağrı Merkezi */}
                <a
                  href={`tel:${ORG_PHONE}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      7/24 Çağrı Merkezi
                    </div>
                    <div className="text-lg font-bold text-white tracking-wide">
                      {ORG_PHONE_DISPLAY}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </a>

                {/* E-Posta */}
                <a
                  href="mailto:info@aloyonetim.com.tr"
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Resmi E-Posta
                    </div>
                    <div className="text-base font-bold text-white truncate">
                      info@aloyonetim.com.tr
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>

                {/* Genel Merkez Adresi */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                      Genel Merkez & Yönetim Ofisi
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                      {ORG_ADDRESS_DISPLAY}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Butonu */}
                <a
                  href={waLink('Merhaba Alo Yönetim, sitemiz/tesisimiz için hizmetleriniz hakkında bilgi almak istiyorum.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Canlı Danışma Hattı</span>
                </a>
              </div>
            </div>

            {/* SLA ve Güvenilirlik Alt Rozeti */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 41001 & 5188 Lisanslı</span>
              </span>
              <span className="font-semibold text-slate-300">45 Dk Mobil Müdahale</span>
            </div>
          </div>

          {/* SAĞ KOLON: İletişim Formu (lg:col-span-7) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
            {submitted ? (
              <div className="py-12 px-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                  Mesajınız Başarıyla İletildi!
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 max-w-md mb-6 leading-relaxed">
                  Talebiniz müşteri ilişkileri departmanımıza kaydedildi. Uzmanımız en geç 2 saat içerisinde sizinle iletişime geçecektir.
                </p>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    Bize Mesaj Gönderin
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-light">
                    Sitenizin veya tesisinizin yönetim, güvenlik ya da teknik ihtiyaçlarını belirtin, size özel çözüm önerisi hazırlayalım.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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

                  {/* Ad & Telefon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Adınız Soyadınız <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register('name')}
                        id="name"
                        type="text"
                        placeholder="Örn: Ahmet Yılmaz"
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                      />
                      {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Telefon Numaranız <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register('phone')}
                        id="phone"
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                      />
                      {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone.message}</span>}
                    </div>
                  </div>

                  {/* E-Posta & Konu */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        E-Posta Adresiniz <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="ahmet@ornek.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                      />
                      {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        İletişim Konusu <span className="text-amber-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          {...register('subject')}
                          id="subject"
                          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                            errors.subject
                              ? 'border-red-500 focus:ring-red-500/20'
                              : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                          }`}
                        >
                          <option value="">Konu Seçiniz...</option>
                          <option value="teklif">Entegre Tesis & Site Yönetimi Teklifi</option>
                          <option value="guvenlik">5188 Lisanslı Özel Güvenlik Hizmeti</option>
                          <option value="teknik">Teknik Bakım & Periyodik İşletme</option>
                          <option value="temizlik">Temizlik & Ortak Alan Hijyen Yönetimi</option>
                          <option value="hukuk">634 KMK Hukuki Danışmanlık & İcra Takibi</option>
                          <option value="diger">Diğer / Genel Danışma</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.subject && <span className="text-xs text-red-500 font-medium">{errors.subject.message}</span>}
                    </div>
                  </div>

                  {/* Mesaj */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Mesajınız <span className="text-amber-500">*</span>
                      </label>
                      <span className={`text-[11px] ${messageVal.length > 500 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                        {messageVal.length}/500
                      </span>
                    </div>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={4}
                      placeholder="Apartman/Site adı, bağımsız bölüm sayısı ve ihtiyaçlarınızı kısaca özetleyiniz..."
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500/20'
                          : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                    />
                    {errors.message && <span className="text-xs text-red-500 font-medium">{errors.message.message}</span>}
                  </div>

                  {/* Gönder Butonu */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-base transition-all shadow-lg hover:shadow-slate-900/20 active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Mesajı Gönder</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. LOKASYON & GOOGLE HARİTA BÖLÜMÜ */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-white/10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Ulaşım Detayları */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Lokasyon & Ulaşım Rehberi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Kadıköy Genel Merkezimize Kolay Ulaşım
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Ofisimiz Kadıköy Rıhtım, vapur iskeleleri ve Söğütlüçeşme Metrobüs/Marmaray aktarma merkezine yalnızca 5-7 dakika yürüme mesafesindedir.
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Hafta İçi:</strong> 09:00 - 18:00 | <strong>Cumartesi:</strong> 09:00 - 13:00</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <Car className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Misafir kapalı otoparkımız ve vale hizmetimiz mevcuttur.</span>
              </div>
            </div>
          </div>

          {/* Harita Embed */}
          <div className="lg:col-span-7 h-[360px] rounded-2xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.649622987158!2d29.0289!3d40.9901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab8677a28e833%3A0x6b4026bb4e81561!2zS2FkxLFrw7Z5LCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alo Yönetim Genel Merkez Ofisi Konumu"
            />
          </div>

        </div>
      </section>

      {/* 4. SIKÇA SORULAN SORULAR (Zero-Jank CSS Grid Akordeon) */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest bg-slate-200/80 dark:bg-white/5 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            İletişim & Süreç Hakkında Merak Edilenler
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden transition-colors shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-4.5 text-left font-bold text-slate-900 dark:text-slate-100 flex justify-between items-center gap-4 cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-500' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light border-t border-slate-100 dark:border-white/5">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
