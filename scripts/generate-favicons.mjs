import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  console.log('🦅 Starting High-Resolution Transparent Favicon & Icon Generation...');

  const inputPath = 'public/images/logos/new-icon.webp';
  const photoroomPath = 'public/images/logos/new-icon-Photoroom.webp';

  // 1. 2048x2048 resimden beyaz arka planı kaldır ve alfa kanalı oluştur
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  // Beyaz / beyaza yakın pikselleri şeffaf yap
  const threshold = 245;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Eğer piksel beyaza çok yakınsa alfa kanalını sıfırla (şeffaf yap)
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0; // Alpha = 0
    } else if (r >= 235 && g >= 235 && b >= 235) {
      // Kenarlarda yumuşak geçiş (anti-aliasing)
      const factor = (255 - Math.max(r, g, b)) / 20;
      data[i + 3] = Math.min(255, Math.floor(factor * 255));
    }
  }

  // Şeffaf HD kartal görseli
  const transparentEagleBuffer = await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .trim() // Etraftaki boşlukları kırp
    .toFormat('png')
    .toBuffer();

  // HD şeffaf logoyu kaydet
  await sharp(transparentEagleBuffer).toFile('public/images/logos/new-icon-transparent-hd.png');
  console.log('✅ Created: public/images/logos/new-icon-transparent-hd.png');

  // 2. Favicon boyutları (Saf Şeffaf Alpha Channel)
  const sizes = [
    { size: 16, path: 'public/favicon-16.png' },
    { size: 32, path: 'public/favicon-32.png' },
    { size: 48, path: 'public/favicon-48.png' },
    { size: 192, path: 'public/favicon/favicon-192.png' },
    { size: 512, path: 'public/favicon/favicon-512.png' },
  ];

  for (const { size, path: outPath } of sizes) {
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await sharp(transparentEagleBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ quality: 100 })
      .toFile(outPath);

    console.log(`✅ Created transparent favicon: ${outPath} (${size}x${size})`);
  }

  // 3. Apple Touch Icon (180x180) - Lüks Squircle Arka Plan
  // iOS için şık yuvarlatılmış antrasit zemin üzerine kartal amblemi
  const appleSize = 180;
  const padding = 20;
  const innerSize = appleSize - padding * 2;

  const innerEagle = await sharp(transparentEagleBuffer)
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // SVG Squircle Arka Plan (Ultra-Lüks Slate Antrasit Gradien)
  const squircleSvg = `
    <svg width="${appleSize}" height="${appleSize}" viewBox="0 0 ${appleSize} ${appleSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="50%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#1e293b" stop-opacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${appleSize}" height="${appleSize}" rx="40" fill="url(#bgGrad)" />
      <rect x="1" y="1" width="${appleSize - 2}" height="${appleSize - 2}" rx="39" fill="none" stroke="url(#borderGrad)" stroke-width="2" />
    </svg>
  `;

  await sharp(Buffer.from(squircleSvg))
    .composite([{ input: innerEagle, gravity: 'center' }])
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('✅ Created: public/apple-touch-icon.png (180x180 Squircle Luxury Badge)');

  // 4. ICO dosyası oluştur (public/favicon.ico ve src/app/favicon.ico)
  // Sharp ile 32x32 PNG üretip .ico olarak kaydet (veya standart ico)
  const icoBuffer = await sharp(transparentEagleBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  console.log('✅ Created: public/favicon.ico & src/app/favicon.ico (Transparent 32x32)');

  console.log('🎉 All Favicons & App Icons successfully generated!');
}

generateFavicons().catch(console.error);
