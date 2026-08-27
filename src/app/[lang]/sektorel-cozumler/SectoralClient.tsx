"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { autoLinkHtml } from '@/lib/autoLinker';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs } from '@/lib/schemas';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectoralRoiCalculatorSeo from '@/components/seo/SectoralRoiCalculatorSeo';
import { ServiceAuthorityHubSeo } from '@/components/seo';


export default function SectoralClient({ dbSolutions }: { dbSolutions: any[] }) {
  const { t } = useLanguage();

  const baseSectors = [
    {
      id: "rezidans",
      title: t('sector_residence_title'),
      desc: t('sector_residence_desc'),
      icon: "apartment",
      kpi: t('sector_residence_kpi'),
      features: [
        t('sector_residence_feat_1'),
        t('sector_residence_feat_2'),
        t('sector_residence_feat_3'),
        t('sector_residence_feat_4')
      ]
    },
    {
      id: "avm",
      title: t('sector_mall_title'),
      desc: t('sector_mall_desc'),
      icon: "storefront",
      kpi: t('sector_mall_kpi'),
      features: [
        t('sector_mall_feat_1'),
        t('sector_mall_feat_2'),
        t('sector_mall_feat_3'),
        t('sector_mall_feat_4')
      ]
    },
    {
      id: "sanayi",
      title: t('sector_industrial_title'),
      desc: t('sector_industrial_desc'),
      icon: "factory",
      kpi: t('sector_industrial_kpi'),
      features: [
        t('sector_industrial_feat_1'),
        t('sector_industrial_feat_2'),
        t('sector_industrial_feat_3'),
        t('sector_industrial_feat_4')
      ]
    },
    {
      id: "toplukonut",
      title: t('sector_housing_title'),
      desc: t('sector_housing_desc'),
      icon: "location_city",
      kpi: t('sector_housing_kpi'),
      features: [
        t('sector_housing_feat_1'),
        t('sector_housing_feat_2'),
        t('sector_housing_feat_3'),
        t('sector_housing_feat_4')
      ]
    },
    {
      id: "guvenlik-rezidans-plaza",
      title: "5188 Özel Güvenlik & Plaza Emniyet Çözümleri",
      desc: "Rezidans, plaza ve büyük toplu konut sitelerinde 5188 sayılı kanuna uygun sertifikalı özel güvenlik, AI plaka tanıma (PTS), kartlı turnike ve 7/24 kesintisiz devriye kalkanı.",
      icon: "security",
      kpi: "%100 Sıfır Zafiyet & 5188 Valilik İzin Güvencesi",
      features: [
        "5188 Lisanslı ve Sabıka Kaydı Temiz Özel Güvenlik Personeli",
        "Yapay Zeka Destekli Otomatik Plaka Tanıma (PTS) & Turnike Kontrolü",
        "Kör Noktasız 4K Gece Görüşlü IP CCTV Ağı & 30 Günlük Şifreli Kayıt",
        "GPS & RFID Zaman Damgalı Saatlik Devriye ve Mobil Amir Teftişi"
      ]
    }
  ];

  const sectors = dbSolutions && dbSolutions.length > 0 ? dbSolutions.map(ds => {
    let featuresList = [];
    try {
      featuresList = ds.features ? JSON.parse(ds.features) : [];
    } catch(e) {}

    return {
      id: ds.slug || ds.id,
      title: ds.title,
      desc: ds.description || '',
      icon: ds.icon || 'apartment',
      kpi: ds.kpiTag || t('sector_residence_kpi'),
      features: featuresList.length > 0 ? featuresList : [
        t('sector_residence_feat_1'),
        t('sector_residence_feat_2')
      ]
    };
  }) : baseSectors;

  const faqs = [
    {
      q: t('sector_faq_q1'),
      a: t('sector_faq_a1')
    },
    {
      q: t('sector_faq_q2'),
      a: t('sector_faq_a2')
    },
    {
      q: t('sector_faq_q3'),
      a: t('sector_faq_a3')
    }
  ];
  
  const [activeTab, setActiveTab] = useState<string>(sectors[0]?.id || "rezidans");
  const [unitCount, setUnitCount] = useState<number>(150);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic Personnel Estimator Logic based on project size
  const estimatedSecurity = Math.max(2, Math.round(unitCount / 40));
  const estimatedCleaning = Math.max(2, Math.round(unitCount / 50));
  const estimatedTechnical = Math.max(1, Math.round(unitCount / 100));
  const estimatedManager = 1;

  const currentSector = sectors.find(s => s.id === activeTab) || sectors[0];

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('sector_page_title'), url: '/sektorel-cozumler' }
  ]);

  const itemListLd = {
    '@type': 'ItemList',
    itemListElement: sectors.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      description: s.desc,
    })),
  };

  // Sektörel paketler: Product + AggregateOffer (Faz 64).
  const productLd = {
    '@type': 'Product',
    name: 'Sektörel Tesis Yönetim Çözümleri',
    description:
      'Rezidans, AVM, Sanayi ve Toplu Konut projeleri için özelleştirilmiş entegre tesis yönetimi hizmetleri.',
    brand: { '@type': 'Brand', name: 'Alo Yönetim' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'TRY',
      lowPrice: '5000',
      highPrice: '50000',
      offerCount: '4',
    },
  };

  const breadcrumbs = [
    { name: 'Anasayfa', url: '/' },
    { name: t('sector_page_title'), url: '/sektorel-cozumler' }
  ];
  
  return (
    <>
      <JsonLd data={[breadcrumbLd, itemListLd, productLd]} />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHeader 
        title={t('sector_page_title')} 
        description={t('sector_page_desc')} 
      />

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* ========================================================================= */}
        {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
        {/* ========================================================================= */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400">domain_add</span>
              <span>Özet Rehber: Sektörel Tesis Yönetimi ve Tipolojiye Özel İşletme Nedir?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              ISO 41001 & Tesis Yaşam Döngüsü Standardı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Sektörel Tesis Yönetimi</strong>;{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                büyük toplu konut siteleri
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                iş merkezleri ve kurumsal plazalar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                sanayi ve fabrika tesisleri
              </Link>
              {' '}ile{' '}
              <Link href="/sektorel-cozumler/avm-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                alışveriş merkezlerinin (AVM)
              </Link>{' '}
              kendine özgü operasyonel, teknik, güvenlik ve yasal dinamiklerine göre tasarlanan bütünleşik yönetim modelidir. Standart ve şablonik bina yönetimi yaklaşımları yerine, her mülk tipolojisinin insan sirkülasyonu, enerji tüketim profili, amortisman riskleri ve sakin beklentilerine göre özelleştirilmiş SLA (Hizmet Seviyesi Taahhüdü) süreçleri uygulanır.
            </p>
            <p>
              Sektörel operasyonlarımız;{' '}
              <a href="https://www.iso.org/standard/68021.html" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                ISO 41001:2018 Uluslararası Tesis Yönetimi Standardı
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ,{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              ,{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                5188 Sayılı Özel Güvenlik Kanunu
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              {' '}ve 6331 Sayılı İş Sağlığı ve Güvenliği (İSG) mevzuatlarına tam entegre olarak icra edilir.
            </p>
            <p>
              Tesis tipolojisine göre özelleştirilen ana hizmet hatlarımız;{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>
              ,{' '}
              <Link href="/hizmetler/guvenlik-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                5188 Özel Güvenlik
              </Link>
              ,{' '}
              <Link href="/hizmetler/aidat-takibi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Şeffaf Aidat Takibi
              </Link>
              ,{' '}
              <Link href="/hizmetler/teknik-bakim" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Mühendislik & Teknik Bakım
              </Link>
              {' '}ve{' '}
              <Link href="/hizmetler/temizlik-ve-hijyen" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Endüstriyel Temizlik
              </Link>{' '}
              olmak üzere dört ana yapısal tipolojide odaklanır:
            </p>

            {/* 4 Ana Sektörel Tipoloji Kartı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🏢</span> Lüks Rezidans & Çok Katlı Yaşam Projeleri
                </span>
                <p className="text-[var(--color-secondary)]">
                  7/24 konsiyerj, vale, resepsiyon, SPA/fitness işletimi, misafir karşılama protokolleri, dijital mobil aidat & rezervasyon uygulaması ve üst düzey sakin konforu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🏘️</span> Site & Büyük Ölçekli Toplu Konut Yönetimi
                </span>
                <p className="text-[var(--color-secondary)]">
                  KMK m.20 şeffaf aidat ve işletme projesi, ilamsız icra takibi, periyodik yeşil etiket asansör bakımı, geniş peyzaj/otomatik sulama ve çevre çit güvenliği.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>💼</span> Plaza, İş Merkezi & Ticari Gayrimenkuller
                </span>
                <p className="text-[var(--color-secondary)]">
                  Turnike/kartlı geçiş, BMS yangın & duman otomasyonu, kompanzasyon %0 reaktif ceza yönetimi, B2B teknik şartname ve enerji optimizasyon denetimleri.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🏭</span> Sanayi, Fabrika & Lojistik Depo Tesisleri
                </span>
                <p className="text-[var(--color-secondary)]">
                  6331 İSG denetimleri, ağır vasıta PTS giriş-çıkış kontrolü, trafo/yüksek gerilim ve jeneratör bakımları, endüstriyel atık ve çevre mevzuatı uyumu.
                </p>
              </div>
            </div>

            <p>
              Alo Yönetim ölçek ekonomisi sayesinde; her tesis tipolojisinde satın alma maliyetlerinde %30'a varan doğrudan tasarruf sağlanır, yönetim kurullarının hukuki riskleri sıfırlanır ve gayrimenkulün piyasa değeri korunur.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">trending_down</span>
                </span>
                <span>%30 Net Bütçe Tasarrufu</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Toplu satın alma gücü ve ölçek ekonomisiyle enerji, temizlik kimyasalı ve teknik bakım maliyetlerinde indirim.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">verified</span>
                </span>
                <span>%100 Tipolojiye Özel SLA</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Rezidans, toplu konut, plaza ve sanayi projelerine özel tanımlı yanıt süreleri ve hizmet kalite standartları.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">shield_person</span>
                </span>
                <span>7/24 Şeffaf Denetim</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Canlı dijital aidat muhasebesi, süpervizör gece devriyeleri ve bağımsız denetçi teftiş raporları.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Sector Tabs */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === s.id
                    ? 'bg-[var(--color-primary)] text-white shadow-lg scale-105'
                    : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Sector Spotlight Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{currentSector.icon}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-500/10 border border-slate-500/20 px-4 py-1.5 rounded-full">
                    {currentSector.kpi}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">{currentSector.title}</h2>
                <p 
                  className="text-base text-[var(--color-secondary)] font-light leading-relaxed prose-a:text-brand-500 prose-a:font-semibold hover:prose-a:text-brand-600 prose-a:underline transition-colors"
                  dangerouslySetInnerHTML={{ __html: autoLinkHtml(currentSector.desc) }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentSector.features.map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-semibold text-[var(--color-primary)]">
                      <span className="material-symbols-outlined text-slate-900 dark:text-white shrink-0">check_circle</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
                <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  {t('sector_specialty_tag')}
                </div>

                <h3 className="text-2xl font-bold">{t('sector_specialty_title')}</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {t('sector_specialty_desc')}
                </p>

                <Link 
                  href="/teklif-al" 
                  className="w-full bg-white text-slate-950 font-bold py-4 px-6 rounded-2xl text-center text-sm hover:bg-gray-100 transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  {currentSector.title} {t('sector_quote_for_sector')}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Sector Personnel & Resource Estimator Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
              {t('sector_est_tag')}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">{t('sector_est_title')}</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
              {t('sector_est_desc')}
            </p>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)]">{t('sector_est_label')}</label>
                <span className="text-xl font-bold text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-4 py-1 rounded-full">{unitCount} {t('sector_est_unit')}</span>
              </div>
              <input 
                type="range" 
                min={20}
                max={1000}
                step={10}
                value={unitCount}
                onChange={(e) => setUnitCount(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-[#1e293b] text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
            <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">{t('sector_est_rec_title')}</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-slate-300">shield</span>
                  {t('sector_est_sec')}
                </span>
                <span className="text-2xl font-bold text-slate-300">{estimatedSecurity} {t('sector_est_sec_val').replace('Personel', '').trim() || t('sector_est_sec_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_sec_desc')}</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-slate-300">cleaning_services</span>
                  {t('sector_est_clean')}
                </span>
                <span className="text-2xl font-bold text-slate-300">{estimatedCleaning} {t('sector_est_clean_val').replace('Personel', '').trim() || t('sector_est_clean_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_clean_desc')}</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-amber-400">build</span>
                  {t('sector_est_tech')}
                </span>
                <span className="text-2xl font-bold text-amber-400">{estimatedTechnical} {t('sector_est_tech_val').replace('Personel', '').trim() || t('sector_est_tech_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_tech_desc')}</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-purple-400">badge</span>
                  {t('sector_est_mgr')}
                </span>
                <span className="text-2xl font-bold text-purple-400">{estimatedManager} {t('sector_est_mgr_val').replace('Müdür', '').trim() || t('sector_est_mgr_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_mgr_desc')}</span>
              </div>
            </div>

            <Link href="/teklif-al" className="w-full bg-white text-slate-950 font-bold py-3.5 px-6 rounded-xl text-center text-sm transition-transform hover:scale-105 hover:bg-slate-100 shadow-lg">
              {t('sector_est_btn')}
            </Link>
          </div>
        </div>

        {/* 4 Sector Cards Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-500/10 px-3 py-1 rounded-full">
                    {s.kpi}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">{s.title}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{s.desc}</p>

                <div className="flex flex-col gap-2 pt-2">
                  {s.features.map((f: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      <span className="material-symbols-outlined text-slate-900 dark:text-white text-sm">check_circle</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/teklif-al" className="w-fit bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl text-xs hover:opacity-95 transition-opacity flex items-center gap-2">
                {t('sector_get_quote')}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* 3 Yıllık Sektörel ROI & Tasarruf Matrisi */}
        <SectoralRoiCalculatorSeo />

        {/* FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">{t('sector_faq_title')}</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-slate-900 dark:text-white transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="p-6 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 text-sm text-[var(--color-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
        <ServiceAuthorityHubSeo
          serviceName="Sektörel Tesis ve Gayrimenkul Yönetim Çözümleri"
          serviceCategory="Sektörel Çözümler"
          lawReferences={[
            {
              title: "ISO 41001:2018 Tesis Yönetim Sistemi Standardı",
              sourceName: "Türk Standardları Enstitüsü (TSE)",
              url: "https://www.tse.org.tr",
              badge: "ISO 41001",
              description: "Rezidans, plaza, AVM ve endüstriyel tesislerde entegre hizmet kalitesi, iş sürekliliği ve maliyet kontrolü uluslararası standardı."
            },
            {
              title: "IFMA — International Facility Management Association Standartları",
              sourceName: "IFMA Global Portal",
              url: "https://www.ifma.org",
              badge: "IFMA Global",
              description: "Dünya genelinde gayrimenkul ve ticari varlıkların yaşam döngüsü amortisman yönetimi ve yeşil bina (LEED/BREEAM) uyumluluk kriterleri."
            },
            {
              title: "634 Sayılı Kat Mülkiyeti Kanunu — Toplu Yapı Yönetimi (Madde 66-74)",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
              badge: "KMK m.66-74",
              description: "Karma yaşam projeleri, çok bloklu siteler ve sanayi sitelerinde ortak alanların temsilciler kurulu ve toplu yapı yönetim planıyla işletilmesi."
            }
          ]}
          glossaryTerms={[
            {
              slug: "toplu-yapi-yonetimi",
              term: "Toplu Yapı Yönetimi Nedir?",
              summary: "Birden çok parsel ve bloktan oluşan karma projelerde ortak sosyal tesis ve güvenliğin merkezi kurulla yönetilmesidir."
            },
            {
              slug: "bina-otomasyon-sistemi-bms",
              term: "Bina Otomasyon Sistemi (BMS)",
              summary: "Plaza ve rezidanslarda enerji, aydınlatma, iklimlendirme ve asansör sistemlerini tek merkezden optimize eden akıllı yazılımdır."
            },
            {
              slug: "kat-mulkiyeti-kanunu-kmk",
              term: "Kat Mülkiyeti Kanunu (KMK)",
              summary: "Tüm konut ve ticari bağımsız bölümlerin ortak gider, genel kurul ve yönetim esaslarını düzenleyen kanundur."
            },
            {
              slug: "isletme-projesi",
              term: "Sektörel İşletme Projesi & Bütçe",
              summary: "Tesisin 1 yıllık bütçesini, amortisman fonunu ve bağımsız bölüm başına düşen avans tutarını belirleyen yasal tablodur."
            }
          ]}
        />

        {/* Bottom Call To Action Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('sector_cta_title')}</h2>
            <p className="text-sm text-gray-300 font-light max-w-xl">
              {t('sector_cta_desc')}
            </p>
          </div>
          <Link href="/teklif-al" className="bg-white text-slate-950 font-bold py-4 px-8 rounded-2xl shrink-0 text-sm hover:bg-gray-100 transition-transform hover:scale-105 shadow-md">
            {t('sector_cta_btn')}
          </Link>
        </div>

      </section>
    </>
  );
}


