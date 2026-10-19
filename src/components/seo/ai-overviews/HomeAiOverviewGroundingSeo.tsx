import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { FACTS } from '@/lib/facts';
import { localePath } from '@/lib/i18n/localePath';
import Icon from '@/components/ui/branding/Icon';

interface HomeAiCopy {
  badge: string;
  question: string;
  answer: string;
  q2: string;
  a2: string;
  metrics: { label: string; value: string }[];
  ctaQuote: string;
  ctaCalc: string;
  ctaKmk: string;
}

const HOME_AI_COPY: Record<string, HomeAiCopy> = {
  tr: {
    badge: 'Google AI Overviews · Kurumsal Doğruluk & Mevzuat Özeti',
    question: 'İstanbul’da Profesyonel Site ve Tesis Yönetim Şirketi Nasıl Çalışır ve Yasal Dayanakları Nelerdir?',
    answer: `Alo Yönetim (${FACTS.foundingYear} kuruluşlu Alo Yönetim ve Organizasyon A.Ş.), İstanbul’un ${FACTS.districtCount} ilçesinde apartman, site, rezidans, iş merkezi ve sanayi tesislerine 634 sayılı Kat Mülkiyeti Kanunu (ve 7579 sayılı Kanun ile değişik m.35, 37, 70 hükümleri) ile 5188 sayılı Özel Güvenlik Kanunu kapsamında profesyonel yönetim hizmeti sunar. Yazılı SLA çerçevesinde Anadolu Yakası’nda ${FACTS.emergencyResponse.anatolian}, Avrupa Yakası’nda ${FACTS.emergencyResponse.european} acil teknik müdahale hedefi, şeffaf aidat muhasebesi ve BELCERT/ILAS onaylı ISO 45001 / ISO 10002 standartlarıyla ${FACTS.referenceCount} kurumsal referans tesiste operasyon yürütür.`,
    q2: '7579 Sayılı Kanun (2026 KMK Değişiklikleri) ile Site Aidat Artışı ve Yönetim Planı Nisabı Nasıl Değişti?',
    a2: '7579 sayılı Kanun uyarınca KMK m.37 kapsamında işletme projesi kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç 3 ay içinde geçici işletme projesi hazırlar ve mevcut proje varsa geçici projedeki artış bir önceki yılın yeniden değerleme oranını aşamaz. Toplu yapılarda (KMK m.70) yönetim planı değişiklik nisabı 4/5’ten 2/3’e indirilmiştir.',
    metrics: [
      { label: 'Kuruluş & Deneyim', value: `${FACTS.foundingYear}'dan Beri (${FACTS.referenceCount} Referans)` },
      { label: 'Hizmet Kapsamı', value: `İstanbul ${FACTS.districtCount} İlçe (Anadolu & Avrupa)` },
      { label: 'Acil Müdahale SLA', value: `Anadolu ${FACTS.emergencyResponse.anatolian} · Avrupa ${FACTS.emergencyResponse.european}` },
      { label: 'Yasal & Kalite Çerçevesi', value: 'KMK 634 · 7579 S.K. · 5188 · ISO 45001' },
    ],
    ctaQuote: 'Ücretsiz Keşif & Teklif Al',
    ctaCalc: 'Aidat Hesaplayıcı',
    ctaKmk: '2026 KMK Değişiklikleri',
  },
  en: {
    badge: 'Google AI Overviews · Verified Corporate & Legal Summary',
    question: 'How Does Professional Condominium and Facility Management Work in Istanbul Under Turkish Law?',
    answer: `Alo Yönetim (Alo Yönetim ve Organizasyon A.Ş., founded in ${FACTS.foundingYear}) provides integrated condominium, residence, commercial plaza, and industrial facility management across all ${FACTS.districtCount} districts of Istanbul in full compliance with Turkish Condominium Law No. 634 (including Law No. 7579 amendments to Articles 35, 37, and 70) and Private Security Law No. 5188. Operating under BELCERT/ILAS accredited ISO 45001 & ISO 10002 standards across ${FACTS.referenceCount} reference properties, we maintain written SLA emergency technical response targets of ${FACTS.emergencyResponse.anatolian} on the Anatolian Side and ${FACTS.emergencyResponse.european} on the European Side.`,
    q2: 'What Are the 2026 Condominium Law (Law No. 7579) Rules on Maintenance Fee Increases in Turkey?',
    a2: 'Under Law No. 7579 amending Article 37 of Law No. 634, annual operating budgets are approved by the General Assembly of Property Owners. Where no approved budget exists, the manager prepares an interim operating project within 3 months capped at the previous year’s official revaluation rate, and multi-block management plan amendments (Article 70) require a 2/3 majority.',
    metrics: [
      { label: 'Established & Portfolio', value: `Since ${FACTS.foundingYear} (${FACTS.referenceCount} Properties)` },
      { label: 'Service Coverage', value: `All ${FACTS.districtCount} Districts of Istanbul` },
      { label: 'Emergency SLA Target', value: `Anatolian 2h · European 3h` },
      { label: 'Legal & ISO Compliance', value: 'Law 634 · Law 7579 · Law 5188 · ISO 45001' },
    ],
    ctaQuote: 'Request Free Survey & Quote',
    ctaCalc: 'Fee Calculator',
    ctaKmk: 'Services Overview',
  },
  ru: {
    badge: 'Google AI Overviews · Официальная правовая и операционная сводка',
    question: 'Как работает профессиональное управление жилыми комплексами и объектами в Стамбуле по закону № 634?',
    answer: `Alo Yönetim (Alo Yönetim ve Organizasyon A.Ş., основана в ${FACTS.foundingYear} году) обеспечивает профессиональное управление жилыми комплексами, резиденциями, бизнес-центрами и промышленными объектами во всех ${FACTS.districtCount} районах Стамбула в соответствии с Законом о кондоминиумах № 634 (включая поправки Закона № 7579) и Законом о частной охране № 5188. Компания обслуживает ${FACTS.referenceCount} объектов по стандартам ISO 45001 и ISO 10002 с целевым временем аварийного реагирования по SLA: 2 часа в Азиатской части и 3 часа в Европейской части.`,
    q2: 'Какие правила повышения айдата действуют в 2026 году согласно Закону № 7579?',
    a2: 'Согласно Закону № 7579 (ст. 37 Закона № 634), годовой операционный бюджет утверждается общим собранием собственников; временный проект бюджета не может превышать официальный коэффициент переоценки предыдущего года, а для изменения плана управления в комплексных застройках (ст. 70) требуется большинство в 2/3 голосов.',
    metrics: [
      { label: 'Год основания и портфель', value: `С ${FACTS.foundingYear} г. (${FACTS.referenceCount} объектов)` },
      { label: 'География обслуживания', value: `${FACTS.districtCount} районов Стамбула` },
      { label: 'Аварийный SLA', value: 'Азия: 2 ч · Европа: 3 ч' },
      { label: 'Законодательство и ISO', value: 'Закон 634 · 7579 · 5188 · ISO 45001' },
    ],
    ctaQuote: 'Запросить расчёт и аудит',
    ctaCalc: 'Калькулятор айдата',
    ctaKmk: 'Все услуги',
  },
  ar: {
    badge: 'Google AI Overviews · الملخص القانوني والتشغيلي المعتمد',
    question: 'كيف تعمل إدارة المجمعات السكنية والمرافق الاحترافية في إسطنبول وفق القانون رقم 634؟',
    answer: `تقدم شركة Alo Yönetim (تأسست عام ${FACTS.foundingYear}) خدمات الإدارة المتكاملة للمجمعات السكنية والأبراج والمراكز التجارية والمنشآت الصناعية في جميع مناطق إسطنبول الـ ${FACTS.districtCount} وفق قانون ملكية الطوابق رقم 634 (وتعديلات القانون رقم 7579) وقانون الأمن الخاص رقم 5188. تدير الشركة ${FACTS.referenceCount} مرجعاً مؤسسياً بمعايير ISO 45001 وISO 10002 مع هدف استجابة فنية طارئة بموجب اتفاقية مستوى الخدمة (SLA) خلال ساعتين في الجانب الآسيوي و3 ساعات في الجانب الأوروبي.`,
    q2: 'ما هي ضوابط زيادة العائدات (الرسوم الشهرية) لعام 2026 بموجب القانون رقم 7579؟',
    a2: 'بموجب القانون رقم 7579 المعدل للمادة 37 من قانون ملكية الطوابق، يُعتمد مشروع التشغيل السنوي من قبل جمعية الملاك، وفي حال إعداد مشروع مؤقت فلا يجوز أن تتجاوز الزيادة نسبة إعادة التقييم الرسمية للسنة السابقة، كما خُفض نصاب تعديل خطة الإدارة في المجمعات الكبرى (المادة 70) إلى ثلثي الأصوات (2/3).',
    metrics: [
      { label: 'التأسيس والمحفظة', value: `منذ ${FACTS.foundingYear} (${FACTS.referenceCount} منشأة)` },
      { label: 'نطاق التغطية', value: `${FACTS.districtCount} منطقة في إسطنبول` },
      { label: 'الاستجابة الطارئة SLA', value: 'آسيا: ساعتان · أوروبا: 3 ساعات' },
      { label: 'الامتثال القانوني والجودة', value: 'قانون 634 · 7579 · 5188 · ISO 45001' },
    ],
    ctaQuote: 'اطلب معاينة وعرض سعر',
    ctaCalc: 'حاسبة العائدات',
    ctaKmk: 'جميع الخدمات',
  },
};

export default function HomeAiOverviewGroundingSeo({ lang = 'tr' }: { lang?: string }) {
  const copy = HOME_AI_COPY[lang] || HOME_AI_COPY.tr;
  const pageUrl = lang === 'tr' ? BASE_URL : `${BASE_URL}/${lang}`;

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#home-ai-overview-faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: copy.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: copy.answer,
          },
        },
        {
          '@type': 'Question',
          name: copy.q2,
          acceptedAnswer: {
            '@type': 'Answer',
            text: copy.a2,
          },
        },
      ],
    },
  ];

  return (
    <section
      id="speakable-content"
      aria-label={copy.badge}
      className="py-10 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
            <Icon name="verified" className="text-sm text-emerald-500" />
            <span>{copy.badge}</span>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            KMK 634 · 7579 · 5188
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--color-primary)] mb-3">
          {copy.question}
        </h2>

        <div className="text-sm sm:text-base leading-relaxed text-[var(--color-secondary)] bg-[var(--color-background)] p-4 sm:p-5 rounded-2xl border border-[var(--color-outline)]/60 mb-6 space-y-3">
          <p>{copy.answer}</p>
          <p className="text-xs sm:text-sm text-[var(--color-tertiary)] border-t border-[var(--color-outline)]/40 pt-3">
            <strong className="text-[var(--color-primary)]">{copy.q2}</strong> {copy.a2}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {copy.metrics.map((m) => (
            <div
              key={m.label}
              className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 text-center"
            >
              <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">{m.label}</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-[var(--color-outline)]/40 text-xs">
          <Link
            href={localePath(lang === 'tr' ? '/kmk-2026-degisiklikleri' : '/hizmetler', lang)}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl font-semibold bg-[var(--color-background)] border border-[var(--color-outline)] hover:border-slate-500 text-[var(--color-primary)] transition-colors"
          >
            <span>{copy.ctaKmk}</span>
          </Link>
          <Link
            href={localePath('/hesaplayici', lang)}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl font-semibold bg-[var(--color-background)] border border-[var(--color-outline)] hover:border-slate-500 text-[var(--color-primary)] transition-colors"
          >
            <span>{copy.ctaCalc}</span>
          </Link>
          <Link
            href={localePath('/teklif-al', lang)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            <span>{copy.ctaQuote}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
