"use client";

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[100vh] min-h-[680px] flex flex-col justify-end overflow-hidden bg-slate-950 font-sans pb-8 sm:pb-12">
      
      {/* 8K Fullscreen Background Video & Fallback */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Animated Fallback Gradient (Visible if video is loading or unsupported) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-900 z-0 animate-pulse" />
        
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          poster="/images/hero-poster.webp"
          className="w-full h-full object-cover scale-105 pointer-events-none relative z-1"
        >
          {/* Masaüstü için 4K/1080p yüksek kalite */}
          <source src="/video/brand-film.mp4" type="video/mp4" media="(min-width: 768px)" />
          {/* Mobil için düşük kalite/boyutlu video (LCP Optimizasyonu) */}
          <source src="/video/brand-film-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          {/* Fallback */}
          <source src="/video/brand-film.mp4" type="video/mp4" />
        </video>

        {/* Deep Vignette Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      </div>

      {/* Flush Far-Left Bottom Aligned Content Container */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-20">
        
        <div className="max-w-3xl flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full font-semibold text-xs text-white shadow-lg tracking-tight">
              <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
              <span>{t('hero_badge')}</span>
            </div>
          </motion.div>

          {/* Elegant Refined Plus Jakarta Sans Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-plus-jakarta)] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-4 drop-shadow-xl"
          >
            {t('hero_title')}
          </motion.h1>

          {/* Far-Left Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl mb-7 drop-shadow-sm tracking-[-0.01em]"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <Magnetic strength={0.2}>
              <Link 
                href="/teklif-al"
                className="bg-white hover:bg-slate-100 text-slate-950 font-extrabold px-7 py-3.5 text-sm sm:text-base shadow-2xl rounded-xl border border-white/20 inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 tracking-tight"
                aria-label="Ücretsiz keşif isteyin"
                title="Ücretsiz keşif formu"
              >
                <span>{t('btn_free_discovery')}</span>
                <span className="material-symbols-outlined text-base text-slate-950" aria-hidden="true">arrow_forward</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button 
                onClick={toggleMute}
                className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-white/20 px-5.5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white hover:bg-slate-800 transition-all shadow-xl tracking-tight"
                aria-label={isMuted ? "Filmin sesini aç" : "Filmin sesini kapat"}
                title={isMuted ? "Sesi aç" : "Sesi kapat"}
              >
                <span className="material-symbols-outlined text-lg text-blue-400" aria-hidden="true">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
                <span>{isMuted ? t('btn_unmute') : t('btn_mute')}</span>
              </button>
            </Magnetic>
          </motion.div>

        </div>

      </div>

    </section>
  );
}

