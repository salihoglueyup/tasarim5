"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateFacilityRfpDocument } from '@/data/rfpGeneratorData';
import { DISTRICTS } from '@/data/districts';

export default function FacilityRfpDownloadModalSeo() {
  const [isOpen, setIsOpen] = useState(false);
  const [districtSlug, setDistrictSlug] = useState('kadikoy');
  const [units, setUnits] = useState(80);
  const [blocks, setBlocks] = useState(3);
  const [facilityName, setFacilityName] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'guvenlik',
    'temizlik',
    'teknik',
    'muhasebe',
  ]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const rfpDoc = generateFacilityRfpDocument({
    districtSlug,
    units,
    blocks,
    facilityName: facilityName || undefined,
    servicesNeeded: selectedServices,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(rfpDoc.fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden text-[var(--color-primary)]">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">assignment</span>
            B2B İhale ve Yönetim Şartnamesi
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Tesis Yönetimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">Teknik Şartname (RFP) Taslağı</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light leading-relaxed max-w-2xl">
            Siteniz veya plazanız için profesyonel yönetim ihalesi açarken kullanabileceğiniz ISO 41001 ve 634 Sayılı KMK uyumlu resmi teknik şartnameyi saniyeler içinde oluşturun ve ücretsiz indirin.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-[var(--color-secondary)] font-medium">
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[16px]">check_circle</span> 634 KMK Madde 37 Uyumlu</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[16px]">check_circle</span> 5188 Lisans Maddeleri</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[16px]">check_circle</span> 45 Dk SLA Taahhütleri</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-8 py-4 rounded-2xl bg-[var(--color-primary)] hover:opacity-90 text-white font-extrabold text-sm md:text-base shadow-sm hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Şartnameyi Oluştur & İndir
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[var(--color-outline)]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/10 flex items-center justify-center text-[var(--color-primary)]">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">Tesis Yönetimi İhale Şartnamesi (RFP)</h3>
                    <p className="text-xs text-[var(--color-secondary)]">ISO 41001 & KMK Standartlarında Hazır Doküman</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                {/* Form Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[var(--color-surface-variant)] p-4 rounded-2xl border border-[var(--color-outline)]/60">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1.5">Tesis / Site Adı</label>
                    <input
                      type="text"
                      placeholder="Örn: Akasya Konutları"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-xl px-3 py-2 text-xs text-[var(--color-primary)] placeholder-slate-400 focus:outline-none focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1.5">İlçe</label>
                    <select
                      value={districtSlug}
                      onChange={(e) => setDistrictSlug(e.target.value)}
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-xl px-3 py-2 text-xs text-[var(--color-primary)] focus:outline-none focus:border-slate-500"
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d.slug} value={d.slug}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1.5">Daire Sayısı: {units}</label>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={units}
                      onChange={(e) => setUnits(Number(e.target.value))}
                      className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white mt-2"
                    />
                  </div>
                </div>

                {/* Service Selection Badges */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-2">Talep Edilen Hizmet Kapsamı:</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'guvenlik', label: '5188 Özel Güvenlik' },
                      { id: 'temizlik', label: 'Ortak Alan Temizliği' },
                      { id: 'teknik', label: 'Teknik Bakım & Asansör' },
                      { id: 'muhasebe', label: 'Aidat & KMK Muhasebesi' },
                      { id: 'peyzaj', label: 'Peyzaj & Bahçe Bakımı' },
                      { id: 'havuz', label: 'Havuz Bakımı & Kimyasallar' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedServices.includes(s.id)
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-2xs font-bold'
                            : 'bg-[var(--color-surface-variant)] border-[var(--color-outline)]/80 text-[var(--color-secondary)] hover:border-slate-400'
                        }`}
                      >
                        {selectedServices.includes(s.id) ? '✓ ' : '+ '}
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Document Preview Box */}
                <div className="bg-[var(--color-surface-variant)] rounded-2xl p-5 border border-[var(--color-outline)]/60 font-mono text-[11px] leading-relaxed text-[var(--color-primary)] max-h-80 overflow-y-auto select-all whitespace-pre-line custom-scrollbar">
                  {rfpDoc.fullText}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[var(--color-outline)]/60 flex items-center justify-between bg-[var(--color-surface-variant)]/40">
                <div className="text-xs text-[var(--color-secondary)] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[16px]">verified</span>
                  Alo Yönetim Hukuk & Standartlar Masası Onaylı
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="px-5 py-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-variant)] text-[var(--color-primary)] text-xs font-bold transition-all flex items-center gap-2 border border-[var(--color-outline)] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    {copied ? 'Kopyalandı!' : 'Metni Kopyala'}
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([rfpDoc.fullText], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Tesis_Yonetimi_Sartnamesi_${districtSlug}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:opacity-90 text-white text-xs font-extrabold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Dosyayı İndir (.txt)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
