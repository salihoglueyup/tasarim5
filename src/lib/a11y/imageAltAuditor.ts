export interface ImageAuditItem {
  tag: string;
  hasAlt: boolean;
  altValue?: string;
  isDecorative: boolean;
  hasAriaHidden: boolean;
}

export interface ImageAuditReport {
  valid: boolean;
  totalImages: number;
  missingAltCount: number;
  suspiciousAltCount: number;
  images: ImageAuditItem[];
  errors: string[];
}

const SUSPICIOUS_ALT_PATTERNS = [
  /^image$/i,
  /^img$/i,
  /^photo$/i,
  /^picture$/i,
  /^resim$/i,
  /^görsel$/i,
  /^placeholder$/i,
  /^icon$/i,
];

/**
 * Faz 208: Görsel Erişilebilirlik ve Alt Özelliği Denetleyicisi (WCAG 1.1.1)
 */
export function auditImageAccessibility(content: string, fileName: string = 'unknown'): ImageAuditReport {
  const imgTagRegex = /<(?:img|Image)\s+([^>]*?)>/gi;
  const images: ImageAuditItem[] = [];
  const errors: string[] = [];

  let match;
  let missingAltCount = 0;
  let suspiciousAltCount = 0;

  while ((match = imgTagRegex.exec(content)) !== null) {
    const attrString = match[1];
    const tag = match[0];

    // alt niteliği kontrolü: alt="..." veya alt={...}
    const altMatch = attrString.match(/\balt=(?:["'](.*?)["']|\{(.*?)\})/i);
    const ariaHiddenMatch = attrString.match(/\baria-hidden=(?:["'](true|false)["']|\{(true|false)\})/i);

    const hasAlt = Boolean(altMatch);
    const altValue = altMatch ? (altMatch[1] ?? altMatch[2] ?? '') : undefined;
    const isDecorative = altValue === '' || altValue === '""' || altValue === "''";
    const hasAriaHidden = ariaHiddenMatch ? (ariaHiddenMatch[1] === 'true' || ariaHiddenMatch[2] === 'true') : false;

    if (!hasAlt) {
      missingAltCount++;
      errors.push(`[${fileName}] Eksik alt niteliği: <${match[0].slice(0, 50)}...>`);
    } else if (altValue) {
      const isSuspicious = SUSPICIOUS_ALT_PATTERNS.some((pattern) => pattern.test(altValue.trim()));
      if (isSuspicious) {
        suspiciousAltCount++;
        errors.push(`[${fileName}] Şüpheli/Açıklayıcı olmayan alt değeri: "${altValue}"`);
      }
    }

    images.push({
      tag: tag.length > 80 ? tag.slice(0, 80) + '...' : tag,
      hasAlt,
      altValue,
      isDecorative,
      hasAriaHidden,
    });
  }

  return {
    valid: errors.length === 0,
    totalImages: images.length,
    missingAltCount,
    suspiciousAltCount,
    images,
    errors,
  };
}
