import { describe, it, expect } from 'vitest';
import { waLink, WHATSAPP_NUMBER } from './cro';

describe('waLink', () => {
  it('numarayı içeren wa.me bağlantısı üretir', () => {
    expect(waLink()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
  });

  it('metni URL-encode ederek ekler', () => {
    const link = waLink('Merhaba dünya');
    expect(link).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Merhaba%20d%C3%BCnya`);
  });

  it('WHATSAPP_NUMBER yalnız rakamlardan oluşur', () => {
    expect(WHATSAPP_NUMBER).toMatch(/^\d+$/);
  });
});
