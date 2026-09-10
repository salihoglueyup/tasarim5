import Link from 'next/link';

interface PersonnelDifferenceProps {
  dict?: Record<string, string>;
  lang?: string;
}

const PILLARS = [
  {
    title: "Kıdem Tazminatı Fon Güvencesi",
    desc: "Personelin kıdem tazminatı karşılıkları her ay düzenli fonlanır; yönetim değiştiğinde maliklere sürpriz borç çıkmaz.",
  },
  {
    title: "İş Hukuku & SGK Mevzuat Denetimi",
    desc: "4857 Sayılı İş Kanunu ve SGK bildirimleri uzman bordro ve hukuk ekibimizce eksiksiz yürütülür.",
  },
  {
    title: "Yedek Personel & Kesintisiz Hizmet",
    desc: "İzin, rapor veya acil durumlarda anında ikame personel yönlendirilerek hizmet aksaması önlenir.",
  },
  {
    title: "Düzenli İSG & Mesleki Eğitim",
    desc: "İş Sağlığı ve Güvenliği eğitimleri, yangın ve ilk yardım sertifikalandırmaları periyodik olarak tamamlanır.",
  },
];

Object.freeze(PILLARS);

/**
 * Faz 34: PersonnelDifference üzerindeki gereksiz "use client" direktifinin kaldırılması
 * ve saf React Server Component (RSC) mimarisine taşınması.
 */
export default function PersonnelDifference({ dict, lang = 'tr' }: PersonnelDifferenceProps) {
  const t = (key: string, fallback: string) => dict?.[key] || fallback;
  const basePath = lang === 'en' ? '/en' : '';

  return (
    <section className="py-20 px-[var(--spacing-gutter)] max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--color-surface)] p-8 md:p-14 border border-[var(--color-outline)]/60 shadow-sm">
        {/* Glow & Noise */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-slate-400/5 dark:bg-white/[0.02] blur-3xl pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />

        <div className="relative z-10 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-[var(--color-primary)] text-xs md:text-sm font-semibold tracking-wide uppercase mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('personnel_diff_badge', 'İstihdam Güvencesi & Mevzuat Uyumu')}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--color-primary)] mb-6 leading-tight">
            {t('personnel_diff_title', 'Personel İstihdamında Alo Yönetim Farkı')}
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] font-light leading-relaxed">
            {t('personnel_diff_desc', 'Apartman ve site görevlilerinin iş hukuku, SGK, kıdem tazminatı ve özlük hakları risklerini kurumsal güvenceyle sıfırlıyoruz.')}
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {PILLARS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-surface-variant)] hover:border-slate-400/50 dark:hover:border-white/20 transition-all duration-300 border border-[var(--color-outline)]/60 rounded-3xl p-6 md:p-8 flex items-start gap-5 group transform-gpu shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">{item.title}</h3>
                <p className="text-[var(--color-secondary)] text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 pt-6 border-t border-[var(--color-outline)]/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[var(--color-secondary)]">
            {t('personnel_diff_footer', 'Kat malikleri kurulunun işveren sıfatından doğan hukuki ve cezai sorumluluklarını bertaraf ediyoruz.')}
          </p>
          <Link
            href={`${basePath}/istihdam-koprusu`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold text-sm tracking-wide transition-all duration-300 shadow-md shrink-0 hover:scale-105"
          >
            <span>{t('personnel_diff_link', 'İstihdam Güvencesi Modelini İnceleyin')}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
