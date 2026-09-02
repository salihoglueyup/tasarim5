import type { NextRequest } from 'next/server';
import { validateLead } from '@/lib/leads/validate';
import { dispatchLead } from '@/lib/leads/dispatch';
import { checkBotSubmission } from '@/lib/security/botProtection';
import { applyApiRateLimit } from '@/lib/security/rateLimiter';

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

  // Faz 177: Bot Koruması (Honeypot + Zaman Damgası) — Bot ise sessizce başarı taklidi yap
  const botCheck = checkBotSubmission(body);
  if (botCheck.isBot) {
    return Response.json({ ok: true, channels: [] });
  }

  // Faz 176: Kayan Pencereli Rate Limiting (Dakikada maks 10 lead gönderimi)
  const rateLimitRes = await applyApiRateLimit(clientIp(req), 'lead_submission', 10, 60);
  if (!rateLimitRes.success) {
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
