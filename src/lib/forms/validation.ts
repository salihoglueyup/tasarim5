/** Türkiye telefon numarasını kullanıcı yazarken "+90 5XX XXX XX XX" kalıbına biçimlendirir. */
export function formatTrPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('90')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)].filter(Boolean);
  return digits ? `+90 ${parts.join(' ')}`.trimEnd() : '';
}

export function isValidTrPhone(phone: string): boolean {
  return /^\+90 5\d{2} \d{3} \d{2} \d{2}$/.test(phone);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
