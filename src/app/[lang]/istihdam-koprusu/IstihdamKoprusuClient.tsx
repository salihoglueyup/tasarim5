"use client";

import React, { useState } from 'react';
import CareerHeroSeo from '@/components/seo/career/CareerHeroSeo';
import CareerAiOverviewSeo from '@/components/seo/ai-overviews/CareerAiOverviewSeo';
import CareerValuePillarsSeo from '@/components/seo/career/CareerDualProtectionSeo';
import CareerDisciplinesGridSeo from '@/components/seo/career/CareerDisciplinesGridSeo';
import CareerRecruitmentStepsSeo from '@/components/seo/career/CareerRecruitmentStepsSeo';
import CareerLegalGuaranteeDeepDiveSeo from '@/components/seo/career/CareerLegalGuaranteeDeepDiveSeo';
import CareerApplicationDualFormSeo from '@/components/seo/career/CareerApplicationDualFormSeo';
import CareerFaqSeo from '@/components/seo/career/CareerFaqSeo';
import CareerCtaBannerSeo from '@/components/seo/career/CareerCtaBannerSeo';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import TrOnly from '@/components/seo/TrOnly';

// Meslek alanı -> başvuru formundaki pozisyon değeri (formda Türkçe iç değerler kullanılır)
const ROLE_BY_DISCIPLINE: Record<string, string> = {
  guvenlik: '5188 Kimlikli Özel Güvenlik',
  temizlik: 'Kat ve Ortak Alan Hijyen Görevlisi',
  teknik: 'Elektromekanik Tesis Bakım Teknisyeni',
  concierge: 'Lobi Resepsiyon & Misafir Karşılama Uzmanı',
};

export default function IstihdamKoprusuClient({ lang = 'tr' }: { lang?: string }) {
  const [selectedRole, setSelectedRole] = useState<string>('5188 Kimlikli Özel Güvenlik');

  const handleSelectCategory = (id: string) => {
    setSelectedRole(ROLE_BY_DISCIPLINE[id] ?? 'Genel Başvuru');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <CareerHeroSeo lang={lang} />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] -mt-6 sm:-mt-8 mb-6 relative z-20 w-full">
        <CareerAiOverviewSeo lang={lang} />
      </div>

      <CareerValuePillarsSeo />

      <CareerDisciplinesGridSeo onSelectCategory={handleSelectCategory} />

      <CareerRecruitmentStepsSeo />

      <CareerLegalGuaranteeDeepDiveSeo />

      <CareerApplicationDualFormSeo selectedRole={selectedRole} />

      <CareerFaqSeo />

      <CareerCtaBannerSeo />

      {/* E-E-A-T Mevzuat & Otorite Merkezi: içerik Türkçedir, diğer dillerde gizlenir */}
      <TrOnly>
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
                description: "Site ve tesislerde görevli güvenlik, temizlik ve teknik personelin vardiya saatleri, fazla mesai, kıdem ve ihbar tazminatı hakları."
              },
              {
                title: "6331 Sayılı İş Sağlığı ve Güvenliği Kanunu (İSG)",
                sourceName: "T.C. Çalışma ve Sosyal Güvenlik Bakanlığı",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6331&MevzuatTur=1&MevzuatTertip=5",
                badge: "6331 İSG",
                description: "Yüksekte çalışma, elektrik pano bakımı, kazan dairesi ve havuz kimyasalları yönetiminde iş güvenliği eğitimleri ve KKD gereklilikleri."
              },
              {
                title: "Türkiye İş Kurumu (İŞKUR)",
                sourceName: "T.C. İŞKUR Genel Müdürlüğü",
                url: "https://www.iskur.gov.tr",
                badge: "İŞKUR",
                description: "İş arayanlar ve işverenler için resmi istihdam hizmetleri ve mesleki eğitim programları."
              }
            ]}
            glossaryTerms={[
              {
                slug: "5188-sayili-kanun",
                term: "5188 Sayılı Özel Güvenlik Kanunu",
                summary: "Özel güvenlik kimlik kartı alma koşulları, adli sicil şartları ve yenileme eğitimlerini düzenler."
              },
              {
                slug: "ozel-guvenlik-izni-ogi",
                term: "Özel Güvenlik İzni (ÖGİ)",
                summary: "Özel güvenlik hizmeti verebilmek için gereken yetkili makam izni."
              },
              {
                slug: "kat-mulkiyeti-kanunu-kmk",
                term: "KMK ve Tesis Personeli",
                summary: "Site personelinin istihdamı ve kat malikleri kuruluyla ilişkisine dair temel çerçeve."
              },
              {
                slug: "bina-otomasyon-sistemi-bms",
                term: "Teknik Personel & BMS Operatörlüğü",
                summary: "Plaza ve rezidanslarda jeneratör, trafo, hidrofor ve iklimlendirme sistemlerini yöneten teknisyenlik alanı."
              }
            ]}
          />
        </section>
      </TrOnly>
    </div>
  );
}
