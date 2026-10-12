import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react';

const achievements = [
  'Gold Medalist (MBBS)',
  'Distinction Holder & University Topper in Pathology during MBBS',
  'University 3rd Rank in ENT during MBBS',
  'Meritorious & Scholarship Holder',
  'Presented Paper and Poster Presentations at medical conferences',
  'Attended conferences on Critical Care, Diabetes and recent advances in Medicine'
];

export const QualificationsSection: React.FC = () => {
  const { data } = useSite();
  const { qualifications } = data;

  const sorted = [...(qualifications || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60" id="qualifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Credentials & Specialization</span>
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold text-slate-900 tracking-tight">
            Qualifications & Medical Training
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Dr. Puneet Kumar completed his MBBS and M.D. Medicine under BFUHS, Faridkot, followed by a Fellowship in Diabetes Mellitus from Medvarsity Apollo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.8, delay: (idx % 6) * 0.1 }}
              key={item.id || idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  {item.year && (
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-2xl">
                      {item.year}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
                  {item.degree}
                </h3>
                <p className="text-xs font-semibold text-blue-700 mb-3">
                  {item.institution}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-green-700">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {item.university
                    ? `University: ${item.university}`
                    : item.accreditation
                    ? `Accredited by: ${item.accreditation}`
                    : 'Verified Medical Qualification'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Academic Achievements Subsection */}
        <div className="mt-16 pt-12 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Academic Achievements
            </h3>
            <p className="text-xs text-slate-500">
              Verified university honors, academic distinctions, and scientific presentations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3 hover:border-slate-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
