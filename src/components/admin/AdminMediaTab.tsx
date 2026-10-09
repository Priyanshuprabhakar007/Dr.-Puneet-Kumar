import React, { useRef, useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { MediaAsset } from '../../types';
import { Plus, Copy, Trash2, Upload, X, Loader2 } from 'lucide-react';

export const AdminMediaTab: React.FC = () => {
  const { data, showToast, addMedia, deleteMedia, registerUploadedMedia } = useSite();
  const [media, setMedia] = useState<MediaAsset[]>(data.media || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMedia(data.media || []);
  }, [data.media]);

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

  const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validMimes.includes(file.type.toLowerCase())) {
      showToast('Please select a valid JPG, PNG, or WEBP image.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size exceeds 5MB limit.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));
      formData.append('category', newAsset.category || 'General');

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      const created: MediaAsset = result.media || {
        id: `media-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        url: result.url,
        altText: file.name.replace(/\.[^/.]+$/, ''),
        category: (newAsset.category as any) || 'General',
        createdAt: new Date().toISOString()
      };

      // Update state without duplicate database writes
      registerUploadedMedia(created);
      setMedia((prev) => [created, ...prev]);
      showToast('Image uploaded and added to Media Library!', 'success');
    } catch (err: any) {
      console.error('Direct media upload error:', err);
      showToast(err.message || 'Image upload failed.', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.url) return;

    const success = await addMedia({
      name: newAsset.title || 'New Media',
      url: newAsset.url,
      altText: newAsset.altText || newAsset.title || 'Medical Photo',
      category: (newAsset.category as any) || 'General'
    });

    if (success) {
      setIsAddModalOpen(false);
      setNewAsset({ title: 'Clinic Photo', url: '', altText: 'Doctor Clinic OPD', category: 'Doctor' });
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Remove image from library?')) return;
    const ok = await deleteMedia(id);
    if (ok) {
      setMedia((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Media &amp; Photography Library</h2>
          <p className="text-xs text-slate-500">
            View, upload, and organize clinic photos, doctor portraits, and medical banners
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            ref={fileInputRef}
            onChange={handleDirectFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add External URL</span>
          </button>
        </div>
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
                alt={item.altText || item.title || item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                }}
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>

            <div className="p-3 text-xs space-y-2">
              <p className="font-bold text-slate-800 truncate">{item.title || item.name}</p>
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
                  title="Delete media"
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
              <h3 className="text-base font-bold text-slate-900">Add Image URL to Library</h3>
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
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl mt-2 cursor-pointer"
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
