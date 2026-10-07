import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { ExperienceTimeline } from '../components/home/ExperienceTimeline';
import { QualificationsSection } from '../components/home/QualificationsSection';
import {
  Award,
  Calendar,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Stethoscope,
  Users,
  Building,
  Sparkles,
  Phone
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { data, openAppointmentModal } = useSite();
  const { doctorProfile, settings } = data;

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }} className="bg-gradient-to-b from-blue-50 via-white to-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-slate-100">
                  <img
                    src={doctorProfile.photoUrl}
                    alt={doctorProfile.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-800 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-300" />
                  <div>
                    <p className="text-xl font-black">{doctorProfile.experienceYears}+ Years</p>
                    <p className="text-xs text-blue-200">Clinical Leadership</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bio Summary */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Independent Medical Specialist</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {doctorProfile.name}
              </h1>

              <p className="text-base sm:text-lg font-semibold text-blue-800">
                {doctorProfile.designation} • {doctorProfile.degrees}
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-2xl font-medium border border-slate-200">
                  Reg No: {settings.registrationNumber}
                </span>
                <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-2xl font-medium border border-slate-200">
                  Location: Sector 71, Mohali
                </span>
              </div>

              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {doctorProfile.shortBio}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openAppointmentModal()}
                  className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book In-Clinic Consultation</span>
                </button>

                <a
                  href={`tel:${settings.primaryPhone}`}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-2xl border border-slate-300 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call: {settings.primaryPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Clinical Journey & Biography */}
      <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.15, duration: 0.9 }} className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Clinical Journey & Medical Vision
            </h2>
            <p className="text-sm text-slate-500">
              A decade of treating complex metabolic and acute conditions across Punjab & Chandigarh.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
            {doctorProfile.fullBio?.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Clinical Motto Box */}
          <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-blue-950">Clinical Philosophy</h3>
              <p className="text-sm text-blue-900 italic mt-1 leading-relaxed">
                "{doctorProfile.philosophy}"
              </p>
              <p className="text-xs text-blue-700 mt-2 font-medium">
                — Dr. Puneet Kumar, Senior Physician & Diabetologist
              </p>
            </div>
          </div>

          {/* Key Competencies List */}
          <div className="pt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Areas of Specialized Clinical Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              {doctorProfile.clinicalFocus?.map((focus, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-medium">{focus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Qualifications Section */}
      <QualificationsSection />

      {/* Experience Timeline */}
      <ExperienceTimeline />
    </div>
  );
};
