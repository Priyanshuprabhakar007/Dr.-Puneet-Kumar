import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { CityData, CITIES_DATA } from '../data/cityData';
import {
  Activity,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Users,
  Navigation,
  Car,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Stethoscope,
  Building2,
  HelpCircle,
  FileText,
  Star
} from 'lucide-react';

interface CityLandingPageProps {
  cityKey: 'mohali' | 'chandigarh' | 'panchkula';
}

export const CityLandingPage: React.FC<CityLandingPageProps> = ({ cityKey }) => {
  const { data, openAppointmentModal, navigate } = useSite();
  const { doctorProfile, settings, locations } = data;
  const city = CITIES_DATA[cityKey] || CITIES_DATA.mohali;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cleanWhatsApp = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const primaryLocation = locations.find((l) => l.isPrimary) || locations[0];

  // Resolve doctor photo or high-fidelity fallback
  const doctorPhoto =
    doctorProfile.photoUrl && (doctorProfile.photoUrl.startsWith('http') || doctorProfile.photoUrl.startsWith('/'))
      ? doctorProfile.photoUrl
      : '/aggarwal-clinic-logo.png';

  const otherCities = Object.values(CITIES_DATA).filter((c) => c.slug !== city.slug);

  const handleNav = (path: string) => {
    navigate(path);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-slate-100/80 border-b border-slate-200/80 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 gap-2 flex-wrap font-medium">
            <button
              onClick={() => handleNav('/')}
              className="hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400">/</span>
            <button
              onClick={() => handleNav('/diabetes-care')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Diabetes Care
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-semibold">{city.breadcrumbLabel}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-16 lg:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span>{city.eyebrow}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight font-display">
                {city.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                {city.heroSubtitle}
              </p>

              {/* Verified Location Notice Banner */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Clinical Consultation Locations:</p>
                  <p className="leading-relaxed mt-0.5 text-slate-300">{city.locationNotice}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openAppointmentModal(`Consultation for ${city.cityName} Patient`)}
                  className="px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-teal-950/40 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href={`tel:${settings.primaryPhone}`}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-teal-300" />
                  <span>Call {settings.primaryPhone}</span>
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Hello Dr. Puneet Kumar Clinic, I am inquiring about diabetes consultation for a patient from ${city.cityName}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-sm rounded-xl border border-emerald-500/30 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Query</span>
                </a>
              </div>

              {/* Quick Trust Credentials */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80">
                <div className="space-y-0.5">
                  <p className="text-xl font-black text-white font-display">15+ Years</p>
                  <p className="text-[11px] text-slate-400 font-medium">Clinical Experience</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xl font-black text-white font-display">MD Medicine</p>
                  <p className="text-[11px] text-slate-400 font-medium">DMCH Ludhiana</p>
                </div>
                <div className="space-y-0.5 col-span-2 sm:col-span-1">
                  <p className="text-xl font-black text-white font-display">Fellowship</p>
                  <p className="text-[11px] text-slate-400 font-medium">Diabetes Mellitus (Apollo)</p>
                </div>
              </div>
            </div>

            {/* Right Doctor Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700/60 shadow-inner group">
                  <img
                    src={doctorPhoto}
                    alt={`${doctorProfile.name} - Senior Physician & Diabetes Specialist serving ${city.cityName}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-lg font-bold font-display">{doctorProfile.name}</p>
                    <p className="text-xs text-teal-300 font-medium">{doctorProfile.designation}</p>
                    <p className="text-[11px] text-slate-300 opacity-90">{doctorProfile.degrees}</p>
                  </div>
                </div>

                {/* Practice Highlights Card */}
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Specialized Type 1 & Type 2 Diabetes Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Continuous Glucose Monitoring (CGM) Protocols</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Diabetic Foot Screening & Neuropathy Defense</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Cardio-Metabolic & Hypertension Control</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openAppointmentModal(`Priority Consultation - ${city.cityName}`)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule 15-Minute Slot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Introduction & Local Context */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider uppercase">
              <Stethoscope className="w-4 h-4" />
              <span>Evidence-Based Clinical Diabetology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Comprehensive Diabetes Care for Patients in {city.cityName}
            </h2>
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              {city.introParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Commute and Access Box */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-base sm:text-lg">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Travel & Accessibility from {city.cityName}</h3>
                <p className="text-xs text-slate-500 font-medium">Estimated drive time: {city.commuteInfo.travelTime}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 pt-2 border-t border-slate-200">
              <div>
                <p className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-1">Route & Driving Directions</p>
                <p className="leading-relaxed">{city.commuteInfo.routeDetails}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-1">Clinic Parking & Access</p>
                <p className="leading-relaxed">{city.commuteInfo.parkingInfo}</p>
              </div>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={
                  primaryLocation?.googleMapsUrl ||
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryLocation?.address || 'Livasa Hospital Sector 71 Mohali')}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open Google Maps Directions</span>
              </a>
              <span className="text-xs text-slate-500">Address: Livasa Hospital, Sector 71, Mohali</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars of Diabetes Care */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Targeted Clinical Protocols</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Advanced Glycemic Stabilization & Organ Protection
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Dr. Puneet Kumar focuses on safeguarding cardiovascular, kidney, and nerve health while reducing glycemic variability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {city.careHighlights.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">{pillar.title}</h3>
                    <p className="text-xs font-semibold text-blue-700 mt-1">{pillar.description}</p>
                  </div>
                  <ul className="space-y-2.5 pt-2">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. In-Depth Medical Focus Sections */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Medical Guidance & Overview</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Diabetes Management Approach for {city.cityName} Patients
            </h2>
          </div>

          <div className="space-y-8">
            {city.diabetesManagementFocus.map((item, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {item.heading}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{item.body}</p>
              </div>
            ))}
          </div>

          {/* When to consult banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <h4>When to Consult a Physician for Diabetes Symptoms</h4>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              If you or a family member in {city.cityName} experiences persistent excessive thirst, frequent urination
              (especially during night hours), unexpected weight loss, blurred vision, slow-healing wounds, or tingling/burning in
              the soles of your feet, arrange a comprehensive clinical evaluation. Early diagnosis prevents silent organ strain.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Why Consult Dr. Puneet Kumar */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Physician Credentials</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-display">
              Why Patients in {city.cityName} Consult Dr. Puneet Kumar
            </h2>
            <p className="text-sm text-slate-400">
              Personalized internal medicine expertise backed by continuous professional development and tertiary hospital experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.whyConsultPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Consultation Timings Strip */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Daytime OPD Consultations</p>
              <p className="text-base font-bold text-white">Livasa Hospital (Sector 71, Mohali)</p>
              <p className="text-xs text-slate-400">Mon – Sat: 10:00 AM – 5:00 PM</p>
            </div>
            <div className="space-y-1 md:border-l md:border-slate-800 md:pl-6">
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Evening Clinical Consultations</p>
              <p className="text-base font-bold text-white">Aggarwal Clinic (Mohali)</p>
              <p className="text-xs text-slate-400">Mon – Sat: 5:00 PM – 7:00 PM</p>
            </div>
            <div className="flex justify-start md:justify-end">
              <button
                onClick={() => openAppointmentModal(`Consultation for ${city.cityName}`)}
                className="w-full md:w-auto px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Patient Testimonials (Filtered for Diabetes & Metabolic Care) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Real Patient Experiences</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Patient Feedback on Diabetes Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified clinical reviews from patients managed by Dr. Puneet Kumar in the Tricity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials
              .filter((t) => t.isPublished !== false)
              .slice(0, 2)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed italic">"{item.review}"</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.patientName}</p>
                      <p className="text-xs text-slate-500">{item.location || 'Tricity'}</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl">
                      {item.treatmentCategory || 'Diabetes Care'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive City FAQs */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Patient Questions for {city.cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers regarding travel, consultations, testing, and diabetes follow-ups.
            </p>
          </div>

          <div className="space-y-3">
            {city.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 bg-slate-50 hover:bg-slate-100/70 transition-colors flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 sm:p-6 bg-white border-t border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Related Medical Treatments */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Medical Specialties</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
                Related Clinical Care & Protocols
              </h2>
            </div>
            <button
              onClick={() => handleNav('/treatments')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.relatedTreatments.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleNav(`/treatments/${item.slug}`)}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.description}</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-blue-700 gap-1">
                  <span>Read Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Cross-City Navigation (Internal Link Mesh) */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Tricity Patient Information</p>
              <h3 className="text-lg font-bold text-slate-900">Consultation Guides for Other Cities</h3>
              <p className="text-xs text-slate-600">
                Are you looking for consultation information from another part of the Tricity?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {otherCities.map((other) => (
                <a
                  key={other.slug}
                  href={`/${other.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(`/${other.slug}`);
                  }}
                  className="px-4 py-2.5 bg-white hover:bg-blue-600 hover:text-white text-blue-800 font-semibold text-xs rounded-xl border border-blue-200 shadow-xs transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>{other.cityName} Diabetes Guide</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final Appointment Conversion CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
            Prioritize Your Metabolic Health
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display max-w-2xl mx-auto">
            Book Your Diabetes Review with Dr. Puneet Kumar
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Take a proactive, structured approach to managing your blood sugar levels and preventing chronic complications.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => openAppointmentModal(`Final CTA - ${city.cityName}`)}
              className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-teal-950/40 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Appointment Now</span>
            </button>

            <a
              href={`tel:${settings.primaryPhone}`}
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>Call Clinic Reception</span>
            </a>
          </div>

          <p className="text-xs text-slate-400 pt-4">
            Livasa Hospital (Sector 71, Mohali) • Aggarwal Clinic • Central Tricity Access
          </p>
        </div>
      </section>
    </div>
  );
};
