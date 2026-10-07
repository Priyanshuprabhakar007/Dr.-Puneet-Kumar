import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  Calendar, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Stethoscope, 
  Hospital, 
  GraduationCap, 
  Award,
  MapPin, 
  Activity, 
  ArrowRight,
  Building2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, openAppointmentModal } = useSite();
  const { hero, settings } = data;
  const { scrollY } = useScroll();
  
  // Subtle parallax values
  const yImage = useTransform(scrollY, [0, 800], [0, 40]);
  const yContent = useTransform(scrollY, [0, 800], [0, -25]);
  const opacityBg = useTransform(scrollY, [0, 600], [1, 0.4]);

  // Use the provided photo (supporting both URLs and base64) or a high-quality fallback
  const photoUrl = hero.doctorPhotoUrl && (hero.doctorPhotoUrl.startsWith('data:') || hero.doctorPhotoUrl.includes('.') || hero.doctorPhotoUrl.length > 100)
    ? hero.doctorPhotoUrl 
    : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop';

  return (
    <section className="relative lg:min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900" id="hero">
      {/* Background/Top Image Area */}
      <motion.div 
        className="relative lg:absolute lg:inset-0 h-[50vh] lg:h-full z-0 select-none overflow-hidden pt-20 lg:pt-0"
        style={{ y: yImage, opacity: opacityBg }}
      >
        <img 
          src={photoUrl} 
          alt={data.doctorProfile.name}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[75%_35%] sm:object-right lg:object-[85%_center] lg:opacity-80 transition-all duration-1000 brightness-[1.05] contrast-[1.05]"
        />
        {/* Gradients */}
        {/* Desktop: Strong left shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10 hidden lg:block" />
        {/* Mobile: Bottom fade-out for image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900 z-10 lg:hidden" />
      </motion.div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto lg:px-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:min-h-[calc(100vh-80px)]">
          {/* Content Panel (Stacked below image on mobile) */}
          <motion.div 
            style={{ y: yContent }}
            className="bg-slate-900 lg:bg-transparent px-6 py-12 lg:py-24 space-y-8 lg:space-y-10 max-w-2xl"
          >
            {/* Eyebrow / Specialty Label */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <p className="text-teal-400 font-bold text-[11px] tracking-[0.2em] uppercase">
                {hero.smallHeading || 'Senior Physician & Diabetes Specialist'}
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2.25rem,7vw,5.5rem)] font-bold text-white leading-[1.1] tracking-tight"
            >
              Helping You<br className="lg:hidden" />
              <span className="sm:inline"> Live Better,</span><br />
              <span className="text-teal-400">Beyond Diabetes.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-base lg:text-xl font-medium leading-relaxed max-w-xl opacity-90"
            >
              {hero.supportingCopy || 'Personalised care for diabetes, obesity, hypertension, thyroid disorders, infections, respiratory conditions, and a wide range of general medical concerns with a patient-first ethos.'}
            </motion.p>

            {/* Doctor Info Block */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 pt-4"
            >
              <div className="space-y-1">
                <h3 className="text-2xl lg:text-4xl font-bold text-white tracking-tight leading-none">
                  {data.doctorProfile.name}
                </h3>
                <p className="text-teal-400 font-bold text-sm lg:text-lg tracking-wide uppercase">
                  {data.doctorProfile.designation}
                </p>
              </div>
              
              {/* Practice Locations */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-2">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
                    <Building2 className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">Aggarwal Clinic</span>
                </div>

                <div className="hidden sm:block h-5 w-px bg-white/20"></div>

                <div className="flex items-center gap-2.5 text-slate-200">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
                    <Hospital className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">Livasa Hospital Mohali</span>
                </div>
              </div>
            </motion.div>

            {/* Action Button - Primary Book Appointment only for mobile content area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <button 
                onClick={openAppointmentModal}
                className="w-full lg:w-max flex items-center justify-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-base rounded-2xl transition-all active:scale-95 shadow-xl shadow-teal-900/20"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Now</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Spacer for desktop background clarity */}
          <div className="hidden lg:block h-full min-h-[500px]" />
        </div>
      </div>
    </section>
  );
};
