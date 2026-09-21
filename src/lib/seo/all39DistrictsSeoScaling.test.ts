import { describe, it, expect } from 'vitest';
import {
  DISTRICTS,
  DISTRICT_SLUGS,
  getDistrict,
  isValidDistrict,
  getDistrictDues,
} from '@/data/districts';
import {
  SERVICES,
  SERVICE_SLUGS,
  SERVICE_SLUG_ALIASES,
  getService,
  isValidService,
  resolveServiceSlug,
  isServiceAlias,
} from '@/data/services';
import { generateMetadata as generateServiceDistrictMetadata } from '@/app/[lang]/bolgeler/[ilce]/[hizmet]/page';
import {
  districtSecurityServiceSchema,
  districtFacilityServiceSchema,
  districtTechnicalServiceSchema,
  districtCleaningServiceSchema,
} from '@/lib/schemas';
import { BASE_URL } from '@/lib/seo';

describe('39 İlçe Geneli B2B Yerel SEO & Büyüme Master Planı (Seçenek A Test Paketi)', () => {
  describe('1. 39 İlçe Veri Modeli ve Bütünlük Denetimi', () => {
    it('İstanbul\'un 39 ilçesinin tamamı eksiksiz ve mühürlü olarak mevcuttur', () => {
      expect(DISTRICTS.length).toBe(39);
      expect(DISTRICT_SLUGS.length).toBe(39);
      expect(Object.isFrozen(DISTRICTS)).toBe(true);
    });

    it('39 ilçenin tamamı O(1) slug lookup indeksi üzerinden doğrulanır', () => {
      for (const slug of DISTRICT_SLUGS) {
        const district = getDistrict(slug);
        expect(district, `İlçe bulunamadı: ${slug}`).toBeDefined();
        expect(district?.slug).toBe(slug);
        expect(district?.name.length).toBeGreaterThan(1);
        expect(district?.population).toBeGreaterThan(10000);
        expect(district?.neighborhoods.length).toBeGreaterThanOrEqual(3);
        expect(district?.localNeeds.length).toBeGreaterThanOrEqual(2);
        expect(district?.managedProjects).toBeGreaterThan(0);
        expect(isValidDistrict(slug)).toBe(true);
      }
    });

    it('39 ilçenin tamamında marka site projeleri (prominentProjects) ve bölgesel tesis karakteristikleri tanımlıdır', () => {
      for (const district of DISTRICTS) {
        expect(
          district.prominentProjects,
          `prominentProjects eksik: ${district.slug}`
        ).toBeDefined();
        expect(
          district.prominentProjects?.length,
          `prominentProjects en az 3 proje içermeli: ${district.slug}`
        ).toBeGreaterThanOrEqual(3);
        expect(
          district.regionalFacilityTraits,
          `regionalFacilityTraits eksik: ${district.slug}`
        ).toBeDefined();
        expect(
          district.regionalFacilityTraits?.length,
          `regionalFacilityTraits yeterli uzunlukta olmalı: ${district.slug}`
        ).toBeGreaterThan(30);
      }
    });

    it('39 ilçenin tamamında aidat ve tasarruf endeksi (getDistrictDues) pozitif değerler döner', () => {
      for (const slug of DISTRICT_SLUGS) {
        const dues = getDistrictDues(slug);
        expect(dues.avgDuesM2, `avgDuesM2 geçersiz: ${slug}`).toBeGreaterThan(0);
        expect(dues.aloDuesM2, `aloDuesM2 geçersiz: ${slug}`).toBeGreaterThan(0);
        expect(dues.aloDuesM2).toBeLessThan(dues.avgDuesM2);
        expect(dues.savingsRate, `savingsRate geçersiz: ${slug}`).toBeGreaterThanOrEqual(20);
      }
    });
  });

  describe('2. Hizmet Slug Eşanlamlıları (Aliases) ve Çözücü Motoru', () => {
    it('Temel B2B arama niyetli slug eşanlamlıları SERVICE_SLUG_ALIASES içinde tanımlıdır', () => {
      expect(SERVICE_SLUG_ALIASES['site-yonetimi']).toBe('tesis-yonetimi');
      expect(SERVICE_SLUG_ALIASES['apartman-yonetimi']).toBe('tesis-yonetimi');
      expect(SERVICE_SLUG_ALIASES['bina-yonetimi']).toBe('tesis-yonetimi');
      expect(SERVICE_SLUG_ALIASES['asansor-bakimi']).toBe('teknik-bakim');
      expect(SERVICE_SLUG_ALIASES['apartman-temizligi']).toBe('temizlik-ve-hijyen');
      expect(SERVICE_SLUG_ALIASES['guvenlik-sirketleri']).toBe('guvenlik-yonetimi');
    });

    it('resolveServiceSlug alias slugları ana hizmet slugına dönüştürür', () => {
      expect(resolveServiceSlug('site-yonetimi')).toBe('tesis-yonetimi');
      expect(resolveServiceSlug('apartman-yonetimi')).toBe('tesis-yonetimi');
      expect(resolveServiceSlug('asansor-bakimi')).toBe('teknik-bakim');
      expect(resolveServiceSlug('apartman-temizligi')).toBe('temizlik-ve-hijyen');
      expect(resolveServiceSlug('guvenlik-sirketleri')).toBe('guvenlik-yonetimi');
      expect(resolveServiceSlug('tesis-yonetimi')).toBe('tesis-yonetimi');
    });

    it('getService ve isValidService alias parametreleri ile çağrıldığında kanonik hizmeti döndürür (404 kalkanı)', () => {
      expect(isValidService('site-yonetimi')).toBe(true);
      expect(isValidService('apartman-yonetimi')).toBe(true);
      expect(isValidService('asansor-bakimi')).toBe(true);
      expect(isValidService('guvenlik-sirketleri')).toBe(true);

      const siteYonetimi = getService('site-yonetimi');
      expect(siteYonetimi).toBeDefined();
      expect(siteYonetimi?.slug).toBe('tesis-yonetimi');

      const asansorBakimi = getService('asansor-bakimi');
      expect(asansorBakimi).toBeDefined();
      expect(asansorBakimi?.slug).toBe('teknik-bakim');

      const guvenlikSirketleri = getService('guvenlik-sirketleri');
      expect(guvenlikSirketleri).toBeDefined();
      expect(guvenlikSirketleri?.slug).toBe('guvenlik-yonetimi');
    });
  });

  describe('3. Seçenek A Rota Eşanlamlısı & Canonical Davranışı', () => {
    it('Kadıköy Site Yönetimi: Başlık tam eşleşir, canonical /bolgeler/kadikoy/tesis-yonetimi adresine bakar', async () => {
      const meta = await generateServiceDistrictMetadata({
        params: Promise.resolve({
          lang: 'tr',
          ilce: 'kadikoy',
          hizmet: 'site-yonetimi',
        }),
      });

      expect(meta.title).toContain('Kadıköy Site Yönetimi Şirketleri');
      expect(meta.description).toContain('634 sayılı KMK');
      expect(meta.alternates?.canonical).toBe(
        `${BASE_URL}/bolgeler/kadikoy/tesis-yonetimi`
      );
    });

    it('Kartal Apartman Yönetimi: Başlık tam eşleşir, canonical /bolgeler/kartal/tesis-yonetimi adresine bakar', async () => {
      const meta = await generateServiceDistrictMetadata({
        params: Promise.resolve({
          lang: 'tr',
          ilce: 'kartal',
          hizmet: 'apartman-yonetimi',
        }),
      });

      expect(meta.title).toContain('Kartal Apartman Yönetimi Şirketleri');
      expect(meta.description).toContain('apartman yönetimi');
      expect(meta.alternates?.canonical).toBe(
        `${BASE_URL}/bolgeler/kartal/tesis-yonetimi`
      );
    });

    it('Bakırköy Asansör Bakımı: Başlık tam eşleşir, canonical /bolgeler/bakirkoy/teknik-bakim adresine bakar', async () => {
      const meta = await generateServiceDistrictMetadata({
        params: Promise.resolve({
          lang: 'tr',
          ilce: 'bakirkoy',
          hizmet: 'asansor-bakimi',
        }),
      });

      expect(meta.title).toContain('Bakırköy Asansör Bakımı ve Arıza');
      expect(meta.description).toContain('MMO yeşil etiket');
      expect(meta.alternates?.canonical).toBe(
        `${BASE_URL}/bolgeler/bakirkoy/teknik-bakim`
      );
    });

    it('Beşiktaş Güvenlik Şirketleri: Başlık tam eşleşir, canonical /bolgeler/besiktas/guvenlik-yonetimi adresine bakar', async () => {
      const meta = await generateServiceDistrictMetadata({
        params: Promise.resolve({
          lang: 'tr',
          ilce: 'besiktas',
          hizmet: 'guvenlik-sirketleri',
        }),
      });

      expect(meta.title).toContain('Beşiktaş Güvenlik Şirketleri');
      expect(meta.description).toContain('5188 sayılı Kanun');
      expect(meta.alternates?.canonical).toBe(
        `${BASE_URL}/bolgeler/besiktas/guvenlik-yonetimi`
      );
    });

    it('Kanonik rotalarda (tesis-yonetimi) canonical kendi URL\'sine bakar', async () => {
      const meta = await generateServiceDistrictMetadata({
        params: Promise.resolve({
          lang: 'tr',
          ilce: 'kadikoy',
          hizmet: 'tesis-yonetimi',
        }),
      });

      expect(meta.alternates?.canonical).toBe(
        `${BASE_URL}/bolgeler/kadikoy/tesis-yonetimi`
      );
    });

    it('39 ilçenin tamamında site-yonetimi ve apartman-yonetimi alias\'ları hatasız metadata üretir', async () => {
      for (const slug of DISTRICT_SLUGS) {
        const d = getDistrict(slug)!;
        const metaSite = await generateServiceDistrictMetadata({
          params: Promise.resolve({
            lang: 'tr',
            ilce: slug,
            hizmet: 'site-yonetimi',
          }),
        });
        expect(metaSite.title).toContain(`${d.name} Site Yönetimi Şirketleri`);
        expect(metaSite.alternates?.canonical).toBe(
          `${BASE_URL}/bolgeler/${slug}/tesis-yonetimi`
        );

        const metaApt = await generateServiceDistrictMetadata({
          params: Promise.resolve({
            lang: 'tr',
            ilce: slug,
            hizmet: 'apartman-yonetimi',
          }),
        });
        expect(metaApt.title).toContain(`${d.name} Apartman Yönetimi Şirketleri`);
        expect(metaApt.alternates?.canonical).toBe(
          `${BASE_URL}/bolgeler/${slug}/tesis-yonetimi`
        );
      }
    });
  });

  describe('4. Yerel Şema (JSON-LD) Doğrulaması', () => {
    it('districtSecurityServiceSchema Güvenlik Şirketleri adını ve 24/7 saatleri içerir', () => {
      const district = getDistrict('buyukcekmece')!;
      const schema = districtSecurityServiceSchema({
        districtName: district.name,
        path: `/bolgeler/${district.slug}/guvenlik-yonetimi`,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
      });

      expect(schema['@type']).toBe('SecurityService');
      expect(schema.name).toContain('Büyükçekmece Güvenlik Şirketleri');
      expect(schema.priceRange).toBe('₺₺');
      const hours = schema.openingHoursSpecification as Array<{ opens: string; closes: string }>;
      expect(hours[0].opens).toBe('00:00');
      expect(hours[0].closes).toBe('23:59');
    });

    it('39 ilçenin tamamında tesis, güvenlik, teknik ve temizlik şemaları geçerli üretilir', () => {
      for (const district of DISTRICTS) {
        const secSchema = districtSecurityServiceSchema({
          districtName: district.name,
          path: `/bolgeler/${district.slug}/guvenlik-yonetimi`,
          geo: district.geo,
          neighborhoods: district.neighborhoods,
        });
        expect(secSchema['@id']).toBeDefined();

        const facSchema = districtFacilityServiceSchema({
          districtName: district.name,
          path: `/bolgeler/${district.slug}/tesis-yonetimi`,
          geo: district.geo,
          neighborhoods: district.neighborhoods,
        });
        expect(facSchema['@id']).toBeDefined();

        const techSchema = districtTechnicalServiceSchema({
          districtName: district.name,
          path: `/bolgeler/${district.slug}/teknik-bakim`,
          geo: district.geo,
          neighborhoods: district.neighborhoods,
        });
        expect(techSchema['@id']).toBeDefined();

        const clnSchema = districtCleaningServiceSchema({
          districtName: district.name,
          path: `/bolgeler/${district.slug}/temizlik-ve-hijyen`,
          geo: district.geo,
          neighborhoods: district.neighborhoods,
        });
        expect(clnSchema['@id']).toBeDefined();
      }
    });
  });

  describe('5. 4 İlçe Kümesi (Clusters) Sınıflandırma ve Doğrulama', () => {
    const CLUSTER_1_MEGA_TOPLU_KONUT = [
      'basaksehir',
      'kucukcekmece',
      'esenyurt',
      'pendik',
      'sancaktepe',
      'sultangazi',
      'beylikduzu',
    ];

    const CLUSTER_2_LUKS_REZIDANS = [
      'besiktas',
      'sariyer',
      'sisli',
      'kadikoy',
      'bakirkoy',
      'beykoz',
      'eyupsultan',
      'cekmekoy',
    ];

    const CLUSTER_3_KENTSEL_DONUSUM = [
      'kartal',
      'maltepe',
      'umraniye',
      'atasehir',
      'avcilar',
      'bagcilar',
      'bahcelievler',
      'gungoren',
      'gaziosmanpasa',
      'kagithane',
    ];

    const CLUSTER_4_SANAYI_GENIS_ARAZI = [
      'buyukcekmece',
      'silivri',
      'catalca',
      'arnavutkoy',
      'tuzla',
      'bayrampasa',
      'zeytinburnu',
      'fatih',
      'beyoglu',
      'esenler',
      'sile',
      'adalar',
      'sultanbeyli',
      'uskudar',
    ];

    it('Tüm 39 ilçe 4 kümeden tam olarak birine aittir (toplam 39)', () => {
      const allClusterSlugs = [
        ...CLUSTER_1_MEGA_TOPLU_KONUT,
        ...CLUSTER_2_LUKS_REZIDANS,
        ...CLUSTER_3_KENTSEL_DONUSUM,
        ...CLUSTER_4_SANAYI_GENIS_ARAZI,
      ];

      expect(allClusterSlugs.length).toBe(39);
      const uniqueSlugs = new Set(allClusterSlugs);
      expect(uniqueSlugs.size).toBe(39);

      for (const slug of allClusterSlugs) {
        expect(isValidDistrict(slug), `Geçersiz ilçe slug'ı kümede: ${slug}`).toBe(true);
      }
    });
  });
});
