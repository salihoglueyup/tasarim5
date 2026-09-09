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
  // Tesis Yönetimi Alt Sektörleri (Amiral Gemisi - Öncelikli Spesifik Eşleşmeler)
  { regex: makeUnicodeRegex('rezidans yönetimi|rezidans site yönetimi|lüks rezidans'), url: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi' },
  { regex: makeUnicodeRegex('plaza yönetimi|ofis binası yönetimi|iş merkezi yönetimi'), url: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  { regex: makeUnicodeRegex('toplu konut yönetimi|toplu yapı yönetimi|TOKİ site yönetimi'), url: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  { regex: makeUnicodeRegex('sanayi tesisi yönetimi|fabrika yönetimi|endüstriyel tesis yönetimi'), url: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  { regex: makeUnicodeRegex('tesis yönetimi rehberi|yönetim rehberi|şartname rehberi'), url: '/hizmetler/tesis-yonetimi/rehber' },

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
  { regex: makeUnicodeRegex('kat malikleri kurulu'), url: '/sozluk/kat-malikleri-kurulu' },
  { regex: makeUnicodeRegex('yönetim planı'), url: '/sozluk/yonetim-plani' },
  { regex: makeUnicodeRegex('işletme projesi'), url: '/sozluk/isletme-projesi' },
  { regex: makeUnicodeRegex('site işletme bütçesi'), url: '/sozluk/site-isletme-butcesi' },
  { regex: makeUnicodeRegex('5188 sayılı kanun|5188 kanunu'), url: '/sozluk/5188-sayili-kanun' },
  { regex: makeUnicodeRegex('özel güvenlik izni|ÖGİ'), url: '/sozluk/ozel-guvenlik-izni-ogi' },
  { regex: makeUnicodeRegex('özel güvenlik kimlik kartı'), url: '/sozluk/ozel-guvenlik-kimlik-karti' },
  { regex: makeUnicodeRegex('demirbaş avans fonu|demirbaş'), url: '/sozluk/demirbas' },
  { regex: makeUnicodeRegex('arsa payı'), url: '/sozluk/arsa-payi' },
  { regex: makeUnicodeRegex('kat irtifakı'), url: '/sozluk/kat-irtifaki' },
  { regex: makeUnicodeRegex('ortak alan'), url: '/sozluk/ortak-alan' },
  { regex: makeUnicodeRegex('denetçi'), url: '/sozluk/denetci' },
  { regex: makeUnicodeRegex('su deposu dezenfeksiyonu|su deposu temizliği'), url: '/sozluk/su-deposu-dezenfeksiyonu-ve-analizi' },
  { regex: makeUnicodeRegex('bina otomasyon sistemi|BMS'), url: '/sozluk/bina-otomasyon-sistemi-bms' },
  { regex: makeUnicodeRegex('plaka tanıma sistemi|PTS'), url: '/sozluk/plaka-tanima-sistemi-pts' },
  { regex: makeUnicodeRegex('RFID devriye|devriye tur kontrol'), url: '/sozluk/rfid-devriye-tur-kontrol-sistemi' },
  { regex: makeUnicodeRegex('CCTV kamera|kamera güvenlik sistemi'), url: '/sozluk/cctv-kamera-guvenlik-sistemi' },
  { regex: makeUnicodeRegex('gecikme tazminatı'), url: '/sozluk/gecikme-tazminati-5-yasal-faiz' },
  { regex: makeUnicodeRegex('yeşil etiket asansör|yeşil etiket'), url: '/sozluk/yesil-etiket-asansor' },
  { regex: makeUnicodeRegex('kompanzasyon|reaktif güç'), url: '/sozluk/kompanzasyon-reaktif-guc' },
  { regex: makeUnicodeRegex('mali ibra'), url: '/sozluk/mali-ibra' },
  { regex: makeUnicodeRegex('hizmet seviyesi taahhüdü|SLA taahhüdü'), url: '/sozluk/hizmet-seviyesi-taahhudu-sla' },
  { regex: makeUnicodeRegex('önleyici bakım|preventive maintenance'), url: '/sozluk/onleyici-bakim-preventive-maintenance' },
  { regex: makeUnicodeRegex('merkezi ısı pay ölçer|ısı pay ölçer'), url: '/sozluk/merkezi-isi-pay-olcer' },
  { regex: makeUnicodeRegex('enerji kimlik belgesi|EKB'), url: '/sozluk/enerji-kimlik-belgesi-ekb' },
  { regex: makeUnicodeRegex('iskan belgesi|yapı kullanma izin belgesi'), url: '/sozluk/iskan-yapi-kullanma-izin-belgesi' },
  { regex: makeUnicodeRegex('hazirun cetveli'), url: '/sozluk/hazirun-cetveli' },
  { regex: makeUnicodeRegex('sıfır atık belgesi|sıfır atık'), url: '/sozluk/atik-yonetimi-ve-sifir-atik-belgesi' },
  { regex: makeUnicodeRegex('jeneratör periyodik bakımı|jeneratör bakımı'), url: '/sozluk/jenerator-periyodik-bakimi-ve-yuk-testi' },
  { regex: makeUnicodeRegex('hidrofor bakımı|hidrofor sistemi'), url: '/sozluk/hidrofor-ve-basinc-dengeleme-sistemi' },

  // Kurumsal, Akreditasyon, Araçlar & Sektörel
  { regex: makeUnicodeRegex('kalite belgeleri(?:miz)?|ISO sertifikaları|ISO 41001|ISO 9001|ISO 14001|ISO 45001|ISO 27001|ISO 10002|TSE HYB(?: 12850)?'), url: '/kurumsal/kalite-belgelerimiz' },
  { regex: makeUnicodeRegex('istihdam köprüsü|özel güvenlik iş ilanları|kariyer'), url: '/istihdam-koprusu' },
  { regex: makeUnicodeRegex('başarı hikayeleri|vaka analizleri|örnek projeler'), url: '/basari-hikayeleri' },
  { regex: makeUnicodeRegex('güvenlik akademisi'), url: '/guvenlik-akademisi' },
  { regex: makeUnicodeRegex('aidat hesaplama|yönetim hesaplayıcı|aidat simülatörü'), url: '/hesaplayici' },
  { regex: makeUnicodeRegex('sürdürülebilirlik|yeşil tesis|GES projeleri'), url: '/kurumsal/surdurulebilirlik' },
  { regex: makeUnicodeRegex('ücretsiz teklif|ücretsiz keşif'), url: '/teklif-al' },
  { regex: makeUnicodeRegex('sektörel çözümler'), url: '/sektorel-cozumler' },
  { regex: makeUnicodeRegex('hakkımızda|kurumsal profil'), url: '/hakkimizda' },
  { regex: makeUnicodeRegex('iletişim|bize ulaşın'), url: '/iletisim' },

  // İstanbul 39 İlçe Silo Bağlantıları (Anadolu Yakası)
  { regex: makeUnicodeRegex('Kadıköy'), url: '/bolgeler/kadikoy' },
  { regex: makeUnicodeRegex('Ataşehir'), url: '/bolgeler/atasehir' },
  { regex: makeUnicodeRegex('Üsküdar'), url: '/bolgeler/uskudar' },
  { regex: makeUnicodeRegex('Ümraniye'), url: '/bolgeler/umraniye' },
  { regex: makeUnicodeRegex('Maltepe'), url: '/bolgeler/maltepe' },
  { regex: makeUnicodeRegex('Kartal'), url: '/bolgeler/kartal' },
  { regex: makeUnicodeRegex('Pendik'), url: '/bolgeler/pendik' },
  { regex: makeUnicodeRegex('Çekmeköy'), url: '/bolgeler/cekmekoy' },
  { regex: makeUnicodeRegex('Sancaktepe'), url: '/bolgeler/sancaktepe' },
  { regex: makeUnicodeRegex('Beykoz'), url: '/bolgeler/beykoz' },
  { regex: makeUnicodeRegex('Tuzla'), url: '/bolgeler/tuzla' },
  { regex: makeUnicodeRegex('Sultanbeyli'), url: '/bolgeler/sultanbeyli' },
  { regex: makeUnicodeRegex('Şile'), url: '/bolgeler/sile' },
  { regex: makeUnicodeRegex('Adalar'), url: '/bolgeler/adalar' },

  // İstanbul 39 İlçe Silo Bağlantıları (Avrupa Yakası)
  { regex: makeUnicodeRegex('Beşiktaş'), url: '/bolgeler/besiktas' },
  { regex: makeUnicodeRegex('Şişli'), url: '/bolgeler/sisli' },
  { regex: makeUnicodeRegex('Sarıyer'), url: '/bolgeler/sariyer' },
  { regex: makeUnicodeRegex('Bakırköy'), url: '/bolgeler/bakirkoy' },
  { regex: makeUnicodeRegex('Beylikdüzü'), url: '/bolgeler/beylikduzu' },
  { regex: makeUnicodeRegex('Başakşehir'), url: '/bolgeler/basaksehir' },
  { regex: makeUnicodeRegex('Küçükçekmece'), url: '/bolgeler/kucukcekmece' },
  { regex: makeUnicodeRegex('Kağıthane|Kâğıthane'), url: '/bolgeler/kagithane' },
  { regex: makeUnicodeRegex('Eyüpsultan|Eyüp'), url: '/bolgeler/eyupsultan' },
  { regex: makeUnicodeRegex('Esenyurt'), url: '/bolgeler/esenyurt' },
  { regex: makeUnicodeRegex('Büyükçekmece'), url: '/bolgeler/buyukcekmece' },
  { regex: makeUnicodeRegex('Avcılar'), url: '/bolgeler/avcilar' },
  { regex: makeUnicodeRegex('Bağcılar'), url: '/bolgeler/bagcilar' },
  { regex: makeUnicodeRegex('Bahçelievler'), url: '/bolgeler/bahcelievler' },
  { regex: makeUnicodeRegex('Zeytinburnu'), url: '/bolgeler/zeytinburnu' },
  { regex: makeUnicodeRegex('Beyoğlu'), url: '/bolgeler/beyoglu' },
  { regex: makeUnicodeRegex('Fatih'), url: '/bolgeler/fatih' },
  { regex: makeUnicodeRegex('Gaziosmanpaşa'), url: '/bolgeler/gaziosmanpasa' },
  { regex: makeUnicodeRegex('Sultangazi'), url: '/bolgeler/sultangazi' },
  { regex: makeUnicodeRegex('Esenler'), url: '/bolgeler/esenler' },
  { regex: makeUnicodeRegex('Arnavutköy'), url: '/bolgeler/arnavutkoy' },
  { regex: makeUnicodeRegex('Bayrampaşa'), url: '/bolgeler/bayrampasa' },
  { regex: makeUnicodeRegex('Güngören'), url: '/bolgeler/gungoren' },
  { regex: makeUnicodeRegex('Silivri'), url: '/bolgeler/silivri' },
  { regex: makeUnicodeRegex('Çatalca'), url: '/bolgeler/catalca' },
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
