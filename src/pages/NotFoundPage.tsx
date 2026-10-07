import React from 'react';
import { useSite } from '../context/SiteContext';
import { Stethoscope, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useSite();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-20 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Stethoscope className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Page Not Found</h1>
          <p className="text-sm text-slate-600">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl transition-colors text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
