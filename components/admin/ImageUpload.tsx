'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  /** Storage bucket to upload into. Defaults to the shared "media" bucket. */
  bucket?: string;
  /** Optional sub-folder inside the bucket, e.g. "events", "newsroom". */
  folder?: string;
  label?: string;
}

// Reusable admin image uploader. Uploads the chosen file client-side, straight
// into a public Supabase Storage bucket using the admin's authenticated session,
// then hands the resulting public URL back to the parent form via onChange.
export default function ImageUpload({
  value,
  onChange,
  bucket = 'media',
  folder = '',
  label = 'Image',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Image is too large (max 5 MB).');
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      // Unique, collision-proof filename. Optional folder prefix keeps a shared
      // bucket organised; a dedicated bucket can skip it.
      const prefix = folder ? `${folder}/` : '';
      const path = `${prefix}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, { cacheControl: '31536000', upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setError(err?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {value ? (
        <div className="relative w-full overflow-hidden rounded-lg border border-slate-200">
          <div className="relative h-40 w-full bg-slate-50">
            <Image src={value} alt="Uploaded preview" fill className="object-cover" unoptimized />
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-white px-3 py-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="text-xs font-medium text-[#0b3e63] hover:underline disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Replace'}
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition-colors hover:border-[#0b3e63] hover:text-[#0b3e63] disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm">Uploading…</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-6 w-6" />
              <span className="text-sm font-medium">Click to upload an image</span>
              <span className="text-xs text-slate-400">PNG, JPG or WEBP · up to 5 MB</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
