"use client";

import Link from 'next/link';
import React, { useMemo, useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

export interface SemanticLinkerProps {
  text: string;
  maxLinks?: number;
  className?: string;
}

export interface DictionaryEntry {
  regex: RegExp;
  url: string;
  label?: string;
}

function makeUnicodeRegex(pattern: string): RegExp {
  return new RegExp(`(?<=^|[^\\p{L}\\p{N}])(?:${pattern})(?=[^\\p{L}\\p{N}]|$)`, 'gui');
}

// Merkezi Anahtar Kelime Haritası (Hizmetler, Sözlük Terimleri & Öncelikli İlçeler)
// Türkçe Unicode sınırlarıyla (\\p{L}) tam uyumludur.
export const LINK_DICTIONARY: DictionaryEntry[] = [
  // Hizmetler
  { regex: makeUnicodeRegex('aidat takibi|aidat yönetimi|aidat tahsilatı'), url: '/hizmetler/aidat-takibi' },
  { regex: makeUnicodeRegex('güvenlik yönetimi|özel güvenlik|site güvenliği|bina güvenliği'), url: '/hizmetler/guvenlik-yonetimi' },
  { regex: makeUnicodeRegex('tesis yönetimi|site yönetimi|apartman yönetimi|bina yönetimi|entegre tesis'), url: '/hizmetler/tesis-yonetimi' },
  { regex: makeUnicodeRegex('temizlik ve hijyen|profesyonel temizlik|site temizliği|ortak alan temizliği'), url: '/hizmetler/temizlik-ve-hijyen' },
  { regex: makeUnicodeRegex('teknik bakım|asansör bakımı|jeneratör bakımı|periyodik bakım'), url: '/hizmetler/teknik-bakim' },
  { regex: makeUnicodeRegex('peyzaj ve bahçe bakımı|peyzaj yönetimi|bahçe bakımı'), url: '/hizmetler/peyzaj-ve-bahce-bakimi' },
  { regex: makeUnicodeRegex('havuz bakımı ve hijyen|havuz bakımı|havuz suyu kontrolü'), url: '/hizmetler/havuz-bakimi-ve-hijyen' },
  { regex: makeUnicodeRegex('haşere ve dezenfeksiyon|haşere ilaçlama|böcek ilaçlama'), url: '/hizmetler/hasere-ve-dezenfeksiyon' },
  { regex: makeUnicodeRegex('hukuk ve icra danışmanlığı|aidat icra takibi|kat mülkiyeti hukuku'), url: '/hizmetler/hukuk-ve-icra-danismanligi' },
  
  // Sözlük Terimleri (Silo İç Linkleri)
  { regex: makeUnicodeRegex('Kat Mülkiyeti Kanunu|634 sayılı KMK|KMK 634'), url: '/sozluk/kat-mulkiyeti-kanunu-kmk' },
  { regex: makeUnicodeRegex('işletme projesi'), url: '/sozluk/isletme-projesi' },
  { regex: makeUnicodeRegex('5188 sayılı kanun|5188 kanunu'), url: '/sozluk/5188-sayili-kanun' },
  { regex: makeUnicodeRegex('özel güvenlik izni|ÖGİ'), url: '/sozluk/ozel-guvenlik-izni-ogi' },
  { regex: makeUnicodeRegex('demirbaş avans fonu|demirbaş'), url: '/sozluk/demirbas' },
  { regex: makeUnicodeRegex('arsa payı'), url: '/sozluk/arsa-payi' },
  { regex: makeUnicodeRegex('kat irtifakı'), url: '/sozluk/kat-irtifaki' },
  { regex: makeUnicodeRegex('su deposu dezenfeksiyonu|su deposu temizliği'), url: '/sozluk/su-deposu-dezenfeksiyonu-ve-analizi' },
  { regex: makeUnicodeRegex('bina otomasyon sistemi|BMS'), url: '/sozluk/bina-otomasyon-sistemi-bms' },
  { regex: makeUnicodeRegex('plaka tanıma sistemi|PTS'), url: '/sozluk/plaka-tanima-sistemi-pts' },
  { regex: makeUnicodeRegex('gecikme tazminatı'), url: '/sozluk/gecikme-tazminati-5-yasal-faiz' },
  { regex: makeUnicodeRegex('yeşil etiket asansör|yeşil etiket'), url: '/sozluk/yesil-etiket-asansor' },
  { regex: makeUnicodeRegex('kompanzasyon|reaktif güç'), url: '/sozluk/kompanzasyon-reaktif-guc' },
  { regex: makeUnicodeRegex('mali ibra'), url: '/sozluk/mali-ibra' },

  // Kurumsal & Araçlar
  { regex: makeUnicodeRegex('kalite belgeleri(?:miz)?|ISO sertifikaları|ISO 41001'), url: '/kurumsal/kalite-belgelerimiz' },
  { regex: makeUnicodeRegex('güvenlik akademisi'), url: '/guvenlik-akademisi' },
  { regex: makeUnicodeRegex('aidat hesaplama|yönetim hesaplayıcı|aidat simülatörü'), url: '/hesaplayici' },
  { regex: makeUnicodeRegex('sürdürülebilirlik|yeşil tesis|GES projeleri'), url: '/kurumsal/surdurulebilirlik' },
  { regex: makeUnicodeRegex('ücretsiz teklif|ücretsiz keşif'), url: '/teklif-al' },

  // İlçeler (Silo Bağlantıları)
  { regex: makeUnicodeRegex('Kadıköy'), url: '/bolgeler/kadikoy' },
  { regex: makeUnicodeRegex('Ataşehir'), url: '/bolgeler/atasehir' },
  { regex: makeUnicodeRegex('Üsküdar'), url: '/bolgeler/uskudar' },
  { regex: makeUnicodeRegex('Maltepe'), url: '/bolgeler/maltepe' },
  { regex: makeUnicodeRegex('Kartal'), url: '/bolgeler/kartal' },
  { regex: makeUnicodeRegex('Ümraniye'), url: '/bolgeler/umraniye' },
  { regex: makeUnicodeRegex('Beşiktaş'), url: '/bolgeler/besiktas' },
  { regex: makeUnicodeRegex('Şişli'), url: '/bolgeler/sisli' },
  { regex: makeUnicodeRegex('Bakırköy'), url: '/bolgeler/bakirkoy' },
  { regex: makeUnicodeRegex('Sarıyer'), url: '/bolgeler/sariyer' },
  { regex: makeUnicodeRegex('Beylikdüzü'), url: '/bolgeler/beylikduzu' },
  { regex: makeUnicodeRegex('Başakşehir'), url: '/bolgeler/basaksehir' },
];

/**
 * Akıllı Semantik İç Linkleme Motoru (SEO SILO Mimarisi - Kesin İndeks Dilimleme)
 * Metin içindeki anahtar kelimeleri tespit eder, her URL'yi en fazla 1 kez linkleyerek
 * doğal bir iç link ağı oluşturur. Asla kelime tekrarına (dup-link) yol açmaz.
 */
export default function SemanticLinker({ text, maxLinks = 4, className }: SemanticLinkerProps) {
  const langContext = useContext(LanguageContext);
  const language = langContext?.language || 'tr';

  const getLocalizedPath = (path: string) => {
    return language === 'en' ? `/en${path}` : path;
  };

  const renderedContent = useMemo(() => {
    if (!text || typeof text !== 'string') return text;

    interface MatchItem {
      start: number;
      end: number;
      text: string;
      url: string;
    }

    const matchedRanges: MatchItem[] = [];
    const usedUrls = new Set<string>();

    for (const entry of LINK_DICTIONARY) {
      if (usedUrls.has(entry.url) || matchedRanges.length >= maxLinks) continue;

      const reg = new RegExp(entry.regex.source, entry.regex.flags);
      let match: RegExpExecArray | null;

      while ((match = reg.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        // Çakışma kontrolü: Daha önce eşleşmiş bir aralıkla çakışıyorsa atla
        const overlaps = matchedRanges.some(
          (existing) => !(end <= existing.start || start >= existing.end)
        );

        if (!overlaps) {
          matchedRanges.push({ start, end, text: match[0], url: entry.url });
          usedUrls.add(entry.url);
          break; // Her kural ve URL için sayfa başına maksimum 1 link
        }
      }
    }

    if (matchedRanges.length === 0) {
      return text;
    }

    // Başlangıç indeksine göre sırala
    matchedRanges.sort((a, b) => a.start - b.start);

    const parts: (string | React.ReactNode)[] = [];
    let cursor = 0;

    matchedRanges.forEach((match, idx) => {
      if (match.start > cursor) {
        parts.push(text.slice(cursor, match.start));
      }

      parts.push(
        <Link
          key={`sem-link-${idx}-${match.url}`}
          href={getLocalizedPath(match.url)}
          className="text-[var(--color-primary)] font-medium hover:underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-600 transition-all inline"
          title={`${match.text} — Alo Yönetim`}
        >
          {match.text}
        </Link>
      );

      cursor = match.end;
    });

    if (cursor < text.length) {
      parts.push(text.slice(cursor));
    }

    return parts;
  }, [text, maxLinks, language]);

  return className ? <span className={className}>{renderedContent}</span> : <span>{renderedContent}</span>;
}
