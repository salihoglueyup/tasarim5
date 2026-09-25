"use client";

import { useLanguage } from '@/context/LanguageContext';
import SemanticLinker from '@/components/seo/schema/SemanticLinker';

interface SeoTextSectionProps {
  titleKey?: string;
  p1Key?: string;
  p2Key?: string;
}

const TRUST_METRICS = {
  tr: [
    {
      icon: 'domain',
      metric: '15+ Yıl',
      label: '50.000+ Bağımsız Bölüm',
      desc: 'İstanbul genelinde rezidans ve site liderliği',
      badge: 'TSE Onaylı',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: '%100 Şeffaf',
      label: 'Canlı Dijital Muhasebe',
      desc: 'Mobil uygulama ile anlık kasa & bütçe denetimi',
      badge: 'Sıfır Açık',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: '30 Dk Acil',
      label: '7/24 Nöbetçi Teknik Kadro',
      desc: 'Asansör, hidrofor ve jeneratöre anında müdahale',
      badge: 'SLA Garantisi',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'KMK 634',
      label: 'Hukuki Danışmanlık & İcra',
      desc: 'Mevzuata tam uyum ve sıfır aidat tahsilat riski',
      badge: 'Hukuk Güvencesi',
      color: 'emerald',
    },
  ],
  en: [
    {
      icon: 'domain',
      metric: '15+ Years',
      label: '50,000+ Units Managed',
      desc: 'Leadership in residential complexes across Istanbul',
      badge: 'TSE Certified',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: '100% Transparent',
      label: 'Real-Time Accounting',
      desc: 'Instant cash and budget auditing via mobile app',
      badge: 'Zero Deficit',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: '30 Min Dispatch',
      label: '24/7 Technical Response',
      desc: 'Immediate action for elevators, pumps and generators',
      badge: 'SLA Guaranteed',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'Law 634',
      label: 'Legal Advisory & Collection',
      desc: 'Full compliance with Condominium Law and dues recovery',
      badge: 'Legal Protection',
      color: 'emerald',
    },
  ],
  ru: [
    {
      icon: 'domain',
      metric: '15+ Лет',
      label: '50 000+ Квартир в Управлении',
      desc: 'Лидерство в жилых комплексах по всему Стамбулу',
      badge: 'Сертификат TSE',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: '100% Прозрачность',
      label: 'Онлайн Бухгалтерия',
      desc: 'Мгновенный аудит кассы и бюджета через приложение',
      badge: 'Без Дефицита',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: '30 Мин Выезд',
      label: '24/7 Техническая Служба',
      desc: 'Немедленное обслуживание лифтов и генераторов',
      badge: 'Гарантия SLA',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'Закон КМК',
      label: 'Юридическая Поддержка',
      desc: 'Полное соответствие нормам и взыскание задолженностей',
      badge: 'Правовая Защита',
      color: 'emerald',
    },
  ],
  ar: [
    {
      icon: 'domain',
      metric: '+15 عامًا',
      label: '+50,000 وحدة مدارة',
      desc: 'الريادة في إدارة المجمعات السكنية عبر إسطنبول',
      badge: 'معتمد TSE',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: '%100 شفاف',
      label: 'محاسبة رقمية حية',
      desc: 'تدقيق فوري للخزينة والميزانية عبر تطبيق الهاتف',
      badge: 'صفر عجز',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: '30 دقيقة',
      label: 'طاقم فني على مدار 24/7',
      desc: 'استجابة فورية للمصاعد والمضخات والمولدات الكهربائية',
      badge: 'ضمان SLA',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'قانون KMK',
      label: 'استشارات قانونية وتحصيل',
      desc: 'امتثال كامل للقوانين العقارية وتحصيل مضمون للمستحقات',
      badge: 'حماية قانونية',
      color: 'emerald',
    },
  ],
};

const EYEBROW_TEXT = {
  tr: 'ISO 41001 & KMK 634 Akredite Kurumsal Yönetim Otoritesi',
  en: 'ISO 41001 & Law 634 Accredited Enterprise Management Authority',
  ru: 'Аккредитованный Орган Управления по ISO 41001 и Закону КМК 634',
  ar: 'إدارة مؤسسية معتمدة وفق ISO 41001 وقانون الملكية العقارية 634',
};

const TRUST_CHECKPOINTS = {
  tr: [
    '634 Sayılı Kat Mülkiyeti Kanunu (KMK) standartlarına %100 tam uyum',
    'T.C. İçişleri Bakanlığı 5188 Lisanslı Özel Güvenlik ve Valilik izinleri',
    'ISO 41001 Uluslararası Tesis Yönetimi ve TSE Hizmet Yeterlilik Belgeli altyapı',
  ],
  en: [
    '100% full compliance with Law No. 634 on Condominium Ownership (KMK)',
    'Licensed Private Security and official governorship permits under Law 5188',
    'ISO 41001 International Facility Management and TSE Certified operations',
  ],
  ru: [
    '100% соответствие Закону о кондоминиумах № 634 (KMK)',
    'Лицензированная частная охрана и разрешения префектуры по Закону 5188',
    'Международное управление объектами ISO 41001 и сертификация TSE',
  ],
  ar: [
    'امتثال كامل بنسبة 100% لمعايير قانون الملكية العقارية رقم 634 (KMK)',
    'أمن خاص مرخص وتصاريح حكومية رسمية بموجب القانون رقم 5188',
    'إدارة مرافق دولية معتمدة وفق ISO 41001 ومطابقة لمعايير TSE',
  ],
};

export default function SeoTextSection({
  titleKey = 'home_seo_title',
  p1Key = 'home_seo_p1',
  p2Key = 'home_seo_p2'
}: SeoTextSectionProps) {
  const { t, language } = useLanguage();

  const lang = (language === 'en' || language === 'ru' || language === 'ar') ? language : 'tr';
  const metrics = TRUST_METRICS[lang];
  const eyebrow = EYEBROW_TEXT[lang];
  const checkpoints = TRUST_CHECKPOINTS[lang];

  return (
    <section 
      id="speakable-content" 
      className="relative z-10 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6 sm:-mt-10 md:-mt-14"
    >
      {/* Apple-Style Yönetici Güven Bento Adası */}
      <div className="relative bg-[var(--color-surface)] dark:bg-[#15161E]/95 backdrop-blur-2xl border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 lg:p-14 shadow-xl dark:shadow-2xl overflow-hidden group">
        
        {/* Ortam Işıması (Ambient Radial Blur) */}
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100" 
          aria-hidden="true" 
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Sol Kolon: Otorite Başlığı & Semantik Paragraflar (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Otorite & Akreditasyon Hap Rozeti (Kurumsal Kehribar & Zümrüt Vurgulu) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 text-xs font-bold text-amber-800 dark:text-amber-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="material-symbols-outlined text-sm text-amber-600 dark:text-amber-400" aria-hidden="true">verified</span>
              <span className="tracking-tight">{eyebrow}</span>
            </div>

            {/* Yüksek Kontrastlı Ana Başlık (Kurumsal Başlık Rengi) */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-heading-text)] dark:text-white tracking-tight leading-[1.2]">
              {t(titleKey as Parameters<typeof t>[0])}
            </h2>
            
            {/* Semantik Gövde Metinleri (Kurumsal Gövde Rengi & Kehribar Bağlantılar) */}
            <div className="text-[var(--color-body-text)] dark:text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg font-normal space-y-4">
              <p className="[&_strong]:text-[var(--color-heading-text)] dark:[&_strong]:text-white [&_strong]:font-semibold [&_a]:text-amber-700 dark:[&_a]:text-amber-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-amber-500/40 [&_a]:font-medium hover:[&_a]:text-amber-600 hover:[&_a]:decoration-amber-600">
                <SemanticLinker text={t(p1Key as Parameters<typeof t>[0]) as string} />
              </p>
              <p className="[&_strong]:text-[var(--color-heading-text)] dark:[&_strong]:text-white [&_strong]:font-semibold [&_a]:text-amber-700 dark:[&_a]:text-amber-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-amber-500/40 [&_a]:font-medium hover:[&_a]:text-amber-600 hover:[&_a]:decoration-amber-600">
                <SemanticLinker text={t(p2Key as Parameters<typeof t>[0]) as string} />
              </p>
            </div>

            {/* Hızlı Güven & Mevzuat Doğrulama Kontrol Listesi */}
            <div className="pt-2 border-t border-[var(--color-outline)]/60 dark:border-white/5 space-y-2">
              {checkpoints.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--color-heading-text)] dark:text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
                    <span className="material-symbols-outlined text-xs">check</span>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

            {/* Sağ Kolon: 4 Adet Saf Titanium/Obsidian Mikro Güven Kartı (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {metrics.map((card, idx) => {
                  const isAmber = card.color === 'amber';
                  const badgeStyle = isAmber
                    ? 'bg-amber-500/10 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 border-amber-500/25'
                    : 'bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/25';
                  const iconBoxStyle = isAmber
                    ? 'bg-amber-500/10 dark:bg-amber-400/15 text-amber-700 dark:text-amber-300 border-amber-500/25'
                    : 'bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/25';
                  const metricColor = isAmber
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-emerald-600 dark:text-emerald-400';
                  const cardHoverBorder = isAmber
                    ? 'hover:border-amber-500/40 dark:hover:border-amber-400/40'
                    : 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40';

                  return (
                    <div 
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1E202B] border border-slate-200/90 dark:border-white/10 ${cardHoverBorder} transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 group/card flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 rounded-xl ${iconBoxStyle} border flex items-center justify-center shrink-0 shadow-2xs`}>
                            <span className="material-symbols-outlined text-lg">{card.icon}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeStyle} border`}>
                            {card.badge}
                          </span>
                        </div>
                        <div className={`text-xl sm:text-2xl font-black ${metricColor} tracking-tight mb-1`}>
                          {card.metric}
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                          {card.label}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Alt Kurumsal Mühür Bilgisi (Titanium Zemin & Zümrüt/Kehribar Vurgular) */}
              <div className="mt-4 p-3 rounded-xl bg-white dark:bg-[#1E202B] border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center justify-between gap-3 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400">lock</span>
                  <span className="font-medium">T.C. Çevre & Şehircilik Bakanlığı Mevzuatına Tam Uyum</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 dark:bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-500/25 font-mono font-bold shrink-0 text-[10px]">
                  ISO 41001
                </span>
              </div>
            </div>

        </div>

      </div>
    </section>
  );
}
