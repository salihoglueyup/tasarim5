"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AcademyHeroSeo from '@/components/seo/academy/AcademyHeroSeo';
import AcademyAiOverviewSeo from '@/components/seo/ai-overviews/AcademyAiOverviewSeo';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import SecurityScenarioQuiz from '@/components/academy/SecurityScenarioQuiz';
import AcademyEnrollmentModal from '@/components/academy/AcademyEnrollmentModal';
import AcademyFaqAccordion, { ACADEMY_FAQ_ITEMS } from '@/components/academy/AcademyFaqAccordion';
import QuoteCtaButton from '@/components/ui/widgets/QuoteCtaButton';

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
        <AcademyAiOverviewSeo extraFaqs={ACADEMY_FAQ_ITEMS} />
      </div>

      {/* 3. Eğitim ve kimlik süreci: ayrıntılar (süre, ücret, sınav tarihi) kurs kurumu ve resmî duyurulara bırakılır */}
      <section className="py-12 md:py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-8 md:p-10 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">Eğitim ve kimlik süreci hakkında</h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light leading-relaxed max-w-3xl">
            Özel güvenlik görevlisi olmak için 5188 sayılı Kanun kapsamında yetkili bir eğitim kurumunda temel eğitimin tamamlanması,
            sınav ve Valilik başvuru süreçleri gerekir. Eğitim süresi, ücret, sınav tarihi, sağlık raporu ve harç gibi ayrıntılar
            zamanla değişebilir; bu nedenle güncel bilgi için eğitim kurumunun ve Emniyet Genel Müdürlüğü ile ilgili Valilik birimlerinin
            duyurularını esas alın.
          </p>
          <a
            href="https://www.guvenlikkursu.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start text-sm font-bold text-[var(--color-primary)] underline underline-offset-4 hover:opacity-80"
          >
            Eğitim kurumu: guvenlikkursu.com
          </a>
        </div>
      </section>

      {/* 7. Interactive Real-Life Scenario Simulator */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] py-12 md:py-16 w-full">
        <SecurityScenarioQuiz onEnrollClick={handleOpenEnrollment} />
      </div>

      {/* 9. Corporate Security Staffing Bridge (CRO Banner) */}
      <section className="py-12 md:py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] rounded-[2.5rem] p-8 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex flex-col gap-4 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest bg-rose-500/10 px-4 py-1.5 rounded-full w-fit mx-auto md:mx-0 border border-rose-500/20">
              Site ve Tesis Güvenliği
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-[var(--color-primary)]">
              Siteniz veya Tesisiniz İçin Özel Güvenlik Hizmeti mi Arıyorsunuz?
            </h2>
            <p className="text-[var(--color-secondary)] text-sm md:text-base font-light leading-relaxed">
              Alo Yönetim, site ve tesisler için 5188 sayılı Kanun çerçevesinde özel güvenlik hizmetinin planlanması ve koordinasyonunda destek verir. Ücretsiz keşif için teklif isteyebilirsiniz.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <QuoteCtaButton className="bg-[var(--color-primary)] text-[var(--color-surface)] font-bold py-3.5 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-md text-center">
              Güvenlik Teklifi Al
            </QuoteCtaButton>
            <Link
              href="/istihdam-koprusu"
              className="border border-[var(--color-outline)]/60 text-[var(--color-primary)] bg-[var(--color-surface-variant)] font-bold py-3 px-6 rounded-xl hover:bg-slate-200/60 dark:hover:bg-[var(--color-outline)] transition-colors text-center text-sm"
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
              slug: "cctv-kamera-guvenlik-sistemi",
              term: "CCTV & Kamera İzleme Protokolü",
              summary: "Ortak alanların kamera sistemleriyle izlenmesine ilişkin kayıt ve kişisel veri ilkeleridir."
            },
            {
              slug: "plaka-tanima-sistemi-pts",
              term: "Plaka Tanıma & Turnike Otomasyonu",
              summary: "Site giriş kapılarında araç giriş-çıkışlarının plaka okuma ile kaydedildiği sistemdir."
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
