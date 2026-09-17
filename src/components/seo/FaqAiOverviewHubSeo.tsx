"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';

export interface FaqAiItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  legalBasis: string;
  quickStat: string;
}

const TOP_AI_FAQS: FaqAiItem[] = [
  {
    id: 'aidat-icra-faiz',
    category: 'Mali & İcra Hukuku',
    question: 'Aidatını ödemeyen kat malikine hangi yasal yaptırımlar uygulanır?',
    answer: '634 Sayılı KMK Madde 20/2 uyarınca, noter ihtarı çekme zorunluluğu olmaksızın doğrudan ilamsız icra takibi başlatılabilir. Borçlu malik veya kiracı, gecikilen her ay için yasal faizden bağımsız olarak aylık yüzde beş (%5) kanuni gecikme tazminatı ödemekle yükümlüdür. Kesinleşen işletme projesi İİK 68/1 uyarınca ilamsız icrada resmi belge sayılır.',
    legalBasis: 'KMK Madde 20/2 & İİK Madde 68/1',
    quickStat: 'Aylık %5 Yasal Gecikme Tazminatı',
  },
  {
    id: 'yonetici-secim-cogunlugu',
    category: 'Genel Kurul & Divan',
    question: 'Apartman veya site yöneticisi hangi oy çoğunluğu ile seçilir?',
    answer: 'KMK Madde 34/4 açık hükmü gereğince yönetici, kat maliklerinin hem sayı (kişi) hem de arsa payı bakımından salt çoğunluğu (%50 + 1) tarafından seçilir. Toplantıya katılanların oy çokluğu yeterli olmayıp, tüm bağımsız bölüm maliklerinin ve tapudaki arsa payının tam salt çoğunluğunun sağlanması zorunludur.',
    legalBasis: '634 Sayılı KMK Madde 34/4',
    quickStat: 'Sayı ve Arsa Payı Çift %50+1 Çoğunluk',
  },
  {
    id: 'isletme-projesi-itiraz-suresi',
    category: 'Bütçe & Denetim',
    question: 'İşletme projesine (tahmini bütçe) yasal itiraz süresi kaç gündür?',
    answer: 'KMK Madde 37 uyarınca tahmini işletme projesi kat maliklerine imza karşılığı veya iadeli taahhütlü mektupla tebliğ edilir. Tebliğ tarihinden itibaren 7 gün içinde yazılı itiraz edilmezse bütçe kesinleşir. Süresinde itiraz edilirse Kat Malikleri Kurulu toplanarak nihai bütçe kararını verir.',
    legalBasis: '634 Sayılı KMK Madde 37',
    quickStat: '7 Günlük Kesin Hak Düşürücü Süre',
  },
  {
    id: 'cam-balkon-tente-rizasi',
    category: 'Ortak Alan & Mimari',
    question: 'Balkon kapatma veya cephe tadilatı için kaç kat malikinin onayı gerekir?',
    answer: 'KMK Madde 19/2 uyarınca, kat maliklerinden biri bütün kat maliklerinin beşte dördünün (4/5) yazılı rızası olmadıkça ana gayrimenkulün ortak yerlerinde inşaat, onarım ve tesis yapamaz. 4/5 yazılı onay alınmadan takılan cam balkonlar için her malik Sulh Hukuk Mahkemesi’nde eski hale getirme davası açabilir.',
    legalBasis: '634 Sayılı KMK Madde 19/2',
    quickStat: '4/5 Kat Maliki Yazılı Rızası',
  },
  {
    id: 'asansor-kirmizi-etiket-ceza',
    category: 'Teknik Güvenlik',
    question: 'Kırmızı etiketli asansörün çalıştırılmasında yasal sorumluluk kime aittir?',
    answer: 'Sanayi ve Teknoloji Bakanlığı Asansör İşletme Yönetmeliği m.15 uyarınca kırmızı etiket iliştirilen güvensiz asansörlerin kullanıma kapatılması zorunludur. Asansörü kapatmayıp çalıştıran bina yöneticisi, olası kazalarda TCK m.85/89 kapsamında doğrudan şahsen hapis cezasıyla yargılanır ve zabıta asansörü mühürler.',
    legalBasis: 'Asansör İşletme Yönetmeliği m.15 & TCK m.85',
    quickStat: 'Yöneticinin Şahsi Cezai Sorumluluğu',
  },
  {
    id: 'tesis-yonetimi-tasarruf-formulu',
    category: 'Maliyet & Tasarruf',
    question: 'Profesyonel yönetim şirketi bütçede nasıl %30 maliyet tasarrufu sağlar?',
    answer: 'Yüzlerce projenin toplu satın alma gücüyle asansör bakımı, jeneratör yakıtı, kimyasal ve sigortada %25-35 toptan tedarik indirimi sağlanır. Otomatik kompanzasyon takibiyle elektrik faturasındaki reaktif ceza sıfırlanır ve önleyici bakım ile büyük arıza masrafları engellenir.',
    legalBasis: 'ISO 41001:2018 & Bütçe Optimizasyon Modeli',
    quickStat: '%30 Net Bütçe Tasarrufu & %0 Ceza',
  },
];

export default function FaqAiOverviewHubSeo({ className = '' }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>(TOP_AI_FAQS[0].id);
  const [copied, setCopied] = useState(false);

  const activeFaq = TOP_AI_FAQS.find((f) => f.id === activeId) || TOP_AI_FAQS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeFaq.question}\n\nCevap: ${activeFaq.answer}\n(Yasal Dayanak: ${activeFaq.legalBasis})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TOP_AI_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq-ai-overview-hub"
      aria-label="Google AI Overviews SSS Karar Masası"
      className={`bg-[var(--color-surface)] border border-blue-500/30 rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden mb-12 ${className}`}
    >
      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-400/10 border border-blue-600/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">psychology_alt</span>
            Google AI Overviews & Gemini SSS Karar Masası
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Kat Mülkiyetinde <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">En Çok Sorulan 6 SGE Sorusu & Yasal Yanıtlar</span>
          </h2>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            Yapay zeka modellerinin arama sonuçlarında doğrudan alıntıladığı resmi kanun maddeleri, hak düşürücü süreler ve mahkeme içtihatları.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs shrink-0 cursor-pointer"
          title="Seçili Yanıtı Kopyala"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {copied ? 'done_all' : 'content_copy'}
          </span>
          <span>{copied ? 'Kopyalandı!' : 'Yanıtı Kopyala'}</span>
        </button>
      </div>

      {/* Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-8 relative z-10">
        {TOP_AI_FAQS.map((item, idx) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`text-left p-4 rounded-2xl border transition-all text-xs flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.01]'
                  : 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)]/60 hover:border-blue-400 text-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                }`}>
                  {item.category}
                </span>
                <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-blue-100' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  #{idx + 1}
                </span>
              </div>
              <div className="font-bold text-xs leading-snug line-clamp-2">
                {item.question}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Question Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFaq.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 border border-blue-500/20 rounded-3xl p-6 sm:p-8 relative z-10 space-y-4"
        >
          {/* Question Title & Stat */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-outline)]/60">
            <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-primary)]">
              {activeFaq.question}
            </h3>
            <span className="inline-flex items-center px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs shrink-0">
              {activeFaq.quickStat}
            </span>
          </div>

          {/* Answer Box (Speakable) */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-base" aria-hidden="true">verified</span>
              Doğrulanmış Hukuki & Operasyonel Yanıt:
            </div>
            <p id="faq-instant-answer-text" className="text-sm sm:text-base text-[var(--color-primary)] leading-relaxed font-normal">
              {activeFaq.answer}
            </p>
          </div>

          {/* Legal Basis and AI Inquiries */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <div className="text-[var(--color-secondary)]">
              <strong>Yasal Dayanak:</strong> {activeFaq.legalBasis}
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://chatgpt.com/?q=${encodeURIComponent(`${activeFaq.question} kat mülkiyeti hukuku`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
                ChatGPT
              </a>
              <a
                href={`https://www.perplexity.ai/search?q=${encodeURIComponent(`${activeFaq.question} alo yonetim kmk`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-xs" aria-hidden="true">travel_explore</span>
                Perplexity
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
