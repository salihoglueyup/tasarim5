"use client";

import React from 'react';

interface ExamPeriod {
  period: string;
  examDate: string;
  deadline: string;
  resultsDate: string;
  status: 'active' | 'upcoming' | 'planned';
  statusLabel: string;
}

const EXAMS: ExamPeriod[] = [
  {
    period: '111. Temel ve 87. Yenileme Sınavı',
    examDate: '18 Ekim 2026 Pazar (10:00)',
    deadline: '02 Ekim 2026 Mesai Bitimi',
    resultsDate: '06 Kasım 2026',
    status: 'active',
    statusLabel: 'Kayıtlar Devam Ediyor',
  },
  {
    period: '112. Temel ve 88. Yenileme Sınavı',
    examDate: '20 Aralık 2026 Pazar (10:00)',
    deadline: '04 Aralık 2026 Mesai Bitimi',
    resultsDate: '08 Ocak 2027',
    status: 'upcoming',
    statusLabel: 'Erken Kayıt İndirimi',
  },
  {
    period: '113. Temel ve 89. Yenileme Sınavı',
    examDate: '21 Şubat 2027 Pazar (10:00)',
    deadline: '05 Şubat 2027 Mesai Bitimi',
    resultsDate: '12 Mart 2027',
    status: 'planned',
    statusLabel: 'Ön Talep Alınıyor',
  },
];

interface AcademyExamScheduleSeoProps {
  onRegisterClick?: (courseName?: string) => void;
}

export default function AcademyExamScheduleSeo({ onRegisterClick }: AcademyExamScheduleSeoProps) {
  return (
    <section id="sinav-takvimi" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              calendar_month
            </span>
            <span>EGM Özel Güvenlik Denetleme Başkanlığı 2026 Takvimi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            2026 Yılı Özel Güvenlik Sınav ve Evrak Takvimi
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Emniyet Genel Müdürlüğü (EGM) ÖGNET sistemi üzerinden ilan edilen resmi sınav tarihleri ve kursiyer evrak teslim son günleri.
          </p>
        </div>

        {/* Exams Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {EXAMS.map((exam, idx) => {
            const isActive = exam.status === 'active';
            return (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 border ${
                  isActive
                    ? 'bg-[var(--color-surface)] border-red-500 shadow-md ring-1 ring-red-500/20'
                    : 'bg-[var(--color-surface-variant)]/40 border-[var(--color-outline)]/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 animate-pulse'
                          : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60'
                      }`}
                    >
                      {exam.statusLabel}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-secondary)]">
                      Dönem #{111 + idx}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">
                    {exam.period}
                  </h3>

                  <div className="space-y-3 text-xs mb-6">
                    <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
                      <div className="text-[11px] text-[var(--color-secondary)] font-medium mb-0.5">Sınav Tarihi & Saati</div>
                      <div className="text-sm font-bold text-[var(--color-primary)] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-red-500">event</span>
                        <span>{exam.examDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[var(--color-outline)]/40">
                      <span className="text-[var(--color-secondary)]">Son Evrak Teslim:</span>
                      <strong className="text-[var(--color-primary)]">{exam.deadline}</strong>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-[var(--color-secondary)]">Sonuç Açıklanma:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{exam.resultsDate}</strong>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRegisterClick && onRegisterClick(exam.period)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-md active:scale-95'
                      : 'bg-[var(--color-surface)] border border-[var(--color-outline)] text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">how_to_reg</span>
                  <span>Bu Döneme Kayıt Ol</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Scoring & Rules Summary Box */}
        <div className="bg-[var(--color-surface-variant)]/30 border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm mb-4">
            <span className="material-symbols-outlined text-lg text-red-500">rule</span>
            <span>EGM Sınav Puanı Hesaplama & Geçme Kuralları (2026 Mevzuatı)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--color-secondary)]">
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
              <strong className="block text-sm font-bold text-[var(--color-primary)] mb-1">
                Silahsız Adaylar (100 Soru)
              </strong>
              <p className="leading-relaxed">
                100 genel güvenlik sorusu sorulur. Her soru 1 puandır. Adayın sınavı geçebilmesi için en az 
                <strong> 60 puan (60 doğru)</strong> alması zorunludur. Yanlışlar doğruyu götürmez.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
              <strong className="block text-sm font-bold text-[var(--color-primary)] mb-1">
                Silahlı Adaylar (100 + 25 Soru & Atış)
              </strong>
              <p className="leading-relaxed">
                100 temel soru + 25 silah sorusu (tanesi 2 puan) ve poligonda 5 fişek atışı (her isabet 10 puan) yapılır.
                Genel ortalamanın ve silah puanının en az <strong>60 puan</strong> olması gereklidir.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
              <strong className="block text-sm font-bold text-[var(--color-primary)] mb-1">
                Yenileme Eğitimi Adayları
              </strong>
              <p className="leading-relaxed">
                5 yıllık kimlik kartını yenileyen personeller için sınavda <strong>puan barajı veya kalma riski yoktur</strong>.
                Eğitim süresince derslere ve atışa eksiksiz devam etmek kimliğin 5 yıl uzatılması için yeterlidir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
