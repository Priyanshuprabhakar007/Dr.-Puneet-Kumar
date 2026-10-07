import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const { data, currentPath } = useSite();
  const [isOpen, setIsOpen] = useState(false);

  const getMessage = () => {
    if (currentPath.includes('diabetes')) {
      return 'Hello, I would like to book an appointment with Dr. Puneet Kumar regarding diabetes.';
    }
    if (currentPath.includes('thyroid')) {
      return 'Hello, I would like to consult Dr. Puneet Kumar regarding a thyroid problem.';
    }
    if (currentPath.includes('blood-pressure')) {
      return 'Hello, I would like to consult Dr. Puneet Kumar regarding blood pressure management.';
    }
    return 'Hello, I would like to book an appointment with Dr. Puneet Kumar.';
  };

  const cleanNumber = data.settings.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(getMessage());

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">Chat with Clinic Staff</h4>
                <p className="text-[11px] text-green-100">Dr. Puneet Kumar Clinic</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-2xl"
              aria-label="Close WhatsApp chat card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 text-xs text-slate-600 space-y-3">
            <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100">
              <p className="font-medium text-slate-800 mb-1">
                Hello! How can we assist you with your health today?
              </p>
              <p className="text-[11px] text-slate-500">
                You can ask about consultation slots, diabetes reviews, or medical queries.
              </p>
            </div>

            <div className="text-[11px] text-slate-400 text-right">
              Pre-filled inquiry:
            </div>
            <div className="bg-green-50/70 p-2.5 rounded-2xl border border-green-100 text-slate-700 italic text-[11px]">
              "{getMessage()}"
            </div>

            <a
              href={`https://wa.me/${cleanNumber}?text=${encodedMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-2xl text-xs transition-colors shadow-sm"
              id="desktop-whatsapp-start"
            >
              <MessageCircle className="w-4 h-4" />
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-2xl shadow-lg shadow-green-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer font-medium text-sm"
        id="desktop-whatsapp-trigger"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-semibold text-xs tracking-wide">WhatsApp Us</span>
      </button>
    </div>
  );
};
