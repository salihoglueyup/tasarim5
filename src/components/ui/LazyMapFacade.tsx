'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface LazyMapFacadeProps {
  src: string;
  title: string;
  className?: string;
  directMapsUrl?: string;
  autoLoadOnIntersection?: boolean;
}

/**
 * Faz 114: Hafif Harita Cephesi (Lazy Map Facade)
 * 
 * Google Maps iframe'inin ilk açılışta ~1.5 MB JS ve onlarca network isteği
 * yapmasını önler; haritayı yalnızca kullanıcı alanın yakınına geldiğinde
 * veya "Haritayı Yükle" butonuna tıkladığında dinamik olarak monte eder.
 */
export default function LazyMapFacade({
  src,
  title,
  className = 'w-full h-[360px]',
  directMapsUrl,
  autoLoadOnIntersection = false,
}: LazyMapFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoLoadOnIntersection || isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoLoadOnIntersection, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-100 dark:bg-slate-900 ${className}`}
    >
      {isLoaded ? (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="w-full h-full border-0"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-white/10 select-none">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 ring-8 ring-amber-500/5 shadow-inner">
            <MapPin className="w-7 h-7 animate-bounce" />
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100 mb-1">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-5">
            İnteraktif Google Haritasını görüntülemek için tıklayın.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsLoaded(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-md active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Haritayı Etkinleştir</span>
            </button>

            {directMapsUrl && (
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-medium text-xs transition-all"
              >
                <span>Uygulamada Aç</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
