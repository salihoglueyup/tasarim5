import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { localePath } from '@/lib/i18n/localePath';
import { KMK_AMENDMENT_2026 } from '@/lib/legal/kmkAmendment2026';
import { FACTS } from '@/lib/facts';
import Icon from '@/components/ui/branding/Icon';

interface BlogHubCopy {
  badge: string;
  question: string;
  answer: string;
  secondaryQuestion: string;
  secondaryAnswer: string;
  pillars: { title: string; desc: string; href: string }[];
}

function getBlogHubCopy(lang: string, postCount: number): BlogHubCopy {
  switch (lang) {
    case 'en':
      return {
        badge: 'Google AI Overviews • Facility & Condominium Law Knowledge Hub',
        question: 'What Legal & Operational Topics Are Covered in the Alo Yönetim Knowledge Center?',
        answer: `The Alo Yönetim Blog & Knowledge Center publishes ${postCount}+ verified guides on Turkish Condominium Law No. 634 (KMK), Law No. ${KMK_AMENDMENT_2026.lawNumber} (May 22, 2026 amendments to KMK Art. 35, 37, and 70), Private Security Law No. 5188, ISO 45001 & ISO 10002 management standards, periodic elevator/fire inspections, and district-by-district residential governance across all ${FACTS.districtCount} districts of Istanbul.`,
        secondaryQuestion: 'How did Law No. 7579 (2026) change apartment and complex management in Turkey?',
        secondaryAnswer: `Under Law No. ${KMK_AMENDMENT_2026.lawNumber}, operating budgets (KMK Art. 37) are approved by the General Assembly; interim budgets are capped at ${KMK_AMENDMENT_2026.interimProjectMaxMonths} months and cannot exceed the prior year's revaluation rate (%${KMK_AMENDMENT_2026.defaultRevaluationRatePercent}), while multi-building management plan amendments (KMK Art. 70) require a 2/3 majority.`,
        pillars: [
          { title: '2026 KMK & Law No. 7579', desc: 'Revaluation cap, 3-month interim budget & 2/3 quorum', href: '/kmk-2026-degisiklikleri' },
          { title: 'KMK Art. 20 Fee Calculator', desc: 'Equal vs. land-share expense & 5% late penalty simulator', href: '/hesaplayici' },
          { title: 'Legal & Debt Enforcement', desc: 'Condominium law & unpaid fee execution process', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
          { title: '39 Istanbul District Guides', desc: 'Neighborhood-level SLA & local management guides', href: '/bolgeler' },
        ],
      };
    case 'ru':
      return {
        badge: 'Google AI Overviews • База знаний по управлению объектами и KMK',
        question: 'Какие правовые и технические темы рассматриваются в Базе знаний Alo Yönetim?',
        answer: `База знаний и блог Alo Yönetim включает ${postCount}+ проверенных руководств по Закону о кондоминиумах № 634 (KMK), Закону № ${KMK_AMENDMENT_2026.lawNumber} от 22 мая 2026 г. (поправки к ст. 35, 37 и 70 KMK), Закону о частной охране № 5188, стандартам ISO 45001 и ISO 10002, обслуживанию лифтов и районным руководствам по всем ${FACTS.districtCount} районам Стамбула.`,
        secondaryQuestion: 'Как Закон № 7579 (2026 г.) изменил правила расчета айдата и управления комплексами?',
        secondaryAnswer: `Согласно Закону № ${KMK_AMENDMENT_2026.lawNumber}, проект эксплуатации (ст. 37 KMK) утверждается общим собранием; временный проект (до ${KMK_AMENDMENT_2026.interimProjectMaxMonths} мес.) ограничен ставкой переоценки (%${KMK_AMENDMENT_2026.defaultRevaluationRatePercent}), а порог изменения плана управления комплексом (ст. 70 KMK) снижен с 4/5 до 2/3.`,
        pillars: [
          { title: 'Поправки KMK 2026 (№ 7579)', desc: 'Лимит переоценки, временный бюджет на 3 мес. и кворум 2/3', href: '/kmk-2026-degisiklikleri' },
          { title: 'Калькулятор айдата (ст. 20)', desc: 'Равная доля, доля земли и пеня 5% в месяц', href: '/hesaplayici' },
          { title: 'Юридическое сопровождение', desc: 'Взыскание задолженности и право KMK 634', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
          { title: '39 районов Стамбула', desc: 'Районные руководства и нормативы SLA', href: '/bolgeler' },
        ],
      };
    case 'ar':
      return {
        badge: 'Google AI Overviews • مركز المعرفة لإدارة المرافق وقانون KMK',
        question: 'ما هي الموضوعات القانونية والتشغيلية في مدونة ومركز معرفة Alo Yönetim؟',
        answer: `يضم مركز المعرفة في Alo Yönetim أكثر من ${postCount} دليلاً موثقاً حول قانون الملكية الطابقية رقم 634 (KMK)، وتعديلات القانون رقم ${KMK_AMENDMENT_2026.lawNumber} الصادر في 22 مايو 2026 (المواد 35 و37 و70)، وقانون الحراسة الخاصة رقم 5188، ومعايير ISO 45001 وISO 10002، وأدلة إدارة المجمعات في جميع مناطق إسطنبول الـ ${FACTS.districtCount}.`,
        secondaryQuestion: 'كيف غيّر القانون رقم 7579 (2026) قواعد زيادة العائدات وتعديل خطة الإدارة؟',
        secondaryAnswer: `بموجب القانون رقم ${KMK_AMENDMENT_2026.lawNumber}، يُعتمد مشروع التشغيل (م 37) في الجمعية العمومية؛ ولا يتجاوز المشروع المؤقت (${KMK_AMENDMENT_2026.interimProjectMaxMonths} أشهر) معدل إعادة التقييم (%${KMK_AMENDMENT_2026.defaultRevaluationRatePercent})، كما خُفِّض نصاب تعديل خطة الإدارة في المجمعات (م 70) إلى الثلثين (2/3).`,
        pillars: [
          { title: 'تعديلات قانون KMK لعام 2026', desc: 'سقف إعادة التقييم والمشروع المؤقت ونصاب 2/3', href: '/kmk-2026-degisiklikleri' },
          { title: 'حاسبة العائدات (المادة 20)', desc: 'التقاسم المتساوي وحصة الأرض وغرامة التأخير 5%', href: '/hesaplayici' },
          { title: 'الاستشارات القانونية والتنفيذ', desc: 'تحصيل العائدات المتأخرة وفق قانون KMK 634', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
          { title: 'أدلة 39 منطقة في إسطنبول', desc: 'معايير الاستجابة SLA وإدارة المجمعات محلياً', href: '/bolgeler' },
        ],
      };
    default:
      return {
        badge: 'Google AI Overviews • KMK Mevzuatı & Tesis Yönetimi Bilgi Merkezi',
        question: 'Alo Yönetim Blog ve Bilgi Merkezinde Hangi Hukuki ve Teknik Rehberler Yer Alır?',
        answer: `Alo Yönetim Bilgi Merkezi; 634 sayılı Kat Mülkiyeti Kanunu (KMK), 22 Mayıs 2026 tarihli ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun değişiklikleri (KMK m.35 avans, m.37 geçici işletme projesi yeniden değerleme sınırı, m.70 toplu yapılarda 2/3 yönetim planı nisabı), 5188 sayılı Özel Güvenlik Kanunu, ISO 45001 ve ISO 10002 yönetim standartları, asansör/yangın periyodik denetimleri ve İstanbul'un ${FACTS.districtCount} ilçesine özel yerel site yönetimi rehberleri dahil ${postCount}+ doğrulanmış makale içerir.`,
        secondaryQuestion: '7579 sayılı Kanun (2026 KMK değişikliği) sonrasında site bütçesi ve aidat artışlarında temel kural nedir?',
        secondaryAnswer: `${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun ile değişik KMK m.37 uyarınca işletme projesi kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç ${KMK_AMENDMENT_2026.interimProjectMaxMonths} ay içinde kurula sunulacak geçici proje hazırlar ve mevcut projesi olan sitelerde geçici projedeki artış yeniden değerleme oranını (%${String(KMK_AMENDMENT_2026.defaultRevaluationRatePercent).replace('.', ',')}) aşamaz.`,
        pillars: [
          { title: '2026 KMK (7579 S.K.) Rehberi', desc: 'Yeniden değerleme tavanı, 3 ay geçici proje ve 2/3 nisap', href: '/kmk-2026-degisiklikleri' },
          { title: 'KMK m.20 Aidat Hesaplayıcı', desc: 'Eşit vs. arsa payı gider paylaşımı ve aylık %5 gecikme hesabı', href: '/hesaplayici' },
          { title: 'KMK Hukuk & İcra Danışmanlığı', desc: 'Örnek No: 7 ilamsız takip ve genel kurul iptal süreçleri', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
          { title: '39 İlçe Yerel Yönetim Rehberi', desc: 'İstanbul Anadolu ve Avrupa Yakası SLA & mahalle analizleri', href: '/bolgeler' },
        ],
      };
  }
}

export default function BlogHubAiOverviewSeo({
  lang = 'tr',
  postCount = 57,
  className = '',
}: {
  lang?: string;
  postCount?: number;
  className?: string;
}) {
  const copy = getBlogHubCopy(lang, postCount);
  const pageUrl = `${BASE_URL}${localePath('/blog', lang)}`;

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#blog-hub-ai-overview-faq`,
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
          name: copy.secondaryQuestion,
          acceptedAnswer: {
            '@type': 'Answer',
            text: copy.secondaryAnswer,
          },
        },
      ],
    },
  ];

  return (
    <section
      id="blog-hub-ai-overview"
      aria-label={copy.badge}
      className={`max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pt-10 pb-2 ${className}`}
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
            634 KMK · 7579 S.K. · 5188 S.K.
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--color-primary)] mb-3">
          {copy.question}
        </h2>

        <div
          id="blog-hub-ai-overview-answer"
          className="text-sm sm:text-base leading-relaxed text-[var(--color-secondary)] bg-[var(--color-background)] p-4 sm:p-5 rounded-2xl border border-[var(--color-outline)]/60 mb-6 space-y-2.5"
        >
          <p>{copy.answer}</p>
          <p className="text-xs sm:text-sm text-[var(--color-tertiary)] border-t border-[var(--color-outline)]/40 pt-2.5">
            <strong className="text-[var(--color-primary)]">{copy.secondaryQuestion}</strong>{' '}
            {copy.secondaryAnswer}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {copy.pillars.map((p) => (
            <Link
              key={p.href}
              href={localePath(p.href, lang)}
              className="group p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 hover:border-slate-500 transition-colors flex flex-col justify-between gap-1.5"
            >
              <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)] flex items-center justify-between gap-2">
                <span>{p.title}</span>
                <Icon name="arrow_forward" className="text-sm opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
