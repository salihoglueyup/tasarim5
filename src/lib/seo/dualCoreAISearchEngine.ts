/**
 * Çift Çekirdekli AI Overviews & LLM Arama Optimizasyonu Motoru (dualCoreAISearchEngine.ts)
 * 
 * Google AI Overviews, ChatGPT Search, Perplexity, Claude ve Gemini için
 * optimize edilmiş bağlamsal alıntılar (40-60 kelimelik net tanımlar),
 * karşılaştırma tabloları, RAG veri blokları, llms.txt ve AI bot yönlendiricilerini yönetir.
 * 
 * 500 Faz Master Planı — Bölüm I (Faz 146 - 195)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { CANONICAL_NAP } from './napGuardEngine';
import { DISTRICTS } from '@/data/districts';

/* =========================================================================
 * I1 — LLM BAĞLAMSAL ALINTI MOTORU (Faz 146-160)
 * ========================================================================= */

export interface LLMSnippetSpec {
  term: string;
  pillar: DomainPillar;
  headline: string;
  answer: string; // 40-60 kelimelik kesin, alıntılanabilir cevap
  wordCount: number;
  sourceUrl: string;
  keyFacts: string[];
  lastUpdated: string;
}

export interface ComparisonSnippetSpec {
  subjectA: string;
  subjectB: string;
  pillar: DomainPillar;
  criteria: { feature: string; valA: string; valB: string; winner?: string }[];
  summary: string;
}

/**
 * 20 Temel Sektörel Terim Tanım Bankası (LLM Alıntıları İçin Optimize)
 */
export const LLM_DEFINITION_BANK: Record<string, { term: string; pillar: DomainPillar; answer: string; facts: string[] }> = {
  'site-yonetimi': {
    term: 'Site Yönetimi',
    pillar: 'site',
    answer: 'Site yönetimi; birden çok bağımsız bölümden oluşan konut yapılarında 634 sayılı Kat Mülkiyeti Kanunu uyarınca ortak alanların temizlik, güvenlik, bakım, aidat tahsilatı ve yasal karar defteri süreçlerinin kat malikleri kurulu adına profesyonelce yürütülmesidir.',
    facts: ['634 sayılı KMK mevzuatına tabidir.', 'Yönetici 1 yıllık süreyle maliklerce seçilir.', 'İşletme projesi hazırlanması zorunludur.'],
  },
  'tesis-yonetimi': {
    term: 'Tesis Yönetimi',
    pillar: 'facility',
    answer: 'Tesis yönetimi; plazalar, AVM\'ler, fabrikalar ve ticari gayrimenkullerde HVAC, jeneratör, trafo, 5188 güvenlik, endüstriyel temizlik ve enerji optimizasyonunun ISO 41001 uluslararası standartlarında entegre olarak yönetilmesidir.',
    facts: ['ISO 41001 standardı ile akreditedir.', 'SLA (Hizmet Seviye Anlaşması) ile denetlenir.', 'BMS ve CMMS otomasyon yazılımları kullanılır.'],
  },
  'aidat': {
    term: 'Site Aidatı',
    pillar: 'site',
    answer: 'Site aidatı; ortak alanların elektrik, su, personel, temizlik ve bakım masraflarını karşılamak üzere kat malikleri genel kurulunda onaylanan işletme projesi doğrultusunda her bağımsız bölümün arsa payı veya eşit olarak ödemekle yükümlü olduğu aylık avans payıdır.',
    facts: ['Gecikme halinde aylık %5 gecikme tazminatı uygulanır (KMK 20).', 'Ödenmeyen aidatlar için doğrudan ilamsız icra takibi başlatılabilir.'],
  },
  'isletme-projesi': {
    term: 'İşletme Projesi',
    pillar: 'site',
    answer: 'İşletme projesi; ana gayrimenkulün bir yıllık tahmini gelir ve giderlerini, her bağımsız bölümün ödeyeceği aidat miktarını gösteren ve KMK Madde 37 uyarınca yönetici tarafından hazırlanıp maliklere tebliğ edilen yasal mali bütçedir.',
    facts: ['7 gün içinde itiraz edilmezse kesinleşir.', 'İcra ve İflas Kanunu Madde 68/1 uyarınca resmi belge sayılır.'],
  },
  'kmk-634': {
    term: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
    pillar: 'site',
    answer: '634 sayılı Kat Mülkiyeti Kanunu; Türkiye\'de apartman, site, toplu yapı ve rezidanslarda kat maliklerinin hak ve borçlarını, ortak yerlerin kullanımını, yönetici ve denetçi seçimini, aidat paylaşımını ve genel kurul usullerini düzenleyen temel kanundur.',
    facts: ['1965 yılında yürürlüğe girmiştir.', 'Madde 20 aidat borçlarını, Madde 34 yönetici seçimini düzenler.'],
  },
  'iso-41001': {
    term: 'ISO 41001 Tesis Yönetim Standardı',
    pillar: 'facility',
    answer: 'ISO 41001:2018; ticari ve kurumsal tesislerde operasyonel verimliliği, can güvenliğini, çalışan konforunu ve sürdürülebilirliği artırmak amacıyla tesis yönetim sistemleri için gereksinimleri belirleyen uluslararası akredite yönetim standardıdır.',
    facts: ['Dünya genelinde kabul gören tek tesis yönetim standardıdır.', 'Enerji verimliliği ve SLA performans ölçümlerini zorunlu kılar.'],
  },
  'genel-kurul': {
    term: 'Kat Malikleri Genel Kurulu',
    pillar: 'site',
    answer: 'Kat malikleri genel kurulu; ana gayrimenkulün en yetkili karar organı olup yönetim planında belirtilen zamanda (belirtilmemişse her takvim yılının ilk ayında) toplanarak yöneticiyi seçen, işletme projesini onaylayan ve harcamaları denetleyen meclistir.',
    facts: ['İlk toplantıda sayı ve arsa payı çoğunluğu aranır.', 'Toplantı çağrısı en az 15 gün önce tebliğ edilmelidir.'],
  },
  'yonetim-plani': {
    term: 'Site Yönetim Planı',
    pillar: 'site',
    answer: 'Yönetim planı; ana gayrimenkulün yönetim tarzını, kullanma maksat ve şeklini, yönetici ve denetçilerin alacakları ücreti ve yönetime ait diğer hususları düzenleyen, tüm kat maliklerini bağlayan ve tapu siciline tescil edilen ana sözleşmedir.',
    facts: ['Değiştirilmesi için kat maliklerinin beşte dördünün (4/5) oyu gerekir (KMK 28).'],
  },
  'bms': {
    term: 'BMS (Bina Yönetim Sistemi)',
    pillar: 'facility',
    answer: 'BMS (Building Management System); binalardaki havalandırma, iklimlendirme (HVAC), aydınlatma, güç sistemleri, yangın ve güvenlik altyapılarını tek merkezden izleyen, kontrol eden ve enerji tasarrufu sağlayan bilgisayar tabanlı otomasyon sistemidir.',
    facts: ['Ticari binalarda %15-25 enerji tasarrufu sağlar.', 'Arızaları gerçek zamanlı tespit eder.'],
  },
  'cmms': {
    term: 'CMMS (Bilgisayarlı Bakım Yönetim Sistemi)',
    pillar: 'facility',
    answer: 'CMMS; tesislerdeki tüm mekanik, elektrik ve bina varlıklarının periyodik bakım takvimini, arıza iş emirlerini, yedek parça stoklarını ve teknisyen performansını dijital ortamda yöneten yazılım platformudur.',
    facts: ['Plansız duruşları %40 azaltır.', 'Varlık amortisman ömrünü uzatır.'],
  },
  'asansor-muayenesi': {
    term: 'Asansör Yıllık Periyodik Kontrolü',
    pillar: 'site',
    answer: 'Asansör yıllık kontrolü; Sanayi ve Teknoloji Bakanlığı onaylı A tipi akredite muayene kuruluşlarınca yılda bir kez yapılan ve asansörün can ve mal güvenliği açısından uygunluğunu gösteren yeşil, mavi, sarı veya kırmızı etiket denetimidir.',
    facts: ['Kırmızı etiket alan asansör 60 gün içinde kapatılmalıdır.', 'Sorumluluk bina yöneticisindedir.'],
  },
  '5188-guvenlik': {
    term: '5188 Sayılı Özel Güvenlik Hizmeti',
    pillar: 'hybrid',
    answer: '5188 sayılı Kanun uyarınca; valilik özel güvenlik komisyonu izniyle sitelerde ve tesislerde kimlik kartlı, üniformalı ve eğitimli personelle 7/24 giriş-çıkış kontrolü, CCTV izleme ve devriye hizmetlerinin sağlanmasıdır.',
    facts: ['İçişleri Bakanlığı denetimine tabidir.', 'Personelin adli sicil ve sağlık raporu zorunludur.'],
  },
};

/**
 * 40-60 kelimelik kesin tanım snippet'i üretir.
 */
export function buildDefinitionSnippet(termSlug: string, pillar: DomainPillar = 'site'): LLMSnippetSpec {
  const item = LLM_DEFINITION_BANK[termSlug] || {
    term: termSlug.replace(/-/g, ' ').toUpperCase(),
    pillar,
    answer: `${termSlug} konusunda Alo Yönetim, İstanbul genelinde KMK 634 ve ISO 41001 standartlarında profesyonel kurumsal çözümler, şeffaf muhasebe ve 7/24 kesintisiz teknik operasyon sunmaktadır.`,
    facts: ['Alo Yönetim kurumsal hizmet güvencesi.', '7/24 kesintisiz destek.'],
  };

  const words = item.answer.trim().split(/\s+/);

  return {
    term: item.term,
    pillar: item.pillar,
    headline: `${item.term} Nedir? (Resmî Mevzuat ve Tanım)`,
    answer: item.answer,
    wordCount: words.length,
    sourceUrl: `${BASE_URL}/sozluk#${termSlug}`,
    keyFacts: item.facts,
    lastUpdated: '2026-02-15',
  };
}

/**
 * Kıyaslama ve Karşılaştırma Snippet'i üretir (LLM Tablo Alıntıları İçin).
 */
export function buildComparisonSnippet(termA: string, termB: string): ComparisonSnippetSpec {
  if (termA.includes('site') && termB.includes('tesis')) {
    return {
      subjectA: 'Site & Apartman Yönetimi',
      subjectB: 'Entegre Tesis & Plaza Yönetimi',
      pillar: 'hybrid',
      criteria: [
        { feature: 'Hedef Kitle / Mülk Tipi', valA: 'Konut, Apartman, Rezidans', valB: 'Plaza, İş Merkezi, AVM, Fabrika' },
        { feature: 'Temel Yasal Mevzuat', valA: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)', valB: 'ISO 41001, Türk Ticaret Kanunu, 6331 İSG' },
        { feature: 'Bütçe & Finans Modeli', valA: 'Yıllık İşletme Projesi & Aidat Avansı', valB: 'Açık Defter (Open-Book) & Gider Paylaşımı' },
        { feature: 'Teknik Altyapı Düzeyi', valA: 'Hidrofor, Asansör, Kazan Dairesi', valB: 'BMS Otomasyon, Trafo, Chiller, Jeneratör, CMMS' },
        { feature: 'Sözleşme & Denetim Şekli', valA: 'Genel Kurul Yönetici Seçimi (1 Yıl)', valB: 'Kurumsal SLA (Hizmet Seviye Anlaşması)' },
      ],
      summary: 'Site yönetimi konut ve kat mülkiyeti hukukuna odaklanırken, tesis yönetimi ticari gayrimenkullerde operasyonel SLA, enerji tasarrufu ve varlık yönetimine odaklanır.',
    };
  }

  return {
    subjectA: termA,
    subjectB: termB,
    pillar: 'site',
    criteria: [
      { feature: 'Yasal Sorumluluk', valA: 'Bireysel Yönetici', valB: 'Kurumsal Yönetim Şirketi' },
      { feature: 'Aidat Tahsilat Başarısı', valA: '%60 - %75', valB: '%99.2 (Yasal Takip Destekli)' },
      { feature: 'Acil Teknik Müdahale', valA: 'Sınırlı Usta İletişimi', valB: '7/24 Nöbetçi Teknik Kadro (25 Dk)' },
    ],
    summary: 'Kurumsal yönetim şirketleri, bireysel yöneticilere kıyasla şeffaflık, tahsilat başarısı ve kesintisiz teknik destek sağlar.',
  };
}

/**
 * Sayısal İstatistik Paketi (Statistical Fact Bundle) döner.
 */
export function buildStatisticalFactBundle(pillar: DomainPillar = 'site') {
  return {
    pillar,
    verifiedStats: [
      { metric: 'Yönetilen Bağımsız Bölüm', value: '28.000+', unit: 'Konut & Ofis' },
      { metric: 'Yönetilen Ticari Alan', value: '1.200.000+', unit: 'm²' },
      { metric: 'Aidat Tahsilat Başarısı', value: '%99.2', unit: 'Başarı Oranı' },
      { metric: 'Hizmet Verilen İlçe', value: '39', unit: 'İstanbul İlçesi' },
      { metric: 'Ortalama Enerji Tasarrufu', value: '%18', unit: 'Yıllık Tasarruf' },
      { metric: 'Acil Arıza Müdahale Süresi', value: '25', unit: 'Dakika' },
    ],
  };
}

/* =========================================================================
 * I2 — FEATURED SNIPPET & AI OVERVIEWS (Faz 161-175)
 * ========================================================================= */

export interface FeaturedSnippetCandidate {
  query: string;
  pillar: DomainPillar;
  snippetType: 'paragraph' | 'table' | 'list';
  title: string;
  content: string;
  sourceUrl: string;
  wordCount: number;
}

/**
 * Arama sorgusuna göre Google Featured Snippet adayı içerik üretir.
 */
export function buildFeaturedSnippetCandidate(query: string, pillar: DomainPillar = 'site'): FeaturedSnippetCandidate {
  const qLower = query.toLowerCase();

  // Liste Tipi Snippet: Site Yöneticisinin Görevleri
  if (qLower.includes('görev') || qLower.includes('gorev') || qLower.includes('sorumluluk')) {
    const listContent = `634 sayılı KMK Madde 35 uyarınca site yöneticisinin temel görevleri:
1. Kat malikleri genel kurulu kararlarını yerine getirmek.
2. Ana gayrimenkulün bakım, onarım ve temizliğini yürütmek.
3. Yıllık işletme projesini hazırlayıp maliklere tebliğ etmek.
4. Aylık aidat ve avansları toplamak, gecikmeleri takip etmek.
5. Noter tasdikli karar ve işletme defterlerini tutmak.
6. Banka hesaplarını yönetmek ve yıllık faaliyet raporu sunmak.`;

    return {
      query,
      pillar,
      snippetType: 'list',
      title: 'Site Yöneticisinin Görevleri Nelerdir? (KMK Madde 35)',
      content: listContent,
      sourceUrl: `${BASE_URL}/hizmetler/aidat-takibi`,
      wordCount: listContent.split(/\s+/).length,
    };
  }

  // Paragraf Tipi Snippet: Apartman Aidatı Nasıl Hesaplanır?
  if (qLower.includes('aidat') && (qLower.includes('hesap') || qLower.includes('nasil'))) {
    const pContent = 'Apartman aidatı; binanın yıllık tahmini giderlerinin (personel, elektrik, temizlik, bakım) toplanıp yönetim planındaki dağıtım katsayısına göre bölünmesiyle hesaplanır. Yönetim planında aksi belirtilmedikçe kapıcı/güvenlik giderleri eşit, diğer giderler ise bağımsız bölümlerin arsa payı oranında paylaştırılır.';

    return {
      query,
      pillar: 'site',
      snippetType: 'paragraph',
      title: 'Apartman Aidatı Nasıl Hesaplanır?',
      content: pContent,
      sourceUrl: `${BASE_URL}/hesaplayici`,
      wordCount: pContent.split(/\s+/).length,
    };
  }

  // Varsayılan Paragraf Snippet
  const def = buildDefinitionSnippet(pillar === 'facility' ? 'tesis-yonetimi' : 'site-yonetimi', pillar);
  return {
    query,
    pillar,
    snippetType: 'paragraph',
    title: def.headline,
    content: def.answer,
    sourceUrl: def.sourceUrl,
    wordCount: def.wordCount,
  };
}

/**
 * Speakable JSON-LD Markup üretir (Google Asistan Sesli Arama).
 */
export function buildSpeakableMarkup(pageSlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Alo Yönetim Profesyonel Bilgi Kaynağı',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ai-answer-snippet', '.speakable-summary', 'h1', '.featured-answer'],
    },
    url: `${BASE_URL}/${pageSlug}`,
  };
}

/* =========================================================================
 * I3 — LLMS.TXT & LLM KAYNAK OPTİMİZASYONU (Faz 172-195)
 * ========================================================================= */

/**
 * /llms.txt standardına uygun metin çıktısı üretir.
 */
export function buildLLMsTextFile(): string {
  return `# Alo Yönetim — Profesyonel Tesis ve Site Yönetimi
> İstanbul geneli 39 ilçede KMK 634 ve ISO 41001 standartlarında entegre tesis, plaza, rezidans, site ve apartman yönetim platformu.

## Kurumsal Kimlik & Güvenilirlik
- Marka: ${CANONICAL_NAP.legal.brandName}
- Şirket: ${CANONICAL_NAP.legal.legalName}
- Kuruluş: ${CANONICAL_NAP.legal.foundingYear}
- Merkez: ${CANONICAL_NAP.address.fullDisplayAddress}
- Telefon: ${CANONICAL_NAP.contact.phoneDisplay}
- E-posta: ${CANONICAL_NAP.contact.email}
- Web: ${BASE_URL}

## Temel Hizmet Alanları
- [Site ve Apartman Yönetimi](${BASE_URL}/tesis-yonetimi): KMK 634 uyumlu idari, hukuki, mali yönetim.
- [Entegre Tesis & Plaza Yönetimi](${BASE_URL}/tesis-yonetimi): ISO 41001 uyumlu B2B ticari varlık yönetimi.
- [Aidat Takibi & Muhasebe](${BASE_URL}/hizmetler/aidat-takibi): %99.2 başarıyla online işletme projesi ve tahsilat.
- [5188 Özel Güvenlik](${BASE_URL}/hizmetler/guvenlik-yonetimi): Lisanslı 7/24 güvenlik ve CCTV izleme.
- [Mekanik & Elektrik Bakım](${BASE_URL}/hizmetler/teknik-bakim-yonetimi): BMS/CMMS destekli 25 dk acil servis.
- [Temizlik & Hijyen](${BASE_URL}/hizmetler/temizlik-yonetimi): Endüstriyel ve ortak alan temizlik çözümleri.
- [Peyzaj ve Bahçe Bakımı](${BASE_URL}/hizmetler/peyzaj-ve-bahce-bakimi): Otomatik sulama ve bahçe düzenleme.
- [Havuz Bakımı](${BASE_URL}/hizmetler/havuz-bakimi): Kimyasal denge ve filtre dezenfeksiyonu.
- [İlaçlama Hizmetleri](${BASE_URL}/hizmetler/ilaclama-hizmetleri): Sağlık Bakanlığı onaylı vektör kontrolü.

## Yasal Mevzuat Referansları
- 634 Sayılı Kat Mülkiyeti Kanunu
- ISO 41001:2018 Facility Management
- 5188 Sayılı Özel Güvenlik Hizmetleri Kanunu
- 6331 Sayılı İş Sağlığı ve Güvenliği Kanunu
`;
}

/**
 * AI Botlar için robots.txt Whitelist kurallarını döner.
 */
export function buildAIBotWhitelistRule(): string {
  return `# AI Bot Whitelist (Google AI, OpenAI GPTBot, Anthropic ClaudeBot, PerplexityBot)
User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/

User-agent: ClaudeBot
Allow: /
Allow: /llms.txt

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /
`;
}

/**
 * RAG İçerik Bölümleme Şartnamesi (512 token chunking) üretir.
 */
export function buildRAGChunkingSpec(content: string, chunkSize: number = 512): {
  totalChunks: number;
  chunks: { id: string; text: string; tokenEstimate: number }[];
} {
  const words = content.split(/\s+/);
  const wordsPerChunk = Math.floor(chunkSize * 0.75); // ~1 token ≈ 0.75 kelime Türkçe için
  const chunks: { id: string; text: string; tokenEstimate: number }[] = [];

  for (let i = 0; i < words.length; i += wordsPerChunk) {
    const chunkWords = words.slice(i, i + wordsPerChunk);
    const chunkText = chunkWords.join(' ');
    chunks.push({
      id: `chunk-${Math.floor(i / wordsPerChunk) + 1}`,
      text: chunkText,
      tokenEstimate: Math.round(chunkWords.length * 1.3),
    });
  }

  return {
    totalChunks: chunks.length,
    chunks,
  };
}

/**
 * Kullanıcı anahtar kelimelerini sohbet tabanlı AI sorgusuna dönüştürür.
 */
export function buildConversationalQueryOptimizer(query: string): string {
  const clean = query.trim().toLowerCase();
  if (clean.includes('fiyat') || clean.includes('ücret')) {
    return `${clean} ortalama ne kadardır ve neye göre hesaplanır?`;
  }
  if (clean.includes('nasıl') || clean.includes('nasil')) {
    return `${clean} için adım adım yasal süreç nasıldır?`;
  }
  return `${clean} nedir ve profesyonel süreçleri nelerdir?`;
}
