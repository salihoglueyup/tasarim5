import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400; // Günde bir yenile (ISR)

export async function GET() {
  const securityTxt = `# RFC 9116 Security Disclosure Statement
# Alo Yönetim ve Organizasyon A.Ş. — Bilgi Güvenliği & Siber Otorite Beyanı

Contact: mailto:guvenlik@aloyonetim.com.tr
Contact: tel:+902165504848
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: tr, en
Canonical: ${BASE_URL}/.well-known/security.txt
Policy: ${BASE_URL}/kurumsal/kalite-politikamiz
Acknowledgments: ${BASE_URL}/kurumsal/kalite-belgelerimiz
Hiring: ${BASE_URL}/istihdam-koprusu

# Güvenlik ve Uyumluluk Sertifikalarımız:
# ISO/IEC 27001:2022 Bilgi Güvenliği Yönetim Sistemi
# ISO 41001:2018 Uluslararası Entegre Tesis Yönetim Sistemi
# 6698 Sayılı KVKK Kişisel Verilerin Korunması Tam Uyum Beyanı
`;

  return new Response(securityTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-RFC-Standard': 'RFC-9116-Security-TXT',
    },
  });
}
