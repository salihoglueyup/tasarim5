"use client";

import dynamic from 'next/dynamic';

import Icon from '@/components/ui/branding/Icon';
/**
 * Faz 30: InteractiveFacilityExplorer (13 KB) bileşenini client island olarak dinamik yükleyen sarmalayıcı.
 * Ana sayfa ve hizmet sayfalarında ilk SSR yükünü şişirmez; viewport veya etkileşim anında yüklenir.
 */
const DynamicInteractiveFacilityExplorer = dynamic(
  () => import('./InteractiveFacilityExplorer'),
  {
    ssr: false,
    loading: () => (
      <div className="relative py-20 bg-slate-50 dark:bg-[var(--color-surface-variant)] rounded-[2.5rem] border border-[var(--color-outline)]/60 my-12 animate-pulse flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Icon name="progress_activity" className="text-4xl animate-spin" />
          <span className="text-sm font-medium">Tesis Keşif Haritası Yükleniyor...</span>
        </div>
      </div>
    ),
  }
);

export default DynamicInteractiveFacilityExplorer;
