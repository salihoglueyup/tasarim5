"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    step: 1,
    title: "Ücretsiz Keşif & Detaylı Analiz",
    desc: "Mühendislerimiz ve mali danışmanlarımız sitenize gelerek tesisin fiziki durumu, asansörler, jeneratör ve geçmiş harcama bütçelerini inceler.",
    icon: "search_insights",
    tag: "Aşama 1: Analiz"
  },
  {
    step: 2,
    title: "Şeffaf Tasarruf Bütçesi Sunumu",
    desc: "Toplu satın alma gücümüzle sigorta, güvenlik ve malzeme masraflarında elde edilecek %20+ tasarruf kalemlerini içeren resmi teklif raporu sunulur.",
    icon: "request_quote",
    tag: "Aşama 2: Bütçe"
  },
  {
    step: 3,
    title: "Genel Kurul & Karar Alımı",
    desc: "Kat malikleri kurulunda veya yönetim kurulu kararıyla Alo Yönetim ile çalışma kararı resmi deftere işlenir.",
    icon: "gavel",
    tag: "Aşama 3: Karar"
  },
  {
    step: 4,
    title: "48 Saatlik Hızlı Devir Teslim",
    desc: "Eski yönetimden kararlar defteri, banka hesapları ve resmi evraklar avukatlarımız nezaretinde resmi tutanakla eksiksiz teslim alınır.",
    icon: "assignment_turned_in",
    tag: "Aşama 4: Devir"
  },
  {
    step: 5,
    title: "Dijital Kurulum & Mobil Uygulama",
    desc: "Tüm kat maliklerine SMS ile özel giriş şifreleri tanımlanır. Şeffaf bilanço ve mobil aidat ödeme sistemi anında aktif edilir.",
    icon: "phone_android",
    tag: "Aşama 5: Kurulum"
  },
  {
    step: 6,
    title: "Kesintisiz 7/24 Profesyonel Yönetim",
    desc: "Özel güvenlik, periyodik temizlik, nöbetçi teknik ekip ve şeffaf hukuk desteği ile siteniz kusursuzca yönetilmeye başlar.",
    icon: "verified_user",
    tag: "Aşama 6: Başlangıç"
  }
];

export default function InteractiveProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
          Süreç Nasıl İşler?
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          6 Adımda Alo Yönetim'e Geçiş
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          Eski yönetimden ayrılmak gözünüzü korkutmasın. 48 saatlik resmi devir teslim süreciyle tüm işlemleri biz yürütüyoruz.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeStep === idx
                ? 'bg-[var(--color-primary)] text-white shadow-lg scale-105'
                : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)] hover:border-[var(--color-primary)]'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
              {s.step}
            </span>
            {s.tag}
          </button>
        ))}
      </div>

      {/* Active Step Display Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-10 md:p-16 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-500/10 px-4 py-1.5 rounded-full w-fit">
              {steps[activeStep].tag}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
              {steps[activeStep].title}
            </h3>
            <p className="text-xl text-[var(--color-secondary)] font-light leading-relaxed">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 to-[#122338] text-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-4">
            <span className="material-symbols-outlined text-6xl text-blue-400">
              {steps[activeStep].icon}
            </span>
            <div className="font-bold text-lg">Adım {steps[activeStep].step} / 6</div>
            <div className="text-xs text-gray-300 font-light">%100 Alo Yönetim Güvencesi</div>
          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
