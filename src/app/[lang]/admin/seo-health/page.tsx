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

  // Canlı Teşhis Stüdyosu State'leri
  const [auditTitle, setAuditTitle] = useState('Profesyonel Tesis Yönetimi İstanbul | 7/24 Alo Yönetim');
  const [auditDesc, setAuditDesc] = useState('İstanbul genelinde profesyonel tesis yönetimi, 5188 güvenlik ve şeffaf KMK aidat takibi. Ücretsiz keşif için hemen arayın.');
  const [auditKeyword, setAuditKeyword] = useState('tesis yönetimi');
  const [auditContent, setAuditContent] = useState(`# İstanbul Profesyonel Tesis Yönetimi ve İşletmeciliği
Alo Yönetim, 634 Sayılı Kat Mülkiyeti Kanunu (KMK) kapsamında entegre tesis yönetimi ve site yönetimi hizmetleri sunar.
Operasyonlarımızda %30 oranına varan enerji ve aidat tasarrufu sağlanmaktadır.
5188 Sayılı Kanun lisanslı özel güvenlik ekiplerimiz 7/24 kesintisiz hizmet vermektedir.
TSE 13811 hijyen standartlarında merdiven ve ortak alan temizliği gerçekleştirilir.

## Tesis Yönetimi Nedir?
Tesis yönetimi binaların teknik, güvenlik, temizlik ve idari süreçlerinin uzman kadrolarca koordine edilmesidir.

## İşletme Projesi Zorunlu mu?
KMK 37. maddesi gereğince her yıl kat malikleri kurulu öncesinde işletme projesinin hazırlanması yasal zorunluluktur.`);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [auditing, setAuditing] = useState(false);

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

  const handleRunLiveAudit = async () => {
    setAuditing(true);
    try {
      const res = await fetch('/api/seo/audit-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: auditTitle,
          description: auditDesc,
          content: auditContent,
          targetKeyword: auditKeyword,
          currentPath: '/hizmetler/tesis-yonetimi',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setAuditResult(json.audit);
      }
    } catch (e) {
      console.error('Live audit error:', e);
    } finally {
      setAuditing(false);
    }
  };

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
          count: json.submittedCount,
        });
      } else {
        setSyncResult({
          success: false,
          message: json.error || 'Gönderim başarısız oldu.',
        });
      }
    } catch (error: any) {
      setSyncResult({
        success: false,
        message: error.message || 'Bağlantı hatası oluştu.',
      });
    } finally {
      setSyncingIndexNow(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-brand-500 animate-spin" aria-hidden="true">
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
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              {syncResult.success ? 'check_circle' : 'error'}
            </span>
            <span className="font-semibold">{syncResult.message}</span>
            {syncResult.count && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                {syncResult.count} URL
              </span>
            )}
          </div>
          <button
            onClick={() => setSyncResult(null)}
            className="text-xs hover:underline cursor-pointer opacity-70 hover:opacity-100"
          >
            Kapat
          </button>
        </div>
      )}

      {/* 4 Ana Metrik Kartı */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">SEO Sağlık Skoru</span>
            <span className="material-symbols-outlined text-emerald-500" aria-hidden="true">verified</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">%{data.score}</span>
            <span className="text-xs text-emerald-500 font-bold">Mükemmel</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">İndekslenebilir Sayfa</span>
            <span className="material-symbols-outlined text-brand-500" aria-hidden="true">layers</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{data.totalPages}</span>
            <span className="text-xs text-slate-400">Tekil URL</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">İlçe × Hizmet Matrisi</span>
            <span className="material-symbols-outlined text-purple-500" aria-hidden="true">location_on</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{data.districtServiceCombinations}</span>
            <span className="text-xs text-purple-500 font-bold">{data.districtsCount} İlçe / {data.servicesCount} Hizmet</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">301 Yönlendirme Kalkanı</span>
            <span className="material-symbols-outlined text-amber-500" aria-hidden="true">shield</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{data.redirects301.length}</span>
            <span className="text-xs text-amber-500 font-bold">Aktif Kural</span>
          </div>
        </div>
      </div>

      {/* CANLI İÇERİK SEO TEŞHİS STÜDYOSU */}
      <div className="bg-gradient-to-br from-brand-900/5 via-purple-900/5 to-transparent border border-brand-500/20 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" aria-hidden="true">auto_awesome</span>
                <span>Canlı Motor</span>
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                İçerik & Sayfa SEO Teşhis Stüdyosu
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Herhangi bir başlık, açıklama ve metin için anlık Topikal Skor, Ateşman Okunabilirlik ve Arama Niyeti analizi.
            </p>
          </div>

          <button
            onClick={handleRunLiveAudit}
            disabled={auditing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md cursor-pointer shrink-0"
          >
            <span className={`material-symbols-outlined text-sm ${auditing ? 'animate-spin' : ''}`}>
              {auditing ? 'sync' : 'play_arrow'}
            </span>
            <span>{auditing ? 'Denetleniyor...' : 'Anlık SEO Denetimi Yap'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hedef Anahtar Kelime
              </label>
              <input
                type="text"
                value={auditKeyword}
                onChange={(e) => setAuditKeyword(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                placeholder="Örn: tesis yönetimi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Sayfa Başlığı (Title)
              </label>
              <input
                type="text"
                value={auditTitle}
                onChange={(e) => setAuditTitle(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Meta Açıklama (Description)
              </label>
              <textarea
                rows={2}
                value={auditDesc}
                onChange={(e) => setAuditDesc(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                İçerik Metni (Markdown / HTML)
              </label>
              <textarea
                rows={5}
                value={auditContent}
                onChange={(e) => setAuditContent(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800 font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Canlı Sonuç Paneli */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            {auditResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div>
                    <span className="text-xs text-slate-400">Genel SEO Skoru</span>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      %{auditResult.overallScore}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Arama Niyeti</span>
                    <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase">
                      {auditResult.intent?.intent}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
                    <span className="text-slate-400 block mb-1">Okunabilirlik</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {auditResult.readability?.level} (%{auditResult.readability?.score})
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
                    <span className="text-slate-400 block mb-1">Snippet Sağlığı</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      %{auditResult.snippet?.score}
                    </span>
                  </div>
                </div>

                {auditResult.intent?.recommendedCta && (
                  <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-xs text-brand-700 dark:text-brand-300">
                    <span className="font-bold">Önerilen CTA: </span>
                    <span>{auditResult.intent.recommendedCta}</span>
                  </div>
                )}

                {auditResult.extractedFaqs && auditResult.extractedFaqs.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-slate-500 block mb-1">
                      Otomatik Çıkarılan Soru-Cevap ({auditResult.extractedFaqs.length})
                    </span>
                    <div className="space-y-1">
                      {auditResult.extractedFaqs.slice(0, 2).map((faq: any, i: number) => (
                        <div key={i} className="text-[11px] bg-slate-50 dark:bg-white/5 p-2 rounded-lg text-slate-600 dark:text-slate-300">
                          <strong>{faq.question}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center text-slate-400 text-xs">
                <span className="material-symbols-outlined text-3xl mb-2 text-slate-300" aria-hidden="true">insights</span>
                <span>Sol taraftaki bilgileri düzenleyip &ldquo;Anlık SEO Denetimi Yap&rdquo; butonuna basın.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Site Haritaları Tablosu */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-500" aria-hidden="true">account_tree</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Aktif Site Haritaları & Protokol Uç Noktaları
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{data.sitemaps.length} Protokol Yayında</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Protokol Adı</th>
                <th className="pb-3 font-semibold">Erişim Yolu</th>
                <th className="pb-3 font-semibold">Tip</th>
                <th className="pb-3 font-semibold">Durum</th>
                <th className="pb-3 font-semibold text-right">İncele</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {data.sitemaps.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{item.name}</td>
                  <td className="py-3.5 font-mono text-slate-500 dark:text-slate-400">{item.path}</td>
                  <td className="py-3.5 text-slate-600 dark:text-slate-300 font-medium">{item.type}</td>
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
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
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
            <span className="material-symbols-outlined text-amber-500" aria-hidden="true">security</span>
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
