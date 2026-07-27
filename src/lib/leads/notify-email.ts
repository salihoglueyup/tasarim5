import type { Lead, ChannelResult } from './types';
import { LEAD_TYPE_LABEL, leadRows } from './format';

/**
 * E-posta bildirimi — Resend HTTP API (SDK yok, sadece fetch).
 * Env-gated: RESEND_API_KEY + LEAD_TO_EMAIL tanımlı değilse sessizce atlanır
 * (analytics Faz 10 deseni). LEAD_FROM_EMAIL opsiyonel (varsayılan onboarding adresi).
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(lead: Lead): string {
  const rows = leadRows(lead)
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#0f2540;white-space:nowrap;vertical-align:top">${escapeHtml(
          r.label
        )}</td><td style="padding:6px 12px;color:#333">${escapeHtml(r.value).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('');

  return `<div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto">
    <h2 style="color:#0f2540;border-bottom:2px solid #1d4ed8;padding-bottom:8px">Yeni ${escapeHtml(
      LEAD_TYPE_LABEL[lead.type]
    )}</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
    <p style="color:#94a3b8;font-size:12px;margin-top:20px">Alo Yönetim — web sitesi form bildirimi</p>
  </div>`;
}

export async function notifyEmail(lead: Lead): Promise<ChannelResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || 'Alo Yönetim <onboarding@resend.dev>';

  if (!apiKey || !to) {
    return { channel: 'email', status: 'skipped', detail: 'env yok' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()),
        reply_to: lead.email || undefined,
        subject: `[Alo Yönetim] ${LEAD_TYPE_LABEL[lead.type]}${lead.name ? ` — ${lead.name}` : ''}`,
        html: buildHtml(lead),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { channel: 'email', status: 'error', detail: `HTTP ${res.status} ${text.slice(0, 120)}` };
    }
    return { channel: 'email', status: 'ok' };
  } catch (err) {
    return { channel: 'email', status: 'error', detail: (err as Error).message };
  }
}
