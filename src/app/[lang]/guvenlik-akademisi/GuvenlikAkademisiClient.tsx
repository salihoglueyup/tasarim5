"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AcademyHeroSeo,
  AcademyAiOverviewSeo,
  AcademyCoursePackagesSeo,
  AcademyEligibilityWizardSeo,
  AcademyExamScheduleSeo,
  AcademyCostBreakdownSeo,
  ServiceAuthorityHubSeo,
} from '@/components/seo';
import {
  SecurityScenarioQuiz,
  AcademyEnrollmentModal,
  SecurityEquipmentShowcase,
  AcademyFaqAccordion,
} from '@/components/academy';
import { QuoteCtaButton } from '@/components';

interface GuvenlikAkademisiClientProps {
  lang?: string;
}

export default function GuvenlikAkademisiClient({ lang = 'tr' }: GuvenlikAkademisiClientProps) {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('5188 Temel Güvenlik Eğitimi (Silahlı / Silahsız)');

  const handleOpenEnrollment = (courseName?: string) => {
    if (courseName) {
      setSelectedCourse(courseName);
    }
    setIsEnrollmentOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      {/* 1. Hero Section (Alo Güvenlik Eğitim Kurumları & guvenlikkursu.com resmi partnerliği) */}
      <AcademyHeroSeo lang={lang} onOpenEnrollment={handleOpenEnrollment} />

      {/* 2. Google AI Overviews & 5188 Legal Grounding Snippet */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] -mt-6 sm:-mt-8 mb-6 relative z-20 w-full">
        <AcademyAiOverviewSeo />
      </div>

      {/* 3. 5 Core 5188 Course Packages Matrix */}
      <AcademyCoursePackagesSeo onSelectCourse={handleOpenEnrollment} />

      {/* 4. Interactive "Which Security Card Can I Get?" Eligibility Wizard */}
      <AcademyEligibilityWizardSeo onSelectCourse={handleOpenEnrollment} />

      {/* 5. 2026 EGM Security Exam Schedule & Countdown */}
      <AcademyExamScheduleSeo onRegisterClick={handleOpenEnrollment} />

      {/* 6. Medical Report & Official Fees Transparency Guide */}
      <AcademyCostBreakdownSeo />

      {/* 7. Interactive Real-Life Scenario Simulator */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] py-12 md:py-16 w-full">
        <SecurityScenarioQuiz onEnrollClick={handleOpenEnrollment} />
      </div>

      {/* 8. Modern Equipment & Field Hardware Showcase */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] py-8 md:py-12 w-full">
        <SecurityEquipmentShowcase />
      </div>

      {/* 9. Corporate Security Staffing Bridge (CRO Banner) */}
      <section className="py-12 md:py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] rounded-[2.5rem] p-8 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex flex-col gap-4 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest bg-red-500/10 px-4 py-1.5 rounded-full w-fit mx-auto md:mx-0 border border-red-500/20">
              5188 Lisanslı Güvenlik Kadrosu
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-[var(--color-primary)]">
              Siteniz veya Tesisiniz İçin Lisanslı Özel Güvenlik mi Arıyorsunuz?
            </h2>
            <p className="text-[var(--color-secondary)] text-sm md:text-base font-light leading-relaxed">
              Alo Yönetim güvencesiyle 5188 sertifikalı özel güvenlik personeli, 7/24 kamera ve devriye denetimi, 
              kıdem tazminatı bloke fon güvencesi. Tesisinize özel fizibilite teklifi 24 saat içinde hazır.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <QuoteCtaButton className="bg-[var(--color-primary)] text-[var(--color-surface)] font-bold py-3.5 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-md text-center">
              Güvenlik Teklifi Al
            </QuoteCtaButton>
            <Link
              href="/istihdam-koprusu"
              className="border border-[var(--color-outline)]/60 text-[var(--color-primary)] bg-[var(--color-surface-variant)] font-bold py-3 px-6 rounded-xl hover:bg-slate-200/60 dark:hover:bg-[#262938] transition-colors text-center text-sm"
            >
              İstihdam Köprüsü & Açık İlanlar
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions Accordion */}
      <AcademyFaqAccordion />

      {/* 11. E-E-A-T Legislation & Authority Hub */}
      <section className="py-12 md:py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full">
        <ServiceAuthorityHubSeo
          serviceName="Özel Güvenlik Akademisi ve Personel Eğitimi"
          serviceCategory="Eğitim & Güvenlik Akademisi"
          lawReferences={[
            {
              title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun — Madde 14",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
              badge: "5188 m.14",
              description: "Özel güvenlik temel eğitimi, 5 yılda bir zorunlu yenileme eğitimi ve valilik sınav/denetim kriterleri."
            },
            {
              title: "Emniyet Genel Müdürlüğü (EGM) ÖGNET Portal ve Denetim Mevzuatı",
              sourceName: "T.C. İçişleri Bakanlığı EGM",
              url: "https://www.egm.gov.tr/ozelguvenlik",
              badge: "EGM ÖGNET",
              description: "Özel güvenlik görevlilerinin atış, fiziki yeterlilik ve kimlik kartı yenileme resmi prosedürleri."
            },
            {
              title: "Binaların Yangından Korunması Hakkında Yönetmelik — Acil Eylem Eğitimi",
              sourceName: "T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=11736&MevzuatTur=7&MevzuatTertip=5",
              badge: "Yangın & Tahliye",
              description: "Tesislerde görevli güvenlik personelinin yangın söndürme, ilk yardım ve acil tahliye yönlendirme zorunlu eğitimleri."
            }
          ]}
          glossaryTerms={[
            {
              slug: "5188-sayili-kanun",
              term: "5188 Sayılı Özel Güvenlik Kanunu",
              summary: "Özel güvenlik personeli yetkilerini, kimlik alma koşullarını ve valilik izinlerini düzenleyen temel mevzuattır."
            },
            {
              slug: "ozel-guvenlik-izni-ogi",
              term: "Özel Güvenlik İzni (ÖGİ)",
              summary: "Site ve tesislerin bünyesinde güvenlik personeli bulundurabilmesi için Valilik Komisyonu'ndan alınan resmi onaydır."
            },
            {
              slug: "cctv-ve-kamera-guvenlik-sistemi",
              term: "CCTV & Kamera İzleme Protokolü",
              summary: "Ortak alanların 7/24 analitik kameralar ve hareket sensörleriyle kesintisiz izlenmesi standartlarıdır."
            },
            {
              slug: "plaka-tanima-sistemi-pts",
              term: "Plaka Tanıma & Turnike Otomasyonu",
              summary: "Site nizamiye kapılarında sakin ve misafir araç giriş-çıkışlarını yöneten akıllı bariyer sistemidir."
            }
          ]}
        />
      </section>

      {/* 12. Quick Enrollment Modal */}
      <AcademyEnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        defaultCourseName={selectedCourse}
      />
    </div>
  );
}
