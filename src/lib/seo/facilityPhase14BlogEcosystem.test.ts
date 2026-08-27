import { describe, it, expect } from 'vitest';
import { resolveBlogArticleCluster } from './facilityBlogClusterEngine';

describe('Blog İç/Dış Linkleme, Topikal Otorite Kümeleri & E-E-A-T Mimarisi (Faz 14)', () => {
  describe('facilityBlogClusterEngine.ts (Blog Makalesi Akıllı Kümeleme Motoru)', () => {
    it('Plaza ve ofis konulu blog yazısını Plaza Yönetimi alt sektörüne ve ISO standardına bağlar', () => {
      const cluster = resolveBlogArticleCluster(
        'Plaza ve İş Merkezlerinde HVAC Enerji Verimliliği',
        'Modern ticari plazalarda merkezi iklimlendirme ve bina otomasyon sistemleri tasarruf sağlar.',
        ['plaza', 'enerji', 'ofis'],
        'Ticari Tesis Yönetimi'
      );

      expect(cluster.recommendedSubSector.slug).toBe('plaza-yonetimi');
      expect(cluster.recommendedSubSector.url).toBe('/hizmetler/tesis-yonetimi/plaza-yonetimi');
      expect(cluster.relevantLegislation.length).toBeGreaterThanOrEqual(1);
    });

    it('Güvenlik ve eğitim konulu blog yazısını 5188 mevzuatına ve Alo Güvenlik kursuna bağlar', () => {
      const cluster = resolveBlogArticleCluster(
        'Sitelerde 5188 Sayılı Kanun Uyarınca Özel Güvenlik Görevlisi Eğitimi ve Yetkileri',
        'Özel güvenlik personeli için silahlı silahsız kurs ve yenileme eğitimi zorunludur.',
        ['güvenlik', '5188', 'eğitim', 'kurs'],
        'Güvenlik'
      );

      expect(cluster.relevantLegislation.some((l) => l.id === 'guvenlik-5188')).toBe(true);
      expect(cluster.groupCompanySynergy).toBeDefined();
      expect(cluster.groupCompanySynergy?.url).toBe('https://www.guvenlikkursu.com/');
    });

    it('Asansör konulu blog yazısını Asansör İşletme Yönetmeliği Resmi Gazete linkine bağlar', () => {
      const cluster = resolveBlogArticleCluster(
        'Apartman ve Sitelerde Asansör Yeşil Etiket Muayenesi ve Periyodik Bakım Zorunluluğu',
        'Asansörlerin yıllık periyodik kontrolü A tipi muayene kuruluşu tarafından yapılmalıdır.',
        ['asansör', 'bakım', 'yeşil etiket']
      );

      expect(cluster.relevantLegislation.some((l) => l.id === 'asansor-yonetmeligi')).toBe(true);
      expect(cluster.relevantLegislation.find((l) => l.id === 'asansor-yonetmeligi')?.url).toContain('resmigazete.gov.tr');
    });

    it('Toplu konut ve aidat konulu blog yazısını Toplu Konut Yönetimi ve 634 KMK mevzuatına bağlar', () => {
      const cluster = resolveBlogArticleCluster(
        'Büyük Toplu Konut Sitelerinde KMK 37 İşletme Projesi ve Aidat Dağılımı',
        'Çok bloklu sitelerde blok ortak giderleri ve aidat tahsilat süreçleri.',
        ['toplu konut', 'aidat', 'kmk']
      );

      expect(cluster.recommendedSubSector.slug).toBe('toplu-konut-yonetimi');
      expect(cluster.relevantLegislation.some((l) => l.id === 'kmk-634')).toBe(true);
      expect(cluster.relevantLegislation.find((l) => l.id === 'kmk-634')?.url).toContain('mevzuat.gov.tr');
    });

    it('İngilizce dil parametresi verildiğinde alt sektör linkine dil ön ekini ekler', () => {
      const cluster = resolveBlogArticleCluster(
        'Luxury Residence Management in Istanbul',
        'VIP concierge and residence facility operations.',
        ['residence'],
        'Luxury',
        'en'
      );

      expect(cluster.recommendedSubSector.url).toBe('/en/hizmetler/tesis-yonetimi/rezidans-site-yonetimi');
    });
  });
});
