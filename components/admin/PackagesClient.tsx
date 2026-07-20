'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { deletePackage, togglePackagePublished } from '@/app/actions/packages';
import { Edit2, Plus, Trash2, Eye, EyeOff, ImageIcon } from 'lucide-react';

export default function PackagesClient({ initialPackages }: { initialPackages: any[] }) {
  const [data, setData] = useState(initialPackages);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await deletePackage(id);
      if (!res.success) {
        alert(res.error || 'Failed to delete');
        return;
      }
      setData((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    const next = !current;
    try {
      const res = await togglePackagePublished(id, next);
      if (!res.success) {
        alert(res.error || 'Failed to toggle visibility');
        return;
      }
      setData((prev) => prev.map((t) => (t.id === id ? { ...t, is_published: next } : t)));
    } catch {
      alert('Failed to toggle visibility');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="font-semibold text-slate-800">All Packages</h2>
        <Link
          href="/admin/dashboard/packages/new"
          className="bg-[#0b3e63] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#082a45] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Package
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Image</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Days</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Price</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                  <p className="font-medium text-slate-600">No packages found.</p>
                  <p className="text-sm mt-1">
                    If you have just set this up, run migrations <code className="font-mono">012</code> &amp;{' '}
                    <code className="font-mono">013</code> in the Supabase SQL Editor to import the existing 23
                    packages — or click <span className="font-medium">Add Package</span> to create one.
                  </p>
                </td>
              </tr>
            ) : (
              data.map((t) => {
                const cover = Array.isArray(t.images) && t.images.length > 0 ? t.images[0] : null;
                const dayCount = Array.isArray(t.days) ? t.days.length : 0;
                return (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md bg-slate-100 flex items-center justify-center">
                        {cover ? (
                          <Image src={cover} alt={t.title} fill className="object-cover" unoptimized />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-slate-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-medium text-slate-900 truncate" title={t.title}>{t.title}</div>
                      <div className="text-xs text-slate-400 mt-1 font-mono truncate" title={`/tours/${t.slug}`}>/tours/{t.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{dayCount} days</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{t.starting_price || '—'}</td>
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
                        <Link href={`/admin/dashboard/packages/${t.id}`} className="p-1.5 text-blue-500 rounded-md hover:bg-blue-50 transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(t.id, t.title)} className="p-1.5 text-red-500 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
