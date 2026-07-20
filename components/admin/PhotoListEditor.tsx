'use client';

import ImageUpload from './ImageUpload';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export type Photo = { label: string; image: string };

/**
 * Editor for a day's photo grid — an ordered list of {label, image} pairs.
 * Uploads go to the "packages" bucket (folder "days"). Used inside each day
 * container of the package editor.
 */
export default function PhotoListEditor({
  value,
  onChange,
}: {
  value: Photo[];
  onChange: (next: Photo[]) => void;
}) {
  const update = (i: number, patch: Partial<Photo>) =>
    onChange(value.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, { label: '', image: '' }]);
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {value.map((photo, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
              <ImageUpload
                value={photo.image || null}
                onChange={(url) => update(i, { image: url || '' })}
                bucket="packages"
                folder="days"
                label={`Photo ${i + 1}`}
              />
              <input
                value={photo.label}
                onChange={(e) => update(i, { label: e.target.value })}
                type="text"
                placeholder="Caption (e.g. Temple of the Tooth)"
                className="w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up" className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} title="Move down" className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <button type="button" onClick={() => remove(i)} title="Remove photo" className="flex items-center gap-1 p-1 rounded text-red-500 hover:bg-red-50 text-xs">
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 hover:border-[#0b3e63]/50 hover:text-[#0b3e63]"
      >
        <Plus className="w-4 h-4" /> Add photo
      </button>
    </div>
  );
}
