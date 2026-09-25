"use client";

import React from 'react';
import Link from 'next/link';

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  description: string;
  highlights: string[];
  linkUrl: string;
  linkText: string;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Finansal Şeffaflık & Bağımsız Denetim',
    subtitle: 'Kuruşu Kuruşuna Açık Kasa Standartları',
    icon: 'account_balance_wallet',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description:
      'Geleneksel kapalı yönetimlerin aksine, toplanan her kuruş aidatın harcama yeri mobil uygulamamızda anlık banka ekstresiyle canlı yayınlanır. Aylık bağımsız mali müşavir denetim raporu tüm kat maliklerine açık olarak sunulur.',
    highlights: [
      '7/24 Sakin mobil uygulamasında anlık banka ekstresi',
      'Tüm tedarikçi faturaları ve makbuzların dijital aslı',
      'Her ay bağımsız YMM ve mali müşavir onaylı denetim raporu',
    ],
    linkUrl: '/kurumsal/kalite-politikamiz',
    linkText: 'Kalite ve Denetim Politikamız',
  },
  {
    number: '02',
    title: 'Yapay Zeka Destekli Tesis Otomasyonu',
    subtitle: 'IoT Sensörler & Kestirimci Bakım',
    icon: 'memory',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    description:
      'Asansör, hidrofor, yangın pompaları ve jeneratör sistemleri IoT sensörlerle 7/24 izlenir. Arıza meydana gelmeden önce titreşim, ısı ve tüketim anomalileri tespit edilerek pahalı acil servis maliyetleri sıfırlanır.',
    highlights: [
      'Asansör ve hidroforlarda arıza oluşmadan kestirimci tespit',
      'Ortak alan elektrik ve su tüketiminde %28 doğrudan tasarruf',
      'Mobil arıza bildirim sistemi ve 15 dakikada acil teknik müdahale',
    ],
    linkUrl: '/hizmetler/tesis-yonetimi',
    linkText: 'Akıllı Tesis Çözümlerimiz',
  },
  {
    number: '03',
    title: '5188 Lisanslı Güvenlik Entegrasyonu',
    subtitle: 'Kendi Akademimizden Yetişen Profesyoneller',
    icon: 'local_police',
    iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    description:
      'Bünyemizdeki resmi eğitim kurumumuz (guvenlikkursu.com) sayesinde taşeron aracı firmalara bağımlı kalmadan, EGM onaylı lisansa ve kriz simülatörü tecrübesine sahip 1.200 kişilik dev güvenlik kadrosuyla sitenizi koruruz.',
    highlights: [
      'guvenlikkursu.com entegrasyonuyla EGM lisanslı kadro',
      'RFID devriye tur kalemi ve vücut kamerası dijital denetimi',
      'Sakinlerin güvenliğini tehdit etmeyen profesyonel iletişim eğitimi',
    ],
    linkUrl: '/guvenlik-akademisi',
    linkText: '5188 Güvenlik Akademimiz',
  },
  {
    number: '04',
    title: 'KMK Hukuki Kalkanı & Tahsilat Güvencesi',
    subtitle: '634 Sayılı Kanun Uzmanlığı & %99,4 Tahsilat',
    icon: 'gavel',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    description:
      'Site yönetim kurullarını yasal risklerden ve iptal davalarından koruyan uzman gayrimenkul hukukçularımız; aidat gecikmelerinde komşuluk ilişkilerini zedelemeden kanuni ihtar ve icra süreçlerini yöneterek %99,4 tahsilat sağlar.',
    highlights: [
      'Kat Malikleri Kurulu (Genel Kurul) kararlarına hukuki danışmanlık',
      'Personel iş sözleşmeleri, SGK ve arabuluculuk tam koruması',
      'Aidat gecikmelerinde noter ihtarı ve otomatik icra takibi',
    ],
    linkUrl: '/sozluk',
    linkText: 'KMK Mevzuat ve Hukuk Sözlüğü',
  },
  {
    number: '05',
    title: 'Yeşil Tesis & Sürdürülebilirlik Vizyonu',
    subtitle: 'Sıfır Atık, Karbon Nötr & EV Şarj İstasyonu',
    icon: 'eco',
    iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    description:
      'Gelecek nesillere yaşanabilir siteler bırakmak adına çevreye duyarlı operasyon standartları uyguluyoruz. Ortak alanlarda güneş enerjisi (GES), otoparklarda EV elektrikli araç şarj istasyonu kurulumu ve Sıfır Atık ayrıştırması.',
    highlights: [
      'T.C. Çevre Bakanlığı onaylı Sıfır Atık ayrıştırma protokolü',
      'Ortak alan aydınlatmalarında LED ve güneş paneli fizibilitesi',
      'Ekolojik, biyolojik olarak parçalanabilir temizlik kimyasalları',
    ],
    linkUrl: '/kurumsal/surdurulebilirlik',
    linkText: 'Sürdürülebilirlik Raporumuz',
  },
];

export default function VisionOperationalPillarsSeo() {
  return (
    <section
      id="operasyonel-sutunlar"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-brand-500" aria-hidden="true">
              foundation
            </span>
            <span>Uygulamalı Yönetim Mimarisi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Vizyonumuzun 5 Temel Taşıyıcı Sütunu
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Alo Yönetim vizyonu yalnızca kağıt üstündeki hedeflerden ibaret değildir; sahada her gün uygulanan, 
            bağımsız denetçilerce tescillenen ve kat maliklerinin cebine yansıyan 5 operasyonel sütun üzerine kuruludur:
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[var(--color-outline)] hover:shadow-md transition-all group ${
                idx === 0 || idx === 1 ? 'lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs group-hover:scale-105 transition-transform ${pillar.iconBg}`}
                  >
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                      {pillar.icon}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 tracking-tighter">
                    {pillar.number}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  {pillar.subtitle}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6 font-normal">
                  {pillar.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6 border-t border-[var(--color-outline)]/40 pt-4">
                  {pillar.highlights.map((item, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-[var(--color-primary)] font-medium"
                    >
                      <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                        check
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Link */}
              <Link
                href={pillar.linkUrl}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors pt-2 border-t border-[var(--color-outline)]/40"
              >
                <span>{pillar.linkText}</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
