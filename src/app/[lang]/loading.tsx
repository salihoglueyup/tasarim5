import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

/**
 * Faz 83: Next.js App Router sayfa yapısıyla birebir örtüşen,
 * GPU hızlandırmalı CSS shimmer iskeletine sahip yüksek kaliteli `loading.tsx`.
 */
export default function Loading() {
  return (
    <div 
      className="min-h-[85vh] w-full flex flex-col p-6 max-w-7xl mx-auto space-y-10 pt-28 font-sans"
      aria-label="Sayfa yükleniyor"
    >
      {/* Breadcrumb & Üst Etiket İskeleti */}
      <div className="flex items-center gap-2">
        <Skeleton variant="rectangular" className="h-5 w-24" />
        <span className="text-slate-300 dark:text-slate-700">/</span>
        <Skeleton variant="rectangular" className="h-5 w-36" />
      </div>

      {/* Hero Başlık & Alt Başlık İskeleti */}
      <div className="space-y-4 max-w-3xl">
        <Skeleton variant="rectangular" className="h-7 w-32 rounded-full" />
        <Skeleton variant="rectangular" className="h-12 w-4/5 rounded-2xl" />
        <Skeleton variant="rectangular" className="h-6 w-3/5 rounded-xl" />
      </div>

      {/* Hero Aksiyon Butonları İskeleti */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Skeleton variant="rectangular" className="h-12 w-40 rounded-xl" />
        <Skeleton variant="rectangular" className="h-12 w-32 rounded-xl" />
      </div>

      {/* 3'lü Hizmet / İçerik Kart Izgarası İskeleti */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
        {[1, 2, 3].map((card) => (
          <div 
            key={card}
            className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 space-y-4 shadow-sm"
          >
            <Skeleton variant="rectangular" className="h-12 w-12 rounded-2xl" />
            <Skeleton variant="rectangular" className="h-6 w-3/4 rounded-lg" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" className="h-4 w-2/3 rounded-md pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
