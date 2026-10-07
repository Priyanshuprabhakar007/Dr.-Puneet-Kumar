import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { Users, Award, ShieldCheck, Activity } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const { data } = useSite();

  const metrics = [
    {
      icon: Users,
      value: data.doctorProfile.patientsTreated || '25,000+',
      label: 'Patients Treated',
      subtext: 'Across Mohali & Tricity'
    },
    {
      icon: Award,
      value: `${data.doctorProfile.experienceYears}+ Years`,
      label: 'Clinical Experience',
      subtext: 'Tertiary Care Mastery'
    },
    {
      icon: Activity,
      value: '95%+',
      label: 'HbA1c Target Success',
      subtext: 'Proven Outcomes'
    },
    {
      icon: ShieldCheck,
      value: 'MD Medicine',
      label: 'Specialized Expert',
      subtext: 'Advanced Credentials'
    }
  ];

  return (
    <section className="bg-slate-900 py-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex items-start sm:items-center lg:items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[clamp(1.75rem,4vw,2.25rem)] font-black text-white tracking-tight font-display group-hover:text-blue-400 transition-colors leading-none">
                      {m.value}
                    </h3>
                    <p className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                      {m.label}
                    </p>
                    <p className="text-xs text-slate-500 font-medium italic">
                      {m.subtext}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

