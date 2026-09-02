export interface HeadingItem {
  level: number;
  tag: string;
  text?: string;
  index: number;
}

export interface HeadingAuditResult {
  valid: boolean;
  h1Count: number;
  headings: HeadingItem[];
  errors: string[];
}

/**
 * Faz 203: Başlık Hiyerarşisi Denetleyicisi (WCAG 2.1 AA Başlık Kuralları)
 * - Her sayfada en fazla 1 adet <h1> başlığı bulunmalıdır.
 * - Başlık seviyeleri hiyerarşik olmalıdır (örneğin h1'den doğrudan h3'e atlanmamalıdır).
 */
export function auditHeadingHierarchy(content: string, fileName: string = 'unknown'): HeadingAuditResult {
  const headingRegex = /<h([1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/h\1>/gi;
  const headings: HeadingItem[] = [];
  const errors: string[] = [];

  let match;
  let index = 0;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]+>/g, '').trim();

    headings.push({
      level,
      tag: `h${level}`,
      text,
      index: index++,
    });
  }

  const h1Count = headings.filter((h) => h.level === 1).length;

  if (h1Count > 1) {
    errors.push(`[${fileName}] Birden fazla <h1> başlığı tespit edildi (Toplam: ${h1Count}). SEO ve A11y için tek <h1> olmalıdır.`);
  }

  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].level;
    const curr = headings[i].level;

    // Seviye atlama kontrolü (örn. h1'den sonra h3, h2'den sonra h4)
    if (curr > prev + 1) {
      errors.push(
        `[${fileName}] Hiyerarşik başlık atlaması: <h${prev}> ardından doğrudan <h${curr}> kullanılmış (Atlanan: <h${prev + 1}>).`
      );
    }
  }

  return {
    valid: errors.length === 0,
    h1Count,
    headings,
    errors,
  };
}
