"use client";

import React, { useState } from 'react';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import {
  InstantAnswerCardSeo,
  FacilityComparisonMatrixSeo,
  FacilityLegalTemplateGeneratorSeo,
  FacilityLegalPrecedentsBrowserSeo,
  FacilityGroupSecurityTrustSeo,
  FacilitySubSectorCrossNav,
  ServiceAuthorityHubSeo,
  FacilityMaintenanceScheduleSeo,
  FacilityManagementCalculatorSeo,
  IstanbulDuesHeatmapSeo,
  ChecklistAuditSeo,
  TrustVerificationAuditSeo,
  FacilityBeforeAfterCasesSeo,
  FacilityDownloadableVaultSeo,
  FacilityDistrictPortfolioSeo,
  FacilityCorporateSlaGuaranteesSeo,
  FacilityTransitionTimelineSeo,
} from '@/components/seo';

import CaseStudySeo from '@/components/seo/CaseStudySeo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { RelatedArticles } from '@/components';
import FacilityTestimonials from '@/components/sections/FacilityTestimonials';
import Image from 'next/image';

export default function TesisYonetimiClient() {
  const { t } = useLanguage();
  const [activeLegalTab, setActiveLegalTab] = useState<'precedents' | 'template'>('precedents');

  const legalSteps = [
    { name: t('fac_step_1_title') || '1. Ücretsiz Tesis Keşfi ve Risk Analizi', text: t('fac_step_1_desc') || 'Tesisinizin fiziki, teknik, güvenlik ve mali durumunu yerinde inceler, eksikleri raporlarız.' },
    { name: t('fac_step_2_title') || '2. Şeffaf İşletme Projesi ve Bütçe Planı', text: t('fac_step_2_desc') || 'KMK m.37 uyarınca yıllık tahmini gelir-gider ve tasarruf odaklı aidat işletme projesini hazırlarız.' },
    { name: t('fac_step_3_title') || '3. Resmi Kurul Onayı ve Sözleşme', text: t('fac_step_3_desc') || 'Kat malikleri kurulu kararıyla yetkilendirme sonrası noter onaylı devir teslim protokolünü işletiriz.' },
    { name: t('fac_step_4_title') || '4. 7/24 Kesintisiz Entegre Tesis İşletmesi', text: t('fac_step_4_desc') || 'Güvenlik, temizlik, teknik bakım ve dijital aidat yönetimini tek merkezden kesintisiz başlatırız.' }
  ];

  const faqs = [
    {
      question: t('fac_faq_1_q') || 'Profesyonel tesis yönetimi neleri kapsar?',
      answer: t('fac_faq_1_a') || 'Tesis yönetimi; 5188 sayılı kanuna uygun fiziki güvenlik, ortak alan temizliği, asansör ve jeneratör teknik bakımı, aidat takibi, KMK hukuki danışmanlığı, peyzaj ve havuz bakımını tek çatı altında entegre olarak kapsar.'
    },
    {
      question: t('fac_faq_2_q') || 'Tesis yönetimi şirketiyle çalışmak aidatları düşürür mü?',
      answer: t('fac_faq_2_a') || 'Evet. Toplu satın alma gücü, önleyici teknik bakım ve enerji tasarrufu uygulamaları sayesinde Alo Yönetim ile çalışan tesislerde işletme giderlerinde %20 ile %30 arasında somut maliyet tasarrufu sağlanır.'
    },
    {
      question: t('fac_faq_3_q') || 'Yönetim devir süreci ne kadar sürer ve site sakinleri etkilenir mi?',
      answer: t('fac_faq_3_a') || 'Devir teslim süreci ortalama 48 saat içinde tamamlanır. Mevcut hizmetlerde hiçbir kesinti yaşanmadan, tüm sistemler ve personel entegrasyonu pürüzsüzce gerçekleştirilir.'
    },
    {
      question: 'Tesis yönetimi hizmetinin aylık maliyeti nedir?',
      answer: 'Maliyet; bina tipi, daire sayısı ve hizmet kapsamına göre değişir. Rezidanslarda daire başına aylık ₺850-1.600, toplu konutlarda ₺550-1.100 aralığında değişmektedir. Kesin fiyat için ücretsiz keşif talep ediniz.',
    },
    {
      question: 'KMK Madde 37 işletme projesi nedir?',
      answer: 'İşletme projesi; yöneticinin her yıl hazırladığı, 12 aylık tahmini gelir-gider ve her kat malikine düşen avans tutarını gösteren belgedir. Tebliğden 7 gün içinde itiraz edilmezse kesinleşir ve icra takibine dayanak olur.',
    },
    {
      question: 'Asansör yeşil etiket zorunluluğu nedir?',
      answer: 'Asansör Yönetmeliği kapsamında her asansörün yılda en az bir kez periyodik kontrolü ve yeşil etiket onayı zorunludur. Alo Yönetim yetkili A tipi muayene kuruluşlarıyla bu süreci takip eder.',
    },
    {
      question: 'Tesis yönetiminde acil arızalara müdahale süresi ne kadar?',
      answer: 'SLA kapsamında kritik arızalar (su baskını, asansör sıkışması, güvenlik ihlali) için maksimum 45 dakika müdahale süresi taahhüt edilir. 7/24 acil teknik ekibimiz kesintisiz hizmet vermektedir.',
    },
    {
      question: 'Aidatları geciktiren sakinlere nasıl müdahale edilir?',
      answer: 'Otomatik SMS hatırlatma, WhatsApp bildirim ve avukat ihtarının ardından KMK m.20 kapsamında mahkeme kararı beklenmeksizin icra takibi başlatılır. Tahsilat oranı %98\'in üzerinde tutulur.',
    },
    {
      question: 'Tesis yönetim şirketi nasıl seçilir?',
      answer: 'ISO sertifikaları ve 5188 lisansının güncelliğini, en az 3 referans siteyi, sözleşmedeki SLA sürelerini ve aylık raporlama yükümlülüklerini kontrol edin. Detaylı rehberimize göz atın.',
    },
  ];

  return (
    <>
      <ServiceSeo 
        serviceType={t('serv_fac_name') || 'Tesis Yönetimi'}
        description={t('fac_desc') || 'İstanbul genelinde profesyonel apartman, site, plaza ve entegre tesis yönetimi hizmetleri.'}
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi"
      />
      
      {/* 1. BÖLÜM: Hero & Değer Önerisi (Titanium & Slate) */}
      <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-28 md:pt-36 md:pb-36">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="Profesyonel Tesis Yönetimi - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
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
              {t('fac_banner_badge') || 'ENTEGRE VE DİJİTAL TESİS YÖNETİMİ'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_fac_hero_title') || 'Profesyonel <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400"> Tesis Yönetimi </span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: `Alo Yönetim - ${t('serv_fac_name') || 'Tesis Yönetimi'}` }}
              ratingValue={4.9}
              reviewCount={312}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('fac_banner_desc') || 'Apartman, site, plaza ve tesisler için 7/24 güvenlik, temizlik, teknik bakım, peyzaj ve şeffaf aidat takibi. ISO ve 5188 lisanslı kurumsal güvence.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Ücretsiz Keşif & Teklif Al'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Google Position Zero Özet Bilgi Kutusu (Slate & Titanium Paleti) */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Dekoratif Slate Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-200/40 via-transparent to-transparent dark:from-slate-800/20 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-emerald-600 dark:text-emerald-400">verified</span>
              <span>Özet Rehber: Tesis Yönetimi Nedir?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              ISO 41001 & 634 KMK Standardı
            </span>
          </div>

          {/* Google 0. Sıra / Featured Snippet Doğrudan Tanım Bloku */}
          <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border-l-4 border-blue-600 dark:border-blue-400 p-5 rounded-r-2xl mb-6 relative z-10">
            <h2 className="text-base sm:text-lg font-extrabold text-[var(--color-primary)] mb-2 flex items-center gap-2">
              <span>📌</span> Tesis Yönetimi Nedir?
            </h2>
            <p className="text-sm md:text-base text-[var(--color-secondary)] font-medium leading-relaxed">
              <strong className="text-[var(--color-primary)] font-bold">Tesis Yönetimi</strong>; konut siteleri, apartmanlar, plazalar ve sanayi tesislerinin <strong>5188 lisanslı güvenlik</strong>, <strong>7/24 teknik bakım</strong>, <strong>endüstriyel temizlik</strong>, <strong>aidat muhasebesi</strong> ve <strong>634 sayılı KMK hukuki danışmanlık</strong> operasyonlarının tek bir kurumsal merkezden entegre olarak yönetilmesidir.
            </p>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Tesis Yönetimi (Facility Management - FM)</strong>;{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                konut siteleri
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                çok katlı lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                iş merkezleri ve kurumsal plazalar
              </Link>
              , karma yaşam projeleri ve{' '}
              <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                endüstriyel tesislerin
              </Link>{' '}
              fiziki, teknik, idari ve mali tüm operasyonel dinamiklerinin tek bir profesyonel merkezden entegre olarak işletilmesidir. Geleneksel bina yönetiminin getirdiği dar kapsamlı kapıcılık veya münferit temizlik anlayışının çok ötesine geçen bu entegre model; gayrimenkulün tüm yaşam döngüsü (Life-Cycle Costing) boyunca amortisman değerini korumayı, bina kabuğu ile elektromekanik donanımların yıpranmasını önlemeyi, enerji tüketim verimliliğini maksimize etmeyi, operasyonel riskleri proaktif yöntemlerle minimize etmeyi ve sakinler için güvenli, huzurlu, sürdürülebilir ve yüksek prestijli bir yaşam standardı sunmayı hedefler.
            </p>
            <p>
              Profesyonel bir tesisin kesintisiz ve kusursuz işletilmesi; mühendislik, finans, iş hukuku, güvenlik taktikleri ve kat mülkiyeti mevzuatının mükemmel bir senkronizasyonla yürütülmesini gerektirir. Bu doğrultuda tüm operasyonel süreçlerimiz;{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              ,{' '}
              <a href="https://www.iso.org/standard/63022.html" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                ISO 41001:2018 Uluslararası Tesis Yönetimi Standartları
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ,{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                5188 Sayılı Özel Güvenlik Kanunu
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ,{' '}
              <span className="font-semibold text-[var(--color-primary)]">6331 Sayılı İş Sağlığı ve Güvenliği (İSG) Kanunu</span> ve{' '}
              <span className="font-semibold text-[var(--color-primary)]">TSE HYB 12850 Hizmet Yeterlilik Standardı</span> çerçevesinde yönetilir.
            </p>
            <p>
              Tesislerin yönetiminde reaktif (arıza oluştuktan sonra müdahale eden) değil, kestirimci ve planlı önleyici bir yaklaşım benimsenir. Bu sistematik disiplin; beklenmeyen yüksek arıza masraflarını, bütçe açıklarını ve komşuluk ihtilaflarını kökten engellerken, tesisin tüm fiziksel varlıklarını en yüksek performansta tutar. Mülkünüzün her detayını kapsayan operasyonlarımız dört ana uzmanlık disiplini üzerinde yapılandırılır:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/guvenlik-yonetimi" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span>🛡️</span> 5188 Lisanslı Özel Güvenlik & Elektronik Koruma
                </Link>
                <p className="text-[var(--color-secondary)]">
                  T.C. İçişleri Bakanlığı ve Valilik izinli lisanslama, üniformalı ve eğitimli güvenlik personeli, 7/24 kesintisiz CCTV video analiz gözetimi, yapay zeka destekli plaka tanıma (PTS), bariyer/turnike geçiş kontrolü, yangın/deprem/sel acil durum tahliye planları ve yetkisiz giriş önleme protokolleri.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/temizlik-ve-hijyen" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span>🧹</span> TSE 13811 Onaylı Endüstriyel Temizlik & Hijyen
                </Link>
                <p className="text-[var(--color-secondary)]">
                  Blok girişleri, panoramik asansör kabinleri, kat holleri, kapalı/açık otopark zeminleri, sosyal tesisler (yüzme havuzları, fitness, sauna) ve çöp şutlarının nano-gümüş dezenfeksiyonu; tıbbi/evsel atık ayrıştırma lojistiği, çevre dostu sertifikalı kimyasallar ve periyodik haşere kontrol (ilaçlama) operasyonları.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/teknik-bakim" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span>⚙️</span> Kestirimci & Önleyici Teknik Mühendislik Servisi
                </Link>
                <p className="text-[var(--color-secondary)]">
                  Asansörlerin A tipi muayene kuruluşu (MMO/TÜRKAK) yeşil etiket koordinasyonu, senkron jeneratör grupları, yangın algılama ve sprinkler sistemleri, hidrofor ve su arıtma tesisatları, BMS bina otomasyonu ve kompanzasyon panosu yönetimi ile %0 reaktif enerji cezası taahhüdü ve 45 dakika acil teknik müdahale SLA garantisi.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/aidat-takibi" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span>📊</span> Şeffaf Dijital Muhasebe, Bütçe & KMK Hukuk Teftişi
                </Link>
                <p className="text-[var(--color-secondary)]">
                  KMK m.37 gereği yıllık gelir-gider avans işletme projesinin noter/taahhütlü resmi tebliği, sanal POS ve banka API entegrasyonlu anlık aidat tahsilatı, otomatik SMS/WhatsApp bilgilendirme, gecikme tazminatı (%5 yasal faiz) hesaplaması, KMK m.20 ve m.33 uyarınca sulh hukuk ve icra takipleri.
                </p>
              </div>
            </div>
            <p>
              Tesislerimizde hayata geçirdiğimiz enerji verimliliği projeleri kapsamında; ortak aydınlatmalarda LED ve sensör dönüşümü, kompanzasyon panosu optimizasyonu ile <strong className="text-[var(--color-primary)] font-semibold">%100 reaktif ceza muafiyeti</strong>, hidrofor basınç optimizasyonu ve çatı Güneş Enerjisi Santrali (GES) fizibilite danışmanlığı sağlanır. 7/24 kesintisiz çalışan dijital sakin mobil uygulamamız sayesinde kat malikleri; tüm gelir-gider faturalarını, kasa/banka bakiyelerini, bağımsız denetim raporlarını ve teknik arıza loglarını anlık olarak şeffaflıkla denetleyebilir.
            </p>
            <p>
              Alo Yönetim ile çalışan tesislerde; yüzlerce projenin yarattığı toplu satın alma gücü, önleyici teknik bakım disiplini ve sıfır reaktif enerji cezası sayesinde ortak işletme bütçelerinde <strong className="text-emerald-600 dark:text-emerald-400 font-bold">%25 ile %35 arasında net tasarruf</strong> elde edilir. Aynı zamanda kat malikleri kurullarının ve bina yöneticilerinin şahsi hukuki ve cezai sorumlulukları, personel kıdem/ihbar tazminatı riskleri ve İSG yükümlülükleri şirketimizin kurumsal tüzel kişilik güvencesi altına alınarak tamamen sıfırlanır, gayrimenkulün piyasa değeri ve prestiji korunur.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">trending_down</span>
                </span>
                <span>%25 - %35 Bütçe Tasarrufu</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Yüzlerce projenin toplu tedarik gücü, sıfır reaktif elektrik cezası ve planlı önleyici teknik bakım güvencesi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                </span>
                <span>KMK 634 & Sıfır Hukuki Risk</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Resmi tebliğli KMK m.37 işletme projesi, noter onaylı devir teslim ve çalışan kıdem tazminatlarının şirketçe üstlenilmesi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">smartphone</span>
                </span>
                <span>7/24 Şeffaf Mobil Yönetim</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                iOS/Android sakin uygulaması, banka entegrasyonlu canlı gelir-gider takibi ve 45 dakika SLA acil mobil servis.
              </p>
            </div>
          </div>
        </div>

        {/* 1.5. BÖLÜM: İnteraktif Aidat Hesaplayıcı, İstanbul İlçe Isı Haritası & Tesis Denetim Listesi */}
        <div className="space-y-12">
          <FacilityManagementCalculatorSeo />
          <IstanbulDuesHeatmapSeo />
          <ChecklistAuditSeo />
        </div>

        {/* 2. BÖLÜM: Mülk Tipinize Özel Çözümler (Sub-Sector Hub) */}
        <FacilitySubSectorCrossNav />

        {/* 3. BÖLÜM: Neden Alo Yönetim? (Bireysel vs Alo Yönetim, ISO Doğrulama, SLA Garantileri & 5188 Güvenlik) */}
        <div className="space-y-12">
          <TrustVerificationAuditSeo />
          <FacilityCorporateSlaGuaranteesSeo />
          <FacilityComparisonMatrixSeo />
          <FacilityGroupSecurityTrustSeo />
          <FacilityMaintenanceScheduleSeo />
        </div>

        {/* 4. BÖLÜM: Kanıtlanmış Başarı & Müşteri Deneyimi (Öncesi/Sonrası Vakalar + Testimonials) */}
        <div className="space-y-16">
          <FacilityBeforeAfterCasesSeo />
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm">
            <CaseStudySeo />
          </div>
          <FacilityTestimonials />
        </div>

        {/* 5. BÖLÜM: KMK 634 & Hukuki Geçiş Süreci + İndirilebilir Belge Kasası */}
        <div className="space-y-12">
          {/* 48 Saatte Geçiş Yol Haritası */}
          <FacilityTransitionTimelineSeo />

          {/* İndirilebilir Resmi Doküman & Şablon Kasası */}
          <FacilityDownloadableVaultSeo />

          {/* 4 Adımda Geçiş Rehberi */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm">
            <HowToSeo 
              name={t('fac_steps_title') || 'Tesis Yönetimine Profesyonel Geçiş Rehberi'}
              description="Tesis yönetimine profesyonel geçiş sürecimiz dört temel adımdan oluşmaktadır."
              steps={legalSteps}
            />
          </div>

          {/* Sekmeli Hukuk Masası: Emsal Kararlar & Karar Şablonları */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-6 sm:p-12 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                634 KMK & Yargıtay Hukuk Kütüphanesi
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
                Kat Mülkiyeti Hukuku & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">Resmi Belge Masası</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light mt-1">
                Yargıtay emsal kararlarını inceleyin veya siteniz için noter onayına uygun genel kurul karar şablonu üretin.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/70 w-fit mx-auto">
                <button
                  type="button"
                  onClick={() => setActiveLegalTab('precedents')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    activeLegalTab === 'precedents'
                      ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs border border-[var(--color-outline)]/80'
                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">policy</span>
                  <span>Yargıtay Emsal Kararları</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLegalTab('template')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    activeLegalTab === 'template'
                      ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs border border-[var(--color-outline)]/80'
                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">edit_document</span>
                  <span>KMK 634 Karar & Şablon Jeneratörü</span>
                </button>
              </div>
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                {activeLegalTab === 'precedents' && (
                  <motion.div
                    key="precedents"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FacilityLegalPrecedentsBrowserSeo />
                  </motion.div>
                )}

                {activeLegalTab === 'template' && (
                  <motion.div
                    key="template"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FacilityLegalTemplateGeneratorSeo />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 5.5. BÖLÜM: 39 İlçe Referans ve Tesis Portföyü */}
        <FacilityDistrictPortfolioSeo />

        {/* 6. BÖLÜM: Bilgi Bankası & SSS (AI Instant Answers + DynamicFAQ) */}
        <div className="space-y-12">
          {/* AI Instant Snippet Cards (2x2 Grid) */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/10 dark:bg-white/10 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Hukuk & Mevzuat Masası
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
                Tesis Yönetimi Kritik Mevzuat Rehberi
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InstantAnswerCardSeo
                question="Profesyonel Tesis Yönetimi Şirketi ile Çalışmak Aidatları ve Giderleri Nasıl Düşürür?"
                shortAnswer="Profesyonel tesis yönetimi firmaları, yüzlerce projeden oluşan satın alma gücü sayesinde asansör bakımı, jeneratör yakıtı, temizlik kimyasalları ve sigorta gibi ortak gider kalemlerinde %25 ile %35 arasında toptan fiyat avantajı sağlar. Ayrıca önleyici teknik bakım ile büyük arıza masraflarını önler ve reaktif güç cezalarını %100 engelleyerek doğrudan aidat yükünü düşürür."
                bulletPoints={[
                  'Toplu tedarik gücü ile malzeme, bakım ve sigorta primlerinde %30 tasarruf.',
                  'Kompanzasyon panosu ve sayaç takibiyle elektrikte %0 reaktif ceza güvencesi.',
                  'Kapıcı/personel kıdem tazminatı yükü kat maliklerinin üzerinden alınır.',
                  'Otomatik SMS ve kredi kartlı tahsilat ile bütçe açığı ve faiz yükü sıfırlanır.'
                ]}
                lawArticle="634 Sayılı Kat Mülkiyeti Kanunu Madde 20 & 37"
                verifiedBy="Alo Yönetim Mali Teftiş & Bütçe Kurulu"
                category="Tesis Bütçesi & Aidat Tasarrufu"
              />
              <InstantAnswerCardSeo
                question="Site Yönetiminde İşletme Projesi (Bütçe) Nasıl Hazırlanır ve İtiraz Süresi Kaç Gündür?"
                shortAnswer="KMK Madde 37 uyarınca yönetici, seçildikten sonra bir yıllık tahmini gelir ve giderleri, her kat malikine düşecek avans tutarını gösteren bir işletme projesi hazırlar. Proje tüm kat maliklerine veya bağımsız bölümden fiilen yararlananlara imza karşılığı ya da taahhütlü mektupla tebliğ edilir. Tebliğden itibaren 7 gün içinde itiraz edilmezse kesinleşir ve doğrudan icra takibine dayanak teşkil eder."
                bulletPoints={[
                  'Yıllık tahmini elektrik, su, güvenlik, temizlik ve bakım giderleri kalem kalem hesaplanır.',
                  'Giderler KMK m.20 gereği arsa payı veya eşit olarak bağımsız bölümlere paylaştırılır.',
                  '7 günlük itiraz süresi içinde itiraz edilirse Kat Malikleri Kurulu toplanarak nihai kararı verir.',
                  'Kesinleşen işletme projesi İcra ve İflas Kanunu 68/1 maddesindeki resmi belge hükmündedir.'
                ]}
                lawArticle="634 Sayılı Kat Mülkiyeti Kanunu Madde 37"
                verifiedBy="Alo Yönetim Hukuk & Mevzuat Masası"
                category="KMK Mevzuatı & Bütçe Yönetimi"
              />
              <InstantAnswerCardSeo
                question="Tesis Yönetim Şirketi Seçerken Nelere Dikkat Edilmeli ve Hangi Yasal Belgeler İstenmelidir?"
                shortAnswer="Tesis yönetim şirketi seçerken ISO 41001:2018 Entegre Tesis Yönetimi ve TSE HYB 12850 belgelerinin bulunması, fiziki güvenlik için T.C. İçişleri Bakanlığı 5188 lisansı ve Valilik izinlerinin güncel olması zorunludur. Ayrıca şirketin en az 3 aktif referans projesi, 45 dakikalık acil teknik müdahale SLA taahhüdü ve şeffaf dijital mobil muhasebe paneli sorgulanmalıdır."
                bulletPoints={[
                  'ISO 41001, ISO 9001 ve TSE HYB 12850 resmi akreditasyon belgeleri kontrol edilmelidir.',
                  '5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi şirket adına tescilli olmalıdır.',
                  'Kıdem tazminatı ve SGK işveren yükümlülüklerinin şirket garantisinde olduğu sözleşmede yer almalıdır.',
                  'Acil teknik arızalarda maksimum 45 dakika SLA müdahale taahhüdü aranmalıdır.'
                ]}
                lawArticle="ISO 41001:2018 & 5188 Sayılı Özel Güvenlik Kanunu"
                verifiedBy="Alo Yönetim Kalite & Akreditasyon Direktörlüğü"
                category="Kurumsal Standartlar & Şirket Seçimi"
              />
              <InstantAnswerCardSeo
                question="Kat Mülkiyeti Kanunu (KMK 34) Uyarınca Yönetici ve Yönetim Kurulu Hangi Çoğunlukla Seçilir?"
                shortAnswer="634 sayılı KMK Madde 34/4 uyarınca yönetici veya profesyonel yönetim şirketi, kat maliklerinin hem sayı (kat maliki adedi) hem de arsa payı bakımından salt çoğunluğu (%50 + 1) tarafından atanır. İlk toplantıda bu çift çoğunluk sağlanamazsa, ikinci toplantıda da aynı kural aranır. Anlaşma sağlanamazsa sulh hukuk mahkemesince yönetici atanması talep edilebilir."
                bulletPoints={[
                  'Çift çoğunluk kuralı: Hem kat maliki kişi sayısının hem de tapudaki arsa payının %50+1\'i şarttır.',
                  'Yönetim planında aksine bir hüküm yoksa yöneticinin kat maliki olması şart değildir; profesyonel tüzel kişilik seçilebilir.',
                  'Yönetici her yıl kat malikleri kurulunun kanuni yıllık toplantısında yeniden seçilir veya yetkisi yenilenir.',
                  'Seçilen yöneticinin adı, soyadı ve iş adresi ana gayrimenkulün giriş kapısı yanına asılır.'
                ]}
                lawArticle="634 Sayılı Kat Mülkiyeti Kanunu Madde 34 & 35"
                verifiedBy="Alo Yönetim Hukuk Danışmanlığı"
                category="Genel Kurul & Yönetici Seçimi"
              />
            </div>
          </div>

          {/* Site Yönetimi vs. Tesis Yönetimi ve Şirket Seçim Rehberi (Hedef: "site yönetimi", "site yönetim şirketleri") */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">apartment</span>
                <span>Site ve Tesis Yönetimi Karşılaştırmalı Rehberi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
                Site Yönetimi ile Entegre Tesis Yönetimi Arasındaki Farklar Nelerdir?
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-secondary)] mt-2 leading-relaxed font-normal">
                Geleneksel site yönetimi çoğunlukla sadece aidat toplama ve basit temizlik işlerini kapsarken; <strong>profesyonel tesis yönetimi şirketi</strong> olarak Alo Yönetim, ISO 41001 standartlarında 5188 lisanslı güvenlik, mühendislik destekli önleyici teknik servis, KMK 634 hukuki danışmanlığı ve %99.2 aidat tahsilat garantisini tek elden entegre olarak sunar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col gap-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-lg">person_off</span>
                  <span>Geleneksel Apartman & Site Yöneticiliği</span>
                </h3>
                <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
                  <li>• Komşular arası aidat ve para ilişkisinden kaynaklanan huzursuzluklar ve dava riskleri.</li>
                  <li>• SGK ve kıdem tazminatı yükümlülüklerinin doğrudan kat maliklerinin şahsi sorumluluğunda olması.</li>
                  <li>• Arıza anında rastgele usta çağırma ve yüksek maliyetli tamir faturaları.</li>
                  <li>• Kompanzasyon takibi yapılmadığı için ortak elektrik faturasına yansıyan reaktif güç cezaları.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 flex flex-col gap-3">
                <h3 className="font-bold text-base text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500 text-lg">verified</span>
                  <span>Alo Yönetim Profesyonel Site Yönetim Şirketi</span>
                </h3>
                <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-300/90 space-y-2 leading-relaxed">
                  <li>• <strong>KMK 634 & İİK 68 Güvencesi:</strong> Şeffaf işletme projesi, 7/24 mobil uygulama ve %99.2 tahsilat başarısı.</li>
                  <li>• <strong>Sıfır Personel Riski:</strong> Tüm temizlik ve güvenlik personelinin SGK ve kıdem tazminatı güvencemiz altındadır.</li>
                  <li>• <strong>15-25 Dk Acil SLA:</strong> 39 ilçede nöbetçi mobil teknik ekiplerle anında arıza müdahalesi.</li>
                  <li>• <strong>%20 - %30 Net Maliyet Tasarrufu:</strong> Toplu tedarik ve önleyici mühendislik bakımı.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="text-xs text-slate-500">
                İstanbul genelinde 340+ seçkin konut sitesi ve rezidans projesinde aktif yönetim güvencesi.
              </div>
              <div className="flex items-center gap-3">
                <Link href="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Toplu Konut & Site Çözümleri →
                </Link>
                <Link href="/teklif-al" className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-3.5 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                  Siteniz İçin Teklif Alın
                </Link>
              </div>
            </div>
          </div>

          {/* Sıkça Sorulan Sorular */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm">
            <DynamicFAQ faqs={faqs} title={t('fac_faq_title') || 'Tesis Yönetimi Hakkında Sıkça Sorulan Sorular'} />
          </div>
        </div>

      </div>

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <ServiceAuthorityHubSeo
        serviceName="Entegre Profesyonel Tesis Yönetimi"
        serviceCategory="Tesis & Gayrimenkul Yönetimi"
        lawReferences={[
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK) — Tüm Maddeler",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK 634",
            description: "Kat irtifakı, kat mülkiyeti, yönetim planı, genel kurul nisapları, yönetici ve denetçi hak ve sorumluluklarının ana kanuni çerçevesi."
          },
          {
            title: "ISO 41001:2018 Uluslararası Tesis Yönetim Sistemi Standardı",
            sourceName: "Türk Standardları Enstitüsü (TSE)",
            url: "https://www.tse.org.tr",
            badge: "ISO 41001",
            description: "Tesis yönetiminde operasyonel verimlilik, maliyet optimizasyonu, risk yönetimi ve sakin memnuniyeti standartları."
          },
          {
            title: "TSE HYB 12850 — İşyerleri: Bina ve Tesis Yönetim Hizmetleri Kuralları",
            sourceName: "T.C. Sanayi ve Teknoloji Bakanlığı & TSE",
            url: "https://www.tse.org.tr",
            badge: "TSE HYB 12850",
            description: "Profesyonel bina ve tesis yönetimi şirketlerinin sahip olması gereken fiziki, idari ve teknik hizmet yeterlilik kriterleri."
          }
        ]}
        glossaryTerms={[
          {
            slug: "kat-mulkiyeti-kanunu-kmk",
            term: "Kat Mülkiyeti Kanunu (KMK)",
            summary: "Birden çok bağımsız bölümü olan binalarda maliklerin hak ve yükümlülüklerini belirleyen temel kanundur."
          },
          {
            slug: "isletme-projesi",
            term: "İşletme Projesi Nedir?",
            summary: "Sitenin 1 yıllık tahmini gelir-gider bütçesi ve bağımsız bölümlere düşen avans payını gösteren belgedir."
          },
          {
            slug: "toplu-yapi-yonetimi",
            term: "Toplu Yapı Yönetimi (KMK m.66-74)",
            summary: "Birden çok parsel ve bloktan oluşan büyük sitelerde ortak alanların merkezi temsilciler kuruluyla yönetilmesidir."
          },
          {
            slug: "arsa-payi",
            term: "Arsa Payı Nedir?",
            summary: "Bağımsız bölümlere ana taşınmazın değerine oranla tahsis edilen mülkiyet ve ortak gider payıdır."
          }
        ]}
      />

      {/* 7. BÖLÜM: Footer Öncesi SEO, İlgili Hizmetler & Makaleler */}
      <SeoTextSection
        titleKey="tesis_seo_title"
        p1Key="tesis_seo_p1"
        p2Key="tesis_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi" />
      <RelatedArticles pillar="/hizmetler/tesis-yonetimi" />
    </>
  );
}

