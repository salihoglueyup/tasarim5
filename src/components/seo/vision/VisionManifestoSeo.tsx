"use client";

import React from 'react';

interface Pledge {
  number: string;
  title: string;
  badge: string;
  description: string;
  legalBasis: string;
}

const PLEDGES: Pledge[] = [
  {
    number: '01',
    title: 'Asla Gizli Komisyon veya Şişirilmiş Fatura Yok',
    badge: 'Şeffaf İhale',
    description:
      'Sitenizde yapılan tüm teknik onarım, jeneratör yakıtı, peyzaj ve temizlik kimyasalı alımlarında faturalar doğrudan tedarikçi tarafından site adına kesilir. Aracı komisyonu veya gizli iskonto kesinlikle uygulanamaz; her fatura mobil uygulamadan taranarak paylaşılır.',
    legalBasis: '634 KMK m.38 ve Türk Ticaret Kanunu dürüstlük kuralı güvencesi.',
  },
  {
    number: '02',
    title: 'Dokunulmaz ve Blokeli Kıdem Tazminatı Fonu',
    badge: 'Bütçe Güvencesi',
    description:
      'Güvenlik ve temizlik personelinin kıdem tazminatı karşılıkları şirket kasasına değil, site adına açılan dokunulmaz vadeli bloke banka hesabına yatırılır. Personel ayrıldığında kat maliklerinden aniden ek bütçe veya avans talep edilmez.',
    legalBasis: '4857 Sayılı İş Kanunu m.14 ve bloke hesap sözleşme protokolü.',
  },
  {
    number: '03',
    title: 'Her Ay Bağımsız Denetim Raporu E-Postanızda',
    badge: 'Mali Denetim',
    description:
      'Her ayın ilk haftasında tüm gelir-gider hesapları, banka ekstreleri ve aidat tahsilat durumu bağımsız mali müşavirlerimizce taranır ve rapor tüm kat maliklerinin e-postasına ve sakin mobil uygulamasına PDF formatında otomatik iletilir.',
    legalBasis: 'ISO 9001:2015 Şeffaf Raporlama ve KMK Denetçi Teftiş Standardı.',
  },
  {
    number: '04',
    title: '7/24 Kesintisiz Çağrı & 15 Dakikada Acil Müdahale',
    badge: 'Mobil Teknik Filo',
    description:
      'Gece veya gündüz; ana su borusu patlaması, asansörde mahsur kalma veya elektrik trafo arızası anında 7/24 operasyon merkezimiz devreye girer. İlçenizdeki gezici mobil teknik servisimiz 15 dakika içinde sitenize intikal eder.',
    legalBasis: 'SLA (Hizmet Seviyesi Taahhüdü) sözleşme garantisi.',
  },
  {
    number: '05',
    title: 'Yıllık İşletme Projesinde Minimum %20 Tasarruf',
    badge: 'Maliyet Optimizasyonu',
    description:
      'Tesisinizi devraldığımızda mevcut bakım sözleşmelerini, ortak alan aydınlatma tarifelerini ve sarf malzeme giderlerini 45.000 dairelik toplu satın alma gücümüzle yeniden yapılandırır; ilk yıl bütçesinde en az %20 tasarruf sağlarız.',
    legalBasis: 'Toplu satın alma ölçek ekonomisi ve enerji verimliliği fizibilitesi.',
  },
];

export default function VisionManifestoSeo() {
  return (
    <section
      id="seffaflik-manifestosu"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)] relative overflow-hidden"
    >
      {/* Background seal watermarks */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-brand-500" aria-hidden="true">
              history_edu
            </span>
            <span>Kat Maliklerine Hukuki Sözümüzdür</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Kat Maliklerine 5 Şeffaflık Sözü (Alo Yönetim Manifestosu)
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Site genel kurullarına, kat malikleri kurullarına ve denetim heyetlerine noter onaylı sözleşmelerle taahhüt ettiğimiz 5 temel güven ilkesi:
          </p>
        </div>

        {/* Manifesto Cards */}
        <div className="space-y-4 max-w-4xl mx-auto mb-12">
          {PLEDGES.map((pledge, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-xs hover:border-[var(--color-outline)] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--color-outline)]/40">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    {pledge.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
                    {pledge.title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 text-xs font-bold w-fit">
                  {pledge.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4">
                {pledge.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium bg-[var(--color-surface-variant)]/40 p-2.5 rounded-xl border border-[var(--color-outline)]/50">
                <span className="material-symbols-outlined text-sm text-brand-500 shrink-0">
                  verified
                </span>
                <span><strong>Hukuki Dayanak:</strong> {pledge.legalBasis}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Seal Footer */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <div>
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                YÖNETİM GÜVENCE PROTOKOLÜ
              </div>
              <div className="text-base sm:text-lg font-bold text-white">
                Noter ve Genel Kurul Tescilli Hizmet Sözleşmesi
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Bu 5 taahhüt, sitemizi yönetmeye başladığımız gün imzalanan resmi yönetim sözleşmesinin ayrılmaz ekidir.
              </p>
            </div>
          </div>

          <div className="shrink-0 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white font-mono text-xs font-bold border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SÖZLEŞME GARANTİLİ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
