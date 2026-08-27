import 'dotenv/config';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aloyonetim.com.tr';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'b42e617d3a2e4e10b171a7d6abdf93e5';

console.log(`\n🔍 [Alo Yönetim] ${BASE_URL}/sitemap.xml üzerinden güncel site haritası taranıyor...`);

let urlList = [];

try {
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  if (sitemapRes.ok) {
    const xml = await sitemapRes.text();
    const matches = xml.match(/<loc>(.*?)<\/loc>/g);
    if (matches && matches.length > 0) {
      urlList = matches.map((m) => m.replace(/<\/?loc>/g, '').trim());
      console.log(`✅ Site haritasından ${urlList.length} adet benzersiz URL başarıyla alındı.`);
    }
  }
} catch (err) {
  console.warn(`⚠️ Sitemap XML doğrudan okunamadı, dahili rota listesine geçiliyor:`, err.message);
}

// Fallback: Eğer sitemap henüz render edilmediyse veya localde çalışıyorsa
if (urlList.length === 0) {
  const basePaths = [
    '',
    '/hizmetler',
    '/hizmetler/tesis-yonetimi',
    '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
    '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    '/hizmetler/tesis-yonetimi/rehber',
    '/hizmetler/aidat-takibi',
    '/hizmetler/guvenlik-yonetimi',
    '/hizmetler/temizlik-ve-hijyen',
    '/hizmetler/teknik-bakim',
    '/hizmetler/peyzaj-ve-bahce-bakimi',
    '/hizmetler/havuz-bakimi-ve-hijyen',
    '/hizmetler/hukuk-ve-icra-danismanligi',
    '/hizmetler/hasere-ve-dezenfeksiyon',
    '/sektorel-cozumler',
    '/referanslar',
    '/blog',
    '/sozluk',
    '/sss',
    '/hakkimizda',
    '/iletisim',
    '/teklif-al',
    '/hesaplayici',
    '/guvenlik-akademisi',
    '/istihdam-koprusu',
  ];

  const locales = ['', '/en', '/ru', '/ar'];
  for (const locale of locales) {
    for (const p of basePaths) {
      const clean = p ? `${locale}${p}` : (locale ? locale : '/');
      urlList.push(`${BASE_URL}${clean}`);
    }
  }
}

// URL listesini temizle ve tekilleştir
urlList = Array.from(new Set(urlList));

console.log(`🚀 [Alo Yönetim] Toplam ${urlList.length} URL IndexNow API'sine (Bing, Yandex, Seznam, Naver) gönderiliyor...`);

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'aloyonetim.com.tr',
      key: INDEXNOW_KEY,
      keyLocation: `https://aloyonetim.com.tr/${INDEXNOW_KEY}.txt`,
      urlList: urlList,
    }),
  });

  if (res.ok || res.status === 200 || res.status === 202) {
    console.log(`🎉 BAŞARILI! ${urlList.length} URL anında arama motorlarına iletildi (Yanıt Kodu: ${res.status}).\n`);
  } else {
    console.log(`⚠️ IndexNow Yanıt Kodu (${res.status}):`, await res.text());
  }
} catch (err) {
  console.error('❌ İletişim Hatası:', err.message);
}
