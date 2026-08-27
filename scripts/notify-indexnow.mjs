import 'dotenv/config';
import { POSTS } from '../src/data/posts.js';
import { REFERENCES_DATA } from '../src/data/references.js';
import { DISTRICTS } from '../src/data/districts.js';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aloyonetim.com.tr';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'aloyonetim-indexnow-key-2026';

// 1. Temel Sayfalar (4 Dil)
const basePages = [
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

const urls = new Set();

// Ana ve Dilli Sayfalar
const locales = ['', '/en', '/ru', '/ar'];
for (const locale of locales) {
  for (const page of basePages) {
    const cleanPath = page ? `${locale}${page}` : (locale ? locale : '/');
    urls.add(`${BASE_URL}${cleanPath}`);
  }
}

// 39 İlçe Tesis Yönetimi
for (const d of DISTRICTS) {
  urls.add(`${BASE_URL}/bolgeler/${d.slug}`);
  urls.add(`${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`);
}

// Blog Yazıları (Öncelikli 30 Yazı)
for (const post of POSTS.slice(0, 40)) {
  urls.add(`${BASE_URL}/blog/${post.slug}`);
}

// Referans Projeleri
for (const ref of REFERENCES_DATA) {
  urls.add(`${BASE_URL}/referanslar/${ref.slug}`);
}

const urlList = Array.from(urls);

console.log(`\n🚀 [Alo Yönetim] Toplam ${urlList.length} URL IndexNow API'sine (Bing, Yandex, Seznam, Naver) gönderiliyor...`);

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
    console.log(`✅ Başarılı! ${urlList.length} URL anında arama motorlarına iletildi (Status: ${res.status}).`);
  } else {
    console.log(`⚠️ IndexNow Yanıt Kodu (${res.status}):`, await res.text());
  }
} catch (err) {
  console.error('❌ İletişim Hatası:', err.message);
}
