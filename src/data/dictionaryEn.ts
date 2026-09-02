export interface EnglishTerm {
  term: string;
  turkishEquivalent: string;
  definition: string;
  category: 'Facility Management' | 'Property Law & KMK' | 'Security & Surveillance' | 'Technical & Maintenance' | 'Financial & Dues';
  link?: { href: string; label: string };
}

/**
 * Faz 156: Comprehensive English Facility Management Industry Dictionary
 * Tailored for international residents, investors, commercial tenants, and foreign property owners in Istanbul.
 */
export const ENGLISH_TERMS: EnglishTerm[] = [
  {
    term: 'Facility Management (FM)',
    turkishEquivalent: 'Tesis Yönetimi',
    definition: 'An organizational function which integrates people, place, and process within the built environment with the purpose of improving the quality of life of people and the productivity of the core business, certified under ISO 41001.',
    category: 'Facility Management',
    link: { href: '/en/services/facility-management', label: 'Facility Management Services' },
  },
  {
    term: 'Condominium Dues (Aidat)',
    turkishEquivalent: 'Site / Apartman Aidatı',
    definition: 'The mandatory monthly contribution paid by unit owners or tenants to cover shared expenses such as security, cleaning, elevator servicing, HVAC maintenance, and community amenities pursuant to Turkish Condominium Law No. 634.',
    category: 'Financial & Dues',
    link: { href: '/en/calculator', label: 'Dues & Budget Calculator' },
  },
  {
    term: 'Operating Project (Budget Plan)',
    turkishEquivalent: 'İşletme Projesi',
    definition: 'The legally binding annual financial operating plan prepared by the facility manager, outlining projected revenues, operational expenses, reserve funds, and the apportionment of dues among co-owners.',
    category: 'Financial & Dues',
    link: { href: '/en/services/facility-management', label: 'Budget & Operation Services' },
  },
  {
    term: 'Turkish Condominium Law No. 634 (KMK)',
    turkishEquivalent: '634 Sayılı Kat Mülkiyeti Kanunu',
    definition: 'The fundamental Turkish statutory framework regulating ownership rights, common area easements, management boards, and financial obligations in multi-unit residential and commercial complexes.',
    category: 'Property Law & KMK',
    link: { href: '/en/services/legal-and-execution-consultancy', label: 'Legal Consultancy' },
  },
  {
    term: 'Private Security Law No. 5188',
    turkishEquivalent: '5188 Sayılı Özel Güvenlik Kanunu',
    definition: 'The statutory decree of the Turkish Ministry of Interior regulating licensed security personnel, armed/unarmed patrolling, electronic access control, and legal permits in residential compounds and business centers.',
    category: 'Security & Surveillance',
    link: { href: '/en/services/security-management', label: '5188 Security Operations' },
  },
  {
    term: 'General Assembly of Co-Owners',
    turkishEquivalent: 'Kat Malikleri Genel Kurulu',
    definition: 'The supreme decision-making body of a condominium, comprising all title deed holders. It votes on the election of the management board, approves the annual budget, and amends building bylaws.',
    category: 'Property Law & KMK',
    link: { href: '/en/services/facility-management', label: 'Assembly Representation' },
  },
  {
    term: 'Management Plan (Bylaws)',
    turkishEquivalent: 'Yönetim Planı',
    definition: 'The contractual charter registered in the Land Registry (Tapu) that governs house rules, common property usage, cost distribution ratios, and architectural guidelines binding on all successive owners.',
    category: 'Property Law & KMK',
  },
  {
    term: 'Common Property & Common Areas',
    turkishEquivalent: 'Ortak Yerler ve Alanlar',
    definition: 'Portions of the property shared by all co-owners, including lobbies, stairwells, roofs, elevators, gardens, underground garages, fire escapes, and mechanical utility rooms.',
    category: 'Facility Management',
    link: { href: '/en/services/cleaning-and-hygiene', label: 'Common Area Cleaning' },
  },
  {
    term: 'Preventive Maintenance (PPM)',
    turkishEquivalent: 'Periyodik Koruyucu Bakım',
    definition: 'Scheduled technical inspections, lubrication, filter replacements, and testing of electro-mechanical systems (generators, pumps, chillers, boilers) to prevent catastrophic breakdowns.',
    category: 'Technical & Maintenance',
    link: { href: '/en/services/technical-maintenance', label: 'Technical Maintenance' },
  },
  {
    term: 'Green Label Elevator Certification',
    turkishEquivalent: 'Asansör Yeşil Etiket Uygunluğu',
    definition: 'The mandatory annual inspection badge awarded by accredited inspection bodies indicating full compliance with Ministry of Industry elevator safety and operational standards.',
    category: 'Technical & Maintenance',
    link: { href: '/en/services/technical-maintenance', label: 'Elevator Compliance' },
  },
  {
    term: 'CCTV & Perimeter Surveillance',
    turkishEquivalent: 'CCTV ve Çevre Güvenlik Sistemi',
    definition: 'High-definition IP surveillance cameras, video analytics, perimeter infrared beams, and 24/7 central monitoring station operations ensuring complex-wide perimeter security.',
    category: 'Security & Surveillance',
    link: { href: '/en/services/security-management', label: 'Security Management' },
  },
  {
    term: 'Reserve Fund (Sinking Fund)',
    turkishEquivalent: 'Demirbaş / Yenileme Fonu',
    definition: 'Dedicated capital reserves collected from unit owners for long-term infrastructural improvements, major repairs (façade repainting, roof replacement), and asset modernization.',
    category: 'Financial & Dues',
  },
];

export function getEnglishTerm(termOrSlug: string): EnglishTerm | undefined {
  const normalized = termOrSlug.toLowerCase().trim();
  return ENGLISH_TERMS.find(
    (t) =>
      t.term.toLowerCase() === normalized ||
      t.turkishEquivalent.toLowerCase() === normalized ||
      t.term.toLowerCase().replace(/\s+/g, '-') === normalized
  );
}

export function searchEnglishTerms(query: string): EnglishTerm[] {
  if (!query || !query.trim()) return ENGLISH_TERMS;
  const q = query.toLowerCase().trim();
  return ENGLISH_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.turkishEquivalent.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}
