import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { BlogPostItem } from '../../types';
import { Plus, Trash2, Edit2, BookOpen, Eye, EyeOff, X, Save } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminBlogTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [blogs, setBlogs] = useState<BlogPostItem[]>(data.blogs || []);
  const [editingItem, setEditingItem] = useState<BlogPostItem | null>(null);

  const handleCreate = () => {
    setEditingItem({
      id: `blog-${Date.now()}`,
      title: 'New Patient Health Article',
      slug: `article-${Date.now()}`,
      category: 'Diabetes',
      author: 'Dr. Puneet Kumar',
      excerpt: 'Summary of clinical insights and practical patient advice.',
      content:
        'Detailed medical analysis and practical lifestyle management steps for patients and their families.\n\nEarly diagnosis and regular follow-up remain the most reliable strategy to prevent severe metabolic complications.',
      readingTime: '4 min read',
      publishedAt: new Date().toISOString().split('T')[0],
      featuredImage:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      tags: ['Health', 'Diabetes', 'Wellness'],
      published: true
    });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updated: BlogPostItem[];
    if (blogs.some((b) => b.id === editingItem.id)) {
      updated = blogs.map((b) => (b.id === editingItem.id ? editingItem : b));
    } else {
      updated = [editingItem, ...blogs];
    }

    const success = await updateSection('blogs', updated);
    if (success) {
      setBlogs(updated);
      setEditingItem(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    const updated = blogs.filter((b) => b.id !== id);
    const success = await updateSection('blogs', updated);
    if (success) {
      setBlogs(updated);
    }
  };

  const togglePublish = async (id: string) => {
    const updated = blogs.map((b) =>
      b.id === id ? { ...b, published: b.published === false ? true : false } : b
    );
    const success = await updateSection('blogs', updated);
    if (success) {
      setBlogs(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Blog & Patient Education CMS</h2>
          <p className="text-xs text-slate-500">
            Author and publish medical guidance articles with SEO slugs and reading times
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="p-4">Title & Slug</th>
              <th className="p-4">Category</th>
              <th className="p-4">Reading Time</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/80">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{b.title}</p>
                  <p className="text-[11px] font-mono text-slate-400">/blog/{b.slug}</p>
                </td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-2xl text-[11px] font-semibold">
                    {b.category}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{b.readingTime}</td>
                <td className="p-4 text-slate-400">{b.publishedAt}</td>
                <td className="p-4">
                  <button
                    onClick={() => togglePublish(b.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-2xl font-bold text-[10px] cursor-pointer ${
                      b.published !== false
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {b.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{b.published !== false ? 'Live' : 'Draft'}</span>
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => setEditingItem(b)}
                    className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-2xl"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-2xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {blogs.some((b) => b.id === editingItem.id) ? 'Edit Article' : 'New Article'}
              </h3>
              <button onClick={() => setEditingItem(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.slug}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  >
                    <option value="Diabetes">Diabetes</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="General Health">General Health</option>
                    <option value="Preventive Health">Preventive Health</option>
                    <option value="Seasonal Illness">Seasonal Illness</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Reading Time</label>
                  <input
                    type="text"
                    value={editingItem.readingTime}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, readingTime: e.target.value })
                    }
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
              </div>

              <div>
                <ImageUploadField
                  label="Featured Image"
                  value={editingItem.featuredImage || ''}
                  onChange={(val) => setEditingItem({ ...editingItem, featuredImage: val })}
                  helperText="Upload a high-quality relevant image for the article cover."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Content</label>
                <textarea
                  rows={6}
                  value={editingItem.content}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingItem.tags?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Diabetes, Diet, HbA1c, Prevention"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pubArt"
                  checked={editingItem.published !== false}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, published: e.target.checked })
                  }
                  className="rounded text-blue-700"
                />
                <label htmlFor="pubArt" className="font-semibold text-slate-700">
                  Publish to Live Website
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-2xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
