'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  units: string;
  location: string;
  image: string | null;
};

type Partner = {
  id: string;
  name: string;
  logo: string | null;
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

  const categories = [
    t('ref_cat_all'), 
    ...Array.from(new Set(initialProjects.map(p => p.category)))
  ];

  const [activeCategory, setActiveCategory] = useState(t('ref_cat_all'));

  const filteredProjects = activeCategory === t('ref_cat_all') 
    ? initialProjects 
    : initialProjects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Infinite Marquee Section */}
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

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md shadow-slate-900/20 dark:shadow-white/20 font-bold'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards - Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              // Create an asymmetric bento grid effect by making some items span more rows/cols
              const isLarge = i % 5 === 0 && i !== 0; 
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  key={project.id}
                  className={`group relative overflow-hidden rounded-[2rem] bg-[var(--color-surface)] border border-[var(--color-outline)]/40 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    isLarge ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => window.location.href = `/${lang}/referanslar/${project.slug}`}
                >
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="text-4xl">🏢</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Units Badge */}
                  <div className="absolute top-6 right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl">
                      {project.units}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block text-xs font-bold text-white bg-brand-500/80 backdrop-blur-md px-3 py-1 rounded-full mb-3 shadow-lg">
                        {project.category}
                      </span>
                      <h3 className={`font-extrabold text-white mb-2 leading-tight ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="material-symbols-outlined text-lg text-brand-400">location_on</span>
                        {project.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-[var(--color-secondary)]">
            Bu kategoride henüz bir proje bulunmuyor.
          </div>
        )}

      </section>
    </>
  );
}
