"use client";

import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import { Card } from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import GTMDataLayer from '@/components/seo/GTMDataLayer';
import { RelatedArticles } from '@/components';
import PoolCalculator from '@/components/sections/PoolCalculator';
import PoolTestimonials from '@/components/sections/PoolTestimonials';
import Image from 'next/image';
import { ServiceAuthorityHubSeo } from '@/components/seo';

export default function HavuzBakimiVeHijyenClient() {
  const { t } = useLanguage();

  const poolPoints = [
    {
      title: t('pool_feat_1_title') || 'Günlük Kimyasal Analiz & Dozajlama',
      desc: t('pool_feat_1_desc') || 'Fotometrik ölçüm cihazları ile serbest klor, bağlı klor, pH, siyanürik asit ve toplam alkalinite günlük takibi.',
      icon: "science"
    },
    {
      title: t('pool_feat_2_title') || 'Kum Filtresi & Pompa Sirkülasyonu',
      desc: t('pool_feat_2_desc') || 'Kuvars kumu/cam filtre ters yıkama (backwash), pompa sepeti temizliği ve enerji tasarruflu sirkülasyon kontrolü.',
      icon: "filter_alt"
    },
    {
      title: t('pool_feat_3_title') || 'Dip Süpürme & Yüzey Temizliği',
      desc: t('pool_feat_3_desc') || 'Otomatik robot ve manuel vakum sistemleriyle dip tortularının çekilmesi, savak kanalları ve ızgara dezenfeksiyonu.',
      icon: "pool"
    },
    {
      title: t('pool_feat_4_title') || 'Sağlık Bakanlığı Onaylı Ruhsatlandırma',
      desc: t('pool_feat_4_desc') || 'Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Yönetmeliği uyumlu resmi havuz işletme defteri ve akredite lab analizleri.',
      icon: "verified"
    }
  ];

  const poolSteps = [
    { name: '1. Günlük Su Numunesi ve Fotometrik Kimyasal Analiz', text: 'Sabah ve akşam havuz suyundan numune alınarak serbest klor, pH ve alkalinite değerleri dijital fotometre ile ölçülür.' },
    { name: '2. Otomatik Dozajlama ve Kimyasal Şartlandırma', text: 'Ölçüm sonuçlarına göre Sağlık Bakanlığı onaylı sıvı klor, pH düşürücü, çöktürücü ve yosun önleyici otomatik dozlanır.' },
    { name: '3. Filtrasyon Ters Yıkama ve Dip Süpürme', text: 'Kum filtrelerinin ters yıkaması yapılır; havuz tabanı vakumlanarak berrak ve tortusuz su kalitesi sağlanır.' },
    { name: '4. Resmi Havuz Defteri Kayıt ve İlanı', text: 'Tüm ölçüm değerleri yasal havuz işletme defterine işlenir ve pano üzerinden site sakinlerinin bilgisine sunulur.' }
  ];

  const faqs = [
    {
      question: 'Havuz suyu ölçümleri hangi sıklıkla yapılır ve nasıl ilan edilir?',
      answer: 'Sağlık Bakanlığı standartları uyarınca açık ve kapalı yüzme havuzlarında serbest klor, bağlı klor ve pH ölçümleri günde en az 3 defa yapılır. Sonuçlar dijital panoya ve mobil uygulamamıza anlık işlenir.'
    },
    {
      question: 'Havuz operatörleriniz sertifikalı mı?',
      answer: 'Evet. Tüm havuz teknik sorumlularımız MEB ve TSSF onaylı "Havuz Suyu Operatörlüğü" belgesine ve periyodik hijyen eğitimlerine sahiptir.'
    },
    {
      question: 'Açık havuzların kışa hazırlık (kışlama) bakımı nasıl yapılır?',
      answer: 'Sezon kapanışında havuz suyu boşaltılmaz; kışlama kimyasalları (kış koruyucu yosun önleyici ve don önleyici) eklenerek filtrasyon rölantiye alınır ve havuz emniyet brandası ile örtülür.'
    },
    {
      question: 'Akredite laboratuvar su analizleri yapılıyor mu?',
      answer: 'Evet. Ayda bir kez İl Sağlık Müdürlüğü yetkili akredite halk sağlığı laboratuvarları tarafından mikrobiyolojik (E.coli, Pseudomonas, vb.) ve kimyasal su analizleri yapılarak resmi uygunluk raporu alınır.'
    }
  ];

  return (
    <>
      <GTMDataLayer event="view_service" data={{ service_name: "Havuz Bakımı ve Hijyen", category: "Hizmet" }} />
      <ServiceSeo 
        serviceType="Havuz Bakımı ve Hijyen"
        description="Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Y%C3%BCzme_havuzu"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-36 md:pt-36 md:pb-48">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop" alt="Yüzme Havuzu Bakımı - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
        </div>
        
        {/* Abstract Minimal Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
            <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
            <div className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('pool_banner_badge') || 'Sağlık Bakanlığı Onaylı Hijyen'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_pool_hero_title') || 'Yüzme Havuzu Bakımı & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Kimyasal Şartlandırma</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Havuz Bakımı ve Hijyen' }}
              ratingValue={4.9}
              reviewCount={165}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('pool_banner_desc') || 'Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Teklif Alın'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Pool Calculator */}
        <div className="-mt-20 md:-mt-32 relative z-30">
          <PoolCalculator />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {poolPoints.map((p, i) => (
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
            name="Sağlık Bakanlığı Standartlarında Havuz Bakım ve Dezenfeksiyon Protokolü"
            description="Açık ve kapalı yüzme havuzlarının mikrobiyolojik açıdan güvenli ve kristal berraklığında tutulması için uyguladığımız 4 aşamalı kurumsal protokolümüz."
            steps={poolSteps}
          />
        </div>

        {/* Pool Specific Social Proof */}
        <PoolTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('pool_faq_title') || 'Havuz Bakımı Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <ServiceAuthorityHubSeo
        serviceName="Yüzme Havuzu Bakımı ve Kimyasal Hijyen"
        serviceCategory="Havuz & Sanitasyon"
        lawReferences={[
          {
            title: "Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik",
            sourceName: "T.C. Sağlık Bakanlığı & Resmi Gazete",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=15494&MevzuatTur=7&MevzuatTertip=5",
            badge: "Yönetmelik No: 28143",
            description: "Site ve tesis havuzlarında serbest klor (1-3 ppm), bağlı klor, pH (6.5-7.8), mikrobiyolojik parametreler ve havuz işletme defteri tutulma zorunluluğu."
          },
          {
            title: "TSE 11899 Yüzme Havuzu Suyunun Hazırlanması ve Tesisleri Standardı",
            sourceName: "Türk Standardları Enstitüsü (TSE)",
            url: "https://www.tse.org.tr",
            badge: "TSE 11899",
            description: "Kum filtrelerinin filtrasyon debisi, ters yıkama hızları, denge tankı kapasitesi ve klorlama otomasyonu teknik şartnamesi."
          },
          {
            title: "T.C. Sağlık Bakanlığı Halk Sağlığı Su Güvenliği ve Denetim Sistemi",
            sourceName: "T.C. Sağlık Bakanlığı",
            url: "https://www.saglik.gov.tr",
            badge: "Halk Sağlığı",
            description: "Akredite laboratuvarlarca aylık olarak yapılan E. coli, Pseudomonas aeruginosa ve koliform bakteri mikrobiyolojik analiz protokolü."
          }
        ]}
        glossaryTerms={[
          {
            slug: "havuz-bakimi-ve-kimyasal-operasyonu",
            term: "Havuz Kimyasal Dengesi & Operasyonu",
            summary: "Havuz suyunun berraklığını ve hijyenini sağlayan klor, pH düşürücü, yosun önleyici ve çöktürücü kimyasal yönetim protokolüdür."
          },
          {
            slug: "su-deposu-dezenfeksiyonu-ve-analizi",
            term: "Su Deposu & Denge Tankı Temizliği",
            summary: "Havuz denge depoları ve kullanım suyu tanklarının periyodik dezenfeksiyonu ve bakteriyel analiz sürecidir."
          },
          {
            slug: "vektor-ve-hasere-ilaclama-biyosidal",
            term: "Biyosidal Dezenfeksiyon & İlaçlama",
            summary: "Havuz çevresi ve soyunma kabinlerinde mantar, bakteri ve zararlılara karşı uygulanan sertifikalı hijyen programıdır."
          }
        ]}
      />

      <SeoTextSection
        titleKey="havuz_seo_title"
        p1Key="havuz_seo_p1"
        p2Key="havuz_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/havuz-bakimi-ve-hijyen" />
      <RelatedArticles pillar="/hizmetler/havuz-bakimi-ve-hijyen" />
    </>
  );
}
