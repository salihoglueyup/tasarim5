"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/context/LanguageContext';
import LoginModal from './LoginModal';

type SubItem = {
  name: string;
  path: string;
  desc?: string;
  icon?: string;
};

type MenuItem = {
  name: string;
  path?: string;
  subItems?: SubItem[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Kurumsal',
    subItems: [
      { name: 'Biz Kimiz?', path: '/hakkimizda', desc: 'Hikayemiz ve yönetim vizyonumuz', icon: 'corporate_fare' },
      { name: 'Başarı Hikayeleri', path: '/basari-hikayeleri', desc: 'Sitelere sağladığımız bütçe dönüşümleri', icon: 'emoji_events' },
      { name: 'Güvenlik Akademisi', path: '/guvenlik-akademisi', desc: '5188 kanun personel eğitimleri', icon: 'school' },
      { name: 'Kalite Politikamız', path: '/kurumsal/kalite-politikamiz', desc: 'ISO 9001 ve hizmet standartlarımız', icon: 'verified' },
      { name: 'Sürdürülebilirlik', path: '/kurumsal/surdurulebilirlik', desc: 'Yeşil enerji ve çevre politikamız', icon: 'eco' },
      { name: 'Sitelerde GES Projeleri', path: '/surdurulebilirlik/ges-projeleri', desc: 'Güneş santrali ile %70 tasarruf', icon: 'solar_power' },
      { name: 'Vizyon & Misyon', path: '/kurumsal/vizyon-misyon', desc: 'Gelecek hedeflerimiz', icon: 'visibility' },
    ]
  },
  {
    name: 'Hizmetlerimiz',
    subItems: [
      { name: 'Tüm Hizmetler', path: '/hizmetler', desc: 'Hizmet ağımıza genel bakış', icon: 'grid_view' },
      { name: 'Güvenlik Yönetimi', path: '/hizmetler/guvenlik-yonetimi', desc: '7/24 AI destekli güvenlik', icon: 'security' },
      { name: 'Temizlik & Hijyen', path: '/hizmetler/temizlik-ve-hijyen', desc: 'Ortak alan endüstriyel temizliği', icon: 'cleaning_services' },
      { name: 'Teknik Bakım', path: '/hizmetler/teknik-bakim', desc: 'Asansör, havuz ve kazan dairesi', icon: 'engineering' },
      { name: 'Mülk Yönetimi', path: '/hizmetler/tesis-yonetimi', desc: 'Aidat, muhasebe ve yasal süreçler', icon: 'account_balance_wallet' },
      { name: 'Peyzaj & Bahçe Bakımı', path: '/hizmetler/peyzaj-ve-bahce-bakimi', desc: 'Otomatik sulama ve bahçe mimarisi', icon: 'park' },
      { name: 'Havuz Bakımı & Hijyen', path: '/hizmetler/havuz-bakimi-ve-hijyen', desc: 'Günlük klor-pH ölçümü ve bakım', icon: 'pool' },
      { name: 'Haşere & Dezenfeksiyon', path: '/hizmetler/hasere-ve-dezenfeksiyon', desc: 'Sağlık Bakanlığı ruhsatlı ilaçlama', icon: 'bug_report' },
      { name: 'Hukuk & İcra Takibi', path: '/hizmetler/hukuk-ve-icra-danismanligi', desc: 'Kat Mülkiyeti Kanunu ve alacak takibi', icon: 'gavel' },
      { name: 'Sektörel Çözümler', path: '/sektorel-cozumler', desc: 'Rezidans, AVM ve Sanayi siteleri', icon: 'domain' },
      { name: 'İstihdam Köprüsü', path: '/istihdam-koprusu', desc: 'İnsan kaynakları ve kadro garantisi', icon: 'handshake' },
    ]
  },
  { name: 'Referanslar', path: '/referanslar' },
  {
    name: 'İletişim & Medya',
    subItems: [
      { name: 'İletişim', path: '/iletisim', desc: 'Bize ulaşın ve adres bilgilerimiz', icon: 'call' },
      { name: 'Blog & Haberler', path: '/blog', desc: 'Sektörel haberler ve makaleler', icon: 'article' },
      { name: 'Sıkça Sorulan Sorular', path: '/sss', desc: 'Merak edilen tüm yanıtlar', icon: 'help_outline' },
    ]
  }
];

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  
  // Scroll & UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Mobile Menu & Theme States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Hover & Mega Menu States
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // Scroll Progress (Framer Motion)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Page Context Detection
  const isHomePage = pathname === '/';
  const isTopOnHomePage = isHomePage && !isScrolled;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
      setIsDarkMode(isDark);
      if (isDark) document.documentElement.classList.add('dark');
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-slate-700 to-[var(--color-primary)] z-[60] origin-left"
        style={{ scaleX }}
      />

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out font-sans ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isTopOnHomePage
            ? 'bg-transparent py-4 border-b border-transparent'
            : isScrolled
              ? 'bg-white/85 dark:bg-[#0b1c30]/90 backdrop-blur-2xl shadow-sm border-b border-slate-200/60 dark:border-white/10 py-3'
              : 'bg-white/70 dark:bg-[#0b1c30]/70 backdrop-blur-xl py-4 border-b border-slate-200/40 dark:border-white/10'
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] flex justify-between items-center transition-all duration-300">
          
          {/* Logo */}
          <Magnetic strength={0.1}>
            <Link href="/" className="flex items-center group relative z-[60] py-1" onClick={closeMenus}>
              <Logo variant={isTopOnHomePage ? 'white' : 'auto'} />
            </Link>
          </Magnetic>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredMenu(null)}>
            {MENU_ITEMS.map((item) => (
              <div 
                key={item.name} 
                className="relative px-3.5 py-2"
                onMouseEnter={() => setHoveredMenu(item.name)}
              >
                {/* Hover/Active Animated Pill */}
                {hoveredMenu === item.name && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-slate-100/90 dark:bg-white/10 rounded-xl border border-slate-200/50 dark:border-white/10 -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                
                {item.subItems ? (
                  <div className={`cursor-pointer relative z-10 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    isTopOnHomePage 
                      ? 'text-white/95 hover:text-white' 
                      : hoveredMenu === item.name || item.subItems.some(sub => pathname.startsWith(sub.path))
                        ? 'text-[var(--color-primary)] dark:text-white' 
                        : 'text-slate-800 dark:text-white/90 hover:text-[var(--color-primary)] dark:hover:text-white'
                  }`}>
                    {item.name}
                    <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                      isTopOnHomePage ? 'text-white/80' : 'text-slate-400 dark:text-slate-400'
                    } ${hoveredMenu === item.name ? 'rotate-180 text-[var(--color-primary)] dark:text-white' : ''}`}>
                      expand_more
                    </span>
                  </div>
                ) : (
                  <Link 
                    href={item.path!} 
                    className={`relative z-10 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 whitespace-nowrap ${
                      isTopOnHomePage 
                        ? 'text-white/95 hover:text-white' 
                        : pathname === item.path
                          ? 'text-[var(--color-primary)] dark:text-white' 
                          : 'text-slate-800 dark:text-white/90 hover:text-[var(--color-primary)] dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Mega Menu */}
                {item.subItems && (
                  <AnimatePresence>
                    {hoveredMenu === item.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] pt-3 origin-top z-50"
                      >
                        <div className="bg-white/95 dark:bg-[#122338]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden grid grid-cols-12 p-5 gap-4">
                          
                          {/* Sub-items (8 Cols) */}
                          <div className="col-span-8 grid grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
                            {item.subItems.map((subItem) => (
                              <Link 
                                key={subItem.name} 
                                href={subItem.path}
                                onClick={closeMenus}
                                className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors relative"
                              >
                                {subItem.icon && (
                                  <div className="w-8.5 h-8.5 rounded-lg bg-slate-100 dark:bg-white/10 text-[var(--color-primary)] dark:text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110 shadow-sm">
                                    <span className="material-symbols-outlined text-[18px]">{subItem.icon}</span>
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-[12.5px] text-slate-900 dark:text-white mb-0.5 transition-colors group-hover/item:text-[var(--color-primary)]">
                                    {subItem.name}
                                  </div>
                                  {subItem.desc && (
                                    <p className="text-[10px] font-normal text-slate-500/90 dark:text-gray-400 leading-snug line-clamp-1">
                                      {subItem.desc}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Featured Callout Promo Card (4 Cols) */}
                          <div className="col-span-4 bg-gradient-to-br from-[#2D2D3A] via-[#1f1f2a] to-[#14141d] text-white p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-md">
                            <div className="relative z-10 flex flex-col gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 bg-white/10 px-2.5 py-1 rounded-full w-fit border border-white/10">
                                Canlı Modül
                              </span>
                              <div className="font-extrabold text-sm leading-snug mt-1">Aidat Hesaplayıcı ⚡</div>
                              <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                                Sitenizin aidat ve tasarruf potansiyelini anında simüle edin.
                              </p>
                            </div>

                            <Link 
                              href="/hesaplayici"
                              onClick={closeMenus}
                              className="relative z-10 mt-4 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1 group/btn"
                            >
                              Hesaplamaya Başla
                              <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          
            {/* Actions */}
          <div className="flex items-center gap-3 relative z-[60]">
            
            {/* Language Switcher (TR / EN) */}
            <div className={`flex items-center p-1 rounded-full border transition-colors ${
              isTopOnHomePage 
                ? 'bg-white/10 border-white/20 text-white' 
                : 'bg-slate-100 dark:bg-white/10 border-slate-200/60 dark:border-white/10'
            }`}>
              <button
                onClick={() => setLanguage('tr')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                  language === 'tr'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isTopOnHomePage
                      ? 'text-white/70 hover:text-white'
                      : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                TR 🇹🇷
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isTopOnHomePage
                      ? 'text-white/70 hover:text-white'
                      : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                EN 🇬🇧
              </button>
            </div>

            {/* Theme Toggle */}
            <Magnetic strength={0.3}>
              <button 
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isTopOnHomePage 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
                aria-label="Temayı Değiştir"
              >
                <motion.span 
                  className="material-symbols-outlined text-[20px]"
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
                className={`relative overflow-hidden text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 hidden sm:inline-flex group border ${
                  isTopOnHomePage 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                    : 'bg-white border-slate-200 dark:border-white/10 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">lock_open</span>
                  Sisteme Giriş
                </span>
              </button>
            </Magnetic>

            {/* Primary CTA (Teklif Alın) */}
            <Magnetic strength={0.2}>
              <Link 
                href="/teklif-al" 
                className="relative overflow-hidden text-xs font-extrabold bg-gradient-to-r from-[#2D2D3A] via-[#3a3a4b] to-[#1f1f2a] text-white px-5.5 py-2.5 rounded-xl transition-all duration-300 active:scale-95 hidden sm:inline-flex group shadow-md shadow-slate-900/15 hover:shadow-xl hover:shadow-slate-900/25 hover:-translate-y-0.5 border border-white/10"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {t('nav_get_quote')}
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></span>
              </Link>
            </Magnetic>
            
            {/* Mobile Hamburger Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 -mr-2 rounded-lg transition-colors ${
                isTopOnHomePage ? 'text-white hover:bg-white/10' : 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0b1c30]/95 backdrop-blur-2xl lg:hidden flex flex-col pt-24 px-6 overflow-y-auto pb-12 font-sans"
          >
            <nav className="flex flex-col gap-2 mt-8">
              {MENU_ITEMS.map((item, i) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.1 + ((i + 1) * 0.05) }}
                  className="border-b border-slate-200 dark:border-white/10"
                >
                  {item.subItems ? (
                    <div className="flex flex-col">
                      <button 
                        onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.name ? null : item.name)}
                        className="flex items-center justify-between py-4 text-xl font-bold text-slate-900 dark:text-white"
                      >
                        {item.name}
                        <span className={`material-symbols-outlined transition-transform duration-300 ${expandedMobileMenu === item.name ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      <AnimatePresence>
                        {expandedMobileMenu === item.name && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pb-6 pl-4 border-l-2 border-slate-200 dark:border-white/10 ml-2">
                              {item.subItems.map((sub) => (
                                <Link 
                                  key={sub.name} 
                                  href={sub.path} 
                                  onClick={closeMenus}
                                  className="text-lg text-slate-600 dark:text-gray-300 hover:text-[var(--color-primary)] dark:hover:text-white flex items-center gap-3 font-medium"
                                >
                                  {sub.icon && <span className="material-symbols-outlined text-[18px] opacity-50">{sub.icon}</span>}
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link 
                      href={item.path!} 
                      onClick={closeMenus}
                      className="block py-4 text-xl font-bold text-slate-900 dark:text-white"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col gap-3"
            >
              <Link 
                href="/teklif-al" 
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 w-full bg-[#2D2D3A] text-white text-lg font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                Hemen Teklif Alın
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}

