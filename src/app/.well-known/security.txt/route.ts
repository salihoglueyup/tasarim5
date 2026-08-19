import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { ORG_EMAIL } from '@/lib/schemas';

export const dynamic = 'force-static';
export const revalidate = 2592000; // 30 Gün

/**
 * RFC 9116 - A File Format to Aid in Security Vulnerability Disclosure (security.txt)
 * 
 * Google TrustRank, Bing Webmaster, güvenlik botları ve kurumsal denetçiler için
 * Alo Yönetim'in resmi güvenlik ve iletişim politikasını sunar.
 */
export async function GET() {
  const securityTxt = `Contact: mailto:${ORG_EMAIL}
Contact: https://aloyonetim.com.tr/iletisim
Expires: 2027-12-31T23:59:59.000Z
Canonical: ${BASE_URL}/.well-known/security.txt
Policy: ${BASE_URL}/gizlilik-politikasi
Preferred-Languages: tr, en
Hiring: ${BASE_URL}/istihdam-koprusu
Acknowledgments: ${BASE_URL}/kurumsal/kalite-belgelerimiz
`;

  return new NextResponse(securityTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}
