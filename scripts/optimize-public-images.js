/**
 * optimize-public-images.js
 *
 * Recursively resizes + re-encodes every raster image under public/ IN PLACE,
 * keeping the exact same filename & extension so no code references break.
 * next/image still converts to AVIF/WebP on delivery — this just makes the
 * SOURCE files sane (they were 5000-8000px, 20-34MB camera originals).
 *
 * Safety:
 *  - Only replaces a file when the optimized result is actually smaller.
 *  - Skips small, already-optimized assets (<=2560px and <400KB).
 *  - public/ is git-tracked, so `git checkout -- public` restores originals.
 *
 * Usage:
 *   node scripts/optimize-public-images.js          # process in place
 *   node scripts/optimize-public-images.js --dry     # report only, no writes
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'public');
const MAX_DIM = 2560;               // longest side
const MIN_BYTES_TO_TOUCH = 400 * 1024; // leave small assets alone
const JPEG_Q = 78;
const WEBP_Q = 74;
const CONCURRENCY = Math.max(2, Math.min(6, os.cpus().length - 1));
const DRY = process.argv.includes('--dry');

const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext)) return null;

  const origBytes = fs.statSync(file).size;
  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch (e) {
    return { file, skipped: 'unreadable: ' + e.message };
  }
  const maxDim = Math.max(meta.width || 0, meta.height || 0);

  // Leave already-small, already-reasonable assets untouched.
  if (maxDim <= MAX_DIM && origBytes < MIN_BYTES_TO_TOUCH) {
    return { file, skipped: 'already-small' };
  }
  // WebP/PNG are usually already optimized; only touch them when genuinely
  // oversized (dimensions) or very large (>=1MB). Avoids generational quality
  // loss on already-compressed assets for marginal byte savings.
  if ((ext === '.webp' || ext === '.png') && maxDim <= MAX_DIM && origBytes < 1024 * 1024) {
    return { file, skipped: 'already-optimized-vector-ish' };
  }

  let pipe = sharp(file, { failOn: 'none' }).rotate(); // bake in EXIF orientation
  if (maxDim > MAX_DIM) {
    pipe = pipe.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true });
  }

  if (ext === '.png') {
    pipe = pipe.png({ compressionLevel: 9, effort: 8 });
  } else if (ext === '.webp') {
    pipe = pipe.webp({ quality: WEBP_Q, effort: 5 });
  } else {
    pipe = pipe.jpeg({ quality: JPEG_Q, mozjpeg: true });
  }

  const buf = await pipe.toBuffer();

  // Only replace when we actually win.
  if (buf.length >= origBytes) {
    return { file, skipped: 'no-gain', origBytes, newBytes: buf.length };
  }

  if (!DRY) {
    const tmp = file + '.opt-tmp';
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, file);
  }
  return { file, origBytes, newBytes: buf.length, maxDim, newMaxDim: Math.min(maxDim, MAX_DIM) };
}

async function run() {
  const files = walk(ROOT).filter((f) => RASTER.has(path.extname(f).toLowerCase()));
  console.log(`Scanning ${files.length} raster files under public/${DRY ? ' (DRY RUN)' : ''}\n`);

  let totalOrig = 0, totalNew = 0, changed = 0, skipped = 0, errors = 0;
  let i = 0;

  async function worker() {
    while (i < files.length) {
      const file = files[i++];
      try {
        const r = await optimize(file);
        if (!r) continue;
        if (r.skipped) {
          skipped++;
          continue;
        }
        changed++;
        totalOrig += r.origBytes;
        totalNew += r.newBytes;
        const rel = path.relative(ROOT, r.file);
        console.log(
          `${(r.origBytes / 1048576).toFixed(1)}MB -> ${(r.newBytes / 1024).toFixed(0)}KB  ` +
          `(${(100 - (r.newBytes / r.origBytes) * 100).toFixed(0)}% off)  ${rel}`
        );
      } catch (e) {
        errors++;
        console.error(`ERROR ${file}: ${e.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`\n──────── summary ────────`);
  console.log(`changed: ${changed}   skipped: ${skipped}   errors: ${errors}`);
  console.log(`reclaimed on touched files: ${(totalOrig / 1048576).toFixed(0)}MB -> ${(totalNew / 1048576).toFixed(1)}MB`);
}

run().catch((e) => { console.error(e); process.exit(1); });
