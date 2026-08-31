import { describe, it, expect } from 'vitest';
import {
  buildLocalBusinessSchema,
  buildDistrictLocalBusinessSchema,
  buildOpeningHoursSpecification,
  buildAllOffers,
  buildHowToSchema,
  buildReviewSchema,
  buildAggregateRatingSchema,
  buildServiceReviewPage,
  buildJobPostingSchema,
  buildCourseSchema,
  buildEventSchema,
  validateRichResultSchema,
  HOWTO_SITE_MANAGEMENT_SETUP,
  HOWTO_FACILITY_CONTRACT,
  HOWTO_PLAZA_BUDGET,
  HOWTO_ONLINE_DUES_SYSTEM,
  HOWTO_ISO_41001_COMPLIANCE,
  ALL_HOWTO_GUIDES,
  SITE_REVIEW_BANK,
  FACILITY_REVIEW_BANK,
  JOB_POSTING_FACILITY_MANAGER,
  JOB_POSTING_SITE_MANAGER,
  COURSE_KMK_634_LAW,
  COURSE_ISO_41001_FACILITY,
} from './dualCoreRichResultEngine';
import { BASE_URL } from '@/lib/seo';

describe('BÖLÜM F — 🏆 Rich Result & Zengin Snippet Motoru (dualCoreRichResultEngine.test.ts)', () => {
  /* =========================================================================
   * F1 — İNTERFACE & ŞEMA DOĞRULAMA MOTORU (Faz 1-10)
   * ========================================================================= */
  describe('F1: Şema Doğrulayıcı & Validasyon Testleri (Faz 1-10)', () => {
    it('validateRichResultSchema geçerli LocalBusiness şemasını başarıyla doğrular', () => {
      const schema = buildLocalBusinessSchema({ pillar: 'site' });
      const validation = validateRichResultSchema(schema, 'LocalBusiness');
      expect(validation.isValid).toBe(true);
      expect(validation.missingRequiredFields).toHaveLength(0);
    });

    it('validateRichResultSchema eksik alanları doğru şekilde tespit eder', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        // title, description, validThrough vs eksik
      };
      const validation = validateRichResultSchema(invalidSchema, 'JobPosting');
      expect(validation.isValid).toBe(false);
      expect(validation.missingRequiredFields).toContain('title');
      expect(validation.missingRequiredFields).toContain('validThrough');
    });

    it('validateRichResultSchema geçerli HowTo şemasını doğrular', () => {
      const schema = buildHowToSchema(HOWTO_SITE_MANAGEMENT_SETUP);
      const validation = validateRichResultSchema(schema, 'HowTo');
      expect(validation.isValid).toBe(true);
      expect(validation.missingRequiredFields).toHaveLength(0);
    });
  });

  /* =========================================================================
   * F2 — LOCALBUSINESS & PROFESSIONAL SERVICE ŞEMALARI (Faz 11-22)
   * ========================================================================= */
  describe('F2: LocalBusiness & ProfessionalService Şema Testleri (Faz 11-22)', () => {
    it('buildLocalBusinessSchema Site pillar için çift tipli ve NAP entegreli şema üretir', () => {
      const schema = buildLocalBusinessSchema({ pillar: 'site' });
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toContain('LocalBusiness');
      expect(schema['@type']).toContain('ProfessionalService');
      expect(schema.name).toContain('Site ve Apartman Yönetimi');
      expect(schema.telephone).toBeDefined();
      expect(schema.address).toBeDefined();
      expect((schema.address as { addressLocality: string }).addressLocality).toBe('Kadıköy');
      expect(schema.geo).toBeDefined();
      expect(schema.openingHoursSpecification).toBeDefined();
      expect(schema.sameAs).toBeInstanceOf(Array);
      expect((schema.sameAs as string[]).length).toBeGreaterThanOrEqual(3);
    });

    it('buildLocalBusinessSchema Tesis pillar için B2B odaklı başlık ve açıklama üretir', () => {
      const schema = buildLocalBusinessSchema({ pillar: 'facility' });
      expect(schema.name).toContain('Tesis & Plaza Yönetimi');
      expect(schema.description).toContain('ISO 41001');
      expect(schema.makesOffer).toBeInstanceOf(Array);
      expect((schema.makesOffer as unknown[]).length).toBe(9); // 9 temel hizmet
    });

    it('buildDistrictLocalBusinessSchema Kadıköy için mikro-lokasyon şeması üretir', () => {
      const kadikoySite = buildDistrictLocalBusinessSchema('kadikoy', 'site');
      expect(kadikoySite.name).toBe('Alo Yönetim — Kadıköy Site & Apartman Yönetimi');
      expect(kadikoySite.areaServed.name).toBe('Kadıköy, İstanbul');
      expect(kadikoySite.url).toBe(`${BASE_URL}/istanbul/kadikoy`);

      const besiktasFacility = buildDistrictLocalBusinessSchema('besiktas', 'facility');
      expect(besiktasFacility.name).toBe('Alo Yönetim — Beşiktaş Tesis & Plaza Yönetimi');
      expect(besiktasFacility.areaServed.name).toBe('Beşiktaş, İstanbul');
    });

    it('buildOpeningHoursSpecification standart hafta içi ve cumartesi mesai saatlerini içerir', () => {
      const hours = buildOpeningHoursSpecification();
      expect(hours).toHaveLength(2);
      expect(hours[0].dayOfWeek).toContain('Monday');
      expect(hours[0].opens).toBe('08:30');
      expect(hours[1].dayOfWeek).toContain('Saturday');
    });

    it('buildAllOffers 9 temel hizmetin tamamını Schema.org Offer nesnesi olarak döner', () => {
      const offers = buildAllOffers('site');
      expect(offers).toHaveLength(9);
      offers.forEach((offer) => {
        expect(offer['@type']).toBe('Offer');
        expect(offer.priceCurrency).toBe('TRY');
        expect(offer.seller['@type']).toBe('Organization');
      });
    });
  });

  /* =========================================================================
   * F3 — HOWTO & ADIM ADIM REHBER ŞEMALARI (Faz 23-34)
   * ========================================================================= */
  describe('F3: HowTo & Rehber Şemaları Testleri (Faz 23-34)', () => {
    it('5 adet hazır HowTo rehberi eksiksiz tanımlanmıştır', () => {
      expect(ALL_HOWTO_GUIDES).toHaveLength(5);
    });

    it('HOWTO_SITE_MANAGEMENT_SETUP 8 adımdan oluşur ve ISO 8601 totalTime içerir', () => {
      expect(HOWTO_SITE_MANAGEMENT_SETUP.steps).toHaveLength(8);
      expect(HOWTO_SITE_MANAGEMENT_SETUP.totalTime).toBe('P7D');
      expect(HOWTO_SITE_MANAGEMENT_SETUP.supply).toBeDefined();

      const schema = buildHowToSchema(HOWTO_SITE_MANAGEMENT_SETUP);
      expect(schema['@type']).toBe('HowTo');
      expect(schema.step).toHaveLength(8);
      expect((schema.step as Array<{ name: string; position: number }>)[0].position).toBe(1);
    });

    it('HOWTO_FACILITY_CONTRACT 6 adım ve SLA metrikleri içerir', () => {
      expect(HOWTO_FACILITY_CONTRACT.steps).toHaveLength(6);
      expect(HOWTO_FACILITY_CONTRACT.pillar).toBe('facility');
    });

    it('HOWTO_PLAZA_BUDGET 7 adım ve gider paylaşım modeli içerir', () => {
      expect(HOWTO_PLAZA_BUDGET.steps).toHaveLength(7);
    });

    it('HOWTO_ONLINE_DUES_SYSTEM 5 adımdan oluşur ve PT3H süresi içerir', () => {
      expect(HOWTO_ONLINE_DUES_SYSTEM.steps).toHaveLength(5);
      expect(HOWTO_ONLINE_DUES_SYSTEM.totalTime).toBe('PT3H');
    });

    it('HOWTO_ISO_41001_COMPLIANCE 10 adımdan oluşur ve uluslararası standartları kapsar', () => {
      expect(HOWTO_ISO_41001_COMPLIANCE.steps).toHaveLength(10);
      expect(HOWTO_ISO_41001_COMPLIANCE.totalTime).toBe('P60D');
    });
  });

  /* =========================================================================
   * F4 — AGGREGATE RATING & REVIEW ŞEMALARI (Faz 35-44)
   * ========================================================================= */
  describe('F4: Rating & Review Şema Testleri (Faz 35-44)', () => {
    it('SITE_REVIEW_BANK en az 5 adet konut/site müşteri yorumu içerir', () => {
      expect(SITE_REVIEW_BANK.length).toBeGreaterThanOrEqual(5);
      SITE_REVIEW_BANK.forEach((review) => {
        expect(review.ratingValue).toBeGreaterThanOrEqual(1);
        expect(review.ratingValue).toBeLessThanOrEqual(5);
        expect(review.authorName.length).toBeGreaterThan(3);
        expect(review.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(review.positiveNotes).toBeDefined();
      });
    });

    it('FACILITY_REVIEW_BANK en az 5 adet B2B tesis yönetimi müşteri yorumu içerir', () => {
      expect(FACILITY_REVIEW_BANK.length).toBeGreaterThanOrEqual(5);
      FACILITY_REVIEW_BANK.forEach((review) => {
        expect(review.pillar).toBe('facility');
        expect(review.districtSlug).toBeDefined();
      });
    });

    it('buildReviewSchema geçerli Schema.org Review üretir', () => {
      const review = SITE_REVIEW_BANK[0];
      const schema = buildReviewSchema(review);
      expect(schema['@type']).toBe('Review');
      expect(schema.author).toEqual({ '@type': 'Person', name: review.authorName });
      expect(schema.reviewRating).toEqual({
        '@type': 'Rating',
        ratingValue: review.ratingValue,
        bestRating: 5,
        worstRating: 1,
      });
      expect(schema.positiveNotes).toBeDefined();
    });

    it('buildAggregateRatingSchema ortalama puanı ve toplam inceleme sayısını doğru hesaplar', () => {
      const aggSite = buildAggregateRatingSchema('site');
      expect(aggSite['@type']).toBe('AggregateRating');
      expect(aggSite.ratingValue).toBeGreaterThanOrEqual(4.5);
      expect(aggSite.ratingValue).toBeLessThanOrEqual(5.0);
      expect(aggSite.reviewCount).toBeGreaterThan(100);

      const aggFacility = buildAggregateRatingSchema('facility');
      expect(aggFacility.ratingValue).toBeGreaterThanOrEqual(4.5);
    });

    it('buildServiceReviewPage Product + AggregateRating + Review dizisi üretir', () => {
      const pageSchema = buildServiceReviewPage('tesis-yonetimi', 'facility');
      expect(pageSchema['@type']).toBe('Product');
      expect(pageSchema.aggregateRating).toBeDefined();
      expect(pageSchema.review).toBeInstanceOf(Array);
      expect((pageSchema.review as unknown[]).length).toBeGreaterThanOrEqual(3);
    });
  });

  /* =========================================================================
   * F5 — JOB POSTING & COURSE ŞEMALARI (Faz 45-55)
   * ========================================================================= */
  describe('F5: JobPosting, Course & Event Şema Testleri (Faz 45-55)', () => {
    it('JOB_POSTING_FACILITY_MANAGER ISO 41001, maaş ve lokasyon gereksinimlerini içerir', () => {
      const schema = buildJobPostingSchema(JOB_POSTING_FACILITY_MANAGER);
      expect(schema['@type']).toBe('JobPosting');
      expect(schema.title).toContain('Tesis Yöneticisi');
      expect(schema.employmentType).toBe('FULL_TIME');
      expect(schema.validThrough).toBe('2026-12-31');
      expect(schema.baseSalary).toBeDefined();

      const validation = validateRichResultSchema(schema, 'JobPosting');
      expect(validation.isValid).toBe(true);
    });

    it('JOB_POSTING_SITE_MANAGER KMK 634 ve site yöneticiliği şartlarını içerir', () => {
      const schema = buildJobPostingSchema(JOB_POSTING_SITE_MANAGER);
      expect(schema.title).toContain('Site Müdürü');
      expect(schema.skills).toContain('KMK 634');
      const validation = validateRichResultSchema(schema, 'JobPosting');
      expect(validation.isValid).toBe(true);
    });

    it('buildCourseSchema KMK 634 ve ISO 41001 eğitimleri için Course şeması üretir', () => {
      const kmkCourse = buildCourseSchema(COURSE_KMK_634_LAW);
      expect(kmkCourse['@type']).toBe('Course');
      expect(kmkCourse.courseCode).toBe('ALO-KMK-101');
      expect(kmkCourse.educationalLevel).toBe('Profesyonel');
      expect(kmkCourse.provider.name).toContain('Akademi');

      const isoCourse = buildCourseSchema(COURSE_ISO_41001_FACILITY);
      expect(isoCourse.courseCode).toBe('ALO-ISO-41001');
      expect(isoCourse.hasCourseInstance.courseMode).toBe('blended');

      const validation = validateRichResultSchema(kmkCourse, 'Course');
      expect(validation.isValid).toBe(true);
    });

    it('buildEventSchema genel kurul ve bilgilendirme toplantıları için Event şeması üretir', () => {
      const eventSchema = buildEventSchema({
        name: '2026 Yıllık Kat Malikleri Olağan Genel Kurul Toplantısı',
        description: 'Site yıllık işletme projesi onayı ve yönetici seçimi genel kurulu.',
        startDate: '2026-03-15T10:00:00+03:00',
        endDate: '2026-03-15T14:00:00+03:00',
        locationName: 'Alo Yönetim Kadıköy Toplantı Salonu',
      });
      expect(eventSchema['@type']).toBe('Event');
      expect(eventSchema.name).toContain('Genel Kurul');
      expect(eventSchema.startDate).toBe('2026-03-15T10:00:00+03:00');

      const validation = validateRichResultSchema(eventSchema, 'Event');
      expect(validation.isValid).toBe(true);
    });
  });
});
