import { describe, it, expect } from 'vitest';
import {
  analyzeContentSeo,
  getFacilityTopicCluster,
  getTopicalAuthoritySummary,
  evaluateSnippetHealth,
  calculateTurkishReadabilityScore,
  analyzeHeadingStructure,
  extractKeyFactsAndKpis,
  classifySearchIntent,
  extractFaqCandidatesFromContent,
  resolveTopicalEntityGraph,
  auditFullPageSeo,
  generateHubAndSpokeGraph,
  FACILITY_MANAGEMENT_ENTITIES,
  normalizeText,
  calculateTopicalAuthorityMatrix,
  generateGeoIntentResponse,
  getFacilityManagementSemanticGraph,
} from './seoEngine';
import {
  buildMetadata,
  validateSnippetQuality,
  localizedUrl,
  buildLanguageAlternates,
  sanitizeCanonicalUrl,
  buildBreadcrumbTitleChain,
  generateSocialShareUrls,
  buildPaginationAlternates,
} from './seo';
import { autoLinkHtml } from './autoLinker';
import { TERMS } from '@/data/dictionary';
import { DISTRICTS } from '@/data/districts';

describe('seoEngine & seo.ts Derinlemesine Test Paketi', () => {
  describe('İçerik & Anahtar Kelime Analizi (analyzeContentSeo)', () => {
    it('içerik içindeki tesis yönetimi anahtar kelimesini ve yoğunluğunu doğru hesaplar', () => {
      const sampleText = `
        İstanbul genelinde profesyonel tesis yönetimi hizmeti sunuyoruz. 
        Tesis yönetimi alanında KMK 634 sayılı kanuna tam uyumlu çalışıyoruz.
        Site yönetimi ve apartman yönetimi konularında şeffaf aidat takibi sağlıyoruz.
        Ayrıca 5188 sayılı özel güvenlik ve teknik bakım çözümlerimiz mevcuttur.
        Kadıköy ve Beşiktaş bölgelerinde uzmanız.
      `;

      const audit = analyzeContentSeo(sampleText, 'tesis yönetimi');

      expect(audit.wordCount).toBeGreaterThan(0);
      expect(audit.primaryKeyword).toBe('tesis yönetimi');
      expect(audit.primaryKeywordCount).toBeGreaterThanOrEqual(2);
      expect(audit.primaryKeywordDensity).toBeGreaterThan(0);
      expect(audit.topicalScore).toBeGreaterThan(50);
      expect(audit.recommendedInternalLinks.length).toBeGreaterThan(0);
    });

    it('eksik kritik varlıkları tespit eder ve raporlar', () => {
      const bareText = 'Sadece temizlik yapıyoruz başka hiçbir detay yok.';
      const audit = analyzeContentSeo(bareText, 'tesis yönetimi');

      expect(audit.missingCriticalEntities.length).toBeGreaterThan(3);
      expect(audit.missingCriticalEntities).toContain('5188 Sayılı Özel Güvenlik');
    });
  });

  describe('Arama Niyeti Sınıflandırıcısı (classifySearchIntent)', () => {
    it('işlemsel (transactional) niyetleri doğru tespit eder ve teklif CTA önerir', () => {
      const result = classifySearchIntent('Kadıköy tesis yönetimi fiyatları ve teklif al');
      expect(result.intent).toBe('transactional');
      expect(result.recommendedCta).toContain('Teklifi');
      expect(result.matchedSignals.length).toBeGreaterThan(0);
    });

    it('bilgisel (informational) niyetleri doğru sınıflandırır', () => {
      const result = classifySearchIntent('KMK 634 işletme projesi nedir ve nasıl hazırlanır?');
      expect(result.intent).toBe('informational');
      expect(result.recommendedSchemaType).toContain('Article');
    });

    it('ticari araştırma (commercial) niyetini tespit eder', () => {
      const result = classifySearchIntent('İstanbul en iyi tesis yönetim firmaları ve karşılaştırma');
      expect(result.intent).toBe('commercial');
    });

    it('gezinme (navigational) niyetini tespit eder', () => {
      const result = classifySearchIntent('alo yönetim giriş portalı ve iletişim');
      expect(result.intent).toBe('navigational');
    });
  });

  describe('Otomatik FAQ Çıkarıcı & Schema Builder (extractFaqCandidatesFromContent)', () => {
    it('metindeki soru ve cevapları başarıyla ayıklar ve Schema.org FAQPage üretir', () => {
      const content = `
        Giriş yazısı ve genel bilgiler.

        Tesis Yönetimi Nedir?
        Tesis yönetimi, binaların idari, hukuki, teknik ve temizlik operasyonlarının uzman kadrolarca yönetilmesidir.

        İşletme Projesi Zorunlu mu?
        634 sayılı KMK 37. maddesi uyarınca her kat malikleri kurulu öncesinde işletme projesinin hazırlanması yasal bir zorunluluktur.
      `;

      const { faqs, schema } = extractFaqCandidatesFromContent(content);

      expect(faqs.length).toBe(2);
      expect(faqs[0].question).toContain('Tesis Yönetimi Nedir?');
      expect(faqs[0].answer).toContain('uzman kadrolarca');
      expect(schema).toBeDefined();
      expect(schema?.['@type']).toBe('FAQPage');
      expect(schema?.mainEntity.length).toBe(2);
    });
  });

  describe('Topikal Varlık Grafiği Çözümleyicisi (resolveTopicalEntityGraph)', () => {
    it('metindeki birden fazla geçen varlıkları about, tek geçenleri mentions olarak gruplar', () => {
      const content = `
        Tesis yönetimi ve profesyonel tesis yönetimi hizmetlerimiz kapsamında ISO 41001 standardı uygulanır.
        Ayrıca sitelerde 5188 sayılı özel güvenlik hizmeti verilir.
      `;

      const graph = resolveTopicalEntityGraph(content);

      expect(graph.about.length).toBeGreaterThan(0);
      expect(graph.about.some((a) => a.name === 'Tesis Yönetimi')).toBe(true);
      expect(graph.about.find((a) => a.name === 'Tesis Yönetimi')?.sameAs).toContain('wikidata.org/wiki/Q1391515');
      expect(graph.mentions.some((m) => m.name === '5188 Sayılı Özel Güvenlik')).toBe(true);
    });
  });

  describe('Tam Sayfa SEO Teşhis Motoru (auditFullPageSeo)', () => {
    it('tüm SEO bileşenlerini tek bir sağlık skorunda birleştirir', () => {
      const fullAudit = auditFullPageSeo({
        title: 'Profesyonel Tesis Yönetimi İstanbul | 7/24 Alo Yönetim',
        description: 'İstanbul genelinde apartman, site ve plazalar için profesyonel tesis yönetimi, 5188 güvenlik ve şeffaf KMK aidat takibi. Ücretsiz keşif için tıklayın.',
        content: `
# İstanbul Profesyonel Tesis Yönetimi
Alo Yönetim, 634 Sayılı Kat Mülkiyeti Kanunu ve 5188 Sayılı Özel Güvenlik Kanunu çerçevesinde entegre çözümler sunar.
Projelerimizde %30 aidat ve gider tasarrufu sağlanır.

## Tesis Yönetimi Nedir?
Tesis yönetimi tüm bina operasyonlarının tek elden yürütülmesidir.

## İşletme Projesi Nasıl Hazırlanır?
KMK 37 gereğince bütçe tahminleri yapılarak hazırlanır.
        `,
        targetKeyword: 'tesis yönetimi',
        currentPath: '/hizmetler/tesis-yonetimi',
      });

      expect(fullAudit.overallScore).toBeGreaterThanOrEqual(75);
      expect(fullAudit.snippet.isOptimal).toBe(true);
      expect(fullAudit.readability.score).toBeGreaterThan(0);
      expect(fullAudit.headings.isValid).toBe(true);
      expect(fullAudit.extractedFaqs.length).toBe(2);
      expect(fullAudit.extractedFacts.length).toBeGreaterThanOrEqual(2);
      expect(fullAudit.hubAndSpoke.spokes.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe('Snippet Sağlık & CTR Değerlendirmesi (evaluateSnippetHealth)', () => {
    it('mükemmel ve optimize bir başlık/açıklama için yüksek puan (>= 80) verir', () => {
      const title = 'Profesyonel Tesis Yönetimi İstanbul | 7/24 Alo Yönetim';
      const desc =
        'İstanbul genelinde apartman, site ve plazalar için profesyonel tesis yönetimi, 5188 güvenlik ve şeffaf KMK aidat takibi. Ücretsiz keşif için tıklayın.';

      const report = evaluateSnippetHealth(title, desc, 'tesis yönetimi');

      expect(report.score).toBeGreaterThanOrEqual(80);
      expect(report.isOptimal).toBe(true);
      expect(report.hasPrimaryKeywordInTitle).toBe(true);
      expect(report.hasPrimaryKeywordInDescription).toBe(true);
      expect(report.hasLocationSignal).toBe(true);
      expect(report.detectedCtrTriggers.length).toBeGreaterThanOrEqual(2);
    });

    it('çok kısa başlık ve eksik anahtar kelimede puan kırar ve öneri üretir', () => {
      const title = 'Hizmetlerimiz';
      const desc = 'Bize ulaşın.';

      const report = evaluateSnippetHealth(title, desc, 'tesis yönetimi');

      expect(report.score).toBeLessThan(70);
      expect(report.isOptimal).toBe(false);
      expect(report.hasPrimaryKeywordInTitle).toBe(false);
      expect(report.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('Türkçe Ateşman Okunabilirlik İndeksi (calculateTurkishReadabilityScore)', () => {
    it('kurumsal ve akıcı bir Türkçe metin için doğru okunabilirlik puanı ve seviyesi üretir', () => {
      const text =
        'Alo Yönetim, apartman ve site yönetimlerinde şeffaf aidat takibi, teknik bakım ve güvenlik hizmetleri sunar. 634 sayılı kanun kapsamında bütçenizi korur.';

      const report = calculateTurkishReadabilityScore(text);

      expect(report.score).toBeGreaterThanOrEqual(40);
      expect(report.totalWords).toBeGreaterThan(10);
      expect(report.totalSentences).toBe(2);
      expect(report.totalSyllables).toBeGreaterThan(20);
      expect(report.level).toBeTruthy();
      expect(report.feedback).toBeTruthy();
    });

    it('boş metin için varsayılan güvenli rapor döner', () => {
      const report = calculateTurkishReadabilityScore('');
      expect(report.score).toBe(100);
      expect(report.totalWords).toBe(0);
    });
  });

  describe('Başlık Hiyerarşisi Analizi (analyzeHeadingStructure)', () => {
    it('doğru yapılandırılmış H1, H2 ve H3 hiyerarşisini onaylar', () => {
      const content = `
# İstanbul Profesyonel Tesis Yönetimi
## 634 Sayılı KMK Kapsamında Site Yönetimi
### Şeffaf Aidat Tahsilatı
## 5188 Sayılı Kanun Özel Güvenlik Hizmetleri
### 7/24 Kamera ve Devriye
      `;

      const report = analyzeHeadingStructure(content);

      expect(report.isValid).toBe(true);
      expect(report.h1Count).toBe(1);
      expect(report.h2Count).toBe(2);
      expect(report.h3Count).toBe(2);
      expect(report.issues.length).toBe(0);
    });

    it('birden fazla H1 olduğunda uyarı verir', () => {
      const content = `
# Başlık Bir
# Başlık İki
## Alt Başlık
      `;

      const report = analyzeHeadingStructure(content);

      expect(report.isValid).toBe(false);
      expect(report.h1Count).toBe(2);
      expect(report.issues.some((i) => i.includes('birden fazla'))).toBe(true);
    });
  });

  describe('AI Arama Motoru Olguları & KPI Çıkarımı (extractKeyFactsAndKpis)', () => {
    it('metindeki kanun, standart, süre ve yüzdeleri yapılandırılmış olarak ayıklar', () => {
      const content = `
        Alo Yönetim ile çalışan tesislerde ortak giderlerde %30 tasarruf sağlanır.
        Tüm operasyonlarımız 634 Sayılı Kat Mülkiyeti Kanunu ve 5188 Sayılı Özel Güvenlik Kanunu ile güvence altındadır.
        ISO 41001 standartlarında hizmet verilir ve 7/24 kesintisiz destek sağlanır.
      `;

      const facts = extractKeyFactsAndKpis(content);

      expect(facts.length).toBeGreaterThanOrEqual(4);
      expect(facts.some((f) => f.type === 'percentage')).toBe(true);
      expect(facts.some((f) => f.type === 'legal_code')).toBe(true);
      expect(facts.some((f) => f.type === 'standard')).toBe(true);
      expect(facts.some((f) => f.type === 'timeframe')).toBe(true);
    });
  });

  describe('Hub & Spoke Grafiği (generateHubAndSpokeGraph)', () => {
    it('ana hub, kardeş servisler ve 39 ilçe spoke linklerini eksiksiz üretir', () => {
      const graph = generateHubAndSpokeGraph('/hizmetler/tesis-yonetimi');

      expect(graph.hub.url).toContain('/hizmetler/tesis-yonetimi');
      expect(graph.hub.wikidata).toBe('https://www.wikidata.org/wiki/Q1391515');
      expect(graph.spokes.length).toBeGreaterThanOrEqual(12);
      expect(graph.siblings.length).toBeGreaterThan(0);
      expect(graph.relatedArticles.length).toBeGreaterThan(0);
    });
  });

  describe('Topic Cluster & Varlık Havuzu', () => {
    it('tanımlı tesis yönetimi varlıklarının geçerli slug ve varyasyonlara sahip olduğunu doğrular', () => {
      expect(FACILITY_MANAGEMENT_ENTITIES.length).toBeGreaterThanOrEqual(10);
      for (const entity of FACILITY_MANAGEMENT_ENTITIES) {
        expect(entity.name).toBeTruthy();
        expect(entity.pillarUrl).toMatch(/^\/hizmetler\//);
        expect(entity.variations.length).toBeGreaterThan(0);
        expect(entity.wikidata).toMatch(/^https:\/\/www\.wikidata\.org\/wiki\//);
      }
    });

    it('tematik küme (Topic Cluster) düğümlerini ve Wikidata referanslarını üretir', () => {
      const cluster = getFacilityTopicCluster();
      expect(cluster.length).toBeGreaterThan(3);

      const pillarNode = cluster.find((c) => c.type === 'pillar');
      expect(pillarNode).toBeDefined();
      expect(pillarNode?.url).toContain('/hizmetler/tesis-yonetimi');
      expect(pillarNode?.wikidataSameAs).toBe('https://www.wikidata.org/wiki/Q1391515');
    });

    it('AI / LLM botları için topikal otorite metnini eksiksiz üretir', () => {
      const summary = getTopicalAuthoritySummary();
      expect(summary).toContain('ALO YÖNETİM');
      expect(summary).toContain('ISO 41001:2018');
      expect(summary).toContain('Kat Mülkiyeti Kanunu');
      expect(summary).toContain('https://www.wikidata.org/wiki/Q1391515');
    });
  });

  describe('Merkezi Metadata Fabrikası (seo.ts)', () => {
    it('Googlebot için gelişmiş yönergeleri (max-image-preview: large) ve yerel başlıkları ekler', () => {
      const meta = buildMetadata({
        title: 'Tesis Yönetimi İstanbul',
        description: 'İstanbul genelinde profesyonel tesis yönetimi ve site işletmeciliği.',
        path: '/hizmetler/tesis-yonetimi',
        targetKeyword: 'tesis yönetimi',
      });

      expect(meta.title).toBe('Tesis Yönetimi İstanbul');
      expect(meta.alternates?.canonical).toBe('https://aloyonetim.com.tr/hizmetler/tesis-yonetimi');
      expect(meta.keywords).toContain('tesis yönetimi');

      const robots = meta.robots as any;
      expect(robots.googleBot?.['max-image-preview']).toBe('large');
      expect(robots.googleBot?.['max-snippet']).toBe(-1);

      expect(meta.other?.['geo.region']).toBe('TR-34');
      expect(meta.other?.['geo.placename']).toContain('Kadıköy');
      expect(meta.other?.['DC.title']).toBe('Tesis Yönetimi İstanbul');
    });

    it('sanitizeCanonicalUrl takip ve UTM parametrelerini temizler', () => {
      const dirtyUrl = 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi?utm_source=google&utm_medium=cpc&fbclid=IwAR123&gclid=Cj0KCQ';
      const clean = sanitizeCanonicalUrl(dirtyUrl);
      expect(clean).toBe('https://aloyonetim.com.tr/hizmetler/tesis-yonetimi');
    });

    it('buildPaginationAlternates sayfalama kanonik ve prev/next bağlantılarını doğru oluşturur', () => {
      const p1 = buildPaginationAlternates('/blog', 1, 5, 'tr');
      expect(p1.canonical).toBe('https://aloyonetim.com.tr/blog');
      expect(p1.prev).toBeUndefined();
      expect(p1.next).toBe('https://aloyonetim.com.tr/blog/page/2');

      const p2 = buildPaginationAlternates('/blog', 2, 5, 'tr');
      expect(p2.canonical).toBe('https://aloyonetim.com.tr/blog/page/2');
      expect(p2.prev).toBe('https://aloyonetim.com.tr/blog');
      expect(p2.next).toBe('https://aloyonetim.com.tr/blog/page/3');

      const p5 = buildPaginationAlternates('/blog', 5, 5, 'tr');
      expect(p5.canonical).toBe('https://aloyonetim.com.tr/blog/page/5');
      expect(p5.prev).toBe('https://aloyonetim.com.tr/blog/page/4');
      expect(p5.next).toBeUndefined();
    });

    it('buildBreadcrumbTitleChain breadcrumbs zincirini doğru formatlar', () => {
      const crumbs = [
        { name: 'Anasayfa', url: '/' },
        { name: 'Hizmetler', url: '/hizmetler' },
        { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
      ];
      const title = buildBreadcrumbTitleChain(crumbs, ' | ');
      expect(title).toBe('Tesis Yönetimi | Hizmetler');
    });

    it('generateSocialShareUrls doğru encode edilmiş linkler üretir', () => {
      const links = generateSocialShareUrls(
        '/hizmetler/tesis-yonetimi',
        'Tesis Yönetimi',
        'İstanbul Tesis Yönetimi'
      );
      expect(links.whatsapp).toContain('api.whatsapp.com');
      expect(links.linkedin).toContain('linkedin.com');
      expect(links.twitter).toContain('twitter.com');
      expect(links.facebook).toContain('facebook.com');
    });

    it('validateSnippetQuality başlık ve açıklama sınırlarını doğru kontrol eder', () => {
      const good = validateSnippetQuality(
        'Profesyonel Tesis Yönetimi | Alo Yönetim',
        'İstanbul genelinde apartman, site, plaza ve entegre tesis yönetimi hizmetleri sunuyoruz. 7/24 güvenlik ve teknik bakım.'
      );
      expect(good.isTitleValid).toBe(true);
      expect(good.isDescriptionValid).toBe(true);
      expect(good.suggestions.length).toBe(0);

      const bad = validateSnippetQuality('Kısa', 'Çok kısa');
      expect(bad.isTitleValid).toBe(false);
      expect(bad.isDescriptionValid).toBe(false);
      expect(bad.suggestions.length).toBeGreaterThanOrEqual(2);
    });

    it('normalizeText Türkçe harfleri doğru normalize eder', () => {
      expect(normalizeText('İSTANBUL')).toBe('istanbul');
      expect(normalizeText('KADIKÖY')).toBe('kadikoy');
      expect(normalizeText('Şeffaf Çözümler')).toBe('seffaf cozumler');
    });
  });

  describe('Dinamik İç Linkleme ve Örümcek Ağı (autoLinker.ts)', () => {
    it('ilçe ve tesis yönetimi anahtar kelimelerini ilgili silolara bağlar', () => {
      const html = '<p>Kadıköy tesis yönetimi alanında lider olan firmamız, 5188 sayılı özel güvenlik çözümleri sunar.</p>';
      const linked = autoLinkHtml(html);

      expect(linked).toContain('/bolgeler/kadikoy/tesis-yonetimi');
      expect(linked).toContain('/hizmetler/guvenlik-yonetimi');
    });

    it('bulunulan sayfanın kendi URL sine link vermeyi (self-loop) engeller', () => {
      const html = '<p>Tesis yönetimi ve entegre tesis yönetimi hizmetlerimiz mevcuttur.</p>';
      const linked = autoLinkHtml(html, '/hizmetler/tesis-yonetimi');

      // Kendi sayfasına link vermemeli
      expect(linked).not.toContain('href="/hizmetler/tesis-yonetimi"');
    });
  });

  describe('Topikal Otorite Kapsam Matrisi (calculateTopicalAuthorityMatrix)', () => {
    it('5 temel tesis yönetimi disiplinindeki kapsamı ve puanı doğru hesaplar', () => {
      const comprehensiveText = `
        İstanbul genelinde kat mülkiyeti kanunu (KMK 634) kapsamında işletme projesi ve genel kurul süreçlerini yönetiyoruz.
        5188 sayılı özel güvenlik görevlileri ve cctv kamera sistemleriyle 7/24 nizamiye güvenliği sağlıyoruz.
        Asansör yeşil etiket, jeneratör ve hidrofor periyodik teknik bakım işlemlerini uzman mühendislerimizle yapıyoruz.
        TSE 13811 standartlarında ortak alan temizlik ve biyosidal dezenfeksiyon uyguluyoruz.
        Şeffaf aidat muhasebesi, online ödeme ve enerji kimlik belgesi (EKB) tasarruf çözümleri sunuyoruz.
      `;

      const matrix = calculateTopicalAuthorityMatrix(comprehensiveText);

      expect(matrix.overallCoveragePercent).toBeGreaterThanOrEqual(80);
      expect(['A+', 'A']).toContain(matrix.grade);
      expect(matrix.disciplines.length).toBe(5);
      expect(matrix.disciplines.every((d) => d.status === 'tam' || d.status === 'yeterli')).toBe(true);
    });

    it('eksik disiplinler için geliştirme önerileri üretir', () => {
      const shortText = 'Sadece merdiven temizliği ve ortak alan temizlik hizmeti veriyoruz.';
      const matrix = calculateTopicalAuthorityMatrix(shortText);

      expect(matrix.overallCoveragePercent).toBeLessThan(50);
      expect(matrix.recommendations.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('AI GeoIntent & LLM Kanıt Üretici (generateGeoIntentResponse)', () => {
    it('Kadıköy ilçesi için yapılandırılmış AI yanıtı ve kaynak linkleri üretir', () => {
      const res = generateGeoIntentResponse('kadikoy', 'tesis-yonetimi');

      expect(res.districtName).toBe('Kadıköy');
      expect(res.side).toBe('Anadolu');
      expect(res.responseMarkdown).toContain('ISO 41001:2018');
      expect(res.responseMarkdown).toContain('634 Sayılı Kat Mülkiyeti Kanunu');
      expect(res.citations.length).toBe(3);
    });
  });

  describe('Tesis Yönetimi Semantik Bilgi Grafiği (getFacilityManagementSemanticGraph)', () => {
    it('Schema.org @graph içinde DefinedTermSet ve ProfessionalService varlıklarını eksiksiz döner', () => {
      const graph = getFacilityManagementSemanticGraph();

      expect(graph['@context']).toBe('https://schema.org');
      expect(Array.isArray(graph['@graph'])).toBe(true);
      expect(graph['@graph'].length).toBe(2);

      const service = graph['@graph'].find((item: any) => item['@type'] === 'ProfessionalService');
      const terms = graph['@graph'].find((item: any) => item['@type'] === 'DefinedTermSet');

      expect(service).toBeDefined();
      expect(terms).toBeDefined();
      expect(terms.hasDefinedTerm.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('Sözlük & Terim Otoritesi (dictionary.ts)', () => {
    it('ISO 41001, KMK 37, KMK 20, Yeşil Etiket ve EKB gibi kritik terimleri içerir', () => {
      const termNames = TERMS.map((t) => t.term);

      expect(termNames.some((t) => t.includes('ISO 41001'))).toBe(true);
      expect(termNames.some((t) => t.includes('Madde 37'))).toBe(true);
      expect(termNames.some((t) => t.includes('Madde 20'))).toBe(true);
      expect(termNames.some((t) => t.includes('Yeşil Etiket'))).toBe(true);
      expect(termNames.some((t) => t.includes('Enerji Kimlik Belgesi'))).toBe(true);
      expect(TERMS.length).toBeGreaterThanOrEqual(25);
    });

    it('yeni eklenen terimler için geçerli iç linkler mevcuttur', () => {
      const isoTerm = TERMS.find((t) => t.term.includes('ISO 41001'));
      expect(isoTerm?.link?.href).toBe('/hizmetler/tesis-yonetimi');
    });
  });

  describe('İlçe Yerel SEO Veri Bütünlüğü (districts.ts)', () => {
    it('tüm ilçelerin coğrafi koordinatları ve aktif proje sayıları eksiksizdir', () => {
      expect(DISTRICTS.length).toBeGreaterThanOrEqual(12);

      for (const d of DISTRICTS) {
        expect(d.slug).toBeDefined();
        expect(d.name).toBeDefined();
        expect(['Anadolu', 'Avrupa']).toContain(d.side);
        expect(d.geo.lat).toBeGreaterThan(40);
        expect(d.geo.lng).toBeGreaterThan(28);
        expect(d.neighborhoods.length).toBeGreaterThanOrEqual(4);
        expect(d.managedProjects).toBeGreaterThan(0);
      }
    });
  });

  describe('Sektörel Çözümler & Referanslar Çapraz Linkleme', () => {
    it('referans sayfasında kendi URL sine link vermeyi engeller', () => {
      const text = '<p>Rezidans yönetimi ve tesis yönetimi projelerimizde %30 enerji tasarrufu sağlıyoruz.</p>';
      const linked = autoLinkHtml(text, '/referanslar/neva-rezidans');

      expect(linked).toContain('/hizmetler/tesis-yonetimi');
      expect(linked).not.toContain('href="/referanslar/neva-rezidans"');
    });

    it('sektörel çözümler için arama niyeti commercial veya transactional olarak sınıflandırılır', () => {
      const plazaQuery = 'plaza tesis yönetimi fiyat teklifi';
      const intent = classifySearchIntent(plazaQuery);

      expect(['commercial', 'transactional']).toContain(intent.intent);
      expect(intent.recommendedCta).toBeDefined();
    });
  });
});
