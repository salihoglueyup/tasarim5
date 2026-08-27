export interface GroupCompanyEntity {
  id: string;
  name: string;
  legalName: string;
  url: string;
  serviceCategory: string;
  licenseNumber?: string;
  description: string;
  phone?: string;
  email?: string;
  anchorTexts: string[];
}

export const GROUP_COMPANIES_ECOSYSTEM: GroupCompanyEntity[] = [
  {
    id: 'alo-guvenlik',
    name: 'Alo Güvenlik',
    legalName: 'Alo Özel Güvenlik Eğitim Kurumu',
    url: 'https://www.guvenlikkursu.com/',
    serviceCategory: '5188 Sayılı Özel Güvenlik Eğitimi & Sertifikasyon',
    licenseNumber: 'T.C. İçişleri Bakanlığı Emniyet Genel Müdürlüğü Onaylı',
    description:
      'Silahlı ve silahsız özel güvenlik eğitimi, kimlik yenileme kursu ve 5188 yasal güvenlik sertifikasyon merkezi.',
    phone: '0216 550 48 48',
    anchorTexts: [
      'Alo Güvenlik Kursu',
      'Özel Güvenlik Eğitimi',
      '5188 Güvenlik Sertifikası',
      'Alo Güvenlik Eğitim Kurumu',
    ],
  },
  {
    id: '3g-guvenlik',
    name: '3G Özel Güvenlik',
    legalName: '3G Özel Güvenlik ve Koruma Hizmetleri Ltd. Şti.',
    url: 'https://3gguvenlik.com/',
    serviceCategory: '5188 Lisanslı Özel Güvenlik ve Tesis Emniyeti',
    licenseNumber: '5188 Sayılı Kanun Kapsamında Valilik İzinli',
    description:
      'Rezidans, plaza, site ve sanayi tesisleri için 5188 lisanslı fiziki koruma, VIP güvenlik ve 7/24 elektronik güvenlik hizmetleri.',
    phone: '0216 550 48 48',
    anchorTexts: [
      '3G Güvenlik',
      '3G Özel Güvenlik Hizmetleri',
      '5188 Lisanslı Özel Güvenlik Şirketi',
      'Site Güvenliği 3G',
    ],
  },
];

/**
 * Grup Şirketlerimizin Google Knowledge Graph ve E-E-A-T için Schema.org Düğüm Üreticisi.
 */
export function generateGroupCompaniesSchema() {
  return GROUP_COMPANIES_ECOSYSTEM.map((company) => ({
    '@type': 'Organization',
    '@id': `${company.url}#organization`,
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    description: company.description,
    hasCredential: company.licenseNumber
      ? [
          {
            '@type': 'EducationalOccupationalCredential',
            name: company.licenseNumber,
          },
        ]
      : undefined,
  }));
}

/**
 * HTML içinde güvenli dış bağlantı etiketi üretir (rel="noopener noreferrer").
 */
export function renderGroupCompanyLink(
  companyId: 'alo-guvenlik' | '3g-guvenlik',
  customAnchor?: string
): string {
  const company = GROUP_COMPANIES_ECOSYSTEM.find((c) => c.id === companyId);
  if (!company) return '';
  const anchor = customAnchor || company.name;
  return `<a href="${company.url}" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold hover:underline" title="${company.name} — ${company.serviceCategory}">${anchor}</a>`;
}
