import type { Lead, ChannelResult } from './types';
import { env } from '@/lib/env';

/**
 * N8N Webhook Bildirimi
 * Yeni bir lead (talep) geldiğinde N8N webhook URL'ine HTTP POST atar.
 */
export async function notifyN8n(lead: Lead): Promise<ChannelResult> {
  const webhookUrl = env.N8N_WEBHOOK_URL;
  if (!webhookUrl) return { channel: 'n8n', status: 'skipped' };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'new_lead',
        timestamp: new Date().toISOString(),
        data: lead,
      }),
      // N8N'e yollanan istek, Next.js'in ana thread'ini çok fazla bloklamasın diye timeout verilebilir (opsiyonel)
      signal: AbortSignal.timeout(5000), 
    });

    if (!res.ok) {
      const text = await res.text();
      return { channel: 'n8n', status: 'error', detail: `HTTP ${res.status}: ${text}` };
    }

    return { channel: 'n8n', status: 'ok' };
  } catch (err) {
    console.error('N8N webhook error:', err);
    return { channel: 'n8n', status: 'error', detail: (err as Error).message };
  }
}
