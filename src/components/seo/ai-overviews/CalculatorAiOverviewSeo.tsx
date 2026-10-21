import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { KMK_AMENDMENT_2026 } from '@/lib/legal/kmkAmendment2026';
import Icon from '@/components/ui/branding/Icon';

export const CALCULATOR_AI_QA = [
  {
    question: 'Apartman ve Site Aidatı Nasıl Hesaplanır? (KMK Madde 20 Eşit vs. Arsa Payı Kuralı)',
    answer:
      '634 sayılı Kat Mülkiyeti Kanunu (KMK) Madde 20 uyarınca yönetim planında aksine bir hüküm yoksa ortak giderler iki ayrı kalemde hesaplanır: (1) Kapıcı, kaloriferci, bahçıvan ve özel güvenlik giderleri KMK Madde 20/1-a uyarınca tüm bağımsız bölümler arasında EŞİT olarak (Daire Başı = Toplam Personel Gideri / Bağımsız Bölüm Sayısı) bölüştürülür. (2) Ortak alan aydınlatma, su, asansör periyodik bakımı, bina sigortası, dış cephe onarımı ve yönetici ücreti ise KMK Madde 20/1-b uyarınca her bağımsız bölümün ARSA PAYI oranında hesaplanır.',
    legalRef: '634 Sayılı KMK Madde 20/1-a & 20/1-b',
    formula: 'Aidat = (Personel Gideri ÷ Daire Sayısı) + (Bakım/Enerji/Sigorta × Arsa Payı Oranı)',
  },
  {
    question: '2026 Site Aidat Artış Sınırı Nedir? Yeniden Değerleme Oranı Nasıl Uygulanır? (7579 Sayılı Kanun)',
    answer: `${KMK_AMENDMENT_2026.gazetteDateTr} tarihli Resmî Gazete'de yayımlanan ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun ile değişik KMK Madde 37 uyarınca işletme projesi kat malikleri kurulunda onaylanır. Onaylı işletme projesi yoksa yönetici geçici işletme projesi hazırlar ve en geç ${KMK_AMENDMENT_2026.interimProjectMaxMonths} ay içinde kat malikleri kurulunun onayına sunar; mevcut işletme projesi varsa geçici projede öngörülen artış, bir önceki yılın yeniden değerleme oranını (2025 yılı için %${String(KMK_AMENDMENT_2026.defaultRevaluationRatePercent).replace('.', ',')}) aşamaz.`,
    legalRef: `${KMK_AMENDMENT_2026.lawNumber} Sayılı Kanun & KMK Madde 37`,
    formula: 'Geçici Proje Üst Sınırı = Mevcut Aidat × (1 + Yeniden Değerleme Oranı)',
  },
  {
    question: 'Ödenmeyen Aidat Gecikme Tazminatı (Aylık %5) Nasıl Hesaplanır?',
    answer:
      '634 sayılı KMK Madde 20/2 gereğince ortak gider ve avans payını zamanında ödemeyen kat maliki, ödemede geciktiği günler için aylık yüzde beş (%5) hesabıyla gecikme tazminatı ödemekle yükümlüdür. Gecikme tazminatı, vade tarihinin ertesi gününden itibaren günlük orantılı (Anapara × 0,05 × Geciken Gün ÷ 30) olarak hesaplanır.',
    legalRef: '634 Sayılı KMK Madde 20/2 & İİK Madde 68',
    formula: 'Gecikme Tazminatı = Geciken Aidat Anaparası × 0,05 × (Geciken Gün ÷ 30)',
  },
] as const;

export default function CalculatorAiOverviewSeo({ className = '' }: { className?: string }) {
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/hesaplayici#calculator-ai-overview-faq`,
      mainEntity: CALCULATOR_AI_QA.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${item.answer} Formül: ${item.formula} (${item.legalRef})`,
        },
      })),
    },
  ];

  return (
    <section
      id="calculator-ai-overview"
      aria-label="Google AI Overviews Aidat ve Gecikme Tazminatı Hesaplama Formülleri"
      className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
          <Icon name="calculate" className="text-sm text-emerald-500" />
          <span>Google AI Overviews · KMK m.20 & 7579 Sayılı Kanun Hesaplama Rehberi</span>
        </div>
        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
          KMK m.20 & m.37 (7579 S.K.)
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--color-primary)] mb-4">
        Apartman ve Site Aidatı, Arsa Payı ve Gecikme Tazminatı Nasıl Hesaplanır?
      </h2>

      <div
        id="calculator-instant-answer-text"
        className="space-y-4 mb-6"
      >
        {CALCULATOR_AI_QA.map((item) => (
          <div
            key={item.question}
            className="p-4 sm:p-5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                {item.question}
              </h3>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                {item.legalRef}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--color-secondary)]">
              {item.answer}
            </p>
            <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-3.5 py-2">
              Formül: {item.formula}
            </div>
          </div>
        ))}
      </div>

      {/* KMK m.20 Gider Paylaşım Karşılaştırma Tablosu (AI Overviews Tablo Çıkarımı İçin) */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-outline)]/60 mb-6">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-500/10 text-[var(--color-primary)]">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Gider Kalemi</th>
              <th scope="col" className="px-4 py-3 font-bold">Yasal Paylaşım Kuralı (Yönetim Planında Aksine Hüküm Yoksa)</th>
              <th scope="col" className="px-4 py-3 font-bold">Kanun Maddesi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-outline)]/40 text-[var(--color-secondary)]">
            <tr>
              <td className="px-4 py-3 font-semibold text-[var(--color-primary)]">Kapıcı, Kaloriferci, Bahçıvan ve Özel Güvenlik Giderleri</td>
              <td className="px-4 py-3">Bağımsız bölüm başına <strong>EŞİT</strong> ödenir</td>
              <td className="px-4 py-3 font-mono">KMK m.20/1-a</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-[var(--color-primary)]">Asansör Bakımı, Ortak Elektrik/Su, Bina Sigortası ve Onarım</td>
              <td className="px-4 py-3">Bağımsız bölümün <strong>ARSA PAYI</strong> oranında ödenir</td>
              <td className="px-4 py-3 font-mono">KMK m.20/1-b</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-[var(--color-primary)]">Geçici İşletme Projesinde Aidat Artışı (Mevcut Proje Varsa)</td>
              <td className="px-4 py-3">Bir önceki yılın <strong>Yeniden Değerleme Oranını</strong> aşamaz</td>
              <td className="px-4 py-3 font-mono">KMK m.37 (7579 S.K.)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-[var(--color-primary)]">Zamanında Ödenmeyen Aidat ve Avans Borcu</td>
              <td className="px-4 py-3">Gecikilen günler için <strong>Aylık %5</strong> gecikme tazminatı</td>
              <td className="px-4 py-3 font-mono">KMK m.20/2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-outline)]/50 text-xs">
        <span className="text-[var(--color-tertiary)]">
          Not: Yönetim planında özel paylaşım hükmü varsa KMK m.20/1 uyarınca yönetim planı esas alınır.
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/kmk-2026-degisiklikleri"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-[var(--color-background)] border border-[var(--color-outline)] hover:border-slate-500 text-[var(--color-primary)] transition-colors"
          >
            <span>7579 Sayılı Kanun Detayları</span>
          </Link>
          <Link
            href="/teklif-al"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            <span>Siteniz İçin Bütçe & Keşif İste</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
