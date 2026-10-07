import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  ArrowRight, 
  Activity, 
  Thermometer, 
  Wind, 
  Zap, 
  Stethoscope, 
  Droplets,
  Heart,
  Brain,
  ShieldCheck,
  Search
} from 'lucide-react';

export const ConditionFinder: React.FC = () => {
  const { navigate } = useSite();

  const symptoms = [
    { title: "High Blood Sugar", icon: Activity, desc: "Persistent high glucose levels" },
    { title: "Chronic Fever", icon: Thermometer, desc: "Recurring or persistent fever" },
    { title: "Cough & Cold", icon: Wind, desc: "Seasonal or chronic respiratory issues" },
    { title: "Joint Pains", icon: Zap, desc: "Arthritis or metabolic joint issues" },
    { title: "General Weakness", icon: Zap, desc: "Persistent fatigue and low energy" },
    { title: "Diabetes Management", icon: Droplets, desc: "Type 1 & Type 2 specialized care" },
    { title: "Thyroid Disorders", icon: Activity, desc: "Hypothyroidism & hyperthyroidism" },
    { title: "Hypertension", icon: Heart, desc: "High blood pressure monitoring" },
    { title: "Gastric Issues", icon: Droplets, desc: "Acidity, bloating, and digestion" },
    { title: "Respiratory Care", icon: Wind, desc: "Asthma, COPD, and lung health" },
    { title: "Migraine & Headache", icon: Brain, desc: "Chronic headache management" },
    { title: "Metabolic Syndrome", icon: ShieldCheck, desc: "Comprehensive metabolic health" },
  ];

  return (
    <section className="py-24 bg-white" id="condition-finder">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-[1px] bg-blue-600" />
              <p className="text-blue-600 font-extrabold text-[11px] tracking-[0.3em] uppercase">Symptom Navigator</p>
            </div>
            <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-slate-900 leading-[0.9] tracking-tighter font-display">
              Finding Your<br />
              <span className="text-blue-600 italic font-serif font-light">Clinical Path.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-tight max-w-xl">
              Select your primary concern to understand diagnostic pathways and individualized management protocols by Dr. Puneet Kumar.
            </p>
          </div>

          <button 
            onClick={() => navigate('/treatments')}
            className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-extrabold rounded-2xl transition-all active:scale-95 shadow-xl shadow-slate-900/10"
          >
            <span>Complete Care Directory</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {symptoms.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              viewport={{ once: true }}
              onClick={() => navigate('/treatments')}
              className="group p-8 bg-[#f8fafc] rounded-[2.5rem] border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-8">
                <item.icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed tracking-tight">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
