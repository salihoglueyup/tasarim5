'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ApsiyonLogo from '@/components/ui/ApsiyonLogo';
import JsonLd from '@/components/seo/JsonLd';

type PortalRole = 'resident' | 'manager';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Apsiyon uygulamasını indirmek ve kullanmak kat sakinleri için ücretli mi?',
    a: 'Hayır, kesinlikle ücretsizdir. Alo Yönetim tarafından yönetilen tüm tesis, site ve rezidanslardaki kat sakinleri, mülk sahipleri ve kiracılar Apsiyon uygulamasını App Store, Google Play ve Huawei AppGallery üzerinden hiçbir ek ücret ödemeden ücretsiz indirebilir ve kullanabilir.'
  },
  {
    q: 'Online aidat öderken kredi kartı bilgilerim ve ödeme güvenliği nasıl sağlanır?',
    a: 'Tüm ödemeler BDDK lisanslı ödeme kuruluşları ve banka altyapıları üzerinden 256-Bit SSL şifreleme ve 3D Secure zorunlu SMS doğrulaması ile gerçekleştirilir. Kredi kartı bilgileriniz hiçbir sunucuda saklanmaz; ödeme anında resmi dijital KMK makbuzu üretilir.'
  },
  {
    q: 'Kiracıyım; Apsiyon uygulamasında hangi yetkilere sahibim?',
    a: 'Kiracılarımız Apsiyon üzerinden kendi bağımsız bölümlerine ait aidat borçlarını ödeyebilir, ortak alan arıza ve teknik servis taleplerini fotoğraflı olarak iletebilir, havuz/fitness gibi sosyal tesisleri rezerve edebilir ve yönetim duyurularını anlık takip edebilir. Genel kurul oy hakları ise KMK gereği mülk sahibine aittir.'
  },
  {
    q: 'Farklı sitelerde veya aynı sitede birden fazla dairem varsa ne yapmalıyım?',
    a: 'Apsiyon çoklu mülk desteğine sahiptir. Aynı telefon numarasıyla sisteme giriş yaptığınızda, Alo Yönetim bünyesindeki tüm bağımsız bölümleriniz tek bir hesapta birleşir. Tek dokunuşla daireleriniz arasında geçiş yaparak her birinin aidat ve yönetim durumunu ayrı ayrı kontrol edebilirsiniz.'
  },
  {
    q: 'Yöneticiyim / Denetçiyim; Apsiyon Manager ile Alo Yönetim raporlarına nasıl erişirim?',
    a: 'Sitenizin yönetim kurulu veya denetim kurulu üyesiyseniz, Alo Yönetim tarafından size tanımlanan Yönetici yetkisi ile "Apsiyon Manager" mobil uygulamasını ve web panelini kullanabilirsiniz. Anlık banka hesap mutabakatlarını, tahsilat yüzdelerini, gecikme faizlerini ve personel puantajlarını 7/24 şeffaflıkla denetleyebilirsiniz.'
  }
];

const RESIDENT_FEATURES = [
  {
    icon: 'credit_card',
    title: '7/24 Online Aidat & Avans Ödeme',
    desc: 'Kredi kartı veya banka kartıyla anında 3D Secure güvenli ödeme, otomatik talimat ve anında resmi dijital makbuz.',
    tag: 'Finansal Kolaylık'
  },
  {
    icon: 'home_repair_service',
    title: 'Fotoğraflı Arıza & Teknik Destek',
    desc: 'Ortak alandaki arızayı fotoğraflayıp iletin; teknik servis aşamalarını ve çözüldü bildirimini canlı bildirimle takip edin.',
    tag: 'Hızlı Müdahale'
  },
  {
    icon: 'event_seat',
    title: 'Sosyal Tesis & Alan Rezervasyonu',
    desc: 'Havuz, fitness salonu, tenis kortu ve toplantı odası gibi ortak kullanım alanlarını tek dokunuşla online rezerve edin.',
    tag: 'Konfor'
  },
  {
    icon: 'how_to_vote',
    title: 'KMK Uyumlu Dijital Oylama & Kararlar',
    desc: 'Genel kurul kararlarına ve site anketlerine arsa payınız oranında evinizden online olarak katılın, söz sahibi olun.',
    tag: '634 KMK Uyumlu'
  },
  {
    icon: 'local_police',
    title: 'Nizamiye PTS & Misafir Plaka Kaydı',
    desc: 'Misafirinizin araç plakasını önceden uygulamaya girin; güvenlik nizamiyesindeki plaka tanıma kamerası beklemeden geçiş sağlasın.',
    tag: 'Güvenlik Entegre'
  },
  {
    icon: 'receipt_long',
    title: 'Şeffaf Gelir-Gider & Denetim Raporları',
    desc: 'Sitenizin tüm banka hareketlerini, aylık işletme bütçesini, fatura dökümlerini ve denetim raporlarını şeffaflıkla inceleyin.',
    tag: '%100 Şeffaflık'
  }
];

const MANAGER_FEATURES = [
  {
    icon: 'account_balance',
    title: 'Banka Entegrasyonu & Anlık Kasa Takibi',
    desc: 'Tüm site banka hesapları otomatik mutabakatla tek ekranda; anlık tahsilat, gider ve nakit akışı raporlaması.',
    tag: 'Apsiyon Manager'
  },
  {
    icon: 'balance',
    title: 'Gecikme Takibi, Faiz & İcra Hazırlığı',
    desc: 'Aidat borcunu geciktiren bağımsız bölümlere otomatik yasal faiz işletimi ve tek tuşla avukat icra dosya dökümü.',
    tag: 'Hukuk Otomasyonu'
  },
  {
    icon: 'badge',
    title: 'Personel Vardiya & Taşeron Yönetimi',
    desc: 'Temizlik, güvenlik ve teknik personelin nöbet çizelgeleri, QR devriye kontrolleri ve taşeron firma sözleşme takibi.',
    tag: 'Saha Denetimi'
  },
  {
    icon: 'menu_book',
    title: 'Dijital Karar Defteri & Resmi Arşiv',
    desc: 'Yönetim kurulu kararlarını dijital ortamda arşivleyin, KMK mevzuatına uygun noter kayıtlarıyla eşleştirin.',
    tag: 'Resmi Uyum'
  },
  {
    icon: 'notifications_active',
    title: 'Toplu SMS, E-Posta & Anlık Bildirim',
    desc: 'Su/elektrik kesintisi, genel kurul çağrısı veya acil duyuruları tek tıkla tüm kat maliklerinin cebine iletin.',
    tag: 'Anlık İletişim'
  },
  {
    icon: 'speed',
    title: 'Otomatik Sayaç Okuma & Gider Paylaşımı',
    desc: 'Merkezi ısıtma, payölçer ve sıcak su tüketimlerini Enerji Bakanlığı mevzuatına uygun şekilde paylaştırın.',
    tag: 'Enerji & Adalet'
  }
];

export default function ApsiyonMobileHub() {
  const [activeRole, setActiveRole] = useState<PortalRole>('resident');
  const [showQr, setShowQr] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = activeRole === 'resident' ? RESIDENT_FEATURES : MANAGER_FEATURES;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const mobileAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Apsiyon — Alo Yönetim Sakin & Yönetici Portalı',
    operatingSystem: 'iOS, Android',
    applicationCategory: 'BusinessApplication',
    description: 'Alo Yönetim sakinleri ve yöneticileri için 7/24 online aidat ödeme, arıza bildirimi ve oylama mobil uygulaması.',
    downloadUrl: 'https://apps.apple.com/app/apsiyon/id1115852575',
    installUrl: 'https://play.google.com/store/apps/details?id=com.apsiyon.mobile',
    sameAs: [
      'https://apps.apple.com/app/apsiyon/id1115852575',
      'https://play.google.com/store/apps/details?id=com.apsiyon.mobile',
      'https://appgallery.huawei.com/app/C100486001',
      'https://online.apsiyon.com/'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      itemReviewed: {
        '@type': 'MobileApplication',
        name: 'Apsiyon — Alo Yönetim Sakin & Yönetici Portalı',
        operatingSystem: 'iOS, Android',
        applicationCategory: 'BusinessApplication'
      },
      ratingValue: '4.9',
      reviewCount: '450',
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY'
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#F0FAFD] via-[#F8FAFC] to-[#FFFFFF] text-slate-900 dark:bg-[#0B1120] dark:text-slate-100 selection:bg-[#00A5DF] selection:text-white">
      <JsonLd data={faqSchema} />
      <JsonLd data={mobileAppSchema} />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO BÖLÜMÜ (Apsiyon Co-Branded Kurumsal Teknoloji Vitrini)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 px-[var(--spacing-gutter)] overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        
        {/* Glow & Gradient Atmosfer Efektleri */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#00A5DF]/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#FF9503]/8 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-[var(--spacing-container-max)] mx-auto text-center relative z-10">
          
          {/* Ortaklık Rozeti (Alo Yönetim x Apsiyon) */}
          <div className="inline-flex items-center gap-3 bg-white/90 hover:bg-white border border-slate-200 shadow-sm dark:bg-white/[0.07] dark:border-white/15 backdrop-blur-md px-5 py-2 rounded-full mb-8 transition-all duration-300 transform-gpu">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Alo Yönetim</span>
            </span>
            <span className="text-slate-300 dark:text-slate-600 font-light">×</span>
            <ApsiyonLogo variant="full" width={100} height={23} fillColor="#00A5DF" title="Apsiyon Teknoloji Ortaklığı" />
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#00A5DF] bg-[#00A5DF]/10 border border-[#00A5DF]/30 px-2.5 py-0.5 rounded-full ml-1">
              Canlı Mobil Altyapı
            </span>
          </div>

          {/* Sayfanın Tek ve Ana H1 Başlığı */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 text-slate-900 dark:text-white">
            Site ve Tesis Yönetiminin Tamamı{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A5DF] via-[#0284C7] to-[#FF9503]">
              Cebinizde
            </span>
          </h1>

          {/* Alt Açıklama */}
          <p className="text-base sm:text-lg md:text-xl font-normal text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Alo Yönetim güvencesi ve Apsiyon&apos;un bulut teknolojisiyle; tüm kat sakinlerimiz, ev sahiplerimiz ve site yönetim kurullarımız için 7/24 online aidat ödeme, arıza takibi, dijital oylama ve 360° şeffaf yönetim portalı.
          </p>

          {/* Rol Değiştirici Sekmeler (Sakin vs. Yönetici) */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 dark:bg-white/[0.08] border border-slate-300/60 dark:border-white/10 shadow-inner mb-8 transition-all duration-300 transform-gpu">
            <button
              type="button"
              onClick={() => setActiveRole('resident')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform-gpu flex items-center gap-2 cursor-pointer ${
                activeRole === 'resident'
                  ? 'bg-gradient-to-r from-[#00A5DF] to-[#088DC0] text-white shadow-md shadow-[#00A5DF]/30'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">person</span>
              <span>Site Sakini & Kat Maliki (Apsiyon)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole('manager')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform-gpu flex items-center gap-2 cursor-pointer ${
                activeRole === 'manager'
                  ? 'bg-gradient-to-r from-[#FF9503] to-[#EA580C] text-white shadow-md shadow-[#FF9503]/30'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">admin_panel_settings</span>
              <span>Yönetici & Denetçi (Apsiyon Manager)</span>
            </button>
          </div>

          {/* Canlı Mağaza İndirme Butonları */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-8 transition-all duration-300 transform-gpu">
            {activeRole === 'resident' ? (
              <>
                {/* App Store (Sakin) */}
                <a
                  href="https://apps.apple.com/app/apsiyon/id1115852575"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/20 px-6 py-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-[1.03] shadow-sm hover:shadow-md group cursor-pointer"
                  aria-label="Apsiyon iOS uygulamasını App Store'dan indirin"
                >
                  <span className="material-symbols-outlined text-3xl text-slate-900 dark:text-white" aria-hidden="true">phone_iphone</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#00A5DF] font-bold uppercase tracking-wider">Download on the</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">App Store</span>
                  </div>
                </a>

                {/* Google Play (Sakin) */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.apsiyon.mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/20 px-6 py-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-[1.03] shadow-sm hover:shadow-md group cursor-pointer"
                  aria-label="Apsiyon Android uygulamasını Google Play'den indirin"
                >
                  <span className="material-symbols-outlined text-3xl text-emerald-500" aria-hidden="true">android</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-bold uppercase tracking-wider">GET IT ON</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">Google Play</span>
                  </div>
                </a>

                {/* Huawei AppGallery (Sakin) */}
                <a
                  href="https://appgallery.huawei.com/app/C100486001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/20 px-6 py-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-[1.03] shadow-sm hover:shadow-md group cursor-pointer"
                  aria-label="Apsiyon uygulamasını Huawei AppGallery'den indirin"
                >
                  <span className="material-symbols-outlined text-3xl text-rose-500" aria-hidden="true">storefront</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-rose-600 dark:text-rose-300 font-bold uppercase tracking-wider">EXPLORE ON</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">AppGallery</span>
                  </div>
                </a>
              </>
            ) : (
              <>
                {/* App Store (Manager) */}
                <a
                  href="https://apps.apple.com/app/apsiyon-manager/id1453210408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/20 px-6 py-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-[1.03] shadow-sm hover:shadow-md group cursor-pointer"
                  aria-label="Apsiyon Manager iOS uygulamasını App Store'dan indirin"
                >
                  <span className="material-symbols-outlined text-3xl text-slate-900 dark:text-white" aria-hidden="true">phone_iphone</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#FF9503] font-bold uppercase tracking-wider">Manager iOS</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">App Store</span>
                  </div>
                </a>

                {/* Google Play (Manager) */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.apsiyon.manager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/20 px-6 py-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-[1.03] shadow-sm hover:shadow-md group cursor-pointer"
                  aria-label="Apsiyon Manager Android uygulamasını Google Play'den indirin"
                >
                  <span className="material-symbols-outlined text-3xl text-emerald-500" aria-hidden="true">android</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-bold uppercase tracking-wider">Manager Android</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">Google Play</span>
                  </div>
                </a>
              </>
            )}

            {/* Web Giriş Butonu */}
            <a
              href="https://online.apsiyon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-[#00A5DF] to-[#088DC0] hover:from-[#0092C7] hover:to-[#077BA8] px-6 py-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-[1.03] shadow-md shadow-[#00A5DF]/20 text-white font-bold cursor-pointer"
              aria-label="Apsiyon Web Portalı ile Giriş Yapın"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">open_in_new</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-cyan-100 uppercase tracking-wider">Tarayıcıdan Hemen</span>
                <span className="text-base font-bold leading-tight">Web Girişi</span>
              </div>
            </a>

            {/* QR Kod Aç/Kapat Butonu */}
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 px-4 py-3 rounded-2xl transition-all duration-300 transform-gpu text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl text-amber-500" aria-hidden="true">qr_code_2</span>
              <span>{showQr ? 'QR Kodu Gizle' : 'Kamerayla Okut (QR)'}</span>
            </button>
          </div>

          {/* QR Kod Açılır Kartı */}
          {showQr && (
            <div className="bg-white text-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 inline-flex flex-col items-center gap-3 mb-8 transition-all duration-300 transform-gpu mx-auto">
              <div className="w-40 h-40 bg-slate-950 rounded-2xl p-3 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white" aria-hidden="true">
                  <rect x="0" y="0" width="30" height="30" fill="white" />
                  <rect x="5" y="5" width="20" height="20" fill="#0f172a" />
                  <rect x="10" y="10" width="10" height="10" fill="white" />
                  <rect x="70" y="0" width="30" height="30" fill="white" />
                  <rect x="75" y="5" width="20" height="20" fill="#0f172a" />
                  <rect x="80" y="10" width="10" height="10" fill="white" />
                  <rect x="0" y="70" width="30" height="30" fill="white" />
                  <rect x="5" y="75" width="20" height="20" fill="#0f172a" />
                  <rect x="10" y="80" width="10" height="10" fill="white" />
                  <rect x="40" y="10" width="10" height="20" fill="white" />
                  <rect x="55" y="5" width="10" height="10" fill="white" />
                  <rect x="40" y="40" width="20" height="20" fill="white" />
                  <rect x="10" y="45" width="15" height="10" fill="white" />
                  <rect x="75" y="45" width="15" height="15" fill="white" />
                  <rect x="45" y="70" width="15" height="20" fill="white" />
                  <rect x="70" y="75" width="20" height="10" fill="white" />
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-800">Telefonunuzun kamerasıyla okutun</p>
              <p className="text-[11px] text-slate-500 text-center max-w-[220px]">
                Cihazınız otomatik tespit edilir ve doğrudan mağazadaki Apsiyon sayfasına yönlendirilirsiniz.
              </p>
            </div>
          )}

          {/* Yasal Güvence ve Akreditasyon Rozetleri */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400" aria-hidden="true">gavel</span>
              <span>634 KMK Tam Uyumluluk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#00A5DF]" aria-hidden="true">lock</span>
              <span>256-Bit SSL Şifreleme</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-purple-600 dark:text-purple-400" aria-hidden="true">shield</span>
              <span>KVKK Gizlilik Koruması</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#FF9503]" aria-hidden="true">verified_user</span>
              <span>BDDK Lisanslı Sanal POS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SAKİN & YÖNETİCİ BENTO GRID ÖZELLİK MATRİSİ
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A5DF]/10 border border-[#00A5DF]/30 text-[#00A5DF] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">featured_play_list</span>
            <span>{activeRole === 'resident' ? 'Site Sakini Deneyimi' : 'Yönetim Kurulu Gücü'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            {activeRole === 'resident'
              ? 'Site Sakinlerinin Hayatını Kolaylaştıran Özellikler'
              : 'Yönetim Kurulları İçin Güçlü Finans ve Operasyon Araçları'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
            {activeRole === 'resident'
              ? 'Telefonunuzdan çıkmadan aidatınızı ödeyin, ortak alan arızalarını bildirin, genel kurulda oyunuzu kullanın.'
              : 'Apsiyon Manager ile aidat tahsilatlarını, banka hesaplarını, personel vardiyalarını ve noter onaylı kararları 360° denetleyin.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 hover:border-[#00A5DF]/50 p-6 rounded-3xl flex flex-col gap-4 shadow-sm hover:shadow-xl hover:shadow-[#00A5DF]/10 hover:scale-[1.02] transition-all duration-300 transform-gpu group relative overflow-hidden"
            >
              {/* Arka plan minik ışıltı */}
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#00A5DF]/5 rounded-full blur-2xl group-hover:bg-[#00A5DF]/15 transition-colors" />

              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A5DF]/15 to-[#088DC0]/15 border border-[#00A5DF]/30 flex items-center justify-center text-[#00A5DF] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">{f.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10">
                  {f.tag}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-[#00A5DF] transition-colors">{f.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. 3 ADIMDA KOLAY KURULUM (ONBOARDING)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto border-t border-slate-200/80 dark:border-slate-800/60">
        <div className="text-center mb-12">
          <span className="text-[#FF9503] text-xs font-bold uppercase tracking-widest block mb-2">HIZLI VE KOLAY ERİŞİM</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            3 Adımda Apsiyon&apos;a Başlayın
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-normal">
            Alo Yönetim tarafından yönetilen sitelerde dakikalar içinde dijital dünyaya bağlanın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Adım 1 */}
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 p-6 rounded-3xl shadow-sm relative flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#00A5DF] text-white font-extrabold flex items-center justify-center mb-4 text-lg shadow-md shadow-[#00A5DF]/30">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Uygulamayı Yükleyin</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Cihazınıza göre iOS App Store, Google Play veya Huawei AppGallery üzerinden Apsiyon uygulamasını saniyeler içinde indirin.
            </p>
          </div>

          {/* Adım 2 */}
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 p-6 rounded-3xl shadow-sm relative flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF9503] text-white font-extrabold flex items-center justify-center mb-4 text-lg shadow-md shadow-[#FF9503]/30">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Tesis Bilginizle Giriş Yapın</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Alo Yönetim sisteminde kayıtlı cep telefonu numaranızı girin; SMS ile gelen tek kullanımlık güvenlik koduyla dairenize bağlanın.
            </p>
          </div>

          {/* Adım 3 */}
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 p-6 rounded-3xl shadow-sm relative flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center mb-4 text-lg shadow-md shadow-emerald-500/30">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">7/24 Dijital Yönetim</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Aidatlarınızı ödeyin, anlık duyuruları takip edin, teknik taleplerinizi iletin ve sitenizdeki şeffaf yönetimin keyfini çıkarın.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SIKÇA SORULAN SORULAR (FAQ ACCORDION & SCHEMA)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-[var(--spacing-gutter)] max-w-4xl mx-auto border-t border-slate-200/80 dark:border-slate-800/60">
        <div className="text-center mb-10">
          <span className="text-[#00A5DF] text-xs font-bold uppercase tracking-widest block mb-2">MERAK EDİLENLER</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Apsiyon Mobil Portalı Hakkında Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={item.q}
                className="bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 hover:border-[#00A5DF]/40 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-[#00A5DF] dark:text-white transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <span
                    className={`material-symbols-outlined text-xl text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#00A5DF]' : ''
                    }`}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. KURUMSAL TEKLİF & İLETİŞİM ÇAĞRISI (CTA)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-gradient-to-r from-[#00A5DF]/10 via-[#F0FAFD] to-[#FF9503]/10 border border-[#00A5DF]/30 rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-xl dark:from-[#00A5DF]/20 dark:via-[#282E45]/60 dark:to-[#FF9503]/20 dark:border-white/15">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A5DF]/10 blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00A5DF]/15 text-[#00A5DF] mb-4">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">domain_add</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Sitenizi veya Tesisinizi Alo Yönetim Güvencesine Taşıyın
          </h3>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Apsiyon dijital altyapısı ve Alo Yönetim&apos;in 15 yılı aşkın saha uzmanlığıyla sitenizde aidat tahsilat oranını %98&apos;in üzerine çıkaralım, tüm işletme bütçesini şeffaf kılalım.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/teklif-al"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00A5DF] to-[#088DC0] hover:from-[#0092C7] hover:to-[#077BA8] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#00A5DF]/20 hover:scale-105 text-sm cursor-pointer"
            >
              <span>Ücretsiz Hizmet Teklifi Alın</span>
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </Link>

            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 dark:bg-white/10 dark:border-white/20 dark:text-white font-bold px-8 py-4 rounded-xl transition-all shadow-sm text-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">call</span>
              <span>Uzmanımızla Görüşün</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
