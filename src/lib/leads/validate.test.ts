import { describe, it, expect } from 'vitest';
import { validateLead, normalizePhone } from './validate';

describe('normalizePhone', () => {
  it('rakam dışı karakterleri temizler, baştaki + korunur', () => {
    expect(normalizePhone('+90 (216) 550 48 48')).toBe('+902165504848');
    expect(normalizePhone('0555 123 45 67')).toBe('05551234567');
  });
});

describe('validateLead', () => {
  it('geçersiz tip reddeder', () => {
    expect(validateLead({ type: 'spam' }).valid).toBe(false);
    expect(validateLead(null).valid).toBe(false);
  });

  it('contact: ad + (telefon veya e-posta) zorunlu', () => {
    expect(validateLead({ type: 'contact', name: 'Ali' }).errorKey).toBe('lead_error_contact');
    expect(validateLead({ type: 'contact', phone: '05551234567' }).errorKey).toBe('lead_error_required');
    const ok = validateLead({ type: 'contact', name: 'Ali', phone: '0555 123 45 67' });
    expect(ok.valid).toBe(true);
    expect(ok.lead?.phone).toBe('05551234567');
  });

  it('newsletter: geçerli e-posta zorunlu', () => {
    expect(validateLead({ type: 'newsletter', email: 'bad' }).errorKey).toBe('lead_error_email');
    expect(validateLead({ type: 'newsletter', email: 'a@b.com' }).valid).toBe(true);
  });

  it('callback: ad + telefon zorunlu', () => {
    expect(validateLead({ type: 'callback', name: 'Ali' }).errorKey).toBe('lead_error_required');
    expect(validateLead({ type: 'callback', name: 'Ali', phone: '05551234567' }).valid).toBe(true);
  });

  it('kısa telefon reddedilir', () => {
    expect(validateLead({ type: 'callback', name: 'Ali', phone: '123' }).errorKey).toBe('lead_error_phone');
  });

  it('alanları trim eder ve meta objesini geçirir', () => {
    const r = validateLead({ type: 'contact', name: '  Ali  ', email: 'a@b.com', meta: { k: 'v' } });
    expect(r.lead?.name).toBe('Ali');
    expect(r.lead?.meta).toEqual({ k: 'v' });
  });
});
