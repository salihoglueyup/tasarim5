"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { RelatedArticles } from '@/components';
import { generateBreadcrumbs, serviceSchema, faqPageSchema, webPageSchema } from '@/lib/schemas';
import CleaningCalculator from '@/components/sections/CleaningCalculator';
import CleaningTestimonials from '@/components/sections/CleaningTestimonials';

export default function TemizlikVeHijyen() {
  const { t } = useLanguage();

  const cleaningHighlights = [
    {
      title: t('clean_feat_1_title') || 'Çevre Dostu & TSE Belgeli Kimyasallar',
      desc: t('clean_feat_1_desc') || 'Yüzeylere ve insan sağlığına zarar vermeyen, Sağlık Bakanlığı ve TSE onaylı sertifikalı temizlik ürünleri.',
      icon: "eco",
      color: "from-slate-500 to-slate-700"
    },
    {
      title: t('clean_feat_2_title') || 'Endüstriyel Temizlik Makineleri',
      desc: t('clean_feat_2_desc') || 'Binicili zemin yıkama otomatları, yüksek basınçlı yıkama ve endüstriyel vakum makineleri ile kusursuz ortak alan hijyeni.',
      icon: "cleaning_services",
      color: "from-slate-700 to-slate-900"
    },
    {
      title: t('clean_feat_3_title') || '4 Mevsim Periyodik Temizlik Takvimi',
      desc: t('clean_feat_3_desc') || 'Günlük blok içi temizliği, haftalık otopark ve cam yıkaması, aylık detaylı ortak alan dezenfeksiyon planlaması.',
      icon: "calendar_month",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: t('clean_feat_4_title') || 'Hijyen & Dezenfeksiyon Standartları',
      desc: t('clean_feat_4_desc') || 'Asansör kabinleri, kapı kolları, tırabzanlar ve çocuk oyun alanlarında yüksek temas yüzeyi mikrobiyal arındırma.',
      icon: "sanitizer",
      color: "from-purple-500 to-fuchsia-600"
    }
  ];

  const seasonalMatrix = [
    { 
      id: "ilkbahar",
      season: t('clean_matrix_season_1') || 'İlkbahar', 
      task: t('clean_matrix_task_1') || 'Kış sonrası blok dış cephe cam temizliği, otopark zeminlerinin tazyikli suyla yıkanması ve bahçe yollarının yosun temizliği.',
      icon: "local_florist",
      color: "text-slate-500",
      bg: "bg-slate-500/10"
    },
    { 
      id: "yaz",
      season: t('clean_matrix_season_2') || 'Yaz', 
      task: t('clean_matrix_task_2') || 'Açık havuz çevresi ve güneşlenme teraslarının günlük hijyeni, çöp konteynerlerinin kokusuzlaştırılması ve sinek/haşere önleyici zemin temizliği.',
      icon: "light_mode",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    { 
      id: "sonbahar",
      season: t('clean_matrix_season_3') || 'Sonbahar', 
      task: t('clean_matrix_task_3') || 'Çatı olukları ve yağmur ızgaralarının yapraklardan arındırılması, kapalı otopark drenaj kanallarının yıkanması.',
      icon: "air",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    { 
      id: "kis",
      season: t('clean_matrix_season_4') || 'Kış', 
      task: t('clean_matrix_task_4') || 'Bina girişlerinde paspas sistemleri ve tuzlama sonrası zemin mermer/granit koruma cilalama işlemleri.',
      icon: "ac_unit",
      color: "text-slate-400 dark:text-slate-300",
      bg: "bg-slate-400/10 dark:bg-slate-300/10"
    }
  ];

  const cleaningSteps = [
    { name: '1. Saha Keşfi ve Hijyen İhtiyaç Analizi', text: 'Sitenin blok sayısı, kat adetleri, zemin tipleri (mermer, granit, epoksi) ve ortak alan yoğunluğu incelenerek özelleştirilmiş temizlik takvimi çıkarılır.' },
    { name: '2. Endüstriyel Ekipman ve Sertifikalı Kimyasal Tedariki', text: 'Zemin otomatları, buharlı temizleyiciler ve Sağlık Bakanlığı onaylı çevre dostu temizlik ürünleri sahaya konuşlandırılır.' },
    { name: '3. Düzenli ve Kontrollü Temizlik Uygulaması', text: 'Sabit ve vardiyalı temizlik personelleri, kontrol listelerine (check-list) uygun biçimde blok içlerini ve otoparkları temizler.' },
    { name: '4. Süpervizör Denetimi ve Fotoğraflı Raporlama', text: 'Temizlik amirlerimizce günlük kalite denetimi yapılır; site yönetimine fotoğraflı dijital hijyen raporu sunulur.' }
  ];

  const faqs = [
    {
      question: 'Site ve apartman temizliği hangi periyotlarla yapılır?',
      answer: 'Sitenizin büyüklüğü ve yönetim planına göre günlük kat temizliği, haftalık detaylı ortak alan yıkaması ve aylık kapalı otopark/zemin otomatı uygulamaları şeklinde planlanır. Tüm takvim şeffaf olarak ilan edilir.'
    },
    {
      question: 'Kullanılan temizlik kimyasalları insan sağlığı ve evcil hayvanlar için güvenli mi?',
      answer: 'Evet. Kullandığımız tüm ürünler Sağlık Bakanlığı ve TSE onaylı, biyolojik olarak parçalanabilir, ağır kimyasal içermeyen çevre dostu profesyonel endüstriyel temizleyicilerdir.'
    },
    {
      question: 'Temizlik personelinin SGK, kıyafet ve iş güvenliği (İSG) sorumluluğu kime aittir?',
      answer: 'Tüm personelin SGK girişleri, maaş ödemeleri, kıdem/ihbar tazminatları, iş elbiseleri ve 6331 sayılı İSG Kanunu kapsamındaki periyodik eğitimleri Alo Yönetim kurumsal sorumluluğundadır; site yönetimine hiçbir yasal risk yansımaz.'
    },
    {
      question: 'Kapalı otopark ve sığınak temizlikleri nasıl gerçekleştiriliyor?',
      answer: 'Kapalı otopark zeminleri endüstriyel binicili zemin yıkama otomatları ve yağ sökücü özel solüsyonlarla yıkanır; sığınak ve teknik alanlar ise periyodik olarak dezenfekte edilip tozlardan arındırılır.'
    }
  ];

  const [activeSeason, setActiveSeason] = useState(seasonalMatrix[0]);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t('nav_home') || 'Anasayfa', url: '/' },
    { name: t('nav_all_services') || 'Hizmetler', url: '/hizmetler' },
    { name: t('clean_title') || 'Temizlik ve Hijyen', url: '/hizmetler/temizlik-ve-hijyen' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Temizlik ve Hijyen Yönetimi',
    path: '/hizmetler/temizlik-ve-hijyen',
    description: 'Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği ve dezenfeksiyonu.',
    offerCatalogName: 'Profesyonel Temizlik ve Hijyen Hizmetleri',
    offers: cleaningHighlights.map((c) => ({ name: c.title, description: c.desc })),
    sameAs: 'https://tr.wikipedia.org/wiki/Temizlik',
  });

  const faqLd = faqPageSchema(faqs);

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, webPageSchema({ path: '/hizmetler/temizlik-ve-hijyen', speakableSelectors: ['h1', '#speakable-content'] })]} />
      <ServiceSeo 
        serviceType="Temizlik ve Hijyen Yönetimi"
        description="Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği ve dezenfeksiyonu."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Temizlik"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        </div>
        
        {/* Abstract Minimal Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
            <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
            <div className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('clean_banner_badge') || 'Endüstriyel Hijyen Standartları'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_clean_hero_title') || 'Profesyonel Temizlik & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Ortak Alan Hijyeni</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Temizlik ve Hijyen Yönetimi' }}
              ratingValue={4.9}
              reviewCount={245}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('clean_banner_desc') || 'Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Teklif Alın'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Cleaning Calculator */}
        <div className="-mt-32 relative z-30">
          <CleaningCalculator />
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cleaningHighlights.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-5 shadow-sm group hover:shadow-xl transition-all overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{c.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{c.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 4-Step HowTo Process */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name="Profesyonel Tesis ve Ortak Alan Temizlik Protokolü"
            description="Site ve rezidanslarda ortak kullanım alanlarının hijyenik ve düzenli tutulması için uyguladığımız 4 aşamalı temizlik protokolümüz."
            steps={cleaningSteps}
          />
        </div>

        {/* Interactive Seasonal Matrix Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-10">
            <div className="max-w-lg">
              <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                {t('clean_matrix_badge') || 'Mevsimsel Hijyen Programı'}
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('clean_matrix_title') || 'Dönemsel Bakım ve Temizlik Matrisi'}</h2>
            </div>
            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-white/5 p-2 rounded-2xl">
              {seasonalMatrix.map(season => (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    activeSeason.id === season.id 
                      ? 'bg-white dark:bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm' 
                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm ${activeSeason.id === season.id ? season.color : ''}`}>
                    {season.icon}
                  </span>
                  {season.season}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 sm:h-48 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-12 rounded-full ${activeSeason.bg} ${activeSeason.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{activeSeason.icon}</span>
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)]">{activeSeason.season} {t('clean_matrix_period') || 'Uygulaması'}</h3>
                </div>
                <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed max-w-3xl">
                  {activeSeason.task}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Cleaning Specific Social Proof */}
        <CleaningTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('clean_faq_title') || 'Temizlik ve Hijyen Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="temizlik_seo_title"
        p1Key="temizlik_seo_p1"
        p2Key="temizlik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/temizlik-ve-hijyen" />
      <RelatedArticles pillar="/hizmetler/temizlik-ve-hijyen" />
    </>
  );
}


