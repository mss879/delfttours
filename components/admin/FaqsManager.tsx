'use client';

import { useState, useTransition } from 'react';
import { FAQItem, createFaq, updateFaq, deleteFaq, toggleFaqPublished } from '@/app/actions/faqs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowUpDown,
} from 'lucide-react';

const DEFAULT_CATEGORIES = [
  'General Information',
  'Booking & Payments',
  'Travel & Logistics',
  'Support & Services',
];

interface FaqsManagerProps {
  initialFaqs: FAQItem[];
}

export default function FaqsManager({ initialFaqs }: FaqsManagerProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [deletingFaqId, setDeletingFaqId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Categories extracted from actual data + defaults
  const categories = Array.from(
    new Set(['All', ...DEFAULT_CATEGORIES, ...faqs.map((f) => f.category)])
  );

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createFaq(formData);
      if (res.success) {
        setIsAddOpen(false);
        // Refresh local list state optimistically / window reload
        window.location.reload();
      } else {
        alert(res.error || 'Failed to create FAQ');
      }
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingFaq) return;
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateFaq(editingFaq.id, formData);
      if (res.success) {
        setEditingFaq(null);
        window.location.reload();
      } else {
        alert(res.error || 'Failed to update FAQ');
      }
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const res = await deleteFaq(id);
      if (res.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        setDeletingFaqId(null);
      } else {
        alert(res.error || 'Failed to delete FAQ');
      }
    });
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await toggleFaqPublished(id, !currentStatus);
      if (res.success) {
        setFaqs((prev) =>
          prev.map((f) => (f.id === id ? { ...f, is_published: !currentStatus } : f))
        );
      } else {
        alert(res.error || 'Failed to update status');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-brand-600" />
            FAQ Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, delete, and organize frequently asked questions on the website.
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-600 hover:bg-brand-700 text-white gap-2 shadow-sm">
              <Plus className="w-4 h-4" />
              Add New FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 py-2">
              <div>
                <Label htmlFor="category">Category</Label>
                <input
                  list="category-options"
                  id="category"
                  name="category"
                  defaultValue="General Information"
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
                <datalist id="category-options">
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div>
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  name="question"
                  placeholder="e.g. Do I need a visa to visit Sri Lanka?"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  name="answer"
                  placeholder="Provide a detailed response..."
                  rows={4}
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    type="number"
                    id="display_order"
                    name="display_order"
                    defaultValue={faqs.length + 1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="is_published">Status</Label>
                  <select
                    id="is_published"
                    name="is_published"
                    defaultValue="true"
                    className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft / Hidden</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                  disabled={isPending}
                >
                  {isPending ? 'Saving...' : 'Create FAQ'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Cards List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-slate-500">
              <HelpCircle className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-semibold text-base">No FAQs Found</p>
              <p className="text-sm mt-1">
                {searchQuery || selectedCategory !== 'All'
                  ? 'Try adjusting your search query or filter.'
                  : 'Click "Add New FAQ" to create your first item.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFaqs.map((faq) => (
            <Card
              key={faq.id}
              className={`transition-all hover:shadow-md ${
                !faq.is_published ? 'bg-slate-50/70 border-dashed' : ''
              }`}
            >
              <CardContent className="p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/50">
                      {faq.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Order: #{faq.display_order}
                    </span>
                    {!faq.is_published && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
                        Draft (Hidden)
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTogglePublished(faq.id, faq.is_published)}
                    title={faq.is_published ? 'Unpublish' : 'Publish'}
                    className={
                      faq.is_published ? 'text-slate-600' : 'text-amber-600 font-semibold'
                    }
                  >
                    {faq.is_published ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingFaq(faq)}
                  >
                    <Pencil className="w-4 h-4 text-slate-700" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setDeletingFaqId(faq.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingFaq && (
        <Dialog open={!!editingFaq} onOpenChange={() => setEditingFaq(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit FAQ</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4 py-2">
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <input
                  list="edit-category-options"
                  id="edit-category"
                  name="category"
                  defaultValue={editingFaq.category}
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
                <datalist id="edit-category-options">
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div>
                <Label htmlFor="edit-question">Question</Label>
                <Input
                  id="edit-question"
                  name="question"
                  defaultValue={editingFaq.question}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-answer">Answer</Label>
                <Textarea
                  id="edit-answer"
                  name="answer"
                  defaultValue={editingFaq.answer}
                  rows={4}
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-display_order">Display Order</Label>
                  <Input
                    type="number"
                    id="edit-display_order"
                    name="display_order"
                    defaultValue={editingFaq.display_order}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-is_published">Status</Label>
                  <select
                    id="edit-is_published"
                    name="is_published"
                    defaultValue={editingFaq.is_published ? 'true' : 'false'}
                    className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft / Hidden</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingFaq(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                  disabled={isPending}
                >
                  {isPending ? 'Updating...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deletingFaqId && (
        <Dialog open={!!deletingFaqId} onOpenChange={() => setDeletingFaqId(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-600 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Delete FAQ
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-slate-600 py-2">
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeletingFaqId(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deletingFaqId)}
                disabled={isPending}
              >
                {isPending ? 'Deleting...' : 'Delete Permanently'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
