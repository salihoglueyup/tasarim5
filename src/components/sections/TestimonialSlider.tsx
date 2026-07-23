"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      title: t('home_testimonial_1_title'),
      site: "Lalezar Konakları (240 Daire)",
      location: "Kadıköy, İstanbul",
      rating: 5,
      comment: t('home_testimonial_1_comment'),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      title: t('home_testimonial_2_title'),
      site: "Sapphire Residence (180 Daire)",
      location: "Ataşehir, İstanbul",
      rating: 5,
      comment: t('home_testimonial_2_comment'),
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Mehmet Demir",
      title: t('home_testimonial_3_title'),
      site: "Marina Towers (320 Daire)",
      location: "Kartal, İstanbul",
      rating: 5,
      comment: t('home_testimonial_3_comment'),
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Selin Öztürk",
      title: t('home_testimonial_4_title'),
      site: "Koru Park Evleri (95 Daire)",
      location: "Ümraniye, İstanbul",
      rating: 5,
      comment: t('home_testimonial_4_comment'),
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Mustafa Çelik",
      title: t('home_testimonial_5_title'),
      site: "Vadi Panorama Projesi (410 Daire)",
      location: "Sarıyer, İstanbul",
      rating: 5,
      comment: t('home_testimonial_5_comment'),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Zeynep Arslan",
      title: t('home_testimonial_6_title'),
      site: "Akasya Evleri (150 Daire)",
      location: "Bakırköy, İstanbul",
      rating: 5,
      comment: t('home_testimonial_6_comment'),
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Burak Şahin",
      title: t('home_testimonial_7_title'),
      site: "Horizon Plaza & Loft (210 Daire)",
      location: "Şişli, İstanbul",
      rating: 5,
      comment: t('home_testimonial_7_comment'),
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Canan Erdem",
      title: t('home_testimonial_8_title'),
      site: "Yeşiltepe Sitesi (130 Daire)",
      location: "Maltepe, İstanbul",
      rating: 5,
      comment: t('home_testimonial_8_comment'),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto overflow-hidden">
      
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
            {t('home_testimonial_badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
            {t('home_testimonial_title')}
          </h2>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full border border-[var(--color-outline)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            aria-label="Önceki Yorum"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-sm font-bold text-[var(--color-secondary)] px-2">
            {currentIndex + 1} / {testimonials.length}
          </span>
          <button 
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full border border-[var(--color-outline)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            aria-label="Sonraki Yorum"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Active Testimonial Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-10 md:p-16 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden"
        >
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(current.rating)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-2xl fill-current">star</span>
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl text-[var(--color-primary)] font-light leading-relaxed italic">
              "{current.comment}"
            </blockquote>

            <div className="flex items-center gap-4">
              <img 
                src={current.avatar} 
                alt={current.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary)]">{current.name}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-medium">{current.title} • {current.site}</p>
                <span className="text-xs text-gray-400">{current.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 to-[#122338] text-white p-8 rounded-[2rem] flex flex-col gap-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span className="material-symbols-outlined">verified</span>
              {t('home_testimonial_verified')}
            </div>
            <div className="text-xs text-gray-300 leading-relaxed">
              {t('home_testimonial_verified_desc_1')}{current.site}{t('home_testimonial_verified_desc_2')}
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

    </section>
  );
}
