"use client";

import { useRef, useState, useCallback, useEffect } from 'react';
import type { Lead } from '@/lib/leads/types';

/**
 * Ortak lead gönderim hook'u (Track 1).
 * İletişim formu, teklif sihirbazı, newsletter ve geri-arama tarafından
 * paylaşılır: fetch + loading/success/error durumu + honeypot/elapsedMs
 * spam alanlarını ekler. errorKey, i18n `t()` ile gösterilir.
 */

export type LeadStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseLeadSubmit {
  status: LeadStatus;
  errorKey: string | null;
  submit: (lead: Lead, honeypot?: string) => Promise<boolean>;
  reset: () => void;
}

export function useLeadSubmit(): UseLeadSubmit {
  const [status, setStatus] = useState<LeadStatus>('idle');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  // Bileşen mount anı — bota karşı min-süre kontrolü için.
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const submit = useCallback(async (lead: Lead, honeypot = ''): Promise<boolean> => {
    setStatus('loading');
    setErrorKey(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          company: honeypot,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus('success');
        return true;
      }
      setErrorKey(typeof data.errorKey === 'string' ? data.errorKey : 'lead_error_generic');
      setStatus('error');
      return false;
    } catch {
      setErrorKey('lead_error_generic');
      setStatus('error');
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorKey(null);
  }, []);

  return { status, errorKey, submit, reset };
}
