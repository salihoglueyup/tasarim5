// cPanel / Phusion Passenger başlangıç dosyası (custom server).
// cPanel "Setup Node.js App" ekranında Application startup file = server.js olarak ayarlanır.
// Passenger, dinlenecek portu process.env.PORT ile sağlar.
//
// Not: Bu dosya Next.js derleyicisinden GEÇMEZ; proje CommonJS olduğundan (package.json'da
// "type":"module" yok) require kullanılır. `output: 'standalone'` ile birlikte KULLANILMAZ.
// Kullanmadan önce: `npm ci` + `npm run build` çalıştırılmış olmalı.

const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Alo Yönetim hazır — http://localhost:${port} (${dev ? 'development' : 'production'})`);
  });
});
