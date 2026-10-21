/**
 * Gerçek referans listesi (tek kaynak — 52 kurumsal referans, 6 kategori).
 * Kaynak: "Alo Yönetim & Alo Güvenlik Kurumsal Portföy 2026" (Alo_Grup_Kurumsal_Portfoy_TASLAK_v1.pdf, s.18).
 * İlçe bilgisi yalnızca kesin bilinen kayıtlarda doldurulur; çok bölgeli veya ilçesi belirtilmeyenler boş bırakılır.
 * Yorum, puan, daire sayısı veya çalışan sayısı gibi doğrulanamayan alanlar bilerek yoktur.
 * Yeni referans eklemek için bu diziye satır ekleyin; logo için public/images/referanslar/<slug>.(svg|png|webp|jpg)
 * dosyasını koyup `node scripts/reference-logos.mjs` çalıştırın.
 */

export type ReferenceSector = 'site' | 'saglik' | 'ticari' | 'is_merkezi' | 'kamu' | 'turizm';

export interface RealReference {
  slug: string;
  name: string;
  /** İstanbul ilçesi (39 ilçeden biri); birden çok bölgede çalışılanlar veya ilçesi doğrulanmamış kayıtlar için boş bırakılır. */
  district?: string;
  sector: ReferenceSector;
  /** Ana sayfa ve hizmet sayfalarındaki kısa şeritte öne çıkarılır. */
  featured?: boolean;
}

export const SECTORS: readonly ReferenceSector[] = ['site', 'saglik', 'ticari', 'is_merkezi', 'kamu', 'turizm'];

export const REAL_REFERENCES: readonly RealReference[] = [
  // 1. SİTE VE KONUT (24)
  { slug: 'feriha-ozyuva-sitesi', name: 'Feriha Özyuva Sitesi', district: 'Kartal', sector: 'site' },
  { slug: 'meklim-mimoza-sitesi', name: 'Meklim Mimoza Sitesi', district: 'Ataşehir', sector: 'site' },
  { slug: 'meseli-gold-park-sitesi', name: 'Meşeli Gold Park Sitesi', district: 'Kadıköy', sector: 'site' },
  { slug: 'mim-konaklari-sitesi', name: 'Mim Konakları Sitesi', district: 'Beşiktaş', sector: 'site' },
  { slug: 'palandoken-sitesi', name: 'Palandöken Sitesi', district: 'Ataşehir', sector: 'site' },
  { slug: 'dome-residence', name: 'Dome Residence', district: 'Çekmeköy', sector: 'site', featured: true },
  { slug: 'innovia-3', name: 'Innovia 3', district: 'Esenyurt', sector: 'site', featured: true },
  { slug: 'kosuyolu-konaklari', name: 'Koşuyolu Konakları', district: 'Kadıköy', sector: 'site' },
  { slug: 'bizimtepe-villalari', name: 'Bizimtepe Villaları', district: 'Sarıyer', sector: 'site' },
  { slug: 'iskent-sanayi-sitesi', name: 'İşkent Sanayi Sitesi', district: 'Bayrampaşa', sector: 'site' },
  { slug: 'kiptas-sahilpark-evleri', name: 'Kiptaş Sahilpark Evleri', district: 'Zeytinburnu', sector: 'site', featured: true },
  { slug: 'ciragan-residence', name: 'Çırağan Residence', district: 'Beşiktaş', sector: 'site', featured: true },
  { slug: 'site-59', name: 'Site 59', district: 'Üsküdar', sector: 'site' },
  { slug: 'goztepe-soyak-residence', name: 'Göztepe Soyak Residence', district: 'Üsküdar', sector: 'site', featured: true },
  { slug: 'hoby-life-sitesi', name: 'Hoby Life Sitesi', district: 'Pendik', sector: 'site' },
  { slug: 'bagkur-sitesi', name: 'Bağkur Sitesi', sector: 'site' },
  { slug: 'nef-cekmekoy-camlitepe-sitesi', name: 'Nef Çekmeköy Çamlıtepe Sitesi', district: 'Çekmeköy', sector: 'site', featured: true },
  { slug: 'greenland-sitesi', name: 'Greenland Sitesi', district: 'Çekmeköy', sector: 'site' },
  { slug: 'camlica-konaklari', name: 'Çamlıca Konakları', district: 'Üsküdar', sector: 'site' },
  { slug: 'koru-sitesi', name: 'Koru Sitesi', district: 'Çekmeköy', sector: 'site' },
  { slug: 'atasehir-konaklari', name: 'Ataşehir Konakları', district: 'Ataşehir', sector: 'site' },
  { slug: 'mega-life-site', name: 'Mega Life Site', sector: 'site' },
  { slug: 'ada-city', name: 'Ada City', sector: 'site' },
  { slug: 'guner-sitesi', name: 'Güner Sitesi', sector: 'site' },

  // 2. SAĞLIK (3)
  { slug: 'vm-medical-park-maltepe', name: 'VM Medical Park Maltepe', district: 'Maltepe', sector: 'saglik', featured: true },
  { slug: 'yunus-emre-hastanesi', name: 'Yunus Emre Hastanesi', district: 'Üsküdar', sector: 'saglik' },
  { slug: 'durmusoglu-saglik', name: 'Durmuşoğlu Sağlık Hizmetleri', district: 'Kartal', sector: 'saglik' },

  // 3. KURUMSAL, SANAYİ VE MEDYA (13)
  { slug: 'hursan-geri-donusum', name: 'Hürsan Geri Dönüşüm', district: 'Bayrampaşa', sector: 'ticari' },
  { slug: 'exim-bank', name: 'Türk Eximbank', district: 'Ümraniye', sector: 'ticari', featured: true },
  { slug: 'koza-gida', name: 'Koza Gıda Dağıtım Sanayi ve Ticaret A.Ş.', district: 'Arnavutköy', sector: 'ticari' },
  { slug: 'sozcu-gazetesi', name: 'Sözcü Gazetesi ve Matbaaları', district: 'Arnavutköy', sector: 'ticari', featured: true },
  { slug: 'korkusuz-gazetesi', name: 'Korkusuz Gazetesi', sector: 'ticari' },
  { slug: 'reimco', name: 'Reimco', district: 'Üsküdar', sector: 'ticari' },
  { slug: 'cagdas-yayincilik', name: 'Çağdaş Yayıncılık ve Tic. A.Ş.', district: 'Bağcılar', sector: 'ticari' },
  { slug: 'genc-danismanlik', name: 'Genç Danışmanlık', sector: 'ticari' },
  { slug: 'kriter-a', name: 'Kriter-A', sector: 'ticari' },
  { slug: 'parantez-tur', name: 'Parantez Tur', sector: 'ticari' },
  { slug: 'miles-makine', name: 'Miles Makine', sector: 'ticari' },
  { slug: 'yavuz-metal', name: 'Yavuz Metal', sector: 'ticari' },
  { slug: 'lotus-organizasyon', name: 'Lotus Organizasyon', sector: 'ticari' },

  // 4. İŞ MERKEZİ VE ETKİNLİK (5)
  { slug: 'atlas-is-merkezi', name: 'Atlas İş Merkezi', district: 'Küçükçekmece', sector: 'is_merkezi', featured: true },
  { slug: 'fuar-ve-etkinlik-organizasyonlari', name: 'Fuar ve Etkinlik Organizasyonları', sector: 'is_merkezi' },
  { slug: 'adalet-is-merkezi', name: 'Adalet İş Merkezi', district: 'Kartal', sector: 'is_merkezi' },
  { slug: 'gecem-dinlence', name: 'Gecem Dinlence Gereçleri San. ve Tic. A.Ş.', district: 'Fatih', sector: 'is_merkezi' },
  { slug: 'atlantis-ticaret-merkezi', name: 'Atlantis Ticaret Merkezi', sector: 'is_merkezi' },

  // 5. KAMU VE SOSYAL HİZMET (5)
  { slug: 'aile-ve-sosyal-politikalar-merkezleri', name: 'Aile ve Sosyal Politikalar Bakanlığı Merkezleri', sector: 'kamu' },
  { slug: 'vakifbank-umut-cocuklari', name: 'Vakıfbank Umut Çocukları Sosyal Rehabilitasyon Merkezi', district: 'Kartal', sector: 'kamu' },
  { slug: 'atasehir-belediyesi', name: 'Ataşehir Belediyesi', district: 'Ataşehir', sector: 'kamu', featured: true },
  { slug: 'kadikoy-belediyesi', name: 'Kadıköy Belediyesi', district: 'Kadıköy', sector: 'kamu', featured: true },
  { slug: 'irak-konsoloslugu', name: 'Irak Konsolosluğu', district: 'Şişli', sector: 'kamu' },

  // 6. TURİZM VE SPOR (2)
  { slug: 'sariyer-spor-kulubu', name: 'Sarıyer Spor Kulübü', district: 'Sarıyer', sector: 'turizm' },
  { slug: 'kumresort-hotel', name: 'Kumresort Hotel', district: 'Büyükçekmece', sector: 'turizm' },
];

export function countBySector(): Record<ReferenceSector, number> {
  const out = { site: 0, saglik: 0, ticari: 0, is_merkezi: 0, kamu: 0, turizm: 0 } as Record<ReferenceSector, number>;
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
