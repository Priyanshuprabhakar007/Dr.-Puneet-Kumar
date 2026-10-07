import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export const AppointmentFormSection: React.FC = () => {
  const { data, submitAppointment, showToast } = useSite();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Prefer not to say',
    concern: '',
    preferredDate: '',
    preferredTime: '10:00 AM - 12:00 PM',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.patientName.trim()) {
      setErrorMessage('Please enter the patient’s full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }
    if (!formData.concern.trim()) {
      setErrorMessage('Please indicate your primary symptom or reason for visit.');
      return;
    }
    if (!formData.preferredDate) {
      setErrorMessage('Please choose your preferred appointment date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitAppointment(formData);
      if (res.success) {
        setIsSuccess(true);
        showToast('Appointment request received! We will call you.', 'success');
        setFormData({
          patientName: '',
          phone: '',
          age: '',
          gender: 'Prefer not to say',
          concern: '',
          preferredDate: '',
          preferredTime: '10:00 AM - 12:00 PM',
          message: ''
        });
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage('Failed to submit. Please call clinic directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="book-appointment">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-2xl blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text / Guarantee info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Direct Doctor Consultation</span>
            </div>

            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-white leading-tight">
              Book Your In-Clinic Consultation
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Schedule your appointment with Dr. Puneet Kumar at Sector 71, Mohali. Our desk verifies every submission within clinic operating hours to ensure minimal waiting times.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Unhurried Clinical Attention</h4>
                  <p className="text-xs text-slate-400">Thorough review of past medical files, diet, and lifestyle markers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Strict Medical Privacy</h4>
                  <p className="text-xs text-slate-400">Your health data is protected under physician-patient confidentiality.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Regular OPD Slots</h4>
                  <p className="text-xs text-slate-400">{data.settings.consultationTimings}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Prefer booking over a call?</p>
                <p className="text-base font-bold text-white mt-0.5">{data.settings.primaryPhone}</p>
              </div>
              <a
                href={`tel:${data.settings.primaryPhone}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-2xl shadow-xs transition-colors"
              >
                Call Desk
              </a>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Patient Appointment Request
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below. Our staff will confirm your slot via phone or WhatsApp.
              </p>

              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Booking Request Received</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you. We have logged your request. Our clinical receptionist will reach out to confirm your slot.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-2xl"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2 border border-red-100">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Patient Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jaspreet Kaur"
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 98150XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Age & Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        placeholder="e.g. 52"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  {/* Medical Concern */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Reason for Consultation / Concern *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diabetes checkup, High BP, Prolonged fever, Thyroid evaluation"
                      value={formData.concern}
                      onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Slot
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        >
                          <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                          <option value="12:00 PM - 02:00 PM">Noon (12:00 PM - 02:00 PM)</option>
                          <option value="05:00 PM - 07:00 PM">Evening (05:00 PM - 07:00 PM)</option>
                          <option value="07:00 PM - 08:30 PM">Late Evening (07:00 PM - 08:30 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Previous Reports or Clinical Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Recent fasting blood sugar 195, taking Metformin 500mg..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-2xl text-sm shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="book-form-submit-btn"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
