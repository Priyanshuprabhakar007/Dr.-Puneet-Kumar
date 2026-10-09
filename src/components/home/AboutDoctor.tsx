import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  CheckCircle2,
  ArrowRight,
  Award,
  Users,
  Building2
} from 'lucide-react';

export const AboutDoctor: React.FC = () => {
  const { data, navigate } = useSite();
  const { doctorProfile } = data;

  const highlights = [
    { label: 'Experience', value: '15+ Years', icon: Award },
    { label: 'Patients Treated', value: '15,000+', icon: Users },
    { label: 'Hospital Networks', value: 'Top Tier', icon: Building2 },
  ];

  const competencies = [
    "Comprehensive Diabetes Management",
    "Hypertension & Cardiac Screening",
    "Thyroid & Endocrine Care",
    "Metabolic Disorder Protocols",
    "Infectious Disease Treatments",
    "Chronic Disease Management"
  ];

  return (
    <section className="py-24 bg-white overflow-hidden" id="about-doctor">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Image side */}
          <ScrollReveal animation="clip" className="relative">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-700" />
              <img
                src={doctorProfile.photoUrl}
                alt={doctorProfile.name}
                className="w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Trust Badge */}
            <div className="absolute -bottom-8 -right-8 p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl hidden md:block border-8 border-white">
              <div className="space-y-1">
                <p className="text-5xl font-black font-display tracking-tighter">15+</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Years Clinical<br />Practice</p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10" />
          </ScrollReveal>

          {/* Content side */}
          <ScrollReveal animation="stagger-container" className="space-y-12">
            <div className="space-y-6">
              <ScrollReveal animation="stagger-item" className="inline-flex items-center gap-3">
                <div className="w-8 h-[1px] bg-blue-600" />
                <p className="text-blue-600 font-extrabold text-[11px] tracking-[0.3em] uppercase">Clinical Excellence</p>
              </ScrollReveal>
              
              <ScrollReveal animation="stagger-item">
                <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-slate-900 leading-[0.9] tracking-tighter font-display">
                  Treating Patients<br />
                  <span className="text-blue-600 italic font-serif font-light">with Empathy.</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal animation="stagger-item">
                <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed tracking-tight max-w-xl">
                  Dr. Puneet Kumar specializes in complex internal medicine cases and advanced diabetology. With over 15 years of clinical experience, his approach focuses on evidence-based protocols and individualized patient journeys.
                </p>
              </ScrollReveal>
            </div>

            {/* Highlights Grid */}
            <ScrollReveal animation="stagger-item" className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-y border-slate-100">
              {highlights.map((h, i) => (
                <div key={i} className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <h.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{h.value}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.label}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>

            {/* Competencies */}
            <ScrollReveal animation="stagger-item" className="space-y-6">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Specialized Pathways</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {competencies.map((c, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors" />
                    <span className="text-slate-700 font-bold text-sm tracking-tight">{c}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal animation="stagger-item" className="flex flex-wrap items-center gap-6 pt-6">
              <button
                onClick={() => navigate('/about')}
                className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              >
                Full Physician Profile
              </button>
              <button
                onClick={() => navigate('/treatments')}
                className="group flex items-center gap-3 px-10 py-5 bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-900 font-extrabold rounded-2xl transition-all active:scale-95"
              >
                <span>View Clinical Specialties</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
