"use client";
import JsonLd from '@/components/seo/JsonLd';
import { RelatedArticles } from '@/components';

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import { InstantAnswerCardSeo, InteractiveTechnicalAuditRadarSeo } from '@/components/seo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { generateBreadcrumbs, serviceSchema, faqPageSchema, webPageSchema } from '@/lib/schemas';
import MaintenanceCalculator from '@/components/sections/MaintenanceCalculator';
import MaintenanceTestimonials from '@/components/sections/MaintenanceTestimonials';
import Image from 'next/image';

export default function TeknikBakim() {
  const { t } = useLanguage();

  const techIntervals = [
    { equipment: t('tech_grid_1_eq') || 'Asansör Sistemleri', interval: t('tech_grid_1_int') || 'Aylık periyodik bakım & yıllık yeşil etiket muayenesi', status: t('tech_grid_1_status') || 'Yasal Zorunluluk' },
    { equipment: t('tech_grid_2_eq') || 'Jeneratör & Elektrik Panoları', interval: t('tech_grid_2_int') || 'Haftalık otomatik test çalıştırması & termal kamera kontrolü', status: t('tech_grid_2_status') || 'Kritik Altyapı' },
    { equipment: t('tech_grid_3_eq') || 'Hidrofor & Su Deposu', interval: t('tech_grid_3_int') || 'Basınç testleri, genleşme tankı kontrolü & yıllık dezenfeksiyon', status: t('tech_grid_3_status') || 'Kesintisiz Su' },
    { equipment: t('tech_grid_4_eq') || 'Yangın Söndürme & Duman Tahliye', interval: t('tech_grid_4_int') || '3 aylık dedektör testi, yangın pompası & sprinkler basınç kontrolü', status: t('tech_grid_4_status') || 'Acil Güvenlik' }
  ];

  const maintenanceSteps = [
    { name: '1. Teknik Altyapı ve Ekipman Envanteri Tespiti', text: 'Sitenizdeki tüm asansör, jeneratör, hidrofor, kazan dairesi ve yangın ekipmanları marka, model ve seri numaralarıyla kayıt altına alınır.' },
    { name: '2. Yıllık Periyodik Bakım Takvimi Planlaması', text: 'TMMOB ve üretici standartlarına göre her cihaz için aylık, 3 aylık ve yıllık kontrol çizelgeleri hazırlanarak yönetime sunulur.' },
    { name: '3. 7/24 Mobil Acil Müdahale ve Arıza Onarımı', text: 'Asansörde kalma, elektrik kesintisi veya su patlağı gibi acil durumlarda gezici teknik servisimiz en geç 45 dakika içinde sahaya ulaşır.' },
    { name: '4. Dijital Bakım Karnesi ve Muayene Raporlaması', text: 'Yapılan her işlem karekodlu dijital ekipman karnesine işlenir; yedek parça değişimleri ve garanti süreleri anlık takip edilir.' }
  ];

  const faqs = [
    {
      question: 'Asansörlerin aylık bakımı ve yıllık muayenesi nasıl takip edilir?',
      answer: 'Asansör İşletme ve Bakım Yönetmeliği gereğince aylık periyodik bakımlar yetkili servisimizce yapılır ve tescil defterine işlenir. Yıllık A tipi muayene kuruluşu denetiminde yeşil etiket alınması süreci teknik ekibimizce koordine edilir.'
    },
    {
      question: 'Jeneratör ve hidrofor arızalarında acil müdahale süresi nedir?',
      answer: '7/24 kesintisiz nöbetçi teknik servisimiz acil durumlarda ortalama 30-45 dakika içinde siteye intikal eder; jeneratör devreye alma ve bypass sistemleri anında işletilir.'
    },
    {
      question: 'Kazan dairesi, ısıtma ve ortak havalandırma bakımları neleri kapsar?',
      answer: 'Kazan baca gazı emisyon ölçümleri, brülör ayarları, genleşme tankı azot basınç testleri ve sirkülasyon pompalarının mekanik salmastra kontrolleri uzman teknisyenlerimizce periyodik olarak yapılır.'
    },
    {
      question: 'Teknik bakım sözleşmesinde malzeme ve işçilik garantisi var mı?',
      answer: 'Evet. Yapılan tüm işçilik hizmetleri 1 yıl, değişimi yapılan orijinal yedek parçalar ise 2 yıl üretici ve servis garantisi altındadır.'
    }
  ];

  const breadcrumbLd = generateBreadcrumbs([
    { name: t('nav_home') || 'Anasayfa', url: '/' },
    { name: t('nav_all_services') || 'Hizmetler', url: '/hizmetler' },
    { name: t('tech_title') || 'Teknik Bakım', url: '/hizmetler/teknik-bakim' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Teknik Bakım ve Onarım',
    path: '/hizmetler/teknik-bakim',
    description: 'Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.',
    offerCatalogName: 'Bina ve Tesis Teknik Bakım Hizmetleri',
    offers: techIntervals.map((t) => ({ name: t.equipment, description: `${t.interval} - ${t.status}` })),
    sameAs: 'https://tr.wikipedia.org/wiki/Bak%C4%B1m_(teknik)',
  });

  const faqLd = faqPageSchema(faqs);

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, webPageSchema({ path: '/hizmetler/teknik-bakim', speakableSelectors: ['h1', '#speakable-content'] })]} />
      <ServiceSeo 
        serviceType="Teknik Bakım ve Onarım"
        description="Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Bak%C4%B1m_(teknik)"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop" alt="teknik-bakim hero" fill className="object-cover object-center opacity-30" priority />
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
              {t('tech_banner_badge') || '7/24 Kesintisiz Tesis Altyapısı'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_maint_hero_title') || 'Teknik Bakım, Onarım & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Mobil Servis</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Teknik Bakım ve Onarım' }}
              ratingValue={4.8}
              reviewCount={198}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('tech_banner_desc') || 'Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.'}
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
        
        {/* Maintenance Calculator */}
        <div className="-mt-32 relative z-30">
          <MaintenanceCalculator />
        </div>

        {/* Maintenance Intervals Table */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8">{t('tech_grid_title') || 'Periyodik Tesis Muayene ve Bakım Takvimi'}</h2>
          <div className="flex flex-col gap-4">
            {techIntervals.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 gap-4 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">{item.equipment}</h3>
                    <p className="text-sm text-[var(--color-secondary)] font-light mt-1">{item.interval}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-500/10 border border-slate-500/20 px-4 py-2 rounded-full w-fit whitespace-nowrap">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Teknik Bakım Uyumluluk Radarı */}
        <InteractiveTechnicalAuditRadarSeo districtName="İstanbul" />

        {/* AI Overviews & Position Zero Snippet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InstantAnswerCardSeo
            question="Asansör Yeşil Etiket Muayenesi Zorunlu mu ve Alınmazsa Ne Olur?"
            shortAnswer="Evet, Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği gereğince yılda bir kez A Tipi Akredite Muayene Kuruluşunca kontrol zorunludur. Yeşil etiket alınmayan ve kırmızı etiket iliştirilen asansörler 30 gün içinde düzeltilmezse ilgili belediyece mühürlenerek kullanıma kapatılır ve yöneticiye idari para cezası uygulanır."
            bulletPoints={[
              'Yeşil Etiket: Kusursuz, can ve mal güvenliği tam (1 yıl geçerli).',
              'Mavi Etiket: Hafif kusurlu, 120 gün içinde giderilmesi gerekir.',
              'Sarı Etiket: Kusurlu, 120 gün içinde giderilmezse mühürlenir.',
              'Kırmızı Etiket: Güvensiz, 30 gün içinde giderilmezse zabıta mühürler.'
            ]}
            lawArticle="Sanayi ve Teknoloji Bakanlığı Asansör Yönetmeliği (2019/30740)"
            verifiedBy="Alo Yönetim Mühendislik ve Teknik Teftiş Kurulu"
            category="Asansör & Tesis Mevzuatı"
          />
          <InstantAnswerCardSeo
            question="Elektrik Faturasında Reaktif Güç Cezası Nedir ve Nasıl Engellenir?"
            shortAnswer="EPDK mevzuatına göre kurulu gücü 50 kVA üzerindeki tesislerde endüktif reaktif oran %20'yi, kapasitif reaktif oran %15'i aşarsa elektrik dağıtım şirketi faturaya ağır reaktif bedel cezası yansıtır. Bu ceza, sitenin kompanzasyon panosundaki kondansatör ve harmonik filtrelerin röle takibiyle 7/24 kontrol edilmesiyle %100 engellenir."
            bulletPoints={[
              'Kompanzasyon panosu kondansatörleri periyodik olarak kademe testine tabi tutulmalıdır.',
              'Akıllı reaktif güç kontrol rölesi günlük sayaç tüketim oranlarını takip etmelidir.',
              'Ceza sınırına yaklaşan projelerde otomatik SMS uyarısı ve anlık müdahale yapılır.',
              'Alo Yönetim teknik takibindeki sitelerde reaktif ceza riski %0\'a indirilir.'
            ]}
            lawArticle="EPDK Elektrik Piyasası Tarifeler Yönetmeliği"
            verifiedBy="Alo Yönetim Elektrik Mühendisliği Masası"
            category="Enerji & Tesisat Yönetimi"
          />
        </div>

        {/* 4-Step HowTo Process */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name="Tesis ve Site Periyodik Teknik Bakım Süreci"
            description="Site ve binalarda kritik teknik sistemlerin arızasız ve güvenle çalışması için uyguladığımız 4 aşamalı kurumsal bakım protokolümüz."
            steps={maintenanceSteps}
          />
        </div>

        {/* Maintenance Specific Social Proof */}
        <MaintenanceTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('tech_faq_title') || 'Teknik Bakım Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="teknik_seo_title"
        p1Key="teknik_seo_p1"
        p2Key="teknik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/teknik-bakim" />
      <RelatedArticles pillar="/hizmetler/teknik-bakim" />
    </>
  );
}

