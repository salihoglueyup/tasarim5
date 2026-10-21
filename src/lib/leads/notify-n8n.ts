import type { Lead, ChannelResult } from './types';
import { env } from '@/lib/env';

/**
 * N8N Webhook Bildirimi
 * Yeni bir lead (talep) geldiğinde N8N webhook URL'ine HTTP POST atar.
 */
export async function notifyN8n(lead: Lead): Promise<ChannelResult> {
  const payload = JSON.stringify({
    event: 'new_lead',
    timestamp: new Date().toISOString(),
    data: lead,
  });

  // Alo Grup Merkez ERP (Inbound Webhook Köprüsü) iletimi
  const erpTargets = [
    process.env.ALOGRUP_WEBHOOK_URL,
    'http://host.docker.internal:3000/api/webhooks/inbound',
    'http://localhost:3000/api/webhooks/inbound',
  ].filter((u): u is string => Boolean(u));

  let erpDelivered = false;
  for (const erpUrl of erpTargets) {
    try {
      const erpRes = await fetch(erpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': 'aloyonetim_internal_bridge',
        },
        body: payload,
        signal: AbortSignal.timeout(4000),
      });
      if (erpRes.ok) {
        erpDelivered = true;
        break;
      }
    } catch {
      // Sonraki hedefi dene
    }
  }

  const webhookUrl = env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return { channel: 'n8n', status: erpDelivered ? 'ok' : 'skipped' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      // N8N'e yollanan istek, Next.js'in ana thread'ini çok fazla bloklamasın diye timeout verilebilir (opsiyonel)
      signal: AbortSignal.timeout(5000), 
    });

    if (!res.ok) {
      const text = await res.text();
      return { channel: 'n8n', status: erpDelivered ? 'ok' : 'error', detail: `HTTP ${res.status}: ${text}` };
    }

    return { channel: 'n8n', status: 'ok' };
  } catch (err) {
    console.error('N8N webhook error:', err);
    return { channel: 'n8n', status: erpDelivered ? 'ok' : 'error', detail: (err as Error).message };
  }
}
