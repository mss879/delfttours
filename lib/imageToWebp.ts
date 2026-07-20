/**
 * Client-side image optimizer. Re-encodes an uploaded image to WebP (same pixel
 * dimensions, lossy) before it goes to Supabase Storage, so admin uploads are
 * small and fast without any server round-trip.
 *
 * Left untouched: files already WebP, and GIFs (a canvas re-encode would flatten
 * the animation). If the browser can't encode WebP, or anything fails, the
 * original file is returned so uploads never break.
 */
export async function toWebp(file: File, quality = 0.82): Promise<File> {
  if (typeof window === 'undefined') return file;
  if (!file.type.startsWith('image/')) return file;
  if (file.type === 'image/webp' || file.type === 'image/gif') return file;

  try {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close?.();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/webp', quality)
    );
    // Guard against browsers that don't support WebP encoding (they hand back a
    // PNG blob) — keep the original in that case.
    if (!blob || blob.type !== 'image/webp') return file;

    const base = file.name.replace(/\.[^.]+$/, '') || 'image';
    return new File([blob], `${base}.webp`, { type: 'image/webp' });
  } catch (err) {
    console.warn('WebP conversion failed; uploading original image.', err);
    return file;
  }
}
