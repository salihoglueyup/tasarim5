import type { NextRequest } from 'next/server';
import { validateLead } from '@/lib/leads/validate';
import { dispatchLead } from '@/lib/leads/dispatch';
import { rateLimit, pruneBuckets } from '@/lib/leads/rate-limit';

/**
 * Lead alım uç noktası (Fonksiyonel Katman Track 1).
 * Tüm site formları buraya POST eder. POST route'ları cache'lenmez.
 * Spam koruma: honeypot (`company`) + min-süre (`elapsedMs`) + IP rate-limit.
 */

export const dynamic = 'force-dynamic';

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, errorKey: 'lead_error_invalid' }, { status: 400 });
  }

  // 1) Honeypot — gizli `company` alanı doluysa bot; sessizce başarı taklidi yap.
  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return Response.json({ ok: true, channels: [] });
  }

  // 2) Min-süre — form açılışından <2 sn içinde gönderim bot şüphesi.
  const elapsed = Number(body.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 2000) {
    return Response.json({ ok: true, channels: [] });
  }

  // 3) IP rate-limit.
  pruneBuckets();
  if (!rateLimit(clientIp(req))) {
    return Response.json({ ok: false, errorKey: 'lead_error_rate' }, { status: 429 });
  }

  // 4) Doğrulama + normalizasyon.
  const result = validateLead(body);
  if (!result.valid || !result.lead) {
    return Response.json({ ok: false, errorKey: result.errorKey }, { status: 400 });
  }

  // 5) Kanallara fan-out.
  const dispatch = await dispatchLead(result.lead);
  // Güvenlik: kanal `detail`'i (downstream iç hata metni) client'a sızdırılmaz;
  // yalnız kanal adı + durumu döndürülür (detay sunucu log'unda kalır).
  const safeChannels = dispatch.channels.map((c) => ({ channel: c.channel, status: c.status }));
  return Response.json({ ok: dispatch.ok, channels: safeChannels }, { status: dispatch.ok ? 200 : 502 });
}
