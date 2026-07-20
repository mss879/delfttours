'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import type { FacetKey } from '@/app/tours/facets';
import { createPackage, updatePackage } from '@/app/actions/packages';
import ImageUpload from './ImageUpload';
import PackageGallery from './PackageGallery';
import PhotoListEditor, { type Photo } from './PhotoListEditor';
import RichTextEditor from './RichTextEditor';
import TagMultiSelect from './TagMultiSelect';

type DayState = { uid: string; title: string; description: string; highlights: Photo[] };

// Legacy seeded maps are stored as a bare filename (e.g. "…Isle.webp"); the
// public page prefixes "/package maps/". Do the same here so the preview loads
// and saving keeps a resolvable path (uploaded maps are already full URLs).
function resolveMapSrc(v: string | null | undefined): string | null {
  if (!v) return null;
  if (v.startsWith('http') || v.startsWith('/')) return v;
  return `/package maps/${v}`;
}

const FACETS: { key: FacetKey; label: string; help?: string }[] = [
  { key: 'countries', label: 'Countries' },
  { key: 'destinations', label: 'Destinations', help: 'Places the itinerary visits — drives the /tours filters.' },
  { key: 'themes', label: 'Themes' },
  { key: 'religions', label: 'Religions' },
  { key: 'activities', label: 'Activities' },
];

export default function PackageEditor({
  pkg,
  knownTags,
  nextSortOrder,
}: {
  pkg: any | null;
  knownTags: Record<FacetKey, string[]>;
  nextSortOrder: number;
}) {
  const router = useRouter();
  const editing = !!pkg;
  const uidRef = useRef(0);
  const newUid = () => `new-${uidRef.current++}`;

  const [title, setTitle] = useState<string>(pkg?.title ?? '');
  const [slug, setSlug] = useState<string>(pkg?.slug ?? '');
  const [startingPrice, setStartingPrice] = useState<string>(pkg?.starting_price ?? '');
  const [description, setDescription] = useState<string>(pkg?.description ?? '');
  const [images, setImages] = useState<string[]>(Array.isArray(pkg?.images) ? pkg.images : []);
  const [inclusionsText, setInclusionsText] = useState<string>(
    Array.isArray(pkg?.inclusions) ? pkg.inclusions.join('\n') : ''
  );
  const [mapImage, setMapImage] = useState<string | null>(resolveMapSrc(pkg?.map_image));
  const [days, setDays] = useState<DayState[]>(
    Array.isArray(pkg?.days)
      ? pkg.days.map((d: any, i: number) => ({
          uid: `d-${i}`,
          title: d?.title ?? '',
          description: d?.description ?? '',
          highlights: Array.isArray(d?.highlights) ? d.highlights : [],
        }))
      : []
  );
  const [tags, setTags] = useState<Record<FacetKey, string[]>>({
    countries: Array.isArray(pkg?.countries) ? pkg.countries : [],
    destinations: Array.isArray(pkg?.destinations) ? pkg.destinations : [],
    themes: Array.isArray(pkg?.themes) ? pkg.themes : [],
    religions: Array.isArray(pkg?.religions) ? pkg.religions : [],
    activities: Array.isArray(pkg?.activities) ? pkg.activities : [],
  });
  const [sortOrder, setSortOrder] = useState<number>(pkg?.sort_order ?? nextSortOrder);
  const [isPublished, setIsPublished] = useState<boolean>(pkg?.is_published ?? true);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setDays((prev) => {
      const from = prev.findIndex((d) => d.uid === active.id);
      const to = prev.findIndex((d) => d.uid === over.id);
      if (from === -1 || to === -1) return prev;
      return arrayMove(prev, from, to);
    });
  };

  const addDay = () =>
    setDays((prev) => [...prev, { uid: newUid(), title: `Day ${prev.length + 1}`, description: '', highlights: [] }]);
  const removeDay = (uid: string) => setDays((prev) => prev.filter((d) => d.uid !== uid));
  const patchDay = (uid: string, patch: Partial<DayState>) =>
    setDays((prev) => prev.map((d) => (d.uid === uid ? { ...d, ...patch } : d)));

  const handleSave = async () => {
    if (!slug.trim() || !title.trim()) {
      alert('Title and URL code are required.');
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('slug', slug.trim());
      fd.append('title', title.trim());
      fd.append('starting_price', startingPrice.trim());
      fd.append('description', description);
      fd.append(
        'days',
        JSON.stringify(
          days.map((d) => ({
            title: d.title,
            description: d.description,
            highlights: d.highlights.filter((h) => h.image),
          }))
        )
      );
      fd.append(
        'inclusions',
        JSON.stringify(
          inclusionsText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
        )
      );
      fd.append('images', JSON.stringify(images));
      fd.append('map_image', mapImage ?? '');
      (Object.keys(tags) as FacetKey[]).forEach((k) => fd.append(k, JSON.stringify(tags[k])));
      fd.append('sort_order', String(sortOrder));
      fd.append('is_published', String(isPublished));

      const res = editing ? await updatePackage(pkg.id, fd) : await createPackage(fd);
      if (!res.success) {
        alert(res.error || 'Save failed');
        return;
      }
      router.push('/admin/dashboard/packages');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none';

  return (
    <div className="max-w-4xl space-y-8 pb-24">
      {/* Header / actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard/packages')}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#0b3e63] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#082a45] disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Package'}
        </button>
      </div>

      {/* Hero gallery */}
      <Section title="Hero Images" subtitle="Shown in the carousel at the top of the package page. The first image is the main / card image.">
        <PackageGallery value={images} onChange={setImages} folder="hero" label="" />
      </Section>

      {/* Basics */}
      <Section title="Basics">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="e.g. Essence of Sri Lanka (4 days)" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">URL Code / Slug</label>
            <div className="flex items-center rounded-lg border focus-within:ring-2 focus-within:ring-[#0b3e63]/20 focus-within:border-[#0b3e63]">
              <span className="pl-3 pr-1 text-sm text-slate-400 select-none">/tours/</span>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 min-w-0 py-2 pr-3 bg-transparent outline-none font-mono text-sm" placeholder="SL-4D3N-STD-01" />
            </div>
            <p className="text-xs text-slate-500">
              {editing
                ? 'This package is live. Changing the code changes its URL and loses its search ranking.'
                : 'The tour code that becomes the page URL. Keep the SL-… format.'}
            </p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Starting Price</label>
            <input value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} className={inputCls} placeholder="$450 (leave blank if unpriced)" />
          </div>
        </div>
      </Section>

      {/* Overview */}
      <Section title="Overview" subtitle="The intro paragraph shown under “Tour Overview”.">
        <RichTextEditor value={description} onChange={setDescription} placeholder="Duration, type, who it suits…" />
      </Section>

      {/* Inclusions */}
      <Section title="What's Included" subtitle="One inclusion per line.">
        <textarea
          value={inclusionsText}
          onChange={(e) => setInclusionsText(e.target.value)}
          className={`${inputCls} h-36 resize-y`}
          placeholder={'Private Driver/Guide\nPrivate Superior Car\nHalf Board (Breakfast & Dinner)'}
        />
      </Section>

      {/* Days */}
      <Section title="Day-by-Day Itinerary" subtitle="Drag the handle to reorder days. Each day has its own text and photo grid.">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={days.map((d) => d.uid)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {days.map((day, index) => (
                <SortableDay
                  key={day.uid}
                  day={day}
                  index={index}
                  onRemove={() => removeDay(day.uid)}
                  onTitle={(v) => patchDay(day.uid, { title: v })}
                  onDescription={(v) => patchDay(day.uid, { description: v })}
                  onHighlights={(v) => patchDay(day.uid, { highlights: v })}
                  inputCls={inputCls}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <button
          type="button"
          onClick={addDay}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:border-[#0b3e63]/50 hover:text-[#0b3e63]"
        >
          <Plus className="w-4 h-4" /> Add day
        </button>
      </Section>

      {/* Journey map */}
      <Section title="Journey Map" subtitle="Optional route map shown near the bottom of the page.">
        <div className="max-w-md">
          <ImageUpload value={mapImage} onChange={setMapImage} bucket="packages" folder="maps" label="Map image" fit="contain" heightClass="h-64" />
        </div>
      </Section>

      {/* Tags */}
      <Section title="Tags & Filters" subtitle="These power the filters on the /tours page. Pick existing values or add new ones.">
        <div className="space-y-6">
          {FACETS.map((f) => (
            <TagMultiSelect
              key={f.key}
              label={f.label}
              help={f.help}
              options={knownTags[f.key] ?? []}
              value={tags[f.key]}
              onChange={(next) => setTags((prev) => ({ ...prev, [f.key]: next }))}
            />
          ))}
        </div>
      </Section>

      {/* Publish */}
      <Section title="Publishing">
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Sort order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value || '0', 10))}
              className={inputCls}
            />
            <p className="text-xs text-slate-500">Lower numbers appear first on /tours.</p>
          </div>
          <label className="flex items-center gap-2 pt-6">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded text-[#0b3e63] w-4 h-4 cursor-pointer" />
            <span className="text-sm text-slate-700 select-none">Published (visible on the website)</span>
          </label>
        </div>
      </Section>

      <div className="flex justify-end gap-3 border-t pt-6">
        <button type="button" onClick={() => router.push('/admin/dashboard/packages')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">
          Cancel
        </button>
        <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-[#0b3e63] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#082a45] disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Package'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function SortableDay({
  day,
  index,
  onRemove,
  onTitle,
  onDescription,
  onHighlights,
  inputCls,
}: {
  day: DayState;
  index: number;
  onRemove: () => void;
  onTitle: (v: string) => void;
  onDescription: (v: string) => void;
  onHighlights: (v: Photo[]) => void;
  inputCls: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: day.uid });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="rounded-xl border border-slate-200 bg-slate-50/60">
      <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2">
        <button type="button" className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600" title="Drag to reorder" {...attributes} {...listeners}>
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Day {index + 1}</span>
        <div className="ml-auto">
          <button type="button" onClick={onRemove} title="Remove day" className="flex items-center gap-1 p-1 rounded text-red-500 hover:bg-red-50 text-xs">
            <Trash2 className="w-4 h-4" /> Remove
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Day title</label>
          <input value={day.title} onChange={(e) => onTitle(e.target.value)} className={inputCls} placeholder="e.g. Day 1: Arrival / Kandy – The Cultural Heart" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Details</label>
          <RichTextEditor value={day.description} onChange={onDescription} placeholder="What happens on this day…" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Photos for this day</label>
          <PhotoListEditor value={day.highlights} onChange={onHighlights} />
        </div>
      </div>
    </div>
  );
}
