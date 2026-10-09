import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Upload, Loader2, Link as LinkIcon, FolderOpen, X, Check } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  category?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  category = 'General'
}) => {
  const { data, showToast, registerUploadedMedia } = useSite();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Validate mime type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validMimes.includes(file.type.toLowerCase())) {
      const err = 'Please select a valid JPG, PNG, or WEBP image.';
      setUploadError(err);
      showToast(err, 'error');
      return;
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      const err = 'Image size exceeds 5MB. Please choose a smaller image.';
      setUploadError(err);
      showToast(err, 'error');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to upload image to server');
      }

      onChange(result.url);
      if (result.media) {
        registerUploadedMedia(result.media);
      }
      showToast('Image uploaded and saved successfully!', 'success');
    } catch (err: any) {
      console.error('Image upload error:', err);
      const msg = err.message || 'Image upload failed. Please try again.';
      setUploadError(msg);
      showToast(msg, 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const availableMedia = data.media || [];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-slate-700 text-xs">{label}</label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-red-600 hover:text-red-700 font-medium"
          >
            Clear image
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Preview Thumbnail */}
        <div className="relative group shrink-0">
          {value ? (
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-100 relative">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                }}
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Action Controls & Input */}
        <div className="flex-1 w-full space-y-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-2xl border border-blue-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{isUploading ? 'Uploading to Storage...' : 'Upload from Device'}</span>
            </button>

            {availableMedia.length > 0 && (
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-2xl border border-slate-200 transition-colors cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Media Library</span>
              </button>
            )}
          </div>

          {/* URL text input */}
          <div className="relative flex items-center">
            <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... or /uploads/..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-mono text-slate-700 placeholder:font-sans focus:bg-white focus:outline-blue-600"
            />
          </div>

          {uploadError && <p className="text-[11px] text-red-600 font-medium">{uploadError}</p>}
          {helperText && <p className="text-[10px] text-slate-500">{helperText}</p>}
        </div>
      </div>

      {/* Media Library Picker Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Select Image from Media Library</h3>
                <p className="text-[11px] text-slate-500">Click any saved image to apply it to this field</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
              {availableMedia.map((m) => {
                const isSelected = value === m.url;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onChange(m.url);
                      setIsPickerOpen(false);
                    }}
                    className={`relative rounded-2xl overflow-hidden border text-left p-1.5 transition-all group cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500 bg-blue-50/30'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative mb-1.5">
                      <img
                        src={m.url}
                        alt={m.altText || m.name || m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-blue-700 text-white rounded-full p-1 shadow-sm">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-slate-800 truncate px-1">{m.name || m.title}</p>
                    <span className="text-[9px] text-slate-400 px-1 block">{m.category}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-2xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
