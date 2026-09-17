'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface LiteYouTubeEmbedProps {
  id?: string;
  url?: string;
  title: string;
  poster?: string;
  aspectRatio?: string;
  className?: string;
}

/**
 * Faz 115: Hafif YouTube Cephesi (Lite YouTube Embed)
 * 
 * Standart YouTube iframe'i sayfa ilk açıldığında ~1.2 MB JS, CSS ve font indirir.
 * Bu bileşen hafif bir WebP poster görseli ve play butonu sunar;
 * fare ile üzerine gelindiğinde DNS preconnect başlatır,
 * tıklandığında autoplay ile iframe'i sıfır gecikmeyle yükler (-1 MB JS tasarrufu).
 */
export default function LiteYouTubeEmbed({
  id,
  url,
  title,
  poster,
  aspectRatio = 'aspect-video',
  className = '',
}: LiteYouTubeEmbedProps) {
  const [isActivated, setIsActivated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Video ID'sini URL veya ID'den türet
  const videoId = id || extractYouTubeId(url || '') || '';

  const posterUrl =
    poster ||
    (videoId
      ? `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`
      : '/images/hero-poster-v5.webp');

  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-slate-950 shadow-xl border border-slate-200 dark:border-white/10 group ${className}`}
      onPointerEnter={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
    >
      {/* Fare üzerine geldiğinde YouTube CDN el sıkışmasını (preconnect) başlat */}
      {isHovered && !isActivated && (
        <>
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />
          <link rel="preconnect" href="https://www.google.com" />
        </>
      )}

      {isActivated && videoId ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsActivated(true)}
          aria-label={`${title} videosunu oynat`}
          className="w-full h-full relative flex items-center justify-center cursor-pointer select-none text-left p-0 border-0 bg-transparent"
        >
          {/* Poster Görseli */}
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 960px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
            loading="lazy"
          />

          {/* Karartma Katmanı */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity group-hover:opacity-75" />

          {/* Oynat Butonu */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
          </div>

          {/* Başlık Şeridi */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10">
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest bg-red-950/60 px-2.5 py-1 rounded-md inline-block mb-1.5 border border-red-800/40">
              YouTube Video
            </span>
            <p className="text-white font-bold text-sm sm:text-base line-clamp-2 drop-shadow-md">
              {title}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
