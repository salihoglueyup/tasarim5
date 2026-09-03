"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export interface VaultDocument {
  id: string;
  title: string;
  category: string;
  format: 'Excel' | 'Word' | 'PDF';
  size: string;
  lawReference: string;
  description: string;
  fileName: string;
}

const VAULT_DOCS: VaultDocument[] = [
  {
    id: 'doc-kmk-isletme',
    title: 'KMK Madde 37 Standart Yıllık İşletme Projesi Şablonu',
    category: 'Mali & Bütçe Yönetimi',
    format: 'Excel',
    size: '145 KB',
    lawReference: '634 Sayılı KMK Madde 37 & 20',
    description: '12 aylık tahmini gelir-gider bütçesi, bağımsız bölüm arsa payı avans hesaplama ve kesinleşme tebliğ şablonu.',
    fileName: 'Alo_Yonetim_KMK_37_Isletme_Projesi_Sablonu.xlsx'
  },
  {
    id: 'doc-devir-teslim',
    title: 'Noter Onaylı Yönetim Devir Teslim Tutanağı & İbra Protokolü',
    category: 'Hukuk & Resmi Evrak',
    format: 'Word',
    size: '98 KB',
    lawReference: '634 Sayılı KMK Madde 34, 38 & 39',
    description: 'Eski yönetimden kasa, banka hesapları, karar defteri, faturalar ve anahtarların eksiksiz devralınma tutanağı.',
    fileName: 'Alo_Yonetim_Noter_Devir_Teslim_Tutanagi.docx'
  },
  {
    id: 'doc-iso-sartname',
    title: 'ISO 41001 Uyumlu Entegre Tesis Yönetimi Tip Şartnamesi (RFP)',
    category: 'İhale & Satın Alma',
    format: 'PDF',
    size: '420 KB',
    lawReference: 'ISO 41001:2018 & TSE HYB 12850',
    description: 'Site ve plazaların profesyonel yönetim firmalarından teklif toplarken kullanacağı resmi hizmet şartnamesi.',
    fileName: 'Alo_Yonetim_ISO41001_Tesis_Yonetim_Sartnamesi.pdf'
  },
  {
    id: 'doc-5188-guvenlik',
    title: '5188 Sayılı Kanun Kapsamında Özel Güvenlik Görev Talimatnamesi',
    category: 'Güvenlik & Denetim',
    format: 'PDF',
    size: '310 KB',
    lawReference: '5188 Sayılı Özel Güvenlik Kanunu',
    description: 'Nizamiye, devriye, ziyaretçi kayıt, PTS plaka okuma ve acil durum tahliye güvenlik personeli resmi talimatnamesi.',
    fileName: 'Alo_Yonetim_5188_Guvenlik_Gorev_Talimati.pdf'
  },
  {
    id: 'doc-teknik-bakim',
    title: 'Asansör, Jeneratör & Yangın Hidroforu Yıllık Bakım Çizelgesi',
    category: 'Teknik İşletme & İSG',
    format: 'Excel',
    size: '180 KB',
    lawReference: 'Asansör İşletme Yönetmeliği & İSG',
    description: 'A tipi muayene yeşil etiket takibi, yangın tüpü basınç logları ve 365 günlük önleyici mühendislik periyot tablosu.',
    fileName: 'Alo_Yonetim_Yillik_Teknik_Bakim_Cizelgesi.xlsx'
  }
];

export default function FacilityDownloadableVaultSeo() {
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  const handleDownload = (doc: VaultDocument) => {
    setDownloadedDoc(doc.title);
    setTimeout(() => {
      // Simüle edilen güvenli indirme akışı
      const blob = new Blob(
        [
          `ALO YÖNETİM & DANIŞMANLIK A.Ş.\nResmi Tesis Yönetimi Dokümanı: ${doc.title}\nYasal Dayanak: ${doc.lawReference}\nStandart: ISO 41001 / TSE HYB 12850\nWeb: https://aloyonetim.com.tr\nÇağrı Merkezi: 0216 550 48 48`
        ],
        { type: 'text/plain;charset=utf-8' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 400);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Alo Yönetim Kat Mülkiyeti & Tesis Yönetimi İndirilebilir Resmi Doküman Kasası',
    description: 'Yöneticiler ve kat malikleri için KMK m.37 işletme projesi, devir teslim tutanağı ve ISO 41001 tip sözleşme şablonları.',
    itemListElement: VAULT_DOCS.map((doc, index) => ({
      '@type': 'DigitalDocument',
      position: index + 1,
      name: doc.title,
      encodingFormat: doc.format === 'Excel' ? 'application/vnd.ms-excel' : doc.format === 'Word' ? 'application/msword' : 'application/pdf',
      description: doc.description,
      hasPart: {
        '@type': 'WebPage',
        name: 'Alo Yönetim Tesis Yönetimi Doküman Portalı'
      }
    }))
  };

  return (
    <div className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[3rem] p-6 sm:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">folder_open</span>
          <span>Resmi Tesis Doküman & Şablon Kasası</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
          İndirilebilir <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">Yönetim & KMK Şablonları</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light mt-2">
          Kat Mülkiyeti Kanunu ve ISO 41001 standartlarına tam uyumlu, noter tasdikine hazır resmi belge şablonlarını ücretsiz indirin.
        </p>
      </div>

      {/* Notification */}
      {downloadedDoc && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-lg" aria-hidden="true">download_done</span>
          <span><strong>{downloadedDoc}</strong> başarıyla indirildi.</span>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VAULT_DOCS.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-3xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col justify-between gap-5 hover:border-blue-500/40 transition-all hover:shadow-md group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-900/5 dark:bg-white/10 text-[var(--color-primary)] border border-[var(--color-outline)]/50">
                  {doc.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[13px]" aria-hidden="true">description</span>
                  {doc.format} · {doc.size}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[var(--color-primary)] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {doc.title}
              </h4>

              <p className="text-xs text-[var(--color-secondary)] leading-relaxed line-clamp-3">
                {doc.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-[var(--color-outline)]/40">
              <span className="text-[10px] font-medium text-slate-500 block">
                Dayanak: {doc.lawReference}
              </span>

              <button
                type="button"
                onClick={() => handleDownload(doc)}
                className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-xs font-bold text-[var(--color-primary)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">download</span>
                <span>Şablonu İndir ({doc.format})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/40 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400" aria-hidden="true">verified_user</span>
          Tüm şablonlar hukuk müşavirliğimiz tarafından 2026 güncel mevzuatına göre revize edilmiştir.
        </span>
        <span className="font-mono text-[11px]">Telif & Lisans: Alo Yönetim A.Ş. Açık Kaynak Şablon Kütüphanesi</span>
      </div>
    </div>
  );
}
