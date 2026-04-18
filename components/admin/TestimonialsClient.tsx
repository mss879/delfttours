'use client';

import { useState } from 'react';
import { createTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialPublished } from '@/app/actions/testimonials';
import { Edit2, Plus, Star, Trash2, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [data, setData] = useState(initialTestimonials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [tourType, setTourType] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('5');
  const [isPublished, setIsPublished] = useState(true);

  const openNew = () => {
    setEditingItem(null);
    setAuthorName('');
    setAuthorLocation('');
    setTourType('');
    setContent('');
    setRating('5');
    setIsPublished(true);
    setIsDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setAuthorName(item.author_name || '');
    setAuthorLocation(item.author_location || '');
    setTourType(item.tour_type || '');
    setContent(item.content || '');
    setRating(String(item.rating || 5));
    setIsPublished(item.is_published);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('author_name', authorName);
    formData.append('author_location', authorLocation);
    formData.append('tour_type', tourType);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('is_published', String(isPublished));

    try {
      if (editingItem) {
        await updateTestimonial(editingItem.id, formData);
        setData(prev => prev.map(t => t.id === editingItem.id ? { ...t, author_name: authorName, author_location: authorLocation, tour_type: tourType, content, rating: parseInt(rating), is_published: isPublished } : t));
      } else {
        await createTestimonial(formData);
        // Quick visual reload logic trick
        window.location.reload();
      }
      setIsDialogOpen(false);
    } catch(err) {
      console.error(err);
      alert('Action failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you certain you want to delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      setData(prev => prev.filter(t => t.id !== id));
    } catch(err) {
      alert('Failed to delete');
    }
  };

  const togglePublish = async (id: string, currentState: boolean) => {
    const newState = !currentState;
    try {
      await toggleTestimonialPublished(id, newState);
      setData(prev => prev.map(t => t.id === id ? { ...t, is_published: newState } : t));
    } catch(err) {
      alert('Failed to toggle visibility');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="font-semibold text-slate-800">All Reviews</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button onClick={openNew} className="bg-[#0b3e63] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#082a45] transition-colors">
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
            <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <DialogTitle className="text-xl font-semibold text-slate-800">
                {editingItem ? 'Edit Testimonial' : 'New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Author Name</label>
                  <input required value={authorName} onChange={(e) => setAuthorName(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <input value={authorLocation} onChange={(e) => setAuthorLocation(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" placeholder="e.g. London, UK" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Tour Type (Optional)</label>
                  <input value={tourType} onChange={(e) => setTourType(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" placeholder="e.g. 10-Day Surf Tour" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Rating (1-5)</label>
                  <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white outline-none">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Content</label>
                <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-[#0b3e63]/20 focus:border-[#0b3e63] outline-none" placeholder="Their glowing review..."></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="publish" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded text-[#0b3e63] w-4 h-4 cursor-pointer" />
                <label htmlFor="publish" className="text-sm text-slate-700 cursor-pointer select-none">Publish immediately to website</label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-[#0b3e63] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#082a45] disabled:opacity-50">
                  {isLoading ? 'Saving...' : 'Save Testimonial'}
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
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Author</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Content Preview</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Rating</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No testimonials found. Add your first success story!
                </td>
              </tr>
            ) : data.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{t.author_name}</div>
                  <div className="text-xs text-slate-500 mt-1">{t.author_location}</div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-sm text-slate-600 truncate" title={t.content}>{t.content}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex text-[#FFC947]">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {t.is_published ? 'Published' : 'Hidden'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => togglePublish(t.id, t.is_published)}
                      className={`p-1.5 rounded-md transition-colors ${t.is_published ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}`}
                      title={t.is_published ? "Hide from website" : "Publish to website"}
                    >
                      {t.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => openEdit(t)}
                      className="p-1.5 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="p-1.5 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
