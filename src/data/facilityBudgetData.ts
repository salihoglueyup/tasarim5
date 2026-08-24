import { BASE_URL } from '@/lib/seo';
import { getDistrict } from '@/data/districts';

export type FacilityType = 'site' | 'residence' | 'plaza' | 'commercial' | 'industrial';

interface CalculationResult {
  facilityType: FacilityType;
  facilityTypeName: string;
  district: string;
  districtName: string;
  units: number;
  totalFloorAreaM2: number;
  estimatedMonthlyBudget: number;
  duesPerUnit: number;
  costPerM2: number;
  breakdown: {
    security: { amount: number; percentage: number; description: string };
    cleaning: { amount: number; percentage: number; description: string };
    technicalMaintenance: { amount: number; percentage: number; description: string };
    commonEnergyAndUtilities: { amount: number; percentage: number; description: string };
    kmkLegalEmergencyReserve: { amount: number; percentage: number; description: string };
  };
  savingsWithAloYonetim: {
    monthlySavingsAmount: number;
    annualSavingsAmount: number;
    savingsPercentage: number;
    optimizedBudget: number;
    optimizedDuesPerUnit: number;
    reasons: string[];
  };
  kmkCompliance: {
    legalArticle: string;
    duesFormula: string;
    interestRatePerMonth: string;
    auditGuarantee: string;
  };
  currency: 'TRY';
  schema: Record<string, unknown>;
}

const TYPE_BASELINES: Record<FacilityType, { name: string; basePerUnit: number; avgM2PerUnit: number }> = {
  site: { name: 'Site ve Apartman', basePerUnit: 2200, avgM2PerUnit: 120 },
  residence: { name: 'Lüks Rezidans', basePerUnit: 4800, avgM2PerUnit: 160 },
  plaza: { name: 'Plaza ve İş Merkezi', basePerUnit: 7500, avgM2PerUnit: 220 },
  commercial: { name: 'AVM ve Ticari Tesis', basePerUnit: 6200, avgM2PerUnit: 200 },
  industrial: { name: 'Sanayi ve Lojistik Tesisi', basePerUnit: 5800, avgM2PerUnit: 350 },
};

const DISTRICT_FACTORS: Record<string, number> = {
  besiktas: 1.30, sariyer: 1.35, kadikoy: 1.25, sisli: 1.20, bakirkoy: 1.20,
  uskudar: 1.15, atasehir: 1.15, beyoglu: 1.15, basaksehir: 1.05, kartal: 1.00,
  pendik: 0.95, umraniye: 1.00, esenyurt: 0.85, beylikduzu: 0.95, fatih: 1.00,
  zeytinburnu: 0.95, eyupsultan: 1.00, cekmekoy: 1.05, maltepe: 1.05,
  sancaktepe: 0.90, tuzla: 0.95,
};

export function calculateFacilityBudget(
  unitsInput: number = 30,
  typeInput: FacilityType = 'site',
  districtSlug: string = 'kadikoy',
  customM2?: number
): CalculationResult {
  const units = Math.max(1, Math.min(unitsInput || 30, 2000));
  const facilityType = (TYPE_BASELINES[typeInput] ? typeInput : 'site') as FacilityType;
  const config = TYPE_BASELINES[facilityType];
  const district = getDistrict(districtSlug) || { name: 'Kadıköy', slug: 'kadikoy' };
  const districtFactor = DISTRICT_FACTORS[district.slug] || 1.0;
  const totalFloorAreaM2 = customM2 && customM2 > 0 ? customM2 : units * config.avgM2PerUnit;
  const scaleFactor = units > 200 ? 0.85 : units > 100 ? 0.90 : units > 50 ? 0.95 : 1.0;
  const rawDuesPerUnit = Math.round(config.basePerUnit * districtFactor * scaleFactor);
  const estimatedMonthlyBudget = rawDuesPerUnit * units;
  const costPerM2 = Math.round((estimatedMonthlyBudget / totalFloorAreaM2) * 100) / 100;
  const securityAmount = Math.round(estimatedMonthlyBudget * 0.35);
  const cleaningAmount = Math.round(estimatedMonthlyBudget * 0.25);
  const technicalAmount = Math.round(estimatedMonthlyBudget * 0.20);
  const energyAmount = Math.round(estimatedMonthlyBudget * 0.12);
  const reserveAmount = estimatedMonthlyBudget - (securityAmount + cleaningAmount + technicalAmount + energyAmount);
  const savingsPercentage = 30;
  const monthlySavingsAmount = Math.round(estimatedMonthlyBudget * (savingsPercentage / 100));
  const annualSavingsAmount = monthlySavingsAmount * 12;
  const optimizedBudget = estimatedMonthlyBudget - monthlySavingsAmount;
  const optimizedDuesPerUnit = Math.round(optimizedBudget / units);

  return {
    facilityType,
    facilityTypeName: config.name,
    district: district.slug,
    districtName: district.name,
    units,
    totalFloorAreaM2,
    estimatedMonthlyBudget,
    duesPerUnit: rawDuesPerUnit,
    costPerM2,
    breakdown: {
      security: { amount: securityAmount, percentage: 35, description: '5188 Lisanslı Özel Güvenlik, CCTV İzleme ve Devriye Personeli' },
      cleaning: { amount: cleaningAmount, percentage: 25, description: 'TSE HYB Standartlarında Kat Temizliği, Kimyasal ve Biyosidal İlaçlama' },
      technicalMaintenance: { amount: technicalAmount, percentage: 20, description: 'ISO 41001 Periyodik Asansör, Jeneratör, Kompanzasyon ve Yangın Sistemleri' },
      commonEnergyAndUtilities: { amount: energyAmount, percentage: 12, description: 'Ortak Alan Aydınlatma, Hidrofor Enerjisi ve Tesis Ortak Su/Doğalgaz Payı' },
      kmkLegalEmergencyReserve: { amount: reserveAmount, percentage: 8, description: '634 Sayılı KMK Madde 20 Kapsamında Olağanüstü Onarım & Amortisman Fonu' },
    },
    savingsWithAloYonetim: {
      monthlySavingsAmount,
      annualSavingsAmount,
      savingsPercentage,
      optimizedBudget,
      optimizedDuesPerUnit,
      reasons: [
        'Toplu tedarik zinciri ile temizlik ve teknik bakım malzemelerinde %35 indirim',
        'Dijital aidat tahsilat otomasyonu ile %98.7 tahsilat oranı ve sıfır gecikme faizi',
        'Kompanzasyon panosu ve LED aydınlatma optimizasyonu ile %20 enerji tasarrufu',
        'ISO 41001 standartlı koruyucu bakım ile büyük asansör/jeneratör arıza maliyetlerinin engellenmesi',
      ],
    },
    kmkCompliance: {
      legalArticle: '634 Sayılı Kat Mülkiyeti Kanunu Madde 20 & Madde 37',
      duesFormula: 'İşletme Projesi Toplam Gideri / Bağımsız Bölüm Arsa Payı Katsayısı',
      interestRatePerMonth: '%5 Yasal Gecikme Tazminatı (KMK m.20/2)',
      auditGuarantee: 'Yeminli Mali Müşavir ve Bağımsız Denetim Onaylı Şeffaf Portal',
    },
    currency: 'TRY',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CalculateAction',
      name: `${district.name} ${config.name} Tesis Yönetimi ve Aidat Bütçe Simülatörü`,
      description: `${district.name} ilçesinde ${units} daireli ${config.name} tesisi için tahmini işletme bütçesi ve %30 tasarruf projeksiyonu.`,
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/api/tesis-yonetimi/calculate-budget?units=${units}&facilityType=${facilityType}&district=${district.slug}`,
      },
      result: {
        '@type': 'QuantitativeValue',
        value: optimizedBudget,
        unitText: 'TRY/Ay',
      },
    },
  };
}
