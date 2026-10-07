import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { IconRenderer } from '../common/IconRenderer';
import { ScrollReveal } from '../common/ScrollReveal';
import { Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export const DiabetesCareSection: React.FC = () => {
  const { data, openAppointmentModal, navigate } = useSite();
  const { diabetesServices } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: 'spring', bounce: 0.4, duration: 0.8 } 
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden" id="diabetes-care">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <ScrollReveal animation="stagger-container" className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <ScrollReveal animation="stagger-item" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold tracking-wide">
            <Activity className="w-3.5 h-3.5" />
            <span>Specialized Clinical Diabetology</span>
          </ScrollReveal>
          <ScrollReveal animation="stagger-item">
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight text-white leading-tight font-display">
              Comprehensive Diabetes Care
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="stagger-item">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Diabetes is not merely an elevated blood sugar number—it is a vascular condition requiring multi-organ preservation. Dr. Puneet Kumar provides advanced glycemic stabilization and personalized complication defense.
            </p>
          </ScrollReveal>
        </ScrollReveal>

        {/* Services Cards Grid with Staggered Entrance */}
        <ScrollReveal animation="stagger-container" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(diabetesServices || []).map((service, idx) => (
            <ScrollReveal key={service.id} animation="stagger-item" className="h-full">
              <div className="h-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 hover:shadow-blue-500/10 hover:-translate-y-1 rounded-3xl p-6 md:p-8 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6 shadow-sm"
                >
                  <IconRenderer name={service.iconName} className="w-7 h-7" />
                </motion.div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-3 font-display">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>
                
                {service.keyHighlights && service.keyHighlights.length > 0 && (
                  <ul className="space-y-2 border-t border-slate-700/50 pt-4">
                    {(service.keyHighlights || []).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-700/50">
                <button
                  onClick={() => openAppointmentModal(`Diabetes Care: ${service.title}`)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-700/50 hover:bg-blue-600 text-sm font-bold text-blue-300 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Book for this Concern</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </ScrollReveal>

        {/* Big Central CTA */}
        <ScrollReveal
          animation="slide"
          delay={0.2}
          className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-900/40 via-slate-800 to-blue-900/40 border border-blue-500/20 text-center space-y-6 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Decorative shine in CTA */}
          <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display relative z-10">
            Take Control of Your Diabetes Today
          </h3>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed relative z-10">
            Schedule a comprehensive metabolic audit with Dr. Puneet Kumar to evaluate your HbA1c, review medication tolerability, and protect your kidneys, heart, and nerves.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openAppointmentModal('Comprehensive Diabetes Review')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
            >
              Consult for Diabetes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/diabetes-care')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/10 transition-all backdrop-blur-sm"
            >
              Learn About Services
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
