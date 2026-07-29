"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Yüklenme hızı (v10): 2.27 MB'lık brand-film.mp4 kritik yüklenmede bant genişliğini domine
  // etmesin diye video kaynağı JSX'te değil, sayfa boşta kalınca (idle) bağlanır. Poster
  // (hero-poster-v2.webp, priority) anında görünür olduğundan görsel LCP etkilenmez.
  // Hareket azaltma tercihi veya dokunmatik/mobil cihazda video HİÇ yüklenmez (yalnız poster).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarseOrSmall =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (reduceMotion || isCoarseOrSmall) return;

    let done = false;
    const attach = () => {
      if (done || !videoRef.current) return;
      done = true;
      const v = videoRef.current;
      v.src = '/video/brand-film.mp4';
      v.load();
      // muted autoplay güvenli; engellenirse sessizce yut.
      v.play().catch(() => {});
    };

    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | undefined;
    let timerId: number | undefined;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(attach, { timeout: 3000 });
    } else {
      timerId = window.setTimeout(attach, 1500);
    }

    return () => {
      if (idleId !== undefined && typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-900 z-0 animate-pulse" />
        
        {/*
          LCP ve Ağ Hızı Optimizasyonu (v8): Next.js Image priority={true} ve fetchPriority="high"
          sayesinde tarayıcı /images/hero-poster-v2.webp dosyasını HTML <head> içinden anında
          keşfeder ve LCP puanını tavan yaptırır. Video ise arka planda yüklenir.
        */}
        <Image
          src="/images/hero-poster-v2.webp"
          alt="Hero arka plan"
          fill
          priority={true}
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover scale-105 pointer-events-none z-0"
        />

        {/* Video kaynağı (src) yukarıdaki useEffect içinde idle anında bağlanır — kritik yüklenmeyi rahatlatır. */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/images/hero-poster-v2.webp"
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover scale-105 pointer-events-none relative z-1"
        />

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

          {/* Elegant Refined Plus Jakarta Sans Headline
              LCP optimizasyonu (v12): Bu h1 LCP elementidir. framer-motion opacity:0 fade-in'i
              LCP'yi ~1.5s'ye geciktiriyordu; anında boyanması için giriş animasyonu kaldırıldı. */}
          <h1 className="font-[var(--font-plus-jakarta)] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-4 drop-shadow-xl">
            {t('hero_title')}
          </h1>

          {/* Far-Left Subtitle — fold-üstü LCP metni, anında boyanır (giriş animasyonu yok). */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl mb-7 drop-shadow-sm tracking-[-0.01em]">
            {t('hero_subtitle')}
          </p>

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
                prefetch={true}
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
                <span className="material-symbols-outlined text-lg text-slate-300" aria-hidden="true">
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

