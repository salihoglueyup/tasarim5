import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import Icon from '@/components/ui/branding/Icon';

export interface DistrictAiOverviewSeoProps {
  districtName: string;
  districtSlug: string;
  side: 'Anadolu' | 'Avrupa';
  slaTarget: string;
  neighborhoods: string[];
  localNeeds: string[];
  referenceCount?: number;
  serviceName?: string;
  serviceSlug?: string;
  extraFaqs?: { question: string; answer: string }[];
  emitFaqSchema?: boolean;
  className?: string;
}

export function buildDistrictAiOverviewQa({
  districtName,
  districtSlug,
  side,
  slaTarget,
  neighborhoods,
  localNeeds,
  serviceName,
  serviceSlug,
}: DistrictAiOverviewSeoProps) {
  const sampleNeighborhoods = neighborhoods.slice(0, 5).join(', ');
  const primaryNeed = localNeeds[0] || 'şeffaf aidat takibi ve 5188 lisanslı güvenlik yönetimi';
  const pagePath = serviceSlug
    ? `/bolgeler/${districtSlug}/${serviceSlug}`
    : `/bolgeler/${districtSlug}`;

  const question = serviceName
    ? `${districtName} Bölgesinde Profesyonel ${serviceName} Nasıl Yürütülür ve Yasal Standartları Nelerdir?`
    : `${districtName}'de Profesyonel Site ve Tesis Yönetim Şirketi Seçerken Hangi Yasal Kriterler Aranmalıdır?`;

  const answer = serviceName
    ? `${districtName} (${side} Yakası) genelinde ${sampleNeighborhoods} başta olmak üzere apartman, site ve ticari tesislerde sunulan ${serviceName.toLowerCase()} hizmeti; 634 sayılı Kat Mülkiyeti Kanunu (ve 7579 sayılı Kanun ile değişik m.35, 37, 70 hükümleri) ile 5188 sayılı Özel Güvenlik Kanunu çerçevesinde yürütülür. Alo Yönetim, ${districtName} bölgesindeki tesislerde yazılı SLA kapsamında ${slaTarget} acil teknik müdahale hedefi, kalem kalem şeffaf bütçe raporlaması ve BELCERT/ILAS onaylı ISO 45001 / ISO 10002 yönetim standartlarıyla hizmet verir.`
    : `${districtName} (${side} Yakası) bölgesinde profesyonel site ve tesis yönetimi seçilirken; 634 sayılı Kat Mülkiyeti Kanunu m.34/35 uyarınca resmi sözleşme, 7579 sayılı Kanun kapsamında kat malikleri kurulunda onaylanan işletme projesi (m.37 — geçici projede yeniden değerleme oranı sınırı) ve 5188 sayılı Kanun kapsamında Valilik izinli özel güvenlik şartları aranmalıdır. Alo Yönetim; ${sampleNeighborhoods} dahil ${neighborhoods.length} mahallede ${slaTarget} yazılı SLA acil teknik müdahale hedefi ve ${primaryNeed.toLowerCase()} odağıyla bütünleşik yönetim sunar.`;

  const secondaryQuestion = serviceName
    ? `${districtName} ${serviceName} sözleşmesinde acil müdahale süresi ve bütçe denetimi nasıl güvenceye alınır?`
    : `${districtName}'de 2026 KMK değişiklikleri (7579 sayılı Kanun) site yönetimlerini nasıl etkiler?`;

  const secondaryAnswer = serviceName
    ? `${districtName} bölgesindeki tesislerde yapılacak sözleşmede acil teknik müdahale hedefi (${side} Yakası için ${slaTarget}) yazılı SLA maddesi olarak tanımlanır. Tüm gelir-gider ve bakım kayıtları 7579 sayılı Kanun ile değişik KMK m.35/37 uyarınca kat maliklerinin denetimine açık tutulur.`
    : `7579 sayılı Kanun ile KMK m.37 uyarınca işletme projesi kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç 3 ay içinde geçici proje hazırlar ve mevcut proje varsa geçici projedeki artış bir önceki yılın yeniden değerleme oranını aşamaz. Toplu yapılarda (KMK m.70) yönetim planı değişiklik nisabı 4/5'ten 2/3'e indirilmiştir.`;

  return {
    pagePath,
    question,
    answer,
    secondaryQuestion,
    secondaryAnswer,
    law7579Answer: secondaryAnswer,
  };
}

/**
 * 39 İlçe (/bolgeler/[ilce]) ve 351 İlçe×Hizmet (/bolgeler/[ilce]/[hizmet]) sayfaları için
 * Google AI Overviews & Yerel Varlık (Local Entity) Grounding Kartı.
 */
export default function DistrictAiOverviewSeo(props: DistrictAiOverviewSeoProps) {
  const {
    districtName,
    districtSlug,
    side,
    slaTarget,
    neighborhoods,
    referenceCount = 0,
    serviceName,
    serviceSlug,
    extraFaqs = [],
    emitFaqSchema = true,
    className = '',
  } = props;
  const { pagePath, question, answer, secondaryQuestion, secondaryAnswer } =
    buildDistrictAiOverviewQa(props);

  const answerId = serviceSlug ? 'district-service-instant-answer-text' : 'district-ai-overview-answer';

  const mergedMainEntity = [
    {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    },
    {
      '@type': 'Question',
      name: secondaryQuestion,
      acceptedAnswer: {
        '@type': 'Answer',
        text: secondaryAnswer,
      },
    },
    ...extraFaqs
      .filter((f) => f.question && f.answer && f.question !== question && f.question !== secondaryQuestion)
      .map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
  ];

  const schemaData = [
    ...(emitFaqSchema
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${BASE_URL}${pagePath}#district-ai-overview-faq`,
            mainEntity: mergedMainEntity,
          },
        ]
      : []),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}${pagePath}#district-ai-overview-webpage`,
      name: `${districtName} ${serviceName || 'Site ve Tesis Yönetimi'} — Google AI Overviews Özeti`,
      url: `${BASE_URL}${pagePath}`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: [`#${answerId}`],
      },
    },
  ];

  return (
    <section
      id="district-ai-overview"
      aria-label={`${districtName} Google AI Overviews ve Mevzuat Özeti`}
      className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
          <Icon name="verified" className="text-sm text-emerald-500" />
          <span>Google AI Overviews · {districtName} Yerel Mevzuat & Operasyon Özeti</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            SLA: {slaTarget}
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300/40">
            634 KMK & 7579 S.K.
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--color-primary)] mb-3 flex items-start gap-2.5">
        <Icon name="help_center" className="text-[var(--color-primary)] text-2xl mt-0.5 shrink-0" />
        <span>{question}</span>
      </h2>

      <div
        id={answerId}
        className="text-sm sm:text-base leading-relaxed text-[var(--color-secondary)] bg-[var(--color-background)] p-4 sm:p-5 rounded-2xl border border-[var(--color-outline)]/60 mb-6"
      >
        <p>{answer}</p>
        <p className="mt-3 text-xs sm:text-sm text-[var(--color-tertiary)] border-t border-[var(--color-outline)]/40 pt-3">
          <strong className="text-[var(--color-primary)]">2026 Mevzuat Notu (7579 sayılı Kanun):</strong> {secondaryAnswer}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">Hizmet Bölgesi</div>
          <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">{districtName} ({side})</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">Acil Teknik Müdahale</div>
          <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">{slaTarget} (Yazılı SLA)</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">Mahalle Kapsamı</div>
          <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">
            {neighborhoods.length} Mahalle{referenceCount > 0 ? ` · ${referenceCount} Referans` : ''}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">Kanuni Dayanak</div>
          <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">KMK 634 · 7579 · 5188</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-outline)]/50 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-[var(--color-tertiary)]">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="gavel" className="text-sm text-emerald-500" />
            <span>Resmî Dayanak: 634 Sayılı KMK m.20, 34, 35, 37, 70 & 5188 S.K.</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/kmk-2026-degisiklikleri"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-[var(--color-background)] border border-[var(--color-outline)] hover:border-slate-500 text-[var(--color-primary)] transition-colors"
          >
            <span>2026 KMK Rehberi</span>
          </Link>
          <Link
            href="/hesaplayici"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-[var(--color-background)] border border-[var(--color-outline)] hover:border-slate-500 text-[var(--color-primary)] transition-colors"
          >
            <span>Aidat Hesaplayıcı</span>
          </Link>
          <Link
            href="/teklif-al"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            <span>{districtName} Keşif İste</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
