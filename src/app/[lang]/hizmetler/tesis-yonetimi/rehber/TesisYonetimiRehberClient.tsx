"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const CHECKLIST = [
  { icon: 'verified', item: 'ISO 9001, ISO 45001, TSE belgeleri güncel mi?' },
  { icon: 'verified', item: '5188 Özel Güvenlik Faaliyet Belgesi var mı?' },
  { icon: 'verified', item: 'En az 3 aktif referans site ziyaret edildi mi?' },
  { icon: 'verified', item: 'Sözleşmede SLA süreleri (45 dk müdahale) yazıyor mu?' },
  { icon: 'verified', item: 'Aylık raporlama ve hesap verme yükümlülüğü var mı?' },
  { icon: 'verified', item: 'Fesih süresi (min 90 gün) ve koşulları netleştirildi mi?' },
  { icon: 'verified', item: 'Gizli ücretler ve ekstra kalemler teyit edildi mi?' },
  { icon: 'verified', item: 'Kat malikleri kurulu kararı alındı mı?' },
];

const STEPS = [
  { step: '01', title: 'İhtiyaç Analizi', desc: 'Binanızın büyüklüğü, mevcut hizmet kapsamı ve bütçenizi belirleyin. Hangi hizmetlere ihtiyacınız olduğunu listeleyin.' },
  { step: '02', title: 'Referans & Belge Kontrolü', desc: 'Firmanın ISO sertifikaları, 5188 lisansı ve TSE belgelerini isteyin. En az 3 referans siteyi doğrulayın.' },
  { step: '03', title: 'Teklif Karşılaştırma', desc: 'En az 3 firmadan kalem kalem teklif alın. Sadece toplam fiyatı değil, SLA\'yı ve neyin dahil olduğunu karşılaştırın.' },
  { step: '04', title: 'Sözleşme İncelemesi', dest: 'Sözleşmeyi bir avukata inceletin; SLA, raporlama, fesih ve ceza maddelerini netleştirin.' },
  { step: '05', title: 'Kurul Onayı', desc: 'KMK m.34 uyarınca kat malikleri kurulunda oy çokluğuyla yetkilendirme ve noter devir protokolünü imzalayın.' },
  { step: '06', title: 'Devir & Başlangıç', desc: 'Eski yöneticiden hesap ve demirbaşları teslim alın; tüm sakinleri bilgilendirin ve hizmetleri devreye alın.' },
];

const FAQS = [
  { question: 'Tesis yönetim şirketi seçerken en önemli kriter nedir?', answer: 'ISO sertifikaları, 5188 güvenlik lisansı ve TSE belgelerinin güncelliği en kritik kriterdir. Referans sitelerden doğrudan geri bildirim almak ve şeffaf sözleşme şartları da vazgeçilmez unsurlardandır.' },
  { question: 'Tesis yönetim sözleşmesinde mutlaka olması gereken maddeler nelerdir?', answer: 'Hizmet kapsamı, SLA süreleri (örn. 45 dakika acil müdahale), aylık raporlama yükümlülüğü, fesih süresi (90 gün), gizlilik, sorumluluk sınırları ve ceza maddeleri mutlaka yer almalıdır.' },
  { question: 'Teklif alırken nelere dikkat etmeliyim?', answer: 'Sadece toplam fiyata değil, fiyata neyin dahil olduğuna (personel, malzeme, KDV) bakın. Gizli ücretler, ekstra hizmet ücretleri ve sözleşme dışı maliyet kalemlerini netleştirin.' },
  { question: 'Mevcut yöneticimizi değiştirmek için ne yapmalıyız?', answer: 'Olağan veya olağanüstü kat malikleri kurulu toplanır; oy çokluğuyla mevcut yönetici görevden alınır ve yeni firma atanır. Tüm süreç noterle tescil edilir.' },
  { question: 'Tesis yönetim şirketini ne sıklıkla denetlemeliyim?', answer: 'En az ayda bir kez aylık rapor ve hesap özeti talep edin. 6 ayda bir fiili denetim yapın. Yıllık olağan toplantıda bütçe ve hizmet performansını değerlendirin.' },
];

export default function TesisYonetimiRehberClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-900">
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-4xl mx-auto w-full text-center mt-20 flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-violet-300 border border-violet-400/30 bg-violet-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              Kapsamlı Rehber 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Tesis Yönetim Şirketi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-violet-500">Nasıl Seçilir?</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl font-light">
              Sözleşme maddeleri, değerlendirme kriterleri, sorulacak sorular ve adım adım geçiş rehberi.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* 6 Adım */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3 text-center">6 Adımda Doğru Tesis Yönetim Şirketi Seçimi</h2>
          <p className="text-[var(--color-text-muted)] text-center mb-12 max-w-2xl mx-auto">Doğru kararı vermek için izlemeniz gereken sistematik süreç.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6">
                <span className="text-3xl font-black text-violet-400 leading-none">{s.step}</span>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{s.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Kontrol Listesi */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-10 md:p-14">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">Tesis Yönetim Şirketi Seçim Kontrol Listesi</h2>
          <ul className="space-y-4">
            {CHECKLIST.map((c) => (
              <li key={c.item} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-400 text-xl mt-0.5 flex-shrink-0" aria-hidden="true">{c.icon}</span>
                <span className="text-[var(--color-text-secondary)]">{c.item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 p-6 bg-violet-500/10 border border-violet-400/20 rounded-2xl">
            <p className="text-violet-300 font-semibold mb-2">Alo Yönetim Bu Listedeki Tüm Kriterleri Karşılıyor</p>
            <p className="text-sm text-slate-400">ISO 9001, ISO 45001, 5188 ve TSE belgeli; şeffaf sözleşme; aylık raporlama; 45 dk SLA taahhüdü.</p>
            <Link href="/teklif-al" className="mt-4 inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2.5 px-6 rounded-xl transition-all">
              Ücretsiz Teklif Al <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Sektör Karşılaştırma */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Mülk Tipine Göre Tesis Yönetimi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans & Lüks Site', icon: 'apartment', color: 'amber' },
              { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza & Ofis Binası', icon: 'business', color: 'blue' },
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut', icon: 'domain', color: 'emerald' },
              { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi Tesisi', icon: 'factory', color: 'orange' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-3 p-6 border border-[var(--color-outline)]/60 rounded-2xl hover:border-brand-500/40 text-center transition-all group">
                <span className="material-symbols-outlined text-4xl text-brand-500 group-hover:scale-110 transition-transform" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</span>
                <span className="text-xs text-[var(--color-text-muted)]">Detaylı incele →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Tesis Yönetim Şirketi Seçimi — Sık Sorulan Sorular" />
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/rehber" />
      <PreFooterCta />
    </>
  );
}
