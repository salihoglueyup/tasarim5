"use client";

import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { DISTRICTS } from '@/data/districts';
import dynamic from 'next/dynamic';
import { ORG_ADDRESS_DISPLAY } from '@/lib/constants';
import AppBadges from '@/components/ui/AppBadges';
import { waLink } from '@/lib/cro';

// Faz 14: Bülten formu sadece kullanıcı Footer'a indiğinde (göründüğünde) dinamik yüklenir
const NewsletterForm = dynamic(() => import('./NewsletterForm'), { ssr: false });

export default function Footer() {
  const { t, language } = useLanguage();
  const [istanbulTime, setIstanbulTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      try {
        const time = new Date().toLocaleTimeString('tr-TR', { 
          timeZone: 'Europe/Istanbul', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        setIstanbulTime(time);
      } catch {
        setIstanbulTime("");
      }
    };
    // Faz 13: İlk çalıştırmayı setTimeout/requestIdleCallback ile geciktirerek LCP ve TBT rahatlatılır
    const initialTimer = setTimeout(updateTime, 1000);
    // Faz 13: 30000 yerine 60000 (1 dakika) seyrek güncelleme
    const interval = setInterval(updateTime, 60000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="relative bg-[#f8f9fa] dark:bg-slate-950 border-t border-slate-200/80 dark:border-white/10 w-full overflow-hidden text-slate-700 dark:text-slate-300">
      
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pt-10 md:pt-16 pb-6 md:pb-8 flex flex-col gap-10 md:gap-12">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Info & App Links (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 pr-2">
            <Link href={language === 'tr' ? '/' : `/${language}`} prefetch={true} className="inline-block" aria-label="Alo Yönetim Anasayfa">
              <Logo />
            </Link>

            <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              {t('footer_about_text')}
            </p>

            {/* App Store & Google Play & AppGallery Pills */}
            <AppBadges />

            {/* Brand Info & App Links (4 Cols) */}
          </div>

          {/* Column 2: KURUMSAL (2.5 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">{t('footer_col_corporate')}</h3>
            <div className="flex flex-col gap-3" role="navigation" aria-label="Alt menü - Kurumsal">
              {[
                { nameKey: 'nav_about', path: '/hakkimizda' },
                { nameKey: 'nav_vision', path: '/kurumsal/vizyon-misyon' },
                { nameKey: 'nav_quality', path: '/kurumsal/kalite-politikamiz' },
                { nameKey: 'nav_sustainability', path: '/kurumsal/surdurulebilirlik' },
                { nameKey: 'nav_references', path: '/referanslar' },
                { nameKey: 'nav_success_stories', path: '/basari-hikayeleri' },
                { nameKey: 'nav_contact', path: '/iletisim' },
                { nameKey: 'nav_faq', path: '/sss' },
                { nameKey: 'nav_blog', path: '/blog' }
              ].map((item) => (
                <Link 
                  key={item.nameKey} 
                  href={item.path} 
                  prefetch={true}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] dark:hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-slate-900 dark:text-white" aria-hidden="true">arrow_forward</span>
                  {t(item.nameKey as Parameters<typeof t>[0])}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: ÇÖZÜMLERİMİZ (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">{t('footer_col_solutions')}</h3>
            <div className="flex flex-col gap-3" role="navigation" aria-label="Alt menü - Çözümler">
              {[
                { nameKey: 'nav_property_mgmt', path: '/hizmetler/tesis-yonetimi' }, // Amiral Gemisi #1
                { nameKey: 'nav_all_services', path: '/hizmetler' },
                { nameKey: 'nav_security', path: '/hizmetler/guvenlik-yonetimi' },
                { nameKey: 'nav_cleaning', path: '/hizmetler/temizlik-ve-hijyen' },
                { nameKey: 'nav_tech_maintenance', path: '/hizmetler/teknik-bakim' },
                { nameKey: 'nav_landscaping', path: '/hizmetler/peyzaj-ve-bahce-bakimi' },
                { nameKey: 'nav_pool_care', path: '/hizmetler/havuz-bakimi-ve-hijyen' },
                { nameKey: 'nav_pest_control', path: '/hizmetler/hasere-ve-dezenfeksiyon' },
                { nameKey: 'nav_legal_consulting', path: '/hizmetler/hukuk-ve-icra-danismanligi' },
                { nameKey: 'nav_dues', path: '/hizmetler/aidat-takibi' },
                { nameKey: 'nav_sectoral_solutions', path: '/sektorel-cozumler' },
                { nameKey: 'nav_employment_bridge', path: '/istihdam-koprusu' },
                { nameKey: 'nav_academy', path: '/guvenlik-akademisi' }
              ].map((item) => (
                <Link 
                  key={item.nameKey} 
                  href={item.path} 
                  prefetch={true}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] dark:hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-slate-900 dark:text-white" aria-hidden="true">arrow_forward</span>
                  {t(item.nameKey as Parameters<typeof t>[0])}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: İLETİŞİM BİLGİLERİ (2.5 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">{t('footer_col_contact')}</h3>
            
            {/* Live Weather & Time Pill */}
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></span>
              <span>{t('footer_istanbul_center')} {istanbulTime || '10:42'}</span>
              <span className="material-symbols-outlined text-sm text-amber-500">partly_cloudy_day</span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 text-sm">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-gray-700 dark:text-gray-300">
                <span className="material-symbols-outlined text-lg">location_on</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-xs">{t('footer_headquarters')}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-light leading-snug">{ORG_ADDRESS_DISPLAY}</span>
              </div>
            </div>

            {/* Customer Service Phone */}
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 text-gray-700 dark:text-gray-300">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-xs">{t('footer_customer_service')}</span>
                <a href="tel:02165504848" className="text-xs font-bold text-[var(--color-primary)] dark:text-white hover:underline">0216 550 48 48</a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 text-gray-700 dark:text-gray-300">
                <span className="material-symbols-outlined text-lg">schedule</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-xs">{t('footer_working_hours_title')}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-light leading-snug">09:00 - 18:00</span>
              </div>
            </div>

            {/* WhatsApp Green Pill Button */}
            <a 
              href={waLink(t('cro_whatsapp_prefill'))}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-xl">chat</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{t('footer_whatsapp_title')}</span>
                <span className="text-[11px] text-slate-600 dark:text-gray-400 font-light">{t('footer_whatsapp_desc')}</span>
              </div>
            </a>
          </div>

        </div>

        {/* Middle Row: ISO Badges & Newsletter */}
        <div className="pt-8 border-t border-gray-200/80 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* ISO Badges */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
              <span className="material-symbols-outlined text-lg text-slate-900 dark:text-white">verified</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white leading-none">ISO 9001:2015</div>
                <div className="text-[10px] text-gray-500">{t('footer_badge_quality')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
              <span className="material-symbols-outlined text-lg text-slate-900 dark:text-white">health_and_safety</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white leading-none">ISO 45001</div>
                <div className="text-[10px] text-gray-500">{t('footer_badge_ohs')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
              <span className="material-symbols-outlined text-lg text-slate-900 dark:text-white">admin_panel_settings</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white leading-none">{t('footer_badge_sec')}</div>
                <div className="text-[10px] text-gray-500">{t('footer_badge_sec_desc')}</div>
              </div>
            </div>
          </div>

          {/* Newsletter Form & Social Media (Faz 14 Lazy Load) */}
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <NewsletterForm />
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 lg:justify-end">
              <a href="https://www.facebook.com/aloyonetim" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-[#1877F2] hover:text-white transition-all shadow-sm hover:scale-110" aria-label="Facebook">
                <span className="sr-only">Facebook</span>
                <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com/aloyonetim" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm hover:scale-110" aria-label="Twitter">
                <span className="sr-only">Twitter</span>
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://www.instagram.com/aloyonetim" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-[#E1306C] hover:text-white transition-all shadow-sm hover:scale-110" aria-label="Instagram">
                <span className="sr-only">Instagram</span>
                <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/aloyonetim" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-[#0077B5] hover:text-white transition-all shadow-sm hover:scale-110" aria-label="LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.youtube.com/@aloyonetim" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-[#FF0000] hover:text-white transition-all shadow-sm hover:scale-110" aria-label="YouTube">
                <span className="sr-only">YouTube</span>
                <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bölge Dizini & Yerel Hizmetler (Yerel SEO — 56 İlçe Hizmet Ağı) */}
        <div className="pt-8 border-t border-gray-200/80 dark:border-white/10 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">
              {t('footer_service_areas')}
            </h3>
            <div className="flex flex-wrap gap-x-2 gap-y-2" role="navigation" aria-label={t('footer_service_areas')}>
              {DISTRICTS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/bolgeler/${d.slug}`}
                  className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                >
                  {d.name} {t('footer_property_management')}
                </Link>
              ))}
              <Link
                href="/bolgeler"
                className="text-xs font-bold text-slate-900 dark:text-white hover:underline inline-block py-1 px-2"
              >
                {t('footer_all_regions')} →
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Tesis & Mülk Yönetimi Çözümleri
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[11px] text-gray-500 dark:text-gray-400">
              <Link href="/hizmetler/tesis-yonetimi" className="font-semibold text-slate-900 dark:text-white hover:underline inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">İstanbul Tesis Yönetimi & Entegre İşletme</Link>
              <span>•</span>
              <Link href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Rezidans & Lüks Site Yönetimi</Link>
              <span>•</span>
              <Link href="/hizmetler/tesis-yonetimi/plaza-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Plaza & İş Merkezi Yönetimi</Link>
              <span>•</span>
              <Link href="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Toplu Konut & TOKİ Yönetimi</Link>
              <span>•</span>
              <Link href="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Sanayi & Fabrika Tesis Yönetimi</Link>
              <span>•</span>
              <Link href="/hizmetler/tesis-yonetimi/rehber" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Tesis Yönetim Şirketi Seçim Rehberi</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Popüler Bölgesel Çözümler
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[11px] text-gray-500 dark:text-gray-400">
              <Link href="/bolgeler/kadikoy/aidat-takibi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Kadıköy Aidat Takibi</Link>
              <span>•</span>
              <Link href="/bolgeler/atasehir/guvenlik-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Ataşehir Güvenlik Yönetimi</Link>
              <span>•</span>
              <Link href="/bolgeler/uskudar/tesis-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Üsküdar Tesis Yönetimi</Link>
              <span>•</span>
              <Link href="/bolgeler/besiktas/hukuk-ve-icra-danismanligi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Beşiktaş Hukuk & İcra</Link>
              <span>•</span>
              <Link href="/bolgeler/sisli/temizlik-ve-hijyen" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Şişli Temizlik ve Hijyen</Link>
              <span>•</span>
              <Link href="/bolgeler/bakirkoy/teknik-bakim" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Bakırköy Teknik Bakım</Link>
              <span>•</span>
              <Link href="/bolgeler/basaksehir/havuz-bakimi-ve-hijyen" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Başakşehir Havuz Bakımı</Link>
              <span>•</span>
              <Link href="/bolgeler/maltepe/peyzaj-ve-bahce-bakimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Maltepe Peyzaj Bakımı</Link>
              <span>•</span>
              <Link href="/bolgeler/umraniye/hasere-ve-dezenfeksiyon" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Ümraniye Haşere İlaçlama</Link>
              <span>•</span>
              <Link href="/bolgeler/sariyer/guvenlik-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Sarıyer Özel Güvenlik</Link>
              <span>•</span>
              <Link href="/bolgeler/beylikduzu/aidat-takibi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Beylikdüzü Aidat Takibi</Link>
              <span>•</span>
              <Link href="/bolgeler/kartal/tesis-yonetimi" className="hover:text-slate-900 dark:hover:text-white inline-block py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5">Kartal Tesis Yönetimi</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Grup Şirketlerimiz & Güvenlik Çözüm Ortaklarımız
            </h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-600 dark:text-gray-400">
              <a
                href="https://www.guvenlikkursu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-900 dark:text-white hover:underline inline-flex items-center gap-1 group py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="Alo Güvenlik — 5188 Sayılı Özel Güvenlik Eğitimi & Sertifikasyon"
              >
                <span>🛡️ Alo Güvenlik Eğitimi (guvenlikkursu.com)</span>
                <span className="material-symbols-outlined text-[12px] opacity-70 group-hover:translate-x-0.5 transition-transform">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://3gguvenlik.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-900 dark:text-white hover:underline inline-flex items-center gap-1 group py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="3G Özel Güvenlik ve Koruma Hizmetleri — 5188 Lisanslı Tesis Emniyeti"
              >
                <span>👮 3G Özel Güvenlik (3gguvenlik.com)</span>
                <span className="material-symbols-outlined text-[12px] opacity-70 group-hover:translate-x-0.5 transition-transform">open_in_new</span>
              </a>
              <span>•</span>
              <span className="text-gray-500">T.C. İçişleri Bakanlığı 5188 Sayılı Kanun Uyumlu Entegre Güvenlik Ağı</span>
            </div>
          </div>

          {/* Resmi Mevzuatlar, Kamu Kurumları ve Akreditasyon Otoriteleri (E-E-A-T Sitewide) */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60 dark:border-white/5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400">account_balance</span>
              <span>Resmi Mevzuatlar, Kamu Kurumları ve Akreditasyon Otoriteleri</span>
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[11px] text-gray-500 dark:text-gray-400">
              <a
                href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="634 Sayılı Kat Mülkiyeti Kanunu — T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi"
              >
                <span>634 Sayılı KMK (mevzuat.gov.tr)</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun"
              >
                <span>5188 Sayılı Kanun</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="2004 Sayılı İcra ve İflas Kanunu"
              >
                <span>2004 Sayılı İİK</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.egm.gov.tr/ozelguvenlik"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="Emniyet Genel Müdürlüğü Özel Güvenlik Denetleme Başkanlığı ÖGNET"
              >
                <span>EGM Özel Güvenlik (ÖGNET)</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.tse.org.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="Türk Standardları Enstitüsü — ISO 41001 & TSE HYB 12850"
              >
                <span>TSE Standartları</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.tuik.gov.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="Türkiye İstatistik Kurumu — Resmi TÜFE/ÜFE Verileri"
              >
                <span>TÜİK Enflasyon Verileri</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://sifiratik.gov.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Sıfır Atık"
              >
                <span>Sıfır Atık Portalı</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.kvkk.gov.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="Kişisel Verileri Koruma Kurumu (KVKK)"
              >
                <span>KVKK Kurumu</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.turkak.org.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="TÜRKAK — Türk Akreditasyon Kurumu"
              >
                <span>TÜRKAK Akreditasyon</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
              <span>•</span>
              <a
                href="https://www.iskur.gov.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:underline inline-flex items-center gap-0.5 py-1 px-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/5"
                title="Türkiye İş Kurumu (İŞKUR)"
              >
                <span>İŞKUR Portalı</span>
                <span className="material-symbols-outlined text-[10px] opacity-60">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer Bottom Bar */}
        <div className="pt-6 border-t border-gray-200/60 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          
          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 font-semibold px-3 py-1 rounded-full text-[11px]">
            <span className="w-2 h-2 rounded-full bg-slate-500 animate-ping"></span>
            {t('footer_all_systems_online')}
          </div>

          <div className="text-center md:text-left text-[11px] font-light">
            © 2026 Alo Yönetim. {t('footer_rights')} | <Link href={language === 'en' ? '/en/kullanim-sartlari' : '/kullanim-sartlari'} className="hover:underline">{t('footer_terms')}</Link> | <Link href={language === 'en' ? '/en/gizlilik-politikasi' : '/gizlilik-politikasi'} className="hover:underline">{t('footer_privacy')}</Link> | <Link href={language === 'en' ? '/en/cerez-politikasi' : '/cerez-politikasi'} className="hover:underline">{t('footer_cookie_policy')}</Link> | <Link href={language === 'en' ? '/en/kvkk-ve-aydinlatma-metni' : '/kvkk-ve-aydinlatma-metni'} className="hover:underline">{t('footer_kvkk')}</Link> | <Link href={language === 'en' ? '/en/sozluk' : '/sozluk'} className="hover:underline">KMK & Tesis Sözlüğü</Link> | <Link href="/feed/tesis-yonetimi.xml" className="hover:underline text-amber-600 dark:text-amber-400 font-medium">RSS Bülteni</Link> | <Link href={language === 'en' ? '/en/site-haritasi' : '/site-haritasi'} className="hover:underline font-bold text-slate-900 dark:text-white">{t('footer_sitemap')}</Link>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-sm">language</span>
            <span>{t('footer_lang_label')}</span>
          </div>

        </div>

      </div>

    </footer>
  );
}
