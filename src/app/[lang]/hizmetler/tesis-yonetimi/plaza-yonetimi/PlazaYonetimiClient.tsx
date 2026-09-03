"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const FEATURES = [
  { icon: 'ac_unit', title: 'HVAC & Merkezi Klima', desc: 'Merkezi klima ve havalandırma sistemleri bakımı, enerji programlaması ve filtre değişimi.' },
  { icon: 'security', title: 'Kurumsal Güvenlik', desc: '5188 lisanslı personel, araç plaka tanıma (PTS), turnike ve CCTV izleme merkezi.' },
  { icon: 'bolt', title: 'Enerji Optimizasyonu', desc: 'Kompanzasyon sistemi, akıllı aydınlatma ve enerji tüketim raporlaması ile %15-25 tasarruf.' },
  { icon: 'elevator', title: 'Asansör & Yürüyen Merdiven', desc: 'Periyodik bakım, yeşil etiket ve 7/24 acil müdahale hizmeti.' },
  { icon: 'groups', title: 'Kiracı Koordinasyonu', desc: 'Kiracı geçiş-çıkış protokolleri, ortak alan kuralları ve dijital talep yönetimi.' },
  { icon: 'cleaning_services', title: 'Kurumsal Temizlik', desc: 'TSE 13811 standartlarında günlük ortak alan temizliği ve otopark yıkama.' },
];

const STEPS = [
  { name: '1. Teknik Keşif', text: 'Plazanızın HVAC, elektrik, asansör ve güvenlik sistemlerini uzman ekibimiz yerinde değerlendirir.' },
  { name: '2. Kapsamlı Teklif', text: 'Kiracı sayısı, m² ve hizmet kapsamına göre şeffaf fiyatlandırma ile detaylı teknik plan sunulur.' },
  { name: '3. Sözleşme & Devir', text: 'Hukuki incelemeden geçirilmiş sözleşme imzalanır; mevcut sistemlerin devri 48 saatte tamamlanır.' },
  { name: '4. Kurumsal İşletme', text: 'Aylık teknik rapor, kira öncesi/sonrası protokol ve 7/24 teknik destek ile kesintisiz işletme sağlanır.' },
];

const FAQS = [
  { question: 'Plaza tesis yönetiminde en kritik hizmetler nelerdir?', answer: 'HVAC sistemlerinin merkezi bakımı, enerji optimizasyonu, kiracı geçiş ve çıkış protokolleri, asansör/yürüyen merdiven bakımı ve 7/24 teknik destek plazalarda kritik öneme sahiptir.' },
  { question: 'Ticari binada enerji tasarrufu nasıl sağlanır?', answer: 'Kompanzasyon sistemi ile reaktif güç cezası sıfırlanır; HVAC programlaması ile boş saatlerde enerji tüketimi azaltılır; LED dönüşümü ve akıllı aydınlatma sistemleri uygulanır. Ortalama %15-25 enerji tasarrufu elde edilir.' },
  { question: 'Kiracı yönetimi nasıl koordine edilir?', answer: 'Her kiracı için bağımsız bölüm teslim-iade protokolü, ortak alan kullanım kuralları ve güvenlik kimlik kartı sistemi uygulanır. Kiracı şikayetleri dijital portal üzerinden takip edilir.' },
  { question: 'Plaza güvenliği nasıl sağlanır?', answer: '5188 lisanslı güvenlik personeli, araç plaka tanıma sistemi (PTS), turnike girişleri, CCTV izleme ve 7/24 güvenlik kontrol merkezi ile kapsamlı güvenlik sağlanır.' },
  { question: 'Acil teknik arızalarda müdahale süresi ne kadar?', answer: 'SLA kapsamında kritik teknik arızalarda (asansör, HVAC, jeneratör) maksimum 45 dakika müdahale süresi taahhüt edilir. 7/24 acil teknik ekibimiz sahada hazır bulunur.' },
];

export default function PlazaYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20 flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-blue-300 border border-blue-400/30 bg-blue-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              Kurumsal Tesis Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Plaza & Ofis Binası{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl font-light">
              İstanbul plaza ve ofis binaları için HVAC yönetimi, enerji optimizasyonu, kiracı koordinasyonu ve 7/24 teknik destek. Üretkenliğinizi koruyoruz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105">
                Ücretsiz Teknik Keşif
              </Link>
              <Link href="/hizmetler/tesis-yonetimi" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-xl transition-all">
                Tesis Yönetimi Ana Sayfa
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3 text-center">Plaza Tesis Yönetim Hizmetleri</h2>
          <p className="text-[var(--color-text-muted)] text-center mb-12 max-w-2xl mx-auto">Kurumsal standartlarda, kesintisiz ve ölçülebilir plaza yönetimi.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6 hover:border-blue-400/40 transition-all">
                <span className="material-symbols-outlined text-blue-400 text-3xl mb-3 block" aria-hidden="true">{f.icon}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{f.desc}</p>
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
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut Yönetimi', icon: 'domain' },
              { href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberi', icon: 'menu_book' },
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
