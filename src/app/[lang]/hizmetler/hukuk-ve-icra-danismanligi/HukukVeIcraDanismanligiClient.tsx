"use client";

import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ } from '@/components';
import { Card } from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { RelatedArticles } from '@/components';
import LegalCalculator from '@/components/sections/LegalCalculator';
import LegalTestimonials from '@/components/sections/LegalTestimonials';
import KMKLawAssistantSeo from '@/components/seo/KMKLawAssistantSeo';
import KMKLegalProcessHowToSeo from '@/components/seo/KMKLegalProcessHowToSeo';
import KMKLegalTemplateGeneratorSeo from '@/components/seo/KMKLegalTemplateGeneratorSeo';
import Image from 'next/image';

export default function HukukVeIcraDanismanligiClient() {
  const { t } = useLanguage();

  const legalPoints = [
    {
      title: t('legal_feat_1_title') || 'KMK 634 Sayılı Kanun Danışmanlığı',
      desc: t('legal_feat_1_desc') || 'Kat mülkiyeti ve kat irtifakı uyuşmazlıklarında uzman gayrimenkul avukatlarımızla tam kapsamlı mevzuat danışmanlığı.',
      icon: "gavel"
    },
    {
      title: t('legal_feat_2_title') || 'İlamsız İcra ve Hızlı Tahsilat',
      desc: t('legal_feat_2_desc') || 'Ödenmeyen aidat ve ortak gider avansları için yasal faiz ve masraflarıyla birlikte hızlı ilamsız icra takibi.',
      icon: "balance"
    },
    {
      title: t('legal_feat_3_title') || 'Genel Kurul & Divan Yönetimi',
      desc: t('legal_feat_3_desc') || 'Olağan ve olağanüstü kat malikleri kurulu toplantılarının yasal çağrı usulü, hazirun cetveli ve divan başkanlığı yönetimi.',
      icon: "groups"
    },
    {
      title: t('legal_feat_4_title') || 'Hukuki Sözleşmeler & Yönetim Planı',
      desc: t('legal_feat_4_desc') || 'Taşeron ve tedarikçi sözleşmelerinin hazırlanması, site yönetim planı tadilatı ve resmi tapu tescil işlemleri.',
      icon: "history_edu"
    }
  ];

  const faqs = [
    {
      question: 'Aidat borcunu ödemeyen malik veya kiracıya karşı icra süreci nasıl işler?',
      answer: '634 sayılı Kat Mülkiyeti Kanunu Madde 20 uyarınca, öncelikle noter veya iadeli taahhütlü mektupla yasal ihtarname gönderilir. 7 günlük yasal süre içinde ödeme yapılmazsa İcra Dairesi nezdinde ilamsız icra takibi (Örnek No: 7) başlatılır; borçlu itiraz ederse sulh hukuk mahkemesinde itirazın iptali davası açılır.'
    },
    {
      question: 'Genel kurul toplantı çağrısı kaç gün önceden yapılmalıdır?',
      answer: 'KMK Madde 29 gereğince, olağan toplantı çağrısının toplantı tarihinden en az 15 gün önce tüm kat maliklerine imza karşılığı veya taahhütlü mektupla tebliğ edilmesi şarttır. İlk toplantıda yeter sayı (arsa payı ve sayı çoğunluğu) sağlanamazsa, ikinci toplantı en geç 15 gün içinde yapılır.'
    },
    {
      question: 'Site yönetim planı nasıl değiştirilir?',
      answer: '634 sayılı KMK Madde 28 uyarınca, site yönetim planının değiştirilebilmesi için bütün kat maliklerinin beşte dördünün (4/5) oyu şarttır. Karar noter onaylı karar defterine işlenerek Tapu Müdürlüğü\'ne tescil ettirilir.'
    },
    {
      question: 'Gürültü ve komşuluk hukuku ihlallerinde yönetim ne yapabilir?',
      answer: 'KMK Madde 18 komşuluk haklarına saygı yükümlülüğü getirir. Yazılı uyarılara rağmen rahatsızlık devam ederse, yönetim kurulu kararıyla Sulh Hukuk Mahkemesi\'nden hâkimin müdahalesi talep edilebilir ve yasal idari para cezası uygulatılabilir.'
    }
  ];

  return (
    <>
      <ServiceSeo 
        serviceType="Hukuk ve İcra Danışmanlığı"
        description="Kat Mülkiyeti Kanunu (KMK 634) kapsamında aidat alacakları icra takibi, genel kurul yönetimi ve hukuki danışmanlık hizmetleri."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Hukuk"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop" alt="Hukuk ve İcra Danışmanlığı - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
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
              {t('legal_banner_badge') || 'KMK 634 Hukuki Güvence'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_legal_hero_title') || 'Hukuk & İcra Danışmanlığı <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Yasal Çözüm Ortaklığı</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Hukuk ve İcra Danışmanlığı' }}
              ratingValue={4.9}
              reviewCount={176}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('legal_banner_desc') || 'Aidat borçlarının hukuki yollarla tahsili, sözleşme hazırlıkları ve genel kurul yasal süreç yönetimleri.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Hukuki Danışmanlık Alın'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Legal Calculator */}
        <div className="-mt-32 relative z-30">
          <LegalCalculator />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legalPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

        {/* KMK & Yasal Mevzuat Akıllı Danışmanı */}
        <KMKLawAssistantSeo />

        {/* KMK Yasal Süreç & İcra HowTo Yol Haritası */}
        <KMKLegalProcessHowToSeo />

        {/* KMK 634 Karar & İhtarname Şablonu Jeneratörü */}
        <KMKLegalTemplateGeneratorSeo />

        {/* Legal Specific Social Proof */}
        <LegalTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('legal_faq_title') || 'Hukuk ve İcra Danışmanlığı Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="hukuk_seo_title"
        p1Key="hukuk_seo_p1"
        p2Key="hukuk_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/hukuk-ve-icra-danismanligi" />
      <RelatedArticles pillar="/hizmetler/hukuk-ve-icra-danismanligi" />
    </>
  );
}
