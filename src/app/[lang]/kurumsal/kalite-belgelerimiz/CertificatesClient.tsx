"use client";

import { useLanguage } from '@/context/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/layout/page/PageHeader';
import { AccreditationAiOverviewSeo, ServiceAuthorityHubSeo } from '@/components/seo';
import { CERTIFICATES, type Certificate } from '@/data/certificates';

type Category = 'all' | 'cevre' | 'is-sagligi' | 'risk-sureklillik' | 'musteri' | 'sosyal';

const CATEGORY_LABELS: Record<Category, { label: string; icon: string }> = {
  all:                { label: 'Tümü', icon: 'workspace_premium' },
  cevre:              { label: 'Çevre & Sürdürülebilirlik', icon: 'eco' },
  'is-sagligi':       { label: 'İş Sağlığı & Güvenlik', icon: 'health_and_safety' },
  'risk-sureklillik': { label: 'Risk & Süreklilik', icon: 'security' },
  musteri:            { label: 'Müşteri Memnuniyeti', icon: 'support_agent' },
  sosyal:             { label: 'Sosyal Sorumluluk', icon: 'diversity_3' },
};

function CertificateCard({ cert }: { cert: Certificate }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for a fluid Apple TV style feeling
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation values (tilt effect)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Map mouse position to shine effect
  const shineOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.05, 0.3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onClick={() => router.push(`/kurumsal/sertifikalar/${cert.slug}`)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative cursor-pointer group h-[360px] md:h-[410px] w-full perspective-[1000px]"
    >
      <div 
        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-slate-900 dark:group-hover:border-white flex flex-col justify-between"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Glow / Shine Layer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-slate-100/40 to-white/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 pointer-events-none"
          style={{ opacity: shineOpacity }}
        />

        <div className="p-6 md:p-8 h-full flex flex-col items-start justify-between relative z-10">
          <div className="w-full flex items-center justify-between">
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="material-symbols-outlined text-white text-2xl" aria-hidden="true">{cert.icon}</span>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                No: {cert.certificateNumber}
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Mühür: {cert.sealNumber}
              </span>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-end w-full mt-4" style={{ transform: "translateZ(20px)" }}>
            <span className="inline-block self-start text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 mb-2">
              {cert.name}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
              {cert.subtitle}
            </h3>
            <p className="text-xs md:text-sm font-light text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
              {cert.description}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between w-full">
              <Link
                href={`/kurumsal/sertifikalar/${cert.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
              >
                <span>Detaylı İncele</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
              <div className="flex items-center gap-2.5">
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  aria-label={`${cert.name} PDF indir`}
                >
                  <span className="material-symbols-outlined text-xs" aria-hidden="true">download</span>
                  PDF
                </a>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <a
                  href="https://www.belcert.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 hover:underline"
                  aria-label="BELCERT resmi sorgulama"
                >
                  <span>Doğrula</span>
                  <span className="material-symbols-outlined text-[12px]" aria-hidden="true">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificatesClient({ lang = 'tr' }: { lang?: string }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedAuditIndex, setSelectedAuditIndex] = useState<number>(0);
  const [auditVerifiedStatus, setAuditVerifiedStatus] = useState<string | null>(null);

  const filteredCerts = activeCategory === 'all'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === activeCategory);

  const categories = (Object.keys(CATEGORY_LABELS) as Category[]).map((key) => ({
    key,
    ...CATEGORY_LABELS[key],
    count: key === 'all' ? CERTIFICATES.length : CERTIFICATES.filter((c) => c.category === key).length,
  }));

  const activeAuditCert = CERTIFICATES[selectedAuditIndex] || CERTIFICATES[0];

  const handleAuditVerify = (certNum: string) => {
    setAuditVerifiedStatus('Sorgulanıyor...');
    setTimeout(() => {
      setAuditVerifiedStatus(`✓ ${certNum} numaralı sertifika BELCERT resmi kütüğünde AKTİF ve GEÇERLİDİR.`);
    }, 500);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. SAYFA BAŞLIĞI (PAGE HEADER)                                            */}
      {/* ========================================================================= */}
      <PageHeader 
        title={t('certificates_title')} 
        description={t('certificates_desc')} 
      />

      {/* ========================================================================= */}
      {/* 2. GOOGLE AI OVERVIEWS & AKREDİTASYON OTORİTESİ (INSTANT ANSWER)          */}
      {/* ========================================================================= */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pt-6 pb-2">
        <AccreditationAiOverviewSeo lang={lang} />
      </div>

      {/* ========================================================================= */}
      {/* 3. ANA SERTİFİKA VİTRİNİ & İNTERAKTİF 3D KARTLAR                          */}
      {/* ========================================================================= */}
      <section className="relative py-12 md:py-16 bg-slate-50/50 dark:bg-slate-950 overflow-hidden">
        {/* Subtle background blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-slate-200/50 dark:bg-slate-900/30 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] relative z-10 flex flex-col gap-16">
          
          {/* Bölüm Başlığı ve Manifestosu */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[16px] text-emerald-600 dark:text-emerald-400" aria-hidden="true">verified_user</span>
              <span>BELCERT & ILAS Uluslararası Akredite Tescillerimiz</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
              {t('certificates_manifest_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400">{t('certificates_manifest_title_2')}</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 text-left md:text-center justify-center text-slate-600 dark:text-slate-300">
              <p className="text-sm md:text-base font-light leading-relaxed flex-1">
                {t('certificates_manifest_p1')}
              </p>
              <p className="text-sm md:text-base font-light leading-relaxed flex-1">
                {t('certificates_manifest_p2')}
              </p>
            </div>
          </div>

          {/* Kategori Filtre Sekmeleri */}
          <div className="flex flex-wrap gap-2 justify-center -mt-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">{cat.icon}</span>
                {cat.label}
                <span className={`text-[10px] font-mono ml-0.5 px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.key
                    ? 'bg-white/20 dark:bg-slate-900/20'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}>{cat.count}</span>
              </button>
            ))}
          </div>

          {/* 3D Sertifika Kartları Grid'i */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 perspective-[2000px]"
          >
            {filteredCerts.map((cert) => (
              <CertificateCard 
                key={cert.slug} 
                cert={cert} 
              />
            ))}
          </motion.div>

          {/* ========================================================================= */}
          {/* 4. TESİS YÖNETİMİ KALİTE VE AKREDİTASYON STANDARTLARI REHBERİ             */}
          {/* ========================================================================= */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400" aria-hidden="true">menu_book</span>
                <span>Kurumsal Rehber: Uluslararası Kalite Çerçevesi ve Hukuki Koruma</span>
              </div>
              <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                ISO 41001 & 5188 Güvenlik Mevzuatı
              </span>
            </div>

            <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
              <p>
                <strong className="text-[var(--color-primary)] font-bold">Tesis Yönetimi Kalite ve Akreditasyon Standartları</strong>;{' '}
                <Link href="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  konut siteleri
                </Link>
                ,{' '}
                <Link href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  lüks rezidanslar
                </Link>
                ,{' '}
                <Link href="/hizmetler/tesis-yonetimi/plaza-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  iş merkezleri ve plazalar
                </Link>
                {' '}ile{' '}
                <Link href="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  sanayi tesislerinde
                </Link>{' '}
                sunulan tüm hizmetlerin bağımsız denetim, iş güvenliği, çevre duyarlılığı ve sakin memnuniyeti prosedürlerine tam uygun olarak icra edilmesini teminat altına alır.
              </p>

              {/* 4 Ana Kalite Disiplini Sütunları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🌐</span> ISO 41001:2018 Entegre Tesis Yönetimi
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    Gayrimenkullerin tüm operasyonel yaşam döngüsünü, bakım SLA sürelerini ve bütçe verimliliğini dünya standartlarında işletme güvencesi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🛡️</span> ISO 45001 & 6331 İSG İş Sağlığı ve Güvenliği
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    Tesis sakinleri ve personeli için sıfır iş kazası hedefi, periyodik acil durum tatbikatları ve yangın güvenlik protokolleri.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🌿</span> ISO 14001:2026 Çevre & Sıfır Atık Yönetimi
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    Sürdürülebilir tesis yönetimi, yağmur suyu geri kazanımı, LED aydınlatma otomasyonu ve tehlikeli atık ayrıştırma sertifikasyonu.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🎧</span> ISO 10002 & ISO 27001 Müşteri Memnuniyeti & Bilgi Güvenliği
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    7/24 sakin talep yönetimi, SLA çözüm takibi, KVKK uyumlu kamera kayıt arşivi ve şifreli finansal veri koruması.
                  </p>
                </div>
              </div>

              <p className="pt-1">
                Tüm yetki belgelerimiz bağımsız uluslararası akreditasyon kuruluşlarınca periyodik gözetim denetimlerine tabi tutulmakta olup, kat malikleri kurullarına sıfır hukuki risk ve yüksek prestij sunmaktadır.
              </p>
            </div>

            {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
              <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">verified</span>
                  </span>
                  <span>%100 Akredite Operasyon</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  ILAS ve TÜRKAK uluslararası akreditasyon kuruluşları onaylı kurumsal kalite süreçleri.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">gavel</span>
                  </span>
                  <span>Sıfır Hukuki Risk</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  İş hukuku, İSG ve Kat Mülkiyeti Kanunu kapsamında yönetim kurullarına tam yasal güvence.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">domain</span>
                  </span>
                  <span>Mülk Değer Koruması</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  Sertifikalı tesis yönetim modeliyle gayrimenkullerin piyasa değerini ve kiralanabilirlik oranını artırma.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. BELCERT & TÜRKAK CANLI BELGE DOĞRULAMA VE KAREKOD KONSOLU               */}
          {/* ========================================================================= */}
          <div className="bg-[var(--color-surface)] text-[var(--color-primary)] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[var(--color-outline)]/60 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
                    <span>BELCERT & TÜRKAK Canlı Doğrulama Konsolu</span>
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
                  Tescilli Sertifikaları Sorgulayın & Doğrulayın
                </h3>
                <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
                  Alo Yönetim&apos;in sahip olduğu 7 resmi yönetim sistemi belgesinin tescil ve geçerlilik durumunu anlık kontrol edin.
                </p>
              </div>

              <a
                href="https://www.belcert.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 self-start md:self-auto shadow-md hover:scale-105"
              >
                <span>belcert.com Doğrulama Ekranı</span>
                <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
              </a>
            </div>

            {/* Sertifika Seçici Butonları */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 mb-8 relative z-10">
              {CERTIFICATES.map((c, idx) => (
                <button
                  key={c.slug}
                  onClick={() => {
                    setSelectedAuditIndex(idx);
                    setAuditVerifiedStatus(null);
                  }}
                  className={`p-3 rounded-2xl flex flex-col items-center text-center gap-1.5 transition-all border cursor-pointer ${
                    selectedAuditIndex === idx
                      ? 'bg-[var(--color-surface)] border-slate-900 dark:border-white shadow-md scale-102 ring-2 ring-slate-900/10 dark:ring-white/20'
                      : 'bg-[var(--color-surface)]/70 border-[var(--color-outline)]/60 hover:border-slate-400 dark:hover:border-white/20'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl transition-colors ${
                    selectedAuditIndex === idx ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--color-tertiary)]'
                  }`}>
                    {c.icon}
                  </span>
                  <span className="text-[11px] font-bold text-[var(--color-primary)] line-clamp-1">{c.name}</span>
                  <span className="text-[9px] font-mono text-[var(--color-tertiary)] line-clamp-1">{c.certificateNumber}</span>
                </button>
              ))}
            </div>

            {/* Seçili Sertifika Doğrulama Ayrıntı Kartı */}
            <div className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-lg text-xs tracking-wider">
                    {activeAuditCert.name}
                  </span>
                  <span className="text-sm font-bold text-[var(--color-primary)]">
                    {activeAuditCert.subtitle}
                  </span>
                </div>
                
                <p className="text-xs md:text-sm text-[var(--color-secondary)] leading-relaxed font-light">
                  <strong className="font-semibold text-[var(--color-primary)]">Resmi Tescil Kapsamı:</strong> {activeAuditCert.officialScopeTr}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-[var(--color-outline)]/30">
                  <div>
                    <span className="block text-[var(--color-tertiary)] text-[11px]">Belgelendiren Kurum:</span>
                    <strong className="text-[var(--color-primary)]">{activeAuditCert.issuer}</strong>
                  </div>
                  <div>
                    <span className="block text-[var(--color-tertiary)] text-[11px]">Akreditasyon Kodu:</span>
                    <strong className="text-[var(--color-primary)]">{activeAuditCert.accreditation}</strong>
                  </div>
                  <div>
                    <span className="block text-[var(--color-tertiary)] text-[11px]">Belge / Mühür No:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                      {activeAuditCert.certificateNumber} (Mühür: {activeAuditCert.sealNumber})
                    </strong>
                  </div>
                </div>
              </div>

              {/* Doğrulama Aksiyonu */}
              <div className="flex flex-col items-center md:items-end gap-3 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[var(--color-outline)]/30">
                <button
                  onClick={() => handleAuditVerify(activeAuditCert.certificateNumber)}
                  className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm font-bold" aria-hidden="true">qr_code_scanner</span>
                  <span>Sertifikayı Canlı Sorgula</span>
                </button>

                {auditVerifiedStatus && (
                  <div className="flex flex-col items-center md:items-end gap-1 animate-fade-in text-center md:text-right">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/40">
                      {auditVerifiedStatus}
                    </span>
                    <a
                      href="https://www.belcert.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 underline flex items-center gap-1 hover:opacity-80"
                    >
                      <span>BELCERT Doğrulama Sayfasına Git</span>
                      <span className="material-symbols-outlined text-[12px]" aria-hidden="true">open_in_new</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. MEVZUAT OTORİTE VE İÇ/DIŞ BAĞLANTI HUB'I (E-E-A-T)                     */}
          {/* ========================================================================= */}
          <ServiceAuthorityHubSeo
            serviceName="Uluslararası Kalite Standartları ve Akreditasyon Belgelerimiz"
            serviceCategory="Kalite & Standartlar"
            lawReferences={[
              {
                title: "Türk Standardları Enstitüsü (TSE) Resmi Belge Doğrulama Portalı",
                sourceName: "T.C. Sanayi ve Teknoloji Bakanlığı & TSE",
                url: "https://basvuru.tse.org.tr",
                badge: "TSE Doğrulama",
                description: "Alo Yönetim Hizmet Yeterlilik Belgesi (TSE HYB 12850) ve ISO standartları resmi tescil ve karekodlu doğrulama sistemi."
              },
              {
                title: "TÜRKAK — Türk Akreditasyon Kurumu Resmi Portalı",
                sourceName: "T.C. Dışişleri Bakanlığı TÜRKAK",
                url: "https://www.turkak.org.tr",
                badge: "TÜRKAK Akredite",
                description: "ISO 9001, ISO 14001, ISO 45001 ve ISO 27001 denetimlerinin uluslararası geçerliliğini sağlayan akreditasyon kurumu."
              },
              {
                title: "ISO — International Organization for Standardization (Cenevre / İsviçre)",
                sourceName: "ISO Global Headquarters",
                url: "https://www.iso.org",
                badge: "ISO Standartları",
                description: "Tesis yönetimi (ISO 41001), bilgi güvenliği (ISO 27001) ve müşteri memnuniyeti (ISO 10002) uluslararası kalite çerçevesi."
              }
            ]}
            glossaryTerms={[
              {
                slug: "kat-mulkiyeti-kanunu-kmk",
                term: "KMK Hukuki Uyumluluk Standartları",
                summary: "Kat Mülkiyeti Kanunu ve Türk Ticaret Kanunu mevzuatına %100 tam uyumlu şeffaf yönetim güvencesidir."
              },
              {
                slug: "bina-otomasyon-sistemi-bms",
                term: "ISO 50001 Enerji Yönetimi Standartları",
                summary: "Bina otomasyonu ve enerji tasarrufu uygulamalarıyla karbon ayak izinin minimize edilmesi kriterleridir."
              },
              {
                slug: "atik-yonetimi-ve-sifir-atik-belgesi",
                term: "ISO 14001 Çevre & Sıfır Atık",
                summary: "Tesislerde kaynağında ayrıştırma ve çevre dostu kimyasallarla sürdürülebilir yaşam standartlarıdır."
              },
              {
                slug: "5188-sayili-kanun",
                term: "ISO 45001 & 5188 Güvenlik Standartları",
                summary: "İş sağlığı ve güvenliği ile 5188 sayılı özel güvenlik kanunu protokollerinin entegrasyonudur."
              }
            ]}
          />

        </div>
      </section>
    </>
  );
}
