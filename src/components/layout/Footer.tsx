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
                { nameKey: 'nav_references', path: '/referanslar' },
                { nameKey: 'nav_success_stories', path: '/basari-hikayeleri' },
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

          {/* Column 3: ÇÖZÜMLERİMİZ (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">{t('footer_col_solutions')}</h4>
            <div className="flex flex-col gap-3">
              {[
                { nameKey: 'nav_security', path: '/hizmetler/guvenlik-yonetimi' },
                { nameKey: 'nav_property_mgmt', path: '/hizmetler/tesis-yonetimi' },
                { nameKey: 'nav_cleaning', path: '/hizmetler/temizlik-ve-hijyen' },
                { nameKey: 'nav_sectoral_solutions', path: '/sektorel-cozumler' },
                { nameKey: 'nav_employment_bridge', path: '/istihdam-koprusu' }
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
                <span className="text-xs text-gray-600 dark:text-gray-400 font-light leading-snug">Örnek Mah. İstiklal Cad. No:123 Şişli / İstanbul</span>
              </div>
            </div>

            {/* Customer Service Phone */}
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 text-gray-700 dark:text-gray-300">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-xs">{t('footer_customer_service')}</span>
                <a href="tel:4440000" className="text-xs font-bold text-[var(--color-primary)] dark:text-blue-400 hover:underline">444 0 000</a>
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

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-3 w-full lg:w-auto">
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
