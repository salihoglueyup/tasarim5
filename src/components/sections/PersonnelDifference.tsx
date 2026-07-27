"use client";

import Link from 'next/link';

export default function PersonnelDifference() {
  const pillars = [
    {
      title: 'Titiz İşe Alım',
      desc: 'Güvenlik ve geçmiş taraması yapılmış personel.',
    },
    {
      title: 'Sürekli Eğitim',
      desc: 'Acil durum, iletişim ve teknik konularda periyodik eğitimler.',
    },
    {
      title: 'Yedekli Çalışma',
      desc: 'İzin ve hastalık durumlarında anında ikame personel desteği.',
    },
    {
      title: 'Düzenli Denetim',
      desc: 'Saha müfettişlerimiz tarafından habersiz gece ve gündüz denetimleri.',
    },
  ];

  return (
    <section className="py-20 px-[var(--spacing-gutter)] max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-[#1e293b] to-[#0f172a] text-white p-8 md:p-16 border border-slate-800 shadow-2xl">
        {/* Glow & Noise */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-400 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            İstihdam Köprüsü Avantajı
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Farkımız Personelimizde
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Sıradan bir yönetim şirketi değiliz. Kendi kurduğumuz{' '}
            <strong className="text-white font-semibold">&apos;İstihdam Köprüsü&apos;</strong> sistemi ile sektördeki en
            nitelikli personeli seçiyor, eğitiyor ve sitenize atıyoruz.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 rounded-3xl p-6 md:p-8 flex items-start gap-5 backdrop-blur-sm group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-2xl border border-emerald-500/30 group-hover:scale-110 transition-transform shadow-inner">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-400">
            Tesisleriniz için %100 SGK güvenceli, belgeli ve denetlenen profesyonel ekipler.
          </p>
          <Link
            href="/istihdam-koprusu"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-emerald-500/25 shrink-0 hover:scale-105"
          >
            <span>İstihdam Köprüsü Modelimizi İnceleyin</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
