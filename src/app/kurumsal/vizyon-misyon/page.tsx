"use client";

import PageHeader from '@/components/layout/PageHeader';

export default function VizyonMisyon() {
  return (
    <>
      <PageHeader 
        title="Vizyon & Misyon" 
        description="Sektöre yön veren teknolojik vizyonumuz ve kat maliklerine sunduğumuz temel değerlerimiz." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-12 rounded-[3rem] shadow-sm flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">Vizyonumuz</h2>
            <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">
              Türkiye genelindeki tüm toplu yaşam alanlarında ve rezidanslarda, geleneksel ve kapalı yönetim sistemlerini tamamen ortadan kaldırarak; %100 şeffaf, yapay zeka destekli ve dijital bir mülk yönetimi standardı inşa etmek.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-[#122338] text-white p-12 rounded-[3rem] shadow-xl flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-blue-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">flag</span>
            </div>
            <h2 className="text-3xl font-bold">Misyonumuz</h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              Kat maliklerinin aidat kaygılarını ortadan kaldıran şeffaf bütçe yönetimi sunmak, 7/24 kesintisiz güvenlik ve teknolojik bakımla yaşam kalitesini en üst düzeye çıkarmak ve binaların gayrimenkul değerini artırmak.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
