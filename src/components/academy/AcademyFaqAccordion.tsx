'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Award, FileText, Stethoscope, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'ruhsat' | 'sinav' | 'saglik' | 'hukuk';
  categoryLabel: string;
  icon: React.ElementType;
  question: string;
  answer: string;
  lawRef?: string;
  importantNote?: string;
}

export const ACADEMY_FAQ_ITEMS: FaqItem[] = [
  {
    id: 'ogg-nasil-alinir',
    category: 'ruhsat',
    categoryLabel: 'Ruhsat & Sertifika',
    icon: Award,
    question: 'Özel güvenlik görevlisi kimlik kartı (ÖGG kartı) nasıl alınır?',
    answer: 'Yetkili bir özel güvenlik eğitim kurumunda temel eğitimi tamamlayıp EGM özel güvenlik sınavında başarılı olduktan sonra, sağlık raporu ve güvenlik soruşturması ile Valiliğe başvurularak alınır. Güncel şartlar için EGM ve ilgili Valilik duyurularını esas alın.',
    lawRef: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
  },
  {
    id: 'kart-gecerlilik',
    category: 'ruhsat',
    categoryLabel: 'Ruhsat & Sertifika',
    icon: Award,
    question: 'Kimlik kartının geçerlilik süresi nedir?',
    answer: 'Kartın geçerlilik süresi 5 yıldır; süre bitiminde yenileme eğitimi alınarak yenilenir. Güncel şartlar için ilgili Valilik birimini teyit edin.',
    lawRef: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
  },
  {
    id: 'silahli-silahsiz',
    category: 'ruhsat',
    categoryLabel: 'Ruhsat & Sertifika',
    icon: Award,
    question: 'Silahsız ve silahlı görevli arasındaki fark nedir?',
    answer: 'Silahsız görevli için en az 18 yaş ve ortaokul, silahlı görevli için en az 21 yaş ve lise mezuniyeti aranır. Silahlı çalışmak için ayrıca silahlı güvenlik eğitimi ve sağlık şartları gerekir; ayrıntılar için eğitim kurumuna ve mevzuata bakın.',
    lawRef: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
  },
  {
    id: 'kartsiz-calisma',
    category: 'hukuk',
    categoryLabel: 'Hukuk & Yetki',
    icon: ShieldCheck,
    question: 'Kimlik kartı olmayan kişi güvenlik görevlisi olarak çalışabilir mi?',
    answer: 'Hayır. Özel güvenlik hizmeti kimlik kartı olan personelle yürütülmelidir. Sitenize hizmet veren şirketin izin belgesini ve personelin kimlik kartı geçerliliğini göreve başlamadan önce kontrol edin.',
    lawRef: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
  },
];

export default function AcademyFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>('silahsiz-silahli-gecis');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredItems = activeFilter === 'all' 
    ? ACADEMY_FAQ_ITEMS 
    : ACADEMY_FAQ_ITEMS.filter((item) => item.category === activeFilter);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/30 border-t border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-semibold mb-3">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Sıkça Sorulan Sorular & Yasal Rehber</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            5188 Sayılı Kanun & Sertifikasyon Hakkında Merak Edilenler
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Kayıttan mezuniyete, valilik soruşturmasından sınav haklarına kadar kursiyerlerimizin en çok yönelttiği soruların uzman yanıtları.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { key: 'all', label: 'Tüm Sorular' },
            { key: 'ruhsat', label: 'Ruhsat & Kimlik' },
            { key: 'sinav', label: 'Sınav & Haklar' },
            { key: 'saglik', label: 'Sağlık Raporu' },
            { key: 'hukuk', label: 'Yetki & Kanun' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeFilter === f.key
                  ? 'bg-slate-500 text-white shadow-md shadow-slate-500/20 font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            const ItemIcon = item.icon;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-slate-900 border-slate-500/40 shadow-lg shadow-slate-500/5'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-slate-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                        {item.categoryLabel}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {item.question}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in-50 duration-200">
                    <p className="text-sm sm:text-base leading-relaxed mb-4">
                      {item.answer}
                    </p>

                    {item.importantNote && (
                      <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/30 border border-slate-200/80 dark:border-slate-900/40 text-xs sm:text-sm text-slate-900 dark:text-slate-200 mb-3 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Önemli Hatırlatma: </span>
                          {item.importantNote}
                        </div>
                      </div>
                    )}

                    {item.lawRef && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Yasal Referans: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.lawRef}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need Help Footer */}
        <div className="mt-8 text-center p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800/60 dark:to-slate-900/60 border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Aklınıza takılan başka bir yasal mevzuat veya kurs kayıt detayı mı var?
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            0216 550 48 48 numaralı hattımızdan Alo Güvenlik eğitim koordinatörlerimize anında ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
