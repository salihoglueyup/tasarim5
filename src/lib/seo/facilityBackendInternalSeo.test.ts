import { describe, it, expect } from 'vitest';
import { buildFacilityAuthorityCorpus } from './facilityAuthorityCorpusEngine';
import { generateFacilityMeshLinks } from './facilityMeshLinkerEngine';
import { buildFacilityVoiceKnowledge } from './facilityVoiceKnowledgeEngine';
import { auditFacilityPageSeoHealth } from './facilityAutonomousSeoAuditor';

describe('Tesis Yönetimi Backend İç SEO ve Semantik Otorite Motorları Test Paketi', () => {
  describe('1. Semantik Otorite ve Derin Bilgi Külliyatı (facilityAuthorityCorpusEngine.ts)', () => {
    it('KMK 634, ISO 41001 ve 5188 kanunlarını eksiksiz derler', () => {
      const corpus = buildFacilityAuthorityCorpus('tr');
      expect(corpus).toBeDefined();
      expect(corpus.authorityEntity.name).toBe('Alo Yönetim');
      expect(corpus.legalFramework.kmk634Articles.length).toBeGreaterThanOrEqual(5);

      // KMK 20 ve 37. maddelerin varlığını doğrula
      const art20 = corpus.legalFramework.kmk634Articles.find(a => a.articleNumber === 20);
      expect(art20).toBeDefined();
      expect(art20?.practicalApplication).toContain('%5 gecikme tazminatı');

      const art37 = corpus.legalFramework.kmk634Articles.find(a => a.articleNumber === 37);
      expect(art37).toBeDefined();
      expect(art37?.practicalApplication).toContain('7 gün');
    });

    it('5 alt sektör ve 39 ilçenin tamamını yapılandırılmış matrise dahil eder', () => {
      const corpus = buildFacilityAuthorityCorpus('tr');
      expect(corpus.subSectors.length).toBe(5);
      expect(corpus.districtMatrix.length).toBe(39);
      expect(corpus.provenMetrics.averageCostReductionPercent).toBe(30);
      expect(corpus.provenMetrics.activeFacilityPortfolioCount).toBeGreaterThanOrEqual(100);
    });
  });

  describe('2. Dinamik İç Bağlantı Ağı ve PageRank Motoru (facilityMeshLinkerEngine.ts)', () => {
    it('Amiral gemisi, 5 alt sektör, odak ilçeler ve hukuki araçları birbirine bağlar', () => {
      const mesh = generateFacilityMeshLinks('/hizmetler/tesis-yonetimi', 'tr');
      expect(mesh.flagshipHub.url).toContain('/hizmetler/tesis-yonetimi');
      expect(mesh.subSectors.length).toBe(5);
      expect(mesh.priorityDistricts.length).toBeGreaterThanOrEqual(6);
      expect(mesh.authoritativeLegalGuides.length).toBeGreaterThanOrEqual(3);
      expect(mesh.totalConnectedNodesCount).toBeGreaterThanOrEqual(15);
    });

    it('İngilizce dil seçeneğinde localized link ve anchor text üretir', () => {
      const meshEn = generateFacilityMeshLinks('/hizmetler/tesis-yonetimi', 'en');
      expect(meshEn.flagshipHub.url).toContain('/en/hizmetler/tesis-yonetimi');
      expect(meshEn.subSectors[0].url).toContain('/en/hizmetler/tesis-yonetimi/rezidans-site-yonetimi');
    });
  });

  describe('3. Sesli Arama (Voice Search) ve AI Yanıt Motoru (facilityVoiceKnowledgeEngine.ts)', () => {
    it('SpeakableSpecification ve QAPage Schema.org linked-data üretir', () => {
      const voice = buildFacilityVoiceKnowledge('tr');
      expect(voice.totalQuestionsCount).toBeGreaterThanOrEqual(6);
      expect(voice.speakableSchemaJsonLd['@type']).toBe('QAPage');
      expect(voice.speakableSchemaJsonLd.speakable['@type']).toBe('SpeakableSpecification');
    });

    it('Yönetici aidat muafiyeti ve işletme projesi itiraz sorularını içerir', () => {
      const voice = buildFacilityVoiceKnowledge('tr');
      const q1 = voice.questions.find(q => q.id === 'kmk-yonetici-aidat-muafiyeti');
      expect(q1).toBeDefined();
      expect(q1?.speakableAnswer).toContain('Madde 40');

      const q2 = voice.questions.find(q => q.id === 'kmk-isletme-projesi-itiraz-suresi');
      expect(q2).toBeDefined();
      expect(q2?.speakableAnswer).toContain('7 gün');
    });
  });

  describe('4. Otonom İç SEO Sağlık & SERP Denetçi Motoru (facilityAutonomousSeoAuditor.ts)', () => {
    it('Tesis Yönetimi sayfasını denetleyip en az 90/100 (A+) kalite skoru verir', () => {
      const report = auditFacilityPageSeoHealth('tr');
      expect(report.overallScore).toBeGreaterThanOrEqual(90);
      expect(report.grade).toBe('A+');
      expect(report.checklists.length).toBe(5);

      // Tüm kategorilerin başarıyla geçtiğini doğrula
      const passedItems = report.checklists.filter(c => c.status === 'passed');
      expect(passedItems.length).toBeGreaterThanOrEqual(4);
    });
  });
});
