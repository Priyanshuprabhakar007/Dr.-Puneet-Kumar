import React from 'react';
import {
  FileText,
  Activity,
  HeartPulse,
  ShieldCheck,
  Compass,
  Users,
  Sparkles
} from 'lucide-react';

export const WhyChooseDrPuneet: React.FC = () => {
  const points = [
    {
      title: 'Personalised Treatment Plans',
      description:
        'No copy-paste prescriptions. Every medication regimen is tailored to your unique metabolic profile, lifestyle, and individual goals.',
      icon: FileText,
      color: 'sky'
    },
    {
      title: 'Comprehensive Medical Care',
      description:
        'Holistic internal medicine evaluation addressing root causes rather than merely masking isolated acute symptoms.',
      icon: Activity,
      color: 'teal'
    },
    {
      title: 'Diabetes-Focused Expertise',
      description:
        'Fellowship-trained diabetologist offering continuous glucose monitoring (CGM), insulin titration, and organ-protection therapies.',
      icon: HeartPulse,
      color: 'indigo'
    },
    {
      title: 'Chronic Disease Management',
      description:
        'Structured long-term roadmaps for hypertension, thyroid imbalances, dyslipidemia, and cardiorenal preservation.',
      icon: ShieldCheck,
      color: 'emerald'
    },
    {
      title: 'Preventive Health Guidance',
      description:
        'Proactive complication screening, annual health audits, adult vaccinations, and science-backed nutritional coaching.',
      icon: Compass,
      color: 'cyan'
    },
    {
      title: 'Patient-Centred Approach',
      description:
        'Unhurried clinical consultations with empathetic listening, clear explanations, and active therapeutic partnership.',
      icon: Users,
      color: 'blue'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60" id="why-choose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Patient-First Philosophy</span>
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold text-slate-900 tracking-tight">
            Why Choose Dr. Puneet Kumar
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Independent clinical excellence built on evidence-based medicine, meticulous diagnostics, and genuine respect for every patient’s journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {pt.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
