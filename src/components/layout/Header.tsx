"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { useQuote } from '@/context/QuoteContext';
import type { translations } from '@/i18n/translations';
import SiteNavigationSeo from '@/components/seo/SiteNavigationSeo';

// Faz 7, 109: LoginModal sadece butona tıklandığında yüklenir, ilk bundle'ı şişirmez.
const LoginModal = dynamic(() => import('./LoginModal'), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });
import MegaMenuDropdown from './MegaMenuDropdown';

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
    nameKey: 'nav_services',
    subItems: [
      { nameKey: 'nav_property_mgmt', path: '/hizmetler/tesis-yonetimi', descKey: 'nav_property_mgmt_desc', icon: 'domain' },
      { nameKey: 'nav_security', path: '/hizmetler/guvenlik-yonetimi', descKey: 'nav_security_desc', icon: 'shield' },
      { nameKey: 'nav_cleaning', path: '/hizmetler/temizlik-ve-hijyen', descKey: 'nav_cleaning_desc', icon: 'cleaning_services' },
      { nameKey: 'nav_tech_maintenance', path: '/hizmetler/teknik-bakim', descKey: 'nav_tech_maintenance_desc', icon: 'engineering' },
      { nameKey: 'nav_dues', path: '/hizmetler/aidat-takibi', descKey: 'nav_dues_desc', icon: 'account_balance_wallet' },
      { nameKey: 'nav_legal_consulting', path: '/hizmetler/hukuk-ve-icra-danismanligi', descKey: 'nav_legal_consulting_desc', icon: 'gavel' },
      { nameKey: 'nav_landscaping', path: '/hizmetler/peyzaj-ve-bahce-bakimi', descKey: 'nav_landscaping_desc', icon: 'park' },
      { nameKey: 'nav_pool_care', path: '/hizmetler/havuz-bakimi-ve-hijyen', descKey: 'nav_pool_care_desc', icon: 'pool' },
      { nameKey: 'nav_pest_control', path: '/hizmetler/hasere-ve-dezenfeksiyon', descKey: 'nav_pest_control_desc', icon: 'pest_control' },
      { nameKey: 'nav_sectoral_solutions', path: '/sektorel-cozumler', descKey: 'nav_sectoral_solutions_desc', icon: 'apartment' },
      { nameKey: 'nav_academy', path: '/guvenlik-akademisi', descKey: 'nav_academy_desc', icon: 'school' },
      { nameKey: 'nav_employment_bridge', path: '/istihdam-koprusu', descKey: 'nav_employment_bridge_desc', icon: 'handshake' },
      { nameKey: 'nav_all_services', path: '/hizmetler', descKey: 'nav_all_services_desc', icon: 'grid_view' },
    ]
  },
  {
    nameKey: 'nav_tools_library',
    subItems: [
      { nameKey: 'nav_calculator', path: '/hesaplayici', descKey: 'calc_promo_desc', icon: 'calculate' },
      { nameKey: 'nav_dictionary', path: '/sozluk', descKey: 'nav_dictionary_desc', icon: 'menu_book' },
      { nameKey: 'nav_success_stories', path: '/basari-hikayeleri', descKey: 'nav_success_desc', icon: 'emoji_events' },
      { nameKey: 'nav_app', path: '/app', descKey: 'nav_app_desc', icon: 'smartphone' },
      { nameKey: 'nav_sitemap', path: '/site-haritasi', descKey: 'nav_sitemap_desc', icon: 'explore' },
    ]
  },
  {
    nameKey: 'nav_districts',
    subItems: [
      { nameKey: 'nav_all_districts', path: '/bolgeler', descKey: 'nav_all_districts_desc', icon: 'map' },
      { nameKey: 'dist_kadikoy', path: '/bolgeler/kadikoy', descKey: 'dist_kadikoy_desc', icon: 'location_on' },
      { nameKey: 'dist_atasehir', path: '/bolgeler/atasehir', descKey: 'dist_atasehir_desc', icon: 'location_on' },
      { nameKey: 'dist_besiktas', path: '/bolgeler/besiktas', descKey: 'dist_besiktas_desc', icon: 'location_on' },
      { nameKey: 'dist_sisli', path: '/bolgeler/sisli', descKey: 'dist_sisli_desc', icon: 'location_on' },
      { nameKey: 'dist_uskudar', path: '/bolgeler/uskudar', descKey: 'dist_uskudar_desc', icon: 'location_on' },
      { nameKey: 'dist_maltepe', path: '/bolgeler/maltepe', descKey: 'dist_maltepe_desc', icon: 'location_on' },
      { nameKey: 'dist_basaksehir', path: '/bolgeler/basaksehir', descKey: 'dist_basaksehir_desc', icon: 'location_on' },
      { nameKey: 'dist_sariyer', path: '/bolgeler/sariyer', descKey: 'dist_sariyer_desc', icon: 'location_on' },
      { nameKey: 'dist_umraniye', path: '/bolgeler/umraniye', descKey: 'dist_umraniye_desc', icon: 'location_on' },
    ]
  },
  {
    nameKey: 'nav_corporate',
    subItems: [
      { nameKey: 'nav_about', path: '/hakkimizda', descKey: 'nav_about_desc', icon: 'corporate_fare' },
      { nameKey: 'nav_references', path: '/referanslar', descKey: 'nav_success_desc', icon: 'stars' },
      { nameKey: 'nav_quality', path: '/kurumsal/kalite-politikamiz', descKey: 'nav_quality_desc', icon: 'verified' },
      { nameKey: 'nav_certificates', path: '/kurumsal/kalite-belgelerimiz', descKey: 'nav_certificates_desc', icon: 'workspace_premium' },
      { nameKey: 'nav_sustainability', path: '/kurumsal/surdurulebilirlik', descKey: 'nav_sustainability_desc', icon: 'eco' },
      { nameKey: 'nav_ges', path: '/surdurulebilirlik/ges-projeleri', descKey: 'nav_ges_desc', icon: 'solar_power' },
      { nameKey: 'nav_vision', path: '/kurumsal/vizyon-misyon', descKey: 'nav_vision_desc', icon: 'visibility' },
    ]
  },
  {
    nameKey: 'nav_contact_media',
    subItems: [
      { nameKey: 'nav_contact', path: '/iletisim', descKey: 'nav_contact_desc', icon: 'location_on' },
      { nameKey: 'nav_faq', path: '/sss', descKey: 'nav_faq_desc', icon: 'quiz' },
      { nameKey: 'nav_blog', path: '/blog', descKey: 'nav_blog_desc', icon: 'newspaper' },
      { nameKey: 'nav_employment_bridge', path: '/istihdam-koprusu', descKey: 'nav_employment_bridge_desc', icon: 'badge' },
    ]
  }
];


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { openQuoteModal } = useQuote();

  const getLocalizedPath = (path: string) => {
    if (!path) return language === 'tr' ? '/' : `/${language}`;
    if (path.startsWith('http') || path.startsWith('tel:') || path.startsWith('mailto:')) return path;
    if (language === 'tr') return path;
    return `/${language}${path === '/' ? '' : path}`;
  };


  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [hoveredMenu, setHoveredMenuState] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setHoveredMenu = useCallback((menu: string | null, delayMs: number = 0) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (delayMs > 0) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredMenuState(menu);
      }, delayMs);
    } else {
      setHoveredMenuState(menu);
    }
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const lastScrollYRef = useRef(0);

  // Tüm sayfalarda hero alanları ultra-premium koyu slate gradyanına sahip olduğu için
  // sayfa başındayken (!isScrolled) daima kristal parlaklığında beyaz navbar render edilir.
  const isTopAndDarkHero = !isScrolled;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleLanguageChange = (newLang: 'tr' | 'en' | 'ru' | 'ar') => {
    setHoveredMenu(null);
    if (newLang === language) return;
    
    let cleanPath = pathname || '/';
    const langPrefixes = ['/en', '/tr', '/ru', '/ar'];
    
    for (const prefix of langPrefixes) {
      if (cleanPath.startsWith(prefix + '/') || cleanPath === prefix) {
        cleanPath = cleanPath.replace(new RegExp(`^${prefix}`), '') || '/';
        break;
      }
    }
    
    let newUrl = cleanPath;
    if (newLang !== 'tr') {
      newUrl = `/${newLang}${cleanPath === '/' ? '' : cleanPath}`;
    }
    
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setLanguage(newLang);
    router.push(newUrl);
    router.refresh();
  };

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY < 10) {
          setIsVisible(true);
          setIsScrolled(false);
        } else {
          setIsScrolled(true);
          if (currentScrollY < lastScrollYRef.current) {
            setIsVisible(true);
          } else if (currentScrollY > 100 && currentScrollY > lastScrollYRef.current + 5) {
            setIsVisible(false);
            setHoveredMenu(null);
          }
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

  const allLinks = React.useMemo(() => {
    const links: {name: string, url: string}[] = [];
    MENU_ITEMS.forEach(item => {
      if (item.path) {
        links.push({ name: t(item.nameKey as any), url: getLocalizedPath(item.path) });
      }
      if (item.subItems) {
        item.subItems.forEach(sub => {
          links.push({ name: t(sub.nameKey as any), url: getLocalizedPath(sub.path) });
        });
      }
    });
    return links;
  }, [t, getLocalizedPath]);

  return (
    <>
      <SiteNavigationSeo links={allLinks} />

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out font-sans ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          !isScrolled
            ? 'bg-transparent py-3.5 border-b border-transparent'
            : 'bg-white/90 dark:bg-slate-950/92 backdrop-blur-2xl shadow-sm border-b border-slate-200/60 dark:border-white/10 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300">
          
          <Magnetic strength={0.1}>
            <Link href={getLocalizedPath('/')} prefetch={true} aria-label="Alo Yönetim Anasayfa" className="flex items-center group relative z-[60] py-0.5" onClick={closeMenus}>
              <Logo variant={isTopAndDarkHero ? 'white' : 'auto'} />
            </Link>
          </Magnetic>
          
          <nav className="flex max-lg:hidden items-center gap-0.5 xl:gap-1.5" onMouseLeave={() => setHoveredMenu(null)}>
            {MENU_ITEMS.map((item) => (
              <div 
                key={item.nameKey} 
                className="relative px-2.5 xl:px-3.5 py-1.5"
                onMouseEnter={() => setHoveredMenu(item.nameKey)}
              >
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
                    className={`cursor-pointer relative z-10 text-[13px] xl:text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 flex items-center gap-1 whitespace-nowrap ${
                    isTopAndDarkHero 
                      ? 'text-white/95 hover:text-white' 
                      : hoveredMenu === item.nameKey || item.subItems.some(sub => pathname.startsWith(sub.path))
                        ? 'text-[var(--color-primary)] dark:text-white' 
                        : 'text-slate-800 dark:text-white/90 hover:text-[var(--color-primary)] dark:hover:text-white'
                  }`}>
                    {t(item.nameKey)}
                    <span aria-hidden="true" className={`material-symbols-outlined text-[15px] transition-transform duration-300 ${
                      isTopAndDarkHero ? 'text-white/80' : 'text-slate-400 dark:text-slate-400'
                    } ${hoveredMenu === item.nameKey ? 'rotate-180 text-[var(--color-primary)] dark:text-white' : ''}`}>
                      expand_more
                    </span>
                  </div>
                ) : (
                  <Link 
                    href={getLocalizedPath(item.path!)} 
                    prefetch={true}
                    className={`relative z-10 text-[13px] xl:text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 whitespace-nowrap ${
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
          
          <div className="flex items-center gap-2 xl:gap-3 relative z-[60]">
            
            <div className={`flex items-center rounded-full p-0.5 border backdrop-blur-md transition-all ${
              isTopAndDarkHero 
                ? 'bg-white/10 border-white/20 text-white' 
                : 'bg-slate-100/90 dark:bg-slate-900/90 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white shadow-sm'
            }`}>
              
              <div 
                ref={languageDropdownRef}
                className="relative"
                onMouseEnter={() => setHoveredMenu('language')}
                onMouseLeave={() => setHoveredMenu(null, 1500)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoveredMenu(hoveredMenu === 'language' ? null : 'language');
                  }}
                  className="flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase hover:bg-white/30 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Dil Seçimi"
                  aria-haspopup="true"
                  aria-expanded={hoveredMenu === 'language'}
                >
                  <span>{language}</span>
                  <span className={`material-symbols-outlined text-[13px] transition-transform duration-300 ${hoveredMenu === 'language' ? 'rotate-180' : ''}`} aria-hidden="true">
                    expand_more
                  </span>
                </button>

                {hoveredMenu === 'language' && (
                  <div className="absolute top-full right-0 pt-2 z-[70]">
                    <div className={`w-28 backdrop-blur-xl border rounded-xl shadow-xl overflow-hidden py-1 ${
                      isTopAndDarkHero 
                        ? 'bg-slate-900/95 border-white/20 text-white' 
                        : 'bg-white/95 dark:bg-slate-950/95 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white'
                    }`}>
                      {[
                        { code: 'tr', label: 'TR', flag: '🇹🇷' },
                        { code: 'en', label: 'EN', flag: '🇬🇧' },
                        { code: 'ru', label: 'RU', flag: '🇷🇺' },
                        { code: 'ar', label: 'AR', flag: '🇸🇦' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLanguageChange(lang.code as 'tr'|'en'|'ru'|'ar');
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                            isTopAndDarkHero
                              ? (language === lang.code ? 'bg-white/20 text-white font-extrabold' : 'text-white/80 hover:bg-white/10 hover:text-white')
                              : (language === lang.code 
                                  ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-extrabold' 
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

              <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-white/20 mx-0.5" />

              <button 
                onClick={toggleTheme}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Temayı Değiştir"
              >
                <motion.span 
                  className="material-symbols-outlined text-[15px]"
                  aria-hidden="true"
                  initial={false}
                  animate={{ rotate: isDarkMode ? 180 : 0, scale: isDarkMode ? 0.85 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </motion.span>
              </button>
            </div>

            <Magnetic strength={0.2}>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                aria-label="Online İşlemler Girişi"
                className={`relative overflow-hidden text-xs font-bold px-3 xl:px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 inline-flex max-sm:hidden group border cursor-pointer ${
                  isTopAndDarkHero 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                    : 'bg-white border-slate-200 dark:border-white/10 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px]" aria-hidden="true">lock_open</span>
                  <span className="max-lg:hidden">{t('btn_login')}</span>
                </span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button 
                onClick={openQuoteModal}
                aria-label="Hızlı teklif alın"
                className="relative overflow-hidden text-xs font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white px-4 xl:px-5 py-2 rounded-xl transition-all duration-300 active:scale-95 inline-flex max-sm:hidden group shadow-md shadow-slate-900/15 hover:shadow-xl hover:shadow-slate-900/25 hover:-translate-y-0.5 border border-white/10 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {t('nav_get_quote')}
                  <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_right_alt</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></span>
              </button>
            </Magnetic>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
              aria-expanded={isMobileMenuOpen}
              className={`lg:hidden p-2 -mr-2 rounded-lg transition-colors ${
                isTopAndDarkHero ? 'text-white' : 'text-slate-900 dark:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

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

