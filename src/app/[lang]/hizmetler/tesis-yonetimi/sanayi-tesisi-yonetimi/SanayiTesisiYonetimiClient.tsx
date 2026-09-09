"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const OPERATIONAL_PILLARS = [
  {
    icon: 'health_and_safety',
    title: 'ISO 45001 İSG & ATEX Patlamadan Korunma',
    badge: 'Yılda 2 Yangın & Tahliye Tatbikatı',
    desc: 'Fabrika ve depolarda patlamadan korunma dokümanı (ATEX 137 / 99/92/EC), ex-proof ekipman denetimleri, ISO 45001 İSG mevzuat uyumu ve yılda 2 kez itfaiye katılımlı yangın tahliye tatbikatı.',
    highlights: ['ATEX patlama risk analizi ve ex-proof etiketleme', 'Yılda 2 acil durum ve yangın tahliye tatbikatı', 'KKD ve İSG risk değerlendirme defteri takibi']
  },
  {
    icon: 'bolt',
    title: '34.5 kV OG Trafo & Kompanzasyon (%0 Ceza)',
    badge: 'Sıfır Reaktif Ceza Garantisi',
    desc: '34.5 kV Orta Gerilim (OG) trafo merkezleri, kuru ve yağlı tip trafo yağ analizi, kesici/ayırıcı manevra testleri ve uzaktan GSM kontrollü kompanzasyon panosuyla sıfır reaktif ceza güvencesi.',
    highlights: ['Trafo izolasyon yağı ve dielektrik delinme testi', 'Harmonik filtreli dinamik tristörlü kompanzasyon', 'TEDAŞ/BEDAŞ faturası %0 endüktif/kapasitif garanti']
  },
  {
    icon: 'cleaning_services',
    title: 'Ağır Endüstriyel Epoksi Zemin & Drenaj Bakımı',
    badge: 'Yüksek Basınç & Zemin Hijyeni',
    desc: 'Forklift ve transpalet trafiğinin yoğun olduğu üretim zeminlerinde binicili akülü zemin otomatları, epoksi çatlak tamiri, yağ ayırıcı sistemler ve kimyasal ızgara drenaj kanalı temizliği.',
    highlights: ['Ağır zemin otomatlarıyla pH dengeli yağ çözücü', 'Epoksi zemin lokal yama ve dilatasyon onarımı', 'Mazot ve kimyasal atık ızgarası periyodik drenajı']
  },
  {
    icon: 'precision_manufacturing',
    title: 'Kantar, Hızlı PVC Kapı & Yükleme Körüğü',
    badge: 'Aylık PPM & 30 Dk Acil Servis',
    desc: 'Tır kantarları periyodik kalibrasyon takibi, hızlı sarmal PVC kapılar, hidrolik rampa ve yükleme körüklerinin aylık planlı koruyucu bakımı (PPM) ile lojistikte sıfır bekleme.',
    highlights: ['Sanayi Bakanlığı damgalı kantar kalibrasyonu', 'Hidrolik rampa ve hızlı PVC sarmal kapı bakımı', 'Lojistik yükleme rampalarında 30 dk acil arıza SLA']
  },
  {
    icon: 'fence',
    title: '5188 Lisanslı Çevre Güvenliği & Termal Gece Görüş',
    badge: 'KVKK & Perimetre Güvenlik',
    desc: 'Fabrika sahası çevre çitlerinde mikrodalga bariyer, termal gece görüş kameraları, tır/kamyon dorsesi mühür ve kantar kayıt kontrolü ile 7/24 5188 güvenlik.',
    highlights: ['Perimetre lazer ve kızılötesi ışın bariyerleri', 'Tır dorsesi güvenlik mührü ve irsaliye eşleme', 'Yangın söndürme tüpleri ve hidrant hat kontrolü']
  },
  {
    icon: 'recycling',
    title: 'ISO 14001 Tehlikeli Atık & Sıfır Atık Yönetimi',
    badge: 'MOTAT & Sıfır Atık Uyumlu',
    desc: 'Tesis tehlikeli atıklarının Çevre, Şehircilik ve İklim Değişikliği Bakanlığı MOTAT sistemi üzerinden bertarafa sevki, geçici atık deposu işletmesi ve Sıfır Atık Belgesi alımı.',
    highlights: ['Bakanlık onaylı MOTAT tehlikeli atık sevkiyatı', 'Geçici depolama sahası sızdırmazlık denetimi', 'ISO 14001 Çevre Yönetim Sistemi periyodik raporu']
  },
];

const STEPS = [
  { name: '1. Endüstriyel Keşif & ATEX / Risk Analizi', text: 'Tesisinizin trafo gücü, yangın ve gaz algılama hatları, atık sahası ve İSG risk noktaları mühendis ekibimizce yerinde incelenir.' },
  { name: '2. Önleyici Bakım (PPM) & SLA Protokolü', text: 'Üretim sürekliliğini koruyan kritik ekipman listesi, acil müdahale SLA taahhütleri ve reaktif ceza önleme planı çıkarılır.' },
  { name: '3. Entegre Hizmet & Personel Sevk', text: '5188 özel güvenlik, endüstriyel temizlik ekibi, sertifikalı trafo/kazan teknisyenleri tesiste görevlendirilir.' },
  { name: '4. 7/24 Kesintisiz Üretim & Denetim', text: 'Haftalık mekanik kontroller, aylık kompanzasyon endeks okumaları ve periyodik İSG tatbikatlarıyla tesis eksiksiz işletilir.' },
];

const FAQS = [
  { question: 'Sanayi tesislerinde ISO 45001 İSG ve ATEX patlamadan korunma nasıl uygulanır?', answer: 'Tesisinizde yanıcı toz ve kimyasal gaz içeren alanlar belirlenerek ATEX patlamadan korunma dokümanı hazırlanır. Ex-proof aydınlatma ve motorlar denetlenir. ISO 45001 kapsamında çalışanlara KKD zimmeti yapılır ve yılda en az iki kez acil tahliye ve yangın tatbikatı gerçekleştirilir.' },
  { question: '34.5 kV OG trafo ve reaktif ceza takibi nasıl yapılır?', answer: 'Orta gerilim trafo merkezlerinin manevra yetki belgeli mühendisler tarafından bakımı yapılır, trafo izolasyon yağının delinme gerilimi test edilir. GSM tabanlı uzaktan sayaç okuma sistemiyle kompanzasyon panosu 7/24 izlenir; %0 endüktif ve kapasitif reaktif ceza garantisi verilir.' },
  { question: 'Ağır endüstriyel zeminler ve kimyasal kanallar nasıl temizlenir?', answer: 'Üretim holleri ve depolarda ağır zemin tipi binicili otomatlar, alkali yağ çözücü kimyasallar kullanılır. Forklift lastik izleri silinir, kimyasal kanal ve yağ tutucular periyodik olarak vidanjörle vakumlanarak temizlenir.' },
  { question: 'Lojistik rampaları, kantar ve hızlı kapıların bakımı ne sıklıkla yapılır?', answer: 'Tır yükleme rampaları, körükler ve hızlı PVC kapılar aylık koruyucu bakım programına (PPM) alınır. Tır kantarlarının Sanayi ve Teknoloji Bakanlığı onaylı periyodik mühürleme ve kalibrasyon testleri eksiksiz takip edilir.' },
  { question: 'Tehlikeli ve endüstriyel atıkların bertarafı nasıl belgelenir?', answer: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Çevre İzin ve Lisans Yönetmeliği kapsamında atıklar kodlarına göre geçici depolama sahasında toplanır ve MOTAT (Mobil Atık Takip Sistemi) lisanslı araçlarla lisanslı bertaraf tesislerine sevk edilerek raporlanır.' },
];

export default function SanayiTesisiYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-orange-950/30 to-slate-900 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-orange-300 border border-orange-400/30 bg-orange-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              Endüstriyel Tesis & Fabrika Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Sanayi Tesisi &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">Fabrika Tesis Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              İstanbul sanayi siteleri ve fabrikalar için ISO 45001 İSG uyumu, ATEX patlamadan korunma, 34.5 kV OG trafo bakımı, %0 reaktif ceza güvencesi ve 7/24 kesintisiz üretim desteği.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                Endüstriyel Keşif Talep Et
              </Link>
              <Link href="/hizmetler/tesis-yonetimi" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                Tesis Yönetimi Standartları
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* 6'lı Operasyonel Standartlar Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1.5 rounded-full border border-orange-200/60 dark:border-orange-800/40">
              Üretim Güvenliği & Ağır Teknik Altyapı
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              Sanayi Tesislerinde Sıfır Duruş Garantili Yönetim Standartlarımız
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              OG trafo merkezlerinden kantar kalibrasyonuna, ATEX patlama güvenliğinden tehlikeli atık yönetimine kadar endüstriyel disiplin.
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
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-3xl p-7 hover:border-orange-400/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl" aria-hidden="true">{f.icon}</span>
                    </span>
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/40">
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
            name="Sanayi Tesisi Yönetim Süreci"
            description="Sanayi tesisi veya fabrikanızı profesyonel yönetime taşımak 4 adımda tamamlanır."
            steps={STEPS}
          />
        </div>

        {/* Sanayi ve OSB Bölgeleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-xl" aria-hidden="true">precision_manufacturing</span>
            <span>Hizmet Sunduğumuz Başlıca Sanayi ve OSB Aksları</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Ağır sanayi, kimya, lojistik ve organize sanayi bölgelerine konuşlu mobil teknik servis filomuzla hizmet veriyoruz:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Tuzla OSB & Tersane', slug: 'tuzla' },
              { name: 'İkitelli OSB (Başakşehir)', slug: 'basaksehir' },
              { name: 'Dudullu OSB (Ümraniye)', slug: 'umraniye' },
              { name: 'Kartal Sanayi', slug: 'kartal' },
              { name: 'Beylikdüzü Sanayi', slug: 'beylikduzu' },
              { name: 'Esenyurt Lojistik', slug: 'esenyurt' },
            ].map((d) => (
              <Link
                key={d.slug}
                href={`/bolgeler/${d.slug}/tesis-yonetimi`}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-400 transition-all text-center shadow-xs"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Sanayi Tesisi Yönetimi — Sık Sorulan Sorular" />
        </div>

        {/* İlgili Sayfalar */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Diğer Sektörel Tesis Yönetimi Çözümleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza & Ofis Yönetimi', icon: 'business' },
              { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans & Lüks Site Yönetimi', icon: 'apartment' },
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut & Site Yönetimi', icon: 'domain' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 border border-[var(--color-outline)]/60 rounded-xl hover:border-orange-500/40 transition-all">
                <span className="material-symbols-outlined text-orange-500" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi" />
      <PreFooterCta />
    </>
  );
}
