/**
 * Şirketin DOĞRULANMIŞ bilgileri (tek kaynak).
 * Pazarlama metinlerinde, API/AI çıktılarında ve şemalarda sayı yazılacaksa buradan okunur.
 * Doğrulanamayan oranlar (tahsilat %, tasarruf %, memnuniyet puanı vb.) bilerek YOKTUR; ekleme.
 * Bu dosyadaki her değer şirket sahibi tarafından onaylanmıştır (2026-10).
 */
import { REAL_REFERENCES } from '@/data/realReferences';

export const FACTS = {
  /** Grup şirketlerinin faaliyete başlama yılı (şirket sahibi: "hepsi 2009"). */
  foundingYear: 2009,
  /** Toplam ekip büyüklüğü (ofis 11-12 kişi, kalanı saha). */
  teamSize: 90,
  /** Hizmet verilebilen İstanbul ilçesi sayısı (kapsama alanı). */
  districtCount: 39,
  /** Referans listesindeki kurum sayısı (src/data/realReferences.ts). */
  referenceCount: REAL_REFERENCES.length,
  /** Yazılı SLA kapsamında acil teknik müdahale hedefi. */
  emergencyResponse: { anatolian: '30 dakika', european: '1 saat' },
} as const;

/** "2009'dan beri" gibi yıl sayısı yazmadan kullanılacak kısa ifade. */
export const SINCE_TEXT = { tr: "2009'dan beri", en: 'since 2009', ru: 'с 2009 года', ar: 'منذ عام 2009' } as const;

/** Müdahale hedefi cümlesi (iddia değil hedeftir; sözleşmedeki SLA'ya bağlıdır). */
export const RESPONSE_TARGET_TEXT = {
  tr: "Yazılı SLA kapsamında acil teknik müdahale hedefi Anadolu Yakası'nda 30 dakika, Avrupa Yakası'nda 1 saattir.",
  en: 'Under the written SLA, the emergency technical response target is 30 minutes on the Anatolian Side and 1 hour on the European Side.',
  ru: 'В рамках письменного SLA целевое время аварийного технического реагирования — 30 минут на Анатолийской стороне и 1 час на Европейской стороне.',
  ar: 'ضمن اتفاقية مستوى الخدمة المكتوبة، هدف الاستجابة الفنية الطارئة هو 30 دقيقة في الجانب الأناضولي وساعة واحدة في الجانب الأوروبي.',
} as const;
