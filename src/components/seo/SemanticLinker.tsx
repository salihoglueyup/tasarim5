"use client";

import Link from 'next/link';
import React, { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SemanticLinkerProps {
  text: string;
  maxLinks?: number;
  className?: string;
}

interface DictionaryEntry {
  regex: RegExp;
  url: string;
  label?: string;
}

// Merkezi Anahtar Kelime Haritası (Hizmetler & Öncelikli İlçeler)
const LINK_DICTIONARY: DictionaryEntry[] = [
  // Hizmetler
  { regex: /\b(aidat takibi|aidat yönetimi|aidat tahsilatı)\b/gi, url: '/hizmetler/aidat-takibi' },
  { regex: /\b(güvenlik yönetimi|özel güvenlik|site güvenliği|bina güvenliği)\b/gi, url: '/hizmetler/guvenlik-yonetimi' },
  { regex: /\b(tesis yönetimi|site yönetimi|apartman yönetimi|bina yönetimi)\b/gi, url: '/hizmetler/tesis-yonetimi' },
  { regex: /\b(temizlik ve hijyen|profesyonel temizlik|site temizliği|ortak alan temizliği)\b/gi, url: '/hizmetler/temizlik-ve-hijyen' },
  { regex: /\b(teknik bakım|asansör bakımı|jeneratör bakımı|periyodik bakım)\b/gi, url: '/hizmetler/teknik-bakim' },
  { regex: /\b(peyzaj ve bahçe bakımı|peyzaj yönetimi|bahçe bakımı)\b/gi, url: '/hizmetler/peyzaj-ve-bahce-bakimi' },
  { regex: /\b(havuz bakımı ve hijyen|havuz bakımı|havuz suyu kontrolü)\b/gi, url: '/hizmetler/havuz-bakimi-ve-hijyen' },
  { regex: /\b(haşere ve dezenfeksiyon|haşere ilaçlama|böcek ilaçlama)\b/gi, url: '/hizmetler/hasere-ve-dezenfeksiyon' },
  { regex: /\b(hukuk ve icra danışmanlığı|aidat icra takibi|kat mülkiyeti hukuku)\b/gi, url: '/hizmetler/hukuk-ve-icra-danismanligi' },
  
  // Kurumsal & Araçlar
  { regex: /\b(kalite belgeleri(miz)?|ISO sertifikaları)\b/gi, url: '/kurumsal/kalite-belgelerimiz' },
  { regex: /\b(güvenlik akademisi)\b/gi, url: '/guvenlik-akademisi' },
  { regex: /\b(aidat hesaplama|yönetim hesaplayıcı)\b/gi, url: '/hesaplayici' },

  // İlçeler (Silo Bağlantıları)
  { regex: /\b(Kadıköy)\b/g, url: '/bolgeler/kadikoy' },
  { regex: /\b(Ataşehir)\b/g, url: '/bolgeler/atasehir' },
  { regex: /\b(Üsküdar)\b/g, url: '/bolgeler/uskudar' },
  { regex: /\b(Maltepe)\b/g, url: '/bolgeler/maltepe' },
  { regex: /\b(Kartal)\b/g, url: '/bolgeler/kartal' },
  { regex: /\b(Ümraniye)\b/g, url: '/bolgeler/umraniye' },
  { regex: /\b(Beşiktaş)\b/g, url: '/bolgeler/besiktas' },
  { regex: /\b(Şişli)\b/g, url: '/bolgeler/sisli' },
  { regex: /\b(Bakırköy)\b/g, url: '/bolgeler/bakirkoy' },
  { regex: /\b(Sarıyer)\b/g, url: '/bolgeler/sariyer' },
  { regex: /\b(Beylikdüzü)\b/g, url: '/bolgeler/beylikduzu' },
  { regex: /\b(Başakşehir)\b/g, url: '/bolgeler/basaksehir' },
];

/**
 * Akıllı Semantik İç Linkleme Motoru (SEO SILO Mimarisi)
 * Metin içindeki anahtar kelimeleri tespit eder, her URL'yi en fazla 1 kez linkleyerek
 * doğal bir iç link ağı oluşturur.
 */
export default function SemanticLinker({ text, maxLinks = 4, className = '' }: SemanticLinkerProps) {
  const { language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    return language === 'en' ? `/en${path}` : path;
  };

  const renderedContent = useMemo(() => {
    let parts: (string | React.ReactNode)[] = [text];
    const linkedUrls = new Set<string>();
    let totalLinkedCount = 0;

    LINK_DICTIONARY.forEach(({ regex, url }) => {
      if (totalLinkedCount >= maxLinks || linkedUrls.has(url)) return;

      const newParts: (string | React.ReactNode)[] = [];

      parts.forEach((part, index) => {
        if (typeof part === 'string' && totalLinkedCount < maxLinks && !linkedUrls.has(url)) {
          const splits = part.split(regex);
          const matches = part.match(regex);

          if (matches && matches.length > 0 && splits.length > 1) {
            splits.forEach((split, i) => {
              newParts.push(split);
              if (i < matches.length && !linkedUrls.has(url) && totalLinkedCount < maxLinks) {
                linkedUrls.add(url);
                totalLinkedCount++;
                newParts.push(
                  <Link
                    key={`${index}-${i}-${url}`}
                    href={getLocalizedPath(url)}
                    className="text-[var(--color-primary)] font-medium hover:underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-600 transition-all inline"
                    title={`${matches[i]} — Alo Yönetim`}
                  >
                    {matches[i]}
                  </Link>
                );
              } else if (i < matches.length) {
                newParts.push(matches[i]);
              }
            });
          } else {
            newParts.push(part);
          }
        } else {
          newParts.push(part);
        }
      });

      parts = newParts;
    });

    return parts;
  }, [text, maxLinks, language]);

  return <span className={className}>{renderedContent}</span>;
}
