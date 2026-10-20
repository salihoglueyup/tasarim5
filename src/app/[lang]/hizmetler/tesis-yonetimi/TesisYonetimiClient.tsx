"use client";

import React, { useState } from 'react';
import RelatedServices from '@/components/sections/trust/RelatedServices';
import SeoTextSection from '@/components/sections/trust/SeoTextSection';
import ServiceSeo from '@/components/seo/schema/ServiceSeo';
import DynamicFAQ from '@/components/seo/schema/DynamicFAQ';
import HowToSeo from '@/components/seo/schema/HowToSeo';
import InstantAnswerCardSeo from '@/components/seo/ai-overviews/InstantAnswerCardSeo';
import FacilityLegalTemplateGeneratorSeo from '@/components/seo/facility/FacilityLegalTemplateGeneratorSeo';
import FacilityGroupSecurityTrustSeo from '@/components/seo/facility/FacilityGroupSecurityTrustSeo';
import FacilitySubSectorCrossNav from '@/components/seo/facility/FacilitySubSectorCrossNav';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import FacilityRfpDownloadModalSeo from '@/components/seo/facility/FacilityRfpDownloadModalSeo';
import FacilityDownloadableVaultSeo from '@/components/seo/facility/FacilityDownloadableVaultSeo';
import { VoiceSearchSpeakableSeo } from '@/components/seo/schema/VoiceSearchSpeakableSeo';
import AcademicCitationBoxSeo from '@/components/seo/kmk/AcademicCitationBoxSeo';
import { FacilityOfficialEntityTrustSeo } from '@/components/seo/facility/FacilityOfficialEntityTrustSeo';
import PositionZeroAnswerBox from '@/components/seo/ai-overviews/PositionZeroAnswerBox';
import GoogleAiOverviewGroundingSeo from '@/components/seo/ai-overviews/GoogleAiOverviewGroundingSeo';
import FacilityStickySubnav from '@/components/seo/facility/FacilityStickySubnav';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import RelatedArticles from '@/components/blog/RelatedArticles';
import FacilityTestimonials from '@/components/sections/testimonials/FacilityTestimonials';
import Image from 'next/image';

import Icon from '@/components/ui/branding/Icon';
import TrOnly from '@/components/seo/TrOnly';
import { localePath } from '@/lib/i18n/localePath';
export default function TesisYonetimiClient() {
  const { t, language } = useLanguage();
  const [activeLegalTab, setActiveLegalTab] = useState<'template'>('template');
  const [activeToolTab, setActiveToolTab] = useState<'simulator' | 'rfp' | 'audit'>('simulator');
  const [activeUtilityTab, setActiveUtilityTab] = useState<'ev' | 'utility'>('ev');

  const legalSteps = [
    { name: t('fac_step_1_title') || '1. Ücretsiz Tesis Keşfi ve Risk Analizi', text: t('fac_step_1_desc') || 'Tesisinizin fiziki, teknik, güvenlik ve mali durumunu yerinde inceler, eksikleri raporlarız.' },
    { name: t('fac_step_2_title') || '2. Şeffaf İşletme Projesi ve Bütçe Planı', text: t('fac_step_2_desc') || 'KMK m.37 uyarınca yıllık tahmini gelir-gider ve tasarruf odaklı aidat işletme projesini hazırlarız.' },
    { name: t('fac_step_3_title') || '3. Resmi Kurul Onayı ve Sözleşme', text: t('fac_step_3_desc') || 'Kat malikleri kurulu kararıyla yetkilendirme sonrası noter onaylı devir teslim protokolünü işletiriz.' },
    { name: t('fac_step_4_title') || '4. Entegre Tesis İşletmesi', text: t('fac_step_4_desc') || 'Güvenlik, temizlik, teknik bakım ve dijital aidat yönetimini tek merkezden kesintisiz başlatırız.' }
  ];

  const faqs = [
    {
      question: t('fac_faq_1_q') || 'Profesyonel tesis yönetimi neleri kapsar?',
      answer: t('fac_faq_1_a') || 'Tesis yönetimi; 5188 sayılı kanuna uygun fiziki güvenlik, ortak alan temizliği, asansör ve jeneratör teknik bakımı, aidat takibi, KMK hukuki danışmanlığı, peyzaj ve havuz bakımını tek çatı altında entegre olarak kapsar.'
    },
    {
      question: t('fac_faq_2_q') || 'Tesis yönetimi şirketiyle çalışmak aidatları düşürür mü?',
      answer: t('fac_faq_2_a') || 'Evet. Toplu satın alma gücü, önleyici teknik bakım ve enerji tasarrufu uygulamaları sayesinde işletme giderlerinde tasarruf fırsatları oluşabilir; oran sitenin mevcut sözleşmelerine ve ihtiyaçlarına göre değişir, keşif sonrasında kalem kalem değerlendirilir.'
    },
    {
      question: t('fac_faq_3_q') || 'Yönetim devir süreci ne kadar sürer ve site sakinleri etkilenir mi?',
      answer: t('fac_faq_3_a') || 'Devir teslim süreci ortalama tamamlanır. Mevcut hizmetlerde hiçbir kesinti yaşanmadan, tüm sistemler ve personel entegrasyonu pürüzsüzce gerçekleştirilir.'
    },
    ...[4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => ({
      question: t(`fy_faq_${n}_q` as Parameters<typeof t>[0]),
      answer: t(`fy_faq_${n}_a` as Parameters<typeof t>[0]),
    })),
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

      <VoiceSearchSpeakableSeo
        cssSelectors={[
          '#facility-instant-answer-text',
          '#facility-hero-h1',
        ]}
      />
      
      {/* 1. BÖLÜM: Hero & Değer Önerisi (Titanium & Slate) */}
      <div className="dark relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-28 md:pt-36 md:pb-36 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt={t('fy_hero_alt')} fill className="object-cover object-center opacity-30" priority />
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
            <h1 id="facility-hero-h1" className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-sm" dangerouslySetInnerHTML={{ __html: t('serv_fac_hero_title') || '<span class="text-white block drop-shadow-sm">Entegre ve Profesyonel</span> <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-300 drop-shadow-md block">Tesis Yönetimi</span>' }} />
            

            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mt-4">
              {t('fac_banner_desc') || 'Apartman, site, plaza ve tesisler için güvenlik, temizlik, teknik bakım, peyzaj ve şeffaf aidat takibi. ISO ve 5188 lisanslı kurumsal güvence.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href={localePath('/teklif-al', language)} className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Ücretsiz Keşif & Teklif Al'} <Icon name="arrow_forward" className="text-sm" />
              </Link>
              <Link href={localePath('/hesaplayici', language)} className="bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 hover:border-slate-500 font-bold py-4 px-8 rounded-xl backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2">
                <Icon name="calculate" className="text-sm text-emerald-400" />
                <span>{t('fy_cta_calc')}</span>
              </Link>
            </div>

            {/* Hızlı Güven Rozetleri (Above the Fold Dwell Time Kancası) */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-xs text-white/80">
              <div className="flex items-center gap-1.5">
                <Icon name="bolt" className="text-emerald-400 text-base" />
                <span>{t('fy_badge_1')}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Icon name="shield" className="text-emerald-400 text-base" />
                <span>{t('fy_badge_2')}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Icon name="trending_down" className="text-emerald-400 text-base" />
                <span>{t('fy_badge_3')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sabit Hızlı Alt Navigasyon (Sticky Subnav Anchor Bar) */}
<TrOnly>
      <FacilityStickySubnav />
</TrOnly>

<TrOnly>
      {/* 1. BÖLÜM: Genel Bakış & ISO Metodolojisi */}
      <section id="genel-bakis" className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        
        {/* Google Position Zero (Featured Snippet) & Hızlı Yanıt Kutusu */}
        <PositionZeroAnswerBox
          id="tesis-yonetimi-nedir"
          answerId="facility-instant-answer-text"
          question="Tesis Yönetimi Nedir ve Neleri Kapsar?"
          answer="Tesis Yönetimi (Facility Management); konut siteleri, çok katlı rezidanslar, plazalar ve sanayi tesislerinin 5188 lisanslı güvenlik, kestirimci teknik bakım, endüstriyel temizlik, şeffaf aidat muhasebesi ve 634 sayılı KMK hukuki danışmanlık operasyonlarının tek bir kurumsal merkezden entegre olarak yönetilmesidir."
          standardBadge="634 Sayılı KMK"
          subText="Alo Yönetim, uluslararası entegre tesis yönetimi ile işletme bütçelerinde tasarruf fırsatı ve yazılı SLA kapsamında acil teknik müdahale sunar."
          accentColor="slate"
        />

        {/* Kapsamlı Tesis Yönetimi Standartları & Operasyonel Disiplinler */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-200/40 via-transparent to-transparent dark:from-slate-800/20 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
              <Icon name="verified" className="text-[18px] text-emerald-600 dark:text-emerald-400" />
              <span>Entegre Tesis Yönetimi Metodolojisi</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-[var(--color-surface-variant)] px-3 py-1 rounded-lg border border-[var(--color-outline)]/60">
              634 KMK Standardı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Tesis Yönetimi (Facility Management - FM)</strong>;{' '}
              <Link href="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-[var(--color-primary)] hover:opacity-80 transition-all">
                konut siteleri
              </Link>
              ,{' '}
              <Link href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-[var(--color-primary)] hover:opacity-80 transition-all">
                çok katlı lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/hizmetler/tesis-yonetimi/plaza-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-[var(--color-primary)] hover:opacity-80 transition-all">
                iş merkezleri ve kurumsal plazalar
              </Link>
              , karma yaşam projeleri ve{' '}
              <Link href="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-[var(--color-primary)] hover:opacity-80 transition-all">
                endüstriyel tesislerin
              </Link>{' '}
              fiziki, teknik, idari ve mali tüm operasyonel dinamiklerinin tek bir profesyonel merkezden entegre olarak işletilmesidir. Geleneksel bina yönetiminin getirdiği dar kapsamlı kapıcılık veya münferit temizlik anlayışının çok ötesine geçen bu entegre model; gayrimenkulün tüm yaşam döngüsü (Life-Cycle Costing) boyunca amortisman değerini korumayı, bina kabuğu ile elektromekanik donanımların yıpranmasını önlemeyi, enerji tüketim verimliliğini maksimize etmeyi, operasyonel riskleri proaktif yöntemlerle minimize etmeyi ve sakinler için güvenli, huzurlu, sürdürülebilir ve yüksek prestijli bir yaşam standardı sunmayı hedefler.
            </p>
            <p>
              Profesyonel bir tesisin kesintisiz ve kusursuz işletilmesi; mühendislik, finans, iş hukuku, güvenlik taktikleri ve kat mülkiyeti mevzuatının mükemmel bir senkronizasyonla yürütülmesini gerektirir. Bu doğrultuda tüm operasyonel süreçlerimiz;{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-[var(--color-primary)] hover:opacity-80 transition-all">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              ,{' '}
              <a href="https://www.iso.org/standard/63022.html" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-[var(--color-primary)] hover:opacity-80 transition-all inline-flex items-center gap-0.5">
                uluslararası tesis yönetimi standartları
                <Icon name="open_in_new" className="text-[14px]" />
              </a>
              ,{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-[var(--color-primary)] hover:opacity-80 transition-all inline-flex items-center gap-0.5">
                5188 Sayılı Özel Güvenlik Kanunu
                <Icon name="open_in_new" className="text-[14px]" />
              </a>
              ,{' '}
              <span className="font-semibold text-[var(--color-primary)]">6331 Sayılı İş Sağlığı ve Güvenliği (İSG) Kanunu</span> çerçevesinde yönetilir.
            </p>
            <p>
              Tesislerin yönetiminde reaktif (arıza oluştuktan sonra müdahale eden) değil, kestirimci ve planlı önleyici bir yaklaşım benimsenir. Bu sistematik disiplin; beklenmeyen yüksek arıza masraflarını, bütçe açıklarını ve komşuluk ihtilaflarını kökten engellerken, tesisin tüm fiziksel varlıklarını en yüksek performansta tutar. Mülkünüzün her detayını kapsayan operasyonlarımız dört ana uzmanlık disiplini üzerinde yapılandırılır:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/guvenlik-yonetimi" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <span>🛡️</span> 5188 Lisanslı Özel Güvenlik & Elektronik Koruma
                </Link>
                <p className="text-[var(--color-secondary)]">
                  T.C. İçişleri Bakanlığı ve Valilik izinli lisanslama, üniformalı ve eğitimli güvenlik personeli, CCTV video analiz gözetimi, yapay zeka destekli plaka tanıma (PTS), bariyer/turnike geçiş kontrolü, yangın/deprem/sel acil durum tahliye planları ve yetkisiz giriş önleme protokolleri.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/temizlik-ve-hijyen" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <span>🧹</span> TSE 13811 Onaylı Endüstriyel Temizlik & Hijyen
                </Link>
                <p className="text-[var(--color-secondary)]">
                  Blok girişleri, panoramik asansör kabinleri, kat holleri, kapalı/açık otopark zeminleri, sosyal tesisler (yüzme havuzları, fitness, sauna) ve çöp şutlarının nano-gümüş dezenfeksiyonu; tıbbi/evsel atık ayrıştırma lojistiği, çevre dostu sertifikalı kimyasallar ve periyodik haşere kontrol (ilaçlama) operasyonları.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/teknik-bakim" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <span>⚙️</span> Kestirimci & Önleyici Teknik Mühendislik Servisi
                </Link>
                <p className="text-[var(--color-secondary)]">
                  Asansörlerin A tipi muayene kuruluşu (MMO/TÜRKAK) yeşil etiket koordinasyonu, senkron jeneratör grupları, yangın algılama ve sprinkler sistemleri, hidrofor ve su arıtma tesisatları, BMS bina otomasyonu ve kompanzasyon panosu yönetimi ile reaktif enerji takibi ve yazılı SLA kapsamında acil teknik müdahale.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <Link href="/hizmetler/aidat-takibi" className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <span>📊</span> Şeffaf Dijital Muhasebe, Bütçe & KMK Hukuk Teftişi
                </Link>
                <p className="text-[var(--color-secondary)]">
                  KMK m.37 gereği yıllık gelir-gider avans işletme projesinin noter/taahhütlü resmi tebliği, sanal POS ve banka API entegrasyonlu anlık aidat tahsilatı, otomatik SMS/WhatsApp bilgilendirme, gecikme tazminatı (%5 yasal faiz) hesaplaması, KMK m.20 ve m.33 uyarınca sulh hukuk ve icra takipleri.
                </p>
              </div>
            </div>
            <p>
              Tesislerimizde hayata geçirdiğimiz enerji verimliliği projeleri kapsamında; ortak aydınlatmalarda LED ve sensör dönüşümü, kompanzasyon panosu optimizasyonu ile <strong className="text-[var(--color-primary)] font-semibold">reaktif ceza riskinin azaltılması</strong>, hidrofor basınç optimizasyonu ve çatı Güneş Enerjisi Santrali (GES) fizibilite danışmanlığı sağlanır. çalışan dijital sakin mobil uygulamamız sayesinde kat malikleri; tüm gelir-gider faturalarını, kasa/banka bakiyelerini, bağımsız denetim raporlarını ve teknik arıza loglarını anlık olarak şeffaflıkla denetleyebilir.
            </p>
            <p>
              Alo Yönetim ile çalışan tesislerde; toplu satın alma yöntemleri, önleyici teknik bakım disiplini ve reaktif enerji cezası riskinin azaltılması sayesinde ortak işletme bütçelerinde <strong className="text-emerald-600 dark:text-emerald-400 font-bold">tasarruf fırsatı</strong> elde edilir. Aynı zamanda kat malikleri kurullarının ve bina yöneticilerinin şahsi hukuki ve cezai sorumlulukları, personel kıdem/ihbar tazminatı riskleri ve İSG yükümlülükleri şirketimizin kurumsal tüzel kişilik güvencesi altına alınarak tamamen sıfırlanır, gayrimenkulün piyasa değeri ve prestiji korunur.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Icon name="trending_down" className="text-lg" />
                </span>
                <span>Bütçe Verimliliği</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Toplu tedarik yöntemleri, reaktif ceza riskinin azaltılması ve planlı önleyici teknik bakım güvencesi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-outline)]/80 flex items-center justify-center shrink-0">
                  <Icon name="gavel" className="text-lg" />
                </span>
                <span>KMK 634 & Sıfır Hukuki Risk</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Resmi tebliğli KMK m.37 işletme projesi, noter onaylı devir teslim ve çalışan kıdem tazminatlarının şirketçe üstlenilmesi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-outline)]/80 flex items-center justify-center shrink-0">
                  <Icon name="smartphone" className="text-lg" />
                </span>
                <span>Şeffaf Mobil Yönetim</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                iOS/Android sakin uygulaması, banka entegrasyonlu canlı gelir-gider takibi ve yazılı SLA kapsamında acil mobil servis.
              </p>
            </div>
          </div>
        </div>
      </section>
</TrOnly>

<TrOnly>
      {/* 2. BÖLÜM: 9 Disiplin & Hizmet Kapsamı */}
      <section id="hizmet-kapsami" className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        {null}

        {/* T.C. Resmi Kurumsal Varlık (Entity) & 5188 Güvenlik Ruhsatı Künyesi */}
        <FacilityOfficialEntityTrustSeo />

        {/* 4'lü B2B Tesis Yönetimi Hizmet Segmentleri & Kapsam Matrisi */}
        {null}

        {/* Wave 57: Sektörel Operasyonel Derinlik & Saha Protokolleri Matrisi */}
        {null}

        {/* Site Yönetimi ile Tesis Yönetimi Arasındaki Fark Nedir? (SERP Tablosu) */}
        {null}

        {/* Mülk Tipinize Özel Çözümler (Sub-Sector Hub) */}
        <FacilitySubSectorCrossNav />

        {/* B2B Kurumsal Tesis Yönetimi Hub'ı */}
        {null}
      </section>
</TrOnly>

<TrOnly>
      {/* 3. BÖLÜM: Akıllı Tesis Teşhis & İhale Masası */}
      <section id="tesis-araclari" className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-3">
              <Icon name="dashboard_customize" className="text-[16px]" />
              <span>İnteraktif Kumanda Masası</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              Akıllı Tesis Teşhis, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-slate-600 to-[var(--color-secondary)] dark:from-white dark:via-slate-200 dark:to-slate-400">Maliyet & İhale Merkezi</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-normal mt-2 max-w-2xl mx-auto">
              Tesisinizin ihtiyaç duyduğu norm kadroyu hesaplayın, yönetim kurulu ihale şartnamesi oluşturun, ilçe aidatlarını kıyaslayın ve 10 maddelik denetim listesini çalıştırın.
            </p>

            {/* Tab Selection Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/60">
              <button
                type="button"
                onClick={() => setActiveToolTab('simulator')}
                className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeToolTab === 'simulator'
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md scale-[1.02]'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                }`}
              >
                <Icon name="calculate" className="text-lg" />
                <span>Kadro & Bütçe Simülatörü</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveToolTab('rfp')}
                className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeToolTab === 'rfp'
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md scale-[1.02]'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                }`}
              >
                <Icon name="description" className="text-lg" />
                <span>B2B İhale Şartnamesi (RFP)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveToolTab('audit')}
                className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeToolTab === 'audit'
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md scale-[1.02]'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                }`}
              >
                <Icon name="fact_check" className="text-lg" />
                <span>Tesis Denetim Listesi</span>
              </button>
            </div>
          </div>

          {/* Active Tool Content */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {activeToolTab === 'simulator' && (
                <motion.div key="simulator" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
                  {null}
                </motion.div>
              )}
              {activeToolTab === 'rfp' && (
                <motion.div key="rfp" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
                  <FacilityRfpDownloadModalSeo />
                </motion.div>
              )}
              {activeToolTab === 'audit' && (
                <motion.div key="audit" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
                  {null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Karar Verici Rehber & Şartname Banner */}
        <div className="p-8 rounded-3xl dark bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-white">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              Yönetim Kurulu Karar Rehberi
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Tesis Yönetim Şirketi Nasıl Seçilir? 2026 Kılavuzu
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
              Şirket seçerken yapılan 7 ölümcül hata, 10 maddelik firma denetim skorkartı, 5188 yasal belgeleri ve KMK m.34 devir protokolü rehberimizi inceleyin.
            </p>
          </div>
          <Link
            href="/hizmetler/tesis-yonetimi/rehber"
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm transition-all hover:scale-105 shrink-0 flex items-center gap-2 shadow-lg"
          >
            <span>Seçim Rehberini İncele</span>
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>

        {/* Kıyaslama & Güvenlik Matrisleri */}
        <div className="space-y-12">
          {null}
          <FacilityGroupSecurityTrustSeo />
        </div>

        {/* Referanslar & Müşteri Deneyimi */}
        <div className="space-y-16">
          {null}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm">
            {null}
          </div>
          <FacilityTestimonials />
        </div>
      </section>
</TrOnly>

      {/* 4. BÖLÜM: KMK Hukuk, İSG & Mevzuat Güvencesi */}
      <section id="hukuk-ve-guvenlik" className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        {/* İndirilebilir Resmi Doküman & Şablon Kasası */}
<TrOnly>
        <FacilityDownloadableVaultSeo />
</TrOnly>

        {/* 4 Adımda Geçiş Rehberi */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name={t('fac_steps_title') || 'Tesis Yönetimine Profesyonel Geçiş Rehberi'}
            description={t('fy_howto_desc')}
            steps={legalSteps}
          />
        </div>

<TrOnly>
        {/* Sekmeli Hukuk Masası: Emsal Kararlar & Karar Şablonları */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-6 sm:p-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Icon name="gavel" className="text-[16px]" />
              634 KMK Karar Şablonu
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
              Kat Mülkiyeti Hukuku & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-slate-600 to-[var(--color-secondary)]">Resmi Belge Masası</span>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-normal mt-1">
              Siteniz için genel kurul karar şablonu üretin; son hâli için hukuk danışmanınıza onaylatın.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/70 w-fit mx-auto">
              <button
                type="button"
                onClick={() => setActiveLegalTab('template')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeLegalTab === 'template'
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                <Icon name="edit_document" className="text-lg" />
                <span>KMK 634 Karar & Şablon Jeneratörü</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
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

        {/* AI Instant Snippet Cards (2x2 Grid) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] text-[var(--color-primary)] border border-[var(--color-outline)]/70 text-xs font-bold uppercase tracking-wider mb-2">
              <Icon name="psychology" className="text-[16px]" />
              Hukuk & Mevzuat Masası
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
              Tesis Yönetimi Kritik Mevzuat Rehberi
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InstantAnswerCardSeo
              question="Profesyonel Tesis Yönetimi Şirketi ile Çalışmak Aidatları ve Giderleri Nasıl Düşürür?"
              shortAnswer="Profesyonel tesis yönetimi firmaları, toplu satın alma yöntemleri sayesinde asansör bakımı, jeneratör yakıtı, temizlik kimyasalları ve sigorta gibi ortak gider kalemlerinde fiyat avantajı sağlayabilir; sonuç sitenin mevcut sözleşmelerine göre değişir. Ayrıca önleyici teknik bakım büyük arıza masraflarının azaltılmasına, reaktif güç takibi ise cezaların önlenmesine yardımcı olabilir."
              bulletPoints={[
                'Toplu tedarik gücü ile malzeme, bakım ve sigorta primlerinde tasarruf fırsatı.',
                'Kompanzasyon panosu ve sayaç takibiyle elektrikte reaktif güç takibi.',
                'Kapıcı/personel kıdem tazminatı yükü kat maliklerinin üzerinden alınır.',
                'Otomatik SMS ve kredi kartlı tahsilat ile bütçe açığı ve faiz yükü sıfırlanır.'
              ]}
              lawArticle="634 Sayılı Kat Mülkiyeti Kanunu Madde 20 & 37"
              verifiedBy="Alo Yönetim Mali Teftiş & Bütçe Kurulu"
              category="Tesis Bütçesi & Aidat Tasarrufu"
            />
            <InstantAnswerCardSeo
              question="Site Yönetiminde İşletme Projesi (Bütçe) Nasıl Hazırlanır ve Nasıl Kesinleşir?"
              shortAnswer="7579 sayılı Kanun (22.05.2026) ile değişik KMK Madde 37 uyarınca yönetici, bir yıllık tahmini gelir ve giderleri ile her kat malikine düşecek avans tutarını gösteren işletme projesini hazırlar ve Kat Malikleri Kurulunun onayına sunar. Onaylı proje yoksa yönetici gecikmeksizin geçici bir işletme projesi yapar (mevcut proje varsa artış yeniden değerleme oranını aşamaz), kat maliklerine tebliğ eder ve en geç 3 ay içinde kurula onaylatır. Kesinleşen işletme projesi doğrudan icra takibine dayanak teşkil eder."
              bulletPoints={[
                'Yıllık tahmini elektrik, su, güvenlik, temizlik ve bakım giderleri kalem kalem hesaplanır.',
                'Giderler KMK m.20 gereği arsa payı veya eşit olarak bağımsız bölümlere paylaştırılır.',
                '7579 sayılı Kanun gereği geçici projede artış yeniden değerleme oranını (%25,49) aşamaz ve 3 ay içinde Kat Malikleri Kuruluna onaylatılır.',
                'Kesinleşen işletme projesi İcra ve İflas Kanunu 68/1 maddesindeki resmi belge hükmündedir.'
              ]}
              lawArticle="634 Sayılı Kat Mülkiyeti Kanunu Madde 37 (7579 s. Kanun)"
              verifiedBy="Alo Yönetim Hukuk & Mevzuat Masası"
              category="KMK Mevzuatı & Bütçe Yönetimi"
            />
            <InstantAnswerCardSeo
              question="Tesis Yönetim Şirketi Seçerken Nelere Dikkat Edilmeli ve Hangi Yasal Belgeler İstenmelidir?"
              shortAnswer="Tesis yönetim şirketi seçerken akredite kuruluşlarca verilmiş güncel ISO yönetim sistemi belgelerinin (ör. ISO 45001 İSG, ISO 14001 Çevre) bulunması, fiziki güvenlik için T.C. İçişleri Bakanlığı 5188 lisansı ve Valilik izinlerinin güncel olması zorunludur. Ayrıca şirketin doğrulanabilir referanslar, yazılı acil teknik müdahale SLA hedefi ve şeffaf dijital mobil muhasebe paneli sorgulanmalıdır."
              bulletPoints={[
                'ISO belgelerinin akreditasyonu, geçerlilik tarihi ve belgelendirme kuruluşu üzerinden doğrulanmalıdır.',
                '5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi şirket adına tescilli olmalıdır.',
                'Kıdem tazminatı ve SGK işveren yükümlülüklerinin şirket sorumluluğunda olduğu sözleşmede yer almalıdır.',
                'Acil teknik arızalarda maksimum yazılı SLA ile müdahale süresi taahhüdü aranmalıdır.'
              ]}
              lawArticle="5188 Sayılı Özel Güvenlik Kanunu"
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

        {/* Sitelerde 6331 İSG Kanunu, Risk Analizi ve Acil Durum Ekipleri Rehberi */}
        {null}

        {/* Teknik ve hukuki doğrulamalar */}
        {null}
        {null}

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
              title: "uluslararası tesis yönetimi standartları Standardı",
              sourceName: "Türk Standardları Enstitüsü (TSE)",
              url: "https://www.tse.org.tr",
              badge: "KMK 634",
              description: "Tesis yönetiminde operasyonel verimlilik, maliyet optimizasyonu, risk yönetimi ve sakin memnuniyeti standartları."
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
              slug: "toplu-yapi-yonetimi-kmk-ek-madde-69",
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

        {/* Akademik & Hukuki Atıf Oluşturucu */}
        <AcademicCitationBoxSeo
          pageUrl="/hizmetler/tesis-yonetimi"
          pageTitle="Entegre Tesis Yönetimi Standartları ve Kurumsal SLA Kılavuzu"
        /></TrOnly>

      </section>

<TrOnly>
      {/* 5. BÖLÜM: Yıllık Periyodik Bakım, Enerji & Altyapı Yönetimi */}
      <section id="bakim-ve-enerji" className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        {/* Tesis Yönetimi 12 Aylık Periyodik Bakım ve Denetim Takvimi */}
        {null}

        {/* Binalarda Enerji, EV Şarj & Altyapı Sayaç Devir Kılavuzu (Tabbed Hub) */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Icon name="bolt" className="text-[16px]" />
              <span>Enerji & Kurumsal Altyapı Yönetimi</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
              Sürdürülebilir Enerji, EV Şarj & Altyapı Devir Kılavuzu
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-normal mt-1">
              Ortak alan elektrikli araç şarj istasyonu kurulumu ile İSKİ, BEDAŞ ve İGDAŞ abonelik devir süreçlerini tek tıkla inceleyin.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/70 w-fit mx-auto">
              <button
                type="button"
                onClick={() => setActiveUtilityTab('ev')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeUtilityTab === 'ev'
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                <Icon name="ev_station" className="text-lg" />
                <span>EV Şarj İstasyonu & EKB Rehberi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveUtilityTab('utility')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeUtilityTab === 'utility'
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                <Icon name="sync_alt" className="text-lg" />
                <span>39 İlçe İSKİ, BEDAŞ & İGDAŞ Devir Rehberi</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              {activeUtilityTab === 'ev' && (
                <motion.div key="ev" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
                  {null}
                </motion.div>
              )}
              {activeUtilityTab === 'utility' && (
                <motion.div key="utility" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
                  {null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
</TrOnly>

      {/* 6. BÖLÜM: Fiyatlandırma, 39 İlçe Portföyü & Sıkça Sorulan Sorular */}
      <section id="fiyat-ve-sss" className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        {/* Kurumsal Plaza & Tesis Yönetimi Fiyatlandırma Kataloğu */}
<TrOnly>
        {null}
</TrOnly>

        {/* 39 İlçe Hub & Spoke Tesis Yönetimi Portföy Ağı */}
<TrOnly>
        {null}
</TrOnly>

        {/* Sıkça Sorulan Sorular */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('fac_faq_title') || 'Tesis Yönetimi Hakkında Sıkça Sorulan Sorular'} emitSchema={true} />
        </div>

        {/* Google AI Overviews, SGE & Gemini Grounding Otorite Merkezi */}
<TrOnly>
        <GoogleAiOverviewGroundingSeo
          filterIds={['site-vs-tesis', 'plaza-bms-enerji', 'toplu-yapi-kmk66', 'asansor-yesil-etiket', 'kmk37-itiraz', 'ev-sarj-istasyonu']}
          title="Tesis Yönetiminde Yapay Zekaya Sorun: KMK Standartları"
          subtitle="Google AI Overviews (SGE), Gemini ve Perplexity için doğrulanmış kurumsal tesis yönetimi, BMS otomasyonu ve enerji optimizasyonu bilgi seti."
        />
</TrOnly>
      </section>

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


