import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 saat önbellek

/**
 * OpenGIS KML (Keyhole Markup Language) Regional Map API (/api/geo/istanbul.kml)
 * 
 * Google Earth, Google Haritalar Botları ve GIS arama motorları için
 * Alo Yönetim'in İstanbul genelindeki 48 ilçe tesis ve güvenlik masası konumlarını
 * KML formatında sunar.
 */
export async function GET() {
  const placemarks = DISTRICTS.map((d) => `    <Placemark id="district-${d.slug}">
      <name>Alo Yönetim ${escapeXml(d.name)} Tesis &amp; Özel Güvenlik Masası</name>
      <description><![CDATA[
        <h3>Alo Yönetim - ${d.name} Şubesi</h3>
        <p>${d.intro}</p>
        <p><strong>Yaka:</strong> ${d.side} Yakası</p>
        <p><strong>Yönetilen Proje:</strong> ${d.managedProjects}+ Tesis / Site</p>
        <p><strong>Öne Çıkan Mahalleler:</strong> ${d.neighborhoods.join(', ')}</p>
        <p><strong>Telefon:</strong> 0216 550 48 48</p>
        <p><a href="${BASE_URL}/bolgeler/${d.slug}">İlçe Detay Sayfası</a> | <a href="${BASE_URL}/bolgeler/${d.slug}/guvenlik-yonetimi">5188 Güvenlik Hizmetleri</a></p>
      ]]></description>
      <Point>
        <coordinates>${d.geo.lng},${d.geo.lat},0</coordinates>
      </Point>
    </Placemark>`).join('\n');

  const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Alo Yönetim İstanbul Tesis &amp; Özel Güvenlik Hizmet Haritası</name>
    <description>İstanbul'un 39 ilçesinde profesyonel apartman, site, rezidans yönetimi ve 5188 sayılı kanun lisanslı özel güvenlik operasyon noktaları.</description>
${placemarks}
  </Document>
</kml>`;

  return new NextResponse(kmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.google-earth.kml+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Content-Disposition': 'inline; filename="istanbul-aloyonetim.kml"',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
