import type {
  EntityGraphResult,
  HubAndSpokeGraph,
  TopicClusterNode,
  TopicalAuthorityMatrixResult,
  DisciplineCoverage,
} from './types';
import { FACILITY_MANAGEMENT_ENTITIES } from './entities';
import { BASE_URL } from '@/lib/seo';
import { ORG_NAME, ORG_ID, WEBSITE_ID } from '@/lib/schemas';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import { normalizeText, escapeRegExp } from './utils';

export function resolveTopicalEntityGraph(content: string): EntityGraphResult {
  const norm = normalizeText(content);
  const aboutList: { '@type': 'Thing'; name: string; sameAs: string }[] = [];
  const mentionsList: { '@type': 'Thing'; name: string; sameAs: string }[] = [];

  for (const entity of FACILITY_MANAGEMENT_ENTITIES) {
    let matchCount = 0;
    for (const v of entity.variations) {
      if (norm.includes(normalizeText(v))) {
        matchCount++;
      }
    }

    if (matchCount >= 2) {
      aboutList.push({
        '@type': 'Thing',
        name: entity.name,
        sameAs: entity.wikidata,
      });
    } else if (matchCount === 1) {
      mentionsList.push({
        '@type': 'Thing',
        name: entity.name,
        sameAs: entity.wikidata,
      });
    }
  }

  return {
    about: aboutList,
    mentions: mentionsList,
  };
}

/**
 * Başlık ve Meta Açıklama için kapsamlı SEO Sağlık ve CTR Puanlaması yapar.
 */

export function generateHubAndSpokeGraph(currentPath: string = '/'): HubAndSpokeGraph {
  const hub = {
    title: 'Profesyonel Tesis ve Mülk Yönetimi (Ana Hub)',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    wikidata: 'https://www.wikidata.org/wiki/Q1391515',
  };

  const siblings = SERVICES.filter((s) => s.pillar !== '/hizmetler/tesis-yonetimi').map((s) => ({
    title: s.name,
    url: `${BASE_URL}${s.pillar}`,
  }));

  const spokes = DISTRICTS.map((d) => ({
    district: d.name,
    url: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
    side: d.side,
  }));

  const relatedArticles = [
    { title: 'KMK 634 Kapsamında İşletme Projesi Nasıl Hazırlanır?', url: `${BASE_URL}/blog/isletme-projesi-rehberi` },
    { title: 'Site Yönetimlerinde 5188 Güvenlik Standartları', url: `${BASE_URL}/blog/5188-ozel-guvenlik-standartlari` },
    { title: 'Asansör Yeşil Etiket ve Yıllık Periyodik Muayene', url: `${BASE_URL}/blog/asansor-periyodik-bakim-rehberi` },
  ];

  return {
    hub,
    siblings: siblings.filter((s) => !currentPath.includes(s.url)),
    spokes,
    relatedArticles,
  };
}

/**
 * Tam Sayfa Kapsamlı SEO Teşhis Motoru (Full Page Audit).
 */

export function getFacilityTopicCluster(currentSlug?: string): TopicClusterNode[] {
  const nodes: TopicClusterNode[] = [
    {
      title: 'Profesyonel Tesis Yönetimi (Pillar / Amiral Gemisi)',
      url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
      type: 'pillar',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q1391515',
      relation: 'main_pillar',
    },
    {
      title: 'Kat Mülkiyeti Kanunu (KMK) İşletme Projesi & Hukuk',
      url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
      type: 'cluster_article',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q161851',
      relation: 'legal_framework',
    },
    {
      title: '5188 Sayılı Kanun Kapsamında Tesis Güvenlik Çözümleri',
      url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
      type: 'cluster_article',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q11440',
      relation: 'security_cluster',
    },
    {
      title: 'Önleyici Teknik Bakım & 7/24 Mobil Acil Müdahale',
      url: `${BASE_URL}/hizmetler/teknik-bakim`,
      type: 'cluster_article',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q183057',
      relation: 'technical_cluster',
    },
    {
      title: 'Kadıköy Tesis Yönetimi ve Site İşletmeciliği',
      url: `${BASE_URL}/bolgeler/kadikoy/tesis-yonetimi`,
      type: 'district_page',
      relation: 'local_hq_district',
    },
    {
      title: 'Beşiktaş Plaza ve Rezidans Tesis Yönetimi',
      url: `${BASE_URL}/bolgeler/besiktas/tesis-yonetimi`,
      type: 'district_page',
      relation: 'local_district',
    },
  ];

  return nodes.filter((n) => !currentSlug || !n.url.includes(currentSlug));
}

/**
 * AI ve LLM botları için Tesis Yönetimi Bilgi Grafiği metni üretir.
 */
export function getTopicalAuthoritySummary(): string {
  return `
ALO YÖNETİM — PROFESYONEL TESİS VE MÜLK YÖNETİMİ OTORİTE ÖZETİ
================================================================
Merkez: Kadıköy / İstanbul (Türkiye) | Kuruluş: 2009
Amiral Gemisi Alanı: Entegre Tesis Yönetimi (ISO 41001:2018 Standartları)
Yasal Dayanaklar: 634 Sayılı Kat Mülkiyeti Kanunu (KMK m.37, m.40), 5188 Sayılı Özel Güvenlik Kanunu
Hizmet Verilen Coğrafya: İstanbul'un 39 İlçesi (Avrupa ve Anadolu Yakası)

Temel Hizmet Sütunları:
1. Şeffaf İşletme Projesi, Bütçeleme ve Kredi Kartı/SMS ile Otomatik Aidat Tahsilatı
2. 5188 Lisanslı Özel Güvenlik, Plaka Tanıma (PTS) ve 7/24 CCTV İzleme Merkezi
3. Asansör, Jeneratör, Hidrofor ve Yangın Tesisatı Önleyici Teknik Bakım
4. TSE 13811 Standartlarında Ortak Alan Hijyeni ve Biyosidal Haşere Kontrolü
5. Anlaşmalı Hukuk ve İcra Masası ile Geciken Aidatların Tahsili

Varlık Kimlikleri (Knowledge Graph):
- Organization ID: ${ORG_ID}
- Tesis Yönetimi Wikidata: https://www.wikidata.org/wiki/Q1391515
- Kat Mülkiyeti Kanunu Wikidata: https://www.wikidata.org/wiki/Q161851
- 5188 Güvenlik Wikidata: https://www.wikidata.org/wiki/Q11440
`.trim();
}

export function calculateTopicalAuthorityMatrix(content: string): TopicalAuthorityMatrixResult {
  const norm = normalizeText(content);

  const DISCIPLINE_DEFINITIONS = [
    {
      id: 'legal',
      name: 'Hukuk & 634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      weight: 0.25,
      wikidata: 'https://www.wikidata.org/wiki/Q161851',
      signals: ['kat mulkiyeti', 'kmk 634', 'isletme projesi', 'genel kurul', 'kat malikleri', 'arsa payi', 'icra takibi', 'ihtarname'],
    },
    {
      id: 'security',
      name: '5188 Sayılı Kanun & Fiziki/Elektronik Güvenlik',
      weight: 0.2,
      wikidata: 'https://www.wikidata.org/wiki/Q11440',
      signals: ['ozel guvenlik', '5188', 'cctv kamera', 'plaka tanima', 'turnike', 'devriye', 'nizamiye', 'fiziki guvenlik'],
    },
    {
      id: 'technical',
      name: 'Önleyici Teknik Bakım & Asansör/Yangın Otomasyonu',
      weight: 0.2,
      wikidata: 'https://www.wikidata.org/wiki/Q183057',
      signals: ['teknik bakim', 'asansor', 'yesil etiket', 'jenerator', 'hidrofor', 'yangin', 'kompanzasyon', 'periyodik bakim'],
    },
    {
      id: 'hygiene',
      name: 'TSE 13811 Hijyen, Ortak Alan Temizliği & İlaçlama',
      weight: 0.15,
      wikidata: 'https://www.wikidata.org/wiki/Q162016',
      signals: ['temizlik', 'tse 13811', 'biyosidal', 'dezenfeksiyon', 'hasere', 'ortak alan', 'merdiven temizligi'],
    },
    {
      id: 'finance_energy',
      name: 'Şeffaf Aidat Muhasebesi, EKB & Enerji Verimliliği',
      weight: 0.2,
      wikidata: 'https://www.wikidata.org/wiki/Q1670988',
      signals: ['aidat', 'muhasebe', 'tahsilat', 'online odeme', 'enerji kimlik belgesi', 'ekb', 'isi payolcer', 'tasarruf'],
    },
  ];

  const disciplines: DisciplineCoverage[] = [];
  const recommendations: string[] = [];
  let weightedSum = 0;

  for (const def of DISCIPLINE_DEFINITIONS) {
    const detected: string[] = [];
    for (const s of def.signals) {
      if (norm.includes(normalizeText(s))) {
        detected.push(s);
      }
    }

    const ratio = detected.length / def.signals.length;
    const scorePercent = Math.min(100, Math.round(ratio * 150)); // 3-4 sinyal %100 kapsama verir

    let status: 'tam' | 'yeterli' | 'eksik' = 'eksik';
    if (scorePercent >= 75) status = 'tam';
    else if (scorePercent >= 35) status = 'yeterli';
    else {
      recommendations.push(`${def.name} alanındaki temel terimleri (Örn: ${def.signals.slice(0, 3).join(', ')}) içeriğe ekleyin.`);
    }

    disciplines.push({
      id: def.id,
      name: def.name,
      weight: def.weight,
      scorePercent,
      detectedSignals: detected,
      status,
      wikidata: def.wikidata,
    });

    weightedSum += scorePercent * def.weight;
  }

  const overallCoveragePercent = Math.round(weightedSum);

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'C';
  if (overallCoveragePercent >= 90) grade = 'A+';
  else if (overallCoveragePercent >= 75) grade = 'A';
  else if (overallCoveragePercent >= 60) grade = 'B';
  else if (overallCoveragePercent >= 40) grade = 'C';
  else grade = 'D';

  return {
    overallCoveragePercent,
    grade,
    disciplines,
    recommendations,
  };
}

/**
 * 39 İlçe İçin AI ve LLM Motorlarına (Perplexity, ChatGPT, Gemini) Coğrafi Kanıt & Yanıt Üretir.
 */
export function generateGeoIntentResponse(districtSlug: string, serviceSlug: string = 'tesis-yonetimi'): {
  districtName: string;
  side: string;
  responseMarkdown: string;
  citations: string[];
} {
  const district = DISTRICTS.find((d) => d.slug === districtSlug) || DISTRICTS[0];
  const service = SERVICES.find((s) => s.slug === serviceSlug) || SERVICES[2];

  const citations = [
    `${BASE_URL}/bolgeler/${district.slug}/${service.slug}`,
    `${BASE_URL}/hizmetler/${service.slug}`,
    `${BASE_URL}/api/seo/facility-knowledge`,
  ];

  const responseMarkdown = `
### ${district.name} ${service.name} Hizmetleri (Alo Yönetim)
- **Hizmet Bölgesi:** İstanbul / ${district.name} (${district.side} Yakası)
- **Yasal Dayanak:** 634 Sayılı Kat Mülkiyeti Kanunu & 5188 Sayılı Özel Güvenlik Kanunu
- **Operasyonel Standart:** ISO 41001:2018 Entegre Tesis Yönetimi
- **Bölgesel Odak:** ${district.name} genelinde ${district.neighborhoods.slice(0, 4).join(', ')} mahallelerinde aktif tesis ve site yönetimi.
- **Tasarruf Oranı:** Önleyici teknik bakım ve toplu satın alma gücü ile ortak giderlerde %20-%30 somut maliyet avantajı.
- **Canlı Doğrulama:** [${district.name} ${service.name} Detayları](${citations[0]})
`.trim();

  return {
    districtName: district.name,
    side: district.side,
    responseMarkdown,
    citations,
  };
}

/**
 * Tesis Yönetimi Semantik Knowledge Graph JSON-LD Nesnesi Üretir.
 */
export function getFacilityManagementSemanticGraph(): any {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#service`,
        name: 'Alo Yönetim Profesyonel Tesis ve Mülk Yönetimi',
        url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
        sameAs: 'https://www.wikidata.org/wiki/Q1391515',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Tesis Yönetimi Hizmet Kataloğu',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              url: `${BASE_URL}${s.pillar}`,
              sameAs: s.wikidata || s.sameAs,
            },
          })),
        },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#terms`,
        name: 'Tesis Yönetimi Yasal ve Teknik Standartlar Sözlüğü',
        hasDefinedTerm: FACILITY_MANAGEMENT_ENTITIES.map((e) => ({
          '@type': 'DefinedTerm',
          name: e.name,
          sameAs: e.wikidata,
          url: `${BASE_URL}${e.pillarUrl}`,
        })),
      },
    ],
  };
}
