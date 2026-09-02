import { FACILITY_SUB_SECTORS } from './facilitySiloRankPasser';
import { OFFICIAL_LEGAL_CITATIONS, ExternalCitation } from './facilityExternalCitations';
import { GROUP_COMPANIES_ECOSYSTEM, GroupCompanyEntity } from './facilityGroupAndLegalEcosystem';
import { YARGITAY_LEGAL_PRECEDENTS, LegalPrecedentItem } from '@/data/legalPrecedentsData';

export interface BlogClusterRecommendation {
  recommendedSubSector: {
    slug: string;
    name: string;
    url: string;
    ctaText: string;
    anchorText: string;
    shortDesc: string;
    icon: string;
  };
  relevantLegislation: ExternalCitation[];
  relevantPrecedents?: LegalPrecedentItem[];
  groupCompanySynergy?: GroupCompanyEntity;
  topicalTags: string[];
}

/**
 * Blog Makalesi Topikal Kümeleme ve Akıllı İç/Dış Link Öneri Motoru.
 * 
 * Verilen blog yazısının başlığını, içeriğini, etiketlerini ve kategorisini analiz ederek
 * en uygun Tesis Yönetimi alt sektörünü, ilgili resmi mevzuat dış linklerini ve grup şirketi
 * güven sinyallerini tespit eder.
 */
export function resolveBlogArticleCluster(
  title: string,
  content: string,
  tags: string[] = [],
  categoryName?: string,
  lang = 'tr'
): BlogClusterRecommendation {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const text = `${title} ${content} ${tags.join(' ')} ${categoryName || ''}`.toLowerCase();

  // 1. Alt Sektör Eşleştirmesi
  let matchedSubSector = FACILITY_SUB_SECTORS[0]; // Rezidans default

  if (text.includes('rezidans') || text.includes('concierge') || text.includes('lüks') || text.includes('spa')) {
    matchedSubSector = FACILITY_SUB_SECTORS.find((s) => s.slug === 'rezidans-site-yonetimi') || matchedSubSector;
  } else if (text.includes('plaza') || text.includes('ofis') || text.includes('iş merkezi') || text.includes('hvac') || text.includes('ticari')) {
    matchedSubSector = FACILITY_SUB_SECTORS.find((s) => s.slug === 'plaza-yonetimi') || matchedSubSector;
  } else if (text.includes('sanayi') || text.includes('fabrika') || text.includes('lojistik') || text.includes('endüstriyel') || text.includes('isg')) {
    matchedSubSector = FACILITY_SUB_SECTORS.find((s) => s.slug === 'sanayi-tesisi-yonetimi') || matchedSubSector;
  } else if (text.includes('seçim') || text.includes('sözleşme') || text.includes('nasıl seçilir') || text.includes('rehber') || text.includes('şartname') || text.includes('ihale')) {
    matchedSubSector = FACILITY_SUB_SECTORS.find((s) => s.slug === 'rehber') || matchedSubSector;
  } else if (text.includes('toplu konut') || text.includes('toki') || text.includes('blok') || text.includes('büyük site') || text.includes('aidat')) {
    matchedSubSector = FACILITY_SUB_SECTORS.find((s) => s.slug === 'toplu-konut-yonetimi') || matchedSubSector;
  }

  // 2. İlgili Resmi Mevzuat Kaynakları
  const relevantLegislation: ExternalCitation[] = [];

  const kmk = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === 'kmk-634');
  const guvenlik = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === 'guvenlik-5188');
  const yangin = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === 'yangin-yonetmeligi');
  const asansor = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === 'asansor-yonetmeligi');
  const iso = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === 'iso-41001');

  if (text.includes('güvenlik') || text.includes('5188') || text.includes('kamera') || text.includes('cctv') || text.includes('devriye')) {
    if (guvenlik) relevantLegislation.push(guvenlik);
    if (kmk) relevantLegislation.push(kmk);
  } else if (text.includes('asansör') || text.includes('yeşil etiket') || text.includes('periyodik bakım')) {
    if (asansor) relevantLegislation.push(asansor);
    if (kmk) relevantLegislation.push(kmk);
  } else if (text.includes('yangın') || text.includes('sprinkler') || text.includes('alarm') || text.includes('sığınak')) {
    if (yangin) relevantLegislation.push(yangin);
    if (kmk) relevantLegislation.push(kmk);
  } else {
    if (kmk) relevantLegislation.push(kmk);
    if (iso) relevantLegislation.push(iso);
  }

  // 3. Grup Şirketi Sinerjisi (Güvenlik / Eğitim odaklı yazılarda)
  let groupCompanySynergy: GroupCompanyEntity | undefined = undefined;
  if (text.includes('güvenlik') || text.includes('5188') || text.includes('eğitim') || text.includes('kurs') || text.includes('personel')) {
    groupCompanySynergy =
      text.includes('kurs') || text.includes('eğitim') || text.includes('sertifika')
        ? GROUP_COMPANIES_ECOSYSTEM.find((c) => c.id === 'alo-guvenlik')
        : GROUP_COMPANIES_ECOSYSTEM.find((c) => c.id === '3g-guvenlik');
  }

  // 4. Faz 138: Yargıtay İçtihat ve KMK 634 Emsal Kararları
  const relevantPrecedents = YARGITAY_LEGAL_PRECEDENTS.filter((p) => {
    const pSub = p.subject.toLowerCase();
    const pRuling = p.rulingSummary.toLowerCase();
    return (
      (text.includes('asansör') && (pSub.includes('asansör') || pRuling.includes('asansör'))) ||
      (text.includes('aidat') && (pSub.includes('aidat') || pRuling.includes('aidat'))) ||
      (text.includes('balkon') && (pSub.includes('balkon') || pRuling.includes('balkon')))
    );
  }).slice(0, 2);

  return {
    recommendedSubSector: {
      slug: matchedSubSector.slug,
      name: matchedSubSector.name,
      url: `${langPrefix}/hizmetler/tesis-yonetimi/${matchedSubSector.slug}`,
      ctaText: `${matchedSubSector.name} Çözümümüzü İnceleyin`,
      anchorText: `${matchedSubSector.name} Hizmetleri`,
      shortDesc: matchedSubSector.shortDesc,
      icon: matchedSubSector.icon,
    },
    relevantLegislation: relevantLegislation.slice(0, 2),
    relevantPrecedents: relevantPrecedents.length > 0 ? relevantPrecedents : YARGITAY_LEGAL_PRECEDENTS.slice(0, 1),
    groupCompanySynergy,
    topicalTags: [matchedSubSector.name, 'Tesis ve Mülk Hizmetleri', '634 KMK', 'ISO 41001'],
  };
}
