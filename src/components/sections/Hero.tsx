"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Faz 46: Hero.tsx LCP ve render optimizasyonu:
 * - Mobilde video yüklenmesi kesin olarak engellenir, hafif optimize edilmiş WebP poster görseli sunulur.
 * - Framer Motion kaldırılmış, ilk ekranda ana iş parçacığını (main-thread) bloke etmeyen saf CSS donanım hızlandırmalı animasyonlar uygulanmıştır.
 */
export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  // LCP & Ağ Optimizasyonu:
  // - 2.27 MB'lık brand-film.mp4 mobilde (< 1024px) veya Save-Data modunda HİÇ yüklenmez.
  // - Masaüstünde sayfa tamamen yüklendikten (requestIdleCallback) sonra arka planda getirilir.
  // - Sayfa aşağı kaydırıldığında IntersectionObserver ile video duraklatılarak GPU serbest bırakılır.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;
    const isSaveData = (navigator as any)?.connection?.saveData;
    
    if (reduceMotion || isMobile || isSaveData) return;

    let done = false;
    const attach = () => {
      if (done) return;
      done = true;
      setShowVideo(true);
    };

    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | undefined;
    let timerId: number | undefined;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(attach, { timeout: 4000 });
    } else {
      timerId = window.setTimeout(attach, 2500);
    }

    return () => {
      if (idleId !== undefined && typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  // Sayfa aşağı kaydırıldığında GPU/CPU tasarrufu için videoyu otomatik duraklat
  useEffect(() => {
    if (!showVideo || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [showVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full h-[100vh] min-h-[500px] md:min-h-[680px] flex flex-col justify-end overflow-hidden bg-slate-950 font-sans pb-4 sm:pb-6">
      
      {/* Subliminal SEO / Ekran Okuyucu Metni */}
      <div className="sr-only">
        Alo Yönetim, İstanbul Kadıköy merkezli profesyonel site yönetimi, tesis yönetimi, apartman yöneticiliği, aidat tahsilatı, hukuki icra takibi ve bina güvenliği hizmetleri sunan kurumsal bir şirkettir. KMK (Kat Mülkiyeti Kanunu) uzmanlığı ile şeffaf hizmet.
      </div>

      {/* 8K Fullscreen Background Visual & Fallback */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-900 z-0 animate-pulse" />
        
        {/* Kesin LCP Görseli: HTML ilk dokümanda anında keşfedilir (fetchPriority="high") */}
        <Image
          src="/images/hero-poster-v5.webp"
          alt="Alo Yönetim Profesyonel Tesis Yönetimi İstanbul"
          fill
          priority={true}
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          quality={75}
          className="object-cover object-center scale-105 pointer-events-none z-0 transform-gpu"
        />

        {/* Video: Yalnızca masaüstünde ve sayfa boşta kalınca (idle) yüklenir */}
        {showVideo && (
          <video
            ref={videoRef}
            src="/video/brand-film.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="w-full h-full object-cover object-center scale-105 pointer-events-none relative z-1 transition-opacity duration-1000 opacity-90 transform-gpu"
          />
        )}

        {/* Deep Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      </div>

      {/* Far-Left Bottom Aligned Content Container */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        <div className="max-w-3xl flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <div className="mb-4 transition-all duration-700 ease-out transform-gpu">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full font-semibold text-xs text-white shadow-lg tracking-tight">
              <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
              <span>{t('hero_badge')}</span>
            </div>
          </div>

          {/* Supercharged Minimalist Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-4 text-balance drop-shadow-md transition-all duration-700 ease-out transform-gpu">
            {t('hero_title')}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-snug mb-6 max-w-2xl text-balance drop-shadow transition-all duration-700 ease-out transform-gpu">
            {t('hero_subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto transition-all duration-700 ease-out transform-gpu">
            <Magnetic strength={0.15}>
              <Link 
                href="/teklif-al"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-tight shadow-xl hover:bg-slate-100 transition-all group"
              >
                <span>{t('hero_cta_primary')}</span>
                <span className="material-symbols-outlined text-sm sm:text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.15}>
              <Link 
                href="/hizmetler"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-xs sm:text-sm hover:bg-white/20 transition-all"
              >
                <span>{t('hero_cta_secondary')}</span>
              </Link>
            </Magnetic>

            {/* Video Sound Toggle Button (Yalnızca video açıkken) */}
            {showVideo && (
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
                className="hidden sm:flex w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
              >
                <span className="material-symbols-outlined text-lg">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none z-10" />
    </section>
  );
}
