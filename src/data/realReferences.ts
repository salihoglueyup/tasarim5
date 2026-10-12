/**
 * Gerçek referans listesi (tek kaynak).
 * Kaynak: şirketin referans listesi ve tanıtım kataloğu; kapanan/devredilen firmalar ve diplomatik misyonlar dahil EDİLMEZ.
 * Yorum, puan, daire sayısı veya çalışan sayısı gibi doğrulanamayan alanlar bilerek yoktur.
 * Yeni referans eklemek için bu diziye satır ekleyin; logo için public/images/referanslar/<slug>.(svg|png|webp|jpg)
 * dosyasını koyup `node scripts/reference-logos.mjs` çalıştırın.
 */

export type ReferenceSector = 'site' | 'kamu' | 'saglik' | 'ticari' | 'insaat';

export interface RealReference {
  slug: string;
  name: string;
  /** İstanbul ilçesi (39 ilçeden biri); birden çok bölgede çalışılanlar için boş bırakılır. */
  district?: string;
  sector: ReferenceSector;
  /** Ana sayfa ve hizmet sayfalarındaki kısa şeritte öne çıkarılır. */
  featured?: boolean;
}

export const SECTORS: readonly ReferenceSector[] = ['site', 'kamu', 'saglik', 'ticari', 'insaat'];

export const REAL_REFERENCES: readonly RealReference[] = [
  // Site ve rezidanslar
  { slug: 'kosuyolu-konaklari', name: 'Koşuyolu Konakları', district: 'Kadıköy', sector: 'site' },
  { slug: 'meseli-gold-park-sitesi', name: 'Meşeli Gold Park Sitesi', district: 'Kadıköy', sector: 'site' },
  { slug: 'mim-konaklari-sitesi', name: 'Mim Konakları Sitesi', district: 'Beşiktaş', sector: 'site' },
  { slug: 'palandoken-sitesi', name: 'Palandöken Sitesi', district: 'Ataşehir', sector: 'site' },
  { slug: 'meklim-mimoza-sitesi', name: 'Meklim Mimoza Sitesi', district: 'Ataşehir', sector: 'site' },
  { slug: 'feriha-ozyuva-sitesi', name: 'Feriha Özyuva Sitesi', district: 'Kartal', sector: 'site' },
  { slug: 'dome-residence', name: 'Dome Residence', district: 'Çekmeköy', sector: 'site', featured: true },
  { slug: 'greenland-sitesi', name: 'Greenland Sitesi', district: 'Çekmeköy', sector: 'site' },
  { slug: 'koru-sitesi', name: 'Koru Sitesi', district: 'Çekmeköy', sector: 'site' },
  { slug: 'bizimtepe-villalari', name: 'Bizimtepe Villaları', district: 'Sarıyer', sector: 'site' },
  { slug: 'camlica-konaklari', name: 'Çamlıca Konakları', district: 'Üsküdar', sector: 'site' },
  { slug: 'site-59', name: 'Site 59', district: 'Üsküdar', sector: 'site' },
  { slug: 'goztepe-soyak-residence', name: 'Göztepe Soyak Residence', district: 'Üsküdar', sector: 'site', featured: true },
  { slug: 'ciragan-residence', name: 'Çırağan Residence', district: 'Beşiktaş', sector: 'site', featured: true },
  { slug: 'kiptas-sahilpark-evleri', name: 'Kiptaş Sahilpark Evleri', district: 'Zeytinburnu', sector: 'site', featured: true },
  { slug: 'hoby-life-sitesi', name: 'Hoby Life Sitesi', district: 'Pendik', sector: 'site' },
  { slug: 'innovia-3', name: 'Innovia 3', district: 'Esenyurt', sector: 'site' },
  { slug: 'suryapi-exelence-evleri', name: 'Suryapı Exelence Evleri', district: 'Kadıköy', sector: 'site' },
  { slug: 'suryapi-ilkbahar-evleri', name: 'Suryapı İlkbahar Evleri', district: 'Sultanbeyli', sector: 'site' },
  { slug: 'suryapi-golbahce', name: 'Suryapı Gölbahçe', district: 'Sultanbeyli', sector: 'site' },
  { slug: 'suryapi-mirage-evleri', name: 'Suryapı Mirage Evleri', district: 'Bağcılar', sector: 'site' },
  { slug: 'genom-insaat-lavender-evleri', name: 'Genom İnşaat Lavender Evleri', district: 'Sancaktepe', sector: 'site' },

  // Kamu ve sosyal kurumlar
  { slug: 'atasehir-belediyesi', name: 'Ataşehir Belediyesi', district: 'Ataşehir', sector: 'kamu', featured: true },
  { slug: 'kadikoy-belediyesi', name: 'Kadıköy Belediyesi', district: 'Kadıköy', sector: 'kamu', featured: true },
  { slug: 'exim-bank', name: 'Türk Eximbank (Türkiye İhracat Kredi Bankası A.Ş.)', district: 'Ümraniye', sector: 'kamu', featured: true },
  { slug: 'vakifbank-umut-cocuklari', name: 'Vakıfbank Umut Çocukları Sosyal Rehabilitasyon Merkezi', district: 'Kartal', sector: 'kamu' },
  { slug: 'cocuk-ve-genclik-merkezi-kartal', name: 'Çocuk ve Gençlik Merkezi (Kartal)', district: 'Kartal', sector: 'kamu' },
  { slug: 'cocuk-ve-genclik-merkezi-yeldegirmeni', name: 'Çocuk ve Gençlik Merkezi (Yeldeğirmeni)', district: 'Kadıköy', sector: 'kamu' },
  { slug: 'sevgi-evleri-kucukyali', name: 'Sevgi Evleri Çocuk Yuvası (Küçükyalı)', district: 'Maltepe', sector: 'kamu' },

  // Sağlık kuruluşları
  { slug: 'vm-medical-park-maltepe', name: 'VM Medical Park Maltepe Hastanesi', district: 'Maltepe', sector: 'saglik', featured: true },
  { slug: 'yunus-emre-hastanesi', name: 'Yunus Emre Hastanesi', district: 'Üsküdar', sector: 'saglik' },
  { slug: 'durmusoglu-saglik', name: 'Durmuşoğlu Sağlık Hizmetleri', district: 'Kartal', sector: 'saglik' },

  // Ticari, medya ve sanayi tesisleri
  { slug: 'sozcu-gazetesi', name: 'Sözcü Gazetesi ve Matbaaları', district: 'Arnavutköy', sector: 'ticari', featured: true },
  { slug: 'ica-events', name: 'ICA Events', district: 'Şişli', sector: 'ticari', featured: true },
  { slug: 'tuyap-gida-fuari', name: 'Tüyap Gıda Fuarı', district: 'Beylikdüzü', sector: 'ticari' },
  { slug: 'sariyer-spor-kulubu', name: 'Sarıyer Spor Kulübü', district: 'Sarıyer', sector: 'ticari' },
  { slug: 'atlas-is-merkezi', name: 'Atlas İş Merkezi', district: 'Küçükçekmece', sector: 'ticari' },
  { slug: 'adalet-is-merkezi', name: 'Adalet İş Merkezi', district: 'Kartal', sector: 'ticari' },
  { slug: 'koza-gida', name: 'Koza Gıda Dağıtım Sanayi ve Ticaret A.Ş.', district: 'Arnavutköy', sector: 'ticari' },
  { slug: 'iskent-sanayi-sitesi', name: 'İşkent Sanayi Sitesi', district: 'Bayrampaşa', sector: 'ticari' },
  { slug: 'hursan-geri-donusum', name: 'Hürsan Geri Dönüşüm', district: 'Bayrampaşa', sector: 'ticari' },
  { slug: 'cagdas-yayincilik', name: 'Çağdaş Yayıncılık', district: 'Bağcılar', sector: 'ticari' },
  { slug: 'gecem-dinlence', name: 'Gecem Dinlence Gereçleri', district: 'Fatih', sector: 'ticari' },
  { slug: 'kumresort-hotel', name: 'Kumresort Hotel', district: 'Büyükçekmece', sector: 'ticari' },
  { slug: 'reimco', name: 'Reimco', district: 'Üsküdar', sector: 'ticari' },

  // İnşaat firmaları ve şantiyeler
  { slug: 'sur-yapi', name: 'Sur Yapı', sector: 'insaat', featured: true },
  { slug: 'genom-insaat', name: 'Genom İnşaat', sector: 'insaat' },
  { slug: 'senbay-kolin-kalyon-metro', name: 'Şenbay–Kolin–Kalyon Bostancı–Dudullu Metro Hattı (şantiyeler)', sector: 'insaat' },
  { slug: 'boztepe-insaat', name: 'Boztepe İnşaat', district: 'Kadıköy', sector: 'insaat' },
  { slug: 'selimoglu-insaat', name: 'Selimoğlu İnşaat', district: 'Kadıköy', sector: 'insaat' },
];

export function countBySector(): Record<ReferenceSector, number> {
  const out = { site: 0, kamu: 0, saglik: 0, ticari: 0, insaat: 0 } as Record<ReferenceSector, number>;
  for (const r of REAL_REFERENCES) out[r.sector]++;
  return out;
}

export function featuredReferences(limit = 12): RealReference[] {
  return REAL_REFERENCES.filter((r) => r.featured).slice(0, limit);
}

/** İsimlerden baş harfler (logo yokken kullanılan monogram). */
export function monogram(name: string): string {
  const words = name.replace(/[()–-]/g, ' ').split(/\s+/).filter((w) => /^[A-Za-zÇĞİÖŞÜçğıöşü]/.test(w));
  return (words[0]?.[0] ?? '?') + (words[1]?.[0] ?? '');
}
