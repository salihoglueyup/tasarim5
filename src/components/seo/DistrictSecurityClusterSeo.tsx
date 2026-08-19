"use client";

import React from 'react';
import Link from 'next/link';

interface DistrictLink {
  name: string;
  slug: string;
  desc: string;
}

const DISTRICT_SECURITY_HUBS: DistrictLink[] = [
  { name: 'Kadıköy', slug: 'kadikoy', desc: 'Moda, Bağdat Caddesi, Kozyatağı site ve rezidans güvenliği.' },
  { name: 'Ataşehir', slug: 'atasehir', desc: 'Batı Ataşehir, Finans Merkezi ve toplu konut güvenlik yönetimi.' },
  { name: 'Beşiktaş', slug: 'besiktas', desc: 'Levent, Etiler, Bebek lüks rezidans ve villa güvenliği.' },
  { name: 'Başakşehir', slug: 'basaksehir', desc: 'Bahçeşehir ve Kayaşehir büyük ölçekli uydu kent güvenliği.' },
  { name: 'Şişli', slug: 'sisli', desc: 'Mecidiyeköy, Bomonti, Nişantaşı plaza ve iş merkezi koruması.' },
  { name: 'Bakırköy', slug: 'bakirkoy', desc: 'Yeşilköy, Ataköy sahil bandı rezidans ve site güvenliği.' },
  { name: 'Üsküdar', slug: 'uskudar', desc: 'Altunizade, Çamlıca, Acıbadem butik site ve konak güvenliği.' },
  { name: 'Maltepe', slug: 'maltepe', desc: 'Dragos, Zümrütevler ve sahil siteleri 5188 güvenlik hizmeti.' },
  { name: 'Beylikdüzü', slug: 'beylikduzu', desc: 'Beykent ve Yakuplu çok bloklu site güvenlik operasyonları.' },
  { name: 'Sarıyer', slug: 'sariyer', desc: 'Maslak, Tarabya, Zekeriyaköy lüks villa sitesi güvenliği.' },
  { name: 'Kartal', slug: 'kartal', desc: 'Kordonboyu, Uğur Mumcu ve Soğanlık rezidans güvenlik yönetimi.' },
  { name: 'Ümraniye', slug: 'umraniye', desc: 'Şerifali, Tepeüstü ve Finans koridoru tesis koruma hizmetleri.' }
];

export default function DistrictSecurityClusterSeo() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <span>İstanbul Geneli Yerel Güvenlik Operasyonları</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
          İlçelere Göre <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400">Özel Güvenlik Yönetimi</span>
        </h2>
        <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-3">
          İstanbul genelinde 39 ilçede 5188 sayılı kanun kapsamında aktif saha denetimi ve nizamiyeli güvenlik operasyonları yürütüyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {DISTRICT_SECURITY_HUBS.map((dist, idx) => (
          <Link
            key={idx}
            href={`/bolgeler/${dist.slug}/guvenlik-yonetimi`}
            className="group p-5 bg-gray-50/60 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 rounded-2xl hover:border-slate-400 dark:hover:border-slate-500 transition-all hover:scale-[1.02] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-[var(--color-primary)] text-base group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  {dist.name}
                </span>
                <span className="material-symbols-outlined text-sm text-slate-400 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                {dist.desc}
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-500 mt-3 block">
              {dist.name} Güvenlik Hizmeti →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
