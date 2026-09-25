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

// 6. Kariyer, İstihdam Köprüsü & Açık Pozisyonlar
export * from './career';

// 7. Güvenlik Akademisi, Kurs Paketleri & Sınav Takvimi
export * from './academy';

// 8. Vizyon, Misyon & Kurumsal Şeffaflık Standartları
export * from './vision';

// 9. Çatı GES, Güneş Enerjisi & Sürdürülebilirlik
export * from './ges';

// 10. Hizmetler Merkezi, Bento Grid & Çözüm Kataloğu
export * from './services';

// 11. Kalite Politikası, ISO Standartları & PUKÖ Kaizen Çarkı
export * from './quality';
