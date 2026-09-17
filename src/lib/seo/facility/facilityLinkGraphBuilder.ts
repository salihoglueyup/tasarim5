import { GROUP_COMPANIES_ECOSYSTEM } from './facilityGroupAndLegalEcosystem';
import { OFFICIAL_LEGAL_CITATIONS } from './facilityExternalCitations';
import { FACILITY_SUB_SECTORS } from './facilitySiloRankPasser';
import { DISTRICTS } from '@/data/districts';

export interface LinkGraphNode {
  id: string;
  name: string;
  url: string;
  type: 'internal_hub' | 'internal_subsector' | 'internal_district' | 'group_company' | 'official_legislation';
  inboundLinksCount: number;
  outboundLinksCount: number;
  authorityWeight: number; // 0.1 - 1.0
}

export interface LinkGraphReport {
  totalNodes: number;
  totalInternalEdges: number;
  totalExternalAuthorityEdges: number;
  groupCompaniesConnected: number;
  officialCitationsConnected: number;
  linkAuthorityScore: number; // 0 - 100
  nodes: LinkGraphNode[];
}

/**
 * Tesis ve Mülk Hizmetleri İç ve Dış Link Grafiği & E-E-A-T Otorite Hesaplayıcısı.
 * 
 * Sitedeki tüm iç silo bağlantılarını, grup şirketi çapraz sinyallerini ve resmi mevzuat
 * dış atıflarını eksiksiz modelleyerek arama motorlarına giden otorite sinyalini ölçer.
 */
export function buildFacilityCompleteLinkGraph(): LinkGraphReport {
  const nodes: LinkGraphNode[] = [];

  // 1. Ana Tesis Yönetimi Hub Düğümü
  const hubNode: LinkGraphNode = {
    id: 'tesis-yonetimi-hub',
    name: 'Tesis ve Mülk Yönetimi (Ana Hub)',
    url: '/hizmetler/tesis-yonetimi',
    type: 'internal_hub',
    inboundLinksCount: 5 + 39 + 8 + 10, // 5 alt sektör + 39 ilçe + 8 kardeş hizmet + footer
    outboundLinksCount: 5 + 39 + 2 + OFFICIAL_LEGAL_CITATIONS.length,
    authorityWeight: 1.0,
  };
  nodes.push(hubNode);

  // 2. 5 Alt Sektör Düğümleri
  for (const sub of FACILITY_SUB_SECTORS) {
    nodes.push({
      id: sub.slug,
      name: sub.name,
      url: `/hizmetler/tesis-yonetimi/${sub.slug}`,
      type: 'internal_subsector',
      inboundLinksCount: 1 + 4 + 39, // Hub + 4 Kardeş alt sektör + İlçeler
      outboundLinksCount: 1 + 4 + 39 + 2,
      authorityWeight: 0.85,
    });
  }

  // 3. 39 İlçe Düğümleri
  for (const d of DISTRICTS) {
    nodes.push({
      id: `district-${d.slug}`,
      name: `${d.name} Tesis Yönetimi`,
      url: `/bolgeler/${d.slug}/tesis-yonetimi`,
      type: 'internal_district',
      inboundLinksCount: 1 + 5,
      outboundLinksCount: 1 + 5,
      authorityWeight: 0.7,
    });
  }

  // 4. Grup Şirketleri Düğümleri
  for (const comp of GROUP_COMPANIES_ECOSYSTEM) {
    nodes.push({
      id: comp.id,
      name: comp.name,
      url: comp.url,
      type: 'group_company',
      inboundLinksCount: 10, // Siteden giden kurumsal bağlantılar
      outboundLinksCount: 1,
      authorityWeight: 0.95,
    });
  }

  // 5. Resmi Mevzuat & Yasal Otorite Düğümleri
  for (const cit of OFFICIAL_LEGAL_CITATIONS) {
    nodes.push({
      id: cit.id,
      name: cit.name,
      url: cit.url,
      type: 'official_legislation',
      inboundLinksCount: 5,
      outboundLinksCount: 0,
      authorityWeight: 0.99,
    });
  }

  const totalInternalEdges = 1 * 5 + 5 * 4 + 39 * 2 + 8 * 2;
  const totalExternalAuthorityEdges = GROUP_COMPANIES_ECOSYSTEM.length + OFFICIAL_LEGAL_CITATIONS.length;

  // E-E-A-T Link Otorite Skoru (0 - 100)
  const linkAuthorityScore = Math.min(
    100,
    Math.round(
      (nodes.length * 0.4) +
      (GROUP_COMPANIES_ECOSYSTEM.length * 15) +
      (OFFICIAL_LEGAL_CITATIONS.length * 4) +
      (totalInternalEdges * 0.2)
    )
  );

  return {
    totalNodes: nodes.length,
    totalInternalEdges,
    totalExternalAuthorityEdges,
    groupCompaniesConnected: GROUP_COMPANIES_ECOSYSTEM.length,
    officialCitationsConnected: OFFICIAL_LEGAL_CITATIONS.length,
    linkAuthorityScore,
    nodes,
  };
}
