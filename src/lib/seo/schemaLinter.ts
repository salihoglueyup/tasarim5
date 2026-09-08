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

export interface SchemaGraphLintReport {
  totalNodes: number;
  validNodes: number;
  overallScore: number;
  isGraphValid: boolean;
  nodeReports: SchemaLintReport[];
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

  // @context kontrolü (üst düzey nesneler için zorunlu, iç içe veya graphsız tekiller)
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

    case 'ItemList': {
      if (!Array.isArray(schema.itemListElement) || schema.itemListElement.length === 0) {
        issues.push({
          field: 'itemListElement',
          message: "ItemList şemasında 'itemListElement' dizisi boş olamaz (Google Search Console 'Missing field itemListElement' hatası)",
          severity: 'ERROR',
        });
        score -= 50;
      } else {
        schema.itemListElement.forEach((item: any, i: number) => {
          if (item['@type'] === 'ListItem' && typeof item.position !== 'number') {
            issues.push({
              field: `itemListElement[${i}].position`,
              message: 'ListItem öğelerinde sıralı pozisyon (position) numarası önerilir',
              severity: 'WARNING',
            });
            score -= 5;
          }
        });
      }
      break;
    }

    case 'BreadcrumbList': {
      if (!Array.isArray(schema.itemListElement) || schema.itemListElement.length === 0) {
        issues.push({
          field: 'itemListElement',
          message: 'BreadcrumbList şemasında en az 1 adet gezinme basamağı (ListItem) bulunmalıdır',
          severity: 'ERROR',
        });
        score -= 40;
      } else {
        schema.itemListElement.forEach((item: any, i: number) => {
          if (!item.name && !item.item?.name) {
            issues.push({
              field: `itemListElement[${i}].name`,
              message: 'Breadcrumb öğesinde isim (name) eksik',
              severity: 'ERROR',
            });
            score -= 10;
          }
        });
      }
      break;
    }

    case 'Organization':
    case 'Corporation': {
      if (!schema.name && !schema.legalName) {
        issues.push({ field: 'name', message: 'Kuruluş adı (name) veya yasal unvan (legalName) zorunludur', severity: 'ERROR' });
        score -= 30;
      }
      if (!schema.url) {
        issues.push({ field: 'url', message: 'Kuruluş web adresi (url) zorunludur', severity: 'ERROR' });
        score -= 20;
      }
      if (!schema.logo) {
        issues.push({ field: 'logo', message: 'Kuruluş logosu (logo) önerilir', severity: 'WARNING' });
        score -= 10;
      }
      break;
    }

    case 'Article':
    case 'BlogPosting':
    case 'NewsArticle': {
      if (!schema.headline && !schema.name) {
        issues.push({ field: 'headline', message: 'Makale başlığı (headline) zorunludur', severity: 'ERROR' });
        score -= 30;
      }
      if (!schema.author) {
        issues.push({ field: 'author', message: 'Makale yazarı (author) zorunludur', severity: 'ERROR' });
        score -= 20;
      }
      if (!schema.datePublished) {
        issues.push({ field: 'datePublished', message: 'Yayınlanma tarihi (datePublished) zorunludur', severity: 'ERROR' });
        score -= 15;
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

/**
 * Birden fazla Schema.org nesnesini veya @graph ağacını denetler.
 */
export function lintSchemaGraph(payload: any): SchemaGraphLintReport {
  if (!payload || typeof payload !== 'object') {
    return {
      totalNodes: 0,
      validNodes: 0,
      overallScore: 0,
      isGraphValid: false,
      nodeReports: [],
    };
  }

  let nodes: any[] = [];
  if (Array.isArray(payload)) {
    nodes = payload;
  } else if (Array.isArray(payload['@graph'])) {
    nodes = payload['@graph'];
  } else {
    nodes = [payload];
  }

  const nodeReports: SchemaLintReport[] = nodes.map((node) => {
    const context = node['@context'] || payload['@context'] || 'https://schema.org';
    return lintSchemaOrgObject({ ...node, '@context': context });
  });

  const validNodes = nodeReports.filter((r) => r.isValid).length;
  const totalScore = nodeReports.reduce((acc, r) => acc + r.score, 0);
  const overallScore = nodeReports.length > 0 ? Math.round(totalScore / nodeReports.length) : 0;
  const isGraphValid = nodeReports.every((r) => r.isValid);

  return {
    totalNodes: nodeReports.length,
    validNodes,
    overallScore,
    isGraphValid,
    nodeReports,
  };
}
