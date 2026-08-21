"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const FEATURES = [
  { icon: 'savings', title: 'Aidat Optimizasyonu', desc: 'Toplu satın alma ve enerji tasarrufu ile daire başına %25-33 maliyet düşüşü.' },
  { icon: 'gavel', title: 'KMK Uyumluluk', desc: 'm.37 işletme projesi, olağan genel kurul ve tüm yasal süreçlerin eksiksiz yönetimi.' },
  { icon: 'fitness_center', title: 'Sosyal Tesis İşletmesi', desc: 'Spor salonu, yüzme havuzu, çocuk parkı ve kreş işletme ve bakımı.' },
  { icon: 'landscape', title: 'Peyzaj & Sulama', desc: 'Geniş yeşil alanlarda peyzaj bakımı, çim biçme ve otomatik sulama sistemi yönetimi.' },
  { icon: 'receipt_long', title: 'Dijital Aidat Tahsilatı', desc: 'SMS, WhatsApp ve kredi kartı ile online tahsilat; otomatik hukuki icra takibi.' },
  { icon: 'security', title: 'Devriyeli Güvenlik', desc: '5188 lisanslı gece-gündüz devriyeli güvenlik, CCTV ve çocuk güvenliği.' },
];

const STEPS = [
  { name: '1. Site Tespiti', text: 'Sitenin bağımsız bölüm sayısı, ortak alanları, sosyal tesisleri ve mevcut harcama kalemleri yerinde incelenir.' },
  { name: '2. Tasarruf Analizi', text: 'Mevcut giderler analiz edilerek toplu satın alma, enerji optimizasyonu ve personel verimliliği ile %25-33 tasarruf potansiyeli hesaplanır.' },
  { name: '3. Kurul Kararı', text: 'KMK m.34 uyarınca kat malikleri kurulunda oy çokluğuyla yetkilendirme ve noter devir protokolü imzalanır.' },
  { name: '4. Entegre Yönetim', text: 'Tüm hizmetler ve sosyal tesis işletmesi tek merkezden başlatılır; aylık bütçe raporu kat maliklerine sunulur.' },
];

const FAQS = [
  { question: 'Toplu konut yönetiminde aidat nasıl optimize edilir?', answer: 'Toplu satın alma, hizmet konsolidasyonu ve enerji tasarrufu projeleri aracılığıyla büyük sitelerde daire başına aidatı %25-33 düşürmek mümkündür. Sosyal tesis işletmesinin gelire katkısı da aidatı azaltır.' },
  { question: '200 daireli bir sitede ne tür hizmetler verilir?', answer: '5188 güvenlik, ortak alan temizliği, asansör ve jeneratör bakımı, havuz & peyzaj yönetimi, aidat takibi, KMK hukuki danışmanlığı ve sosyal tesis (spor salonu, oyun parkı) işletmesi entegre olarak sunulur.' },
  { question: 'KMK\'ya uyum nasıl sağlanır?', answer: 'KMK m.37 işletme projesi yıllık hazırlanır, m.29 kapsamında olağan genel kurul Ocak ayında yapılır, m.20 gereği gider paylaşımı arsa payına göre uygulanır. Tüm yasal süreçler Alo Yönetim tarafından takip edilir.' },
  { question: 'Sosyal tesisler nasıl işletilir?', answer: 'Sosyal tesisler için ayrı işletme bütçesi oluşturulur; kullanım rezervasyon sistemi kurulur; temizlik ve teknik bakım günlük yapılır. Gelir, site bütçesine katkı olarak aktarılır.' },
  { question: 'Büyük sitede aidat geciktirenlere nasıl müdahale edilir?', answer: 'Otomatik SMS hatırlatma, WhatsApp bildirim, avukat ihtarı ve KMK m.20 kapsamında icra takibi süreçleri aşamalı uygulanır. Tahsilat oranı %98\'in üzerinde tutulur.' },
];

export default function TopluKonutYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20 flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-emerald-300 border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              Büyük Ölçekli Site Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Toplu Konut &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">Site Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl font-light">
              200+ daireli büyük konut projelerinde aidat optimizasyonu, KMK uyumlu yönetim ve sosyal tesis işletmesi. Daire başına %25-33 tasarruf.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105">
                Tasarruf Analizi Talep Et
              </Link>
              <Link href="/hizmetler/tesis-yonetimi" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-xl transition-all">
                Tesis Yönetimi Ana Sayfa
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Tasarruf Banner */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 rounded-2xl p-8 text-center">
          <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">Ortalama Tasarruf</p>
          <p className="text-5xl font-black text-white mb-2">%25-33</p>
          <p className="text-slate-300">Büyük ölçekli sitelerde daire başına yıllık işletme gider tasarrufu</p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-12 text-center">Toplu Konut Yönetim Hizmetleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6 hover:border-emerald-400/40 transition-all">
                <span className="material-symbols-outlined text-emerald-400 text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Süreç */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo name="Büyük Site Yönetimine Geçiş Süreci" description="Toplu konut projenizi profesyonel yönetime taşımak 4 adımda tamamlanır." steps={STEPS} />
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Toplu Konut Yönetimi — Sık Sorulan Sorular" />
        </div>

        {/* İlgili Sayfalar */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Diğer Sektörel Çözümler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans & Lüks Site', icon: 'apartment' },
              { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi Tesisi Yönetimi', icon: 'factory' },
              { href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberi', icon: 'menu_book' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 border border-[var(--color-outline)]/60 rounded-xl hover:border-brand-500/40 transition-all">
                <span className="material-symbols-outlined text-brand-500">{item.icon}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" />
      <PreFooterCta />
    </>
  );
}
