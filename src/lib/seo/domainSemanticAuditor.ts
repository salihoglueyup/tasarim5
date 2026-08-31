/**
 * Semantik LSI & Topikal Derinlik Analizcisi (Alo Yönetim)
 * 
 * Google RankBrain, BERT ve Helpful Content algoritmaları için 'Site Yönetimi' ve
 * 'Tesis Yönetimi' dikeylerinde 14 grupta 200+ LSI (Latent Semantic Indexing) terimini
 * analiz eder, topikal boşlukları tespit eder ve içerik derinlik skoru üretir.
 */

import { DomainPillar, detectPillarIntent } from './domainKeywordsTaxonomy';

export interface SemanticAuditInput {
  pillar?: DomainPillar;
  title: string;
  h1?: string;
  metaDescription?: string;
  content: string;
  wordCount?: number;
}

export interface LsiTermGroup {
  groupName: string;
  pillar: 'site' | 'facility' | 'legal' | 'shared';
  terms: string[];
  maxScore: number;
}

export interface TopicalGapItem {
  groupName: string;
  pillar: 'site' | 'facility' | 'legal' | 'shared';
  missingTerms: string[];
  recommendation: string;
}

export interface LsiTermCoverage {
  groupName: string;
  pillar: 'site' | 'facility' | 'legal' | 'shared';
  detectedCount: number;
  totalCount: number;
  coverageRatio: number;
  detectedTerms: string[];
  missingTerms: string[];
}

export interface SemanticDepthReport {
  pillar: DomainPillar;
  topicalDepthScore: number;
  lsiCoveragePercent: number;
  totalLsiChecked: number;
  totalLsiDetected: number;
  detectedLsiTerms: string[];
  groupCoverages: LsiTermCoverage[];
  topicalGaps: TopicalGapItem[];
  missingCriticalTerms: LsiTermGroup[];
  recommendations: string[];
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
}

export interface SemanticAuditOptions {
  strictMode?: boolean;
  includeSharedTerms?: boolean;
  minWordCountThreshold?: number;
}

/**
 * 🏢 Site Yönetimi LSI Terim Grupları (Grup 1-8)
 */
export const SITE_LSI_GROUPS: LsiTermGroup[] = [
  {
    groupName: 'Hukuki & Mevzuat LSI',
    pillar: 'legal',
    maxScore: 15,
    terms: [
      'bağımsız bölüm', 'kat irtifakı', 'kat mülkiyeti', 'arsa payı',
      'müstakil kullanım', 'genel kurul toplantısı', 'yönetim kurulu kararı',
      'ibra', 'muhalefet şerhi', 'sulh hukuk mahkemesi', 'dava dilekçesi',
      'ihtarname', 'tebligat', 'kat malikleri kurulu', 'oy çokluğu',
      'dörtte üç karar nisabı', 'oybirliği', 'tapu sicili', 'cins tashihi', 'iskan'
    ]
  },
  {
    groupName: 'Finansal & Muhasebe LSI',
    pillar: 'site',
    maxScore: 15,
    terms: [
      'işletme projesi', 'yıllık bütçe', 'avans aidat', 'gider payı',
      'aidat makbuzu', 'ek bütçe', 'denetim raporu', 'hesap özeti',
      'banka ekstre', 'gelir-gider tablosu', 'nakit akışı', 'fatura yönetimi',
      'kdv beyannamesi', 'stopaj', 'denetim kurulu ibrası', 'muhasebeci',
      'mali müşavir', 'bütçe revizyonu'
    ]
  },
  {
    groupName: 'Teknik Bakım & Periyodik Kontrol LSI',
    pillar: 'shared',
    maxScore: 15,
    terms: [
      'asansör periyodik kontrolü', 'kırmızı etiket asansör', 'jeneratör bakımı',
      'hidrofor sistemi', 'yangın tüpü dolumu', 'sığınak denetimi',
      'çatı su yalıtımı', 'dış cephe bakımı', 'havuz kimyası', 'klima bakımı',
      'elektrik panosu', 'kompanzasyon takibi', 'doğalgaz tesisat kontrolü',
      'baca temizliği', 'paratoner muayenesi', 'bina deprem güçlendirmesi',
      'kentsel dönüşüm analizi', 'termal kamera tespiti', 'zemin etüdü', 'statik proje'
    ]
  },
  {
    groupName: 'Güvenlik & Erişim LSI',
    pillar: 'site',
    maxScore: 10,
    terms: [
      '5188 kimlik kartı', 'güvenlik kamera sistemi', 'kartlı geçiş sistemi',
      'turnike sistemi', 'araç bariyer sistemi', 'güvenlik vardiyası',
      'gece devriyesi', 'ziyaretçi kayıt sistemi', 'acil durum planı',
      'yangın tahliye senaryosu', 'depo güvenliği', 'zimmet tutanağı',
      'güvenlik defteri', 'olay tutanağı', 'güvenlik şefi'
    ]
  },
  {
    groupName: 'Yeşil Alan & Peyzaj LSI',
    pillar: 'site',
    maxScore: 10,
    terms: [
      'peyzaj bakımı', 'sulama sistemi', 'çim biçme', 'bahçe gübresi',
      'ağaç budama', 'dekoratif bitki', 'mevsimlik çiçek', 'fıskiye havuzu',
      'çocuk oyun parkı', 'spor aletleri bakımı', 'bisiklet parkı', 'çevre düzenleme'
    ]
  },
  {
    groupName: 'Temizlik & Hijyen LSI',
    pillar: 'site',
    maxScore: 10,
    terms: [
      'ortak alan temizliği', 'cam silme hizmeti', 'asansör temizliği',
      'çöp depo alanı', 'atık ayrıştırma', 'geri dönüşüm konteyneri',
      'dezenfeksiyon hizmeti', 'haşere ilaçlama', 'fare mücadelesi',
      'kapalı otopark temizliği', 'bina girişi temizliği', 'bayramlık temizlik'
    ]
  },
  {
    groupName: 'Dijital & Mobil Teknoloji LSI',
    pillar: 'site',
    maxScore: 10,
    terms: [
      'dijital aidat ödeme', 'mobil uygulama yönetim', 'online genel kurul',
      'e-devlet entegrasyonu', 'dijital duyuru panosu', 'arıza takip sistemi',
      'qr kod kapı giriş', 'enerji tüketim takip', 'akıllı sayaç sistemi', 'bms sistemi'
    ]
  },
  {
    groupName: 'Konut & Proje Türleri LSI',
    pillar: 'site',
    maxScore: 15,
    terms: [
      'müstakil villa yönetimi', 'dubleks daire yönetimi', 'ofis sitesi yönetimi',
      'karma kullanımlı bina', 'ticari dükkan yönetimi', 'otopark yönetim sistemi',
      'toplu yapı blok yönetimi', 'avm içi yönetim', 'rezidans konsiyerj',
      'butik site yönetimi', 'üst segment konut yönetimi', 'ada parsel yönetimi',
      'kira yönetim hizmeti', 'tapu devri işlemi', 'tahliye danışmanlığı'
    ]
  }
];

/**
 * 🏭 Tesis Yönetimi LSI Terim Grupları (Grup 9-14)
 */
export const FACILITY_LSI_GROUPS: LsiTermGroup[] = [
  {
    groupName: 'ISO & Sertifikasyon LSI',
    pillar: 'facility',
    maxScore: 15,
    terms: [
      'iso 41001 sertifikası', 'iso 9001 kalite yönetim', 'iso 14001 çevre yönetim',
      'iso 45001 iş güvenliği', 'ohsas 18001', 'breeam sertifikası',
      'leed sertifikası', 'well binası', 'enerji kimlik belgesi', 'epdk lisansı',
      'yetkilendirilmiş servis', 'akredite laboratuvar', 'kalite denetimi',
      'iç denetim raporlama', 'yönetim sistemi entegrasyonu'
    ]
  },
  {
    groupName: 'Kurumsal İşletme & Verimlilik LSI',
    pillar: 'facility',
    maxScore: 20,
    terms: [
      'önleyici bakım planı', 'arıza oranı kpi', 'mtbf analizi',
      'enerji verimliliği raporu', 'enerji baskı analizi', 'hvac optimizasyonu',
      'bms entegrasyonu', 'akıllı bina sistemi', 'iot sensör ağı',
      'tahmine dayalı bakım', 'dijital ikiz bina', 'karbon ayak izi',
      'su tasarrufu raporu', 'atık yönetim protokolü', 'yeşil bina stratejisi',
      'bina otomasyon', 'plc kontrol sistemi', 'scada entegrasyonu'
    ]
  },
  {
    groupName: 'B2B Müşteri & İhale LSI',
    pillar: 'facility',
    maxScore: 15,
    terms: [
      'tesis yönetim şartnamesi', 'rfp teklif dosyası', 'hizmet seviye sözleşmesi',
      'sla kpi takibi', 'performans değerlendirme toplantısı', 'ihale süreci',
      'kurumsal yönetim raporu', 'haftalık faaliyet raporu', 'aylık işletme raporu',
      'yıllık performans değerlendirme', 'sözleşme yenileme', 'kurumsal teklif formu'
    ]
  },
  {
    groupName: 'Plaza & Ticari Tesis LSI',
    pillar: 'facility',
    maxScore: 20,
    terms: [
      'plaza ortak gider', 'kira stopaj', 'kiracı hizmet talep yönetimi',
      'yük rampası yönetimi', 'teslimat saati kısıtlama', 'otopark tahsis',
      'kiracı kural kitabı', 'plaza misafir karşılama', 'konferans salonu yönetimi',
      'çatı terası yönetimi', 'tabela yönetim kuralları', 'dış cephe reklam',
      'güvenlik çevre sistemi', 'kamera izleme merkezi', 'acil protokol planı'
    ]
  },
  {
    groupName: 'Sanayi & Lojistik Tesis LSI',
    pillar: 'facility',
    maxScore: 15,
    terms: [
      'tır parkı yönetimi', 'weigh-bridge kontrol', 'yükleme boşaltma rampası',
      'tehlikeli madde depolama', 'forklift güvenlik protokolü', 'zemin dayanımı',
      'depo rack sistemi', 'yangın algılama sanayi', 'ex-proof ekipman',
      'atık su arıtma sistemi', 'gürültü önlem tedbirleri', 'çevre izin belgesi'
    ]
  },
  {
    groupName: 'Sağlık & İş Güvenliği LSI',
    pillar: 'shared',
    maxScore: 15,
    terms: [
      'isg uzmanı', 'risk değerlendirme raporu', 'acil durum ekibi',
      'ilk yardım eğitimi', 'kişisel koruyucu donanım', 'iş kazası bildirimi',
      'sgk e-bildirge', 'iş güvenliği denetimi', 'çalışan sağlığı takibi', 'ramak kala formu'
    ]
  }
];

export const ALL_LSI_GROUPS: LsiTermGroup[] = [
  ...SITE_LSI_GROUPS,
  ...FACILITY_LSI_GROUPS,
];

export function normalizeTurkish(str: string): string {
  if (!str) return '';
  return str
    .replace(/İ/g, 'i')
    .replace(/I(?=[A-Z0-9])/g, 'i')
    .replace(/I/g, 'ı')
    .toLowerCase()
    .replace(/ıso/g, 'iso')
    .replace(/ısg/g, 'isg')
    .replace(/ıot/g, 'iot');
}

/**
 * Sayfa veya makale içeriğinin LSI terim zenginliğini ve topikal derinliğini analiz eder.
 */
export function analyzeDomainSemanticDepth(
  input: SemanticAuditInput,
  options?: SemanticAuditOptions
): SemanticDepthReport {
  const pillar = input.pillar || detectPillarIntent(`${input.title} ${input.content}`);
  const normalizedTitle = normalizeTurkish(input.title);
  const normalizedH1 = normalizeTurkish(input.h1 || '');
  const normalizedDesc = normalizeTurkish(input.metaDescription || '');
  const normalizedContent = normalizeTurkish(input.content);
  const fullText = `${normalizedTitle} ${normalizedH1} ${normalizedDesc} ${normalizedContent}`;

  const groupsToAudit: LsiTermGroup[] =
    pillar === 'site'
      ? SITE_LSI_GROUPS
      : pillar === 'facility'
      ? FACILITY_LSI_GROUPS
      : ALL_LSI_GROUPS;

  const detectedLsiTerms: string[] = [];
  const groupCoverages: LsiTermCoverage[] = [];
  const topicalGaps: TopicalGapItem[] = [];
  const missingCriticalTerms: LsiTermGroup[] = [];
  const recommendations: string[] = [];

  let totalTermsChecked = 0;

  for (const group of groupsToAudit) {
    const groupDetected: string[] = [];
    const groupMissing: string[] = [];

    for (const term of group.terms) {
      totalTermsChecked++;
      if (fullText.includes(normalizeTurkish(term))) {
        groupDetected.push(term);
        if (!detectedLsiTerms.includes(term)) {
          detectedLsiTerms.push(term);
        }
      } else {
        groupMissing.push(term);
      }
    }

    const coverageRatio = group.terms.length > 0 ? groupDetected.length / group.terms.length : 0;

    groupCoverages.push({
      groupName: group.groupName,
      pillar: group.pillar,
      detectedCount: groupDetected.length,
      totalCount: group.terms.length,
      coverageRatio: Math.round(coverageRatio * 100) / 100,
      detectedTerms: groupDetected,
      missingTerms: groupMissing,
    });

    if (groupDetected.length === 0) {
      topicalGaps.push({
        groupName: group.groupName,
        pillar: group.pillar,
        missingTerms: groupMissing.slice(0, 5),
        recommendation: `İçeriğinize '${group.groupName}' kapsamındaki kritik terimleri (${groupMissing.slice(0, 3).join(', ')}) ekleyin.`,
      });
      missingCriticalTerms.push(group);
      recommendations.push(`'${group.groupName}' alanında hiç terim bulunamadı. Örnek: ${groupMissing.slice(0, 3).join(', ')}`);
    } else if (coverageRatio < 0.25) {
      recommendations.push(`'${group.groupName}' kapsamı düşük (%${Math.round(coverageRatio * 100)}). Şunları ekleyin: ${groupMissing.slice(0, 3).join(', ')}`);
    }
  }

  const lsiCoveragePercent = totalTermsChecked > 0 ? Math.round((detectedLsiTerms.length / totalTermsChecked) * 100) : 0;

  // 1. LSI Kapsam & Grup Çeşitlilik Puanı (Max 40)
  const coveredGroupsCount = groupCoverages.filter((g) => g.detectedCount > 0).length;
  const groupBreadthScore = Math.min(24, coveredGroupsCount * 3);
  const termDensityScore = Math.min(16, Math.round(detectedLsiTerms.length * 1.5));
  const lsiScore = Math.min(40, groupBreadthScore + termDensityScore);

  // 2. Kelime Sayısı ve Zenginlik Puanı (Max 20)
  const wordCount = input.wordCount || (input.content.trim() ? input.content.trim().split(/\s+/).length : 0);
  let wordScore = 0;
  if (wordCount >= 250) wordScore = 20;
  else if (wordCount >= 150) wordScore = 15;
  else if (wordCount >= 50) wordScore = 10;
  else if (wordCount > 0) wordScore = 5;

  // 3. Başlık & H1 Uyum Puanı (Max 20)
  let titleScore = 0;
  if (normalizedTitle.includes('site') || normalizedTitle.includes('tesis')) titleScore += 10;
  if (normalizedH1.includes('site') || normalizedH1.includes('tesis')) titleScore += 10;

  // 4. Hukuk & Standartlar Güven Puanı (Max 20)
  let trustScore = 0;
  if (fullText.includes('kmk') || fullText.includes('634')) trustScore += 7;
  if (fullText.includes('iso 41001') || fullText.includes('iso')) trustScore += 7;
  if (fullText.includes('5188') || fullText.includes('güvenlik')) trustScore += 6;

  const topicalDepthScore = Math.min(100, lsiScore + wordScore + titleScore + trustScore);

  const grade =
    topicalDepthScore >= 90
      ? 'A+'
      : topicalDepthScore >= 80
      ? 'A'
      : topicalDepthScore >= 65
      ? 'B'
      : topicalDepthScore >= 50
      ? 'C'
      : 'D';

  return {
    pillar,
    topicalDepthScore,
    lsiCoveragePercent,
    totalLsiChecked: totalTermsChecked,
    totalLsiDetected: detectedLsiTerms.length,
    detectedLsiTerms,
    groupCoverages,
    topicalGaps,
    missingCriticalTerms,
    recommendations,
    grade,
  };
}

/**
 * Grup bazında kapsam yüzdesini döner.
 */
export function getLsiGroupCoverage(pillar: DomainPillar, content: string): LsiTermCoverage[] {
  const result = analyzeDomainSemanticDepth({ pillar, title: '', content });
  return result.groupCoverages;
}

/**
 * Eksik terimleri grup başlıklarıyla listeler.
 */
export function getMissingLsiTermsByGroup(pillar: DomainPillar, content: string): Record<string, string[]> {
  const result = analyzeDomainSemanticDepth({ pillar, title: '', content });
  const missingMap: Record<string, string[]> = {};
  for (const group of result.groupCoverages) {
    if (group.missingTerms.length > 0) {
      missingMap[group.groupName] = group.missingTerms;
    }
  }
  return missingMap;
}

/**
 * Puanı harf notuna çevirir.
 */
export function getTopicalDepthGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

/**
 * İçerikteki eksikliklerden otomatik SEO içerik brifingi üretir.
 */
export function generateSemanticContentBriefing(input: SemanticAuditInput): string[] {
  const report = analyzeDomainSemanticDepth(input);
  const briefings: string[] = [];

  briefings.push(`HEDEF DİKEY: ${report.pillar.toUpperCase()}`);
  briefings.push(`Mevcut Topikal Derinlik Skoru: ${report.topicalDepthScore}/100 (Not: ${report.grade})`);

  if (report.topicalGaps.length > 0) {
    briefings.push('Kritik Topikal Boşluklar:');
    report.topicalGaps.forEach((gap, idx) => {
      briefings.push(`${idx + 1}. [${gap.groupName}] Önerilen terimler: ${gap.missingTerms.join(', ')}`);
    });
  }

  if (report.recommendations.length > 0) {
    briefings.push('Aksiyon Önerileri:');
    report.recommendations.slice(0, 5).forEach((rec, idx) => {
      briefings.push(`- ${rec}`);
    });
  }

  return briefings;
}

/**
 * İki sayfayı topikal derinlik açısından karşılaştırır.
 */
export function comparePageSemanticDepth(
  page1: SemanticAuditInput,
  page2: SemanticAuditInput
): { winner: 'page1' | 'page2' | 'tie'; diff: number; report1: SemanticDepthReport; report2: SemanticDepthReport } {
  const report1 = analyzeDomainSemanticDepth(page1);
  const report2 = analyzeDomainSemanticDepth(page2);

  const diff = report1.topicalDepthScore - report2.topicalDepthScore;
  const winner = diff > 0 ? 'page1' : diff < 0 ? 'page2' : 'tie';

  return {
    winner,
    diff: Math.abs(diff),
    report1,
    report2,
  };
}
