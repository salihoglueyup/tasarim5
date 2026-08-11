'use client';

type GTMEventParams = {
  event: string;
  [key: string]: any;
};

/**
 * Pushes structured event data to the global Google Tag Manager (GTM) dataLayer.
 * Usage:
 * pushToDataLayer({ event: 'generate_lead', formType: 'contact' })
 */
export const pushToDataLayer = (params: GTMEventParams) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push(params);
  } else {
    // Graceful fallback for non-browser environment or missing GTM script
    if (process.env.NODE_ENV === 'development') {
      console.warn('GTM DataLayer not initialized. Attempted to push:', params);
    }
  }
};

/**
 * A custom hook wrapper for pushing events (can be expanded if we need context/route dependencies).
 */
export function useGTMEvent() {
  return {
    trackEvent: pushToDataLayer
  };
}
