"use client";

import Link from 'next/link';

const comparisonRows = [
  {
    title: "Şeffaf Gelir / Gider Takibi",
    alo: "%100 Dijital. Her faturanın görseli ve dekontu 7/24 mobil uygulamada.",
    trad: "Defter kayıtları elle tutulur, belgeler yıl sonuna kadar gizli kalır."
  },
  {
    title: "Aidat Ödeme Seçenekleri",
    alo: "Mobil uygulama üzerinden Kredi Kartı (Taksitli) veya Havale/EFT.",
    trad: "Elden nakit toplama veya sadece belirli banka şubesine havale."
  },
  {
    title: "Geciken Aidat & İcra Takibi",
    alo: "Otomatik yasal ihtar ve avukat ekibiyle komşuluk ilişkilerini bozmadan takip.",
    trad: "Komşularla yüz yüze tartışma, yıllarca ödenmeyen aidat birikimleri."
  },
  {
    title: "7/24 Acil Teknik Müdahale",
    alo: "Mobil arıza kaydı ve ortalama 20 dakikada adrese ulaşan nöbetçi teknik ekip.",
    trad: "Yöneticinin telefonunu açmasını bekleme veya tanıdık usta arama."
  },
  {
    title: "Toplu Satın Alma Gücü",
    alo: "100+ projeden gelen hacimle elektrik, sigorta ve malzeme alımında %20+ indirim.",
    trad: "Tek bina bazında yüksek fiyattan perakende satın alma."
  },
  {
    title: "Güvenlik Personeli Yasal Sorumluluğu",
    alo: "5188 kanuna uygun SGK, kıdem tazminatı sorumluluğu %100 Alo Yönetim'de.",
    trad: "Kıdem tazminatı birikmez, dava açıldığında kat malikleri borçlanır."
  },
  {
    title: "Ortak Alan Tesis Rezervasyonu",
    alo: "Tenis kortu, havuz ve sosyal tesisler mobil uygulamadan randevulu.",
    trad: "Kapıya kağıt asma veya sıra kavgası yaşanması."
  },
  {
    title: "Devir Teslim Kolaylığı",
    alo: "Resmi tutanakla 48 saat içinde sıfır pürüzle devir teslim garantisi.",
    trad: "Aylarca devredilmeyen eksik evraklar ve kayıp kararlar defteri."
  }
];

export default function ComparisonTable() {
  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
          Farkımızı Görün
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          Alo Yönetim vs Geleneksel Yönetim
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          Neden İstanbul'un en prestijli projeleri geleneksel yöntemleri terk edip Alo Yönetim'e geçiyor?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Alo Yönetim */}
        <div className="bg-gradient-to-b from-blue-900 via-[#122338] to-[#0a1829] text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-blue-500/30 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-400">Alo Yönetim Modeli</h3>
              <span className="text-xs text-gray-300 font-light">%100 Kurumsal & Şeffaf Dijital Yönetim</span>
            </div>
            <span className="material-symbols-outlined text-4xl text-emerald-400">verified</span>
          </div>

          <div className="flex flex-col gap-6">
            {comparisonRows.map((row, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="material-symbols-outlined text-emerald-400 shrink-0 mt-1">check_circle</span>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">{row.title}</h4>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">{row.alo}</p>
                </div>
              </div>
            ))}
          </div>

          <Link 
            href="/teklif-al" 
            className="w-full bg-white text-[var(--color-primary)] font-bold py-4 rounded-xl text-center hover:bg-gray-100 transition-colors mt-4"
          >
            Hemen Şeffaf Yönetime Geçin
          </Link>
        </div>

        {/* Right Column: Geleneksel Yönetim */}
        <div className="bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/60 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[var(--color-outline)]/40 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-500">Geleneksel / Amatör Yönetim</h3>
              <span className="text-xs text-[var(--color-secondary)] font-light">Eski Nesil Yetersiz Yaklaşım</span>
            </div>
            <span className="material-symbols-outlined text-4xl text-red-400">cancel</span>
          </div>

          <div className="flex flex-col gap-6">
            {comparisonRows.map((row, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200/60 dark:border-white/10">
                <span className="material-symbols-outlined text-red-400 shrink-0 mt-1">cancel</span>
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 text-base mb-1">{row.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{row.trad}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
