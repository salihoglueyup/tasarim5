"use client";

import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';

const jobs = [
  { title: "Bölge Operasyon Müdürü", location: "İstanbul, Avrupa Yakası", type: "Tam Zamanlı", dept: "Yönetim" },
  { title: "Güvenlik Şefi", location: "Kadıköy, İstanbul", type: "Vardiyalı", dept: "Güvenlik" },
  { title: "Teknik Bakım Uzmanı", location: "Ataşehir, İstanbul", type: "Tam Zamanlı", dept: "Teknik" },
  { title: "Ön Muhasebe Elemanı", location: "Genel Merkez (Şişli)", type: "Tam Zamanlı", dept: "Finans" },
  { title: "Peyzaj Mimarı", location: "Saha", type: "Yarı Zamanlı", dept: "Operasyon" }
];

export default function AcikPozisyonlar() {
  return (
    <>
      <PageHeader 
        title="Açık Pozisyonlar" 
        description="Şu an yetenek aradığımız pozisyonlar. Özgeçmişinizi ik@aloyonetim.com adresine gönderebilirsiniz." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="flex flex-col gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-[var(--color-surface)] border border-[var(--color-outline)] p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--color-primary)] transition-colors group cursor-pointer">
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">{job.dept}</span>
                  <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">{job.type}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  <span className="font-light">{job.location}</span>
                </div>
              </div>

              <button className="flex items-center gap-2 text-[var(--color-primary)] font-bold border border-[var(--color-outline)] px-6 py-4 rounded-full group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all whitespace-nowrap">
                Başvur
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
