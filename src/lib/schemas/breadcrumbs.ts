import type { JsonLdObject } from './constants';
import { BASE_URL, abs } from './constants';

export const generateBreadcrumbs = (items: { name: string; url: string }[]): JsonLdObject => {
  const cleanItems = items.filter(Boolean);
  const lastItem = cleanItems[cleanItems.length - 1];
  const canonicalId = lastItem ? `${abs(lastItem.url)}#breadcrumb` : undefined;

  return {
    '@type': 'BreadcrumbList',
    ...(canonicalId ? { '@id': canonicalId } : {}),
    itemListElement: cleanItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
};

// ---------------------------------------------------------------------------
// SiteNavigationElement (Site Haritası)
// ---------------------------------------------------------------------------
export function siteNavigationSchema(links: { name: string; url: string }[]): JsonLdObject {
  return {
    '@type': 'SiteNavigationElement',
    name: links.map((l) => l.name),
    url: links.map((l) => abs(l.url)),
  };
}

// ---------------------------------------------------------------------------
/**
 * DigitalDocument — ISO sertifikaları ve resmi belgeler için.
 * Google'ın Certification/DigitalDocument rich result'larını destekler.
 */
