"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';

const categories = ["Tümü", "Rezidans & Loft", "Toplu Konut", "AVM & Ticari", "Sanayi Siteleri"];

const projects = [
  {
    name: "Lalezar Konakları",
    category: "Toplu Konut",
    units: "240 Daire",
    location: "Kadıköy, İstanbul",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Sapphire Residence",
    category: "Rezidans & Loft",
    units: "180 Daire",
    location: "Ataşehir, İstanbul",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Marina Towers",
    category: "Rezidans & Loft",
    units: "320 Daire",
    location: "Kartal, İstanbul",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Koru Park Evleri",
    category: "Toplu Konut",
    units: "95 Daire",
    location: "Ümraniye, İstanbul",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Horizon Plaza & Loft",
    category: "AVM & Ticari",
    units: "210 Ofis + 40 Mağaza",
    location: "Şişli, İstanbul",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Vadi Panorama Projesi",
    category: "Toplu Konut",
    units: "410 Daire",
    location: "Sarıyer, İstanbul",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Referanslar() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredProjects = activeCategory === "Tümü" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <PageHeader 
        title="Referanslarımız" 
        description="İstanbul genelinde 45.000'den fazla bağımsız bölüme hizmet verdiğimiz prestijli projeler." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={i}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-full aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {project.units}
                </span>
              </div>
              <div className="p-8 flex flex-col gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{project.category}</span>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">{project.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-secondary)] font-medium mt-1">
                  <span className="material-symbols-outlined text-base text-gray-400">location_on</span>
                  {project.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>
    </>
  );
}
