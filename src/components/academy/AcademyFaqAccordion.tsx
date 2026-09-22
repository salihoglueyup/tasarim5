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

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'silahsiz-silahli-gecis',
    category: 'ruhsat',
    categoryLabel: 'Ruhsat & Sertifika',
    icon: Award,
    question: 'Silahsız özel güvenlik sertifikam var, silahlı eğitime nasıl geçiş yapabilirim?',
    answer: 'Silahsız kimlik kartı sahibi olan personelin silahlıya geçiş yapabilmesi için 21 yaşını doldurmuş ve en az lise mezunu olması gerekmektedir. Kursumuzda verilecek 20 saatlik "Silah Bilgisi ve Taktik Atış" fark eğitimine katılarak EGM tarafından düzenlenen ilk sınavda atış ve yazılı testten geçerli not alması yeterlidir.',
    lawRef: '5188 Sayılı Kanun Madde 10 & Yönetmelik Madde 31',
    importantNote: 'Devlet hastanesinden alınacak yeni sağlık kurulu heyet raporunda "Silahlı Özel Güvenlik Görevlisi Olur" ibaresi bulunmalıdır.'
  },
  {
    id: 'yenileme-sinav-kalma',
    category: 'sinav',
    categoryLabel: 'Sınav & Süreç',
    icon: FileText,
    question: '5 yılda bir yapılan yenileme eğitiminde sınavda kalma veya baraj puanı riski var mı?',
    answer: '5188 Sayılı Kanun uyarınca yenileme eğitimine katılan personelin yazılı sınavda 60 baraj puanını geçme zorunluluğu yoktur. Temel kural, belirlenen 50 saatlik derslere devamsızlık yapmadan katılmak ve EGM sınav salonunda sınava fiziki olarak iştirak etmektir.',
    lawRef: '5188 Sayılı Kanun Yönetmeliği Madde 34',
    importantNote: 'Silahlı yenileme kursiyerlerinin poligondaki 5 fişek atış puanı sınav belgesine işlenir ancak kart iptaline yol açmaz.'
  },
  {
    id: 'kimlik-kart-valilik-sureci',
    category: 'ruhsat',
    categoryLabel: 'Ruhsat & Sertifika',
    icon: ShieldCheck,
    question: 'Sınavı geçtikten sonra Özel Güvenlik Kimlik Kartı ve Valilik onayı kaç günde çıkar?',
    answer: 'EGM sınav sonuçlarının açıklanmasını takiben kurs bitirme sertifikanız düzenlenir. Ardından e-Devlet üzerinden yapılan valilik güvenlik soruşturması ve arşiv araştırması süreci ortalama 20-30 iş günü sürer. Onay sonrası ruhsat harcı anlaşmalı bankaya yatırılarak kimlik kartı PTT Kargo ile doğrudan adresinize teslim edilir.',
    lawRef: '7315 Sayılı Güvenlik Soruşturması ve Arşiv Araştırması Kanunu',
    importantNote: 'Alo Güvenlik danışmanlarımız tüm e-Devlet ve valilik evrak yükleme aşamalarında kursiyerlerimize ücretsiz rehberlik sağlar.'
  },
  {
    id: 'saglik-raporu-kriterleri',
    category: 'saglik',
    categoryLabel: 'Sağlık & Şartlar',
    icon: Stethoscope,
    question: 'Özel güvenlik sağlık kurulu heyet raporu hangi hastanelerden ve branşlardan alınır?',
    answer: 'Sağlık Bakanlığı tarafından yetkilendirilmiş tam teşekküllü devlet veya üniversite hastanelerinden alınmalıdır. Heyette Psikiyatri, Nöroloji, Göz Hastalıkları, KBB ve Ortopedi olmak üzere 5 ana branş uzman hekiminin onayı aranır.',
    lawRef: 'İçişleri Bakanlığı Sağlık Şartları Yönetmeliği',
    importantNote: 'Raporda silahsız adaylar için "Özel Güvenlik Görevlisi Olur", silahlı adaylar için "Silahlı Özel Güvenlik Görevlisi Olur" ibaresi açıkça yazılmalıdır.'
  },
  {
    id: 'arama-ve-mudahale-yetkisi',
    category: 'hukuk',
    categoryLabel: 'Hukuk & Yetki Sınırı',
    icon: AlertTriangle,
    question: 'Özel güvenlik görevlisi hangi durumlarda üst ve çanta araması yapabilir?',
    answer: '5188 Sayılı Kanunun 7. maddesi uyarınca güvenlik görevlileri görev alanında metal detektörü, x-ray cihazı ve turnike sistemleri üzerinden tarama yapabilir. Elle fiziki üst araması kural olarak yapılamaz; sadece spor müsabakaları, hava meydanları gibi özel mevzuatı olan yerlerde veya suçüstü halinde genel kolluk gelene kadar önleyici tedbir kapsamında icra edilebilir.',
    lawRef: '5188 Sayılı Kanun Madde 7/a, 7/b, 7/g',
    importantNote: 'Elde edilen şüpheli suç aletleri derhal tutanakla genel kolluğa (Polis/Jandarma) teslim edilmek zorundadır.'
  },
  {
    id: 'sinav-hakki-ve-tekrar',
    category: 'sinav',
    categoryLabel: 'Sınav & Süreç',
    icon: FileText,
    question: 'EGM yazılı veya atış sınavından başarısız olursam ne olur, kaç sınav hakkım var?',
    answer: 'Eğitimini başarıyla tamamlayan her adayın birbirini takip eden 4 sınava girme hakkı mevcuttur. İlk sınavda baraj puanını geçemeyen kursiyer, eğitimi sıfırdan yeniden almak zorunda kalmaz. Yalnızca EGM sınav giriş harcını yatırarak bir sonraki dönem sınavına doğrudan katılabilir.',
    lawRef: 'Özel Güvenlik Denetleme Başkanlığı Sınav Talimatı',
    importantNote: '4 sınav hakkında da başarılı olamayan adayların kurs eğitimini kanunen baştan tekrar etmesi gerekir.'
  }
];

export default function AcademyFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>('silahsiz-silahli-gecis');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredItems = activeFilter === 'all' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter((item) => item.category === activeFilter);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/30 border-t border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold mb-3">
            <HelpCircle className="w-4 h-4 text-blue-500" />
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
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 font-semibold'
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
                    ? 'bg-white dark:bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
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
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-0.5">
                        {item.categoryLabel}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {item.question}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' : 'text-slate-400'
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
                      <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 mb-3 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
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
            0850 308 34 88 numaralı hattımızdan Alo Güvenlik eğitim koordinatörlerimize anında ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
