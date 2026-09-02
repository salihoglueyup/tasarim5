"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

// QuoteModal yalnız açıldığında yüklenir; ilk bundle'a girmez (SEO V4 Faz 192).
const QuoteModal = dynamic(() => import('@/components/ui/QuoteModal'), { ssr: false });

interface QuoteContextType {
  isQuoteModalOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

/**
 * Faz 95: Hızlı Teklif butonuna tıklandığında ve reklam/kampanya linklerinden gelindiğinde
 * URL hash (`#teklif`) yönetimi, tarayıcı geri butonuyla doğal kapanma ve deep-link desteği.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // URL'deki #teklif hash'ini dinleme ve başlangıç kontrolü
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.hash === '#teklif') {
      setIsQuoteModalOpen(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#teklif') {
        setIsQuoteModalOpen(true);
      } else {
        setIsQuoteModalOpen(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(true);
    if (typeof window !== 'undefined' && window.location.hash !== '#teklif') {
      window.history.pushState(null, '', '#teklif');
    }
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#teklif') {
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);

  const value = useMemo(
    () => ({ isQuoteModalOpen, openQuoteModal, closeQuoteModal }),
    [isQuoteModalOpen, openQuoteModal, closeQuoteModal]
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      {isQuoteModalOpen && <QuoteModal onClose={closeQuoteModal} />}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
