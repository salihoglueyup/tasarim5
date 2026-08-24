import { describe, it, expect } from 'vitest';
import { verifySearchBot } from '@/lib/seo/botVerifier';
import { runFacilitySeoPatrol } from '@/lib/seo/facilitySeoPatrol';
import { synthesizeDistrictFacilityFaq } from '@/lib/seo/facilityFaqSynthesizer';
import { cleanJsonLd, minifyJsonLd, calculateSchemaCompressionSavings } from '@/lib/seo/schemaMinifier';
import { VERIFIED_AUTHORITY_CREDENTIALS, generateVerifiedAuthorityGraph } from '@/lib/seo/eeatAuditor';

describe('5 Derin Arka Plan (Backend) SEO Motoru Testleri', () => {
  describe('Doğrulanmış Bot Önceliklendirme Motoru (botVerifier.ts)', () => {
    it('Resmi Googlebot imzasını ve hostname doğrulaması ile Fast-Lane verir', () => {
      const result = verifySearchBot(
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'crawl-66-249-66-1.googlebot.com'
      );

      expect(result.isBot).toBe(true);
      expect(result.botName).toBe('Googlebot');
      expect(result.isVerifiedSearchEngine).toBe(true);
      expect(result.allowFastLane).toBe(true);
    });

    it('Sahte Googlebot imzasını tespit eder ve Fast-Lane vermez', () => {
      const spoofResult = verifySearchBot(
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'attacker.dynamic-ip.net'
      );

      expect(spoofResult.isBot).toBe(true);
      expect(spoofResult.isVerifiedSearchEngine).toBe(false);
      expect(spoofResult.allowFastLane).toBe(false);
    });
  });

  describe('Arka Plan SEO Sağlık Devriyesi (facilitySeoPatrol.ts)', () => {
    it('39 ilçe ve ana hizmet sayfalarının başlık, açıklama ve anahtar kelime sağlığını denetler', () => {
      const report = runFacilitySeoPatrol();

      expect(report.totalPagesAudited).toBeGreaterThanOrEqual(45);
      expect(report.averageScore).toBeGreaterThanOrEqual(80);
      expect(report.targetKeywordDominance).toBeGreaterThanOrEqual(80);
      expect(report.pages.some((p) => p.path === '/bolgeler/kadikoy/tesis-yonetimi')).toBe(true);
    });
  });

  describe('Akıllı İlçe Dinamik SSS Sentezleyici (facilityFaqSynthesizer.ts)', () => {
    it('İlçeye özel hiper-yerel FAQPage şeması ve sorular üretir', () => {
      const kadikoyFaq = synthesizeDistrictFacilityFaq('kadikoy');
      expect(kadikoyFaq.districtName).toBe('Kadıköy');
      expect(kadikoyFaq.faqs.length).toBeGreaterThanOrEqual(3);
      expect(kadikoyFaq.schema['@type']).toBe('FAQPage');

      const basaksehirFaq = synthesizeDistrictFacilityFaq('basaksehir');
      expect(basaksehirFaq.districtName).toBe('Başakşehir');
      expect(basaksehirFaq.faqs.some((f) => f.topic === 'SECURITY_5188')).toBe(true);
    });
  });

  describe('Edge JSON-LD Şema Sıkıştırıcı (schemaMinifier.ts)', () => {
    it('Null ve boş string değerleri temizler ve JSON boyutunu küçültür', () => {
      const dirtySchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Tesis Yönetimi',
        emptyField: null,
        blankField: '',
        nested: {
          valid: 'Evet',
          unwanted: undefined,
        },
      };

      const cleaned = cleanJsonLd(dirtySchema) as Record<string, any>;
      expect(cleaned.emptyField).toBeUndefined();
      expect(cleaned.blankField).toBeUndefined();
      expect(cleaned.nested.valid).toBe('Evet');
      expect(cleaned.nested.unwanted).toBeUndefined();

      const minified = minifyJsonLd(dirtySchema);
      expect(minified).not.toContain('null');
      expect(minified.startsWith('{')).toBe(true);

      const savings = calculateSchemaCompressionSavings(JSON.stringify(dirtySchema, null, 2), minified);
      expect(savings.savingsPercentage).toBeGreaterThan(0);
    });
  });

  describe('E-E-A-T Lisans & Otorite Doğrulama Motoru (eeatAuditor.ts)', () => {
    it('ISO 41001, 5188 Güvenlik ve ISO 27001 belgelerini doğrular', () => {
      expect(VERIFIED_AUTHORITY_CREDENTIALS.length).toBeGreaterThanOrEqual(4);

      const iso41001 = VERIFIED_AUTHORITY_CREDENTIALS.find((c) => c.id === 'iso-41001');
      expect(iso41001?.credentialNumber).toBe('ISO41001-TR-2024-8841');

      const orgGraph = generateVerifiedAuthorityGraph();
      expect(orgGraph['@type']).toBe('Organization');
      expect(orgGraph.hasCredential.length).toBeGreaterThanOrEqual(4);
    });
  });
});
