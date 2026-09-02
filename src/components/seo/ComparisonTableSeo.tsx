import JsonLd from '@/components/seo/JsonLd';

const ROWS = [
  {
    criteria: 'Yasal Mevzuat Uyumu (KMK 634)',
    pro: 'Tam uyum — işletme projesi, kat malikleri kararları ve icra takibi eksiksiz yürütülür',
    individual: 'Kısmi — çoğunlukla hukuki destek alınamamakta, cezai yaptırım riski taşınmakta',
  },
  {
    criteria: 'Aidat Tahsilat Oranı',
    pro: '%94+ (otomatik takip + hukuki icra)',
    individual: '%70-80 (gecikme ve kayıp yaygın)',
  },
  {
    criteria: 'Teknik Bakım Sürekliliği',
    pro: '7/24 arıza hattı + periyodik bakım takvimi + yetkili servis koordinasyonu',
    individual: 'Reaktif müdahale — arıza olunca çözüm aranır, uzun kesintiler yaşanabilir',
  },
  {
    criteria: 'Şeffaf Raporlama',
    pro: 'Aylık detaylı gelir-gider raporu + dijital panel erişimi tüm sakinlere açık',
    individual: 'Genellikle yıllık ibra toplantısında sözlü açıklama ile sınırlı',
  },
  {
    criteria: 'Maliyet Verimliliği',
    pro: 'Toplu alım gücü ve tedarikçi ağı sayesinde ortalama %26 daha düşük işletme maliyeti',
    individual: 'Bireysel satın alma — standart piyasa fiyatları uygulanır',
  },
  {
    criteria: 'ISO 41001 Standart Uyumu',
    pro: 'Belgelenmiş — entegre tesis yönetim sistemi sertifikalı',
    individual: 'Uygulanamaz',
  },
];

const listLd = {
  '@context': 'https://schema.org',
  '@type': 'Table',
  name: 'Profesyonel Tesis Yönetimi vs. Bireysel Site Yöneticisi Karşılaştırması',
  description: 'ISO 41001 ve KMK 634 uyumlu profesyonel tesis yönetimi ile bireysel site yönetiminin 6 kritik boyutta karşılaştırması.',
  about: { '@type': 'Thing', name: 'Tesis Yönetimi', sameAs: 'https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi' },
};

export default function ComparisonTableSeo() {
  return (
    <>
      <JsonLd data={[listLd]} />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-2xl" aria-hidden="true">
            compare_arrows
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-primary)]">
            Profesyonel Yönetim vs. Bireysel Yönetim
          </h2>
        </div>
        <p className="text-[var(--color-secondary)] max-w-2xl text-sm">
          KMK 634 ve ISO 41001 standartları çerçevesinde 6 kritik boyutta karşılaştırma.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-outline)]/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-white dark:bg-white dark:text-slate-950">
                <th scope="col" className="text-left p-4 font-bold w-1/3">Kriter</th>
                <th scope="col" className="text-left p-4 font-bold text-brand-300 dark:text-brand-600">
                  ✓ Alo Yönetim (Profesyonel)
                </th>
                <th scope="col" className="text-left p-4 font-bold text-slate-300 dark:text-slate-500">
                  Bireysel Yönetici
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.criteria}
                  className={i % 2 === 0
                    ? 'bg-[var(--color-surface)]'
                    : 'bg-slate-50 dark:bg-white/[0.02]'}
                >
                  <th scope="row" className="p-4 font-semibold text-[var(--color-primary)] border-b border-[var(--color-outline)]/30 align-top text-left">
                    {row.criteria}
                  </th>
                  <td className="p-4 text-[var(--color-secondary)] border-b border-[var(--color-outline)]/30 align-top">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
                      {row.pro}
                    </div>
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 border-b border-[var(--color-outline)]/30 align-top">
                    {row.individual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
