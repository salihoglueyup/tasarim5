"use client";

import RelatedServices from '@/components/sections/RelatedServices';
import { 
  SeoTextSection, 
  ServiceSeo, 
  AggregateRatingSeo, 
  DynamicFAQ, 
  HowToSeo,
  SecurityTrustBadgeGridSeo,
  SecurityComparisonTableSeo,
  SecurityTechMatrixSeo,
  DistrictSecurityClusterSeo,
  InteractiveSecurityRiskRadarSeo,
  InstantAnswerCardSeo,
  SecurityLegalTemplateGeneratorSeo
} from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { RelatedArticles } from '@/components';
import SecurityCalculator from '@/components/sections/SecurityCalculator';
import SecurityTestimonials from '@/components/sections/SecurityTestimonials';
import EmergencyDisasterAuditSeo from '@/components/seo/EmergencyDisasterAuditSeo';
import { ServiceAuthorityHubSeo } from '@/components/seo';

export default function GuvenlikYonetimiClient() {
  const { t } = useLanguage();

  const securityFeatures = [
    {
      title: t('sec_feat_1_title') || '5188 Lisanslı Özel Güvenlik',
      desc: t('sec_feat_1_desc') || 'Emniyet Genel Müdürlüğü ve Valilik onaylı, 5188 sayılı kanun kapsamında yetkilendirilmiş uzman güvenlik personeli.',
      icon: "verified_user",
      color: "from-slate-700 to-slate-900"
    },
    {
      title: t('sec_feat_2_title') || '7/24 CCTV & Kamera İzleme Merkezi',
      desc: t('sec_feat_2_desc') || 'Kör nokta bırakmayan yüksek çözünürlüklü IP kamera sistemleri, yapay zeka destekli hareket ve sınır ihlal alarmları.',
      icon: "center_focus_strong",
      color: "from-blue-700 to-indigo-900"
    },
    {
      title: t('sec_feat_3_title') || 'Plaka Tanıma & Turnike Geçiş Sistemi',
      desc: t('sec_feat_3_desc') || 'Site sakinleri ve misafir araçlar için otomatik PTS (Plaka Tanıma Sistemi) ve RFID kartlı/biyometrik yaya geçiş kontrolü.',
      icon: "qr_code_scanner",
      color: "from-slate-600 to-slate-800"
    },
    {
      title: t('sec_feat_4_title') || 'Devriye Tur Kontrol ve Raporlama',
      desc: t('sec_feat_4_desc') || 'Karekodlu ve GPS destekli gece/gündüz devriye turları ile ortak alanların, otoparkların ve çevre duvarlarının anlık denetimi.',
      icon: "shield_person",
      color: "from-emerald-700 to-teal-900"
    },
    {
      title: t('sec_feat_5_title') || 'Yangın & Acil Durum Tahliye Yönetimi',
      desc: t('sec_feat_5_desc') || 'Sığınak, yangın merdiveni ve kaçış yollarının sürekli açık tutulması; periyodik tahliye tatbikatları ve kriz yönetimi.',
      icon: "emergency",
      color: "from-slate-700 to-slate-900"
    },
    {
      title: t('sec_feat_6_title') || 'Hızlı Müdahale ve Emniyet Koordinasyonu',
      desc: t('sec_feat_6_desc') || 'Olası asayiş, hırsızlık veya acil sağlık durumlarında polis ve 112 acil çağrı merkezleriyle entegre alarm protokolü.',
      icon: "local_police",
      color: "from-blue-800 to-slate-900"
    }
  ];

  const securitySteps = [
    { name: '1. Güvenlik ve Risk Analizi Keşfi', text: 'Sitenizin çevre duvarları, kapı girişleri, otopark ve kör noktaları yerinde incelenir; detaylı güvenlik açığı raporu çıkarılır.' },
    { name: '2. 5188 Sayılı Kanun İzin & Valilik Süreci', text: 'Özel güvenlik komisyonu onayları, valilik izin belgeleri ve güvenlik noktası planlaması yasal mevzuata tam uyumlu hazırlanır.' },
    { name: '3. Lisanslı ve Üniformalı Personel Görevlendirmesi', text: 'Sabıka kaydı temiz, fiziki ve psikolojik testlerden geçmiş, yangın ve ilk yardım sertifikalı profesyonel güvenlik ekibi atanır.' },
    { name: '4. 7/24 Dijital Devriye ve Denetim', text: 'GPS destekli tur kontrol kalemi, plaka tanıma sistemi ve nöbetçi amir teftişleri ile sıfır güvenlik zafiyeti sağlanır.' }
  ];

  const faqs = [
    {
      question: 'Sitemizde özel güvenlik görevlendirmek için yasal prosedür nedir?',
      answer: '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca, sitede özel güvenlik istihdam edilebilmesi için İl Özel Güvenlik Komisyonu\'na başvuru yapılarak Valilik izni alınmalıdır. Alo Yönetim olarak tüm başvuru, izin ve onay süreçlerini site adına anahtar teslim yürütüyoruz.'
    },
    {
      question: 'Güvenlik görevlilerinin yetki ve sorumlulukları nelerdir?',
      answer: 'Güvenlik görevlileri 5188 sayılı kanun kapsamında; siteye giriş yapan ziyaretçilerin kimlik kontrolünü yapma, eşyaları X-ray/dedektörden geçirme, suçüstü durumunda yakalama ve genel kolluk kuvvetlerine teslim etme yetkisine sahiptir.'
    },
    {
      question: 'Gece devriyeleri ve nöbet denetimleri nasıl yapılıyor?',
      answer: 'Güvenlik personeli belirlenen kritik noktalardaki RFID/QR devriye istasyonlarını saat başı okutur. Turlar dijital yönetim panelimize anlık aktarılır; nöbet uykusu veya tur aksaması yaşanmaması için merkez denetim ekiplerimizce habersiz gece teftişleri yapılır.'
    },
    {
      question: 'Güvenlik kameraları ve kayıt saklama süresi nedir?',
      answer: 'Site ortak alan güvenlik kameraları 7/24 kesintisiz kayıt altına alınır. KVKK (Kişisel Verilerin Korunması Kanunu) Aydınlatma Metni çerçevesinde görüntüler şifreli NVR sunucularında en az 30 gün yasal saklama süresiyle muhafaza edilir.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } }
  };

  return (
    <>
      <ServiceSeo 
        serviceType="Profesyonel Güvenlik Yönetimi"
        description="5188 sayılı Özel Güvenlik Kanunu uyumlu, 7/24 CCTV kamera takibi, plaka tanıma ve lisanslı güvenlik personeli ile profesyonel site güvenlik yönetimi."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/%C3%96zel_g%C3%BCvenlik_g%C3%B6revlisi"
      />
      
      {/* Immersive Full-Width Hero */}
      <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-36 md:pt-36 md:pb-48">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        </div>
        
        {/* Radar Animation embedded in background */}
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
              {t('sec_banner_badge') || '5188 Sayılı Kanun Güvencesi'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: `${t('sec_banner_title_1') || 'Profesyonel'} <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">${t('sec_banner_title_highlight') || 'Güvenlik Yönetimi'}</span> ${t('sec_banner_title_2') || 've Tesis Emniyeti'}` }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Profesyonel Güvenlik Yönetimi' }}
              ratingValue={4.9}
              reviewCount={284}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('sec_banner_desc') || 'Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('sec_banner_box_btn') || 'Ücretsiz Güvenlik Keşfi'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Security Calculator */}
        <div className="-mt-20 md:-mt-32 relative z-30">
          <SecurityCalculator />
        </div>

        {/* ========================================================================= */}
        {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
        {/* ========================================================================= */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400">verified_user</span>
              <span>Özet Rehber: 5188 Lisanslı Özel Güvenlik Nedir?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              5188 Sayılı Kanun & Valilik Ruhsatı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">5188 Lisanslı Özel Güvenlik Hizmeti</strong>;{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                konut siteleri ve toplu yapılar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                çok katlı lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                iş merkezleri ve kurumsal plazalar
              </Link>
              {' '}ile{' '}
              <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                endüstriyel tesis ve fabrikaların
              </Link>{' '}
              can, mal ve bilgi güvenliğini sağlamak amacıyla T.C. İçişleri Bakanlığı ve İl Valilikleri denetiminde yürütülen profesyonel koruma disiplinidir. Geleneksel ve yetkisiz kapıcı/bekçi modelinin aksine 5188 lisanslı güvenlik; kimlik sorgulama, üst/araç detektör araması, suçüstü yakalama, tahliye yönetimi ve genel kolluk (Polis/Jandarma) ile anlık koordinasyon sağlama gibi yasal ve adli yetkilerle donatılmıştır.
            </p>
            <p>
              Güvenlik operasyonlarımız;{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ,{' '}
              <a href="https://www.egm.gov.tr/ozelguvenlik" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                Emniyet Genel Müdürlüğü Özel Güvenlik Denetleme Standartları
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ,{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              {' '}ve 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kamera kayıt saklama protokolleri çerçevesinde kusursuz bir yasal güvenceyle icra edilir.
            </p>
            <p>
              Alo Yönetim, özel güvenlik operasyonlarını{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>{' '}
              ve{' '}
              <Link href="/hizmetler/teknik-bakim" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Teknik Bakım ve Otomasyon
              </Link>{' '}
              süreçleriyle senkronize ederek dört ana operasyonel sütun üzerinde icra eder:
            </p>

            {/* 4 Ana Operasyonel Disiplin Kartı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🛡️</span> Fiziki Koruma & Nizamiye Geçiş Kontrolü
                </span>
                <p className="text-[var(--color-secondary)]">
                  Üniformalı, silahlı/silahsız lisanslı güvenlik personeli, turnike ve manyetik bariyer kontrolü, X-ray çanta taraması, el dedektörüyle arama ve misafir/kurye girişlerinin dijital kayıt altına alınması.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📹</span> Yapay Zeka Destekli 7/24 CCTV & PTS
                </span>
                <p className="text-[var(--color-secondary)]">
                  Kör nokta bırakmayan IP kamera izleme merkezi, sınır ihlali ve hareket algılama sensörleri, otomatik Plaka Tanıma Sistemi (PTS) ile abone ve misafir araç bariyer otomasyonu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🚨</span> GPS Destekli Devriye & Gece Teftiş Masası
                </span>
                <p className="text-[var(--color-secondary)]">
                  Karekodlu ve RFID etiketli saatlik devriye kontrol turları, GPS konum takibi ve merkez operasyon müdürlerince habersiz gece denetimleri ile sıfır zafiyet garantisi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🚒</span> Yangın, Deprem & Kriz Tahliye Yönetimi
                </span>
                <p className="text-[var(--color-secondary)]">
                  Yangın kaçış yolları ve acil sığınakların açık tutulması, periyodik tahliye tatbikatları, AFAD/İtfaiye koordinasyonu ve 112 Acil Çağrı Merkezi ile entegre acil alarm protokolleri.
                </p>
              </div>
            </div>

            <p>
              Tüm personelimiz,{' '}
              <Link href="/guvenlik-akademisi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Alo Güvenlik Akademisi
              </Link>{' '}
              kapsamında 5188 kanun, yakın savunma, etkili iletişim, kriz yönetimi, yangın söndürme ve ilk yardım eğitimlerini başarıyla tamamlamıştır. Sitenizde veya tesisinizde görevlendirilen tüm personelin kıdem/ihbar tazminatları, SGK primleri ve Zorunlu Özel Güvenlik Mali Sorumluluk Sigortaları şirketimizin tüzel kişilik güvencesi altındadır; kat malikleri kurulunun hiçbir şahsi hukuki ve cezai riski bulunmaz.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">verified</span>
                </span>
                <span>%100 Valilik İzni & Yasal Güvence</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                İl Özel Güvenlik Komisyonu ruhsatlandırma, karar defteri onayları ve yasal izin süreçlerinin anahtar teslim yürütülmesi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">timer</span>
                </span>
                <span>45 Dakika SLA Acil Müdahale</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                İstanbul genelinde mobil devriye amirlikleri, acil destek ekipleri ve kolluk kuvvetleriyle entegre hızlı asayiş müdahalesi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">security</span>
                </span>
                <span>Sıfır Hukuki Risk & Tam Sigorta</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Tüm kıdem/ihbar tazminatı, SGK ve mesleki mali mesuliyet risklerinin şirketimizce üstlenilmesi; yöneticilere sıfır şahsi sorumluluk.
              </p>
            </div>
          </div>
        </div>

        {/* 5188 Yasal Ruhsatlar & Akreditasyon Şeması */}
        <SecurityTrustBadgeGridSeo />

        {/* 6 Bento Grid Cards with Staggered Animation */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('sec_grid_title') || 'Entegre Güvenlik Standartlarımız'}</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light mt-4">{t('sec_grid_desc') || '5188 sayılı kanun standartlarında, teknoloji ve disiplin odaklı koruma kalkanı.'}</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {securityFeatures.map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-5 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden relative"
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-2xl`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] relative z-10">{f.title}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* İnteraktif 5188 Güvenlik & Risk Analiz Testi */}
        <InteractiveSecurityRiskRadarSeo />

        {/* Karar Matrisi: Bireysel Bekçi vs 5188 Lisanslı Özel Güvenlik */}
        <SecurityComparisonTableSeo />

        {/* Yapay Zeka & Donanım Teknolojileri Ekosistemi */}
        <SecurityTechMatrixSeo />

        {/* Güvenlik Akademisi E-E-A-T Spotlight Kartı */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400">
              <span className="material-symbols-outlined text-sm">school</span>
              <span>Kendi Akademimizde Yetişen Uzman Kadro</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight leading-tight">
              Alo Güvenlik Akademisi: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Sürekli Hizmet İçi Eğitim Güvencesi</span>
            </h2>
            <p className="text-sm md:text-base text-[var(--color-secondary)] font-light leading-relaxed">
              Tesislerinizde görev alan tüm özel güvenlik personeli; 5188 mevzuat, yangın söndürme, ilk yardım, yakın savunma, şüpheli profil analizi ve etkili iletişim eğitimlerini akademimizde tamamlar.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)]">✓ 5188 Kanun Eğitimi</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)]">✓ AFAD Yangın Tatbikatı</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)]">✓ Sağlık Bakanlığı İlk Yardım</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)]">✓ Kriz & Öfke Kontrolü</span>
            </div>
          </div>
          <div className="relative z-10 shrink-0">
            <Link 
              href="/guvenlik-akademisi" 
              className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-3 text-sm"
            >
              <span>Akademi Müfredatını İnceleyin</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* 4-Step HowTo Process */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name="5188 Sayılı Kanun Uyumlu Site Güvenlik Kurulum Süreci"
            description="Site ve tesislerde özel güvenlik hizmetine geçiş ve operasyonel entegrasyon için 4 adımlı standart sürecimiz."
            steps={securitySteps}
          />
        </div>

        {/* Afet, Yangın & Sığınak Güvenliği Denetim Motoru */}
        <EmergencyDisasterAuditSeo />

        {/* İstanbul İlçelerine Göre Güvenlik Kümeleri */}
        <DistrictSecurityClusterSeo />

        {/* Google AI Overviews & Doğrudan Yanıt Kartları (Featured Snippet) */}
        <div className="space-y-8">
          <InstantAnswerCardSeo 
            question="Site ve Apartmanlara Özel Güvenlik Nasıl Tutulur?"
            shortAnswer="Site ve apartmanlarda özel güvenlik personeli istihdam etmek için 5188 Sayily Kanun uyarınca kat malikleri genel kurul kararı alınmalı ve İl Valiliği Özel Güvenlik Komisyonu'na başvuru yapılmalıdır. Valilik Özel Güvenlik İzni (ÖGİ) onaylandıktan sonra lisanslı bir özel güvenlik şirketi ile sözleşme imzalanarak hizmet başlatılır."
            bulletPoints={[
              "Genel kurulda oy çokluğu ile özel güvenlik istihdam kararı alınır.",
              "İl Valiliği Özel Güvenlik Komisyonu'na ÖGİ ruhsat başvurusu yapılır.",
              "5188 faaliyet izin belgeli kurumsal özel güvenlik şirketi seçilir.",
              "Görev yapacak personelin adli sicil ve Özel Güvenlik Kimlik Kartı doğrulanır.",
              "Zorunlu Mali Sorumluluk Sigortası poliçesi düzenlenerek nizamiyede görev başlar."
            ]}
            lawArticle="5188 Sayılı Kanun Madde 3, 7 ve 21"
            verifiedBy="Alo Yönetim Hukuk & Güvenlik Operasyon Masası"
            lastUpdated="2026 Güncel"
            category="5188 Özel Güvenlik Mevzuatı"
          />

          <InstantAnswerCardSeo 
            question="Özel Güvenlik Görevlilerinin Yasal Yetkileri Nelerdir?"
            shortAnswer="Özel güvenlik görevlileri, 5188 Sayılı Kanun Madde 7 uyarınca koruma alanına giren kişilerin kimliklerini sorma, duyarlı kapı veya dedektörle üst/bagaj arama, suçüstü halinde şüpheliyi yakalama ve olay yerindeki delilleri muhafaza ederek derhal genel kolluğa (Polis/Jandarma) teslim etme yetkisine sahiptir."
            bulletPoints={[
              "Site girişlerinde kimlik kontrolü ve ziyaretçi kayıt defteri tutma yetkisi.",
              "Metal dedektörü, X-ray ve el dedektörü ile eşyaları tarama hakkı.",
              "Hırsızlık, saldırı veya suç anında şüpheliyi yakalama ve kolluğa teslim etme yetkisi.",
              "Yangın, deprem gibi acil durumlarda tesise girme ve tahliyeyi yönetme yetkisi."
            ]}
            lawArticle="5188 Sayılı Kanun Madde 7 (Özel Güvenlik Görevlilerinin Yetkileri)"
            verifiedBy="Alo Yönetim Hukuk & Güvenlik Operasyon Masası"
            lastUpdated="2026 Güncel"
            category="Yasal Yetki ve Sorumluluklar"
          />
        </div>

        {/* 5188 Yasal Dilekçe & Karar Defteri Şablonu Oluşturucu */}
        <SecurityLegalTemplateGeneratorSeo />

        {/* Security Specific Social Proof */}
        <SecurityTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('sec_faq_title') || 'Güvenlik Yönetimi Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <ServiceAuthorityHubSeo
        serviceName="5188 Lisanslı Özel Güvenlik Yönetimi"
        serviceCategory="Güvenlik & Asayiş"
        lawReferences={[
          {
            title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
            badge: "5188 Sayılı Kanun",
            description: "Özel güvenlik görevlilerinin kimlik kartı, yetki sınırları, arama ve yakalama prosedürleri ile tesis güvenlik komisyonu izin süreçlerini yasal çerçeveye oturtur."
          },
          {
            title: "Özel Güvenlik Hizmetlerine Dair Kanunun Uygulanmasına İlişkin Yönetmelik",
            sourceName: "T.C. Resmi Gazete & Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=7280&MevzuatTur=7&MevzuatTertip=5",
            badge: "Yönetmelik No: 25606",
            description: "Site ve konut projelerinde fiziki güvenlik noktalarının kurulması, vardiya planlaması, denetim kuralları ve üniforma standartlarını belirler."
          },
          {
            title: "Emniyet Genel Müdürlüğü (EGM) Özel Güvenlik Denetleme Başkanlığı",
            sourceName: "T.C. İçişleri Bakanlığı EGM",
            url: "https://www.egm.gov.tr/ozelguvenlik",
            badge: "EGM Resmi Portal",
            description: "Özel güvenlik şirketleri ve projelerinin yasal denetimi, ÖGNET sistemi üzerinden bildirimler ve silah/ekipman izin prosedürleri."
          }
        ]}
        glossaryTerms={[
          {
            slug: "5188-sayili-kanun",
            term: "5188 Sayılı Kanun Nedir?",
            summary: "Türkiye'de özel güvenlik hizmetlerinin yürütülmesini, personel yetkilerini ve valilik izinlerini düzenleyen ana mevzuattır."
          },
          {
            slug: "ozel-guvenlik-izni-ogi",
            term: "Özel Güvenlik İzni (ÖGİ)",
            summary: "Site veya tesisin özel güvenlik personeli istihdam edebilmesi için İl Özel Güvenlik Komisyonu'ndan alınan yasal izindir."
          },
          {
            slug: "plaka-tanima-sistemi-pts",
            term: "Plaka Tanıma Sistemi (PTS)",
            summary: "Site giriş-çıkışlarında araç plakalarını optik karakter tanıma ile okuyup bariyerleri otomatik yöneten sistemdir."
          },
          {
            slug: "cctv-ve-kamera-guvenlik-sistemi",
            term: "CCTV & Yapay Zeka Kamera Sistemi",
            summary: "Ortak alanların 7/24 yüksek çözünürlüklü ve hareket analizli kameralarla izlenmesini ve kayıt altına alınmasını sağlayan altyapıdır."
          }
        ]}
      />

      <SeoTextSection
        titleKey="guvenlik_seo_title"
        p1Key="guvenlik_seo_p1"
        p2Key="guvenlik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/guvenlik-yonetimi" />
      <RelatedArticles pillar="/hizmetler/guvenlik-yonetimi" />
    </>
  );
}
