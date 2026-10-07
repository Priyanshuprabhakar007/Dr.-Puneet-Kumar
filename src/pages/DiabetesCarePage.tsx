import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { IconRenderer } from '../components/common/IconRenderer';
import {
  Activity,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  HeartPulse,
  Droplet,
  ArrowRight,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export const DiabetesCarePage: React.FC = () => {
  const { data, openAppointmentModal, navigate } = useSite();
  const { diabetesServices, doctorProfile } = data;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }} className="bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/10 rounded-2xl blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>Apex Metabolic & Diabetology Division</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Advanced Clinical Diabetes Care & Complication Defense
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Supervised by Dr. Puneet Kumar (MD Medicine, Fellowship in Diabetes Mellitus). Moving beyond arbitrary blood sugar numbers to preserve cardiovascular, renal, and neurological health.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => openAppointmentModal('Specialized Diabetes Consultation')}
                className="px-6 py-3.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                Schedule Diabetes Review
              </button>

              <button
                onClick={() => navigate('/treatments/diabetes-management')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-2xl border border-white/20 transition-all cursor-pointer"
              >
                View Detailed Protocol
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* The 4 Pillars of Dr. Puneet's Diabetology Practice */}
      <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.15, duration: 0.9 }} className="py-16 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              The 4 Pillars of Effective Diabetes Management
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              How our clinical practice achieves consistent long-term HbA1c reduction without debilitating hypoglycemia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">Continuous Monitoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sensor-based CGMS assessments to detect asymptomatic nocturnal hypoglycemia and post-meal glucose spikes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">Organ-Protective Rx</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern SGLT2 inhibitors and GLP-1 receptor agonists prioritizing cardiac and kidney preservation beyond simple glycemic drop.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base">Annual Complication Screen</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured microalbuminuria urine tests, retinal fundus evaluations, and 10g monofilament peripheral nerve tests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-base">Sustainable Nutrition</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Culturally appropriate North Indian dietary titration tailored to daily chapati, dal, and vegetable habits without starvation.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Comprehensive Diabetes Services Grid */}
      <motion.section initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.25, duration: 0.7 }} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Clinical Spectrum</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Conditions We Treat in Diabetology
            </h2>
            <p className="text-sm text-slate-600">
              Personalized therapeutic blueprints for every stage of glycemic dysregulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diabetesServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                    <IconRenderer name={service.iconName} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {service.keyHighlights && (
                    <ul className="space-y-1.5 border-t border-slate-100 pt-3">
                      {service.keyHighlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => openAppointmentModal(`Diabetes Care: ${service.title}`)}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-white font-semibold text-xs rounded-2xl transition-colors"
                  >
                    Consult for {service.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* HbA1c Target Guide Table */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.2, duration: 0.8 }} className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">
              Understanding Your HbA1c Score
            </h3>
            <p className="text-sm text-slate-600">
              HbA1c reflects your average blood glucose over the past 90 days.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">HbA1c Range</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Estimated Average Glucose</th>
                  <th className="p-4">Clinical Action Recommended</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-4 font-bold text-green-700">&lt; 5.7%</td>
                  <td className="p-4 font-semibold text-slate-800">Normal</td>
                  <td className="p-4">Below 115 mg/dL</td>
                  <td className="p-4 text-xs">Annual preventive health checkup.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-600">5.7% – 6.4%</td>
                  <td className="p-4 font-semibold text-slate-800">Prediabetes</td>
                  <td className="p-4">117 – 137 mg/dL</td>
                  <td className="p-4 text-xs">High reversal potential with lifestyle intervention.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-rose-600">6.5% – 7.5%</td>
                  <td className="p-4 font-semibold text-slate-800">Controlled Diabetes</td>
                  <td className="p-4">140 – 169 mg/dL</td>
                  <td className="p-4 text-xs">Continue maintenance regimen, quarterly surveillance.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-700">&gt; 7.5%</td>
                  <td className="p-4 font-semibold text-slate-800">Uncontrolled Diabetes</td>
                  <td className="p-4">&gt; 170 mg/dL</td>
                  <td className="p-4 text-xs font-semibold text-red-700">Requires immediate therapy review to avoid microvascular complications.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => openAppointmentModal('HbA1c Evaluation')}
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-2xl shadow-xs"
            >
              Discuss Your HbA1c Report with Dr. Puneet
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
