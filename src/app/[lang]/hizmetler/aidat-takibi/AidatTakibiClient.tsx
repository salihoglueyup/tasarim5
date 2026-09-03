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
import { ServiceAuthorityHubSeo } from '@/components/seo';

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
      <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-36 md:pt-36 md:pb-48">
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

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('dues_banner_badge') || 'Dijital Finansal Yönetim'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_dues_hero_title') || 'Online Aidat Takibi & <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Şeffaf Muhasebe</span>' }} />
            
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
                {t('btn_get_quote') || 'Teklif Alın'} <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Dues Calculator */}
        <div className="-mt-20 md:-mt-32 relative z-30">
          <DuesCalculator />
        </div>

        {/* ========================================================================= */}
        {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
        {/* ========================================================================= */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-emerald-600 dark:text-emerald-400" aria-hidden="true">payments</span>
              <span>Özet Rehber: Profesyonel Aidat ve Finans Yönetimi Nedir?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              634 KMK m.20 & m.37 Standardı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Profesyonel Aidat ve Finans Yönetimi</strong>;{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                konut siteleri ve toplu yapılar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                çok katlı lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                iş merkezleri ve kurumsal plazaların
              </Link>{' '}
              ortak alan elektrik, su, doğalgaz, personel maaşları, asansör bakımı ve güvenlik gibi tüm cari giderlerinin karşılanması amacıyla yürütülen dijital bütçe ve tahsilat disiplinidir. Amatör bina yönetimlerinde sıkça yaşanan bakiye kayıpları, tahsilat tıkanıklıkları ve komşuluk ihtilaflarını tamamen ortadan kaldıran bu kurumsal model; %99 tahsilat oranı, sıfır bakiye hatası ve anlık denetlenebilir şeffaf muhasebe altyapısı sunar.
            </p>
            <p>
              Tüm finansal süreçlerimiz;{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              ,{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-0.5">
                KMK Madde 37 (İşletme Projesi Tebliği)
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">open_in_new</span>
              </a>
              ,{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=3" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-0.5">
                2004 Sayılı İcra ve İflas Kanunu (İİK m.68)
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">open_in_new</span>
              </a>
              {' '}ve Bankacılık Düzenleme ve Denetleme Kurumu (BDDK) onaylı 256-bit SSL şifrelemeli sanal POS altyapısıyla yürütülür.
            </p>
            <p>
              Finansal yönetim operasyonlarımız;{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>
              {' '}ve{' '}
              <Link href="/hizmetler/hukuk-ve-icra-danismanligi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Hukuk ve İcra Masası
              </Link>{' '}
              ile entegre olarak dört ana operasyonel uzmanlık sütununda icra edilir:
            </p>

            {/* 4 Ana Operasyonel Disiplin Kartı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📱</span> 7/24 Mobil Uygulama & Kredi Kartı ile Online Ödeme
                </span>
                <p className="text-[var(--color-secondary)]">
                  Site sakinleri ve kiracılar için iOS/Android mobil uygulama üzerinden 3D Secure güvencesiyle tek çekim veya taksitli kredi kartı ödemesi, otomatik ödeme talimatı ve anlık borç sorgulama.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📜</span> KMK m.37 İşletme Projesi & Arsa Payı Bütçelendirmesi
                </span>
                <p className="text-[var(--color-secondary)]">
                  Yıllık tahmini gelir-gider avans tablosunun hazırlanması, bağımsız bölüm arsa paylarına göre adil paylaştırılması, noter onaylı tebligatların yapılması ve bütçenin kesinleştirilmesi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>⚖️</span> KMK m.20/2 Yasal Gecikme Tazminatı & İcra Takibi
                </span>
                <p className="text-[var(--color-secondary)]">
                  Gününde ödenmeyen aidatlara aylık %5 yasal gecikme tazminatının işletilmesi, otomatik SMS/WhatsApp ihtar mekanizması ve uzlaşma sağlanamayan durumlarda ilamsız icra takibi koordinasyonu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📊</span> Canlı Şeffaf Bilanço & Bağımsız Denetim Raporu
                </span>
                <p className="text-[var(--color-secondary)]">
                  Kasa ve banka hesap hareketlerinin anlık dijital mutabakatı, tüm fatura ve dekontların sisteme yüklenmesi, denetim kuruluna hazır aylık mali bilanço ve genel kurul ibra raporlaması.
                </p>
              </div>
            </div>

            <p>
              Alo Yönetim ile çalışan tesislerde; kiracı ve mülk sahibi arasındaki{' '}
              <Link href="/sozluk/aidat" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                işletme aidatı
              </Link>{' '}
              ve{' '}
              <Link href="/sozluk/demirbas" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                demirbaş avansı
              </Link>{' '}
              ayrımı sistemsel olarak hatasız yapılır. Kat malikleri kurulu adına açılan müstakil banka hesaplarında toplanan fonlar üzerinde tam şeffaflık sağlanır ve sitenizin işletme bütçesi her zaman pozitif nakit akışında tutulur.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">trending_up</span>
                </span>
                <span>%99 Ortalama Tahsilat Başarısı</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Zamanında hatırlatma, kredi kartı kolaylığı ve kurumsal takip sistemi ile aidatların aksamadan toplanması.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">gavel</span>
                </span>
                <span>%100 KMK 634 Mevzuat Güvencesi</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Resmi işletme projesi tebliği ve İİK m.68 kapsamında itiraz edilemez yasal icra takip altyapısı.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">visibility</span>
                </span>
                <span>7/24 Canlı Şeffaf Denetim</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Her daire sakininin tüm harcama faturalarını ve banka hareketlerini mobil uygulamadan anlık inceleyebilmesi.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {duesPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

        {/* Site Aidat Yönetimi ve Yasal İcra Takibi Rehberi (Hedef: "site aidat takibi", "apartman aidat yönetimi", "aidat icra takibi") */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 sm:p-14 rounded-[3rem] shadow-sm flex flex-col gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">balance</span>
              <span>KMK 634 & İİK 68 Yasal Tahsilat Çerçevesi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
              Site Aidat Yönetimi ve Yasal İcra Takibi Süreci Nasıl İşler?
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-secondary)] mt-2 leading-relaxed font-normal">
              Kat Mülkiyeti Kanunu Madde 20 uyarınca tüm kat malikleri ortak gider avansına katılmakla yükümlüdür. Alo Yönetim olarak; komşuluk ilişkilerini zedelemeden, kurumsal nezaket çerçevesinde dijital hatırlatmalar yapar ve geciken alacaklarda <strong>aylık %5 gecikme tazminatını</strong> işleterek hızlı tahsilat sağlarız.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-[var(--color-primary)]">Şeffaf Bütçe Tebliği</h3>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                KMK m.37 uyarınca yıllık işletme projesi hazırlanır ve taahhütlü/imza karşılığı tebliğ edilerek 7 günde kesinleştirilir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-[var(--color-primary)]">Otomatik Hatırlatma</h3>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Vadesi gelen aidatlar için sakinlere SMS, WhatsApp ve mobil bildirim gönderilir; 7/24 kredi kartı ile ödeme kolaylığı sağlanır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-[var(--color-primary)]">Aylık %5 Gecikme Faizi</h3>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Gününde ödenmeyen aidatlara kanuni zorunluluk gereği aylık %5 gecikme tazminatı tahakkuk ettirilir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="font-bold text-sm text-[var(--color-primary)]">İİK 68 İcra Takibi</h3>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Uzlaşma sağlanamayan durumlarda hukuk departmanımız ilamsız icra takibi başlatarak alacağı faizi ve masraflarıyla tahsil eder.
              </p>
            </div>
          </div>
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

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <ServiceAuthorityHubSeo
        serviceName="Aidat Takibi ve Finansal Yönetim"
        serviceCategory="Finans & Yönetim"
        lawReferences={[
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK) — Madde 20",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK m.20",
            description: "Kat maliklerinin kapıcı, kaloriferci, bahçıvan, bekçi giderlerine eşit; bakım, onarım ve işletme giderlerine ise arsa payı oranında katılma zorunluluğunu ve gecikme halinde aylık %5 gecikme tazminatını düzenler."
          },
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK) — Madde 37",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK m.37",
            description: "Kat malikleri kurulunca kabul edilmiş işletme projesinin kesinleşmesini ve İcra ve İflas Kanunu'nun 68. maddesinin 1. fıkrasında belirtilen resmi belge hükmünde sayılmasını hükme bağlar."
          },
          {
            title: "2004 Sayılı İcra ve İflas Kanunu (İİK) — Madde 68",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=5",
            badge: "İİK m.68",
            description: "İtirazın kesin olarak kaldırılması ve kesinleşmiş işletme projesine dayalı aidat borçlarının ilamsız icra yoluyla tahsilat prosedürünü belirler."
          }
        ]}
        glossaryTerms={[
          {
            slug: "aidat",
            term: "Aidat Nedir?",
            summary: "Ortak giderlerin kat malikleri arasında arsa payı veya eşit bölüşüm esasına göre paylaştırılan yasal katkı payıdır."
          },
          {
            slug: "gecikme-tazminati-5-yasal-faiz",
            term: "Gecikme Tazminatı (%5 Yasal Faiz)",
            summary: "KMK m.20/2 gereğince zamanında ödenmeyen aidat ve avans borçlarına uygulanan aylık %5 yasal tazminat oranıdır."
          },
          {
            slug: "isletme-projesi",
            term: "İşletme Projesi Nedir?",
            summary: "Sitenin 1 yıllık tahmini gelir-gider bütçesi ve her bağımsız bölüme düşen aylık avans payını gösteren resmi belgedir."
          },
          {
            slug: "demirbas",
            term: "Demirbaş ve Yatırım Fonu",
            summary: "Binanın ana yapısını ve değerini artıran büyük tadilat ve yatırımlar için mülk sahiplerinden toplanan fondur."
          }
        ]}
      />

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
