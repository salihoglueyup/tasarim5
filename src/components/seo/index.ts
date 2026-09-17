/**
 * Alo Yönetim SEO Bileşenleri Merkezi Dağıtım Modülü (src/components/seo/index.ts)
 * 5 Mantıksal Alt Modül Altında Modülerleştirilmiştir:
 * 1. schema/      -> Temel Schema.org & JSON-LD Yapısal Veri Bileşenleri
 * 2. ai-overviews/-> Google AI Overviews, Gemini 2.0 & GEO RAG Bileşenleri
 * 3. kmk/         -> KMK 634 Hukuku & Yargıtay Emsalleri Rehberleri
 * 4. facility/    -> Entegre Tesis Yönetimi B2B, Bakım & Denetim Matrisleri
 * 5. district/    -> İstanbul 39 İlçe, Mahalle & Yerel SEO Bileşenleri
 */

// 1. Schema.org & Yapısal Veri
export * from './schema';

// 2. Google AI Overviews & Generative Engine Optimization
export * from './ai-overviews';

// 3. KMK Hukuku & Yargıtay Emsalleri
export * from './kmk';

// 4. Tesis Yönetimi & B2B Denetim
export * from './facility';

// 5. İlçe, Mahalle & Yerel SEO
export * from './district';
