"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';
import { BASE_URL } from '@/lib/constants';

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  isLegalRequirement?: boolean;
}

interface ChecklistAuditSeoProps {
  title?: string;
  description?: string;
  items?: ChecklistItem[];
  className?: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  {
    id: "kmk-1",
    title: "Yıllık İşletme Projesi & Bütçe Tebliği",
    description: "Kat Mülkiyeti Kanunu Madde 37 uyarınca tüm maliklere imza karşılığı veya taahhütlü mektupla tebliğ edilmelidir.",
    category: "Yasal & İdari",
    isLegalRequirement: true
  },
  {
    id: "kmk-2",
    title: "Noter Tasdikli Karar ve Kasa Defterleri",
    description: "Her takvim yılı kapanışında defterlerin noter kapanış tasdikinin eksiksiz yaptırılması zorunludur.",
    category: "Yasal & İdari",
    isLegalRequirement: true
  },
  {
    id: "sec-1",
    title: "5188 Sayılı Kanun Kapsamında Özel Güvenlik İzni",
    description: "Güvenlik personeli istihdam eden sitelerde Valilik Özel Güvenlik Komisyonu izin belgesi bulunmalıdır.",
    category: "Güvenlik & Koruma",
    isLegalRequirement: true
  },
  {
    id: "tech-1",
    title: "Asansör Yıllık Yeşil Etiket Periyodik Kontrolü",
    description: "A tipi akredite muayene kuruluşundan yıllık periyodik kontrol yaptırılmalı ve yeşil etiket alınmalıdır.",
    category: "Teknik & Yangın",
    isLegalRequirement: true
  },
  {
    id: "tech-2",
    title: "Yangın Söndürme Tüpleri & Hidrant Basınç Testi",
    description: "6 aylık ve yıllık periyodik hidrostatik test ve dolum kontrolleri resmi raporlanmalıdır.",
    category: "Teknik & Yangın",
    isLegalRequirement: true
  },
  {
    id: "fin-1",
    title: "Aylık Banka Mutabakatı & Şeffaf Sakin Paneli",
    description: "Tüm gelir ve gider faturalarının dijital ortamda taranarak site sakinlerinin erişimine açılması.",
    category: "Mali Şeffaflık"
  }
];

/**
 * İnteraktif Tesis Denetim Kontrol Listesi & HowTo Şeması (ChecklistAuditSeo)
 * 
 * Apartman ve site yöneticilerine yasal zorunlulukları kontrol etme imkanı sunar.
 * Google'a `HowTo` ve `ItemList` şeması basarak arama sonuçlarında kontrol listesi
 * ve zengin adım adım rehber görünümü sağlar.
 */
export default function ChecklistAuditSeo({
  title = "Apartman & Site Yönetimi Yasal Denetim Kontrol Listesi",
  description = "Tesisinizin mevzuata uygunluğunu ve yasal risklerini adım adım kontrol edin.",
  items = DEFAULT_ITEMS,
  className = ""
}: ChecklistAuditSeoProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const progressPercent = Math.round((checkedIds.length / items.length) * 100);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    totalTime: 'PT5M',
    step: items.map((item, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: item.title,
      text: item.description,
      url: `${BASE_URL}/hizmetler`
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm my-8 ${className}`}
      >
        {/* Başlık ve İlerleme */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              İnteraktif Denetim Aracı
            </span>
            <h3 className="text-xl md:text-2xl font-black text-[var(--color-primary)] mt-1">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-[var(--color-secondary)] font-light mt-1">
              {description}
            </p>
          </div>

          {/* İlerleme Rozeti */}
          <div className="bg-white dark:bg-zinc-800 p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-sm">
              %{progressPercent}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tamamlanma</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {checkedIds.length} / {items.length} Madde
              </span>
            </div>
          </div>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full mb-6 overflow-hidden">
          <div
            className="bg-brand-500 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Liste Maddeleri */}
        <div className="space-y-3">
          {items.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-950/20'
                    : 'bg-white dark:bg-zinc-800/60 border-slate-200/70 dark:border-white/5 hover:border-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-emerald-500 text-white'
                        : 'border-2 border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {isChecked && (
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-slate-300">
                      {item.category}
                    </span>
                    {item.isLegalRequirement && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        Yasal Zorunluluk
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-sm font-bold transition-all ${
                      isChecked
                        ? 'text-slate-400 dark:text-slate-500 line-through'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Eylem Kutusu */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-slate-100 dark:border-white/5">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Eksikleriniz mi var? Yasal riskleri sıfırlayalım.
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
              Alo Yönetim uzmanları siteniz için ücretsiz durum tespiti ve işletme projesi denetimi yapar.
            </p>
          </div>
          <Link
            href="/teklif-al"
            className="shrink-0 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
          >
            Ücretsiz Hukuki Denetim İste
          </Link>
        </div>
      </div>
    </>
  );
}
