import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { MediaAsset } from '../../types';
import { Plus, Image, Copy, Trash2, CheckCircle2, X } from 'lucide-react';

export const AdminMediaTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [media, setMedia] = useState<MediaAsset[]>(data.media || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newAsset, setNewAsset] = useState<Partial<MediaAsset>>({
    title: 'Clinic Photo',
    url: '',
    altText: 'Doctor Clinic OPD',
    category: 'Doctor'
  });

  const handleCopyUrl = (url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Image URL copied to clipboard!', 'success');
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.url) return;

    const created: MediaAsset = {
      id: `media-${Date.now()}`,
      title: newAsset.title || 'New Media',
      url: newAsset.url,
      altText: newAsset.altText || 'Medical Photo',
      category: (newAsset.category as any) || 'General',
      createdAt: new Date().toISOString()
    };

    const updated = [created, ...media];
    setMedia(updated);
    await updateSection('media', updated);
    setIsAddModalOpen(false);
    setNewAsset({ title: '', url: '', altText: '', category: 'Doctor' });
    showToast('Media added to library!', 'success');
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Remove image from library?')) return;
    const updated = media.filter((m) => m.id !== id);
    setMedia(updated);
    await updateSection('media', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Media & Photography Library</h2>
          <p className="text-xs text-slate-500">
            View and manage clinic photos, doctor portraits, and medical graphics
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media URL</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group flex flex-col justify-between"
          >
            <div className="aspect-square bg-slate-100 relative overflow-hidden">
              <img
                src={item.url}
                alt={item.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>

            <div className="p-3 text-xs space-y-2">
              <p className="font-bold text-slate-800 truncate">{item.title}</p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <button
                  onClick={() => handleCopyUrl(item.url)}
                  className="text-blue-700 hover:underline text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy URL</span>
                </button>
                <button
                  onClick={() => handleDeleteMedia(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Image to Library</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={newAsset.title}
                  onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                  placeholder="e.g. Dr. Puneet OPD Clinic"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={newAsset.url}
                  onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Treatments">Treatments</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alt Text (Accessibility)</label>
                  <input
                    type="text"
                    value={newAsset.altText}
                    onChange={(e) => setNewAsset({ ...newAsset, altText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl mt-2"
              >
                Add Image
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
