import Link from 'next/link';

interface ComparisonTableProps {
  dict?: Record<string, string>;
  lang?: string;
}

const DEFAULT_ROWS = [
  {
    title: "7/24 Şeffaf Dijital Muhasebe",
    alo: "Mobil uygulama ile anlık gelir-gider, kasa ve banka hareketleri canlı izlenir.",
    trad: "Yılda bir kez alelacele dağıtılan anlaşılmaz işletme projesi fotokopileri."
  },
  {
    title: "Yasal & Hukuki Danışmanlık",
    alo: "KMK 634 uzmanı avukatlarla geciken aidatlara anında yasal icra ve tahsilat takibi.",
    trad: "Komşuluk ilişkileri bozulmasın diye aylarca biriken ve tahsil edilemeyen borçlar."
  },
  {
    title: "5188 Lisanslı Özel Güvenlik",
    alo: "Valilik onaylı, eğitimli, üniformalı ve vardiyalı profesyonel güvenlik kadrosu.",
    trad: "Eğitimsiz, belgesiz veya yalnızca gündüzleri kulübede duran nöbetçiler."
  },
  {
    title: "Önleyici Teknik Bakım & SLA",
    alo: "Asansör, hidrofor, jeneratör ve yangın sistemlerinin periyodik takvimi ve 30 dk acil müdahale.",
    trad: "Arıza çıkınca günlerce usta beklenen ve yüksek fatura çıkarılan acil tamirler."
  },
  {
    title: "Endüstriyel Temizlik & Hijyen",
    alo: "TSE ve ISO standartlarında kimyasallar, düzenli kat planı ve haftalık denetimler.",
    trad: "Gelişigüzel yapılan, hijyen standartlarından uzak yüzeysel temizlik."
  },
  {
    title: "Peyzaj & Akıllı Sulama",
    alo: "Ziraat mühendisi kontrolünde mevsimlik bakım, budama, ilaçlama ve su tasarrufu.",
    trad: "Kuruyan çimler, bakımsız ağaçlar ve plansız amatör bahçe müdahaleleri."
  },
  {
    title: "Şeffaf İhale & Kurumsal Satınalma",
    alo: "Her alımda en az 3 bağımsız teklif karşılaştırması ve kurumsal filo indirimleri.",
    trad: "Tek bir tanıdık esnaftan faturasız veya piyasa üstü fiyatla yapılan harcamalar."
  },
  {
    title: "SLA & Memnuniyet Taahhüdü",
    alo: "Yazılı Hizmet Seviyesi Sözleşmesi (SLA), 7/24 çağrı merkezi ve %99.4 memnuniyet.",
    trad: "Telefonlara çıkmayan, sorunlara haftalarca dönüş yapmayan amatör yönetim."
  }
];

Object.freeze(DEFAULT_ROWS);

/**
 * Faz 33: ComparisonTable bileşeninin saf React Server Component (RSC) dönüşümü.
 * "use client" direktifi kaldırılmış, istemciye sıfır JavaScript gönderen, anında SSR olan tablo yapısı.
 */
export default function ComparisonTable({ dict, lang = 'tr' }: ComparisonTableProps) {
  const t = (key: string, fallback: string) => dict?.[key] || fallback;
  const basePath = lang === 'en' ? '/en' : '';

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full">
          {t('home_comparison_badge', 'Geleneksel vs Profesyonel Tesis Yönetimi')}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          {t('home_comparison_title', 'Neden Alo Yönetim?')}
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          {t('home_comparison_desc', 'Eski usul bina yönetimi ile profesyonel, dijital ve denetlenebilir tesis yönetimi arasındaki farklar.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Alo Yönetim */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-500/30 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-300">
                  {t('home_comparison_left_title', 'Alo Yönetim')}
                </h3>
                <span className="text-xs text-emerald-400 font-medium">
                  {t('home_comparison_left_sub', 'Kurumsal & Dijital & %100 Şeffaf')}
                </span>
              </div>
              <span className="material-symbols-outlined text-4xl text-emerald-400" aria-hidden="true">verified</span>
            </div>

            <div className="flex flex-col gap-4">
              {DEFAULT_ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="material-symbols-outlined text-emerald-400 shrink-0 mt-0.5 text-lg" aria-hidden="true">check_circle</span>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{row.title}</h4>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">{row.alo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link 
            href={`${basePath}/teklif-al`} 
            className="w-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold py-4 rounded-xl text-center transition-colors shadow-md text-sm mt-4 inline-block"
          >
            {t('home_comparison_btn', 'Siteniz İçin Profesyonel Teklif Alın →')}
          </Link>
        </div>

        {/* Right Column: Geleneksel Yönetim */}
        <div className="bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/60 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-outline)]/60 pb-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                  {t('home_comparison_right_title', 'Geleneksel Yönetim')}
                </h3>
                <span className="text-xs text-rose-500 font-medium">
                  {t('home_comparison_right_sub', 'Eski Usul & Denetimsiz & Yüksek Risk')}
                </span>
              </div>
              <span className="material-symbols-outlined text-4xl text-rose-500" aria-hidden="true">warning</span>
            </div>

            <div className="flex flex-col gap-4">
              {DEFAULT_ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-3 bg-rose-50/40 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-200/50 dark:border-rose-900/30">
                  <span className="material-symbols-outlined text-rose-500 shrink-0 mt-0.5 text-lg" aria-hidden="true">cancel</span>
                  <div>
                    <h4 className="font-bold text-[var(--color-primary)] text-sm mb-1">{row.title}</h4>
                    <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{row.trad}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a 
            href="tel:+902165504848" 
            className="w-full bg-[var(--color-surface-variant)] hover:bg-[var(--color-outline)]/40 text-[var(--color-primary)] font-bold py-4 rounded-xl text-center transition-colors border border-[var(--color-outline)] text-sm mt-4 inline-block"
          >
            Danışma Hattı: 0216 550 48 48
          </a>
        </div>

      </div>

    </section>
  );
}
