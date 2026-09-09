"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export type OperationalPillarId = 'rezidans' | 'plaza' | 'site' | 'sanayi';

interface PillarData {
  id: OperationalPillarId;
  tabLabel: string;
  badge: string;
  title: string;
  subTitle: string;
  landingUrl: string;
  icon: string;
  colorScheme: {
    badgeBg: string;
    badgeText: string;
    borderActive: string;
    accentGlow: string;
    btnBg: string;
  };
  kpis: Array<{ label: string; value: string; desc: string }>;
  coreOperations: Array<{
    title: string;
    icon: string;
    summary: string;
    details: string[];
    standardOrLaw: string;
  }>;
}

const PILLARS_DATA: Record<OperationalPillarId, PillarData> = {
  rezidans: {
    id: 'rezidans',
    tabLabel: 'Lüks Rezidans & Kule',
    badge: 'VIP Concierge & Rezidans İşletmesi',
    title: 'Lüks Rezidans ve Çok Katlı Kule Yönetim Standartları',
    subTitle: 'Prestijli rezidans projelerinde otel konforunda 7/24 karşılama, vale otopark koordinasyonu, akıllı geçiş ve %99.2 tahsilat disiplini.',
    landingUrl: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    icon: 'apartment',
    colorScheme: {
      badgeBg: 'bg-amber-500/10 dark:bg-amber-400/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-500',
      borderActive: 'border-amber-400 dark:border-amber-500',
      accentGlow: 'from-amber-500/10 via-amber-500/5 to-transparent',
      btnBg: 'bg-amber-500 hover:bg-amber-600 text-slate-950',
    },
    kpis: [
      { label: 'Aidat Tahsilat Oranı', value: '%99.2', desc: 'Otomatik SMS, online POS ve KMK m.20 icra takibi' },
      { label: 'Vale Karşılama SLA', value: '< 3 Dk', desc: 'Giriş kapısı zimmetli araç karşılama ve teslim' },
      { label: '7/24 Concierge Masası', value: '365 Gün', desc: 'Kargo/kurye dolap emaneti ve sakin asistanlığı' },
      { label: 'Acil Teknik Müdahale', value: '15-25 Dk', desc: 'Asansör, hidrofor ve jeneratör arızalarında' },
    ],
    coreOperations: [
      {
        title: 'Vale & VIP Kapalı Otopark Protokolü',
        icon: 'local_taxi',
        summary: 'Kule girişlerinde eğitimli vale personeli, barkodlu araç fişi ve kasko sorumluluk poliçesi güvencesiyle misafir ve sakin araç koordinasyonu.',
        details: [
          'Zimmetli araç teslim-tesellüm dijital kayıt sistemi',
          'Vale mali mesuliyet sigortası (garaj poliçesi) tam kapsamı',
          'Elektrikli araç (EV) şarj istasyonları sıralama ve şarj takibi',
          'Misafir otopark doluluk sensörleri ve dinamik LED yönlendirme'
        ],
        standardOrLaw: 'Karayolları Trafik & Otopark Yönetmeliği'
      },
      {
        title: '7/24 Lobi, Resepsiyon & Kargo Dolap Yönetimi',
        icon: 'concierge_bell',
        summary: 'İki dilli (TR/EN) karşılama ekibi, kurye kimlik teyidi, şifreli akıllı kargo teslim dolapları ve sakin mobil bildirim sistemi.',
        details: [
          'Ziyaretçi QR kodlu davet teyidi ve anlık sakin onayı',
          'Kargo ve paketlerin barkodlu teslim dolabında 7/24 muhafazası',
          'Daire sakinlerine teslimat anında anlık SMS ve uygulama bildirimi',
          'Kuru temizleme, çiçek ve özel sipariş lojistik karşılama desteği'
        ],
        standardOrLaw: 'ISO 10002:2018 Müşteri Memnuniyeti'
      },
      {
        title: 'UHF RFID Plaka Tanıma & Kartlı Turnike Geçişi',
        icon: 'badge',
        summary: 'Kişisel verilerin korunması (KVKK) uyumlu turnike geçişleri, asansör kat yetkilendirmesi ve UHF etiketli hızlı otopark bariyer otomasyonu.',
        details: [
          'Sadece yetkili kata erişim sağlayan asansör kart entegrasyonu',
          'Otopark girişlerinde beklemesiz UHF cam etiketi ve PTS kamerası',
          'Taşınma (fit-out) günlerinde servis asansörü koruma paneli montajı',
          'Ziyaretçi ve kurye erişim loglarının dijital zaman damgalı kaydı'
        ],
        standardOrLaw: '6698 Sayılı KVKK & 5188 Sayılı Kanun'
      },
      {
        title: 'Havuz, Spa & Sağlık Bakanlığı Su Hijyeni',
        icon: 'pool',
        summary: 'Kapalı ve açık yüzme havuzları, Türk hamamı, sauna ve fitness salonlarında günlük otomatik kimyasal ölçüm ve akredite laboratuvar teftişi.',
        details: [
          'Sabah-akşam serbest klor (1-3 ppm) ve pH (7.2-7.8) dijital kaydı',
          'İl Sağlık Müdürlüğü yetkili laboratuvarı ile aylık mikrobiyolojik analiz',
          'Filtrasyon ters yıkama takvimi ve UV-C dezenfeksiyon ünitesi bakımı',
          'Fitness ekipmanlarının günlük medikal solüsyonlu dezenfeksiyonu'
        ],
        standardOrLaw: 'Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği'
      },
    ],
  },
  plaza: {
    id: 'plaza',
    tabLabel: 'Plaza & İş Merkezi',
    badge: 'A+ Kurumsal Plaza & Ticari İşletme',
    title: 'Ticari Gayrimenkul, Plaza ve A+ İş Merkezi Yönetimi',
    subTitle: 'Kurumsal kiracı memnuniyeti, yangın otomasyonu, 3x senkron jeneratör yük paylaşımı, HVAC filtreleme ve %0 reaktif elektrik cezası.',
    landingUrl: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    icon: 'business',
    colorScheme: {
      badgeBg: 'bg-blue-500/10 dark:bg-blue-400/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
      badgeText: 'text-blue-500',
      borderActive: 'border-blue-400 dark:border-blue-500',
      accentGlow: 'from-blue-500/10 via-blue-500/5 to-transparent',
      btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    kpis: [
      { label: 'Reaktif Güç Cezası', value: '%0 Sıfır', desc: 'Kompanzasyon panosu ve anlık harmonik filtreleme' },
      { label: 'Jeneratör Senkronizasyonu', value: '8-12 Sn', desc: 'Yük paylaşımıyla sıfır kesinti transferi' },
      { label: 'HVAC Periyodik Bakım', value: '3 Ayda 1', desc: 'Fancoil kimyasal yıkama ve filtre değişimi' },
      { label: 'Ortak Alan Gider Dağıtımı', value: '%100 Uyum', desc: 'Kalorimetre ve alt sayaç pay ölçer tanzimi' },
    ],
    coreOperations: [
      {
        title: 'Adresli Yangın Otomasyonu & Duman Tahliyesi',
        icon: 'local_fire_department',
        summary: 'BMS entegreli akıllı yangın santrali, sprinkler zon akış anahtarları, basınçlandırma fanları ve duman tahliye damperlerinin 7/24 testleri.',
        details: [
          'Haftalık dizel ve elektrikli yangın hidroforu otomatik test çalıştırması',
          'Yangın merdiveni pozitif basınçlandırma damper testleri',
          'Duman algılamada asansörlerin acil tahliye katına otomatik iniş protokolü',
          'İtfaiye onaylı acil durum tahliye tatbikatı ve personeli görevlendirmesi'
        ],
        standardOrLaw: 'Binaların Yangından Korunması Hakkında Yönetmelik'
      },
      {
        title: '3x Senkron Jeneratör & Kesintisiz Güç Sistemi',
        icon: 'bolt',
        summary: 'A+ plazalarda paralel çalışan senkron jeneratör grupları ile şebeke kesintisinde yük paylaşımı (load sharing) ve sıfır veri kaybı.',
        details: [
          '8-12 saniye içinde tam yük transferi ve dinamik kademeli devreye alma',
          'Haftalık boşta, aylık %75 yükte jeneratör test çalıştırma protokolü',
          'Yakıt tankı dip tortu temizliği ve 24 saat kesintisiz yedek motorin stoku',
          'UPS akü odalarının 22°C hassas iklimlendirme ve voltaj takibi'
        ],
        standardOrLaw: 'TSE HD 60364 & Elektrik Kuvvetli Akım Tesisleri'
      },
      {
        title: 'HVAC Merkezi İklimlendirme & Chiller Bakımı',
        icon: 'mode_fan',
        summary: 'VAV ve fancoil ünitelerinin mevsimlik dönüşümleri, chiller su soğutma grupları ve açık soğutma kulelerinde lejyonella önleme rejimi.',
        details: [
          '3 ayda bir fancoil filtrelerinin yıkanması ve antibakteriyel spreyleme',
          'Açık soğutma kulelerinde biyosit dozajı ile Lejyoner hastalığı önleme',
          'BMS üzerinden kışın 21°C, yazın 24°C sabit konfor sıcaklık optimizasyonu',
          'Taze hava santrallerinde CO2 sensörü kontrollü oransal klape yönetimi'
        ],
        standardOrLaw: 'ASHRAE Standartları & ISO 14001:2015'
      },
      {
        title: 'Ortak Alan Enerji Paylaşımı & Alt Sayaç Okuma',
        icon: 'calculate',
        summary: 'Merkezi ısıtma/soğutma giderlerinin kalorimetre ve ultrasonik sayaçlarla kiracılara yasal yönetmeliğe tam uygun paylaştırılması.',
        details: [
          'Her ayın 1\'inde M-Bus/Modbus sayaçların dijital uzaktan okunması',
          '%0 reaktif ceza güvencesiyle kompanzasyon kondansatör kademe denetimi',
          'Ortak alan trafo kayıpları ve jeneratör yakıt paylarının adil tanzimi',
          'Kiracı teknik teslim-iade (fit-out) şartnamesi ve mesai dışı çalışma izni'
        ],
        standardOrLaw: 'Merkezi Isıtma ve Sıhhi Sıcak Su Gider Paylaşım Yön.'
      },
    ],
  },
  site: {
    id: 'site',
    tabLabel: 'Konut Sitesi & Toplu Yapı',
    badge: '634 KMK Tam Uyumluluk & Tasarruf',
    title: 'Toplu Konut, Site ve Çok Bloklu Yerleşke Yönetimi',
    subTitle: 'KMK 34 yönetici çift çoğunluk ataması, KMK 20 aidat icra takibi, 5188 güvenlik 3 vardiya planı ve %30 ortak bütçe tasarrufu.',
    landingUrl: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
    icon: 'domain',
    colorScheme: {
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-400/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-500',
      borderActive: 'border-emerald-400 dark:border-emerald-500',
      accentGlow: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    kpis: [
      { label: 'İşletme Bütçesi Tasarrufu', value: '%25 - %35', desc: 'Toplu satın alma gücü ve enerji optimizasyonu ile' },
      { label: 'Genel Kurul Karar Gücü', value: 'KMK m.34', desc: 'Sayı ve arsa payı çift çoğunluk resmi tutanakları' },
      { label: 'Kanuni Gecikme Faiz', value: 'Aylık %5', desc: 'KMK m.20/2 uyarınca otomatik işletilen faiz' },
      { label: 'Güvenlik Vardiya Planı', value: '3 x 8 Saat', desc: '5188 lisanslı 24 saat kesintisiz devriye' },
    ],
    coreOperations: [
      {
        title: 'KMK Madde 34 Yönetici Seçimi & Genel Kurul İdaresi',
        icon: 'how_to_vote',
        summary: 'Kat malikleri kurulunun yasal çağrı, vekaletname denetimi, divan tutanağı ve çift çoğunluk (%50+1 kişi ve arsa payı) ile profesyonel tüzel kişiliğe devri.',
        details: [
          'Yıllık olağan genel kurul için 15 gün önceden iadeli taahhütlü çağrı',
          'Hazirun cetveli ve arsa payı ağırlıklı oylama pusulalarının tanzimi',
          'Noter onaylı karar defteri tescili ve banka hesap yetki devri protokolü',
          'Sulh Hukuk Mahkemesi nezdinde kararların iptal riskine karşı hukuki kalkan'
        ],
        standardOrLaw: '634 Sayılı Kat Mülkiyeti Kanunu Madde 29-34'
      },
      {
        title: 'KMK Madde 20 & İİK 68 Aidat İcra Takibi',
        icon: 'gavel',
        summary: 'Zamanında ödenmeyen aidat ve avans borçları için aylık kanuni %5 gecikme tazminatı işletimi, 7 günlük tebliğ sonrası doğrudan ilamsız icra takibi.',
        details: [
          'KMK m.37 işletme projesinin kesinleşmesi ile İİK 68 resmi belge gücü',
          'Otomatik SMS ve WhatsApp hatırlatmalarıyla %95 vadesinde tahsilat',
          'Geciken borçlarda avukat ihtarı ve 24 saat içinde başlatılan icra dosyası',
          'Kiracıdan tahsil edilemeyen borçta malik tapusuna kanuni ipotek tescili'
        ],
        standardOrLaw: '634 Sayılı KMK Madde 20 & İcra İflas Kanunu 68'
      },
      {
        title: '5188 Lisanslı Özel Güvenlik 3 Vardiya Planı',
        icon: 'shield_person',
        summary: 'Nizamiye araç-yaya kontrolü, çevre duvarı devriye tur kalemi okutma sistemi ve acil durum müdahale protokolleri.',
        details: [
          'Günde 3 vardiya (08:00-16:00 / 16:00-24:00 / 24:00-08:00) kesintisiz nöbet',
          'Saat başı RFID bekçi tur kalemiyle kör nokta ve yangın çıkış denetimi',
          'Valilik Özel Güvenlik Şube Müdürlüğü onaylı silahlı/silahsız izin belgesi',
          'Gece vardiyasında amir ani denetimi ve alkol/dikkat kontrol raporları'
        ],
        standardOrLaw: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun'
      },
      {
        title: 'Peyzaj, Otomatik Sulama & Artezyen Kuyu Yönetimi',
        icon: 'yard',
        summary: 'Geniş yeşil alanlarda mevsimlik gübreleme/budama takvimi, yağmur sensörlü rotor sulama ve artezyen hidroforu ile sıfır şebeke suyu maliyeti.',
        details: [
          'Toprak nem ve yağmur sensörlü dijital zaman ayarlı sulama otomasyonu',
          'Artezyen derin kuyu dalgıç pompa periyodik çek valf ve pano bakımı',
          'Mevsimlik çim havalandırma, tohum takviyesi ve bitki ilaçlama rejimi',
          'Site ortak çocuk oyun grupları ve spor sahalarının haftalık güvenlik kontrolü'
        ],
        standardOrLaw: 'TSE 13811 & Çevre Şehircilik Bakanlığı Standartları'
      },
    ],
  },
  sanayi: {
    id: 'sanayi',
    tabLabel: 'Sanayi & Lojistik Tesisi',
    badge: 'ISO 45001 & Ağır Teknik Altyapı',
    title: 'Sanayi Tesisleri, Fabrika ve Lojistik Merkez Yönetimi',
    subTitle: 'ISO 45001 iş güvenliği, ATEX patlamadan korunma, yüksek gerilim trafo bakımı, endüstriyel epoksi zemin ve 7/24 perimetre koruması.',
    landingUrl: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    icon: 'factory',
    colorScheme: {
      badgeBg: 'bg-orange-500/10 dark:bg-orange-400/10 border-orange-500/30 text-orange-600 dark:text-orange-400',
      badgeText: 'text-orange-500',
      borderActive: 'border-orange-400 dark:border-orange-500',
      accentGlow: 'from-orange-500/10 via-orange-500/5 to-transparent',
      btnBg: 'bg-orange-600 hover:bg-orange-700 text-white',
    },
    kpis: [
      { label: 'İş Güvenliği Standardı', value: 'ISO 45001', desc: 'BELCERT Akredite Belge No: A1808966' },
      { label: 'Çevre Yönetim Sistemi', value: 'ISO 14001', desc: 'BELCERT Akredite Belge No: A1808962' },
      { label: 'Yüksek Gerilim Trafo', value: '6 Ayda 1', desc: 'İzolasyon yağı testi ve termal kamera taraması' },
      { label: 'Ağır Arıza Müdahale SLA', value: '30 Dk', desc: 'Endüstriyel kompresör ve pano arızalarında' },
    ],
    coreOperations: [
      {
        title: 'ISO 45001 İSG & ATEX Patlamadan Korunma',
        icon: 'health_and_safety',
        summary: 'Patlayıcı toz ve gaz ortamlarında ex-proof ekipman uygunluk denetimi, sıcak çalışma (kaynak/kesim) izin formları ve periyodik tahliye tatbikatı.',
        details: [
          'A sınıfı İSG uzmanı eşliğinde saha risk analizi ve KKD denetimleri',
          'Boya, kimyasal ve solvent depolarında ATEX zon haritası ve topraklama',
          'Sıcak çalışma yapılmadan önce kıvılcım kalkanı ve yangın gözcüsü onayı',
          'Yıllık iş sağlığı ve acil tahliye tatbikatlarının bakanlık bildirimleri'
        ],
        standardOrLaw: '6331 Sayılı İSG Kanunu & ISO 45001:2018'
      },
      {
        title: 'OG Trafo, Şalt Sahası & Kompanzasyon Takibi',
        icon: 'electric_bolt',
        summary: '34.5 kV Orta Gerilim trafo hücrelerinin manevra güvenliği, kesici gaz basıncı, trafo yağı dielektrik dayanım testleri ve harmonik filtreleme.',
        details: [
          '6 ayda bir trafo yağı kimyasal ve dielektrik delinme gerilimi testi',
          'Termal kamera ile ana şalt baraları ve pabuçlarda aşırı ısınma taraması',
          'Yıldırımdan korunma (paratoner) ve tesis topraklama meger ölçümleri',
          'Fabrika üretim motorlarının reaktif güç dalgalanmalarına anlık kompanzasyon'
        ],
        standardOrLaw: 'Elektrik Tesislerinde Topraklamalar Yönetmeliği'
      },
      {
        title: 'Endüstriyel Epoksi Zemin & Ağır Bakım',
        icon: 'format_paint',
        summary: 'Ağır forklift ve transpalet trafiğine dayanıklı epoksi/poliüretan zemin derz tamiratı, yağ çözücü binicili zemin otomatı ile günlük temizlik.',
        details: [
          'Forklift tekerlek izleri ve endüstriyel yağ lekelerine özel nötralize kimyasal',
          'Depo zemin dilatasyon derzlerinin elastik mastik ile periyodik onarımı',
          'Yükleme rampaları ve hidrolik liftlerin 3 aylık basınçlı yağ/keçe bakımı',
          'Tehlikeli ve tehlikesiz atık geçici depolama sahası mevzuat denetimi'
        ],
        standardOrLaw: 'Atık Yönetimi Yönetmeliği & ISO 14001:2026'
      },
      {
        title: 'Tır Kantarı, Hızlı Sarmal Kapı & Perimetre Güvenlik',
        icon: 'local_shipping',
        summary: 'Lojistik tır giriş-çıkış kantar kalibrasyonu, hızlı sarmal depo kapıları optik sensör bakımı ve çevre tel çit termal kamera bariyerleri.',
        details: [
          'Sanayi Bakanlığı damgalı kantar periyodik metrolojik muayenesi',
          'Lojistik hızlı sarmal kapı fotosel ve motor redüktör yağlama takvimi',
          'Fabrika çevre tel örgüsü boyunca çift doğrulamalı termal hareket sensörü',
          'Şoför bekleme salonu ve yükleme sahası iş güvenliği bariyer çizgileri'
        ],
        standardOrLaw: 'TSE HYB 12850 & 5188 Sayılı Kanun'
      },
    ],
  },
};

export default function FacilityOperationalPillarsSeo() {
  const [activeTab, setActiveTab] = useState<OperationalPillarId>('rezidans');
  const current = PILLARS_DATA[activeTab];

  return (
    <section className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[3rem] p-6 sm:p-12 shadow-sm relative overflow-hidden my-16">
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${current.colorScheme.accentGlow} rounded-full blur-3xl pointer-events-none transition-all duration-500`} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[16px] text-blue-600 dark:text-blue-400" aria-hidden="true">tune</span>
          <span>Sektörel Operasyonel Derinlik & Saha Protokolleri</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
          Her Mülk Tipine Özel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-800 dark:from-blue-400 dark:via-indigo-300 dark:to-white">Gerçek Saha Operasyonu</span>
        </h2>
        <p className="text-xs sm:text-base text-[var(--color-secondary)] font-normal mt-2 leading-relaxed">
          Tesis yönetimi genel geçer kavramlardan ibaret değildir. Rezidans, plaza, site veya sanayi tesisinizin ihtiyaç duyduğu teknik, yasal ve operasyonel disiplinleri inceleyin.
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/70 max-w-2xl mx-auto">
          {(Object.keys(PILLARS_DATA) as OperationalPillarId[]).map((tabKey) => {
            const tab = PILLARS_DATA[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm border border-[var(--color-outline)]/90 ring-2 ring-blue-500/20'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">{tab.icon}</span>
                <span>{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-10 relative z-10"
        >
          {/* Main Title & Subtitle for Selected Pillar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/60">
            <div>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-2 ${current.colorScheme.badgeBg}`}>
                {current.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] mt-1 max-w-3xl">
                {current.subTitle}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={current.landingUrl}
                className="px-5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)] text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span>Detaylı Landing Page</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* 4 KPIs Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {current.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 flex flex-col justify-between shadow-xs hover:border-blue-500/40 transition-colors"
              >
                <span className="text-xs font-semibold text-[var(--color-secondary)]">{kpi.label}</span>
                <div className="my-2">
                  <span className="text-2xl sm:text-3xl font-black text-[var(--color-primary)] tracking-tight">
                    {kpi.value}
                  </span>
                </div>
                <span className="text-[11px] text-[var(--color-tertiary)] leading-snug">{kpi.desc}</span>
              </div>
            ))}
          </div>

          {/* 4 Deep Operational Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.coreOperations.map((op) => (
              <div
                key={op.title}
                className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl" aria-hidden="true">{op.icon}</span>
                      </span>
                      <h4 className="text-base font-bold text-[var(--color-primary)]">
                        {op.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4">
                    {op.summary}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[var(--color-outline)]/40 mb-4">
                    {op.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--color-secondary)]">
                        <span className="material-symbols-outlined text-emerald-500 text-sm shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--color-outline)]/30 flex items-center justify-between text-[11px] text-[var(--color-tertiary)]">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Yasal / Teknik Standart:</span>
                  <span className="font-mono bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded border border-slate-200/60 dark:border-white/10">{op.standardOrLaw}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Strip */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="material-symbols-outlined text-3xl text-blue-400 shrink-0 hidden sm:block" aria-hidden="true">verified_user</span>
              <div>
                <h4 className="font-bold text-sm sm:text-base">{current.tabLabel} Projeniz İçin 48 Saatte Şeffaf Teklif</h4>
                <p className="text-xs text-slate-300 font-light mt-0.5">Ücretsiz yerinde keşif, risk analizi ve tasarruf fizibilitesi hazırlıyoruz.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/teklif-al"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm text-center transition-all shadow-md cursor-pointer"
              >
                Ücretsiz Keşif Randevusu Al
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
