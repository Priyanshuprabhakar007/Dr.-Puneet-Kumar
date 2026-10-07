import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { NotFoundPage } from './NotFoundPage';
import { IconRenderer } from '../components/common/IconRenderer';
import {
  Calendar,
  Phone,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ArrowLeft,
  ChevronRight,
  Stethoscope,
  Heart,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const TreatmentDetailPage: React.FC<{ slug?: string }> = ({ slug: propSlug }) => {
  const { data, currentPath, navigate, submitAppointment, showToast, openAppointmentModal } = useSite();
  const { treatments, treatmentCategories, settings, doctorProfile } = data;

  const activeSlug = propSlug || currentPath.replace('/treatments/', '').trim();
  const treatment = treatments.find((t) => t.slug === activeSlug);

  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Prefer not to say',
    preferredDate: '',
    preferredTime: '10:00 AM - 12:00 PM',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookSuccess, setIsBookSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  if (!treatment) {
    return <NotFoundPage />;
  }

  const category = treatmentCategories.find((c) => c.id === treatment.categoryId);
  const relatedTreatments = treatments
    .filter((t) => t.categoryId === treatment.categoryId && t.id !== treatment.id)
    .slice(0, 3);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setBookingError('');

    if (!bookingForm.patientName.trim()) {
      setBookingError('Please provide your name.');
      return;
    }
    if (!bookingForm.phone.trim() || bookingForm.phone.length < 8) {
      setBookingError('Please enter a valid phone number.');
      return;
    }
    if (!bookingForm.preferredDate) {
      setBookingError('Please choose your preferred appointment date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitAppointment({
        ...bookingForm,
        concern: `Treatment: ${treatment.title}`
      });
      if (res.success) {
        setIsBookSuccess(true);
        showToast('Consultation request received!', 'success');
      } else {
        setBookingError(res.message);
      }
    } catch {
      setBookingError('Failed to submit. Please call clinic directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Breadcrumb & Hero */}
      <div className="bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-slate-100 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <button onClick={() => navigate('/')} className="hover:text-blue-700">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => navigate('/treatments')} className="hover:text-blue-700">
              Treatments
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-semibold">{treatment.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
                <IconRenderer name={treatment.iconName} className="w-3.5 h-3.5 text-blue-600" />
                <span>{category?.name || 'Internal Medicine Care'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {treatment.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {treatment.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openAppointmentModal(`Consultation for ${treatment.title}`)}
                  className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Consult Dr. Puneet Kumar</span>
                </button>

                <a
                  href={`tel:${settings.primaryPhone}`}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-2xl border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call: {settings.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Card: Doctor Quick Endorsement */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={doctorProfile.photoUrl}
                  alt={doctorProfile.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{doctorProfile.name}</h4>
                  <p className="text-xs text-blue-700 font-medium">{doctorProfile.designation}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic border-t border-slate-100 pt-2">
                "{doctorProfile.philosophy}"
              </p>
              <div className="flex items-center gap-2 text-[11px] text-blue-700 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Sector 71 Mohali • 12+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Clinical Information Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }} className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Understanding {treatment.title}
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-3">
                <p>{treatment.fullDescription || treatment.shortDescription}</p>
              </div>
            </motion.section>

            {/* Symptoms to watch for */}
            {treatment.symptoms && treatment.symptoms.length > 0 && (
              <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.15, duration: 0.9 }} className="space-y-4 p-6 rounded-2xl bg-blue-50/60 border border-blue-200/60">
                <div className="flex items-center gap-2 text-blue-900">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold">Common Symptoms & Clinical Signs</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  If you or a family member experience any of the following, early clinical evaluation prevents worsening:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {treatment.symptoms.map((symptom, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-blue-100 text-xs font-medium text-slate-800">
                      <span className="w-2 h-2 rounded-2xl bg-blue-500 shrink-0" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Diagnostic Tests */}
            {treatment.diagnosticTests && treatment.diagnosticTests.length > 0 && (
              <motion.section initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.25, duration: 0.7 }} className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900">
                  <FileCheck2 className="w-5 h-5 text-blue-700" />
                  <h3 className="text-xl font-bold">Diagnostic Evaluation & Investigations</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Diagnostic accuracy is paramount. Depending on symptom duration and severity, the following workup may be advised:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {treatment.diagnosticTests.map((test, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{test}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Dr. Puneet's Clinical Approach */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.2, duration: 0.8 }} className="space-y-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200/80">
              <div className="flex items-center gap-2.5 text-blue-950">
                <Stethoscope className="w-6 h-6 text-blue-700" />
                <h3 className="text-xl font-bold">Dr. Puneet’s Treatment Protocol</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {treatment.treatmentApproach ||
                  'Dr. Puneet Kumar adopts a multi-tiered approach: rapid symptom stabilization, root-cause diagnostics, tailored pharmaceutical therapy, and ongoing lifestyle titration. Every patient receives clear explanations of their test results and medications.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-blue-800">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Customized to age, co-morbidities, and renal/liver safety parameters.</span>
              </div>
            </motion.section>

            {/* Lifestyle & Dietary Guidance */}
            {treatment.lifestyleRecommendations && treatment.lifestyleRecommendations.length > 0 && (
              <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ type: "spring", bounce: 0.15, duration: 0.9 }} className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900">
                  <Heart className="w-5 h-5 text-rose-600" />
                  <h3 className="text-xl font-bold">Lifestyle, Diet & Preventive Strategies</h3>
                </div>
                <div className="space-y-2">
                  {treatment.lifestyleRecommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-2xl bg-rose-50 text-rose-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Related Conditions */}
            {relatedTreatments.length > 0 && (
              <div className="pt-8 border-t border-slate-200">
                <h4 className="text-base font-bold text-slate-900 mb-4">
                  Related Conditions in {category?.name || 'this Category'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedTreatments.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => navigate(`/treatments/${rel.slug}`)}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/60 group"
                    >
                      <h5 className="font-bold text-xs text-slate-800 group-hover:text-blue-700 transition-colors">
                        {rel.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {rel.shortDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Direct Consultation Booking Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl sticky top-24">
              <h3 className="text-lg font-bold mb-1">
                Consult for {treatment.title}
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Book an in-person slot with Dr. Puneet Kumar at Sector 71, Mohali.
              </p>

              {isBookSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Request Received</h4>
                  <p className="text-xs text-slate-300">
                    Our clinic desk will call you to confirm your slot.
                  </p>
                  <button
                    onClick={() => setIsBookSuccess(false)}
                    className="text-xs text-blue-400 underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                  {bookingError && (
                    <p className="p-2 bg-rose-900/50 text-rose-300 rounded-2xl text-[11px]">
                      {bookingError}
                    </p>
                  )}

                  <div>
                    <label htmlFor="detail-patientName" className="block text-slate-300 font-medium mb-1">Patient Name *</label>
                    <input
                      id="detail-patientName"
                      name="patientName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Navneet Sharma"
                      value={bookingForm.patientName}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, patientName: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="detail-phone" className="block text-slate-300 font-medium mb-1">Phone Number *</label>
                    <input
                      id="detail-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="e.g. 9876543210"
                      value={bookingForm.phone}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="detail-age" className="block text-slate-300 font-medium mb-1">Age</label>
                      <input
                        id="detail-age"
                        name="age"
                        type="number"
                        min="1"
                        max="120"
                        inputMode="numeric"
                        placeholder="Age"
                        value={bookingForm.age}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, age: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="detail-preferredDate" className="block text-slate-300 font-medium mb-1">Date *</label>
                      <input
                        id="detail-preferredDate"
                        name="preferredDate"
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingForm.preferredDate}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, preferredDate: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="detail-preferredTime" className="block text-slate-300 font-medium mb-1">Preferred Time</label>
                    <select
                      id="detail-preferredTime"
                      name="preferredTime"
                      value={bookingForm.preferredTime}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, preferredTime: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-blue-500 text-xs"
                    >
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                      <option value="07:00 PM - 08:30 PM">07:00 PM - 08:30 PM</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold rounded-2xl transition-colors cursor-pointer mt-2 text-xs"
                  >
                    {isSubmitting ? 'Requesting...' : 'Confirm Consultation Request'}
                  </button>
                </form>
              )}

              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p>📍 Sector 71, Mohali</p>
                <p>📞 Phone: {settings.primaryPhone}</p>
                <p>🕒 Timings: {settings.consultationTimings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
