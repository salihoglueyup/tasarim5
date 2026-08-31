import { describe, it, expect } from 'vitest';
import {
  SITE_LSI_GROUPS,
  FACILITY_LSI_GROUPS,
  ALL_LSI_GROUPS,
  analyzeDomainSemanticDepth,
  getLsiGroupCoverage,
  getMissingLsiTermsByGroup,
  getTopicalDepthGrade,
  generateSemanticContentBriefing,
  comparePageSemanticDepth,
} from './domainSemanticAuditor';

describe('Semantik LSI & Topikal Derinlik Analizcisi (domainSemanticAuditor.test.ts)', () => {
  describe('1. LSI Grup Tanımları ve Veri Bütünlüğü (Faz 11-33)', () => {
    it('Site Yönetimi LSI 8 grubu ve 100+ terimi eksiksiz içerir', () => {
      expect(SITE_LSI_GROUPS.length).toBe(8);
      const totalSiteTerms = SITE_LSI_GROUPS.reduce((acc, g) => acc + g.terms.length, 0);
      expect(totalSiteTerms).toBeGreaterThanOrEqual(100);

      const legalGroup = SITE_LSI_GROUPS.find((g) => g.groupName.includes('Hukuki'));
      expect(legalGroup).toBeDefined();
      expect(legalGroup?.terms).toContain('kat mülkiyeti');
      expect(legalGroup?.terms).toContain('bağımsız bölüm');

      const accountingGroup = SITE_LSI_GROUPS.find((g) => g.groupName.includes('Finansal'));
      expect(accountingGroup).toBeDefined();
      expect(accountingGroup?.terms).toContain('işletme projesi');
      expect(accountingGroup?.terms).toContain('aidat makbuzu');
    });

    it('Tesis Yönetimi LSI 6 grubu ve 80+ terimi eksiksiz içerir', () => {
      expect(FACILITY_LSI_GROUPS.length).toBe(6);
      const totalFacilityTerms = FACILITY_LSI_GROUPS.reduce((acc, g) => acc + g.terms.length, 0);
      expect(totalFacilityTerms).toBeGreaterThanOrEqual(80);

      const isoGroup = FACILITY_LSI_GROUPS.find((g) => g.groupName.includes('ISO'));
      expect(isoGroup).toBeDefined();
      expect(isoGroup?.terms).toContain('iso 41001 sertifikası');

      const plazaGroup = FACILITY_LSI_GROUPS.find((g) => g.groupName.includes('Plaza'));
      expect(plazaGroup).toBeDefined();
      expect(plazaGroup?.terms).toContain('plaza ortak gider');
    });

    it('Toplam LSI havuzu 14 gruptan oluşur', () => {
      expect(ALL_LSI_GROUPS.length).toBe(14);
    });
  });

  describe('2. analyzeDomainSemanticDepth Çekirdek Motor Testleri (Faz 34-44)', () => {
    it('Boş içerik için düşük puan ve D notu üretir', () => {
      const report = analyzeDomainSemanticDepth({
        pillar: 'site',
        title: '',
        content: '',
      });

      expect(report.topicalDepthScore).toBeLessThan(50);
      expect(report.grade).toBe('D');
      expect(report.topicalGaps.length).toBeGreaterThan(0);
    });

    it('Zengin ve LSI terimleriyle donatılmış Site Yönetimi içeriği için yüksek puan ve A/A+ notu üretir', () => {
      const content = `
        634 sayılı KMK kapsamında kat mülkiyeti ve bağımsız bölüm haklarının korunması esastır.
        İşletme projesi, yıllık bütçe ve aidat makbuzu düzenli olarak denetlenir.
        Asansör periyodik kontrolü, jeneratör bakımı ve yangın tüpü dolumu teknik ekiplerimizce yapılır.
        5188 kimlik kartı sahibi güvenlik personeli, güvenlik kamera sistemi ve araç bariyer sistemi ile 7/24 huzur sağlar.
        Peyzaj bakımı, sulama sistemi ve ortak alan temizliği periyodik olarak yürütülür.
        Dijital aidat ödeme ve mobil uygulama yönetim altyapısıyla şeffaf site yönetimi.
        Toplu yapı blok yönetimi ve rezidans konsiyerj hizmetleri sunmaktayız.
      `;

      const report = analyzeDomainSemanticDepth({
        pillar: 'site',
        title: 'İstanbul Profesyonel Site Yönetimi Şirketi',
        h1: 'Site Yönetimi ve Apartman Yönetim Hizmetleri',
        content,
        wordCount: 350,
      });

      expect(report.topicalDepthScore).toBeGreaterThanOrEqual(80);
      expect(['A', 'A+']).toContain(report.grade);
      expect(report.detectedLsiTerms).toContain('kat mülkiyeti');
      expect(report.detectedLsiTerms).toContain('işletme projesi');
      expect(report.detectedLsiTerms).toContain('5188 kimlik kartı');
      expect(report.lsiCoveragePercent).toBeGreaterThanOrEqual(15);
    });

    it('Tesis yönetimi dikeyinde ISO 41001, plaza ve BMS terimlerini tespit eder', () => {
      const content = `
        ISO 41001 sertifikası ile entegre tesis yönetimi ve ISO 9001 kalite standartları.
        Önleyici bakım planı, arıza oranı kpi ve bms entegrasyonu ile enerji verimliliği.
        Tesis yönetim şartnamesi ve sla kpi takibi ile plaza ortak gider optimizasyonu.
        Sanayi tesisi için yükleme boşaltma rampası ve isg uzmanı risk değerlendirme raporu.
      `;

      const report = analyzeDomainSemanticDepth({
        pillar: 'facility',
        title: 'Entegre Tesis Yönetimi ve İşletmeciliği',
        h1: 'Plaza ve Tesis Yönetim Hizmetleri',
        content,
        wordCount: 300,
      });

      expect(report.detectedLsiTerms).toContain('iso 41001 sertifikası');
      expect(report.detectedLsiTerms).toContain('önleyici bakım planı');
      expect(report.detectedLsiTerms).toContain('bms entegrasyonu');
      expect(report.topicalDepthScore).toBeGreaterThanOrEqual(70);
    });
  });

  describe('3. Yardımcı Fonksiyonlar ve Raporlama (Faz 45-49)', () => {
    it('getLsiGroupCoverage grup bazında kapsam oranlarını listeler', () => {
      const coverages = getLsiGroupCoverage('site', 'kat mülkiyeti, işletme projesi');
      expect(coverages.length).toBe(8);
      const legal = coverages.find((c) => c.groupName.includes('Hukuki'));
      expect(legal?.detectedCount).toBeGreaterThan(0);
    });

    it('getMissingLsiTermsByGroup eksik terimleri grup isimleriyle döner', () => {
      const missing = getMissingLsiTermsByGroup('facility', 'sadece kısa metin');
      expect(Object.keys(missing).length).toBe(6);
    });

    it('getTopicalDepthGrade doğru harf notu dönüşümü yapar', () => {
      expect(getTopicalDepthGrade(95)).toBe('A+');
      expect(getTopicalDepthGrade(85)).toBe('A');
      expect(getTopicalDepthGrade(70)).toBe('B');
      expect(getTopicalDepthGrade(55)).toBe('C');
      expect(getTopicalDepthGrade(30)).toBe('D');
    });

    it('generateSemanticContentBriefing aksiyon odaklı içerik brifingi üretir', () => {
      const briefing = generateSemanticContentBriefing({
        pillar: 'site',
        title: 'Örnek Başlık',
        content: 'Kısa içerik',
      });

      expect(briefing.length).toBeGreaterThan(2);
      expect(briefing[0]).toContain('HEDEF DİKEY');
    });

    it('comparePageSemanticDepth iki sayfayı karşılaştırıp kazananı belirler', () => {
      const page1 = {
        pillar: 'site' as const,
        title: 'Zengin Site Yönetimi Sayfası',
        content: '634 sayılı KMK kat mülkiyeti, bağımsız bölüm, işletme projesi, 5188 kimlik kartı, peyzaj bakımı, asansör periyodik kontrolü.',
        wordCount: 400,
      };

      const page2 = {
        pillar: 'site' as const,
        title: 'Zayıf Sayfa',
        content: 'Sadece site yönetimi yapıyoruz.',
        wordCount: 30,
      };

      const comparison = comparePageSemanticDepth(page1, page2);
      expect(comparison.winner).toBe('page1');
      expect(comparison.diff).toBeGreaterThan(20);
    });
  });
});
