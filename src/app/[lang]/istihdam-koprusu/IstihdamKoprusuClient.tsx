"use client";

import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import { PersonnelDifference, JobPostingSeo } from '@/components';
import { ServiceAuthorityHubSeo } from '@/components/seo';

export default function IstihdamKoprusuClient() {
  const { t } = useLanguage();

  return (
    <>
      <JobPostingSeo 
        title="Özel Güvenlik Görevlisi"
        description="Sitelerde ve tesislerde görevlendirilmek üzere kimlikli özel güvenlik görevlileri aranmaktadır."
        datePosted="2026-07-01"
        validThrough="2026-12-31"
        jobLocation={{
          addressLocality: "İstanbul",
          addressRegion: "İstanbul",
          addressCountry: "TR"
        }}
        baseSalary={{
          currency: "TRY",
          value: 35000,
          unitText: "MONTH"
        }}
      />
      
      <PageHeader 
        title={t('emp_page_title')} 
        description={t('emp_page_desc')} 
      />

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-16 rounded-[3rem] shadow-sm flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">{t('emp_sec_title')}</h2>
          <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">
            {t('emp_sec_desc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{t('emp_stat_1_val')}</div>
              <div className="text-xs text-gray-500 font-medium">{t('emp_stat_1_text')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-slate-600 mb-1">{t('emp_stat_2_val')}</div>
              <div className="text-xs text-gray-500 font-medium">{t('emp_stat_2_text')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-purple-600 mb-1">{t('emp_stat_3_val')}</div>
              <div className="text-xs text-gray-500 font-medium">{t('emp_stat_3_text')}</div>
            </div>
          </div>
        </div>
      </section>

      <PersonnelDifference />

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <section className="py-12 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
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
    </>
  );
}
