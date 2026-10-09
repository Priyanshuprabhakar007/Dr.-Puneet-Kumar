import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { TestimonialItem } from '../../types';
import { Plus, Trash2, Edit2, Star, Eye, EyeOff, X, Save } from 'lucide-react';

export const AdminTestimonialsTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(data.testimonials);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  const handleCreate = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      patientName: 'Patient Name',
      rating: 5,
      review: 'Dr. Puneet Kumar provided exceptional clinical care and explained my condition with immense patience.',
      treatmentCategory: 'Diabetes Care',
      location: 'Mohali',
      isPublished: true,
      order: testimonials.length + 1
    });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updated: TestimonialItem[];
    if (testimonials.some((t) => t.id === editingItem.id)) {
      updated = testimonials.map((t) => (t.id === editingItem.id ? editingItem : t));
    } else {
      updated = [editingItem, ...testimonials];
    }

    const success = await updateSection('testimonials', updated);
    if (success) {
      setTestimonials(updated);
      setEditingItem(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const updated = testimonials.filter((t) => t.id !== id);
    const success = await updateSection('testimonials', updated);
    if (success) {
      setTestimonials(updated);
    }
  };

  const togglePublish = async (id: string) => {
    const updated = testimonials.map((t) =>
      t.id === id ? { ...t, isPublished: !t.isPublished } : t
    );
    const success = await updateSection('testimonials', updated);
    if (success) {
      setTestimonials(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Testimonials & Patient Reviews</h2>
          <p className="text-xs text-slate-500">
            Moderate, publish, or edit patient recovery feedback and testimonials
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.rating ? 'text-blue-400 fill-blue-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => togglePublish(item.id)}
                  className={`px-2 py-0.5 rounded-2xl text-[10px] font-bold ${
                    item.isPublished !== false
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.isPublished !== false ? 'Published' : 'Hidden'}
                </button>
              </div>

              <p className="text-xs text-slate-700 italic line-clamp-4 leading-relaxed mb-4">
                "{item.review}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{item.patientName}</p>
                <p className="text-[11px] text-slate-400">
                  {item.treatmentCategory} • {item.location}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1 text-blue-700 hover:bg-blue-50 rounded"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Testimonial</h3>
              <button onClick={() => setEditingItem(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.patientName}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, patientName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingItem.treatmentCategory || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, treatmentCategory: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rating</label>
                  <select
                    value={editingItem.rating}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, rating: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingItem.location || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, location: e.target.value })
                  }
                  placeholder="e.g. Mohali, Sector 71, Chandigarh"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Text *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.review}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, review: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pubTest"
                  checked={editingItem.isPublished !== false}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, isPublished: e.target.checked })
                  }
                  className="rounded text-blue-700"
                />
                <label htmlFor="pubTest" className="font-semibold text-slate-700">
                  Visible on Live Website
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl mt-2"
              >
                Save Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
