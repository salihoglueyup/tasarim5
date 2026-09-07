import { describe, it, expect } from 'vitest';
import { formatBrandTitle, buildMetadata } from '@/lib/seo';
import { webSiteSchema, organizationSchema } from '@/lib/schemas/organization';
import { districtSecurityServiceSchema, districtTechnicalServiceSchema } from '@/lib/schemas/services';
import { ORG_NAME, ORG_LEGAL_NAME } from '@/lib/schemas/constants';
import trDict from '@/i18n/locales/tr/common.json';

describe('Marka İsmi ("Alo Yönetim") ve Hukuki Unvan ("Alo Yönetim ve Organizasyon A.Ş.") Standardizasyon Testleri', () => {
  describe('1. formatBrandTitle Fonksiyonu Doğrulaması', () => {
    it('ham başlıktaki hantal tüzel ad ekini ayıklayıp tekil marka adı eklemeli', () => {
      const result = formatBrandTitle('Hakkımızda — Alo Yönetim ve Organizasyon A.Ş.');
      expect(result).toBe('Hakkımızda | Alo Yönetim');
      expect(result).not.toContain('Alo Yönetim ve Organizasyon A.Ş.');
    });

    it('eski uzun marka ekini ("| Alo Yönetim Tesis Yönetimi") tekil "Alo Yönetim" yapmalı', () => {
      const result = formatBrandTitle('Plaza Yönetimi | Alo Yönetim Tesis Yönetimi');
      expect(result).toBe('Plaza Yönetimi | Alo Yönetim');
      expect(result).not.toContain('Tesis Yönetimi |');
    });

    it('çiftlenmiş marka eklerini ("| Alo Yönetim | Alo Yönetim") tekilleştirmeli', () => {
      const result = formatBrandTitle('Ücretsiz Teklif | Alo Yönetim | Alo Yönetim');
      expect(result).toBe('Ücretsiz Teklif | Alo Yönetim');
      expect(result.match(/Alo Yönetim/g)?.length).toBe(1);
    });

    it('marka eki içermeyen ham başlıklara (örn. blog yazısı veya site haritası) standart marka eki eklemeli', () => {
      const postTitle = 'Site Yönetimi Seçerken Nelere Dikkat Edilmeli?';
      expect(formatBrandTitle(postTitle)).toBe(`${postTitle} | Alo Yönetim`);

      const sitemapTitle = 'Site Haritası';
      expect(formatBrandTitle(sitemapTitle)).toBe('Site Haritası | Alo Yönetim');
    });

    it('anasayfa gibi doğrudan marka ile başlayan başlıkları bozmadan korumalı', () => {
      const home1 = 'Alo Yönetim — Profesyonel Tesis Yönetimi';
      expect(formatBrandTitle(home1)).toBe(home1);

      const home2 = 'Alo Yönetim | İstanbul Profesyonel Tesis ve Site Yönetimi';
      expect(formatBrandTitle(home2)).toBe(home2);
    });
  });

  describe('2. buildMetadata Entegrasyonu ve SERP Güvencesi', () => {
    it('buildMetadata çıktısı title, OG, Twitter ve DC etiketlerinde formatBrandTitle uygular', () => {
      const meta = buildMetadata({
        title: 'Bina ve Tesis Yönetimi Hizmetleri — Alo Yönetim ve Organizasyon A.Ş.',
        description: 'İstanbul profesyonel bina ve tesis yönetimi.',
        path: '/hizmetler/tesis-yonetimi',
      });

      const expectedTitle = 'Bina ve Tesis Yönetimi Hizmetleri | Alo Yönetim';
      expect(meta.title).toBe(expectedTitle);
      expect(meta.openGraph?.title).toBe(expectedTitle);
      expect(meta.twitter?.title).toBe(expectedTitle);
      expect((meta.other as any)?.['DC.title']).toBe(expectedTitle);
      expect(meta.openGraph?.siteName).toBe('Alo Yönetim');
    });
  });

  describe('3. Schema.org Yapılandırılmış Veri Ayrımı (Marka vs. Tüzel Unvan)', () => {
    it('WebSite şeması name olarak saf marka adını ("Alo Yönetim") kullanmalı ve alternateName tüzel unvanı içermeli', () => {
      const ws = webSiteSchema();
      expect(ws.name).toBe('Alo Yönetim');
      expect((ws.alternateName as string[])).toContain('Alo Yönetim ve Organizasyon A.Ş.');
    });

    it('Organization şeması name="Alo Yönetim", legalName="Alo Yönetim ve Organizasyon A.Ş." olmalı', () => {
      const org = organizationSchema();
      expect(org.name).toBe(ORG_NAME);
      expect(org.name).toBe('Alo Yönetim');
      expect(org.legalName).toBe(ORG_LEGAL_NAME);
      expect(org.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
    });

    it('Hizmet sağlayıcı şemaları Corporation olarak name="Alo Yönetim", legalName="Alo Yönetim ve Organizasyon A.Ş." içermeli', () => {
      const secSchema = districtSecurityServiceSchema({
        districtName: 'Kadıköy',
        path: '/bolgeler/kadikoy/guvenlik',
      });
      const provider = secSchema.provider as any;
      expect(provider.name).toBe('Alo Yönetim');
      expect(provider.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');

      const engSchema = districtTechnicalServiceSchema({
        districtName: 'Şişli',
        path: '/bolgeler/sisli/teknik-bakim',
      });
      const engProvider = engSchema.provider as any;
      expect(engProvider.name).toBe('Alo Yönetim');
      expect(engProvider.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
    });
  });

  describe('4. Yasal Sözleşmelerde Tüzel Unvan Korunumu', () => {
    it('KVKK, Gizlilik ve Kullanım Şartları gövde metinlerinde veri sorumlusu olarak "Alo Yönetim ve Organizasyon A.Ş." korunmalı', () => {
      expect(trDict.kvkk_p1).toContain('Alo Yönetim ve Organizasyon A.Ş.');
      expect(trDict.gizlilik_p1).toContain('Alo Yönetim ve Organizasyon A.Ş.');
      expect(trDict.kullanim_p1).toContain('Alo Yönetim ve Organizasyon A.Ş.');
    });
  });
});
