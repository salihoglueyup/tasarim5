/**
 * İstanbul ilçe veri modeli tipleri (Faz 5 mikro modülü).
 */

export type District = {
  /** URL slug (ASCII, tireli) — ör. "kadikoy". */
  slug: string;
  /** Görünen ad — ör. "Kadıköy". */
  name: string;
  /** Yaka: Anadolu veya Avrupa. */
  side: 'Anadolu' | 'Avrupa';
  /** Yaklaşık nüfus (yerel ölçek sinyali). */
  population: number;
  /** İlçe merkez koordinatı (LocalBusiness/GeoCoordinates için). */
  geo: { lat: number; lng: number };
  /** Öne çıkan mahalleler/semtler (near-me + özgünlük). */
  neighborhoods: string[];
  /** İlçeye özgü 2-3 cümlelik özgün tanım (spin değil). */
  intro: string;
  /** İlçenin tipik konut dokusuna göre yerel yönetim ihtiyaçları. */
  localNeeds: string[];
  /** Temsili yönetilen proje sayısı (yerel kanıt bloğu — Faz 114). */
  managedProjects: number;
  /**
   * Önceliklendirme (Faz 113): 1 = en yüksek potansiyel. Yüksek öncelikli
   * ilçeler daha zengin içerik ve kademeli indekslemede öne alınır (Faz 127).
   */
  priority: 1 | 2 | 3;
  /** Mahalle düzeyinde programatik SEO verisi (Faz 8A — Priority 1 ilçeler). */
  neighborhoodData?: NeighborhoodInfo[];
  /** Ortalama piyasa aidat m² endeksi (TL/m²). */
  avgDuesM2?: number;
  /** Alo Yönetim optimize aidat m² endeksi (TL/m²). */
  aloDuesM2?: number;
  /** Ortalama kanıtlanmış tasarruf oranı (%). */
  savingsRate?: number;
};

export type NeighborhoodInfo = {
  /** URL slug — ASCII, tireli (ör. "moda"). */
  slug: string;
  /** Görünen ad (ör. "Moda"). */
  name: string;
  /** 2-3 cümle özgün mahalle tanımı. */
  intro: string;
  /** Mahalleye özgü konut/tesis karakteristikleri. */
  characteristics: string[];
  /** Yaklaşık merkez koordinatı (opsiyonel). */
  geo?: { lat: number; lng: number };
};
