"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const OPERATIONAL_PILLARS = [
  {
    icon: 'local_fire_department',
    title: 'Adresli Yangın Otomasyonu & Duman Tahliyesi',
    badge: 'Yangın Yönetmeliği Uyumlu',
    desc: 'BMS entegreli akıllı yangın santrali, sprinkler zon vanaları, duman tahliye damperleri ve haftalık yangın hidroforu otomatik test çalıştırmaları.',
    highlights: ['Haftalık dizel yangın hidroforu testleri', 'Duman algılamada asansör otomatik tahliye katı', 'İtfaiye onaylı yıllık yangın ve tahliye tatbikatı']
  },
  {
    icon: 'bolt',
    title: '3x Senkron Jeneratör & Kesintisiz Güç',
    badge: '8-12 Sn Sıfır Kesinti',
    desc: 'Paralel çalışan senkron jeneratör grupları ile şebeke kesintisinde yük paylaşımı (load-sharing), 24 saatlik yedek motorin stoku ve UPS akü odası izleme.',
    highlights: ['Dinamik kademeli devreye alma ve senkronizasyon', 'Haftalık boşta, aylık %75 yükte test çalıştırma', 'UPS odası 22°C hassas iklimlendirme ve voltaj takibi']
  },
  {
    icon: 'mode_fan',
    title: 'HVAC Merkezi İklimlendirme & Chiller Bakımı',
    badge: '3 Ayda Bir Periyodik',
    desc: 'Chiller soğutma grupları, açık kulelerde biyosit dozajı ile lejyonella engelleme, fancoil kimyasal filtre yıkama ve CO2 sensörlü taze hava optimizasyonu.',
    highlights: ['3 ayda bir fancoil filtre yıkama ve antibakteriyel sprey', 'Açık kulelerde Lejyoner hastalığı önleme rejimi', 'BMS üzerinden dinamik mevsimlik konfor sıcaklık rejimi']
  },
  {
    icon: 'calculate',
    title: 'Ortak Alan Enerji Dağıtımı & Alt Sayaç Okuma',
    badge: '%0 Reaktif Ceza',
    desc: 'Merkezi ısıtma/soğutma giderlerinin M-Bus kalorimetre ve alt sayaçlarla yasal yönetmeliğe tam uygun paylaştırılması, kompanzasyon ile sıfır reaktif ceza.',
    highlights: ['Her ayın 1\'inde dijital uzaktan sayaç okuma', 'Kompanzasyon kondansatör kademe denetimi ile %0 ceza', 'Fit-out kiracı teknik teslim-iade ve gürültü izin protokolü']
  },
  {
    icon: 'badge',
    title: 'Turnike Geçiş, Ziyaretçi QR & Güvenlik',
    badge: '5188 Lisanslı Özel Güvenlik',
    desc: 'Lobi turnike hızlı kartlı/QR geçiş, araç plaka tanıma sistemi (PTS), 7/24 CCTV izleme merkezi ve yük asansörü rezervasyonlu kiracı koordinasyonu.',
    highlights: ['Ziyaretçi ön kayıt ve dijital davet sistemi', 'Yük asansörü tahsisli mesai dışı taşınma izni', 'Valilik izinli 5188 üniformalı güvenlik kadrosu']
  },
  {
    icon: 'cleaning_services',
    title: 'TSE 13811 Kurumsal Temizlik & Otopark Yıkama',
    badge: 'TSE 13811 Sertifikalı',
    desc: 'Plaza dış cephe cam silimi (dağcı/platform), ortak kat holleri, panoramik asansör kabinleri ve binicili zemin otomatlarıyla epoksi otopark yıkama.',
    highlights: ['Dış cephe dağcı ekibiyle periyodik cam temizliği', 'Çevre dostu sertifikalı dezenfektan ve kimyasallar', 'Atık ayrıştırma lojistiği ve sıfır atık belgelendirmesi']
  },
];

const STEPS = [
  { name: '1. Kapsamlı Teknik & Enerji Keşfi', text: 'Plazanızın HVAC, jeneratör senkronizasyonu, trafo kompanzasyonu ve yangın otomasyon sistemlerini yerinde inceliyor, eksikleri raporluyoruz.' },
  { name: '2. Şeffaf İşletme Şartnamesi (RFP)', text: 'Kiracı profili, m² ve çalışma saatlerine uygun detaylı teknik bakım takvimi ve şeffaf işletme bütçesini 48 saatte sunuyoruz.' },
  { name: '3. Hukuki Sözleşme & SLA Garantisi', text: '45 dakika acil teknik müdahale SLA taahhüdü, %0 reaktif ceza garantisi ve noter onaylı devir protokolü imzalanır.' },
  { name: '4. Kesintisiz Kurumsal İşletme', text: 'Mevcut kiracıların iş akışında hiçbir kesinti yaşanmadan tüm sistemler Alo Yönetim merkezi yönetim paneline entegre edilir.' },
];

const FAQS = [
  { question: 'Plaza tesis yönetiminde yangın otomasyonu ve hidrofor testleri nasıl yapılır?', answer: 'Yangın algılama santrali, sprinkler zon vanaları ve duman tahliye damperleri BMS üzerinden 7/24 izlenir. Her hafta dizel ve elektrikli yangın hidroforları otomatik test modunda çalıştırılarak basınç testleri resmi kayıt defterine işlenir.' },
  { question: 'Jeneratör senkronizasyonu plazada neden hayati öneme sahiptir?', answer: 'A+ plazalarda paralel çalışan senkron jeneratörler, şebeke kesildiğinde 8-12 saniyede devreye girerek yük paylaşımı yapar. Tek bir jeneratörün arızalanması halinde diğerleri kritik yükleri beslemeye devam eder, böylece veri merkezleri ve asansörlerde kesinti yaşanmaz.' },
  { question: 'Merkezi HVAC iklimlendirme ve fancoil bakımları hangi periyotlarla yapılır?', answer: 'Chiller soğutma grupları ve açık soğutma kuleleri her mevsim geçişinde A\'dan Z\'ye bakımdan geçirilir; soğutma kulelerinde Lejyonella bakterisine karşı biyosit dozajı uygulanır. Kat fancoil filtreleri ise 3 ayda bir yıkanarak antibakteriyel spreylenir.' },
  { question: 'Kiracılar arasında ortak alan enerji giderleri nasıl paylaştırılır?', answer: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Gider Paylaşım Yönetmeliği gereğince; bağımsız bölümlerin kalorimetre, ultrasonik sayaç ve elektrik alt sayaçları her ay başında dijital okunur. Kompanzasyon takibiyle elektrik faturasındaki reaktif güç cezası %0\'da tutulur.' },
  { question: 'Acil teknik arızalarda müdahale SLA süreniz ne kadardır?', answer: 'Sözleşmeli SLA taahhüdümüz kapsamında kritik teknik arızalara (asansör durması, jeneratör transfer hatası, su basması) maksimum 45 dakika içinde yerinde müdahale edilir.' },
];

export default function PlazaYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-900 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-blue-300 border border-blue-400/30 bg-blue-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              A+ Plaza & Ticari İş Merkezi Tesis Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Plaza & Ofis Binası{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Tesis Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              İstanbul plazaları için adresli yangın otomasyonu, 3x senkron jeneratör yük paylaşımı, HVAC chiller periyodik bakımı, kalorimetre ortak gider paylaşımı ve %0 reaktif ceza güvencesi.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                Ücretsiz Teknik Keşif Talep Et
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
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-200/60 dark:border-blue-800/40">
              Operasyonel Mühendislik & Teknik Disiplin
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              Plaza ve İş Merkezlerinde Kesintisiz İşletme Standartlarımız
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              Elektromekanik donanımların yıpranmasını önlüyor, enerji tüketimini optimize ediyor ve kiracı memnuniyetini en üst düzeyde tutuyoruz.
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
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-3xl p-7 hover:border-blue-400/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl" aria-hidden="true">{f.icon}</span>
                    </span>
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
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
            name="Plaza Yönetimine Geçiş Süreci"
            description="Plazanızı profesyonel yönetime taşımak 4 adımda tamamlanır."
            steps={STEPS}
          />
        </div>

        {/* Ticari Plaza Merkezleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500 text-xl" aria-hidden="true">corporate_fare</span>
            <span>İstanbul Genelinde Hizmet Ağımızın Bulunduğu Plaza & Ticaret Merkezleri</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Büyük iş merkezlerinin yoğunlaştığı iş koridorlarında kesintisiz nöbetçi saha ekiplerimizle hizmet veriyoruz:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Şişli Plazaları', slug: 'sisli' },
              { name: 'Beşiktaş (Levent)', slug: 'besiktas' },
              { name: 'Ataşehir Finans', slug: 'atasehir' },
              { name: 'Ümraniye İş Vadisi', slug: 'umraniye' },
              { name: 'Kadıköy İş Merkezleri', slug: 'kadikoy' },
              { name: 'Bakırköy Ticaret', slug: 'bakirkoy' },
            ].map((d) => (
              <Link
                key={d.slug}
                href={`/bolgeler/${d.slug}/tesis-yonetimi`}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all text-center shadow-xs"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Plaza Tesis Yönetimi — Sık Sorulan Sorular" />
        </div>

        {/* İlgili Sayfalar */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Diğer Sektörel Çözümler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans & Lüks Site', icon: 'apartment' },
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut & Site Yönetimi', icon: 'domain' },
              { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi & Fabrika Yönetimi', icon: 'factory' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 border border-[var(--color-outline)]/60 rounded-xl hover:border-brand-500/40 transition-all">
                <span className="material-symbols-outlined text-brand-500" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/plaza-yonetimi" />
      <PreFooterCta />
    </>
  );
}
