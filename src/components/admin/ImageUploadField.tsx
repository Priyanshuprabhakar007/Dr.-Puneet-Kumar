import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { compressImage } from '../../utils/imageUtils';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (base64Str: string) => void;
  helperText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ label, value, onChange, helperText }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate it's an image
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const result = reader.result as string;
          // Compress image before passing to parent
          const compressed = await compressImage(result);
          onChange(compressed);
        } catch (err) {
          console.error('Image processing error:', err);
          alert('Failed to process image. Please try a different one.');
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block font-bold text-slate-700 mb-1">{label}</label>
      <div className="flex items-center gap-4">
        {value ? (
          <img 
            src={value} 
            alt="Preview" 
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-slate-400" />
          </div>
        )}
        
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex gap-2">
             <button 
               type="button" 
               onClick={() => fileInputRef.current?.click()}
               disabled={isProcessing}
               className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 text-blue-700 font-semibold text-[11px] rounded-2xl border border-blue-200 transition-colors"
             >
               {isProcessing ? (
                 <Loader2 className="w-3.5 h-3.5 animate-spin" />
               ) : (
                 <Upload className="w-3.5 h-3.5" />
               )}
               <span>{isProcessing ? 'Processing...' : 'Upload Image from Device'}</span>
             </button>
             {value && (
               <input 
                 type="text" 
                 value={value.length > 200 ? "Base64 Image Data..." : value}
                 readOnly
                 className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] text-slate-400 cursor-not-allowed"
               />
             )}
          </div>
          {helperText && <p className="text-[10px] text-slate-500 mt-1">{helperText}</p>}
        </div>
      </div>
    </div>
  );
};
