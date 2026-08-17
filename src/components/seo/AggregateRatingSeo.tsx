"use client";

import { Star, StarHalf } from 'lucide-react';
import JsonLd from './JsonLd';

interface AggregateRatingProps {
  itemReviewed: {
    '@type': string; // e.g., 'Service', 'Organization', 'Product'
    name: string;
  };
  ratingValue: number; // e.g., 4.8
  reviewCount: number; // e.g., 150
  bestRating?: number;
  worstRating?: number;
  showUI?: boolean;
  className?: string;
}

/**
 * SEO Faz 11: Zengin Arama Sonuçları için Aggregate Rating (Yıldızlı Sonuçlar)
 * Hem kullanıcılara görsel olarak puanı gösterir (showUI=true ise),
 * hem de Google'a AggregateRating JSON-LD şemasını göndererek SERP'de yıldız çıkartır.
 */
export default function AggregateRatingSeo({
  itemReviewed,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
  showUI = true,
  className = ''
}: AggregateRatingProps) {
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: itemReviewed.name || 'Alo Yönetim Mülk ve Tesis Yönetimi',
    image: 'https://aloyonetim.com.tr/images/logos/new-icon-transparent-hd.png',
    telephone: '0216 550 48 48',
    url: 'https://aloyonetim.com.tr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Osmanağa Mah. Misakı Milli Sok. No:94A',
      addressLocality: 'Kadıköy',
      addressRegion: 'İstanbul',
      postalCode: '34714',
      addressCountry: 'TR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating,
      worstRating
    }
  };

  // 4.8 gibi bir değeri görselleştirmek için tam ve yarım yıldızları hesapla
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 !== 0;
  const emptyStars = bestRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex flex-col items-start ${className}`}>
      {/* Google AggregateRating JSON-LD Injection */}
      <JsonLd data={schema} />

      {showUI && (
        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center space-x-1" aria-label={`Puan: ${ratingValue}/${bestRating}`}>
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            {hasHalfStar && <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400" />}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-${i}`} className="w-4 h-4 text-slate-300 dark:text-slate-600" />
            ))}
          </div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            <span className="text-slate-900 dark:text-white font-bold">{ratingValue}</span>
            <span className="text-slate-400 mx-1">/</span>
            <span>{bestRating}</span>
          </div>
          <div className="text-xs text-slate-500">
            ({reviewCount} değerlendirme)
          </div>
        </div>
      )}
    </div>
  );
}
