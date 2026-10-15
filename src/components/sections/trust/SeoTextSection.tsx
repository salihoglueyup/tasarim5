"use client";

import { useLanguage } from '@/context/LanguageContext';
import SemanticLinker from '@/components/seo/schema/SemanticLinker';

import Icon from '@/components/ui/branding/Icon';
interface SeoTextSectionProps {
  titleKey?: string;
  p1Key?: string;
  p2Key?: string;
}

const TRUST_METRICS = {
  tr: [
    {
      icon: 'domain',
      metric: "2009'dan beri",
      label: "İstanbul'da Faaliyet",
      desc: 'Kadıköy merkezli profesyonel site ve tesis yönetimi',
      badge: 'Kadıköy Merkezli',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: 'Şeffaf',
      label: 'Dijital Muhasebe',
      desc: 'Mobil uygulama ile gelir-gider ve bütçe takibi',
      badge: 'Kalem Kalem Rapor',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: 'Yazılı SLA',
      label: 'Nöbetçi Teknik Kadro',
      desc: 'Acil müdahale hedefi: Anadolu Yakası 30 dk, Avrupa Yakası 1 saat',
      badge: 'Yazılı SLA',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'KMK 634',
      label: 'Hukuki Danışmanlık & İcra',
      desc: 'Mevzuata uygun süreç ve aidat takibi',
      badge: 'Hukuk Desteği',
      color: 'emerald',
    },
  ],
  en: [
    {
      icon: 'domain',
      metric: 'Since 2009',
      label: 'Operating in Istanbul',
      desc: 'Kadıköy-based professional site and facility management',
      badge: 'Based in Kadıköy',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: 'Transparent',
      label: 'Digital Accounting',
      desc: 'Income-expense and budget tracking via mobile app',
      badge: 'Item-by-item reports',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: 'Written SLA',
      label: 'On-Call Technical Team',
      desc: 'Emergency response target: 30 min Anatolian Side, 1 hour European Side',
      badge: 'Written SLA',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'Law 634',
      label: 'Legal Advisory & Collection',
      desc: 'Law-compliant process and dues follow-up',
      badge: 'Legal Support',
      color: 'emerald',
    },
  ],
  ru: [
    {
      icon: 'domain',
      metric: 'С 2009 года',
      label: 'Работаем в Стамбуле',
      desc: 'Профессиональное управление комплексами и объектами, офис в Кадыкёе',
      badge: 'Офис в Кадыкёе',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: 'Прозрачность',
      label: 'Цифровая бухгалтерия',
      desc: 'Учёт доходов, расходов и бюджета в мобильном приложении',
      badge: 'Отчёты по статьям',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: 'Письменный SLA',
      label: 'Дежурная техническая служба',
      desc: 'Целевое время реагирования: 30 мин на азиатской стороне, 1 час на европейской',
      badge: 'Письменный SLA',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'Закон КМК',
      label: 'Юридическая поддержка',
      desc: 'Процессы в соответствии с законом и контроль взносов',
      badge: 'Юридическая поддержка',
      color: 'emerald',
    },
  ],
  ar: [
    {
      icon: 'domain',
      metric: 'منذ 2009',
      label: 'نعمل في إسطنبول',
      desc: 'إدارة محترفة للمجمعات والمرافق ومقرنا في كاديكوي',
      badge: 'مقرنا في كاديكوي',
      color: 'amber',
    },
    {
      icon: 'account_balance_wallet',
      metric: 'شفافية',
      label: 'محاسبة رقمية',
      desc: 'متابعة الإيرادات والمصروفات والميزانية عبر تطبيق الهاتف',
      badge: 'تقارير بند بند',
      color: 'emerald',
    },
    {
      icon: 'engineering',
      metric: 'SLA مكتوب',
      label: 'طاقم فني مناوب',
      desc: 'هدف الاستجابة للطوارئ: 30 دقيقة في الجانب الآسيوي وساعة في الجانب الأوروبي',
      badge: 'SLA مكتوب',
      color: 'amber',
    },
    {
      icon: 'gavel',
      metric: 'قانون KMK',
      label: 'استشارات قانونية وتحصيل',
      desc: 'إجراءات متوافقة مع القانون ومتابعة المستحقات',
      badge: 'دعم قانوني',
      color: 'emerald',
    },
  ],
};

const EYEBROW_TEXT = {
  tr: 'ISO Belgeli & KMK 634 Uyumlu Kurumsal Yönetim',
  en: 'ISO Certified & Law 634 Compliant Enterprise Management',
  ru: 'Сертификаты ISO и соответствие Закону КМК 634',
  ar: 'إدارة مؤسسية حاصلة على شهادات ISO ومتوافقة مع قانون الملكية العقارية 634',
};

const TRUST_CHECKPOINTS = {
  tr: [
    '634 Sayılı Kat Mülkiyeti Kanunu (KMK) çerçevesinde yürütülür',
    'T.C. İçişleri Bakanlığı 5188 Lisanslı Özel Güvenlik ve Valilik izinleri',
    'BELCERT/ILAS belgeli ISO 45001, ISO 14001 ve ISO 10002 yönetim sistemleri',
  ],
  en: [
    'Operations conducted under Law No. 634 on Condominium Ownership (KMK)',
    'Licensed Private Security and official governorship permits under Law 5188',
    'ISO 45001, ISO 14001 and ISO 10002 management systems certified by BELCERT (ILAS)',
  ],
  ru: [
    'Работа в рамках Закона о кондоминиумах № 634 (KMK)',
    'Лицензированная частная охрана и разрешения префектуры по Закону 5188',
    'Сертификаты ISO 45001, ISO 14001 и ISO 10002 (BELCERT / ILAS)',
  ],
  ar: [
    'تُدار الأعمال في إطار قانون الملكية العقارية رقم 634 (KMK)',
    'أمن خاص مرخص وتصاريح حكومية رسمية بموجب القانون رقم 5188',
    'شهادات ISO 45001 وISO 14001 وISO 10002 (BELCERT / ILAS)',
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
      <div className="relative bg-[var(--color-surface)] dark:bg-[var(--color-surface)]/95 backdrop-blur-2xl border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 lg:p-14 shadow-xl dark:shadow-2xl overflow-hidden group">
        
        {/* Ortam Işıması (Ambient Radial Blur) */}
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 bg-slate-500/10 dark:bg-slate-400/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100" 
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/10 dark:bg-slate-500/15 border border-slate-500/25 text-xs font-bold text-slate-800 dark:text-slate-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <Icon name="verified" className="text-sm text-slate-600 dark:text-slate-400" />
              <span className="tracking-tight">{eyebrow}</span>
            </div>

            {/* Yüksek Kontrastlı Ana Başlık (Kurumsal Başlık Rengi) */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-heading-text)] dark:text-white tracking-tight leading-[1.2]">
              {t(titleKey as Parameters<typeof t>[0])}
            </h2>
            
            {/* Semantik Gövde Metinleri (Kurumsal Gövde Rengi & Kehribar Bağlantılar) */}
            <div className="text-[var(--color-body-text)] dark:text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg font-normal space-y-4">
              <p className="[&_strong]:text-[var(--color-heading-text)] dark:[&_strong]:text-white [&_strong]:font-semibold [&_a]:text-slate-700 dark:[&_a]:text-slate-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-slate-500/40 [&_a]:font-medium hover:[&_a]:text-slate-600 hover:[&_a]:decoration-slate-600">
                <SemanticLinker text={t(p1Key as Parameters<typeof t>[0]) as string} />
              </p>
              <p className="[&_strong]:text-[var(--color-heading-text)] dark:[&_strong]:text-white [&_strong]:font-semibold [&_a]:text-slate-700 dark:[&_a]:text-slate-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-slate-500/40 [&_a]:font-medium hover:[&_a]:text-slate-600 hover:[&_a]:decoration-slate-600">
                <SemanticLinker text={t(p2Key as Parameters<typeof t>[0]) as string} />
              </p>
            </div>

            {/* Hızlı Güven & Mevzuat Doğrulama Kontrol Listesi */}
            <div className="pt-2 border-t border-[var(--color-outline)]/60 dark:border-white/5 space-y-2">
              {checkpoints.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--color-heading-text)] dark:text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
                    <Icon name="check" className="text-xs" />
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
                    ? 'bg-slate-500/10 dark:bg-slate-400/15 text-slate-800 dark:text-slate-300 border-slate-500/25'
                    : 'bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/25';
                  const iconBoxStyle = isAmber
                    ? 'bg-slate-500/10 dark:bg-slate-400/15 text-slate-700 dark:text-slate-300 border-slate-500/25'
                    : 'bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/25';
                  const metricColor = isAmber
                    ? 'text-slate-600 dark:text-slate-400'
                    : 'text-emerald-600 dark:text-emerald-400';
                  const cardHoverBorder = isAmber
                    ? 'hover:border-slate-500/40 dark:hover:border-slate-400/40'
                    : 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40';

                  return (
                    <div 
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[var(--color-surface-variant)] border border-slate-200/90 dark:border-white/10 ${cardHoverBorder} transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 group/card flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 rounded-xl ${iconBoxStyle} border flex items-center justify-center shrink-0 shadow-2xs`}>
                            <Icon name={card.icon} className="text-lg" />
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
              <div className="mt-4 p-3 rounded-xl bg-white dark:bg-[var(--color-surface-variant)] border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center justify-between gap-3 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Icon name="lock" className="text-sm text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">{t('stx_env_law')}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-500/10 dark:bg-slate-400/15 text-slate-700 dark:text-slate-300 border border-slate-500/25 font-mono font-bold shrink-0 text-[10px]">
                  ILAS · ISO 45001
                </span>
              </div>
            </div>

        </div>

      </div>
    </section>
  );
}
