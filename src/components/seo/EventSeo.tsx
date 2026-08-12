"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { eventSchema } from '@/lib/schemas';

interface EventSeoProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  locationName?: string;
  locationAddress?: string;
  image?: string;
  offersUrl?: string;
  className?: string;
}

export default function EventSeo({ 
  name, 
  description, 
  startDate, 
  endDate, 
  locationName = "Alo Yönetim Akademi Merkezi", 
  locationAddress = "Kadıköy, İstanbul",
  image,
  offersUrl = "/iletisim",
  className = "" 
}: EventSeoProps) {

  // Google için şema
  const schema = eventSchema({
    name,
    description,
    startDate,
    endDate,
  });

  // Tarihleri formatlama
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  
  const startMonth = monthNames[start.getMonth()];
  const startDay = start.getDate();
  const startYear = start.getFullYear();
  const startTime = start.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  const endDay = end.getDate();
  const endTime = end.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <JsonLd data={[schema]} />
      <div className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 md:items-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${className}`}>
        
        {/* Dekoratif Takvim İkonu */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none z-0">
          <span className="material-symbols-outlined" style={{ fontSize: '10rem' }}>
            event
          </span>
        </div>

        {/* Tarih Rozeti */}
        <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white dark:from-white dark:to-slate-200 dark:text-slate-900 flex flex-col items-center justify-center shadow-lg relative z-10">
          <span className="text-sm font-bold uppercase tracking-wider opacity-80">{startMonth}</span>
          <span className="text-4xl font-black">{startDay}</span>
        </div>

        {/* Etkinlik Detayları */}
        <div className="flex-1 flex flex-col gap-2 relative z-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[1rem]">schedule</span>
              {startTime} - {endTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[1rem]">location_on</span>
              {locationName}
            </span>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">{name}</h3>
          <p className="text-sm text-[var(--color-secondary)] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Aksiyon */}
        <div className="shrink-0 relative z-10">
          <a 
            href={offersUrl}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Kayıt Ol
            <span className="material-symbols-outlined text-[1rem]">arrow_forward</span>
          </a>
        </div>
      </div>
    </>
  );
}
