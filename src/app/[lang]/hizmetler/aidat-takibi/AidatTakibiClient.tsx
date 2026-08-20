"use client";

import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import { Card } from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import GTMDataLayer from '@/components/seo/GTMDataLayer';
import { RelatedArticles } from '@/components';
import DuesCalculator from '@/components/sections/DuesCalculator';
import DuesTestimonials from '@/components/sections/DuesTestimonials';
import InteractiveCostSimulatorSeo from '@/components/seo/InteractiveCostSimulatorSeo';
import Image from 'next/image';

export default function AidatTakibiClient() {
  const { t } = useLanguage();

  const duesPoints = [
    {
      title: t('dues_feat_1_title') || 'Online Kredi Kartı ile 7/24 Ödeme',
      desc: t('dues_feat_1_desc') || 'Web panelimiz ve mobil uygulamamız üzerinden tüm banka ve kredi kartlarıyla 3D Secure güvencesiyle anında aidat ödeme imkanı.',
      icon: "smartphone"
    },
    {
      title: t('dues_feat_2_title') || 'Otomatik Banka ve Muhasebe Entegrasyonu',
      desc: t('dues_feat_2_desc') || 'Banka hesap hareketlerinin otomatik işlenmesi, mükerrer ödemelerin engellenmesi ve hatasız cari hesap mutabakatı.',
      icon: "account_balance_wallet"
    },
    {
      title: t('dues_feat_3_title') || 'Otomatik SMS ve E-Posta Hatırlatma',
      desc: t('dues_feat_3_desc') || 'Son ödeme günü yaklaşan veya geciken aidatlar için malik ve kiracılara nezaketli ve düzenli dijital bildirimler.',
      icon: "notifications_active"
    },
    {
      title: t('dues_feat_4_title') || 'KMK 634 Uyumlu İcra ve Yasal Takip',
      desc: t('dues_feat_4_desc') || 'Ödenmeyen aidatlarda aylık yasal %5 gecikme tazminatının işletilmesi, resmi ihtarname ve icra dosyalarının hazırlanması.',
      icon: "gavel"
    }
  ];

  const duesSteps = [
    { name: '1. İşletme Projesi ve Aidat Dağıtımı', text: 'Genel kurulda onaylanan bütçe, Kat Mülkiyeti Kanunu m.20 gereğince bağımsız bölüm arsa paylarına göre hatasız paylaştırılır ve maliklere tebliğ edilir.' },
    { name: '2. Mobil Uygulama ve Online Ödeme', text: 'Kat malikleri ve kiracılar mobil uygulama veya web panelinden anlık borç sorgulaması yapar; kredi kartı, otomatik talimat veya banka transferi ile öder.' },
    { name: '3. Anlık Muhasebe ve Şeffaf Raporlama', text: 'Tahsilatlar sisteme saniyeler içinde yansır; gelir-gider tabloları, kasa ve banka bakiyeleri tüm sakinlerin denetimine açık olarak sunulur.' },
    { name: '4. Gecikme Yönetimi ve Yasal Tahsilat', text: 'Vadesi geçen ödemelerde otomatik hatırlatmalar devreye girer; çözülemeyen gecikmelerde hukuk departmanımız icra takibini başlatır.' }
  ];

  const faqs = [
    {
      question: 'Aidat ödemeleri hangi yöntemlerle yapılabilir?',
      answer: 'Alo Yönetim mobil uygulaması ve web portalı üzerinden kredi kartı, banka kartı (tek çekim veya taksitli), otomatik ödeme talimatı ve anlaşmalı banka IBAN hesaplarına havale/EFT ile 7/24 güvenle ödeme yapabilirsiniz.'
    },
    {
      question: 'Geciken aidatlara yasal gecikme faizi nasıl uygulanır?',
      answer: '634 Sayılı Kat Mülkiyeti Kanunu Madde 20/2 uyarınca, gününde ödenmeyen aidat ve ortak avans borçları için aylık %5 yasal gecikme tazminatı tahakkuk ettirilir. Sistemimiz bu hesabı kuruşu kuruşuna otomatik işletir.'
    },
    {
      question: 'Kiracı olarak aidat ödemekten kim sorumludur?',
      answer: 'Kat Mülkiyeti Kanunu uyarınca, kiracı bağımsız bölümün olağan işletme ve kullanım giderleri (kapıcı, güvenlik, temizlik, ortak elektrik vb.) aidatından sorumludur. Demirbaş, çatı onarımı veya asansör yenileme gibi ana gayrimenkul değerini artıran harcamalardan ise mülk sahibi (kat maliki) sorumludur.'
    },
    {
      question: 'Aidat borcum ve geçmiş ödemelerim için resmi döküm alabilir miyim?',
      answer: 'Evet. Mobil uygulamamız veya web panelinizden dilediğiniz tarih aralığına ait ıslak imzalı/karekodlu ekstre ve tahsilat makbuzlarını PDF formatında tek tıkla indirebilirsiniz.'
    }
  ];

  return (
    <>
      <GTMDataLayer event="view_service" data={{ service_name: "Aidat Takibi", category: "Hizmet" }} />
      <ServiceSeo 
        serviceType="Online Aidat Takibi ve Finansal Yönetim"
        description="Site ve apartmanlar için %99 tahsilat oranlı dijital aidat takip programı, online kredi kartı ile ödeme, otomatik banka entegrasyonu ve şeffaf muhasebe yönetimi."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Aidat"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop" alt="Online Aidat Takibi - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
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
              {t('dues_banner_badge') || 'Dijital Finansal Yönetim'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_dues_hero_title') || 'Online Aidat Takibi & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Şeffaf Muhasebe</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Online Aidat Takibi ve Finansal Yönetim' }}
              ratingValue={4.9}
              reviewCount={310}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('dues_banner_desc') || '%99 tahsilat oranı, anında online kartla ödeme ve sıfır bakiye hatası ile sitenizin tüm mali süreçlerini güvence altına alın.'}
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
        
        {/* Dues Calculator */}
        <div className="-mt-32 relative z-30">
          <DuesCalculator />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {duesPoints.map((p, i) => (
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
            name="Online Aidat Tahsilat ve Borç Takip Süreci"
            description="Site ve apartmanlarda aidatların düzenli toplanması, muhasebeleştirilmesi ve yasal takibi için 4 aşamalı kurumsal sürecimiz."
            steps={duesSteps}
          />
        </div>

        {/* KMK Arsa Payı & İşletme Projesi Masraf Simülatörü */}
        <InteractiveCostSimulatorSeo />

        {/* Dues Specific Social Proof */}
        <DuesTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('dues_faq_title') || 'Aidat Takibi Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="dues_seo_title"
        p1Key="dues_seo_p1"
        p2Key="dues_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/aidat-takibi" />
      <RelatedArticles pillar="/hizmetler/aidat-takibi" />
    </>
  );
}
