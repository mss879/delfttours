'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toWebp } from '@/lib/imageToWebp';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB (headroom for high-quality WebP)

/**
 * Ordered multi-image editor for a package's hero/gallery. Uploads straight into
 * the public "packages" Supabase bucket (same mechanism as ImageUpload) and hands
 * an ordered string[] of public URLs back to the parent. images[0] is the card /
 * carousel-first image.
 */
export default function PackageGallery({
  value,
  onChange,
  folder = 'hero',
  label = 'Gallery images',
}: {
  value: string[];
  onChange: (next: string[]) => void;
  folder?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Natural pixel size per image URL, so the client knows what to match.
  const [dimsByUrl, setDimsByUrl] = useState<Record<string, { w: number; h: number }>>({});

  const handleFiles = async (files: FileList) => {
    setError(null);
    const supabase = createClient();
    setUploading(true);
    const added: string[] = [];
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed.');
          continue;
        }
        // Optimize to WebP (same dimensions) before upload.
        const upload = await toWebp(file);
        if (upload.size > MAX_BYTES) {
          setError(`"${file.name}" is too large (max 10 MB after optimization).`);
          continue;
        }
        const ext = upload.name.split('.').pop()?.toLowerCase() || 'webp';
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('packages')
          .upload(path, upload, { cacheControl: '31536000', upsert: false, contentType: upload.type });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from('packages').getPublicUrl(path);
        added.push(data.publicUrl);
      }
      if (added.length) onChange([...value, ...added]);
    } catch (err: any) {
      console.error('Gallery upload failed:', err);
      setError(err?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeAt = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length) handleFiles(e.target.files);
        }}
      />

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, i) => (
            <div key={`${url}-${i}`} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <div className="relative h-28 w-full">
                <Image
                  src={url}
                  alt={`Image ${i + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                  onLoadingComplete={(img) => {
                    if (img.naturalWidth)
                      setDimsByUrl((prev) => ({ ...prev, [url]: { w: img.naturalWidth, h: img.naturalHeight } }));
                  }}
                />
                {dimsByUrl[url] && (
                  <span className="absolute top-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {dimsByUrl[url].w} × {dimsByUrl[url].h}
                  </span>
                )}
              </div>
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-[#0b3e63] px-2 py-0.5 text-[10px] font-semibold text-white">
                  <Star className="w-3 h-3" /> Main
                </span>
              )}
              <div className="flex items-center justify-between gap-1 border-t border-slate-100 bg-white px-1.5 py-1">
                <div className="flex gap-0.5">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move earlier" className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} title="Move later" className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button type="button" onClick={() => removeAt(i)} title="Remove" className="flex items-center gap-1 p-1 rounded text-red-500 hover:bg-red-50 text-xs">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-4 text-slate-500 transition-colors hover:border-[#0b3e63] hover:text-[#0b3e63] disabled:opacity-60"
      >
        {uploading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Uploading…</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-5 w-5" />
            <span className="text-sm font-medium">Click to add image(s)</span>
            <span className="text-xs text-slate-400">PNG, JPG or WEBP · up to 10 MB each</span>
          </>
        )}
      </button>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
