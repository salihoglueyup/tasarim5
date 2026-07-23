"use client";

import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { useState, useEffect } from 'react';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [istanbulTime, setIstanbulTime] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Date().toLocaleTimeString('tr-TR', { 
          timeZone: 'Europe/Istanbul', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        setIstanbulTime(time);
      } catch (e) {
        setIstanbulTime("");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#f8f9fa] dark:bg-[#071322] border-t border-gray-200/80 dark:border-white/10 w-full overflow-hidden text-gray-700 dark:text-gray-300">
      
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pt-16 pb-8 flex flex-col gap-12">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Info & App Links (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 pr-2">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>

            <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              {t('footer_about_text')}
            </p>

            {/* App Store & Google Play Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a 
                href="#" 
                className="flex items-center gap-3 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/15 px-4 py-2.5 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-gray-800 dark:text-white">apple</span>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 leading-none">Download on the</span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight mt-0.5">App Store</span>
                </div>
              </a>

              <a 
                href="#" 
                className="flex items-center gap-3 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/15 px-4 py-2.5 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-emerald-600 dark:text-emerald-400">play_arrow</span>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 leading-none">GET IT ON</span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight mt-0.5">Google Play</span>
                </div>
              </a>
            </div>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {['link', 'photo_camera', 'thumb_up', 'play_arrow'].map((iconName, idx) => (
                <Magnetic strength={0.3} key={idx}>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/15 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[var(--color-primary)] hover:text-white dark:hover:bg-blue-600 transition-all duration-300 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">{iconName}</span>
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Column 2: KURUMSAL (2.5 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">{t('footer_col_corporate')}</h4>
            <div className="flex flex-col gap-3">
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
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] dark:hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-blue-600">arrow_forward</span>
                  {t(item.nameKey as any)}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: ÇÖZÜMLERİMİZ (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">{t('footer_col_solutions')}</h4>
            <div className="flex flex-col gap-3">
              {[
                { nameKey: 'nav_all_services', path: '/hizmetler' },
                { nameKey: 'nav_security', path: '/hizmetler/guvenlik-yonetimi' },
                { nameKey: 'nav_property_mgmt', path: '/hizmetler/tesis-yonetimi' },
                { nameKey: 'nav_cleaning', path: '/hizmetler/temizlik-ve-hijyen' },
                { nameKey: 'nav_tech_maintenance', path: '/hizmetler/teknik-bakim' },
                { nameKey: 'nav_sectoral_solutions', path: '/sektorel-cozumler' },
                { nameKey: 'nav_employment_bridge', path: '/istihdam-koprusu' },
                { nameKey: 'nav_academy', path: '/guvenlik-akademisi' }
              ].map((item) => (
                <Link 
                  key={item.nameKey} 
                  href={item.path} 
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] dark:hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-blue-600">arrow_forward</span>
                  {t(item.nameKey as any)}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: İLETİŞİM BİLGİLERİ (2.5 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">{t('footer_col_contact')}</h4>
            
            {/* Live Weather & Time Pill */}
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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
                <span className="text-xs text-gray-600 dark:text-gray-400 font-light leading-snug">Osmanağa Mah. Misakı Milli Sok. No:94A Kadıköy - İstanbul</span>
              </div>
            </div>

            {/* Customer Service Phone */}
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 text-gray-700 dark:text-gray-300">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-xs">{t('footer_customer_service')}</span>
                <a href="tel:02165504848" className="text-xs font-bold text-[var(--color-primary)] dark:text-blue-400 hover:underline">0216 550 48 48</a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 text-gray-700 dark:text-gray-300">
                <span className="material-symbols-outlined text-lg">schedule</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-xs">{t('footer_working_hours_title') || 'Çalışma Saatlerimiz'}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-light leading-snug">09:00 - 18:00</span>
              </div>
            </div>

            {/* WhatsApp Green Pill Button */}
            <a 
              href="https://wa.me/905550000000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-700/50 p-3 rounded-2xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-xl">chat</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-950 dark:text-emerald-300">{t('footer_whatsapp_title')}</span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-light">{t('footer_whatsapp_desc')}</span>
              </div>
            </a>
          </div>

        </div>

        {/* Middle Row: ISO Badges & Newsletter */}
        <div className="pt-8 border-t border-gray-200/80 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* ISO Badges */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
              <span className="material-symbols-outlined text-lg text-emerald-600 dark:text-emerald-400">verified</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white leading-none">ISO 9001:2015</div>
                <div className="text-[10px] text-gray-500">{t('footer_badge_quality')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
              <span className="material-symbols-outlined text-lg text-blue-600 dark:text-blue-400">health_and_safety</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white leading-none">ISO 45001</div>
                <div className="text-[10px] text-gray-500">{t('footer_badge_ohs')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
              <span className="material-symbols-outlined text-lg text-purple-600 dark:text-purple-400">admin_panel_settings</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white leading-none">{t('footer_badge_sec')}</div>
                <div className="text-[10px] text-gray-500">{t('footer_badge_sec_desc')}</div>
              </div>
            </div>
          </div>

          {/* Newsletter Form & Social Media */}
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex items-center gap-3 w-full">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 shrink-0 hidden sm:inline-block">{t('footer_newsletter_title')}</span>
              <div className="relative flex-grow sm:w-72">
                <input 
                  type="email" 
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={t('footer_newsletter_placeholder')}
                  className="w-full bg-gray-200/70 dark:bg-white/10 text-gray-900 dark:text-white text-xs px-4 py-3 rounded-full border border-gray-300/80 dark:border-white/15 focus:outline-none focus:border-blue-600 pr-12 transition-colors placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 w-9 h-9 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Kayıt Ol"
                >
                  <span className="material-symbols-outlined text-sm font-bold">send</span>
                </button>
              </div>
              {isSubscribed && (
                <span className="text-xs font-bold text-emerald-600 shrink-0">{t('footer_newsletter_success')}</span>
              )}
            </form>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 lg:justify-end">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-sky-500 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-pink-600 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-800 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Sub-footer Bottom Bar */}
        <div className="pt-6 border-t border-gray-200/60 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold px-3 py-1 rounded-full text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            {t('footer_all_systems_online')}
          </div>

          <div className="text-center md:text-left text-[11px] font-light">
            © 2026 Alo Yönetim. {t('footer_rights')} | <Link href="/kvkk-ve-aydinlatma-metni" className="hover:underline">{t('footer_terms')}</Link> | <Link href="/kvkk-ve-aydinlatma-metni" className="hover:underline">{t('footer_privacy')}</Link> | <Link href="/kvkk-ve-aydinlatma-metni" className="hover:underline">{t('footer_kvkk')}</Link>
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
