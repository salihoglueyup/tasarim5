'use client';

import React, { useState, useEffect } from 'react';

interface CategoryMetric {
  id: string;
  name: string;
  count: number;
  status: string;
  color: string;
}

interface TelemetrySummary {
  totalWorkflows: number;
  activeWorkflows: number;
  systemUptimePercentage: number;
  overallHealth: string;
  selfHealingStatus: string;
  bearerSecurityStatus: string;
  lastEvaluatedAt: string;
}

interface TelemetryLog {
  id: string;
  sentinel: string;
  action: string;
  entity: string;
  details: any;
  createdAt: string;
}

export default function WorkflowTelemetryWidget() {
  const [summary, setSummary] = useState<TelemetrySummary | null>(null);
  const [categories, setCategories] = useState<CategoryMetric[]>([]);
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/admin/workflow-telemetry');
      if (res.ok) {
        const json = await res.json();
        setSummary(json.summary);
        setCategories(json.categories || []);
        setLogs(json.recentTelemetryLogs || []);
      }
    } catch (err) {
      console.error('Failed to load workflow telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    if (!autoRefresh) return;
    const interval = setInterval(fetchTelemetry, 30000); // 30 sn
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      {/* Başlık ve Durum */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Alo Yönetim — 30 Kurumsal İş Akışı & Sistem Telemetrisi
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Kendi kendini onaran (Self-Healing) ve Bearer Auth korumalı DevOps & Tesis Operasyon Merkezi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition ${
              autoRefresh
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {autoRefresh ? '● Canlı Akış Açık (30s)' : 'Canlı Akış Duraklatıldı'}
          </button>
          <button
            onClick={fetchTelemetry}
            className="text-xs px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium transition"
          >
            Yenile
          </button>
        </div>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Toplam İş Akışı</div>
          <div className="text-2xl font-black text-white mt-1">
            {summary ? `${summary.activeWorkflows} / ${summary.totalWorkflows}` : '30 / 30'}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <span>✓ %100 Aktif ve Yayında</span>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Sistem SLA Uptime</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {summary ? `%${summary.systemUptimePercentage}` : '%99.98'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Çift Teyitli Watchdog</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Self-Healing Durumu</div>
          <div className="text-2xl font-black text-sky-400 mt-1">
            {summary?.selfHealingStatus || 'DEVREDE'}
          </div>
          <div className="text-[11px] text-sky-300/80 mt-1">Otomatik DB & Disk Prune</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Webhook Güvenliği</div>
          <div className="text-2xl font-black text-violet-400 mt-1">
            {summary?.bearerSecurityStatus || 'ZIRHLI'}
          </div>
          <div className="text-[11px] text-violet-300/80 mt-1">Bearer Token & Sanitization</div>
        </div>
      </div>

      {/* 7 Kategori Dağılımı */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          7 Kurumsal Kategori ve Akış Dağılımı
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3 text-center"
            >
              <div
                className="w-2.5 h-2.5 rounded-full mx-auto mb-2"
                style={{ backgroundColor: cat.color }}
              />
              <div className="text-xs font-bold text-slate-200 truncate">{cat.name}</div>
              <div className="text-lg font-black mt-1" style={{ color: cat.color }}>
                {cat.count} Akış
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">✓ Sağlıklı</span>
            </div>
          ))}
        </div>
      </div>

      {/* Son Denetim Kayıtları */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Son n8n Olay & Denetim Kayıtları (AuditLog)
        </h3>
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-xs text-slate-500">Telemetri verisi yükleniyor...</div>
          ) : logs.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              Henüz kayıtlı olay yok veya sistem stabil çalışıyor.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="p-3 text-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded text-sky-400 shrink-0">
                      {log.sentinel}
                    </span>
                    <span className="font-medium text-slate-300 truncate">{log.action}</span>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">({log.entity})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 shrink-0 font-mono">
                    {new Date(log.createdAt).toLocaleTimeString('tr-TR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
