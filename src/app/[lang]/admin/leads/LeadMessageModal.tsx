'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function LeadMessageModal({ lead }: { lead: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-transparent transition-all text-xs"
        title="Detay"
      >
        Detay
      </button>
    );
  }

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/10">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Mesaj Detayı</h3>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Gönderen</div>
              <div className="font-medium text-slate-900 dark:text-white">{lead.name || '-'}</div>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Tarih</div>
              <div className="font-medium text-slate-900 dark:text-white">{new Date(lead.createdAt).toLocaleString('tr-TR')}</div>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Telefon</div>
              <div className="font-medium text-slate-900 dark:text-white">{lead.phone || '-'}</div>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">E-Posta</div>
              <div className="font-medium text-slate-900 dark:text-white">{lead.email || '-'}</div>
            </div>
          </div>

          {(lead.type || lead.subject) && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Form Türü & Konu</div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 rounded-lg text-sm font-medium uppercase tracking-wide">
                  {lead.type}
                </span>
                {lead.subject && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-gray-300 rounded-lg text-sm font-medium">
                    {lead.subject}
                  </span>
                )}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mesaj İçeriği</div>
            <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-xl border border-slate-100 dark:border-white/5 text-slate-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
              {lead.message || <span className="italic text-slate-400">Mesaj içeriği bulunmuyor.</span>}
            </div>
          </div>

          {lead.meta && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ek (Meta) Bilgiler</div>
              <pre className="bg-slate-900 text-slate-400 p-4 rounded-xl overflow-x-auto text-xs font-mono">
                {JSON.stringify(JSON.parse(lead.meta), null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-transparent transition-all text-xs"
      >
        Detay
      </button>
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
