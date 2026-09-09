"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const OPERATIONAL_PILLARS = [
  {
    icon: 'local_taxi',
    title: 'Vale & VIP Kapalı Otopark Yönetimi',
    badge: '< 3 Dk Karşılama SLA',
    desc: 'Lobi girişinde eğitimli vale kadrosu, barkodlu araç fişi, tam kapsamlı garaj mali mesuliyet sigortası ve elektrikli araç (EV) şarj istasyonu koordinasyonu.',
    highlights: ['Zimmetli araç teslim-tesellüm dijital sistemi', 'Vale kasko sorumluluk poliçesi güvencesi', 'EV şarj doluluk takibi ve sıralı şarj modu']
  },
  {
    icon: 'concierge_bell',
    title: '7/24 Concierge & Lobi Karşılama',
    badge: '365 Gün Kesintisiz',
    desc: 'İki dilli (TR/EN) karşılama ekibi, kargo ve kurye paketlerinin barkodlu akıllı teslim dolaplarında 7/24 muhafazası ve daire sakinine anlık SMS/uygulama bildirimi.',
    highlights: ['Ziyaretçi QR kodlu davet teyidi', 'Şifreli akıllı kargo teslim dolapları', 'Kuru temizleme, çiçek ve özel servis karşılama']
  },
  {
    icon: 'badge',
    title: 'UHF RFID Plaka Tanıma & Turnike Geçişi',
    badge: 'KVKK & 5188 Lisanslı',
    desc: 'Otopark bariyerlerinde beklemesiz UHF cam etiketi ve PTS kamerası, asansörlerde sadece yetkili kata erişim sağlayan kartlı geçiş ve koruma paneli montajı.',
    highlights: ['Yetkili kata erişimli asansör kontrolü', 'UHF etiketli hızlı bariyer otomasyonu', 'Fit-out taşınma asansörü koruma protokolü']
  },
  {
    icon: 'pool',
    title: 'Havuz, Spa & Sağlık Bakanlığı Su Hijyeni',
    badge: 'T.C. Sağlık Bakanlığı Onaylı',
    desc: 'Kapalı ve açık yüzme havuzları, sauna ve fitness salonlarında günlük serbest klor (1-3 ppm) ve pH (7.2-7.8) dijital ölçümü; akredite laboratuvar aylık analizleri.',
    highlights: ['Günde 2 kez serbest klor ve pH ölçüm defteri', 'UV-C dezenfeksiyon ünitesi ve ters yıkama', 'Fitness aletlerinin günlük medikal dezenfeksiyonu']
  },
  {
    icon: 'receipt_long',
    title: '%99.2 Aidat Tahsilat Garantisi & KMK m.37',
    badge: 'Sıfır Bütçe Açığı',
    desc: 'KMK m.37 noter onaylı işletme projesi tebliği, sanal POS ile anlık aidat tahsilatı, otomatik SMS/WhatsApp hatırlatması ve gecikmelerde KMK m.20 icra takibi.',
    highlights: ['%99.2 vadesinde tahsilat başarı oranı', 'KMK m.20/2 aylık %5 kanuni gecikme faizi', 'Kat malikleri mobil canlı bütçe denetim paneli']
  },
  {
    icon: 'elevator',
    title: 'Asansör A Tipi Yeşil Etiket & 15-25 Dk SLA',
    badge: 'TSE & MMO Akrediteli',
    desc: 'Yüksek hızlı kule asansörlerinin A tipi muayene kuruluşu yıllık yeşil etiket koordinasyonu, çift fren emniyeti ve acil mahsur kalmalarda 15-25 dk müdahale.',
    highlights: ['MMO / TSE onaylı yeşil etiket denetimleri', 'Kritik arızalarda 15-25 dk nöbetçi mobil SLA', 'Deprem ve yangın sensörlü otomatik tahliye']
  },
];

const STEPS = [
  { name: '1. Ücretsiz Tesis Keşfi & Risk Raporu', text: 'Rezidansınızı yerinde inceliyor; mekanik sistemler, vale/otopark kapasitesi, havuz hijyeni ve aidat tahsilat performansını raporluyoruz.' },
  { name: '2. Şeffaf İşletme Projesi & Tasarruf Planı', text: 'Rezidansınızın lüks yaşam standardına uygun işletme bütçesini, toplu tedarik avantajlarını ve %20-30 maliyet tasarrufu projeksiyonunu sunuyoruz.' },
  { name: '3. Kat Malikleri Kurulu & Noter Devri', text: 'KMK m.34 uyarınca kat malikleri kurulunda yetkilendirme sonrası noter onaylı devir teslim protokolünü ve çalışan SGK güvencesini işletiyoruz.' },
  { name: '4. Kesintisiz 7/24 Premium İşletme', text: 'Concierge, vale, 5188 güvenlik ve teknik servis 24 saat içinde sıfır hizmet kesintisi ile kurumsal Alo Yönetim standardında devreye alınır.' },
];

const FAQS = [
  { question: 'Rezidans tesis yönetimi normal site yönetiminden nasıl farklıdır?', answer: 'Rezidanslarda 7/24 concierge, vale otopark koordinasyonu, lobi resepsiyon, kartlı asansör geçişi, Sağlık Bakanlığı onaylı havuz/spa hijyeni ve %99.2 aidat tahsilat disiplini standart olarak uygulanır. Bu kurumsal yönetim mülkünüzün ikinci el satış ve kira değerini doğrudan %15-25 artırır.' },
  { question: 'Lüks rezidanslarda güvenlik ve kartlı geçiş nasıl sağlanır?', answer: '5188 lisanslı güvenlik personeli, 24 saat lobi görevlisi, KVKK uyumlu CCTV izleme merkezi, UHF etiketli hızlı otopark bariyerleri ve asansörlerde sadece yetkili daire katına erişim sağlayan kartlı otomasyonla tam güvenlik sağlanır.' },
  { question: 'Havuz, fitness ve spa alanları nasıl yönetilir?', answer: 'Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği kapsamında her gün sabah ve akşam dijital serbest klor/pH ölçümü yapılır ve deftere işlenir. Ayda bir akredite halk sağlığı laboratuvarında mikrobiyolojik su analizi gerçekleştirilir.' },
  { question: 'Rezidans aidat yönetimi ve tahsilat oranı nasıl garanti edilir?', answer: 'KMK m.37 uyarınca hazırlanan resmi tebliğli işletme projesi, mobil uygulama, otomatik SMS/WhatsApp hatırlatmaları ve banka sanal POS entegrasyonuyla tahsilat %99.2 seviyesinde tutulur. Ödenmeyen aidatlarda KMK m.20 gereğince aylık %5 kanuni faizle icra süreci yürütülür.' },
  { question: 'Rezidans yönetiminde teknik arızalara müdahale süresi nedir?', answer: 'SLA sözleşmemiz kapsamında asansörde mahsur kalma, yangın alarmı ve hidrofor arızası gibi kritik durumlarda 15-25 dakika acil müdahale süresi taahhüt edilir. 39 ilçede 7/24 nöbetçi mobil teknik servis filomuz hazırdır.' },
];

export default function RezidansYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-amber-300 border border-amber-400/30 bg-amber-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              VIP Rezidans & Çok Katlı Kule Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Rezidans & Lüks Site{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Tesis Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              İstanbul&apos;un seçkin rezidans kuleleri için 7/24 concierge, zimmetli vale otopark protokolü, UHF RFID geçiş, Sağlık Bakanlığı onaylı havuz hijyeni ve %99.2 aidat tahsilat garantisi.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                Ücretsiz Rezidans Keşfi İste
              </Link>
              <Link href="/hizmetler/tesis-yonetimi" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                Merkezi Tesis Yönetimi Standartları
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* 6'lı Operasyonel Standartlar Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full border border-amber-200/60 dark:border-amber-800/40">
              Operasyonel Derinlik & Saha Protokolleri
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              Rezidans Yaşamında Sıfır Toleranslı Hizmet Standartlarımız
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              Lobi karşılama masasından kapalı otoparka, asansör emniyetinden aidat bütçesine kadar tüm süreçler kurumsal KPI&apos;larla denetlenir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERATIONAL_PILLARS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-3xl p-7 hover:border-amber-400/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl" aria-hidden="true">{f.icon}</span>
                    </span>
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--color-primary)] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4 font-normal">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-outline)]/40 space-y-1.5">
                  {f.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[var(--color-secondary)]">
                      <span className="material-symbols-outlined text-emerald-500 text-sm shrink-0" aria-hidden="true">check_circle</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Süreç */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo
            name="Rezidans Yönetimine Profesyonel Geçiş Süreci"
            description="Alo Yönetim ile rezidansınızı profesyonel yönetime taşımak 4 adımda tamamlanır."
            steps={STEPS}
          />
        </div>

        {/* Prestijli Rezidans İlçeleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-xl" aria-hidden="true">location_city</span>
            <span>İstanbul Genelinde Hizmet Verdiğimiz Seçkin Rezidans Bölgeleri</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Bölgenize özel mimari yapılar, kentsel dönüşüm dinamikleri ve yerinde hazır bekleyen mobil teknik ekiplerimiz:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Kadıköy Rezidans', slug: 'kadikoy' },
              { name: 'Beşiktaş Kuleleri', slug: 'besiktas' },
              { name: 'Şişli Rezidans', slug: 'sisli' },
              { name: 'Bakırköy Sahil', slug: 'bakirkoy' },
              { name: 'Kartal Rezidans', slug: 'kartal' },
              { name: 'Ataşehir Finans', slug: 'atasehir' },
            ].map((d) => (
              <Link
                key={d.slug}
                href={`/bolgeler/${d.slug}/tesis-yonetimi`}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 transition-all text-center shadow-xs"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Rezidans Tesis Yönetimi — Sık Sorulan Sorular" />
        </div>

        {/* İlgili Sayfalar */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Diğer Sektörel Tesis Yönetimi Çözümleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza & Ofis Yönetimi', icon: 'business' },
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut & Site Yönetimi', icon: 'domain' },
              { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi & Fabrika Yönetimi', icon: 'factory' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 border border-[var(--color-outline)]/60 rounded-xl hover:border-amber-500/40 transition-all">
                <span className="material-symbols-outlined text-amber-500" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" />
      <PreFooterCta />
    </>
  );
}
