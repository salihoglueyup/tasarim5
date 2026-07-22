"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const categories = ["Tümü", "Aidat & Finans", "Güvenlik", "Devir Teslim", "Teknoloji"];

const faqs = [
  {
    category: "Aidat & Finans",
    question: "Aidatlar nasıl toplanır ve gecikme takibi nasıl yapılır?",
    answer: "Tüm kat malikleri özel mobil uygulamamız üzerinden kredi kartı veya havale/EFT ile aidatlarını güvenle ödeyebilir. Ödemesini geciktiren daireler için otomatik SMS/E-posta hatırlatmaları ve yasal süre sonunda avukatlarımızca şeffaf icra takibi başlatılır."
  },
  {
    category: "Devir Teslim",
    question: "Mevcut yönetimden Alo Yönetim'e geçiş süreci nasıl işler?",
    answer: "Devir teslim sürecinde kat maliklerinin hiçbir yükü olmaz. Uzman ekibimiz eski yönetimden kararlar defterini, banka hesaplarını ve teknik evrakları resmi tutanakla teslim alır. Tüm süreç 48 saat içinde tamamlanır."
  },
  {
    category: "Güvenlik",
    question: "Güvenlik personeliniz özlük hakları ve eğitimleri nasıl sağlanır?",
    answer: "Tüm güvenlik ekibimiz 5188 sayılı kanuna uygun özel güvenlik kimlik kartına sahiptir. SGK, maaş ve kıdem tazminatı sorumlulukları tamamen Alo Yönetim güvencesindedir. Düzenli kriz yönetimi eğitimleri verilir."
  },
  {
    category: "Teknoloji",
    question: "Mobil uygulamada hangi işlemleri yapabilirim?",
    answer: "Aidat ödeme, detaylı gelir/gider bilançolarını inceleme, tesis (tenis kortu, havuz) rezervasyonu yapma, arıza bildirimi oluşturma ve yönetici kararlarını oylama gibi tüm işlemleri saniyeler içinde yapabilirsiniz."
  },
  {
    category: "Aidat & Finans",
    question: "Sitenin banka hesapları kimin adına açılır?",
    answer: "Banka hesapları kesinlikle şahıs adına değil, sitenizin VKN (Vergi Kimlik Numarası) adına resmi olarak açılır. Yönetici ve Alo Yönetim çift imza / yetki yetkisi ile hareket eder, her kuruş harcama sistemde kayıt altına alınır."
  }
];

export default function SSS() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === "Tümü" 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  return (
    <>
      <PageHeader 
        title="Sıkça Sorulan Sorular" 
        description="Site ve tesis yönetimiyle ilgili merak ettiğiniz tüm soruların şeffaf yanıtları." 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-3xl overflow-hidden transition-colors hover:border-[var(--color-primary)]/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-8 text-left flex items-center justify-between gap-4 font-bold text-xl text-[var(--color-primary)] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                    expand_more
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-lg text-[var(--color-secondary)] font-light leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 to-[#122338] text-white p-10 md:p-14 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Başka bir sorunuz mu var?</h3>
            <p className="text-gray-300 font-light">Uzman ekibimiz 7/24 sorularınızı yanıtlamaktan memnuniyet duyar.</p>
          </div>
          <Link 
            href="/iletisim" 
            className="bg-white text-[var(--color-primary)] font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shrink-0"
          >
            Bize Ulaşın
          </Link>
        </div>

      </section>
    </>
  );
}
