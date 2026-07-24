"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { generateBreadcrumbs } from '@/lib/schemas';

export default function Referanslar() {
  const { t } = useLanguage();

  const categories = [
    t('ref_cat_all'), 
    t('ref_cat_residence'), 
    t('ref_cat_housing'), 
    t('ref_cat_commercial'), 
    t('ref_cat_industrial')
  ];

  const partnerLogos = [
    "Acıbadem", "Rönesans", "Ağaoğlu", "Sur Yapı", "Sinpaş", "DAP Yapı", "Ege Yapı", "Tahincioğlu"
  ];

  const projects = [
    {
      name: "Lalezar Konakları",
      category: t('ref_cat_housing'),
      units: `240 ${t('ref_unit_flat')}`,
      location: "Kadıköy, İstanbul",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
    },
    {
      name: "Sapphire Residence",
      category: t('ref_cat_residence'),
      units: `180 ${t('ref_unit_flat')}`,
      location: "Ataşehir, İstanbul",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
    },
    {
      name: "Horizon Plaza & Loft",
      category: t('ref_cat_commercial'),
      units: `210 ${t('ref_unit_office')} + 40 ${t('ref_unit_store')}`,
      location: "Şişli, İstanbul",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
    },
    {
      name: "Marina Towers",
      category: t('ref_cat_residence'),
      units: `320 ${t('ref_unit_flat')}`,
      location: "Kartal, İstanbul",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      name: "Koru Park Evleri",
      category: t('ref_cat_housing'),
      units: `95 ${t('ref_unit_flat')}`,
      location: "Ümraniye, İstanbul",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      name: "Vadi Panorama Projesi",
      category: t('ref_cat_housing'),
      units: `410 ${t('ref_unit_flat')}`,
      location: "Sarıyer, İstanbul",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const [activeCategory, setActiveCategory] = useState(t('ref_cat_all'));

  const filteredProjects = activeCategory === t('ref_cat_all') 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('ref_page_title'), url: '/referanslar' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHeader 
        title={t('ref_page_title')} 
        description={t('ref_page_desc')} 
      />

      {/* Infinite Marquee Section */}
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
            {/* Double the array for seamless looping */}
            {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
              <div key={idx} className="text-2xl md:text-3xl font-black text-[var(--color-primary)] opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards - Masonry Layout using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.name + i} // using name + index to force re-animation when filtered
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group break-inside-avoid inline-block w-full"
              >
                {/* Randomize aspect ratio slightly for masonry effect if possible, or just use natural image height. We'll set height to auto and let image dictate. */}
                <div className="w-full overflow-hidden relative" style={{ aspectRatio: i % 2 === 0 ? '4/3' : '3/4' }}>
                  <Image 
                    src={project.image} 
                    alt={project.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081524]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl">
                    {project.units}
                  </span>
                </div>
                <div className="p-8 flex flex-col gap-3 relative bg-[var(--color-surface)] z-10 rounded-b-[2.5rem]">
                  <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-3 py-1.5 rounded-full w-fit">{project.category}</span>
                  <h3 className="text-2xl font-extrabold text-[var(--color-primary)]">{project.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-secondary)] font-medium mt-1">
                    <span className="material-symbols-outlined text-lg text-gray-400">location_on</span>
                    {project.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>
    </>
  );
}
