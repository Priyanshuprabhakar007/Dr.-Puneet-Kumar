import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { MapPin, ArrowRight, ShieldCheck, Clock, Navigation } from 'lucide-react';

interface CityCardInfo {
  city: string;
  badge: string;
  title: string;
  description: string;
  travelTime: string;
  linkText: string;
  url: string;
  highlight: string;
}

export const TricityDiabetesSection: React.FC = () => {
  const { navigate } = useSite();

  const cityCards: CityCardInfo[] = [
    {
      city: 'Mohali',
      badge: 'Primary Practice Center',
      title: 'Mohali – Explore Diabetes Care',
      description:
        'Local, accessible outpatient care at Livasa Hospital (Sector 71) and Aggarwal Clinic. Comprehensive Type 2 diabetes management, CGM monitoring, and diabetic foot screening.',
      travelTime: '5 – 15 mins local commute',
      linkText: 'Explore Mohali Care',
      url: '/diabetes-specialist-mohali',
      highlight: 'Sector 71 & Evening Clinic'
    },
    {
      city: 'Chandigarh',
      badge: 'Convenient Tricity Access',
      title: 'Chandigarh – Information for Chandigarh Patients',
      description:
        'Patients from Chandigarh can easily access Dr. Puneet Kumar’s verified Mohali clinic via Himalaya Marg or Vikas Marg. Thorough reviews and second opinions without long waits.',
      travelTime: '10 – 20 mins from Chandigarh',
      linkText: 'Information for Chandigarh Patients',
      url: '/diabetes-specialist-chandigarh',
      highlight: 'Minutes from Sector 43 / 44'
    },
    {
      city: 'Panchkula',
      badge: 'Specialized Consultations',
      title: 'Panchkula – Information for Panchkula Patients',
      description:
        'Fast commute via the PR7 Airport Expressway or Madhya Marg. Scheduled 15-minute consultation slots to respect your travel time, plus continuous glucose monitoring and insulin guidance.',
      travelTime: '20 – 30 mins via PR7 Expressway',
      linkText: 'Information for Panchkula Patients',
      url: '/diabetes-specialist-panchkula',
      highlight: 'Fast PR7 Bypass Route'
    }
  ];

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="tricity-care">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Regional Consultation Coverage</span>
          </div>

          <h2 className="text-[clamp(1.85rem,5vw,3.25rem)] font-extrabold text-white tracking-tight leading-tight font-display">
            Diabetes Care Across Mohali, Chandigarh & Panchkula
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Explore consultation information for patients across the Tricity.
          </p>
        </div>

        {/* 3 City Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cityCards.map((card, idx) => (
            <motion.div
              key={card.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-950/80 rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between hover:border-teal-500/50 hover:shadow-teal-950/20 transition-all group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-xl">
                    {card.badge}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{card.travelTime}</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors font-display">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{card.highlight}</span>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={card.url}
                  onClick={(e) => handleCardClick(e, card.url)}
                  className="w-full py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-800 hover:border-teal-500 transition-all shadow-md group-hover:shadow-teal-900/30"
                >
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Note */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center max-w-2xl mx-auto text-xs text-slate-400 flex items-center justify-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            Consultations are conducted at verified Mohali clinical centers (Livasa Hospital, Sector 71 & Aggarwal Clinic).
          </span>
        </div>
      </div>
    </section>
  );
};
