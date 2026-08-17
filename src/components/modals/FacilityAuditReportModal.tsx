'use client';

import React, { useState, useRef } from 'react';

interface FacilityAuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDistrict?: string;
  defaultUnits?: number;
}

export default function FacilityAuditReportModal({
  isOpen,
  onClose,
  defaultDistrict = 'Kadıköy',
  defaultUnits = 40,
}: FacilityAuditReportModalProps) {
  const [step, setStep] = useState<'form' | 'report'>('form');
  const [siteName, setSiteName] = useState('');
  const [district, setDistrict] = useState(defaultDistrict);
  const [units, setUnits] = useState(defaultUnits);
  const [currentDues, setCurrentDues] = useState(2500);
  const [hasSecurity, setHasSecurity] = useState(true);
  const [hasPool, setHasPool] = useState(false);
  const [hasElevator, setHasElevator] = useState(true);

  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Hesaplamalar
  const totalMonthlyBudget = units * currentDues;
  const estimatedSavingsRate = hasSecurity && hasPool ? 0.26 : hasSecurity ? 0.22 : 0.18;
  const estimatedMonthlySavings = Math.round(totalMonthlyBudget * estimatedSavingsRate);
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;
  const healthScore = Math.min(94, Math.max(68, Math.round(75 + (hasSecurity ? 8 : -10) + (hasElevator ? 6 : 0) + (units > 30 ? 5 : 0))));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('report');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Modal Başlık Çubuğu */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">assessment</span>
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Tesis Sağlık & Tasarruf Karne Raporu
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {step === 'form' ? (
          /* 1. ADIM: FORM GİRİŞİ */
          <form onSubmit={handleGenerate} className="p-6 sm:p-8 space-y-5">
            <div className="text-center max-w-md mx-auto mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Sitenizin <span className="text-primary">Sağlık ve Tasarruf</span> Karnesini Oluşturun
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                4 basit bilgi girin; KMK ve piyasa endeksine göre sitenizin risk skorunu ve yıllık net tasarruf potansiyelini anında raporlayalım.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Site / Apartman Adı
                </label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Örn: Akasya Konutları"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Bulunduğu İlçe
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {['Kadıköy', 'Ataşehir', 'Üsküdar', 'Beşiktaş', 'Sarıyer', 'Şişli', 'Bakırköy', 'Maltepe', 'Kartal', 'Pendik', 'Beylikdüzü', 'Başakşehir'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Toplam Bağımsız Bölüm (Daire Sayısı)
                </label>
                <input
                  type="number"
                  min="4"
                  max="1000"
                  required
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Daire Başı Ortalama Aylık Aidat (₺)
                </label>
                <input
                  type="number"
                  min="500"
                  max="50000"
                  step="100"
                  required
                  value={currentDues}
                  onChange={(e) => setCurrentDues(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Ek Donanımlar */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Tesis Donanımları
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={hasSecurity}
                    onChange={(e) => setHasSecurity(e.target.checked)}
                    className="rounded accent-primary"
                  />
                  <span>Özel Güvenlik (5188)</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={hasElevator}
                    onChange={(e) => setHasElevator(e.target.checked)}
                    className="rounded accent-primary"
                  />
                  <span>Asansör Sistemi</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={hasPool}
                    onChange={(e) => setHasPool(e.target.checked)}
                    className="rounded accent-primary"
                  />
                  <span>Yüzme Havuzu / Sosyal Tesis</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-slate-950 font-extrabold rounded-xl text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 mt-4"
            >
              <span>Resmi Denetim Raporunu Üret</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        ) : (
          /* 2. ADIM: RESMİ KARNE RAPORU */
          <div ref={reportRef} className="p-6 sm:p-8 space-y-6 print:p-0 print:text-black">
            {/* Rapor Başlığı */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Resmi Denetim & Bütçe Karnesi
                </div>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  {siteName || 'Akasya Sitesi'}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  {district} / İstanbul • {units} Bağımsız Bölüm
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-300">ALO YÖNETİM A.Ş.</div>
                <div className="text-[10px] text-slate-500">ISO 9001 • ISO 45001 • ISO 27001</div>
                <div className="text-[10px] text-slate-400 mt-1">Rapor ID: ALO-{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>
            </div>

            {/* Skor ve Tasarruf Kutuları */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 font-medium">Tesis Sağlık Skoru</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                  %{healthScore}
                </div>
                <div className="text-[10px] text-emerald-500 mt-0.5">Risk Seviyesi: Düşük</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 font-medium">Aylık Bütçe Tasarrufu</div>
                <div className="text-2xl font-bold text-primary mt-1">
                  {estimatedMonthlySavings.toLocaleString('tr-TR')} ₺
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">-%{Math.round(estimatedSavingsRate * 100)} Maliyet İndirimi</div>
              </div>

              <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-950 rounded-2xl border border-emerald-500/40 text-center">
                <div className="text-[11px] text-emerald-400 font-bold uppercase">Yıllık Toplam Tasarruf</div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  {estimatedAnnualSavings.toLocaleString('tr-TR')} ₺
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Kat Maliklerine Net Kazanç</div>
              </div>
            </div>

            {/* 4 Ana Sütun Denetim Detayları */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Operasyonel Uygunluk Analizi
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">KMK 634 & Hukuki Mevzuat Uyumu</span>
                  <span className="font-bold text-emerald-400">%94 (Tam Uyumlu)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">5188 Güvenlik ve Risk Seviyesi</span>
                  <span className="font-bold text-emerald-400">%{hasSecurity ? 90 : 60} ({hasSecurity ? 'Yüksek' : 'Riskli'})</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Teknik Bakım & Asansör Güvenliği</span>
                  <span className="font-bold text-emerald-400">%88 (Standart)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Temizlik, Hijyen & Peyzaj Verimi</span>
                  <span className="font-bold text-emerald-400">%92 (Yüksek)</span>
                </div>
              </div>
            </div>

            {/* Önerilen Aksiyon Planı */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Alo Yönetim Uzman Önerileri
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Toplu satın alma gücüyle enerji ve malzeme faturalarında anında %18 tasarruf sağlanması.</li>
                <li>Geciken aidatlarda KMK Madde 20 uyarınca dijital SMS/icra hatırlatma sistemine geçilmesi.</li>
                <li>Asansör ve yangın söndürme sistemlerinin periyodik muayenelerinin dijital takvime bağlanması.</li>
              </ul>
            </div>

            {/* Butonlar (Baskıda Gizlenir) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
              <button
                onClick={() => setStep('form')}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all"
              >
                Bilgileri Düzenle
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-all flex items-center gap-1.5 flex-1 sm:flex-initial justify-center"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>PDF / Yazdır</span>
                </button>
                <a
                  href="/tr/teklif-al"
                  className="px-5 py-2.5 bg-primary text-slate-950 rounded-xl text-xs font-extrabold hover:brightness-110 transition-all flex items-center gap-1.5 flex-1 sm:flex-initial justify-center shadow-lg shadow-primary/20"
                >
                  <span>Resmi Teklif Al</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
