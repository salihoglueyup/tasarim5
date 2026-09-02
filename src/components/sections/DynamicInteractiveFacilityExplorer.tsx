"use client";

import dynamic from 'next/dynamic';

/**
 * Faz 30: InteractiveFacilityExplorer (13 KB) bileşenini client island olarak dinamik yükleyen sarmalayıcı.
 * Ana sayfa ve hizmet sayfalarında ilk SSR yükünü şişirmez; viewport veya etkileşim anında yüklenir.
 */
const DynamicInteractiveFacilityExplorer = dynamic(
  () => import('./InteractiveFacilityExplorer'),
  {
    ssr: false,
    loading: () => (
      <div className="relative py-20 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 my-12 animate-pulse flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <span className="material-symbols-outlined text-4xl animate-spin">progress_activity</span>
          <span className="text-sm font-medium">Tesis Keşif Haritası Yükleniyor...</span>
        </div>
      </div>
    ),
  }
);

export default DynamicInteractiveFacilityExplorer;
