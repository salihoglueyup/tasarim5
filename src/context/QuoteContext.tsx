"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// QuoteModal yalnız açıldığında yüklenir; ilk bundle'a girmez (SEO V4 Faz 192).
const QuoteModal = dynamic(() => import('@/components/ui/QuoteModal'), { ssr: false });

interface QuoteContextType {
  isQuoteModalOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  return (
    <QuoteContext.Provider value={{ isQuoteModalOpen, openQuoteModal, closeQuoteModal }}>
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
