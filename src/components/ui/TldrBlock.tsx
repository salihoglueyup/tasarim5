/**
 * TL;DR / özet bloğu (SEO Master Plan V4 — Faz 134).
 *
 * Sayfa başında net, kendi kendine yeten 2-3 cümlelik özet. AI motorları ve
 * öne çıkan snippet'ler bu bloğu alıntılar. `speakable` seçicisiyle de
 * hizalanabilir (.tldr).
 */
export default function TldrBlock({ children }: { children: React.ReactNode }) {
  return (
    <aside className="tldr flex items-start gap-4 bg-slate-900/5 dark:bg-white/5 border border-slate-900/15 dark:border-white/15 rounded-2xl p-6">
      <span className="material-symbols-outlined text-slate-900 dark:text-white shrink-0" aria-hidden="true">
        bolt
      </span>
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
          Özet
        </div>
        <p className="text-sm md:text-base text-[var(--color-secondary)] leading-relaxed">
          {children}
        </p>
      </div>
    </aside>
  );
}
