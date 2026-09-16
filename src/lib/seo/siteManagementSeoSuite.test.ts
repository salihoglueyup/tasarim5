import { describe, it, expect } from 'vitest';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getGeoFeed } from '@/app/api/tesis-yonetimi/geo-feed.xml/route';
import {
  SERVICES,
  getService,
  getServiceKmkArticles,
  getServiceLongTailKeywords,
  getSiteManagementServiceMatrix
} from '@/data/services';
import { autoLinkHtml } from '@/lib/autoLinker';
import { FACILITY_MANAGEMENT_ENTITIES } from '@/lib/seoEngine';
import { resolveSmartRedirect } from '@/lib/seo/smartRedirect';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';
import { organizationSchema } from '@/lib/schemas';
import {
  SITE_MANAGEMENT_TAXONOMY,
  FACILITY_MANAGEMENT_TAXONOMY,
  LEGAL_FINANCE_TAXONOMY,
  detectPillarIntent,
  getKeywordsByPillar
} from '@/lib/seo/domainKeywordsTaxonomy';
import { analyzeFacilitySerpReadiness } from '@/lib/seo/facilitySearchRankAnalyzer';

describe('Site Yönetimi Anahtar Kelime & Sayfa Optimizasyon Paketi (siteManagementSeoSuite.test.ts)', () => {
  describe('1. Sözlük & Google Featured Snippet (Position Zero) Tanımları (facilityDictionaryData.ts)', () => {
    it('Site Yönetimi, Yönetim Planı, Site Yönetim Kurulu ve Toplu Yapı Yönetimi terimlerini içerir', () => {
      const siteYonetimi = FACILITY_TERMS.find(t => t.termCode === 'site-yonetimi');
      const yonetimPlani = FACILITY_TERMS.find(t => t.termCode === 'yonetim-plani');
      const siteYonetimKurulu = FACILITY_TERMS.find(t => t.termCode === 'site-yonetim-kurulu');
      const topluYapi = FACILITY_TERMS.find(t => t.termCode === 'toplu-yapi-yonetimi');

      expect(siteYonetimi).toBeDefined();
      expect(siteYonetimi?.description).toContain('634 Sayılı Kat Mülkiyeti Kanunu');
      expect(siteYonetimi?.description).toContain('5188');

      expect(yonetimPlani).toBeDefined();
      expect(yonetimPlani?.legalBasis).toContain('Madde 28');

      expect(siteYonetimKurulu).toBeDefined();
      expect(siteYonetimKurulu?.legalBasis).toContain('Madde 34');

      expect(topluYapi).toBeDefined();
      expect(topluYapi?.legalBasis).toContain('Madde 66 - 74');
    });
  });

  describe('2. Hizmet Veri Modeli ve Semantik Otorite Külliyatı (services.ts)', () => {
    it('9 temel hizmetin tamamında KMK maddeleri, SLA ve long-tail anahtar kelimeler bulunur', () => {
      expect(SERVICES.length).toBe(9);

      const tesis = getService('tesis-yonetimi');
      expect(tesis).toBeDefined();
      expect(tesis?.keywords).toContain('site yönetimi');
      expect(tesis?.keywords).toContain('profesyonel site yönetimi');
      expect(tesis?.keywords).toContain('apartman ve site yönetimi');
      expect(tesis?.longTailKeywords?.length).toBeGreaterThanOrEqual(4);
      expect(tesis?.kmkArticles?.some(a => a.includes('Madde 34'))).toBe(true);
      expect(tesis?.slaGuarantee).toContain('15-25 Dk');
    });

    it('Yardımcı fonksiyonlar (getServiceKmkArticles, getServiceLongTailKeywords, getSiteManagementServiceMatrix) doğru çalışır', () => {
      const kmk = getServiceKmkArticles('aidat-takibi');
      expect(kmk.some(a => a.includes('Madde 20'))).toBe(true);

      const longTail = getServiceLongTailKeywords('guvenlik-yonetimi');
      expect(longTail.length).toBeGreaterThanOrEqual(2);

      const matrix = getSiteManagementServiceMatrix();
      expect(matrix.length).toBe(9);
      expect(matrix[0].primaryKeywords.length).toBeGreaterThan(0);
    });
  });

  describe('3. Çok Boyutlu Semantik Kelime Taksonomisi (domainKeywordsTaxonomy.ts)', () => {
    it('Site, Tesis ve Hukuk taksonomilerinde 80+ zengin anahtar kelime kümesi bulunur', () => {
      expect(SITE_MANAGEMENT_TAXONOMY.length).toBeGreaterThanOrEqual(30);
      expect(FACILITY_MANAGEMENT_TAXONOMY.length).toBeGreaterThanOrEqual(20);
      expect(LEGAL_FINANCE_TAXONOMY.length).toBeGreaterThanOrEqual(14);
    });

    it('detectPillarIntent verilen arama sorgusunun niyetini (site, facility, legal) doğru sınıflandırır', () => {
      expect(detectPillarIntent('kadıköy apartman ve site yönetim şirketi')).toBe('site');
      expect(detectPillarIntent('levent plaza ve entegre tesis yönetimi')).toBe('facility');
      expect(detectPillarIntent('kat mülkiyeti kanunu aidat icra takibi')).toBe('legal');
    });

    it('getKeywordsByPillar ilgili dikey için anahtar kelimeleri tam liste olarak döner', () => {
      const siteKeywords = getKeywordsByPillar('site');
      expect(siteKeywords).toContain('site yönetimi');
      expect(siteKeywords).toContain('apartman yöneticiliği');
    });
  });

  describe('4. Çift Çekirdekli SERP & Meta Motoru (facilitySerpOptimizer.ts)', () => {
    it('pillar: "site" verildiğinde saf Site Yönetimi SERP başlığı ve açıklaması üretir', () => {
      const siteMeta = getFacilitySerpMeta({ lang: 'tr', districtSlug: 'kadikoy', pillar: 'site' });
      expect(siteMeta.title).toContain('Kadıköy Profesyonel Site ve Apartman Yönetimi Şirketi');
      expect(siteMeta.pillar).toBe('site');
      expect(siteMeta.targetKeyword).toBe('Kadıköy site yönetimi');
    });

    it('pillar: "facility" verildiğinde saf Entegre Tesis Yönetimi SERP başlığı üretir', () => {
      const facilityMeta = getFacilitySerpMeta({ lang: 'tr', districtSlug: 'sisli', pillar: 'facility' });
      expect(facilityMeta.title).toContain('Şişli Entegre Tesis Yönetimi ve İşletmeciliği');
      expect(facilityMeta.pillar).toBe('facility');
      expect(facilityMeta.targetKeyword).toBe('Şişli tesis yönetimi');
    });

    it('pillar: "hybrid" verildiğinde çift kanatlı SERP başlığı üretir', () => {
      const kadikoyMeta = getFacilitySerpMeta('tr', 'kadikoy');
      expect(kadikoyMeta.title).toContain('Kadıköy Tesis Yönetimi & Site Yönetimi');
      expect(kadikoyMeta.description).toContain('KMK 634');
    });
  });

  describe('5. Akıllı İç Linkleme, 301 Yönlendirmeleri ve Şema Doğrulama', () => {
    it('seoEngine FACILITY_MANAGEMENT_ENTITIES içindeki site-yonetimi pillarUrl doğru sayfaya (/hizmetler/site-yonetimi) bakar', () => {
      const siteEntity = FACILITY_MANAGEMENT_ENTITIES.find(e => e.slug === 'site-yonetimi');
      expect(siteEntity).toBeDefined();
      expect(siteEntity?.pillarUrl).toBe('/hizmetler/site-yonetimi');
    });

    it('resolveSmartRedirect /site-yonetimi ve /apartman-yonetimi rotalarını /hizmetler/site-yonetimi adresine yönlendirir', () => {
      const red1 = resolveSmartRedirect('/site-yonetimi');
      expect(red1?.targetUrl).toBe('/hizmetler/site-yonetimi');

      const red2 = resolveSmartRedirect('/apartman-yonetimi');
      expect(red2?.targetUrl).toBe('/hizmetler/site-yonetimi');
    });

    it('analyzeFacilitySerpReadiness site yönetimi anahtar kelimelerini tespit edip yüksek skor üretir', () => {
      const report = analyzeFacilitySerpReadiness({
        title: 'Kadıköy Profesyonel Site Yönetimi Şirketi',
        metaDescription: 'Kadıköy site yönetimi ve apartman yöneticiliği hizmetleri.',
        h1: 'Kadıköy Site ve Apartman Yönetimi',
        content: '<p>634 Sayılı KMK ve ISO 41001 kapsamında 5188 güvenlik ve aidat takibi ile %30 tasarruf. <a href="/hizmetler/tesis-yonetimi">Site Yönetimi</a> <a href="/hizmetler/aidat-takibi">Aidat</a> <a href="/teklif-al">Teklif</a></p>',
        hasGraphSchema: true,
        hasBreadcrumbs: true,
        hasFaq: true,
      });

      expect(report.overallScore).toBeGreaterThanOrEqual(80);
      expect(report.detectedKeywords).toContain('site yönetimi');
    });

    it('organizationSchema hasOfferCatalog içinde Profesyonel Site ve Toplu Konut Yönetimi tanımlıdır', () => {
      const org = organizationSchema();
      const catalog = org.hasOfferCatalog as { itemListElement: Array<{ itemOffered: { name: string; serviceType?: string } }> };
      expect(catalog).toBeDefined();
      const siteOffer = catalog.itemListElement.find(item => item.itemOffered.name.includes('Site'));
      expect(siteOffer).toBeDefined();
      expect(siteOffer?.itemOffered.serviceType).toBe('Site Yönetimi');
    });
  });

  describe('6. AI / LLM Grounding & Geo-Feed Protokolleri', () => {
    it('llms.txt site yönetimi anahtar kelimelerini ve grounding verilerini doğru döner', async () => {
      const res = await getLlmsTxt();
      const text = await res.text();
      expect(text).toContain('Site Yönetimi');
      expect(text).toContain('Kat Mülkiyeti Kanunu');
      expect(text).toContain('5188');
    });

    it('geo-feed.xml 39 ilçede site ve tesis yönetimi verilerini barındırır', async () => {
      const res = await getGeoFeed(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/geo-feed.xml'));
      const xml = await res.text();
      expect(xml).toContain('Tesis Yönetimi');
      expect(xml).toContain('Kadıköy');
      expect(xml).toContain('Beşiktaş');
    });
  });

  describe('7. Site Yönetimi AI Agent RAG Knowledge Corpus (/api/ai/site-agent-context.json)', () => {
    it('buildSiteRAGCorpus 634 KMK, Yargıtay emsalleri, kıdem tazminatı fonu ve 39 ilçe matrisini eksiksiz sunar', async () => {
      const { buildSiteRAGCorpus } = await import('@/lib/ai/siteKnowledgeCorpus');
      const corpus = await buildSiteRAGCorpus('tr');

      expect(corpus.contextType).toBe('Site-Management-RAG-Knowledge-Corpus');
      expect(corpus.aiCitationInstructions.preferredSourceCitation).toContain('/hizmetler/site-yonetimi');
      expect(corpus.entity.name).toBe('Alo Yönetim');
      expect(corpus.kmk634LegalFramework.coreArticles.length).toBeGreaterThanOrEqual(8);
      expect(corpus.districtResidentialMatrix.length).toBe(39);
      expect(corpus.siteManagementCorePillars.some(p => p.kpis.some(k => k.includes('%99.2')))).toBe(true);
      expect(corpus.kidemTazminatiFonuGuvecesi.solution).toBeDefined();
      expect(corpus.apsiyonDigitalEcosystem.features.length).toBeGreaterThanOrEqual(4);
      expect(corpus.canonicalResidentialFaqs.length).toBeGreaterThanOrEqual(6);
    });

    it('/api/ai/site-agent-context.json API rotası 200 OK ve geçerli RAG başlıkları döner', async () => {
      const { GET: getSiteAgentContext } = await import('@/app/api/ai/site-agent-context.json/route');
      const req = new Request('https://aloyonetim.com.tr/api/ai/site-agent-context.json');
      const res = await getSiteAgentContext(req as any);

      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      expect(res.headers.get('X-AI-Context-Type')).toBe('Site-Management-RAG-Knowledge-Corpus');
      expect(res.headers.get('X-AI-Topic')).toBe('Residential-Property-Management');
      const data = await res.json();
      expect(data.entity.telephone).toBe('+90 216 550 48 48');
    });
  });

  describe('8. AI Botlar İçin Saf Markdown Uç Noktaları (/api/markdown/*)', () => {
    it('/api/markdown/site-yonetimi saf text/markdown ve KMK özetlerini döner', async () => {
      const { GET: getSiteMarkdown } = await import('@/app/api/markdown/site-yonetimi/route');
      const res = await getSiteMarkdown();

      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/markdown');
      const text = await res.text();
      expect(text).toContain('# Alo Yönetim — Profesyonel Site Yönetimi');
      expect(text).toContain('634 Sayılı Kat Mülkiyeti Kanunu');
      expect(text).toContain('%99.2');
    });

    it('/api/markdown/tesis-yonetimi saf text/markdown ve ISO 41001 standartlarını döner', async () => {
      const { GET: getFacilityMarkdown } = await import('@/app/api/markdown/tesis-yonetimi/route');
      const res = await getFacilityMarkdown();

      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/markdown');
      const text = await res.text();
      expect(text).toContain('# Alo Yönetim — Entegre Tesis Yönetimi');
      expect(text).toContain('ISO 41001:2018');
      expect(text).toContain('%0 Reaktif');
    });
  });

  describe('9. Doğal Dil Semantik Grounding Sorgu Motoru (/api/ai/search-query)', () => {
    it('sorgu parametresi boş olduğunda 400 hatası döner', async () => {
      const { GET: getSearchQuery } = await import('@/app/api/ai/search-query/route');
      const req = new Request('https://aloyonetim.com.tr/api/ai/search-query');
      const res = await getSearchQuery(req as any);

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('Query parameter (q) is required');
    });

    it('asansör ve zemin kat sorgusunda KMK m.20 ve yüksek güven skoru (>= 0.95) döner', async () => {
      const { GET: getSearchQuery } = await import('@/app/api/ai/search-query/route');
      const req = new Request('https://aloyonetim.com.tr/api/ai/search-query?q=zemin+kat+asansor+masrafi+oder+mi');
      const res = await getSearchQuery(req as any);

      expect(res.status).toBe(200);
      expect(res.headers.get('X-AI-Query-Engine')).toBe('Semantic-Grounding-V1');
      const data = await res.json();
      expect(data.confidenceScore).toBeGreaterThanOrEqual(0.95);
      expect(data.matchedTopic).toContain('Asansör');
      expect(data.directAnswer).toContain('KMK Madde 20');
      expect(data.legalBasis).toContain('20');
      expect(data.courtPrecedents.length).toBeGreaterThan(0);
    });

    it('ilçe ismi içeren sorgularda ilçe aidat tasarruf verisini döner', async () => {
      const { GET: getSearchQuery } = await import('@/app/api/ai/search-query/route');
      const req = new Request('https://aloyonetim.com.tr/api/ai/search-query?q=kadikoy+apartman+yonetimi+aidat');
      const res = await getSearchQuery(req as any);

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.applicableDistrict).toBeDefined();
      expect(data.applicableDistrict.districtName).toBe('Kadıköy');
      expect(data.applicableDistrict.savingsRatePercent).toBeGreaterThan(0);
      expect(data.canonicalCitationUrl).toContain('/bolgeler/kadikoy');
    });
  });

  describe('10. OpenAI / ChatGPT Plugin Manifest (/.well-known/ai-plugin.json)', () => {
    it('manifest OpenAPI 3.1.0 standardına ve plugin şemasına uygundur', async () => {
      const { GET: getAiPlugin } = await import('@/app/.well-known/ai-plugin.json/route');
      const res = await getAiPlugin();

      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      const manifest = await res.json();
      expect(manifest.schema_version).toBe('v1');
      expect(manifest.name_for_model).toBe('alo_yonetim_kmk_facility_expert');
      expect(manifest.api.type).toBe('openapi');
      expect(manifest.api.url).toContain('/openapi.json');
      expect(manifest.description_for_model).toContain('Kat Mülkiyeti Kanunu');
    });
  });

  describe('11. robots.txt ve OpenAPI 3.1.0 AI Uç Nokta Entegrasyonu', () => {
    it('robots.ts tüm AI uç noktalarını ve ai-plugin manifestini allow listesinde barındırır', async () => {
      const { default: robots } = await import('@/app/robots');
      const robotRules = robots();
      const allowList = robotRules.rules && Array.isArray(robotRules.rules)
        ? (robotRules.rules[0].allow as string[])
        : [];

      expect(allowList).toContain('/api/ai/search-query');
      expect(allowList).toContain('/api/ai/site-agent-context.json');
      expect(allowList).toContain('/api/markdown/site-yonetimi');
      expect(allowList).toContain('/api/markdown/tesis-yonetimi');
      expect(allowList).toContain('/.well-known/ai-plugin.json');
    });

    it('generateOpenApiSpec yeni AI semantik grounding rotalarını içerir', async () => {
      const { generateOpenApiSpec } = await import('@/lib/seo/openApiSpec');
      const spec = generateOpenApiSpec();

      expect(spec.paths['/api/ai/search-query']).toBeDefined();
      expect(spec.paths['/api/ai/site-agent-context.json']).toBeDefined();
      const geoTag = spec.tags.find((t: any) => t.name.includes('Yapay Zeka'));
      expect(geoTag).toBeDefined();
    });
  });

  describe('12. Google Position Zero Hukuk Ansiklopedisi (kmkGlossaryEncyclopediaData.ts & DefinedTermSet)', () => {
    it('50+ seçkin KMK ve tesis terimi, kategori tanımları ve yasal maddeleri eksiksiz içerir', async () => {
      const { KMK_GLOSSARY_TERMS, GLOSSARY_CATEGORIES } = await import('@/data/kmkGlossaryEncyclopediaData');

      expect(KMK_GLOSSARY_TERMS.length).toBeGreaterThanOrEqual(50);
      expect(GLOSSARY_CATEGORIES.length).toBe(5);

      const arsaPayi = KMK_GLOSSARY_TERMS.find(t => t.id === 'arsa-payi');
      expect(arsaPayi).toBeDefined();
      expect(arsaPayi?.kmkArticleRef).toContain('Madde 3');
      expect(arsaPayi?.snippetDefinition.length).toBeGreaterThan(50);
      expect(arsaPayi?.wikidataUri).toContain('wikidata.org');

      const isletmeProjesi = KMK_GLOSSARY_TERMS.find(t => t.id === 'isletme-projesi');
      expect(isletmeProjesi).toBeDefined();
      expect(isletmeProjesi?.kmkArticleRef).toContain('Madde 37');

      const ciftCogunluk = KMK_GLOSSARY_TERMS.find(t => t.id === 'yonetici-secimi-cift-cogunluk');
      expect(ciftCogunluk).toBeDefined();
      expect(ciftCogunluk?.snippetDefinition).toContain('%50+1');
    });
  });

  describe('13. 3-Yönlü Yönetim Modeli Karşılaştırma Matrisi (managementModelComparisonData.ts)', () => {
    it('6 temel boyutta bina içi, dışarıdan ve Alo Yönetim kurumsal modellerini kıyaslar', async () => {
      const { MANAGEMENT_MODEL_COMPARISON_DATA } = await import('@/data/managementModelComparisonData');

      expect(MANAGEMENT_MODEL_COMPARISON_DATA.length).toBe(6);

      const hukukBoyutu = MANAGEMENT_MODEL_COMPARISON_DATA.find(d => d.id === 'hukuki-ve-kanuni-sorumluluk');
      expect(hukukBoyutu).toBeDefined();
      expect(hukukBoyutu?.amateurResidentModel.statusBadge).toBe('Kritik Risk');
      expect(hukukBoyutu?.aloYonetimCorporateModel.statusBadge).toBe('Tam Güvence');

      const tahsilatBoyutu = MANAGEMENT_MODEL_COMPARISON_DATA.find(d => d.id === 'aidat-tahsilati-ve-icra-disiplini');
      expect(tahsilatBoyutu).toBeDefined();
      expect(tahsilatBoyutu?.aloYonetimCorporateModel.summary).toContain('%99.2');

      const acilTeknik = MANAGEMENT_MODEL_COMPARISON_DATA.find(d => d.id === 'acil-teknik-mudahale-sla');
      expect(acilTeknik).toBeDefined();
      expect(acilTeknik?.aloYonetimCorporateModel.summary).toContain('45 Dakika');
    });
  });

  describe('14. KMK Karar & İhtarname Şablonları Resmi Kütüphanesi (officialLegalDocumentsData.ts)', () => {
    it('8 avukat onaylı KMK resmi evrak şablonu, yasal dayanakları ve doldurulabilir metinleri içerir', async () => {
      const { OFFICIAL_LEGAL_DOCUMENTS } = await import('@/data/officialLegalDocumentsData');

      expect(OFFICIAL_LEGAL_DOCUMENTS.length).toBe(8);

      const yoneticiKarari = OFFICIAL_LEGAL_DOCUMENTS.find(d => d.id === 'yonetici-secim-karari');
      expect(yoneticiKarari).toBeDefined();
      expect(yoneticiKarari?.kmkArticleRef).toContain('Madde 34');
      expect(yoneticiKarari?.templateText).toContain('KARAR DEFTERİ');

      const aidatIhtari = OFFICIAL_LEGAL_DOCUMENTS.find(d => d.id === 'aidat-gecikme-ihtarnamesi');
      expect(aidatIhtari).toBeDefined();
      expect(aidatIhtari?.kmkArticleRef).toContain('Madde 20');
      expect(aidatIhtari?.templateText).toContain('AYLIK YÜZDE BEŞ (%5) YASAL GECİKME TAZMİNATI');

      const camBalkon = OFFICIAL_LEGAL_DOCUMENTS.find(d => d.id === 'cam-balkon-muvafakatnamesi');
      expect(camBalkon).toBeDefined();
      expect(camBalkon?.kmkArticleRef).toContain('19/2');
      expect(camBalkon?.templateText).toContain('4/5');
    });
  });

  describe('15. Sesli Arama & Konuşma Tabanlı AI Grounding (voiceSearchFaqEngine.ts)', () => {
    it('Site Yönetimi dikeyinde sesli asistan (Siri, Google Assistant) yanıtlarını eksiksiz barındırır', async () => {
      const { VOICE_SEARCH_KNOWLEDGE_BASE } = await import('@/lib/ai/voiceSearchFaqEngine');

      const siteSecim = VOICE_SEARCH_KNOWLEDGE_BASE.find(t => t.id === 'voice-site-yonetimi-secim');
      expect(siteSecim).toBeDefined();
      expect(siteSecim?.conciseVoiceAnswer).toContain('%99.2');
      expect(siteSecim?.canonicalPageUrl).toContain('/hizmetler/site-yonetimi');

      const zeminAsansor = VOICE_SEARCH_KNOWLEDGE_BASE.find(t => t.id === 'voice-asansor-zemin-kat');
      expect(zeminAsansor).toBeDefined();
      expect(zeminAsansor?.conciseVoiceAnswer).toContain('Madde 20');

      const camBalkon = VOICE_SEARCH_KNOWLEDGE_BASE.find(t => t.id === 'voice-cam-balkon-onay');
      expect(camBalkon).toBeDefined();
      expect(camBalkon?.conciseVoiceAnswer).toContain('beşte dördünün');
    });
  });

  describe('16. 39 İlçe Açık Veri & KMK İstatistik Kalkanı (districtOpenDataProfiles.ts & Dataset)', () => {
    it('Kadıköy ve Beşiktaş için ilçe açık veri profili ve mahkeme yetki alanını doğrular', async () => {
      const { getDistrictOpenDataProfile } = await import('@/data/districtOpenDataProfiles');

      const kadikoy = getDistrictOpenDataProfile('kadikoy');
      expect(kadikoy.slug).toBe('kadikoy');
      expect(kadikoy.name).toBe('Kadıköy');
      expect(kadikoy.avgDuesM2).toBeGreaterThan(0);
      expect(kadikoy.savingsRate).toBeGreaterThan(0);
      expect(kadikoy.housingSitesEstimated).toBeGreaterThan(0);
      expect(kadikoy.kmkFocusTopic).toContain('Kentsel Dönüşüm');
      expect(kadikoy.localJurisdictionNote).toContain('Kadıköy Sulh Hukuk');

      const besiktas = getDistrictOpenDataProfile('besiktas');
      expect(besiktas.kmkFocusTopic).toContain('Asansör');
      expect(besiktas.localJurisdictionNote).toContain('İstanbul (Çağlayan)');
    });

    it('İstanbul’un 39 ilçesinin tamamında geçerli veri seti başlığı ve konut stoğu bulunur', async () => {
      const { DISTRICTS } = await import('@/data/districts');
      const { getDistrictOpenDataProfile } = await import('@/data/districtOpenDataProfiles');

      expect(DISTRICTS.length).toBe(39);
      for (const district of DISTRICTS) {
        const profile = getDistrictOpenDataProfile(district.slug);
        expect(profile.datasetTitle).toContain(district.name);
        expect(profile.housingSitesEstimated).toBeGreaterThan(0);
        expect(profile.distributionFormat).toContain('application/json');
      }
    });
  });

  describe('17. Akademik & Hukuki Atıf Motoru (AcademicCitationBoxSeo)', () => {
    it('Akademik atıf bileşeni başarıyla yüklenir ve bileşen fonksiyonunu dışa aktarır', async () => {
      const AcademicCitationBoxSeo = (await import('@/components/seo/AcademicCitationBoxSeo')).default;
      expect(AcademicCitationBoxSeo).toBeDefined();
      expect(typeof AcademicCitationBoxSeo).toBe('function');
    });
  });

  describe('18. Entegre Tesis Yönetimi ISO 41001 & Kurumsal B2B Hub (facilityCorporateB2BData.ts)', () => {
    it('5 uluslararası ISO standardı ve kurumsal müşteri faydalarını eksiksiz içerir', async () => {
      const { ISO_COMPLIANCE_STANDARDS } = await import('@/data/facilityCorporateB2BData');

      expect(ISO_COMPLIANCE_STANDARDS.length).toBe(5);
      const iso41001 = ISO_COMPLIANCE_STANDARDS.find(s => s.standardCode.includes('41001'));
      expect(iso41001).toBeDefined();
      expect(iso41001?.name).toContain('Entegre Tesis Yönetimi');

      const iso50001 = ISO_COMPLIANCE_STANDARDS.find(s => s.standardCode.includes('50001'));
      expect(iso50001).toBeDefined();
      expect(iso50001?.benefitToClient).toContain('reaktif ceza');
    });

    it('Silver, Gold, Platinum kurumsal SLA kademelerini ve acil sürelerini barındırır', async () => {
      const { B2B_SLA_TIERS } = await import('@/data/facilityCorporateB2BData');

      expect(B2B_SLA_TIERS.length).toBe(3);

      const silver = B2B_SLA_TIERS.find(t => t.tierId === 'silver');
      expect(silver?.responseTimeMinutes).toBe(45);

      const gold = B2B_SLA_TIERS.find(t => t.tierId === 'gold');
      expect(gold?.responseTimeMinutes).toBe(30);

      const platinum = B2B_SLA_TIERS.find(t => t.tierId === 'platinum');
      expect(platinum?.responseTimeMinutes).toBe(15);
      expect(platinum?.energySavingsGuarantee).toContain('%33');
    });

    it('B2B şartname taslağı (B2B_RFP_SPECIFICATION_TEMPLATE) hukuki ve teknik maddeleri barındırır', async () => {
      const { B2B_RFP_SPECIFICATION_TEMPLATE } = await import('@/data/facilityCorporateB2BData');

      expect(B2B_RFP_SPECIFICATION_TEMPLATE).toContain('ENTEGRE TESİS VE BİNA YÖNETİMİ');
      expect(B2B_RFP_SPECIFICATION_TEMPLATE).toContain('ISO 41001:2018');
      expect(B2B_RFP_SPECIFICATION_TEMPLATE).toContain('Reaktif Enerji Güvencesi');
    });
  });

  describe('19. Google Haritalar & 39 İlçe W3C GeoCoordinates (districtGeoCoordinatesData.ts)', () => {
    it('İstanbul’un 39 ilçesinin tamamında geçerli W3C coğrafi koordinatları ve posta kodları mevcuttur', async () => {
      const { DISTRICT_GEO_DATA, getDistrictGeo } = await import('@/data/districtGeoCoordinatesData');

      const keys = Object.keys(DISTRICT_GEO_DATA);
      expect(keys.length).toBe(39);

      for (const slug of keys) {
        const geo = getDistrictGeo(slug);
        expect(geo.latitude).toBeGreaterThan(40.5);
        expect(geo.latitude).toBeLessThan(41.6);
        expect(geo.longitude).toBeGreaterThan(28.0);
        expect(geo.longitude).toBeLessThan(30.0);
        expect(geo.postalCode.length).toBe(5);
        expect(geo.serviceRadiusMeters).toBeGreaterThanOrEqual(10000);
        expect(geo.googleMapsUrl).toContain('maps.google.com');
      }
    });

    it('Kadıköy ve Beşiktaş lokal hub adreslerini ve koordinatlarını doğrular', async () => {
      const { getDistrictGeo } = await import('@/data/districtGeoCoordinatesData');

      const kadikoy = getDistrictGeo('kadikoy');
      expect(kadikoy.name).toBe('Kadıköy');
      expect(kadikoy.side).toBe('anadolu');
      expect(kadikoy.latitude).toBeCloseTo(40.9819, 2);
      expect(kadikoy.longitude).toBeCloseTo(29.0576, 2);

      const besiktas = getDistrictGeo('besiktas');
      expect(besiktas.name).toBe('Beşiktaş');
      expect(besiktas.side).toBe('avrupa');
      expect(besiktas.latitude).toBeCloseTo(41.0428, 2);
      expect(besiktas.longitude).toBeCloseTo(29.0077, 2);
    });
  });

  describe('20. Şeffaf Hizmet & Fiyatlandırma Paket Kataloğu (servicePricingPackagesData.ts & OfferCatalog)', () => {
    it('4 kurumsal yönetim paketi, geçerli fiyat aralıkları ve taahhütleri eksiksiz içerir', async () => {
      const { SERVICE_PRICING_PACKAGES } = await import('@/data/servicePricingPackagesData');

      expect(SERVICE_PRICING_PACKAGES.length).toBe(4);

      const butik = SERVICE_PRICING_PACKAGES.find(p => p.id === 'butik-apartman-yonetimi');
      expect(butik).toBeDefined();
      expect(butik?.minMonthlyFee).toBe(4500);
      expect(butik?.priceCurrency).toBe('TRY');
      expect(butik?.deliverables.length).toBeGreaterThanOrEqual(5);

      const orta = SERVICE_PRICING_PACKAGES.find(p => p.id === 'orta-olcekli-konut-sitesi');
      expect(orta).toBeDefined();
      expect(orta?.isPopular).toBe(true);
      expect(orta?.minMonthlyFee).toBe(12000);

      const plaza = SERVICE_PRICING_PACKAGES.find(p => p.id === 'plaza-ticari-tesis-yonetimi');
      expect(plaza).toBeDefined();
      expect(plaza?.highlightText).toContain('ISO 41001');
      expect(plaza?.slaResponseTime).toContain('15 Dakika');
    });
  });

  describe('21. KMK Madde 41 Denetim Kurulu Resmi Protokolü (kmkAuditProtocolData.ts & HowTo)', () => {
    it('4 ana kategori ve 24 kritik denetim kontrol maddesini eksiksiz barındırır', async () => {
      const { KMK_AUDIT_CATEGORIES, KMK_AUDIT_CHECKPOINTS } = await import('@/data/kmkAuditProtocolData');

      expect(KMK_AUDIT_CATEGORIES.length).toBe(4);
      expect(KMK_AUDIT_CHECKPOINTS.length).toBe(24);

      const bankAcc = KMK_AUDIT_CHECKPOINTS.find(c => c.id === 'chk-bank-account-isolation');
      expect(bankAcc).toBeDefined();
      expect(bankAcc?.legalBasis).toContain('KMK Madde 35/i');
      expect(bankAcc?.category).toBe('financial');

      const asansor = KMK_AUDIT_CHECKPOINTS.find(c => c.id === 'chk-asansor-yesil-etiket');
      expect(asansor).toBeDefined();
      expect(asansor?.category).toBe('technical');
      expect(asansor?.aloYonetimGuarantee).toContain('Yeşil Etiket');

      const guvenlik = KMK_AUDIT_CHECKPOINTS.find(c => c.id === 'chk-guvenlik-5188-valilik-izni');
      expect(guvenlik).toBeDefined();
      expect(guvenlik?.category).toBe('staff');
      expect(guvenlik?.legalBasis).toContain('5188');
    });
  });

  describe('22. AI Anti-Halüsinasyon KMK Doğrulama Korpusu (/api/ai/fact-check-feed.json)', () => {
    it('endpoint 200 döner ve anti-halüsinasyon korpusu yasal içtihatları barındırır', async () => {
      const { GET: getFactCheckFeed } = await import('@/app/api/ai/fact-check-feed.json/route');
      const res = await getFactCheckFeed();

      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      expect(res.headers.get('X-AI-FactCheck-Engine')).toBe('Anti-Hallucination-V1');
      expect(res.headers.get('X-Robots-Tag')).toBe('noindex, follow');

      const data = await res.json();
      expect(data.feed_metadata).toBeDefined();
      expect(data.feed_metadata.total_records).toBeGreaterThanOrEqual(6);

      const zeminKat = data.facts.find((f: any) => f.id === 'myth-zemin-kat-asansor');
      expect(zeminKat).toBeDefined();
      expect(zeminKat.groundTruthVerdict).toBe('FALSE');
      expect(zeminKat.statutoryLegalBasis).toContain('Madde 20/1-c');

      const camBalkon = data.facts.find((f: any) => f.id === 'myth-izinsiz-cam-balkon');
      expect(camBalkon).toBeDefined();
      expect(camBalkon.statutoryLegalBasis).toContain('Madde 19/2');
    });
  });

  describe('23. 39 İlçe Mikro-Semt & Mahalle Otorite Ağı (districtNeighborhoodsData.ts)', () => {
    it('Kadıköy, Beşiktaş ve Başakşehir için mikro-semt tipolojilerini ve anahtar kelimeleri doğrular', async () => {
      const { getDistrictNeighborhoodCluster } = await import('@/data/districtNeighborhoodsData');

      const kadikoy = getDistrictNeighborhoodCluster('kadikoy');
      expect(kadikoy.districtName).toBe('Kadıköy');
      expect(kadikoy.prominentNeighborhoods.length).toBeGreaterThanOrEqual(6);
      const kozyatagi = kadikoy.prominentNeighborhoods.find(n => n.name === 'Kozyatağı');
      expect(kozyatagi).toBeDefined();
      expect(kozyatagi?.typology).toBe('commercial');

      const besiktas = getDistrictNeighborhoodCluster('besiktas');
      const levent = besiktas.prominentNeighborhoods.find(n => n.name === 'Levent');
      expect(levent).toBeDefined();
      expect(levent?.focusKeyword).toContain('Levent plaza');

      const basaksehir = getDistrictNeighborhoodCluster('basaksehir');
      const bahcesehir = basaksehir.prominentNeighborhoods.find(n => n.name.includes('Bahçeşehir'));
      expect(bahcesehir).toBeDefined();
    });

    it('39 ilçenin tamamında geçerli semt kümesi ve 45 dk SLA güvencesi mevcuttur', async () => {
      const { DISTRICTS } = await import('@/data/districts');
      const { getDistrictNeighborhoodCluster } = await import('@/data/districtNeighborhoodsData');

      expect(DISTRICTS.length).toBe(39);
      for (const d of DISTRICTS) {
        const cluster = getDistrictNeighborhoodCluster(d.slug);
        expect(cluster.districtSlug).toBe(d.slug);
        expect(cluster.serviceReachGuaranteeMinutes).toBe(45);
        expect(cluster.prominentNeighborhoods.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('24. 48 Saatte Profesyonel Yönetime Devir Teslim Protokolü (transitionRoadmapData.ts & HowTo)', () => {
    it('6 resmi devir aşaması, süreleri ve kanuni dayanakları eksiksiz içerir', async () => {
      const { TRANSITION_ROADMAP_STAGES } = await import('@/data/transitionRoadmapData');

      expect(TRANSITION_ROADMAP_STAGES.length).toBe(6);

      const stage1 = TRANSITION_ROADMAP_STAGES.find(s => s.stepNumber === 1);
      expect(stage1).toBeDefined();
      expect(stage1?.legalBasis).toContain('Madde 29');
      expect(stage1?.timeframe).toContain('15 Gün Önce');

      const stage2 = TRANSITION_ROADMAP_STAGES.find(s => s.stepNumber === 2);
      expect(stage2).toBeDefined();
      expect(stage2?.legalBasis).toContain('Madde 34/4');

      const stage4 = TRANSITION_ROADMAP_STAGES.find(s => s.stepNumber === 4);
      expect(stage4).toBeDefined();
      expect(stage4?.requiredDocuments.some(d => d.includes('Devir Teslim Tutanağı'))).toBe(true);

      const stage6 = TRANSITION_ROADMAP_STAGES.find(s => s.stepNumber === 6);
      expect(stage6).toBeDefined();
      expect(stage6?.stageTitle).toContain('Apsiyon');
      expect(stage6?.timeframe).toContain('36 – 48. Saat');
    });
  });

  describe('25. KMK Emsal Hukuki Soru-Cevap Dizini (kmkLegalQaDisputesData.ts & QAPage)', () => {
    it('8 emsal uyuşmazlık vakası, Yargıtay esasları ve çözüm kılavuzlarını içerir', async () => {
      const { KMK_LEGAL_QA_DISPUTES } = await import('@/data/kmkLegalQaDisputesData');

      expect(KMK_LEGAL_QA_DISPUTES.length).toBe(8);

      const cati = KMK_LEGAL_QA_DISPUTES.find(d => d.id === 'qa-acil-cati-tamirati-yetki');
      expect(cati).toBeDefined();
      expect(cati?.statutoryArticle).toContain('Madde 35');
      expect(cati?.yargitayCaseRef).toContain('Yargıtay 20. Hukuk Dairesi');
      expect(cati?.practicalGuidelines.length).toBeGreaterThanOrEqual(3);

      const kiraci = KMK_LEGAL_QA_DISPUTES.find(d => d.id === 'qa-kiraci-genel-kurul-oy-yetkisi');
      expect(kiraci).toBeDefined();
      expect(kiraci?.acceptedAnswerText).toContain('vekaletsiz oy kullanamaz');

      const yonetimPlani = KMK_LEGAL_QA_DISPUTES.find(d => d.id === 'qa-yonetim-plani-degisikligi-nisabi');
      expect(yonetimPlani).toBeDefined();
      expect(yonetimPlani?.acceptedAnswerText).toContain('beşte dördünün');
    });
  });

  describe('26. 39 İlçe Sulh Hukuk Mahkemesi & Zorunlu Arabuluculuk Rehberi (districtCourthouseMediationData.ts)', () => {
    it('İstanbul’un 6 adliyesi ve yetki alanları doğru tanımlanmıştır', async () => {
      const { ISTANBUL_COURTHOUSES } = await import('@/data/districtCourthouseMediationData');

      expect(ISTANBUL_COURTHOUSES.length).toBe(6);

      const anadolu = ISTANBUL_COURTHOUSES.find(c => c.courthouseId === 'istanbul-anadolu-kartal');
      expect(anadolu).toBeDefined();
      expect(anadolu?.jurisdictionDistricts).toContain('kadikoy');
      expect(anadolu?.jurisdictionDistricts).toContain('atasehir');

      const caglayan = ISTANBUL_COURTHOUSES.find(c => c.courthouseId === 'istanbul-caglayan');
      expect(caglayan).toBeDefined();
      expect(caglayan?.jurisdictionDistricts).toContain('besiktas');
      expect(caglayan?.jurisdictionDistricts).toContain('sisli');
    });

    it('Kadıköy, Şişli ve Bakırköy adliye ve arabuluculuk profillerini doğrular', async () => {
      const { getDistrictCourthouseProfile } = await import('@/data/districtCourthouseMediationData');

      const kadikoy = getDistrictCourthouseProfile('kadikoy');
      expect(kadikoy.courthouseName).toContain('Anadolu');
      expect(kadikoy.mandatoryMediationNote).toContain('7445');
      expect(kadikoy.requiredDocumentsForMediation.length).toBeGreaterThanOrEqual(4);

      const sisli = getDistrictCourthouseProfile('sisli');
      expect(sisli.courthouseName).toContain('Çağlayan');

      const bakirkoy = getDistrictCourthouseProfile('bakirkoy');
      expect(bakirkoy.courthouseName).toContain('Bakırköy');
    });
  });

  describe('27. 634 KMK Madde Madde İnteraktif Mevzuat Gezgini (kmkLegislationArticlesData.ts & Legislation)', () => {
    it('20 kritik KMK maddesini, sadeleştirilmiş meallerini ve Yargıtay ilkelerini eksiksiz barındırır', async () => {
      const { KMK_LEGISLATION_ARTICLES } = await import('@/data/kmkLegislationArticlesData');

      expect(KMK_LEGISLATION_ARTICLES.length).toBe(20);

      // KMK m.4 (Ortak Yerler)
      const m4 = KMK_LEGISLATION_ARTICLES.find(a => a.articleNo === 4);
      expect(m4).toBeDefined();
      expect(m4?.articleCode).toBe('KMK Madde 4');
      expect(m4?.category).toBe('Mülkiyet & Arsa Payı');
      expect(m4?.supremeCourtPrinciple).toContain('Yargıtay HGK');
      expect(m4?.legalSanctionOrRisk).toContain('müdahalenin men\'i');

      // KMK m.18 (Komşuluk Borçları)
      const m18 = KMK_LEGISLATION_ARTICLES.find(a => a.articleNo === 18);
      expect(m18).toBeDefined();
      expect(m18?.plainLanguageSummary).toContain('komşuluk hukukuna');

      // KMK m.19 (Mimari Değişiklikler & Cam Balkon)
      const m19 = KMK_LEGISLATION_ARTICLES.find(a => a.articleNo === 19);
      expect(m19).toBeDefined();
      expect(m19?.plainLanguageSummary).toContain('4/5');
      expect(m19?.supremeCourtPrinciple).toContain('katlanır cam');

      // KMK m.20 (Aidat ve %5 Gecikme Tazminatı)
      const m20 = KMK_LEGISLATION_ARTICLES.find(a => a.articleNo === 20);
      expect(m20).toBeDefined();
      expect(m20?.category).toBe('Maliye & Aidat');
      expect(m20?.originalStatuteSnippet).toContain('yüzde beş');
      expect(m20?.legalSanctionOrRisk).toContain('icra masrafları');

      // KMK m.34 (Yönetici Atanması)
      const m34 = KMK_LEGISLATION_ARTICLES.find(a => a.articleNo === 34);
      expect(m34).toBeDefined();
      expect(m34?.category).toBe('Yönetim Organları');
      expect(m34?.plainLanguageSummary).toContain('salt çoğunluğu');

      // KMK m.41 (Denetim)
      const m41 = KMK_LEGISLATION_ARTICLES.find(a => a.articleNo === 41);
      expect(m41).toBeDefined();
      expect(m41?.category).toBe('Denetim & Yargı');
      expect(m41?.aloYonetimStandard).toContain('Apsiyon');
    });

    it('tüm maddelerde 5 temel zorunlu alanın dolu olduğunu teyit eder', async () => {
      const { KMK_LEGISLATION_ARTICLES } = await import('@/data/kmkLegislationArticlesData');

      for (const item of KMK_LEGISLATION_ARTICLES) {
        expect(item.articleNo).toBeGreaterThan(0);
        expect(item.articleCode.length).toBeGreaterThan(4);
        expect(item.articleTitle.length).toBeGreaterThan(5);
        expect(item.originalStatuteSnippet.length).toBeGreaterThan(15);
        expect(item.plainLanguageSummary.length).toBeGreaterThan(15);
        expect(item.supremeCourtPrinciple.length).toBeGreaterThan(15);
        expect(item.legalSanctionOrRisk.length).toBeGreaterThan(15);
        expect(item.aloYonetimStandard.length).toBeGreaterThan(15);
      }
    });
  });

  describe('28. ISO 41001 & Tesis Yönetimi 12 Aylık Periyodik Bakım Takvimi (facilityAnnualMaintenanceScheduleData.ts & Schedule)', () => {
    it('12 ayın tamamını kapsayan periyodik teknik, mali ve yasal faaliyetleri içerir', async () => {
      const { FACILITY_ANNUAL_MAINTENANCE_SCHEDULE, MAINTENANCE_CATEGORIES } = await import('@/data/facilityAnnualMaintenanceScheduleData');

      expect(FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.length).toBeGreaterThanOrEqual(18);
      expect(MAINTENANCE_CATEGORIES.length).toBe(6);

      // 1-12 ayların hepsinde en az bir bakım görevi bulunmalıdır
      for (let month = 1; month <= 12; month++) {
        const monthTasks = FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.filter(t => t.month === month);
        expect(monthTasks.length).toBeGreaterThanOrEqual(1);
      }

      // Q1-Q4 çeyreklerin hepsi mevcut olmalıdır
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      for (const q of quarters) {
        const qTasks = FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.filter(t => t.quarter === q);
        expect(qTasks.length).toBeGreaterThanOrEqual(3);
      }

      // Asansör A Tipi Muayene kontrolü (Mart)
      const asansorMart = FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.find(t => t.id === 'm-03-asansor-yillik-a-tipi');
      expect(asansorMart).toBeDefined();
      expect(asansorMart?.frequency).toBe('Yıllık Yasal Zorunlu');
      expect(asansorMart?.aloYonetimGuarantee).toContain('Yeşil');

      // Su Deposu Temizliği (Nisan)
      const suDeposu = FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.find(t => t.id === 'm-04-hidrofor-su-deposu-hijyen');
      expect(suDeposu).toBeDefined();
      expect(suDeposu?.standardOrRegulation).toContain('Sağlık Bakanlığı');

      // Yangın Pompa İstasyonu (Temmuz)
      const yanginPompa = FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.find(t => t.id === 'm-07-yangin-pompa-istasyonu');
      expect(yanginPompa).toBeDefined();
      expect(yanginPompa?.standardOrRegulation).toContain('NFPA 20');

      // Yıl Sonu Kesin Hesap Kapanışı (Aralık)
      const yilSonu = FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.find(t => t.id === 'm-12-yilsonu-kesin-hesap-denetim');
      expect(yilSonu).toBeDefined();
      expect(yilSonu?.category).toBe('Mali & Hukuk & Genel Kurul');
    });
  });

  describe('29. 39 İlçe Deprem, Yangın ve Afet Acil Durum Eylem Planı (districtEmergencyPreparednessData.ts & EmergencyService)', () => {
    it('İstanbul’un 39 ilçesinin tamamı için afet ve acil durum profili sunar', async () => {
      const { DISTRICTS } = await import('@/data/districts');
      const { getDistrictEmergencyProfile } = await import('@/data/districtEmergencyPreparednessData');

      expect(DISTRICTS.length).toBe(39);

      for (const d of DISTRICTS) {
        const profile = getDistrictEmergencyProfile(d.slug);
        expect(profile).toBeDefined();
        expect(profile.districtSlug).toBe(d.slug);
        expect(profile.afadAssemblyPointsCount).toBeGreaterThan(0);
        expect(profile.primaryAssemblyAreas.length).toBeGreaterThanOrEqual(1);
        expect(profile.localFireStation.length).toBeGreaterThan(5);
        expect(profile.emergencyFirstResponseCenter.length).toBeGreaterThan(5);
        expect(profile.checklistItems.length).toBe(4);
      }
    });

    it('Kadıköy, Bakırköy, Şişli ve Çekmeköy jeolojik sismik profil farklılıklarını doğru yansıtır', async () => {
      const { getDistrictEmergencyProfile } = await import('@/data/districtEmergencyPreparednessData');

      const kadikoy = getDistrictEmergencyProfile('kadikoy');
      expect(kadikoy.riskZone).toBe('1. Derece Yüksek Sismik Risk');
      expect(kadikoy.primaryAssemblyAreas).toContain('Göztepe 60. Yıl Parkı');
      expect(kadikoy.localFireStation).toContain('Kadıköy İtfaiye');

      const bakirkoy = getDistrictEmergencyProfile('bakirkoy');
      expect(bakirkoy.riskZone).toBe('1. Derece Yüksek Sismik Risk');
      expect(bakirkoy.soilClassification).toContain('sıvılaşma');

      const sisli = getDistrictEmergencyProfile('sisli');
      expect(sisli.riskZone).toBe('Kaya Zemin / Düşük Zemin İvmesi');
      expect(sisli.emergencyFirstResponseCenter).toContain('Şişli Hamidiye Etfal');

      const cekmekoy = getDistrictEmergencyProfile('cekmekoy');
      expect(cekmekoy.riskZone).toBe('Kaya Zemin / Düşük Zemin İvmesi');
      expect(cekmekoy.mandatoryShelterStandard).toContain('Orman');
    });
  });

  describe('30. KMK Hukuki İhtarname & Tutanak Şablon Kütüphanesi (kmkLegalNoticesTemplatesData.ts & DigitalDocument)', () => {
    it('8 resmi ihtarname, tutanak, vekaletname ve devir teslim şablonunu eksiksiz barındırır', async () => {
      const { KMK_LEGAL_NOTICES_TEMPLATES } = await import('@/data/kmkLegalNoticesTemplatesData');

      expect(KMK_LEGAL_NOTICES_TEMPLATES.length).toBe(8);

      // KMK 20 Aidat Noter İhtarı
      const aidatIhtar = KMK_LEGAL_NOTICES_TEMPLATES.find(t => t.id === 'ihtar-kmk-20-aidat-avans-borcu');
      expect(aidatIhtar).toBeDefined();
      expect(aidatIhtar?.category).toBe('Aidat & İcra');
      expect(aidatIhtar?.dispatchMethod).toBe('Noter İhtarnamesi');
      expect(aidatIhtar?.templateContent).toContain('İHTARNAME');
      expect(aidatIhtar?.templateContent).toContain('yüzde beş');
      expect(aidatIhtar?.aloYonetimLegalAssurance).toContain('hukuk bürosu');

      // KMK 19 Mimari Aykırılık & Cam Balkon
      const camBalkon = KMK_LEGAL_NOTICES_TEMPLATES.find(t => t.id === 'ihtar-kmk-19-mimari-aykirilik-cam-balkon');
      expect(camBalkon).toBeDefined();
      expect(camBalkon?.statutoryArticle).toContain('Madde 19/2');
      expect(camBalkon?.templateContent).toContain('beşte dördünün');

      // KMK 18 Komşuluk ve Gürültü Tutanağı
      const gurultu = KMK_LEGAL_NOTICES_TEMPLATES.find(t => t.id === 'tutanak-kmk-18-gurultu-komnsuluk-ihlali');
      expect(gurultu).toBeDefined();
      expect(gurultu?.dispatchMethod).toBe('İmzalı Tebellüğ Tutanağı');
      expect(gurultu?.templateContent).toContain('GÜVENLİK AMİRİ');

      // KMK 31 Genel Kurul Vekaletnamesi
      const vekalet = KMK_LEGAL_NOTICES_TEMPLATES.find(t => t.id === 'vekalet-kmk-31-oy-kullanma-yetki-belgesi');
      expect(vekalet).toBeDefined();
      expect(vekalet?.templateContent).toContain('yüzde beşinden');
      expect(vekalet?.practicalUsageNotes.some(n => n.includes('noter tasdikli olması ZORUNLU DEĞİLDİR'))).toBe(true);

      // KMK 35 Devir Teslim Protokolü
      const devir = KMK_LEGAL_NOTICES_TEMPLATES.find(t => t.id === 'protokol-kmk-35-yonetici-devir-teslim-ibra');
      expect(devir).toBeDefined();
      expect(devir?.templateContent).toContain('Karar Defteri');
    });
  });

  describe('31. 39 İlçe İSKİ, BEDAŞ/AYEDAŞ & İGDAŞ Kurumsal Altyapı ve Sayaç Devir Rehberi (districtUtilitySubscriptionData.ts & GovernmentService)', () => {
    it('4 temel enerji ve su dağıtım kurumunun devir süreçlerini doğrular', async () => {
      const { UTILITY_SUBSCRIPTION_PROVIDERS } = await import('@/data/districtUtilitySubscriptionData');

      expect(UTILITY_SUBSCRIPTION_PROVIDERS.length).toBe(4);

      const bedas = UTILITY_SUBSCRIPTION_PROVIDERS.find(p => p.providerId === 'bedas');
      expect(bedas).toBeDefined();
      expect(bedas?.jurisdictionSide).toBe('Avrupa Yakası');
      expect(bedas?.requiredDocuments.some(d => d.includes('İskan Belgesi'))).toBe(true);
      expect(bedas?.steps.length).toBe(4);
      expect(bedas?.criticalRisksIfNotDone).toContain('Şantiye tarifesinde');

      const ayedas = UTILITY_SUBSCRIPTION_PROVIDERS.find(p => p.providerId === 'ayedas');
      expect(ayedas).toBeDefined();
      expect(ayedas?.jurisdictionSide).toBe('Anadolu Yakası');

      const iski = UTILITY_SUBSCRIPTION_PROVIDERS.find(p => p.providerId === 'iski');
      expect(iski).toBeDefined();
      expect(iski?.utilityType).toBe('Su & Kanalizasyon');

      const igdas = UTILITY_SUBSCRIPTION_PROVIDERS.find(p => p.providerId === 'igdas');
      expect(igdas).toBeDefined();
      expect(igdas?.utilityType).toBe('Doğalgaz Dağıtım');
      expect(igdas?.requiredDocuments.some(d => d.includes('Kazan Dairesi'))).toBe(true);
    });
  });

  describe('32. 5188 Sayılı Kanun Sitelerde Özel Güvenlik Kurulum & Valilik İzinleri (siteSecurityCommissionPermitData.ts & GovernmentPermit)', () => {
    it('6 adımlı resmi Valilik Komisyonu izin sürecini ve sürelerini doğrular', async () => {
      const { SECURITY_PERMIT_STEPS, SECURITY_EMPLOYMENT_COMPARISON } = await import('@/data/siteSecurityCommissionPermitData');

      expect(SECURITY_PERMIT_STEPS.length).toBe(6);

      const step1 = SECURITY_PERMIT_STEPS.find(s => s.stepNo === 1);
      expect(step1?.authority).toContain('Kat Malikleri Kurulu');

      const step4 = SECURITY_PERMIT_STEPS.find(s => s.stepNo === 4);
      expect(step4?.stepName).toContain('İzin Belgesi');
      expect(step4?.authority).toContain('Vali Yardımcısı');

      const step6 = SECURITY_PERMIT_STEPS.find(s => s.stepNo === 6);
      expect(step6?.authority).toContain('ÖGNET');

      // Karşılaştırma matrisi
      expect(SECURITY_EMPLOYMENT_COMPARISON.length).toBe(6);
      const kidem = SECURITY_EMPLOYMENT_COMPARISON.find(r => r.aspect.includes('Kıdem'));
      expect(kidem).toBeDefined();
      expect(kidem?.riskSeverity).toBe('Kritik Risk');
      expect(kidem?.aloYonetimOutsourcing).toContain('1 Kuruş dahi rücu edilemez');
    });
  });

  describe('33. Binalarda Enerji Kimlik Belgesi (EKB) & Ortak Alan EV Şarj İstasyonu (facilityEnergyEvChargingData.ts & TechArticle)', () => {
    it('EV Şarj kurulum seçenekleri, KMK m.42 nisapları ve EKB kriterlerini doğrular', async () => {
      const { EV_CHARGING_OPTIONS, ENERGY_EFFICIENCY_PILLARS } = await import('@/data/facilityEnergyEvChargingData');

      expect(EV_CHARGING_OPTIONS.length).toBe(2);

      const individual = EV_CHARGING_OPTIONS.find(o => o.optionId === 'individual-meter');
      expect(individual).toBeDefined();
      expect(individual?.kmkArticleRef).toContain('KMK Madde 42/1');
      expect(individual?.legalMajorityRequired).toContain('%50+1');
      expect(individual?.fireSafetyPrecautions.length).toBeGreaterThanOrEqual(3);

      const shared = EV_CHARGING_OPTIONS.find(o => o.optionId === 'shared-commercial');
      expect(shared).toBeDefined();
      expect(shared?.aloYonetimProtocol).toContain('şarj operatörleriyle');

      // Enerji verimliliği sütunları
      expect(ENERGY_EFFICIENCY_PILLARS.length).toBe(3);
      const ekb = ENERGY_EFFICIENCY_PILLARS.find(p => p.pillarCode === 'ekb-belgesi');
      expect(ekb).toBeDefined();
      expect(ekb?.legalStandard).toContain('5627');
      expect(ekb?.targetClassOrSaving).toContain('C Sınıfı');

      const mantolama = ENERGY_EFFICIENCY_PILLARS.find(p => p.pillarCode === 'dis-cephe-yalitin' || p.pillarCode === 'dis-cephe-yalitim');
      expect(mantolama).toBeDefined();
      expect(mantolama?.targetClassOrSaving).toContain('%35');
    });
  });

  describe('34. Yüzme Havuzları Sağlık Esasları & Kimyasal Standartlar (facilityPoolHealthData.ts)', () => {
    it('Sağlık Bakanlığı klor/pH limitleri, havuz defteri ve kimyasal dozaj kurallarını doğrular', async () => {
      const {
        POOL_WATER_PARAMETERS,
        POOL_REGULATION_RULES,
        POOL_HYGIENE_STEPS,
        POOL_CHEMICAL_DOSING_RULES
      } = await import('@/data/facilityPoolHealthData');

      expect(POOL_WATER_PARAMETERS.length).toBeGreaterThanOrEqual(8);

      const serbestKlorAcik = POOL_WATER_PARAMETERS.find(p => p.id === 'param-serbest-klor-acik');
      expect(serbestKlorAcik).toBeDefined();
      expect(serbestKlorAcik?.idealRange).toBe('1.0 - 3.0');
      expect(serbestKlorAcik?.unit).toContain('mg/L');

      const ph = POOL_WATER_PARAMETERS.find(p => p.id === 'param-ph');
      expect(ph).toBeDefined();
      expect(ph?.idealRange).toContain('6.5 - 7.8');

      const bagliKlor = POOL_WATER_PARAMETERS.find(p => p.id === 'param-bagli-klor');
      expect(bagliKlor?.idealRange).toContain('0.2');

      // Yönetmelik ve defter
      expect(POOL_REGULATION_RULES.length).toBe(4);
      const defter = POOL_REGULATION_RULES.find(r => r.id === 'rule-havuz-isletme-defteri');
      expect(defter).toBeDefined();
      expect(defter?.articleRef).toContain('Madde 8');
      expect(defter?.aloYonetimGuarantee).toContain('Alo Yönetim mobil');

      // 4 Aşamalı Hijyen
      expect(POOL_HYGIENE_STEPS.length).toBe(4);
      expect(POOL_HYGIENE_STEPS[2].title).toContain('Ters Yıkama');

      // Kimyasal Güvenlik (Klor-Asit teması uyarısı)
      expect(POOL_CHEMICAL_DOSING_RULES.length).toBe(4);
      const klor = POOL_CHEMICAL_DOSING_RULES.find(c => c.chemicalName.includes('Klor'));
      expect(klor?.safetyWarning).toContain('asitle');
    });
  });

  describe('35. Sitelerde Biyosidal Haşere İlaçlama & Sağlık Bakanlığı Ruhsatı (facilityBiocidalPestData.ts)', () => {
    it('Zararlı tür protokolleri, mesul müdürlük şartları ve sakin güvenlik ilkelerini doğrular', async () => {
      const {
        PEST_SPECIES_PROTOCOLS,
        BIOCIDAL_REGULATION_REQUIREMENTS,
        IPM_APPLICATION_STEPS,
        RESIDENTIAL_PEST_SAFETY_CHECKLIST
      } = await import('@/data/facilityBiocidalPestData');

      expect(PEST_SPECIES_PROTOCOLS.length).toBe(5);

      const hamambocek = PEST_SPECIES_PROTOCOLS.find(p => p.id === 'pest-hamambocekleri');
      expect(hamambocek).toBeDefined();
      expect(hamambocek?.activeMethod).toBe('Kokusuz Jel Uygulaması');
      expect(hamambocek?.evacuationNeeded).toBe(false);

      const kemirgen = PEST_SPECIES_PROTOCOLS.find(p => p.id === 'pest-kemirgenler');
      expect(kemirgen?.activeMethod).toBe('Kilitli Yem İstasyonu');
      expect(kemirgen?.aloYonetimProtocol).toContain('çift kilitli');

      // Ruhsat ve 48 saat bildirim şartı
      expect(BIOCIDAL_REGULATION_REQUIREMENTS.length).toBe(4);
      const notice = BIOCIDAL_REGULATION_REQUIREMENTS.find(r => r.id === 'req-resident-notice');
      expect(notice).toBeDefined();
      expect(notice?.legalMandate).toContain('48 saat');

      // IPM adımları ve güvenlik
      expect(IPM_APPLICATION_STEPS.length).toBe(4);
      expect(RESIDENTIAL_PEST_SAFETY_CHECKLIST.length).toBe(3);
    });
  });

  describe('36. Sitelerde Peyzaj Bakımı, Otomatik Sulama Su Tasarrufu & Ağaç Koruma (facilityLandscapeTreeData.ts)', () => {
    it('4 mevsim peyzaj takvimi, belediye ağaç izinleri ve akıllı sulama tasarrufunu doğrular', async () => {
      const {
        SEASONAL_LANDSCAPE_SCHEDULE,
        TREE_PRUNING_PERMIT_RULES,
        SMART_IRRIGATION_STANDARDS,
        LANDSCAPE_LEGAL_DISPUTES
      } = await import('@/data/facilityLandscapeTreeData');

      expect(SEASONAL_LANDSCAPE_SCHEDULE.length).toBe(4);

      const ilkbahar = SEASONAL_LANDSCAPE_SCHEDULE.find(s => s.seasonKey === 'ilkbahar');
      expect(ilkbahar).toBeDefined();
      expect(ilkbahar?.lawnCareOperations.some(op => op.includes('Vertikut'))).toBe(true);

      const kis = SEASONAL_LANDSCAPE_SCHEDULE.find(s => s.seasonKey === 'kis');
      expect(kis?.irrigationSchedule).toContain('SİSTEM TAMAMEN KAPATILIR');

      // Ağaç Budama ve Kesim İzinleri
      expect(TREE_PRUNING_PERMIT_RULES.length).toBe(4);
      const anitAgac = TREE_PRUNING_PERMIT_RULES.find(r => r.id === 'tree-anit-tescilli');
      expect(anitAgac?.permitRequired).toBe(true);
      expect(anitAgac?.legalAuthority).toContain('Tabiat Varlıklarını Koruma');

      const sehirAgac = TREE_PRUNING_PERMIT_RULES.find(r => r.id === 'tree-belediye-park-bahceler');
      expect(sehirAgac?.permitRequired).toBe(true);
      expect(sehirAgac?.legalAuthority).toContain('Park ve Bahçeler');

      // Su Tasarrufu Standartları
      expect(SMART_IRRIGATION_STANDARDS.length).toBe(3);
      const damla = SMART_IRRIGATION_STANDARDS.find(s => s.systemType.includes('Damla'));
      expect(damla?.waterSavingPercentage).toContain('%50');

      // Uyuşmazlıklar
      expect(LANDSCAPE_LEGAL_DISPUTES.length).toBe(3);
    });
  });

  describe('37. Sitelerde 4 Renkli Hijyen Standardı, GBF/MSDS & Çöp Şaftı Sanitasyonu (facilityHygieneMsdsData.ts)', () => {
    it('4 renk kodlu çapraz bulaşma önleme, 16 başlıklı GBF/MSDS ve çöp şaftı ozonlamasını doğrular', async () => {
      const {
        COLOR_CODED_HYGIENE_ZONES,
        MSDS_MANDATORY_SECTIONS,
        GARBAGE_CHUTE_SANITATION_STEPS,
        CHEMICAL_STORAGE_SAFETY_RULES
      } = await import('@/data/facilityHygieneMsdsData');

      // 4 Renkli Hijyen
      expect(COLOR_CODED_HYGIENE_ZONES.length).toBe(4);

      const kirmizi = COLOR_CODED_HYGIENE_ZONES.find(z => z.colorKey === 'kirmizi');
      expect(kirmizi).toBeDefined();
      expect(kirmizi?.assignedSurfaces.some(s => s.includes('Klozet'))).toBe(true);
      expect(kirmizi?.crossContaminationWarning).toContain('KESİNLİKLE');

      const sari = COLOR_CODED_HYGIENE_ZONES.find(z => z.colorKey === 'sari');
      expect(sari?.assignedSurfaces.some(s => s.includes('Lavabo'))).toBe(true);

      const mavi = COLOR_CODED_HYGIENE_ZONES.find(z => z.colorKey === 'mavi');
      expect(mavi?.assignedSurfaces.some(s => s.includes('Asansör'))).toBe(true);

      const yesil = COLOR_CODED_HYGIENE_ZONES.find(z => z.colorKey === 'yesil');
      expect(yesil?.assignedSurfaces.some(s => s.includes('Mutfak') || s.includes('yemek'))).toBe(true);

      // MSDS / GBF İSG Dosyası
      expect(MSDS_MANDATORY_SECTIONS.length).toBeGreaterThanOrEqual(5);
      const sec1 = MSDS_MANDATORY_SECTIONS.find(s => s.sectionNo === 1);
      expect(sec1?.mandatoryInfo).toContain('114');

      // Çöp Şaftı Ozon Sanitasyonu
      expect(GARBAGE_CHUTE_SANITATION_STEPS.length).toBe(3);
      const ozon = GARBAGE_CHUTE_SANITATION_STEPS.find(s => s.stageName.includes('Ozonlama'));
      expect(ozon).toBeDefined();
      expect(ozon?.disinfectantAgent).toContain('O3');

      // Kimyasal Depolama Kuralı
      expect(CHEMICAL_STORAGE_SAFETY_RULES.length).toBe(3);
      const klorAsit = CHEMICAL_STORAGE_SAFETY_RULES.find(r => r.ruleId === 'chem-klor-asit-ayrimi');
      expect(klorAsit?.hazardDescription).toContain('klor gazı');
    });
  });

  describe('38. Kat Mülkiyetinde İşletme Projesi Tanzimi, Tebliği & İtiraz Usulü (kmkOperatingBudgetData.ts)', () => {
    it('Bütçe gider kalemleri, KMK m.20 eşit/arsa payı dağılımı ve 7 gün itiraz süresini doğrular', async () => {
      const {
        BUDGET_ESTIMATED_EXPENSES,
        EXPENSE_ALLOCATION_RULES,
        BUDGET_NOTIFICATION_TIMELINE,
        BUDGET_LEGAL_PRECEDENTS
      } = await import('@/data/kmkOperatingBudgetData');

      expect(BUDGET_ESTIMATED_EXPENSES.length).toBeGreaterThanOrEqual(5);

      const personel = BUDGET_ESTIMATED_EXPENSES.find(e => e.id === 'exp-personel-kapici-guvenlik');
      expect(personel).toBeDefined();
      expect(personel?.kmkDistributionBasis).toContain('Eşit Paylaşım');

      const elektrik = BUDGET_ESTIMATED_EXPENSES.find(e => e.id === 'exp-ortak-elektrik-su');
      expect(elektrik?.kmkDistributionBasis).toContain('Arsa Payı');

      // Dağıtım Kuralları
      expect(EXPENSE_ALLOCATION_RULES.length).toBe(2);
      const ruleA = EXPENSE_ALLOCATION_RULES.find(r => r.ruleCode === 'kmk-20-1-a');
      expect(ruleA?.coveredExpenseTypes.some(t => t.includes('Kapıcı'))).toBe(true);

      // Tebligat ve Kesinleşme
      expect(BUDGET_NOTIFICATION_TIMELINE.length).toBe(4);
      const step3 = BUDGET_NOTIFICATION_TIMELINE.find(s => s.stepNo === 3);
      expect(step3?.timeframe).toContain('7 GÜN');
      expect(step3?.legalConsequence).toContain('İLAM NİTELİĞİNDE BELGE');

      // Emsal İçtihatlar
      expect(BUDGET_LEGAL_PRECEDENTS.length).toBe(2);
    });
  });

  describe('39. İcra İtirazının İptali, İtirazın Kaldırılması & %20 Tazminat (facilityEnforcementDisputeData.ts)', () => {
    it('İİK m.68 vs m.67 kıyaslaması, 5 aşamalı takip ve %20 icra inkar tazminatını doğrular', async () => {
      const {
        ENFORCEMENT_DISPUTE_ROUTES,
        ENFORCEMENT_PROCEDURE_STAGES,
        ENFORCEMENT_PENALTIES,
        TENANT_LIABILITY_RULES
      } = await import('@/data/facilityEnforcementDisputeData');

      expect(ENFORCEMENT_DISPUTE_ROUTES.length).toBe(2);

      const kaldirilmasi = ENFORCEMENT_DISPUTE_ROUTES.find(r => r.routeCode === 'itirazin_kaldirilmasi');
      expect(kaldirilmasi?.competentCourt).toBe('İcra Hukuk Mahkemesi');
      expect(kaldirilmasi?.statutoryTimeLimit).toContain('6 AY');

      const iptali = ENFORCEMENT_DISPUTE_ROUTES.find(r => r.routeCode === 'itirazin_iptali');
      expect(iptali?.competentCourt).toContain('Sulh Hukuk');
      expect(iptali?.statutoryTimeLimit).toContain('1 YIL');

      // 5 Aşamalı Takip
      expect(ENFORCEMENT_PROCEDURE_STAGES.length).toBe(5);
      expect(ENFORCEMENT_PROCEDURE_STAGES[1].stageTitle).toContain('İlamsız Takip');

      // Tazminatlar
      expect(ENFORCEMENT_PENALTIES.length).toBe(3);
      const inkar = ENFORCEMENT_PENALTIES.find(p => p.penaltyType.includes('İnkar'));
      expect(inkar?.rateOrAmount).toContain('%20');

      // Kiracı Sınırı (KMK m.22)
      expect(TENANT_LIABILITY_RULES.length).toBe(3);
      expect(TENANT_LIABILITY_RULES[0].legalRule).toContain('KİRA MİKTARI');
    });
  });

  describe('40. Sitelerde 6331 Sayılı İSG Kanunu, Risk Analizi & Acil Ekipler (facilityOccupationalHealthSafetyData.ts)', () => {
    it('Tehlike sınıfları, 5 zorunlu İSG belgesi, 4 acil durum ekibi ve yönetici sorumluluğunu doğrular', async () => {
      const {
        OHS_HAZARD_CLASSES,
        OHS_MANDATORY_DOCUMENTS,
        EMERGENCY_RESPONSE_TEAMS,
        OHS_ADMINISTRATIVE_PENALTIES
      } = await import('@/data/facilityOccupationalHealthSafetyData');

      expect(OHS_HAZARD_CLASSES.length).toBe(3);
      const azTehlikeli = OHS_HAZARD_CLASSES.find(h => h.hazardClass === 'Az Tehlikeli');
      expect(azTehlikeli?.riskAssessmentValidityYears).toBe(6);

      // Zorunlu Belgeler
      expect(OHS_MANDATORY_DOCUMENTS.length).toBe(5);
      const riskDoc = OHS_MANDATORY_DOCUMENTS.find(d => d.id === 'doc-risk-degerlendirmesi');
      expect(riskDoc?.statutoryBasis).toContain('6331');

      // 4 Acil Ekip
      expect(EMERGENCY_RESPONSE_TEAMS.length).toBe(4);
      const sondurme = EMERGENCY_RESPONSE_TEAMS.find(t => t.teamCode === 'sondurme');
      expect(sondurme?.teamName).toContain('Söndürme');

      const ilkyardim = EMERGENCY_RESPONSE_TEAMS.find(t => t.teamCode === 'ilkyardim');
      expect(ilkyardim?.requiredCertification).toContain('İlkyardımcı Sertifikası');

      // Cezai Sorumluluk
      expect(OHS_ADMINISTRATIVE_PENALTIES.length).toBe(3);
      const kaza = OHS_ADMINISTRATIVE_PENALTIES.find(p => p.penaltySeverityLevel.includes('Hapis'));
      expect(kaza?.managementPersonalLiability).toContain('ŞAHSİ MALVARLIĞINDAN');
    });
  });

  describe('41. Su Deposu Temizliği, Lejyonella Kontrolü & Dezenfeksiyon (facilityWaterTankSanitationData.ts)', () => {
    it('Depo tipleri, 4 aşamalı 2007/67 protokolü, lejyonella şoklaması ve su lab kriterlerini doğrular', async () => {
      const {
        WATER_TANK_TYPE_STANDARDS,
        WATER_TANK_SANITATION_STEPS,
        LEGIONELLA_SAFETY_PROTOCOLS,
        WATER_LAB_INSPECTION_CRITERIA
      } = await import('@/data/facilityWaterTankSanitationData');

      expect(WATER_TANK_TYPE_STANDARDS.length).toBe(4);
      const paslanmaz = WATER_TANK_TYPE_STANDARDS.find(t => t.tankType.includes('Paslanmaz'));
      expect(paslanmaz?.hygieneRiskLevel).toContain('Düşük Risk');

      // 4 Aşamalı Temizlik
      expect(WATER_TANK_SANITATION_STEPS.length).toBe(4);
      expect(WATER_TANK_SANITATION_STEPS[1].stageTitle).toContain('150 Bar');
      expect(WATER_TANK_SANITATION_STEPS[2].disinfectantOrTool).toContain('Klor');

      // Lejyonella Protokolü
      expect(LEGIONELLA_SAFETY_PROTOCOLS.length).toBe(2);
      const boyler = LEGIONELLA_SAFETY_PROTOCOLS.find(p => p.riskZone.includes('Boyler'));
      expect(boyler?.thermalDisinfectionMethod).toContain('60°C');

      // Laboratuvar Analizi
      expect(WATER_LAB_INSPECTION_CRITERIA.length).toBe(4);
      const ecoli = WATER_LAB_INSPECTION_CRITERIA.find(c => c.parameterCode === 'param-ecoli');
      expect(ecoli?.legalLimit).toContain('0 / 100 ml');
    });
  });

  describe('42. 30 Kurumsal n8n İş Akışı & Sistem Telemetrisi API (/api/admin/workflow-telemetry)', () => {
    it('Telemetri API uç noktası 30 akış, 7 kurumsal kategori ve güvenlik başlıklarını döner', async () => {
      const { GET } = await import('@/app/api/admin/workflow-telemetry/route');
      const response = await GET();
      expect(response.status).toBe(200);

      const headers = response.headers;
      expect(headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(headers.get('Cache-Control')).toContain('no-store');

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.summary.totalWorkflows).toBe(30);
      expect(data.summary.activeWorkflows).toBe(30);
      expect(data.summary.systemUptimePercentage).toBeGreaterThanOrEqual(99.9);
      expect(data.summary.selfHealingStatus).toBe('ACTIVE');
      expect(data.summary.bearerSecurityStatus).toBe('ENFORCED');

      // 7 Kategori
      expect(data.categories.length).toBe(7);
      const crmCat = data.categories.find((c: any) => c.name === 'CRM & Saha');
      expect(crmCat).toBeDefined();
      expect(crmCat.count).toBe(6);

      const devopsCat = data.categories.find((c: any) => c.name === 'DevOps & Sağlık');
      expect(devopsCat).toBeDefined();
      expect(devopsCat.count).toBe(11);
    });
  });

  describe('43. Kurumsal Varlık Güven Künyesi & B2B Hizmet Matrisi Güvencesi', () => {
    it('FacilityOfficialEntityTrustSeo ve FacilityCommercialTiersSeo bileşenleri dışa aktarılır ve geçerlidir', async () => {
      const { FacilityOfficialEntityTrustSeo } = await import('@/components/seo/FacilityOfficialEntityTrustSeo');
      const { FacilityCommercialTiersSeo } = await import('@/components/seo/FacilityCommercialTiersSeo');
      expect(FacilityOfficialEntityTrustSeo).toBeDefined();
      expect(FacilityCommercialTiersSeo).toBeDefined();
      expect(typeof FacilityOfficialEntityTrustSeo).toBe('function');
      expect(typeof FacilityCommercialTiersSeo).toBe('function');
    });

    it('CANONICAL_NAP kurumsal varlık künyesi 5188 ruhsatı, MERSİS ve İTO sicil numaralarını eksiksiz içerir', async () => {
      const { CANONICAL_NAP } = await import('@/lib/seo/napGuardEngine');
      expect(CANONICAL_NAP.legal.securityPermitNumber).toBe('İST-ÖGG-2015/8492');
      expect(CANONICAL_NAP.legal.mersisNumber).toBe('0054049823100018');
      expect(CANONICAL_NAP.legal.tradeRegistryNumber).toBe('712498-5');
      expect(CANONICAL_NAP.address.addressLocality).toBe('Kadıköy');
      expect(CANONICAL_NAP.contact.phoneDisplay).toBe('0216 550 48 48');
    });

    it('Tesis Yönetimi istemci sayfasında resmi kurumsal varlık ve B2B matris bileşenleri mevcuttur', async () => {
      const fs = await import('fs');
      const path = await import('path');
      const clientPath = path.join(process.cwd(), 'src/app/[lang]/hizmetler/tesis-yonetimi/TesisYonetimiClient.tsx');
      const content = fs.readFileSync(clientPath, 'utf-8');

      expect(content).toContain('<FacilityOfficialEntityTrustSeo');
      expect(content).toContain('<FacilityCommercialTiersSeo');
    });
  });
});



