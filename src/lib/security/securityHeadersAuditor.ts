export interface HeaderCheckResult {
  header: string;
  expectedValue?: string;
  foundValue?: string;
  present: boolean;
  valid: boolean;
}

export interface SecurityAuditReport {
  isFullySecure: boolean;
  score: number; // 0 - 100
  checks: HeaderCheckResult[];
}

const REQUIRED_SECURITY_HEADERS = [
  { header: 'X-Content-Type-Options', expectedPattern: /nosniff/i },
  { header: 'X-Frame-Options', expectedPattern: /DENY|SAMEORIGIN/i },
  { header: 'Referrer-Policy', expectedPattern: /strict-origin-when-cross-origin/i },
  { header: 'Strict-Transport-Security', expectedPattern: /max-age=\d+/i },
  { header: 'Permissions-Policy', expectedPattern: /camera=\(\)/i },
  { header: 'Content-Security-Policy', expectedPattern: /frame-ancestors\s+'none'/i },
];

/**
 * Faz 198: OWASP & Mozilla Observatory Standartlarında Güvenlik Başlığı Denetimi
 */
export function auditSecurityHeaders(headers: Headers | Map<string, string> | Record<string, string>): SecurityAuditReport {
  const getHeader = (name: string): string | undefined => {
    if (typeof (headers as Headers).get === 'function') {
      return (headers as Headers).get(name) || (headers as Headers).get(name.toLowerCase()) || undefined;
    }
    if (typeof (headers as Map<string, string>).get === 'function') {
      return (headers as Map<string, string>).get(name) || (headers as Map<string, string>).get(name.toLowerCase());
    }
    const rec = headers as Record<string, string>;
    return rec[name] || rec[name.toLowerCase()];
  };

  const checks: HeaderCheckResult[] = [];
  let passedCount = 0;

  for (const item of REQUIRED_SECURITY_HEADERS) {
    const val = getHeader(item.header);
    const present = Boolean(val);
    const valid = present && item.expectedPattern.test(val!);

    if (valid) passedCount++;

    checks.push({
      header: item.header,
      foundValue: val,
      present,
      valid,
    });
  }

  const score = Math.round((passedCount / REQUIRED_SECURITY_HEADERS.length) * 100);

  return {
    isFullySecure: score === 100,
    score,
    checks,
  };
}
