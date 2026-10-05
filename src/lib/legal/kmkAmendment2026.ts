/**
 * 7579 sayılı Kanun (Tapu Kanunu ile Bazı Kanunlarda ve 375 sayılı KHK'da Değişiklik Yapılmasına Dair Kanun)
 * ile Kat Mülkiyeti Kanunu'nda yapılan değişikliklerin tek kaynağı.
 *
 * Kaynak: Resmî Gazete, 22 Mayıs 2026, sayı 33261. TBMM kabul tarihi 7 Mayıs 2026.
 * KMK'da değişen maddeler: 35 (avans), 37 (işletme projesi), 70 (toplu yapılarda yönetim planı nisabı).
 * KMK değişiklikleri yayım tarihinde yürürlüğe girmiştir (kanunun 24. maddesinin 1. fıkrası ayrı, 31.12.2026).
 *
 * Hukuki içerikte son söz hukuk danışmanındadır; bu dosya güncellendiğinde sayfa, SSS ve sözlük
 * girdileri birlikte gözden geçirilmelidir.
 */
export const KMK_AMENDMENT_2026 = {
  lawNumber: 7579,
  gazetteDate: '2026-05-22',
  gazetteDateTr: '22 Mayıs 2026',
  gazetteNumber: 33261,
  parliamentAcceptedTr: '7 Mayıs 2026',
  gazetteUrl: 'https://www.resmigazete.gov.tr/eskiler/2026/05/20260522-1.htm',
  /** Hazine ve Maliye Bakanlığı'nca ilan edilen, kaynaklarda "%25,49" olarak geçen oran. Yıllık değişir; sayfada kullanıcıya düzenlettirilir. */
  defaultRevaluationRatePercent: 25.49,
  /** Sayfa içeriğinin hazırlandığı tarih. */
  contentDateTr: '5 Ekim 2026',
  contentDate: '2026-10-05',
  interimProjectMaxMonths: 3,
  objectionDays: 7,
  managementPlanQuorum: {
    generalBuildings: { fraction: '4/5', article: 'm.28/3' },
    multiBuildingComplexes: { fraction: '2/3', article: 'm.70', previous: '4/5' },
  },
} as const;

/**
 * Geçici işletme projesinde (mevcut proje varsa) bedelin üst sınırı:
 * yürürlükteki proje bedeli x (1 + yeniden değerleme oranı). Oran yüzde olarak verilir.
 */
export function revaluationCap(currentAmount: number, ratePercent: number) {
  if (!Number.isFinite(currentAmount) || currentAmount < 0) return null;
  if (!Number.isFinite(ratePercent) || ratePercent < 0) return null;
  const multiplier = 1 + ratePercent / 100;
  const maxAmount = currentAmount * multiplier;
  return {
    maxAmount: Math.round(maxAmount * 100) / 100,
    maxIncrease: Math.round((maxAmount - currentAmount) * 100) / 100,
    multiplier,
  };
}

/**
 * Önerilen (talep edilen) tutarın yasal tavanı aşıp aşmadığı. Kuruş yuvarlamasından doğan
 * küçük farklar için 1 kuruş tolerans tanınır.
 */
export function checkProposedAmount(currentAmount: number, proposedAmount: number, ratePercent: number) {
  const cap = revaluationCap(currentAmount, ratePercent);
  if (!cap || !Number.isFinite(proposedAmount) || proposedAmount < 0) return null;
  const excess = Math.round((proposedAmount - cap.maxAmount) * 100) / 100;
  return {
    ...cap,
    proposedAmount,
    exceedsCap: excess > 0.01,
    excess: excess > 0.01 ? excess : 0,
    impliedIncreasePercent: currentAmount > 0 ? Math.round(((proposedAmount / currentAmount) - 1) * 10000) / 100 : null,
  };
}
