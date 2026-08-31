import { describe, it, expect } from 'vitest';
import {
  CANONICAL_NAP,
  generateLocalBusinessJsonLd,
  generateNapGeoJson,
  validateNapIntegrity,
} from './napGuardEngine';
import {
  ORG_NAME,
  ORG_LEGAL_NAME,
  ORG_EMAIL,
  ORG_ADDRESS,
  ORG_ADDRESS_DISPLAY,
  ORG_PHONE,
} from '@/lib/schemas';
import {
  ORG_EMAIL as CONST_ORG_EMAIL,
  ORG_ADDRESS_DISPLAY as CONST_ORG_ADDRESS_DISPLAY,
} from '@/lib/constants';

describe('Merkezi NAP & Yerel SEO Otorite Sistemi (napGuardEngine)', () => {
  it('CANONICAL_NAP verisi tüm format ve bütünlük testlerinden 0 hata ile geçer', () => {
    const result = validateNapIntegrity(CANONICAL_NAP);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('Resmi şirket unvanı ve MERSİS numarası kanonik kurallara uygundur', () => {
    expect(CANONICAL_NAP.legal.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
    expect(CANONICAL_NAP.legal.brandName).toBe('Alo Yönetim');
    expect(CANONICAL_NAP.legal.mersisNumber).toBe('0054049823100018');
    expect(CANONICAL_NAP.legal.taxOffice).toBe('Kadıköy');
    expect(CANONICAL_NAP.legal.tradeRegistryNumber).toBe('712498-5');
    expect(CANONICAL_NAP.legal.foundingYear).toBe(2009);
  });

  it('Adres ve posta kodu bilgileri Kadıköy merkez ofis ile tam uyumludur', () => {
    expect(CANONICAL_NAP.address.streetAddress).toBe('Misak-ı Milli Sok. No:94A');
    expect(CANONICAL_NAP.address.addressLocality).toBe('Kadıköy');
    expect(CANONICAL_NAP.address.addressRegion).toBe('İstanbul');
    expect(CANONICAL_NAP.address.postalCode).toBe('34714');
    expect(CANONICAL_NAP.address.addressCountry).toBe('TR');
    expect(CANONICAL_NAP.address.fullDisplayAddress).toBe(
      'Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy/İstanbul'
    );
  });

  it('İletişim numaraları ve e-postalar standart formatlardadır', () => {
    expect(CANONICAL_NAP.contact.phoneE164).toBe('+902165504848');
    expect(CANONICAL_NAP.contact.phoneDisplay).toBe('0216 550 48 48');
    expect(CANONICAL_NAP.contact.email).toBe('info@aloyonetim.com.tr');
    expect(CANONICAL_NAP.contact.privacyEmail).toBe('kvkk@aloyonetim.com.tr');
    expect(CANONICAL_NAP.contact.securityEmail).toBe('security@aloyonetim.com.tr');
  });

  it('GPS koordinatları Kadıköy Osmanağa bölgesine kilitlidir', () => {
    expect(CANONICAL_NAP.geo.latitude).toBeCloseTo(40.9904, 2);
    expect(CANONICAL_NAP.geo.longitude).toBeCloseTo(29.0305, 2);
    expect(CANONICAL_NAP.geo.googleMapsPlaceUrl).toContain('Osmana%C4%9Fa');
  });

  it('generateLocalBusinessJsonLd geçerli bir Schema.org ProfessionalService nesnesi üretir', () => {
    const schema = generateLocalBusinessJsonLd();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('ProfessionalService');
    expect(schema.name).toBe('Alo Yönetim');
    expect(schema.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
    expect(schema.address.streetAddress).toBe('Misak-ı Milli Sok. No:94A');
    expect(schema.address.postalCode).toBe('34714');
    expect(schema.geo.latitude).toBe(40.9904);
    expect(schema.geo.longitude).toBe(29.0305);
    expect(schema.openingHoursSpecification).toHaveLength(2);
    expect(schema.areaServed.name).toBe('İstanbul');
  });

  it('generateNapGeoJson harita motorları için GeoJSON Point nesnesi üretir', () => {
    const geoJson = generateNapGeoJson();
    expect(geoJson.type).toBe('Feature');
    expect(geoJson.geometry.type).toBe('Point');
    // GeoJSON [longitude, latitude] sırasını kullanır
    expect(geoJson.geometry.coordinates).toEqual([29.0305, 40.9904]);
    expect(geoJson.properties.address).toContain('34714 Kadıköy/İstanbul');
    expect(geoJson.properties.mersisNumber).toBe('0054049823100018');
  });

  it('schemas.ts ve constants.ts sabitleri CANONICAL_NAP ile %100 birebir örtüşür', () => {
    expect(ORG_NAME).toBe(CANONICAL_NAP.legal.brandName);
    expect(ORG_LEGAL_NAME).toBe(CANONICAL_NAP.legal.legalName);
    expect(ORG_EMAIL).toBe(CANONICAL_NAP.contact.email);
    expect(CONST_ORG_EMAIL).toBe(CANONICAL_NAP.contact.email);
    expect(ORG_PHONE).toBe(CANONICAL_NAP.contact.phoneE164);
    expect(ORG_ADDRESS.streetAddress).toBe(CANONICAL_NAP.address.streetAddress);
    expect(ORG_ADDRESS.postalCode).toBe(CANONICAL_NAP.address.postalCode);
    expect(ORG_ADDRESS_DISPLAY).toBe(CANONICAL_NAP.address.fullDisplayAddress);
    expect(CONST_ORG_ADDRESS_DISPLAY).toBe(CANONICAL_NAP.address.fullDisplayAddress);
  });
});
