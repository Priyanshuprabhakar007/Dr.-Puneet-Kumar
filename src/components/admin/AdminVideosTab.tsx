import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { VideoItem } from '../../types';
import { Plus, Trash2, Edit2, Play, X, Save } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminVideosTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [videos, setVideos] = useState<VideoItem[]>(data.videos || []);
  const [editingItem, setEditingItem] = useState<VideoItem | null>(null);

  const handleCreate = () => {
    setEditingItem({
      id: `vid-${Date.now()}`,
      title: 'New Clinical Health Video',
      category: 'Diabetes',
      duration: '4:15',
      description: 'Educational briefing by Dr. Puneet Kumar on daily management.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      order: videos.length + 1
    });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updated: VideoItem[];
    if (videos.some((v) => v.id === editingItem.id)) {
      updated = videos.map((v) => (v.id === editingItem.id ? editingItem : v));
    } else {
      updated = [editingItem, ...videos];
    }
    setVideos(updated);
    await updateSection('videos', updated);
    setEditingItem(null);
    showToast('Video list updated!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    await updateSection('videos', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Health Video Guides & Education</h2>
          <p className="text-xs text-slate-500">Manage Dr. Puneet Kumar’s video briefings and tutorials</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 bg-slate-900">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {vid.category}
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {vid.duration}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">{vid.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <a
                href={vid.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline font-semibold"
              >
                Watch Link
              </a>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingItem(vid)}
                  className="p-1 text-blue-700 hover:bg-blue-50 rounded"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(vid.id)}
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
              <h3 className="text-base font-bold text-slate-900">Edit Video Details</h3>
              <button onClick={() => setEditingItem(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  >
                    <option value="Diabetes">Diabetes</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="Thyroid">Thyroid</option>
                    <option value="General Health">General Health</option>
                    <option value="Infections">Infections</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingItem.duration}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, duration: e.target.value })
                    }
                    placeholder="e.g. 5:20"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
              </div>

              <div>
                <ImageUploadField
                  label="Video Thumbnail Image"
                  value={editingItem.thumbnailUrl}
                  onChange={(val) => setEditingItem({ ...editingItem, thumbnailUrl: val })}
                  category="General"
                  helperText="Upload a 16:9 poster preview or enter an image URL."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Video / YouTube URL</label>
                <input
                  type="text"
                  value={editingItem.videoUrl}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, videoUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl mt-2"
              >
                Save Video
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
