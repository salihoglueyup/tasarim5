"use client";

import { useState } from 'react';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import { InstantAnswerCardSeo, InteractiveCleaningAuditRadarSeo } from '@/components/seo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { RelatedArticles } from '@/components';
import CleaningCalculator from '@/components/sections/CleaningCalculator';
import CleaningTestimonials from '@/components/sections/CleaningTestimonials';
import Image from 'next/image';
import { ServiceAuthorityHubSeo } from '@/components/seo';

export default function TemizlikVeHijyenClient() {
  const { t } = useLanguage();

  const cleaningHighlights = [
    {
      title: t('clean_feat_1_title') || 'Çevre Dostu & TSE Belgeli Kimyasallar',
      desc: t('clean_feat_1_desc') || 'Yüzeylere ve insan sağlığına zarar vermeyen, Sağlık Bakanlığı ve TSE onaylı sertifikalı temizlik ürünleri.',
      icon: "eco",
      color: "from-emerald-700 to-teal-900"
    },
    {
      title: t('clean_feat_2_title') || 'Endüstriyel Temizlik Makineleri',
      desc: t('clean_feat_2_desc') || 'Binicili zemin yıkama otomatları, yüksek basınçlı yıkama ve endüstriyel vakum makineleri ile kusursuz ortak alan hijyeni.',
      icon: "cleaning_services",
      color: "from-slate-700 to-slate-900"
    },
    {
      title: t('clean_feat_3_title') || '4 Mevsim Periyodik Temizlik Takvimi',
      desc: t('clean_feat_3_desc') || 'Günlük blok içi temizliği, haftalık otopark ve cam yıkaması, aylık detaylı ortak alan dezenfeksiyon planlaması.',
      icon: "calendar_month",
      color: "from-blue-700 to-indigo-900"
    },
    {
      title: t('clean_feat_4_title') || 'Hijyen & Dezenfeksiyon Standartları',
      desc: t('clean_feat_4_desc') || 'Asansör kabinleri, kapı kolları, tırabzanlar ve çocuk oyun alanlarında yüksek temas yüzeyi mikrobiyal arındırma.',
      icon: "sanitizer",
      color: "from-slate-600 to-slate-800"
    }
  ];

  const seasonalMatrix = [
    { 
      id: "ilkbahar",
      season: t('clean_matrix_season_1') || 'İlkbahar', 
      task: t('clean_matrix_task_1') || 'Kış sonrası blok dış cephe cam temizliği, otopark zeminlerinin tazyikli suyla yıkanması ve bahçe yollarının yosun temizliği.',
      icon: "local_florist",
      color: "text-slate-500",
      bg: "bg-slate-500/10"
    },
    { 
      id: "yaz",
      season: t('clean_matrix_season_2') || 'Yaz', 
      task: t('clean_matrix_task_2') || 'Açık havuz çevresi ve güneşlenme teraslarının günlük hijyeni, çöp konteynerlerinin kokusuzlaştırılması ve sinek/haşere önleyici zemin temizliği.',
      icon: "light_mode",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    { 
      id: "sonbahar",
      season: t('clean_matrix_season_3') || 'Sonbahar', 
      task: t('clean_matrix_task_3') || 'Çatı olukları ve yağmur ızgaralarının yapraklardan arındırılması, kapalı otopark drenaj kanallarının yıkanması.',
      icon: "air",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    { 
      id: "kis",
      season: t('clean_matrix_season_4') || 'Kış', 
      task: t('clean_matrix_task_4') || 'Bina girişlerinde paspas sistemleri ve tuzlama sonrası zemin mermer/granit koruma cilalama işlemleri.',
      icon: "ac_unit",
      color: "text-slate-400 dark:text-slate-300",
      bg: "bg-slate-400/10 dark:bg-slate-300/10"
    }
  ];

  const cleaningSteps = [
    { name: '1. Saha Keşfi ve Hijyen İhtiyaç Analizi', text: 'Sitenin blok sayısı, kat adetleri, zemin tipleri (mermer, granit, epoksi) ve ortak alan yoğunluğu incelenerek özelleştirilmiş temizlik takvimi çıkarılır.' },
    { name: '2. Endüstriyel Ekipman ve Sertifikalı Kimyasal Tedariki', text: 'Zemin otomatları, buharlı temizleyiciler ve Sağlık Bakanlığı onaylı çevre dostu temizlik ürünleri sahaya konuşlandırılır.' },
    { name: '3. Düzenli ve Kontrollü Temizlik Uygulaması', text: 'Sabit ve vardiyalı temizlik personelleri, kontrol listelerine (check-list) uygun biçimde blok içlerini ve otoparkları temizler.' },
    { name: '4. Süpervizör Denetimi ve Fotoğraflı Raporlama', text: 'Temizlik amirlerimizce günlük kalite denetimi yapılır; site yönetimine fotoğraflı dijital hijyen raporu sunulur.' }
  ];

  const faqs = [
    {
      question: 'Site ve apartman temizliği hangi periyotlarla yapılır?',
      answer: 'Sitenizin büyüklüğü ve yönetim planına göre günlük kat temizliği, haftalık detaylı ortak alan yıkaması ve aylık kapalı otopark/zemin otomatı uygulamaları şeklinde planlanır. Tüm takvim şeffaf olarak ilan edilir.'
    },
    {
      question: 'Kullanılan temizlik kimyasalları insan sağlığı ve evcil hayvanlar için güvenli mi?',
      answer: 'Evet. Kullandığımız tüm ürünler Sağlık Bakanlığı ve TSE onaylı, biyolojik olarak parçalanabilir, ağır kimyasal içermeyen çevre dostu profesyonel endüstriyel temizleyicilerdir.'
    },
    {
      question: 'Temizlik personelinin SGK, kıyafet ve iş güvenliği (İSG) sorumluluğu kime aittir?',
      answer: 'Tüm personelin SGK girişleri, maaş ödemeleri, kıdem/ihbar tazminatları, iş elbiseleri ve 6331 sayılı İSG Kanunu kapsamındaki periyodik eğitimleri Alo Yönetim kurumsal sorumluluğundadır; site yönetimine hiçbir yasal risk yansımaz.'
    },
    {
      question: 'Kapalı otopark ve sığınak temizlikleri nasıl gerçekleştiriliyor?',
      answer: 'Kapalı otopark zeminleri endüstriyel binicili zemin yıkama otomatları ve yağ sökücü özel solüsyonlarla yıkanır; sığınak ve teknik alanlar ise periyodik olarak dezenfekte edilip tozlardan arındırılır.'
    }
  ];

  const [activeSeason, setActiveSeason] = useState(seasonalMatrix[0]);

  return (
    <>
      <ServiceSeo 
        serviceType="Temizlik ve Hijyen Yönetimi"
        description="Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği ve dezenfeksiyonu."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Temizlik"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-36 md:pt-36 md:pb-48">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop" alt="Temizlik ve Hijyen Yönetimi - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
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
              {t('clean_banner_badge') || 'Endüstriyel Hijyen Standartları'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_clean_hero_title') || 'Profesyonel Temizlik & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Ortak Alan Hijyeni</span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Temizlik ve Hijyen Yönetimi' }}
              ratingValue={4.9}
              reviewCount={245}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('clean_banner_desc') || 'Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Teklif Alın'} <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Cleaning Calculator */}
        <div className="-mt-20 md:-mt-32 relative z-30">
          <CleaningCalculator />
        </div>

        {/* ========================================================================= */}
        {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
        {/* ========================================================================= */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-emerald-600 dark:text-emerald-400" aria-hidden="true">clean_hands</span>
              <span>Özet Rehber: Profesyonel Site ve Tesis Temizlik Yönetimi Nedir?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              TSE 13811 & ISO 9001 Hijyen Standardı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Profesyonel Tesis Temizlik ve Hijyen Yönetimi</strong>;{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                konut siteleri
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                çok katlı lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                iş merkezleri ve plazalar
              </Link>
              {' '}ile{' '}
              <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                endüstriyel tesislerin
              </Link>{' '}
              tüm ortak kullanım alanlarının, blok içi hollerinin, asansör kabinlerinin ve otopark zeminlerinin uluslararası sanitasyon standartlarında temiz tutulmasını sağlayan kurumsal operasyon disiplinidir. Geleneksel bina kapıcılığı yerine endüstriyel zemin yıkama makineleri, mikrofiber teknolojisi ve Sağlık Bakanlığı onaylı çevre dostu kimyasallarla çalışılarak mülkünüzün prestiji ve sakin sağlığı en üst düzeyde korunur.
            </p>
            <p>
              Temizlik operasyonlarımız;{' '}
              <a href="https://www.tse.org.tr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-0.5">
                TSE 13811 Hijyen ve Sanitasyon Yönetim Sistemi
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">open_in_new</span>
              </a>
              ,{' '}
              <a href="https://www.saglik.gov.tr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-0.5">
                T.C. Sağlık Bakanlığı Biyosidal Ürün Ruhsat Standartları
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">open_in_new</span>
              </a>
              ,{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              {' '}ve 6331 Sayılı İş Sağlığı ve Güvenliği Kanunu çerçevesinde sertifikalı personellerle yürütülür.
            </p>
            <p>
              Hijyen yönetimimiz;{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>
              ,{' '}
              <Link href="/hizmetler/guvenlik-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                5188 Lisanslı Özel Güvenlik
              </Link>
              {' '}ve{' '}
              <Link href="/hizmetler/teknik-bakim" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Teknik Bakım Servisi
              </Link>{' '}
              ile entegre olarak dört ana operasyonel uzmanlık sütununda icra edilir:
            </p>

            {/* 4 Ana Operasyonel Disiplin Kartı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🏢</span> Blok İçi Kat Holleri & Panoramik Asansör Hijyeni
                </span>
                <p className="text-[var(--color-secondary)]">
                  Günlük mermer/granit zemin paspaslama, paslanmaz asansör kabin ve ayna dezenfeksiyonu, tırabzanlar, posta kutuları ve kapı kollarında yüksek temas yüzeyi arındırması.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🚜</span> Kapalı & Açık Otopark Zemin Otomatı Yıkaması
                </span>
                <p className="text-[var(--color-secondary)]">
                  Binicili endüstriyel zemin yıkama otomatları, epoksi/helikopter perdahlı beton zemin yağ lekesi arındırma, tazyikli yıkama ve drenaj ızgara kanallarının temizlenmesi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🏊</span> Sosyal Tesis, Havuz Çevresi & Fitness Dezenfeksiyonu
                </span>
                <p className="text-[var(--color-secondary)]">
                  Açık/kapalı yüzme havuzu güverte hijyeni, sauna ve buhar odalarının buharlı sterilizasyonu, fitness aletleri nano-gümüş dezenfeksiyonu ve soyunma odası sanitasyonu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>♻️</span> Sıfır Atık Yönetimi, Çöp Şutu & Haşere İlaçlama
                </span>
                <p className="text-[var(--color-secondary)]">
                  Sıfır Atık Yönetmeliği uyumlu geri dönüştürülebilir atık lojistiği, çöp şutlarının basınçlı koku giderme dezenfeksiyonu ve periyodik biyosidal haşere/kemirgen ilaçlaması.
                </p>
              </div>
            </div>

            <p>
              Alo Yönetim ile çalışan tesislerde; tüm temizlik personellerinin SGK primleri, maaşları, kıdem ve ihbar tazminatları ile 6331 sayılı İSG mevzuatı yükümlülükleri şirketimizce üstlenilir. Bina yöneticilerinin ve kat malikleri kurullarının işveren sorumluluğundan doğan şahsi hukuki ve cezai riskleri tamamen sıfırlanır.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">eco</span>
                </span>
                <span>%100 TSE & Çevre Dostu Kimyasal</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                İnsan sağlığına, çocuklara ve evcil hayvanlara zararsız Sağlık Bakanlığı onaylı sertifikalı hijyen ürünleri.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">precision_manufacturing</span>
                </span>
                <span>Endüstriyel Makine Parkuru</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Binicili zemin yıkama otomatları, endüstriyel vakum ve yüksek basınçlı yıkama teknolojisiyle kusursuz temizlik.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">verified_user</span>
                </span>
                <span>Sıfır İş Hukuku Riski</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Temizlik personeli kıdem, ihbar, SGK ve İSG sorumluluklarının kurumsal olarak şirketimizce üstlenilmesi.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cleaningHighlights.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-5 shadow-sm group hover:shadow-xl transition-all overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">{c.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{c.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 4-Step HowTo Process */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name="Profesyonel Tesis ve Ortak Alan Temizlik Protokolü"
            description="Site ve rezidanslarda ortak kullanım alanlarının hijyenik ve düzenli tutulması için uyguladığımız 4 aşamalı temizlik protokolümüz."
            steps={cleaningSteps}
          />
        </div>

        {/* Interactive Seasonal Matrix Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-10">
            <div className="max-w-lg">
              <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                {t('clean_matrix_badge') || 'Mevsimsel Hijyen Programı'}
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('clean_matrix_title') || 'Dönemsel Bakım ve Temizlik Matrisi'}</h2>
            </div>
            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-white/5 p-2 rounded-2xl">
              {seasonalMatrix.map(season => (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    activeSeason.id === season.id 
                      ? 'bg-white dark:bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm' 
                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm ${activeSeason.id === season.id ? season.color : ''}`}>
                    {season.icon}
                  </span>
                  {season.season}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 sm:h-48 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-12 rounded-full ${activeSeason.bg} ${activeSeason.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined" aria-hidden="true">{activeSeason.icon}</span>
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)]">{activeSeason.season} {t('clean_matrix_period') || 'Uygulaması'}</h3>
                </div>
                <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed max-w-3xl">
                  {activeSeason.task}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Temizlik & Hijyen Denetim Radarı */}
        <InteractiveCleaningAuditRadarSeo districtName="İstanbul" />

        {/* AI Overviews & Position Zero Snippet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InstantAnswerCardSeo
            question="Site Temizlik Personelinin Kıdem ve İhbar Tazminatı Sorumluluğu Kime Aittir?"
            shortAnswer="Bordrolu personel çalıştıran sitelerde tüm kıdem, ihbar, yıllık izin ve SGK yükümlülükleri doğrudan kat maliklerine aittir. Hizmet alımı (taşeron/entegre tesis yönetimi) modeliyle Alo Yönetim'den temin edilen temizlik personellerinde ise tüm yasal, mali ve tazminat sorumlulukları şirketimize aittir; site yönetimine hiçbir hukuki veya maddi risk rücu etmez."
            bulletPoints={[
              'Doğrudan istihdamda yöneticiler ve kat malikleri müştereken müteselsil sorumludur.',
              'Profesyonel tesis yönetiminde tüm SGK, İSG ve tazminat garantisi şirketimizdedir.',
              'Personel izin ve rapor durumlarında anında ikame personel yönlendirilir.',
              '6331 sayılı İSG mevzuatı gereği periyodik eğitim ve sağlık raporları eksiksiz tutulur.'
            ]}
            lawArticle="4857 Sayılı İş Kanunu & 6331 Sayılı İSG Kanunu"
            verifiedBy="Alo Yönetim Hukuk ve Bordro Denetim Kurulu"
            category="İş Hukuku & Personel Yönetimi"
          />
          <InstantAnswerCardSeo
            question="Apartman Ortak Alan Temizliği Hangi Standartlarda ve Periyotlarda Yapılmalıdır?"
            shortAnswer="Apartman ve site ortak alanlarında; giriş holleri ve asansör kabinleri günlük olarak dezenfekte edilmeli, kat koridorları ve merdivenler haftada en az 2 gün mop/otomat ile yıkanmalı, kapalı otoparklar ise ayda bir binicili zemin yıkama makineleriyle yağdan arındırılmalıdır. Kullanılan tüm kimyasallar Sağlık Bakanlığı ve TSE onaylı olmalıdır."
            bulletPoints={[
              'Günlük: Giriş kapıları, interkom panelleri, asansörler ve çöp transferi.',
              'Haftalık: Yangın merdivenleri, tırabzanlar, paspaslar ve posta kutuları.',
              'Aylık: Kapalı otopark zemin otomatı yıkaması, sığınak ve teknik hacim temizliği.',
              'Sezonluk: Dış cephe cam temizliği ve yağmur ızgara drenaj kanallarının açılması.'
            ]}
            lawArticle="TSE 13811 Hijyen ve Sanitasyon Yönetim Standardı"
            verifiedBy="Alo Yönetim Hijyen ve Kimyasal Güvenlik Masası"
            category="Hijyen & Temizlik Standartları"
          />
        </div>

        {/* Cleaning Specific Social Proof */}
        <CleaningTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('clean_faq_title') || 'Temizlik ve Hijyen Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <ServiceAuthorityHubSeo
        serviceName="Endüstriyel Temizlik ve Ortak Alan Hijyeni"
        serviceCategory="Temizlik & Hijyen"
        lawReferences={[
          {
            title: "Sıfır Atık Yönetmeliği",
            sourceName: "T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
            url: "https://sifiratik.gov.tr",
            badge: "Sıfır Atık",
            description: "Sitelerde ve toplu konutlarda ayrıştırılmış atık toplama kutuları, geçici atık depolama alanı ve Sıfır Atık Belgesi alınması kuralları."
          },
          {
            title: "TSE 13811 Hijyen ve Sanitasyon Yönetim Standardı",
            sourceName: "Türk Standardları Enstitüsü (TSE)",
            url: "https://www.tse.org.tr",
            badge: "TSE 13811",
            description: "Toplu yaşam alanlarında bulaşıcı hastalık riskini önleyen dezenfeksiyon protokolleri ve kimyasal güvenlik kriterleri."
          },
          {
            title: "T.C. Sağlık Bakanlığı Biyosidal Ürünler ve Halk Sağlığı Yönetmeliği",
            sourceName: "T.C. Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü",
            url: "https://www.saglik.gov.tr",
            badge: "Sağlık Bakanlığı Onaylı",
            description: "Ortak alanlarda kullanılacak dezenfektan ve yüzey temizleyicilerin ruhsatlandırma ve insan sağlığına uygunluk şartları."
          }
        ]}
        glossaryTerms={[
          {
            slug: "atik-yonetimi-ve-sifir-atik-belgesi",
            term: "Sıfır Atık Belgesi & Yönetimi",
            summary: "Sitelerde geri dönüştürülebilir atıkların kaynağında ayrıştırılarak çevre mevzuatına uygun şekilde bertaraf edilmesidir."
          },
          {
            slug: "su-deposu-dezenfeksiyonu-ve-analizi",
            term: "Su Deposu Dezenfeksiyonu",
            summary: "İçme ve kullanma suyu depolarının 6 ayda bir klorlanarak biyolojik film tabakasından arındırılması işlemidir."
          },
          {
            slug: "vektor-ve-hasere-ilaclama-biyosidal",
            term: "Biyosidal İlaçlama ve Dezenfeksiyon",
            summary: "Böcek, kemirgen ve haşerelere karşı Sağlık Bakanlığı onaylı kokusuz ve çevre dostu ilaçlarla yapılan uygulamadır."
          },
          {
            slug: "havuz-bakimi-ve-kimyasal-operasyonu",
            term: "Havuz Hijyeni ve Kimyasal Denge",
            summary: "Ortak açık ve kapalı yüzme havuzlarında pH, klor ve yosun önleyici dengesinin günlük olarak ölçülüp tutulmasıdır."
          }
        ]}
      />

      <SeoTextSection
        titleKey="temizlik_seo_title"
        p1Key="temizlik_seo_p1"
        p2Key="temizlik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/temizlik-ve-hijyen" />
      <RelatedArticles pillar="/hizmetler/temizlik-ve-hijyen" />
    </>
  );
}
