import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { DiabetesServiceItem } from '../../types';
import { Plus, Trash2, Edit2, X, Save, Activity } from 'lucide-react';

export const AdminDiabetesTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [services, setServices] = useState<DiabetesServiceItem[]>(data.diabetesServices);
  const [editingItem, setEditingItem] = useState<DiabetesServiceItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = () => {
    const newItem: DiabetesServiceItem = {
      id: `diab-${Date.now()}`,
      title: 'New Diabetes Protocol',
      iconName: 'Activity',
      description: 'Specialized clinical evaluation and complication mitigation.',
      keyHighlights: ['Personalized HbA1c Goal', 'Preventive Surveillance']
    };
    setEditingItem(newItem);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    let updated: DiabetesServiceItem[];
    if (services.some((s) => s.id === editingItem.id)) {
      updated = services.map((s) => (s.id === editingItem.id ? editingItem : s));
    } else {
      updated = [editingItem, ...services];
    }

    setServices(updated);
    await updateSection('diabetesServices', updated);
    setIsSaving(false);
    setEditingItem(null);
    showToast('Diabetes services updated!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this diabetes service card?')) return;
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    await updateSection('diabetesServices', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Diabetes Services & Programs</h2>
          <p className="text-xs text-slate-500">
            Manage the specialized diabetology cards displayed in the Diabetes Care section
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Diabetes Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {svc.iconName}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem(svc)}
                    className="p-1 text-blue-700 hover:bg-blue-50 rounded"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(svc.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-sm mb-1.5">{svc.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{svc.description}</p>

              {svc.keyHighlights && (
                <div className="space-y-1 text-[11px] text-slate-500">
                  {svc.keyHighlights.map((hl, i) => (
                    <p key={i}>• {hl}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Diabetes Service</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Title *</label>
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
                <label className="block font-bold text-slate-700 mb-1">Lucide Icon Name</label>
                <input
                  type="text"
                  value={editingItem.iconName}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, iconName: e.target.value })
                  }
                  placeholder="Activity, Droplet, HeartPulse, Sparkles"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Key Highlights (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingItem.keyHighlights?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      keyHighlights: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                    })
                  }
                  placeholder="Sensor glucose tracing, Hypoglycemia rescue protocols"
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
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold"
                >
                  {isSaving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
