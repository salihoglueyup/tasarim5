import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Faz 179: HTTP ETag Üretimi & 304 Not Modified Şartlı Önbellek Yönetimi
 */
export function generateETag(payload: unknown): string {
  const content = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const hash = crypto.createHash('sha1').update(content).digest('base64url');
  return `"${hash.slice(0, 27)}"`;
}

export function createETagResponse(
  req: NextRequest | Request,
  data: unknown,
  init: {
    status?: number;
    headers?: Record<string, string>;
    cacheControl?: string;
  } = {}
): NextResponse | Response {
  const {
    status = 200,
    headers = {},
    cacheControl = 'public, s-maxage=3600, stale-while-revalidate=86400',
  } = init;

  const etag = generateETag(data);
  const ifNoneMatch = req.headers.get('if-none-match');

  const baseHeaders: Record<string, string> = {
    ...headers,
    ETag: etag,
    'Cache-Control': cacheControl,
  };

  // İstemcideki ETag ile eşleşiyorsa HTTP 304 Not Modified dön (sıfır bant genişliği tüketimi)
  if (ifNoneMatch && (ifNoneMatch === etag || ifNoneMatch === `W/${etag}` || ifNoneMatch.includes(etag))) {
    return new NextResponse(null, {
      status: 304,
      headers: baseHeaders,
    });
  }

  return NextResponse.json(data, {
    status,
    headers: baseHeaders,
  });
}
