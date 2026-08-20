"use client";

import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import { Card } from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { RelatedArticles } from '@/components';
import PestControlCalculator from '@/components/sections/PestControlCalculator';
import PestControlTestimonials from '@/components/sections/PestControlTestimonials';
import Image from 'next/image';

export default function HasereVeDezenfeksiyonClient() {
  const { t } = useLanguage();

  const pestPoints = [
    {
      title: t('pest_feat_1_title') || 'Sağlık Bakanlığı Ruhsatlı Biyosidal Ürünler',
      desc: t('pest_feat_1_desc') || 'Dünya Sağlık Örgütü (WHO) onaylı, kokusuz, leke bırakmayan, çocuk ve evcil hayvan sağlığına zararsız formülasyonlar.',
      icon: "verified"
    },
    {
      title: t('pest_feat_2_title') || 'Garantili Böcek & Kemirgen Kontrolü',
      desc: t('pest_feat_2_desc') || 'Hamamböceği, tahtakurusu, pire, akrep, fare ve sıçanlara karşı kalıcı jel, ULV soğuk sisleme ve kilitli yem istasyonları.',
      icon: "bug_report"
    },
    {
      title: t('pest_feat_3_title') || 'Ortak Alan & Otopark Dezenfeksiyonu',
      desc: t('pest_feat_3_desc') || 'Bina girişleri, çöp şutları, hidrofor odaları, sığınaklar ve asansör boşluklarında mikrobiyal sterilizasyon.',
      icon: "cleaning"
    },
    {
      title: t('pest_feat_4_title') || 'Resmi İlaçlama Raporu ve Takip Kartı',
      desc: t('pest_feat_4_desc') || 'Her uygulama sonrası bina panolarına asılan karekodlu Sağlık Bakanlığı onaylı resmi ilaçlama belgesi.',
      icon: "description"
    }
  ];

  const pestSteps = [
    { name: '1. Haşere Türü ve Yuvalanma Noktaları Keşfi', text: 'Biyolog ve ziraat mühendislerimizce sitenin rögarları, çöp odaları, sığınaklar ve tesisat şaftları taranarak haşere kaynağı tespit edilir.' },
    { name: '2. Entegre Zararlı Yönetimi (IPM) Planı', text: 'Haşere türüne göre kokusuz jel, kalıcı rezidüel sıvı püskürtme veya ULV soğuk sisleme yöntemlerinden en etkili kombinasyon belirlenir.' },
    { name: '3. Güvenli Uygulama ve Kilitli Kemirgen İstasyonları', text: 'Çocukların ve evcil hayvanların ulaşamayacağı kilitli istasyonlar yerleştirilir; ortak alanlar sertifikalı teknisyenlerimizce ilaçlanır.' },
    { name: '4. Resmi İlaçlama Tutanağı ve Garanti', text: 'Sağlık Bakanlığı onaylı uygulama belgesi yönetime teslim edilir; 21 gün içinde ücretsiz kontrol ve gerekirse revizyon yapılır.' }
  ];

  const faqs = [
    {
      question: 'İlaçlama sırasında ve sonrasında evden ya da binadan çıkmak gerekir mi?',
      answer: 'Kullandığımız kokusuz jel ve mikroenkapsüle solüsyonlar yaşam alanlarını terk etmeyi gerektirmez. Yalnızca kapalı otopark veya sığınak gibi alanlarda yapılan ULV soğuk sisleme uygulamalarında 2 saat havalandırma önerilir.'
    },
    {
      question: 'Kullanılan ilaçlar kedi, köpek ve evcil hayvanlar için güvenli mi?',
      answer: 'Evet. İlaçlarımız sadece hedef zararlının sinir ve sindirim sistemine etki eden, memeli hayvanlar ve insanlar üzerinde toksik etkisi bulunmayan Sağlık Bakanlığı ruhsatlı biyosidal ürünlerdir. Kemirgen yemleri ise sadece anahtarla açılan kilitli emniyetli kutularda muhafaza edilir.'
    },
    {
      question: 'Site ve apartmanlarda ilaçlama hangi sıklıkla yapılmalıdır?',
      answer: 'Halk sağlığı standartlarına göre ortak alanlar, rögarlar ve çöp odaları yılda en az 2-4 kez (mevsim geçişlerinde) periyodik olarak ilaçlanmalıdır.'
    },
    {
      question: 'İlaçlama sonrası haşereler ne kadar sürede tamamen yok olur?',
      answer: 'Jel uygulamaları hamamböceklerinde domino etkisiyle 3-5 gün içinde yuvanın tamamını kurutur. Sıvı rezidüel ilaçlar ise temas anından itibaren 24 saat içinde sonuç verir ve 3 aya kadar koruyucu bariyer sağlar.'
    }
  ];

  return (
    <>
      <ServiceSeo 
        serviceType="Haşere İlaçlama ve Dezenfeksiyon"
        description="Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Biyosidal_%C3%BCr%C3%BCnler"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1584820927498-cafe2c1bb869?q=80&w=2000&auto=format&fit=crop" alt="Haşere İlaçlama ve Dezenfeksiyon - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
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
              {t('pest_banner_badge') || 'Sağlık Bakanlığı Ruhsatlı'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_pest_hero_title') || 'Haşere İlaçlama & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Kalıcı Dezenfeksiyon</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Haşere İlaçlama ve Dezenfeksiyon' }}
              ratingValue={4.8}
              reviewCount={158}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('pest_banner_desc') || 'Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.'}
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
        
        {/* Pest Control Calculator */}
        <div className="-mt-32 relative z-30">
          <PestControlCalculator />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pestPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center">
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
            name="Biyosidal Ruhsatlı Haşere İlaçlama ve Dezenfeksiyon Protokolü"
            description="Site ve tesislerde insan sağlığına zarar vermeyen, çevre dostu ve %100 garantili haşere kontrolü için 4 aşamalı kurumsal protokolümüz."
            steps={pestSteps}
          />
        </div>

        {/* Pest Control Specific Social Proof */}
        <PestControlTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('pest_faq_title') || 'Haşere İlaçlama Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="hasere_seo_title"
        p1Key="hasere_seo_p1"
        p2Key="hasere_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/hasere-ve-dezenfeksiyon" />
      <RelatedArticles pillar="/hizmetler/hasere-ve-dezenfeksiyon" />
    </>
  );
}
