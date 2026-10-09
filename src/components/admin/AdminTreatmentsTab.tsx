import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { TreatmentItem, TreatmentCategory } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  Save,
  Eye,
  EyeOff,
  Stethoscope
} from 'lucide-react';

export const AdminTreatmentsTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [treatments, setTreatments] = useState<TreatmentItem[]>(data.treatments);
  const categories = data.treatmentCategories;

  const [editingItem, setEditingItem] = useState<TreatmentItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreateNew = () => {
    const newItem: TreatmentItem = {
      id: `treat-${Date.now()}`,
      title: 'New Clinical Condition',
      slug: `condition-${Date.now()}`,
      categoryId: categories[0]?.id || 'diabetes',
      iconName: 'Stethoscope',
      shortDescription: 'Clinical overview and management guidelines for this medical condition.',
      fullDescription: 'Comprehensive outpatient evaluation, therapeutic protocol, and long-term surveillance.',
      symptoms: ['Symptom 1', 'Symptom 2'],
      diagnosticTests: ['Complete Blood Count', 'Specific Profiling'],
      treatmentApproach: 'Targeted medical intervention and evidence-based pharmacotherapy.',
      lifestyleRecommendations: ['Balanced nutrition', 'Hydration', 'Regular follow-up'],
      published: true
    };
    setEditingItem(newItem);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    let updated: TreatmentItem[];
    const exists = treatments.some((t) => t.id === editingItem.id);
    if (exists) {
      updated = treatments.map((t) => (t.id === editingItem.id ? editingItem : t));
    } else {
      updated = [editingItem, ...treatments];
    }

    const success = await updateSection('treatments', updated);
    setIsSaving(false);
    if (success) {
      setTreatments(updated);
      setEditingItem(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this treatment?')) return;
    const updated = treatments.filter((t) => t.id !== id);
    const success = await updateSection('treatments', updated);
    if (success) {
      setTreatments(updated);
    }
  };

  const togglePublish = async (id: string) => {
    const updated = treatments.map((t) =>
      t.id === id ? { ...t, published: t.published === false ? true : false } : t
    );
    const success = await updateSection('treatments', updated);
    if (success) {
      setTreatments(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Treatments & Conditions Manager</h2>
          <p className="text-xs text-slate-500">
            Add and update medical conditions, symptoms, diagnostics, and clinical approaches
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Condition</span>
        </button>
      </div>

      {/* Treatments List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="p-4">Title & Slug</th>
              <th className="p-4">Category</th>
              <th className="p-4">Symptoms / Diagnostics</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {treatments.map((item) => {
              const catName = categories.find((c) => c.id === item.categoryId)?.name || 'General';
              return (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono">/treatments/{item.slug}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-2xl text-[11px] font-semibold">
                      {catName}
                    </span>
                  </td>
                  <td className="p-4 text-[11px]">
                    <p>{item.symptoms?.length || 0} Symptoms</p>
                    <p className="text-slate-400">{item.diagnosticTests?.length || 0} Diagnostics</p>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(item.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-2xl font-bold text-[10px] cursor-pointer ${
                        item.published !== false
                          ? 'bg-green-100 text-green-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{item.published !== false ? 'Live' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-2xl"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-2xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {treatments.some((t) => t.id === editingItem.id)
                  ? 'Edit Treatment Protocol'
                  : 'Add New Treatment Protocol'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-2xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
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
                    value={editingItem.categoryId}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lucide Icon Name</label>
                  <input
                    type="text"
                    value={editingItem.iconName}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, iconName: e.target.value })
                    }
                    placeholder="Activity, HeartPulse, Stethoscope, etc."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (Cards)</label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.shortDescription}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Clinical Description</label>
                <textarea
                  rows={3}
                  value={editingItem.fullDescription}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, fullDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Symptoms (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingItem.symptoms?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      symptoms: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Excessive thirst, frequent urination, fatigue, blurry vision"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Diagnostic Tests (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingItem.diagnosticTests?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      diagnosticTests: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="HbA1c, Fasting Blood Sugar, Kidney Function Test (KFT)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dr. Puneet's Treatment Approach</label>
                <textarea
                  rows={2}
                  value={editingItem.treatmentApproach || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, treatmentApproach: e.target.value })
                  }
                  placeholder="Root-cause diagnostic workup, individualized pharmacotherapy..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lifestyle Guidance (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingItem.lifestyleRecommendations?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      lifestyleRecommendations: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Low glycemic diet, 30 min brisk walk, monthly sugar log"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
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
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold cursor-pointer"
                >
                  {isSaving ? 'Saving...' : 'Save Condition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
