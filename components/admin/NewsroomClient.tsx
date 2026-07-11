'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createNews, updateNews, deleteNews, toggleNewsPublished } from '@/app/actions/newsroom';
import { Edit2, Plus, Trash2, Eye, EyeOff, ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ImageUpload from './ImageUpload';

function todayInput(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDate(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function NewsroomClient({ initialNews }: { initialNews: any[] }) {
  const [data, setData] = useState(initialNews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [publishedDate, setPublishedDate] = useState(todayInput());
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);

  const openNew = () => {
    setEditingItem(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setPublishedDate(todayInput());
    setImageUrl(null);
    setIsPublished(true);
    setIsDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setExcerpt(item.excerpt || '');
    setContent(item.content || '');
    setPublishedDate(item.published_date || todayInput());
    setImageUrl(item.image_url || null);
    setIsPublished(item.is_published);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('content', content);
    formData.append('published_date', publishedDate);
    formData.append('image_url', imageUrl || '');
    formData.append('is_published', String(isPublished));

    try {
      const res = editingItem
        ? await updateNews(editingItem.id, formData)
        : await createNews(formData);

      if (!res.success) {
        alert(res.error || 'Action failed');
        return;
      }

      if (editingItem) {
        setData((prev) =>
          prev.map((t) =>
            t.id === editingItem.id
              ? { ...t, title, excerpt, content, published_date: publishedDate, image_url: imageUrl, is_published: isPublished }
              : t
          )
        );
      } else {
        window.location.reload();
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      alert('Action failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this news article?')) return;
    try {
      const res = await deleteNews(id);
      if (!res.success) { alert(res.error || 'Failed to delete'); return; }
      setData((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  const togglePublish = async (id: string, currentState: boolean) => {
    const newState = !currentState;
    try {
      const res = await toggleNewsPublished(id, newState);
      if (!res.success) { alert(res.error || 'Failed to toggle visibility'); return; }
      setData((prev) => prev.map((t) => (t.id === id ? { ...t, is_published: newState } : t)));
    } catch {
      alert('Failed to toggle visibility');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="font-semibold text-slate-800">All News</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button onClick={openNew} className="bg-[#0b3e63] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#082a45] transition-colors">
              <Plus className="w-4 h-4" /> Add News
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
            <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
              <DialogTitle className="text-xl font-semibold text-slate-800">
                {editingItem ? 'Edit News Article' : 'New News Article'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Title</label>
                <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" placeholder="e.g. Delft Tours wins Best Operator 2026" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Publish Date</label>
                <input required value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} type="date" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" />
              </div>

              <ImageUpload value={imageUrl} onChange={setImageUrl} folder="newsroom" label="Cover Image" />

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Short Summary (Excerpt)</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-3 py-2 border rounded-lg h-20 resize-none focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" placeholder="One or two sentences shown on the card."></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Full Article</label>
                <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border rounded-lg h-40 resize-none focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" placeholder="The full story..."></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="publish-news" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded text-[#0b3e63] w-4 h-4 cursor-pointer" />
                <label htmlFor="publish-news" className="text-sm text-slate-700 cursor-pointer select-none">Publish immediately to website</label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-[#0b3e63] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#082a45] disabled:opacity-50">
                  {isLoading ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Image</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No news articles yet. Add your first one!
                </td>
              </tr>
            ) : (
              data.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative h-12 w-16 overflow-hidden rounded-md bg-slate-100 flex items-center justify-center">
                      {t.image_url ? (
                        <Image src={t.image_url} alt={t.title} fill className="object-cover" unoptimized />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-slate-300" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="font-medium text-slate-900 truncate" title={t.title}>{t.title}</div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{t.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{formatDate(t.published_date)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {t.is_published ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => togglePublish(t.id, t.is_published)} className={`p-1.5 rounded-md transition-colors ${t.is_published ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}`} title={t.is_published ? 'Hide from website' : 'Publish to website'}>
                        {t.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => openEdit(t)} className="p-1.5 text-blue-500 rounded-md hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-1.5 text-red-500 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
