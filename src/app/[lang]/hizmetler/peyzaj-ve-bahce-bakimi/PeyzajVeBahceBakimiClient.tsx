"use client";

import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import { Card } from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { RelatedArticles } from '@/components';
import LandscapeCalculator from '@/components/sections/LandscapeCalculator';
import LandscapeTestimonials from '@/components/sections/LandscapeTestimonials';
import Image from 'next/image';

export default function PeyzajVeBahceBakimiClient() {
  const { t } = useLanguage();

  const landscapePoints = [
    {
      title: t('land_feat_1_title') || 'Otomatik Sulama & Drenaj Sistemleri',
      desc: t('land_feat_1_desc') || 'Akıllı yağmur sensörlü damlama ve rotor sulama sistemleri ile %40 su tasarruflu ve verimli sulama altyapısı.',
      icon: "water_drop"
    },
    {
      title: t('land_feat_2_title') || 'Periyodik Çim Biçme & Havalandırma',
      desc: t('land_feat_2_desc') || 'Düzenli çim kesimi, silindirleme, kök havalandırma, gübreleme ve yabani otla mücadele uygulamaları.',
      icon: "park"
    },
    {
      title: t('land_feat_3_title') || 'Ağaç Budama & Bitki Sağlığı',
      desc: t('land_feat_3_desc') || 'Uzman ziraat mühendisleri denetiminde form ve gençleştirme budaması, mantar ve zararlı böcek ilaçlaması.',
      icon: "forest"
    },
    {
      title: t('land_feat_4_title') || 'Mevsimlik Çiçeklendirme & Sert Zemin',
      desc: t('land_feat_4_desc') || 'Yazlık ve kışlık mevsimlik çiçek dikimi, çalı gruplaması, ağaç altı cüruf/malç serimi ve yürüyüş yolları bakımı.',
      icon: "deck"
    }
  ];

  const landscapeSteps = [
    { name: '1. Toprak Analizi ve Bitki Envanteri Keşfi', text: 'Sitenin peyzaj alanı, toprak pH değeri, mevcut ağaç ve çim türleri ziraat mühendislerimizce incelenerek ihtiyaç raporu hazırlanır.' },
    { name: '2. Otomatik Sulama ve Altyapı Revizyonu', text: 'Damla sulama, spring başlıkları ve su sayaçları kontrol edilir; kuraklık veya su israfını önleyen akıllı kontrol üniteleri devreye alınır.' },
    { name: '3. 4 Mevsim Periyodik Bakım ve Budama', text: 'Mevsimine göre çim havalandırma, ara ekim, form budaması ve organik gübreleme işlemleri planlı takvimle yürütülür.' },
    { name: '4. Bitki Koruma ve Düzenli Raporlama', text: 'Zararlılara karşı biyolojik ve kimyasal ilaçlama yapılır; site yönetimine fotoğraflı yeşil alan gelişim raporu sunulur.' }
  ];

  const faqs = [
    {
      question: 'Site ve sitelerin bahçe bakımında hangi periyotlar uygulanır?',
      answer: 'İlkbahar ve yaz aylarında haftalık çim biçme ve günlük sulama kontrolü; sonbaharda yaprak toplama, budama ve dip gübreleme; kışın ise don koruma ve ağaç bakımı şeklinde 12 aylık periyodik takvim uygulanır.'
    },
    {
      question: 'Otomatik sulama sistemi arızalarında ve su tasarrufunda ne yapıyorsunuz?',
      answer: 'Teknik ekibimiz patlak boru, tıkalı nozul ve vana arızalarına aynı gün müdahale eder. Akıllı yağmur sensörleri takılarak gereksiz sulama engellenir ve ortak alan su faturası %30-40 oranında düşürülür.'
    },
    {
      question: 'Ağaç budama işlemleri için belediyeden izin almak gerekir mi?',
      answer: 'Büyük gövdeli ve tescilli anıt ağaçların derin budaması veya kesimi için ilgili İlçe Belediyesi Park ve Bahçeler Müdürlüğü\'nden izin alınması şarttır. Bu yasal izin süreçlerini ziraat mühendisimiz site adına yürütür.'
    },
    {
      question: 'Çimlerin sararması ve kurumasını önlemek için hangi yöntemler kullanılıyor?',
      answer: 'Toprak sıkışması vertiküt (havalandırma) makinesiyle giderilir, kök bölgesine uygun NPK gübresi verilir, mantar enfeksiyonlarına karşı koruyucu ilaçlama yapılır ve gölgeye dayanıklı tohumlarla ara ekim yapılır.'
    }
  ];

  return (
    <>
      <ServiceSeo 
        serviceType="Peyzaj ve Bahçe Bakımı"
        description="Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Peyzaj_mimarl%C4%B1%C4%9F%C4%B1"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2000&auto=format&fit=crop" alt="Peyzaj ve Bahçe Bakımı - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
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
              {t('land_banner_badge') || 'Doğayla Uyumlu Yeşil Alanlar'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_land_hero_title') || 'Peyzaj Tasarımı & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Bahçe Bakım Yönetimi</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Peyzaj ve Bahçe Bakımı' }}
              ratingValue={4.8}
              reviewCount={142}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('land_banner_desc') || 'Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Teklif Alın'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Landscape Calculator */}
        <div className="-mt-32 relative z-30">
          <LandscapeCalculator />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {landscapePoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

        {/* 4-Step HowTo Process */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name="Site ve Tesis 4 Mevsim Peyzaj Bakım Protokolü"
            description="Site bahçelerinin her mevsim canlı, estetik ve bakımlı kalması için uyguladığımız 4 aşamalı peyzaj yönetim protokolümüz."
            steps={landscapeSteps}
          />
        </div>

        {/* Landscape Specific Social Proof */}
        <LandscapeTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('land_faq_title') || 'Peyzaj ve Bahçe Bakımı Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="peyzaj_seo_title"
        p1Key="peyzaj_seo_p1"
        p2Key="peyzaj_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/peyzaj-ve-bahce-bakimi" />
      <RelatedArticles pillar="/hizmetler/peyzaj-ve-bahce-bakimi" />
    </>
  );
}
