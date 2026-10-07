import React from 'react';
import { useSite } from '../../context/SiteContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useSite();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-green-800 text-white border-green-700 shadow-green-900/20',
    error: 'bg-rose-800 text-white border-rose-700 shadow-rose-900/20',
    info: 'bg-blue-800 text-white border-blue-700 shadow-blue-900/20'
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    error: AlertTriangle,
    info: Info
  }[toast.type];

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-200">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl shadow-xl border text-sm font-medium ${bgStyles}`}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span className="flex-1 leading-snug">{toast.message}</span>
        <button
          onClick={clearToast}
          className="text-white/80 hover:text-white p-1 rounded-2xl hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
