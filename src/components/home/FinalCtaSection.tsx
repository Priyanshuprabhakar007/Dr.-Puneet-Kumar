import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { Calendar, Phone, MessageCircle, HeartHandshake } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { data, openAppointmentModal } = useSite();
  const { settings } = data;
  
  const cleanWhatsApp = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    'Hello, I would like to schedule an in-clinic consultation with Dr. Puneet Kumar.'
  );

  return (
    <section className="py-20 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-700 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-2xl blur-3xl pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: "spring", bounce: 0.15, duration: 0.9 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-white/15 border border-white/20 text-blue-100 text-xs font-semibold backdrop-blur-xs">
          <HeartHandshake className="w-4 h-4 text-blue-300" />
          <span>Patient-Centered Clinical Dedication</span>
        </div>
        
        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Prioritise Your Health With Expert Medical Care
        </h2>
        
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
          Whether you need structured diabetes management, cardiovascular risk reduction, or reliable diagnosis for persistent symptoms, Dr. Puneet Kumar is here to guide your recovery.
        </p>
        
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => openAppointmentModal()}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-blue-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            id="final-book-btn"
          >
            <Calendar className="w-4 h-4 text-blue-700" />
            <span>Book Doctor Consultation</span>
          </button>
          
          <a
            href={`tel:${settings.primaryPhone}`}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-blue-900/60 hover:bg-blue-900/80 text-white font-semibold text-sm border border-white/30 backdrop-blur-xs transition-all cursor-pointer hover:scale-105"
            id="final-call-btn"
          >
            <Phone className="w-4 h-4 text-blue-300" />
            <span>Call: {settings.primaryPhone}</span>
          </a>
          
          <a
            href={`https://wa.me/${cleanWhatsApp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-105"
            id="final-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Clinic</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
