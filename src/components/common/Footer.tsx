import React from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Heart,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, navigate, isAdminAuthenticated } = useSite();

  const handleNav = (path: string) => {
    navigate(path);
  };

  const primaryLoc = data.locations.find((l) => l.isPrimary) || data.locations[0];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-slate-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-2xl">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white tracking-tighter leading-none font-display">
                    Dr. Puneet <span className="text-blue-500 italic font-serif">Kumar</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
                    Internal Medicine Specialist
                  </span>
                </div>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-md italic font-serif">
                "{data.doctorProfile.shortBio || 'Dedicated to providing evidence-based clinical care and specialized diabetes management with a patient-first philosophy.'}"
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                {data.doctorProfile.degrees}
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
                Reg: {data.settings.registrationNumber}
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {/* Exploration */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Exploration</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Clinical Home', path: '/' },
                  { label: 'Physician Profile', path: '/about' },
                  { label: 'Treatments', path: '/treatments' },
                  { label: 'Diabetes Care', path: '/diabetes-care' },
                  { label: 'Patient Stories', path: '/testimonials' }
                ].map((link) => (
                  <li key={link.path}>
                    <button 
                      onClick={() => handleNav(link.path)} 
                      className="text-sm font-bold hover:text-white hover:translate-x-1 transition-all"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialties */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Specialties</h4>
              <ul className="space-y-4">
                {data.treatments.slice(0, 5).map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => handleNav(`/treatments/${t.slug}`)}
                      className="text-sm font-bold hover:text-white hover:translate-x-1 transition-all text-left"
                    >
                      {t.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Contact</h4>
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Inquiries</p>
                  <a href={`tel:${data.settings.primaryPhone}`} className="text-sm font-black text-slate-300 hover:text-white transition-colors">
                    {data.settings.primaryPhone}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Email Support</p>
                  <a href={`mailto:${data.settings.email}`} className="text-sm font-black text-slate-300 hover:text-white transition-colors">
                    {data.settings.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Consultation Location</p>
                  <p className="text-sm font-bold text-slate-400 leading-relaxed">
                    {primaryLoc.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Dr. Puneet Kumar</span>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <span>Clinical Excellence</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => handleNav('/medical-disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
            <button
              onClick={() => handleNav('/admin')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-all bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-xl border border-slate-800 shadow-lg cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-bold tracking-tight">{isAdminAuthenticated ? 'Admin Dashboard' : 'Physician Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
