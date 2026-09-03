"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Image from 'next/image';
import { BASE_URL } from '@/lib/constants';

interface VideoWithSeoProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string; // ISO 8601, örn: "2026-01-15"
  duration?: string; // ISO 8601 duration, örn: "PT2M30S"
  embedUrl?: string; // Video URL'si veya YouTube embed linki
  author?: string;
  className?: string;
}

/**
 * Zengin Video SEO Bileşeni (VideoWithSeo & VideoObject Şeması)
 * 
 * Güvenlik eğitimleri, şirket tanıtımı ve tesis yönetimi bilgilendirme videolarını
 * Google Video sekmesinde ve arama sonuçlarında thumbnail rozetiyle listeler.
 */
export default function VideoWithSeo({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration = "PT2M0S",
  embedUrl = "",
  author = "Alo Yönetim",
  className = ""
}: VideoWithSeoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const absoluteThumb = thumbnailUrl.startsWith('http')
    ? thumbnailUrl
    : `${BASE_URL}${thumbnailUrl.startsWith('/') ? '' : '/'}${thumbnailUrl}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl: [absoluteThumb],
    uploadDate,
    duration,
    ...(embedUrl ? { embedUrl } : {}),
    author: {
      '@type': 'Organization',
      name: author,
      url: BASE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`
      }
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className={`relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/10 group ${className}`}>
        {!isPlaying ? (
          <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center cursor-pointer" onClick={() => embedUrl && setIsPlaying(true)}>
            {/* Küçük Resim (Thumbnail) */}
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            
            {/* Oynat Butonu */}
            <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-brand-500 transition-all">
              <span className="material-symbols-outlined text-3xl md:text-4xl translate-x-0.5" aria-hidden="true">
                play_arrow
              </span>
            </div>

            {/* Video Başlık Şeridi */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 z-10">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Video Rehber
              </span>
              <h4 className="text-white font-bold text-base md:text-lg mt-1 line-clamp-1">
                {title}
              </h4>
            </div>
          </div>
        ) : (
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        )}
      </div>
    </>
  );
}
