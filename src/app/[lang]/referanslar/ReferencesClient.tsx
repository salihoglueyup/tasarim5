'use client';

import { useState, useRef, MouseEvent, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useQuote } from '@/context/QuoteContext';
import JsonLd from '@/components/seo/JsonLd';

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  units: string;
  location: string;
  image: string | null;
  clientLogo?: string | null;
};

type Partner = {
  id: string;
  name: string;
  logo?: string | null;
};

// --- 3D Tilt Efektli Premium Kart Bileşeni ---
const ProjectCard = ({ project, isLarge, lang, router }: { project: Project; isLarge: boolean; lang: string; router: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const targetUrl = lang === 'tr' ? `/referanslar/${project.slug}` : `/${lang}/referanslar/${project.slug}`;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(targetUrl)}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-[#15161E] border border-slate-700/60 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-slate-400 transition-all duration-500 cursor-pointer ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Görsel Katmanı */}
      {project.image ? (
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out bg-slate-900"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <span className="text-4xl animate-pulse">🏢</span>
        </div>
      )}

      {/* Shine (Parlama) Efekti */}
      <div className="absolute top-0 -left-[150%] w-full h-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-[35deg] group-hover:left-[200%] transition-all duration-[1.2s] ease-in-out z-10 pointer-events-none" />

      {/* Gradyan Katmanları */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent opacity-80 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-black/50 to-transparent opacity-95 z-0 pointer-events-none" />

      {/* Sol Üst - Logo Alanı */}
      <div className="absolute top-6 left-6 z-10 transition-transform duration-500 group-hover:scale-110" style={{ transform: "translateZ(25px)" }}>
        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center overflow-hidden group-hover:bg-white/25 group-hover:border-white/40 transition-colors">
          {project.clientLogo ? (
            <Image src={project.clientLogo} alt="Logo" fill className="object-cover" />
          ) : (
            <span className="material-symbols-outlined text-white text-[24px]">apartment</span>
          )}
        </div>
      </div>

      {/* Units (Birim) Badge - Sağ Üst Köşe */}
      <div className="absolute top-6 right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10" style={{ transform: "translateZ(20px)" }}>
        <span className="bg-white/20 backdrop-blur-xl border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          {project.units}
        </span>
      </div>

      {/* Buzlu Cam İçerik Katmanı */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
        <div 
          className="bg-black/65 backdrop-blur-2xl border border-white/15 rounded-[2rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative overflow-hidden group-hover:bg-black/80 group-hover:border-white/25 transition-colors duration-500"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex justify-between items-end gap-4">
            <div className="flex-1">
              <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase text-slate-100 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full mb-3 border border-white/15 shadow-sm">
                {project.category}
              </span>
              <h3 className={`font-black text-white leading-tight mb-2 drop-shadow-md ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
                {project.title}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-300 font-medium drop-shadow-md">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">location_on</span>
                {project.location}
              </div>
            </div>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center shrink-0 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-xl group-hover:rotate-45">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px] font-bold">arrow_outward</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ReferencesClient({ 
  initialProjects, 
  partners,
  lang
}: { 
  initialProjects: Project[]; 
  partners: Partner[];
  lang: string;
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const { openQuoteModal } = useQuote();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState<'TÜMÜ' | 'ANADOLU' | 'AVRUPA'>('TÜMÜ');

  const dict = {
    tr: {
      searchPlaceholder: "Proje veya ilçe ara (örn: Kadıköy, Rezidans)...",
      all: "Tümü",
      anadolu: "Anadolu Yakası",
      avrupa: "Avrupa Yakası",
      showing: "Proje Gösteriliyor",
      partnersTitle: "Yönetim Güvencesi Sunduğumuz Seçkin Kurumsal Paydaşlar",
      noResults: "Aramanıza uygun referans proje bulunamadı.",
      noResultsDesc: "Farklı bir ilçe, kategori veya anahtar kelime deneyebilirsiniz.",
      statsHeading: "Rakamlarla Tesis Yönetimi Gücümüz",
      statsSubheading: "İstanbul genelinde onlarca prestijli mülk ve yüzbinlerce sakin için kesintisiz 7/24 hizmet.",
      ctaTitle: "Sitenizin Yönetimini Profesyonel Standartlara Taşıyın",
      ctaDesc: "48 saat içinde sitenize özel şeffaf bütçe optimizasyonu, güvenlik ve bakım keşif raporu hazırlayalım.",
      ctaBtn: "Ücretsiz Keşif & Teklif İste",
      ctaCall: "0216 550 48 48",
    },
    en: {
      searchPlaceholder: "Search property or district (e.g. Kadikoy, Residence)...",
      all: "All",
      anadolu: "Asian Side",
      avrupa: "European Side",
      showing: "Projects Shown",
      partnersTitle: "Trusted by Leading Corporate Partners & Developers",
      noResults: "No matching reference property found.",
      noResultsDesc: "Try searching with a different district, category, or keyword.",
      statsHeading: "Our Facility Management Metrics in Numbers",
      statsSubheading: "Delivering 24/7 seamless operations for thousands of residents across Istanbul.",
      ctaTitle: "Elevate Your Property to International Standards",
      ctaDesc: "Request a custom operating project and savings analysis delivered within 48 hours.",
      ctaBtn: "Request Free Discovery & Proposal",
      ctaCall: "+90 216 550 48 48",
    },
    ru: {
      searchPlaceholder: "Поиск проекта или района (например, Кадыкёй, Резиденция)...",
      all: "Все",
      anadolu: "Азиатская сторона",
      avrupa: "Европейская сторона",
      showing: "Проектов показано",
      partnersTitle: "Ведущие партнеры и девелоперы, доверяющие нам",
      noResults: "Объекты по вашему запросу не найдены.",
      noResultsDesc: "Попробуйте изменить район, категорию или поисковый запрос.",
      statsHeading: "Ключевые показатели эффективности управления",
      statsSubheading: "Круглосуточное обслуживание сотен престижных объектов в Стамбуле.",
      ctaTitle: "Переведите управление вашим ЖК на новый уровень",
      ctaDesc: "Получите прозрачный расчет операционного бюджета и аудит в течение 48 часов.",
      ctaBtn: "Запросить бесплатный аудит",
      ctaCall: "+90 216 550 48 48",
    },
    ar: {
      searchPlaceholder: "ابحث عن مشروع أو منطقة (مثل كاديكوي، ريزيدنس)...",
      all: "الكل",
      anadolu: "الجانب الآسيوي",
      avrupa: "الجانب الأوروبي",
      showing: "مشروع معروض",
      partnersTitle: "شركاء التطوير العقاري الذين يثقون في خدماتنا",
      noResults: "لم يتم العثور على مشاريع تطابق بحثك.",
      noResultsDesc: "يرجى تجربة البحث باسم منطقة أو فئة مختلفة.",
      statsHeading: "مؤشرات أداء إدارة المرافق بالأرقام",
      statsSubheading: "تشغيل متكامل على مدار الساعة لآلاف السكان في مجمعات إسطنبول الراقية.",
      ctaTitle: "ارتقِ بإدارة مجمعك إلى المعايير العالمية",
      ctaDesc: "احصل على دراسة ميزانية مخصصة وتحليل للوفر المالي خلال 48 ساعة.",
      ctaBtn: "طلب معاينة وعرض مجاني",
      ctaCall: "+90 216 550 48 48",
    }
  };

  const currentDict = dict[lang as keyof typeof dict] || dict.tr;

  const categories = useMemo(() => [
    currentDict.all, 
    ...Array.from(new Set(initialProjects.map(p => p.category)))
  ], [initialProjects, currentDict]);

  const [activeCategory, setActiveCategory] = useState(currentDict.all);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesCategory = activeCategory === currentDict.all || p.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR')) ||
        p.location.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR')) ||
        p.units.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR'));
      
      const anadoluLocations = ['Kadıköy', 'Kadikoy', 'Ataşehir', 'Atasehir', 'Üsküdar', 'Uskudar', 'Maltepe', 'Kartal', 'Pendik', 'Ümraniye', 'Umraniye', 'Beykoz', 'Çekmeköy', 'Cekmekoy', 'Sancaktepe', 'Tuzla', 'Şile', 'Кадыкёй', 'Аташехир', 'Ускюдар', 'Мальтепе', 'Картал', 'Чекмекёй', 'Умрание', 'كاديكوي', 'أتاشهير', 'أوسكودار', 'مالتيبيه', 'كارتال', 'تشيكميكوي', 'عمرانية'];
      const isAnadolu = anadoluLocations.some((loc) => p.location.includes(loc));
      const matchesSide =
        selectedSide === 'TÜMÜ' ||
        (selectedSide === 'ANADOLU' && isAnadolu) ||
        (selectedSide === 'AVRUPA' && !isAnadolu);

      return matchesCategory && matchesSearch && matchesSide;
    });
  }, [initialProjects, activeCategory, searchQuery, selectedSide, currentDict]);

  // Schema.org ItemList for Google Rich Snippets
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Alo Yönetim Prestijli Referans Projeleri',
    description: 'İstanbul genelinde yönettiğimiz siteler, rezidanslar ve ticari plazalar.',
    itemListElement: initialProjects.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      description: `${p.category} — ${p.units} — ${p.location}`,
      url: `https://aloyonetim.com.tr/${lang}/referanslar/${p.slug}`
    }))
  };

  return (
    <>
      <JsonLd data={itemListSchema} />

      {/* Infinite Marquee Section (İş Ortakları) */}
      {partners.length > 0 && (
        <section className="py-12 border-b border-[var(--color-outline)]/40 overflow-hidden bg-[var(--color-surface-variant)]/40 dark:bg-[#12131A]/60">
          <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] mb-6 text-center">
            <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm text-emerald-500">verified</span>
              {currentDict.partnersTitle}
            </span>
          </div>
          <div className="relative flex overflow-x-hidden group">
            <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-[var(--color-surface)] dark:from-[#0D0E14] to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-[var(--color-surface)] dark:from-[#0D0E14] to-transparent pointer-events-none" />
            
            <motion.div
              className="flex whitespace-nowrap items-center gap-16 py-4 px-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...partners, ...partners].map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                  ) : (
                    <span className="text-lg md:text-xl font-extrabold text-[var(--color-heading-text)] tracking-tight px-4 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                      🏛️ {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto" style={{ perspective: "1000px" }}>
        
        {/* Search & Side Filter Bar */}
        <div className="bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/60 dark:border-white/10 rounded-[2.5rem] p-6 md:p-8 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              placeholder={currentDict.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1E202B] border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-[var(--color-heading-text)] focus:outline-none focus:border-slate-500 transition-colors placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Yaka Switcher */}
          <div className="flex bg-gray-100 dark:bg-[#1E202B] p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 shrink-0">
            <button
              onClick={() => setSelectedSide('TÜMÜ')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSide === 'TÜMÜ'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {currentDict.all}
            </button>
            <button
              onClick={() => setSelectedSide('ANADOLU')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSide === 'ANADOLU'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {currentDict.anadolu}
            </button>
            <button
              onClick={() => setSelectedSide('AVRUPA')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSide === 'AVRUPA'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {currentDict.avrupa}
            </button>
          </div>

          {/* Metrics Counter */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold bg-slate-100 dark:bg-white/10 text-[var(--color-heading-text)] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-base text-emerald-500">verified</span>
            <span>{filteredProjects.length} {currentDict.showing}</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md shadow-slate-900/20 dark:shadow-white/20 font-bold scale-105'
                  : 'bg-[var(--color-surface)] dark:bg-[#15161E] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 dark:border-white/10 hover:border-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards - Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[360px] md:auto-rows-[420px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const isLarge = i % 5 === 0 && i !== 0; 
              
              return (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  isLarge={isLarge}
                  lang={lang}
                  router={router}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 text-[var(--color-secondary)] space-y-2 bg-[var(--color-surface)] dark:bg-[#15161E] rounded-[2.5rem] border border-[var(--color-outline)]/60 dark:border-white/10 p-12">
            <span className="material-symbols-outlined text-5xl mb-2 opacity-50 block text-slate-400">search_off</span>
            <p className="font-bold text-xl text-[var(--color-heading-text)]">{currentDict.noResults}</p>
            <p className="text-sm text-slate-400">{currentDict.noResultsDesc}</p>
          </div>
        )}

        {/* Executive Management Metrics Panel (E-E-A-T) */}
        <div className="mt-24 bg-gradient-to-br from-[#1C1D27] via-[#15161E] to-[#0D0E14] border border-white/10 rounded-[3rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ISO 41001 & TÜRKAK AKREDİTASYONU
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
              {currentDict.statsHeading}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {currentDict.statsSubheading}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 relative z-10">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">120+</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yönetilen Tesis</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">45.000+</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bağımsız Bölüm</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">%99.4</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tahsilat Başarısı</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl md:text-4xl font-black text-sky-400 mb-1">%30</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bütçe Tasarrufu</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">45 Dk</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Acil Müdahale SLA</div>
            </div>
          </div>
        </div>

        {/* Call to Action (CTA) Card */}
        <div className="mt-12 bg-white dark:bg-[#15161E] border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-3 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-[var(--color-heading-text)] tracking-tight">
              {currentDict.ctaTitle}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {currentDict.ctaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <a
              href="tel:02165504848"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/10 text-[var(--color-heading-text)] font-extrabold text-sm hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-300 dark:border-white/10"
            >
              <span className="material-symbols-outlined text-emerald-500 text-lg">call</span>
              <span>{currentDict.ctaCall}</span>
            </a>
            
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold text-sm hover:scale-105 transition-all shadow-lg shadow-slate-900/20"
            >
              <span>{currentDict.ctaBtn}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>

      </section>
    </>
  );
}
