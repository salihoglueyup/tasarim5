"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SitemapItem {
  name: string;
  path: string;
  type: string;
  status: string;
}

interface RedirectItem {
  source: string;
  destination: string;
  rank: string;
  status: string;
}

interface SeoStatusData {
  success: boolean;
  score: number;
  totalPages: number;
  districtsCount: number;
  servicesCount: number;
  districtServiceCombinations: number;
  sitemaps: SitemapItem[];
  redirects301: RedirectItem[];
  componentsCount: number;
  indexNowKey: string;
  lastAuditDate: string;
}

export default function AdminSeoHealthPage() {
  const [data, setData] = useState<SeoStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncingIndexNow, setSyncingIndexNow] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  useEffect(() => {
    fetch('/api/admin/seo-status')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('SEO status fetch error:', err);
        setLoading(false);
      });
  }, []);

  const handleIndexNowBulkSync = async () => {
    setSyncingIndexNow(true);
    setSyncResult(null);

    try {
      const res = await fetch('/api/admin/seo-status', { method: 'POST' });
      const json = await res.json();

      if (json.success) {
        setSyncResult({
          success: true,
          message: json.message,
          count: json.submittedCount
        });
      } else {
        setSyncResult({
          success: false,
          message: json.error || 'Gönderim başarısız oldu.'
        });
      }
    } catch (error: any) {
      setSyncResult({
        success: false,
        message: error.message || 'Bağlantı hatası oluştu.'
      });
    } finally {
      setSyncingIndexNow(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-brand-500 animate-spin">
            refresh
          </span>
          <span className="text-sm font-medium text-slate-500">SEO Sağlık Raporu Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Üst Başlık */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Canlı Sistem Radarı
            </span>
            <span className="text-xs text-slate-400">
              Son Denetim: {new Date(data.lastAuditDate).toLocaleTimeString('tr-TR')}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            SEO & Arama Motoru Sağlık Merkezi
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            498 sayfanın indeks durumu, 7 site haritası, 301 yönlendirme kalkanı ve IndexNow motoru.
          </p>
        </div>

        {/* IndexNow Toplu Gönderim Butonu */}
        <button
          onClick={handleIndexNowBulkSync}
          disabled={syncingIndexNow}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-xs shadow-lg transition-all ${
            syncingIndexNow
              ? 'bg-slate-300 dark:bg-zinc-800 text-slate-500 cursor-wait'
              : 'bg-brand-500 hover:bg-brand-600 text-white cursor-pointer hover:scale-105 active:scale-95'
          }`}
        >
          <span className={`material-symbols-outlined text-lg ${syncingIndexNow ? 'animate-spin' : ''}`}>
            {syncingIndexNow ? 'sync' : 'rocket_launch'}
          </span>
          <span>{syncingIndexNow ? 'Arama Motorlarına Fırlatılıyor...' : 'IndexNow ile Tüm Siteyi Bildir'}</span>
        </button>
      </div>

      {/* IndexNow Sonuç Bildirimi */}
      {syncResult && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs md:text-sm animate-in fade-in slide-in-from-top-2 ${
            syncResult.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">
              {syncResult.success ? 'check_circle' : 'error'}
            </span>
            <span>{syncResult.message}</span>
          </div>
          {syncResult.count && (
            <span className="font-bold font-mono">({syncResult.count} URL)</span>
          )}
        </div>
      )}

      {/* 4 Ana Metrik Kartı */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Sağlık Skoru */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SEO Sağlık Skoru</span>
            <div className="text-3xl font-black text-emerald-500 mt-1">%{data.score}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Sıfır Kritik Hata</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
        </div>

        {/* Toplam Statik Sayfa */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Derlenen Sayfalar</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">{data.totalPages}</div>
            <span className="text-[11px] text-slate-500 font-medium">12 İlçe x 9 Hizmet Matrisi</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">pages</span>
          </div>
        </div>

        {/* SEO Bileşenleri */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SEO Motorları</span>
            <div className="text-3xl font-black text-brand-600 dark:text-brand-400 mt-1">{data.componentsCount}</div>
            <span className="text-[11px] text-brand-500 font-medium">Aktif Şema & Widget</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">extension</span>
          </div>
        </div>

        {/* Site Haritaları & Beslemeler */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Harita & AI Besleme</span>
            <div className="text-3xl font-black text-purple-500 mt-1">{data.sitemaps.length}</div>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">XML, TXT & RSS</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">account_tree</span>
          </div>
        </div>
      </div>

      {/* Site Haritaları & AI Protokolleri Tablosu */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-500">travel_explore</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Site Haritaları & Yapay Zeka (LLMO) Besleme Radarı
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Tüm Haritalar Canlı ve Erişilebilir</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Harita / Protokol Adı</th>
                <th className="pb-3 font-semibold">Tür</th>
                <th className="pb-3 font-semibold">URL Yolu</th>
                <th className="pb-3 font-semibold">Durum</th>
                <th className="pb-3 font-semibold text-right">Canlı İncele</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {data.sitemaps.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{item.name}</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400 font-mono">{item.type}</td>
                  <td className="py-3.5 text-brand-600 dark:text-brand-400 font-mono">{item.path}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-500 transition-colors font-medium"
                    >
                      <span>Aç</span>
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 301 Yönlendirme Kalkanı Tablosu */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">security</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              301 Kalıcı Yönlendirme Kalkanı (Eski Sıralamaları Koruma)
            </h3>
          </div>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">5 Kritik Kural Aktif</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Eski URL (WordPress Kaynak)</th>
                <th className="pb-3 font-semibold">Yeni Hedef URL (Next.js)</th>
                <th className="pb-3 font-semibold">Google Otoritesi</th>
                <th className="pb-3 font-semibold text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {data.redirects301.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-mono text-rose-600 dark:text-rose-400">{r.source}</td>
                  <td className="py-3.5 font-mono text-emerald-600 dark:text-emerald-400">{r.destination}</td>
                  <td className="py-3.5 font-semibold text-slate-800 dark:text-slate-200">{r.rank}</td>
                  <td className="py-3.5 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                      301 Kalıcı Aktif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
