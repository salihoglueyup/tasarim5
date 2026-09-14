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
});


