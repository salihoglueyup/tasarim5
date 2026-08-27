"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { EventSeo, ServiceAuthorityHubSeo } from '@/components/seo';
import EmergencyPreparednessAuditSeo from '@/components/seo/EmergencyPreparednessAuditSeo';

export default function GuvenlikAkademisiClient() {
  const { t } = useLanguage();

  const academyFeatures = [
    {
      title: t('aca_feat_1_title'),
      desc: t('aca_feat_1_desc'),
      icon: "gavel",
      duration: t('aca_feat_1_dur'),
      color: "from-slate-900 to-slate-700 dark:from-white dark:to-slate-300"
    },
    {
      title: t('aca_feat_2_title'),
      desc: t('aca_feat_2_desc'),
      icon: "local_fire_department",
      duration: t('aca_feat_2_dur'),
      color: "from-red-500 to-rose-600"
    },
    {
      title: t('aca_feat_3_title'),
      desc: t('aca_feat_3_desc'),
      icon: "psychology",
      duration: t('aca_feat_3_dur'),
      color: "from-slate-500 to-slate-600"
    },
    {
      title: t('aca_feat_4_title'),
      desc: t('aca_feat_4_desc'),
      icon: "forum",
      duration: t('aca_feat_4_dur'),
      color: "from-amber-500 to-orange-600"
    }
  ];

  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <>
      <PageHeader 
        title={t('aca_page_title')} 
        description={t('aca_page_desc')} 
      />

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Intro Teaser */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-10 md:p-14 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
           <div className="flex flex-col gap-5 max-w-2xl relative z-10">
             <span className="text-xs font-bold text-slate-300 uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full w-fit border border-white/20">
               {t('aca_intro_tag')}
             </span>
             <h2 className="text-3xl md:text-5xl font-extrabold leading-tight" dangerouslySetInnerHTML={{ __html: t('aca_intro_title') }} />
             <p className="text-slate-300 font-light leading-relaxed max-w-xl">
               {t('aca_intro_desc')}
             </p>
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center shrink-0 w-48 relative z-10">
             <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 dark:from-white dark:to-slate-300">{t('aca_intro_badge_val')}</div>
             <div className="text-xs text-slate-400 mt-2 font-medium">{t('aca_intro_badge_text')}</div>
           </div>
        </div>

        {/* Yaklaşan Eğitimler (EventSeo) */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-10">
             <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">Yaklaşan Eğitimler</h2>
             <p className="text-sm text-[var(--color-secondary)] font-light mt-4">Sınırlı kontenjanlı akademi eğitimlerimize hemen başvurun.</p>
          </div>
          <div className="flex flex-col gap-6">
            <EventSeo 
              name="5188 Sayılı Kanun Kapsamında Temel Güvenlik Eğitimi"
              description="Özel güvenlik görevlilerine yönelik zorunlu temel eğitim ve yenileme programı. Sınav hazırlık ve silahlı/silahsız eğitimler."
              startDate="2026-09-01T09:00:00+03:00"
              endDate="2026-09-15T18:00:00+03:00"
              locationName="Alo Güvenlik Kurs Merkezi"
              offersUrl="https://www.guvenlikkursu.com/"
            />
            <EventSeo 
              name="Site Yöneticiliği ve Kriz Yönetimi Semineri"
              description="Profesyonel site yöneticileri için sakinlerle iletişim, halkla ilişkiler ve stres yönetimi eğitim semineri."
              startDate="2026-10-10T10:00:00+03:00"
              endDate="2026-10-10T16:00:00+03:00"
              locationName="Alo Yönetim Genel Merkez"
            />
          </div>
        </div>

        {/* Grup Şirketlerimiz (Eğitim Kurumlarımız) */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">{t('aca_group_title')}</h2>
             <p className="text-base text-[var(--color-secondary)] font-light mt-4 max-w-2xl mx-auto leading-relaxed">{t('aca_group_desc')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Alo Güvenlik */}
            <a href="https://www.guvenlikkursu.com/" target="_blank" rel="noopener noreferrer" className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col items-start h-full cursor-pointer">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-red-500/20 transition-colors" />
               <div className="flex items-center justify-between w-full mb-8 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-slate-700">
                   <span className="material-symbols-outlined text-3xl text-red-600">local_police</span>
                 </div>
                 <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-full uppercase tracking-wider">{t('aca_group_c1_badge')}</span>
               </div>
               <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4 relative z-10">{t('aca_group_c1_title')}</h3>
               <p className="text-[var(--color-secondary)] font-light leading-relaxed relative z-10 mb-8 flex-grow">
                 {t('aca_group_c1_desc')}
               </p>
               <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest relative z-10 group-hover:translate-x-2 transition-transform">
                 İncele <span className="material-symbols-outlined text-lg">arrow_forward</span>
               </div>
            </a>

            {/* 3G Güvenlik */}
            <a href="https://3gguvenlik.com/" target="_blank" rel="noopener noreferrer" className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col items-start h-full cursor-pointer">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors" />
               <div className="flex items-center justify-between w-full mb-8 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-slate-700">
                   <span className="material-symbols-outlined text-3xl text-blue-600">security</span>
                 </div>
                 <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-full uppercase tracking-wider">{t('aca_group_c2_badge')}</span>
               </div>
               <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4 relative z-10">{t('aca_group_c2_title')}</h3>
               <p className="text-[var(--color-secondary)] font-light leading-relaxed relative z-10 mb-8 flex-grow">
                 {t('aca_group_c2_desc')}
               </p>
               <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest relative z-10 group-hover:translate-x-2 transition-transform">
                 İncele <span className="material-symbols-outlined text-lg">arrow_forward</span>
               </div>
            </a>
          </div>
        </div>

        {/* Curriculum Timeline Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('aca_cur_title')}</h2>
             <p className="text-sm text-[var(--color-secondary)] font-light mt-4">{t('aca_cur_desc')}</p>
          </div>

          <div className="relative border-l-2 border-gray-200 dark:border-white/10 pl-6 md:pl-10 space-y-8 ml-4 md:ml-0">
            {academyFeatures.map((f, i) => {
              const isActive = activeStep === i;
              
              return (
                <div key={i} className="relative">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[35px] md:-left-[51px] top-4 w-6 h-6 rounded-full border-4 ${isActive ? 'bg-slate-900 dark:bg-white border-slate-300 dark:border-slate-700 scale-125' : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-white/20'} transition-all duration-300 z-10 flex items-center justify-center`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  {/* Accordion Card */}
                  <motion.div 
                    layout
                    onClick={() => setActiveStep(isActive ? null : i)}
                    className={`bg-[var(--color-surface)] border ${isActive ? 'border-slate-900/50 dark:border-white/50 shadow-xl' : 'border-[var(--color-outline)]/60 shadow-sm'} p-6 md:p-8 rounded-[2rem] cursor-pointer transition-all duration-300 group overflow-hidden relative`}
                  >
                    {isActive && <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} opacity-10 blur-2xl rounded-full`} />}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${f.color} shadow-lg ${isActive ? 'scale-110' : ''} transition-transform`}>
                          <span className="material-symbols-outlined">{f.icon}</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">{t('aca_cur_mod')} 0{i + 1}</div>
                          <h3 className="text-xl font-bold text-[var(--color-primary)] pr-8">{f.title}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                        <span className="text-xs font-bold text-[var(--color-secondary)] bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full whitespace-nowrap">
                          {f.duration}
                        </span>
                        <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-slate-900 dark:text-white' : ''}`}>
                          expand_more
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: "1.5rem" }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="relative z-10"
                        >
                          <div className="w-full h-px bg-gray-100 dark:bg-white/5 mb-6" />
                          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light leading-relaxed pl-2 border-l-2 border-slate-900/30 dark:border-white/30">
                            {f.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deprem, Yangın & Afet Güvenliği Denetim Portalı */}
        <EmergencyPreparednessAuditSeo />

        {/* İstihdam Köprüsü Timeline */}
        <div className="max-w-5xl mx-auto mt-24">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">{t('aca_path_title')}</h2>
             <p className="text-base text-[var(--color-secondary)] font-light mt-4 max-w-2xl mx-auto leading-relaxed">{t('aca_path_desc')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
             {/* Connecting Line (Desktop only) */}
             <div className="hidden md:block absolute top-12 h-0.5 bg-gradient-to-r from-gray-200 via-brand-500 to-slate-500 dark:from-white/10 dark:via-brand-500 dark:to-slate-500 z-0" style={{ left: '16.66%', right: '16.66%' }} />
             
             {[
               {
                 title: t('aca_path_s1_title'),
                 desc: t('aca_path_s1_desc'),
                 icon: 'school',
                 color: 'text-gray-500 dark:text-gray-300',
                 bg: 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700'
               },
               {
                 title: t('aca_path_s2_title'),
                 desc: t('aca_path_s2_desc'),
                 icon: 'workspace_premium',
                 color: 'text-brand-500',
                 bg: 'bg-brand-50 dark:bg-brand-500/10 border-brand-200 dark:border-brand-500/30'
               },
               {
                 title: t('aca_path_s3_title'),
                 desc: t('aca_path_s3_desc'),
                 icon: 'work',
                 color: 'text-slate-500',
                 bg: 'bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/30'
               }
             ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                   <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl border-4 transition-transform duration-500 group-hover:scale-110 ${step.bg}`}>
                      <span className={`material-symbols-outlined text-4xl ${step.color}`}>{step.icon}</span>
                   </div>
                   <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{step.title}</h3>
                   <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed max-w-xs">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
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
    </>
  );
}
