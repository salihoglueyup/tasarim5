"use client";

import React, { useState } from 'react';
import {
  CareerHeroSeo,
  CareerAiOverviewSeo,
  CareerValuePillarsSeo,
  CareerDisciplinesGridSeo,
  CareerOpenPositionsSeo,
  CareerRecruitmentStepsSeo,
  CareerLegalGuaranteeDeepDiveSeo,
  CareerApplicationDualFormSeo,
  CareerFaqSeo,
  CareerCtaBannerSeo,
  ServiceAuthorityHubSeo,
} from '@/components/seo';

export default function IstihdamKoprusuClient({ lang = 'tr' }: { lang?: string }) {
  const [selectedRole, setSelectedRole] = useState<string>('5188 Kimlikli Özel Güvenlik');

  const handleSelectJob = (jobTitle: string) => {
    setSelectedRole(jobTitle);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      {/* 1. Hero Section */}
      <CareerHeroSeo lang={lang} />

      {/* 2. Google AI Overviews & Grounding Snippet */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] -mt-6 sm:-mt-8 mb-6 relative z-20 w-full">
        <CareerAiOverviewSeo lang={lang} />
      </div>

      {/* 3. Value Pillars (6 Trust Pillars) */}
      <CareerValuePillarsSeo />

      {/* 3. Core Disciplines Grid */}
      <CareerDisciplinesGridSeo />

      {/* 4. Active Job Postings with Google Jobs Schema */}
      <CareerOpenPositionsSeo onSelectJob={handleSelectJob} />

      {/* 5. 5-Step Recruitment & Security Vetting */}
      <CareerRecruitmentStepsSeo />

      {/* 6. Legal Guarantee & Severance Fund Deep Dive */}
      <CareerLegalGuaranteeDeepDiveSeo />

      {/* 7. Interactive Dual Application & Staffing Request Form */}
      <CareerApplicationDualFormSeo selectedRole={selectedRole} />

      {/* 8. Frequently Asked Questions with FAQPage Schema */}
      <CareerFaqSeo />

      {/* 9. Dual Conversion Bottom CTA */}
      <CareerCtaBannerSeo />

      {/* 10. E-E-A-T Legislation & Authority Hub */}
      <section className="py-12 md:py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full">
        <ServiceAuthorityHubSeo
          serviceName="Tesis Yönetimi ve Güvenlik İstihdam Köprüsü"
          serviceCategory="Kariyer & İK Yönetimi"
          lawReferences={[
            {
              title: "4857 Sayılı İş Kanunu — Personel Özlük Hakları ve Çalışma Koşulları",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5",
              badge: "4857 İş Kanunu",
              description: "Site ve tesislerde görevli güvenlik, temizlik ve teknik personelin vardiya saatleri, fazla mesai, kıdem ve ihbar tazminatı yasal güvencesi."
            },
            {
              title: "6331 Sayılı İş Sağlığı ve Güvenliği Kanunu (İSG)",
              sourceName: "T.C. Çalışma ve Sosyal Güvenlik Bakanlığı",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6331&MevzuatTur=1&MevzuatTertip=5",
              badge: "6331 İSG",
              description: "Yüksekte çalışma, elektrik pano bakımı, kazan dairesi ve havuz kimyasalları yönetiminde zorunlu iş güvenliği eğitimleri ve KKD standartları."
            },
            {
              title: "Türkiye İş Kurumu (İŞKUR) Özel İstihdam ve Mesleki Eğitim Standartları",
              sourceName: "T.C. İŞKUR Genel Müdürlüğü",
              url: "https://www.iskur.gov.tr",
              badge: "İŞKUR Resmi",
              description: "Nitelikli tesis personeli istihdamı, mesleki yeterlilik kurumu (MYK) belgeleri ve staj/eğitim teşvik mekanizmaları."
            }
          ]}
          glossaryTerms={[
            {
              slug: "5188-sayili-kanun",
              term: "5188 Sayılı Güvenlik Personeli Kanunu",
              summary: "Özel güvenlik kimlik kartı alma koşulları, adli sicil şartları ve 5 yıllık yenileme eğitimleridir."
            },
            {
              slug: "ozel-guvenlik-izni-ogi",
              term: "Özel Güvenlik İzni (ÖGİ)",
              summary: "Tesislerde yasal güvenlik kadrosu istihdam edebilmek için Valilik Özel Güvenlik Komisyonu onayıdır."
            },
            {
              slug: "kat-mulkiyeti-kanunu-kmk",
              term: "KMK Tesis Personeli Yönetimi",
              summary: "Site kapıcısı, güvenlik ve temizlik personelinin kat malikleri kuruluna karşı hukuki sorumluluklarıdır."
            },
            {
              slug: "bina-otomasyon-sistemi-bms",
              term: "Teknik Personel & BMS Operatörlüğü",
              summary: "Plaza ve rezidanslarda jeneratör, trafo, hidrofor ve VRF sistemlerini yöneten sertifikalı teknisyenliktir."
            }
          ]}
        />
      </section>
    </div>
  );
}
