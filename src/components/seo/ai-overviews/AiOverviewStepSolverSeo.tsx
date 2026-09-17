"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';

export interface StepSolverItem {
  id: string;
  title: string;
  badge: string;
  duration: string;
  legalRef: string;
  authority: string;
  summary: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    criticalNotice?: string;
  }[];
}

const STEP_SOLVERS: StepSolverItem[] = [
  {
    id: 'yonetici-degistirme',
    title: 'KMK 34: Görevini Yapmayan Site Yöneticisinin Değiştirilmesi',
    badge: 'Yönetici Azli & Seçimi',
    duration: '15 - 20 Gün',
    legalRef: '634 Sayılı KMK Madde 34 & 35',
    authority: 'Sulh Hukuk Mahkemesi & Kat Malikleri Kurulu',
    summary: 'Yöneticinin hesap vermemesi, bütçe açığı veya ihmali durumunda hem sayı hem arsa payı çoğunluğuyla (%50+1) hukuki olarak azledilip yeni yönetici atanma protokolü.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bağımsız Bölüm Maliklerinin 1/3 İmzası ile Çağrı',
        description: 'Tüm kat maliklerinin en az üçte birinin (1/3) yazılı imzasıyla mevcut yöneticiye ve denetçiye olağanüstü genel kurul gündemi sunulur.',
        criticalNotice: 'Yönetici çağrıyı yapmaktan kaçınırsa denetçi veya çağrıyı yapan malikler toplantıyı doğrudan organize edebilir.',
      },
      {
        stepNumber: 2,
        title: 'Toplantı Çağrısının 15 Gün Önceden Tebliği',
        description: 'Toplantı tarihi, saati, yeri ve azil/yeni seçim gündemi tüm maliklere toplantıdan en az 15 gün önce imza karşılığı veya taahhütlü mektupla tebliğ edilir.',
        criticalNotice: '15 günlük yasal tebligat süresine uyulmazsa alınan kararlar Sulh Hukuk Mahkemesi tarafından usulden iptal edilir.',
      },
      {
        stepNumber: 3,
        title: 'Hem Sayı Hem Arsa Payı Çift Çoğunluğu (%50+1)',
        description: 'Genel kurulda yönetici seçimi veya profesyonel yönetim şirketi ataması için tüm bağımsız bölüm maliklerinin hem kişi sayısı hem de arsa payı bakımından salt çoğunluğu aranır.',
        criticalNotice: 'Toplantıya katılanların değil, tüm binanın tam salt çoğunluğu şarttır (KMK m.34/4).',
      },
      {
        stepNumber: 4,
        title: 'Noter Onaylı Karar ve Banka Yetki Devri',
        description: 'Divan tutanağı noter onaylı karar defterine yapıştırılır. Yeni yönetici vergi dairesinden potansiyel vergi numarası/yönetici yetki belgesi alarak banka hesaplarını devralır.',
      },
    ],
  },
  {
    id: 'isletme-projesi-itiraz',
    title: 'KMK 37: Fahiş Aidat ve İşletme Projesine 7 Günlük Yasal İtiraz',
    badge: 'Bütçe & Aidat Denetimi',
    duration: '7 Günlük Hak Düşürücü Süre',
    legalRef: '634 Sayılı KMK Madde 37 & İİK Madde 68',
    authority: 'Kat Malikleri Kurulu & Sulh Hukuk Mahkemesi',
    summary: 'Yönetici tarafından hazırlanan tahmini işletme projesine karşı yasal itiraz süreci ve projenin kesinleşmesi mekanizması.',
    steps: [
      {
        stepNumber: 1,
        title: 'İşletme Projesinin İmzalı / Taahhütlü Tebliği',
        description: 'Yönetici, yıllık tahmini giderleri ve bağımsız bölüm başına düşen aidat tutarını gösteren bütçeyi kat maliklerine veya fiilen oturanlara imza karşılığı ya da iadeli taahhütlü mektupla tebliğ eder.',
      },
      {
        stepNumber: 2,
        title: 'Tebliğden İtibaren 7 Gün İçinde Yazılı İtiraz',
        description: 'Gider kalemlerini fahiş veya mevzuata aykırı bulan malikler, tebliğ tarihinden itibaren 7 gün içinde yöneticiye gerekçeli yazılı itiraz dilekçesi sunar.',
        criticalNotice: '7 günlük sürenin geçirilmesi halinde işletme projesi kesinleşir ve İİK m.68 uyarınca resmi belge hükmü kazanır.',
      },
      {
        stepNumber: 3,
        title: 'Kat Malikleri Kurulunun İtirazı Değerlendirmesi',
        description: 'İtiraz yapılması halinde işletme projesi Kat Malikleri Kurulu tarafından incelenir ve bütçe hakkında kurul tarafından nihai karar verilir.',
      },
      {
        stepNumber: 4,
        title: 'Sulh Hukuk Mahkemesinde Hakimin Müdahalesi (KMK 33)',
        description: 'Kurul kararı da hukuka veya yönetim planına aykırıysa, karara aykırı oy kullanan malik 1 ay içinde Sulh Hukuk Mahkemesi nezdinde dava açabilir.',
      },
    ],
  },
  {
    id: 'asansor-yesil-etiket',
    title: 'Kırmızı Etiketli Asansörü 60 Günde Yeşil Etikete Çevirme',
    badge: 'Teknik Güvenlik & Muayene',
    duration: 'Maksimum 60 Gün',
    legalRef: 'Asansör İşletme ve Bakım Yönetmeliği Madde 15',
    authority: 'T.C. Sanayi ve Teknoloji Bakanlığı & Akredite A Tipi Muayene',
    summary: 'Kırmızı etiket (güvensiz) iliştirilen asansörlerin mühürlenmeden ve cezai sorumluluk doğmadan yeşil etikete (kusursuz) dönüştürülme adımları.',
    steps: [
      {
        stepNumber: 1,
        title: 'Kırmızı Etiket Tespiti ve Kullanımın Derhal Durdurulması',
        description: 'A Tipi muayene kuruluşu (TSE/MMO) tarafından kırmızı etiket vurulduğunda yönetici asansörü şalterden kapatarak ikaz şeridiyle mühürler.',
        criticalNotice: 'Kırmızı etiketli asansörü çalıştırmak TCK m.85 uyarınca yöneticinin doğrudan şahsi hapis sorumluluğudur.',
      },
      {
        stepNumber: 2,
        title: 'Yetkili Asansör Firmasından Revizyon Teklifi Alınması',
        description: 'HYB (Hizmet Yeterlilik Belgesi) ve CE belgeli yetkili asansör bakım firmasından rapordaki kırmızı kalemleri içeren revizyon teknik şartnamesi alınır.',
      },
      {
        stepNumber: 3,
        title: 'Güvenlik Aksamlarının Yenilenmesi ve Montajı',
        description: 'Paraşüt fren sistemi, hız regülatörü, kuyu alt/üst sınır şalterleri ve acil kurtarma aküsü standartlara uygun olarak monte edilir.',
      },
      {
        stepNumber: 4,
        title: '60 Günlük Yasal Takip Muayenesi ve Yeşil Etiket Onayı',
        description: 'Belediyenin yetkilendirdiği A Tipi muayene kuruluşu çağrılarak takip muayenesi yaptırılır. Testleri geçen asansöre yeşil etiket barkodu iliştirilir.',
      },
    ],
  },
  {
    id: 'aidat-icra-takibi',
    title: 'Aidat Ödemeyen Bağımsız Bölüme İlamsız İcra Takibi (İİK 68)',
    badge: 'İcra & Tahsilat Disiplini',
    duration: '7 - 10 Gün',
    legalRef: 'KMK Madde 20 & İcra ve İflas Kanunu Madde 68',
    authority: 'İcra Müdürlükleri & Sulh Hukuk Mahkemeleri',
    summary: 'Gününde ödenmeyen aidat ve avans borçları için noter ihtarı gerekmeksizin aylık %5 kanuni gecikme tazminatıyla doğrudan ilamsız icra takibi süreci.',
    steps: [
      {
        stepNumber: 1,
        title: 'Kesinleşmiş İşletme Projesi ve Cari Hesap Özeti',
        description: 'Kat malikine tebliğ edilmiş kesinleşmiş işletme projesi, kat malikleri kurulu karar defteri fotokopisi ve gecikmiş aidat ekstresi hazırlanır.',
      },
      {
        stepNumber: 2,
        title: 'Noter İhtarı Şartı Olmadan İcra Talebi Açılışı',
        description: 'KMK m.20 gereğince borcun ödenmesi muayyen güne bağlı olduğundan borçluya noterden ihtarname çekilmesi zorunlu değildir; doğrudan ilamsız icra takibi (Örnek No: 7) başlatılır.',
      },
      {
        stepNumber: 3,
        title: 'Aylık %5 Yasal Gecikme Tazminatının İşletilmesi',
        description: 'KMK m.20/2 uyarınca gecikilen her ay için yasal faizden bağımsız aylık %5 kanuni gecikme tazminatı hesaplanarak icra takip talebine yazılır.',
        criticalNotice: 'Yargıtay yerleşik içtihatlarına göre aylık %5 gecikme tazminatı kamu düzenindendir ve hakim tarafından resen uygulanır.',
      },
      {
        stepNumber: 4,
        title: '7 Günlük Ödeme Emri Tebliği ve Haciz Aşaması',
        description: 'Borçluya ödeme emri tebliğ edilir. 7 gün içinde itiraz edilmezse takip kesinleşir; taşınmaz, banka mevduatı ve araç haczi uygulanır.',
      },
    ],
  },
];

export default function AiOverviewStepSolverSeo() {
  const [activeId, setActiveId] = useState<string>(STEP_SOLVERS[0].id);
  const [copied, setCopied] = useState(false);

  const activeSolver = STEP_SOLVERS.find((s) => s.id === activeId) || STEP_SOLVERS[0];

  const handleCopyChecklist = () => {
    const text = `${activeSolver.title}\nYasal Dayanak: ${activeSolver.legalRef}\nYetkili Makam: ${activeSolver.authority}\n\nAdımlar:\n${activeSolver.steps
      .map((s) => `${s.stepNumber}. ${s.title}: ${s.description}${s.criticalNotice ? ` (DİKKAT: ${s.criticalNotice})` : ''}`)
      .join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Schema.org HowTo Structured Data for AI Overviews
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: activeSolver.title,
    description: activeSolver.summary,
    totalTime: 'P20D',
    step: activeSolver.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.stepNumber,
      name: s.title,
      text: `${s.description} ${s.criticalNotice ? `[Kritik Uyarı: ${s.criticalNotice}]` : ''}`,
      url: `${BASE_URL}/hizmetler/tesis-yonetimi/rehber#${activeSolver.id}`,
    })),
  };

  return (
    <section id="ai-step-solver" className="my-16 bg-[var(--color-surface)] border border-blue-500/30 rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden">
      {/* Schema.org HowTo Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-400/10 border border-blue-600/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">schema</span>
            Google AI Overviews Adım Adım Problem Çözücü (HowTo)
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Kat Mülkiyeti ve Tesis Yönetiminde <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">4 Kritik Hukuki Süreç</span>
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            Yapay zeka arama motorlarının aradığı yasal süreler, yetkili adli merciler ve adım adım çözülmüş operasyonel protokoller.
          </p>
        </div>

        <button
          onClick={handleCopyChecklist}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs shrink-0 cursor-pointer"
          title="Tüm Kontrol Listesini Kopyala"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {copied ? 'done_all' : 'content_copy'}
          </span>
          <span>{copied ? 'Kopyalandı!' : 'Protokolü Kopyala'}</span>
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-8 relative z-10">
        {STEP_SOLVERS.map((item) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`text-left p-4 rounded-2xl border transition-all text-xs flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                  : 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)]/60 hover:border-blue-400 text-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                }`}>
                  {item.badge}
                </span>
                <span className={`text-[11px] font-mono ${isSelected ? 'text-blue-100' : 'text-[var(--color-secondary)]'}`}>
                  {item.duration}
                </span>
              </div>
              <div className="font-bold text-xs leading-snug line-clamp-2">
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Process Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSolver.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 border border-blue-500/20 rounded-3xl p-6 sm:p-8 relative z-10 space-y-6"
        >
          {/* Metadata Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-xs">
            <div>
              <span className="text-[var(--color-secondary)] block">Yasal Dayanak & Kanun:</span>
              <strong className="text-[var(--color-primary)] font-bold">{activeSolver.legalRef}</strong>
            </div>
            <div>
              <span className="text-[var(--color-secondary)] block">Yetkili Yargı / Merci:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold">{activeSolver.authority}</strong>
            </div>
            <div>
              <span className="text-[var(--color-secondary)] block">Ortalama Çözüm Süresi:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{activeSolver.duration}</strong>
            </div>
          </div>

          {/* Step-by-Step List */}
          <div className="space-y-4">
            {activeSolver.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-blue-400/50 transition-colors shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-xs">
                  {step.stepNumber}
                </div>
                <div className="space-y-1.5 flex-1 text-xs sm:text-sm">
                  <h4 className="font-extrabold text-[var(--color-primary)] text-sm sm:text-base">
                    {step.title}
                  </h4>
                  <p className="text-[var(--color-secondary)] leading-relaxed font-normal">
                    {step.description}
                  </p>
                  {step.criticalNotice && (
                    <div className="mt-2 inline-flex items-center gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold">
                      <span className="material-symbols-outlined text-base text-amber-600" aria-hidden="true">warning</span>
                      <span>Kritik Yasal Not: {step.criticalNotice}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
