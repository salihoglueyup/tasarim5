'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ApsiyonLogo from '@/components/ui/branding/ApsiyonLogo';
import JsonLd from '@/components/seo/schema/JsonLd';

import Icon from '@/components/ui/branding/Icon';
type PortalRole = 'resident' | 'manager';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Apsiyon uygulamasını indirmek ve kullanmak ücretli mi?',
    a: 'Uygulama App Store, Google Play ve Huawei AppGallery üzerinden indirilebilir. Kullanım koşulları ve olası ücretler Apsiyon\'a aittir; güncel bilgi için mağaza sayfasına ve Apsiyon\'un kendi duyurularına bakın.'
  },
  {
    q: 'Alo Yönetim ile Apsiyon arasındaki ilişki nedir?',
    a: 'Apsiyon, site yönetimi yazılımı geliştiren bir teknoloji firmasıdır ve Alo Yönetim\'in iş ortağıdır. Aidat, tahsilat, talep ve duyuru gibi yazılımla ilgili tüm işlemler Apsiyon altyapısı üzerinden yürür; uygulamanın sahibi ve geliştiricisi Apsiyon\'dur.'
  },
  {
    q: 'Online ödeme güvenliği ve kart bilgilerim konusunda kim sorumlu?',
    a: 'Ödeme ekranları ve ödeme altyapısı Apsiyon ile onun anlaştığı ödeme kuruluşlarına aittir. Güvenlik ve veri işleme ayrıntıları için Apsiyon\'un gizlilik ve güvenlik açıklamalarına bakabilirsiniz.'
  },
  {
    q: 'Kiracıyım; uygulamada neler yapabilirim?',
    a: 'Görebileceğiniz ve yapabileceğiniz işlemler sitenizde Apsiyon üzerinde hangi modüllerin açık olduğuna ve yönetimin size verdiği yetkiye göre değişir. Hangi işlemlerin sitenizde aktif olduğunu site yönetiminizden öğrenebilirsiniz. Genel kurulda oy hakkı Kat Mülkiyeti Kanunu uyarınca kat malikine aittir.'
  },
  {
    q: 'Birden fazla dairem varsa ne yapmalıyım?',
    a: 'Birden fazla bağımsız bölümün aynı hesapta nasıl görüneceği Apsiyon\'un hesap kurgusuna bağlıdır. Daireleriniz sistemde tanımlıysa giriş yaptığınızda size bağlı bölümleri görürsünüz; göremiyorsanız site yönetiminize başvurun.'
  },
  {
    q: 'Yönetici veya denetçiyim; Apsiyon Manager\'a nasıl erişirim?',
    a: 'Yönetim kurulu veya denetim kurulu üyesiyseniz, hesabınızın yönetici yetkisiyle tanımlanması için site yönetiminize başvurun. Yetki tanımlandıktan sonra Apsiyon Manager mobil uygulamasını ve web panelini kullanabilirsiniz; erişebileceğiniz raporlar yetkinize ve sitenizin ayarlarına göre değişir.'
  }
];

const RESIDENT_FEATURES = [
  {
    icon: 'credit_card',
    title: 'Online Aidat Ödeme',
    desc: 'Sitenizde etkinse aidat ve avans borçlarınızı uygulamadan görüntüleyip ödeyebilirsiniz.',
    tag: 'Ödeme'
  },
  {
    icon: 'home_repair_service',
    title: 'Talep ve Arıza Bildirimi',
    desc: 'Ortak alan arıza ve taleplerinizi uygulamadan iletin, durumunu takip edin.',
    tag: 'Talep'
  },
  {
    icon: 'notifications_active',
    title: 'Duyurular',
    desc: 'Yönetimin duyurularını uygulama üzerinden takip edin.',
    tag: 'Haberleşme'
  },
  {
    icon: 'receipt_long',
    title: 'Borç ve Ödeme Geçmişi',
    desc: 'Dairenize ait borç ve ödeme geçmişinizi görüntüleyin.',
    tag: 'Şeffaflık'
  }
];

const MANAGER_FEATURES = [
  {
    icon: 'account_balance',
    title: 'Tahsilat ve Kasa Takibi',
    desc: 'Aidat tahsilatlarını ve gelir-gider hareketlerini Apsiyon Manager üzerinden izleyin.',
    tag: 'Apsiyon Manager'
  },
  {
    icon: 'balance',
    title: 'Gecikme Takibi',
    desc: 'Geciken aidat borçlarını listeleyin ve takip edin; hukuki süreçler için hukuk danışmanından destek alın.',
    tag: 'Takip'
  },
  {
    icon: 'notifications_active',
    title: 'Toplu Duyuru ve Bildirim',
    desc: 'Kat maliklerine duyuruları Apsiyon üzerinden iletin; hangi kanalların (SMS, e-posta, bildirim) açık olduğu sitenize göre değişir.',
    tag: 'İletişim'
  },
  {
    icon: 'menu_book',
    title: 'Kayıt ve Raporlar',
    desc: 'Yönetim kayıtlarını ve raporları panelden görüntüleyin; kapsam sitenizin ayarlarına bağlıdır.',
    tag: 'Raporlama'
  }
];

export default function ApsiyonMobileHub() {
  const [activeRole, setActiveRole] = useState<PortalRole>('resident');
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

  // Uygulama Apsiyon'undur ve bizim puan/yorum verimiz yok; uygulama şeması (puan zorunlu) yerine sayfa şeması kullanılır.
  const mobileAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Apsiyon — Alo Yönetim Sakin ve Yönetici Portalı',
    description: 'Alo Yönetim\'in iş ortağı Apsiyon\'un sakin ve yönetici uygulamaları: aidat ödemesi, borç ve ödeme geçmişi, duyuru ve talep takibi (kapsam sitenize göre değişir).',
    about: {
      '@type': 'Thing',
      name: 'Apsiyon mobil uygulaması',
      sameAs: [
        'https://apps.apple.com/app/apsiyon/id1115852575',
        'https://play.google.com/store/apps/details?id=com.apsiyon.mobile',
        'https://appgallery.huawei.com/app/C100486001',
        'https://online.apsiyon.com/',
      ],
    },
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
            <ApsiyonLogo variant="full" width={100} height={23} fillColor="#00A5DF" title="Apsiyon İş Ortaklığı" />
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#00A5DF] bg-[#00A5DF]/10 border border-[#00A5DF]/30 px-2.5 py-0.5 rounded-full ml-1">
              İş Ortağımız
            </span>
          </div>

          {/* Sayfanın Tek ve Ana H1 Başlığı */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 text-slate-900 dark:text-white">
            Site Yönetimi İşlemleriniz{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A5DF] via-[#0284C7] to-[#FF9503]">
              Cebinizde
            </span>
          </h1>

          {/* Alt Açıklama */}
          <p className="text-base sm:text-lg md:text-xl font-normal text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            İş ortağımız Apsiyon&apos;un sakin ve yönetici uygulamalarıyla aidat, talep ve duyuru işlemlerini mobilden ve web'den takip edebilirsiniz. Yazılımla ilgili tüm işlemleri Apsiyon yürütür; sunulan özellikler sitenize göre ayarlanır.
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
              <Icon name="person" className="text-lg" />
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
              <Icon name="admin_panel_settings" className="text-lg" />
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
                  <Icon name="phone_iphone" className="text-3xl text-slate-900 dark:text-white" />
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
                  <Icon name="android" className="text-3xl text-emerald-500" />
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
                  <Icon name="storefront" className="text-3xl text-rose-500" />
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
                  <Icon name="phone_iphone" className="text-3xl text-slate-900 dark:text-white" />
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
                  <Icon name="android" className="text-3xl text-emerald-500" />
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
              <Icon name="open_in_new" className="text-2xl" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-100 uppercase tracking-wider">Tarayıcıdan Hemen</span>
                <span className="text-base font-bold leading-tight">Web Girişi</span>
              </div>
            </a>

          </div>

          {/* Bilgi notu */}
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Uygulamalar Apsiyon&apos;a aittir. Güncel kullanıcı puanları ve yorumlar için yukarıdaki mağaza sayfalarına bakabilirsiniz. Hangi özelliklerin açık olduğunu ve sorularınızı site yönetiminize iletebilirsiniz.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SAKİN & YÖNETİCİ BENTO GRID ÖZELLİK MATRİSİ
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A5DF]/10 border border-[#00A5DF]/30 text-[#00A5DF] text-xs font-bold uppercase tracking-wider mb-3">
            <Icon name="featured_play_list" className="text-sm" />
            <span>{activeRole === 'resident' ? 'Site Sakini Deneyimi' : 'Yönetim Kurulu Araçları'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            {activeRole === 'resident'
              ? 'Site Sakinleri İçin Özellikler'
              : 'Yönetim Kurulları İçin Finans ve Takip Araçları'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
            {activeRole === 'resident'
              ? 'Aidat borcunuzu görüntüleyin, taleplerinizi iletin, duyuruları takip edin (özellikler sitenize göre değişir).'
              : 'Apsiyon Manager ile tahsilat, kasa hareketleri ve duyuruları takip edin (kapsam sitenizin ayarlarına bağlıdır).'}
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
                  <Icon name={f.icon} className="text-2xl" />
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
            Alo Yönetim tarafından yönetilen sitelerde Apsiyon&apos;a başlamak için şu adımları izleyin.
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
              Cihazınıza göre App Store, Google Play veya Huawei AppGallery üzerinden Apsiyon uygulamasını indirin.
            </p>
          </div>

          {/* Adım 2 */}
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 p-6 rounded-3xl shadow-sm relative flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF9503] text-white font-extrabold flex items-center justify-center mb-4 text-lg shadow-md shadow-[#FF9503]/30">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Tesis Bilginizle Giriş Yapın</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Site yönetiminde kayıtlı bilgilerinizle Apsiyon&apos;a giriş yapın; giriş yöntemi Apsiyon'un kurgusuna göre değişir.
            </p>
          </div>

          {/* Adım 3 */}
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 p-6 rounded-3xl shadow-sm relative flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center mb-4 text-lg shadow-md shadow-emerald-500/30">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Dijital Yönetim</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Sitenizde açık olan özelliklere göre aidat, duyuru ve talep işlemlerinizi uygulamadan yürütün.
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
            Apsiyon Portalı Hakkında Sıkça Sorulan Sorular
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
                  <Icon name="expand_more" className={`text-xl text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#00A5DF]' : ''
                    }`} />
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
            <Icon name="domain_add" className="text-3xl" />
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Sitenizi veya Tesisinizi Alo Yönetim Güvencesine Taşıyın
          </h3>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Apsiyon yazılımı ve Alo Yönetim&apos;in 2009'dan beri saha deneyimiyle sitenizin aidat takibini ve işletme düzenini birlikte yürütelim.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/teklif-al"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00A5DF] to-[#088DC0] hover:from-[#0092C7] hover:to-[#077BA8] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#00A5DF]/20 hover:scale-105 text-sm cursor-pointer"
            >
              <span>Ücretsiz Hizmet Teklifi Alın</span>
              <Icon name="arrow_forward" className="text-base" />
            </Link>

            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 dark:bg-white/10 dark:border-white/20 dark:text-white font-bold px-8 py-4 rounded-xl transition-all shadow-sm text-sm cursor-pointer"
            >
              <Icon name="call" className="text-base" />
              <span>Uzmanımızla Görüşün</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
