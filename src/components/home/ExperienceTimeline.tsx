import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Building2, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { data } = useSite();
  const { experience } = data;

  const activeExperiences = (experience || [])
    .filter((e) => e.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="py-20 bg-white border-b border-slate-200/60" id="experience">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Hospital Leadership & Associations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clinical Experience Timeline
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Over a decade of senior clinical appointments across Mohali’s premier tertiary care networks before establishing an independent diabetes & physician clinic.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-blue-100 ml-4 sm:ml-8 space-y-10">
          {activeExperiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Marker */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-2xl bg-white border-2 border-blue-600 flex items-center justify-center text-blue-700 shadow-sm group-hover:scale-110 group-hover:bg-blue-50 transition-all shrink-0">
                <Building2 className="w-4 h-4" />
              </div>

              {/* Card */}
              <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 transition-all shadow-2xs hover:shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {exp.hospital}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-2xl border border-blue-200/60 w-max">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-blue-700 mb-3">
                  {exp.designation}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
