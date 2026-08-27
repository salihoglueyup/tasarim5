import { FACILITY_SUB_SECTORS } from './facilitySiloRankPasser';
import { DISTRICTS } from '@/data/districts';
import { GROUP_COMPANIES_ECOSYSTEM } from './facilityGroupAndLegalEcosystem';

export interface PageRankNodeResult {
  id: string;
  name: string;
  url: string;
  rawPageRank: number;
  normalizedScore: number; // 0 - 100
  tier: 'tier_1_flagship' | 'tier_2_subsector' | 'tier_3_district' | 'tier_4_satellite';
  inboundLinkCount: number;
}

export interface PageRankSimulationReport {
  iterationsRan: number;
  converged: boolean;
  totalNodes: number;
  dampingFactor: number;
  flagshipHubScore: number;
  averageSubSectorScore: number;
  averageDistrictScore: number;
  underlinkedNodes: string[];
  nodes: PageRankNodeResult[];
}

/**
 * Tesis ve Mülk Hizmetleri Sunucu Taraflı PageRank Akış & Link Dağıtım Simülasyon Motoru.
 * 
 * Google'ın Random & Reasonable Surfer algoritmalarına dayalı matematiksel PageRank
 * simülasyonu çalıştırarak, sitedeki tüm iç bağlantıların amiral gemisi ve alt sektörlere
 * ne kadar güç aktardığını modeller.
 */
export function simulateFacilityPageRank(dampingFactor = 0.85, maxIterations = 50): PageRankSimulationReport {
  // Düğüm listesi
  const nodeIds: string[] = ['hub-tesis-yonetimi'];
  const nodeMap = new Map<string, { id: string; name: string; url: string; tier: PageRankNodeResult['tier'] }>();

  nodeMap.set('hub-tesis-yonetimi', {
    id: 'hub-tesis-yonetimi',
    name: 'Tesis ve Mülk Yönetimi (Ana Hub)',
    url: '/hizmetler/tesis-yonetimi',
    tier: 'tier_1_flagship',
  });

  for (const sub of FACILITY_SUB_SECTORS) {
    nodeIds.push(`sub-${sub.slug}`);
    nodeMap.set(`sub-${sub.slug}`, {
      id: `sub-${sub.slug}`,
      name: sub.name,
      url: `/hizmetler/tesis-yonetimi/${sub.slug}`,
      tier: 'tier_2_subsector',
    });
  }

  for (const d of DISTRICTS) {
    nodeIds.push(`district-${d.slug}`);
    nodeMap.set(`district-${d.slug}`, {
      id: `district-${d.slug}`,
      name: `${d.name} Tesis Yönetimi`,
      url: `/bolgeler/${d.slug}/tesis-yonetimi`,
      tier: 'tier_3_district',
    });
  }

  for (const comp of GROUP_COMPANIES_ECOSYSTEM) {
    nodeIds.push(`group-${comp.id}`);
    nodeMap.set(`group-${comp.id}`, {
      id: `group-${comp.id}`,
      name: comp.name,
      url: comp.url,
      tier: 'tier_4_satellite',
    });
  }

  const N = nodeIds.length;
  const outboundMap = new Map<string, string[]>();
  const inboundCountMap = new Map<string, number>();

  // Bağlantıları kur
  // 1. Hub -> Tüm alt sektörlere, ilçelere ve grup şirketlerine link verir
  const hubOutbounds = [
    ...FACILITY_SUB_SECTORS.map((s) => `sub-${s.slug}`),
    ...DISTRICTS.map((d) => `district-${d.slug}`),
    ...GROUP_COMPANIES_ECOSYSTEM.map((c) => `group-${c.id}`),
  ];
  outboundMap.set('hub-tesis-yonetimi', hubOutbounds);

  // 2. Alt Sektörler -> Hub'a ve diğer 4 alt sektöre ve ilçelere link verir
  for (const sub of FACILITY_SUB_SECTORS) {
    const subOutbounds = [
      'hub-tesis-yonetimi',
      ...FACILITY_SUB_SECTORS.filter((s) => s.slug !== sub.slug).map((s) => `sub-${s.slug}`),
      ...DISTRICTS.slice(0, 6).map((d) => `district-${d.slug}`),
    ];
    outboundMap.set(`sub-${sub.slug}`, subOutbounds);
  }

  // 3. İlçeler -> Hub'a ve alt sektörlere link verir
  for (const d of DISTRICTS) {
    const distOutbounds = [
      'hub-tesis-yonetimi',
      ...FACILITY_SUB_SECTORS.slice(0, 2).map((s) => `sub-${s.slug}`),
    ];
    outboundMap.set(`district-${d.slug}`, distOutbounds);
  }

  // 4. Grup Şirketleri (External) -> Çıkış yok (sink)
  for (const comp of GROUP_COMPANIES_ECOSYSTEM) {
    outboundMap.set(`group-${comp.id}`, ['hub-tesis-yonetimi']);
  }

  // Inbound sayılarını hesapla
  for (const id of nodeIds) {
    inboundCountMap.set(id, 0);
  }
  for (const [, targets] of outboundMap.entries()) {
    for (const target of targets) {
      inboundCountMap.set(target, (inboundCountMap.get(target) || 0) + 1);
    }
  }

  // PageRank Iteration Initialization
  let pr = new Array(N).fill(1 / N);
  let iterationsRan = 0;
  let converged = false;

  for (let iter = 0; iter < maxIterations; iter++) {
    iterationsRan++;
    const nextPr = new Array(N).fill((1 - dampingFactor) / N);

    for (let i = 0; i < N; i++) {
      const sourceId = nodeIds[i];
      const targets = outboundMap.get(sourceId) || [];
      if (targets.length > 0) {
        const contribution = (dampingFactor * pr[i]) / targets.length;
        for (const target of targets) {
          const targetIndex = nodeIds.indexOf(target);
          if (targetIndex !== -1) {
            nextPr[targetIndex] += contribution;
          }
        }
      } else {
        // Sink node: distribute evenly
        for (let j = 0; j < N; j++) {
          nextPr[j] += (dampingFactor * pr[i]) / N;
        }
      }
    }

    // Check convergence
    let maxDiff = 0;
    for (let i = 0; i < N; i++) {
      maxDiff = Math.max(maxDiff, Math.abs(nextPr[i] - pr[i]));
    }
    pr = nextPr;

    if (maxDiff < 1e-6) {
      converged = true;
      break;
    }
  }

  // Normalize scores (0 - 100)
  const maxPr = Math.max(...pr);
  const results: PageRankNodeResult[] = nodeIds.map((id, index) => {
    const meta = nodeMap.get(id)!;
    const normalizedScore = Math.round((pr[index] / maxPr) * 100);
    return {
      id: meta.id,
      name: meta.name,
      url: meta.url,
      rawPageRank: pr[index],
      normalizedScore,
      tier: meta.tier,
      inboundLinkCount: inboundCountMap.get(id) || 0,
    };
  });

  const flagshipHubScore = results.find((r) => r.id === 'hub-tesis-yonetimi')?.normalizedScore || 100;
  const subSectorResults = results.filter((r) => r.tier === 'tier_2_subsector');
  const districtResults = results.filter((r) => r.tier === 'tier_3_district');

  const averageSubSectorScore = Math.round(
    subSectorResults.reduce((acc, curr) => acc + curr.normalizedScore, 0) / subSectorResults.length
  );
  const averageDistrictScore = Math.round(
    districtResults.reduce((acc, curr) => acc + curr.normalizedScore, 0) / districtResults.length
  );

  const underlinkedNodes = results.filter((r) => r.inboundLinkCount < 1).map((r) => r.name);

  return {
    iterationsRan,
    converged,
    totalNodes: N,
    dampingFactor,
    flagshipHubScore,
    averageSubSectorScore,
    averageDistrictScore,
    underlinkedNodes,
    nodes: results,
  };
}
