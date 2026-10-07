import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { X, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const {
    isAppointmentModalOpen,
    closeAppointmentModal,
    defaultConcern,
    submitAppointment,
    showToast
  } = useSite();

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

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isAppointmentModalOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Set tomorrow's date as default preferred date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');

      setFormData((prev) => ({
        ...prev,
        concern: defaultConcern || prev.concern,
        preferredDate: `${yyyy}-${mm}-${dd}`
      }));
      setIsSuccess(false);
      setErrorMessage('');

      // Focus first input after render
      const timer = setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input, button, select, textarea') as HTMLElement;
        if (firstInput) firstInput.focus();
      }, 50);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isAppointmentModalOpen, defaultConcern]);

  // Keyboard accessibility: Escape to close and focus trap
  useEffect(() => {
    if (!isAppointmentModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAppointmentModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAppointmentModalOpen, closeAppointmentModal]);

  if (!isAppointmentModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage('');

    if (!formData.patientName.trim()) {
      setErrorMessage('Please provide the patient’s full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMessage('Please enter a valid contact phone number.');
      return;
    }
    if (!formData.preferredDate) {
      setErrorMessage('Please choose your preferred appointment date.');
      return;
    }
    if (!formData.concern.trim()) {
      setErrorMessage('Please specify the primary symptom or medical concern.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitAppointment(formData);
      if (res.success) {
        setIsSuccess(true);
        showToast('Appointment request received!', 'success');
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please call the clinic directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs"
      onClick={closeAppointmentModal}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-2xl sm:rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Calendar className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 id="modal-headline" className="text-base font-bold tracking-tight font-display">
                Request Doctor Consultation
              </h3>
              <p className="text-xs text-blue-100/90 font-medium">Dr. Puneet Kumar Clinic • Sector 69 Mohali</p>
            </div>
          </div>
          <button
            onClick={closeAppointmentModal}
            className="text-white/80 hover:text-white p-1.5 rounded-2xl hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 font-display">Appointment Request Received</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{formData.patientName}</span>.
                Our clinical coordinator will call you at <span className="font-bold text-slate-900">{formData.phone}</span> to confirm your consultation time slot.
              </p>
              <div className="p-3 bg-blue-50 rounded-2xl text-xs text-blue-900 border border-blue-200 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Need urgent care today? Call our OPD reception directly.</span>
              </div>
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeAppointmentModal}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-700 text-white text-sm font-bold rounded-2xl shadow-sm cursor-pointer"
                >
                  Done
                </motion.button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-patientName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="modal-patientName"
                      name="patientName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Gurpreet Singh"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-age" className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    id="modal-age"
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="e.g. 48"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label htmlFor="modal-gender" className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    id="modal-gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
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
                <label htmlFor="modal-concern" className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Medical Concern / Condition *
                </label>
                <input
                  id="modal-concern"
                  name="concern"
                  type="text"
                  required
                  placeholder="e.g. Uncontrolled Sugar, High BP, Thyroid, Fever"
                  value={formData.concern}
                  onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-preferredDate" className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      id="modal-preferredDate"
                      name="preferredDate"
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-preferredTime" className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      id="modal-preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                      <option value="12:00 PM - 02:00 PM">Afternoon (12:00 PM - 02:00 PM)</option>
                      <option value="05:00 PM - 07:00 PM">Evening (05:00 PM - 07:00 PM)</option>
                      <option value="07:00 PM - 08:30 PM">Late Evening (07:00 PM - 08:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={2}
                  placeholder="Any previous reports, HbA1c value, or current medicines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 hover:from-blue-800 hover:to-blue-800 disabled:bg-slate-400 text-white font-bold rounded-2xl text-sm shadow-md shadow-blue-800/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="submit-appointment-btn"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-blue-200" />
                      <span>Confirm Appointment Request</span>
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Your health data is transmitted securely and handled with strict medical confidentiality.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
