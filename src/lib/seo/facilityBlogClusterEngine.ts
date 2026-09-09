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

  // 2. İlgili Resmi Mevzuat ve Kalite Standartları Kaynakları (E-E-A-T Akredite Eşleme)
  const relevantLegislation: ExternalCitation[] = [];

  const getCitation = (id: string) => OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === id);

  const kmk = getCitation('kmk-634');
  const guvenlik = getCitation('guvenlik-5188');
  const isg = getCitation('isg-6331');
  const yangin = getCitation('yangin-yonetmeligi');
  const asansor = getCitation('asansor-yonetmeligi');
  const iso41001 = getCitation('iso-41001');
  const iso9001 = getCitation('iso-9001');
  const iso27001 = getCitation('iso-27001');
  const iso14001 = getCitation('iso-14001');
  const iso45001 = getCitation('iso-45001');
  const iso10002 = getCitation('iso-10002');
  const tseHyb = getCitation('tse-hyb-12850') || getCitation('tse-13247');
  const yargitay = getCitation('yargitay-emsal');

  // Akıllı Semantik Mevzuat & Akreditasyon Tetikleyicileri
  // Not: "bilgi güvenliği" ve "iş güvenliği" terimleri "güvenlik" kökünü içerdiği için öncelikli kontrol edilir.
  if (text.includes('bilgi güvenliği') || text.includes('iso 27001') || text.includes('kvkk') || text.includes('veri koruma') || text.includes('siber')) {
    if (iso27001) relevantLegislation.push(iso27001);
    if (kmk) relevantLegislation.push(kmk);
  } else if (text.includes('iş sağlığı') || text.includes('isg') || text.includes('6331') || text.includes('iso 45001') || text.includes('risk analizi') || text.includes('iş güvenliği')) {
    if (iso45001) relevantLegislation.push(iso45001);
    if (isg) relevantLegislation.push(isg);
  } else if (text.includes('çevre') || text.includes('iso 14001') || text.includes('atık') || text.includes('sıfır atık') || text.includes('sürdürülebilirlik') || text.includes('yeşil tesis') || text.includes('yeşil bina')) {
    if (iso14001) relevantLegislation.push(iso14001);
    if (iso41001) relevantLegislation.push(iso41001);
  } else if (text.includes('müşteri memnuniyeti') || text.includes('iso 10002') || text.includes('şikayet') || text.includes('sakin memnuniyeti') || text.includes('sakin iletişimi')) {
    if (iso10002) relevantLegislation.push(iso10002);
    if (iso9001) relevantLegislation.push(iso9001);
  } else if (text.includes('güvenlik') || text.includes('5188') || text.includes('kamera') || text.includes('cctv') || text.includes('devriye')) {
    if (guvenlik) relevantLegislation.push(guvenlik);
    if (kmk) relevantLegislation.push(kmk);
  } else if (text.includes('asansör') || text.includes('yeşil etiket') || text.includes('periyodik bakım')) {
    if (asansor) relevantLegislation.push(asansor);
    if (kmk) relevantLegislation.push(kmk);
  } else if (text.includes('yangın') || text.includes('sprinkler') || text.includes('alarm') || text.includes('sığınak')) {
    if (yangin) relevantLegislation.push(yangin);
    if (kmk) relevantLegislation.push(kmk);
  } else if (text.includes('iso 9001') || text.includes('kalite yönetim') || text.includes('operasyonel mükemmeliyet')) {
    if (iso9001) relevantLegislation.push(iso9001);
    if (iso41001) relevantLegislation.push(iso41001);
  } else if (text.includes('tse') || text.includes('hyb') || text.includes('hizmet yeterlilik') || text.includes('ts 13247') || text.includes('ts 12850')) {
    if (tseHyb) relevantLegislation.push(tseHyb);
    if (iso41001) relevantLegislation.push(iso41001);
  } else if (text.includes('yargıtay') || text.includes('içtihat') || text.includes('emsal') || text.includes('dava') || text.includes('mahkeme') || text.includes('itiraz')) {
    if (yargitay) relevantLegislation.push(yargitay);
    if (kmk) relevantLegislation.push(kmk);
  } else if (text.includes('kmk') || text.includes('kat mülkiyeti') || text.includes('aidat') || text.includes('işletme projesi') || text.includes('genel kurul') || text.includes('yönetim planı')) {
    if (kmk) relevantLegislation.push(kmk);
    if (iso41001) relevantLegislation.push(iso41001);
  } else {
    if (kmk) relevantLegislation.push(kmk);
    if (iso41001) relevantLegislation.push(iso41001);
  }

  // 3. Grup Şirketi Sinerjisi (Güvenlik / Eğitim odaklı yazılarda)
  let groupCompanySynergy: GroupCompanyEntity | undefined = undefined;
  if ((text.includes('güvenlik') || text.includes('5188') || text.includes('eğitim') || text.includes('kurs') || text.includes('personel')) && !text.includes('bilgi güvenliği')) {
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

  // Topikal Etiketleri Dinamik Zenginleştirme
  const dynamicTopicalTags = [matchedSubSector.name, 'Tesis ve Mülk Hizmetleri', '634 KMK', 'ISO 41001'];
  if (relevantLegislation.some((l) => l.id === 'iso-27001')) dynamicTopicalTags.push('ISO 27001 Bilgi Güvenliği');
  if (relevantLegislation.some((l) => l.id === 'iso-14001')) dynamicTopicalTags.push('ISO 14001 Çevre');
  if (relevantLegislation.some((l) => l.id === 'iso-45001' || l.id === 'isg-6331')) dynamicTopicalTags.push('ISO 45001 İSG');
  if (relevantLegislation.some((l) => l.id === 'iso-10002')) dynamicTopicalTags.push('ISO 10002 Memnuniyet');
  if (relevantLegislation.some((l) => l.id === 'iso-9001')) dynamicTopicalTags.push('ISO 9001 Kalite');
  if (relevantLegislation.some((l) => l.id.startsWith('tse'))) dynamicTopicalTags.push('TSE HYB 12850');

  // Tekilleştirilmiş mevzuat listesi (maksimum 3 adet)
  const uniqueLegislation = Array.from(new Map(relevantLegislation.map((l) => [l.id, l])).values()).slice(0, 3);

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
    relevantLegislation: uniqueLegislation,
    relevantPrecedents: relevantPrecedents.length > 0 ? relevantPrecedents : YARGITAY_LEGAL_PRECEDENTS.slice(0, 1),
    groupCompanySynergy,
    topicalTags: dynamicTopicalTags,
  };
}
