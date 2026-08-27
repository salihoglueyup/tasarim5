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
import { ServiceAuthorityHubSeo } from '@/components/seo';

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
      <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-36 md:pt-36 md:pb-48">
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

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('legal_banner_badge') || 'KMK 634 Hukuki Güvence'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_legal_hero_title') || 'Hukuk & İcra Danışmanlığı <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Yasal Çözüm Ortaklığı</span>' }} />
            
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

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Legal Calculator */}
        <div className="-mt-20 md:-mt-32 relative z-30">
          <LegalCalculator />
        </div>

        {/* ========================================================================= */}
        {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
        {/* ========================================================================= */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400">gavel</span>
              <span>Özet Rehber: Profesyonel KMK Hukuk ve İcra Danışmanlığı Nedir?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              634 KMK & İcra İflas Kanunu Standardı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Profesyonel KMK Hukuk ve İcra Danışmanlığı</strong>;{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                konut siteleri
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                çok katlı lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                iş merkezleri ve plazalar
              </Link>
              {' '}ile{' '}
              <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                endüstriyel tesislerin
              </Link>{' '}
              yönetim kurulları ve kat malikleri arasında doğabilecek tüm yasal ihtilafların, ödenmeyen aidat ve demirbaş alacaklarının, genel kurul iptal davalarının ve yönetim planı tadilatlarının 634 Sayılı Kat Mülkiyeti Kanunu (KMK) çerçevesinde çözülmesini sağlayan kurumsal avukatlık ve danışmanlık disiplinidir.
            </p>
            <p>
              Hukuki süreçlerimiz;{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              ,{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=3" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                2004 Sayılı İcra ve İflas Kanunu (İİK)
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ,{' '}
              <a href="https://karararama.yargitay.gov.tr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                Yargıtay Emsal Karar ve İçtihat Kütüphanesi
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              {' '}ve 6100 Sayılı Hukuk Muhakemeleri Kanunu (HMK) hükümleri çerçevesinde uzman gayrimenkul hukukçularımızca yönetilir.
            </p>
            <p>
              Hukuk masamız;{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>
              ,{' '}
              <Link href="/hizmetler/guvenlik-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                5188 Lisanslı Özel Güvenlik
              </Link>
              {' '}ve{' '}
              <Link href="/hizmetler/aidat-takibi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Şeffaf Aidat Takibi
              </Link>{' '}
              ile entegre olarak dört ana operasyonel uzmanlık sütununda icra edilir:
            </p>

            {/* 4 Ana Operasyonel Disiplin Kartı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>⚖️</span> İlamsız İcra Takibi & Hızlı Alacak Tahsilatı
                </span>
                <p className="text-[var(--color-secondary)]">
                  KMK m.20 ve m.37 uyarınca kesinleşmiş işletme projesine dayalı Örnek No: 7 ilamsız icra takipleri, banka/maaş/araç haciz işlemleri ve aylık %5 yasal gecikme tazminatının tahsili.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>👥</span> Genel Kurul, Hazirun & Divan Başkanlığı Yönetimi
                </span>
                <p className="text-[var(--color-secondary)]">
                  KMK m.29-32 gereği yasal çağrı usulü, taahhütlü tebligatlar, asaleten/vekaleten hazirun kontrolü, divan başkanlığı ve mahkemede iptal edilemez genel kurul karar tutanakları.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📑</span> Yönetim Planı Tadilatı & Tapu Sicil Tescili
                </span>
                <p className="text-[var(--color-secondary)]">
                  KMK m.28 uyarınca tüm kat maliklerinin 4/5 oy çokluğuyla site yönetim planının çağdaş ihtiyaçlara göre revize edilmesi, noter onayı ve Tapu Müdürlüğü kütüğüne tescil işlemleri.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🤝</span> Komşuluk Hukuku, Ortak Alan İşgali & Hâkimin Müdahalesi
                </span>
                <p className="text-[var(--color-secondary)]">
                  KMK m.18 ve m.33 uyarınca ortak alanlara yapılan müdahalelerin önlenmesi, mimari projeye aykırı kaçak yapılaşmanın giderilmesi ve Sulh Hukuk Mahkemesi nezdinde tespit davaları.
                </p>
              </div>
            </div>

            <p>
              Alo Yönetim ile çalışan sitelerde; yöneticilerin ve denetçilerin Kat Mülkiyeti Kanunu ve Türk Ceza Kanunu kapsamındaki tüm şahsi hukuki ve cezai sorumlulukları şirketimizin kurumsal güvencesi altına alınır. Hukuk departmanımız tüm sözleşme ve taşeron anlaşmalarını site lehine teminat altına alır.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">balance</span>
                </span>
                <span>%100 Yargıtay Emsal Uyumu</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Yargıtay 20. Hukuk Dairesi yerleşik içtihatlarına tam uyumlu itiraz edilemez icra ve dava takibi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">verified</span>
                </span>
                <span>%0 Genel Kurul İptal Riski</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Yasal süreler, noter onaylı tebligatlar ve hazirun çoğunluk hesapları ile kusursuz divan yönetimi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">shield</span>
                </span>
                <span>Yöneticilere Tam Hukuki Kalkan</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Yönetim kurulu üyelerinin şahsi tazminat, icra ve ceza davalarına maruz kalma risklerinin sıfırlanması.
              </p>
            </div>
          </div>
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

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <ServiceAuthorityHubSeo
        serviceName="Kat Mülkiyeti Hukuku ve İcra Danışmanlığı"
        serviceCategory="Hukuk & Mevzuat"
        lawReferences={[
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK)",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK 634",
            description: "Kat mülkiyeti ve kat irtifakı rejimine tabi taşınmazlarda hak sahiplerinin borçları, genel kurul kararları ve iptal davaları mevzuatı."
          },
          {
            title: "2004 Sayılı İcra ve İflas Kanunu (İİK)",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=5",
            badge: "İİK 2004",
            description: "Ödenmeyen site aidatları için ilamsız icra takibi, ödeme emri tebliği, haciz ve itirazın kaldırılması süreçlerini düzenler."
          },
          {
            title: "6098 Sayılı Türk Borçlar Kanunu (TBK)",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6098&MevzuatTur=1&MevzuatTertip=5",
            badge: "TBK 6098",
            description: "Kiracılık sözleşmeleri, vekalet ilişkisi, site yönetimi hizmet tedarikçileri sözleşmeleri ve sözleşmeden doğan tazminat sorumlulukları."
          }
        ]}
        glossaryTerms={[
          {
            slug: "kat-mulkiyeti-kanunu-kmk",
            term: "Kat Mülkiyeti Kanunu (KMK)",
            summary: "Bağımsız bölüm maliklerinin hak, yetki ve yasal sorumluluklarını düzenleyen temel mevzuattır."
          },
          {
            slug: "ilamsiz-icra-takibi-aidat-borcu",
            term: "İlamsız İcra Takibi",
            summary: "Mahkeme ilamı olmadan doğrudan icra dairesi aracılığıyla borçluya 7 günlük ödeme emri gönderilmesidir."
          },
          {
            slug: "gecikme-tazminati-5-yasal-faiz",
            term: "Aylık %5 Gecikme Tazminatı",
            summary: "KMK m.20/2 uyarınca gününde ödenmeyen aidatlara kanun gereği işletilen aylık %5 yasal faizdir."
          },
          {
            slug: "yonetici-ibra-edilmemesi-adli-surec",
            term: "Yönetici İbrası ve Denetim",
            summary: "Genel kurulda yönetimin mali ve idari icraatlarının onaylanması veya ibra edilmeyerek dava açılması sürecidir."
          }
        ]}
      />

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
