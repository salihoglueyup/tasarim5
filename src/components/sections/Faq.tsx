"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: "Eski yönetimden size geçiş süreci nasıl işliyor?",
    answer: "Geçiş süreci ortalama 7-14 gün sürer. Tüm hukuki, mali ve idari evrakları uzman ekibimiz devralır. Sakinler hiçbir kesinti hissetmeden, sadece yeni ve şeffaf sisteme dahil olurlar."
  },
  {
    question: "Personel seçimi ve denetimi kime ait?",
    answer: "Tüm güvenlik, temizlik ve teknik personel bizim bordromuzdadır (veya site talebine göre ayarlanır). İşe alım, güvenlik soruşturması, SGK takibi ve günlük performans denetimleri tamamen bizim sorumluluğumuzdadır."
  },
  {
    question: "Aidatları nasıl takip ediyorsunuz?",
    answer: "Özel mobil uygulamamız sayesinde sakinler kredi kartı veya havale ile tek tuşla aidat ödeyebilir. Ödemeyenler sistem tarafından otomatik SMS ile uyarılır, yasal süreç gerekirse hukuk departmanımızca başlatılır."
  },
  {
    question: "Acil durumlarda (gece su patlaması, asansör arızası) ne yapıyoruz?",
    answer: "7/24 hizmet veren Acil Destek Hattımız mevcuttur. Gece saat kaç olursa olsun, mobil ekiplerimiz en geç 1 saat içinde duruma müdahale eder."
  },
  {
    question: "Yönetim şeffaflığını nasıl sağlıyorsunuz?",
    answer: "Uygulamamız üzerinden her ay düzenli gelir-gider tabloları, banka ekstreleri ve yapılan harcamaların faturaları tüm sakinlerin erişimine açılır. %100 şeffaflık temel prensibimizdir."
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-32 px-[var(--spacing-gutter)] bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-primary)] mb-4">
            Aklınıza takılanlar.
          </h2>
          <p className="text-xl text-[var(--color-secondary)] font-light">
            Sürecimizle ilgili en çok merak edilen soruları şeffaflıkla yanıtladık.
          </p>
        </div>

        <div className="flex flex-col border-t border-[var(--color-outline)]">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div key={index} className="border-b border-[var(--color-outline)] overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-xl md:text-2xl font-medium transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]'}`}>
                    {faq.question}
                  </span>
                  <motion.div 
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full border border-[var(--color-outline)] flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-[var(--color-surface)]"
                  >
                    <span className="material-symbols-outlined text-[var(--color-primary)]">add</span>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-8 pr-12 text-[var(--color-secondary)] leading-relaxed text-lg font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
