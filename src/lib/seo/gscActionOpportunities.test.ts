process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key_for_vitest_runner_2026';

import { describe, it, expect, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { TERMS, slugToTerm, termToSlug, TERM_SLUG_ALIASES } from '@/data/dictionary';
import { ENGLISH_TERMS } from '@/data/dictionaryEn';
import { generateMetadata as generateAcademyMetadata } from '@/app/[lang]/guvenlik-akademisi/page';
import { generateMetadata as generateMahallelerMetadata } from '@/app/[lang]/bolgeler/[ilce]/mahalleler/page';
import { generateMetadata as generateSozlukMetadata } from '@/app/[lang]/sozluk/[terim]/page';
import fs from 'fs';
import path from 'path';

describe('Google Search Console (GSC) High-Impact SEO Opportunities & Zero-Error Suite', () => {
  describe('1. "alo güvenlik" Kannibalizasyon Çözümü & guvenlikkursu.com Otorite Sinyali', () => {
    it('/guvenlik-akademisi canonical adresi guvenlikkursu.com olarak ayarlanmıştır', async () => {
      const meta = await generateAcademyMetadata({
        params: Promise.resolve({ lang: 'tr' }),
      });

      expect(meta.alternates?.canonical).toBe('https://www.guvenlikkursu.com/');
    });

    it('GuvenlikAkademisiClient içinde guvenlikkursu.com resmi eğitim portalı kartı yer alır', () => {
      const clientContent = fs.readFileSync(
        path.join(process.cwd(), 'src/app/[lang]/guvenlik-akademisi/GuvenlikAkademisiClient.tsx'),
        'utf8'
      );
      expect(clientContent).toContain('guvenlikkursu.com');
      expect(clientContent).toContain('Alo Güvenlik Eğitim Kurumları');
    });
  });

  describe('2. "account_balance_wallet" İkon Metni Sızıntısının Sıfırlanması', () => {
    it('AppAiOverviewGroundingSeo bileşeninde account_balance_wallet metni bulunmaz', () => {
      const appSeoContent = fs.readFileSync(
        path.join(process.cwd(), 'src/components/seo/ai-overviews/AppAiOverviewGroundingSeo.tsx'),
        'utf8'
      );
      expect(appSeoContent).not.toContain('account_balance_wallet');
      expect(appSeoContent).toContain('WalletSvgIcon');
    });
  });

  describe('3. "beşiktaş mahalleleri" Başlık ve Arama Niyeti Düzeltmesi (Faz 23: bilgi + ticari karma niyet)', () => {
    it('Beşiktaş mahalleler sayfası resmi mahalle sayısını ve tam listeyi başlıkta öne çıkarır', async () => {
      const meta = await generateMahallelerMetadata({
        params: Promise.resolve({ lang: 'tr', ilce: 'besiktas' }),
      });

      expect(meta.title).toBe('Beşiktaş Mahalleleri (23 Mahalle Tam Liste) ve Site Yönetimi | Alo Yönetim');
      expect(meta.description).toContain('Beşiktaş ilçesinde kaç mahalle var? Beşiktaş ilçesinde 23 mahalle bulunur');
    });

    it('39 ilçenin tamamı için resmi mahalle listesi mevcut ve sayılar liste uzunluğuyla birebir', async () => {
      const { OFFICIAL_NEIGHBORHOODS } = await import('@/data/districtOfficialNeighborhoods');
      const { DISTRICTS } = await import('@/data/districts');
      for (const d of DISTRICTS) {
        const o = OFFICIAL_NEIGHBORHOODS[d.slug];
        expect(o, d.slug).toBeDefined();
        expect(o.count, d.slug).toBe(o.neighborhoods.length);
        expect(new Set(o.neighborhoods).size, d.slug).toBe(o.neighborhoods.length);
      }
      expect(OFFICIAL_NEIGHBORHOODS.gaziosmanpasa.count).toBe(16);
      expect(OFFICIAL_NEIGHBORHOODS.kartal.count).toBe(20);
    });
  });

  describe('4. KMK, Hazirun Cetveli ve ÖGG Kartı İçerik Derinleştirmesi', () => {
    it('Hazirun Cetveli, ÖGG Kartı, KMK 37, KMK 45 ve KMK Ne Demek sözlük külliyatında mevcuttur', () => {
      const hazirun = slugToTerm('hazirun-cetveli');
      const ogg = slugToTerm('ogg-karti');
      const kmk37 = slugToTerm('kmk-37');
      const kmk45 = slugToTerm('kmk-45');
      const kmkNeDemek = slugToTerm('kmk-ne-demek');
      const kmk = slugToTerm('kmk');

      expect(hazirun).toBeDefined();
      expect(hazirun?.term).toBe('Hazirun Cetveli');
      expect(hazirun?.definition).toContain('toplantı yeter sayısı');

      expect(ogg).toBeDefined();
      expect(ogg?.term).toContain('ÖGG Kartı');
      expect(ogg?.definition).toContain('5188');

      expect(kmk37).toBeDefined();
      expect(kmk37?.term).toContain('KMK 37');

      expect(kmk45).toBeDefined();
      expect(kmk45?.term).toContain('KMK 45');

      expect(kmkNeDemek).toBeDefined();
      expect(kmk).toBeDefined();
    });

    it('Sözlük sayfası yüksek CTR şablonları üretir', async () => {
      const hazirunMeta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'hazirun-cetveli' }),
      });
      expect(hazirunMeta.title).toContain('Hazirun Cetveli Nedir, Nasıl Hazırlanır?');

      const oggMeta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'ogg-karti' }),
      });
      expect(oggMeta.title).toContain('ÖGG Kartı Nedir, Nasıl Alınır?');

      const kmk37Meta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'kmk-37' }),
      });
      expect(kmk37Meta.title).toContain('KMK 37 Nedir? İşletme Projesi');

      const kmk45Meta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'kmk-45' }),
      });
      expect(kmk45Meta.title).toContain('KMK 45 Nedir? Oybirliği Gerektiren');
    });

    it('İngilizce sözlük karşılıkları eksiksiz mevcuttur', () => {
      const enHazirun = ENGLISH_TERMS.find((e) => e.turkishEquivalent === 'Hazirun Cetveli');
      const enOgg = ENGLISH_TERMS.find((e) => e.turkishEquivalent.includes('ÖGG'));

      expect(enHazirun).toBeDefined();
      expect(enOgg).toBeDefined();
    });

    it('Faz 22: KMK 20, KMK 69, ÖGİ, Özel Kimlik Kartı, EKB ve Reaktif alias ve yüksek CTR şablonları eksiksiz çalışır', async () => {
      expect(TERM_SLUG_ALIASES['kmk-20']).toBe('kmk-madde-20-genel-giderlere-katilma-aidat-borcu');
      expect(slugToTerm('kmk-20')).toBeDefined();
      expect(TERM_SLUG_ALIASES['kmk-69']).toBe('toplu-yapi-kmk-m66-70');
      expect(TERM_SLUG_ALIASES['toplu-yapi-yonetimi-kmk-ek-madde-69']).toBe('toplu-yapi-kmk-m66-70');
      expect(TERM_SLUG_ALIASES['ogi']).toBe('ozel-guvenlik-izni-ogi');
      expect(TERM_SLUG_ALIASES['ozel-kimlik-karti']).toBe('ogg-karti-ozel-guvenlik-gorevlisi-kimlik-karti');
      expect(slugToTerm('ozel-kimlik-karti')).toBeDefined();
      expect(TERM_SLUG_ALIASES['ekb']).toBe('enerji-kimlik-belgesi-ekb');
      expect(TERM_SLUG_ALIASES['reaktif']).toBe('kompanzasyon-reaktif-guc');
      expect(slugToTerm('reaktif')).toBeDefined();

      const kmkMeta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'kat-mulkiyeti-kanunu-kmk' }),
      });
      expect(kmkMeta.title).toContain('KMK Nedir, Ne Demek? 634 Sayılı Kat Mülkiyeti Kanunu');

      const ogiMeta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'ozel-guvenlik-izni-ogi' }),
      });
      expect(ogiMeta.title).toContain('ÖGİ Ne Demek?');

      const ekbMeta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'enerji-kimlik-belgesi-ekb' }),
      });
      expect(ekbMeta.title).toContain('Enerji Kimlik Belgesi (EKB) Nedir');

      const reaktifMeta = await generateSozlukMetadata({
        params: Promise.resolve({ lang: 'tr', terim: 'kompanzasyon-reaktif-guc' }),
      });
      expect(reaktifMeta.title).toContain('Reaktif Enerji ve Kompanzasyon Cezası Nedir?');
    });
  });
});
