import { NextResponse } from 'next/server';
import { buildX402PaymentPayload } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';

/**
 * x402 Payment Protocol Gateway (/api/v1)
 * Otonom yapay zeka ajanlarının HTTP 402 Payment Required el sıkışmasını (x402 v1/v2)
 * doğrulaması için ayrılmış B2B ajan ağ geçidi.
 */
export async function GET() {
  const payload = buildX402PaymentPayload();
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 402,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'Payment-Required, X-Payment-Required, WWW-Authenticate',
      'Payment-Required': encoded,
      'X-Payment-Required': encoded,
      'WWW-Authenticate': 'x402 scheme="exact", network="base"',
    },
  });
}
