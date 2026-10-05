'use client';

import { useMemo, useState } from 'react';
import { KMK_AMENDMENT_2026, checkProposedAmount, revaluationCap } from '@/lib/legal/kmkAmendment2026';

const fmt = (n: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 }).format(n);

function toNumber(raw: string): number {
  // "1.250,50" ve "1250.50" gibi girişleri kabul eder.
  const cleaned = raw.trim().replace(/\s/g, '');
  if (!cleaned) return NaN;
  const normalized = cleaned.includes(',') ? cleaned.replace(/\./g, '').replace(',', '.') : cleaned;
  return Number(normalized);
}

export default function AidatArtisSiniriHesaplayici() {
  const [current, setCurrent] = useState('1000');
  const [proposed, setProposed] = useState('');
  const [rate, setRate] = useState(String(KMK_AMENDMENT_2026.defaultRevaluationRatePercent).replace('.', ','));

  const result = useMemo(() => {
    const c = toNumber(current);
    const r = toNumber(rate);
    const p = toNumber(proposed);
    if (Number.isNaN(p) || proposed.trim() === '') return { cap: revaluationCap(c, r), check: null };
    return { cap: revaluationCap(c, r), check: checkProposedAmount(c, p, r) };
  }, [current, proposed, rate]);

  const inputClass =
    'w-full rounded-xl border border-[var(--color-outline)]/80 bg-[var(--color-surface)] px-4 py-3 text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500/30';

  return (
    <div
      className="rounded-3xl border border-[var(--color-outline)]/80 bg-[var(--color-surface)] p-6 md:p-8 shadow-xs"
      aria-labelledby="aidat-tavan-baslik"
    >
      <h2 id="aidat-tavan-baslik" className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
        Aidat Artış Sınırı Hesaplayıcı
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Mevcut işletme projesi olan sitelerde geçici işletme projesindeki bedel, bir önceki yıla ilişkin yeniden
        değerleme oranından fazla olamaz. Aşağıdaki araç bu üst sınırı hesaplar.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Mevcut aylık aidat / avans (₺)
          </span>
          <input
            inputMode="decimal"
            className={inputClass}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            aria-describedby="aidat-tavan-not"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Yeniden değerleme oranı (%)
          </span>
          <input inputMode="decimal" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Önerilen yeni tutar (₺) <span className="font-normal text-slate-500">(isteğe bağlı)</span>
          </span>
          <input
            inputMode="decimal"
            className={inputClass}
            value={proposed}
            onChange={(e) => setProposed(e.target.value)}
            placeholder="Örn. 1400"
          />
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-500/5 border border-slate-500/15 p-5" role="status" aria-live="polite">
        {result.cap ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Yasal üst sınır</dt>
              <dd className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{fmt(result.cap.maxAmount)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">İzin verilen en yüksek artış</dt>
              <dd className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{fmt(result.cap.maxIncrease)}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300">Geçerli bir tutar ve oran girin.</p>
        )}

        {result.check && (
          <p
            className={`mt-4 text-sm font-semibold ${
              result.check.exceedsCap ? 'text-red-700 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'
            }`}
          >
            {result.check.exceedsCap
              ? `Önerilen tutar (${fmt(result.check.proposedAmount)}) üst sınırı ${fmt(result.check.excess)} aşıyor${
                  result.check.impliedIncreasePercent !== null ? ` (artış: %${result.check.impliedIncreasePercent})` : ''
                }.`
              : `Önerilen tutar (${fmt(result.check.proposedAmount)}) üst sınırın içinde${
                  result.check.impliedIncreasePercent !== null ? ` (artış: %${result.check.impliedIncreasePercent})` : ''
                }.`}
          </p>
        )}
      </div>

      <p id="aidat-tavan-not" className="mt-4 text-xs text-slate-500 leading-relaxed">
        Varsayılan oran ({String(KMK_AMENDMENT_2026.defaultRevaluationRatePercent).replace('.', ',')}%) kaynaklarda
        geçen, Hazine ve Maliye Bakanlığı&apos;nca ilan edilen yeniden değerleme oranıdır; geçerli oranı her zaman
        resmî duyurudan kontrol edin. Hesap, mevcut işletme projesi bulunan ve geçici proje hazırlanan durumu
        varsayar. Kat malikleri kurulunca onaylanan projelerde tavanın nasıl uygulanacağı için hukuk danışmanınıza
        başvurun. Bu araç bilgilendirme amaçlıdır, hukuki görüş değildir.
      </p>
    </div>
  );
}
