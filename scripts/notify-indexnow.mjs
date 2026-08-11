import 'dotenv/config';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aloyonetim.com.tr';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!INDEXNOW_KEY) {
  console.log('⚠️ INDEXNOW_KEY .env dosyasında bulunamadı. Bildirim atlanıyor.');
  process.exit(0);
}

const urls = [
  `${BASE_URL}/`,
  `${BASE_URL}/hizmetler`,
  `${BASE_URL}/hakkimizda`,
  `${BASE_URL}/iletisim`,
  `${BASE_URL}/teklif-al`,
  `${BASE_URL}/sss`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/sozluk`,
  `${BASE_URL}/sektorel-cozumler`,
  `${BASE_URL}/referanslar`,
];

console.log(`🚀 ${urls.length} URL Bing & Yandex IndexNow API'sine gönderiliyor...`);

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'aloyonetim.com.tr',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (res.ok || res.status === 202) {
    console.log('✅ IndexNow bildirimi başarıyla iletildi (200/202 OK).');
  } else {
    console.log(`❌ IndexNow hatası (Status: ${res.status}):`, await res.text());
  }
} catch (err) {
  console.error('❌ İletişim hatası:', err);
}
