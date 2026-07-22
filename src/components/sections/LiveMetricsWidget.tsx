"use client";

import { motion } from 'framer-motion';

const metrics = [
  { value: "45.000+", label: "Yönetilen Bağımsız Bölüm (Daire)", icon: "domain", sub: "İstanbul genelinde prestijli projeler" },
  { value: "%22.4", label: "Ortalama Bütçe Tasarrufu", icon: "trending_down", sub: "Toplu satın alma gücüyle sağlanan tasarruf" },
  { value: "%99.4", label: "Müşteri Memnuniyet Oranı", icon: "sentiment_very_satisfied", sub: "Bağımsız anket sonuçları" },
  { value: "₺12M+", label: "Yıllık Sağlanan Toplam Tasarruf", icon: "savings", sub: "Kat maliklerinin cebinde kalan tutar" },
  { value: "48 Saat", label: "Hızlı Devir Teslim Süresi", icon: "bolt", sub: "Eski yönetimden eksiksiz devir alma" },
  { value: "7/24", label: "Kesintisiz Nöbetçi Teknik Destek", icon: "support_agent", sub: "Ortalama 20 dakikada adrese ulaşım" }
];

export default function LiveMetricsWidget() {
  return (
    <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="bg-gradient-to-r from-blue-900 via-[#122338] to-[#081524] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Canlı Metrikler & Operasyon Gücü
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Rakamlarla Alo Yönetim</h2>
          </div>
          <span className="text-sm text-gray-300 font-light">Veriler her gün otomatik güncellenmektedir.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((m, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col gap-4 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{m.icon}</span>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">{m.value}</div>
                <div className="text-base font-semibold text-gray-200">{m.label}</div>
                <div className="text-xs text-gray-400 font-light mt-1">{m.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
