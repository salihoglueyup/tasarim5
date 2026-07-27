import type { Lead, ChannelResult } from './types';

/**
 * Veritabanı kaydı — Supabase REST (PostgREST) insert, ağır SDK yok.
 * Env-gated: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY tanımlı değilse atlanır.
 * `leads` tablosu şeması için bkz. LEADS_SETUP.md.
 */

export async function storeLead(lead: Lead): Promise<ChannelResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return { channel: 'database', status: 'skipped', detail: 'env yok' };
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        type: lead.type,
        name: lead.name ?? null,
        phone: lead.phone ?? null,
        email: lead.email ?? null,
        message: lead.message ?? null,
        meta: lead.meta ?? null,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { channel: 'database', status: 'error', detail: `HTTP ${res.status} ${text.slice(0, 120)}` };
    }
    return { channel: 'database', status: 'ok' };
  } catch (err) {
    return { channel: 'database', status: 'error', detail: (err as Error).message };
  }
}
