const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '..', 'public', 'delftfavicon.png');
const OUT = path.join(__dirname, '..', 'public');

async function generate() {
  console.log('Generating favicon assets from', SOURCE);

  // 32x32 PNG
  await sharp(SOURCE)
    .resize(32, 32)
    .png({ quality: 90 })
    .toFile(path.join(OUT, 'icon-32x32.png'));
  console.log('✓ icon-32x32.png');

  // 192x192 PNG (Android/PWA)
  await sharp(SOURCE)
    .resize(192, 192)
    .png({ quality: 90 })
    .toFile(path.join(OUT, 'icon-192x192.png'));
  console.log('✓ icon-192x192.png');

  // 512x512 PNG (PWA splash)
  await sharp(SOURCE)
    .resize(512, 512)
    .png({ quality: 90 })
    .toFile(path.join(OUT, 'icon-512x512.png'));
  console.log('✓ icon-512x512.png');

  // 180x180 Apple Touch Icon
  await sharp(SOURCE)
    .resize(180, 180)
    .png({ quality: 90 })
    .toFile(path.join(OUT, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // 48x48 PNG for ICO fallback (browsers requesting /favicon.ico get this)
  // Next.js 13 can serve a PNG as favicon.ico via the metadata API,
  // but for maximum compatibility we create a proper ICO-like PNG at 48x48
  // and name it favicon.ico (most modern browsers accept PNG data in .ico)
  await sharp(SOURCE)
    .resize(48, 48)
    .png({ quality: 90 })
    .toFile(path.join(OUT, 'favicon.ico'));
  console.log('✓ favicon.ico (48x48 PNG)');

  console.log('\nAll favicon assets generated successfully!');
}

generate().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
