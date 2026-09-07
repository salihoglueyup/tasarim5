import type { JsonLdObject } from './constants';
import { BASE_URL, abs } from './constants';

export const generateBreadcrumbs = (items: { name?: string; url?: string }[]): JsonLdObject => {
  const validItems = (items || [])
    .filter((item) => item && typeof item.name === 'string' && item.name.trim().length > 0)
    .map((item) => ({
      name: item.name!.trim(),
      url: item.url ? abs(item.url) : BASE_URL,
    }));

  const lastItem = validItems[validItems.length - 1];
  const canonicalId = lastItem ? `${lastItem.url}#breadcrumb` : undefined;

  return {
    '@type': 'BreadcrumbList',
    ...(canonicalId ? { '@id': canonicalId } : {}),
    itemListElement: validItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// ---------------------------------------------------------------------------
// SiteNavigationElement (Site Haritası)
// ---------------------------------------------------------------------------
export function siteNavigationSchema(links: { name: string; url: string }[]): JsonLdObject {
  const validLinks = (links || []).filter(
    (l) => l && typeof l.name === 'string' && l.name.trim().length > 0 && typeof l.url === 'string'
  );

  return {
    '@type': 'ItemList',
    itemListElement: validLinks.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.name.trim(),
      url: abs(link.url),
    })),
  };
}

// ---------------------------------------------------------------------------
/**
 * DigitalDocument — ISO sertifikaları ve resmi belgeler için.
 * Google'ın Certification/DigitalDocument rich result'larını destekler.
 */
