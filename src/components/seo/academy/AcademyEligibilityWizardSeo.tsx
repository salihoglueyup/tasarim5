"use client";

import React, { useState } from 'react';

interface AcademyEligibilityWizardSeoProps {
  onSelectCourse?: (courseName: string) => void;
}

export default function AcademyEligibilityWizardSeo({ onSelectCourse }: AcademyEligibilityWizardSeoProps) {
  const [ageGroup, setAgeGroup] = useState<'under21' | 'above21'>('above21');
  const [education, setEducation] = useState<'middle' | 'high' | 'university'>('high');
  const [status, setStatus] = useState<'new' | 'hasUnarmed' | 'renewal'>('new');

  // Decision logic
  let recommendation = {
    courseName: 'Silahlı Özel Güvenlik Temel Eğitimi (120 Saat)',
    badge: 'Silahlı Temel Uygun',
    badgeColor: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
    icon: 'verified',
    summary: 'Tebrikler! 21 yaşını doldurduğunuz ve en az lise mezunu olduğunuz için Silahlı Özel Güvenlik Temel Eğitimi alabilir, banka ve plazalarda yüksek maaşla çalışabilirsiniz.',
    details: '100 saat temel ders + 20 saat silah eğitimi ve kapalı poligonda 25 mermi gerçek atış eğitimi içerir.',
    healthNote: 'Devlet hastanesinden 5 branşlı "Silahlı Özel Güvenlik Olur" sağlık kurulu raporu almanız gerekmektedir.',
  };

  if (status === 'renewal') {
    recommendation = {
      courseName: ageGroup === 'above21' && education !== 'middle'
        ? 'Silahlı Özel Güvenlik Yenileme Eğitimi (60 Saat)'
        : 'Silahsız Özel Güvenlik Yenileme Eğitimi (50 Saat)',
      badge: '5 Yıllık Kimlik Yenileme',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
      icon: 'update',
      summary: 'Mevcut kimliğinizin 5 yıllık süresini uzatmak için Yenileme Eğitimi almanız gerekmektedir. Sınavda puan barajı yoktur; derse katılım yeterlidir.',
      details: 'Silahlı kartlar için 60 saat (atışlı), silahsız kartlar için 50 saat teorik tazeleme uygulanır.',
      healthNote: 'Yenileme eğitiminde genel olarak yeni sağlık raporu istenmez (istisnai durumlar hariç).',
    };
  } else if (status === 'hasUnarmed') {
    if (ageGroup === 'above21' && education !== 'middle') {
      recommendation = {
        courseName: 'Silahsızdan Silahlıya Geçiş (Fark Eğitimi)',
        badge: 'Hızlı Silahlı Terfi (20 Saat)',
        badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
        icon: 'upgrade',
        summary: 'Harika fırsat! Silahsız kimliğiniz olduğu için 100 saatlik temel derse yeniden girmeden sadece 20 saatlik Silah Farkı ve 25 atış ile silahlı kimliğe terfi edebilirsiniz.',
        details: 'Kısa sürede tamamlanır, EGM sınavında yalnızca 25 silah sorusu ve 5 atıştan sorumlu olursunuz.',
        healthNote: 'Devlet hastanesinden "Silahlı Özel Güvenlik Olur" sağlık raporu alınması şarttır.',
      };
    } else {
      recommendation = {
        courseName: 'Silahsız Özel Güvenlik Yenileme Eğitimi (50 Saat)',
        badge: 'Silahsız Statü Devamı',
        badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
        icon: 'info',
        summary: 'Silahlı kimliğe geçebilmek için 21 yaşını doldurmuş ve en az lise mezunu olmanız gerekir. Şartlar oluşana dek silahsız kimliğinizi yenileyerek çalışmaya devam edebilirsiniz.',
        details: '50 saatlik ders katılımı ile silahsız kimliğiniz 5 yıl daha geçerli olur.',
        healthNote: 'Yeni sağlık raporuna gerek bulunmamaktadır.',
      };
    }
  } else {
    // New enrollment
    if (ageGroup === 'under21' || education === 'middle') {
      recommendation = {
        courseName: 'Silahsız Özel Güvenlik Temel Eğitimi (100 Saat)',
        badge: 'Silahsız Temel Uygun',
        badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
        icon: 'check_circle',
        summary: '18 yaşını doldurduğunuz ve en az ortaokul mezunu olduğunuz için Silahsız Özel Güvenlik Temel Eğitimi alabilirsiniz. Rezidans, site ve AVM projelerinde hemen işe başlayabilirsiniz.',
        details: '100 saatlik temel mevzuat, ilk yardım, yangın ve iletişim eğitimlerini içerir; poligon atışı yoktur.',
        healthNote: 'Devlet hastanesinden "Silahsız Özel Güvenlik Olur" heyet raporu almanız yeterlidir.',
      };
    }
  }

  return (
    <section id="uygunluk-sihirbazi" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              psychology_alt
            </span>
            <span>2 Dakikada 5188 Uygunluk Testi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Hangi Özel Güvenlik Kartını Alabilirsiniz?
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Yaş ve eğitim durumunuza göre 5188 sayılı kanun kriterlerini test edin; en avantajlı kursu anında belirleyip ön kayıt yaptırın.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="max-w-4xl mx-auto bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Question 1: Yaş */}
            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <label className="block text-xs font-bold text-[var(--color-primary)] mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[var(--color-primary)]">cake</span>
                <span>1. Yaşınız Kaç?</span>
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setAgeGroup('under21')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    ageGroup === 'under21'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  18 — 20 Yaş Arasındayım
                </button>
                <button
                  type="button"
                  onClick={() => setAgeGroup('above21')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    ageGroup === 'above21'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  21 Yaş veya Üzerindeyim
                </button>
              </div>
            </div>

            {/* Question 2: Mezuniyet */}
            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <label className="block text-xs font-bold text-[var(--color-primary)] mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[var(--color-primary)]">school</span>
                <span>2. Öğrenim Durumunuz?</span>
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setEducation('middle')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    education === 'middle'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  Ortaokul / İlköğretim
                </button>
                <button
                  type="button"
                  onClick={() => setEducation('high')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    education === 'high'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  Lise veya Dengi Okul
                </button>
                <button
                  type="button"
                  onClick={() => setEducation('university')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    education === 'university'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  Ön Lisans / Lisans
                </button>
              </div>
            </div>

            {/* Question 3: Mevcut Durum */}
            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <label className="block text-xs font-bold text-[var(--color-primary)] mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[var(--color-primary)]">badge</span>
                <span>3. Mevcut Kimlik Kartınız Var mı?</span>
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setStatus('new')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    status === 'new'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  Hayır, İlk Kez Alacağım
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('hasUnarmed')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    status === 'hasUnarmed'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  Silahsız Kimliğim Var (Silahlıya Geçiş)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('renewal')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                    status === 'renewal'
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                  }`}
                >
                  5 Yıllık Sürem Doldu (Yenileme)
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Result Box */}
          <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[var(--color-outline)]/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{recommendation.icon}</span>
                </div>
                <div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${recommendation.badgeColor}`}>
                    {recommendation.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mt-1">
                    {recommendation.courseName}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectCourse && onSelectCourse(recommendation.courseName)}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <span className="material-symbols-outlined text-base">how_to_reg</span>
                <span>Bu Eğitime Ön Kayıt Ol</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4">
              {recommendation.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)] flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[var(--color-primary)] mt-0.5">schedule</span>
                <span>{recommendation.details}</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)] flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-rose-600 dark:text-rose-400 mt-0.5">local_hospital</span>
                <span>{recommendation.healthNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
