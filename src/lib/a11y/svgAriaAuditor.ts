export interface SvgAuditReport {
  totalSvgs: number;
  missingAriaHiddenCount: number;
  valid: boolean;
  errors: string[];
}

/**
 * Faz 216: Dekoratif SVG ve İkonların Ekran Okuyucu Gizleme Denetleyicisi (WCAG 1.1.1)
 * Dekoratif SVG'lerin ve Material Symbols ikonlarının ekran okuyucuya gereksiz metin
 * okutmaması için `aria-hidden="true"` niteliğine sahip olduğunu teyit eder.
 */
export function auditSvgAriaHidden(content: string, fileName: string = 'unknown'): SvgAuditReport {
  const svgRegex = /<svg\b([^>]*?)>/gi;
  const errors: string[] = [];

  let match;
  let totalSvgs = 0;
  let missingAriaHiddenCount = 0;

  while ((match = svgRegex.exec(content)) !== null) {
    totalSvgs++;
    const attrs = match[1];

    const hasAriaHidden = /\baria-hidden=(?:["']true["']|\{true\})/i.test(attrs);
    const hasAriaLabel = /\baria-label=/i.test(attrs);
    const hasTitle = /<title\b/i.test(match[0]);
    const hasRoleImg = /\brole=["']img["']/i.test(attrs);

    // Eğer SVG anlamsal bir başlık veya aria-label taşımıyorsa dekoratiftir ve aria-hidden="true" olmalıdır
    if (!hasAriaHidden && !hasAriaLabel && !hasTitle && !hasRoleImg) {
      missingAriaHiddenCount++;
      errors.push(`[${fileName}] Dekoratif SVG'de aria-hidden="true" eksik: <svg ${attrs.slice(0, 40)}...>`);
    }
  }

  return {
    totalSvgs,
    missingAriaHiddenCount,
    valid: missingAriaHiddenCount === 0,
    errors,
  };
}
