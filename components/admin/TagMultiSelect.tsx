'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

/**
 * Hybrid tag editor: pick from the values already in use (shown as toggleable
 * pills) OR type a brand-new one. New tags flow straight into the /tours filter
 * options because those options are derived from the data.
 */
export default function TagMultiSelect({
  label,
  options,
  value,
  onChange,
  help,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  help?: string;
}) {
  const [draft, setDraft] = useState('');

  const toggle = (tag: string) => {
    if (value.includes(tag)) onChange(value.filter((v) => v !== tag));
    else onChange([...value, tag]);
  };

  const addDraft = () => {
    const t = draft.trim();
    if (!t) return;
    // Case-insensitive de-dupe so "Beach" and "beach" don't fragment the filters.
    const exists = value.some((v) => v.toLowerCase() === t.toLowerCase());
    if (!exists) onChange([...value, t]);
    setDraft('');
  };

  // Selected values that aren't in the known-options list (freshly typed) still
  // need a removable pill.
  const extras = value.filter((v) => !options.includes(v));
  const allPills = [...options, ...extras];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {help && <p className="text-xs text-slate-500 -mt-1">{help}</p>}

      <div className="flex flex-wrap gap-2">
        {allPills.map((tag) => {
          const active = value.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                active
                  ? 'bg-[#0b3e63] text-white border-[#0b3e63]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#0b3e63]/50'
              }`}
            >
              {tag}
              {active && <X className="w-3 h-3" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addDraft();
            }
          }}
          type="text"
          placeholder="Add new…"
          className="flex-1 min-w-0 px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none"
        />
        <button
          type="button"
          onClick={addDraft}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-[#0b3e63]/50 hover:text-[#0b3e63]"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
    </div>
  );
}
