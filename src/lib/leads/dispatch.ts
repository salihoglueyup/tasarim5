import type { Lead, DispatchResult, ChannelResult } from './types';
import { notifyEmail } from './notify-email';
import { notifyTelegram } from './notify-telegram';
import { storeLead } from './store-db';
import { notifyN8n } from './notify-n8n';

/**
 * Lead fan-out orkestrasyonu (Track 1).
 * Üç kanala paralel gönderir; biri patlarsa diğerleri lead'i yine iletir
 * (Promise.allSettled). En az bir kanal 'ok' ise sonuç ok=true.
 * Hiçbir kanal yapılandırılmamışsa (hepsi 'skipped') ok=true döner —
 * kullanıcıya başarı gösterilir, eksik yapılandırma sunucu log'una düşer.
 */
export async function dispatchLead(lead: Lead): Promise<DispatchResult> {
  const settled = await Promise.allSettled([
    notifyEmail(lead),
    notifyTelegram(lead),
    storeLead(lead),
    notifyN8n(lead),
  ]);

  const channels: ChannelResult[] = settled.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    const channel = (['email', 'telegram', 'database', 'n8n'] as const)[i];
    return { channel, status: 'error', detail: (r.reason as Error)?.message ?? 'unknown' };
  });

  const anyError = channels.some((c) => c.status === 'error');
  const anyOk = channels.some((c) => c.status === 'ok');
  const allSkipped = channels.every((c) => c.status === 'skipped');

  if (anyError && !anyOk) {
    console.error('[lead] tüm aktif kanallar başarısız', { type: lead.type, channels });
  } else if (allSkipped) {
    console.warn('[lead] hiçbir kanal yapılandırılmadı (env eksik)', { type: lead.type });
  }

  // Aktif kanal yoksa (hepsi skipped) veya en az biri ok ise başarı say.
  return { ok: anyOk || allSkipped, channels };
}
