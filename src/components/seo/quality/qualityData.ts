// Kalite politikası sayfasının dile bağlı olmayan yapısal verileri.
// Başlık, kapsam ve madde metinleri çeviri anahtarlarındadır (qlt_std_<n>_*, qlt_faq_<n>_*).

export interface QualityStandardItem {
  /** Sıra numarası: çeviri anahtarları qlt_std_<n>_* biçimindedir. */
  n: number;
  id: string;
  code: string;
  badge: string;
  icon: string;
  accentColor: string;
  badgeBg: string;
  deliverableCount: number;
}

export const QUALITY_STANDARDS: QualityStandardItem[] = [
  {
    n: 1,
    id: 'iso-45001',
    code: 'ISO 45001:2018',
    badge: 'BELCERT Belge No: A1808966',
    icon: 'health_and_safety',
    accentColor: 'text-amber-500 border-amber-500/30',
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    deliverableCount: 3,
  },
  {
    n: 2,
    id: 'iso-14001',
    code: 'ISO 14001:2026',
    badge: 'BELCERT Belge No: A1808962',
    icon: 'eco',
    accentColor: 'text-emerald-500 border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    deliverableCount: 3,
  },
  {
    n: 3,
    id: 'iso-10002',
    code: 'ISO 10002:2018',
    badge: 'BELCERT Belge No: A1808961',
    icon: 'support_agent',
    accentColor: 'text-slate-500 border-slate-500/30',
    badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    deliverableCount: 3,
  },
  {
    n: 4,
    id: 'iso-22301',
    code: 'ISO 22301:2019',
    badge: 'BELCERT Belge No: A1808963',
    icon: 'all_inclusive',
    accentColor: 'text-slate-500 border-slate-500/30',
    badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    deliverableCount: 3,
  },
  {
    n: 5,
    id: 'iso-31000',
    code: 'ISO 31000:2018',
    badge: 'BELCERT Belge No: A1808965',
    icon: 'security',
    accentColor: 'text-slate-500 border-slate-500/30',
    badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    deliverableCount: 3,
  },
  {
    n: 6,
    id: 'ozel-guvenlik-5188',
    code: '5188 Sayılı Kanun',
    badge: 'Özel Güvenlik Faaliyet İzni',
    icon: 'gavel',
    accentColor: 'text-slate-500 border-slate-500/30',
    badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    deliverableCount: 3,
  },
];

export const QUALITY_FAQ_COUNT = 4;
