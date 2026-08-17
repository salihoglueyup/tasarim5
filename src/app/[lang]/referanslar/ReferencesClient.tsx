'use client';

import { useState, useRef, MouseEvent, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
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
  logo: string | null;
};

// --- 3D Tilt Efektli Premium Kart Bileşeni ---
const ProjectCard = ({ project, isLarge, lang, router }: { project: Project, isLarge: boolean, lang: string, router: any }) => {
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

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/${lang}/referanslar/${project.slug}`)}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-[var(--color-outline)]/40 shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer ${
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
          className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out bg-slate-800"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <span className="text-4xl animate-pulse">🏢</span>
        </div>
      )}

      {/* Shine (Parlama) Efekti */}
      <div className="absolute top-0 -left-[150%] w-full h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[35deg] group-hover:left-[200%] transition-all duration-[1.2s] ease-in-out z-10 pointer-events-none" />

      {/* Gradyan Katmanları */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent opacity-80 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 z-0 pointer-events-none" />

      {/* Sol Üst - Logo Alanı */}
      <div className="absolute top-6 left-6 z-10 transition-transform duration-500 group-hover:scale-110" style={{ transform: "translateZ(25px)" }}>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center overflow-hidden group-hover:bg-white/30 group-hover:border-white/50 transition-colors">
          {project.clientLogo ? (
            <Image src={project.clientLogo} alt="Logo" fill className="object-cover" />
          ) : (
            <span className="material-symbols-outlined text-white/90 group-hover:text-white text-[24px]">corporate_fare</span>
          )}
        </div>
      </div>

      {/* Units (Birim) Badge - Sağ Üst Köşe */}
      <div className="absolute top-6 right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10" style={{ transform: "translateZ(20px)" }}>
        <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          {project.units}
        </span>
      </div>

      {/* Buzlu Cam İçerik Katmanı */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div 
          className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-[1.8rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden group-hover:bg-black/60 group-hover:border-white/30 transition-colors duration-500"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex justify-between items-end gap-4">
            <div className="flex-1">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-white bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full mb-3 border border-white/20 shadow-md">
                {project.category}
              </span>
              <h3 className={`font-extrabold text-white leading-tight mb-2 drop-shadow-md ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
                {project.title}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-200 font-medium drop-shadow-md">
                <span className="material-symbols-outlined text-[16px] text-blue-400">location_on</span>
                {project.location}
              </div>
            </div>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-75 shadow-xl">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px] font-bold">arrow_forward</span>
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
  initialProjects: Project[], 
  partners: Partner[],
  lang: string
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState<'TÜMÜ' | 'ANADOLU' | 'AVRUPA'>('TÜMÜ');

  const categories = useMemo(() => [
    t('ref_cat_all'), 
    ...Array.from(new Set(initialProjects.map(p => p.category)))
  ], [initialProjects, t]);

  const [activeCategory, setActiveCategory] = useState(t('ref_cat_all'));

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesCategory = activeCategory === t('ref_cat_all') || p.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR')) ||
        p.location.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR')) ||
        p.units.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR'));
      
      const anadoluLocations = ['Kadıköy', 'Ataşehir', 'Üsküdar', 'Maltepe', 'Kartal', 'Pendik', 'Ümraniye', 'Beykoz', 'Çekmeköy', 'Sancaktepe', 'Tuzla', 'Şile'];
      const isAnadolu = anadoluLocations.some((loc) => p.location.includes(loc));
      const matchesSide =
        selectedSide === 'TÜMÜ' ||
        (selectedSide === 'ANADOLU' && isAnadolu) ||
        (selectedSide === 'AVRUPA' && !isAnadolu);

      return matchesCategory && matchesSearch && matchesSide;
    });
  }, [initialProjects, activeCategory, searchQuery, selectedSide, t]);

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
        <section className="py-12 border-b border-[var(--color-outline)]/40 overflow-hidden bg-[var(--color-surface)]">
          <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] mb-6 text-center">
            <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-widest">{t('ref_partners')}</span>
          </div>
          <div className="relative flex overflow-x-hidden group">
            <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-[var(--color-surface)] to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-[var(--color-surface)] to-transparent pointer-events-none" />
            
            <motion.div
              className="flex whitespace-nowrap items-center gap-16 py-4 px-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
              {[...partners, ...partners].map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
                  ) : (
                    <span className="text-2xl md:text-3xl font-black text-[var(--color-primary)]">
                      {partner.name}
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
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-6 md:p-8 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              placeholder="Proje veya ilçe ara (örn: Kadıköy, Rezidans)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-[var(--color-primary)] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 font-medium"
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
          <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 shrink-0">
            <button
              onClick={() => setSelectedSide('TÜMÜ')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSide === 'TÜMÜ'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setSelectedSide('ANADOLU')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSide === 'ANADOLU'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Anadolu Yakası
            </button>
            <button
              onClick={() => setSelectedSide('AVRUPA')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSide === 'AVRUPA'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Avrupa Yakası
            </button>
          </div>

          {/* Metrics Counter */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[var(--color-secondary)] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2.5 rounded-2xl border border-blue-500/20">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>{filteredProjects.length} Proje Gösteriliyor</span>
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
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards - Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
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
          <div className="text-center py-24 text-[var(--color-secondary)] space-y-2">
            <span className="material-symbols-outlined text-5xl mb-2 opacity-50 block">search_off</span>
            <p className="font-semibold text-lg">Aramanıza uygun referans proje bulunamadı.</p>
            <p className="text-xs text-slate-400">Farklı bir kategori veya anahtar kelime deneyebilirsiniz.</p>
          </div>
        )}

      </section>
    </>
  );
}
