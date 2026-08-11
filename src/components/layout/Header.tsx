"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { useQuote } from '@/context/QuoteContext';
import type { translations } from '@/i18n/translations';

// Faz 7, 109: LoginModal sadece butona tıklandığında yüklenir, ilk bundle'ı şişirmez.
const LoginModal = dynamic(() => import('./LoginModal'), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });
const MegaMenuDropdown = dynamic(() => import('./MegaMenuDropdown'), { ssr: false });

type SubItem = {
  nameKey: keyof typeof translations['tr'];
  path: string;
  descKey?: keyof typeof translations['tr'];
  icon?: string;
};

type MenuItem = {
  nameKey: keyof typeof translations['tr'];
  path?: string;
  subItems?: SubItem[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    nameKey: 'nav_corporate',
    subItems: [
      { nameKey: 'nav_about', path: '/hakkimizda', descKey: 'nav_about_desc', icon: 'corporate_fare' },
      { nameKey: 'nav_success_stories', path: '/basari-hikayeleri', descKey: 'nav_success_desc', icon: 'emoji_events' },
      { nameKey: 'nav_academy', path: '/guvenlik-akademisi', descKey: 'nav_academy_desc', icon: 'school' },
      { nameKey: 'nav_quality', path: '/kurumsal/kalite-politikamiz', descKey: 'nav_quality_desc', icon: 'verified' },
      { nameKey: 'nav_sustainability', path: '/kurumsal/surdurulebilirlik', descKey: 'nav_sustainability_desc', icon: 'eco' },
      { nameKey: 'nav_ges', path: '/surdurulebilirlik/ges-projeleri', descKey: 'nav_ges_desc', icon: 'solar_power' },
      { nameKey: 'nav_vision', path: '/kurumsal/vizyon-misyon', descKey: 'nav_vision_desc', icon: 'visibility' },
    ]
  },
  {
    nameKey: 'nav_services',
    subItems: [
      { nameKey: 'nav_all_services', path: '/hizmetler', descKey: 'nav_all_services_desc', icon: 'grid_view' },
      { nameKey: 'nav_security', path: '/hizmetler/guvenlik-yonetimi', descKey: 'nav_security_desc', icon: 'security' },
      { nameKey: 'nav_cleaning', path: '/hizmetler/temizlik-ve-hijyen', descKey: 'nav_cleaning_desc', icon: 'cleaning_services' },
      { nameKey: 'nav_tech_maintenance', path: '/hizmetler/teknik-bakim', descKey: 'nav_tech_maintenance_desc', icon: 'engineering' },
      { nameKey: 'nav_property_mgmt', path: '/hizmetler/tesis-yonetimi', descKey: 'nav_property_mgmt_desc', icon: 'account_balance_wallet' },
      { nameKey: 'nav_landscaping', path: '/hizmetler/peyzaj-ve-bahce-bakimi', descKey: 'nav_landscaping_desc', icon: 'park' },
      { nameKey: 'nav_pool_care', path: '/hizmetler/havuz-bakimi-ve-hijyen', descKey: 'nav_pool_care_desc', icon: 'pool' },
      { nameKey: 'nav_pest_control', path: '/hizmetler/hasere-ve-dezenfeksiyon', descKey: 'nav_pest_control_desc', icon: 'bug_report' },
      { nameKey: 'nav_legal_consulting', path: '/hizmetler/hukuk-ve-icra-danismanligi', descKey: 'nav_legal_consulting_desc', icon: 'gavel' },
      { nameKey: 'nav_dues', path: '/hizmetler/aidat-takibi', descKey: 'nav_dues_desc', icon: 'account_balance_wallet' },
      { nameKey: 'nav_sectoral_solutions', path: '/sektorel-cozumler', descKey: 'nav_sectoral_solutions_desc', icon: 'domain' },
      { nameKey: 'nav_employment_bridge', path: '/istihdam-koprusu', descKey: 'nav_employment_bridge_desc', icon: 'handshake' },
    ]
  },
  { nameKey: 'nav_references', path: '/referanslar' },
  {
    nameKey: 'nav_contact_media',
    subItems: [
      { nameKey: 'nav_contact', path: '/iletisim', descKey: 'nav_contact_desc', icon: 'call' },
      { nameKey: 'nav_blog', path: '/blog', descKey: 'nav_blog_desc', icon: 'article' },
      { nameKey: 'nav_faq', path: '/sss', descKey: 'nav_faq_desc', icon: 'help_outline' },
    ]
  }
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { openQuoteModal } = useQuote();

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'en' ? `/en${path === '/' ? '' : path}` : path;
  };

  const handleLanguageChange = (newLang: 'tr' | 'en' | 'ru' | 'ar') => {
    if (newLang === language) return;
    
    let cleanPath = pathname;
    const langPrefixes = ['/en', '/tr', '/ru', '/ar'];
    
    for (const prefix of langPrefixes) {
      if (pathname.startsWith(prefix + '/') || pathname === prefix) {
        cleanPath = pathname.replace(new RegExp(`^${prefix}`), '') || '/';
        break;
      }
    }
    
    let newUrl = cleanPath;
    if (newLang !== 'tr') {
      newUrl = `/${newLang}${cleanPath === '/' ? '' : cleanPath}`;
    }
    
    setLanguage(newLang);
    router.push(newUrl);
  };

  // Scroll & UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  
  // Mobile Menu & Theme States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Hover & Mega Menu States
  const [hoveredMenu, setHoveredMenuState] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setHoveredMenu = (menu: string | null, delay: number = 0) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (delay > 0 && menu === null) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredMenuState(null);
      }, delay);
    } else {
      setHoveredMenuState(menu);
    }
  };

  // Scroll Progress (Framer Motion)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Page Context Detection (i18n yolları /tr, /en, /ru, /ar dahil edildi)
  const isHomePage = pathname === '/' || pathname === '/tr' || pathname === '/en' || pathname === '/ru' || pathname === '/ar';
  
  // Hizmet detay sayfaları (ör: /tr/hizmetler/teknik-bakim) koyu arkaplanlı hero kullandığı için Header transparan olmalı.
  const isServiceDetailPage = /^\/(tr|en|ru|ar)?\/?hizmetler\/[^/]+$/.test(pathname);
  const isAboutPage = /^\/(tr|en|ru|ar)?\/?hakkimizda$/.test(pathname);
  const isDarkHeroPage = isHomePage || isServiceDetailPage || isAboutPage;

  const isTopAndDarkHero = isDarkHeroPage && !isScrolled;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
      const id = window.requestAnimationFrame(() => setIsDarkMode(isDark));
      if (isDark) document.documentElement.classList.add('dark');
      return () => window.cancelAnimationFrame(id);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  }, [isDarkMode]);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const nextIsScrolled = currentScrollY > 20;
        
        setIsScrolled((prev) => (prev !== nextIsScrolled ? nextIsScrolled : prev));
        
        if (currentScrollY <= 20) {
          setIsVisible((prev) => (!prev ? true : prev));
        } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
          setIsVisible((prev) => (prev ? false : prev));
        } else if (currentScrollY < lastScrollYRef.current) {
          setIsVisible((prev) => (!prev ? true : prev));
        }
        
        lastScrollYRef.current = currentScrollY;
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Sayfa değişimi (route change) anında açık menüleri kapat ve scroll/header durumunu asenkron senkronize et
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
      setHoveredMenu(null);
      setIsVisible(true);
      setIsScrolled(window.scrollY > 20);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  const closeMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-slate-700 to-[var(--color-primary)] z-[60] origin-left"
        style={{ scaleX, willChange: 'transform' }}
      />

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out font-sans ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          !isScrolled
            ? 'bg-transparent py-4 border-b border-transparent'
            : 'bg-white/85 dark:bg-slate-950/90 backdrop-blur-2xl shadow-sm border-b border-slate-200/60 dark:border-white/10 py-3'
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] flex justify-between items-center transition-all duration-300">
          
          {/* Logo */}
          <Magnetic strength={0.1}>
            <Link href={getLocalizedPath('/')} prefetch={true} className="flex items-center group relative z-[60] py-1" onClick={closeMenus}>
              <Logo variant={isTopAndDarkHero ? 'white' : 'auto'} />
            </Link>
          </Magnetic>
          
          {/* Desktop Navigation */}
          <nav className="flex max-lg:hidden items-center gap-1" onMouseLeave={() => setHoveredMenu(null)}>
            {MENU_ITEMS.map((item) => (
              <div 
                key={item.nameKey} 
                className="relative px-3.5 py-2"
                onMouseEnter={() => setHoveredMenu(item.nameKey)}
              >
                {/* Hover/Active Animated Pill */}
                {hoveredMenu === item.nameKey && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-slate-100/90 dark:bg-white/10 rounded-xl border border-slate-200/50 dark:border-white/10 -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                
                {item.subItems ? (
                  <div 
                    role="button"
                    aria-expanded={hoveredMenu === item.nameKey}
                    aria-haspopup="true"
                    className={`cursor-pointer relative z-10 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    isTopAndDarkHero 
                      ? 'text-white/95 hover:text-white' 
                      : hoveredMenu === item.nameKey || item.subItems.some(sub => pathname.startsWith(sub.path))
                        ? 'text-[var(--color-primary)] dark:text-white' 
                        : 'text-slate-800 dark:text-white/90 hover:text-[var(--color-primary)] dark:hover:text-white'
                  }`}>
                    {t(item.nameKey)}
                    <span aria-hidden="true" className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                      isTopAndDarkHero ? 'text-white/80' : 'text-slate-400 dark:text-slate-400'
                    } ${hoveredMenu === item.nameKey ? 'rotate-180 text-[var(--color-primary)] dark:text-white' : ''}`}>
                      expand_more
                    </span>
                  </div>
                ) : (
                  <Link 
                    href={getLocalizedPath(item.path!)} 
                    prefetch={true}
                    className={`relative z-10 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 whitespace-nowrap ${
                      isTopAndDarkHero 
                        ? 'text-white/95 hover:text-white' 
                        : pathname === item.path
                          ? 'text-[var(--color-primary)] dark:text-white' 
                          : 'text-slate-800 dark:text-white/90 hover:text-[var(--color-primary)] dark:hover:text-white'
                    }`}
                  >
                    {t(item.nameKey)}
                  </Link>
                )}

                {/* Dropdown Mega Menu (Faz 12 Lazy Split) */}
                {hoveredMenu === item.nameKey && (
                  <MegaMenuDropdown 
                    hoveredMenu={hoveredMenu}
                    item={item}
                    getLocalizedPath={getLocalizedPath}
                    closeMenus={closeMenus}
                  />
                )}
              </div>
            ))}
          </nav>
          
            {/* Actions */}
          <div className="flex items-center gap-3 relative z-[60]">
            
            {/* Language Switcher Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredMenu('language')}
              onMouseLeave={() => setHoveredMenu(null, 2000)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                  isTopAndDarkHero 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                    : 'bg-white border-slate-200 dark:border-white/10 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm'
                }`}
                aria-label="Dil Seçimi"
                aria-haspopup="true"
                aria-expanded={hoveredMenu === 'language'}
              >
                <span className="uppercase">{language}</span>
                <span className={`material-symbols-outlined text-[14px] transition-transform duration-300 ${hoveredMenu === 'language' ? 'rotate-180' : ''}`} aria-hidden="true">
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu */}
              {hoveredMenu === 'language' && (
                <div className="absolute top-full right-0 pt-2 z-[70]">
                  <div className={`w-28 backdrop-blur-xl border rounded-xl shadow-xl overflow-hidden py-1 ${
                    isTopAndDarkHero 
                      ? 'bg-slate-900/40 border-white/20' 
                      : 'bg-white/90 dark:bg-slate-950/90 border-slate-200 dark:border-white/10'
                  }`}>
                    {[
                      { code: 'tr', label: 'TR', flag: '🇹🇷' },
                      { code: 'en', label: 'EN', flag: '🇬🇧' },
                      { code: 'ru', label: 'RU', flag: '🇷🇺' },
                      { code: 'ar', label: 'AR', flag: '🇸🇦' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code as 'tr'|'en'|'ru'|'ar');
                          setHoveredMenu(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold flex items-center justify-between transition-colors ${
                          isTopAndDarkHero
                            ? (language === lang.code ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white')
                            : (language === lang.code 
                                ? 'bg-slate-100 dark:bg-white/10 text-[var(--color-primary)] dark:text-white' 
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5')
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className="text-sm">{lang.flag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Magnetic strength={0.3}>
              <button 
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isTopAndDarkHero 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
                aria-label="Temayı Değiştir"
              >
                <motion.span 
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                  initial={false}
                  animate={{ rotate: isDarkMode ? 180 : 0, scale: isDarkMode ? 0.85 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </motion.span>
              </button>
            </Magnetic>

            {/* Login Portal Button */}
            <Magnetic strength={0.2}>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                aria-label="Online İşlemler Girişi"
                className={`relative overflow-hidden text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 inline-flex max-sm:hidden group border ${
                  isTopAndDarkHero 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                    : 'bg-white border-slate-200 dark:border-white/10 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">lock_open</span>
                  {t('btn_login')}
                </span>
              </button>
            </Magnetic>

            {/* Primary CTA (Teklif Alın) */}
            <Magnetic strength={0.2}>
              <button 
                onClick={openQuoteModal}
                aria-label="Hızlı teklif alın"
                className="relative overflow-hidden text-xs font-extrabold bg-gradient-to-r from-[#2D2D3A] via-[#3a3a4b] to-[#1f1f2a] text-white px-5.5 py-2.5 rounded-xl transition-all duration-300 active:scale-95 inline-flex max-sm:hidden group shadow-md shadow-slate-900/15 hover:shadow-xl hover:shadow-slate-900/25 hover:-translate-y-0.5 border border-white/10"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {t('nav_get_quote')}
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_right_alt</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></span>
              </button>
            </Magnetic>
            
            {/* Mobile Hamburger Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
              aria-expanded={isMobileMenuOpen}
              className={`lg:hidden p-2 -mr-2 rounded-lg transition-colors ${
                isTopAndDarkHero ? 'text-white hover:bg-white/10' : 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <motion.span 
                className="material-symbols-outlined text-3xl block"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? 'close' : 'menu'}
              </motion.span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Faz 11 Lazy Split) */}
      {isMobileMenuOpen && (
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={closeMenus}
          menuItems={MENU_ITEMS}
          getLocalizedPath={getLocalizedPath}
          openQuoteModal={openQuoteModal}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      )}
    </>
  );
}

