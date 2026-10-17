import { describe, it, expect } from 'vitest';
import { getPillarTitleTemplate, getPillarDescriptionTemplate } from './audits/domainKeywordsTaxonomy';
import { getFacilitySerpMeta } from './facility/facilitySerpOptimizer';
import { districtSecurityServiceSchema } from '@/lib/schemas/services';
import { getDistrict } from '@/data/districts';
import fs from 'fs';
import path from 'path';

describe('GSC Batch 2 High-Impact Query Opportunities', () => {
  describe('1. District Security Companies Cluster (Büyükçekmece, Silivri, Arnavutköy, Çatalca, Bakırköy)', () => {

    it('ServiceDistrictPage isSecurity durumunda başlık ve H1 çoğul arama niyetini (Güvenlik Şirketleri) tam karşılamalı', () => {
      const servicePageSource = fs.readFileSync(
        path.join(process.cwd(), 'src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx'),
        'utf8'
      );

      // Meta title checks
      expect(servicePageSource).toContain('${district.name} Güvenlik Şirketleri — 5188 Lisanslı Özel Güvenlik');
      // pageHeaderTitle (H1) checks
      expect(servicePageSource).toContain('pageHeaderTitle = `${district.name} Güvenlik Şirketleri — 5188 Lisanslı Özel Güvenlik ve Koruma`');
      // H2 checks
      expect(servicePageSource).toContain('${district.name}\'de 5188 Lisanslı Güvenlik Şirketleri Arasında Neden Alo Yönetim?');
    });

    it('DistrictSecurityAuditTableSeo bileşeni çoğul güvenlik şirketleri arama terimine optimize edilmiş olmalı', () => {
      const auditTableSource = fs.readFileSync(
        path.join(process.cwd(), 'src/components/seo/district/DistrictSecurityAuditTableSeo.tsx'),
        'utf8'
      );

      expect(auditTableSource).toContain('${districtName} Güvenlik Şirketleri — 5188 Özel Güvenlik');
      expect(auditTableSource).toContain('{districtName} Güvenlik Şirketleri Seçim ve Denetim Standartları');
    });
  });

  describe('2. Başakşehir Site Yönetimi & İlçe Yönetim Sayfaları (Poz 10.6 -> Top 3)', () => {
    it('getPillarTitleTemplate hybrid ve site modunda hem Tesis hem Site Yönetimi hedeflerini tam karşılamalı', () => {
      const basaksehirHybrid = getPillarTitleTemplate('hybrid', 'Başakşehir');
      expect(basaksehirHybrid).toBe('Başakşehir Tesis Yönetimi & Site Yönetimi | Alo Yönetim');

      const basaksehirSite = getPillarTitleTemplate('site', 'Başakşehir');
      expect(basaksehirSite).toBe('Başakşehir Profesyonel Site ve Apartman Yönetimi Şirketi | Alo Yönetim');
    });

    it('getFacilitySerpMeta Başakşehir için hem tesis hem site yönetimi arama niyetini karşılamalı', () => {
      const meta = getFacilitySerpMeta('tr', 'basaksehir');
      expect(meta.title).toContain('Başakşehir Tesis Yönetimi & Site Yönetimi');
      expect(meta.targetKeyword).toBe('Başakşehir site yönetimi');
      expect(meta.description).toContain('apartman, site ve rezidanslar için KMK 634');
    });

  });

  describe('3. Teknik Bakım ve Asansör / Temizlik Sayfaları', () => {
    it('ServiceDistrictPage isTechnical durumunda asansör bakım aramasını hedeflemeli', () => {
      const servicePageSource = fs.readFileSync(
        path.join(process.cwd(), 'src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx'),
        'utf8'
      );

      expect(servicePageSource).toContain('pageHeaderTitle = `${district.name} Asansör Bakımı, Arıza Müdahalesi & Bina Teknik Servis`');
      expect(servicePageSource).toContain('${district.name} Sitelerinde Asansör ve Teknik Bakım');
    });

    it('ServiceDistrictPage isCleaning durumunda apartman temizliği aramasını hedeflemeli', () => {
      const servicePageSource = fs.readFileSync(
        path.join(process.cwd(), 'src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx'),
        'utf8'
      );

      expect(servicePageSource).toContain('pageHeaderTitle = `${district.name} Apartman & Site Temizlik Şirketleri`');
      expect(servicePageSource).toContain('${district.name}\'de Apartman ve Site Temizlik Hizmetleri');
    });
  });

  describe('4. Googlebot İkon Ligature Sızıntısı Koruması (location_on)', () => {
    it('LocationPinSvgIcon saf SVG render etmeli ve sıfır ham metin üretmeli', () => {
      const iconSource = fs.readFileSync(
        path.join(process.cwd(), 'src/components/ui/branding/LocationPinSvgIcon.tsx'),
        'utf8'
      );

      expect(iconSource).toContain('<svg');
      expect(iconSource).toContain('aria-hidden="true"');
      expect(iconSource).toContain('M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7');
    });

  });
});
