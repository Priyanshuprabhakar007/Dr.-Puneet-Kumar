import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const { data, openAppointmentModal, currentPath } = useSite();

  // Generate contextual WhatsApp message based on page
  const getWhatsAppMessage = () => {
    if (currentPath.includes('/treatments/diabetes-management') || currentPath === '/diabetes-care') {
      return encodeURIComponent(
        `Hello Dr. Puneet Kumar Clinic, I would like to book an appointment regarding Diabetes Care & HbA1c control.`
      );
    }
    if (currentPath.includes('/treatments/high-blood-pressure')) {
      return encodeURIComponent(
        `Hello Dr. Puneet Kumar Clinic, I would like to consult regarding High Blood Pressure (Hypertension).`
      );
    }
    if (currentPath.includes('/treatments/thyroid-disorders')) {
      return encodeURIComponent(
        `Hello Dr. Puneet Kumar Clinic, I would like to consult Dr. Puneet Kumar regarding a thyroid problem.`
      );
    }
    return encodeURIComponent(
      `Hello, I would like to book an appointment with Dr. Puneet Kumar (Senior Physician & Diabetes Specialist).`
    );
  };

  const cleanWhatsAppNumber = data.settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="lg:hidden fixed bottom-6 left-6 right-6 z-40 bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-900/40 p-2 overflow-hidden border border-white/10"
    >
      <div className="grid grid-cols-3 gap-2">
        {/* Call button */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={`tel:${data.settings.primaryPhone}`}
          className="flex flex-col items-center justify-center py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all"
        >
          <Phone className="w-4 h-4 text-blue-400 mb-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">Call</span>
        </motion.a>

        {/* WhatsApp button */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={`https://wa.me/${cleanWhatsAppNumber}?text=${getWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-4 rounded-2xl bg-green-600/90 hover:bg-green-600 text-white transition-all shadow-xl shadow-green-900/20"
        >
          <MessageCircle className="w-4 h-4 text-white mb-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
        </motion.a>

        {/* Book Appointment button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => openAppointmentModal()}
          className="flex flex-col items-center justify-center py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xl shadow-blue-900/20"
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">Book</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

