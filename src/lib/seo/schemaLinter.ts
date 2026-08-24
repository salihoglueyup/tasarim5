export interface SchemaLintIssue {
  field: string;
  message: string;
  severity: 'ERROR' | 'WARNING';
}

export interface SchemaLintReport {
  schemaType: string;
  isValid: boolean;
  score: number; // 0 - 100
  issues: SchemaLintIssue[];
  googleRichResultsCompliant: boolean;
}

/**
 * Schema.org nesnesini Google Search Central Zengin Sonuç (Rich Snippet) kurallarına göre doğrular.
 */
export function lintSchemaOrgObject(schema: any): SchemaLintReport {
  if (!schema || typeof schema !== 'object') {
    return {
      schemaType: 'Unknown',
      isValid: false,
      score: 0,
      issues: [{ field: '@type', message: 'Şema nesnesi geçersiz veya boş', severity: 'ERROR' }],
      googleRichResultsCompliant: false,
    };
  }

  const type = schema['@type'] || 'Thing';
  const issues: SchemaLintIssue[] = [];
  let score = 100;

  // @context kontrolü
  if (!schema['@context'] || !schema['@context'].includes('schema.org')) {
    issues.push({ field: '@context', message: '@context alanı "https://schema.org" olmalıdır', severity: 'ERROR' });
    score -= 20;
  }

  // Şema tipine özel kurallar
  switch (type) {
    case 'FAQPage': {
      if (!Array.isArray(schema.mainEntity) || schema.mainEntity.length === 0) {
        issues.push({ field: 'mainEntity', message: 'FAQPage şemasında en az 1 adet soru (Question) bulunmalıdır', severity: 'ERROR' });
        score -= 40;
      } else {
        schema.mainEntity.forEach((q: any, i: number) => {
          if (!q.name) {
            issues.push({ field: `mainEntity[${i}].name`, message: 'Soru başlığı (name) eksik', severity: 'ERROR' });
            score -= 10;
          }
          if (!q.acceptedAnswer?.text) {
            issues.push({ field: `mainEntity[${i}].acceptedAnswer.text`, message: 'Cevap metni (text) eksik', severity: 'ERROR' });
            score -= 10;
          }
        });
      }
      break;
    }

    case 'Service':
    case 'ProfessionalService': {
      if (!schema.name && !schema.serviceType) {
        issues.push({ field: 'name', message: 'Hizmet adı (name) veya serviceType eksik', severity: 'ERROR' });
        score -= 30;
      }
      if (!schema.description) {
        issues.push({ field: 'description', message: 'Hizmet açıklaması (description) önerilir', severity: 'WARNING' });
        score -= 10;
      }
      break;
    }

    case 'Legislation': {
      if (!schema.name) {
        issues.push({ field: 'name', message: 'Mevzuat adı eksik', severity: 'ERROR' });
        score -= 30;
      }
      if (!schema.legislationIdentifier) {
        issues.push({ field: 'legislationIdentifier', message: 'Mevzuat madde/karar numarası eksik', severity: 'WARNING' });
        score -= 15;
      }
      break;
    }

    case 'LocalBusiness': {
      if (!schema.name) {
        issues.push({ field: 'name', message: 'İşletme adı eksik', severity: 'ERROR' });
        score -= 30;
      }
      if (!schema.address) {
        issues.push({ field: 'address', message: 'Adres (address) alanı zorunludur', severity: 'ERROR' });
        score -= 25;
      }
      break;
    }
  }

  const hasErrors = issues.some((i) => i.severity === 'ERROR');

  return {
    schemaType: type,
    isValid: !hasErrors,
    score: Math.max(0, score),
    issues,
    googleRichResultsCompliant: !hasErrors && score >= 80,
  };
}
