import http from 'http';

console.log('--- Canlı / Yerel Uç Nokta Yanıt Süreleri Ölçümü (Faz 249) ---');

const BASE_URL = process.env.TARGET_URL || 'http://localhost:3001';
const PATHS = ['/', '/api/health', '/api/calculator', '/hizmetler/tesis-yonetimi'];

async function checkPath(path) {
  const url = `${BASE_URL}${path}`;
  const start = performance.now();

  return new Promise((resolve) => {
    http.get(url, (res) => {
      const duration = Math.round(performance.now() - start);
      console.log(`[${res.statusCode}] ${path} - ${duration}ms`);
      resolve({ path, status: res.statusCode, duration });
    }).on('error', (err) => {
      const duration = Math.round(performance.now() - start);
      console.log(`[ERR] ${path} - ${duration}ms (${err.message})`);
      resolve({ path, status: 0, duration, error: err.message });
    });
  });
}

async function run() {
  console.log(`Hedef sunucu: ${BASE_URL}`);
  for (const p of PATHS) {
    await checkPath(p);
  }
}

run();
