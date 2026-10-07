import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { IconRenderer } from '../common/IconRenderer';
import { ScrollReveal } from '../common/ScrollReveal';
import { ArrowRight, ChevronRight, Stethoscope } from 'lucide-react';

export const TreatmentsSection: React.FC = () => {
  const { data, navigate } = useSite();
  const { treatmentCategories, treatments } = data;

  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  const filteredTreatments =
    activeCategoryId === 'all'
      ? (treatments || []).filter((t) => t.published !== false)
      : (treatments || []).filter(
          (t) => t.categoryId === activeCategoryId && t.published !== false
        );

  return (
    <section className="py-24 bg-[#f8fafc]" id="treatments">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <ScrollReveal animation="stagger-container" className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 max-w-3xl">
            <ScrollReveal animation="stagger-item" className="inline-flex items-center gap-3">
              <div className="w-8 h-[1px] bg-blue-600" />
              <p className="text-blue-600 font-extrabold text-[11px] tracking-[0.3em] uppercase">Specialized Pathways</p>
            </ScrollReveal>
            <ScrollReveal animation="stagger-item">
              <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-slate-900 leading-[0.9] tracking-tighter font-display">
                Clinical<br />
                <span className="text-blue-600 italic font-serif font-light">Specialties.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="stagger-item">
              <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-tight">
                Evidence-based diagnostic frameworks and precision therapeutic interventions across core medical disciplines.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="stagger-item" className="flex items-center gap-4">
            <button
              onClick={() => navigate('/treatments')}
              className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-900 font-extrabold rounded-2xl transition-all active:scale-95 shadow-sm"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal animation="fade" delay={0.2} className="flex items-center gap-3 overflow-x-auto pb-8 mb-12 scrollbar-none no-scrollbar">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={`px-8 py-3.5 rounded-2xl text-xs font-black tracking-widest uppercase transition-all whitespace-nowrap ${
              activeCategoryId === 'all'
                ? 'bg-slate-900 text-white shadow-xl scale-105'
                : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            All Disciplines
          </button>
          {(treatmentCategories || []).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-8 py-3.5 rounded-2xl text-xs font-black tracking-widest uppercase transition-all whitespace-nowrap ${
                activeCategoryId === cat.id
                  ? 'bg-slate-900 text-white shadow-xl scale-105'
                  : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </ScrollReveal>

        {/* Treatments Grid */}
        <ScrollReveal animation="stagger-container" staggerChildren={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment, idx) => {
            const categoryName =
              (treatmentCategories || []).find((c) => c.id === treatment.categoryId)?.name ||
              'Internal Medicine';

            return (
              <ScrollReveal key={treatment.id} animation="stagger-item">
                <div
                  onClick={() => navigate(`/treatments/${treatment.slug}`)}
                  className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                {/* Decorative background element */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm">
                      <IconRenderer name={treatment.iconName} className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {categoryName}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-blue-700 transition-colors font-display">
                      {treatment.title}
                    </h3>
                    <p className="text-base text-slate-500 font-medium leading-relaxed tracking-tight line-clamp-3">
                      {treatment.shortDescription}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      Explore Diagnostic Path
                    </span>
                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
};

