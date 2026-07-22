"use client";

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[100vh] min-h-[640px] flex flex-col justify-end overflow-hidden bg-slate-950 font-sans">
      
      {/* 8K Fullscreen Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/video/brand-film.mp4" 
          className="w-full h-full object-cover scale-105 pointer-events-none"
        />

        {/* Deep Vignette Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
      </div>

      {/* Flush Far-Left Bottom Aligned Content Container */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
        
        <div className="max-w-2xl flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full font-semibold text-xs text-white shadow-lg tracking-tight">
              <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
              <span>Türkiye'nin En Prestijli Tesis Yönetimi</span>
            </div>
          </motion.div>

          {/* Elegant Refined Plus Jakarta Sans Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-plus-jakarta)] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-3.5 drop-shadow-xl"
          >
            Yaşam alanlarınıza <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              değer katıyoruz.
            </span>
          </motion.h1>

          {/* Far-Left Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl mb-6 sm:mb-7 drop-shadow-sm tracking-[-0.01em]"
          >
            Aidat takibinden 7/24 güvenliğe, temizlikten teknik bakıma kadar tüm süreçleri dijital, şeffaf ve profesyonel bir şekilde yönetiyoruz.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.2}>
              <Link 
                href="/teklif-al"
                className="bg-white hover:bg-slate-100 text-slate-950 font-extrabold px-7 py-3 text-sm sm:text-base shadow-2xl rounded-xl border border-white/20 inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 tracking-tight"
              >
                <span>Ücretsiz Keşif İste</span>
                <span className="material-symbols-outlined text-base text-slate-950">arrow_forward</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button 
                onClick={toggleMute}
                className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-white/20 px-5.5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white hover:bg-slate-800 transition-all shadow-xl tracking-tight"
              >
                <span className="material-symbols-outlined text-lg text-blue-400">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
                <span>{isMuted ? 'Filmin Sesini Aç' : 'Sesi Kapat'}</span>
              </button>
            </Magnetic>
          </motion.div>

        </div>

      </div>

      {/* Floating Bottom-Right Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 right-10 z-20 hidden md:flex items-center gap-3 text-white/70 text-xs font-semibold uppercase tracking-widest pointer-events-none"
      >
        <span>Aşağı Kaydır</span>
        <motion.span 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="material-symbols-outlined text-sm text-white"
        >
          arrow_downward
        </motion.span>
      </motion.div>

    </section>
  );
}
