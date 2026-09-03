"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import PageHeader from '@/components/layout/PageHeader';
import PreFooterCta from '@/components/sections/PreFooterCta';
import { ServiceAuthorityHubSeo } from '@/components/seo';

const CERTIFICATES = [
  {
    icon: 'eco',
    color: 'from-emerald-500 to-teal-700',
    titleKey: 'cert_1_title',
    subKey: 'cert_1_sub',
    pdf: '/certificates/dogaya-saygi.pdf',
  },
  {
    icon: 'public',
    color: 'from-teal-500 to-emerald-700',
    titleKey: 'cert_6_title',
    subKey: 'cert_6_sub',
    pdf: '/certificates/iso-14001.pdf',
  },
  {
    icon: 'diversity_3',
    color: 'from-purple-500 to-pink-700',
    titleKey: 'cert_4_title',
    subKey: 'cert_4_sub',
    pdf: '/certificates/iso-26000.pdf',
  },
  {
    icon: 'health_and_safety',
    color: 'from-amber-500 to-orange-700',
    titleKey: 'cert_3_title',
    subKey: 'cert_3_sub',
    pdf: '/certificates/iso-45001.pdf',
  },
  {
    icon: 'all_inclusive',
    color: 'from-cyan-500 to-blue-700',
    titleKey: 'cert_5_title',
    subKey: 'cert_5_sub',
    pdf: '/certificates/iso-22301.pdf',
  },
  {
    icon: 'security',
    color: 'from-blue-600 to-indigo-800',
    titleKey: 'cert_2_title',
    subKey: 'cert_2_sub',
    pdf: '/certificates/iso-31000.pdf',
  },
  {
    icon: 'support_agent',
    color: 'from-rose-500 to-red-700',
    titleKey: 'cert_7_title',
    subKey: 'cert_7_sub',
    pdf: '/certificates/iso-10002.pdf',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SurdurulebilirlikClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader title={t('sust_hub_title')} description={t('sust_hub_desc')} />

      {/* Manifesto */}
      <section
        id="speakable-content"
        className="py-16 md:py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg text-[var(--color-secondary)] font-light leading-relaxed"
          >
            {t('sust_hub_manifesto_1')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-[var(--color-secondary)] font-light leading-relaxed"
          >
            {t('sust_hub_manifesto_2')}
          </motion.p>
        </div>
      </section>

      {/* GES Projeleri — Öne çıkan büyük kart */}
      <section className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/surdurulebilirlik/ges-projeleri" className="block group">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-10 md:p-16 text-white shadow-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-emerald-900/30">
              {/* Bg blur orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-4xl text-white" aria-hidden="true">solar_power</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-200 mb-2 block">
                    {t('sust_hub_ges_badge')}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{t('sust_hub_ges_title')}</h2>
                  <p className="text-emerald-100 font-light leading-relaxed max-w-2xl">
                    {t('sust_hub_ges_desc')}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 bg-white text-emerald-800 font-bold px-6 py-3 rounded-xl text-sm shadow-lg transition-transform group-hover:translate-x-1">
                    {t('sust_hub_ges_btn')}
                    <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Sertifikalar */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0a0a0f] px-[var(--spacing-gutter)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] mb-3">
              {t('sust_hub_certs_title')}
            </h2>
            <p className="text-[var(--color-secondary)] font-light">{t('sust_hub_certs_desc')}</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {CERTIFICATES.map((cert) => (
              <motion.a
                key={cert.pdf}
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-lg cursor-pointer transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-md`}
                >
                  <span className="material-symbols-outlined text-white text-2xl" aria-hidden="true">{cert.icon}</span>
                </div>
                <div>
                  <p className={`text-[10px] font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${cert.color} mb-1`}>
                    {t(cert.titleKey as any)}
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-primary)] leading-snug">
                    {t(cert.subKey as any)}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-auto">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
                  Belgeyi Gör
                </span>
              </motion.a>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              href="/kurumsal/kalite-belgelerimiz"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              {t('sust_hub_certs_link')}
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
        <ServiceAuthorityHubSeo
          serviceName="Yeşil Tesis ve Sürdürülebilir Enerji Yönetimi"
          serviceCategory="Sürdürülebilirlik & GES"
          lawReferences={[
            {
              title: "Sıfır Atık Yönetmeliği",
              sourceName: "T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
              url: "https://sifiratik.gov.tr",
              badge: "Sıfır Atık",
              description: "Toplu yaşam alanlarında kaynağında atık ayrıştırma, kompost üretimi ve bina Sıfır Atık Belgesi standartları."
            },
            {
              title: "5627 Sayılı Enerji Verimliliği Kanunu",
              sourceName: "T.C. Enerji ve Tabii Kaynaklar Bakanlığı",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5627&MevzuatTur=1&MevzuatTertip=5",
              badge: "5627 Sayılı Kanun",
              description: "Merkezi ısıtma pay ölçer kullanımı, bina enerji kimlik belgesi (EKB) ve yalıtım verimliliği yükümlülükleri."
            },
            {
              title: "EPDK Elektrik Piyasasında Lisanssız Elektrik Üretim Yönetmeliği (Çatı GES)",
              sourceName: "Enerji Piyasası Düzenleme Kurumu (EPDK)",
              url: "https://www.epdk.gov.tr",
              badge: "EPDK GES",
              description: "Site ve plaza çatılarında güneş enerjisi panelleriyle ortak alan elektrik tüketimini karşılama mevzuatı."
            }
          ]}
          glossaryTerms={[
            {
              slug: "atik-yonetimi-ve-sifir-atik-belgesi",
              term: "Sıfır Atık Belgesi & Ayrıştırma",
              summary: "Geri dönüştürülebilir malzemelerin çevreye zarar vermeden ekonomiye kazandırılması ve resmi tescilidir."
            },
            {
              slug: "kompanzasyon-reaktif-guc",
              term: "Kompanzasyon & Enerji Tasarrufu",
              summary: "Elektrik trafolarında reaktif enerji kayıplarını engelleyerek faturalarda %20-30 tasarruf sağlayan sistemdir."
            },
            {
              slug: "bina-otomasyon-sistemi-bms",
              term: "Bina Otomasyonu & Enerji İzleme",
              summary: "Ortak alan aydınlatma, ısıtma ve soğutmanın sensörlerle otomatik kontrol edilerek karbon ayak izinin düşürülmesidir."
            },
            {
              slug: "su-deposu-dezenfeksiyonu-ve-analizi",
              term: "Su Yönetimi & Gri Su Geri Kazanımı",
              summary: "Yağmur suyu hasadı ve arıtma sistemleriyle bahçe sulamasında şebeke suyu tüketiminin sıfırlanmasıdır."
            }
          ]}
        />
      </section>

      <PreFooterCta />
    </>
  );
}
