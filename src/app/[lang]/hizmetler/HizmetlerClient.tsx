"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Faq, SeoTextSection } from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ItemListSeo from '@/components/seo/ItemListSeo';
import {
  LiveMetricBadgeSeo,
  ServiceComparisonMatrixSeo,
  DynamicPriceOfferSeo,
  MevzuatReferenceSeo,
  InstantAnswerCardSeo,
  SemanticTopicClusterSeo,
  ServiceAuthorityHubSeo
} from '@/components/seo';

export default function HizmetlerClient() {
  const { t } = useLanguage();

  const categories = [
    t('services_cat_all'), 
    t('services_cat_security'), 
    t('services_cat_cleaning'), 
    t('services_cat_technical'), 
    t('services_cat_management')
  ];

  const allServices = [
    {
      title: t('serv_4_title') || 'Profesyonel Tesis Yönetimi',
      category: t('services_cat_management'),
      desc: t('serv_4_desc'),
      link: "/hizmetler/tesis-yonetimi",
      icon: "account_balance_wallet",
      stats: t('serv_4_stats'),
      isFlagship: true
    },
    {
      title: t('serv_1_title'),
      category: t('services_cat_security'),
      desc: t('serv_1_desc'),
      link: "/hizmetler/guvenlik-yonetimi",
      icon: "security",
      stats: t('serv_1_stats')
    },
    {
      title: t('serv_2_title'),
      category: t('services_cat_cleaning'),
      desc: t('serv_2_desc'),
      link: "/hizmetler/temizlik-ve-hijyen",
      icon: "cleaning_services",
      stats: t('serv_2_stats')
    },
    {
      title: t('serv_3_title'),
      category: t('services_cat_technical'),
      desc: t('serv_3_desc'),
      link: "/hizmetler/teknik-bakim",
      icon: "engineering",
      stats: t('serv_3_stats')
    },
    {
      title: t('serv_5_title'),
      category: t('services_cat_cleaning'),
      desc: t('serv_5_desc'),
      link: "/hizmetler/peyzaj-ve-bahce-bakimi",
      icon: "park",
      stats: t('serv_5_stats')
    },
    {
      title: t('serv_6_title'),
      category: t('services_cat_technical'),
      desc: t('serv_6_desc'),
      link: "/hizmetler/havuz-bakimi-ve-hijyen",
      icon: "pool",
      stats: t('serv_6_stats')
    },
    {
      title: t('serv_7_title'),
      category: t('services_cat_management'),
      desc: t('serv_7_desc'),
      link: "/hizmetler/hukuk-ve-icra-danismanligi",
      icon: "gavel",
      stats: t('serv_7_stats')
    },
    {
      title: t('serv_8_title'),
      category: t('services_cat_cleaning'),
      desc: t('serv_8_desc'),
      link: "/hizmetler/hasere-ve-dezenfeksiyon",
      icon: "bug_report",
      stats: t('serv_8_stats')
    }
  ];

  const [activeCategory, setActiveCategory] = useState(t('services_cat_all'));

  const filteredServices = activeCategory === t('services_cat_all') 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory);

  const carouselItems = allServices.map((s) => ({
    name: s.title,
    url: `https://aloyonetim.com${s.link}`,
    description: s.desc
  }));

  return (
    <>
      <ItemListSeo items={carouselItems} />
      <PageHeader 
        title={t('services_title')} 
        description={t('services_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* SLA Guarantee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gradient-to-br from-slate-900 to-[#1e293b] text-white p-8 rounded-3xl flex flex-col gap-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-slate-300" aria-hidden="true">timer</span>
            <div className="text-2xl font-bold">{t('services_sla_1_title')}</div>
            <p className="text-xs text-gray-300 font-light">{t('services_sla_1_desc')}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-950 text-white p-8 rounded-3xl flex flex-col gap-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-slate-300" aria-hidden="true">verified_user</span>
            <div className="text-2xl font-bold">{t('services_sla_2_title')}</div>
            <p className="text-xs text-gray-300 font-light">{t('services_sla_2_desc')}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-[#231536] text-white p-8 rounded-3xl flex flex-col gap-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-purple-400" aria-hidden="true">trending_down</span>
            <div className="text-2xl font-bold">{t('services_sla_3_title')}</div>
            <p className="text-xs text-gray-300 font-light">{t('services_sla_3_desc')}</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-md scale-105'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {filteredServices.map((service, i) => (
            <motion.div
              layout
              key={i}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">{service.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-3 py-1 rounded-full w-fit">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-[var(--color-primary)] leading-snug">{service.title}</h3>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: service.desc }} />
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500">{service.stats}</span>
                <Link href={service.link} className="text-xs font-bold text-slate-900 dark:text-white hover:underline flex items-center gap-1">
                  {t('serv_btn_detail')}
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Canlı Kurumsal Metrikler */}
        <LiveMetricBadgeSeo />

        {/* Dynamic Price Offer Paketleri */}
        <DynamicPriceOfferSeo serviceName="Alo Yönetim Profesyonel Tesis Yönetimi" />

        {/* Geleneksel vs. Alo Yönetim Karşılaştırma Matrisi */}
        <ServiceComparisonMatrixSeo />

        {/* KMK 634 Resmi Mevzuat Doğrulama Kartı */}
        <MevzuatReferenceSeo
          kanunAdi="634 Sayılı Kat Mülkiyeti Kanunu"
          maddeNo="Madde 20 & 37"
          maddeBasligi="Ortak Gider Paylaşımı ve İşletme Projesi Zorunluluğu"
          orijinalMetin="Kat maliklerinden her biri aralarında başka türlü anlaşma olmadıkça: Kapıcı, kaloriferci, bahçıvan ve bekçi giderlerine ve bunlar için toplanacak avansa eşit olarak katılmakla yükümlüdür. Yönetici veya yönetim kurulu, kat malikleri kurulunca kabul edilmiş bir işletme projesi yoksa gecikmeksizin bir işletme projesi yapar."
          uzmanYorumu="Alo Yönetim, yönettiği tüm bağımsız bölümlerde KMK standartlarında dijital işletme projesi hazırlayarak tebliğ eder ve aidat tahsilat oranını %98'in üzerine çıkarır."
        />

        {/* Google 0. Sıra (Featured Snippet) Doğrudan Cevap Kartı */}
        <InstantAnswerCardSeo
          question="Site ve Apartman Yönetimi Hizmetleri Neleri Kapsar?"
          shortAnswer="Profesyonel site yönetimi; 5188 sayılı kanun kapsamında 7/24 özel güvenlik, ortak alan temizliği, asansör ve jeneratör periyodik teknik bakımı, peyzaj sulama, havuz hijyeni ve KMK 37 uyarınca aidat takibi ile hukuk danışmanlığını tek çatı altında kapsayan entegre tesis işletmesidir."
          bulletPoints={[
            '5188 Sayılı Kanun Uyumlu 7/24 Fiziki Güvenlik ve Plaka Tanıma Sistemi (PTS)',
            'Kazan Dairesi, Asansör, Hidrofor ve Yangın Sistemleri Periyodik Bakımı',
            'Sertifikalı Personelle Günlük Blok Temizliği ve Çöp Toplama Hizmeti',
            'Şeffaf KMK İşletme Projesi, Mobil Sakin Aidat Takip Paneli ve İcra Danışmanlığı'
          ]}
          lawArticle="634 Sayılı Kat Mülkiyeti Kanunu & 5188 Sayılı Özel Güvenlik Kanunu"
          category="Entegre Tesis Yönetimi"
        />

        <SeoTextSection 
          titleKey="services_seo_title" 
          p1Key="services_seo_p1" 
          p2Key="services_seo_p2" 
        />

        {/* Semantik Konu Kümeleri ve Akıllı Bağlantı Ağı */}
        <SemanticTopicClusterSeo />
        
        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
        <ServiceAuthorityHubSeo
          serviceName="Site, Rezidans ve Tesis Yönetim Hizmetleri"
          serviceCategory="Entegre Tesis İşletmesi"
          lawReferences={[
            {
              title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK)",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
              badge: "KMK 634",
              description: "Kat malikleri hakları, aidat ödeme zorunlulukları, işletme projeleri ve apartman/site yöneticisinin kanuni yetki ve görevleri."
            },
            {
              title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun",
              sourceName: "T.C. İçişleri Bakanlığı & EGM",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
              badge: "5188 Sayılı Kanun",
              description: "Özel güvenlik görevlisi istihdamı, valilik komisyon izinleri, üniforma ve yetki kuralları."
            },
            {
              title: "ISO 41001:2018 & TSE HYB 12850 Tesis Yönetim Standartları",
              sourceName: "Türk Standardları Enstitüsü (TSE)",
              url: "https://www.tse.org.tr",
              badge: "ISO 41001 & TSE",
              description: "Entegre tesis yönetimi hizmet yeterlilik kuralları, kalite yönetim sistemleri ve operasyonel verimlilik kriterleri."
            }
          ]}
          glossaryTerms={[
            {
              slug: "kat-mulkiyeti-kanunu-kmk",
              term: "Kat Mülkiyeti Kanunu (KMK)",
              summary: "Toplu yaşam alanlarında maliklerin ve kiracıların hak ve borçlarını düzenleyen ana mevzuattır."
            },
            {
              slug: "aidat",
              term: "Aidat ve Avans Dağıtımı",
              summary: "Ortak alan işletme, temizlik, güvenlik ve teknik masrafların bağımsız bölümlere paylaştırılmasıdır."
            },
            {
              slug: "5188-sayili-kanun",
              term: "5188 Özel Güvenlik Mevzuatı",
              summary: "Fiziki güvenlik, CCTV izleme ve plaka tanıma sistemlerinin yasal altyapısını oluşturan kanundur."
            },
            {
              slug: "isletme-projesi",
              term: "Resmi İşletme Projesi",
              summary: "Yıllık tahmini site bütçesi ve her bağımsız bölümün aylık ödeme planını içeren belgedir."
            }
          ]}
        />

        <div className="my-16">
          <Faq />
        </div>

        {/* Bottom Call To Action Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300 bg-white/10 px-4 py-1.5 rounded-full w-fit">{t('services_cta_badge')}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">{t('services_cta_title')}</h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              {t('services_cta_desc')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/teklif-al" className="bg-white text-slate-950 hover:bg-slate-100 font-bold py-4 px-8 rounded-2xl shadow-lg transition-transform hover:scale-105 text-sm text-center">
              {t('services_cta_btn_offer')}
            </Link>
            <Link href="/hesaplayici" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl transition-all text-sm text-center">
              {t('services_cta_btn_calc')}
            </Link>
          </div>
        </div>

      </section>
    </>
  );
}
