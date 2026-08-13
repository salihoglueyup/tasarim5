"use client";

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SemanticLinkerProps {
  text: string;
}

export default function SemanticLinker({ text }: SemanticLinkerProps) {
  const { language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    return language === 'en' ? `/en${path}` : path;
  };

  // Define keyword mappings for SILO linking
  const dictionary = [
    { regex: /site yönetimi/gi, url: '/hizmetler/site-yonetimi' },
    { regex: /tesis yönetimi/gi, url: '/hizmetler/tesis-yonetimi' },
    { regex: /temizlik( hizmetleri)?/gi, url: '/hizmetler/profesyonel-temizlik' },
    { regex: /güvenlik( hizmetleri)?/gi, url: '/hizmetler/ozel-guvenlik' },
    { regex: /peyzaj/gi, url: '/hizmetler/peyzaj-ve-bahce-bakim' },
    { regex: /havuz bakımı/gi, url: '/hizmetler/havuz-bakim' },
    { regex: /aidat/gi, url: '/hizmetler/aidat-ve-butce-yonetimi' },
    { regex: /hukuki/gi, url: '/hizmetler/hukuk-ve-icra-takibi' },
    { regex: /haşere/gi, url: '/hizmetler/hasere-kontrol' },
  ];

  const renderTextWithLinks = () => {
    let parts: (string | React.ReactNode)[] = [text];

    dictionary.forEach(({ regex, url }) => {
      const newParts: (string | React.ReactNode)[] = [];
      
      parts.forEach((part, index) => {
        if (typeof part === 'string') {
          // Split by regex
          const splits = part.split(regex);
          const matches = part.match(regex);

          if (matches && matches.length > 0) {
            splits.forEach((split, i) => {
              newParts.push(split);
              if (i < matches.length) {
                // Ensure we only link it once per paragraph to avoid spamming
                // But for simplicity, we link all occurrences here
                newParts.push(
                  <Link 
                    key={`${index}-${i}`} 
                    href={getLocalizedPath(url)}
                    className="text-[var(--color-primary)] hover:underline font-medium relative group"
                    title={`${matches[i]} Hizmetimiz`}
                  >
                    {matches[i]}
                  </Link>
                );
              }
            });
          } else {
            newParts.push(part);
          }
        } else {
          newParts.push(part); // Already a React element (link)
        }
      });
      parts = newParts;
    });

    return parts;
  };

  return <>{renderTextWithLinks()}</>;
}
